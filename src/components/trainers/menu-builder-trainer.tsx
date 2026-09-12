"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { MenuBuilderTrainer as MenuBuilderTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: MenuBuilderTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Slot = "hot" | "side" | "drink";
type Stage = Slot | "done";
const FLOW: Stage[] = ["hot", "side", "drink", "done"];
const STEPS = 3;
type MenuOptionId = "soup" | "chips" | "cake" | "veg" | "candy" | "soda-cake" | "compote" | "soda" | "energy";

const MENU_ART: Record<MenuOptionId, LessonItemArtId> = {
  soup: "menu-soup-realistic",
  chips: "menu-chips-realistic",
  cake: "menu-cake-realistic",
  veg: "menu-salad-realistic",
  candy: "recipe-sugar-realistic",
  "soda-cake": "menu-cake-realistic",
  compote: "menu-compote-realistic",
  soda: "menu-soda-realistic",
  energy: "menu-soda-realistic",
};

function menuArt(id: string): LessonItemArtId {
  return MENU_ART[id as MenuOptionId] ?? "healthy-dinner";
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
  context: string;
  slots: Record<Slot, { question: string; hint: string; options: { id: string; label: string }[]; correct: string; chosenLabel: string }>;
  feedbackGood: string;
  feedbackSoft: string;
  plateTitle: string;
}> = {
  ru: {
    appTitle: "Healthy dinner",
    stepCounter: (n) => `Part${n}from${STEPS}`,
    taskEyebrow: "Dinner",
    questionEyebrow: "Choose",
    hintEyebrow: "Clue",
    feedbackEyebrow: "Checking",
    skip: "Don't know",
    finish: "Finish",
    retry: "Try again",
    next: "Next",
    doneTitle: "Well done! Dinner is balanced.",
    doneHint: "Healthy dinner: hot dish + vegetable side dish + healthy drink.",
    context: "Pack a healthy dinner: main course, side dish and drink.",
    plateTitle: "Your dinner",
    slots: {
      hot: {
        question: "What's hot?",
        hint: "Hot food is boiled or stewed, not chips.",
        options: [{ id: "soup", label: "Chicken soup" }, { id: "chips", label: "Chips" }, { id: "cake", label: "Cake" }],
        correct: "soup",
        chosenLabel: "Chicken soup",
      },
      side: {
        question: "What side dish?",
        hint: "A healthy side dish is vegetables or porridge.",
        options: [{ id: "veg", label: "Vegetables" }, { id: "candy", label: "Candies" }, { id: "soda-cake", label: "Cake" }],
        correct: "veg",
        chosenLabel: "Vegetables",
      },
      drink: {
        question: "What drink?",
        hint: "A healthy drink is water or compote, not soda.",
        options: [{ id: "compote", label: "Compote" }, { id: "soda", label: "Soda" }, { id: "energy", label: "Energetic" }],
        correct: "compote",
        chosenLabel: "Compote",
      },
    },
    feedbackGood: "Right! A useful choice.",
    feedbackSoft: "This is not for a healthy dinner. Choose what is useful.",
  },
  uz: {
    appTitle: "Sogʻlom kechki ovqat",
    stepCounter: (n) => `${n} / ${STEPS}-qism`,
    taskEyebrow: "Kechki ovqat",
    questionEyebrow: "Tanla",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    next: "Davom",
    doneTitle: "Yashasin! Ovqat muvozanatli.",
    doneHint: "Sogʻlom ovqat: issiq + sabzavot + foydali ichimlik.",
    context: "Sogʻlom kechki ovqat yigʻ: issiq, garnir va ichimlik.",
    plateTitle: "Sening ovqating",
    slots: {
      hot: { question: "Issiqqa nima?", hint: "Issiq — qaynatilgan, chips emas.", options: [{ id: "soup", label: "Tovuq sho'rva" }, { id: "chips", label: "Chips" }, { id: "cake", label: "Tort" }], correct: "soup", chosenLabel: "Tovuq shoʻrva" },
      side: { question: "Qaysi garnir?", hint: "Foydali garnir — sabzavot.", options: [{ id: "veg", label: "Sabzavot" }, { id: "candy", label: "Konfet" }, { id: "soda-cake", label: "Pirojnoe" }], correct: "veg", chosenLabel: "Sabzavot" },
      drink: { question: "Qaysi ichimlik?", hint: "Foydali — suv yoki kompot.", options: [{ id: "compote", label: "Kompot" }, { id: "soda", label: "Gazli suv" }, { id: "energy", label: "Energetik" }], correct: "compote", chosenLabel: "Kompot" },
    },
    feedbackGood: "Toʻgʻri! Foydali tanlov.",
    feedbackSoft: "Bu sogʻlom emas. Foydalisini tanla.",
  },
};

