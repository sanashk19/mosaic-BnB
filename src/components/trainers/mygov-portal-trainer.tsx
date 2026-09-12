"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { MyGovPortalTrainer as MyGovPortalTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: MyGovPortalTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Step = "category" | "service" | "form" | "sms" | "done";
const FLOW: Step[] = ["category", "service", "form", "sms", "done"];
const STEPS = 4;

const CATEGORIES: Array<{ id: string; name: string; icon: LessonItemArtId; correct: boolean }> = [
  { id: "health", name: "Health", icon: "health-category", correct: true },
  { id: "education", name: "Education", icon: "education-category", correct: false },
  { id: "docs", name: "Documents", icon: "document-category", correct: false },
  { id: "taxes", name: "Taxes", icon: "taxes-category", correct: false },
];

const SERVICES = [
  { id: "doctor", name: "Make an appointment with a doctor", correct: true },
  { id: "certificate", name: "Get help", correct: false },
  { id: "vaccine", name: "Sign up for vaccination", correct: false },
];

const TIMES = [
  { id: "9", time: "09:00", note: "Morning", correct: true },
  { id: "11", time: "11:00", note: "Morning" },
  { id: "14", time: "14:00", note: "Day" },
  { id: "17", time: "17:00", note: "Evening" },
];

type Locales<T> = Record<Locale, T>;
const dict: Locales<{
  appTitle: string;
  stepCounter: (n: number) => string;
  taskEyebrow: string;
  questionEyebrow: string;
  hintEyebrow: string;
  feedbackEyebrow: string;
  skip: string;
  finish: string;
  retry: string;
  next: string;
  doneTitle: string;
  doneHint: string;
  context: string;
  questions: Record<Exclude<Step, "done">, string>;
  hints: Record<Exclude<Step, "done">, string>;
  smsPrompt: string;
  confirm: string;
  feedbackGood: string;
  feedbackSoft: string;
}> = {
  ru: {
    appTitle: "my.gov.uz",
    stepCounter: (n) => `Step${n}from${STEPS}`,
    taskEyebrow: "Statement",
    questionEyebrow: "Choose",
    hintEyebrow: "Clue",
    feedbackEyebrow: "Checking",
    skip: "Don't know",
    finish: "Finish",
    retry: "Try again",
    next: "Next",
    doneTitle: "Well done! The application has been submitted.",
    doneHint: "This is how any application is submitted: category → service → form → SMS code.",
    context: "Make an appointment with a doctor through the state portal. You need to select a category, service, time and confirm the code from SMS.",
    questions: {
      category: "What category?",
      service: "What service?",
      form: "For how long?",
      sms: "Confirm SMS code",
    },
    hints: {
      category: "Making an appointment with a doctor is “Health”.",
      service: "Need an appointment with a therapist.",
      form: "Morning time is the best choice.",
      sms: "Enter code 1234 (demo).",
    },
    smsPrompt: "The phone received a 4-digit code. Enter it.",
    confirm: "Confirm",
    feedbackGood: "Right! Let's move on.",
    feedbackSoft: "This doesn't fit. Look again.",
  },
  uz: {
    appTitle: "my.gov.uz",
    stepCounter: (n) => `${n} / ${STEPS}-qadam`,
    taskEyebrow: "Ariza",
    questionEyebrow: "Tanla",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    next: "Davom",
    doneTitle: "Yashasin! Ariza topshirildi.",
    doneHint: "Kategoriya → xizmat → forma → SMS kodi.",
    context: "Davlat portali orqali shifokorga yozil. Kategoriya, xizmat, vaqt va SMS kodi.",
    questions: {
      category: "Qaysi kategoriya?",
      service: "Qaysi xizmat?",
      form: "Qaysi vaqtga?",
      sms: "SMS kodini tasdiqla",
    },
    hints: {
      category: "Shifokorga yozilish — «Salomatlik».",
      service: "Terapevtga yozilish.",
      form: "Ertalabki vaqt yaxshi.",
      sms: "Demo kod: 1234.",
    },
    smsPrompt: "Telefonga 4 raqamli kod keldi. Kirit.",
    confirm: "Tasdiqlash",
    feedbackGood: "Toʻgʻri! Davom.",
    feedbackSoft: "Bu mos emas. Qaytadan koʻr.",
  },
};

