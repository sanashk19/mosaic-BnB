"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { TableSettingTrainer as TableSettingTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: TableSettingTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type ItemKey = "plate" | "fork" | "knife" | "glass" | "napkin" | "spoon";
type SlotKey = "center" | "left" | "right-inner" | "right-outer" | "top-right" | "on-plate";

const ORDER: { item: ItemKey; slot: SlotKey }[] = [
  { item: "plate", slot: "center" },
  { item: "fork", slot: "left" },
  { item: "knife", slot: "right-inner" },
  { item: "spoon", slot: "right-outer" },
  { item: "glass", slot: "top-right" },
  { item: "napkin", slot: "on-plate" },
];

const STEPS = ORDER.length;

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
  doneTitle: string;
  doneHint: string;
  items: Record<ItemKey, string>;
  slotInstr: Record<SlotKey, string>;
  feedbackGood: string;
  feedbackSoft: string;
}> = {
  ru: {
    appTitle: "Table setting",
    stepCounter: (n) => `Step${n}from${STEPS}`,
    taskEyebrow: "What to put",
    questionEyebrow: "Find the item you need",
    hintEyebrow: "Clue",
    feedbackEyebrow: "Checking",
    skip: "Don't know",
    finish: "Finish",
    retry: "Try again",
    doneTitle: "Well done! The table is set.",
    doneHint: "Plate in the center, fork on the left, knife and spoon on the right, glass top right, napkin on the plate.",
    items: { plate: "Plate", fork: "Fork", knife: "Knife", glass: "Cup", napkin: "Napkin", spoon: "Spoon" },
    slotInstr: {
      center: "In the center is a large dinner plate.",
      left: "To the left of the plate is a fork.",
      "right-inner": "To the right of the plate is a knife.",
      "right-outer": "To the right of the knife is a spoon.",
      "top-right": "Top right is a glass.",
      "on-plate": "There is a folded napkin on the plate.",
    },
    feedbackGood: "Right! Placed correctly.",
    feedbackSoft: "This is not the same item. Try again.",
  },
  uz: {
    appTitle: "Dasturxon yozish",
    stepCounter: (n) => `${n} / ${STEPS}-qadam`,
    taskEyebrow: "Nima qoʻyish",
    questionEyebrow: "Kerakli buyumni top",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    doneTitle: "Yashasin! Dasturxon yozilgan.",
    doneHint: "Likob markazda, vilka chapda, pichoq va qoshiq oʻngda, stakan oʻng tepada, salfetka likob ustida.",
    items: { plate: "Likob", fork: "Vilka", knife: "Pichoq", glass: "Stakan", napkin: "Salfetka", spoon: "Qoshiq" },
    slotInstr: {
      center: "Markazda — katta likob.",
      left: "Likobning chapida — vilka.",
      "right-inner": "Likobning oʻngida — pichoq.",
      "right-outer": "Pichoqning oʻngida — qoshiq.",
      "top-right": "Tepa oʻngda — stakan.",
      "on-plate": "Likob ustida — buklangan salfetka.",
    },
    feedbackGood: "Toʻgʻri! Toʻgʻri qoʻyildi.",
    feedbackSoft: "Bu mos emas. Qayta urinib koʻr.",
  },
};

const OPTIONS_PER_STEP: ItemKey[][] = [
  ["plate", "fork", "glass"],
  ["fork", "knife", "spoon"],
  ["knife", "spoon", "napkin"],
  ["spoon", "knife", "fork"],
  ["glass", "plate", "napkin"],
  ["napkin", "spoon", "glass"],
];

const ITEM_ART: Record<ItemKey, LessonItemArtId> = {
  plate: "plate",
  fork: "fork",
  knife: "knife",
  glass: "glass",
  napkin: "napkin",
  spoon: "spoon",
};

