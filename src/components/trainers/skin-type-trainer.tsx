"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { SkinTypeTrainer as SkinTypeTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: SkinTypeTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type SkinKind = "oily" | "dry" | "normal";
type Stage = SkinKind | "done";
const FLOW: Stage[] = ["oily", "dry", "normal", "done"];
const STEPS = 3;

type Locales<T> = Record<Locale, T>;
const dict: Locales<{
  appTitle: string;
  stepCounter: (n: number) => string;
  taskEyebrow: string;
  questionEyebrow: string;
  hintEyebrow: string;
  feedbackEyebrow: string;
  skip: string;
  next: string;
  finish: string;
  retry: string;
  doneTitle: string;
  doneHint: string;
  mirrorLabel: string;
  options: Record<SkinKind, string>;
  cases: Record<SkinKind, { person: string; signals: string[]; description: string; question: string; hint: string; feedbackGood: string; feedbackSoft: string }>;
}> = {
  ru: {
    appTitle: "Skin identifier",
    stepCounter: (n) => `Face${n}from${STEPS}`,
    taskEyebrow: "Look",
    questionEyebrow: "Skin type",
    hintEyebrow: "What to look for",
    feedbackEyebrow: "Checking",
    skip: "Don't know",
    next: "Next person",
    finish: "Finish",
    retry: "Try again",
    doneTitle: "Well done! All skin types are recognized.",
    doneHint: "You learned how to distinguish between oily, dry and normal skin.",
    mirrorLabel: "Mirror",
    options: {
      oily: "Oily skin",
      dry: "Dry skin",
      normal: "Normal skin",
    },
    cases: {
      oily: {
        person: "Person 1",
        signals: ["forehead shines", "pores are enlarged", "oily nose in the evening"],
        description: "The face has a shiny forehead and nose. The skin looks shiny and oily.",
        question: "What skin type is this?",
        hint: "If the skin is shiny and pores are visible, it is oily skin.",
        feedbackGood: "Right. Oily skin - shine and enlarged pores.",
        feedbackSoft: "Look: the face is shining. This is not dry or normal skin.",
      },
      dry: {
        person: "Face 2",
        signals: ["peeling on the cheeks", "tight skin", "matte, no shine"],
        description: "Peeling is visible on the cheeks. The skin is tight, without shine, matte.",
        question: "What skin type is this?",
        hint: "If the skin peels and tightens, it is dry skin.",
        feedbackGood: "Right. Dry skin - flaking and tightness.",
        feedbackSoft: "Look at your cheeks - peeling. It's not fat and it's not normal.",
      },
      normal: {
        person: "Person 3",
        signals: ["even tone", "no shine", "no peeling"],
        description: "The skin is smooth, without shine and without flaking - it looks calm.",
        question: "What skin type is this?",
        hint: "If there is no shine or flaking, this is normal skin.",
        feedbackGood: "Right. Normal skin - no problem.",
        feedbackSoft: "Look: your face is smooth, there is no shine or flaking. This is normal.",
      },
    },
  },
  uz: {
    appTitle: "Teri turini aniqlash",
    stepCounter: (n) => `${n} / ${STEPS}-yuz`,
    taskEyebrow: "Qara",
    questionEyebrow: "Teri turi",
    hintEyebrow: "Nimaga qarash kerak",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    next: "Keyingi yuz",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    doneTitle: "Yashasin! Barcha teri turlari aniqlandi.",
    doneHint: "Sen yogʻli, quruq va normal teri farqini oʻrganding.",
    mirrorLabel: "Koʻzgu",
    options: {
      oily: "Yogʻli teri",
      dry: "Quruq teri",
      normal: "Normal teri",
    },
    cases: {
      oily: {
        person: "1-yuz",
        signals: ["peshana porlaydi", "teshikchalar katta", "burun yogʻli"],
        description: "Yuzning peshanasi va burni porlamoqda. Teri yogʻli koʻrinadi.",
        question: "Bu qaysi teri turi?",
        hint: "Teri porlasa va teshikchalar koʻrinsa — yogʻli teri.",
        feedbackGood: "Toʻgʻri. Yogʻli teri — porlash va katta teshikchalar.",
        feedbackSoft: "Qara: yuz porlamoqda. Bu quruq yoki normal emas.",
      },
      dry: {
        person: "2-yuz",
        signals: ["yonoqlarda parchalanish", "tortilgan teri", "porlamasdan"],
        description: "Yonoqlarda parchalanish koʻrinadi. Teri tortilgan, porlamaydi.",
        question: "Bu qaysi teri turi?",
        hint: "Parchalansa va tortilsa — quruq teri.",
        feedbackGood: "Toʻgʻri. Quruq teri — parchalanish va tortilish.",
        feedbackSoft: "Yonoqlarga qara — parchalanish. Bu yogʻli yoki normal emas.",
      },
      normal: {
        person: "3-yuz",
        signals: ["tekis rang", "porlamasdan", "parchalanmasdan"],
        description: "Teri tekis, porlamaydi va parchalanmaydi — tinch koʻrinadi.",
        question: "Bu qaysi teri turi?",
        hint: "Na porlash, na parchalanish — normal teri.",
        feedbackGood: "Toʻgʻri. Normal teri — muammosiz.",
        feedbackSoft: "Qara: yuz tekis. Bu normal teri.",
      },
    },
  },
};

