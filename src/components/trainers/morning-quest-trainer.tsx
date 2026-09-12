"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { MorningQuestTrainer as MorningQuestTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: MorningQuestTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Stage =
  | "alarm"
  | "weather"
  | "shelf"
  | "timer"
  | "calendar"
  | "wardrobe"
  | "message"
  | "done";

const FLOW: Stage[] = [
  "alarm",
  "weather",
  "shelf",
  "timer",
  "calendar",
  "wardrobe",
  "message",
  "done",
];

const VISIBLE_STAGES = 7;

type AppKey = "clock" | "weather" | "shelf" | "timer" | "calendar" | "wardrobe" | "message" | "done";

const APP_BY_STAGE: Record<Stage, AppKey> = {
  alarm: "clock",
  weather: "weather",
  shelf: "shelf",
  timer: "timer",
  calendar: "calendar",
  wardrobe: "wardrobe",
  message: "message",
  done: "done",
};

type Option = { id: string; label: string; sub?: string; onClick: () => void };
type StageView = {
  scene: ReactNode;
  task: string;
  question?: string;
  options?: Option[];
  hint?: string;
  appBackground?: AppKey;
};

type Locales<T> = Record<Locale, T>;

const dict: Locales<{
  appTitle: string;
  stageCounter: (n: number) => string;
  skip: string;
  goNext: string;
  finish: string;
  taskEyebrow: string;
  questionEyebrow: string;
  hintEyebrow: string;
  hintDefault: string;
  doneTitle: string;
  doneHint: string;
  alarmStop: string;
  alarmSnooze: string;
  alarmName: string;
  alarmTask: string;
  alarmDone: string;
  alarmQuestion: string;
  alarmOptions: { label: string; sub?: string }[];
  weatherTask: string;
  weatherCity: string;
  weatherCondition: string;
  weatherQuestion: string;
  weatherOptions: { label: string; sub?: string }[];
  shelfTask: string;
  shelfHint: string;
  shelfItems: { name: string; target: boolean }[];
  timerTask: string;
  timerHint: string;
  timerMin: string;
  timerSec: string;
  timerStart: string;
  timerRunning: string;
  calendarTask: string;
  calendarDate: string;
  calendarEvents: { time: string; subject: string; highlight?: boolean }[];
  calendarQuestion: string;
  calendarOptions: { label: string }[];
  wardrobeTask: string;
  wardrobeHint: string;
  wardrobeItems: { key: string; name: string; correct: boolean }[];
  messageTask: string;
  messageFrom: string;
  messageTime: string;
  messageText: string;
  messageQuestion: string;
  messageOptions: { label: string; sub?: string }[];
}> = {
  ru: {
    appTitle: "Morning of Alisher",
    stageCounter: (n) => `Step${n}from${VISIBLE_STAGES}`,
    skip: "Don't know",
    goNext: "Next",
    finish: "Finish",
    taskEyebrow: "What to do",
    questionEyebrow: "Question",
    hintEyebrow: "Clue",
    hintDefault: "This is a diagnostic - there are no assessments. You can click \"Don't know\".",
    doneTitle: "Thank you! Diagnostics completed.",
    doneHint: "No ratings. The teacher will look at the results later.",
    alarmStop: "Turn off",
    alarmSnooze: "Postpone",
    alarmName: "Getting up to school",
    alarmTask: "The alarm clock is ringing. Turn it off, then answer the question.",
    alarmDone: "The alarm is turned off. What time is it now?",
    alarmQuestion: "What time is it now?",
    alarmOptions: [
      { label: "07:00 am", sub: "Monday morning" },
      { label: "19:00 dinner", sub: "Evening, after dinner" },
      { label: "17:00 in the afternoon", sub: "Day, after school" },
    ],
    weatherTask: "On the phone - the weather for today. Look and decide.",
    weatherCity: "Tashkent",
    weatherCondition: "Sunny, hot during the day",
    weatherQuestion: "Is it hot or cool today?",
    weatherOptions: [
      { label: "It's cold - you need a jacket" },
      { label: "It's hot - you need a Panama hat" },
    ],
    shelfTask: "Find and click on the toothpaste.",
    shelfHint: "Look at the label: the toothpaste usually has a tooth or brush on it.",
    shelfItems: [
      { name: "Shampoo", target: false },
      { name: "Toothpaste", target: true },
      { name: "Hand cream", target: false },
      { name: "Deodorant", target: false },
      { name: "Shower gel", target: false },
      { name: "Soap", target: false },
    ],
    timerTask: "Set a timer for 2 minutes to brush your teeth.",
    timerHint: "Press “+” for minutes until “2” appears. Then “Start”.",
    timerMin: "minutes",
    timerSec: "seconds",
    timerStart: "Start",
    timerRunning: "Timer started",
    calendarTask: "There are three lessons on the calendar today. Look.",
    calendarDate: "Today is Monday",
    calendarEvents: [
      { time: "08:30", subject: "Mathematics" },
      { time: "10:10", subject: "Physical education", highlight: true },
      { time: "11:50", subject: "Russian language" },
    ],
    calendarQuestion: "Which lesson requires special clothing?",
    calendarOptions: [
      { label: "Mathematics" },
      { label: "Physical education" },
      { label: "Russian language" },
    ],
    wardrobeTask: "Open the closet. Take what you need for physical education.",
    wardrobeHint: "For physical education you need a T-shirt and shorts - a sports uniform.",
    wardrobeItems: [
      { key: "uniform", name: "School uniform", correct: false },
      { key: "sport", name: "Sportswear", correct: true },
      { key: "umbrella", name: "Umbrella", correct: false },
      { key: "jacket", name: "Jacket", correct: false },
    ],
    messageTask: "A message came from mom. Read it.",
    messageFrom: "Mother",
    messageTime: "07:12",
    messageText: "Take your vitamin after breakfast.",
    messageQuestion: "What should I answer my mother?",
    messageOptions: [
      { label: "Okay mom", sub: "Calm answer" },
      { label: "Fine", sub: "Short but clear answer" },
      { label: "Close, don't reply", sub: "Don't answer mom" },
    ],
  },
  uz: {
    appTitle: "Alisherning ertasi",
    stageCounter: (n) => `${n} / ${VISIBLE_STAGES}-qadam`,
    skip: "Bilmayman",
    goNext: "Davom etish",
    finish: "Yakunlash",
    taskEyebrow: "Nima qilish kerak",
    questionEyebrow: "Savol",
    hintEyebrow: "Maslahat",
    hintDefault: "Bu diagnostika — baholar yoʻq. «Bilmayman»ni bosish mumkin.",
    doneTitle: "Rahmat! Diagnostika tugadi.",
    doneHint: "Baholar yoʻq. Oʻqituvchi natijalarni keyin koʻradi.",
    alarmStop: "Oʻchirish",
    alarmSnooze: "Keyinroq",
    alarmName: "Maktabga uygʻonish",
    alarmTask: "Budilnik chalinmoqda. Oʻchir va savolga javob ber.",
    alarmDone: "Budilnik oʻchirildi. Hozir soat necha?",
    alarmQuestion: "Hozir soat necha?",
    alarmOptions: [
      { label: "07:00 ertalab", sub: "Dushanba ertasi" },
      { label: "19:00 kechqurun", sub: "Kechki ovqatdan keyin" },
      { label: "17:00 kunduzi", sub: "Darslardan keyin" },
    ],
    weatherTask: "Telefonda bugungi ob-havo. Koʻr va qaror qil.",
    weatherCity: "Toshkent",
    weatherCondition: "Quyoshli, kunduzi issiq",
    weatherQuestion: "Bugun issiqmi yoki salqinmi?",
    weatherOptions: [
      { label: "Salqin — kurtka kerak" },
      { label: "Issiq — panama kerak" },
    ],
    shelfTask: "Tish pastasini top va ust ustiga bos.",
    shelfHint: "Yorliqqa qara: tish pastasida odatda tish yoki choʻtka chizilgan.",
    shelfItems: [
      { name: "Shampun", target: false },
      { name: "Tish pastasi", target: true },
      { name: "Qoʻl kremi", target: false },
      { name: "Dezodorant", target: false },
      { name: "Dush geli", target: false },
      { name: "Sovun", target: false },
    ],
    timerTask: "Tish tozalash uchun 2 daqiqali taymer qoʻy.",
    timerHint: "Daqiqalardagi «+» tugmasini «2» chiqquncha bos. Keyin «Boshlash».",
    timerMin: "daqiqa",
    timerSec: "soniya",
    timerStart: "Boshlash",
    timerRunning: "Taymer ishlamoqda",
    calendarTask: "Bugun kalendarda — uchta dars. Koʻr.",
    calendarDate: "Bugun · Dushanba",
    calendarEvents: [
      { time: "08:30", subject: "Matematika" },
      { time: "10:10", subject: "Jismoniy tarbiya", highlight: true },
      { time: "11:50", subject: "Rus tili" },
    ],
    calendarQuestion: "Qaysi dars maxsus kiyim talab qiladi?",
    calendarOptions: [
      { label: "Matematika" },
      { label: "Jismoniy tarbiya" },
      { label: "Rus tili" },
    ],
    wardrobeTask: "Shkafni och. Jismoniy tarbiya uchun kerakli narsani ol.",
    wardrobeHint: "Jismoniy tarbiya uchun futbolka va shortik — sport formasi.",
    wardrobeItems: [
      { key: "uniform", name: "Maktab formasi", correct: false },
      { key: "sport", name: "Sport formasi", correct: true },
      { key: "umbrella", name: "Soyabon", correct: false },
      { key: "jacket", name: "Kurtka", correct: false },
    ],
    messageTask: "Oyim xabar yubordi. Oʻqi.",
    messageFrom: "Oyim",
    messageTime: "07:12",
    messageText: "Nonushtadan keyin vitamin ich.",
    messageQuestion: "Oyiga nima javob berasan?",
    messageOptions: [
      { label: "Xoʻp, oyi", sub: "Tinch javob" },
      { label: "Xoʻp", sub: "Qisqa, lekin tushunarli javob" },
      { label: "Yopish, javob bermaslik", sub: "Oyiga javob bermaslik" },
    ],
  },
};

