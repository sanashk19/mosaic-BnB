"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { CreditContractTrainer as CreditContractTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: CreditContractTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Clause = "amount" | "rate" | "term" | "total" | "penalty";
const ORDER: Clause[] = ["amount", "rate", "term", "total"];
const TOTAL = ORDER.length;

const VALUES: Record<Clause, { label: string; value: string; risk?: boolean }> = {
  amount: { label: "Loan amount", value: "10,000,000 soum" },
  rate: { label: "Percentage per year", value: "24%" },
  term: { label: "Term", value: "12 months" },
  total: { label: "Total to return", value: "12,240,000 sum" },
  penalty: { label: "Fine for late payment", value: "0.5% per day", risk: true },
};

type Locales<T> = Record<Locale, T>;
const dict: Locales<{
  appTitle: string;
  taskEyebrow: string;
  questionEyebrow: string;
  hintEyebrow: string;
  feedbackEyebrow: string;
  skip: string;
  finish: string;
  retry: string;
  doneTitle: string;
  doneHint: string;
  context: string;
  prompt: (label: string) => string;
  hints: Record<Clause, string>;
  feedbackGood: (label: string, value: string) => string;
  feedbackSoft: string;
  step: (n: number, total: number) => string;
}> = {
  ru: {
    appTitle: "Loan agreement",
    taskEyebrow: "Agreement",
    questionEyebrow: "Find it in the contract",
    hintEyebrow: "Clue",
    feedbackEyebrow: "Checking",
    skip: "Don't know",
    finish: "Finish",
    retry: "Try again",
    doneTitle: "Well done! You have read all the important points.",
    doneHint: "Before signing a loan, always check: the amount, interest, term and total repayment.",
    context: "Mom wants to take out a loan. Help me read the contract - find 4 important numbers.",
    prompt: (label) => label,
    hints: {
      amount: "The amount is how much the mother will receive in her hands.",
      rate: "Interest - how much you need to pay extra per year.",
      term: "Term - how long it takes to return it.",
      total: "Total refund - amount + interest for the entire time.",
      penalty: "The fine is a separate item; not the first thing you need to know.",
    },
    feedbackGood: (label, value) => `That's right.${label}: ${value}.`,
    feedbackSoft: "This is another point. Look again.",
    step: (n, total) => `Found${n}from${total}`,
  },
  uz: {
    appTitle: "Kredit shartnomasi",
    taskEyebrow: "Shartnoma",
    questionEyebrow: "Topibcha",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    doneTitle: "Yashasin! Sen muhim bandlarni oʻqib chiqding.",
    doneHint: "Imzodan oldin: summa, foiz, muddat va umumiy qaytarish.",
    context: "Oyim kredit olmoqchi. Shartnomani oʻqishga yordam ber — 4 muhim raqamni top.",
    prompt: (label) => label,
    hints: {
      amount: "Summa — oyim qancha pul oladi.",
      rate: "Foiz — yiliga qancha ortiqcha toʻlash.",
      term: "Muddat — qachongacha qaytarish.",
      total: "Umumiy qaytarish — summa va foizlar birga.",
      penalty: "Jarima — alohida band.",
    },
    feedbackGood: (label, value) => `Toʻgʻri. ${label}: ${value}.`,
    feedbackSoft: "Bu boshqa band. Qayta qara.",
    step: (n, total) => `${n} / ${total} topildi`,
  },
};

const CLAUSES_ON_DOC: Clause[] = ["amount", "rate", "term", "total", "penalty"];

