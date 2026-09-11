"use client";

/* UI Component */

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import {
  WashingMachineMockup,
  AtmMockup,
  ThermometerMockup,
  VolumeMockup,
  WeatherMockup,
  ProductLabelMockup,
  MessengerMockup,
  TrainBoardMockup,
  TrackingMockup,
  SkinQuizMockup,
  ChecklistMockup,
  MenuMockup,
  RecipeMockup,
  BudgetFormMockup,
  GovPortalMockup,
  ContractMockup,
  TransportDirectoryMockup,
  WardrobeMockup,
  TableSettingMockup,
  ShampooStoreMockup,
  WeeklyWeatherMockup,
  CareLabelMockup,
  DetergentBoxMockup,
  OvenTimerMockup,
  TicketBookingMockup,
  PhoneCallMockup,
  SafetyCardsMockup,
  DiagnosticPlatformMockup,
  HygieneShelfMockup,
} from "@/components/lesson-mockups";
import { ICON_MAP } from "@/components/lesson-icons";

/* UI Component */
function Illustration({ name }: { name?: string }) {
  if (!name) return null;
  const Comp = ICON_MAP[name];
  if (Comp) return <Comp />;
  return <span>{name}</span>;
}
import type {
  Hotspot,
  InfoCard,
  InstructionStep,
  LessonScreen,
  LessonScreens,
  PracticeMockup,
  PracticeTrial,
  WarmupQuestion,
} from "@/lib/lesson-screens-types";

type LessonPlayerProps = {
  screens: LessonScreens;
  lessonTitle: string;
};

const englishPlayerDict = {
  screen: "Screen",
  of: "of",
  next: "Next",
  back: "Back",
  listen: "Listen",
  help: "Help",
  correct: "Correct!",
  tryAgain: "Try again",
  finish: "Complete Lesson",
  completed: "Well done! Lesson completed",
  showHint: "How to find out?",
  repeatAll: "Review all",
  canUse: "Allowed to use",
  cannotUse: "Do not use",
  sortTask: "Sort into groups",
  moodTitle: "How was the lesson?",
  homeTask: "Home activity",
  breakTitle: "Movement break",
  diagPoint1: "Diagnostic Check 1",
  diagPoint2: "Diagnostic Check 2",
  diagPoint3: "Diagnostic Check 3 - Key skill",
  yourGoal: "Our goal",
  objectName: "Lesson topic",
  item: "Item",
  trial: "Attempt",
};

const dict = {
  ru: englishPlayerDict,
  uz: englishPlayerDict,
} as const;

// ── Helpers ───────────────────────────────────────────────────────────────

function speak(text: string, _locale?: "ru" | "uz") {
  void _locale;
  if (typeof window === "undefined") return;
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 0.9;
  utter.pitch = 1;
  synth.speak(utter);
}