function visibleStep(stage: Stage): number {
  switch (stage) {
    case "alarm":
      return 1;
    case "weather":
      return 2;
    case "shelf":
      return 3;
    case "timer":
      return 4;
    case "calendar":
      return 5;
    case "wardrobe":
      return 6;
    case "message":
      return 7;
    case "done":
      return VISIBLE_STAGES;
  }
}

export function MorningQuestTrainer({ onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [stage, setStage] = useState<Stage>("alarm");
  const [alarmStopped, setAlarmStopped] = useState(false);
  const [calendarPick, setCalendarPick] = useState<number | null>(null);
  const [timerMin, setTimerMin] = useState(0);
  const [timerSec, setTimerSec] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  function next(current: Stage) {
    const i = FLOW.indexOf(current);
    setStage(FLOW[Math.min(i + 1, FLOW.length - 1)]);
  }

  function finish() {
    onDone({ correct: true });
  }

  // ── stage views ──────────────────────────────────────────────

  function alarmView(): StageView {
    const sceneRinging = (
      <div className="mq-app mq-app--alarm">
        <div className="mq-alarm-clock" aria-hidden="true">
          <LessonItemArt id="alarm-clock-0700-realistic" size={110} />
        </div>
        <div className="mq-alarm-time">07:00</div>
        <div className="mq-alarm-name">{t.alarmName}</div>
        <div className="mq-alarm-buttons">
          <button
            type="button"
            className="mq-pill mq-pill--ghost"
            onClick={() => {
              setAlarmStopped(true);
            }}
          >
            {t.alarmSnooze}
          </button>
          <button
            type="button"
            className="mq-pill mq-pill--primary"
            onClick={() => {
              setAlarmStopped(true);
            }}
          >
            {t.alarmStop}
          </button>
        </div>
      </div>
    );

    const sceneStopped = (
      <div className="mq-app mq-app--alarm mq-app--alarm-stopped">
        <div className="mq-clock-face">
          <LessonItemArt id="analog-clock-0700-realistic" size={190} />
        </div>
        <div className="mq-alarm-time">07:00</div>
      </div>
    );

    if (!alarmStopped) {
      return {
        scene: sceneRinging,
        task: t.alarmTask,
        appBackground: "clock",
      };
    }
    return {
      scene: sceneStopped,
      task: t.alarmDone,
      question: t.alarmQuestion,
      options: t.alarmOptions.map((opt, i) => ({
        id: `alarm-${i}`,
        label: opt.label,
        sub: opt.sub,
        onClick: () => {
          setAlarmStopped(false);
          next("alarm");
        },
      })),
      appBackground: "clock",
    };
  }

  function weatherView(): StageView {
    return {
      task: t.weatherTask,
      question: t.weatherQuestion,
      appBackground: "weather",
      scene: (
        <div className="mq-app mq-app--weather">
          <div className="mq-weather-city">{t.weatherCity}</div>
          <LessonItemArt id="weather-hot-realistic" size={142} className="mq-weather-art-image" />
          <div className="mq-weather-temp">+28°</div>
          <div className="mq-weather-cond">{t.weatherCondition}</div>
        </div>
      ),
      options: t.weatherOptions.map((opt, i) => ({
        id: `weather-${i}`,
        label: opt.label,
        sub: opt.sub,
        onClick: () => {
          next("weather");
        },
      })),
    };
  }

  function shelfView(): StageView {
    return {
      task: t.shelfTask,
      hint: t.shelfHint,
      appBackground: "shelf",
      scene: (
        <div className="mq-app mq-app--shelf">
          <div className="mq-shelf-grid">
            {t.shelfItems.map((item) => (
              <button
                key={item.name}
                type="button"
                className="mq-shelf-card"
                onClick={() => {
                  next("shelf");
                }}
              >
                <span className="mq-shelf-art" aria-hidden="true">
                  <ShelfIcon name={item.name} target={item.target} />
                </span>
                <span className="mq-shelf-name">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      ),
    };
  }

  function timerView(): StageView {
    return {
      task: t.timerTask,
      hint: t.timerHint,
      appBackground: "timer",
      scene: (
        <div className="mq-app mq-app--timer">
          <div className="mq-timer-bigdisplay">
            <span>{String(timerMin).padStart(2, "0")}</span>
            <span className="mq-timer-colon">:</span>
            <span>{String(timerSec).padStart(2, "0")}</span>
          </div>
          <div className="mq-timer-rows">
            <div className="mq-timer-row">
              <span className="mq-timer-label">{t.timerMin}</span>
              <div className="mq-stepper">
                <button type="button" onClick={() => setTimerMin((m) => Math.max(0, m - 1))} disabled={timerRunning} aria-label="-">−</button>
                <span className="mq-stepper-value">{timerMin}</span>
                <button type="button" onClick={() => setTimerMin((m) => Math.min(59, m + 1))} disabled={timerRunning} aria-label="+">+</button>
              </div>
            </div>
            <div className="mq-timer-row">
              <span className="mq-timer-label">{t.timerSec}</span>
              <div className="mq-stepper">
                <button type="button" onClick={() => setTimerSec((s) => Math.max(0, s - 15))} disabled={timerRunning} aria-label="-">−</button>
                <span className="mq-stepper-value">{timerSec}</span>
                <button type="button" onClick={() => setTimerSec((s) => Math.min(45, s + 15))} disabled={timerRunning} aria-label="+">+</button>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="mq-timer-start"
            disabled={timerRunning || (timerMin === 0 && timerSec === 0)}
            onClick={() => {
              setTimerRunning(true);
              setTimeout(() => {
                setTimerRunning(false);
                next("timer");
              }, 1100);
            }}
          >
            {timerRunning ? t.timerRunning : t.timerStart}
          </button>
        </div>
      ),
    };
  }

  function calendarView(): StageView {
    return {
      task: t.calendarTask,
      question: t.calendarQuestion,
      appBackground: "calendar",
      scene: (
        <div className="mq-app mq-app--calendar">
          <div className="mq-cal-date">{t.calendarDate}</div>
          <div className="mq-cal-list">
            {t.calendarEvents.map((e) => (
              <div key={e.subject} className={`mq-cal-row${e.highlight ? " mq-cal-row--accent" : ""}`}>
                <span className="mq-cal-time">{e.time}</span>
                <span className="mq-cal-subj">{e.subject}</span>
                {e.highlight ? <span className="mq-cal-flag" aria-hidden="true">⚑</span> : null}
              </div>
            ))}
          </div>
        </div>
      ),
      options: t.calendarOptions.map((opt, i) => ({
        id: `cal-${i}`,
        label: opt.label,
        onClick: () => {
          setCalendarPick(i);
          setTimeout(() => next("calendar"), 350);
        },
      })),
    };
  }

  function wardrobeView(): StageView {
    return {
      task: t.wardrobeTask,
      hint: t.wardrobeHint,
      appBackground: "wardrobe",
      scene: (
        <div className="mq-app mq-app--wardrobe">
          <div className="mq-wardrobe-grid">
            {t.wardrobeItems.map((item) => (
              <button
                key={item.key}
                type="button"
                className="mq-wardrobe-card"
                onClick={() => {
                  next("wardrobe");
                }}
              >
                <span className="mq-wardrobe-art" aria-hidden="true">
                  <ClothingIcon kind={item.key} />
                </span>
                <span className="mq-wardrobe-name">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      ),
    };
  }

  function messageView(): StageView {
    return {
      task: t.messageTask,
      question: t.messageQuestion,
      appBackground: "message",
      scene: (
        <div className="mq-app mq-app--message">
          <div className="mq-msg-head">
            <span className="mq-msg-back" aria-hidden="true">‹</span>
            <span className="mq-msg-avatar" aria-hidden="true">
              {t.messageFrom[0]}
            </span>
            <div className="mq-msg-titles">
              <strong>{t.messageFrom}</strong>
              <small>online ·{t.messageTime}</small>
            </div>
          </div>
          <div className="mq-msg-bubble">
            <p>{t.messageText}</p>
            <small>{t.messageTime}</small>
          </div>
        </div>
      ),
      options: t.messageOptions.map((opt, i) => ({
        id: `msg-${i}`,
        label: opt.label,
        sub: opt.sub,
        onClick: () => {
          next("message");
        },
      })),
    };
  }

  function doneView(): StageView {
    return {
      task: t.doneHint,
      appBackground: "done",
      scene: (
        <div className="mq-app mq-app--done">
          <div className="mq-done-tick" aria-hidden="true">
            <CabinetIcon name="check" />
          </div>
          <strong>{t.doneTitle}</strong>
          <p>{t.doneHint}</p>
        </div>
      ),
    };
  }

  const view: StageView =
    stage === "alarm"
      ? alarmView()
      : stage === "weather"
        ? weatherView()
        : stage === "shelf"
          ? shelfView()
          : stage === "timer"
            ? timerView()
            : stage === "calendar"
              ? calendarView()
              : stage === "wardrobe"
                ? wardrobeView()
                : stage === "message"
                  ? messageView()
                  : doneView();

  const step = visibleStep(stage);
  const isDone = stage === "done";
  const showSkip = !isDone && !(stage === "alarm" && !alarmStopped);

  function handleSkip() {
    if (stage === "alarm") {
      setAlarmStopped(false);
    }
    next(stage);
  }

  // suppress unused variable lint — kept for future answer-summary on done
  void calendarPick;

  return (
    <div className="morning-quest-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark" aria-hidden="true">★</span>
          <div>
            <strong>{t.appTitle}</strong>
            <small>{t.stageCounter(step)}</small>
          </div>
        </div>
        <div className="mq-topbar-progress" aria-hidden="true">
          {Array.from({ length: VISIBLE_STAGES }).map((_, i) => (
            <span
              key={i}
              className={`mq-topbar-dot${step > i + 1 || isDone ? " mq-topbar-dot--done" : ""}${step === i + 1 && !isDone ? " mq-topbar-dot--current" : ""}`}
            />
          ))}
        </div>
      </header>

      <div className="mq-shell">
        <div className="mq-phone-col">
          <div className={`mq-phone mq-phone--${view.appBackground ?? APP_BY_STAGE[stage]}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">07:0{Math.min(step, 9)}</span>
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
            <div className="mq-phone-content">{view.scene}</div>
            <div className="mq-phone-home" aria-hidden="true" />
          </div>
        </div>

        <aside className="mq-panel">
          <div className="mq-panel-task">
            <span className="mq-eyebrow">{t.taskEyebrow}</span>
            <p className="mq-panel-task-text">{view.task}</p>
          </div>

          {view.question ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{view.question}</h3>
              {view.options ? (
                <div className="mq-panel-options">
                  {view.options.map((opt, i) => (
                    <button
                      key={opt.id}
                      type="button"
                      className="mq-panel-option"
                      onClick={opt.onClick}
                    >
                      <span className="mq-panel-option-num">{i + 1}</span>
                      <span className="mq-panel-option-body">
                        <strong>{opt.label}</strong>
                        {opt.sub ? <small>{opt.sub}</small> : null}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {!view.question && view.hint ? (
            <div className="mq-panel-hint">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>{view.hint}</p>
            </div>
          ) : (
            <div className="mq-panel-hint mq-panel-hint--muted">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>{view.hint ?? t.hintDefault}</p>
            </div>
          )}

          <div className="mq-panel-footer">
            {isDone ? (
              <button type="button" className="mq-panel-primary" onClick={finish}>
                {t.finish}
              </button>
            ) : showSkip ? (
              <button type="button" className="mq-panel-skip" onClick={handleSkip}>
                {t.skip}
              </button>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}

// ── small inline illustrations ─────────────────────────────────────────

function ShelfIcon({ name, target }: { name: string; target: boolean }) {
  let artId: LessonItemArtId = "soap";
  if (target || name.includes("below") || name.includes("astasi")) {
    artId = "toothpaste";
  } else if (name.includes("Shampoo") || name.includes("Shampun") || name.includes("Gel") || name.includes("Dush")) {
    artId = "shampoo";
  } else if (name.includes("Cream") || name.includes("krem") || name.includes("Lotion")) {
    artId = "face-cream";
  } else if (name.includes("Dezod") || name.includes("Dezod")) {
    artId = "deodorant";
  }

  return <LessonItemArt id={artId} size={78} />;
}

function ClothingIcon({ kind }: { kind: string }) {
  switch (kind) {
    case "uniform":
      return <LessonItemArt id="school-uniform" size={86} />;
    case "sport":
      return <LessonItemArt id="sport-outfit" size={86} />;
    case "umbrella":
      return <LessonItemArt id="umbrella" size={86} />;
    case "jacket":
      return <LessonItemArt id="jacket" size={86} />;
    default:
      return null;
  }
}
