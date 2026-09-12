"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { FamilyExpensesTrainer as FamilyExpensesTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: FamilyExpensesTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Category = "food" | "transport" | "utilities" | "fun";
type Purchase = { id: string; name: string; price: number; category: Category; art: LessonItemArtId };
type Stage = "round1" | "round2" | "round3" | "done";
const FLOW: Stage[] = ["round1", "round2", "round3", "done"];

const CATEGORY_ART: Record<Category, LessonItemArtId> = {
  food: "expense-grocery-realistic",
  transport: "expense-transit-realistic",
  utilities: "expense-utility-realistic",
  fun: "expense-entertainment-realistic",
};

const ROUNDS: Record<Exclude<Stage, "done">, Purchase[]> = {
  round1: [
    { id: "bread", name: "Bread", price: 5_000, category: "food", art: "recipe-bread-realistic" },
    { id: "milk", name: "Milk", price: 12_000, category: "food", art: "expense-grocery-realistic" },
    { id: "bus", name: "Bus ticket", price: 1_700, category: "transport", art: "bus" },
    { id: "movie", name: "Cinema ticket", price: 25_000, category: "fun", art: "expense-entertainment-realistic" },
  ],
  round2: [
    { id: "water", name: "Water bill", price: 35_000, category: "utilities", art: "expense-utility-realistic" },
    { id: "taxi", name: "Taxi", price: 18_000, category: "transport", art: "taxi" },
    { id: "apple", name: "Apples", price: 22_000, category: "food", art: "expense-grocery-realistic" },
    { id: "icecream", name: "Ice cream", price: 8_000, category: "fun", art: "menu-cake-realistic" },
  ],
  round3: [
    { id: "gas", name: "Gas bill", price: 40_000, category: "utilities", art: "expense-utility-realistic" },
    { id: "fish", name: "Fish", price: 55_000, category: "food", art: "cutlets" },
    { id: "metro", name: "Metro", price: 1_700, category: "transport", art: "expense-transit-realistic" },
    { id: "concert", name: "Concert ticket", price: 80_000, category: "fun", art: "entertainment-ticket" },
  ],
};

type Locales<T> = Record<Locale, T>;
const dict: Locales<{
  appTitle: string;
  stepCounter: (round: number, n: number, total: number) => string;
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
  categories: Record<Category, { name: string }>;
  question: string;
  hint: string;
  feedbackGood: string;
  feedbackSoft: string;
}> = {
  ru: {
    appTitle: "Family expenses",
    stepCounter: (round, n, total) => `Round${round}: ${n}/${total}`,
    taskEyebrow: "Purchase",
    questionEyebrow: "Category",
    hintEyebrow: "Clue",
    feedbackEyebrow: "Checking",
    skip: "Don't know",
    finish: "Finish",
    retry: "Try again",
    next: "Next purchase",
    doneTitle: "Well done! You distributed all the purchases.",
    doneHint: "This way you can keep a table of family expenses on your phone.",
    categories: {
      food: { name: "Food" },
      transport: { name: "Transport" },
      utilities: { name: "Communal" },
      fun: { name: "Entertainment" },
    },
    question: "Where should I take this purchase?",
    hint: "Think about it: is it food, a trip, an apartment bill or entertainment?",
    feedbackGood: "Right! This is the correct category.",
    feedbackSoft: "This is a different category. Think again.",
  },
  uz: {
    appTitle: "Oila xarajatlari",
    stepCounter: (round, n, total) => `${round}-bosqich: ${n}/${total}`,
    taskEyebrow: "Xarid",
    questionEyebrow: "Kategoriya",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    next: "Keyingi xarid",
    doneTitle: "Yashasin! Sen barcha xaridlarni taqsimlading.",
    doneHint: "Telefonda oilaning xarajatlarini shunday yuritish mumkin.",
    categories: {
      food: { name: "Ovqat" },
      transport: { name: "Transport" },
      utilities: { name: "Kommunal" },
      fun: { name: "Koʻngilochar" },
    },
    question: "Bu xaridni qaysi kategoriyaga qoʻyamiz?",
    hint: "Oʻylab koʻr: ovqatmi, yoʻlmi, kommunalmi yoki koʻngilocharmi?",
    feedbackGood: "Toʻgʻri! Bu mos kategoriya.",
    feedbackSoft: "Bu boshqa kategoriya. Qaytadan oʻylab koʻr.",
  },
};

const CATS: Category[] = ["food", "transport", "utilities", "fun"];

function fmt(n: number): string {
  return n.toLocaleString("ru-RU") + "am";
}

