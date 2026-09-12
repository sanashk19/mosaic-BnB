"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { RecipeReaderTrainer as RecipeReaderTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: RecipeReaderTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Item = { id: string; name: string; art: LessonItemArtId; needed: boolean };

const FRIDGE: Item[] = [
  { id: "meat", name: "Minced meat", art: "recipe-ground-meat-realistic", needed: true },
  { id: "onion", name: "Bow", art: "recipe-onion-realistic", needed: true },
  { id: "egg", name: "Egg", art: "recipe-egg-realistic", needed: true },
  { id: "bread", name: "loaf", art: "recipe-bread-realistic", needed: true },
  { id: "sugar", name: "Sugar", art: "recipe-sugar-realistic", needed: false },
  { id: "cucumber", name: "cucumber", art: "recipe-cucumber-realistic", needed: false },
];
const NEEDED_COUNT = FRIDGE.filter((i) => i.needed).length;

type Locales<T> = Record<Locale, T>;
const dict: Locales<{
  appTitle: string;
  counter: (n: number, total: number) => string;
  taskEyebrow: string;
  questionEyebrow: string;
  hintEyebrow: string;
  feedbackEyebrow: string;
  skip: string;
  finish: string;
  doneTitle: string;
  doneHint: string;
  recipeTitle: string;
  recipeIngredients: string[];
  question: string;
  hint: string;
  foundMsg: (name: string) => string;
  wrongMsg: (name: string) => string;
}> = {
  ru: {
    appTitle: "Cutlet recipe",
    counter: (n, total) => `Products:${n}from${total}`,
    taskEyebrow: "Recipe",
    questionEyebrow: "Collect groceries",
    hintEyebrow: "Clue",
    feedbackEyebrow: "Cart",
    skip: "Don't know",
    finish: "Finish",
    doneTitle: "Well done! All ingredients for the cutlets have been collected.",
    doneHint: "Cutlets: minced meat, onion, egg, loaf. Sugar and cucumber are not needed here.",
    recipeTitle: "Cutlets - you need:",
    recipeIngredients: ["Minced meat", "Bow", "Egg", "Loaf (soak in milk)"],
    question: "Click on the products from the recipe",
    hint: "Take only what is in the recipe list on the left.",
    foundMsg: (name) => `${name}- add to cart. This is for cutlets.`,
    wrongMsg: (name) => `${name}They don’t put it in cutlets. Take it away.`,
  },
  uz: {
    appTitle: "Kotlet retsepti",
    counter: (n, total) => `Mahsulot: ${n} / ${total}`,
    taskEyebrow: "Retsept",
    questionEyebrow: "Mahsulot yigʻ",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Savat",
    skip: "Bilmayman",
    finish: "Yakunlash",
    doneTitle: "Yashasin! Kotlet uchun hamma narsa yigʻildi.",
    doneHint: "Kotlet: qiyma, piyoz, tuxum, non. Shakar va bodring kerak emas.",
    recipeTitle: "Kotlet — kerak:",
    recipeIngredients: ["Qiyma", "Piyoz", "Tuxum", "Non (sutga botiriladi)"],
    question: "Retseptdagi mahsulotlarni bos",
    hint: "Faqat chapdagi roʻyxatdagini ol.",
    foundMsg: (name) => `${name} — savatga. Bu kotlet uchun.`,
    wrongMsg: (name) => `${name} kotletga solinmaydi.`,
  },
};

