import type { ProgramLesson } from "@/data/program";
import type { LessonScreens } from "@/lib/lesson-screens-types";
import type { AccessibilityProfile } from "@/lib/adaptation/adaptation-types";
import { getAdaptedContent } from "@/lib/adaptation/adaptation-content";

/**
 * Transforms screens for Reading / Dyslexia support.
 */
export function transformScreensForReading(screens: LessonScreens): LessonScreens {
  return screens.map((screen) => {
    const cloned = { ...screen };

    if (cloned.type === "instruction") {
      cloned.steps = cloned.steps.map((step, idx) => ({
        ...step,
        title: `Step ${idx + 1}: ${step.title}`,
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
      cloned.repeatAllLabel = "🔊 Listen to all spoken steps";
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
      cloned.repeatAllLabel = "📝 Review all captioned steps";
    }

    if (cloned.type === "practice") {
      cloned.taskPrompt = `[CC] Captioned prompt: ${cloned.taskPrompt}`;
    }

    return cloned;
  });
}

/**
 * Transforms high-level lesson content (titles, rules, scenarios, quiz)
 * without mutating the original lesson object.
 */
export function transformLessonContent(
  lesson: ProgramLesson,
  profile: AccessibilityProfile,
) {
  return getAdaptedContent(lesson, profile.supportType);
}
