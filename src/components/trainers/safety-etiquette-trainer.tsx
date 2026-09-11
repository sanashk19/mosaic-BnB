"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { SafetyEtiquetteTrainer as SafetyEtiquetteTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: SafetyEtiquetteTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Verdict = "safe" | "danger";
type SituationKey = "share-password" | "friend-game" | "unknown-link" | "share-photo" | "stranger-adress" | "help-elder";

type Situation = {
  key: SituationKey;
  text: string;
  icon: LessonItemArtId;
  correct: Verdict;
  feedbackGood: string;
  feedbackSoft: string;
};

const SITUATIONS: Situation[] = [
  {
    key: "share-password",
    text: "Друг просит сказать ему пароль от твоего аккаунта.",
    icon: "password-key",
    correct: "danger",
    feedbackGood: "Верно. Пароль — только твой. Никому не давай.",
    feedbackSoft: "Это опасно. Пароль нельзя давать никому, даже другу.",
  },
  {
    key: "friend-game",
    text: "Друг с класса зовёт играть после школы.",
    icon: "game-controller",
    correct: "safe",
    feedbackGood: "Верно. Это твой друг — играть можно.",
    feedbackSoft: "Это безопасно. Это известный тебе друг.",
  },
  {
    key: "unknown-link",
    text: "Пришла ссылка от незнакомца: «Открой, узнаешь что-то».",
    icon: "suspicious-link",
    correct: "danger",
    feedbackGood: "Верно. Чужие ссылки — не открывай.",
    feedbackSoft: "Это опасно. Незнакомые ссылки могут заразить телефон.",
  },
  {
    key: "share-photo",
    text: "В чате просят прислать домашнее фото для конкурса.",
    icon: "photo-card",
    correct: "danger",
    feedbackGood: "Верно. Лучше не присылать — фото может уйти куда не нужно.",
    feedbackSoft: "Это опасно. Не присылай личные фото незнакомым.",
  },
  {
    key: "help-elder",
    text: "Бабушка просит помочь ей войти в её почту.",
    icon: "elder-helper",
    correct: "safe",
    feedbackGood: "Верно. Помогать близким — это правильно.",
    feedbackSoft: "Это безопасно. Помогать бабушке — нормально.",
  },
];

type Locales<T> = Record<Locale, T>;
const dict: Locales<{
  appTitle: string;
  stepCounter: (n: number, total: number) => string;
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
  hintGeneral: string;
  question: string;
  safe: string;
  danger: string;
  safeSub: string;
  dangerSub: string;
}> = {
  ru: {
    appTitle: "Безопасно или опасно",
    stepCounter: (n, total) => `Карточка ${n} из ${total}`,
    taskEyebrow: "Ситуация",
    questionEyebrow: "Решение",
    hintEyebrow: "Подсказка",
    feedbackEyebrow: "Проверка",
    skip: "Не знаю",
    finish: "Закончить",
    retry: "Попробовать снова",
    next: "Следующая ситуация",
    doneTitle: "Молодец! Ты различаешь безопасные и опасные ситуации.",
    doneHint: "Помни: пароли — никому; ссылки от незнакомцев — не открывать; личные фото — не пересылать.",
    hintGeneral: "Подумай, кто это: близкий человек или незнакомец. Что он от тебя хочет?",
    question: "Это безопасно или опасно?",
    safe: "Безопасно",
    danger: "Опасно",
    safeSub: "можно делать",
    dangerSub: "так делать нельзя",
  },
  uz: {
    appTitle: "Xavfsiz yoki xavfli",
    stepCounter: (n, total) => `${n} / ${total}-karta`,
    taskEyebrow: "Vaziyat",
    questionEyebrow: "Qaror",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    next: "Keyingi vaziyat",
    doneTitle: "Yashasin! Sen xavfli va xavfsiz vaziyatlarni farqlay olasan.",
    doneHint: "Parol — hech kimga; notanishdan ssylka — ochmaslik; shaxsiy rasm — yubormaslik.",
    hintGeneral: "Bu kim — yaqin yoki notanish? Nima soʻrayapti?",
    question: "Bu xavfsizmi yoki xavflimi?",
    safe: "Xavfsiz",
    danger: "Xavfli",
    safeSub: "qilsa boʻladi",
    dangerSub: "qilib boʻlmaydi",
  },
};

