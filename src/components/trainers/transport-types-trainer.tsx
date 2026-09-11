"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { TransportTypesTrainer as TransportTypesTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: TransportTypesTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Trip = "near" | "city" | "country";
type Stage = Trip | "done";
type Transport = "walk" | "bus" | "train" | "plane" | "taxi";

const FLOW: Stage[] = ["near", "city", "country", "done"];
const STEPS = 3;

const CORRECT: Record<Trip, Transport> = {
  near: "walk",
  city: "bus",
  country: "plane",
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
  retry: string;
  next: string;
  doneTitle: string;
  doneHint: string;
  transports: Record<Transport, { name: string; sub: string }>;
  cases: Record<Trip, { context: string; question: string; hint: string; feedbackGood: string; feedbackSoft: string; distance: string }>;
}> = {
  ru: {
    appTitle: "Виды транспорта",
    stepCounter: (n) => `Поездка ${n} из ${STEPS}`,
    taskEyebrow: "Куда едем",
    questionEyebrow: "Какой транспорт подойдёт",
    hintEyebrow: "Подсказка",
    feedbackEyebrow: "Проверка",
    skip: "Не знаю",
    finish: "Закончить",
    retry: "Попробовать снова",
    next: "Следующая поездка",
    doneTitle: "Молодец! Ты подобрал транспорт к каждой поездке.",
    doneHint: "Близко — пешком; в городе — автобус; далеко — поезд или самолёт.",
    transports: {
      walk: { name: "Пешком", sub: "ничего не стоит, полезно" },
      bus: { name: "Автобус", sub: "по городу, недорого" },
      train: { name: "Поезд", sub: "между городами" },
      plane: { name: "Самолёт", sub: "очень далеко, быстро" },
      taxi: { name: "Такси", sub: "быстро, но дорого" },
    },
    cases: {
      near: {
        context: "Магазин в соседнем доме, до него 200 метров.",
        question: "Как добраться до магазина рядом?",
        hint: "Если очень близко — лучше пешком, не нужно платить.",
        feedbackGood: "Верно. До магазина рядом — пешком быстрее и полезнее.",
        feedbackSoft: "Это слишком для 200 метров. Достаточно пешком.",
        distance: "200 м",
      },
      city: {
        context: "Поликлиника в другом районе города, 5 км.",
        question: "Как доехать до поликлиники в городе?",
        hint: "По городу удобно автобусом или маршруткой — есть остановка.",
        feedbackGood: "Верно. По городу — автобус или маршрутка.",
        feedbackSoft: "Это не лучший вариант для города. Лучше автобус.",
        distance: "5 км",
      },
      country: {
        context: "Бабушка живёт в Москве, 3000 км от Ташкента.",
        question: "Как доехать до бабушки в Москве?",
        hint: "За 3000 км пешком и на автобусе долго. Лучше самолёт — за 4 часа.",
        feedbackGood: "Верно. На большие расстояния — самолёт.",
        feedbackSoft: "Так очень долго. До Москвы лучше самолётом.",
        distance: "3000 км",
      },
    },
  },
  uz: {
    appTitle: "Transport turlari",
    stepCounter: (n) => `${n} / ${STEPS}-safar`,
    taskEyebrow: "Qayerga",
    questionEyebrow: "Qaysi transport mos",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    next: "Keyingi safar",
    doneTitle: "Yashasin! Sen har safar uchun transportni tanlading.",
    doneHint: "Yaqin — piyoda; shahar ichida — avtobus; uzoq — poezd yoki samolyot.",
    transports: {
      walk: { name: "Piyoda", sub: "tekin, foydali" },
      bus: { name: "Avtobus", sub: "shahar boʻylab" },
      train: { name: "Poezd", sub: "shaharlar oraligʻida" },
      plane: { name: "Samolyot", sub: "juda uzoq" },
      taxi: { name: "Taksi", sub: "tez, lekin qimmat" },
    },
    cases: {
      near: {
        context: "Doʻkon qoʻshni uyda, 200 metr.",
        question: "Qoʻshni doʻkonga qanday borasan?",
        hint: "Juda yaqin boʻlsa — piyoda.",
        feedbackGood: "Toʻgʻri. 200 metrga piyoda.",
        feedbackSoft: "Bu 200 metr uchun koʻp. Piyoda yetarli.",
        distance: "200 m",
      },
      city: {
        context: "Poliklinika boshqa tumanda, 5 km.",
        question: "Poliklinikaga qanday borasan?",
        hint: "Shahar ichida avtobus qulay.",
        feedbackGood: "Toʻgʻri. Shahar ichida — avtobus.",
        feedbackSoft: "Bu shahar uchun mos emas. Avtobus yaxshiroq.",
        distance: "5 km",
      },
      country: {
        context: "Buvi Moskvada yashaydi, 3000 km.",
        question: "Buvinikiga qanday borasan?",
        hint: "3000 km uchun samolyot tez.",
        feedbackGood: "Toʻgʻri. Uzoqqa — samolyot.",
        feedbackSoft: "Bu juda uzoq vaqt. Samolyot yaxshiroq.",
        distance: "3000 km",
      },
    },
  },
};

