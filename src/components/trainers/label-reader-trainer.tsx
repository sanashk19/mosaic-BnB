"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { LabelReaderTrainer as LabelReaderTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: LabelReaderTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Spot = "expiry" | "ingredients" | "usage" | "warning";
const SPOTS: Spot[] = ["expiry", "ingredients", "usage", "warning"];

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
  foundCounter: (n: number, total: number) => string;
  spots: Record<Spot, { label: string; value: string; description: string; instruction: string }>;
  productName: string;
  brand: string;
}> = {
  ru: {
    appTitle: "Cream label",
    taskEyebrow: "What to look for",
    questionEyebrow: "Find it on the label",
    hintEyebrow: "Clue",
    feedbackEyebrow: "Found",
    skip: "Don't know",
    finish: "Finish",
    doneTitle: "Great! All 4 locations have been found.",
    doneHint: "This is how you need to read the label of any cream.",
    foundCounter: (n, total) => `Found${n}from${total}`,
    productName: "Face cream “Gentle”",
    brand: "Mosaic Care",
    spots: {
      expiry: {
        label: "Best before date",
        value: "Until 12.2027",
        description: "After this date, the cream cannot be used.",
        instruction: "Find the date - after it the cream is no longer needed.",
      },
      ingredients: {
        label: "Composition",
        value: "Water, glycerin, vitamin E...",
        description: "What's inside: what substances are included in the cream.",
        instruction: "Find the list - the components are listed there.",
      },
      usage: {
        label: "How to use",
        value: "Apply to clean face in the morning",
        description: "Rules: where, when and how to apply.",
        instruction: "Find the paragraph about applying cream.",
      },
      warning: {
        label: "Warning",
        value: "If redness occurs, rinse with water.",
        description: "What to do if something goes wrong.",
        instruction: "Find a warning - what to do if you have an allergy.",
      },
    },
  },
  uz: {
    appTitle: "Krem yorligʻi",
    taskEyebrow: "Nimani qidirish",
    questionEyebrow: "Yorliqdan top",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Topildi",
    skip: "Bilmayman",
    finish: "Yakunlash",
    doneTitle: "Ajoyib! 4 ta joy ham topildi.",
    doneHint: "Har qanday krem yorligʻini shunday oʻqish kerak.",
    foundCounter: (n, total) => `${n} / ${total} topildi`,
    productName: "Yuz uchun «Yumshoq» kremi",
    brand: "Mosaic Care",
    spots: {
      expiry: {
        label: "Yaroqlilik muddati",
        value: "12.2027 gacha",
        description: "Bu sanadan keyin kremni ishlatib boʻlmaydi.",
        instruction: "Sanani top — undan keyin krem kerak emas.",
      },
      ingredients: {
        label: "Tarkibi",
        value: "Suv, glitserin, E vitamini…",
        description: "Ichida nima bor: qaysi moddalar.",
        instruction: "Roʻyxatni top — komponentlar shu yerda.",
      },
      usage: {
        label: "Qoʻllash usuli",
        value: "Toza yuzga ertalab surting",
        description: "Qachon va qanday surish.",
        instruction: "Surish haqidagi xatboshini top.",
      },
      warning: {
        label: "Ogohlantirish",
        value: "Qizarsa suv bilan yuvib tashlang",
        description: "Allergiyada nima qilish.",
        instruction: "Ogohlantirishni top.",
      },
    },
  },
};

const TOTAL = SPOTS.length;

