"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { FinalQuestTrainer as FinalQuestTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: FinalQuestTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Skill = "clock" | "weather" | "label" | "timer" | "schedule" | "message";
const ORDER: Skill[] = ["clock", "weather", "label", "timer", "schedule", "message"];

type Task = {
  skill: Skill;
  title: string;
  scene: string;
  art: LessonItemArtId;
  options: { id: string; text: string }[];
  correctId: string;
};

const TASKS: Record<Skill, Task> = {
  clock: {
    skill: "clock",
    title: "Часы",
    scene: "07:00",
    art: "alarm-clock",
    options: [
      { id: "morning", text: "07:00 утра" },
      { id: "evening", text: "19:00 вечера" },
      { id: "afternoon", text: "17:00 дня" },
    ],
    correctId: "morning",
  },
  weather: {
    skill: "weather",
    title: "Погода",
    scene: "+5°, облачно",
    art: "cool-jacket",
    options: [
      { id: "warm", text: "Жарко — нужна панама" },
      { id: "cool", text: "Прохладно — нужна куртка" },
      { id: "winter", text: "Мороз — нужен пуховик" },
    ],
    correctId: "cool",
  },
  label: {
    skill: "label",
    title: "Этикетка крема",
    scene: "До 06.2025",
    art: "expiry-cream",
    options: [
      { id: "valid", text: "Можно пользоваться" },
      { id: "expired", text: "Срок истёк — выбросить" },
      { id: "use", text: "Использовать дома" },
    ],
    correctId: "expired",
  },
  timer: {
    skill: "timer",
    title: "Таймер",
    scene: "Нужно 5 минут",
    art: "timer-five",
    options: [
      { id: "5min", text: "05:00" },
      { id: "5sec", text: "00:05" },
      { id: "50min", text: "50:00" },
    ],
    correctId: "5min",
  },
  schedule: {
    skill: "schedule",
    title: "Расписание",
    scene: "Поезд в Самарканд в 14:20",
    art: "station-board",
    options: [
      { id: "match", text: "Это мой поезд" },
      { id: "wrong-city", text: "Это в Бухару" },
      { id: "wrong-time", text: "Это в 08:00" },
    ],
    correctId: "match",
  },
  message: {
    skill: "message",
    title: "Сообщение от мамы",
    scene: "«Прими витамин»",
    art: "polite-message",
    options: [
      { id: "ok", text: "Хорошо" },
      { id: "ignore", text: "Не отвечать" },
      { id: "rude", text: "Не приставай" },
    ],
    correctId: "ok",
  },
};

type Locales<T> = Record<Locale, T>;
const dict: Locales<{
  appTitle: string;
  stepCounter: (n: number, total: number) => string;
  taskEyebrow: string;
  questionEyebrow: string;
  hintEyebrow: string;
  skip: string;
  finish: string;
  doneTitle: string;
  doneHint: string;
  taskCtx: string;
  hint: string;
  question: string;
}> = {
  ru: {
    appTitle: "Контрольный замер",
    stepCounter: (n, total) => `Задание ${n} из ${total}`,
    taskEyebrow: "Сцена",
    questionEyebrow: "Реши",
    hintEyebrow: "Подсказка",
    skip: "Не знаю",
    finish: "Завершить",
    doneTitle: "Спасибо! Контрольный замер пройден.",
    doneHint: "Оценок нет. Учитель сравнит результат с первым уроком.",
    taskCtx: "Это контрольный замер ФЦГ. Ответь на 6 вопросов из разных тем за год.",
    hint: "Подумай спокойно. Если не знаешь — нажми «Не знаю».",
    question: "Какой вариант подходит?",
  },
  uz: {
    appTitle: "Yakuniy diagnostika",
    stepCounter: (n, total) => `${n} / ${total}-topshiriq`,
    taskEyebrow: "Sahna",
    questionEyebrow: "Qaror",
    hintEyebrow: "Maslahat",
    skip: "Bilmayman",
    finish: "Yakunlash",
    doneTitle: "Rahmat! Yakuniy diagnostika tugadi.",
    doneHint: "Baholar yoʻq. Oʻqituvchi natijalarni solishtiradi.",
    taskCtx: "Bu yakuniy oʻlchov. 6 ta savol — yil davomidagi mavzular boʻyicha.",
    hint: "Tinch oʻylab koʻr. Bilmasang — «Bilmayman».",
    question: "Qaysi variant mos?",
  },
};

export function FinalQuestTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = idx >= ORDER.length;
  const total = ORDER.length;
  const task = !isDone ? TASKS[ORDER[idx]] : null;

  function tap(optId: string) {
    if (picked || !task) return;
    setPicked(optId);
    answers.current[`final-${task.skill}`] = { picked: optId, correct: optId === task.correctId };
    // diagnostic: advance silently without showing feedback
    setTimeout(() => {
      setPicked(null);
      setIdx((i) => i + 1);
    }, 400);
  }

  function skip() {
    if (task) answers.current[`skip-${task.skill}`] = true;
    setIdx((i) => i + 1);
  }
  function finish() { onDone({ correct: true }); }

  void trainer;

  const scene: ReactNode = isDone ? (
    <div className="final-app final-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : task ? (
    <div className="final-app">
      <div className="final-scene-card">
        <span className="final-scene-tag">{task.title}</span>
        <LessonItemArt id={task.art} size={112} />
        <div className="final-scene-visual">{task.scene}</div>
      </div>
    </div>
  ) : null;

  return (
    <div className="morning-quest-trainer final-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark final-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3 L14 9 L20 9 L15 13 L17 19 L12 15 L7 19 L9 13 L4 9 L10 9 Z" fill="currentColor" />
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
          <div className={`mq-phone mq-phone--final${isDone ? "-done" : ""}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">10:0{Math.min(idx + 1, 9)}</span>
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
            <p className="mq-panel-task-text">{task ? `${task.title}: ${task.scene}` : t.taskCtx}</p>
          </div>

          {task ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{t.question}</h3>
              <div className="mq-panel-options">
                {task.options.map((o, i) => (
                  <button key={o.id} type="button" className={`mq-panel-option${picked === o.id ? " mq-panel-option--picked" : ""}`} onClick={() => tap(o.id)} disabled={Boolean(picked)}>
                    <span className="mq-panel-option-num">{i + 1}</span>
                    <span className="mq-panel-option-body"><strong>{o.text}</strong></span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {task ? (
            <div className="mq-panel-hint mq-panel-hint--muted">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>{t.hint}</p>
            </div>
          ) : null}

          <div className="mq-panel-footer">
            {isDone ? (
              <button type="button" className="mq-panel-primary" onClick={finish}>{t.finish}</button>
            ) : task ? (
              <button type="button" className="mq-panel-skip" onClick={skip}>{t.skip}</button>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