const OPTIONS: Transport[] = ["walk", "bus", "train", "plane"];

const TRANSPORT_ART: Record<Transport, LessonItemArtId> = {
  walk: "walking-shoes",
  bus: "bus",
  train: "train",
  plane: "airplane",
  taxi: "taxi",
};

const DESTINATION_ART: Record<Trip, LessonItemArtId> = {
  near: "destination-home-realistic",
  city: "destination-clinic-realistic",
  country: "destination-airport-realistic",
};

export function TransportTypesTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [stage, setStage] = useState<Stage>("near");
  const [picked, setPicked] = useState<Transport | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stage === "done";
  const step = isDone ? STEPS : FLOW.indexOf(stage) + 1;
  const c = isDone ? null : t.cases[stage as Trip];

  function tap(tr: Transport) {
    if (feedback) return;
    setPicked(tr);
    const ok = tr === CORRECT[stage as Trip];
    answers.current[`transport-${stage}`] = { picked: tr, correct: ok };
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
    <div className="transport-app transport-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : c ? (
    <div className={`transport-app transport-app--${stage}`}>
      <div className="transport-map">
        <div className="transport-pin transport-pin--from" aria-hidden="true">
          <CabinetIcon name="home" />
          <small>дом</small>
        </div>
        <div className="transport-route" aria-hidden="true">
          <span>{c.distance}</span>
        </div>
        <div className="transport-pin transport-pin--to" aria-hidden="true">
          <LessonItemArt id={DESTINATION_ART[stage as Trip]} size={50} className="transport-destination-art" />
        </div>
      </div>

      <div className="transport-grid">
        {OPTIONS.map((tr) => (
          <button
            key={tr}
            type="button"
            className={`transport-card${picked === tr ? " transport-card--picked" : ""}`}
            onClick={() => tap(tr)}
            disabled={Boolean(feedback)}
          >
            <TransportIcon kind={tr} />
            <small>{t.transports[tr].name}</small>
          </button>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <div className="morning-quest-trainer transport-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark transport-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="8" width="16" height="10" rx="2" />
              <circle cx="8" cy="20" r="2" />
              <circle cx="16" cy="20" r="2" />
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
          <div className={`mq-phone mq-phone--transport-${stage}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">22:0{Math.min(step, 9)}</span>
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
            <p className="mq-panel-task-text">{c ? c.context : t.doneHint}</p>
          </div>

          {c && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{c.question}</h3>
              <p className="outfit-pick-summary">Расстояние: <strong>{c.distance}</strong></p>
            </div>
          ) : null}

          {feedback && c ? (
            <div className={`outfit-feedback outfit-feedback--${feedback}`}>
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{feedback === "good" ? c.feedbackGood : c.feedbackSoft}</p>
              <div className="outfit-feedback-actions">
                {feedback === "good" ? (
                  <button type="button" className="mq-panel-primary" onClick={advance}>{stage === "country" ? t.finish : t.next}</button>
                ) : (
                  <button type="button" className="mq-panel-primary outfit-retry" onClick={retry}>{t.retry}</button>
                )}
              </div>
            </div>
          ) : c ? (
            <div className="mq-panel-hint">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>{c.hint}</p>
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

function TransportIcon({ kind }: { kind: Transport }) {
  return (
    <LessonItemArt
      id={TRANSPORT_ART[kind]}
      size={58}
      className="transport-card-art"
    />
  );
}
