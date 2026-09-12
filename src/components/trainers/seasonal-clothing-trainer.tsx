"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { SeasonalClothingTrainer as SeasonalClothingTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: SeasonalClothingTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Season = "hot" | "cool" | "cold";
type Stage = Season | "done";
const FLOW: Stage[] = ["hot", "cool", "cold", "done"];
const STEPS = 3;

type Outfit = "tshirt" | "sweater" | "jacket" | "puffer";

const TEMP: Record<Season, { value: string; label: string; condition: string }> = {
  hot: { value: "+30°", label: "Hot", condition: "sunny, no precipitation" },
  cool: { value: "+10°", label: "Cool", condition: "cloudy, may drizzle" },
  cold: { value: "−5°", label: "It's cold", condition: "frosty, windy" },
};

const CORRECT: Record<Season, Outfit> = {
  hot: "tshirt",
  cool: "jacket",
  cold: "puffer",
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
  outfits: Record<Outfit, { name: string; sub: string }>;
  cases: Record<Season, { context: string; question: string; hint: string; feedbackGood: string; feedbackSoft: string; uzLabel: string; uzCondition: string }>;
}> = {
  ru: {
    appTitle: "Weather and clothing",
    stepCounter: (n) => `Forecast${n}from${STEPS}`,
    taskEyebrow: "Forecast",
    questionEyebrow: "What to wear",
    hintEyebrow: "Clue",
    feedbackEyebrow: "Checking",
    skip: "Don't know",
    finish: "Finish",
    next: "Next forecast",
    retry: "Try again",
    doneTitle: "Well done! You have chosen clothes for every weather.",
    doneHint: "Hot - light; cool - jacket; frost - down jacket.",
    outfits: {
      tshirt: { name: "T-shirt and shorts", sub: "light, for hot weather" },
      sweater: { name: "Sweater", sub: "for a cool home" },
      jacket: { name: "Jacket", sub: "for cool street" },
      puffer: { name: "Down jacket and hat", sub: "warm, for cold weather" },
    },
    cases: {
      hot: {
        context: "Summer. It's very hot outside, the sun is high.",
        question: "What to wear at +30°?",
        hint: "In hot weather, you need light clothing: T-shirt, shorts, Panama hat.",
        feedbackGood: "Right. At +30° it is light and bright.",
        feedbackSoft: "At +30° it will be hot in these clothes. It needs to be lighter.",
        uzLabel: "", uzCondition: "",
      },
      cool: {
        context: "Autumn. It's cool outside and drizzling.",
        question: "What to wear at +10°?",
        hint: "+10° - you need a jacket, it’s warm, but not heavy.",
        feedbackGood: "Right. +10° - jacket, you can wear a sweater underneath.",
        feedbackSoft: "It will be too cold or too hot. Need a jacket.",
        uzLabel: "", uzCondition: "",
      },
      cold: {
        context: "Winter. It's freezing outside and there's a strong wind.",
        question: "What to wear at −5°?",
        hint: "In cold weather you need a down jacket, a hat, a scarf and gloves.",
        feedbackGood: "Right. At −5° - a down jacket and a hat, it’s cold without them.",
        feedbackSoft: "You'll freeze in this. You need something warm - a down jacket and a hat.",
        uzLabel: "", uzCondition: "",
      },
    },
  },
  uz: {
    appTitle: "Ob-havo va kiyim",
    stepCounter: (n) => `${n} / ${STEPS}-prognoz`,
    taskEyebrow: "Prognoz",
    questionEyebrow: "Nima kiyish",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    next: "Keyingi prognoz",
    retry: "Qayta urinish",
    doneTitle: "Yashasin! Sen har ob-havoga kiyim tanladingg.",
    doneHint: "Issiq — yengil; salqin — kurtka; sovuq — qishki kurtka.",
    outfits: {
      tshirt: { name: "Futbolka va short", sub: "yengil, issiq uchun" },
      sweater: { name: "Sviter", sub: "uy uchun" },
      jacket: { name: "Kurtka", sub: "salqin uchun" },
      puffer: { name: "Qishki kurtka, telpak", sub: "sovuq uchun" },
    },
    cases: {
      hot: {
        context: "Yoz. Tashqari juda issiq, quyosh baland.",
        question: "+30° da nima kiyish?",
        hint: "Issiqda yengil kiyim: futbolka, short, panama.",
        feedbackGood: "Toʻgʻri. +30° — yengil va och rang.",
        feedbackSoft: "+30° da bunda issiq. Yengilroq kerak.",
        uzLabel: "", uzCondition: "",
      },
      cool: {
        context: "Kuz. Salqin, mayda yomgʻir.",
        question: "+10° da nima kiyish?",
        hint: "+10° — kurtka kerak.",
        feedbackGood: "Toʻgʻri. +10° — kurtka.",
        feedbackSoft: "Bunda sovuq yoki issiq boʻladi. Kurtka kerak.",
        uzLabel: "", uzCondition: "",
      },
      cold: {
        context: "Qish. Tashqari sovuq, shamol.",
        question: "−5° da nima kiyish?",
        hint: "Sovuqda qishki kurtka, telpak, sharf, qoʻlqop kerak.",
        feedbackGood: "Toʻgʻri. −5° — qishki kurtka va telpak.",
        feedbackSoft: "Bunda muzlaysan. Issiq kerak — qishki kurtka.",
        uzLabel: "", uzCondition: "",
      },
    },
  },
};

