"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { CareLabelTrainer as CareLabelTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: CareLabelTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Fabric = "silk" | "cotton" | "wool";
type Stage = Fabric | "done";
type Mode = "hand-30" | "machine-30" | "machine-40" | "machine-60";
const FLOW: Stage[] = ["silk", "cotton", "wool", "done"];
const STEPS = 3;

const CORRECT: Record<Fabric, Mode> = {
  silk: "hand-30",
  cotton: "machine-40",
  wool: "machine-30",
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
  doneTitle: string;
  doneHint: string;
  modes: Record<Mode, { name: string; sub: string }>;
  cases: Record<Fabric, { item: string; description: string; hint: string; feedbackGood: string; feedbackSoft: string; symbolNumber: string }>;
}> = {
  ru: {
    appTitle: "Clothes label",
    stepCounter: (n) => `Shortcut${n}from${STEPS}`,
    taskEyebrow: "Cloth",
    questionEyebrow: "What mode",
    hintEyebrow: "Clue",
    feedbackEyebrow: "Checking",
    skip: "Don't know",
    finish: "Finish",
    next: "Next shortcut",
    retry: "Try again",
    doneTitle: "Well done! You can read labels.",
    doneHint: "Silk - hands 30°; cotton - machine 40°; wool - machine 30°.",
    modes: {
      "hand-30": { name: "Hands 30°", sub: "palm in the pelvis - delicately" },
      "machine-30": { name: "Machine 30°", sub: "delicate mode" },
      "machine-40": { name: "Machine 40°", sub: "normal wash" },
      "machine-60": { name: "Machine 60°", sub: "hot, for white cotton" },
    },
    cases: {
      silk: {
        item: "Silk blouse",
        description: "On the label: palm in the basin + number 30. The typewriter is crossed out.",
        hint: "Silk is not allowed in the machine. Hands only 30°.",
        feedbackGood: "Right. Silk - only with your hands in cold water.",
        feedbackSoft: "The silk in the machine will tear. Hands only 30°.",
        symbolNumber: "30",
      },
      cotton: {
        item: "Cotton shirt",
        description: "On the label: a bowl of water + the number 40. The machine is allowed.",
        hint: "Cotton - regular machine wash at 40°.",
        feedbackGood: "Right. Cotton is machine washed at 40°.",
        feedbackSoft: "This doesn't fit. For cotton - machine 40°.",
        symbolNumber: "40",
      },
      wool: {
        item: "Wool sweater",
        description: "On the label: basin + number 30 + “delicate” icon.",
        hint: "Wool - machine on “delicate” mode at 30°.",
        feedbackGood: "Right. Wool - delicate mode 30°.",
        feedbackSoft: "The fur will shrink at this temperature. You need 30° delicately.",
        symbolNumber: "30",
      },
    },
  },
  uz: {
    appTitle: "Kiyim yorligʻi",
    stepCounter: (n) => `${n} / ${STEPS}-yorliq`,
    taskEyebrow: "Kiyim",
    questionEyebrow: "Qaysi rejim",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    next: "Keyingi yorliq",
    retry: "Qayta urinish",
    doneTitle: "Yashasin! Sen yorliqlarni oʻqishni oʻrganding.",
    doneHint: "Ipak — qoʻlda 30°; paxta — mashina 40°; jun — mashina 30°.",
    modes: {
      "hand-30": { name: "Qoʻlda 30°", sub: "ehtiyotkorlik bilan" },
      "machine-30": { name: "Mashina 30°", sub: "nozik rejim" },
      "machine-40": { name: "Mashina 40°", sub: "oddiy yuvish" },
      "machine-60": { name: "Mashina 60°", sub: "issiq, oq paxta uchun" },
    },
    cases: {
      silk: {
        item: "Ipak koʻylak",
        description: "Yorliqda: tos+qoʻl + 30 raqami. Mashina chizilgan.",
        hint: "Ipak mashinada boʻlmaydi. Faqat qoʻlda 30°.",
        feedbackGood: "Toʻgʻri. Ipak — faqat qoʻlda sovuq suvda.",
        feedbackSoft: "Ipak mashinada yirtiladi. Faqat qoʻlda 30°.",
        symbolNumber: "30",
      },
      cotton: {
        item: "Paxta koʻylak",
        description: "Yorliqda: tos+suv + 40 raqami. Mashina mumkin.",
        hint: "Paxta — oddiy mashina 40°.",
        feedbackGood: "Toʻgʻri. Paxta — mashina 40°.",
        feedbackSoft: "Bu mos emas. Paxta uchun — mashina 40°.",
        symbolNumber: "40",
      },
      wool: {
        item: "Jun sviter",
        description: "Yorliqda: tos + 30 + nozik belgi.",
        hint: "Jun — mashina nozik rejimi 30°.",
        feedbackGood: "Toʻgʻri. Jun — nozik 30°.",
        feedbackSoft: "Jun bu haroratda kichrayadi. 30° nozik kerak.",
        symbolNumber: "30",
      },
    },
  },
};

const MODES: Mode[] = ["hand-30", "machine-30", "machine-40", "machine-60"];

