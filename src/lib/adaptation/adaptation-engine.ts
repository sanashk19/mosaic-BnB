import type { ProgramLesson } from "@/data/program";
import type {
  AccessibilityProfile,
  AdaptedLesson,
} from "@/lib/adaptation/adaptation-types";
import { DEFAULT_ACCESSIBILITY_PROFILE } from "@/lib/adaptation/adaptation-types";
import { inspectAppliedRules } from "@/lib/adaptation/adaptation-rules";
import {
  transformLessonContent,
  transformScreensForHearing,
  transformScreensForReading,
  transformScreensForVisual,
} from "@/lib/adaptation/adaptation-transformers";

/**
 * Core Mosaic Adaptation Engine.
 * Takes an original lesson and a learner accessibility profile, and produces
 * a personalized, non-mutated adapted lesson experience.
 */
export function adaptLesson(
  lesson: ProgramLesson,
  profile: AccessibilityProfile = DEFAULT_ACCESSIBILITY_PROFILE,
): AdaptedLesson {
  // If no support profile or "none", return original lesson with base meta
  if (!profile || profile.supportType === "none") {
    return {
      ...lesson,
      adaptationMeta: {
        originalSlug: lesson.slug,
        supportType: "none",
        appliedRules: [],
        readingAssistanceActive: false,
        audioDescriptionsActive: false,
        captionsActive: false,
      },
    };
  }

  // 1. Content transformations
  const contentDelta = transformLessonContent(lesson, profile);

  // 2. Screen transformations (if the lesson contains screen-based curriculum)
  let adaptedScreens = lesson.screens;
  if (lesson.screens && lesson.screens.length > 0) {
    if (profile.supportType === "reading") {
      adaptedScreens = transformScreensForReading(lesson.screens);
    } else if (profile.supportType === "visual") {
      adaptedScreens = transformScreensForVisual(lesson.screens);
    } else if (profile.supportType === "hearing") {
      adaptedScreens = transformScreensForHearing(lesson.screens);
    }
  }

  // 3. Inspect deterministic applied rules
  const appliedRules = inspectAppliedRules(profile);

  return {
    ...lesson,
    ...contentDelta,
    screens: adaptedScreens,
    adaptationMeta: {
      originalSlug: lesson.slug,
      supportType: profile.supportType,
      appliedRules,
      readingAssistanceActive: profile.supportType === "reading",
      audioDescriptionsActive: profile.supportType === "visual",
      captionsActive: profile.supportType === "hearing",
      simplifiedSummary: contentDelta.summary ?? lesson.summary,
    },
  };
}
