"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { VolumeSafeTrainer as VolumeSafeTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: VolumeSafeTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Scenario = "music" | "podcast" | "video";
type Stage = Scenario | "done";
const FLOW: Stage[] = ["music", "podcast", "video", "done"];
const STEPS = 3;

const SAFE_MIN = 30;
const SAFE_MAX = 60;

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
  apply: string;
  doneTitle: string;
  doneHint: string;
  zoneLow: string;
  zoneSafe: string;
  zoneLoud: string;
  zoneDanger: string;
  cases: Record<Scenario, { context: string; task: string; question: string; hint: string; feedbackGood: string; feedbackSoft: string }>;
}> = {
  ru: {
    appTitle: "Headphone volume",
    stepCounter: (n) => `Situation${n}from${STEPS}`,
    taskEyebrow: "Situation",
    questionEyebrow: "What volume should I set?",
    hintEyebrow: "Clue",
    feedbackEyebrow: "Checking",
    skip: "Don't know",
    finish: "Finish",
    next: "Next situation",
    retry: "Try again",
    apply: "Turn this volume up",
    doneTitle: "Well done! The volume is safe.",
    doneHint: "Safe - from 30 to 60. After 80 - dangerous for the ears.",
    zoneLow: "Quiet",
    zoneSafe: "Safe",
    zoneLoud: "Loud",
    zoneDanger: "Dangerous",
    cases: {
      music: {
        context: "You're on the bus. You listen to music on headphones.",
        task: "Set the volume so you can hear the music without going deaf.",
        question: "What volume is safe?",
        hint: "Safe green zone: 30–60. It's audible, but not loud.",
        feedbackGood: "Right. In the green zone, the ears will not be harmed.",
        feedbackSoft: "Too loud. If this happens for an hour, there will be ringing in the ears.",
      },
      podcast: {
        context: "Doing your homework, listening to a nature podcast.",
        task: "Turn up the volume so you can understand speech, but not at full volume.",
        question: "What volume is appropriate?",
        hint: "For speech, 40–50 is enough. Louder - your ears get tired.",
        feedbackGood: "Right. Speech can be heard well at 40–50.",
        feedbackSoft: "Very loud for speech. If you listen for hours, your ears will hurt.",
      },
      video: {
        context: "At home you watch videos on headphones in the evening.",
        task: "Set the volume to a quiet level - you don’t need it loud at home.",
        question: "What volume is appropriate for the evening?",
        hint: "In the evening, 30–50 is enough at home.",
        feedbackGood: "Right. In the evening at home, 30–50 is what you need.",
        feedbackSoft: "You don't need to be so loud at home in the evening. Make it quieter.",
      },
    },
  },
  uz: {
    appTitle: "Quloqchin tovushi",
    stepCounter: (n) => `${n} / ${STEPS}-vaziyat`,
    taskEyebrow: "Vaziyat",
    questionEyebrow: "Tovushni qaysi darajaga qoʻyish",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    next: "Keyingi vaziyat",
    retry: "Qayta urinish",
    apply: "Shu darajada qoʻyish",
    doneTitle: "Yashasin! Tovush xavfsiz darajada.",
    doneHint: "Xavfsiz — 30 va 60 oraligʻida. 80 dan ortiq — xavfli.",
    zoneLow: "Past",
    zoneSafe: "Xavfsiz",
    zoneLoud: "Baland",
    zoneDanger: "Xavfli",
    cases: {
      music: {
        context: "Avtobusda ketyapsan. Quloqchinda musiqa eshityapsan.",
        task: "Musiqa eshitiladigan, ammo quloqni og'ritmaydigan darajada qoʻy.",
        question: "Qaysi tovush xavfsiz?",
        hint: "Xavfsiz yashil zona: 30–60.",
        feedbackGood: "Toʻgʻri. Yashil zonada quloq jarohatlanmaydi.",
        feedbackSoft: "Juda baland. Bir soat tinglasang — quloq shovqillaydi.",
      },
      podcast: {
        context: "Uy ishini qilyapsan, podkast tinglayapsan.",
        task: "Nutq eshitilsin, lekin baland boʻlmasin.",
        question: "Qaysi tovush mos?",
        hint: "Nutq uchun 40–50 yetarli.",
        feedbackGood: "Toʻgʻri. Nutq 40–50 da yaxshi eshitiladi.",
        feedbackSoft: "Nutq uchun juda baland. Bir necha soat eshitsang — quloq ogʻriydi.",
      },
      video: {
        context: "Uyda kechqurun video koʻrayapsan quloqchinda.",
        task: "Tinch tovush qoʻy — uyda baland kerak emas.",
        question: "Qaysi tovush mos?",
        hint: "Kechqurun uyda 30–50 yetarli.",
        feedbackGood: "Toʻgʻri. Kechqurun 30–50 — eng yaxshi.",
        feedbackSoft: "Uyda kech bunchalik baland kerak emas. Tinchlatsang.",
      },
    },
  },
};

