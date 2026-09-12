"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { useLocale } from "@/components/locale-provider";
import { TelegramTrainer } from "@/components/trainers/telegram-trainer";
import { WhatsappTrainer } from "@/components/trainers/whatsapp-trainer";
import { GmailTrainer } from "@/components/trainers/gmail-trainer";
import { MailruTrainer } from "@/components/trainers/mailru-trainer";
import { UzumTrainer } from "@/components/trainers/uzum-trainer";
import { YandexMarketTrainer } from "@/components/trainers/yandex-market-trainer";
import { MyGovTrainer } from "@/components/trainers/mygov-trainer";
import { PhoneTrainer } from "@/components/trainers/phone-trainer";
import { MorningQuestTrainer } from "@/components/trainers/morning-quest-trainer";
import { OutfitTrainer } from "@/components/trainers/outfit-trainer";
import { HairCareTrainer } from "@/components/trainers/hair-care-trainer";
import { SkinTypeTrainer } from "@/components/trainers/skin-type-trainer";
import { SunCareTrainer } from "@/components/trainers/sun-care-trainer";
import { LabelReaderTrainer } from "@/components/trainers/label-reader-trainer";
import { StepSequenceTrainer } from "@/components/trainers/step-sequence-trainer";
import { VolumeSafeTrainer } from "@/components/trainers/volume-safe-trainer";
import { ThermometerTrainer } from "@/components/trainers/thermometer-trainer";
import { SeasonalClothingTrainer } from "@/components/trainers/seasonal-clothing-trainer";
import { CareLabelTrainer } from "@/components/trainers/care-label-trainer";
import { TableSettingTrainer } from "@/components/trainers/table-setting-trainer";
import { FamilyIncomeTrainer } from "@/components/trainers/family-income-trainer";
import { FamilyExpensesTrainer } from "@/components/trainers/family-expenses-trainer";
import { TransportTypesTrainer } from "@/components/trainers/transport-types-trainer";
import { ScheduleBoardTrainer } from "@/components/trainers/schedule-board-trainer";
import { TicketPurchaseTrainer } from "@/components/trainers/ticket-purchase-trainer";
import { PackageTrackingTrainer } from "@/components/trainers/package-tracking-trainer";
import { PhoneCallFlowTrainer } from "@/components/trainers/phone-call-flow-trainer";
import { MessengerFlowTrainer } from "@/components/trainers/messenger-flow-trainer";
import { SafetyEtiquetteTrainer } from "@/components/trainers/safety-etiquette-trainer";
import { MyGovPortalTrainer } from "@/components/trainers/mygov-portal-trainer";
import { AtmTrainer } from "@/components/trainers/atm-trainer";
import { CreditContractTrainer } from "@/components/trainers/credit-contract-trainer";
import { FinalQuestTrainer } from "@/components/trainers/final-quest-trainer";
import { WashingMachineTrainer } from "@/components/trainers/washing-machine-trainer";
import { DetergentDosageTrainer } from "@/components/trainers/detergent-dosage-trainer";
import { MenuBuilderTrainer } from "@/components/trainers/menu-builder-trainer";
import { RecipeReaderTrainer } from "@/components/trainers/recipe-reader-trainer";
import { RecipeTimerTrainer } from "@/components/trainers/recipe-timer-trainer";
import { SignLanguageTrainer } from "@/components/trainers/sign-language-trainer";
import { Mascot, type MascotMood } from "@/components/mascot";
import { SceneScenario } from "@/components/scene-scenario";
import { StudentTaskPanel, type StudentTaskPanelAnswer } from "@/components/student-task-panel";
import { CabinetIcon } from "@/components/ui-icons";
import type { LessonQuizQuestion, LessonScenario, LessonTrainer } from "@/data/program";
import { logAction } from "@/lib/auth-storage";
import type {
  AdaptationExperienceFlags,
  AdaptedLessonMeta,
  AdaptedTrainerGuidance,
} from "@/lib/adaptation/adaptation-types";
import {
  speakNarration,
  stopNarration,
  buildNarrationForStage,
} from "@/lib/adaptation/adaptation-audio";

