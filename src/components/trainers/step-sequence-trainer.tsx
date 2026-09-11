"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { StepSequenceTrainer as StepSequenceTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: StepSequenceTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type StepKey = "wet-face" | "soap" | "rinse" | "dry" | "cream";
const ORDER: StepKey[] = ["wet-face", "soap", "rinse", "dry", "cream"];
const SHUFFLED: StepKey[] = ["dry", "wet-face", "cream", "soap", "rinse"];

type Locales<T> = Record<Locale, T>;
const dict: Locales<{
  appTitle: string;
  taskEyebrow: string;
  questionEyebrow: string;
  hintEyebrow: string;
  feedbackEyebrow: string;
  skip: string;
  finish: string;
  doneTitle: string;
  doneHint: string;
  stepCounter: (n: number) => string;
  task: string;
  hint: string;
  steps: Record<StepKey, { name: string; short: string }>;
  feedbackGood: string;
  feedbackWrong: (correctName: string) => string;
}> = {
  ru: {
    appTitle: "Умывание и крем",
    taskEyebrow: "Что нужно сделать",
    questionEyebrow: "Следующий шаг",
    hintEyebrow: "Подсказка",
    feedbackEyebrow: "Шаг выполнен",
    skip: "Не знаю",
    finish: "Закончить",
    doneTitle: "Молодец! Лицо чистое, крем нанесён.",
    doneHint: "Так нужно делать каждое утро и каждый вечер.",
    stepCounter: (n) => `Шаг ${n} из 5`,
    task: "Разложи шаги в правильном порядке. Нажми на тот, который идёт следующим.",
    hint: "Сначала намочи лицо, потом мыло, смой, вытри, потом крем.",
    steps: {
      "wet-face": { name: "Намочить лицо", short: "Вода" },
      soap: { name: "Намылить", short: "Мыло" },
      rinse: { name: "Смыть пену", short: "Смыть" },
      dry: { name: "Вытереть полотенцем", short: "Полотенце" },
      cream: { name: "Нанести крем", short: "Крем" },
    },
    feedbackGood: "Верно! Идём дальше.",
    feedbackWrong: (correctName) => `Это не следующий шаг. Сейчас нужно: «${correctName}».`,
  },
  uz: {
    appTitle: "Yuv va krem",
    taskEyebrow: "Nima qilish kerak",
    questionEyebrow: "Keyingi qadam",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Qadam bajarildi",
    skip: "Bilmayman",
    finish: "Yakunlash",
    doneTitle: "Yashasin! Yuz toza, krem surtildi.",
    doneHint: "Buni har kuni ertalab va kechqurun qilish kerak.",
    stepCounter: (n) => `${n} / 5-qadam`,
    task: "Qadamlarni toʻgʻri tartibga sol. Keyingisi qaysi boʻlsa, ustiga bos.",
    hint: "Avval yuzni hoʻllash, keyin sovun, yuvib tashlash, artish, oxirida krem.",
    steps: {
      "wet-face": { name: "Yuzni hoʻllash", short: "Suv" },
      soap: { name: "Sovunlash", short: "Sovun" },
      rinse: { name: "Koʻpikni yuvish", short: "Yuvish" },
      dry: { name: "Sochiq bilan artish", short: "Sochiq" },
      cream: { name: "Krem surtish", short: "Krem" },
    },
    feedbackGood: "Toʻgʻri! Davom etamiz.",
    feedbackWrong: (correctName) => `Bu keyingisi emas. Hozir: «${correctName}» kerak.`,
  },
};