export function CreditContractTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [found, setFound] = useState<Clause[]>([]);
  const [lastFound, setLastFound] = useState<Clause | null>(null);
  const [wrongTap, setWrongTap] = useState(false);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = found.length === TOTAL;
  const remaining = ORDER.filter((c) => !found.includes(c));
  const currentTarget = remaining[0] ?? null;

  function tap(c: Clause) {
    if (isDone) return;
    if (found.includes(c)) return;
    if (c === currentTarget) {
      setFound((arr) => [...arr, c]);
      setLastFound(c);
      setWrongTap(false);
      answers.current[`credit-${c}`] = "found";
    } else {
      setWrongTap(true);
      setTimeout(() => setWrongTap(false), 600);
    }
  }

  function skip() {
    if (currentTarget) {
      answers.current[`skip-${currentTarget}`] = true;
      setFound((arr) => [...arr, currentTarget]);
    }
  }

  function finish() {
    onDone({ correct: true });
  }

  void trainer;

  const scene: ReactNode = isDone ? (
    <div className="credit-app credit-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : (
    <div className="credit-app">
      <div className={`credit-doc${wrongTap ? " credit-doc--shake" : ""}`}>
        <div className="credit-doc-head">
          <span className="credit-doc-head-art" aria-hidden="true">
            <LessonItemArt id="realistic-credit-contract" size={58} />
          </span>
          <div>
            <strong>Loan agreement No.<span className="credit-doc-number">K-2026-08-14</span></strong>
            <small>Bank Mosaic</small>
          </div>
        </div>
        <div className="credit-doc-body">
          {CLAUSES_ON_DOC.map((c) => {
            const isFound = found.includes(c);
            const isTarget = currentTarget === c;
            return (
              <button
                key={c}
                type="button"
                className={`credit-clause${isFound ? " credit-clause--found" : ""}${isTarget ? " credit-clause--target" : ""}${VALUES[c].risk ? " credit-clause--risk" : ""}`}
                onClick={() => tap(c)}
                disabled={isFound}
              >
                <span className="credit-clause-label">{VALUES[c].label}</span>
                <span className="credit-clause-value">{VALUES[c].value}</span>
              </button>
            );
          })}
        </div>
        <div className="credit-doc-foot">
          <small>Client signature: ________</small>
          <small>Bank signature: Mosaic</small>
        </div>
      </div>
    </div>
  );

  return (
    <div className="morning-quest-trainer credit-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark credit-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="3" width="16" height="18" rx="2" />
              <path d="M8 8 H16 M8 12 H16 M8 16 H12" />
            </svg>
          </span>
          <div>
            <strong>{t.appTitle}</strong>
            <small>{t.step(found.length, TOTAL)}</small>
          </div>
        </div>
        <div className="mq-topbar-progress" aria-hidden="true">
          {ORDER.map((c) => (
            <span key={c} className={`mq-topbar-dot${found.includes(c) ? " mq-topbar-dot--done" : ""}${currentTarget === c ? " mq-topbar-dot--current" : ""}`} />
          ))}
        </div>
      </header>

      <div className="mq-shell">
        <div className="mq-phone-col">
          <div className={`mq-phone mq-phone--credit${isDone ? "-done" : ""}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">15:0{Math.min(found.length + 1, 9)}</span>
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
            <p className="mq-panel-task-text">{t.context}</p>
          </div>

          {!isDone && currentTarget ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{t.prompt(VALUES[currentTarget].label)}</h3>
              {wrongTap ? <p style={{ color: "#dc2626", marginTop: 8, fontSize: "0.9rem" }}>{t.feedbackSoft}</p> : null}
            </div>
          ) : null}

          {lastFound ? (
            <div className="outfit-feedback outfit-feedback--good">
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{t.feedbackGood(VALUES[lastFound].label, VALUES[lastFound].value)}</p>
            </div>
          ) : null}

          {!isDone && currentTarget ? (
            <div className="mq-panel-hint">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>{t.hints[currentTarget]}</p>
            </div>
          ) : null}

          <div className="mq-panel-footer">
            {isDone ? (
              <button type="button" className="mq-panel-primary" onClick={finish}>{t.finish}</button>
            ) : (
              <button type="button" className="mq-panel-skip" onClick={skip}>{t.skip}</button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
