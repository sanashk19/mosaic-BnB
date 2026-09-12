"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { StudentTaskPanel, type StudentTaskPanelAnswer } from "@/components/student-task-panel";
import { TrainerFeedbackOverlay } from "@/components/trainers/trainer-feedback-overlay";
import { CabinetIcon } from "@/components/ui-icons";
import type { MailruTrainer as MailruTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: MailruTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Step = "inbox" | "compose" | "sent";

type InboxItem = { from: string; subject: string; preview: string; time: string; unread?: boolean };

const defaultInboxByLocale: Record<Locale, InboxItem[]> = {
  ru: [
    { from: "Mail.ru Team", subject: "Hello, welcome", preview: "Get to know all the features of mail.", time: "Now", unread: true },
    { from: "Teacher Bahrom Akmalevich", subject: "Test schedule", preview: "Hello, this Tuesday...", time: "yesterday", unread: true },
    { from: "OZONE Promo", subject: "Discounts up to 50%", preview: "Catalog of summer products…", time: "pt" },
    { from: "noreply@bank.uz", subject: "Check: payment 18,500 soum", preview: "Thanks for your purchase...", time: "27.04" },
    { from: "News Mail.ru", subject: "5 main events of the week", preview: "What is being discussed in the country and the world...", time: "26.04" },
  ],
  uz: [
    { from: "Mail.ru jamoasi", subject: "Salom, xush kelibsiz", preview: "Pochtaning barcha imkoniyatlari bilan tanish.", time: "hozir", unread: true },
    { from: "Bahrom Akmalevich oʻqituvchi", subject: "Sinov jadvali", preview: "Assalomu alaykum, shu seshanba…", time: "kecha", unread: true },
    { from: "OZON Promo", subject: "50%gacha chegirma", preview: "Yozgi mahsulotlar katalogi…", time: "ju" },
    { from: "noreply@bank.uz", subject: "Chek: 18 500 soʻm toʻlandi", preview: "Xaridingiz uchun rahmat…", time: "27.04" },
    { from: "Mail.ru yangiliklari", subject: "Hafta 5 ta asosiy voqeasi", preview: "Mamlakat va dunyoda nimalar muhokama qilinmoqda…", time: "26.04" },
  ],
};

function avatar(name: string) {
  return name.replace(/[^A-Za-z0-9]/g, "").trim()[0]?.toUpperCase() ?? "?";
}

const dict = {
  ru: {
    timeNow: "09:42",
    avatarLetter: "AND",
    searchPlaceholder: "Search by letters",
    taskLabel: "Exercise",
    inbox: "Inbox",
    lettersCount: (n: number) => `${n}letters`,
    composeAria: "Write a letter",
    backAria: "Back",
    newMail: "New letter",
    sendAria: "Send",
    to: "To whom",
    subject: "Subject",
    body: "Letter text",
    send: "Send a letter",
    sentTitle: "Letter sent",
    sentTo: (name: string) => `${name}will receive your message.`,
    wrongRecipient: "Check the recipient. The letter should go to the person indicated in the task.",
    question: {
      inbox: "Click \"Write\".",
      recipient: "Who should I send it to?",
      body: "Which text should I choose?",
    },
    statusSent: "The letter has been sent.",
    statusInbox: "Open the “Compose” window.",
    statusRecipient: "First, select a recipient.",
    statusBody: "The recipient has been selected. Now select the text.",
    statusReady: "You can send.",
    panelTitle: "Send a letter",
    hint: "Open \"Write\", check the recipient and select a polite text.",
    feedbackCorrect: "Right",
    feedbackSoft: "Let's remember",
    next: "Next",
    composeBtn: "Write a letter",
    sendBtn: "Send",
    overlayGood: "Great!",
    overlaySoft: "Let's think together",
    continue: "Continue",
  },
  uz: {
    timeNow: "09:42",
    avatarLetter: "I",
    searchPlaceholder: "Xatlardan qidirish",
    taskLabel: "Topshiriq",
    inbox: "Kelgan xabarlar",
    lettersCount: (n: number) => `${n} ta xabar`,
    composeAria: "Xat yozish",
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
      recipient: "Kimga yuborasan?",
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

export function MailruTrainer({ trainer, onDone, studentMode = false }: Props) {
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
    id: `mr-rec-${item.email}`,
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
    id: `mr-body-${index}`,
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
    <div className="mailru-phone">
      <div className="mailru-statusbar">
        <span>{t.timeNow}</span>
        <span className="mailru-statusbar-icons">
          <CabinetIcon name="signal" />
          <span>4G</span>
          <CabinetIcon name="battery" />
        </span>
      </div>

      {step === "inbox" ? (
        <>
          <header className="mailru-mobile-header">
            <span className="mailru-mobile-menu" aria-hidden="true"><CabinetIcon name="menu" /></span>
            <strong>Mail<span className="mailru-mobile-dot">·</span>ru</strong>
            <span className="mailru-mobile-avatar" aria-hidden="true">{t.avatarLetter}</span>
          </header>

          <div className="mailru-mobile-search">
            <CabinetIcon name="search" />
            <span>{t.searchPlaceholder}</span>
          </div>

          {!studentMode ? (
            <div className="mailru-task">{t.taskLabel}: {trainer.task}</div>
          ) : null}

          <div className="mailru-mobile-inbox-label">
            <strong>{t.inbox}</strong>
            <small>{t.lettersCount(inbox.length)}</small>
          </div>

          <div className="mailru-mobile-list">
            {inbox.map((m, i) => (
              <div key={i} className={`mailru-mobile-item${m.unread ? " unread" : ""}`}>
                <span className="mailru-mobile-item-avatar" aria-hidden="true">{avatar(m.from)}</span>
                <div className="mailru-mobile-item-info">
                  <div className="mailru-mobile-item-row">
                    <strong>{m.from}</strong>
                    <small>{m.time}</small>
                  </div>
                  <div className="mailru-mobile-item-subject">{m.subject}</div>
                  <div className="mailru-mobile-item-preview">{m.preview}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mailru-fab"
            onClick={() => setStep("compose")}
            aria-label={t.composeAria}
          >
            <span className="mailru-fab-icon"><CabinetIcon name="pencil" /></span>
          </button>
        </>
      ) : null}

      {step === "compose" ? (
        <>
          <header className="mailru-mobile-header mailru-mobile-header--compose">
            <button type="button" className="mailru-mobile-back" aria-label={t.backAria} onClick={() => setStep("inbox")}>
              <CabinetIcon name="chevron-left" />
            </button>
            <strong>{t.newMail}</strong>
            <button type="button" className="mailru-mobile-send-icon" onClick={handleSend} disabled={!ready} aria-label={t.sendAria}>
              <CabinetIcon name="send" />
            </button>
          </header>

          {!studentMode ? (
            <div className="mailru-task">{t.taskLabel}: {trainer.task}</div>
          ) : null}

          <div className="mailru-compose-mobile">
            <div className="mailru-mobile-field">
              <label>{t.to}</label>
              <div className="mailru-mobile-chips">
                {trainer.recipientOptions.map((r, i) => (
                  <button
                    key={r.email}
                    type="button"
                    className={`mailru-chip${chosenRecipient === i ? " active" : ""}`}
                    onClick={() => setChosenRecipient(i)}
                    disabled={studentMode}
                  >
                    <span className="mailru-chip-name">{r.name}</span>
                    <span className="mailru-chip-email">{r.email}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mailru-mobile-field">
              <label>{t.subject}</label>
              <input type="text" className="mailru-input" defaultValue={trainer.subjectSuggestion} readOnly />
            </div>

            <div className="mailru-mobile-field">
              <label>{t.body}</label>
              <div className="mailru-mobile-body-options">
                {trainer.bodyOptions.map((b, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`mailru-body-option${chosenBody === i ? " active" : ""}`}
                    onClick={() => setChosenBody(i)}
                    disabled={studentMode}
                  >
                    {b.text}
                  </button>
                ))}
              </div>
            </div>

            {!studentMode ? (
              <button type="button" className="mailru-send" onClick={handleSend} disabled={!ready}>
                {t.send}
              </button>
            ) : null}
          </div>
        </>
      ) : null}

      {step === "sent" ? (
        <div className="mailru-sent">
          <div className="mailru-sent-icon" aria-hidden="true">
            <CabinetIcon name="mail" />
          </div>
          <strong>{t.sentTitle}</strong>
          <p>{t.sentTo(recipient?.name ?? "")}</p>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className={`mailru-trainer${studentMode ? " student-trainer-workspace" : ""}`}>
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
