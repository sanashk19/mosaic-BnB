"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { OutfitTrainer as OutfitTrainerData } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type Props = {
  trainer: OutfitTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Situation = "school" | "sports" | "party" | "done";
const FLOW: Situation[] = ["school", "sports", "party", "done"];
const SITUATION_COUNT = 3;

type TopKey = "school-shirt" | "sport-tee" | "party-shirt";
type BottomKey = "school-pants" | "sport-shorts" | "party-pants";

type Pick = { top: TopKey | null; bottom: BottomKey | null };

type Locales<T> = Record<Locale, T>;

const TOP_ART: Record<TopKey, LessonItemArtId> = {
  "school-shirt": "outfit-school-shirt",
  "sport-tee": "outfit-sport-tee",
  "party-shirt": "outfit-party-shirt",
};

const BOTTOM_ART: Record<BottomKey, LessonItemArtId> = {
  "school-pants": "outfit-school-pants",
  "sport-shorts": "outfit-sport-shorts",
  "party-pants": "outfit-party-pants",
};

function fullOutfitArt(pick: Pick): LessonItemArtId | null {
  if (pick.top === "school-shirt" && pick.bottom === "school-pants") return "outfit-school-full";
  if (pick.top === "sport-tee" && pick.bottom === "sport-shorts") return "outfit-sport-full";
  if (pick.top === "party-shirt" && pick.bottom === "party-pants") return "outfit-party-full";
  return null;
}

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
  ready: string;
  retry: string;
  doneTitle: string;
  doneHint: string;
  silhouettePrompt: string;
  pickTop: string;
  pickBottom: string;
  tops: Record<TopKey, string>;
  bottoms: Record<BottomKey, string>;
  situations: Record<
    Exclude<Situation, "done">,
    {
      label: string;
      task: string;
      question: string;
      hint: string;
      correctTop: TopKey;
      correctBottom: BottomKey;
      feedbackGood: string;
      feedbackSoft: string;
    }
  >;
}> = {
  ru: {
    appTitle: "Цифровой шкаф",
    stepCounter: (n) => `Образ ${n} из ${SITUATION_COUNT}`,
    taskEyebrow: "Ситуация",
    questionEyebrow: "Что надеть",
    hintEyebrow: "Подсказка",
    feedbackEyebrow: "Проверка",
    skip: "Не знаю",
    next: "Следующая ситуация",
    finish: "Закончить",
    ready: "Готово",
    retry: "Попробовать снова",
    doneTitle: "Молодец! Три образа собраны.",
    doneHint: "Ты научился подбирать одежду под ситуацию.",
    silhouettePrompt: "Нажми на верх и низ — они появятся на силуэте.",
    pickTop: "Верх",
    pickBottom: "Низ",
    tops: {
      "school-shirt": "Школьная рубашка",
      "sport-tee": "Спортивная футболка",
      "party-shirt": "Нарядная рубашка",
    },
    bottoms: {
      "school-pants": "Школьные брюки",
      "sport-shorts": "Спортивные шорты",
      "party-pants": "Нарядные брюки",
    },
    situations: {
      school: {
        label: "В школу",
        task: "Утром понедельник. Идёшь в школу на уроки.",
        question: "Подбери одежду для школы.",
        hint: "В школу — школьная форма: рубашка и брюки. Не шорты.",
        correctTop: "school-shirt",
        correctBottom: "school-pants",
        feedbackGood: "Верно. В школу — школьная форма.",
        feedbackSoft: "Это не для школы. В школе носят форму.",
      },
      sports: {
        label: "На физкультуру",
        task: "Третий урок — физкультура. Бегаем и прыгаем.",
        question: "Подбери одежду для физкультуры.",
        hint: "На физкультуру — спортивное: футболка и шорты.",
        correctTop: "sport-tee",
        correctBottom: "sport-shorts",
        feedbackGood: "Верно. Для спорта — лёгкая спортивная форма.",
        feedbackSoft: "В этом неудобно бегать. Возьми спортивную форму.",
      },
      party: {
        label: "На день рождения друга",
        task: "Вечером — день рождения друга. Будет торт и гости.",
        question: "Подбери нарядную одежду.",
        hint: "На праздник — нарядное: рубашка и брюки. Не спортивное.",
        correctTop: "party-shirt",
        correctBottom: "party-pants",
        feedbackGood: "Отлично. На праздник — нарядный образ.",
        feedbackSoft: "На день рождения так не ходят. Возьми нарядное.",
      },
    },
  },
  uz: {
    appTitle: "Raqamli shkaf",
    stepCounter: (n) => `${n} / ${SITUATION_COUNT}-obraz`,
    taskEyebrow: "Vaziyat",
    questionEyebrow: "Nima kiyish",
    hintEyebrow: "Maslahat",
    feedbackEyebrow: "Tekshiruv",
    skip: "Bilmayman",
    next: "Keyingi vaziyat",
    finish: "Yakunlash",
    ready: "Tayyor",
    retry: "Qayta urinib koʻrish",
    doneTitle: "Yashasin! Uchta obraz tayyor.",
    doneHint: "Sen vaziyatga moslab kiyim tanlashni oʻrganding.",
    silhouettePrompt: "Tepa va pasti bos — ular siluetda paydo boʻladi.",
    pickTop: "Tepa",
    pickBottom: "Past",
    tops: {
      "school-shirt": "Maktab koʻylagi",
      "sport-tee": "Sport futbolkasi",
      "party-shirt": "Bayram koʻylagi",
    },
    bottoms: {
      "school-pants": "Maktab shimi",
      "sport-shorts": "Sport shorti",
      "party-pants": "Bayram shimi",
    },
    situations: {
      school: {
        label: "Maktabga",
        task: "Dushanba ertasi. Maktabga darsga ketyapsan.",
        question: "Maktab uchun kiyim tanla.",
        hint: "Maktabga — maktab formasi: koʻylak va shim. Short emas.",
        correctTop: "school-shirt",
        correctBottom: "school-pants",
        feedbackGood: "Toʻgʻri. Maktabga — maktab formasi.",
        feedbackSoft: "Bu maktab uchun emas. Maktabda forma kiyiladi.",
      },
      sports: {
        label: "Jismoniy tarbiyaga",
        task: "Uchinchi dars — jismoniy tarbiya. Yuguramiz va sakraymiz.",
        question: "Jismoniy tarbiya uchun kiyim tanla.",
        hint: "Jismoniy tarbiya — sport: futbolka va short.",
        correctTop: "sport-tee",
        correctBottom: "sport-shorts",
        feedbackGood: "Toʻgʻri. Sport uchun — yengil sport formasi.",
        feedbackSoft: "Bunda yugurish noqulay. Sport formasini ol.",
      },
      party: {
        label: "Doʻstning tugʻilgan kuniga",
        task: "Kechqurun — doʻstning tugʻilgan kuni. Tort va mehmonlar.",
        question: "Bayramona kiyim tanla.",
        hint: "Bayramga — bayramona: koʻylak va shim. Sport emas.",
        correctTop: "party-shirt",
        correctBottom: "party-pants",
        feedbackGood: "Ajoyib. Bayramga — bayramona obraz.",
        feedbackSoft: "Tugʻilgan kunga bunday kelinmaydi. Bayramona ol.",
      },
    },
  },
};

