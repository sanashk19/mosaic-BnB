"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { StudentTaskPanel } from "@/components/student-task-panel";
import { TrainerFeedbackOverlay } from "@/components/trainers/trainer-feedback-overlay";
import { CabinetIcon } from "@/components/ui-icons";
import type { PhoneTrainer as PhoneTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: PhoneTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Step = "dial" | "calling" | "done";
type Tab = "favorites" | "recents" | "contacts" | "keypad";

type ContactItem = { name: string; number: string; group?: string };
type RecentItem = { name: string; number: string; when: string; missed?: boolean };

const defaultContactsByLocale: Record<Locale, ContactItem[]> = {
  ru: [
    { name: "Мама", number: "998901234567", group: "Семья" },
    { name: "Папа", number: "998937776655", group: "Семья" },
    { name: "Бабушка", number: "998712345678", group: "Семья" },
    { name: "Учитель Ольга Сергеевна", number: "998901112233", group: "Школа" },
    { name: "Скорая помощь", number: "103", group: "Экстренные" },
    { name: "Полиция", number: "102", group: "Экстренные" },
    { name: "Пожарная", number: "101", group: "Экстренные" },
    { name: "Газовая служба", number: "104", group: "Экстренные" },
  ],
  uz: [
    { name: "Oyim", number: "998901234567", group: "Oila" },
    { name: "Dadam", number: "998937776655", group: "Oila" },
    { name: "Buvim", number: "998712345678", group: "Oila" },
    { name: "Olga Sergeevna oʻqituvchi", number: "998901112233", group: "Maktab" },
    { name: "Tez yordam", number: "103", group: "Favqulodda" },
    { name: "Politsiya", number: "102", group: "Favqulodda" },
    { name: "Yongʻin xizmati", number: "101", group: "Favqulodda" },
    { name: "Gaz xizmati", number: "104", group: "Favqulodda" },
  ],
};

const defaultRecentsByLocale: Record<Locale, RecentItem[]> = {
  ru: [
    { name: "Мама", number: "998901234567", when: "сегодня · 14:02" },
    { name: "Неизвестный номер", number: "+1 415 555 0123", when: "сегодня · 11:45", missed: true },
    { name: "Учитель Ольга Сергеевна", number: "998901112233", when: "вчера · 15:30" },
    { name: "Папа", number: "998937776655", when: "вчера · 09:10" },
  ],
  uz: [
    { name: "Oyim", number: "998901234567", when: "bugun · 14:02" },
    { name: "Notanish raqam", number: "+1 415 555 0123", when: "bugun · 11:45", missed: true },
    { name: "Olga Sergeevna oʻqituvchi", number: "998901112233", when: "kecha · 15:30" },
    { name: "Dadam", number: "998937776655", when: "kecha · 09:10" },
  ],
};

function formatDialed(value: string): string {
  if (!value) return "";
  if (value.length <= 3) return value;
  if (value.length <= 4) return value;
  // Like +998 90 123 4567
  if (value.startsWith("998")) {
    return `+${value.slice(0, 3)} ${value.slice(3, 5)} ${value.slice(5, 8)} ${value.slice(8, 10)} ${value.slice(10)}`.trim();
  }
  return value;
}

const dict = {
  ru: {
    timeNow: "09:42",
    appTitle: "Телефон",
    taskLabel: "Задание:",
    dialPlaceholder: "Набери номер",
    contactPlaceholder: "Выбери контакт",
    tabFavorites: "Избранное",
    tabRecents: "Недавние",
    tabContacts: "Контакты",
    tabKeypad: "Клавиши",
    deleteAria: "Удалить",
    callingStatus: "идёт вызов",
    callerEmergency: {
      "103": "Скорая помощь",
      "102": "Полиция",
      "101": "Пожарная",
    } as Record<string, string>,
    doneTitle: "Связь установлена",
    doneHint: "Говори спокойно: что случилось и где ты находишься.",
    panelTitle: "Набери номер",
    panelQuestion: "Что нужно сделать на телефоне?",
    callingStatusPanel: "Идёт звонок.",
    doneStatusPanel: "Связь установлена.",
    dialedStatus: (n: string) => `Набрано: ${n}`,
    notDialedStatus: "Номер еще не набран.",
    hint: (n: string) => `Нужный номер: ${n}. Открой Контакты или набери на клавишах.`,
    feedbackCorrect: "Правильно",
    feedbackSoft: "Давай попробуем еще раз",
    next: "Дальше",
    retry: "Попробовать еще",
    note1: "Найди в Контактах или набери на клавишах.",
    note2: "Нажми зелёную кнопку звонка.",
    overlayGood: "Молодец!",
    overlaySoft: "Не тот номер",
    continue: "Продолжить",
    retryOverlay: "Попробовать ещё",
    emergencyGroup: "Экстренные",
    familyGroup: "Семья",
  },
  uz: {
    timeNow: "09:42",
    appTitle: "Telefon",
    taskLabel: "Topshiriq:",
    dialPlaceholder: "Raqamni ter",
    contactPlaceholder: "Kontaktni tanla",
    tabFavorites: "Saralangan",
    tabRecents: "Soʻnggi",
    tabContacts: "Kontaktlar",
    tabKeypad: "Klaviatura",
    deleteAria: "Oʻchirish",
    callingStatus: "qoʻngʻiroq qilinmoqda",
    callerEmergency: {
      "103": "Tez yordam",
      "102": "Politsiya",
      "101": "Yongʻin xizmati",
    } as Record<string, string>,
    doneTitle: "Aloqa oʻrnatildi",
    doneHint: "Xotirjam gapir: nima boʻldi va sen qayerdasan.",
    panelTitle: "Raqamni ter",
    panelQuestion: "Telefonda nima qilish kerak?",
    callingStatusPanel: "Qoʻngʻiroq qilinmoqda.",
    doneStatusPanel: "Aloqa oʻrnatildi.",
    dialedStatus: (n: string) => `Terilgan: ${n}`,
    notDialedStatus: "Raqam hali terilmagan.",
    hint: (n: string) => `Kerakli raqam: ${n}. Kontaktlarni och yoki klaviaturadan ter.`,
    feedbackCorrect: "Toʻgʻri",
    feedbackSoft: "Yana urinib koʻraylik",
    next: "Davom etish",
    retry: "Yana urinib koʻrish",
    note1: "Kontaktlardan top yoki klaviaturadan ter.",
    note2: "Yashil qoʻngʻiroq tugmasini bos.",
    overlayGood: "Barakalla!",
    overlaySoft: "Notoʻgʻri raqam",
    continue: "Davom etish",
    retryOverlay: "Yana urinib koʻrish",
    emergencyGroup: "Favqulodda",
    familyGroup: "Oila",
  },
} as const;

export function PhoneTrainer({ trainer, onDone, studentMode = false }: Props) {
  const locale = useLocale();
  const t = dict[locale];
  const defaultContacts = defaultContactsByLocale[locale];
  const defaultRecents = defaultRecentsByLocale[locale];
  const [dialed, setDialed] = useState("");
  const [step, setStep] = useState<Step>("dial");
  const [tab, setTab] = useState<Tab>("keypad");
  const [feedback, setFeedback] = useState<string | null>(null);

  const keys: { num: string; letters: string }[] = [
    { num: "1", letters: "" },
    { num: "2", letters: "ABC" },
    { num: "3", letters: "DEF" },
    { num: "4", letters: "GHI" },
    { num: "5", letters: "JKL" },
    { num: "6", letters: "MNO" },
    { num: "7", letters: "PQRS" },
    { num: "8", letters: "TUV" },
    { num: "9", letters: "WXYZ" },
    { num: "*", letters: "" },
    { num: "0", letters: "+" },
    { num: "#", letters: "" },
  ];

  function press(d: string) {
    if (step !== "dial") return;
    if (dialed.length < 15) setDialed((v) => v + d);
  }

  function backspace() {
    setDialed((v) => v.slice(0, -1));
  }

  function call(numberOverride?: string) {
    const numToCall = numberOverride ?? dialed;
    if (!numToCall) return;
    setDialed(numToCall);
    const correct = numToCall === trainer.correctNumber;
    if (correct) {
      setStep("calling");
      setTimeout(() => {
        setStep("done");
        setFeedback(trainer.feedbackCorrect);
      }, 1800);
    } else {
      setFeedback(trainer.feedbackWrong);
    }
  }

  function reset() {
    setDialed("");
    setFeedback(null);
    setStep("dial");
  }

  const correct = dialed === trainer.correctNumber;

  const dialer = (
    <div className="phone-frame">
      {/* Status bar */}
      <div className="phone-status">
        <span>{t.timeNow}</span>
        <span className="phone-status-icons" aria-hidden="true">
          <CabinetIcon name="signal" />
          <span>4G</span>
          <CabinetIcon name="battery" />
        </span>
      </div>

      {/* Header with title */}
      {step === "dial" ? (
        <div className="phone-app-header">
          <strong>{t.appTitle}</strong>
        </div>
      ) : null}

      {!studentMode && step === "dial" ? (
        <div className="phone-task">
          <strong>{t.taskLabel}</strong> {trainer.task}
        </div>
      ) : null}

      {/* Dial mode with tabs */}
      {step === "dial" ? (
        <>
          {/* Display */}
          <div className="phone-display">
            {dialed
              ? <span className="phone-display-num">{formatDialed(dialed)}</span>
              : <span className="phone-placeholder">{tab === "keypad" ? t.dialPlaceholder : t.contactPlaceholder}</span>}
          </div>

          {/* Tabs */}
          <div className="phone-tabs">
            <button type="button" className={`phone-tab${tab === "favorites" ? " active" : ""}`} onClick={() => setTab("favorites")}>
              <CabinetIcon name="star-filled" />
              <small>{t.tabFavorites}</small>
            </button>
            <button type="button" className={`phone-tab${tab === "recents" ? " active" : ""}`} onClick={() => setTab("recents")}>
              <CabinetIcon name="clock" />
              <small>{t.tabRecents}</small>
            </button>
            <button type="button" className={`phone-tab${tab === "contacts" ? " active" : ""}`} onClick={() => setTab("contacts")}>
              <CabinetIcon name="users" />
              <small>{t.tabContacts}</small>
            </button>
            <button type="button" className={`phone-tab${tab === "keypad" ? " active" : ""}`} onClick={() => setTab("keypad")}>
              <CabinetIcon name="keypad" />
              <small>{t.tabKeypad}</small>
            </button>
          </div>

          {/* Tab content */}
          {tab === "keypad" ? (
            <>
              <div className="phone-keypad">
                {keys.map((k) => (
                  <button
                    key={k.num}
                    type="button"
                    className="phone-key"
                    onClick={() => press(k.num)}
                  >
                    <span className="phone-key-num">{k.num}</span>
                    {k.letters ? <span className="phone-key-letters">{k.letters}</span> : null}
                  </button>
                ))}
              </div>
              <div className="phone-actions">
                <span className="phone-actions-spacer" />
                <button
                  type="button"
                  className="phone-call"
                  onClick={() => call()}
                  disabled={!dialed}
                >
                  <CabinetIcon name="phone" />
                </button>
                <button
                  type="button"
                  className="phone-key-back"
                  onClick={backspace}
                  aria-label={t.deleteAria}
                  disabled={!dialed}
                >
                  ⌫
                </button>
              </div>
            </>
          ) : null}

          {tab === "recents" ? (
            <div className="phone-list">
              {defaultRecents.map((r, i) => (
                <button
                  key={i}
                  type="button"
                  className={`phone-list-item${r.missed ? " missed" : ""}`}
                  onClick={() => call(r.number)}
                >
                  <span className="phone-list-arrow" aria-hidden="true">↓</span>
                  <div className="phone-list-info">
                    <strong>{r.name}</strong>
                    <small>{r.when} · {formatDialed(r.number)}</small>
                  </div>
                  <span className="phone-list-call" aria-hidden="true">
                    <CabinetIcon name="phone" />
                  </span>
                </button>
              ))}
            </div>
          ) : null}

          {tab === "contacts" ? (
            <div className="phone-list">
              {defaultContacts.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  className="phone-list-item"
                  onClick={() => call(c.number)}
                >
                  <span className="phone-list-avatar" aria-hidden="true">{c.name[0]}</span>
                  <div className="phone-list-info">
                    <strong>{c.name}</strong>
                    <small>{c.group ?? ""} · {formatDialed(c.number)}</small>
                  </div>
                  <span className="phone-list-call" aria-hidden="true">
                    <CabinetIcon name="phone" />
                  </span>
                </button>
              ))}
            </div>
          ) : null}

          {tab === "favorites" ? (
            <div className="phone-list">
              {defaultContacts.filter((c) => c.group === t.emergencyGroup || c.group === t.familyGroup).slice(0, 4).map((c, i) => (
                <button
                  key={i}
                  type="button"
                  className="phone-list-item phone-list-item--star"
                  onClick={() => call(c.number)}
                >
                  <span className="phone-list-avatar phone-list-avatar--star" aria-hidden="true">
                    <CabinetIcon name="star-filled" />
                  </span>
                  <div className="phone-list-info">
                    <strong>{c.name}</strong>
                    <small>{formatDialed(c.number)}</small>
                  </div>
                  <span className="phone-list-call" aria-hidden="true">
                    <CabinetIcon name="phone" />
                  </span>
                </button>
              ))}
            </div>
          ) : null}
        </>
      ) : null}

      {step === "calling" ? (
        <div className="phone-calling">
          <div className="phone-calling-avatar">
            {dialed === "103" || dialed === "102" || dialed === "101" || dialed === "104"
              ? <CabinetIcon name="alert" />
              : <CabinetIcon name="user" />}
          </div>
          <strong className="phone-calling-name">
            {t.callerEmergency[dialed] ?? defaultContacts.find((c) => c.number === dialed)?.name ?? formatDialed(dialed)}
          </strong>
          <p className="phone-calling-number">{formatDialed(dialed)}</p>
          <p className="phone-calling-status">
            <span className="phone-calling-dot" />
            {t.callingStatus}
          </p>
          <p className="phone-calling-hint">{trainer.description}</p>
          <button type="button" className="phone-call phone-call--end" disabled>
            <CabinetIcon name="phone" />
          </button>
        </div>
      ) : null}

      {step === "done" ? (
        <div className="phone-done">
          <div className="phone-done-icon">
            <CabinetIcon name="check" />
          </div>
          <strong>{t.doneTitle}</strong>
          <p>{t.doneHint}</p>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className={`phone-trainer${studentMode ? " student-trainer-workspace" : ""}`}>
      {studentMode ? <div className="student-trainer-surface">{dialer}</div> : dialer}

      {studentMode ? (
        <StudentTaskPanel
          title={t.panelTitle}
          instruction={trainer.task}
          question={t.panelQuestion}
          status={
            step === "calling"
              ? t.callingStatusPanel
              : step === "done"
                ? t.doneStatusPanel
                : dialed
                  ? t.dialedStatus(formatDialed(dialed))
                  : t.notDialedStatus
          }
          hint={t.hint(formatDialed(trainer.correctNumber))}
          feedback={
            feedback
              ? {
                  tone: correct ? "good" : "soft",
                  title: correct ? t.feedbackCorrect : t.feedbackSoft,
                  text: feedback,
                }
              : null
          }
          primaryAction={
            feedback && step !== "calling"
              ? {
                  label: correct ? t.next : t.retry,
                  onClick: () => {
                    if (correct) onDone({ correct: true });
                    else reset();
                  },
                }
              : undefined
          }
        >
          <div className="student-task-phone-note">
            <span>1</span>
            <p>{t.note1}</p>
            <span>2</span>
            <p>{t.note2}</p>
          </div>
        </StudentTaskPanel>
      ) : null}

      {feedback && step !== "calling" && !studentMode ? (
        <TrainerFeedbackOverlay
          tone={correct ? "good" : "soft"}
          title={correct ? t.overlayGood : t.overlaySoft}
          text={feedback}
          actionLabel={correct ? t.continue : t.retryOverlay}
          onAction={() => {
            if (correct) onDone({ correct: true });
            else reset();
          }}
        />
      ) : null}
    </div>
  );
}
