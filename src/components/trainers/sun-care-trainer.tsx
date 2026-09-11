"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { SunCareTrainer as SunCareTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: SunCareTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Weather = "hot-noon" | "cloudy" | "evening";
type Action = "panama-spf" | "no-protection" | "stay-home" | "light-walk";
type Stage = Weather | "done";

const FLOW: Stage[] = ["hot-noon", "cloudy", "evening", "done"];
const STEPS = 3;

const CORRECT: Record<Weather, Action> = {
  "hot-noon": "panama-spf",
  cloudy: "light-walk",
  evening: "light-walk",
};

const ACTIONS_PER_STAGE: Record<Weather, Action[]> = {
  "hot-noon": ["panama-spf", "no-protection", "stay-home"],
  cloudy: ["panama-spf", "light-walk", "stay-home"],
  evening: ["panama-spf", "light-walk", "stay-home"],
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
  next: string;
  finish: string;
  retry: string;
  doneTitle: string;
  doneHint: string;
  actions: Record<Action, { name: string; sub: string }>;
  cases: Record<Weather, {
    label: string;
    temp: string;
    condition: string;
    uv: string;
    uvLevel: string;
    description: string;
    question: string;
    hint: string;
    feedbackGood: string;
    feedbackSoft: string;
  }>;
}> = {
  ru: {
    appTitle: "Прогноз и защита",
    stepCounter: (n) => `Прогноз ${n} из ${STEPS}`,
    taskEyebrow: "Погода",
    questionEyebrow: "Что сделать",
    hintEyebrow: "Подсказка",
    feedbackEyebrow: "Проверка",
    skip: "Не знаю",
    next: "Следующий прогноз",
    finish: "Закончить",
    retry: "Попробовать снова",
    doneTitle: "Молодец! Ты защитил кожу.",
    doneHint: "Ты научился читать прогноз и выбирать защиту.",
    actions: {
      "panama-spf": { name: "Панама + крем SPF", sub: "защита от солнца" },
      "no-protection": { name: "Без защиты", sub: "идти как есть" },
      "stay-home": { name: "Остаться дома", sub: "переждать жару" },
      "light-walk": { name: "Лёгкая прогулка", sub: "без сильной защиты" },
    },
    cases: {
      "hot-noon": {
        label: "Полдень",
        temp: "+35°",
        condition: "Ясно, очень жарко",
        uv: "UV 9",
        uvLevel: "высокий",
        description: "Сейчас полдень. На улице +35°, ясно. Индекс UV — 9, это много.",
        question: "Что нужно сделать, если идёшь на улицу?",
        hint: "При жарком солнце нужны панама и крем SPF.",
        feedbackGood: "Верно. SPF + панама — защитят кожу от ожога.",
        feedbackSoft: "При UV 9 без защиты — обгоришь. Надо панаму и SPF.",
      },
      cloudy: {
        label: "Облачно",
        temp: "+22°",
        condition: "Облачно, ветер",
        uv: "UV 3",
        uvLevel: "умеренный",
        description: "Облачно, +22°. Индекс UV — 3, это немного. Солнца почти нет.",
        question: "Что выберешь?",
        hint: "При облачной погоде можно гулять без сильной защиты.",
        feedbackGood: "Верно. Облачно — лёгкая прогулка без SPF.",
        feedbackSoft: "Это лишнее. Сегодня солнца мало — можно лёгкую прогулку.",
      },
      evening: {
        label: "Вечер",
        temp: "+24°",
        condition: "Прохладно, закат",
        uv: "UV 1",
        uvLevel: "низкий",
        description: "Вечер, +24°, солнце садится. UV — 1. Опасности почти нет.",
        question: "Что выберешь?",
        hint: "Вечером UV низкий — можно гулять без особой защиты.",
        feedbackGood: "Верно. Вечером можно гулять спокойно.",
        feedbackSoft: "Вечером SPF не нужен — солнце слабое.",
      },
    },
  },
  uz: {
    appTitle: "Ob-havo va himoya",
    stepCounter: (n) => `${n} / ${STEPS}-prognoz`,
    taskEyebrow: "Ob-havo",
    questionEyebrow: "Nima qilish",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    next: "Keyingi prognoz",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    doneTitle: "Yashasin! Sen terini himoya qilding.",
    doneHint: "Sen prognozni oʻqib, himoya tanlashni oʻrganding.",
    actions: {
      "panama-spf": { name: "Panama + SPF krem", sub: "quyoshdan himoya" },
      "no-protection": { name: "Himoyasiz", sub: "shu holda chiqish" },
      "stay-home": { name: "Uyda qolish", sub: "issiqni kutib turish" },
      "light-walk": { name: "Yengil sayr", sub: "kuchli himoyasiz" },
    },
    cases: {
      "hot-noon": {
        label: "Tushlik",
        temp: "+35°",
        condition: "Ochiq, juda issiq",
        uv: "UV 9",
        uvLevel: "yuqori",
        description: "Tushlik. +35°, ochiq. UV indeksi — 9, juda yuqori.",
        question: "Koʻchaga chiqsang, nima qilasan?",
        hint: "Quyoshda panama va SPF kerak.",
        feedbackGood: "Toʻgʻri. SPF + panama — kuydirishdan himoya.",
        feedbackSoft: "UV 9 da himoyasiz kuyasan. Panama va SPF kerak.",
      },
      cloudy: {
        label: "Bulutli",
        temp: "+22°",
        condition: "Bulutli, shamol",
        uv: "UV 3",
        uvLevel: "oʻrtacha",
        description: "Bulutli, +22°. UV indeksi — 3. Quyosh kam.",
        question: "Nima tanlaysan?",
        hint: "Bulutli kunda kuchli himoya kerak emas.",
        feedbackGood: "Toʻgʻri. Bulutli — yengil sayr.",
        feedbackSoft: "Bu ortiqcha. Bugun yengil sayr boʻladi.",
      },
      evening: {
        label: "Kechqurun",
        temp: "+24°",
        condition: "Salqin, quyosh botmoqda",
        uv: "UV 1",
        uvLevel: "past",
        description: "Kech, +24°, quyosh botmoqda. UV — 1. Xavf kam.",
        question: "Nima tanlaysan?",
        hint: "Kechqurun UV past — yengil sayr mumkin.",
        feedbackGood: "Toʻgʻri. Kechqurun bemalol yurish mumkin.",
        feedbackSoft: "Kechqurun SPF kerak emas — quyosh kuchsiz.",
      },
    },
  },
};

