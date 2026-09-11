"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { WashingMachineTrainerV2 as WashingMachineTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: WashingMachineTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Mode = "cotton" | "delicate" | "wool" | "sport";
type Temp = 30 | 40 | 60 | 90;
type CaseKey = "silk" | "jeans" | "wool";
type Stage = CaseKey | "done";
const FLOW: Stage[] = ["silk", "jeans", "wool", "done"];
const STEPS = 3;

const CORRECT: Record<CaseKey, { mode: Mode; temp: Temp }> = {
  silk: { mode: "delicate", temp: 30 },
  jeans: { mode: "cotton", temp: 40 },
  wool: { mode: "wool", temp: 30 },
};

const MODE_OPTIONS: { id: Mode; name: string }[] = [
  { id: "cotton", name: "Хлопок" },
  { id: "delicate", name: "Деликат" },
  { id: "wool", name: "Шерсть" },
  { id: "sport", name: "Спорт" },
];
const TEMP_OPTIONS: Temp[] = [30, 40, 60, 90];

const WASH_ITEM_ART: Record<CaseKey, LessonItemArtId> = {
  silk: "silk-blouse",
  jeans: "jeans",
  wool: "wool-sweater",
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
  cases: Record<CaseKey, { item: string; hint: string; feedbackGood: string; feedbackSoft: string }>;
  pickMode: string;
  pickTemp: string;
  start: string;
  running: string;
  question: string;
}> = {
  ru: {
    appTitle: "Стиральная машина",
    stepCounter: (n) => `Стирка ${n} из ${STEPS}`,
    taskEyebrow: "Загрузка",
    questionEyebrow: "Настрой машину",
    hintEyebrow: "Подсказка",
    feedbackEyebrow: "Проверка",
    skip: "Не знаю",
    finish: "Закончить",
    retry: "Попробовать снова",
    next: "Следующая стирка",
    doneTitle: "Молодец! Все 3 стирки запущены правильно.",
    doneHint: "Шёлк — деликат 30°, джинсы — хлопок 40°, шерсть — шерсть 30°.",
    cases: {
      silk: { item: "Шёлковая блузка", hint: "Шёлк — деликатный режим, 30°.", feedbackGood: "Верно. Шёлк — деликат 30°.", feedbackSoft: "Этот режим испортит шёлк. Нужен «Деликат» 30°." },
      jeans: { item: "Джинсы", hint: "Джинсы — хлопок, 40° (можно 60° если очень грязные).", feedbackGood: "Верно. Хлопок 40° — то что надо.", feedbackSoft: "Этот режим не подходит. Хлопок 40°." },
      wool: { item: "Шерстяной свитер", hint: "Шерсть — режим «Шерсть», 30°.", feedbackGood: "Верно. Шерсть 30°.", feedbackSoft: "Шерсть сядет от такого режима. Нужен «Шерсть» 30°." },
    },
    pickMode: "Режим",
    pickTemp: "Температура",
    start: "Старт",
    running: "Стирка началась",
    question: "Выбери режим и температуру",
  },
  uz: {
    appTitle: "Kir yuvish mashinasi",
    stepCounter: (n) => `${n} / ${STEPS}-yuvish`,
    taskEyebrow: "Yuk",
    questionEyebrow: "Mashinani sozla",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    next: "Keyingi yuvish",
    doneTitle: "Yashasin! 3 yuvish ham toʻgʻri.",
    doneHint: "Ipak — nozik 30°, jeans — paxta 40°, jun — jun 30°.",
    cases: {
      silk: { item: "Ipak koʻylak", hint: "Ipak — nozik, 30°.", feedbackGood: "Toʻgʻri.", feedbackSoft: "Bu ipakni buzadi. «Nozik» 30°." },
      jeans: { item: "Jeans", hint: "Jeans — paxta 40°.", feedbackGood: "Toʻgʻri. Paxta 40°.", feedbackSoft: "Bu mos emas. Paxta 40°." },
      wool: { item: "Jun sviter", hint: "Jun — «Jun», 30°.", feedbackGood: "Toʻgʻri. Jun 30°.", feedbackSoft: "Jun kichrayadi. «Jun» 30°." },
    },
    pickMode: "Rejim",
    pickTemp: "Harorat",
    start: "Boshlash",
    running: "Yuvish boshlandi",
    question: "Rejim va haroratni tanla",
  },
};