const englishLessonDict = {
  trainerLabel: "Trainer",
  trainerTelegram: "Telegram Trainer",
  trainerWhatsapp: "WhatsApp Trainer",
  trainerGmail: "Gmail Trainer",
  trainerMailru: "Mail.ru Trainer",
  trainerUzum: "Marketplace Trainer",
  trainerYandexMarket: "Online Store Trainer",
  trainerMyGov: "Public Services Trainer",
  trainerPhone: "Phone Call Trainer",
  trainerMorningQuest: "Morning Routine — Diagnostic",
  trainerOutfit: "Digital Wardrobe — Dressing for the Weather",
  trainerHairCare: "Hair Care Shelf — Choosing Shampoo",
  trainerSkinType: "Skin Type Identifier",
  trainerSunCare: "Sun Forecast and Protection",
  trainerLabelReader: "Product Label — What to Look For",
  trainerStepSequence: "Face Care and Cream — Step by Step",
  trainerVolumeSafe: "Safe Headphone Volume",
  trainerThermometer: "Digital Thermometer — Reading",
  trainerSeasonalClothing: "Clothing for the Weather Forecast",
  trainerCareLabel: "Clothing Label — Care Symbols",
  trainerTableSetting: "Table Setting",
  trainerFamilyIncome: "Family Budget — Income",
  trainerFamilyExpenses: "Family Expenses — Categories",
  trainerTransportTypes: "Modes of Transit",
  trainerScheduleBoard: "Station Board — Finding Your Train",
  trainerTicketPurchase: "Buying Tickets Online",
  trainerPackageTracking: "Package Tracking",
  trainerPhoneCallFlow: "Handling Phone Calls",
  trainerMessengerFlow: "Messaging — Replying in Chat",
  trainerSafetyEtiquette: "Safe or Dangerous",
  trainerMyGovPortal: "Services Portal",
  trainerAtm: "ATM — Cash Withdrawal",
  trainerCreditContract: "Credit Agreement",
  trainerFinalQuest: "Final Check",
  trainerWashingMachine: "Washing Machine",
  trainerDetergent: "Detergent Dosage",
  trainerMenu: "Healthy Dinner",
  trainerRecipe: "Cutlet Recipe",
  trainerRecipeTimer: "Apple Pie with Timer",
  mascotIntro: "Hi! I'm Aanya. Let's take it easy: one step at a time.",
  mascotLastRule: "This is the last rule. Then click the button below.",
  mascotReadRule: "Read the rule. Then click \"Next\".",
  mascotTrainer: "Take your time. Think calmly.",
  mascotScenarioChoose: "Choose one answer. No rush.",
  mascotScenarioCorrect: "Correct. Great job!",
  mascotScenarioWrong: "No problem. The correct answer is highlighted.",
  mascotQuizChoose: "Quick question. Choose one option.",
  mascotQuizCorrect: "Correct. Let's keep going.",
  mascotQuizWrong: "Remember the correct answer — it's highlighted.",
  mascotFinish: "Well done! Lesson completed.",
  speechUnavailable: "Speech output is unavailable in this browser.",
  speechRules: "Lesson rules.",
  speechSituation: "Scenario.",
  speechQuestion: "Question.",
  speechLessonDone: "Lesson completed.",
  speechReading: "Text is being read aloud.",
  speechLang: "en-US",
  trainerStartNotice: "This looks like a real application. Try answering.",
  firstScenarioNotice: "Here comes the first scenario.",
  nextTrainerNoticePrefix: "Now try the same in ",
  nextTrainerNoticeSuffix: ".",
  shortSituationsNotice: "Now a few short scenarios.",
  chooseAnswerFirst: "First tap on an answer option.",
  nextScenarioNotice: "Good. Moving to the next scenario.",
  shortQuestionLeft: "One short question left.",
  lessonDoneGood: "Well done! Lesson completed.",
  chooseOneFirst: "First select one answer.",
  goNext: "Moving forward.",
  lessonFinishedScore: (score: number, total: number) =>
    `Lesson completed. Correct answers: ${score} of ${total}.`,
  finishFirst: "First complete the lesson to the end.",
  loginToSave: "To save your progress, sign in or register.",
  savedToCabinet: "Result saved to your dashboard.",
  saveFailed: "Failed to save result.",
  lessonRestarted: "Lesson restarted.",
  nextSituation: "Next scenario",
  shortQuestion: "Short question",
  finishLesson: "Complete lesson",
  lessonCompleteAria: "Lesson completed",
  bravo: "Well done!",
  lessonPassedKeepGoing: "Lesson passed. Keep it up!",
  stepOf: (step: number, total: number) => `Step ${step} of ${total}`,
  normalMode: "Standard mode",
  focusMode: "Focus mode",
  readAloud: "Read aloud",
  voice: "Voice over",
  ruleOf: (current: number, total: number) => `Rule ${current} of ${total}`,
  back: "← Back",
  next: "Next →",
  openTrainer: "Open trainer",
  startTasks: "Start exercises",
  firstRules: "Start with the basics",
  readRulesOneByOne: "Read the short rules one by one.",
  trainerPartOf: (current: number, total: number) =>
    ` · part ${current} of ${total}`,
  tryAsRealApp: "Try doing it just like in a real app.",
  sortSituation: "Analyze scenario",
  sortSituationInstruction: "Look at the dialogue on the left. Choose one calm, safe answer.",
  answerChosenSeeExplanation: "Answer chosen. See explanation below.",
  situationOf: (current: number, total: number) =>
    `Scenario ${current} of ${total}`,
  scenarioHint: "Take your time. Think about which reply resolves the situation calmly.",
  correct: "Correct",
  letsRemember: "Let's remember",
  chooseAnswerFirstShort: "Select an answer first",
  practicalSituation: "Practical scenario",
  chooseCalmSafe: "Choose one calm and safe answer.",
  goodShort: "Good.",
  lookAgainCalmly: "Let's look again calmly.",
  goToQuestions: "Proceed to questions",
  shortQuestionTitle: "Quick question",
  readQuestionRight: "Read the question on the right and select an answer.",
  answerQuestion: "Answer the question",
  oneShortQuestion: "This is one short question. Choose one option.",
  questionOf: (current: number, total: number) =>
    `Question ${current} of ${total}`,
  quizHint: "If you're unsure, calmly reread the question and options.",
  answerCorrectGoNext: "Correct answer selected. You can continue.",
  correctAnswerHighlighted: "The correct answer is highlighted. Remember it and move forward.",
  correctAnswerHighlightedFormal: "The correct answer is highlighted. Remember it and move forward.",
  nextQuestion: "Next question",
  knowledgeCheck: "Knowledge check",
  questionWord: (n: number) => `Question ${n}`,
  tapOneAnswer: "Tap an answer. The correct option will highlight.",
  rightShort: "Right.",
  noWorries: "No problem.",
  lessonFinished: "Lesson completed",
  lessonFinishedNoOverload: "The learner reached the end with a calm, focused step-by-step experience.",
  correctAnswersWord: "correct answers",
  questionsPassed: "questions completed",
  situationsSolved: "scenarios solved",
  saving: "Saving...",
  updateResult: "Update result",
  saveResult: "Save result",
  retake: "Retake lesson",
  saveResultPanel: "Save result",
  saveResultPanelInstruction: "Lesson completed. You can now save your score to your dashboard.",
  statsLine: (scenarios: number, quizzes: number) =>
    `Scenarios completed: ${scenarios}. Questions: ${quizzes}.`,
  done: "Done",
  correctAnswersOf: (score: number, total: number) =>
    `Correct answers: ${score} of ${total}.`,
  mainSituationsCovered: "Key lesson scenarios covered.",
  finishBoardTitle: "Lesson completed",
  finishBoardCopy: "All exercises on this screen were completed calmly step by step.",
  adultHint: "Note for the adult",
  whatsNext: "What to do next",
  toLessonsList: "Back to curriculum",
  otherLessons: "Other lessons",
  backToCabinet: "Back to dashboard",
  openOtherLessons: "Open other lessons",
  message: "Message",
};

const dict = {
  ru: englishLessonDict,
  uz: englishLessonDict,
} as const;

type LessonExperienceProps = {
  lesson: {
    slug: string;
    rules: string[];
    scenarios: LessonScenario[];
    quiz: LessonQuizQuestion[];
    adultNote: string;
    trainer?: LessonTrainer;
    extraTrainers?: LessonTrainer[];
    moduleSlug?: string;
    experience?: AdaptationExperienceFlags;
    adaptationMeta?: AdaptedLessonMeta;
    imageDescription?: string;
    importantWarning?: string;
    trainerGuidance?: Record<string, AdaptedTrainerGuidance>;
  };
  embedded?: boolean;
  onBack?: () => void;
  onOpenLessons?: () => void;
};

type LessonStage = "rules" | "trainer" | "scenario" | "quiz" | "finish";

const publicCelebrationSymbol = "\u{2B50}";

function createAnswerState(length: number) {
  return Array.from({ length }, () => -1);
}