export function MyGovPortalTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [step, setStep] = useState<Step>("category");
  const [pickedCat, setPickedCat] = useState<string | null>(null);
  const [pickedSvc, setPickedSvc] = useState<string | null>(null);
  const [pickedTime, setPickedTime] = useState<string | null>(null);
  const [sms, setSms] = useState("");
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = step === "done";
  const stepNum = isDone ? STEPS : FLOW.indexOf(step) + 1;

  function chooseCat(id: string, correct: boolean) {
    if (feedback) return;
    setPickedCat(id);
    answers.current.category = { id, correct };
    setFeedback(correct ? "good" : "soft");
  }
  function chooseSvc(id: string, correct: boolean) {
    if (feedback) return;
    setPickedSvc(id);
    answers.current.service = { id, correct };
    setFeedback(correct ? "good" : "soft");
  }
  function chooseTime(id: string, correct: boolean) {
    if (feedback) return;
    setPickedTime(id);
    answers.current.time = { id, correct };
    setFeedback(correct ? "good" : "soft");
  }
  function confirmSms() {
    if (feedback || sms.length !== 4) return;
    const ok = sms === "1234";
    answers.current.sms = { value: sms, correct: ok };
    setFeedback(ok ? "good" : "soft");
  }

  function advance() {
    const i = FLOW.indexOf(step);
    setStep(FLOW[Math.min(i + 1, FLOW.length - 1)]);
    setFeedback(null);
  }
  function retry() {
    setFeedback(null);
    if (step === "category") setPickedCat(null);
    if (step === "service") setPickedSvc(null);
    if (step === "form") setPickedTime(null);
    if (step === "sms") setSms("");
  }
  function skip() { answers.current[`skip-${step}`] = true; advance(); }
  function finish() { onDone({ correct: true }); }

  void trainer;

  let body: ReactNode;
  if (isDone) {
    body = (
      <div className="gov-app gov-app--done">
        <div className="outfit-done-tick" aria-hidden="true">
          <CabinetIcon name="check" />
        </div>
        <strong>{t.doneTitle}</strong>
        <p>{t.doneHint}</p>
      </div>
    );
  } else {
    body = (
      <div className="gov-app">
        <div className="gov-app-header">
          <LessonItemArt id="mygov-portal-screen-realistic" size={72} className="gov-portal-preview" />
          <div>
            <strong>my.gov.uz</strong>
            <small>{t.appTitle}</small>
          </div>
        </div>

        {step === "category" ? (
          <div className="gov-categories">
            {CATEGORIES.map((c) => (
              <button key={c.id} type="button" className={`gov-category${pickedCat === c.id ? " gov-category--picked" : ""}`} onClick={() => chooseCat(c.id, c.correct)} disabled={Boolean(feedback)}>
                <span className="gov-category-icon" aria-hidden="true">
                  <LessonItemArt id={c.icon} size={46} />
                </span>
                <strong>{c.name}</strong>
              </button>
            ))}
          </div>
        ) : null}

        {step === "service" ? (
          <div className="gov-services">
            {SERVICES.map((s) => (
              <button key={s.id} type="button" className={`gov-service${pickedSvc === s.id ? " gov-service--picked" : ""}`} onClick={() => chooseSvc(s.id, s.correct)} disabled={Boolean(feedback)}>
                <strong>{s.name}</strong>
                <small>›</small>
              </button>
            ))}
          </div>
        ) : null}

        {step === "form" ? (
          <div className="gov-times">
            {TIMES.map((tm) => (
              <button key={tm.id} type="button" className={`gov-time${pickedTime === tm.id ? " gov-time--picked" : ""}`} onClick={() => chooseTime(tm.id, !!tm.correct)} disabled={Boolean(feedback)}>
                <strong>{tm.time}</strong>
                <small>{tm.note}</small>
              </button>
            ))}
          </div>
        ) : null}

        {step === "sms" ? (
          <div className="gov-sms">
            <LessonItemArt id="sms-code-phone" size={74} />
            <p>{t.smsPrompt}</p>
            <div className="gov-sms-inputs">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={sms[i] ?? ""}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 1);
                    setSms((cur) => {
                      const arr = cur.split("");
                      arr[i] = v;
                      return arr.join("").slice(0, 4);
                    });
                  }}
                  disabled={Boolean(feedback)}
                />
              ))}
            </div>
            <button type="button" className="gov-sms-submit" onClick={confirmSms} disabled={sms.length !== 4 || Boolean(feedback)}>{t.confirm}</button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="morning-quest-trainer gov-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark gov-topbar-mark" aria-hidden="true">
            <LessonItemArt id="mygov-portal-screen-realistic" size={30} />
          </span>
          <div>
            <strong>{t.appTitle}</strong>
            <small>{t.stepCounter(stepNum)}</small>
          </div>
        </div>
        <div className="mq-topbar-progress" aria-hidden="true">
          {Array.from({ length: STEPS }).map((_, i) => (
            <span key={i} className={`mq-topbar-dot${stepNum > i + 1 || isDone ? " mq-topbar-dot--done" : ""}${stepNum === i + 1 && !isDone ? " mq-topbar-dot--current" : ""}`} />
          ))}
        </div>
      </header>

      <div className="mq-shell">
        <div className="mq-phone-col">
          <div className={`mq-phone mq-phone--gov-${step}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">09:0{stepNum}</span>
              <span className="mq-phone-island" aria-hidden="true" />
              <span className="mq-phone-status-icons" aria-hidden="true">
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                  <rect x="0" y="7" width="2.5" height="4" rx="0.5" fill="currentColor" />
                  <rect x="3.5" y="5" width="2.5" height="6" rx="0.5" fill="currentColor" />
                  <rect x="7" y="3" width="2.5" height="8" rx="0.5" fill="currentColor" />
                  <rect x="10.5" y="0" width="2.5" height="11" rx="0.5" fill="currentColor" />
                </svg>
                <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
                  <rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke="currentColor" fill="none" />
                  <rect x="2" y="2" width="14" height="7" rx="1" fill="currentColor" />
                  <rect x="19.5" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor" />
                </svg>
              </span>
            </div>
            <div className="mq-phone-content">{body}</div>
            <div className="mq-phone-home" aria-hidden="true" />
          </div>
        </div>

        <aside className="mq-panel">
          <div className="mq-panel-task">
            <span className="mq-eyebrow">{t.taskEyebrow}</span>
            <p className="mq-panel-task-text">{t.context}</p>
          </div>

          {!isDone && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{t.questions[step]}</h3>
            </div>
          ) : null}

          {feedback ? (
            <div className={`outfit-feedback outfit-feedback--${feedback}`}>
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{feedback === "good" ? t.feedbackGood : t.feedbackSoft}</p>
              <div className="outfit-feedback-actions">
                {feedback === "good" ? (
                  <button type="button" className="mq-panel-primary" onClick={advance}>{step === "sms" ? t.finish : t.next}</button>
                ) : (
                  <button type="button" className="mq-panel-primary outfit-retry" onClick={retry}>{t.retry}</button>
                )}
              </div>
            </div>
          ) : !isDone ? (
            <div className="mq-panel-hint">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>{t.hints[step]}</p>
            </div>
          ) : null}

          <div className="mq-panel-footer">
            {isDone ? (
              <button type="button" className="mq-panel-primary" onClick={finish}>{t.finish}</button>
            ) : !feedback ? (
              <button type="button" className="mq-panel-skip" onClick={skip}>{t.skip}</button>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
