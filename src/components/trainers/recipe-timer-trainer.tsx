"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { LessonItemArt } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { RecipeTimerTrainer as RecipeTimerTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: RecipeTimerTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type StepKey = "dough" | "apples" | "oven" | "bake";
const ORDER: StepKey[] = ["dough", "apples", "oven", "bake"];

type Locales<T> = Record<Locale, T>;
const dict: Locales<{
  appTitle: string;
  counter: (n: number) => string;
  taskEyebrow: string;
  questionEyebrow: string;
  hintEyebrow: string;
  feedbackEyebrow: string;
  skip: string;
  finish: string;
  doneTitle: string;
  doneHint: string;
  steps: Record<StepKey, { name: string; action: string; hint: string }>;
  startTimer: string;
  timerRunning: (s: number) => string;
  timerDone: string;
  done: string;
}> = {
  ru: {
    appTitle: "apple pie",
    counter: (n) => `Step${n}out of 4`,
    taskEyebrow: "Recipe",
    questionEyebrow: "Take a step",
    hintEyebrow: "Clue",
    feedbackEyebrow: "Done",
    skip: "Don't know",
    finish: "Finish",
    doneTitle: "Well done! The pie is ready.",
    doneHint: "Step by step: dough → apples → oven → timer. The timer prevents the cake from burning.",
    steps: {
      dough: { name: "Knead the dough", action: "Knead the dough", hint: "First the dough - flour, eggs, sugar." },
      apples: { name: "Lay out the apples", action: "Lay out the apples", hint: "Cut the apples and place on the dough." },
      oven: { name: "Place in the oven", action: "Place in the oven", hint: "Place the pan in the preheated oven." },
      bake: { name: "Start timer", action: "Start timer 35 minutes", hint: "Set the timer to prevent the cake from burning." },
    },
    startTimer: "Start timer 35 min",
    timerRunning: (s) => `Baking...${s}`,
    timerDone: "Ring! The pie is ready",
    done: "Done",
  },
  uz: {
    appTitle: "Olma piroq",
    counter: (n) => `${n} / 4-qadam`,
    taskEyebrow: "Retsept",
    questionEyebrow: "Qadamni bajar",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tayyor",
    skip: "Bilmayman",
    finish: "Yakunlash",
    doneTitle: "Yashasin! Piroq tayyor.",
    doneHint: "Qadamlar: xamir → olma → pech → taymer.",
    steps: {
      dough: { name: "Xamir qorish", action: "Xamir qorish", hint: "Avval xamir." },
      apples: { name: "Olma terish", action: "Olma terish", hint: "Olmani kesib xamirga ter." },
      oven: { name: "Pechga qoʻyish", action: "Pechga qoʻyish", hint: "Qolipni issiq pechga qoʻy." },
      bake: { name: "Taymer yoqish", action: "35 daqiqalik taymer yoqish", hint: "Piroq kuymasligi uchun taymer yoq." },
    },
    startTimer: "35 daqiqa taymer",
    timerRunning: (s) => `Pishyapti… ${s}`,
    timerDone: "Dzin! Piroq tayyor",
    done: "Tayyor",
  },
};