const OUTFIT_OPTIONS: Outfit[] = ["tshirt", "sweater", "jacket", "puffer"];

export function SeasonalClothingTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [stage, setStage] = useState<Stage>("hot");
  const [picked, setPicked] = useState<Outfit | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stage === "done";
  const step = isDone ? STEPS : FLOW.indexOf(stage) + 1;
  const sit = isDone ? null : t.cases[stage as Season];
  const tempInfo = isDone ? null : TEMP[stage as Season];

  function tap(o: Outfit) {
    if (feedback) return;
    setPicked(o);
    const ok = o === CORRECT[stage as Season];
    answers.current[`outfit-${stage}`] = { picked: o, correct: ok };
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
    <div className="seasonal-app seasonal-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : (
    <div className={`seasonal-app seasonal-app--${stage}`}>
      <div className="seasonal-weather">
        <div className="seasonal-weather-art" aria-hidden="true">
          <WeatherIcon kind={stage as Season} />
        </div>
        <div className="seasonal-weather-temp">{tempInfo?.value}</div>
        <div className="seasonal-weather-cond">{tempInfo?.condition}</div>
      </div>

      <div className="seasonal-grid">
        {OUTFIT_OPTIONS.map((o) => (
          <button
            key={o}
            type="button"
            className={`seasonal-card${picked === o ? " seasonal-card--picked" : ""}`}
            onClick={() => tap(o)}
            disabled={Boolean(feedback)}
          >
            <SeasonalOutfit kind={o} />
            <small>{t.outfits[o].name}</small>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="morning-quest-trainer seasonal-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark seasonal-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 13 H21 M6 17 H18 M9 21 H15" />
              <circle cx="7" cy="8" r="3" fill="currentColor" />
              <path d="M11 9 Q15 6 19 9 L19 11 H13" fill="currentColor" />
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
          <div className={`mq-phone mq-phone--seasonal-${stage}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">17:0{Math.min(step, 9)}</span>
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
            <p className="mq-panel-task-text">{sit ? sit.context : t.doneHint}</p>
          </div>

          {sit && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{sit.question}</h3>
            </div>
          ) : null}

          {feedback && sit ? (
            <div className={`outfit-feedback outfit-feedback--${feedback}`}>
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{feedback === "good" ? sit.feedbackGood : sit.feedbackSoft}</p>
              <div className="outfit-feedback-actions">
                {feedback === "good" ? (
                  <button type="button" className="mq-panel-primary" onClick={advance}>{stage === "cold" ? t.finish : t.next}</button>
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

function WeatherIcon({ kind }: { kind: Season }) {
  const art = kind === "hot" ? "weather-hot-realistic" : kind === "cool" ? "weather-rain-realistic" : "weather-cold-realistic";
  return <LessonItemArt id={art} size={116} className="seasonal-weather-image" />;
}

function SeasonalOutfit({ kind }: { kind: Outfit }) {
  if (kind === "tshirt") return <LessonItemArt id="weather-hot-realistic" size={76} />;
  if (kind === "sweater") return <LessonItemArt id="seasonal-sweater-realistic" size={76} />;
  if (kind === "jacket") return <LessonItemArt id="seasonal-rain-jacket-realistic" size={76} />;
  return <LessonItemArt id="weather-cold-realistic" size={76} />;
}