function ListenButton({ text }: { text: string }) {
  const locale = useLocale();
  const t = dict[locale];
  return (
    <button
      type="button"
      className="lp-listen"
      onClick={() => speak(text, locale)}
      aria-label={t.listen}
    >
      {t.listen}
    </button>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const locale = useLocale();
  const t = dict[locale];
  return (
    <div className="lp-progress" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={current + 1}>
      <div className="lp-progress-bar">
        <div className="lp-progress-fill" style={{ width: `${((current + 1) / total) * 100}%` }} />
      </div>
      <span className="lp-progress-label">
        {t.screen} {current + 1} {t.of} {total}
      </span>
    </div>
  );
}

// ── Per-screen renderers ──────────────────────────────────────────────────

function WarmupScreen({
  screen,
  onComplete,
}: {
  screen: Extract<LessonScreen, { type: "warmup" }>;
  onComplete: () => void;
}) {
  const locale = useLocale();
  const t = dict[locale];
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const q: WarmupQuestion = screen.questions[qIdx];
  const answered = picked !== null;
  const correct = answered && picked === q.correctIndex;

  const next = () => {
    if (qIdx < screen.questions.length - 1) {
      setQIdx(qIdx + 1);
      setPicked(null);
    } else {
      onComplete();
    }
  };

  return (
    <div className="lp-screen lp-warmup">
      <header className="lp-screen-head">
        <h2>{screen.title}</h2>
        <p className="lp-muted">{screen.prevLessonTitle}</p>
        <ListenButton text={`${screen.title}. ${screen.prevLessonTitle}`} />
      </header>

      <div className="lp-question-card">
        <p className="lp-question">{q.text}</p>
        <div className="lp-options">
          {q.options.map((opt, i) => (
            <button
              key={i}
              type="button"
              className={`lp-option ${picked === i ? (i === q.correctIndex ? "is-correct" : "is-wrong") : ""}`}
              disabled={answered}
              onClick={() => setPicked(i)}
            >
              <span className="lp-option-marker">{i + 1}</span>
              <span>{opt}</span>
            </button>
          ))}
        </div>
        {answered ? (
          <div className={`lp-feedback ${correct ? "good" : "soft"}`}>
            <strong>{correct ? t.correct : t.tryAgain}</strong>
            {q.feedback ? <p>{q.feedback}</p> : null}
            <button type="button" className="lp-next" onClick={next}>
              {t.next} →
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MotivationScreen({
  screen,
  onComplete,
}: {
  screen: Extract<LessonScreen, { type: "motivation" }>;
  onComplete: () => void;
}) {
  const locale = useLocale();
  const t = dict[locale];
  const [hintOpen, setHintOpen] = useState(false);
  return (
    <div className="lp-screen lp-motivation">
      <header className="lp-screen-head">
        <h2>{screen.title}</h2>
        <ListenButton text={`${screen.title}. ${screen.problemText}`} />
      </header>

      <div className="lp-motivation-stage">
        {screen.altItems ? (
          <div className="lp-motivation-pair" aria-hidden="true">
            <div className="lp-motivation-item"><Illustration name={screen.altItems[0]} /></div>
            <div className="lp-motivation-item"><Illustration name={screen.altItems[1]} /></div>
          </div>
        ) : screen.problemIllustration ? (
          <div className="lp-motivation-illustration"><Illustration name={screen.problemIllustration} /></div>
        ) : null}

        <p className="lp-motivation-text">{screen.problemText}</p>

        {!hintOpen ? (
          <button type="button" className="lp-hint-btn" onClick={() => setHintOpen(true)}>
            {t.showHint}
          </button>
        ) : (
          <div className="lp-hint-box">
            <strong>Hint:</strong>
            <p>{screen.hint}</p>
          </div>
        )}

        <div className="lp-goal-card">
          <span>{t.yourGoal}</span>
          <p>{screen.goalText}</p>
        </div>
      </div>

      <div className="lp-actions">
        <button type="button" className="lp-next" onClick={onComplete}>
          {t.next} →
        </button>
      </div>
    </div>
  );
}

function InfoCardsScreen({
  screen,
  onComplete,
}: {
  screen: Extract<LessonScreen, { type: "info-cards" }>;
  onComplete: () => void;
}) {
  const locale = useLocale();
  const t = dict[locale];
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="lp-screen lp-info-cards">
      <header className="lp-screen-head">
        <h2>{screen.title}</h2>
        <ListenButton text={screen.title} />
      </header>

      <div className="lp-cards-grid">
        {screen.cards.map((card: InfoCard, i: number) => (
          <article
            key={i}
            className={`lp-info-card ${openIdx === i ? "is-open" : ""}`}
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
          >
            {card.illustration ? <div className="lp-info-illu"><Illustration name={card.illustration} /></div> : null}
            <h3>{card.title}</h3>
            <p>{card.body}</p>
            <ListenButton text={`${card.title}. ${card.body}`} />
          </article>
        ))}
      </div>

      <div className="lp-actions">
        <button type="button" className="lp-next" onClick={onComplete}>
          {t.next} →
        </button>
      </div>
    </div>
  );
}

/* UI Component */
function renderShowcaseMockup(
  mockup: PracticeMockup | undefined,
  onInteraction?: (correct: boolean, msg: string) => void,
): React.ReactNode | null {
  if (!mockup) return null;
  const noop = (correct: boolean = true, msg: string = "") => onInteraction?.(correct, msg);

  switch (mockup.kind) {
    case "thermometer":
      return (
        <ThermometerMockup
          value={mockup.value}
          onClassify={(choice) => noop(choice === mockup.correctZone, `Zone: ${choice}`)}
        />
      );
    case "atm":
      return <AtmMockup amount={mockup.amount} pin={mockup.pin} onResult={(ok, a) => noop(ok, a)} />;
    case "washing-machine":
      return (
        <WashingMachineMockup
          itemLabel={mockup.itemLabel}
          itemEmoji={mockup.itemEmoji}
          hint={mockup.hint}
          programs={mockup.programs}
          onResult={(ok, label) => noop(ok, label)}
        />
      );
    case "volume-slider":
      return <VolumeMockup onSubmit={(v, ok) => noop(ok, String(v))} />;
    case "weather":
      return (
        <WeatherMockup
          temp={mockup.temp}
          uv={mockup.uv}
          icon={mockup.icon}
          onAdvice={(adv) => noop(adv === mockup.correctAdvice, adv)}
        />
      );
    case "product-label":
      return (
        <ProductLabelMockup
          productName={mockup.productName}
          productEmoji={mockup.productEmoji}
          expiryYear={mockup.expiryYear}
          currentYear={mockup.currentYear}
          onDecide={() => noop(true, "")}
        />
      );
    case "messenger":
      return (
        <MessengerMockup
          contact={mockup.contact}
          incoming={mockup.incoming}
          options={mockup.options}
          onSend={(i) => noop(mockup.options[i].correct, mockup.options[i].text)}
        />
      );
    case "train-board":
      return (
        <TrainBoardMockup
          targetTrain={mockup.targetTrain}
          targetTime={mockup.targetTime}
          rows={mockup.rows}
          onPick={(i) => noop(i === mockup.correctIndex, mockup.rows[i].train)}
        />
      );
    case "package-tracking":
      return (
        <TrackingMockup
          trackNumber={mockup.trackNumber}
          expectedStatus={mockup.expectedStatus}
          onSubmit={(e) => noop(e === mockup.trackNumber, e)}
        />
      );
    case "skin-quiz":
      return (
        <SkinQuizMockup
          questions={mockup.questions}
          correctType={mockup.correctType}
          onResult={(ok) => noop(ok, "")}
        />
      );
    case "checklist":
      return (
        <ChecklistMockup
          title={mockup.title}
          steps={mockup.steps}
          onComplete={() => noop(true, "")}
        />
      );
    case "menu":
      return (
        <MenuMockup
          task={mockup.task}
          dishes={mockup.dishes}
          onPick={(ok, name) => noop(ok, name)}
        />
      );
    case "recipe":
      return (
        <RecipeMockup
          recipeName={mockup.recipeName}
          emoji={mockup.emoji}
          ingredients={mockup.ingredients}
          question={mockup.question}
          options={mockup.options}
          onAnswer={(ok) => noop(ok, "")}
        />
      );
    case "budget-form":
      return (
        <BudgetFormMockup
          mode={mockup.mode}
          fields={mockup.fields}
          expectedTotal={mockup.expectedTotal}
          comparisonValue={mockup.comparisonValue}
          onSubmit={(ok) => noop(ok, "")}
        />
      );
    case "gov-portal":
      return (
        <GovPortalMockup
          serviceName={mockup.serviceName}
          fields={mockup.fields}
          expectedValues={mockup.expectedValues}
          onSubmit={(ok) => noop(ok, "")}
        />
      );
    case "contract":
      return (
        <ContractMockup
          contract={mockup.contract}
          question={mockup.question}
          onPick={(ok, line) => noop(ok, line)}
        />
      );
    case "transport-directory":
      return (
        <TransportDirectoryMockup
          task={mockup.task}
          items={mockup.items}
          correctSlug={mockup.correctSlug}
          onPick={(ok, name) => noop(ok, name)}
        />
      );
    case "wardrobe":
      return (
        <WardrobeMockup
          occasion={mockup.occasion}
          items={mockup.items}
          onPick={(ok, name) => noop(ok, name)}
        />
      );
    case "table-setting":
      return <TableSettingMockup onResult={(ok) => noop(ok, "")} />;
    case "shampoo-store":
      return (
        <ShampooStoreMockup
          task={mockup.task}
          items={mockup.items}
          correctId={mockup.correctId}
          onPick={(ok, name) => noop(ok, name)}
        />
      );
    case "weekly-weather":
      return (
        <WeeklyWeatherMockup
          days={mockup.days}
          taskDayIdx={mockup.taskDayIdx}
          options={mockup.options}
          onPick={(ok, name) => noop(ok, name)}
        />
      );
    case "care-label":
      return (
        <CareLabelMockup
          fabric={mockup.fabric}
          symbols={mockup.symbols}
          question={mockup.question}
          options={mockup.options}
          onAnswer={(ok) => noop(ok, "")}
        />
      );
    case "detergent-box":
      return (
        <DetergentBoxMockup
          loadKg={mockup.loadKg}
          table={mockup.table}
          options={mockup.options}
          onPick={(ok) => noop(ok, "")}
        />
      );
    case "oven-timer":
      return (
        <OvenTimerMockup
          recipeStep={mockup.recipeStep}
          recipeMinutes={mockup.recipeMinutes}
          onSet={(m) => noop(m === mockup.recipeMinutes, String(m))}
        />
      );
    case "ticket-booking":
      return <TicketBookingMockup onComplete={(ok) => noop(ok, "")} />;
    case "phone-call":
      return (
        <PhoneCallMockup
          task={mockup.task}
          correctNumber={mockup.correctNumber}
          contacts={mockup.contacts}
          onAction={(ok, num) => noop(ok, num)}
        />
      );
    case "safety-cards":
      return (
        <SafetyCardsMockup
          situations={mockup.situations}
          onAnswer={(ok) => noop(ok, "")}
        />
      );
    case "diagnostic":
      return (
        <DiagnosticPlatformMockup
          mode={mockup.mode}
          onResult={(ok, msg) => noop(ok, msg)}
        />
      );
    case "hygiene-shelf":
      return (
        <HygieneShelfMockup
          mode={mockup.mode}
          onResult={(ok, msg) => noop(ok, msg)}
        />
      );
  }
  return null;
}

function ObjectMockup({
  objectName,
  illustration,
  zones,
  activeId,
  onZoneClick,
  markedIds,
}: {
  objectName: string;
  illustration?: string;
  zones: Hotspot[];
  activeId?: string | null;
  onZoneClick?: (id: string) => void;
  markedIds?: Set<string>;
}) {
  return (
    <div className="lp-object" aria-label={objectName}>
      <div className="lp-object-canvas">
        {illustration ? <div className="lp-object-bg">{illustration}</div> : null}
        {zones.map((z) => {
          const isActive = activeId === z.id;
          const isMarked = markedIds?.has(z.id);
          return (
            <button
              key={z.id}
              type="button"
              className={`lp-zone ${isActive ? "is-active" : ""} ${isMarked ? "is-marked" : ""}`}
              style={{
                left: `${z.x}%`,
                top: `${z.y}%`,
                width: `${z.width}%`,
                height: `${z.height}%`,
              }}
              onClick={() => onZoneClick?.(z.id)}
              aria-label={z.label}
            >
              <span className="lp-zone-label">{z.label}</span>
            </button>
          );
        })}
      </div>
      <span className="lp-object-caption">{objectName}</span>
    </div>
  );
}

function ObjectExplorerScreen({
  screen,
  onComplete,
}: {
  screen: Extract<LessonScreen, { type: "object-explorer" }>;
  onComplete: () => void;
}) {
  const locale = useLocale();
  const t = dict[locale];
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = screen.zones.find((z) => z.id === activeId);

  // UI Helper
  const showcase = renderShowcaseMockup(screen.mockup);

  if (showcase) {
    return (
      <div className="lp-screen lp-explorer">
        <header className="lp-screen-head">
          <h2>{screen.title}</h2>
          <p className="lp-muted">Here is how it looks. Examine it carefully.</p>
          <ListenButton text={`${screen.title}. Examine the device carefully.`} />
        </header>

        <div className="lp-explorer-showcase">
          <div className="lp-showcase-device">{showcase}</div>
          <aside className="lp-explorer-aside">
            <p className="lp-muted">Main components:</p>
            <ul className="lp-parts-list">
              {screen.zones.map((z) => (
                <li
                  key={z.id}
                  className={`lp-part ${activeId === z.id ? "is-active" : ""}`}
                  onClick={() => setActiveId(z.id)}
                >
                  <strong>{z.label}</strong>
                  {z.hint ? <span>{z.hint}</span> : null}
                  <ListenButton text={`${z.label}. ${z.hint ?? ""}`} />
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="lp-actions">
          <button type="button" className="lp-next" onClick={onComplete}>
            {t.next} →
          </button>
        </div>
      </div>
    );
  }

  // UI Helper
  return (
    <div className="lp-screen lp-explorer">
      <header className="lp-screen-head">
        <h2>{screen.title}</h2>
        <ListenButton text={screen.title} />
      </header>

      <div className="lp-explorer-layout">
        <ObjectMockup
          objectName={screen.objectName}
          illustration={screen.objectIllustration}
          zones={screen.zones}
          activeId={activeId}
          onZoneClick={setActiveId}
        />

        <aside className="lp-explorer-aside">
          <p className="lp-muted">{t.objectName}: {screen.objectName}</p>
          <div className="lp-zone-buttons">
            {screen.zones.map((z) => (
              <button
                key={z.id}
                type="button"
                className={`lp-zone-btn ${activeId === z.id ? "is-active" : ""}`}
                onClick={() => setActiveId(z.id)}
              >
                Show: {z.label}
              </button>
            ))}
          </div>
          {active ? (
            <div className="lp-zone-info">
              <strong>{active.label}</strong>
              {active.hint ? <p>{active.hint}</p> : null}
              <ListenButton text={`${active.label}. ${active.hint ?? ""}`} />
            </div>
          ) : null}
        </aside>
      </div>

      <div className="lp-actions">
        <button type="button" className="lp-next" onClick={onComplete}>
          {t.next} →
        </button>
      </div>
    </div>
  );
}

function MarkZonesScreen({
  screen,
  onComplete,
}: {
  screen: Extract<LessonScreen, { type: "mark-zones" }>;
  onComplete: () => void;
}) {
  const locale = useLocale();
  const t = dict[locale];
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [taskIdx, setTaskIdx] = useState(0);
  const [wrongStreak, setWrongStreak] = useState(0);
  const [feedback, setFeedback] = useState<"good" | "soft" | null>(null);

  const correctZone = screen.zones[taskIdx];
  const allDone = marked.size >= screen.zones.length;

  const handleZone = (id: string) => {
    if (allDone) return;
    if (id === correctZone.id) {
      setMarked(new Set([...marked, id]));
      setFeedback("good");
      setWrongStreak(0);
      setTimeout(() => {
        setFeedback(null);
        if (taskIdx < screen.zones.length - 1) {
          setTaskIdx(taskIdx + 1);
        }
      }, 800);
    } else {
      setFeedback("soft");
      setWrongStreak((s) => s + 1);
    }
  };

  const handlePartClick = (id: string) => handleZone(id);

  // UI Helper
  const showcase = renderShowcaseMockup(screen.mockup);

  if (showcase) {
    return (
      <div className="lp-screen lp-mark-zones">
        <header className="lp-screen-head">
          <span className="lp-diag-badge">{t.diagPoint1}</span>
          <h2>{screen.title}</h2>
        </header>

        <div className="lp-explorer-showcase">
          <div className="lp-showcase-device">{showcase}</div>
          <aside className="lp-explorer-aside">
            {!allDone ? (
              <>
                <p className="lp-task-hint">
                  {t.trial} {taskIdx + 1} / {screen.zones.length}
                </p>
                <p className="lp-task">{screen.tasks[taskIdx] ?? `Find: ${correctZone.label}`}</p>
                <ListenButton text={screen.tasks[taskIdx] ?? correctZone.label} />
                <div className="lp-parts-tap">
                  {screen.zones.map((z) => {
                    const isMarked = marked.has(z.id);
                    return (
                      <button
                        key={z.id}
                        type="button"
                        className={`lp-part-btn ${isMarked ? "is-marked" : ""} ${wrongStreak >= 3 && z.id === correctZone.id ? "is-pulse" : ""}`}
                        disabled={isMarked}
                        onClick={() => handlePartClick(z.id)}
                      >
                        {isMarked ? "[Done] " : ""}{z.label}
                      </button>
                    );
                  })}
                </div>
                {feedback ? (
                  <div className={`lp-feedback ${feedback}`}>
                    {feedback === "good" ? t.correct : t.tryAgain}
                  </div>
                ) : null}
                {wrongStreak >= 3 ? (
                  <div className="lp-feedback soft">
                    Hint: The required part is highlighted.
                  </div>
                ) : null}
              </>
            ) : (
              <div className="lp-feedback good">
                <strong>Great job!</strong>
                <p>All components found successfully.</p>
                <button type="button" className="lp-next" onClick={onComplete}>
                  {t.next} →
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    );
  }

  // UI Helper
  return (
    <div className="lp-screen lp-mark-zones">
      <header className="lp-screen-head">
        <span className="lp-diag-badge">{t.diagPoint1}</span>
        <h2>{screen.title}</h2>
      </header>

      <div className="lp-explorer-layout">
        <ObjectMockup
          objectName={screen.objectName}
          illustration={screen.objectIllustration}
          zones={screen.zones}
          markedIds={marked}
          activeId={wrongStreak >= 3 ? correctZone.id : null}
          onZoneClick={handleZone}
        />

        <aside className="lp-explorer-aside">
          {!allDone ? (
            <>
              <p className="lp-task-hint">
                {t.trial} {taskIdx + 1} / {screen.zones.length}
              </p>
              <p className="lp-task">{screen.tasks[taskIdx] ?? `Find: ${correctZone.label}`}</p>
              <ListenButton text={screen.tasks[taskIdx] ?? correctZone.label} />
              {feedback ? (
                <div className={`lp-feedback ${feedback}`}>
                  {feedback === "good" ? t.correct : t.tryAgain}
                </div>
              ) : null}
              {wrongStreak >= 3 ? (
                <div className="lp-feedback soft">
                  Hint: The target location is blinking.
                </div>
              ) : null}
            </>
          ) : (
            <div className="lp-feedback good">
              <strong>Great job!</strong>
              <p>All locations marked correctly.</p>
              <button type="button" className="lp-next" onClick={onComplete}>
                {t.next} →
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function BreakScreen({
  screen,
  onComplete,
}: {
  screen: Extract<LessonScreen, { type: "break" }>;
  onComplete: () => void;
}) {
  const locale = useLocale();
  const t = dict[locale];
  const [left, setLeft] = useState(screen.durationSec);
  useEffect(() => {
    if (left <= 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(timer);
  }, [left, onComplete]);

  const total = screen.durationSec;
  const progress = ((total - left) / total) * 100;

  return (
    <div className="lp-screen lp-break">
      <header className="lp-screen-head">
        <h2>{t.breakTitle}</h2>
      </header>
      <div className="lp-break-body">
        <div className="lp-break-label" style={{ fontWeight: 700, color: "#2563eb", marginBottom: "8px" }}>Rest Break</div>
        <p className="lp-break-theme">{screen.themeText}</p>
        <div className="lp-break-timer">
          <svg viewBox="0 0 100 100" className="lp-break-ring">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#dbeafe" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#2563eb"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 44}
              strokeDashoffset={2 * Math.PI * 44 * (1 - progress / 100)}
              transform="rotate(-90 50 50)"
              strokeLinecap="round"
            />
          </svg>
          <span className="lp-break-time">{left}</span>
        </div>
        <button type="button" className="lp-skip" onClick={onComplete}>
          {t.next} →
        </button>
      </div>
    </div>
  );
}

function InstructionScreen({
  screen,
  onComplete,
}: {
  screen: Extract<LessonScreen, { type: "instruction" }>;
  onComplete: () => void;
}) {
  const locale = useLocale();
  const t = dict[locale];
  const [stepIdx, setStepIdx] = useState(0);
  const step: InstructionStep = screen.steps[stepIdx];

  return (
    <div className="lp-screen lp-instruction">
      <header className="lp-screen-head">
        <span className="lp-diag-badge">{t.diagPoint2}</span>
        <h2>{screen.title}</h2>
      </header>

      <div className="lp-step-card">
        <div className="lp-step-num">Step {stepIdx + 1} / {screen.steps.length}</div>
        <div className="lp-step-num-badge">{stepIdx + 1}</div>
        <h3>{step.title}</h3>
        <p>{step.body}</p>
        <ListenButton text={`Step ${stepIdx + 1}. ${step.title}. ${step.body}`} />
      </div>

      <div className="lp-step-controls">
        <button
          type="button"
          className="lp-step-prev"
          disabled={stepIdx === 0}
          onClick={() => setStepIdx(stepIdx - 1)}
        >
          ← {t.back}
        </button>
        <button
          type="button"
          className="lp-step-repeat"
          onClick={() => speak(screen.steps.map((s) => s.body).join(". "), locale)}
        >
          {screen.repeatAllLabel ?? t.repeatAll}
        </button>
        {stepIdx < screen.steps.length - 1 ? (
          <button
            type="button"
            className="lp-next"
            onClick={() => setStepIdx(stepIdx + 1)}
          >
            {t.next} →
          </button>
        ) : (
          <button type="button" className="lp-next" onClick={onComplete}>
            {t.next} →
          </button>
        )}
      </div>
    </div>
  );
}

function PracticeScreen({
  screen,
  onComplete,
}: {
  screen: Extract<LessonScreen, { type: "practice" }>;
  onComplete: () => void;
}) {
  const locale = useLocale();
  const t = dict[locale];
  const [trialIdx, setTrialIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [mockupResult, setMockupResult] = useState<{ correct: boolean; msg: string } | null>(null);

  const trial: PracticeTrial = screen.trials[trialIdx];
  const answered = picked !== null || mockupResult !== null;
  const correct = mockupResult ? mockupResult.correct : answered && trial.options[picked!].correct;
  const feedbackMsg = mockupResult
    ? mockupResult.msg
    : answered
      ? trial.options[picked!].feedback
      : "";

  const goNext = () => {
    if (trialIdx < screen.trials.length - 1) {
      setTrialIdx(trialIdx + 1);
      setPicked(null);
      setMockupResult(null);
    } else {
      onComplete();
    }
  };

  // UI Helper
  if (screen.mockup) {
    const m = screen.mockup;
    let mockupNode: React.ReactNode = null;

    switch (m.kind) {
      case "washing-machine":
        mockupNode = (
          <WashingMachineMockup
            itemLabel={m.itemLabel}
            itemEmoji={m.itemEmoji}
            hint={m.hint}
            programs={m.programs}
            onResult={(ok, label) =>
              setMockupResult({
                correct: ok,
                msg: ok
                  ? `Program "${label}" is suitable — wash cycle started.`
                  : `Program "${label}" is not suitable for this item.`,
              })
            }
          />
        );
        break;
      case "atm":
        mockupNode = (
          <AtmMockup
            amount={m.amount}
            pin={m.pin}
            onResult={(ok, action) =>
              setMockupResult({
                correct: ok,
                msg: ok ? `Good! ${action}.` : `Caution! ${action}.`,
              })
            }
          />
        );
        break;
      case "thermometer":
        mockupNode = (
          <ThermometerMockup
            value={m.value}
            onClassify={(choice) =>
              setMockupResult({
                correct: choice === m.correctZone,
                msg:
                  choice === m.correctZone
                    ? "Correct — you accurately determined the temperature."
                    : "Check the scale: the pointer indicates a different zone.",
              })
            }
          />
        );
        break;
      case "volume-slider":
        mockupNode = (
          <VolumeMockup
            onSubmit={(value, safe) =>
              setMockupResult({
                correct: safe,
                msg: safe
                  ? `Volume ${value}% is a safe listening level.`
                  : `Volume ${value}% is too loud. Turn it down to ${m.safeMax}%.`,
              })
            }
          />
        );
        break;
      case "weather":
        mockupNode = (
          <WeatherMockup
            temp={m.temp}
            uv={m.uv}
            icon={m.icon}
            onAdvice={(adv) =>
              setMockupResult({
                correct: adv === m.correctAdvice,
                msg:
                  adv === m.correctAdvice
                    ? "Correct — you checked the forecast and selected appropriate protection."
                    : "Review the UV index again and consider if sun protection is needed.",
              })
            }
          />
        );
        break;
      case "product-label": {
        const cy = m.currentYear ?? 2026;
        const expired = m.expiryYear === null || m.expiryYear < cy;
        mockupNode = (
          <ProductLabelMockup
            productName={m.productName}
            productEmoji={m.productEmoji}
            expiryYear={m.expiryYear}
            currentYear={cy}
            onDecide={(use) =>
              setMockupResult({
                correct: use !== expired,
                msg:
                  expired
                    ? use
                      ? "This product is expired — do not use it."
                      : "Correct — product is expired and unsafe to use."
                    : use
                      ? "Correct — expiration date has not passed."
                      : "The product is still within its expiration date — safe to use.",
              })
            }
          />
        );
        break;
      }
      case "messenger":
        mockupNode = (
          <MessengerMockup
            contact={m.contact}
            incoming={m.incoming}
            options={m.options}
            onSend={(i) =>
              setMockupResult({
                correct: m.options[i].correct,
                msg: m.options[i].feedback,
              })
            }
          />
        );
        break;
      case "train-board":
        mockupNode = (
          <TrainBoardMockup
            targetTrain={m.targetTrain}
            targetTime={m.targetTime}
            rows={m.rows}
            onPick={(i) =>
              setMockupResult({
                correct: i === m.correctIndex,
                msg:
                  i === m.correctIndex
                    ? `Correct — that is train ${m.targetTrain} at ${m.targetTime}.`
                    : "That is a different train. Check the number and departure time.",
              })
            }
          />
        );
        break;
      case "package-tracking":
        mockupNode = (
          <TrackingMockup
            trackNumber={m.trackNumber}
            expectedStatus={m.expectedStatus}
            onSubmit={(entered) =>
              setMockupResult({
                correct: entered === m.trackNumber,
                msg:
                  entered === m.trackNumber
                    ? `Package found: ${m.expectedStatus}.`
                    : "Tracking number does not match. Please verify your input.",
              })
            }
          />
        );
        break;
      case "skin-quiz":
        mockupNode = (
          <SkinQuizMockup
            questions={m.questions}
            correctType={m.correctType}
            onResult={(ok) =>
              setMockupResult({
                correct: ok,
                msg: ok
                  ? "Assessment complete — care recommendations generated."
                  : "Some answers did not match — review the guide cards above.",
              })
            }
          />
        );
        break;
      case "checklist":
        mockupNode = (
          <ChecklistMockup
            title={m.title}
            steps={m.steps}
            onComplete={() =>
              setMockupResult({
                correct: true,
                msg: "All steps completed — checklist successfully verified.",
              })
            }
          />
        );
        break;
      case "menu":
        mockupNode = (
          <MenuMockup
            task={m.task}
            dishes={m.dishes}
            onPick={(ok, name) =>
              setMockupResult({
                correct: ok,
                msg: ok
                  ? `"${name}" is a healthy, nutritious choice.`
                  : `"${name}" is not ideal for dinner. Consider another option.`,
              })
            }
          />
        );
        break;
      case "recipe":
        mockupNode = (
          <RecipeMockup
            recipeName={m.recipeName}
            emoji={m.emoji}
            ingredients={m.ingredients}
            question={m.question}
            options={m.options}
            onAnswer={(ok) =>
              setMockupResult({
                correct: ok,
                msg: ok
                  ? "Correct! You followed the recipe accurately."
                  : "Review the ingredients list once more.",
              })
            }
          />
        );
        break;
      case "budget-form":
        mockupNode = (
          <BudgetFormMockup
            mode={m.mode}
            fields={m.fields}
            expectedTotal={m.expectedTotal}
            comparisonValue={m.comparisonValue}
            onSubmit={(ok, total) =>
              setMockupResult({
                correct: ok,
                msg: ok
                  ? `Total calculated correctly: $${total.toLocaleString("en-US")}.`
                  : `Check your calculated figures. Expected total was $${m.expectedTotal.toLocaleString("en-US")}.`,
              })
            }
          />
        );
        break;
      case "gov-portal":
        mockupNode = (
          <GovPortalMockup
            serviceName={m.serviceName}
            fields={m.fields}
            expectedValues={m.expectedValues}
            onSubmit={(ok) =>
              setMockupResult({
                correct: ok,
                msg: ok
                  ? "Application submitted successfully. Ready in 5 business days."
                  : "Please verify that all fields are filled out accurately.",
              })
            }
          />
        );
        break;
      case "contract":
        mockupNode = (
          <ContractMockup
            contract={m.contract}
            question={m.question}
            onPick={(ok) =>
              setMockupResult({
                correct: ok,
                msg: ok
                  ? "Correct — this is a key contract term."
                  : "This is a secondary clause. Look for the primary agreement condition.",
              })
            }
          />
        );
        break;
      case "transport-directory":
        mockupNode = (
          <TransportDirectoryMockup
            task={m.task}
            items={m.items}
            correctSlug={m.correctSlug}
            onPick={(ok, name) =>
              setMockupResult({
                correct: ok,
                msg: ok
                  ? `Correct — "${name}" is appropriate.`
                  : `"${name}" is incorrect. Please re-read the prompt.`,
              })
            }
          />
        );
        break;
      case "wardrobe":
        mockupNode = (
          <WardrobeMockup
            occasion={m.occasion}
            items={m.items}
            onPick={(ok, name) =>
              setMockupResult({
                correct: ok,
                msg: ok
                  ? `Correct — "${name}" is suitable for ${m.occasion}.`
                  : `"${name}" is not suitable for ${m.occasion}.`,
              })
            }
          />
        );
        break;
      case "table-setting":
        mockupNode = (
          <TableSettingMockup
            onResult={(ok) =>
              setMockupResult({
                correct: ok,
                msg: ok
                  ? "Table set correctly according to dining etiquette — great job!"
                  : "Check layout: fork on the left, knife/spoon on the right, glass at the top.",
              })
            }
          />
        );
        break;
      case "shampoo-store":
        mockupNode = (
          <ShampooStoreMockup
            task={m.task}
            items={m.items}
            correctId={m.correctId}
            onPick={(ok, name) =>
              setMockupResult({
                correct: ok,
                msg: ok ? `"${name}" is the right choice.` : `"${name}" is not suitable — check the packaging labels.`,
              })
            }
          />
        );
        break;
      case "weekly-weather":
        mockupNode = (
          <WeeklyWeatherMockup
            days={m.days}
            taskDayIdx={m.taskDayIdx}
            options={m.options}
            onPick={(ok, name) =>
              setMockupResult({
                correct: ok,
                msg: ok ? `"${name}" matches the weather forecast!` : `"${name}" is not suitable for these weather conditions.`,
              })
            }
          />
        );
        break;
      case "care-label":
        mockupNode = (
          <CareLabelMockup
            fabric={m.fabric}
            symbols={m.symbols}
            question={m.question}
            options={m.options}
            onAnswer={(ok) =>
              setMockupResult({
                correct: ok,
                msg: ok ? "Care symbols read correctly!" : "Review the care symbols again.",
              })
            }
          />
        );
        break;
      case "detergent-box":
        mockupNode = (
          <DetergentBoxMockup
            loadKg={m.loadKg}
            table={m.table}
            options={m.options}
            onPick={(ok) =>
              setMockupResult({
                correct: ok,
                msg: ok ? "Correct — this is the recommended dosage." : "Check the dosage table row for this load weight.",
              })
            }
          />
        );
        break;
      case "oven-timer":
        mockupNode = (
          <OvenTimerMockup
            recipeStep={m.recipeStep}
            recipeMinutes={m.recipeMinutes}
            onSet={(minutes) =>
              setMockupResult({
                correct: minutes === m.recipeMinutes,
                msg: minutes === m.recipeMinutes
                  ? `Correct — timer set for ${minutes} minutes as specified in recipe.`
                  : `Recipe calls for ${m.recipeMinutes} minutes, but timer was set to ${minutes}.`,
              })
            }
          />
        );
        break;
      case "ticket-booking":
        mockupNode = (
          <TicketBookingMockup
            onComplete={(ok) =>
              setMockupResult({
                correct: ok,
                msg: ok
                  ? "Ticket booked successfully: route, date, and seat confirmed."
                  : "Verify route and travel date before confirming payment.",
              })
            }
          />
        );
        break;
      case "phone-call":
        mockupNode = (
          <PhoneCallMockup
            task={m.task}
            correctNumber={m.correctNumber}
            contacts={m.contacts}
            onAction={(ok, num) =>
              setMockupResult({
                correct: ok,
                msg: ok ? `Correct number: ${num}` : `${num} is not the right number. Re-read the task.`,
              })
            }
          />
        );
        break;
      case "safety-cards":
        mockupNode = (
          <SafetyCardsMockup
            situations={m.situations}
            onAnswer={(ok, score) =>
              setMockupResult({
                correct: ok,
                msg: ok
                  ? `All ${m.situations.length} situations identified correctly!`
                  : `Correct: ${score} of ${m.situations.length}. Safety is essential — try again.`,
              })
            }
          />
        );
        break;
      case "diagnostic":
        mockupNode = (
          <DiagnosticPlatformMockup
            mode={m.mode}
            onResult={(ok, msg) => setMockupResult({ correct: ok, msg })}
          />
        );
        break;
      case "hygiene-shelf":
        mockupNode = (
          <HygieneShelfMockup
            mode={m.mode}
            onResult={(ok, msg) => setMockupResult({ correct: ok, msg })}
          />
        );
        break;
    }

    return (
      <div className="lp-screen lp-practice">
        <header className="lp-screen-head">
          <span className="lp-diag-badge key">{t.diagPoint3}</span>
          <h2>{screen.title}</h2>
          <p className="lp-task">{screen.taskPrompt}</p>
          <ListenButton text={`${screen.title}. ${screen.taskPrompt}`} />
        </header>

        <div className="lp-mockup-stage">{mockupNode}</div>

        {mockupResult ? (
          <div className={`lp-feedback ${mockupResult.correct ? "good" : "soft"}`}>
            <strong>{mockupResult.correct ? t.correct : t.tryAgain}</strong>
            <p>{mockupResult.msg}</p>
            <button type="button" className="lp-next" onClick={goNext}>
              {trialIdx < screen.trials.length - 1 ? `${t.next} →` : `${t.finish} →`}
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  // UI Helper
  return (
    <div className="lp-screen lp-practice">
      <header className="lp-screen-head">
        <span className="lp-diag-badge key">{t.diagPoint3}</span>
        <h2>{screen.title}</h2>
        <p className="lp-task">{screen.taskPrompt}</p>
        <ListenButton text={`${screen.title}. ${screen.taskPrompt}`} />
      </header>

      <div className="lp-practice-stage">
        <div className="lp-trial-card">
          <div className="lp-trial-num">
            {t.trial} {trialIdx + 1} / {screen.trials.length}
          </div>
          {trial.illustration ? (
            <div className="lp-trial-illu">{trial.illustration}</div>
          ) : null}
          <h3 className="lp-trial-item">{trial.itemName}</h3>
          <p className="lp-trial-caption">{trial.caption}</p>
          <ListenButton text={`${trial.itemName}. ${trial.caption}`} />
        </div>

        <div className="lp-trial-options">
          {trial.options.map((opt, i) => (
            <button
              key={i}
              type="button"
              className={`lp-trial-option ${picked === i ? (opt.correct ? "is-correct" : "is-wrong") : ""}`}
              disabled={answered}
              onClick={() => setPicked(i)}
            >
              {opt.text}
            </button>
          ))}
        </div>

        {answered ? (
          <div className={`lp-feedback ${correct ? "good" : "soft"}`}>
            <strong>{correct ? t.correct : t.tryAgain}</strong>
            <p>{feedbackMsg}</p>
            <button type="button" className="lp-next" onClick={goNext}>
              {trialIdx < screen.trials.length - 1 ? `${t.next} →` : `${t.finish} →`}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ReflectionScreen({
  screen,
  onComplete,
}: {
  screen: Extract<LessonScreen, { type: "reflection" }>;
  onComplete: () => void;
}) {
  const locale = useLocale();
  const t = dict[locale];
  const [placed, setPlaced] = useState<Record<string, "good" | "bad">>({});
  const [mood, setMood] = useState<string | null>(null);
  const draggedRef = useRef<string | null>(null);

  const allPlaced = useMemo(
    () => screen.sortItems.every((it) => placed[it.text]),
    [placed, screen.sortItems],
  );

  const handleDrop = (bin: "good" | "bad", itemText: string) => {
    setPlaced((p) => ({ ...p, [itemText]: bin }));
  };

  return (
    <div className="lp-screen lp-reflection">
      <header className="lp-screen-head">
        <h2>{screen.title}</h2>
        <p className="lp-summary">{screen.summaryPhrase}</p>
        <ListenButton text={screen.summaryPhrase} />
      </header>

      <div className="lp-sort-area">
        <h3>{t.sortTask}</h3>
        <div className="lp-sort-pool">
          {screen.sortItems.map((it) => {
            const placedTo = placed[it.text];
            if (placedTo) return null;
            return (
              <button
                key={it.text}
                type="button"
                className="lp-sort-chip"
                draggable
                onDragStart={() => (draggedRef.current = it.text)}
                onClick={() => {
                  // Mobile-friendly fallback: cycle bin on tap
                  const next = placedTo === "good" ? "bad" : placedTo === "bad" ? undefined : it.bin;
                  if (next) setPlaced((p) => ({ ...p, [it.text]: next }));
                }}
              >
                {it.illustration ? <span>{it.illustration}</span> : null}
                <span>{it.text}</span>
              </button>
            );
          })}
        </div>

        <div className="lp-sort-bins">
          {(["good", "bad"] as const).map((bin) => (
            <div
              key={bin}
              className={`lp-sort-bin lp-sort-bin--${bin}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedRef.current) handleDrop(bin, draggedRef.current);
                draggedRef.current = null;
              }}
            >
              <strong>{bin === "good" ? screen.sortBinGood : screen.sortBinBad}</strong>
              <div className="lp-sort-bin-items">
                {screen.sortItems
                  .filter((it) => placed[it.text] === bin)
                  .map((it) => {
                    const isCorrect = it.bin === bin;
                    return (
                      <div
                        key={it.text}
                        className={`lp-sort-placed ${isCorrect ? "is-correct" : "is-wrong"}`}
                        onClick={() => setPlaced((p) => {
                          const rest = { ...p };
                          delete rest[it.text];
                          return rest;
                        })}
                      >
                        {it.illustration ? <span>{it.illustration}</span> : null}
                        <span>{it.text}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lp-mood">
        <h3>{t.moodTitle}</h3>
        <div className="lp-mood-row">
          {screen.moodOptions.map((m) => (
            <button
              key={m.emoji}
              type="button"
              className={`lp-mood-btn ${mood === m.emoji ? "is-active" : ""}`}
              onClick={() => setMood(m.emoji)}
              aria-label={m.label}
            >
              <span className="lp-mood-emoji">{m.emoji}</span>
              <span className="lp-mood-label">{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="lp-home-task">
        <strong>{t.homeTask}</strong>
        <p>{screen.homeTask}</p>
      </div>

      <div className="lp-actions">
        <button
          type="button"
          className="lp-finish"
          disabled={!allPlaced || !mood}
          onClick={onComplete}
        >
          {t.finish}
        </button>
      </div>
    </div>
  );
}

// ── Main player ───────────────────────────────────────────────────────────

export function LessonPlayer({ screens, lessonTitle }: LessonPlayerProps) {
  const locale = useLocale();
  const t = dict[locale];
  const [idx, setIdx] = useState(0);
  const [finished, setFinished] = useState(false);

  const advance = () => {
    if (idx < screens.length - 1) {
      setIdx(idx + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setFinished(true);
    }
  };

  // UI Helper
  const practiceIdx = screens.findIndex((s) => s.type === "practice");
  const onPracticeScreen = idx === practiceIdx;

  if (finished) {
    return (
      <div className="lp-root lp-finished">
        <div className="lp-finished-card">
          <div className="lp-finished-badge" style={{ fontWeight: 800, color: "#16a34a", fontSize: "1.2rem", marginBottom: "12px" }}>Completed</div>
          <h2>{t.completed}</h2>
          <p>{lessonTitle}</p>
        </div>
      </div>
    );
  }

  const screen = screens[idx];

  let content: React.ReactNode = null;
  switch (screen.type) {
    case "warmup":
      content = <WarmupScreen screen={screen} onComplete={advance} />;
      break;
    case "motivation":
      content = <MotivationScreen screen={screen} onComplete={advance} />;
      break;
    case "info-cards":
      content = <InfoCardsScreen screen={screen} onComplete={advance} />;
      break;
    case "object-explorer":
      content = <ObjectExplorerScreen screen={screen} onComplete={advance} />;
      break;
    case "mark-zones":
      content = <MarkZonesScreen screen={screen} onComplete={advance} />;
      break;
    case "break":
      content = <BreakScreen screen={screen} onComplete={advance} />;
      break;
    case "instruction":
      content = <InstructionScreen screen={screen} onComplete={advance} />;
      break;
    case "practice":
      content = <PracticeScreen screen={screen} onComplete={advance} />;
      break;
    case "reflection":
      content = <ReflectionScreen screen={screen} onComplete={advance} />;
      break;
  }

  return (
    <div className="lp-root">
      <div className="lp-topbar">
        <ProgressBar current={idx} total={screens.length} />
        {!onPracticeScreen && practiceIdx >= 0 ? (
          <button
            type="button"
            className="lp-jump-trainer"
            onClick={() => {
              setIdx(practiceIdx);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Jump to simulator &rarr;
          </button>
        ) : null}
      </div>
      <div className="lp-stage">{content}</div>
    </div>
  );
}