export function SafetyEtiquetteTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<Verdict | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = idx >= SITUATIONS.length;
  const total = SITUATIONS.length;
  const s = !isDone ? SITUATIONS[idx] : null;

  function tap(v: Verdict) {
    if (feedback || !s) return;
    setPicked(v);
    const ok = v === s.correct;
    answers.current[`safety-${s.key}`] = { picked: v, correct: ok };
    setFeedback(ok ? "good" : "soft");
  }

  function advance() {
    setIdx((i) => i + 1);
    setPicked(null);
    setFeedback(null);
  }
  function retry() { setFeedback(null); setPicked(null); }
  function skip() { if (s) answers.current[`skip-${s.key}`] = true; advance(); }
  function finish() { onDone({ correct: true }); }

  void trainer;

  const scene: ReactNode = isDone ? (
    <div className="safety-app safety-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : s ? (
    <div className={`safety-app${picked ? ` safety-app--${picked}` : ""}`}>
      <div className="safety-card">
        <div className="safety-card-icon" aria-hidden="true">
          <LessonItemArt id={s.icon} size={82} />
        </div>
        <p className="safety-card-text">{s.text}</p>
      </div>
      <div className="safety-marks">
        <span className="safety-mark safety-mark--safe">✓ Безопасно</span>
        <span className="safety-mark safety-mark--danger">✕ Опасно</span>
      </div>
    </div>
  ) : null;

  return (
    <div className="morning-quest-trainer safety-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark safety-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3 L20 6 V13 Q20 19 12 22 Q4 19 4 13 V6 Z" />
              <path d="M9 12 L11 14 L15 10" />
            </svg>
          </span>
          <div>
            <strong>{t.appTitle}</strong>
            <small>{t.stepCounter(Math.min(idx + 1, total), total)}</small>
          </div>
        </div>
        <div className="mq-topbar-progress" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} className={`mq-topbar-dot${idx > i || isDone ? " mq-topbar-dot--done" : ""}${idx === i && !isDone ? " mq-topbar-dot--current" : ""}`} />
          ))}
        </div>
      </header>

      <div className="mq-shell">
        <div className="mq-phone-col">
          <div className={`mq-phone mq-phone--safety${isDone ? "-done" : ""}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">14:0{Math.min(idx + 1, 9)}</span>
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
            <p className="mq-panel-task-text">{s ? s.text : t.doneHint}</p>
          </div>

          {s && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{t.question}</h3>
              <div className="mq-panel-options safety-options">
                <button type="button" className={`mq-panel-option safety-option-safe${picked === "safe" ? " mq-panel-option--picked" : ""}`} onClick={() => tap("safe")}>
                  <span className="mq-panel-option-num">✓</span>
                  <span className="mq-panel-option-body">
                    <strong>{t.safe}</strong>
                    <small>{t.safeSub}</small>
                  </span>
                </button>
                <button type="button" className={`mq-panel-option safety-option-danger${picked === "danger" ? " mq-panel-option--picked" : ""}`} onClick={() => tap("danger")}>
                  <span className="mq-panel-option-num">✕</span>
                  <span className="mq-panel-option-body">
                    <strong>{t.danger}</strong>
                    <small>{t.dangerSub}</small>
                  </span>
                </button>
              </div>
            </div>
          ) : null}

          {feedback && s ? (
            <div className={`outfit-feedback outfit-feedback--${feedback}`}>
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{feedback === "good" ? s.feedbackGood : s.feedbackSoft}</p>
              <div className="outfit-feedback-actions">
                {feedback === "good" ? (
                  <button type="button" className="mq-panel-primary" onClick={advance}>{idx + 1 >= total ? t.finish : t.next}</button>
                ) : (
                  <button type="button" className="mq-panel-primary outfit-retry" onClick={retry}>{t.retry}</button>
                )}
              </div>
            </div>
          ) : s ? (
            <div className="mq-panel-hint">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>{t.hintGeneral}</p>
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
