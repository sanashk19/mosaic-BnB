"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { FamilyIncomeTrainer as FamilyIncomeTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: FamilyIncomeTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type CaseKey = "small" | "medium" | "large";
type Stage = CaseKey | "done";
const FLOW: Stage[] = ["small", "medium", "large", "done"];
const STEPS = 3;

type IncomeRow = { name: string; amount: number; icon: "salary" | "pension" | "gig" | "child-aid" };

const INCOME_ART: Record<IncomeRow["icon"], LessonItemArtId> = {
  salary: "salary-money",
  pension: "pension-card",
  gig: "side-income",
  "child-aid": "child-benefit",
};

const CASES: Record<CaseKey, { rows: IncomeRow[]; total: number; options: number[] }> = {
  small: {
    rows: [
      { name: "Зарплата мамы", amount: 3_000_000, icon: "salary" },
      { name: "Пенсия бабушки", amount: 1_200_000, icon: "pension" },
    ],
    total: 4_200_000,
    options: [4_200_000, 4_000_000, 3_800_000],
  },
  medium: {
    rows: [
      { name: "Зарплата мамы", amount: 3_000_000, icon: "salary" },
      { name: "Зарплата папы", amount: 4_500_000, icon: "salary" },
      { name: "Подработка", amount: 500_000, icon: "gig" },
    ],
    total: 8_000_000,
    options: [8_000_000, 7_500_000, 8_500_000],
  },
  large: {
    rows: [
      { name: "Зарплата мамы", amount: 3_500_000, icon: "salary" },
      { name: "Зарплата папы", amount: 5_000_000, icon: "salary" },
      { name: "Пенсия бабушки", amount: 1_500_000, icon: "pension" },
      { name: "Пособие на ребёнка", amount: 800_000, icon: "child-aid" },
    ],
    total: 10_800_000,
    options: [10_800_000, 10_000_000, 11_500_000],
  },
};

function fmt(n: number): string {
  return n.toLocaleString("ru-RU") + " сум";
}

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
  total: string;
  question: string;
  hint: string;
  feedbackGood: string;
  feedbackSoft: string;
  context: Record<CaseKey, string>;
}> = {
  ru: {
    appTitle: "Бюджет семьи",
    stepCounter: (n) => `Семья ${n} из ${STEPS}`,
    taskEyebrow: "Семья",
    questionEyebrow: "Общий доход",
    hintEyebrow: "Подсказка",
    feedbackEyebrow: "Проверка",
    skip: "Не знаю",
    finish: "Закончить",
    retry: "Попробовать снова",
    next: "Следующая семья",
    doneTitle: "Молодец! Ты умеешь складывать доходы.",
    doneHint: "Доход семьи — это сумма всех зарплат, пенсий и пособий.",
    total: "Итого",
    question: "Сколько всего получает семья за месяц?",
    hint: "Сложи все числа из таблицы — это и есть общий доход.",
    feedbackGood: "Верно! Это правильная сумма.",
    feedbackSoft: "Это не та сумма. Сложи ещё раз внимательно.",
    context: {
      small: "Маленькая семья: мама и бабушка. Это их доход за месяц.",
      medium: "Обычная семья: мама, папа и подработка папы.",
      large: "Большая семья: мама, папа, бабушка и пособие на младшего ребёнка.",
    },
  },
  uz: {
    appTitle: "Oila byudjeti",
    stepCounter: (n) => `${n} / ${STEPS}-oila`,
    taskEyebrow: "Oila",
    questionEyebrow: "Umumiy daromad",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    next: "Keyingi oila",
    doneTitle: "Yashasin! Sen daromadlarni qoʻshishni oʻrganding.",
    doneHint: "Oila daromadi — barcha maoshlar, nafaqalar va kompensatsiyalar yigʻindisi.",
    total: "Jami",
    question: "Oila bir oyda jami qancha oladi?",
    hint: "Jadvaldagi barcha raqamlarni qoʻsh.",
    feedbackGood: "Toʻgʻri! Bu mos summa.",
    feedbackSoft: "Bu mos emas. Qaytadan diqqat bilan qoʻsh.",
    context: {
      small: "Kichik oila: ona va buvi. Bu oylik daromadlari.",
      medium: "Oddiy oila: ona, ota va qoʻshimcha ish.",
      large: "Katta oila: ona, ota, buvi va bola nafaqasi.",
    },
  },
};

export function FamilyIncomeTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [stage, setStage] = useState<Stage>("small");
  const [picked, setPicked] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stage === "done";
  const step = isDone ? STEPS : FLOW.indexOf(stage) + 1;
  const c = isDone ? null : CASES[stage as CaseKey];

  function tap(n: number) {
    if (feedback || !c) return;
    setPicked(n);
    const ok = n === c.total;
    answers.current[`income-${stage}`] = { picked: n, correct: ok };
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
    <div className="income-app income-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : c ? (
    <div className="income-app">
      <table className="income-table">
        <thead>
          <tr><th>Источник</th><th>Сумма</th></tr>
        </thead>
        <tbody>
          {c.rows.map((row, i) => (
            <tr key={i}>
              <td>
                <IncomeIcon kind={row.icon} />
                {row.name}
              </td>
              <td className="income-amount">{fmt(row.amount)}</td>
            </tr>
          ))}
          <tr className="income-total-row">
            <td>{t.total}</td>
            <td className="income-amount">{picked != null && feedback === "good" ? fmt(c.total) : "?"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : null;

  return (
    <div className="morning-quest-trainer income-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark income-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="6" width="18" height="14" rx="2" />
              <path d="M3 11 H21" />
              <path d="M8 16 H12" />
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
          <div className={`mq-phone mq-phone--income-${stage}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">20:0{Math.min(step, 9)}</span>
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
            <p className="mq-panel-task-text">{c ? t.context[stage as CaseKey] : t.doneHint}</p>
          </div>

          {c && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{t.question}</h3>
              <div className="mq-panel-options">
                {c.options.map((o, i) => (
                  <button
                    key={o}
                    type="button"
                    className={`mq-panel-option${picked === o ? " mq-panel-option--picked" : ""}`}
                    onClick={() => tap(o)}
                  >
                    <span className="mq-panel-option-num">{i + 1}</span>
                    <span className="mq-panel-option-body">
                      <strong>{fmt(o)}</strong>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {feedback ? (
            <div className={`outfit-feedback outfit-feedback--${feedback}`}>
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{feedback === "good" ? t.feedbackGood : t.feedbackSoft}</p>
              <div className="outfit-feedback-actions">
                {feedback === "good" ? (
                  <button type="button" className="mq-panel-primary" onClick={advance}>{stage === "large" ? t.finish : t.next}</button>
                ) : (
                  <button type="button" className="mq-panel-primary outfit-retry" onClick={retry}>{t.retry}</button>
                )}
              </div>
            </div>
          ) : c ? (
            <div className="mq-panel-hint">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>{t.hint}</p>
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

function IncomeIcon({ kind }: { kind: IncomeRow["icon"] }) {
  return (
    <span className={`income-icon income-icon--${kind}`} aria-hidden="true">
      <LessonItemArt id={INCOME_ART[kind]} size={32} />
    </span>
  );
}
