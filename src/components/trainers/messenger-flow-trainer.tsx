"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { MessengerFlowTrainer as MessengerFlowTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: MessengerFlowTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type CaseKey = "friend" | "teacher" | "stranger";
type Stage = CaseKey | "done";
const FLOW: Stage[] = ["friend", "teacher", "stranger", "done"];
const STEPS = 3;

type Reply = { id: string; text: string; ok: boolean; sub: string };

const CASES: Record<CaseKey, { from: string; message: string; avatarArt: LessonItemArtId; time: string; replies: Reply[] }> = {
  friend: {
    from: "Bahrom",
    message: "Hello! Shall we go to the park on Saturday?",
    avatarArt: "polite-message",
    time: "16:42",
    replies: [
      { id: "ok", text: "Okay, let's go on Saturday!", ok: true, sub: "Calm friendly response" },
      { id: "rude", text: "Don't bother me, I won't go", ok: false, sub: "Rough for a friend" },
      { id: "no-reply", text: "Don't answer", ok: false, sub: "A friend can't be ignored" },
    ],
  },
  teacher: {
    from: "Teacher",
    message: "Bring your sports uniform to physical education tomorrow.",
    avatarArt: "chat-phone",
    time: "18:10",
    replies: [
      { id: "ok", text: "Okay, I'll bring it. Thank you.", ok: true, sub: "Polite reply" },
      { id: "ignore", text: "OK", ok: false, sub: "It is better for the teacher to answer in a complete sentence." },
      { id: "rude", text: "What again?!", ok: false, sub: "Rude to an adult" },
    ],
  },
  stranger: {
    from: "Stranger",
    message: "Hello. Send me your address - I want to give you a gift.",
    avatarArt: "safety-shield",
    time: "23:08",
    replies: [
      { id: "share", text: "Of course, my address: st. Navoi 15", ok: false, sub: "Address to a stranger is not allowed" },
      { id: "polite", text: "I don't know you. I won't send it.", ok: true, sub: "Safe failure" },
      { id: "ask", text: "Who are you?", ok: false, sub: "It's better to refuse right away" },
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
  hints: Record<CaseKey, string>;
  feedbackGood: string;
  feedbackSoft: string;
}> = {
  ru: {
    appTitle: "Messenger",
    stepCounter: (n) => `Chat${n}from${STEPS}`,
    taskEyebrow: "Message",
    questionEyebrow: "Choose an answer",
    hintEyebrow: "Clue",
    feedbackEyebrow: "Checking",
    skip: "Don't know",
    finish: "Finish",
    retry: "Try again",
    next: "Next chat",
    doneTitle: "Well done! You communicate politely in chats.",
    doneHint: "Friends - calm down; adults - politely; strangers - without personal data.",
    hints: {
      friend: "To a friend - a simple friendly answer.",
      teacher: "For an adult - a polite answer in words.",
      stranger: "Do not give personal information to a stranger, even for a gift.",
    },
    feedbackGood: "Right! This is a good answer.",
    feedbackSoft: "This answer is not suitable. Think again.",
  },
  uz: {
    appTitle: "Messenjer",
    stepCounter: (n) => `${n} / ${STEPS}-suhbat`,
    taskEyebrow: "Xabar",
    questionEyebrow: "Javobni tanla",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    finish: "Yakunlash",
    retry: "Qayta urinish",
    next: "Keyingi suhbat",
    doneTitle: "Yashasin! Sen muloqotda xushmuomalasan.",
    doneHint: "Doʻstga — tinch; kattaga — xushmuomala; notanishga — shaxsiy maʼlumotsiz.",
    hints: {
      friend: "Doʻstga — oddiy doʻstona javob.",
      teacher: "Kattaga — xushmuomala javob soʻzlar bilan.",
      stranger: "Notanishga shaxsiy maʼlumot bermang.",
    },
    feedbackGood: "Toʻgʻri! Bu yaxshi javob.",
    feedbackSoft: "Bu javob mos emas. Qaytadan oʻylab koʻr.",
  },
};

export function MessengerFlowTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [stage, setStage] = useState<Stage>("friend");
  const [picked, setPicked] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  const isDone = stage === "done";
  const step = isDone ? STEPS : FLOW.indexOf(stage) + 1;
  const c = isDone ? null : CASES[stage as CaseKey];

  function tap(reply: Reply) {
    if (feedback) return;
    setPicked(reply.id);
    answers.current[`msg-${stage}`] = { picked: reply.id, correct: reply.ok };
    setFeedback(reply.ok ? "good" : "soft");
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
    <div className="msgflow-app msgflow-app--done">
      <div className="outfit-done-tick" aria-hidden="true">
        <CabinetIcon name="check" />
      </div>
      <strong>{t.doneTitle}</strong>
      <p>{t.doneHint}</p>
    </div>
  ) : c ? (
    <div className="msgflow-app">
      <div className="msgflow-header">
        <span className="msgflow-back" aria-hidden="true">‹</span>
        <span className="msgflow-avatar" aria-hidden="true">
          <LessonItemArt id={c.avatarArt} size={34} />
        </span>
        <div className="msgflow-titles">
          <strong>{c.from}</strong>
          <small>online</small>
        </div>
      </div>
      <div className="msgflow-thread">
        <div className="msgflow-bubble msgflow-bubble--them">
          <p>{c.message}</p>
          <small>{c.time}</small>
        </div>
        {picked && feedback === "good" ? (
          <div className="msgflow-bubble msgflow-bubble--me">
            <p>{c.replies.find((r) => r.id === picked)?.text}</p>
            <small>{c.time} ✓✓</small>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;

  return (
    <div className="morning-quest-trainer msgflow-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark msgflow-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6 L20 6 L20 16 L8 16 L4 20 Z" />
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
          <div className={`mq-phone mq-phone--msgflow-${stage}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">13:0{step}</span>
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
            <p className="mq-panel-task-text">{c ? `${c.from}: «${c.message}»` : t.doneHint}</p>
          </div>

          {c && !feedback ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>What to answer?</h3>
              <div className="mq-panel-options">
                {c.replies.map((r, i) => (
                  <button key={r.id} type="button" className={`mq-panel-option${picked === r.id ? " mq-panel-option--picked" : ""}`} onClick={() => tap(r)}>
                    <span className="mq-panel-option-num">{i + 1}</span>
                    <span className="mq-panel-option-body">
                      <strong>{r.text}</strong>
                      <small>{r.sub}</small>
                    </span>
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
                  <button type="button" className="mq-panel-primary" onClick={advance}>{stage === "stranger" ? t.finish : t.next}</button>
                ) : (
                  <button type="button" className="mq-panel-primary outfit-retry" onClick={retry}>{t.retry}</button>
                )}
              </div>
            </div>
          ) : c ? (
            <div className="mq-panel-hint">
              <span className="mq-eyebrow">{t.hintEyebrow}</span>
              <p>{t.hints[stage as CaseKey]}</p>
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