export function TableSettingTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [stepIdx, setStepIdx] = useState(0);
  const [placed, setPlaced] = useState<Partial<Record<SlotKey, ItemKey>>>({});
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stepIdx >= STEPS;
  const current = !isDone ? ORDER[stepIdx] : null;

  function tap(item: ItemKey) {
    if (feedback || !current) return;
    const ok = item === current.item;
    answers.current[`set-${stepIdx}`] = { item, correct: ok };
    if (ok) {
      setPlaced((p) => ({ ...p, [current.slot]: current.item }));
    }
    setFeedback(ok ? "good" : "soft");
  }

  function advance() {
    setStepIdx((i) => i + 1);
    setFeedback(null);
  }
  function retry() { setFeedback(null); }
  function skip() { answers.current[`skip-${stepIdx}`] = true; advance(); }
  function finish() { onDone({ correct: true }); }

  void trainer;

  const scene: ReactNode = isDone ? (
    <div className="setting-app setting-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : (
    <div className="setting-app">
      <div className="setting-tabletop">
        <div className="setting-tabletop-board" aria-hidden="true">
          <LessonItemArt id="table-setting-realistic" size={238} className="setting-table-realistic-bg" />
          <SlotPlace slot="center" kind="plate" active={current?.slot === "center"} placed={placed.center} label={t.items.plate} />
          <SlotPlace slot="left" kind="fork" active={current?.slot === "left"} placed={placed.left} label={t.items.fork} />
          <SlotPlace slot="right-inner" kind="knife" active={current?.slot === "right-inner"} placed={placed["right-inner"]} label={t.items.knife} />
          <SlotPlace slot="right-outer" kind="spoon" active={current?.slot === "right-outer"} placed={placed["right-outer"]} label={t.items.spoon} />
          <SlotPlace slot="top-right" kind="glass" active={current?.slot === "top-right"} placed={placed["top-right"]} label={t.items.glass} />
          <SlotPlace slot="on-plate" kind="napkin" active={current?.slot === "on-plate"} placed={placed["on-plate"]} label={t.items.napkin} />
        </div>
      </div>

      {current ? (
        <div className="setting-rack">
          {OPTIONS_PER_STEP[stepIdx].map((opt, i) => (
            <button
              key={opt}
              type="button"
              className="setting-rack-card"
              onClick={() => tap(opt)}
              disabled={Boolean(feedback)}
            >
              <span className="setting-rack-num">{i + 1}</span>
              <ItemArt kind={opt} size={58} />
              <small>{t.items[opt]}</small>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );

  return (
    <div className="morning-quest-trainer setting-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark setting-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
            </svg>
          </span>
          <div>
            <strong>{t.appTitle}</strong>
            <small>{t.stepCounter(Math.min(stepIdx + 1, STEPS))}</small>
          </div>
        </div>
        <div className="mq-topbar-progress" aria-hidden="true">
          {Array.from({ length: STEPS }).map((_, i) => (
            <span
              key={i}
              className={`mq-topbar-dot${stepIdx > i || isDone ? " mq-topbar-dot--done" : ""}${stepIdx === i && !isDone ? " mq-topbar-dot--current" : ""}`}
            />
          ))}
        </div>
      </header>

      <div className="mq-shell">
        <div className="mq-phone-col">
          <div className={`mq-phone mq-phone--setting${isDone ? "-done" : ""}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">19:0{Math.min(stepIdx + 1, 9)}</span>
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
            <p className="mq-panel-task-text">{current ? t.slotInstr[current.slot] : t.doneHint}</p>
          </div>

          {current && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{t.items[current.item]}</h3>
            </div>
          ) : null}

          {feedback ? (
            <div className={`outfit-feedback outfit-feedback--${feedback}`}>
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{feedback === "good" ? t.feedbackGood : t.feedbackSoft}</p>
              <div className="outfit-feedback-actions">
                {feedback === "good" ? (
                  <button type="button" className="mq-panel-primary" onClick={advance}>{stepIdx + 1 >= STEPS ? t.finish : "Next"}</button>
                ) : (
                  <button type="button" className="mq-panel-primary outfit-retry" onClick={retry}>{t.retry}</button>
                )}
              </div>
            </div>
          ) : current ? (
            <div className="mq-panel-hint">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>{t.slotInstr[current.slot]}</p>
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

function SlotPlace({
  slot,
  active,
  placed,
  label,
}: {
  slot: SlotKey;
  kind: ItemKey;
  active: boolean;
  placed?: ItemKey;
  label: string;
}) {
  return (
    <span className={`setting-slot setting-slot--${slot}${active ? " setting-slot--active" : ""}${placed ? " setting-slot--placed" : ""}`}>
      <span className="setting-slot-target">
        {placed ? <ItemArt kind={placed} size={70} /> : <span>{label}</span>}
      </span>
    </span>
  );
}

function ItemArt({ kind, size }: { kind: ItemKey; size: number }) {
  return <LessonItemArt id={ITEM_ART[kind]} size={size} className="setting-item-art" />;
}
