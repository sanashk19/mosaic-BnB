"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { ThermometerTrainer as ThermometerTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: ThermometerTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Case = "norm" | "fever" | "high-fever";
type Stage = Case | "done";
const FLOW: Stage[] = ["norm", "fever", "high-fever", "done"];
const STEPS = 3;

type Action = "all-good" | "tea-rest" | "call-adult" | "call-doctor";

const TEMP: Record<Case, number> = { norm: 36.6, fever: 38.2, "high-fever": 39.5 };
const CORRECT: Record<Case, Action> = {
  norm: "all-good",
  fever: "tea-rest",
  "high-fever": "call-doctor",
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
  next: string;
  retry: string;
  measure: string;
  measuring: string;
  doneTitle: string;
  doneHint: string;
  actions: Record<Action, { name: string; sub: string }>;
  cases: Record<Case, { context: string; question: string; hint: string; feedbackGood: string; feedbackSoft: string }>;
}> = {
  ru: {
    appTitle: "Digital thermometer",
    stepCounter: (n) => `Measurement${n}from${STEPS}`,
    taskEyebrow: "Measurement",
    questionEyebrow: "What to do",
    hintEyebrow: "Clue",
    feedbackEyebrow: "Checking",
    skip: "Don't know",
    finish: "Finish",
    next: "Next dimension",
    retry: "Try again",
    measure: "Measure",
    measuring: "We measure...",
    doneTitle: "Well done! You know how to read a thermometer.",
    doneHint: "The norm is about 36.6. Above 37.5 - rest. Above 38.5 - call an adult, doctor.",
    actions: {
      "all-good": { name: "It's okay", sub: "temperature is normal" },
      "tea-rest": { name: "Tea and relaxation", sub: "lie down, have a warm drink" },
      "call-adult": { name: "Call an adult", sub: "parent or teacher" },
      "call-doctor": { name: "Call a doctor", sub: "this is already a high temperature" },
    },
    cases: {
      norm: {
        context: "In the morning you take your temperature before school.",
        question: "Temperature 36.6. What to do?",
        hint: "36.6 is the norm. You can go to school.",
        feedbackGood: "Right. 36.6 is the norm, everything is fine.",
        feedbackSoft: "At 36.6 - this is the norm, nothing needs to be done.",
      },
      fever: {
        context: "You feel tired. My head hurts a little.",
        question: "Temperature 38.2. What to do?",
        hint: "From 37.5 to 38.5 - rest, warm drink, tell parents.",
        feedbackGood: "Right. 38.2 - rest, tea. Tell your parents.",
        feedbackSoft: "38.2 is already a temperature. You can't go outside. Rest and tea.",
      },
      "high-fever": {
        context: "You feel bad, you are shaking, your head hurts a lot.",
        question: "Temperature 39.5. What to do?",
        hint: "Above 38.5, be sure to tell an adult and call a doctor.",
        feedbackGood: "Right. 39.5 is a lot. Need a doctor.",
        feedbackSoft: "39.5 - high temperature. You need to call a doctor.",
      },
    },
  },
  uz: {
    appTitle: "Raqamli termometr",
    stepCounter: (n) => `${n} / ${STEPS}-oʻlchov`,
    taskEyebrow: "Oʻlchash",
    questionEyebrow: "Nima qilish",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    next: "Keyingi oʻlchov",
    retry: "Qayta urinish",
    measure: "Oʻlchash",
    measuring: "Oʻlchayapmiz…",
    doneTitle: "Yashasin! Sen termometrni oʻqishni oʻrganding.",
    doneHint: "Norma — 36.6. 37.5 dan yuqori — dam. 38.5 dan yuqori — shifokor.",
    actions: {
      "all-good": { name: "Hammasi yaxshi", sub: "harorat normal" },
      "tea-rest": { name: "Choy va dam", sub: "yotib, iliq ichish" },
      "call-adult": { name: "Kattalarni chaqirish", sub: "ota-onaga aytish" },
      "call-doctor": { name: "Shifokor chaqirish", sub: "haroratlik yuqori" },
    },
    cases: {
      norm: {
        context: "Ertalab maktab oldidan harorat oʻlchayapsan.",
        question: "Harorat 36.6. Nima qilish kerak?",
        hint: "36.6 — norma. Maktabga borish mumkin.",
        feedbackGood: "Toʻgʻri. 36.6 — norma.",
        feedbackSoft: "36.6 da hech narsa qilmaslik kerak — bu norma.",
      },
      fever: {
        context: "Charchadingmi, kallani ozgina ogʻriydi.",
        question: "Harorat 38.2. Nima qilish kerak?",
        hint: "37.5 dan 38.5 gacha — dam, iliq ichimlik, ota-onaga aytish.",
        feedbackGood: "Toʻgʻri. 38.2 — dam, choy. Ota-onaga ayt.",
        feedbackSoft: "38.2 — harorat bor. Koʻchaga chiqib boʻlmaydi.",
      },
      "high-fever": {
        context: "Holating yomon, titramoqdasan.",
        question: "Harorat 39.5. Nima qilish kerak?",
        hint: "38.5 dan yuqori — kattaga aytish va shifokor chaqirish.",
        feedbackGood: "Toʻgʻri. 39.5 — yuqori. Shifokor kerak.",
        feedbackSoft: "39.5 — juda yuqori. Shifokor chaqirish kerak.",
      },
    },
  },
};