export function RecipeReaderTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];
  const [found, setFound] = useState<string[]>([]);
  const [last, setLast] = useState<{ name: string; ok: boolean } | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = found.length === NEEDED_COUNT;

  function tap(item: Item) {
    if (isDone || found.includes(item.id)) return;
    if (item.needed) {
      setFound((a) => [...a, item.id]);
      setLast({ name: item.name, ok: true });
      answers.current[item.id] = "added";
    } else {
      setLast({ name: item.name, ok: false });
      answers.current[`wrong-${item.id}`] = true;
    }
  }
  function finish() { onDone({ correct: true }); }
  function skip() { setFound(FRIDGE.filter((i) => i.needed).map((i) => i.id)); }
  void trainer;

  const scene: ReactNode = isDone ? (
    <div className="recipe-app recipe-app--done">
      <div className="outfit-done-tick" aria-hidden="true"><CabinetIcon name="check" /></div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : (
    <div className="recipe-app">
      <div className="recipe-card">
        <div className="recipe-card-head"><LessonItemArt id="cutlets" size={48} /><strong>{t.recipeTitle}</strong></div>
        <ul className="recipe-list">
          {t.recipeIngredients.map((ing) => (<li key={ing}>{ing}</li>))}
        </ul>
      </div>
      <div className="recipe-fridge">
        {FRIDGE.map((item) => (
          <button key={item.id} type="button" className={`recipe-product${found.includes(item.id) ? " recipe-product--found" : ""}`} onClick={() => tap(item)} disabled={found.includes(item.id)}>
            <LessonItemArt id={item.art} size={58} className="recipe-product-art" />
            <small>{item.name}</small>
            {found.includes(item.id) ? <span className="recipe-product-check" aria-hidden="true">✓</span> : null}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="morning-quest-trainer recipe-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark recipe-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8 H16 M8 12 H16 M8 16 H12"/></svg>
          </span>
          <div><strong>{t.appTitle}</strong><small>{t.counter(found.length, NEEDED_COUNT)}</small></div>
        </div>
        <div className="mq-topbar-progress" aria-hidden="true">
          {Array.from({ length: NEEDED_COUNT }).map((_, i) => (<span key={i} className={`mq-topbar-dot${found.length > i ? " mq-topbar-dot--done" : ""}${found.length === i && !isDone ? " mq-topbar-dot--current" : ""}`} />))}
        </div>
      </header>
      <div className="mq-shell">
        <div className="mq-phone-col">
          <div className={`mq-phone mq-phone--recipe${isDone ? "-done" : ""}`}>
            <div className="mq-phone-statusbar"><span className="mq-phone-time">12:0{Math.min(found.length + 1, 9)}</span><span className="mq-phone-island" aria-hidden="true" /><span className="mq-phone-status-icons" aria-hidden="true"><svg width="16" height="11" viewBox="0 0 16 11" fill="none"><rect x="0" y="7" width="2.5" height="4" rx="0.5" fill="currentColor"/><rect x="3.5" y="5" width="2.5" height="6" rx="0.5" fill="currentColor"/><rect x="7" y="3" width="2.5" height="8" rx="0.5" fill="currentColor"/><rect x="10.5" y="0" width="2.5" height="11" rx="0.5" fill="currentColor"/></svg><svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke="currentColor" fill="none"/><rect x="2" y="2" width="14" height="7" rx="1" fill="currentColor"/><rect x="19.5" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor"/></svg></span></div>
            <div className="mq-phone-content">{scene}</div>
            <div className="mq-phone-home" aria-hidden="true" />
          </div>
        </div>
        <aside className="mq-panel">
          <div className="mq-panel-task"><span className="mq-eyebrow">{t.taskEyebrow}</span><p className="mq-panel-task-text">{isDone ? t.doneHint : t.question}</p></div>
          {!isDone ? (
            <div className="mq-panel-hint"><span className="mq-eyebrow">{t.hintEyebrow}</span><p>{t.hint}</p></div>
          ) : null}
          {last ? (
            <div className={`outfit-feedback outfit-feedback--${last.ok ? "good" : "soft"}`}>
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{last.ok ? t.foundMsg(last.name) : t.wrongMsg(last.name)}</p>
            </div>
          ) : null}
          <div className="mq-panel-footer">
            {isDone ? (<button type="button" className="mq-panel-primary" onClick={finish}>{t.finish}</button>) : (<button type="button" className="mq-panel-skip" onClick={skip}>{t.skip}</button>)}
          </div>
        </aside>
      </div>
    </div>
  );
}
