"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { PhoneCallFlowTrainer as PhoneCallFlowTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: PhoneCallFlowTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type CaseKey = "incoming-mom" | "outgoing-emergency" | "unknown-caller";
type Stage = CaseKey | "done";
const FLOW: Stage[] = ["incoming-mom", "outgoing-emergency", "unknown-caller", "done"];
const STEPS = 3;

type Action = "answer" | "decline" | "dial-103" | "dial-mom" | "block";

const CORRECT: Record<CaseKey, Action> = {
  "incoming-mom": "answer",
  "outgoing-emergency": "dial-103",
  "unknown-caller": "decline",
};

const ACTIONS_PER_CASE: Record<CaseKey, Action[]> = {
  "incoming-mom": ["answer", "decline"],
  "outgoing-emergency": ["dial-103", "dial-mom", "block"],
  "unknown-caller": ["answer", "decline", "block"],
};

const CASE_ART: Record<CaseKey, LessonItemArtId> = {
  "incoming-mom": "contact-mom-realistic",
  "outgoing-emergency": "ambulance",
  "unknown-caller": "unknown-caller-realistic",
};

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
  actions: Record<Action, { name: string; sub: string }>;
  cases: Record<CaseKey, { context: string; question: string; hint: string; feedbackGood: string; feedbackSoft: string; caller: string; phone: string; mode: "incoming" | "outgoing" | "unknown" }>;
}> = {
  ru: {
    appTitle: "Phone call",
    stepCounter: (n) => `Situation${n}from${STEPS}`,
    taskEyebrow: "Situation",
    questionEyebrow: "What to do",
    hintEyebrow: "Clue",
    feedbackEyebrow: "Checking",
    skip: "Don't know",
    finish: "Finish",
    retry: "Try again",
    next: "Next situation",
    doneTitle: "Well done! You know how to handle a phone.",
    doneHint: "Mom - answer; in an emergency - 103; to a stranger - reject.",
    actions: {
      answer: { name: "Answer", sub: "pick up the phone" },
      decline: { name: "Reject", sub: "don't talk" },
      "dial-103": { name: "Dial 103", sub: "call an ambulance" },
      "dial-mom": { name: "Call mom", sub: "mom first" },
      block: { name: "Block", sub: "add to block" },
    },
    cases: {
      "incoming-mom": {
        context: "Mom is calling. She wants to know how you are doing.",
        question: "What to do?",
        hint: "Always answer your mom - she’s worried.",
        feedbackGood: "Right. It is necessary to answer mom.",
        feedbackSoft: "Mom can't be rejected. She's worried.",
        caller: "Mother",
        phone: "+998 90 123 45 67",
        mode: "incoming",
      },
      "outgoing-emergency": {
        context: "A man on the street feels bad and needs urgent help.",
        question: "Who should I call?",
        hint: "Ambulance - 103. This is a toll-free number.",
        feedbackGood: "Right. 103 - ambulance, help.",
        feedbackSoft: "It won't help. Need an ambulance - 103.",
        caller: "Urgently need help",
        phone: "103",
        mode: "outgoing",
      },
      "unknown-caller": {
        context: "They are calling from an unknown number. The voice asks for a code from SMS.",
        question: "What to do?",
        hint: "Never tell a stranger the code. Reject.",
        feedbackGood: "Right. Do not give the code to a stranger - reject it.",
        feedbackSoft: "It is dangerous to answer a stranger. Reject is the best choice.",
        caller: "Unknown number",
        phone: "+1 415 555 0188",
        mode: "unknown",
      },
    },
  },
  uz: {
    appTitle: "Telefon qoʻngʻirogʻi",
    stepCounter: (n) => `${n} / ${STEPS}-vaziyat`,
    taskEyebrow: "Vaziyat",
    questionEyebrow: "Nima qilish",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    next: "Keyingi vaziyat",
    doneTitle: "Yashasin! Sen telefondan toʻgʻri foydalanasan.",
    doneHint: "Oyiga — javob; favqulodda — 103; notanish — rad.",
    actions: {
      answer: { name: "Javob berish", sub: "trubkani olish" },
      decline: { name: "Rad etish", sub: "gaplashmaslik" },
      "dial-103": { name: "103 ni terish", sub: "tez yordam" },
      "dial-mom": { name: "Oyiga qoʻngʻiroq", sub: "avval oyiga" },
      block: { name: "Bloklash", sub: "qora roʻyxat" },
    },
    cases: {
      "incoming-mom": {
        context: "Oyim qoʻngʻiroq qilyapti.",
        question: "Nima qilish?",
        hint: "Oyiga doim javob ber.",
        feedbackGood: "Toʻgʻri. Oyiga javob berish kerak.",
        feedbackSoft: "Oyini rad qilib boʻlmaydi.",
        caller: "Oyim",
        phone: "+998 90 123 45 67",
        mode: "incoming",
      },
      "outgoing-emergency": {
        context: "Koʻchada odamga yomon, tez yordam kerak.",
        question: "Kimga qoʻngʻiroq qilasan?",
        hint: "Tez yordam — 103.",
        feedbackGood: "Toʻgʻri. 103 — tez yordam.",
        feedbackSoft: "Bu yordam bermaydi. 103 kerak.",
        caller: "Tez yordam kerak",
        phone: "103",
        mode: "outgoing",
      },
      "unknown-caller": {
        context: "Notanish raqamdan qoʻngʻiroq, SMS kodi soʻrayapti.",
        question: "Nima qilish?",
        hint: "Notanishga kodni hech qachon aytma.",
        feedbackGood: "Toʻgʻri. Notanishga kod bermaslik kerak.",
        feedbackSoft: "Notanishga javob berish xavfli.",
        caller: "Notanish raqam",
        phone: "+1 415 555 0188",
        mode: "unknown",
      },
    },
  },
};