export function SunCareTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [stage, setStage] = useState<Stage>("hot-noon");
  const [picked, setPicked] = useState<Action | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stage === "done";
  const step = isDone ? STEPS : FLOW.indexOf(stage) + 1;
  const sit = isDone ? null : t.cases[stage as Weather];
  const actions = isDone ? [] : ACTIONS_PER_STAGE[stage as Weather];

  function tap(action: Action) {
    if (feedback) return;
    setPicked(action);
    const ok = action === CORRECT[stage as Weather];
    answers.current[`sun-${stage}`] = { picked: action, correct: ok };
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
      <div className="sun-app sun-app--done">
        <div className="outfit-done-tick" aria-hidden="true">
          <CabinetIcon name="check" />
        </div>
        <strong>{t.doneTitle}</strong>
        <p>{t.doneHint}</p>
      </div>
    );
  } else if (sit) {
    scene = (
      <div className={`sun-app sun-app--${stage}`}>
        <div className="sun-card">
          <div className="sun-card-head">
            <strong>{sit.label}</strong>
            <small>{sit.condition}</small>
          </div>
          <div className="sun-card-art">
            <WeatherArt kind={stage as Weather} />
          </div>
          <div className="sun-card-temp">{sit.temp}</div>
          <div className="sun-card-uv">
            <span className={`sun-uv-badge sun-uv-badge--${stage}`}>{sit.uv}</span>
            <small>{sit.uvLevel}</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="morning-quest-trainer sun-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark sun-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <path d="M12 2 V5 M12 19 V22 M2 12 H5 M19 12 H22 M5 5 L7 7 M17 17 L19 19 M5 19 L7 17 M17 7 L19 5" />
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
          <div className={`mq-phone mq-phone--sun-${stage}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">12:0{Math.min(step, 9)}</span>
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
                {actions.map((a, i) => (
                  <button
                    key={a}
                    type="button"
                    className={`mq-panel-option${picked === a ? " mq-panel-option--picked" : ""}`}
                    onClick={() => tap(a)}
                  >
                    <span className="mq-panel-option-num">{i + 1}</span>
                    <span className="mq-panel-option-body">
                      <strong>{t.actions[a].name}</strong>
                      <small>{t.actions[a].sub}</small>
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
                    {stage === "evening" ? t.finish : t.next}
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

// ── Weather SVG art ──
function WeatherArt({ kind }: { kind: Weather }) {
  const art: Record<Weather, LessonItemArtId> = {
    "hot-noon": "weather-hot-realistic",
    cloudy: "weather-cloudy-realistic",
    evening: "weather-evening-realistic",
  };

  return <LessonItemArt id={art[kind]} size={156} className="sun-weather-art-image" />;
}
