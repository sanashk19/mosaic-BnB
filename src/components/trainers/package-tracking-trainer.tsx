"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { PackageTrackingTrainer as PackageTrackingTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: PackageTrackingTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type StatusKey = "sent" | "in-transit" | "out-for-delivery" | "delivered";
type CaseKey = "a" | "b" | "c";
type Stage = CaseKey | "done";
const FLOW: Stage[] = ["a", "b", "c", "done"];
const STEPS = 3;

const CASES: Record<CaseKey, { trackNo: string; from: string; to: string; correct: StatusKey; events: { step: StatusKey; time: string; place: string }[] }> = {
  a: {
    trackNo: "UZ-104-552-901",
    from: "Bukhara",
    to: "Tashkent",
    correct: "delivered",
    events: [
      { step: "sent", time: "25.05 09:10", place: "Bukhara" },
      { step: "in-transit", time: "25.05 18:42", place: "Sorting" },
      { step: "out-for-delivery", time: "26.05 11:05", place: "Tashkent" },
      { step: "delivered", time: "26.05 14:30", place: "Received" },
    ],
  },
  b: {
    trackNo: "UZ-237-118-446",
    from: "Andijan",
    to: "Samarkand",
    correct: "in-transit",
    events: [
      { step: "sent", time: "26.05 12:00", place: "Andijan" },
      { step: "in-transit", time: "27.05 06:30", place: "On the way" },
    ],
  },
  c: {
    trackNo: "UZ-995-008-322",
    from: "Khiva",
    to: "Nukus",
    correct: "out-for-delivery",
    events: [
      { step: "sent", time: "25.05 16:40", place: "Khiva" },
      { step: "in-transit", time: "26.05 03:15", place: "Sorting" },
      { step: "out-for-delivery", time: "27.05 08:50", place: "The courier has left" },
    ],
  },
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
  statuses: Record<StatusKey, string>;
  context: (track: string, from: string, to: string) => string;
  question: string;
  hint: string;
  feedbackGood: string;
  feedbackSoft: string;
}> = {
  ru: {
    appTitle: "Parcel tracking",
    stepCounter: (n) => `Package${n}from${STEPS}`,
    taskEyebrow: "Track",
    questionEyebrow: "Where is the parcel now?",
    hintEyebrow: "Clue",
    feedbackEyebrow: "Checking",
    skip: "Don't know",
    finish: "Finish",
    retry: "Try again",
    next: "Next package",
    doneTitle: "Well done! You know how to read the parcel status.",
    doneHint: "On the track page, always look at the last item - this is the current status.",
    statuses: {
      sent: "Sent",
      "in-transit": "On the way",
      "out-for-delivery": "The courier is lucky",
      delivered: "Received",
    },
    context: (track, from, to) => `Track:${track}From:${from} → ${to}`,
    question: "What is the current status?",
    hint: "Look at the bottom line in history - this is the last event.",
    feedbackGood: "Right! This is the correct status.",
    feedbackSoft: "This is not the same status. Look at the latest event in history.",
  },
  uz: {
    appTitle: "Posilkani kuzatish",
    stepCounter: (n) => `${n} / ${STEPS}-posilka`,
    taskEyebrow: "Trek",
    questionEyebrow: "Posilka qayerda",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    next: "Keyingi posilka",
    doneTitle: "Yashasin! Sen posilka statusini oʻqishni oʻrganding.",
    doneHint: "Trek sahifasida eng pastki yozuvga qara — bu joriy status.",
    statuses: {
      sent: "Joʻnatildi",
      "in-transit": "Yoʻlda",
      "out-for-delivery": "Kuryer olib kelyapti",
      delivered: "Olindi",
    },
    context: (track, from, to) => `Trek: ${track}\nQayerdan: ${from} → ${to}`,
    question: "Hozir qaysi status?",
    hint: "Tarixdagi eng pastki yozuvga qara.",
    feedbackGood: "Toʻgʻri! Bu mos status.",
    feedbackSoft: "Bu mos emas. Eng oxirgi yozuvga qara.",
  },
};

const ALL_STATUSES: StatusKey[] = ["sent", "in-transit", "out-for-delivery", "delivered"];

export function PackageTrackingTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [stage, setStage] = useState<Stage>("a");
  const [picked, setPicked] = useState<StatusKey | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stage === "done";
  const step = isDone ? STEPS : FLOW.indexOf(stage) + 1;
  const c = isDone ? null : CASES[stage as CaseKey];

  function tap(s: StatusKey) {
    if (feedback || !c) return;
    setPicked(s);
    const ok = s === c.correct;
    answers.current[`track-${stage}`] = { picked: s, correct: ok };
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
    <div className="track-app track-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : c ? (
    <div className="track-app">
      <div className="track-card">
        <div className="track-card-head">
          <span className="track-card-art" aria-hidden="true">
            <LessonItemArt id={stage === "b" ? "delivery-truck" : "parcel-box"} size={58} />
          </span>
          <div>
            <strong>{c.trackNo}</strong>
            <small>{c.from} → {c.to}</small>
          </div>
        </div>
        <ol className="track-timeline">
          {c.events.map((e, i) => (
            <li key={i} className={`track-event track-event--${e.step}${i === c.events.length - 1 ? " track-event--latest" : ""}`}>
              <span className="track-dot" aria-hidden="true" />
              <div>
                <strong>{t.statuses[e.step]}</strong>
                <small>{e.time} · {e.place}</small>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  ) : null;

  return (
    <div className="morning-quest-trainer track-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark track-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="7" width="18" height="12" rx="2" />
              <path d="M3 11 H21 M8 7 V19" />
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
          <div className={`mq-phone mq-phone--track-${stage}`}>
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
            <p className="mq-panel-task-text" style={{ whiteSpace: "pre-line" }}>{c ? t.context(c.trackNo, c.from, c.to) : t.doneHint}</p>
          </div>

          {c && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{t.question}</h3>
              <div className="mq-panel-options">
                {ALL_STATUSES.map((s, i) => (
                  <button key={s} type="button" className={`mq-panel-option${picked === s ? " mq-panel-option--picked" : ""}`} onClick={() => tap(s)}>
                    <span className="mq-panel-option-num">{i + 1}</span>
                    <span className="mq-panel-option-body"><strong>{t.statuses[s]}</strong></span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {feedback ? (
            <div className={`outfit-feedback outfit-feedback--${feedback}`}>
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{feedback === "good" ? t.feedbackGood : t.feedbackSoft}</p>
              <div className="outfit-feedback-actions">
                {feedback === "good" ? (
                  <button type="button" className="mq-panel-primary" onClick={advance}>{stage === "c" ? t.finish : t.next}</button>
                ) : (
                  <button type="button" className="mq-panel-primary outfit-retry" onClick={retry}>{t.retry}</button>
                )}
              </div>
            </div>
          ) : c ? (
            <div className="mq-panel-hint">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>{t.hint}</p>
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
