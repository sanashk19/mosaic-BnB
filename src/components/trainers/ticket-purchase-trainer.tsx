"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { TicketPurchaseTrainer as TicketPurchaseTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: TicketPurchaseTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type StepKey = "route" | "date" | "seat" | "pay" | "done";
const FLOW: StepKey[] = ["route", "date", "seat", "pay", "done"];
const STEPS = 4;

const ROUTE_OPTIONS = [
  { id: "samarkand", name: "Самарканд", price: "120 000", correct: true },
  { id: "bukhara", name: "Бухара", price: "180 000", correct: false },
  { id: "tashkent", name: "Ташкент", price: "—", correct: false },
];

const DATE_OPTIONS = [
  { id: "today", name: "Сегодня", sub: "не подходит" },
  { id: "tomorrow", name: "Завтра", sub: "нужная дата", correct: true },
  { id: "weekend", name: "Выходной", sub: "позже" },
];

const SEAT_OPTIONS = [
  { id: "12", row: "Вагон 4 · Место 12", correct: true },
  { id: "8", row: "Вагон 4 · Место 8" },
  { id: "23", row: "Вагон 7 · Место 23" },
  { id: "45", row: "Вагон 9 · Место 45" },
];

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
  pay: string;
  doneTitle: string;
  doneHint: string;
  fields: { from: string; to: string; date: string; seat: string };
  questions: Record<Exclude<StepKey, "done">, string>;
  hints: Record<Exclude<StepKey, "done">, string>;
  feedbackGood: string;
  feedbackSoft: string;
  context: string;
}> = {
  ru: {
    appTitle: "Билет онлайн",
    stepCounter: (n) => `Шаг ${n} из ${STEPS}`,
    taskEyebrow: "Заказ",
    questionEyebrow: "Выбери",
    hintEyebrow: "Подсказка",
    feedbackEyebrow: "Проверка",
    skip: "Не знаю",
    finish: "Закончить",
    retry: "Попробовать снова",
    pay: "Оплатить",
    doneTitle: "Молодец! Билет в Самарканд на завтра куплен.",
    doneHint: "Так покупают билет онлайн: маршрут → дата → место → оплата.",
    fields: { from: "Из", to: "Куда", date: "Дата", seat: "Место" },
    questions: {
      route: "Куда едем?",
      date: "Когда?",
      seat: "Какое место?",
      pay: "Подтверди и оплати",
    },
    hints: {
      route: "Маршрут — Ташкент → Самарканд.",
      date: "В задании сказано «на завтра» — выбирай «Завтра».",
      seat: "Любое свободное место. Возьми вагон 4 место 12 — у окна.",
      pay: "Проверь данные и нажми «Оплатить».",
    },
    feedbackGood: "Верно! Идём дальше.",
    feedbackSoft: "Это не подходит. Посмотри ещё раз.",
    context: "Нужно купить билет на поезд из Ташкента в Самарканд на завтра.",
  },
  uz: {
    appTitle: "Onlayn chipta",
    stepCounter: (n) => `${n} / ${STEPS}-qadam`,
    taskEyebrow: "Buyurtma",
    questionEyebrow: "Tanla",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    pay: "Toʻlash",
    doneTitle: "Yashasin! Samarqandga chipta olindi.",
    doneHint: "Onlayn chipta shunday: yoʻnalish → sana → joy → toʻlov.",
    fields: { from: "Qayerdan", to: "Qayerga", date: "Sana", seat: "Joy" },
    questions: {
      route: "Qayerga ketamiz?",
      date: "Qachon?",
      seat: "Qaysi joy?",
      pay: "Tasdiqlab toʻla",
    },
    hints: {
      route: "Yoʻnalish — Toshkent → Samarqand.",
      date: "Vazifada «ertaga» deyilgan — «Ertaga» ni tanla.",
      seat: "4-vagon, 12-joy — derazaning yonida.",
      pay: "Maʼlumotlarni tekshir va «Toʻlash» bos.",
    },
    feedbackGood: "Toʻgʻri! Davom etamiz.",
    feedbackSoft: "Bu mos emas. Qaytadan koʻr.",
    context: "Toshkentdan Samarqandga ertangi chipta olish kerak.",
  },
};