export function PhoneCallFlowTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [stage, setStage] = useState<Stage>("incoming-mom");
  const [picked, setPicked] = useState<Action | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stage === "done";
  const step = isDone ? STEPS : FLOW.indexOf(stage) + 1;
  const c = isDone ? null : t.cases[stage as CaseKey];
  const actions = isDone ? [] : ACTIONS_PER_CASE[stage as CaseKey];

  function tap(a: Action) {
    if (feedback) return;
    setPicked(a);
    const ok = a === CORRECT[stage as CaseKey];
    answers.current[`call-${stage}`] = { picked: a, correct: ok };
    setFeedback(ok ? "good" : "soft");
  }

  function advance() {
    const i = FLOW.indexOf(stage);
    setStage(FLOW[Math.min(i + 1, FLOW.length - 1)]);
    setPicked(null);
    setFeedback(null);
  }
  function retry() { setFeedback(null); setPicked(null); }
  function skip() { answers.current[`skip-${stage}`] = true; advance(); }
  function finish() { onDone({ correct: true }); }

  void trainer;

  const scene: ReactNode = isDone ? (
    <div className="callflow-app callflow-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : c ? (
    <div className={`callflow-app callflow-app--${c.mode}`}>
      <div className="callflow-status">
        {c.mode === "incoming" ? "Incoming call" : c.mode === "unknown" ? "Call · Unknown" : "Urgent call"}
      </div>
      <div className="callflow-avatar" aria-hidden="true">
        <LessonItemArt id={CASE_ART[stage as CaseKey]} size={76} />
      </div>
      <strong className="callflow-caller">{c.caller}</strong>
      <small className="callflow-phone">{c.phone}</small>

      {c.mode === "incoming" ? (
        <div className="callflow-quickaction" aria-hidden="true">
          <span className="callflow-ring" />
          <span className="callflow-ring callflow-ring--delay" />
        </div>
      ) : null}
    </div>
  ) : null;

  return (
    <div className="morning-quest-trainer callflow-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark callflow-topbar-mark" aria-hidden="true">
            <CabinetIcon name="phone" />
          </span>
          <div>
            <strong>{t.appTitle}</strong>
            <small>{t.stepCounter(step)}</small>
          </div>
        </div>
        <div className="mq-topbar-progress" aria-hidden="true">
          {Array.from({ length: STEPS }).map((_, i) => (
            <span key={i} className={`mq-topbar-dot${step > i + 1 || isDone ? " mq-topbar-dot--done" : ""}${step === i + 1 && !isDone ? " mq-topbar-dot--current" : ""}`} />
          ))}
        </div>
      </header>

      <div className="mq-shell">
        <div className="mq-phone-col">
          <div className={`mq-phone mq-phone--callflow-${stage}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">12:0{step}</span>
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
            <div className="mq-phone-content">{scene}</div>
            <div className="mq-phone-home" aria-hidden="true" />
          </div>
        </div>

        <aside className="mq-panel">
          <div className="mq-panel-task">
            <span className="mq-eyebrow">{t.taskEyebrow}</span>
            <p className="mq-panel-task-text">{c ? c.context : t.doneHint}</p>
          </div>

          {c && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{c.question}</h3>
              <div className="mq-panel-options">
                {actions.map((a, i) => (
                  <button key={a} type="button" className={`mq-panel-option${picked === a ? " mq-panel-option--picked" : ""}`} onClick={() => tap(a)}>
                    <span className="mq-panel-option-num">{i + 1}</span>
                    <span className="mq-panel-option-body">
                      <strong>{t.actions[a].name}</strong>
                      <small>{t.actions[a].sub}</small>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {feedback && c ? (
            <div className={`outfit-feedback outfit-feedback--${feedback}`}>
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{feedback === "good" ? c.feedbackGood : c.feedbackSoft}</p>
              <div className="outfit-feedback-actions">
                {feedback === "good" ? (
                  <button type="button" className="mq-panel-primary" onClick={advance}>{stage === "unknown-caller" ? t.finish : t.next}</button>
                ) : (
                  <button type="button" className="mq-panel-primary outfit-retry" onClick={retry}>{t.retry}</button>
                )}
              </div>
            </div>
          ) : c ? (
            <div className="mq-panel-hint">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>{c.hint}</p>
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
