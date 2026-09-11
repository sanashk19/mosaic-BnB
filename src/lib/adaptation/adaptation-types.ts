import type { ProgramLesson } from "@/data/program";
import type { LessonScreen } from "@/lib/lesson-screens-types";

export type AccessibilitySupportType = "reading" | "visual" | "hearing" | "none";

export type AccessibilityPreferences = {
  simplifiedLanguage: boolean;
  largerText: boolean;
  increasedSpacing: boolean;
  autoSpeak: boolean;
  captions: boolean;
  imageDescriptions: boolean;
  reducedMotion: boolean;
};

export type AccessibilityProfile = {
  supportType: AccessibilitySupportType;
  preferences: AccessibilityPreferences;
};

export const DEFAULT_ACCESSIBILITY_PROFILE: AccessibilityProfile = {
  supportType: "none",
  preferences: {
    simplifiedLanguage: false,
    largerText: false,
    increasedSpacing: false,
    autoSpeak: false,
    captions: false,
    imageDescriptions: false,
    reducedMotion: false,
  },
};

export const PRESET_PROFILES: Record<AccessibilitySupportType, AccessibilityProfile> = {
  none: DEFAULT_ACCESSIBILITY_PROFILE,
  reading: {
    supportType: "reading",
    preferences: {
      simplifiedLanguage: true,
      largerText: true,
      increasedSpacing: true,
      autoSpeak: true,
      captions: false,
      imageDescriptions: false,
      reducedMotion: false,
    },
  },
  visual: {
    supportType: "visual",
    preferences: {
      simplifiedLanguage: false,
      largerText: true,
      increasedSpacing: false,
      autoSpeak: true,
      captions: false,
      imageDescriptions: true,
      reducedMotion: true,
    },
  },
  hearing: {
    supportType: "hearing",
    preferences: {
      simplifiedLanguage: false,
      largerText: false,
      increasedSpacing: false,
      autoSpeak: false,
      captions: true,
      imageDescriptions: false,
      reducedMotion: false,
    },
  },
};

export type AdaptedLessonMeta = {
  originalSlug: string;
  supportType: AccessibilitySupportType;
  appliedRules: string[];
  readingAssistanceActive: boolean;
  audioDescriptionsActive: boolean;
  captionsActive: boolean;
  simplifiedSummary?: string;
};

export type AdaptedLesson = ProgramLesson & {
  adaptationMeta: AdaptedLessonMeta;
  adaptedScreens?: LessonScreen[];
};