export function RecipeTimerTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];
  const [idx, setIdx] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [timerDone, setTimerDone] = useState(false);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = idx >= ORDER.length;
  const current = !isDone ? ORDER[idx] : null;
  const timerComplete = timerDone || timer === 0;

  useEffect(() => {
    if (timer === null || timer <= 0) return;
    const id = setTimeout(() => setTimer((s) => (s === null ? null : s - 1)), 120);
    return () => clearTimeout(id);
  }, [timer]);

  function doStep() {
    if (!current) return;
    if (current === "bake") {
      if (timer === null && !timerComplete) { setTimer(5); answers.current.timer = "started"; return; }
      if (timerComplete) { setIdx((i) => i + 1); return; }
      return;
    }
    answers.current[`step-${current}`] = "done";
    setIdx((i) => i + 1);
  }
  function skip() {
    if (current === "bake") { setTimer(null); setTimerDone(true); }
    setIdx((i) => i + 1);
  }
  function finish() { onDone({ correct: true }); }
  void trainer;

  const scene: ReactNode = isDone ? (
    <div className="bake-app bake-app--done">
      <div className="outfit-done-tick" aria-hidden="true"><CabinetIcon name="check" /></div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : (
    <div className="bake-app">
      <div className="bake-pie"><LessonItemArt id="realistic-apple-pie" size={150} /></div>
      <div className="bake-steps">
        {ORDER.map((k, i) => (
          <div key={k} className={`bake-step${i < idx ? " bake-step--done" : ""}${i === idx ? " bake-step--active" : ""}`}>
            <span className="bake-step-num">{i < idx ? "✓" : i + 1}</span>
            <span>{t.steps[k].name}</span>
          </div>
        ))}
      </div>
      {current === "bake" && timer !== null ? (
        <div className={`bake-timer${timerComplete ? " bake-timer--done" : ""}`}>
          {timerComplete ? t.timerDone : t.timerRunning(timer)}
        </div>
      ) : null}
    </div>
  );

  const primaryLabel = current === "bake"
    ? (timerComplete ? t.done : timer !== null ? t.timerRunning(timer ?? 0) : t.startTimer)
    : current ? t.steps[current].action : "";

  return (
    <div className="morning-quest-trainer bake-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark bake-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 13 V8 M12 13 L15 15 M9 3 H15"/></svg>
          </span>
          <div><strong>{t.appTitle}</strong><small>{t.counter(Math.min(idx + 1, 4))}</small></div>
        </div>
        <div className="mq-topbar-progress" aria-hidden="true">
          {ORDER.map((_, i) => (<span key={i} className={`mq-topbar-dot${idx > i || isDone ? " mq-topbar-dot--done" : ""}${idx === i && !isDone ? " mq-topbar-dot--current" : ""}`} />))}
        </div>
      </header>
      <div className="mq-shell">
        <div className="mq-phone-col">
          <div className={`mq-phone mq-phone--bake${isDone ? "-done" : ""}`}>
            <div className="mq-phone-statusbar"><span className="mq-phone-time">16:0{Math.min(idx + 1, 9)}</span><span className="mq-phone-island" aria-hidden="true" /><span className="mq-phone-status-icons" aria-hidden="true"><svg width="16" height="11" viewBox="0 0 16 11" fill="none"><rect x="0" y="7" width="2.5" height="4" rx="0.5" fill="currentColor"/><rect x="3.5" y="5" width="2.5" height="6" rx="0.5" fill="currentColor"/><rect x="7" y="3" width="2.5" height="8" rx="0.5" fill="currentColor"/><rect x="10.5" y="0" width="2.5" height="11" rx="0.5" fill="currentColor"/></svg><svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke="currentColor" fill="none"/><rect x="2" y="2" width="14" height="7" rx="1" fill="currentColor"/><rect x="19.5" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor"/></svg></span></div>
            <div className="mq-phone-content">{scene}</div>
            <div className="mq-phone-home" aria-hidden="true" />
          </div>
        </div>
        <aside className="mq-panel">
          <div className="mq-panel-task"><span className="mq-eyebrow">{t.taskEyebrow}</span><p className="mq-panel-task-text">{current ? t.steps[current].name : t.doneHint}</p></div>
          {current ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{t.steps[current].action}</h3>
              <button type="button" className="mq-panel-primary bake-action" onClick={doStep} disabled={current === "bake" && timer !== null && !timerDone}>
                {primaryLabel}
              </button>
            </div>
          ) : null}
          {current ? (<div className="mq-panel-hint"><span className="mq-eyebrow">{t.hintEyebrow}</span><p>{t.steps[current].hint}</p></div>) : null}
          <div className="mq-panel-footer">
            {isDone ? (<button type="button" className="mq-panel-primary" onClick={finish}>{t.finish}</button>) : (<button type="button" className="mq-panel-skip" onClick={skip}>{t.skip}</button>)}
          </div>
        </aside>
      </div>
    </div>
  );
}