export function OutfitTrainer({ trainer, onDone }: Props) {
  const locale = useLocale();
  const t = dict[locale];

  const [situation, setSituation] = useState<Situation>("school");
  const [pick, setPick] = useState<Pick>({ top: null, bottom: null });
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);
  const answers = useRef<Record<string, unknown>>({});

  function isDone() {
    return situation === "done";
  }

  function currentSit() {
    if (situation === "done") return null;
    return t.situations[situation];
  }

  function tryDone() {
    const sit = currentSit();
    if (!sit || !pick.top || !pick.bottom) return;
    const correct = pick.top === sit.correctTop && pick.bottom === sit.correctBottom;
    answers.current[`outfit-${situation}`] = { top: pick.top, bottom: pick.bottom, correct };
    setFeedback(correct ? "good" : "soft");
  }

  function advance() {
    const i = FLOW.indexOf(situation);
    setSituation(FLOW[Math.min(i + 1, FLOW.length - 1)]);
    setPick({ top: null, bottom: null });
    setFeedback(null);
  }

  function retry() {
    setFeedback(null);
    setPick({ top: null, bottom: null });
  }

  function skip() {
    answers.current[`skip-${situation}`] = true;
    advance();
  }

  function finish() {
    onDone({ correct: true });
  }

  const sit = currentSit();
  const step = situation === "done" ? SITUATION_COUNT : FLOW.indexOf(situation) + 1;
  const showSkip = !isDone() && !feedback;

  // ── Phone scene ──
  let scene: ReactNode;
  if (isDone()) {
    scene = (
      <div className="outfit-app outfit-app--done">
        <div className="outfit-done-tick" aria-hidden="true">
          <CabinetIcon name="check" />
        </div>
        <strong>{t.doneTitle}</strong>
        <p>{t.doneHint}</p>
      </div>
    );
  } else if (sit) {
    scene = (
      <div className={`outfit-app outfit-app--${situation}`}>
        <div className="outfit-situation-card">
          <span className="outfit-situation-emoji" aria-hidden="true">
            <SituationGlyph kind={situation as Exclude<Situation, "done">} />
          </span>
          <strong>{sit.label}</strong>
        </div>

        <div className="outfit-mannequin">
          <OutfitMannequin pick={pick} />
        </div>
      </div>
    );
  }

  // ── Panel content ──
  const task = isDone() ? t.doneHint : sit?.task ?? "";
  const question = isDone() ? undefined : sit?.question;
  const hint = sit?.hint ?? "";

  void trainer;

  return (
    <div className="morning-quest-trainer outfit-trainer">
      <header className="mq-topbar">
        <div className="mq-topbar-left">
          <span className="mq-topbar-mark outfit-topbar-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7 L8 4 L16 4 L20 7 L17 11 L15 9 L15 20 L9 20 L9 9 L7 11 Z" />
            </svg>
          </span>
          <div>
            <strong>{t.appTitle}</strong>
            <small>{t.stepCounter(step)}</small>
          </div>
        </div>
        <div className="mq-topbar-progress" aria-hidden="true">
          {Array.from({ length: SITUATION_COUNT }).map((_, i) => (
            <span
              key={i}
              className={`mq-topbar-dot${step > i + 1 || isDone() ? " mq-topbar-dot--done" : ""}${step === i + 1 && !isDone() ? " mq-topbar-dot--current" : ""}`}
            />
          ))}
        </div>
      </header>

      <div className="mq-shell">
        <div className="mq-phone-col">
          <div className={`mq-phone mq-phone--outfit-${situation}`}>
            <div className="mq-phone-statusbar">
              <span className="mq-phone-time">07:1{Math.min(step, 9)}</span>
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
            <p className="mq-panel-task-text">{task}</p>
          </div>

          {question ? (
            <div className="mq-panel-question">
              <span className="mq-eyebrow">{t.questionEyebrow}</span>
              <h3>{question}</h3>
              {!feedback ? (
                <div className="outfit-rack">
                  <div className="outfit-rack-group">
                    <span className="outfit-rack-label">{t.pickTop}</span>
                    <div className="outfit-rack-row">
                      {(["school-shirt", "sport-tee", "party-shirt"] as TopKey[]).map((key) => (
                        <button
                          type="button"
                          key={key}
                          className={`outfit-hanger${pick.top === key ? " outfit-hanger--active" : ""}`}
                          onClick={() => setPick((p) => ({ ...p, top: key }))}
                          aria-pressed={pick.top === key}
                        >
                          <span className="outfit-hanger-art">
                            <TopIcon kind={key} />
                          </span>
                          <span className="outfit-hanger-label">{t.tops[key]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="outfit-rack-group">
                    <span className="outfit-rack-label">{t.pickBottom}</span>
                    <div className="outfit-rack-row">
                      {(["school-pants", "sport-shorts", "party-pants"] as BottomKey[]).map((key) => (
                        <button
                          type="button"
                          key={key}
                          className={`outfit-hanger${pick.bottom === key ? " outfit-hanger--active" : ""}`}
                          onClick={() => setPick((p) => ({ ...p, bottom: key }))}
                          aria-pressed={pick.bottom === key}
                        >
                          <span className="outfit-hanger-art">
                            <BottomIcon kind={key} />
                          </span>
                          <span className="outfit-hanger-label">{t.bottoms[key]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="outfit-ready"
                    onClick={tryDone}
                    disabled={!pick.top || !pick.bottom}
                  >
                    {t.ready}
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}

          {feedback && sit ? (
            <div className={`outfit-feedback outfit-feedback--${feedback}`}>
              <span className="mq-eyebrow">{t.feedbackEyebrow}</span>
              <p>{feedback === "good" ? sit.feedbackGood : sit.feedbackSoft}</p>
              <div className="outfit-feedback-actions">
                {feedback === "good" ? (
                  <button type="button" className="mq-panel-primary" onClick={advance}>
                    {situation === "party" ? t.finish : t.next}
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
              <p>{hint}</p>
            </div>
          ) : null}

          <div className="mq-panel-footer">
            {isDone() ? (
              <button type="button" className="mq-panel-primary" onClick={finish}>
                {t.finish}
              </button>
            ) : showSkip ? (
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

function SituationGlyph({ kind }: { kind: Exclude<Situation, "done"> }) {
  const art: Record<Exclude<Situation, "done">, LessonItemArtId> = {
    school: "outfit-school-full",
    sports: "outfit-sport-full",
    party: "outfit-party-full",
  };

  return <LessonItemArt id={art[kind]} size={30} className="outfit-situation-art" />;
}

function OutfitMannequin({ pick }: { pick: Pick }) {
  const fullArt = fullOutfitArt(pick);

  return (
    <div className="outfit-mannequin-figure" aria-hidden="true">
      <LessonItemArt id={fullArt ?? "outfit-student-base"} size={210} className="outfit-person-art" />
      {!fullArt && pick.top ? (
        <span className="outfit-layer outfit-layer--top">
          <LessonItemArt id={TOP_ART[pick.top]} size={126} />
        </span>
      ) : null}
      {!fullArt && pick.bottom ? (
        <span className="outfit-layer outfit-layer--bottom">
          <LessonItemArt id={BOTTOM_ART[pick.bottom]} size={116} />
        </span>
      ) : null}
    </div>
  );
}

// Hanger icons (in the wardrobe rack)

function TopIcon({ kind }: { kind: TopKey }) {
  return <LessonItemArt id={TOP_ART[kind]} size={64} />;
}

function BottomIcon({ kind }: { kind: BottomKey }) {
  return <LessonItemArt id={BOTTOM_ART[kind]} size={64} />;
}