function replaceAnswer(current: number[], stepIndex: number, answerIndex: number) {
  return current.map((value, index) => (index === stepIndex ? answerIndex : value));
}

function createPanelAnswers({
  idPrefix,
  options,
  selectedIndex,
  correctIndex,
  onChoose,
}: {
  idPrefix: string;
  options: string[];
  selectedIndex: number;
  correctIndex: number;
  onChoose: (answerIndex: number) => void;
}): StudentTaskPanelAnswer[] {
  const answered = selectedIndex !== -1;

  return options.map((option, optionIndex) => {
    const selected = selectedIndex === optionIndex;
    return {
      id: `${idPrefix}-${optionIndex}`,
      text: option,
      state: answered
        ? optionIndex === correctIndex
          ? "correct"
          : selected
            ? "wrong"
            : "muted"
        : "idle",
      disabled: answered,
      onClick: () => onChoose(optionIndex),
    };
  });
}

function trainerTitle(trainer: LessonTrainer, t: (typeof dict)[keyof typeof dict]) {
  switch (trainer.type) {
    case "telegram":
      return t.trainerTelegram;
    case "whatsapp":
      return t.trainerWhatsapp;
    case "gmail":
      return t.trainerGmail;
    case "mailru":
      return t.trainerMailru;
    case "uzum":
      return t.trainerUzum;
    case "yandexmarket":
      return t.trainerYandexMarket;
    case "mygov":
      return t.trainerMyGov;
    case "phone":
      return t.trainerPhone;
    case "morning-quest":
      return t.trainerMorningQuest;
    case "outfit":
      return t.trainerOutfit;
    case "hair-care":
      return t.trainerHairCare;
    case "skin-type":
      return t.trainerSkinType;
    case "sun-care":
      return t.trainerSunCare;
    case "label-reader":
      return t.trainerLabelReader;
    case "step-sequence":
      return t.trainerStepSequence;
    case "volume-safe":
      return t.trainerVolumeSafe;
    case "thermometer":
      return t.trainerThermometer;
    case "seasonal-clothing":
      return t.trainerSeasonalClothing;
    case "care-label":
      return t.trainerCareLabel;
    case "table-setting":
      return t.trainerTableSetting;
    case "family-income":
      return t.trainerFamilyIncome;
    case "family-expenses":
      return t.trainerFamilyExpenses;
    case "transport-types":
      return t.trainerTransportTypes;
    case "schedule-board":
      return t.trainerScheduleBoard;
    case "ticket-purchase":
      return t.trainerTicketPurchase;
    case "package-tracking":
      return t.trainerPackageTracking;
    case "phone-call-flow":
      return t.trainerPhoneCallFlow;
    case "messenger-flow":
      return t.trainerMessengerFlow;
    case "safety-etiquette":
      return t.trainerSafetyEtiquette;
    case "mygov-portal":
      return t.trainerMyGovPortal;
    case "atm":
      return t.trainerAtm;
    case "credit-contract":
      return t.trainerCreditContract;
    case "final-quest":
      return t.trainerFinalQuest;
    case "washing-machine-v2":
      return t.trainerWashingMachine;
    case "detergent-dosage":
      return t.trainerDetergent;
    case "menu-builder":
      return t.trainerMenu;
    case "recipe-reader":
      return t.trainerRecipe;
    case "recipe-timer":
      return t.trainerRecipeTimer;
    case "sign-language":
      return "ISL Gesture Practice";
    default:
      return t.trainerLabel;
  }
}