export function LabelReaderTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [found, setFound] = useState<Spot[]>([]);
  const [lastFound, setLastFound] = useState<Spot | null>(null);
  const [wrongTap, setWrongTap] = useState(false);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = found.length === TOTAL;
  const remaining = SPOTS.filter((s) => !found.includes(s));
  const currentTarget = remaining[0] ?? null;

  function tap(spot: Spot) {
    if (isDone) return;
    if (found.includes(spot)) return;
    if (spot === currentTarget) {
      setFound((arr) => [...arr, spot]);
      setLastFound(spot);
      setWrongTap(false);
      answers.current[`label-${spot}`] = "found";
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
    <div className="label-app label-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : (
    <div className="label-app">
      <div className={`label-card${wrongTap ? " label-card--shake" : ""}`}>
        <div className="label-card-head">
          <div className="label-brand">{t.brand}</div>
          <div className="label-product">{t.productName}</div>
        </div>
        <div className="label-art" aria-hidden="true">
          <CreamTubeArt />
        </div>
        <div className="label-zones">
          <LabelSpot
            kind="expiry"
            row={1}
            found={found.includes("expiry")}
            target={currentTarget === "expiry"}
            t={t}
            onClick={() => tap("expiry")}
          />
          <LabelSpot
            kind="ingredients"
            row={2}
            found={found.includes("ingredients")}
            target={currentTarget === "ingredients"}
            t={t}
            onClick={() => tap("ingredients")}
          />
          <LabelSpot
            kind="usage"
            row={3}
            found={found.includes("usage")}
            target={currentTarget === "usage"}
            t={t}
            onClick={() => tap("usage")}
          />
          <LabelSpot
            kind="warning"
            row={4}
            found={found.includes("warning")}
            target={currentTarget === "warning"}
            t={t}
            onClick={() => tap("warning")}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="morning-quest-trainer label-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark label-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M7 9 H17 M7 13 H14 M7 17 H12" />
            </svg>
          </span>
          <div>
            <strong>{t.appTitle}</strong>
            <small>{t.foundCounter(found.length, TOTAL)}</small>
          </div>
        </div>
        <div className="mq-topbar-progress" aria-hidden="true">
          {SPOTS.map((s) => (
            <span
              key={s}
              className={`mq-topbar-dot${found.includes(s) ? " mq-topbar-dot--done" : ""}${currentTarget === s ? " mq-topbar-dot--current" : ""}`}
            />
          ))}
        </div>
      </header>

      <div className="mq-shell">
        <div className="mq-phone-col">
          <div className={`mq-phone mq-phone--label${isDone ? "-done" : ""}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">13:0{Math.min(found.length + 1, 9)}</span>
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
          {isDone ? (
            <div className="mq-panel-task">
              <span className="mq-eyebrow">{t.taskEyebrow}</span>
              <p className="mq-panel-task-text">{t.doneHint}</p>
            </div>
          ) : currentTarget ? (
            <div className="mq-panel-task">
              <span className="mq-eyebrow">{t.taskEyebrow}</span>
              <p className="mq-panel-task-text">{t.spots[currentTarget].label}</p>
              <small style={{ display: "block", marginTop: 6, color: "var(--mq-muted, #64748b)", fontSize: "0.85rem" }}>
                {t.spots[currentTarget].description}
              </small>
            </div>
          ) : null}

          {!isDone && currentTarget ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{t.spots[currentTarget].label}</h3>
              <p className="outfit-pick-summary">
                
                Click on the desired location on the label.{wrongTap ? <strong style={{ color: "#dc2626" }}>This is not the place - look again.</strong> : null}
              </p>
            </div>
          ) : null}

          {!isDone && currentTarget ? (
            <div className="mq-panel-hint">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>{t.spots[currentTarget].instruction}</p>
            </div>
          ) : null}

          {lastFound ? (
            <div className="outfit-feedback outfit-feedback--good">
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>
                <strong>{t.spots[lastFound].label}:</strong> {t.spots[lastFound].value}
              </p>
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

function LabelSpot({
  kind, row, found, target, t, onClick,
}: {
  kind: Spot;
  row: number;
  found: boolean;
  target: boolean;
  t: ReturnType<typeof dict.ru extends infer X ? () => X : never> | typeof dict.ru;
  onClick: () => void;
}) {
  const info = t.spots[kind];
  return (
    <button
      type="button"
      className={`label-spot label-spot--${kind}${found ? " label-spot--found" : ""}${target ? " label-spot--target" : ""}`}
      onClick={onClick}
      disabled={found}
      aria-label={info.label}
      style={{ gridRow: row }}
    >
      <span className="label-spot-icon" aria-hidden="true">
        {kind === "expiry" ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10 H21 M8 3 V7 M16 3 V7" />
          </svg>
        ) : kind === "ingredients" ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6 H20 M4 12 H20 M4 18 H14" />
          </svg>
        ) : kind === "usage" ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4 L4 20 L20 20 Z" />
            <path d="M12 10 V14 M12 16 V17" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7 V12 M12 16 V17" />
          </svg>
        )}
      </span>
      <span className="label-spot-text">
        <strong>{info.label}</strong>
        {found ? <small>{info.value}</small> : <small>click to read</small>}
      </span>
      {found ? (
        <span className="label-spot-check" aria-hidden="true">
          <CabinetIcon name="check" />
        </span>
      ) : null}
    </button>
  );
}

function CreamTubeArt() {
  return <LessonItemArt id="cosmetic-label-realistic" size={136} />;
}