export function WashingMachineTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [stage, setStage] = useState<Stage>("silk");
  const [pickedMode, setPickedMode] = useState<Mode | null>(null);
  const [pickedTemp, setPickedTemp] = useState<Temp | null>(null);
  const [running, setRunning] = useState(false);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stage === "done";
  const step = isDone ? STEPS : FLOW.indexOf(stage) + 1;
  const c = isDone ? null : t.cases[stage as CaseKey];
  const correct = !isDone ? CORRECT[stage as CaseKey] : null;

  function tryStart() {
    if (feedback || !pickedMode || !pickedTemp || !correct) return;
    const ok = pickedMode === correct.mode && pickedTemp === correct.temp;
    answers.current[`wash-${stage}`] = { mode: pickedMode, temp: pickedTemp, correct: ok };
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setFeedback(ok ? "good" : "soft");
    }, 1200);
  }

  function advance() {
    const i = FLOW.indexOf(stage);
    setStage(FLOW[Math.min(i + 1, FLOW.length - 1)]);
    setPickedMode(null);
    setPickedTemp(null);
    setFeedback(null);
  }
  function retry() { setFeedback(null); setPickedMode(null); setPickedTemp(null); }
  function skip() { answers.current[`skip-${stage}`] = true; advance(); }
  function finish() { onDone({ correct: true }); }

  void trainer;

  const scene: ReactNode = isDone ? (
    <div className="wash-app wash-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : c ? (
    <div className="wash-app">
      <div className="wash-machine">
        <div className={`wash-machine-card${running ? " wash-machine-card--running" : ""}`} aria-hidden="true">
          <LessonItemArt id="washing-machine-front-realistic" size={214} className="wash-machine-art" />
          <span className="wash-machine-display">
            {running ? "GO" : pickedMode && pickedTemp ? `${pickedTemp}°` : "--"}
          </span>
          <span className="wash-machine-load">
            <LessonItemArt id={WASH_ITEM_ART[stage as CaseKey]} size={70} />
          </span>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="morning-quest-trainer wash-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark wash-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="3" width="16" height="18" rx="2" />
              <circle cx="12" cy="13" r="5" />
            </svg>
          </span>
          <div>
            <strong>{t.appTitle}</strong>
            <small>{t.stepCounter(step)}</small>
          </div>
        </div>
        <div className="mq-topbar-progress" aria-hidden="true">
          {Array.from({ length: STEPS }).map((_, i) => (
            <span key={i} className={`mq-topbar-dot${step > i + 1 || isDone ? " mq-topbar-dot--done" : ""}${step === i + 1 && !isDone ? " mq-topbar-dot--current" : ""}`} />
          ))}
        </div>
      </header>

      <div className="mq-shell">
        <div className="mq-phone-col">
          <div className={`mq-phone mq-phone--wash-${stage}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">11:0{step}</span>
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
            <p className="mq-panel-task-text">{c ? c.item : t.doneHint}</p>
          </div>

          {c && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{t.question}</h3>

              <span className="mq-eyebrow" style={{ marginTop: 12 }}>{t.pickMode}</span>
              <div className="wash-mode-row">
                {MODE_OPTIONS.map((m) => (
                  <button key={m.id} type="button" className={`wash-chip${pickedMode === m.id ? " wash-chip--picked" : ""}`} onClick={() => setPickedMode(m.id)} disabled={running || Boolean(feedback)}>
                    {m.name}
                  </button>
                ))}
              </div>

              <span className="mq-eyebrow" style={{ marginTop: 12 }}>{t.pickTemp}</span>
              <div className="wash-temp-row">
                {TEMP_OPTIONS.map((tt) => (
                  <button key={tt} type="button" className={`wash-chip wash-chip--temp${pickedTemp === tt ? " wash-chip--picked" : ""}`} onClick={() => setPickedTemp(tt)} disabled={running || Boolean(feedback)}>
                    {tt}°
                  </button>
                ))}
              </div>

              <button type="button" className="wash-start" disabled={!pickedMode || !pickedTemp || running} onClick={tryStart}>
                {running ? t.running : t.start}
              </button>
            </div>
          ) : null}

          {feedback && c ? (
            <div className={`outfit-feedback outfit-feedback--${feedback}`}>
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{feedback === "good" ? c.feedbackGood : c.feedbackSoft}</p>
              <div className="outfit-feedback-actions">
                {feedback === "good" ? (
                  <button type="button" className="mq-panel-primary" onClick={advance}>{stage === "wool" ? t.finish : t.next}</button>
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