const ACTIONS_PER_CASE: Record<Case, Action[]> = {
  norm: ["all-good", "tea-rest", "call-doctor"],
  fever: ["all-good", "tea-rest", "call-doctor"],
  "high-fever": ["tea-rest", "call-adult", "call-doctor"],
};

export function ThermometerTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [stage, setStage] = useState<Stage>("norm");
  const [reading, setReading] = useState<"idle" | "measuring" | "done">("idle");
  const [picked, setPicked] = useState<Action | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stage === "done";
  const step = isDone ? STEPS : FLOW.indexOf(stage) + 1;
  const sit = isDone ? null : t.cases[stage as Case];
  const temp = isDone ? null : TEMP[stage as Case];
  const actions = isDone ? [] : ACTIONS_PER_CASE[stage as Case];

  function measure() {
    if (reading !== "idle") return;
    setReading("measuring");
    setTimeout(() => setReading("done"), 1300);
  }

  function tap(action: Action) {
    if (feedback) return;
    setPicked(action);
    const ok = action === CORRECT[stage as Case];
    answers.current[`temp-${stage}`] = { picked: action, correct: ok };
    setFeedback(ok ? "good" : "soft");
  }

  function advance() {
    const i = FLOW.indexOf(stage);
    setStage(FLOW[Math.min(i + 1, FLOW.length - 1)]);
    setReading("idle");
    setPicked(null);
    setFeedback(null);
  }

  function retry() { setFeedback(null); setPicked(null); }
  function skip() { answers.current[`skip-${stage}`] = true; advance(); }
  function finish() { onDone({ correct: true }); }

  void trainer;

  const tempColor = !temp ? "#94a3b8" : temp < 37 ? "#22c55e" : temp < 38.5 ? "#f59e0b" : "#dc2626";

  const scene: ReactNode = isDone ? (
    <div className="thermo-app thermo-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : (
    <div className="thermo-app">
      <div className="thermo-device">
        <div className="thermo-device-art" aria-hidden="true">
          <LessonItemArt id="realistic-thermometer" size={170} />
          <span
            className={`thermo-reading thermo-reading--${reading}`}
            style={{ color: reading === "done" ? tempColor : undefined }}
          >
            {reading === "done" && temp ? `${temp.toFixed(1)}°` : reading === "measuring" ? "..." : "--.-°"}
          </span>
        </div>
      </div>

      {reading === "idle" ? (
        <button type="button" className="thermo-measure" onClick={measure}>
          {t.measure}
        </button>
      ) : reading === "measuring" ? (
        <div className="thermo-measure thermo-measure--pending">{t.measuring}</div>
      ) : null}

      {reading === "done" && sit ? (
        <div className="thermo-action-grid">
          {actions.map((a, i) => (
            <button
              key={a}
              type="button"
              className={`thermo-action${picked === a ? " thermo-action--picked" : ""}`}
              onClick={() => tap(a)}
              disabled={Boolean(feedback)}
            >
              <span className="thermo-action-num">{i + 1}</span>
              <span>
                <strong>{t.actions[a].name}</strong>
                <small>{t.actions[a].sub}</small>
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );

  return (
    <div className="morning-quest-trainer thermo-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark thermo-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 4 Q10 2 12 2 Q14 2 14 4 V14 A4 4 0 1 1 10 14 Z" />
              <circle cx="12" cy="18" r="2.5" fill="currentColor" />
            </svg>
          </span>
          <div>
            <strong>{t.appTitle}</strong>
            <small>{t.stepCounter(step)}</small>
          </div>
        </div>
        <div className="mq-topbar-progress" aria-hidden="true">
          {Array.from({ length: STEPS }).map((_, i) => (
            <span
              key={i}
              className={`mq-topbar-dot${step > i + 1 || isDone ? " mq-topbar-dot--done" : ""}${step === i + 1 && !isDone ? " mq-topbar-dot--current" : ""}`}
            />
          ))}
        </div>
      </header>

      <div className="mq-shell">
        <div className="mq-phone-col">
          <div className={`mq-phone mq-phone--thermo-${stage}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">16:0{Math.min(step, 9)}</span>
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
            <p className="mq-panel-task-text">{sit ? sit.context : t.doneHint}</p>
          </div>

          {sit && reading !== "done" ? (
            <div className="mq-panel-hint">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>Click “Measure” - the thermometer will show the temperature.</p>
            </div>
          ) : null}

          {sit && reading === "done" && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{sit.question}</h3>
            </div>
          ) : null}

          {feedback && sit ? (
            <div className={`outfit-feedback outfit-feedback--${feedback}`}>
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{feedback === "good" ? sit.feedbackGood : sit.feedbackSoft}</p>
              <div className="outfit-feedback-actions">
                {feedback === "good" ? (
                  <button type="button" className="mq-panel-primary" onClick={advance}>
                    {stage === "high-fever" ? t.finish : t.next}
                  </button>
                ) : (
                  <button type="button" className="mq-panel-primary outfit-retry" onClick={retry}>
                    {t.retry}
                  </button>
                )}
              </div>
            </div>
          ) : sit && reading === "done" ? (
            <div className="mq-panel-hint">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>{sit.hint}</p>
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