const CORRECT: Record<SkinKind, SkinKind> = { oily: "oily", dry: "dry", normal: "normal" };

export function SkinTypeTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [stage, setStage] = useState<Stage>("oily");
  const [picked, setPicked] = useState<SkinKind | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stage === "done";
  const step = isDone ? STEPS : FLOW.indexOf(stage) + 1;
  const sit = isDone ? null : t.cases[stage as SkinKind];

  function tap(key: SkinKind) {
    if (feedback) return;
    setPicked(key);
    const ok = key === CORRECT[stage as SkinKind];
    answers.current[`skin-${stage}`] = { picked: key, correct: ok };
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

  let scene: ReactNode;
  if (isDone) {
    scene = (
      <div className="skin-app skin-app--done">
        <div className="outfit-done-tick" aria-hidden="true">
          <CabinetIcon name="check" />
        </div>
        <strong>{t.doneTitle}</strong>
        <p>{t.doneHint}</p>
      </div>
    );
  } else if (sit) {
    scene = (
      <div className={`skin-app skin-app--${stage}`}>
        <div className="skin-mirror-label">{t.mirrorLabel}</div>
        <div className="skin-mirror">
          <FaceArt kind={stage as SkinKind} />
        </div>
        <ul className="skin-signals">
          {sit.signals.map((s) => (
            <li key={s}>
              <span className="skin-signal-dot" aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="morning-quest-trainer skin-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark skin-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <circle cx="9" cy="10" r="1" fill="currentColor" />
              <circle cx="15" cy="10" r="1" fill="currentColor" />
              <path d="M9 15 Q12 17 15 15" />
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
          <div className={`mq-phone mq-phone--skin-${stage}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">11:0{Math.min(step, 9)}</span>
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
              <h3>{sit.question}</h3>
              <div className="mq-panel-options">
                {(["oily", "dry", "normal"] as SkinKind[]).map((k, i) => (
                  <button
                    key={k}
                    type="button"
                    className={`mq-panel-option${picked === k ? " mq-panel-option--picked" : ""}`}
                    onClick={() => tap(k)}
                  >
                    <span className="mq-panel-option-num">{i + 1}</span>
                    <span className="mq-panel-option-body">
                      <strong>{t.options[k]}</strong>
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
                  <button type="button" className="mq-panel-primary" onClick={advance}>
                    {stage === "normal" ? t.finish : t.next}
                  </button>
                ) : (
                  <button type="button" className="mq-panel-primary outfit-retry" onClick={retry}>
                    {t.retry}
                  </button>
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
              <button type="button" className="mq-panel-primary" onClick={finish}>
                {t.finish}
              </button>
            ) : !feedback ? (
              <button type="button" className="mq-panel-skip" onClick={skip}>{t.skip}</button>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}

// ── Inline face art ──

function FaceArt({ kind }: { kind: SkinKind }) {
  const art: Record<SkinKind, LessonItemArtId> = {
    oily: "skin-oily-realistic",
    dry: "skin-dry-realistic",
    normal: "skin-normal-realistic",
  };

  return <LessonItemArt id={art[kind]} size={206} className="skin-face-art" />;
}
