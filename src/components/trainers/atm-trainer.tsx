"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { AtmTrainer as AtmTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: AtmTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Step = "insert" | "pin" | "operation" | "amount" | "receipt" | "done";
const FLOW: Step[] = ["insert", "pin", "operation", "amount", "receipt", "done"];
const STEPS = 5;

const OPERATIONS: Array<{ id: string; name: string; icon: LessonItemArtId; correct?: boolean }> = [
  { id: "balance", name: "Find out balance", icon: "bank-card-cash" },
  { id: "withdraw", name: "Withdraw cash", icon: "cash-withdrawal", correct: true },
  { id: "transfer", name: "Translate", icon: "bank-card-cash" },
  { id: "phone", name: "Top up your phone", icon: "phone-call" },
];

const AMOUNTS = [
  { id: "100", value: 100_000 },
  { id: "200", value: 200_000, correct: true },
  { id: "500", value: 500_000 },
  { id: "custom", value: 0, label: "Other amount" },
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
  insertCard: string;
  pinPrompt: string;
  questions: Record<Exclude<Step, "done">, string>;
  hints: Record<Exclude<Step, "done">, string>;
  receiptText: string;
  takeReceipt: string;
  feedbackGood: string;
  feedbackSoft: string;
}> = {
  ru: {
    appTitle: "ATM",
    stepCounter: (n) => `Step${n}from${STEPS}`,
    taskEyebrow: "Withdrawing money",
    questionEyebrow: "What to do",
    hintEyebrow: "Clue",
    feedbackEyebrow: "Checking",
    skip: "Don't know",
    finish: "Finish",
    retry: "Try again",
    next: "Next",
    doneTitle: "Well done! Money received, card returned.",
    doneHint: "Order: card → PIN → transaction → amount → check.",
    context: "You need to withdraw 200,000 sum from your card at an ATM.",
    insertCard: "Insert the card into the ATM",
    pinPrompt: "Enter 4-digit PIN code",
    questions: {
      insert: "What does it do with the card?",
      pin: "Enter PIN: 5432",
      operation: "What operation?",
      amount: "What amount?",
      receipt: "What to do with the check?",
    },
    hints: {
      insert: "Insert the card with the chip first.",
      pin: "PIN is your secret code. Don't show it to anyone.",
      operation: "You need to withdraw cash.",
      amount: "We need 200,000 sum.",
      receipt: "The receipt confirms the transaction. Take it and don’t throw it away at the ATM.",
    },
    receiptText: "Withdrawn: 200,000 soum Commission: 0 soum Balance: 1,240,000 soum",
    takeReceipt: "Pick up check",
    feedbackGood: "Right! Let's move on.",
    feedbackSoft: "This is not that. Try again.",
  },
  uz: {
    appTitle: "Bankomat",
    stepCounter: (n) => `${n} / ${STEPS}-qadam`,
    taskEyebrow: "Pul yechish",
    questionEyebrow: "Nima qilish",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    next: "Davom",
    doneTitle: "Yashasin! Pul olindi, karta qaytarildi.",
    doneHint: "Tartib: karta → PIN → operatsiya → summa → chek.",
    context: "Bankomatdan kartadan 200 000 soʻm yechish kerak.",
    insertCard: "Kartani bankomatga sol",
    pinPrompt: "4 raqamli PIN kodni kirit",
    questions: {
      insert: "Karta bilan nima qilish?",
      pin: "PIN: 5432",
      operation: "Qaysi operatsiya?",
      amount: "Qaysi summa?",
      receipt: "Chek bilan nima qilish?",
    },
    hints: {
      insert: "Kartani chip oldinda turishi kerak.",
      pin: "PIN — sening maxfiy kodingg. Hech kimga koʻrsatma.",
      operation: "Naqd pul yechish kerak.",
      amount: "200 000 soʻm kerak.",
      receipt: "Chek operatsiyani tasdiqlaydi. Olib ket.",
    },
    receiptText: "Yechildi: 200 000 soʻm\nKomissiya: 0 soʻm\nQolgan: 1 240 000 soʻm",
    takeReceipt: "Chekni olish",
    feedbackGood: "Toʻgʻri! Davom.",
    feedbackSoft: "Bu mos emas. Qayta urinib koʻr.",
  },
};

