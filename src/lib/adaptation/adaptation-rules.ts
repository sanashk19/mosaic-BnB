import type {
  AccessibilityProfile,
} from "@/lib/adaptation/adaptation-types";

export type DeterministicStylingRules = {
  containerClassName: string;
  cssVariables: Record<string, string>;
};

/**
 * Resolves deterministic UI styling tokens and classes from learner accessibility preferences.
 */
export function resolveStylingRules(profile: AccessibilityProfile): DeterministicStylingRules {
  const classes: string[] = ["mosaic-adapted-experience"];
  const vars: Record<string, string> = {};

  if (profile.preferences.largerText) {
    classes.push("mosaic-text-lg");
    vars["--mosaic-font-scale"] = "1.15";
  }

  if (profile.preferences.increasedSpacing) {
    classes.push("mosaic-spacing-relaxed");
    vars["--mosaic-letter-spacing"] = "0.04em";
    vars["--mosaic-line-height"] = "1.85";
  }

  if (profile.preferences.reducedMotion) {
    classes.push("mosaic-reduced-motion");
  }

  if (profile.preferences.captions) {
    classes.push("mosaic-captions-enabled");
  }

  if (profile.preferences.imageDescriptions) {
    classes.push("mosaic-descriptions-enabled");
  }

  if (profile.supportType === "reading") {
    classes.push("mosaic-reading-profile");
  } else if (profile.supportType === "visual") {
    classes.push("mosaic-visual-profile");
  } else if (profile.supportType === "hearing") {
    classes.push("mosaic-hearing-profile");
  }

  return {
    containerClassName: classes.join(" "),
    cssVariables: vars,
  };
}

/**
 * Identifies which deterministic rule sets are triggered for reporting and UI feedback.
 */
export function inspectAppliedRules(profile: AccessibilityProfile): string[] {
  const rules: string[] = [];

  if (profile.preferences.simplifiedLanguage) {
    rules.push("Simplified vocabulary & syntax transformation");
    rules.push("Sentence chunking (maximum 1 action per bullet)");
  }

  if (profile.preferences.largerText) {
    rules.push("Scale UI typography +15% with high-contrast legibility");
  }

  if (profile.preferences.increasedSpacing) {
    rules.push("Expanded letter-spacing (0.04em) and line-height (1.85)");
  }

  if (profile.preferences.autoSpeak) {
    rules.push("Automatic step narration via synthesized SpeechSynthesis / TTS");
  }

  if (profile.preferences.captions) {
    rules.push("Persistent real-time captions for all spoken audio clips");
    rules.push("Visual audio cues & key action indicators");
  }

  if (profile.preferences.imageDescriptions) {
    rules.push("Screen reader & descriptive text callouts for mockup interfaces");
    rules.push("Spoken spatial instructions (top-left, centered, color-labeled)");
  }

  if (profile.preferences.reducedMotion) {
    rules.push("Disabled interface transitions and micro-motion");
  }

  return rules;
}
