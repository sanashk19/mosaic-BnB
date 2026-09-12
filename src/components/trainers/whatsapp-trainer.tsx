"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { StudentTaskPanel, type StudentTaskPanelAnswer } from "@/components/student-task-panel";
import { TrainerFeedbackOverlay } from "@/components/trainers/trainer-feedback-overlay";
import { CabinetIcon } from "@/components/ui-icons";
import type { WhatsappTrainer as WhatsappTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Message = {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
};

type Props = {
  trainer: WhatsappTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Step = "list" | "chat";

function now() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

type OtherChat = { name: string; avatar: string; lastMessage: string; time: string; unread?: number };

const defaultOtherChatsByLocale: Record<Locale, OtherChat[]> = {
  ru: [
    { name: "Family chat", avatar: "C", lastMessage: "Aunt Dilbar: buy bread", time: "13:48", unread: 4 },
    { name: "School notification", avatar: "Sh", lastMessage: "It's cold tomorrow, warm clothes", time: "12:21" },
    { name: "Neighbor Maria", avatar: "M", lastMessage: "Thanks for your help!", time: "yesterday" },
    { name: "WhatsApp", avatar: "W", lastMessage: "New features this fall", time: "Mon" },
  ],
  uz: [
    { name: "Oila chati", avatar: "O", lastMessage: "Dilbar xola: non oling", time: "13:48", unread: 4 },
    { name: "Maktab xabarlari", avatar: "M", lastMessage: "Ertaga sovuq, issiq kiyim", time: "12:21" },
    { name: "Qoʻshni Mariya", avatar: "M", lastMessage: "Yordam uchun rahmat!", time: "kecha" },
    { name: "WhatsApp", avatar: "W", lastMessage: "Bu kuzda yangi imkoniyatlar", time: "du" },
  ],
};

const dict = {
  ru: {
    backLabel: "Back",
    typing: "prints...",
    online: "online",
    nowLabel: "Now",
    tabChats: "Chats",
    tabStatus: "Statuses",
    tabCalls: "Calls",
    chooseHint: "Choose what to answer:",
    placeholderEmpty: "Choose the answer on the right",
    placeholderSent: "Message sent",
    taskTitle: "Reply to message",
    instruction: "Open a chat with an unread message and choose one calm response.",
    question: "What is better to write?",
    statusList: "Find a chat with an unread message.",
    statusNotChosen: "No answer has been selected yet.",
    statusSent: "The answer has been sent to the chat.",
    hint: "Choose an answer without rudeness, without unnecessary personal data and without haste.",
    feedbackCorrect: "Right",
    feedbackSoft: "Let's remember",
    next: "Next",
    overlayGood: "Well done!",
    overlaySoft: "Let's think together",
    continue: "Continue",
  },
  uz: {
    backLabel: "Orqaga",
    typing: "yozmoqda...",
    online: "onlayn",
    nowLabel: "hozir",
    tabChats: "Chatlar",
    tabStatus: "Status",
    tabCalls: "Qoʻngʻiroqlar",
    chooseHint: "Qaysi javobni yozasan?",
    placeholderEmpty: "Oʻngdan javobni tanla",
    placeholderSent: "Xabar yuborildi",
    taskTitle: "Xabarga javob ber",
    instruction: "Oʻqilmagan xabari bor chatni och va bitta xotirjam javobni tanla.",
    question: "Nima deb yozish yaxshi?",
    statusList: "Oʻqilmagan xabari bor chatni top.",
    statusNotChosen: "Javob hali tanlanmagan.",
    statusSent: "Javob chatga yuborildi.",
    hint: "Qoʻpol boʻlmagan, ortiqcha shaxsiy maʼlumotsiz va shoshilmasdan javob tanla.",
    feedbackCorrect: "Toʻgʻri",
    feedbackSoft: "Esda tutaylik",
    next: "Davom etish",
    overlayGood: "Barakalla!",
    overlaySoft: "Birga oʻylaymiz",
    continue: "Davom etish",
  },
} as const;

export function WhatsappTrainer({ trainer, onDone, studentMode = false }: Props) {
  const locale = useLocale();
  const t = dict[locale];
  const defaultOtherChats = defaultOtherChatsByLocale[locale];
  const { contact, history = [], prompt, options, otherChats = defaultOtherChats } = trainer;
  const [step, setStep] = useState<Step>("list");
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

      setTimeout(() => setFeedback(opt.feedback), 2200);
    } else {
      setTimeout(() => setFeedback(opt.feedback), 700);
    }
  }

  const chosenOpt = chosen !== null ? options[chosen] : null;
  const canChooseReply = chosen === null;
  const panelAnswers: StudentTaskPanelAnswer[] = options.map((opt, index) => ({
    id: `wa-${index}`,
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
    <div className="wa-phone">
      <div className="wa-statusbar">
        <span>{now()}</span>
        <span className="wa-statusbar-icons">
          <CabinetIcon name="signal" />
          <CabinetIcon name="battery" />
        </span>
      </div>

      {step === "list" ? (
        <>
          <header className="wa-list-header">
            <strong>WhatsApp</strong>
            <span className="wa-list-actions" aria-hidden="true">
              <CabinetIcon name="camera" />
              <CabinetIcon name="search" />
              <CabinetIcon name="dots-v" />
            </span>
          </header>
          <div className="wa-list-tabs">
            <button type="button" className="wa-list-tab active">{t.tabChats}</button>
            <button type="button" className="wa-list-tab">{t.tabStatus}</button>
            <button type="button" className="wa-list-tab">{t.tabCalls}</button>
          </div>
          <div className="wa-chat-list">
            <button
              type="button"
              className="wa-chat-list-item wa-chat-list-item--featured"
              onClick={() => setStep("chat")}
            >
              <span className="wa-chat-avatar wa-chat-avatar--featured" aria-hidden="true">
                {contact.avatar ?? contact.name[0]}
              </span>
              <div className="wa-chat-list-info">
                <div className="wa-chat-list-top">
                  <strong>{contact.name}</strong>
                  <small className="wa-chat-list-unread-time">{prompt.time ?? t.nowLabel}</small>
                </div>
                <div className="wa-chat-list-bottom">
                  <span className="wa-chat-last-msg">{prompt.text}</span>
                  <span className="wa-unread-badge">1</span>
                </div>
              </div>
            </button>
            {otherChats.map((c, i) => (
              <div key={i} className="wa-chat-list-item">
                <span className="wa-chat-avatar" aria-hidden="true">{c.avatar ?? c.name[0]}</span>
                <div className="wa-chat-list-info">
                  <div className="wa-chat-list-top">
                    <strong>{c.name}</strong>
                    <small>{c.time}</small>
                  </div>
                  <div className="wa-chat-list-bottom">
                    <span className="wa-chat-last-msg">{c.lastMessage}</span>
                    {c.unread ? <span className="wa-unread-badge">{c.unread}</span> : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <header className="wa-header">
            <button type="button" className="wa-back" aria-label={t.backLabel} onClick={() => setStep("list")}>
              <CabinetIcon name="chevron-left" />
            </button>
            <div className="wa-header-avatar" aria-hidden="true">
              {contact.avatar ?? contact.name[0]}
            </div>
            <div className="wa-header-info">
              <strong>{contact.name}</strong>
              <small>{typing ? t.typing : contact.subtitle ?? t.online}</small>
            </div>
            <span className="wa-header-actions" aria-hidden="true">
              <span className="wa-header-icon">
                <CabinetIcon name="phone" />
              </span>
              <span className="wa-header-icon">
                <CabinetIcon name="dots-v" />
              </span>
            </span>
          </header>

          <div className="wa-messages" ref={scrollRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`wa-msg wa-msg--${msg.from === "me" ? "out" : "in"}`}
              >
                <div className="wa-bubble">
                  <span className="wa-text">{msg.text}</span>
                  <span className="wa-meta">
                    {msg.time}
                    {msg.from === "me" ? (
                      <span className="wa-check" aria-hidden="true">
                        <CabinetIcon name="check" />
                        <CabinetIcon name="check" />
                      </span>
                    ) : null}
                  </span>
                </div>
              </div>
            ))}
            {typing ? (
              <div className="wa-msg wa-msg--in">
                <div className="wa-bubble wa-bubble--typing">
                  <span className="wa-typing-dot" />
                  <span className="wa-typing-dot" />
                  <span className="wa-typing-dot" />
                </div>
              </div>
            ) : null}
          </div>

          {canChooseReply && !studentMode ? (
            <div className="wa-options">
              <p className="wa-options-hint">{t.chooseHint}</p>
              {options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  className="wa-option-btn"
                  onClick={() => chooseReply(i)}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          ) : (
            <div className="wa-input-bar">
              <span className="wa-input-emoji" aria-hidden="true"><CabinetIcon name="help" /></span>
              <span className="wa-input-placeholder">
                {chosen === null ? t.placeholderEmpty : t.placeholderSent}
              </span>
              <span className="wa-input-attach" aria-hidden="true"><CabinetIcon name="attach" /></span>
              <span className="wa-input-mic" aria-hidden="true"><CabinetIcon name="mic" /></span>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className={`wa-trainer${studentMode ? " student-trainer-workspace" : ""}`}>
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