export function AtmTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [step, setStep] = useState<Step>("insert");
  const [pin, setPin] = useState("");
  const [pickedOp, setPickedOp] = useState<string | null>(null);
  const [pickedAmount, setPickedAmount] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = step === "done";
  const stepNum = isDone ? STEPS : FLOW.indexOf(step) + 1;

  function insertCard() {
    if (feedback) return;
    answers.current.insert = true;
    setFeedback("good");
  }
  function submitPin() {
    if (feedback || pin.length !== 4) return;
    const ok = pin === "5432";
    answers.current.pin = { value: pin, correct: ok };
    setFeedback(ok ? "good" : "soft");
  }
  function chooseOp(id: string, correct?: boolean) {
    if (feedback) return;
    setPickedOp(id);
    answers.current.op = { id, correct: !!correct };
    setFeedback(correct ? "good" : "soft");
  }
  function chooseAmount(id: string, correct?: boolean) {
    if (feedback) return;
    setPickedAmount(id);
    answers.current.amount = { id, correct: !!correct };
    setFeedback(correct ? "good" : "soft");
  }
  function takeReceipt() {
    if (feedback) return;
    answers.current.receipt = "taken";
    setFeedback("good");
  }

  function advance() {
    const i = FLOW.indexOf(step);
    setStep(FLOW[Math.min(i + 1, FLOW.length - 1)]);
    setFeedback(null);
  }
  function retry() {
    setFeedback(null);
    if (step === "pin") setPin("");
    if (step === "operation") setPickedOp(null);
    if (step === "amount") setPickedAmount(null);
  }
  function skip() { answers.current[`skip-${step}`] = true; advance(); }
  function finish() { onDone({ correct: true }); }

  void trainer;

  let body: ReactNode;
  if (isDone) {
    body = (
      <div className="atm-app atm-app--done">
        <div className="outfit-done-tick" aria-hidden="true">
          <CabinetIcon name="check" />
        </div>
        <strong>{t.doneTitle}</strong>
        <p>{t.doneHint}</p>
      </div>
    );
  } else {
    body = (
      <div className="atm-app">
        <div className="atm-machine-visual" aria-hidden="true">
          <LessonItemArt id="atm-standalone-realistic" size={122} />
        </div>
        <div className="atm-screen">
          {step === "insert" ? (
            <>
              <div className="atm-insert-art" aria-hidden="true">
                <LessonItemArt id="bank-card-cash" size={138} />
                <span className="atm-insert-arrow">↓</span>
              </div>
              <p>{t.insertCard}</p>
              <button type="button" className="atm-screen-action" onClick={insertCard}>Insert card</button>
            </>
          ) : step === "pin" ? (
            <>
              <strong style={{ fontSize: "1.04rem" }}>{t.pinPrompt}</strong>
              <div className="atm-pin">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className={`atm-pin-dot${pin.length > i ? " atm-pin-dot--filled" : ""}`} />
                ))}
              </div>
              <div className="atm-keypad">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <button key={n} type="button" className="atm-key" onClick={() => setPin((p) => p.length < 4 ? p + String(n) : p)} disabled={Boolean(feedback)}>{n}</button>
                ))}
                <button type="button" className="atm-key atm-key--func" onClick={() => setPin("")} disabled={Boolean(feedback)}>×</button>
                <button type="button" className="atm-key" onClick={() => setPin((p) => p.length < 4 ? p + "0" : p)} disabled={Boolean(feedback)}>0</button>
                <button type="button" className="atm-key atm-key--ok" onClick={submitPin} disabled={pin.length !== 4 || Boolean(feedback)}>✓</button>
              </div>
            </>
          ) : step === "operation" ? (
            <div className="atm-options">
              {OPERATIONS.map((o) => (
                <button key={o.id} type="button" className={`atm-option${pickedOp === o.id ? " atm-option--picked" : ""}`} onClick={() => chooseOp(o.id, o.correct)} disabled={Boolean(feedback)}>
                  <span className="atm-option-icon" aria-hidden="true">
                    <LessonItemArt id={o.icon} size={42} />
                  </span>
                  <strong>{o.name}</strong>
                </button>
              ))}
            </div>
          ) : step === "amount" ? (
            <div className="atm-amounts">
              {AMOUNTS.map((a) => (
                <button key={a.id} type="button" className={`atm-amount${pickedAmount === a.id ? " atm-amount--picked" : ""}`} onClick={() => chooseAmount(a.id, a.correct)} disabled={Boolean(feedback)}>
                  <strong>{a.label ?? a.value.toLocaleString("ru-RU") + "am"}</strong>
                </button>
              ))}
            </div>
          ) : step === "receipt" ? (
            <div className="atm-receipt">
              <strong>Check</strong>
              <pre>{t.receiptText}</pre>
              <button type="button" className="atm-screen-action" onClick={takeReceipt} disabled={Boolean(feedback)}>{t.takeReceipt}</button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="morning-quest-trainer atm-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark atm-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="6" width="18" height="14" rx="2" />
              <path d="M3 10 H21 M7 16 H10 M14 16 H17" />
            </svg>
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
          <div className={`mq-phone mq-phone--atm-${step}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">12:0{stepNum}</span>
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
                  <button type="button" className="mq-panel-primary" onClick={advance}>{step === "receipt" ? t.finish : t.next}</button>
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
