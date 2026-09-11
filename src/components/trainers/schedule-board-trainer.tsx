"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { ScheduleBoardTrainer as ScheduleBoardTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: ScheduleBoardTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Row = { id: string; train: string; dest: string; time: string; platform: string; status: "on-time" | "boarding" | "delayed" };

const ROWS: Row[] = [
  { id: "samarqand", train: "Шарк 64", dest: "Самарканд", time: "08:30", platform: "1", status: "boarding" },
  { id: "bukhara", train: "Афросиёб 72", dest: "Бухара", time: "10:15", platform: "3", status: "on-time" },
  { id: "khiva", train: "Орзу 102", dest: "Хива", time: "12:45", platform: "2", status: "delayed" },
  { id: "andijan", train: "Шарк 88", dest: "Андижан", time: "14:20", platform: "4", status: "on-time" },
  { id: "nukus", train: "Барс 46", dest: "Нукус", time: "16:00", platform: "5", status: "on-time" },
];

type Stage = "p1" | "p2" | "p3" | "done";
const FLOW: Stage[] = ["p1", "p2", "p3", "done"];
const STEPS = 3;

const PASSENGERS: Record<Exclude<Stage, "done">, { destination: string; correctId: string; context: string }> = {
  p1: { destination: "Самарканд", correctId: "samarqand", context: "Тебе купили билет до Самарканда. Поезд утром." },
  p2: { destination: "Бухара", correctId: "bukhara", context: "Едешь в Бухару в гости. Поезд днём." },
  p3: { destination: "Хива", correctId: "khiva", context: "Семья едет в Хиву. Поезд после обеда." },
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
  boardTitle: string;
  cols: { train: string; dest: string; time: string; platform: string; status: string };
  statuses: Record<Row["status"], string>;
  question: (city: string) => string;
  hint: (city: string) => string;
  feedbackGood: (row: Row) => string;
  feedbackSoft: (city: string) => string;
}> = {
  ru: {
    appTitle: "Табло вокзала",
    stepCounter: (n) => `Пассажир ${n} из ${STEPS}`,
    taskEyebrow: "Пассажир",
    questionEyebrow: "Найди свой поезд",
    hintEyebrow: "Подсказка",
    feedbackEyebrow: "Проверка",
    skip: "Не знаю",
    finish: "Закончить",
    retry: "Попробовать снова",
    next: "Следующий пассажир",
    doneTitle: "Молодец! Ты находишь поезд на табло.",
    doneHint: "На табло смотрят на колонку «Куда» — выбирают свой город.",
    boardTitle: "Отправление",
    cols: { train: "Поезд", dest: "Куда", time: "Время", platform: "Путь", status: "Статус" },
    statuses: { "on-time": "по расписанию", boarding: "посадка", delayed: "задержка" },
    question: (city) => `Какой поезд идёт в ${city}?`,
    hint: (city) => `Смотри на колонку «Куда» — найди строку «${city}». В этой строке — твой поезд.`,
    feedbackGood: (row) => `Верно. Поезд ${row.train} в ${row.dest}, время ${row.time}, путь ${row.platform}.`,
    feedbackSoft: (city) => `Это не твой поезд. Найди строку «${city}».`,
  },
  uz: {
    appTitle: "Vokzal taxtasi",
    stepCounter: (n) => `${n} / ${STEPS}-yoʻlovchi`,
    taskEyebrow: "Yoʻlovchi",
    questionEyebrow: "Oʻz poezdingni top",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    next: "Keyingi yoʻlovchi",
    doneTitle: "Yashasin! Sen poezdni taxtadan topishni oʻrganding.",
    doneHint: "«Qayerga» ustuniga qara — oʻz shahringni topasan.",
    boardTitle: "Joʻnab ketish",
    cols: { train: "Poezd", dest: "Qayerga", time: "Vaqt", platform: "Yoʻlak", status: "Holat" },
    statuses: { "on-time": "vaqtida", boarding: "yozilish", delayed: "kechikish" },
    question: (city) => `Qaysi poezd ${city}ga ketadi?`,
    hint: (city) => `«Qayerga» ustuniga qara — «${city}» qatorini top.`,
    feedbackGood: (row) => `Toʻgʻri. ${row.train}, ${row.dest}, ${row.time}, ${row.platform}-yoʻlak.`,
    feedbackSoft: (city) => `Bu sizning poezdingiz emas. «${city}» qatorini top.`,
  },
};

export function ScheduleBoardTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [stage, setStage] = useState<Stage>("p1");
  const [picked, setPicked] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stage === "done";
  const step = isDone ? STEPS : FLOW.indexOf(stage) + 1;
  const passenger = isDone ? null : PASSENGERS[stage as Exclude<Stage, "done">];
  const correctRow = passenger ? ROWS.find((r) => r.id === passenger.correctId) : null;

  function tap(id: string) {
    if (feedback || !passenger) return;
    setPicked(id);
    const ok = id === passenger.correctId;
    answers.current[`board-${stage}`] = { picked: id, correct: ok };
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
    <div className="board-app board-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : (
    <div className="board-app">
      <div className="board-header">
        <span className="board-header-main">
          <LessonItemArt id="station-board" size={42} className="board-header-art" />
          <span className="board-title">{t.boardTitle}</span>
        </span>
        <span className="board-clock">14:08</span>
      </div>
      <div className="board-table">
        <div className="board-row board-row--head">
          <span>{t.cols.dest}</span>
          <span>{t.cols.time}</span>
          <span>{t.cols.platform}</span>
        </div>
        {ROWS.map((r) => {
          const isMine = picked === r.id;
          const isCorrect = passenger?.correctId === r.id && feedback === "good" && isMine;
          const isWrong = isMine && feedback === "soft";
          return (
            <button
              key={r.id}
              type="button"
              className={`board-row${isCorrect ? " board-row--correct" : ""}${isWrong ? " board-row--wrong" : ""}`}
              onClick={() => tap(r.id)}
              disabled={Boolean(feedback)}
            >
              <span>
                <span className="board-train">{r.train}</span>
                <span className="board-dest">{r.dest}</span>
              </span>
              <span className="board-time">{r.time}</span>
              <span className={`board-platform board-platform--${r.status}`}>{r.platform}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="morning-quest-trainer board-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark board-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="14" rx="2" />
              <path d="M3 10 H21 M9 14 H15" />
              <path d="M7 22 L10 18 M17 22 L14 18" />
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
          <div className={`mq-phone mq-phone--board-${stage}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">14:0{Math.min(step, 9)}</span>
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
            <p className="mq-panel-task-text">{passenger ? passenger.context : t.doneHint}</p>
          </div>

          {passenger && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{t.question(passenger.destination)}</h3>
            </div>
          ) : null}

          {feedback && passenger && correctRow ? (
            <div className={`outfit-feedback outfit-feedback--${feedback}`}>
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{feedback === "good" ? t.feedbackGood(correctRow) : t.feedbackSoft(passenger.destination)}</p>
              <div className="outfit-feedback-actions">
                {feedback === "good" ? (
                  <button type="button" className="mq-panel-primary" onClick={advance}>{stage === "p3" ? t.finish : t.next}</button>
                ) : (
                  <button type="button" className="mq-panel-primary outfit-retry" onClick={retry}>{t.retry}</button>
                )}
              </div>
            </div>
          ) : passenger ? (
            <div className="mq-panel-hint">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>{t.hint(passenger.destination)}</p>
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
