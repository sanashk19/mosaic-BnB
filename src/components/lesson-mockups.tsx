"use client";

/* UI Module */

import { useEffect, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";

// UI Logic

export type WashingProgram = {
  id: string;
  label: string;
  temp: number;
  spin: string;
  correct?: boolean;
};

export function WashingMachineMockup({
  itemLabel,
  itemEmoji,
  hint,
  programs,
  onResult,
}: {
  itemLabel: string;
  itemEmoji: string;
  hint: string;
  programs: WashingProgram[];
  onResult: (correct: boolean, label: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [answered, setAnswered] = useState(false);
  const sel = programs.find((p) => p.id === selected);

  const start = () => {
    if (!sel) return;
    setRunning(true);
    setAnswered(true);
    onResult(!!sel.correct, sel.label);
  };

  return (
    <div className="mock-row">
      <div className="mock-item">
        <div className="mock-item-emoji">{itemEmoji}</div>
        <strong>{itemLabel}</strong>
        <p className="mock-hint">{hint}</p>
      </div>

      <div className="mock-washer">
        <div className="mock-washer-top">
          <span className="mock-washer-brand">MOSAIC WASH</span>
          <div className="mock-washer-led">
            {running ? (
              <span className="mock-washer-led-text mock-washer-led-blink">▶ WASHING</span>
            ) : sel ? (
              <span className="mock-washer-led-text">
                {sel.temp}°C · {sel.spin.toUpperCase()}
              </span>
            ) : (
              <span className="mock-washer-led-text mock-washer-led-dim">CHOOSE A PROGRAM</span>
            )}
          </div>
        </div>

        <div className="mock-washer-panel">
          <div className="mock-washer-dial-area">
            <span className="mock-washer-dial-label">Washing program</span>
            <div className="mock-washer-programs-list">
              {programs.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`mock-washer-program ${selected === p.id ? "is-active" : ""}`}
                  disabled={answered}
                  onClick={() => setSelected(p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="mock-washer-start"
            disabled={!selected || answered}
            onClick={start}
            aria-label="Start washing"
          >
            START</button>
        </div>

        <div className="mock-washer-door-wrap">
          <div className="mock-washer-door">
            <div className={`mock-washer-drum ${running ? "is-running" : ""}`}>
              <span className="mock-washer-clothes">{itemEmoji}</span>
            </div>
          </div>
        </div>

        <div className="mock-washer-bottom" aria-hidden="true" />
        <div className="mock-washer-feet" aria-hidden="true" />
      </div>
    </div>
  );
}

// UI Logic

export type AtmStep = {
  /* UI Module */
  phase: "insert" | "pin" | "operation" | "amount" | "take";
  /* UI Module */
  task: string;
  /* UI Module */
  correctAction: string;
  /* UI Module */
  wrongActions: string[];
};

export function AtmMockup({
  amount,
  pin = "1234",
  onResult,
}: {
  amount: string;
  pin?: string;
  onResult: (correct: boolean, action: string) => void;
}) {
  type Phase = "insert" | "pin" | "operation" | "confirm" | "done";
  const [phase, setPhase] = useState<Phase>("insert");
  const [enteredPin, setEnteredPin] = useState("");
  const [shielded, setShielded] = useState(false);
  const [exposed, setExposed] = useState(false);

  const reset = () => {
    setPhase("insert");
    setEnteredPin("");
    setShielded(false);
    setExposed(false);
  };

  const tapDigit = (d: string) => {
    if (phase !== "pin") return;
    const next = enteredPin + d;
    setEnteredPin(next);
    if (next.length >= pin.length) {
      setTimeout(() => setPhase("operation"), 350);
    }
  };

  const insertCard = () => {
    if (phase !== "insert") return;
    setPhase("pin");
  };

  const toggleShield = () => {
    if (phase !== "pin") return;
    setShielded(!shielded);
  };

  const tellPin = () => {
    setExposed(true);
    onResult(false, "Showed PIN - dangerous");
  };

  const finish = (correct: boolean, action: string) => {
    setPhase("done");
    onResult(correct, action);
  };

  return (
    <div className="mock-atm">
      <div className="mock-atm-top">
        <span className="mock-atm-brand">MOSAIC BANK</span>
      </div>

      <div className="mock-atm-screen-wrap">
      <div className="mock-atm-screen">
        {phase === "insert" && (
          <>
            <h4>Insert card</h4>
            <p>The card is inserted with the chip facing up →</p>
          </>
        )}
        {phase === "pin" && (
          <>
            <h4>Enter your PIN</h4>
            <div className="mock-pin-display">
              {Array.from({ length: pin.length }).map((_, i) => (
                <span key={i} className={`mock-pin-dot ${i < enteredPin.length ? "is-filled" : ""}`}>
                  {shielded ? "•" : i < enteredPin.length ? enteredPin[i] : ""}
                </span>
              ))}
            </div>
            <p className={shielded ? "ok" : "warn"}>
              {shielded ? "✓ The keyboard is covered with your hand" : "⚠ Cover the keyboard with your hand!"}
            </p>
            {exposed ? <p className="warn">❌ PIN is shown to others - the card is blocked</p> : null}
          </>
        )}
        {phase === "operation" && (
          <>
            <h4>Select operation</h4>
            <div className="mock-atm-ops">
              <button type="button" onClick={() => setPhase("confirm")}>
                
                Remove{amount}
              </button>
              <button type="button" onClick={() => finish(false, "Transfer selected not for withdrawal")}>
                
                Translation</button>
              <button type="button" onClick={() => finish(false, "Balance - but we wanted to remove")}>
                
                Balance</button>
            </div>
          </>
        )}
        {phase === "confirm" && (
          <>
            <h4>Remove{amount}?</h4>
            <p>Please check the amount before confirming.</p>
            <div className="mock-atm-confirm">
              <button type="button" className="ok-btn" onClick={() => finish(true, "Amount verified and confirmed")}>
                
                ✓ Yes, remove</button>
              <button type="button" className="neutral-btn" onClick={() => setPhase("operation")}>
                
                ✗ Cancel</button>
            </div>
          </>
        )}
        {phase === "done" && (
          <>
            <h4>Take your card and money</h4>
            <p>Don&apos;t forget the card &mdash; you&apos;ll need it later.</p>
            <button type="button" className="ok-btn" onClick={reset}>Anew</button>
          </>
        )}
      </div>
      </div>

      {phase === "insert" ? (
        <div className="mock-atm-cardslot">
          <div className="mock-atm-slot-bar" />
          <button type="button" className="mock-atm-insert" onClick={insertCard}>
            <span className="mock-atm-card">💳</span>
            Insert card</button>
        </div>
      ) : phase === "pin" ? (
        <div className="mock-atm-keypad">
          {["1","2","3","4","5","6","7","8","9","","0",""].map((d, i) =>
            d ? (
              <button key={i} type="button" className="mock-atm-key" onClick={() => tapDigit(d)}>
                {d}
              </button>
            ) : <div key={i} />,
          )}
          <button type="button" className="mock-atm-shield" onClick={toggleShield}>
            {shielded ? "Open" : "🤚 Cover with your hand"}
          </button>
          <button type="button" className="mock-atm-tell" onClick={tellPin}>
            👁 Show PIN to someone else</button>
        </div>
      ) : null}

      <div className="mock-atm-cash">
        {phase === "done" ? <span>💵 {amount}</span> : <span className="mock-atm-cash-empty">⬇ Issue window</span>}
      </div>
    </div>
  );
}

// UI Logic

// UI Logic
function SevenSegmentDigit({ digit }: { digit: string }) {
  // UI Logic
  // UI Logic
  const segs: Record<string, string> = {
    "0": "abcdef", "1": "bc", "2": "abged", "3": "abgcd",
    "4": "fgbc",   "5": "afgcd","6": "afgcde","7": "abc",
    "8": "abcdefg","9": "abcfgd","-": "g", " ": "",
  };
  const active = segs[digit] ?? "";
  const on = (s: string) => active.includes(s) ? "#065f46" : "rgba(6,95,70,0.08)";
  return (
    <svg viewBox="0 0 40 70" width="28" height="48" aria-hidden="true">
      {/* a — top */}
      <polygon points="6,4 34,4 30,8 10,8" fill={on("a")} />
      {/* b — top right */}
      <polygon points="34,5 36,33 32,30 32,9" fill={on("b")} />
      {/* c — bottom right */}
      <polygon points="36,37 34,66 32,61 32,40" fill={on("c")} />
      {/* d — bottom */}
      <polygon points="6,66 34,66 30,62 10,62" fill={on("d")} />
      {/* e — bottom left */}
      <polygon points="6,66 4,37 8,40 8,61" fill={on("e")} />
      {/* f — top left */}
      <polygon points="4,33 6,5 8,9 8,30" fill={on("f")} />
      {/* g — middle */}
      <polygon points="6,35 10,33 30,33 34,35 30,37 10,37" fill={on("g")} />
    </svg>
  );
}

function LcdReadout({ value, unit }: { value: string; unit?: string }) {
  // value like "38.5" — split into chars
  return (
    <div className="mock-lcd">
      {value.split("").map((ch, i) =>
        ch === "." ? (
          <span key={i} className="mock-lcd-dot" />
        ) : (
          <SevenSegmentDigit key={i} digit={ch} />
        ),
      )}
      {unit ? <span className="mock-lcd-unit">{unit}</span> : null}
    </div>
  );
}

export function ThermometerMockup({
  value,
  onClassify,
}: {
  value: number;
  onClassify: (choice: "low" | "norm" | "high") => void;
}) {
  const isLow = value < 36;
  const isHigh = value > 37.2;
  const zone: "low" | "norm" | "high" = isLow ? "low" : isHigh ? "high" : "norm";

  return (
    <div className="mock-thermo">
      <div className="mock-thermo-body">
        <div className="mock-thermo-screen">
          <LcdReadout value={value.toFixed(1)} unit="°C" />
        </div>
        <div className="mock-thermo-tip" />
      </div>

      <div className="mock-thermo-scale">
        <div className="mock-thermo-scale-bar">
          <div className="mock-thermo-scale-low">⬇ below 36</div>
          <div className="mock-thermo-scale-norm">norm 36.0–37.2</div>
          <div className="mock-thermo-scale-high">⬆ above 37.2</div>
        </div>
        <div className="mock-thermo-pointer" style={{ left: `${Math.max(0, Math.min(100, ((value - 34) / 6) * 100))}%` }} />
      </div>

      <div className="mock-thermo-choices">
        <button type="button" className={`mock-thermo-choice ${zone === "low" ? "is-pulse" : ""}`} onClick={() => onClassify("low")}>
          
          Reduced</button>
        <button type="button" className={`mock-thermo-choice ${zone === "norm" ? "is-pulse" : ""}`} onClick={() => onClassify("norm")}>
          
          Norm</button>
        <button type="button" className={`mock-thermo-choice ${zone === "high" ? "is-pulse" : ""}`} onClick={() => onClassify("high")}>
          
          Increased</button>
      </div>
    </div>
  );
}

// UI Logic

export function VolumeMockup({
  onSubmit,
}: {
  onSubmit: (value: number, safe: boolean) => void;
}) {
  const [v, setV] = useState(50);
  const safe = v <= 60;
  const zone = v <= 60 ? "safe" : v <= 80 ? "warn" : "danger";

  return (
    <div className="mock-vol">
      <div className="mock-vol-headset">🎧</div>
      <div className="mock-vol-display">
        <span className={`mock-vol-value ${zone}`}>{v}%</span>
        <span className="mock-vol-label">
          {zone === "safe" ? "✓ Safe" : zone === "warn" ? "⚠ Loud" : "❌ Harmful to hearing"}
        </span>
      </div>
      <div className="mock-vol-track">
        <div className="mock-vol-zone-safe" />
        <div className="mock-vol-zone-warn" />
        <div className="mock-vol-zone-danger" />
        <input
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => setV(parseInt(e.target.value))}
          className="mock-vol-slider"
        />
      </div>
      <button type="button" className="mock-vol-submit" onClick={() => onSubmit(v, safe)}>
        
        Set volume</button>
    </div>
  );
}

// UI Logic

export function WeatherMockup({
  temp,
  uv,
  icon,
  onAdvice,
}: {
  temp: number;
  uv: "low" | "mid" | "high";
  icon: string;
  onAdvice: (advice: "hat-cream" | "hat" | "nothing") => void;
}) {
  return (
    <div className="mock-weather">
      <div className="mock-weather-card">
        <div className="mock-weather-icon">{icon}</div>
        <div className="mock-weather-temp">{temp > 0 ? "+" : ""}{temp}°C</div>
        <div className={`mock-weather-uv mock-weather-uv--${uv}`}>
          
          UV index:{uv === "low" ? "short" : uv === "mid" ? "average" : "high"}
        </div>
      </div>
      <div className="mock-weather-choices">
        <button type="button" onClick={() => onAdvice("hat-cream")}>🧢 + 🧴 Headdress and cream</button>
        <button type="button" onClick={() => onAdvice("hat")}>🧢 Headdress only</button>
        <button type="button" onClick={() => onAdvice("nothing")}>Nothing is needed</button>
      </div>
    </div>
  );
}

// UI Logic

export function ProductLabelMockup({
  productName,
  productEmoji,
  expiryYear,
  currentYear = 2026,
  onDecide,
}: {
  productName: string;
  productEmoji: string;
  expiryYear: number | null;
  currentYear?: number;
  onDecide: (use: boolean) => void;
}) {
  const expired = expiryYear === null ? true : expiryYear < currentYear;
  return (
    <div className="mock-label">
      <div className="mock-label-pkg">
        <div className="mock-label-emoji">{productEmoji}</div>
        <div className="mock-label-sticker">
          <strong className="mock-label-name">{productName}</strong>
          <div className="mock-label-line">
            <span className="mock-label-key">Best before date:</span>{" "}
            <span className={`mock-label-exp ${expired ? "expired" : "fresh"}`}>
              {expiryYear === null ? "not indicated" : `until${expiryYear}g.`}
            </span>
          </div>
          <div className="mock-label-line">
            <span className="mock-label-key">Application:</span>{" "}
            <span>apply a thin layer</span>
          </div>
          <div className={`mock-label-badge ${expired ? "expired" : "fresh"}`}>
            <span className="mock-label-dot" aria-hidden="true" />
            {expired ? "EXPIRED" : "FIT"}
          </div>
        </div>
      </div>
      <div className="mock-label-choices">
        <button type="button" className="ok-btn" onClick={() => onDecide(true)}>
          
          ✓ You can use</button>
        <button type="button" className="neutral-btn" onClick={() => onDecide(false)}>
          
          ✗ Cannot be used</button>
      </div>
    </div>
  );
}

// UI Logic

export function MessengerMockup({
  contact,
  incoming,
  options,
  onSend,
}: {
  contact: string;
  incoming: string;
  options: Array<{ text: string; correct: boolean; feedback: string }>;
  onSend: (idx: number) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="mock-msg">
      <div className="mock-msg-header">
        <div className="mock-msg-avatar">👤</div>
        <div>
          <strong>{contact}</strong>
          <span>was online just now</span>
        </div>
      </div>
      <div className="mock-msg-thread">
        <div className="mock-msg-bubble them">
          {incoming}
          <span className="mock-msg-time">14:25</span>
        </div>
        {picked !== null ? (
          <div className="mock-msg-bubble me">
            {options[picked].text}
            <span className="mock-msg-time">14:26 ✓</span>
          </div>
        ) : null}
      </div>
      <div className="mock-msg-options">
        <span className="mock-msg-hint">What&apos;s your answer?</span>
        {options.map((o, i) => (
          <button
            key={i}
            type="button"
            disabled={picked !== null}
            className="mock-msg-opt"
            onClick={() => { setPicked(i); onSend(i); }}
          >
            {o.text}
          </button>
        ))}
      </div>
    </div>
  );
}

// UI Logic

export function TrainBoardMockup({
  targetTrain,
  targetTime,
  rows,
  onPick,
}: {
  targetTrain: string;
  targetTime: string;
  rows: Array<{ train: string; from: string; to: string; time: string; platform: string }>;
  onPick: (idx: number) => void;
}) {
  return (
    <div className="mock-board">
      <div className="mock-board-task">
        Find:<strong>{targetTrain}</strong> on<strong>{targetTime}</strong>
      </div>
      <div className="mock-board-table">
        <div className="mock-board-row mock-board-head">
          <span>Train</span><span>From → To</span><span>Time</span><span>Platf.</span>
        </div>
        {rows.map((r, i) => (
          <button key={i} type="button" className="mock-board-row" onClick={() => onPick(i)}>
            <span>№ {r.train}</span>
            <span>{r.from} → {r.to}</span>
            <span>{r.time}</span>
            <span>{r.platform}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// UI Logic

export function SkinQuizMockup({
  questions,
  correctType,
  onResult,
}: {
  questions: Array<{ text: string; options: string[]; correctOption: string }>;
  correctType: string;
  onResult: (allCorrect: boolean) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const submit = (opt: string) => {
    const next = [...answers, opt];
    setAnswers(next);
    if (idx < questions.length - 1) {
      setIdx(idx + 1);
    } else {
      const allCorrect = next.every((a, i) => a === questions[i].correctOption);
      setDone(true);
      onResult(allCorrect);
    }
  };

  if (done) {
    return (
      <div className="mock-skin">
        <div className="mock-skin-result">
          <div className="mock-skin-result-emoji">✨</div>
          <strong>Questionnaire result</strong>
          <p>Skin type:<span className="ok-result">{correctType}</span></p>
          <p>Recommendation: gentle wash, light cream without oil.</p>
        </div>
      </div>
    );
  }

  const q = questions[idx];
  return (
    <div className="mock-skin">
      <div className="mock-skin-app">
        <div className="mock-skin-header">
          <span className="mock-skin-back">←</span>
          <strong>Questionnaire “Skin Type”</strong>
          <span />
        </div>
        <div className="mock-skin-progress">
          <div className="mock-skin-progress-bar" style={{ width: `${((idx) / questions.length) * 100}%` }} />
        </div>
        <div className="mock-skin-question-num">Question{idx + 1} from{questions.length}</div>
        <p className="mock-skin-question">{q.text}</p>
        <div className="mock-skin-options">
          {q.options.map((o, i) => (
            <button key={i} type="button" className="mock-skin-radio" onClick={() => submit(o)}>
              <span className="mock-skin-radio-dot" />
              <span>{o}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// UI Logic

export function ChecklistMockup({
  title,
  steps,
  onComplete,
}: {
  title: string;
  steps: string[];
  onComplete: (allDone: boolean) => void;
}) {
  const [done, setDone] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const allDone = done.size === steps.length;

  const toggle = (i: number) => {
    const next = new Set(done);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setDone(next);
  };

  return (
    <div className="mock-checklist">
      <div className="mock-checklist-app">
        <div className="mock-checklist-header">
          <strong>{title}</strong>
          <span className="mock-checklist-count">{done.size}/{steps.length}</span>
        </div>
        <ul className="mock-checklist-list">
          {steps.map((s, i) => {
            const checked = done.has(i);
            return (
              <li key={i}>
                <button type="button" className={`mock-checklist-item ${checked ? "is-done" : ""}`} onClick={() => toggle(i)}>
                  <span className="mock-checklist-check">{checked ? "✓" : ""}</span>
                  <span className="mock-checklist-step">{i + 1}. {s}</span>
                </button>
              </li>
            );
          })}
        </ul>
        {!submitted ? (
          <button type="button" className="mock-checklist-submit" disabled={!allDone} onClick={() => { setSubmitted(true); onComplete(true); }}>
            {allDone ? "✓ Done" : `Remaining${steps.length - done.size}`}
          </button>
        ) : (
          <div className="mock-checklist-done">All steps completed!</div>
        )}
      </div>
    </div>
  );
}

// UI Logic

export function MenuMockup({
  task,
  dishes,
  onPick,
}: {
  task: string;
  dishes: Array<{ name: string; emoji: string; category: "good" | "bad"; note: string }>;
  onPick: (correct: boolean, name: string) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="mock-menu">
      <div className="mock-menu-task">{task}</div>
      <div className="mock-menu-grid">
        {dishes.map((d, i) => {
          const isPicked = picked === d.name;
          return (
            <button
              key={i}
              type="button"
              className={`mock-menu-card ${isPicked ? (d.category === "good" ? "is-good" : "is-bad") : ""}`}
              disabled={picked !== null}
              onClick={() => { setPicked(d.name); onPick(d.category === "good", d.name); }}
            >
              <div className="mock-menu-emoji">{d.emoji}</div>
              <div className="mock-menu-name">{d.name}</div>
              <div className={`mock-menu-note mock-menu-note--${d.category}`}>
                {d.category === "good" ? "✓ useful" : "✗ not the best choice"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// UI Logic

export function RecipeMockup({
  recipeName,
  emoji,
  ingredients,
  question,
  options,
  onAnswer,
}: {
  recipeName: string;
  emoji: string;
  ingredients: Array<{ name: string; amount: string; highlight?: boolean }>;
  question: string;
  options: Array<{ text: string; correct: boolean }>;
  onAnswer: (correct: boolean) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="mock-recipe">
      <div className="mock-recipe-card">
        <div className="mock-recipe-hero">
          <div className="mock-recipe-emoji">{emoji}</div>
          <strong>{recipeName}</strong>
        </div>
        <div className="mock-recipe-section-title">Ingredients</div>
        <ul className="mock-recipe-ingredients">
          {ingredients.map((ing, i) => (
            <li key={i} className={ing.highlight ? "is-highlight" : ""}>
              <span>{ing.name}</span>
              <strong>{ing.amount}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="mock-recipe-quiz">
        <p>{question}</p>
        <div className="mock-recipe-options">
          {options.map((o, i) => (
            <button
              key={i}
              type="button"
              className={`mock-recipe-option ${picked === i ? (o.correct ? "is-correct" : "is-wrong") : ""}`}
              disabled={picked !== null}
              onClick={() => { setPicked(i); onAnswer(o.correct); }}
            >
              {o.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// UI Logic

export function BudgetFormMockup({
  mode, // "income" | "expense"
  fields,
  expectedTotal,
  comparisonValue, // UI Logic
  onSubmit,
}: {
  mode: "income" | "expense";
  fields: Array<{ label: string; placeholder: string; expectedValue: number }>;
  expectedTotal: number;
  comparisonValue?: number;
  onSubmit: (correct: boolean, total: number) => void;
}) {
  const [values, setValues] = useState<string[]>(fields.map(() => ""));
  const [submitted, setSubmitted] = useState(false);

  const totals = values.map((v) => parseInt(v.replace(/\s/g, "")) || 0);
  const total = totals.reduce((s, n) => s + n, 0);
  const fmt = (n: number) => n.toLocaleString("ru-RU") + "am";

  const submit = () => {
    setSubmitted(true);
    onSubmit(total === expectedTotal, total);
  };

  return (
    <div className="mock-budget">
      <div className="mock-budget-app">
        <div className="mock-budget-header">
          <strong>{mode === "income" ? "Family income per month" : "Family expenses per month"}</strong>
        </div>

        <div className="mock-budget-fields">
          {fields.map((f, i) => (
            <div key={i} className="mock-budget-row">
              <label>{f.label}</label>
              <div className="mock-budget-input-wrap">
                <input
                  type="text"
                  placeholder={f.placeholder}
                  value={values[i]}
                  disabled={submitted}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^0-9 ]/g, "");
                    const next = [...values];
                    next[i] = v;
                    setValues(next);
                  }}
                />
                <span className="mock-budget-currency">am</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mock-budget-total-row">
          <span>Total:</span>
          <strong className="mock-budget-total">{fmt(total)}</strong>
        </div>

        {mode === "expense" && comparisonValue !== undefined ? (
          <div className={`mock-budget-compare ${total > comparisonValue ? "over" : "ok"}`}>
            <span>Income:{fmt(comparisonValue)}</span>
            <span>{total > comparisonValue ? "⚠ Overspending" : "✓ Stayed within budget"}</span>
          </div>
        ) : null}

        {!submitted ? (
          <button type="button" className="mock-budget-submit" onClick={submit}>
            Save</button>
        ) : (
          <div className={`mock-budget-result ${total === expectedTotal ? "ok" : "warn"}`}>
            {total === expectedTotal ? "✓ The calculation is correct" : `⚠ Expected amount:${fmt(expectedTotal)}`}
          </div>
        )}
      </div>
    </div>
  );
}

// UI Logic

export function GovPortalMockup({
  serviceName,
  fields,
  expectedValues,
  onSubmit,
}: {
  serviceName: string;
  fields: Array<{ label: string; type: "text" | "select"; options?: string[]; expected?: string }>;
  expectedValues: Record<string, string>;
  onSubmit: (correct: boolean) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [step, setStep] = useState<"form" | "review" | "done">("form");

  const submit = () => {
    const allCorrect = fields.every((f) => {
      const expected = expectedValues[f.label];
      if (!expected) return true;
      return values[f.label] === expected;
    });
    setStep("done");
    onSubmit(allCorrect);
  };

  return (
    <div className="mock-gov">
      <div className="mock-gov-bar">
        <strong>Digital Government Services</strong>
        <span className="mock-gov-user">Dear</span>
      </div>

      {step === "form" && (
        <>
          <div className="mock-gov-service">
            <span className="mock-gov-badge">State service</span>
            <h4>{serviceName}</h4>
          </div>

          <div className="mock-gov-form">
            {fields.map((f, i) => (
              <div key={i} className="mock-gov-field">
                <label>{f.label}</label>
                {f.type === "text" ? (
                  <input
                    type="text"
                    value={values[f.label] || ""}
                    onChange={(e) => setValues({ ...values, [f.label]: e.target.value })}
                  />
                ) : (
                  <select
                    value={values[f.label] || ""}
                    onChange={(e) => setValues({ ...values, [f.label]: e.target.value })}
                  >
                    <option value="">- choose -</option>
                    {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                )}
              </div>
            ))}
            <button
              type="button"
              className="mock-gov-submit"
              disabled={fields.some((f) => !values[f.label])}
              onClick={() => setStep("review")}
            >
              
              Check and submit →</button>
          </div>
        </>
      )}

      {step === "review" && (
        <div className="mock-gov-review">
          <h4>Check your application before submitting</h4>
          <ul>
            {fields.map((f) => (
              <li key={f.label}>
                <span>{f.label}:</span>
                <strong>{values[f.label]}</strong>
              </li>
            ))}
          </ul>
          <div className="mock-gov-review-actions">
            <button type="button" className="mock-gov-back" onClick={() => setStep("form")}>← Edit</button>
            <button type="button" className="mock-gov-confirm" onClick={submit}>✓ Submit an application</button>
          </div>
        </div>
      )}

      {step === "done" && (
        <div className="mock-gov-done">
          <div className="mock-gov-done-icon">✅</div>
          <strong>Application accepted</strong>
          <p>Number:<code>UZ-2026-001234</code></p>
          <p>Execution time: 5 working days</p>
        </div>
      )}
    </div>
  );
}

// UI Logic

export function ContractMockup({
  contract,
  question,
  onPick,
}: {
  contract: Array<{ text: string; important: boolean; correctTarget?: boolean }>;
  question: string;
  onPick: (correct: boolean, line: string) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="mock-contract">
      <div className="mock-contract-header">
        <strong>Loan agreement No. 2026/0042</strong>
        <span className="mock-contract-bank">MOSAIC BANK</span>
      </div>
      <p className="mock-contract-task">{question}</p>
      <ol className="mock-contract-list">
        {contract.map((c, i) => (
          <li
            key={i}
            className={`mock-contract-item ${picked === i ? (c.correctTarget ? "is-correct" : "is-wrong") : ""}`}
            onClick={() => { if (picked === null) { setPicked(i); onPick(!!c.correctTarget, c.text); } }}
          >
            <span className="mock-contract-num">{i + 1}.</span>
            <span className={c.important ? "mock-contract-important" : ""}>{c.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// UI Logic

export function TransportDirectoryMockup({
  task,
  items,
  correctSlug,
  onPick,
}: {
  task: string;
  items: Array<{ slug: string; emoji: string; name: string; subtitle: string }>;
  correctSlug: string;
  onPick: (correct: boolean, name: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const filtered = items.filter((it) => it.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mock-transport">
      <div className="mock-transport-task">{task}</div>
      <div className="mock-transport-search">
        <span className="mock-transport-search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search: bus, train, metro..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mock-transport-list">
        {filtered.map((it) => (
          <button
            key={it.slug}
            type="button"
            className={`mock-transport-item ${picked === it.slug ? (it.slug === correctSlug ? "is-correct" : "is-wrong") : ""}`}
            disabled={picked !== null}
            onClick={() => { setPicked(it.slug); onPick(it.slug === correctSlug, it.name); }}
          >
            <div className="mock-transport-emoji">{it.emoji}</div>
            <div className="mock-transport-info">
              <strong>{it.name}</strong>
              <span>{it.subtitle}</span>
            </div>
            <span className="mock-transport-arrow">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// UI Logic

export function WardrobeMockup({
  occasion,
  items,
  onPick,
}: {
  occasion: string;
  items: Array<{ id: string; emoji: string; name: string; suitable: boolean }>;
  onPick: (correct: boolean, name: string) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="mock-wardrobe">
      <div className="mock-wardrobe-header">
        <strong>Wardrobe</strong>
        <span className="mock-wardrobe-tag">Where are we going:{occasion}</span>
      </div>
      <div className="mock-wardrobe-grid">
        {items.map((it) => {
          const Icon = ICON_MAP[it.emoji];
          return (
            <button
              key={it.id}
              type="button"
              className={`mock-wardrobe-item ${picked === it.id ? (it.suitable ? "is-correct" : "is-wrong") : ""}`}
              disabled={picked !== null}
              onClick={() => { setPicked(it.id); onPick(it.suitable, it.name); }}
            >
              <div className="mock-wardrobe-emoji">{Icon ? <Icon size={48} /> : it.emoji}</div>
              <span>{it.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// UI Logic

export function TableSettingMockup({
  onResult,
}: {
  onResult: (correct: boolean) => void;
}) {
  const [placed, setPlaced] = useState<Record<string, "left" | "right" | "top" | null>>({
    fork: null, knife: null, spoon: null, glass: null,
  });
  const [dragged, setDragged] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const correct = placed.fork === "left" && placed.knife === "right" && placed.spoon === "right" && placed.glass === "top";

  const drop = (slot: "left" | "right" | "top") => {
    if (!dragged) return;
    setPlaced({ ...placed, [dragged]: slot });
    setDragged(null);
  };

  const submit = () => {
    setSubmitted(true);
    onResult(correct);
  };

  return (
    <div className="mock-table">
      <div className="mock-table-task">Arrange the utensils: fork on the left, knife and spoon on the right, glass on top.</div>
      <div className="mock-table-board">
        <div className="mock-table-slot mock-table-top" onDragOver={(e) => e.preventDefault()} onDrop={() => drop("top")}>
          {Object.entries(placed).filter(([, s]) => s === "top").map(([id]) => (
            <span key={id} className="mock-table-placed">{emojiFor(id)}</span>
          ))}
          <span className="mock-table-slot-label">above</span>
        </div>
        <div className="mock-table-mid">
          <div className="mock-table-slot mock-table-left" onDragOver={(e) => e.preventDefault()} onDrop={() => drop("left")}>
            {Object.entries(placed).filter(([, s]) => s === "left").map(([id]) => (
              <span key={id} className="mock-table-placed">{emojiFor(id)}</span>
            ))}
            <span className="mock-table-slot-label">left</span>
          </div>
          <div className="mock-table-plate">🍽️</div>
          <div className="mock-table-slot mock-table-right" onDragOver={(e) => e.preventDefault()} onDrop={() => drop("right")}>
            {Object.entries(placed).filter(([, s]) => s === "right").map(([id]) => (
              <span key={id} className="mock-table-placed">{emojiFor(id)}</span>
            ))}
            <span className="mock-table-slot-label">right</span>
          </div>
        </div>
      </div>
      <div className="mock-table-pool">
        {(["fork", "knife", "spoon", "glass"] as const).filter((id) => !placed[id]).map((id) => (
          <div
            key={id}
            className="mock-table-item"
            draggable
            onDragStart={() => setDragged(id)}
          >
            <span className="mock-table-item-emoji">{emojiFor(id)}</span>
            <span>{nameFor(id)}</span>
          </div>
        ))}
      </div>
      {Object.values(placed).every((v) => v !== null) && !submitted ? (
        <button type="button" className="mock-table-submit" onClick={submit}>Check</button>
      ) : null}
      {submitted ? (
        <div className={`mock-table-result ${correct ? "ok" : "warn"}`}>
          {correct ? "✓ Serving is correct!" : "⚠ Try again: fork on the left, knife/spoon on the right, glass on top"}
        </div>
      ) : null}
    </div>
  );
}

function emojiFor(id: string): string {
  return { fork: "🍴", knife: "🔪", spoon: "🥄", glass: "🥛" }[id] || "?";
}
function nameFor(id: string): string {
  return { fork: "Fork", knife: "Knife", spoon: "Spoon", glass: "Cup" }[id] || id;
}

// UI Logic

export function ShampooStoreMockup({
  task,
  items,
  correctId,
  onPick,
}: {
  task: string;
  items: Array<{ id: string; emoji: string; name: string; tag: string; price: string }>;
  correctId: string;
  onPick: (correct: boolean, name: string) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="mock-shop">
      <div className="mock-shop-task">{task}</div>
      <div className="mock-shop-grid">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            className={`mock-shop-card ${picked === it.id ? (it.id === correctId ? "is-correct" : "is-wrong") : ""}`}
            disabled={picked !== null}
            onClick={() => { setPicked(it.id); onPick(it.id === correctId, it.name); }}
          >
            <div className="mock-shop-img">{it.emoji}</div>
            <div className="mock-shop-name">{it.name}</div>
            <div className="mock-shop-tag">{it.tag}</div>
            <div className="mock-shop-price">{it.price}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// UI Logic

export function WeeklyWeatherMockup({
  days,
  taskDayIdx,
  options,
  onPick,
}: {
  days: Array<{ name: string; icon: string; temp: number }>;
  taskDayIdx: number;
  options: Array<{ emoji: string; name: string; suitable: boolean }>;
  onPick: (correct: boolean, name: string) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const day = days[taskDayIdx];
  return (
    <div className="mock-week">
      <div className="mock-week-strip">
        {days.map((d, i) => (
          <div key={i} className={`mock-week-day ${i === taskDayIdx ? "is-active" : ""}`}>
            <span className="mock-week-name">{d.name}</span>
            <span className="mock-week-icon">{d.icon}</span>
            <span className="mock-week-temp">{d.temp > 0 ? "+" : ""}{d.temp}°</span>
          </div>
        ))}
      </div>
      <div className="mock-week-task">
        What to wear in<strong>{day.name.toLowerCase()}</strong>? {day.icon} {day.temp > 0 ? "+" : ""}{day.temp}°C
      </div>
      <div className="mock-week-options">
        {options.map((o, i) => (
          <button
            key={i}
            type="button"
            className={`mock-week-option ${picked === o.name ? (o.suitable ? "is-correct" : "is-wrong") : ""}`}
            disabled={picked !== null}
            onClick={() => { setPicked(o.name); onPick(o.suitable, o.name); }}
          >
            <span className="mock-week-option-emoji">{o.emoji}</span>
            <span>{o.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// UI Logic

export function CareLabelMockup({
  fabric,
  symbols,
  question,
  options,
  onAnswer,
}: {
  fabric: string;
  symbols: Array<{ icon: string; meaning: string; allowed: boolean }>;
  question: string;
  options: Array<{ text: string; correct: boolean }>;
  onAnswer: (correct: boolean) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="mock-care">
      <div className="mock-care-label">
        <div className="mock-care-header">
          <strong>PRODUCT CARE</strong>
          <span>{fabric}</span>
        </div>
        <div className="mock-care-symbols">
          {symbols.map((s, i) => (
            <div key={i} className={`mock-care-symbol ${s.allowed ? "allowed" : "forbidden"}`}>
              <div className="mock-care-icon">{s.icon}</div>
              <div className="mock-care-meaning">{s.meaning}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mock-care-quiz">
        <p>{question}</p>
        <div className="mock-care-options">
          {options.map((o, i) => (
            <button
              key={i}
              type="button"
              className={`mock-care-option ${picked === i ? (o.correct ? "is-correct" : "is-wrong") : ""}`}
              disabled={picked !== null}
              onClick={() => { setPicked(i); onAnswer(o.correct); }}
            >
              {o.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// UI Logic

export function DetergentBoxMockup({
  loadKg,
  table,
  options,
  onPick,
}: {
  loadKg: number;
  table: Array<{ kg: string; grams: number; scoops: string }>;
  options: Array<{ text: string; correct: boolean }>;
  onPick: (correct: boolean) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const correctRow = table.find((r) => r.grams === Math.round(loadKg * 16));
  return (
    <div className="mock-detergent">
      <div className="mock-detergent-box">
        <div className="mock-detergent-front">
          <div className="mock-detergent-logo">MOSAIC</div>
          <div className="mock-detergent-name">UNIVERSAL POWDER</div>
          <div className="mock-detergent-volume">3 kg</div>
        </div>
        <div className="mock-detergent-table-wrap">
          <strong>Dosage</strong>
          <table className="mock-detergent-table">
            <thead>
              <tr><th>Laundry weight</th><th>Gram</th><th>spoons</th></tr>
            </thead>
            <tbody>
              {table.map((row, i) => (
                <tr key={i} className={correctRow && row.kg === correctRow.kg ? "is-highlight" : ""}>
                  <td>{row.kg}</td>
                  <td>{row.grams}  g</td>
                  <td>{row.scoops}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mock-detergent-quiz">
        <p>How much powder is needed for<strong>{loadKg}  kg</strong> linen?</p>
        <div className="mock-detergent-options">
          {options.map((o, i) => (
            <button
              key={i}
              type="button"
              className={`mock-detergent-option ${picked === i ? (o.correct ? "is-correct" : "is-wrong") : ""}`}
              disabled={picked !== null}
              onClick={() => { setPicked(i); onPick(o.correct); }}
            >
              {o.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// UI Logic

export function OvenTimerMockup({
  recipeStep,
  recipeMinutes,
  onSet,
}: {
  recipeStep: string;
  recipeMinutes: number;
  onSet: (minutes: number) => void;
}) {
  const [minutes, setMinutes] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const timer = setTimeout(() => {
      const next = remaining - 1;
      setRemaining(next);
      if (next <= 0) {
        setDone(true);
        setRunning(false);
      }
    }, 100); // UI Logic
    return () => clearTimeout(timer);
  }, [running, remaining]);

  const start = () => {
    setRunning(true);
    setRemaining(minutes);
    onSet(minutes);
  };

  const min2 = (n: number) => String(Math.floor(n / 60)).padStart(2, "0");
  const sec2 = (n: number) => String(n % 60).padStart(2, "0");

  return (
    <div className="mock-oven">
      <div className="mock-oven-recipe">
        <span className="mock-oven-step">Recipe step</span>
        <p>{recipeStep}</p>
        <span className="mock-oven-hint">According to the recipe:{recipeMinutes}  minutes</span>
      </div>
      <div className="mock-oven-device">
        <div className="mock-oven-display">
          {done ? (
            <span className="mock-oven-alarm">DONE!</span>
          ) : running ? (
            <span className="mock-oven-time">{min2(remaining)}:{sec2(remaining * 60 % 60)}</span>
          ) : (
            <span className="mock-oven-time">{String(minutes).padStart(2, "0")}:00</span>
          )}
        </div>
        <div className="mock-oven-knobs">
          <button type="button" className="mock-oven-knob" onClick={() => setMinutes(Math.max(0, minutes - 5))} disabled={running || done}>−5</button>
          <span className="mock-oven-knob-label">MINUTES</span>
          <button type="button" className="mock-oven-knob" onClick={() => setMinutes(minutes + 5)} disabled={running || done}>+5</button>
        </div>
        <button
          type="button"
          className="mock-oven-start"
          disabled={minutes === 0 || running || done}
          onClick={start}
        >
          {done ? "✓ COMPLETED" : running ? "⏳ COMING" : "▶ START"}
        </button>
      </div>
    </div>
  );
}

// UI Logic

export function TicketBookingMockup({
  onComplete,
}: {
  onComplete: (correct: boolean) => void;
}) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [seat, setSeat] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const totalSteps = 4;

  const finish = (correct: boolean) => {
    setDone(true);
    onComplete(correct);
  };

  return (
    <div className="mock-ticket">
      <div className="mock-ticket-header">
        <strong>UZ Railway · Buying a ticket</strong>
        <span>Step{Math.min(step + 1, totalSteps)} from{totalSteps}</span>
      </div>
      <div className="mock-ticket-progress">
        <div className="mock-ticket-progress-bar" style={{ width: `${(step / totalSteps) * 100}%` }} />
      </div>

      <div className="mock-ticket-body">
        {step === 0 && (
          <>
            <h4>Where are we going?</h4>
            <div className="mock-ticket-routes">
              {["Tashkent → Samarkand", "Tashkent → Bukhara", "Tashkent → Andijan"].map((r) => (
                <button key={r} type="button" className="mock-ticket-route" onClick={() => { setDirection(r); setStep(1); }}>
                  {r}
                </button>
              ))}
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <h4>Select a date - given task: tomorrow</h4>
            <div className="mock-ticket-dates">
              {["Today (26.05)", "Tomorrow (27.05)", "The day after tomorrow (28.05)"].map((d) => (
                <button key={d} type="button" className="mock-ticket-date" onClick={() => { setDate(d); setStep(2); }}>
                  {d}
                </button>
              ))}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h4>Choose a place</h4>
            <div className="mock-ticket-seats">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <button key={s} type="button" className={`mock-ticket-seat ${s === 4 ? "is-busy" : ""}`} disabled={s === 4} onClick={() => { setSeat(`Place${s}`); setStep(3); }}>
                  {s}
                </button>
              ))}
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h4>Check and confirm</h4>
            <ul className="mock-ticket-summary">
              <li><span>Direction:</span> <strong>{direction}</strong></li>
              <li><span>Date:</span> <strong>{date}</strong></li>
              <li><span>{seat}</span> <strong>120,000 soum</strong></li>
            </ul>
            <div className="mock-ticket-actions">
              <button type="button" className="mock-ticket-back" onClick={() => setStep(2)}>← Edit</button>
              <button
                type="button"
                className="mock-ticket-confirm"
                onClick={() => finish(direction === "Tashkent → Samarkand" && date?.includes("Tomorrow") || false)}
              >
                
                ✓ Pay</button>
            </div>
          </>
        )}
        {done && (
          <div className="mock-ticket-done">
            <div className="mock-ticket-done-icon">🎫</div>
            <strong>Ticket purchased!</strong>
            <p>{direction}, {date}, {seat}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// UI Logic

export function PhoneCallMockup({
  task,
  correctNumber,
  contacts,
  onAction,
}: {
  task: string;
  correctNumber: string;
  contacts: Array<{ name: string; number: string; avatar: string }>;
  onAction: (correct: boolean, dialedNumber: string) => void;
}) {
  const [dialed, setDialed] = useState("");
  const [view, setView] = useState<"home" | "dialer" | "contacts" | "calling">("home");

  const tapDigit = (d: string) => setDialed(dialed + d);
  const erase = () => setDialed(dialed.slice(0, -1));
  const call = (number: string) => {
    setView("calling");
    setDialed(number);
    onAction(number === correctNumber, number);
  };

  return (
    <div className="mock-phone">
      <div className="mock-phone-frame">
        <div className="mock-phone-screen">
          <div className="mock-phone-statusbar">
            <span>9:41</span>
            <span>📶 🔋</span>
          </div>

          {view === "home" && (
            <div className="mock-phone-home">
              <div className="mock-phone-task">📞 {task}</div>
              <div className="mock-phone-apps">
                <button type="button" className="mock-phone-app" onClick={() => setView("dialer")}>
                  <span>📞</span><span>Call</span>
                </button>
                <button type="button" className="mock-phone-app" onClick={() => setView("contacts")}>
                  <span>👥</span><span>Contacts</span>
                </button>
                <button type="button" className="mock-phone-app" onClick={() => alert("SMS is a different challenge")}>
                  <span>💬</span><span>SMS</span>
                </button>
                <button type="button" className="mock-phone-app">
                  <span>⚙️</span><span>Settings</span>
                </button>
              </div>
            </div>
          )}

          {view === "dialer" && (
            <div className="mock-phone-dialer">
              <button type="button" className="mock-phone-back" onClick={() => setView("home")}>← Back</button>
              <div className="mock-phone-number">{dialed || "Dial the number"}</div>
              <div className="mock-phone-keypad">
                {["1","2","3","4","5","6","7","8","9","*","0","#"].map((d) => (
                  <button key={d} type="button" onClick={() => tapDigit(d)}>{d}</button>
                ))}
              </div>
              <div className="mock-phone-actions">
                <button type="button" className="mock-phone-erase" onClick={erase}>⌫</button>
                <button type="button" className="mock-phone-call" disabled={!dialed} onClick={() => call(dialed)}>📞 Call</button>
              </div>
            </div>
          )}

          {view === "contacts" && (
            <div className="mock-phone-contacts">
              <button type="button" className="mock-phone-back" onClick={() => setView("home")}>← Back</button>
              <strong>Contacts</strong>
              {contacts.map((c) => (
                <button key={c.name} type="button" className="mock-phone-contact" onClick={() => call(c.number)}>
                  <span className="mock-phone-avatar">{c.avatar}</span>
                  <div>
                    <strong>{c.name}</strong>
                    <span>{c.number}</span>
                  </div>
                  <span>📞</span>
                </button>
              ))}
            </div>
          )}

          {view === "calling" && (
            <div className="mock-phone-calling">
              <div className="mock-phone-calling-icon">📞</div>
              <strong>Call to{dialed}</strong>
              <p>{dialed === correctNumber ? "✓ Correct number" : "✗ Invalid number"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// UI Logic

import {
  IconCheck, ICON_MAP,
} from "@/components/lesson-icons";

type HygieneItem = {
  id: string;
  name: string;
  artId: LessonItemArtId;
  isHygiene: boolean;
};

const HYGIENE_ITEMS: HygieneItem[] = [
  { id: "toothbrush", name: "Toothbrush",     artId: "toothbrush", isHygiene: true },
  { id: "toothpaste", name: "Toothpaste",     artId: "toothpaste", isHygiene: true },
  { id: "soap",       name: "Soap",             artId: "soap",       isHygiene: true },
  { id: "shampoo",    name: "Shampoo",          artId: "shampoo",    isHygiene: true },
  { id: "comb",       name: "Comb",         artId: "comb",       isHygiene: true },
  { id: "towel",      name: "Towel",        artId: "towel",      isHygiene: true },
  { id: "scissors",   name: "Nail scissors", artId: "nail-scissors", isHygiene: true },
  { id: "deodorant",  name: "Deodorant",       artId: "deodorant",  isHygiene: true },
  { id: "ball",       name: "Ball",              artId: "ball",       isHygiene: false },
  { id: "lipstick",   name: "Lipstick",           artId: "lipstick",   isHygiene: false },
  { id: "mug",        name: "Mug with tea",    artId: "mug",        isHygiene: false },
];

const MORNING_NEEDED = ["toothbrush", "toothpaste", "soap", "comb", "towel"];

export function HygieneShelfMockup({
  mode,
  onResult,
}: {
  mode: "morning" | "all-hygiene";
  onResult: (correct: boolean, msg: string) => void;
}) {
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string) => {
    if (submitted) return;
    const next = new Set(picked);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setPicked(next);
  };

  const submit = () => {
    setSubmitted(true);
    const expectedSet = new Set(
      mode === "morning"
        ? MORNING_NEEDED
        : HYGIENE_ITEMS.filter((i) => i.isHygiene).map((i) => i.id),
    );
    const exact = picked.size === expectedSet.size &&
      [...picked].every((id) => expectedSet.has(id));
    const partial = [...picked].filter((id) => expectedSet.has(id)).length;
    onResult(
      exact,
      exact
        ? `Well done! Correctly selected${partial}items.`
        : `Right:${partial}from${expectedSet.size}. See what needs to be removed or added.`,
    );
  };

  const reset = () => {
    setPicked(new Set());
    setSubmitted(false);
  };

  const taskText = mode === "morning"
    ? "Choose only what you need in the morning for washing and brushing your teeth."
    : "Select all items that relate to personal hygiene.";

  return (
    <div className="mock-hygiene">
      <div className="mock-hygiene-task">{taskText}</div>

      <div className="mock-hygiene-shelf">
        {HYGIENE_ITEMS.map((it) => {
          const isPicked = picked.has(it.id);
          const isCorrect = submitted && it.isHygiene && (
            mode === "all-hygiene" || MORNING_NEEDED.includes(it.id)
          );
          const isWrong = submitted && isPicked && !isCorrect;
          const wasNeeded = submitted && !isPicked && isCorrect;

          return (
            <button
              key={it.id}
              type="button"
              className={`mock-hygiene-item ${isPicked ? "is-picked" : ""} ${isCorrect && submitted ? "is-correct" : ""} ${isWrong ? "is-wrong" : ""} ${wasNeeded ? "is-missed" : ""}`}
              onClick={() => toggle(it.id)}
              disabled={submitted}
            >
              <div className="mock-hygiene-item-icon">
                <LessonItemArt id={it.artId} size={96} />
              </div>
              <span className="mock-hygiene-item-name">{it.name}</span>
              {isPicked ? <span className="mock-hygiene-item-tick"><IconCheck size={16} /></span> : null}
            </button>
          );
        })}
      </div>

      <div className="mock-hygiene-actions">
        {!submitted ? (
          <button
            type="button"
            className="mock-hygiene-submit"
            disabled={picked.size === 0}
            onClick={submit}
          >
            
            Done · selected:{picked.size}
          </button>
        ) : (
          <button type="button" className="mock-hygiene-reset" onClick={reset}>
            Try again</button>
        )}
      </div>
    </div>
  );
}

// UI Logic

export function DiagnosticPlatformMockup({
  mode,
  onResult,
}: {
  mode: "entry" | "final";
  onResult: (correct: boolean, msg: string) => void;
}) {
  type Block = "intro" | "reading" | "icons" | "safety" | "done";
  const [block, setBlock] = useState<Block>("intro");
  const [score, setScore] = useState(0);
  const [readingPicked, setReadingPicked] = useState<number | null>(null);
  const [iconPicked, setIconPicked] = useState<number | null>(null);
  const [safetyPicked, setSafetyPicked] = useState<number | null>(null);

  const finish = () => {
    setBlock("done");
    onResult(score >= 2, mode === "entry"
      ? `Input diagnostics:${score}out of 3 is correct. This is the starting level.`
      : `Final diagnostics:${score}out of 3 is correct. Let's compare with the beginning of the year.`);
  };

  return (
    <div className="mock-diag">
      <div className="mock-diag-card">
        <div className="mock-diag-header">
          <strong>{mode === "entry" ? "🚀 Input diagnostics" : "🎓 Final diagnostics"}</strong>
          <span className="mock-diag-badge">No ratings</span>
        </div>

        {block === "intro" && (
          <div className="mock-diag-body">
            <p>Now there will be short tasks. Take your time, use the hints.</p>
            <div className="mock-diag-controls">
              <button type="button" className="mock-diag-tutorial">🔊 Listen</button>
              <button type="button" className="mock-diag-tutorial">💡 Help</button>
              <button type="button" className="mock-diag-tutorial">→ Next</button>
            </div>
            <button type="button" className="mock-diag-start" onClick={() => setBlock("reading")}>
              
              ▶ Get started</button>
          </div>
        )}

        {block === "reading" && (
          <div className="mock-diag-body">
            <div className="mock-diag-step">Task 1 of 3 Reading</div>
            <p className="mock-diag-text">Read: “In the morning after sleep, you need to brush your teeth and wash your face.” What does a person do in the morning?</p>
            <div className="mock-diag-options">
              {["Brushes teeth and washes his face", "Goes for a walk right away", "Sleeps until lunch"].map((opt, i) => {
                const isCorrect = i === 0;
                const picked = readingPicked === i;
                return (
                  <button
                    key={i}
                    type="button"
                    className={`mock-diag-option ${picked ? (isCorrect ? "is-correct" : "is-wrong") : ""}`}
                    disabled={readingPicked !== null}
                    onClick={() => {
                      setReadingPicked(i);
                      if (isCorrect) setScore((s) => s + 1);
                      setTimeout(() => setBlock("icons"), 800);
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {block === "icons" && (
          <div className="mock-diag-body">
            <div className="mock-diag-step">Task 2 of 3 · Icon recognition</div>
            <p className="mock-diag-text">Which icon refers to hygiene - washing and cleanliness?</p>
            <div className="mock-diag-icons">
              {["🧼", "🚗", "🎮", "📺"].map((emoji, i) => {
                const isCorrect = i === 0;
                const picked = iconPicked === i;
                return (
                  <button
                    key={i}
                    type="button"
                    className={`mock-diag-icon ${picked ? (isCorrect ? "is-correct" : "is-wrong") : ""}`}
                    disabled={iconPicked !== null}
                    onClick={() => {
                      setIconPicked(i);
                      if (isCorrect) setScore((s) => s + 1);
                      setTimeout(() => setBlock("safety"), 800);
                    }}
                  >
                    {emoji}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {block === "safety" && (
          <div className="mock-diag-body">
            <div className="mock-diag-step">Task 3 of 3 · Healthy habit</div>
            <p className="mock-diag-text">When should you wash your hands?</p>
            <div className="mock-diag-options">
              {[
                "Before food and after the street",
                "Only on Saturday",
                "Never wash",
              ].map((opt, i) => {
                const isCorrect = i === 0;
                const picked = safetyPicked === i;
                return (
                  <button
                    key={i}
                    type="button"
                    className={`mock-diag-option ${picked ? (isCorrect ? "is-correct" : "is-wrong") : ""}`}
                    disabled={safetyPicked !== null}
                    onClick={() => {
                      setSafetyPicked(i);
                      if (isCorrect) setScore((s) => s + 1);
                      setTimeout(() => finish(), 1000);
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {block === "done" && (
          <div className="mock-diag-body mock-diag-done">
            <div className="mock-diag-done-emoji">{mode === "entry" ? "📊" : "🎉"}</div>
            <strong>Diagnostics completed</strong>
            <p>Result:<span className="mock-diag-score">{score}  out of 3</span></p>
            <p className="mock-diag-note">This is not an assessment - we are just looking at the level.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// UI Logic

export function SafetyCardsMockup({
  situations,
  onAnswer,
}: {
  situations: Array<{ icon: string; text: string; danger: boolean; explanation: string }>;
  onAnswer: (allCorrect: boolean, score: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const s = situations[idx];

  const choose = (saidDanger: boolean) => {
    const isCorrect = saidDanger === s.danger;
    const next = [...answers, isCorrect];
    setAnswers(next);
    setShowExplanation(true);
  };

  const nextCard = () => {
    setShowExplanation(false);
    if (idx < situations.length - 1) {
      setIdx(idx + 1);
    } else {
      const score = answers.filter(Boolean).length;
      onAnswer(score === situations.length, score);
    }
  };

  if (idx >= situations.length) return null;

  return (
    <div className="mock-safety">
      <div className="mock-safety-progress">Situation{idx + 1} / {situations.length}</div>
      <div className="mock-safety-card">
        <div className="mock-safety-icon">
          {ICON_MAP[s.icon] ? (() => { const Ico = ICON_MAP[s.icon]; return <Ico size={56} />; })() : <span>{s.icon}</span>}
        </div>
        <p className="mock-safety-text">{s.text}</p>
        {!showExplanation ? (
          <div className="mock-safety-choices">
            <button type="button" className="mock-safety-safe" onClick={() => choose(false)}>✓ Safe</button>
            <button type="button" className="mock-safety-danger" onClick={() => choose(true)}>⚠ Dangerous</button>
          </div>
        ) : (
          <div className={`mock-safety-feedback ${answers[idx] ? "ok" : "wrong"}`}>
            <strong>{answers[idx] ? "✓ Correct" : "✗ Error"}</strong>
            <p>{s.explanation}</p>
            <button type="button" className="mock-safety-next" onClick={nextCard}>
              {idx < situations.length - 1 ? "Continue →" : "Complete"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// UI Logic

export function TrackingMockup({
  trackNumber,
  expectedStatus,
  onSubmit,
}: {
  trackNumber: string;
  expectedStatus: string;
  onSubmit: (entered: string) => void;
}) {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="mock-track">
      <div className="mock-track-input-row">
        <input
          type="text"
          placeholder="Enter tracking number"
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
        />
        <button type="button" onClick={() => { setSubmitted(true); onSubmit(input); }}>
          Check</button>
      </div>
      <div className="mock-track-hint">Sample:<code>{trackNumber}</code></div>
      {submitted ? (
        <div className="mock-track-result">
          {input === trackNumber ? (
            <>
              <strong className="ok">✓ Parcel found</strong>
              <div className="mock-track-status">{expectedStatus}</div>
              <div className="mock-track-stages">
                <span className="done">📮 Sent</span>
                <span className="done">🚚 On the way</span>
                <span>📦 Delivered</span>
              </div>
            </>
          ) : (
            <strong className="warn">⚠ Number not found - check your input</strong>
          )}
        </div>
      ) : null}
    </div>
  );
}