export function LessonExperience({
  lesson,
  embedded = false,
  onBack,
  onOpenLessons,
}: LessonExperienceProps) {
  const { user, completeLesson } = useAuth();
  const locale = useLocale();
  const t = dict[locale];
  const isStudent = user?.role === "student";
  const [focusMode, setFocusMode] = useState(isStudent);
  const [stage, setStage] = useState<LessonStage>("rules");
  const [ruleIndex, setRuleIndex] = useState(0);
  const [trainerIndex, setTrainerIndex] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [scenarioAnswers, setScenarioAnswers] = useState<number[]>(
    () => createAnswerState(lesson.scenarios.length),
  );
  const [quizAnswers, setQuizAnswers] = useState<number[]>(
    () => createAnswerState(lesson.quiz.length),
  );
  const [notice, setNotice] = useState("");
  const [showAnswerRequiredNotice, setShowAnswerRequiredNotice] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Adaptation experience flags and helpers
  const experience = lesson.experience;
  const isAudioFirst = Boolean(experience?.audioFirst);
  const isCaptions = Boolean(experience?.showCaptions);
  const isReadingSupport = Boolean(experience?.simplifiedText);

  // Audio-First state
  const [audioIsSpeaking, setAudioIsSpeaking] = useState(false);

  // Captions state
  const [feedbackCaption, setFeedbackCaption] = useState<string | null>(null);
  const [activeSoundCue, setActiveSoundCue] = useState<{ tag: string; label: string } | null>(null);

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, []);

  const completed = Boolean(
    user?.progress.some((entry) => entry.lessonSlug === lesson.slug),
  );
  const currentScenario = lesson.scenarios[scenarioIndex];
  const currentQuiz = lesson.quiz[quizIndex];
  const currentScenarioAnswer = scenarioAnswers[scenarioIndex];
  const currentQuizAnswer = quizAnswers[quizIndex];
  const quizScore = lesson.quiz.reduce((score, question, index) => {
    return score + (quizAnswers[index] === question.correctIndex ? 1 : 0);
  }, 0);

  const rootClassName = [
    "lesson-experience",
    focusMode ? "focus-mode" : "",
    embedded ? "lesson-experience--embedded" : "",
    isStudent ? "lesson-experience--student" : "",
  ].filter(Boolean).join(" ");

  const allTrainers: LessonTrainer[] = [
    ...(lesson.trainer ? [lesson.trainer] : []),
    ...(lesson.extraTrainers ?? []),
  ];
  const hasTrainer = allTrainers.length > 0;
  const currentTrainer = allTrainers[trainerIndex];
  const trainerStepsTotal = allTrainers.length;
  const trainerStepsDone =
    stage === "scenario" || stage === "quiz" || stage === "finish"
      ? trainerStepsTotal
      : stage === "trainer"
        ? trainerIndex
        : 0;
  const totalSteps = 1 + trainerStepsTotal + lesson.scenarios.length + lesson.quiz.length + 1;
  const completedSteps =
    (stage === "rules" ? 0 : 1) +
    trainerStepsDone +
    scenarioAnswers.filter((value) => value !== -1).length +
    quizAnswers.filter((value) => value !== -1).length +
    (stage === "finish" ? 1 : 0);
  const progress =
    stage === "finish"
      ? 100
      : Math.round((completedSteps / Math.max(totalSteps, 1)) * 100);

  const trainerOffset = trainerStepsTotal;
  const currentStepNumber =
    stage === "rules"
      ? 1
      : stage === "trainer"
        ? 2 + trainerIndex
        : stage === "scenario"
          ? 2 + trainerOffset + scenarioIndex
          : stage === "quiz"
            ? 2 + trainerOffset + lesson.scenarios.length + quizIndex
            : totalSteps;

  // ── Mascot hints per stage ──
  function mascotForStage(): { message: string; mood: MascotMood } | null {
    if (stage === "rules") {
      if (ruleIndex === 0) {
        return { message: t.mascotIntro, mood: "happy" };
      }
      if (ruleIndex === lesson.rules.length - 1) {
        return { message: t.mascotLastRule, mood: "happy" };
      }
      return { message: t.mascotReadRule, mood: "happy" };
    }
    if (stage === "trainer") {
      return { message: t.mascotTrainer, mood: "thinking" };
    }
    if (stage === "scenario") {
      if (currentScenarioAnswer === -1) {
        return { message: t.mascotScenarioChoose, mood: "thinking" };
      }
      if (currentScenarioAnswer === currentScenario.correctIndex) {
        return { message: t.mascotScenarioCorrect, mood: "cheer" };
      }
      return { message: t.mascotScenarioWrong, mood: "soft" };
    }
    if (stage === "quiz") {
      if (currentQuizAnswer === -1) {
        return { message: t.mascotQuizChoose, mood: "happy" };
      }
      if (currentQuizAnswer === currentQuiz.correctIndex) {
        return { message: t.mascotQuizCorrect, mood: "cheer" };
      }
      return { message: t.mascotQuizWrong, mood: "soft" };
    }
    if (stage === "finish") {
      return { message: t.mascotFinish, mood: "cheer" };
    }
    return null;
  }
  const mascotHint = isStudent ? mascotForStage() : null;

  // Stage-level structured spoken narration builder
  function getStageNarration(): string {
    return buildNarrationForStage(stage, {
      ruleIndex,
      totalRules: lesson.rules.length,
      ruleText: lesson.rules[ruleIndex],
      scenarioTitle: currentScenario?.title,
      scenarioText: currentScenario?.text,
      scenarioOptions: currentScenario?.options,
      quizIndex,
      totalQuizzes: lesson.quiz.length,
      quizQuestion: currentQuiz?.question,
      quizOptions: currentQuiz?.options,
      trainerTitle: currentTrainer ? trainerTitle(currentTrainer, t) : undefined,
      trainerOverview: lesson.trainerGuidance?.[currentTrainer?.type ?? ""]?.audioOverview,
      imageDescription: lesson.imageDescription,
    });
  }

  function playCurrentNarration() {
    const speech = getStageNarration();
    if (!speech) return;
    speakNarration(speech, {
      onStart: () => setAudioIsSpeaking(true),
      onEnd: () => setAudioIsSpeaking(false),
      onError: () => setAudioIsSpeaking(false),
    });
  }

  function pauseCurrentNarration() {
    stopNarration();
    setAudioIsSpeaking(false);
  }

  // Automatic spoken announcements for Visual Support (Audio-First)
  useEffect(() => {
    if (experience?.autoSpeak) {
      playCurrentNarration();
    }
    return () => {
      stopNarration();
      setAudioIsSpeaking(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, ruleIndex, scenarioIndex, quizIndex, experience?.autoSpeak]);

  // Derived real-time captions for Hearing Support
  const currentCaptionText =
    feedbackCaption ||
    (stage === "rules"
      ? `[CC Rule ${ruleIndex + 1}/${lesson.rules.length}]: ${lesson.rules[ruleIndex]}`
      : stage === "scenario" && currentScenario
        ? `[CC Situation]: ${currentScenario.title} — ${currentScenario.text}`
        : stage === "quiz" && currentQuiz
          ? `[CC Question ${quizIndex + 1}/${lesson.quiz.length}]: ${currentQuiz.question}`
          : stage === "trainer"
            ? `[CC Practice Trainer]: Follow step-by-step chat prompts below.`
            : `[CC Complete]: All lesson exercises completed successfully.`);

  function triggerAnswerFeedback(correct: boolean, feedbackText: string) {
    if (isCaptions) {
      setActiveSoundCue(
        correct
          ? { tag: "✓ SOUND ALERT", label: "Success chime played · Safe choice confirmed" }
          : { tag: "⚠️ SOUND ALERT", label: "Warning tone · Review safety guidance" },
      );
      setFeedbackCaption(`[CC Feedback]: ${correct ? "Correct! " : "Review: "}${feedbackText}`);
      setTimeout(() => {
        setActiveSoundCue(null);
        setFeedbackCaption(null);
      }, 3500);
    }
    if (experience?.autoSpeak) {
      speakNarration(correct ? `Correct! ${feedbackText}` : `Notice: ${feedbackText}`, {
        onStart: () => setAudioIsSpeaking(true),
        onEnd: () => setAudioIsSpeaking(false),
        onError: () => setAudioIsSpeaking(false),
      });
    }
  }

  function readLessonAloud() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setNotice(t.speechUnavailable);
      return;
    }

    const speechText =
      stage === "rules"
        ? `${t.speechRules} ${lesson.rules.join(". ")}.`
        : stage === "scenario"
          ? `${t.speechSituation} ${currentScenario.text}`
          : stage === "quiz"
            ? `${t.speechQuestion} ${currentQuiz.question}`
            : t.speechLessonDone;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = t.speechLang;
    utterance.rate = 0.92;
    window.speechSynthesis.speak(utterance);
    if (user) {
      void logAction({
        lessonSlug: lesson.slug,
        action: "hint_used",
        metadata: { stage },
      }).catch(() => undefined);
    }
    setNotice(t.speechReading);
  }

  function startLesson() {
    if (user) {
      void logAction({
        lessonSlug: lesson.slug,
        action: "lesson_start",
        metadata: { hasTrainer },
      }).catch(() => undefined);
    }

    if (hasTrainer) {
      setStage("trainer");
      setTrainerIndex(0);
      setNotice(t.trainerStartNotice);
    } else {
      setStage("scenario");
      setNotice(t.firstScenarioNotice);
    }
  }

  function trackAnswer(kind: "scenario" | "quiz", answerIndex: number, correctIndex: number) {
    if (!user) return;

    void logAction({
      lessonSlug: lesson.slug,
      action: answerIndex === correctIndex ? "answer_correct" : "answer_wrong",
      metadata: {
        kind,
        answerIndex,
        correctIndex,
        stepIndex: kind === "scenario" ? scenarioIndex : quizIndex,
      },
    }).catch(() => undefined);
  }

  function finishTrainer() {
    if (trainerIndex + 1 < allTrainers.length) {
      const nextTrainer = allTrainers[trainerIndex + 1];
      setTrainerIndex((current) => current + 1);
      const nextTitle = trainerTitle(nextTrainer, t);
      const stripped =
        locale === "ru"
          ? nextTitle.replace(/^Trainer\s+/, "")
          : nextTitle.replace(/\s+mashqi$/, "");
      setNotice(`${t.nextTrainerNoticePrefix}${stripped}${t.nextTrainerNoticeSuffix}`);
      return;
    }
    setStage("scenario");
    setNotice(t.shortSituationsNotice);
  }

  function openFinishStage(message: string) {
    setStage("finish");
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
    setNotice(message);
  }

  function goToNextScenario() {
    if (currentScenarioAnswer === -1) {
      setShowAnswerRequiredNotice(true);
      setNotice(t.chooseAnswerFirst);
      return;
    }

    setShowAnswerRequiredNotice(false);

    if (scenarioIndex < lesson.scenarios.length - 1) {
      setScenarioIndex((current) => current + 1);
      setNotice(t.nextScenarioNotice);
      return;
    }

    if (lesson.quiz.length > 0) {
      setStage("quiz");
      setNotice(t.shortQuestionLeft);
    } else {
      openFinishStage(t.lessonDoneGood);
    }
  }

  function goToNextQuiz() {
    if (currentQuizAnswer === -1) {
      setNotice(t.chooseOneFirst);
      return;
    }

    if (quizIndex < lesson.quiz.length - 1) {
      setQuizIndex((current) => current + 1);
      setNotice(t.goNext);
      return;
    }

    openFinishStage(t.lessonFinishedScore(quizScore, lesson.quiz.length));
  }

  async function saveProgress() {
    if (stage !== "finish") {
      setNotice(t.finishFirst);
      return;
    }

    if (!user) {
      setNotice(t.loginToSave);
      return;
    }

    setIsSaving(true);
    try {
      await completeLesson(lesson.slug, quizScore);
      setNotice(t.savedToCabinet);
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : t.saveFailed,
      );
    } finally {
      setIsSaving(false);
    }
  }

  function resetLesson() {
    setStage("rules");
    setScenarioIndex(0);
    setQuizIndex(0);
    setScenarioAnswers(createAnswerState(lesson.scenarios.length));
    setQuizAnswers(createAnswerState(lesson.quiz.length));
    setNotice(t.lessonRestarted);
  }

  const scenarioAnswered = currentScenarioAnswer !== -1;
  const scenarioCorrect =
    scenarioAnswered && currentScenarioAnswer === currentScenario.correctIndex;
  const scenarioPanelAnswers = createPanelAnswers({
    idPrefix: `scenario-${scenarioIndex}`,
    options: currentScenario.options,
    selectedIndex: currentScenarioAnswer,
    correctIndex: currentScenario.correctIndex,
    onChoose: (optionIndex) => {
      setScenarioAnswers((current) => replaceAnswer(current, scenarioIndex, optionIndex));
      trackAnswer("scenario", optionIndex, currentScenario.correctIndex);
      setNotice("");
      const isCorrect = optionIndex === currentScenario.correctIndex;
      triggerAnswerFeedback(isCorrect, isCorrect ? currentScenario.feedback : currentScenario.support);
    },
  });
  const scenarioNextLabel =
    scenarioIndex < lesson.scenarios.length - 1
      ? t.nextSituation
      : lesson.quiz.length > 0
        ? t.shortQuestion
        : t.finishLesson;

  const quizAnswered = currentQuizAnswer !== -1;
  const quizCorrect = quizAnswered && currentQuizAnswer === currentQuiz.correctIndex;
  const quizPanelAnswers = createPanelAnswers({
    idPrefix: `quiz-${quizIndex}`,
    options: currentQuiz.options,
    selectedIndex: currentQuizAnswer,
    correctIndex: currentQuiz.correctIndex,
    onChoose: (optionIndex) => {
      setQuizAnswers((current) => replaceAnswer(current, quizIndex, optionIndex));
      trackAnswer("quiz", optionIndex, currentQuiz.correctIndex);
      setNotice("");
      const isCorrect = optionIndex === currentQuiz.correctIndex;
      triggerAnswerFeedback(isCorrect, isCorrect ? t.answerCorrectGoNext : t.correctAnswerHighlighted);
    },
  });

  function renderTrainer() {
    if (!currentTrainer) return null;

    const keyId = `trainer-${trainerIndex}-${currentTrainer.type}`;

    switch (currentTrainer.type) {
      case "telegram":
        return (
          <TelegramTrainer
            key={keyId}
            trainer={currentTrainer}
            iconMode={embedded ? "svg" : "emoji"}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "whatsapp":
        return (
          <WhatsappTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "gmail":
        return (
          <GmailTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "mailru":
        return (
          <MailruTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "uzum":
        return (
          <UzumTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "yandexmarket":
        return (
          <YandexMarketTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "mygov":
        return (
          <MyGovTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "phone":
        return (
          <PhoneTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "morning-quest":
        return (
          <MorningQuestTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "outfit":
        return (
          <OutfitTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "hair-care":
        return (
          <HairCareTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "skin-type":
        return (
          <SkinTypeTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "sun-care":
        return (
          <SunCareTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "label-reader":
        return (
          <LabelReaderTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "step-sequence":
        return (
          <StepSequenceTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "volume-safe":
        return (
          <VolumeSafeTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "thermometer":
        return (
          <ThermometerTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "seasonal-clothing":
        return (
          <SeasonalClothingTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "care-label":
        return (
          <CareLabelTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "table-setting":
        return (
          <TableSettingTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "family-income":
        return (
          <FamilyIncomeTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "family-expenses":
        return (
          <FamilyExpensesTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "transport-types":
        return (
          <TransportTypesTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "schedule-board":
        return (
          <ScheduleBoardTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "ticket-purchase":
        return (
          <TicketPurchaseTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "package-tracking":
        return (
          <PackageTrackingTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "phone-call-flow":
        return (
          <PhoneCallFlowTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "messenger-flow":
        return (
          <MessengerFlowTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
            profile={lesson.adaptationMeta?.supportType}
            experience={lesson.experience}
          />
        );
      case "safety-etiquette":
        return (
          <SafetyEtiquetteTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "mygov-portal":
        return (
          <MyGovPortalTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "atm":
        return (
          <AtmTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "credit-contract":
        return (
          <CreditContractTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "final-quest":
        return (
          <FinalQuestTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "washing-machine-v2":
        return (
          <WashingMachineTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "detergent-dosage":
        return (
          <DetergentDosageTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "menu-builder":
        return (
          <MenuBuilderTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "recipe-reader":
        return (
          <RecipeReaderTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "recipe-timer":
        return (
          <RecipeTimerTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "sign-language":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <SignLanguageTrainer
              key={keyId}
              targetSign={currentTrainer.targetSign}
              title={currentTrainer.title}
              subtitle={currentTrainer.subtitle}
              onSuccess={finishTrainer}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
              <button
                type="button"
                className="button button-primary"
                onClick={finishTrainer}
              >
                Proceed to questions
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <section
      className={rootClassName}
      data-stage={stage}
      data-trainer={currentTrainer?.type ?? lesson.trainer?.type}
    >
      {showCelebration && (
        <div
          className="lesson-complete-overlay"
          onClick={() => setShowCelebration(false)}
          role="dialog"
          aria-label={t.lessonCompleteAria}
        >
          <div className="lesson-complete-card">
            <div
              className={`lesson-complete-star ${
                embedded ? "lesson-complete-star--svg" : ""
              }`}
            >
              {embedded ? <CabinetIcon name="trophy" /> : publicCelebrationSymbol}
            </div>
            <p className="lesson-complete-title">{t.bravo}</p>
            <p className="lesson-complete-subtitle">{t.lessonPassedKeepGoing}</p>
          </div>
        </div>
      )}
      <div className="lesson-toolbar">
        <div className="progress-shell">
          <div className="progress-label">
            <span>
              {t.stepOf(currentStepNumber, totalSteps)}
            </span>
            <strong>{progress}%</strong>
          </div>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        {!isStudent ? (
          <div className="lesson-toolbar-actions">
            <button
              type="button"
              className="button button-ghost small"
              onClick={() => setFocusMode((value) => !value)}
            >
              {focusMode ? t.normalMode : t.focusMode}
            </button>
            <button
              type="button"
              className="button button-secondary small"
              onClick={readLessonAloud}
            >
              {t.readAloud}
            </button>
          </div>
        ) : (
          <div className="lesson-toolbar-actions">
            <button
              type="button"
              className="button button-secondary small"
              onClick={readLessonAloud}
              aria-label={t.readAloud}
              title={t.readAloud}
            >
              <CabinetIcon name="sound" />
              {t.voice}
            </button>
          </div>
        )}
      </div>

      {mascotHint ? (
        <Mascot message={mascotHint.message} mood={mascotHint.mood} variant="inline" />
      ) : null}

      <div className="lesson-grid">
        <div className="lesson-main">
          {/* Audio-First Controller for Visual Support Profile */}
          {isAudioFirst && (
            <div className="mosaic-audio-first-controller" role="region" aria-label="Audio Guidance Controller">
              <div className="mosaic-audio-indicator">
                <span className={`mosaic-audio-pulse-dot ${audioIsSpeaking ? "pulsing" : ""}`} aria-hidden="true" />
                <span className="mosaic-audio-state-text">
                  {audioIsSpeaking ? "🔊 Speaking screen guide..." : "Audio-first guide ready"}
                </span>
              </div>
              <button
                type="button"
                className={`mosaic-audio-ctrl-btn ${audioIsSpeaking ? "active" : ""}`}
                onClick={audioIsSpeaking ? pauseCurrentNarration : playCurrentNarration}
                aria-label={audioIsSpeaking ? "Pause audio narration" : "Replay audio narration"}
              >
                {audioIsSpeaking ? "⏸ Pause Audio" : "🔊 Replay Audio"}
              </button>
            </div>
          )}

          {/* Persistent Captions & Visual Cue Panel for Hearing Support Profile */}
          {isCaptions && (
            <div className="mosaic-captions-display-bar" role="region" aria-live="polite" aria-label="Live Captions and Visual Cues">
              <div className="mosaic-captions-top">
                <span className="mosaic-cc-badge">CC</span>
                <span className="mosaic-captions-label">Live Captions &amp; Visual Audio Cues</span>
                {activeSoundCue ? (
                  <span className="mosaic-sound-badge-active">
                    {activeSoundCue.tag}: {activeSoundCue.label}
                  </span>
                ) : null}
              </div>
              <p className="mosaic-captions-text">{currentCaptionText}</p>
            </div>
          )}

          {/* Visual Interface Description Box for Visual Support Profile */}
          {(isAudioFirst || experience?.showImageDescriptions) && lesson.imageDescription && (
            <div className="mosaic-visual-description-box" role="region" aria-label="Visual Interface Description">
              <div className="mosaic-vdesc-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                <strong>Visual Interface Description</strong>
              </div>
              <p>{lesson.imageDescription}</p>
            </div>
          )}

          {/* Important Safety Rule Box for Reading Support Profile */}
          {isReadingSupport && lesson.importantWarning && (
            <div className="mosaic-reading-warning-box" role="alert">
              <span className="mosaic-warning-tag">⚠️ IMPORTANT SAFETY RULE</span>
              <p>{lesson.importantWarning}</p>
            </div>
          )}

          {stage === "rules" ? (
            isStudent ? (
              <div className="lesson-panel lesson-step-panel lesson-rule-single">
                <p className="lesson-panel-title">
                  {t.ruleOf(ruleIndex + 1, lesson.rules.length)}
                </p>
                <div className="lesson-rule-big">
                  <span className="lesson-rule-big-number">{ruleIndex + 1}</span>
                  <p className="lesson-rule-big-text">{lesson.rules[ruleIndex]}</p>
                </div>

                <div className="lesson-rule-dots" aria-hidden="true">
                  {lesson.rules.map((_, i) => (
                    <span
                      key={i}
                      className={`lesson-rule-dot${i === ruleIndex ? " active" : ""}${i < ruleIndex ? " done" : ""}`}
                    />
                  ))}
                </div>

                <div className="lesson-actions lesson-actions--centered">
                  {ruleIndex > 0 ? (
                    <button
                      type="button"
                      className="button button-ghost"
                      onClick={() => setRuleIndex((i) => i - 1)}
                    >
                      {t.back}
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="button button-primary button-big"
                    onClick={() => {
                      if (ruleIndex < lesson.rules.length - 1) {
                        setRuleIndex((i) => i + 1);
                      } else {
                        startLesson();
                      }
                    }}
                  >
                    {ruleIndex < lesson.rules.length - 1
                      ? t.next
                      : hasTrainer ? t.openTrainer : t.startTasks}
                  </button>
                </div>
              </div>
            ) : (
              <div className="lesson-panel lesson-step-panel">
                <p className="lesson-panel-title">{t.firstRules}</p>
                <h2 className="lesson-step-heading">{t.readRulesOneByOne}</h2>
                <div className="lesson-rule-cards">
                  {lesson.rules.map((rule, index) => (
                    <div key={rule} className="lesson-rule-card">
                      <strong>{index + 1}</strong>
                      <p>{rule}</p>
                    </div>
                  ))}
                </div>
                <div className="lesson-actions">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={startLesson}
                  >
                    {hasTrainer ? t.openTrainer : t.startTasks}
                  </button>
                </div>
              </div>
            )
          ) : null}

          {stage === "trainer" && currentTrainer ? (
            <div className={isStudent ? "lesson-trainer-bare" : "lesson-panel lesson-step-panel lesson-trainer-panel"}>
              {!isStudent ? (
                <>
                  <p className="lesson-panel-title">
                    {trainerTitle(currentTrainer, t)}
                    {trainerStepsTotal > 1 ? (
                      <span className="lesson-trainer-step-tag">
                        {t.trainerPartOf(trainerIndex + 1, trainerStepsTotal)}
                      </span>
                    ) : null}
                  </p>
                  <h2 className="lesson-step-heading">{t.tryAsRealApp}</h2>
                </>
              ) : null}
              {renderTrainer()}
            </div>
          ) : null}

          {stage === "scenario" ? (
            isStudent ? (
              <div className="student-lesson-workspace student-lesson-workspace--scenario">
                <div className="student-lesson-activity student-lesson-activity--scene">
                  <SceneScenario
                    scenario={currentScenario}
                    moduleSlug={lesson.moduleSlug ?? ""}
                    index={scenarioIndex}
                    total={lesson.scenarios.length}
                    chosenIndex={currentScenarioAnswer}
                    onChoose={(i) => {
                      setScenarioAnswers((cur) =>
                        replaceAnswer(cur, scenarioIndex, i),
                      );
                      trackAnswer("scenario", i, currentScenario.correctIndex);
                      setNotice("");
                    }}
                    onNext={goToNextScenario}
                    showControls={false}
                  />
                </div>

                <StudentTaskPanel
                  title={t.sortSituation}
                  instruction={t.sortSituationInstruction}
                  question={currentScenario.title}
                  status={
                    scenarioAnswered
                      ? t.answerChosenSeeExplanation
                      : t.situationOf(scenarioIndex + 1, lesson.scenarios.length)
                  }
                  answers={scenarioPanelAnswers}
                  hint={t.scenarioHint}
                  feedback={
                    scenarioAnswered
                      ? {
                          tone: scenarioCorrect ? "good" : "soft",
                          title: scenarioCorrect ? t.correct : t.letsRemember,
                          text: scenarioCorrect
                            ? currentScenario.feedback
                            : currentScenario.support,
                        }
                      : null
                  }
                  primaryAction={{
                    label: scenarioAnswered ? scenarioNextLabel : t.chooseAnswerFirstShort,
                    onClick: goToNextScenario,
                    disabled: !scenarioAnswered,
                  }}
                />
              </div>
            ) : (
              <div className="lesson-panel lesson-step-panel">
                <p className="lesson-panel-title">{t.practicalSituation}</p>
                <h2 className="lesson-step-heading">{currentScenario.title}</h2>
                <p className="lesson-step-copy">{currentScenario.text}</p>
                <p className="lesson-step-helper">{t.chooseCalmSafe}</p>

                <div className="option-list step-options">
                  {currentScenario.options.map((option, optionIndex) => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button step-option ${
                        currentScenarioAnswer === optionIndex ? "selected" : ""
                      }`}
                      onClick={() => {
                        setShowAnswerRequiredNotice(false);
                        setScenarioAnswers((current) =>
                          replaceAnswer(current, scenarioIndex, optionIndex),
                        );
                        trackAnswer("scenario", optionIndex, currentScenario.correctIndex);
                        setNotice("");
                        const isCorrect = optionIndex === currentScenario.correctIndex;
                        triggerAnswerFeedback(isCorrect, isCorrect ? currentScenario.feedback : currentScenario.support);
                      }}
                    >
                      <span className="step-option-index">{optionIndex + 1}</span>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>

                {currentScenarioAnswer !== -1 ? (
                  <div
                    className={`feedback ${
                      currentScenarioAnswer === currentScenario.correctIndex
                        ? "good"
                        : "neutral"
                    }`}
                  >
                    <strong>
                      {currentScenarioAnswer === currentScenario.correctIndex
                        ? t.goodShort
                        : t.lookAgainCalmly}
                    </strong>
                    <p>
                      {currentScenarioAnswer === currentScenario.correctIndex
                        ? currentScenario.feedback
                        : currentScenario.support}
                    </p>
                  </div>
                ) : null}

                {showAnswerRequiredNotice && currentScenarioAnswer === -1 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.625rem 1rem",
                      backgroundColor: "#FBECE5",
                      border: "1px solid #D8663F",
                      borderRadius: "10px",
                      color: "#D8663F",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      marginTop: "1rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <span>⚠️</span>
                    <span>{t.chooseAnswerFirst}</span>
                  </div>
                )}

                <div className="lesson-actions">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={goToNextScenario}
                  >
                    {scenarioIndex < lesson.scenarios.length - 1
                      ? t.nextSituation
                      : lesson.quiz.length > 0
                        ? t.goToQuestions
                        : t.finishLesson}
                  </button>
                </div>
              </div>
            )
          ) : null}

          {stage === "quiz" ? (
            isStudent ? (
              <div className="student-lesson-workspace student-lesson-workspace--quiz">
                <div className="student-lesson-activity student-lesson-activity--quiz">
                  <div className="student-question-board">
                    <p>{t.shortQuestionTitle}</p>
                    <strong>{quizIndex + 1}</strong>
                    <span>{t.readQuestionRight}</span>
                  </div>
                </div>

                <StudentTaskPanel
                  title={t.answerQuestion}
                  instruction={t.oneShortQuestion}
                  question={currentQuiz.question}
                  status={t.questionOf(quizIndex + 1, lesson.quiz.length)}
                  answers={quizPanelAnswers}
                  hint={t.quizHint}
                  feedback={
                    quizAnswered
                      ? {
                          tone: quizCorrect ? "good" : "soft",
                          title: quizCorrect ? t.correct : t.letsRemember,
                          text: quizCorrect
                            ? t.answerCorrectGoNext
                            : t.correctAnswerHighlighted,
                        }
                      : null
                  }
                  primaryAction={{
                    label: quizAnswered
                      ? quizIndex < lesson.quiz.length - 1
                        ? t.nextQuestion
                        : t.finishLesson
                      : t.chooseAnswerFirstShort,
                    onClick: goToNextQuiz,
                    disabled: !quizAnswered,
                  }}
                />
              </div>
            ) : (
              <div className="lesson-panel lesson-step-panel">
                <p className="lesson-panel-title">{t.knowledgeCheck}</p>
                <h2 className="lesson-step-heading">{t.questionWord(quizIndex + 1)}</h2>
                <p className="lesson-step-copy">{currentQuiz.question}</p>
                <p className="lesson-step-helper">{t.tapOneAnswer}</p>

                <div className="option-list step-options">
                  {currentQuiz.options.map((option, optionIndex) => {
                    const revealState =
                      currentQuizAnswer !== -1 && optionIndex === currentQuiz.correctIndex
                        ? "correct"
                        : currentQuizAnswer !== -1 && currentQuizAnswer === optionIndex
                          ? "wrong"
                          : "";

                    return (
                      <button
                        key={option}
                        type="button"
                        className={`option-button step-option ${revealState}`}
                        onClick={() => {
                          setQuizAnswers((current) =>
                            replaceAnswer(current, quizIndex, optionIndex),
                          );
                          trackAnswer("quiz", optionIndex, currentQuiz.correctIndex);
                          setNotice("");
                          const isCorrect = optionIndex === currentQuiz.correctIndex;
                          triggerAnswerFeedback(isCorrect, isCorrect ? t.answerCorrectGoNext : t.correctAnswerHighlighted);
                        }}
                      >
                        <span className="step-option-index">{optionIndex + 1}</span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {currentQuizAnswer !== -1 ? (
                  <div
                    className={`feedback ${
                      currentQuizAnswer === currentQuiz.correctIndex ? "good" : "neutral"
                    }`}
                  >
                    <strong>
                      {currentQuizAnswer === currentQuiz.correctIndex
                        ? t.rightShort
                        : t.noWorries}
                    </strong>
                    <p>
                      {currentQuizAnswer === currentQuiz.correctIndex
                        ? t.answerCorrectGoNext
                        : t.correctAnswerHighlightedFormal}
                    </p>
                  </div>
                ) : null}

                <div className="lesson-actions">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={goToNextQuiz}
                  >
                    {quizIndex < lesson.quiz.length - 1
                      ? t.nextQuestion
                      : t.finishLesson}
                  </button>
                </div>
              </div>
            )
          ) : null}

          {stage === "finish" ? (
            isStudent ? (
              <div className="student-lesson-workspace student-lesson-workspace--finish">
                <div className="student-lesson-activity student-lesson-activity--finish">
                  <div className="student-finish-board">
                    <span aria-hidden="true">
                      <CabinetIcon name="trophy" />
                    </span>
                    <strong>{t.finishBoardTitle}</strong>
                    <p>{t.finishBoardCopy}</p>
                  </div>
                </div>

                <StudentTaskPanel
                  title={t.saveResultPanel}
                  instruction={t.saveResultPanelInstruction}
                  status={t.statsLine(lesson.scenarios.length, lesson.quiz.length)}
                  feedback={{
                    tone: "good",
                    title: t.done,
                    text:
                      lesson.quiz.length > 0
                        ? t.correctAnswersOf(quizScore, lesson.quiz.length)
                        : t.mainSituationsCovered,
                  }}
                  primaryAction={{
                    label: isSaving
                      ? t.saving
                      : completed
                        ? t.updateResult
                        : t.saveResult,
                    onClick: saveProgress,
                    disabled: isSaving,
                  }}
                  secondaryAction={{
                    label: t.retake,
                    onClick: resetLesson,
                    variant: "ghost",
                  }}
                />
              </div>
            ) : (
              <div className="lesson-panel lesson-step-panel lesson-finish-panel">
                <p className="lesson-panel-title">{t.lessonFinished}</p>
                <h2 className="lesson-step-heading">{t.lessonFinishedNoOverload}</h2>
                <div className="lesson-finish-grid">
                  <div className="lesson-rule-card">
                    <strong>{quizScore}</strong>
                    <p>{t.correctAnswersWord}</p>
                  </div>
                  <div className="lesson-rule-card">
                    <strong>{lesson.quiz.length}</strong>
                    <p>{t.questionsPassed}</p>
                  </div>
                  <div className="lesson-rule-card">
                    <strong>{lesson.scenarios.length}</strong>
                    <p>{t.situationsSolved}</p>
                  </div>
                </div>
                <div className="lesson-actions">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={saveProgress}
                    disabled={isSaving}
                  >
                    {isSaving
                      ? t.saving
                      : completed
                        ? t.updateResult
                        : t.saveResult}
                  </button>
                  <button
                    type="button"
                    className="button button-ghost"
                    onClick={resetLesson}
                  >
                    {t.retake}
                  </button>
                </div>
              </div>
            )
          ) : null}
        </div>

        {!isStudent ? (
          <aside className="lesson-side">
            <div className="lesson-panel side">
              <p className="lesson-panel-title">{t.adultHint}</p>
              <p className="support-copy">{lesson.adultNote}</p>
            </div>

            <div className="lesson-panel side">
              <p className="lesson-panel-title">{t.whatsNext}</p>
              <div className="next-steps">
                {embedded ? (
                  <>
                    <button
                      type="button"
                      className="button button-secondary"
                      onClick={onBack}
                    >
                      {t.toLessonsList}
                    </button>
                    <button
                      type="button"
                      className="button button-ghost"
                      onClick={onOpenLessons}
                    >
                      {t.otherLessons}
                    </button>
                  </>
                ) : (
                  <>
                    <Link className="button button-secondary" href="/dashboard#today">
                      {t.backToCabinet}
                    </Link>
                    <Link className="button button-ghost" href="/dashboard#lessons">
                      {t.openOtherLessons}
                    </Link>
                  </>
                )}
              </div>
            </div>

            {notice ? (
              <div className="lesson-panel side notice-panel">
                <p className="lesson-panel-title">{t.message}</p>
                <p>{notice}</p>
              </div>
            ) : null}
          </aside>
        ) : null}
      </div>
    </section>
  );
}
