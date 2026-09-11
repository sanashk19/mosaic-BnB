"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { StudentTaskPanel, type StudentTaskPanelAnswer } from "@/components/student-task-panel";
import { TrainerFeedbackOverlay } from "@/components/trainers/trainer-feedback-overlay";
import { CabinetIcon } from "@/components/ui-icons";
import type { TelegramTrainer as TelegramTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Message = {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
  status?: "sent" | "delivered" | "read";
};

type Props = {
  trainer: TelegramTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  iconMode?: "emoji" | "svg";
  studentMode?: boolean;
  /** Если задано, тренажёр открывается сразу в этом шаге (например, "chat") */
  initialStep?: "list" | "chat";
};

const publicPhoneSymbol = "\u{1F4DE}";

function now() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

type Step = "list" | "chat";

type OtherChat = { name: string; avatar: string; lastMessage: string; time: string; unread?: number };

const defaultOtherChatsByLocale: Record<Locale, OtherChat[]> = {
  ru: [
    { name: "Группа «Класс 3А»", avatar: "К", lastMessage: "Алиша: Кто ходил вчера?", time: "13:48", unread: 7 },
    { name: "Папа", avatar: "П", lastMessage: "Я скоро буду дома", time: "12:21" },
    { name: "Telegram", avatar: "T", lastMessage: "Новый код входа: 4827", time: "вчера" },
    { name: "Расписание", avatar: "Р", lastMessage: "Завтра физкультура 4-м уроком", time: "пт" },
  ],
  uz: [
    { name: "«3-A sinf» guruhi", avatar: "S", lastMessage: "Alisha: Kim kecha bordi?", time: "13:48", unread: 7 },
    { name: "Dadam", avatar: "D", lastMessage: "Tez orada uyga yetib boraman", time: "12:21" },
    { name: "Telegram", avatar: "T", lastMessage: "Yangi kirish kodi: 4827", time: "kecha" },
    { name: "Dars jadvali", avatar: "J", lastMessage: "Ertaga 4-darsda jismoniy tarbiya", time: "ju" },
  ],
};

const dict = {
  ru: {
    backLabel: "Назад",
    typing: "печатает...",
    online: "в сети",
    nowLabel: "сейчас",
    chooseHint: "Выбери, что ответить:",
    placeholderEmpty: "Выбери ответ справа",
    placeholderSent: "Сообщение отправлено",
    taskTitle: "Ответь на сообщение",
    instruction: "Открой нужный чат и выбери один спокойный ответ.",
    question: "Что лучше написать?",
    statusList: "Открой чат, на котором мигает индикатор.",
    statusNotChosen: "Ответ еще не выбран.",
    statusSent: "Ответ отправлен в чат.",
    hint: "Сначала выбери чат, потом — ответ без грубости и без лишних личных данных.",
    feedbackCorrect: "Правильно",
    feedbackSoft: "Давай запомним",
    next: "Дальше",
    overlayGood: "Молодец!",
    overlaySoft: "Подумаем вместе",
    continue: "Продолжить",
  },
  uz: {
    backLabel: "Orqaga",
    typing: "yozmoqda...",
    online: "onlayn",
    nowLabel: "hozir",
    chooseHint: "Qaysi javobni yozasan?",
    placeholderEmpty: "Oʻngdan javobni tanla",
    placeholderSent: "Xabar yuborildi",
    taskTitle: "Xabarga javob ber",
    instruction: "Kerakli chatni ochib, bitta xotirjam javobni tanla.",
    question: "Nima deb yozish yaxshi?",
    statusList: "Indikator yonayotgan chatni och.",
    statusNotChosen: "Javob hali tanlanmagan.",
    statusSent: "Javob chatga yuborildi.",
    hint: "Avval chatni tanla, keyin — qoʻpol boʻlmagan va ortiqcha shaxsiy maʼlumot bermaydigan javobni.",
    feedbackCorrect: "Toʻgʻri",
    feedbackSoft: "Esda tutaylik",
    next: "Davom etish",
    overlayGood: "Barakalla!",
    overlaySoft: "Birga oʻylaymiz",
    continue: "Davom etish",
  },
} as const;

export function TelegramTrainer({
  trainer,
  onDone,
  iconMode = "emoji",
  studentMode = false,
  initialStep = "list",
}: Props) {
  const locale = useLocale();
  const t = dict[locale];
  const defaultOtherChats = defaultOtherChatsByLocale[locale];
  const { contact, history = [], prompt, options, otherChats = defaultOtherChats } = trainer;
  const [step, setStep] = useState<Step>(initialStep);
  const [messages, setMessages] = useState<Message[]>(() => [
    ...history.map((m, i) => ({
      id: `h${i}`,
      from: m.from,
      text: m.text,
      time: m.time ?? "14:30",
    })),
    {
      id: "prompt",
      from: "them" as const,
      text: prompt.text,
      time: prompt.time ?? now(),
    },
  ]);
  const [chosen, setChosen] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function chooseReply(index: number) {
    if (chosen !== null) return;
    const opt = options[index];
    setChosen(index);

    setMessages((prev) => [
      ...prev,
      {
        id: `reply-${Date.now()}`,
        from: "me",
        text: opt.text,
        time: now(),
        status: "sent",
      },
    ]);

    if (opt.reply) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `reply-back-${Date.now()}`,
            from: "them",
            text: opt.reply!.text,
            time: opt.reply!.time ?? now(),
          },
        ]);
      }, 1400);

      setTimeout(() => {
        setFeedback(opt.feedback);
      }, 2200);
    } else {
      setTimeout(() => setFeedback(opt.feedback), 700);
    }
  }

  const chosenOpt = chosen !== null ? options[chosen] : null;
  const canChooseReply = chosen === null;
  const panelAnswers: StudentTaskPanelAnswer[] = options.map((opt, index) => ({
    id: `telegram-${index}`,
    text: opt.text,
    state:
      chosen !== null
        ? opt.correct
          ? "correct"
          : chosen === index
            ? "wrong"
            : "muted"
        : "idle",
    disabled: chosen !== null,
    onClick: () => chooseReply(index),
  }));

  const phone = (
    <div className="tg-phone">
      {/* Status bar of phone */}
      <div className="tg-statusbar">
        <span>{now()}</span>
        <span className="tg-statusbar-icons">
          <CabinetIcon name="signal" />
          <CabinetIcon name="battery" />
        </span>
      </div>

      {step === "list" ? (
        <>
          <header className="tg-list-header">
            <span className="tg-menu" aria-hidden="true"><CabinetIcon name="menu" /></span>
            <strong>Telegram</strong>
            <span className="tg-search" aria-hidden="true"><CabinetIcon name="search" /></span>
          </header>
          <div className="tg-chat-list">
            <button
              type="button"
              className="tg-chat-list-item tg-chat-list-item--featured"
              onClick={() => setStep("chat")}
            >
              <span className="tg-chat-avatar tg-chat-avatar--featured" aria-hidden="true">
                {contact.avatar ?? contact.name[0]}
              </span>
              <div className="tg-chat-list-info">
                <div className="tg-chat-list-top">
                  <strong>{contact.name}</strong>
                  <small>{prompt.time ?? t.nowLabel}</small>
                </div>
                <div className="tg-chat-list-bottom">
                  <span className="tg-chat-last-msg">{prompt.text}</span>
                  <span className="tg-unread-badge">1</span>
                </div>
              </div>
            </button>
            {otherChats.map((c, i) => (
              <div key={i} className="tg-chat-list-item">
                <span className="tg-chat-avatar" aria-hidden="true">{c.avatar ?? c.name[0]}</span>
                <div className="tg-chat-list-info">
                  <div className="tg-chat-list-top">
                    <strong>{c.name}</strong>
                    <small>{c.time}</small>
                  </div>
                  <div className="tg-chat-list-bottom">
                    <span className="tg-chat-last-msg">{c.lastMessage}</span>
                    {c.unread ? <span className="tg-unread-badge">{c.unread}</span> : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <header className="tg-header">
            <button type="button" className="tg-back" aria-label={t.backLabel} onClick={() => setStep("list")}>
              <CabinetIcon name="chevron-left" />
            </button>
            <div className="tg-header-avatar" aria-hidden="true">
              {contact.avatar ?? contact.name[0]}
            </div>
            <div className="tg-header-info">
              <strong>{contact.name}</strong>
              <small>{typing ? t.typing : contact.subtitle ?? t.online}</small>
            </div>
            <span className="tg-header-call" aria-hidden="true">
              {iconMode === "svg" ? <CabinetIcon name="phone" /> : publicPhoneSymbol}
            </span>
          </header>

          <div className="tg-messages" ref={scrollRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`tg-msg tg-msg--${msg.from === "me" ? "out" : "in"}`}
              >
                <div className="tg-bubble">
                  <span className="tg-text">{msg.text}</span>
                  <span className="tg-meta">
                    {msg.time}
                    {msg.from === "me" ? (
                      <span className="tg-check" aria-hidden="true">
                        <CabinetIcon name="check" />
                        <CabinetIcon name="check" />
                      </span>
                    ) : null}
                  </span>
                </div>
              </div>
            ))}
            {typing ? (
              <div className="tg-msg tg-msg--in">
                <div className="tg-bubble tg-bubble--typing">
                  <span className="tg-typing-dot" />
                  <span className="tg-typing-dot" />
                  <span className="tg-typing-dot" />
                </div>
              </div>
            ) : null}
          </div>

          {canChooseReply && !studentMode ? (
            <div className="tg-options">
              <p className="tg-options-hint">{t.chooseHint}</p>
              {options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  className="tg-option-btn"
                  onClick={() => chooseReply(i)}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          ) : (
            <div className="tg-input-bar">
              <span className="tg-input-attach" aria-hidden="true"><CabinetIcon name="attach" /></span>
              <span className="tg-input-placeholder">
                {chosen === null ? t.placeholderEmpty : t.placeholderSent}
              </span>
              <span className="tg-input-mic" aria-hidden="true"><CabinetIcon name="mic" /></span>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className={`tg-trainer${studentMode ? " student-trainer-workspace" : ""}`}>
      {studentMode ? <div className="student-trainer-surface">{phone}</div> : phone}

      {studentMode ? (
        <StudentTaskPanel
          title={t.taskTitle}
          instruction={t.instruction}
          question={t.question}
          status={
            step === "list"
              ? t.statusList
              : chosen === null
                ? t.statusNotChosen
                : t.statusSent
          }
          answers={panelAnswers}
          hint={t.hint}
          feedback={
            feedback
              ? {
                  tone: chosenOpt?.correct ? "good" : "soft",
                  title: chosenOpt?.correct ? t.feedbackCorrect : t.feedbackSoft,
                  text: feedback,
                }
              : null
          }
          primaryAction={
            feedback
              ? {
                  label: t.next,
                  onClick: () => onDone({ correct: Boolean(chosenOpt?.correct) }),
                }
              : undefined
          }
        />
      ) : null}

      {feedback && !studentMode ? (
        <TrainerFeedbackOverlay
          tone={chosenOpt?.correct ? "good" : "soft"}
          title={chosenOpt?.correct ? t.overlayGood : t.overlaySoft}
          text={feedback}
          actionLabel={t.continue}
          onAction={() => onDone({ correct: Boolean(chosenOpt?.correct) })}
        />
      ) : null}
    </div>
  );
}
