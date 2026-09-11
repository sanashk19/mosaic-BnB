"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { DetergentDosageTrainer as DetergentDosageTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: DetergentDosageTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type CaseKey = "small" | "medium" | "large";
type Stage = CaseKey | "done";
const FLOW: Stage[] = ["small", "medium", "large", "done"];
const STEPS = 3;

const CASES: Record<CaseKey, { load: string; weight: string; correct: string; options: string[] }> = {
  small: { load: "Пара футболок", weight: "1 кг", correct: "½", options: ["½", "1", "2", "3"] },
  medium: { load: "Постельное бельё", weight: "4 кг", correct: "1", options: ["½", "1", "2", "3"] },
  large: { load: "Большая стирка", weight: "8 кг", correct: "2", options: ["½", "1", "2", "3"] },
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
  tableTitle: string;
  rows: { w: string; cap: string }[];
  capWord: (n: string) => string;
  question: (load: string, weight: string) => string;
  hint: string;
  feedbackGood: (cap: string) => string;
  feedbackSoft: string;
  context: (load: string, weight: string) => string;
}> = {
  ru: {
    appTitle: "Дозировка порошка",
    stepCounter: (n) => `Стирка ${n} из ${STEPS}`,
    taskEyebrow: "Загрузка",
    questionEyebrow: "Сколько порошка",
    hintEyebrow: "Подсказка",
    feedbackEyebrow: "Проверка",
    skip: "Не знаю",
    finish: "Закончить",
    retry: "Попробовать снова",
    next: "Следующая стирка",
    doneTitle: "Молодец! Дозировка всегда по весу белья.",
    doneHint: "1 кг — ½ колпачка, 4 кг — 1 колпачок, 8 кг — 2 колпачка.",
    tableTitle: "Таблица на бутылке",
    rows: [
      { w: "1–2 кг", cap: "½ колпачка" },
      { w: "3–5 кг", cap: "1 колпачок" },
      { w: "6–9 кг", cap: "2 колпачка" },
    ],
    capWord: (n) => `${n} колпачка`,
    question: (load, weight) => `${load} (${weight}). Сколько колпачков?`,
    hint: "Найди в таблице строку с нужным весом и посмотри мерку.",
    feedbackGood: (cap) => `Верно. ${cap} колпачка — точно по весу.`,
    feedbackSoft: "Это не по таблице. Слишком много или мало порошка.",
    context: (load, weight) => `${load} — вес примерно ${weight}.`,
  },
  uz: {
    appTitle: "Kukun dozasi",
    stepCounter: (n) => `${n} / ${STEPS}-yuvish`,
    taskEyebrow: "Yuk",
    questionEyebrow: "Qancha kukun",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    next: "Keyingi yuvish",
    doneTitle: "Yashasin! Doza har doim kir vazniga qarab.",
    doneHint: "1 kg — ½ qopqoq, 4 kg — 1 qopqoq, 8 kg — 2 qopqoq.",
    tableTitle: "Shishadagi jadval",
    rows: [
      { w: "1–2 kg", cap: "½ qopqoq" },
      { w: "3–5 kg", cap: "1 qopqoq" },
      { w: "6–9 kg", cap: "2 qopqoq" },
    ],
    capWord: (n) => `${n} qopqoq`,
    question: (load, weight) => `${load} (${weight}). Necha qopqoq?`,
    hint: "Jadvaldan kerakli vaznni top va oʻlchovni koʻr.",
    feedbackGood: (cap) => `Toʻgʻri. ${cap} qopqoq — vaznga mos.`,
    feedbackSoft: "Bu jadvalga mos emas.",
    context: (load, weight) => `${load} — taxminan ${weight}.`,
  },
};