export function MenuBuilderTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];
  const [stage, setStage] = useState<Stage>("hot");
  const [picked, setPicked] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const [chosen, setChosen] = useState<Partial<Record<Slot, { label: string; art: LessonItemArtId }>>>({});
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stage === "done";
  const step = isDone ? STEPS : FLOW.indexOf(stage) + 1;
  const s = isDone ? null : t.slots[stage as Slot];

  function tap(id: string) {
    if (feedback || !s) return;
    setPicked(id);
    const ok = id === s.correct;
    answers.current[`menu-${stage}`] = { picked: id, correct: ok };
    if (ok) setChosen((c) => ({ ...c, [stage as Slot]: { label: s.chosenLabel, art: menuArt(id) } }));
    setFeedback(ok ? "good" : "soft");
  }
  function advance() { const i = FLOW.indexOf(stage); setStage(FLOW[Math.min(i + 1, FLOW.length - 1)]); setPicked(null); setFeedback(null); }
  function retry() { setFeedback(null); setPicked(null); }
  function skip() { answers.current[`skip-${stage}`] = true; advance(); }
  function finish() { onDone({ correct: true }); }
  void trainer;

  const scene: ReactNode = isDone ? (
    <div className="menu-app menu-app--done">
      <div className="outfit-done-tick" aria-hidden="true"><CabinetIcon name="check" /></div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : (
    <div className="menu-app">
      <div className="menu-plate-wrap">
        <LessonItemArt id="healthy-dinner" size={150} />
      </div>
      <div className="menu-slots">
        {(["hot", "side", "drink"] as Slot[]).map((slot) => (
          <div key={slot} className={`menu-slot${chosen[slot] ? " menu-slot--filled" : ""}${stage === slot ? " menu-slot--active" : ""}`}>
            <span className="menu-slot-label">{slot === "hot" ? "Hot" : slot === "side" ? "Garnish" : "Drink"}</span>
            {chosen[slot] ? (
              <span className="menu-slot-choice">
                <LessonItemArt id={chosen[slot].art} size={30} />
                <strong>{chosen[slot].label}</strong>
              </span>
            ) : (
              <strong>—</strong>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="morning-quest-trainer menu-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark menu-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
          </span>
          <div><strong>{t.appTitle}</strong><small>{t.stepCounter(step)}</small></div>
        </div>
        <div className="mq-topbar-progress" aria-hidden="true">
          {Array.from({ length: STEPS }).map((_, i) => (<span key={i} className={`mq-topbar-dot${step > i + 1 || isDone ? " mq-topbar-dot--done" : ""}${step === i + 1 && !isDone ? " mq-topbar-dot--current" : ""}`} />))}
        </div>
      </header>
      <div className="mq-shell">
        <div className="mq-phone-col">
          <div className={`mq-phone mq-phone--menu-${stage}`}>
            <div className="mq-phone-statusbar"><span className="mq-phone-time">19:0{step}</span><span className="mq-phone-island" aria-hidden="true" /><span className="mq-phone-status-icons" aria-hidden="true"><svg width="16" height="11" viewBox="0 0 16 11" fill="none"><rect x="0" y="7" width="2.5" height="4" rx="0.5" fill="currentColor"/><rect x="3.5" y="5" width="2.5" height="6" rx="0.5" fill="currentColor"/><rect x="7" y="3" width="2.5" height="8" rx="0.5" fill="currentColor"/><rect x="10.5" y="0" width="2.5" height="11" rx="0.5" fill="currentColor"/></svg><svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke="currentColor" fill="none"/><rect x="2" y="2" width="14" height="7" rx="1" fill="currentColor"/><rect x="19.5" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor"/></svg></span></div>
            <div className="mq-phone-content">{scene}</div>
            <div className="mq-phone-home" aria-hidden="true" />
          </div>
        </div>
        <aside className="mq-panel">
          <div className="mq-panel-task"><span className="mq-eyebrow">{t.taskEyebrow}</span><p className="mq-panel-task-text">{t.context}</p></div>
          {s && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{s.question}</h3>
              <div className="mq-panel-options">
                {s.options.map((o, i) => (
                  <button key={o.id} type="button" className={`mq-panel-option${picked === o.id ? " mq-panel-option--picked" : ""}`} onClick={() => tap(o.id)}>
                    <span className="mq-panel-option-num">{i + 1}</span>
                    <span className="mq-panel-option-body mq-panel-option-body--art">
                      <LessonItemArt id={menuArt(o.id)} size={42} />
                      <strong>{o.label}</strong>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {feedback && s ? (
            <div className={`outfit-feedback outfit-feedback--${feedback}`}>
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{feedback === "good" ? t.feedbackGood : t.feedbackSoft}</p>
              <div className="outfit-feedback-actions">
                {feedback === "good" ? (<button type="button" className="mq-panel-primary" onClick={advance}>{stage === "drink" ? t.finish : t.next}</button>) : (<button type="button" className="mq-panel-primary outfit-retry" onClick={retry}>{t.retry}</button>)}
              </div>
            </div>
          ) : s ? (<div className="mq-panel-hint"><span className="mq-eyebrow">{t.hintEyebrow}</span><p>{s.hint}</p></div>) : null}
          <div className="mq-panel-footer">
            {isDone ? (<button type="button" className="mq-panel-primary" onClick={finish}>{t.finish}</button>) : !feedback ? (<button type="button" className="mq-panel-skip" onClick={skip}>{t.skip}</button>) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