export function FamilyExpensesTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [stage, setStage] = useState<Stage>("round1");
  const [purchaseIdx, setPurchaseIdx] = useState(0);
  const [picked, setPicked] = useState<Category | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const [classified, setClassified] = useState<Record<string, Category>>({});
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stage === "done";
  const purchases = !isDone ? ROUNDS[stage as Exclude<Stage, "done">] : [];
  const current = !isDone ? purchases[purchaseIdx] : null;
  const round = isDone ? 3 : FLOW.indexOf(stage) + 1;

  function tap(cat: Category) {
    if (feedback || !current) return;
    setPicked(cat);
    const ok = cat === current.category;
    answers.current[`expense-${stage}-${current.id}`] = { picked: cat, correct: ok };
    if (ok) {
      setClassified((c) => ({ ...c, [current.id]: cat }));
    }
    setFeedback(ok ? "good" : "soft");
  }

  function advance() {
    setPicked(null);
    setFeedback(null);
    if (purchaseIdx + 1 < purchases.length) {
      setPurchaseIdx((i) => i + 1);
    } else {
      const i = FLOW.indexOf(stage);
      setStage(FLOW[Math.min(i + 1, FLOW.length - 1)]);
      setPurchaseIdx(0);
    }
  }
  function retry() { setFeedback(null); setPicked(null); }
  function skip() { answers.current[`skip-${stage}-${purchaseIdx}`] = true; advance(); }
  function finish() { onDone({ correct: true }); }

  void trainer;

  const scene: ReactNode = isDone ? (
    <div className="expenses-app expenses-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : current ? (
    <div className="expenses-app">
      <div className="expenses-current">
        <LessonItemArt id={current.art} size={58} className="expenses-current-art" />
        <span className="expenses-current-tag">{t.taskEyebrow}</span>
        <strong>{current.name}</strong>
        <small>{fmt(current.price)}</small>
      </div>
      <div className="expenses-cat-grid">
        {CATS.map((c) => {
          const filled = Object.values(classified).filter((cc) => cc === c).length;
          return (
            <div
              key={c}
              className={`expenses-cat-bucket${picked === c ? " expenses-cat-bucket--picked" : ""}`}
            >
              <ExpenseCategoryArt category={c} size={48} className="expenses-cat-art" />
              <strong>{t.categories[c].name}</strong>
              <small>{filled > 0 ? `${filled}shopping` : "empty"}</small>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;

  return (
    <div className="morning-quest-trainer expenses-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark expenses-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M3 10 H21 M9 10 V20 M15 10 V20" />
            </svg>
          </span>
          <div>
            <strong>{t.appTitle}</strong>
            <small>{t.stepCounter(round, purchaseIdx + 1, purchases.length || 4)}</small>
          </div>
        </div>
        <div className="mq-topbar-progress" aria-hidden="true">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className={`mq-topbar-dot${round > i + 1 || isDone ? " mq-topbar-dot--done" : ""}${round === i + 1 && !isDone ? " mq-topbar-dot--current" : ""}`}
            />
          ))}
        </div>
      </header>

      <div className="mq-shell">
        <div className="mq-phone-col">
          <div className={`mq-phone mq-phone--expenses-${stage}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">21:0{Math.min(round, 9)}</span>
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
            <p className="mq-panel-task-text">{current ? `${current.name} — ${fmt(current.price)}` : t.doneHint}</p>
          </div>

          {current && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{t.question}</h3>
              <div className="mq-panel-options">
                {CATS.map((c, i) => (
                  <button
                    key={c}
                    type="button"
                    className={`mq-panel-option${picked === c ? " mq-panel-option--picked" : ""}`}
                    onClick={() => tap(c)}
                  >
                    <span className="mq-panel-option-num">{i + 1}</span>
                    <span className="mq-panel-option-body">
                      <strong className="expense-option-label">
                        <ExpenseCategoryArt category={c} size={30} />
                        {t.categories[c].name}
                      </strong>
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
                  <button type="button" className="mq-panel-primary" onClick={advance}>{(stage === "round3" && purchaseIdx + 1 >= purchases.length) ? t.finish : t.next}</button>
                ) : (
                  <button type="button" className="mq-panel-primary outfit-retry" onClick={retry}>{t.retry}</button>
                )}
              </div>
            </div>
          ) : current ? (
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

function ExpenseCategoryArt({
  category,
  size,
  className,
}: {
  category: Category;
  size: number;
  className?: string;
}) {
  return (
    <LessonItemArt
      id={CATEGORY_ART[category]}
      size={size}
      className={className}
    />
  );
}
