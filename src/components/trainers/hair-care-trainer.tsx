"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { HairCareTrainer as HairCareTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: HairCareTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type HairKind = "oily" | "dry" | "normal";
type ShampooKey = "for-oily" | "for-dry" | "for-normal" | "kids";
type Stage = HairKind | "done";

const FLOW: Stage[] = ["oily", "dry", "normal", "done"];
const STEPS = 3;

const CORRECT: Record<HairKind, ShampooKey> = {
  oily: "for-oily",
  dry: "for-dry",
  normal: "for-normal",
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
  shampoos: Record<ShampooKey, { name: string; sub: string }>;
  cases: Record<HairKind, { customer: string; description: string; question: string; hint: string; feedbackGood: string; feedbackSoft: string }>;
}> = {
  ru: {
    appTitle: "Полка для волос",
    stepCounter: (n) => `Клиент ${n} из ${STEPS}`,
    taskEyebrow: "Клиент",
    questionEyebrow: "Какой шампунь",
    hintEyebrow: "Подсказка",
    feedbackEyebrow: "Проверка",
    skip: "Не знаю",
    next: "Следующий клиент",
    finish: "Закончить",
    retry: "Попробовать снова",
    doneTitle: "Молодец! Все клиенты довольны.",
    doneHint: "Ты научился подбирать шампунь по типу волос.",
    shampoos: {
      "for-oily": { name: "Для жирных", sub: "глубокое очищение" },
      "for-dry": { name: "Для сухих", sub: "с маслом и увлажнением" },
      "for-normal": { name: "Обычный", sub: "для нормальных волос" },
      "kids": { name: "Детский", sub: "для малышей до 3 лет" },
    },
    cases: {
      oily: {
        customer: "Алиша",
        description: "У Алиши волосы быстро становятся жирными — уже к вечеру блестят.",
        question: "Какой шампунь нужен Алише?",
        hint: "Жирные волосы — нужен шампунь «Для жирных» с глубоким очищением.",
        feedbackGood: "Верно. «Для жирных» — глубоко очищает.",
        feedbackSoft: "Этот шампунь не подойдёт. Алише нужен «Для жирных».",
      },
      dry: {
        customer: "Зебо",
        description: "У Зебо волосы сухие и пушатся, на концах посечённые.",
        question: "Какой шампунь нужен Зебо?",
        hint: "Сухие волосы — нужен шампунь «Для сухих» с маслом и увлажнением.",
        feedbackGood: "Верно. «Для сухих» — с увлажнением.",
        feedbackSoft: "Этот шампунь сделает волосы ещё суше. Возьми «Для сухих».",
      },
      normal: {
        customer: "Тимур",
        description: "У Тимура обычные здоровые волосы — не жирные и не сухие.",
        question: "Какой шампунь нужен Тимуру?",
        hint: "Нормальные волосы — обычный шампунь «Для нормальных волос».",
        feedbackGood: "Верно. Обычный шампунь для нормальных волос.",
        feedbackSoft: "Этот шампунь слишком сильный. Возьми обычный.",
      },
    },
  },
  uz: {
    appTitle: "Soch parvarishi",
    stepCounter: (n) => `${n} / ${STEPS}-mijoz`,
    taskEyebrow: "Mijoz",
    questionEyebrow: "Qaysi shampun",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    next: "Keyingi mijoz",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    doneTitle: "Yashasin! Mijozlar mamnun.",
    doneHint: "Sen sochning turiga qarab shampun tanlashni oʻrganding.",
    shampoos: {
      "for-oily": { name: "Yogʻli uchun", sub: "chuqur tozalash" },
      "for-dry": { name: "Quruq uchun", sub: "yogʻ va namlik" },
      "for-normal": { name: "Oddiy", sub: "normal sochlar uchun" },
      "kids": { name: "Bolalar uchun", sub: "3 yoshgacha" },
    },
    cases: {
      oily: {
        customer: "Alisha",
        description: "Alishaning sochi tez yogʻlanadi — kechgacha porlay boshlaydi.",
        question: "Alishaga qaysi shampun kerak?",
        hint: "Yogʻli soch — «Yogʻli uchun» shampun kerak.",
        feedbackGood: "Toʻgʻri. «Yogʻli uchun» — chuqur tozalaydi.",
        feedbackSoft: "Bu mos emas. Alishaga «Yogʻli uchun» kerak.",
      },
      dry: {
        customer: "Zebo",
        description: "Zebo sochi quruq va tarqoq, uchlari kesilgan.",
        question: "Zeboga qaysi shampun kerak?",
        hint: "Quruq soch — «Quruq uchun» shampun namlik bilan.",
        feedbackGood: "Toʻgʻri. «Quruq uchun» — namlik beradi.",
        feedbackSoft: "Bu sochni yana qurutadi. «Quruq uchun» kerak.",
      },
      normal: {
        customer: "Timur",
        description: "Timurning sochi oddiy — yogʻli ham, quruq ham emas.",
        question: "Timurga qaysi shampun kerak?",
        hint: "Normal soch — oddiy shampun.",
        feedbackGood: "Toʻgʻri. Oddiy shampun.",
        feedbackSoft: "Bu kuchli. Oddiy shampunni ol.",
      },
    },
  },
};

