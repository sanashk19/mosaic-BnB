"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { StudentTaskPanel, type StudentTaskPanelAnswer } from "@/components/student-task-panel";
import { TrainerFeedbackOverlay } from "@/components/trainers/trainer-feedback-overlay";
import { CabinetIcon } from "@/components/ui-icons";
import type { GmailTrainer as GmailTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: GmailTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Step = "inbox" | "compose" | "sent";

type InboxItem = { from: string; subject: string; preview: string; time: string; unread?: boolean };

const defaultInboxByLocale: Record<Locale, InboxItem[]> = {
  ru: [
    { from: "Google Команда", subject: "Совет дня", preview: "Используй надёжный пароль и не открывай ссылки от незнакомцев.", time: "12:14", unread: true },
    { from: "Школа №12", subject: "Расписание на завтра", preview: "Дорогие родители, завтра урок физкультуры…", time: "вчера" },
    { from: "uzcard@notice.uz", subject: "Чек: оплата 25 000 сум", preview: "Спасибо за покупку в магазине…", time: "вт" },
    { from: "Подписка Stories", subject: "5 идей для выходных", preview: "Подборка интересных мест…", time: "01.05" },
  ],
  uz: [
    { from: "Google jamoasi", subject: "Kun maslahati", preview: "Ishonchli parol ishlat va notanish havolalarni ochma.", time: "12:14", unread: true },
    { from: "12-maktab", subject: "Ertangi dars jadvali", preview: "Hurmatli ota-onalar, ertaga jismoniy tarbiya darsi…", time: "kecha" },
    { from: "uzcard@notice.uz", subject: "Chek: 25 000 soʻm toʻlandi", preview: "Doʻkondagi xaridingiz uchun rahmat…", time: "se" },
    { from: "Stories obunasi", subject: "Dam olish kuni uchun 5 ta gʻoya", preview: "Qiziqarli joylar tanlovi…", time: "01.05" },
  ],
};

function avatar(name: string) {
  return name.replace(/[^A-Za-zА-Яа-я0-9]/g, "").trim()[0]?.toUpperCase() ?? "?";
}

const dict = {
  ru: {
    timeNow: "09:42",
    avatarLetter: "И",
    searchPlaceholder: "Поиск в почте",
    taskLabel: "Задание",
    inbox: "Входящие",
    lettersCount: (n: number) => `${n} писем`,
    composeAria: "Написать письмо",
    composeFab: "Написать",
    backAria: "Назад",
    newMail: "Новое письмо",
    sendAria: "Отправить",
    to: "Кому",
    subject: "Тема",
    body: "Текст письма",
    send: "Отправить письмо",
    sentTitle: "Письмо отправлено",
    sentTo: (name: string) => `${name} получит твоё сообщение.`,
    wrongRecipient: "Проверь получателя. Письмо должно уйти тому человеку, который указан в задании.",
    question: {
      inbox: "Нажми «Написать».",
      recipient: "Кому отправить письмо?",
      body: "Какой текст письма выбрать?",
    },
    statusSent: "Письмо отправлено.",
    statusInbox: "Открой окно «Написать».",
    statusRecipient: "Сначала выбери получателя.",
    statusBody: "Получатель выбран. Теперь выбери текст.",
    statusReady: "Можно отправлять.",
    panelTitle: "Отправь письмо",
    hint: "Открой «Написать», проверь получателя и выбери вежливый текст.",
    feedbackCorrect: "Правильно",
    feedbackSoft: "Давай запомним",
    next: "Дальше",
    composeBtn: "Написать письмо",
    sendBtn: "Отправить",
    overlayGood: "Отлично!",
    overlaySoft: "Подумаем вместе",
    continue: "Продолжить",
  },
  uz: {
    timeNow: "09:42",
    avatarLetter: "I",
    searchPlaceholder: "Pochtada qidirish",
    taskLabel: "Topshiriq",
    inbox: "Kelgan xabarlar",
    lettersCount: (n: number) => `${n} ta xabar`,
    composeAria: "Xat yozish",
    composeFab: "Yozish",
    backAria: "Orqaga",
    newMail: "Yangi xat",
    sendAria: "Yuborish",
    to: "Kimga",
    subject: "Mavzu",
    body: "Xat matni",
    send: "Xatni yuborish",
    sentTitle: "Xat yuborildi",
    sentTo: (name: string) => `${name} xabaringni oladi.`,
    wrongRecipient: "Qabul qiluvchini tekshir. Xat topshiriqda koʻrsatilgan odamga yuborilishi kerak.",
    question: {
      inbox: "«Yozish» tugmasini bos.",
      recipient: "Xatni kimga yuborasan?",
      body: "Qaysi matnni tanlaysan?",
    },
    statusSent: "Xat yuborildi.",
    statusInbox: "«Yozish» oynasini och.",
    statusRecipient: "Avval qabul qiluvchini tanla.",
    statusBody: "Qabul qiluvchi tanlandi. Endi matnni tanla.",
    statusReady: "Yuborish mumkin.",
    panelTitle: "Xat yubor",
    hint: "«Yozish»ni och, qabul qiluvchini tekshir va xushmuomala matnni tanla.",
    feedbackCorrect: "Toʻgʻri",
    feedbackSoft: "Esda tutaylik",
    next: "Davom etish",
    composeBtn: "Xat yozish",
    sendBtn: "Yuborish",
    overlayGood: "Ajoyib!",
    overlaySoft: "Birga oʻylaymiz",
    continue: "Davom etish",
  },
} as const;

export function GmailTrainer({ trainer, onDone, studentMode = false }: Props) {
  const locale = useLocale();
  const t = dict[locale];
  const defaultInbox = defaultInboxByLocale[locale];
  const [step, setStep] = useState<Step>("inbox");
  const [chosenRecipient, setChosenRecipient] = useState<number | null>(null);
  const [chosenBody, setChosenBody] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const recipient = chosenRecipient !== null ? trainer.recipientOptions[chosenRecipient] : null;
  const body = chosenBody !== null ? trainer.bodyOptions[chosenBody] : null;
  const ready = chosenRecipient !== null && chosenBody !== null;
  const allCorrect = Boolean(recipient?.correct && body?.correct);

  function handleSend() {
    if (!ready) return;
    setStep("sent");
    setFeedback(
      recipient?.correct
        ? body!.feedback
        : t.wrongRecipient,
    );
  }

  const recipientAnswers: StudentTaskPanelAnswer[] = trainer.recipientOptions.map((item, index) => ({
    id: `recipient-${item.email}`,
    text: item.name,
    detail: item.email,
    state:
      chosenRecipient === index
        ? step === "sent"
          ? item.correct
            ? "correct"
            : "wrong"
          : "selected"
        : step === "sent" && item.correct
          ? "correct"
          : chosenRecipient !== null
            ? "muted"
            : "idle",
    disabled: step === "sent",
    onClick: () => setChosenRecipient(index),
  }));

  const bodyAnswers: StudentTaskPanelAnswer[] = trainer.bodyOptions.map((item, index) => ({
    id: `body-${index}`,
    text: item.text,
    state:
      chosenBody === index
        ? step === "sent"
          ? item.correct
            ? "correct"
            : "wrong"
          : "selected"
        : step === "sent" && item.correct
          ? "correct"
          : chosenBody !== null
            ? "muted"
            : "idle",
    disabled: step === "sent",
    onClick: () => setChosenBody(index),
  }));

  const panelAnswers = chosenRecipient === null ? recipientAnswers : bodyAnswers;
  const reviewedPanelAnswers = [
    ...recipientAnswers.filter((_, index) =>
      index === chosenRecipient || trainer.recipientOptions[index].correct,
    ),
    ...bodyAnswers.filter((_, index) =>
      index === chosenBody || trainer.bodyOptions[index].correct,
    ),
  ];
  const panelQuestion =
    step === "inbox"
      ? t.question.inbox
      : chosenRecipient === null
        ? t.question.recipient
        : t.question.body;
  const panelStatus =
    step === "sent"
      ? t.statusSent
      : step === "inbox"
        ? t.statusInbox
        : chosenRecipient === null
          ? t.statusRecipient
          : chosenBody === null
            ? t.statusBody
            : t.statusReady;

  const inbox = trainer.inbox ?? defaultInbox;

  const mailFrame = (
    <div className="gmail-phone">
      <div className="gmail-statusbar">
        <span>{t.timeNow}</span>
        <span className="gmail-statusbar-icons">
          <CabinetIcon name="signal" />
          <span>4G</span>
          <CabinetIcon name="battery" />
        </span>
      </div>

      {step === "inbox" ? (
        <>
          <header className="gmail-mobile-header">
            <span className="gmail-mobile-menu" aria-hidden="true"><CabinetIcon name="menu" /></span>
            <div className="gmail-mobile-search">
              <CabinetIcon name="search" />
              <span>{t.searchPlaceholder}</span>
            </div>
            <span className="gmail-mobile-avatar" aria-hidden="true">{t.avatarLetter}</span>
          </header>

          {!studentMode ? (
            <div className="gmail-task">{t.taskLabel}: {trainer.task}</div>
          ) : null}

          <div className="gmail-mobile-inbox-label">
            <strong>{t.inbox}</strong>
            <small>{t.lettersCount(inbox.length)}</small>
          </div>

          <div className="gmail-mobile-list">
            {inbox.map((m, i) => (
              <div key={i} className={`gmail-mobile-item${m.unread ? " unread" : ""}`}>
                <span className="gmail-mobile-item-avatar" aria-hidden="true">{avatar(m.from)}</span>
                <div className="gmail-mobile-item-info">
                  <div className="gmail-mobile-item-row">
                    <strong>{m.from}</strong>
                    <small>{m.time}</small>
                  </div>
                  <div className="gmail-mobile-item-subject">{m.subject}</div>
                  <div className="gmail-mobile-item-preview">{m.preview}</div>
                </div>
                <span className="gmail-mobile-item-star" aria-hidden="true"><CabinetIcon name="star" /></span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="gmail-fab"
            onClick={() => setStep("compose")}
            aria-label={t.composeAria}
          >
            <span className="gmail-fab-icon"><CabinetIcon name="pencil" /></span>
            <span className="gmail-fab-label">{t.composeFab}</span>
          </button>
        </>
      ) : null}

      {step === "compose" ? (
        <>
          <header className="gmail-mobile-header gmail-mobile-header--compose">
            <button type="button" className="gmail-mobile-back" aria-label={t.backAria} onClick={() => setStep("inbox")}>
              <CabinetIcon name="chevron-left" />
            </button>
            <strong>{t.newMail}</strong>
            <button type="button" className="gmail-mobile-send-icon" onClick={handleSend} disabled={!ready} aria-label={t.sendAria}>
              <CabinetIcon name="send" />
            </button>
          </header>

          {!studentMode ? (
            <div className="gmail-task">{t.taskLabel}: {trainer.task}</div>
          ) : null}

          <div className="gmail-compose-mobile">
            <div className="gmail-mobile-field">
              <label>{t.to}</label>
              <div className="gmail-mobile-chips">
                {trainer.recipientOptions.map((r, i) => (
                  <button
                    key={r.email}
                    type="button"
                    className={`gmail-chip${chosenRecipient === i ? " active" : ""}`}
                    onClick={() => setChosenRecipient(i)}
                    disabled={studentMode}
                  >
                    <span className="gmail-chip-name">{r.name}</span>
                    <span className="gmail-chip-email">{r.email}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="gmail-mobile-field">
              <label>{t.subject}</label>
              <input type="text" className="gmail-input" defaultValue={trainer.subjectSuggestion} readOnly />
            </div>

            <div className="gmail-mobile-field">
              <label>{t.body}</label>
              <div className="gmail-mobile-body-options">
                {trainer.bodyOptions.map((b, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`gmail-body-option${chosenBody === i ? " active" : ""}`}
                    onClick={() => setChosenBody(i)}
                    disabled={studentMode}
                  >
                    {b.text}
                  </button>
                ))}
              </div>
            </div>

            {!studentMode ? (
              <button type="button" className="gmail-send" onClick={handleSend} disabled={!ready}>
                {t.send}
              </button>
            ) : null}
          </div>
        </>
      ) : null}

      {step === "sent" ? (
        <div className="gmail-sent">
          <div className="gmail-sent-icon" aria-hidden="true">
            <CabinetIcon name="mail" />
          </div>
          <strong>{t.sentTitle}</strong>
          <p>{t.sentTo(recipient?.name ?? "")}</p>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className={`gmail-trainer${studentMode ? " student-trainer-workspace" : ""}`}>
      {studentMode ? <div className="student-trainer-surface">{mailFrame}</div> : mailFrame}

      {studentMode ? (
        <StudentTaskPanel
          title={t.panelTitle}
          instruction={trainer.task}
          question={panelQuestion}
          status={panelStatus}
          answers={step === "sent" ? reviewedPanelAnswers : step === "inbox" ? [] : panelAnswers}
          hint={t.hint}
          feedback={
            feedback
              ? {
                  tone: allCorrect ? "good" : "soft",
                  title: allCorrect ? t.feedbackCorrect : t.feedbackSoft,
                  text: feedback,
                }
              : null
          }
          primaryAction={
            step === "sent"
              ? { label: t.next, onClick: () => onDone({ correct: allCorrect }) }
              : step === "inbox"
                ? { label: t.composeBtn, onClick: () => setStep("compose") }
                : { label: t.sendBtn, onClick: handleSend, disabled: !ready }
          }
        />
      ) : null}

      {feedback && !studentMode ? (
        <TrainerFeedbackOverlay
          tone={allCorrect ? "good" : "soft"}
          title={allCorrect ? t.overlayGood : t.overlaySoft}
          text={feedback}
          actionLabel={t.continue}
          onAction={() => onDone({ correct: allCorrect })}
        />
      ) : null}
    </div>
  );
}