export function StepSequenceTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [done, setDone] = useState<StepKey[]>([]);
  const [wrong, setWrong] = useState<StepKey | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const nextIndex = done.length;
  const nextStep = ORDER[nextIndex] ?? null;
  const isDone = nextStep === null;

  function tap(key: StepKey) {
    if (isDone || done.includes(key)) return;
    if (key === nextStep) {
      setDone((arr) => [...arr, key]);
      setWrong(null);
      answers.current[`step-${nextIndex}`] = key;
    } else {
      setWrong(key);
      setTimeout(() => setWrong(null), 1500);
    }
  }

  function skip() {
    if (nextStep) {
      answers.current[`skip-step-${nextIndex}`] = true;
      setDone((arr) => [...arr, nextStep]);
    }
  }

  function finish() {
    onDone({ correct: true });
  }

  void trainer;

  const remaining = SHUFFLED.filter((s) => !done.includes(s));

  const scene: ReactNode = isDone ? (
    <div className="step-app step-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : (
    <div className="step-app">
      <div className="step-flow-track">
        {ORDER.map((step, i) => (
          <div key={step} className={`step-slot${done.includes(step) ? " step-slot--filled" : ""}${i === nextIndex ? " step-slot--target" : ""}`}>
            <span className="step-slot-num">{i + 1}</span>
            {done.includes(step) ? (
              <div className="step-slot-card">
                <StepIcon kind={step} />
                <small>{t.steps[step].short}</small>
              </div>
            ) : (
              <span className="step-slot-placeholder">?</span>
            )}
          </div>
        ))}
      </div>

      <div className="step-deck">
        <span className="step-deck-label">{t.questionEyebrow}</span>
        <div className="step-deck-row">
          {remaining.map((key) => (
            <button
              key={key}
              type="button"
              className={`step-card${wrong === key ? " step-card--wrong" : ""}`}
              onClick={() => tap(key)}
            >
              <StepIcon kind={key} />
              <small>{t.steps[key].short}</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="morning-quest-trainer step-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark step-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18 L9 13 L14 16 L20 8" />
              <path d="M20 14 V8 H14" />
            </svg>
          </span>
          <div>
            <strong>{t.appTitle}</strong>
            <small>{t.stepCounter(Math.min(nextIndex + 1, 5))}</small>
          </div>
        </div>
        <div className="mq-topbar-progress" aria-hidden="true">
          {ORDER.map((s, i) => (
            <span
              key={s}
              className={`mq-topbar-dot${done.includes(s) ? " mq-topbar-dot--done" : ""}${i === nextIndex && !isDone ? " mq-topbar-dot--current" : ""}`}
            />
          ))}
        </div>
      </header>

      <div className="mq-shell">
        <div className="mq-phone-col">
          <div className={`mq-phone mq-phone--step${isDone ? "-done" : ""}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">14:0{Math.min(nextIndex + 1, 9)}</span>
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
            <p className="mq-panel-task-text">{isDone ? t.doneHint : t.task}</p>
          </div>

          {!isDone && nextStep ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{t.steps[nextStep].name}</h3>
              <p className="outfit-pick-summary">
                Найди карточку и нажми. Это {nextIndex + 1}-й шаг из 5.
              </p>
            </div>
          ) : null}

          {wrong ? (
            <div className="outfit-feedback outfit-feedback--soft">
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{t.feedbackWrong(nextStep ? t.steps[nextStep].name : "")}</p>
            </div>
          ) : !isDone ? (
            <div className="mq-panel-hint">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>{t.hint}</p>
            </div>
          ) : null}

          <div className="mq-panel-footer">
            {isDone ? (
              <button type="button" className="mq-panel-primary" onClick={finish}>
                {t.finish}
              </button>
            ) : (
              <button type="button" className="mq-panel-skip" onClick={skip}>
                {t.skip}
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function StepIcon({ kind }: { kind: StepKey }) {
  const art: Record<StepKey, LessonItemArtId> = {
    "wet-face": "skincare-wet-face-realistic",
    soap: "soap",
    rinse: "skincare-rinse-realistic",
    dry: "skincare-towel-realistic",
    cream: "face-cream",
  };

  return <LessonItemArt id={art[kind]} size={58} className="step-card-art" />;
}