export function CareLabelTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [stage, setStage] = useState<Stage>("silk");
  const [picked, setPicked] = useState<Mode | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stage === "done";
  const step = isDone ? STEPS : FLOW.indexOf(stage) + 1;
  const sit = isDone ? null : t.cases[stage as Fabric];

  function tap(m: Mode) {
    if (feedback) return;
    setPicked(m);
    const ok = m === CORRECT[stage as Fabric];
    answers.current[`label-${stage}`] = { picked: m, correct: ok };
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
    <div className="care-app care-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : (
    <div className="care-app">
      <div className="care-item-card">
        <ItemSilhouette kind={stage as Fabric} />
        <strong>{sit?.item}</strong>
      </div>

      <div className="care-label-card">
        <div className="care-label-row">
          <CareSymbol kind="basin" fabric={stage as Fabric} number={sit?.symbolNumber} />
          <CareSymbol kind="bleach" fabric={stage as Fabric} />
          <CareSymbol kind="dry" fabric={stage as Fabric} />
          <CareSymbol kind="iron" fabric={stage as Fabric} />
        </div>
        <small className="care-label-caption">Badges on a clothing label</small>
      </div>
    </div>
  );

  return (
    <div className="morning-quest-trainer care-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark care-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10 Q4 4 12 4 Q20 4 20 10 V18 H4 Z" />
              <path d="M9 14 H15" />
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
          <div className={`mq-phone mq-phone--care-${stage}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">18:0{Math.min(step, 9)}</span>
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
            <p className="mq-panel-task-text">{sit ? sit.description : t.doneHint}</p>
          </div>

          {sit && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>How to wash?</h3>
              <div className="mq-panel-options">
                {MODES.map((m, i) => (
                  <button
                    key={m}
                    type="button"
                    className={`mq-panel-option${picked === m ? " mq-panel-option--picked" : ""}`}
                    onClick={() => tap(m)}
                  >
                    <span className="mq-panel-option-num">{i + 1}</span>
                    <span className="mq-panel-option-body">
                      <strong>{t.modes[m].name}</strong>
                      <small>{t.modes[m].sub}</small>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {feedback && sit ? (
            <div className={`outfit-feedback outfit-feedback--${feedback}`}>
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{feedback === "good" ? sit.feedbackGood : sit.feedbackSoft}</p>
              <div className="outfit-feedback-actions">
                {feedback === "good" ? (
                  <button type="button" className="mq-panel-primary" onClick={advance}>{stage === "wool" ? t.finish : t.next}</button>
                ) : (
                  <button type="button" className="mq-panel-primary outfit-retry" onClick={retry}>{t.retry}</button>
                )}
              </div>
            </div>
          ) : sit ? (
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

function ItemSilhouette({ kind }: { kind: Fabric }) {
  if (kind === "silk") return <LessonItemArt id="silk-blouse" size={74} />;
  if (kind === "cotton") return <LessonItemArt id="cotton-shirt" size={74} />;
  return <LessonItemArt id="wool-sweater" size={74} />;
}

function CareSymbol({ kind, fabric, number }: { kind: "basin" | "bleach" | "dry" | "iron"; fabric: Fabric; number?: string }) {
  const banned = (kind === "basin" && fabric === "silk") || (kind === "bleach");
  if (kind === "basin") {
    // basin with hand for silk; basin with water for others
    if (fabric === "silk") {
      return (
        <div className="care-symbol">
          <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
            <path d="M4 18 L36 18 L32 34 L8 34 Z" fill="none" stroke="#0f172a" strokeWidth="2" />
            <path d="M14 22 L14 12 L18 12 L18 14 L22 14 L22 16 L26 16 L26 22" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
            <text x="20" y="32" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">30</text>
          </svg>
          <small>hands</small>
        </div>
      );
    }
    return (
      <div className="care-symbol">
        <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
          <path d="M4 16 L36 16 L32 34 L8 34 Z" fill="none" stroke="#0f172a" strokeWidth="2" />
          <path d="M8 20 Q20 24 32 20" stroke="#0284c7" strokeWidth="2" fill="none" />
          <text x="20" y="32" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">{number ?? "30"}</text>
        </svg>
        <small>washing</small>
      </div>
    );
  }
  if (kind === "bleach") {
    // triangle crossed-out (not bleach)
    return (
      <div className="care-symbol care-symbol--banned">
        <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
          <path d="M20 6 L34 32 L6 32 Z" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
          <line x1="6" y1="6" x2="34" y2="34" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <small>Do not bleach</small>
      </div>
    );
  }
  if (kind === "dry") {
    return (
      <div className="care-symbol">
        <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
          <rect x="6" y="10" width="28" height="22" rx="2" fill="none" stroke="#0f172a" strokeWidth="2" />
          <circle cx="20" cy="22" r="5" fill="none" stroke="#0f172a" strokeWidth="1.5" />
          <circle cx="20" cy="22" r="1.5" fill="#0f172a" />
          {fabric === "silk" ? <line x1="6" y1="6" x2="34" y2="34" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" /> : null}
        </svg>
        <small>{fabric === "silk" ? "do not tumble dry" : "drying"}</small>
      </div>
    );
  }
  // iron
  return (
    <div className="care-symbol">
      <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
        <path d="M6 28 L34 28 L30 14 L10 14 Z" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="16" cy="22" r="1.5" fill="#0f172a" />
        {fabric === "silk" ? <circle cx="22" cy="22" r="1.5" fill="#0f172a" /> : null}
        {fabric === "cotton" ? (
          <>
            <circle cx="22" cy="22" r="1.5" fill="#0f172a" />
            <circle cx="28" cy="22" r="1.5" fill="#0f172a" />
          </>
        ) : null}
      </svg>
      <small>{fabric === "silk" ? "weak iron" : fabric === "wool" ? "warm iron" : "hot iron"}</small>
    </div>
  );
  void banned;
}
