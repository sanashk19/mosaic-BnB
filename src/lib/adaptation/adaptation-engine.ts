import type { ProgramLesson } from "@/data/program";
import type {
  AccessibilityProfile,
  AdaptedLesson,
} from "@/lib/adaptation/adaptation-types";
import { DEFAULT_ACCESSIBILITY_PROFILE } from "@/lib/adaptation/adaptation-types";
import { inspectAppliedRules, resolveExperienceFlags } from "@/lib/adaptation/adaptation-rules";
import {
  transformLessonContent,
  transformScreensForHearing,
  transformScreensForReading,
  transformScreensForVisual,
} from "@/lib/adaptation/adaptation-transformers";

// Memoization cache for instant switching and zero latency
const ADAPTATION_CACHE = new Map<string, AdaptedLesson>();

/**
 * Core Mosaic Adaptation Engine.
 * Concept: adaptLesson(lesson, learnerProfile) -> adapted lesson
 * Takes an original lesson and a learner accessibility profile, and produces
 * a personalized, non-mutated adapted lesson experience with both:
 * 1. adapted CONTENT
 * 2. experience-level ADAPTATION FLAGS
 */
export function adaptLesson(
  lesson: ProgramLesson,
  profile: AccessibilityProfile = DEFAULT_ACCESSIBILITY_PROFILE,
): AdaptedLesson {
  const supportType = profile?.supportType ?? "none";
  const cacheKey = `${lesson.slug}__${supportType}`;

  if (ADAPTATION_CACHE.has(cacheKey)) {
    return ADAPTATION_CACHE.get(cacheKey)!;
  }

  // 1. Resolve experience-level flags
  const experience = resolveExperienceFlags(profile);

  // If no support profile or "none", return original lesson with base meta and flags
  if (supportType === "none") {
    const baseAdapted: AdaptedLesson = {
      ...lesson,
      experience,
      adaptationMeta: {
        originalSlug: lesson.slug,
        supportType: "none",
        appliedRules: [],
        readingAssistanceActive: false,
        audioDescriptionsActive: false,
        captionsActive: false,
        visualDescriptionsActive: false,
      },
    };
    ADAPTATION_CACHE.set(cacheKey, baseAdapted);
    return baseAdapted;
  }

  // 2. Content transformations (deep flagship or generic)
  const contentDelta = transformLessonContent(lesson, profile);

  // 3. Screen transformations (if lesson contains screen-based curriculum)
  let adaptedScreens = lesson.screens;
  if (lesson.screens && lesson.screens.length > 0) {
    if (supportType === "reading") {
      adaptedScreens = transformScreensForReading(lesson.screens);
    } else if (supportType === "visual") {
      adaptedScreens = transformScreensForVisual(lesson.screens);
    } else if (supportType === "hearing") {
      adaptedScreens = transformScreensForHearing(lesson.screens);
    }
  }

  // 4. Inspect deterministic applied rules for the banner
  const appliedRules = inspectAppliedRules(profile);

  const adaptedResult: AdaptedLesson = {
    ...lesson,
    ...contentDelta,
    screens: adaptedScreens,
    experience,
    imageDescription: contentDelta.imageDescription,
    importantWarning: contentDelta.importantWarning,
    trainerGuidance: contentDelta.trainerGuidance,
    adaptationMeta: {
      originalSlug: lesson.slug,
      supportType,
      appliedRules,
      readingAssistanceActive: supportType === "reading",
      audioDescriptionsActive: supportType === "visual",
      captionsActive: supportType === "hearing",
      visualDescriptionsActive: supportType === "visual" || Boolean(contentDelta.imageDescription),
      simplifiedSummary: contentDelta.summary ?? lesson.summary,
    },
  };

  ADAPTATION_CACHE.set(cacheKey, adaptedResult);
  return adaptedResult;
}