export function VolumeSafeTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [stage, setStage] = useState<Stage>("music");
  const [volume, setVolume] = useState(50);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stage === "done";
  const step = isDone ? STEPS : FLOW.indexOf(stage) + 1;
  const sit = isDone ? null : t.cases[stage as Scenario];

  const zone = volume < SAFE_MIN ? "low" : volume <= SAFE_MAX ? "safe" : volume <= 80 ? "loud" : "danger";
  const zoneLabel = zone === "low" ? t.zoneLow : zone === "safe" ? t.zoneSafe : zone === "loud" ? t.zoneLoud : t.zoneDanger;

  function apply() {
    if (feedback) return;
    const ok = volume >= SAFE_MIN && volume <= SAFE_MAX;
    answers.current[`volume-${stage}`] = { value: volume, correct: ok };
    setFeedback(ok ? "good" : "soft");
  }

  function advance() {
    const i = FLOW.indexOf(stage);
    setStage(FLOW[Math.min(i + 1, FLOW.length - 1)]);
    setFeedback(null);
    setVolume(50);
  }

  function retry() { setFeedback(null); }
  function skip() { answers.current[`skip-${stage}`] = true; advance(); }
  function finish() { onDone({ correct: true }); }

  void trainer;

  const scene: ReactNode = isDone ? (
    <div className="volume-app volume-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : (
    <div className="volume-app">
      <div className="volume-headphones" aria-hidden="true">
        <HeadphonesArt zone={zone} />
      </div>

      <div className="volume-meter">
        <div className="volume-meter-zones" aria-hidden="true">
          <span className="volume-meter-zone volume-meter-zone--low" />
          <span className="volume-meter-zone volume-meter-zone--safe" />
          <span className="volume-meter-zone volume-meter-zone--loud" />
          <span className="volume-meter-zone volume-meter-zone--danger" />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          step="5"
          onChange={(e) => {
            if (feedback) return;
            setVolume(Number(e.target.value));
          }}
          className="volume-slider"
          disabled={Boolean(feedback)}
        />
        <div className="volume-meter-readout">
          <strong>{volume}</strong>
          <span className={`volume-zone-badge volume-zone-badge--${zone}`}>{zoneLabel}</span>
        </div>
      </div>

      <button
        type="button"
        className="volume-apply"
        disabled={Boolean(feedback)}
        onClick={apply}
      >
        {t.apply}
      </button>
    </div>
  );

  return (
    <div className="morning-quest-trainer volume-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark volume-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 14 Q3 6 12 6 Q21 6 21 14" />
              <rect x="3" y="13" width="5" height="8" rx="2" fill="currentColor" />
              <rect x="16" y="13" width="5" height="8" rx="2" fill="currentColor" />
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
          <div className={`mq-phone mq-phone--volume-${stage}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">15:0{Math.min(step, 9)}</span>
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
              <h3>{sit.task}</h3>
              <p className="outfit-pick-summary">
                Now:<strong>{volume}</strong> — {zoneLabel}
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
                    {stage === "video" ? t.finish : t.next}
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

function HeadphonesArt({ zone }: { zone: "low" | "safe" | "loud" | "danger" }) {
  return (
    <div className={`volume-headphones-art volume-headphones-art--${zone}`} aria-hidden="true">
      <LessonItemArt id="headphones-realistic" size={138} />
      {zone === "loud" || zone === "danger" ? <span className="volume-sound-ring" /> : null}
      {zone === "danger" ? <span className="volume-warning-badge">!</span> : null}
    </div>
  );
}