const SHAMPOO_ORDER: ShampooKey[] = ["for-oily", "for-dry", "for-normal", "kids"];

export function HairCareTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [stage, setStage] = useState<Stage>("oily");
  const [picked, setPicked] = useState<ShampooKey | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stage === "done";
  const step = isDone ? STEPS : FLOW.indexOf(stage) + 1;
  const sit = isDone ? null : t.cases[stage as HairKind];
  const correctKey = isDone ? null : CORRECT[stage as HairKind];

  function tap(key: ShampooKey) {
    if (feedback) return;
    setPicked(key);
    const ok = key === correctKey;
    answers.current[`shampoo-${stage}`] = { picked: key, correct: ok };
    setFeedback(ok ? "good" : "soft");
  }

  function advance() {
    const i = FLOW.indexOf(stage);
    setStage(FLOW[Math.min(i + 1, FLOW.length - 1)]);
    setPicked(null);
    setFeedback(null);
  }

  function retry() {
    setFeedback(null);
    setPicked(null);
  }

  function skip() {
    answers.current[`skip-${stage}`] = true;
    advance();
  }

  function finish() {
    onDone({ correct: true });
  }

  void trainer;

  let scene: ReactNode;
  if (isDone) {
    scene = (
      <div className="hair-app hair-app--done">
        <div className="outfit-done-tick" aria-hidden="true">
          <CabinetIcon name="check" />
        </div>
        <strong>{t.doneTitle}</strong>
        <p>{t.doneHint}</p>
      </div>
    );
  } else if (sit) {
    scene = (
      <div className={`hair-app hair-app--${stage}`}>
        <div className="hair-customer">
          <CustomerAvatar kind={stage as HairKind} />
          <div>
            <strong>{sit.customer}</strong>
            <small>
              {stage === "oily" ? "Жирные волосы" : stage === "dry" ? "Сухие волосы" : "Нормальные волосы"}
            </small>
          </div>
        </div>

        <div className="hair-shelf">
          <div className="hair-shelf-board" aria-hidden="true" />
          <div className="hair-shelf-row">
            {SHAMPOO_ORDER.map((key) => (
              <button
                key={key}
                type="button"
                className={`hair-bottle${picked === key ? " hair-bottle--picked" : ""}`}
                onClick={() => tap(key)}
                disabled={Boolean(feedback)}
                aria-label={t.shampoos[key].name}
              >
                <ShampooBottle kind={key} />
                <span className="hair-bottle-name">{t.shampoos[key].name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="morning-quest-trainer hair-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark hair-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12 Q5 4 12 4 Q19 4 19 12 L19 16 Q12 13 5 16 Z" />
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
          <div className={`mq-phone mq-phone--hair-${stage}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">10:0{Math.min(step, 9)}</span>
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
          {sit ? (
            <div className="mq-panel-task">
              <span className="mq-eyebrow">{t.taskEyebrow}</span>
              <p className="mq-panel-task-text">{sit.description}</p>
            </div>
          ) : (
            <div className="mq-panel-task">
              <span className="mq-eyebrow">{t.taskEyebrow}</span>
              <p className="mq-panel-task-text">{t.doneHint}</p>
            </div>
          )}

          {sit && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{sit.question}</h3>
              <p className="outfit-pick-summary">
                {picked ? (
                  <>
                    Выбран: <strong>{t.shampoos[picked].name}</strong>
                    <br />
                    <small>{t.shampoos[picked].sub}</small>
                  </>
                ) : (
                  <>Нажми на бутылочку с шампунем на полке.</>
                )}
              </p>
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
              <button type="button" className="mq-panel-skip" onClick={skip}>
                {t.skip}
              </button>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}

function CustomerAvatar({ kind }: { kind: HairKind }) {
  const art: Record<HairKind, LessonItemArtId> = {
    oily: "hair-oily-realistic",
    dry: "hair-dry-realistic",
    normal: "hair-normal-realistic",
  };

  return <LessonItemArt id={art[kind]} size={84} className="hair-customer-art" />;
}

function ShampooBottle({ kind }: { kind: ShampooKey }) {
  const art: Record<ShampooKey, LessonItemArtId> = {
    "for-oily": "shampoo-oily-realistic",
    "for-dry": "shampoo-dry-realistic",
    "for-normal": "shampoo-normal-realistic",
    kids: "shampoo-kids-realistic",
  };

  return (
    <span className={`hair-bottle-art hair-bottle-art--${kind}`} aria-hidden="true">
      <LessonItemArt id={art[kind]} size={92} />
    </span>
  );
}