export function TicketPurchaseTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [step, setStep] = useState<StepKey>("route");
  const [route, setRoute] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [seat, setSeat] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = step === "done";
  const stepNum = isDone ? STEPS : FLOW.indexOf(step) + 1;

  function chooseRoute(id: string, correct: boolean) {
    if (feedback) return;
    setRoute(id);
    answers.current.route = { id, correct };
    setFeedback(correct ? "good" : "soft");
  }
  function chooseDate(id: string, correct: boolean) {
    if (feedback) return;
    setDate(id);
    answers.current.date = { id, correct };
    setFeedback(correct ? "good" : "soft");
  }
  function chooseSeat(id: string, correct: boolean) {
    if (feedback) return;
    setSeat(id);
    answers.current.seat = { id, correct };
    setFeedback(correct ? "good" : "soft");
  }
  function pay() {
    if (feedback) return;
    answers.current.pay = true;
    setFeedback("good");
  }
  function advance() {
    const i = FLOW.indexOf(step);
    setStep(FLOW[Math.min(i + 1, FLOW.length - 1)]);
    setFeedback(null);
  }
  function retry() {
    setFeedback(null);
    if (step === "route") setRoute(null);
    if (step === "date") setDate(null);
    if (step === "seat") setSeat(null);
  }
  function skip() { answers.current[`skip-${step}`] = true; advance(); }
  function finish() { onDone({ correct: true }); }

  void trainer;

  let body: ReactNode;
  if (isDone) {
    body = (
      <div className="ticket-app ticket-app--done">
        <div className="outfit-done-tick" aria-hidden="true">
          <CabinetIcon name="check" />
        </div>
        <strong>{t.doneTitle}</strong>
        <p>{t.doneHint}</p>
      </div>
    );
  } else {
    body = (
      <div className="ticket-app">
        <div className="ticket-receipt">
          <div className="ticket-receipt-head">
            <span className="ticket-receipt-art" aria-hidden="true">
              <LessonItemArt id="train-ticket" size={56} />
            </span>
            <div>
              <strong>UZ Express</strong>
              <small>Билет</small>
            </div>
          </div>
          <div className="ticket-receipt-row"><span>{t.fields.from}</span><strong>Ташкент</strong></div>
          <div className="ticket-receipt-row"><span>{t.fields.to}</span><strong>{route ? ROUTE_OPTIONS.find((r) => r.id === route)?.name ?? "—" : "—"}</strong></div>
          <div className="ticket-receipt-row"><span>{t.fields.date}</span><strong>{date ? DATE_OPTIONS.find((d) => d.id === date)?.name ?? "—" : "—"}</strong></div>
          <div className="ticket-receipt-row"><span>{t.fields.seat}</span><strong>{seat ? SEAT_OPTIONS.find((s) => s.id === seat)?.row ?? "—" : "—"}</strong></div>
        </div>

        {step === "route" ? (
          <div className="ticket-options">
            {ROUTE_OPTIONS.map((r) => (
              <button key={r.id} type="button" className={`ticket-option${route === r.id ? " ticket-option--picked" : ""}`} onClick={() => chooseRoute(r.id, !!r.correct)} disabled={Boolean(feedback)}>
                <strong>{r.name}</strong>
                <small>{r.price} сум</small>
              </button>
            ))}
          </div>
        ) : null}

        {step === "date" ? (
          <div className="ticket-options">
            {DATE_OPTIONS.map((d) => (
              <button key={d.id} type="button" className={`ticket-option${date === d.id ? " ticket-option--picked" : ""}`} onClick={() => chooseDate(d.id, !!d.correct)} disabled={Boolean(feedback)}>
                <strong>{d.name}</strong>
                <small>{d.sub}</small>
              </button>
            ))}
          </div>
        ) : null}

        {step === "seat" ? (
          <div className="ticket-seats">
            <LessonItemArt id="train-seat-map-realistic" size={138} className="ticket-seat-map-art" />
            {SEAT_OPTIONS.map((s) => (
              <button key={s.id} type="button" className={`ticket-seat${seat === s.id ? " ticket-seat--picked" : ""}`} onClick={() => chooseSeat(s.id, !!s.correct)} disabled={Boolean(feedback)}>
                <small>{s.row}</small>
              </button>
            ))}
          </div>
        ) : null}

        {step === "pay" ? (
          <button type="button" className="ticket-pay-btn" onClick={pay} disabled={Boolean(feedback)}>
            {t.pay} — 120 000 сум
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="morning-quest-trainer ticket-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark ticket-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8 L21 8 L21 14 Q19 14 19 16 Q19 18 21 18 L21 20 L3 20 L3 18 Q5 18 5 16 Q5 14 3 14 Z" />
              <path d="M11 8 L11 20" strokeDasharray="2 3" />
            </svg>
          </span>
          <div>
            <strong>{t.appTitle}</strong>
            <small>{t.stepCounter(stepNum)}</small>
          </div>
        </div>
        <div className="mq-topbar-progress" aria-hidden="true">
          {Array.from({ length: STEPS }).map((_, i) => (
            <span key={i} className={`mq-topbar-dot${stepNum > i + 1 || isDone ? " mq-topbar-dot--done" : ""}${stepNum === i + 1 && !isDone ? " mq-topbar-dot--current" : ""}`} />
          ))}
        </div>
      </header>

      <div className="mq-shell">
        <div className="mq-phone-col">
          <div className={`mq-phone mq-phone--ticket-${step}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">10:0{stepNum}</span>
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
            <div className="mq-phone-content">{body}</div>
            <div className="mq-phone-home" aria-hidden="true" />
          </div>
        </div>

        <aside className="mq-panel">
          <div className="mq-panel-task">
            <span className="mq-eyebrow">{t.taskEyebrow}</span>
            <p className="mq-panel-task-text">{t.context}</p>
          </div>

          {!isDone && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{t.questions[step]}</h3>
            </div>
          ) : null}

          {feedback ? (
            <div className={`outfit-feedback outfit-feedback--${feedback}`}>
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{feedback === "good" ? t.feedbackGood : t.feedbackSoft}</p>
              <div className="outfit-feedback-actions">
                {feedback === "good" ? (
                  <button type="button" className="mq-panel-primary" onClick={advance}>{step === "pay" ? t.finish : "Дальше"}</button>
                ) : (
                  <button type="button" className="mq-panel-primary outfit-retry" onClick={retry}>{t.retry}</button>
                )}
              </div>
            </div>
          ) : !isDone ? (
            <div className="mq-panel-hint">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>{t.hints[step]}</p>
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
