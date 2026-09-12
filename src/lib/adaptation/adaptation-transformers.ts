import type { ProgramLesson } from "@/data/program";
import type { LessonScreens } from "@/lib/lesson-screens-types";
import type { AccessibilityProfile } from "@/lib/adaptation/adaptation-types";

/**
 * Flagship lesson specialized adaptations for 'messenger-message' (Staying Safe Online / Internet Chat)
 */
const FLAGSHIP_ADAPTATIONS = {
  reading: {
    title: "Staying Safe Online (Simplified)",
    summary: "1. Choose who to talk to. 2. Write politely. 3. Never share private details.",
    intro: "Learn how to send safe messages. Step 1: Open chat. Step 2: Read message. Step 3: Reply safely.",
    rules: [
      "1. Open the app.",
      "2. Look for the message button.",
      "3. Never talk to strangers.",
      "4. If in doubt, ask an adult.",
    ],
    goals: [
      "Send a safe message to family.",
      "Keep your personal info private.",
      "Tell a trusted adult if something feels wrong.",
    ],
  },
  visual: {
    title: "Staying Safe Online (Audio-First & Screen Descriptions)",
    summary: "Screen-described lesson: Audio guidance leads through each messaging step and interface area.",
    intro: "This lesson uses spoken audio guides. Screen layout: The chat is centered. The text box is at the bottom. A blue Send button is on the right.",
    rules: [
      "Audio Guide: Press Play to hear each message spoken aloud.",
      "Layout: Contact name is at top. Incoming bubbles are on left, replies on right.",
      "Safety Rule: Do not share phone numbers, passwords, or home address.",
      "Help: Audio assistance is available on every step.",
    ],
    imageAltDescription: "Chat screen with top bar showing 'Mom', conversation messages in white and blue bubbles, text field at bottom with blue paper-plane send button.",
  },
  hearing: {
    title: "Staying Safe Online (Captions & Visual Cues)",
    summary: "All instructions and audio dialogs have real-time text captions and highlighted keywords.",
    intro: "Text-first interactive lesson. All audio is transcribed in caption boxes with visual alert cues.",
    rules: [
      "[CC] Step 1: Open the messenger window.",
      "[CC] Step 2: Read the question carefully in the text card below.",
      "[ALERT] Rule: Never share passwords or home address with unfamiliar users.",
      "[CHECK] Step 4: Verify the green checkmark before sending.",
    ],
  },
};

/**
 * Transforms screens for Reading / Dyslexia support.
 * Shortens instructions, reduces cognitive load, clarifies task phrasing.
 */
export function transformScreensForReading(screens: LessonScreens): LessonScreens {
  return screens.map((screen) => {
    const cloned = { ...screen };

    if (cloned.type === "instruction") {
      cloned.steps = cloned.steps.map((step) => ({
        ...step,
        body: step.body.length > 70 ? step.body.slice(0, 65) + "..." : step.body,
      }));
    }

    if (cloned.type === "practice") {
      cloned.taskPrompt = `Step-by-step: ${cloned.taskPrompt}`;
    }

    return cloned;
  });
}

/**
 * Transforms screens for Visual Support (Audio-first + Image Descriptions).
 */
export function transformScreensForVisual(screens: LessonScreens): LessonScreens {
  return screens.map((screen) => {
    const cloned = { ...screen };

    if (cloned.type === "instruction") {
      cloned.repeatAllLabel = "Listen to all spoken steps";
    }

    if (cloned.type === "practice") {
      cloned.taskPrompt = `Spoken Guide: ${cloned.taskPrompt}`;
    }

    return cloned;
  });
}

/**
 * Transforms screens for Hearing Support (Captions & Visual Cues).
 */
export function transformScreensForHearing(screens: LessonScreens): LessonScreens {
  return screens.map((screen) => {
    const cloned = { ...screen };

    if (cloned.type === "instruction") {
      cloned.repeatAllLabel = "Review all captioned steps";
    }

    if (cloned.type === "practice") {
      cloned.taskPrompt = `[CC] Captioned prompt: ${cloned.taskPrompt}`;
    }

    return cloned;
  });
}

/**
 * Main content transformer
 */
export function transformLessonContent(
  lesson: ProgramLesson,
  profile: AccessibilityProfile,
): Partial<ProgramLesson> {
  if (profile.supportType === "none") {
    return {};
  }

  // Flagship lesson special adaptations
  if (lesson.slug === "messenger-message") {
    const flagship = FLAGSHIP_ADAPTATIONS[profile.supportType];
    if (flagship) {
      return {
        title: flagship.title,
        summary: flagship.summary,
        intro: flagship.intro,
        rules: flagship.rules,
      };
    }
  }

  // Generalized adaptations for any other lesson in catalog
  if (profile.supportType === "reading") {
    return {
      title: `${lesson.title} (Clear Text)`,
      summary: lesson.summary
        ? lesson.summary.split(".")[0] + ". Step-by-step simple guide."
        : lesson.summary,
      rules: lesson.rules.map((r, i) => `${i + 1}. ${r.replace(/^(First, |Then, |Next, |After that, )/i, "")}`),
    };
  }

  if (profile.supportType === "visual") {
    return {
      title: `${lesson.title} (Audio-Guided)`,
      summary: `Audio-first version: ${lesson.summary}`,
      rules: lesson.rules.map((r) => `[Spoken Guide] ${r}`),
    };
  }

  if (profile.supportType === "hearing") {
    return {
      title: `${lesson.title} (Captioned)`,
      summary: `Captioned version: ${lesson.summary}`,
      rules: lesson.rules.map((r) => `[CC] ${r}`),
    };
  }

  return {};
}
