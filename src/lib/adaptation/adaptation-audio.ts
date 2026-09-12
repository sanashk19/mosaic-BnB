/**
 * Audio-First Text-to-Speech orchestration for Mosaic.
 * Speaks headings before body, speaks interactive choices in logical order,
 * and handles pause/cancel/replay cleanly.
 */

export function stopNarration(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakNarration(
  text: string,
  callbacks?: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  },
): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    callbacks?.onEnd?.();
    return;
  }

  stopNarration();

  const cleanText = text.replace(/\[CC\]|\[ALERT\]|\[CHECK\]|\[SAFE\]|\[UNSAFE\]/g, "").trim();
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  utterance.lang = "en-US";

  if (callbacks?.onStart) utterance.onstart = callbacks.onStart;
  if (callbacks?.onEnd) utterance.onend = callbacks.onEnd;
  if (callbacks?.onError) utterance.onerror = callbacks.onError;

  window.speechSynthesis.speak(utterance);
}

/**
 * Builds a natural, structured spoken narration for a given screen stage.
 */
export function buildNarrationForStage(
  stage: "rules" | "trainer" | "scenario" | "quiz" | "finish",
  payload: {
    ruleIndex?: number;
    totalRules?: number;
    ruleText?: string;
    scenarioTitle?: string;
    scenarioText?: string;
    scenarioOptions?: string[];
    quizIndex?: number;
    totalQuizzes?: number;
    quizQuestion?: string;
    quizOptions?: string[];
    trainerTitle?: string;
    trainerOverview?: string;
    imageDescription?: string;
  },
): string {
  switch (stage) {
    case "rules": {
      const idx = (payload.ruleIndex ?? 0) + 1;
      const total = payload.totalRules ?? 1;
      let speech = `Rule ${idx} of ${total}: ${payload.ruleText ?? ""}.`;
      if (payload.imageDescription) {
        speech += ` Visual layout description: ${payload.imageDescription}`;
      }
      speech += " Press next to continue, or replay audio to listen again.";
      return speech;
    }

    case "scenario": {
      let speech = `Practical Situation: ${payload.scenarioTitle ?? ""}. ${payload.scenarioText ?? ""}.`;
      if (payload.scenarioOptions && payload.scenarioOptions.length > 0) {
        speech += " Here are your choices: ";
        payload.scenarioOptions.forEach((opt, i) => {
          speech += ` Choice ${i + 1}: ${opt}.`;
        });
        speech += " Select your choice below.";
      }
      return speech;
    }

    case "quiz": {
      const qIdx = (payload.quizIndex ?? 0) + 1;
      const qTotal = payload.totalQuizzes ?? 1;
      let speech = `Question ${qIdx} of ${qTotal}: ${payload.quizQuestion ?? ""}.`;
      if (payload.quizOptions && payload.quizOptions.length > 0) {
        speech += " Options: ";
        payload.quizOptions.forEach((opt, i) => {
          speech += ` Option ${i + 1}: ${opt}.`;
        });
        speech += " Tap an option to answer.";
      }
      return speech;
    }

    case "trainer": {
      let speech = `Interactive Trainer: ${payload.trainerTitle ?? "Practice Exercise"}.`;
      if (payload.trainerOverview) {
        speech += ` ${payload.trainerOverview}`;
      }
      if (payload.imageDescription) {
        speech += ` Layout: ${payload.imageDescription}`;
      }
      return speech;
    }

    case "finish": {
      return "Congratulations! You have completed all exercises in this lesson. Great job!";
    }

    default:
      return "";
  }
}