export function DetergentDosageTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];
  const [stage, setStage] = useState<Stage>("small");
  const [picked, setPicked] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stage === "done";
  const step = isDone ? STEPS : FLOW.indexOf(stage) + 1;
  const c = isDone ? null : CASES[stage as CaseKey];

  function tap(opt: string) {
    if (feedback || !c) return;
    setPicked(opt);
    const ok = opt === c.correct;
    answers.current[`dose-${stage}`] = { picked: opt, correct: ok };
    setFeedback(ok ? "good" : "soft");
  }
  function advance() { const i = FLOW.indexOf(stage); setStage(FLOW[Math.min(i + 1, FLOW.length - 1)]); setPicked(null); setFeedback(null); }
  function retry() { setFeedback(null); setPicked(null); }
  function skip() { answers.current[`skip-${stage}`] = true; advance(); }
  function finish() { onDone({ correct: true }); }
  void trainer;

  const scene: ReactNode = isDone ? (
    <div className="dose-app dose-app--done">
      <div className="outfit-done-tick" aria-hidden="true"><CabinetIcon name="check" /></div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : c ? (
    <div className="dose-app">
      <div className="dose-bottle"><LessonItemArt id="detergent-label-realistic" size={120} /></div>
      <div className="dose-table">
        <div className="dose-table-title">{t.tableTitle}</div>
        {t.rows.map((r, i) => (
          <div key={i} className={`dose-row${(c.weight.startsWith("1") && i === 0) || (c.weight.startsWith("4") && i === 1) || (c.weight.startsWith("8") && i === 2) ? " dose-row--match" : ""}`}>
            <span>{r.w}</span><span>{r.cap}</span>
          </div>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <div className="morning-quest-trainer dose-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark dose-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M9 8 H15"/></svg>
          </span>
          <div><strong>{t.appTitle}</strong><small>{t.stepCounter(step)}</small></div>
        </div>
        <div className="mq-topbar-progress" aria-hidden="true">
          {Array.from({ length: STEPS }).map((_, i) => (<span key={i} className={`mq-topbar-dot${step > i + 1 || isDone ? " mq-topbar-dot--done" : ""}${step === i + 1 && !isDone ? " mq-topbar-dot--current" : ""}`} />))}
        </div>
      </header>
      <div className="mq-shell">
        <div className="mq-phone-col">
          <div className={`mq-phone mq-phone--dose-${stage}`}>
            <div className="mq-phone-statusbar"><span className="mq-phone-time">09:0{step}</span><span className="mq-phone-island" aria-hidden="true" /><span className="mq-phone-status-icons" aria-hidden="true"><svg width="16" height="11" viewBox="0 0 16 11" fill="none"><rect x="0" y="7" width="2.5" height="4" rx="0.5" fill="currentColor"/><rect x="3.5" y="5" width="2.5" height="6" rx="0.5" fill="currentColor"/><rect x="7" y="3" width="2.5" height="8" rx="0.5" fill="currentColor"/><rect x="10.5" y="0" width="2.5" height="11" rx="0.5" fill="currentColor"/></svg><svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke="currentColor" fill="none"/><rect x="2" y="2" width="14" height="7" rx="1" fill="currentColor"/><rect x="19.5" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor"/></svg></span></div>
            <div className="mq-phone-content">{scene}</div>
            <div className="mq-phone-home" aria-hidden="true" />
          </div>
        </div>
        <aside className="mq-panel">
          <div className="mq-panel-task"><span className="mq-eyebrow">{t.taskEyebrow}</span><p className="mq-panel-task-text">{c ? t.context(c.load, c.weight) : t.doneHint}</p></div>
          {c && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{t.question(c.load, c.weight)}</h3>
              <div className="mq-panel-options">
                {c.options.map((o, i) => (
                  <button key={o} type="button" className={`mq-panel-option${picked === o ? " mq-panel-option--picked" : ""}`} onClick={() => tap(o)}>
                    <span className="mq-panel-option-num">{i + 1}</span><span className="mq-panel-option-body"><strong>{t.capWord(o)}</strong></span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {feedback && c ? (
            <div className={`outfit-feedback outfit-feedback--${feedback}`}>
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{feedback === "good" ? t.feedbackGood(c.correct) : t.feedbackSoft}</p>
              <div className="outfit-feedback-actions">
                {feedback === "good" ? (<button type="button" className="mq-panel-primary" onClick={advance}>{stage === "large" ? t.finish : t.next}</button>) : (<button type="button" className="mq-panel-primary outfit-retry" onClick={retry}>{t.retry}</button>)}
              </div>
            </div>
          ) : c ? (<div className="mq-panel-hint"><span className="mq-eyebrow">{t.hintEyebrow}</span><p>{t.hint}</p></div>) : null}
          <div className="mq-panel-footer">
            {isDone ? (<button type="button" className="mq-panel-primary" onClick={finish}>{t.finish}</button>) : !feedback ? (<button type="button" className="mq-panel-skip" onClick={skip}>{t.skip}</button>) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
