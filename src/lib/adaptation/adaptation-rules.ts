import type {
  AccessibilityProfile,
  AdaptationExperienceFlags,
} from "@/lib/adaptation/adaptation-types";

export type DeterministicStylingRules = {
  containerClassName: string;
  cssVariables: Record<string, string>;
};

/**
 * Resolves experience-level adaptation flags deterministically based on learner profile.
 */
export function resolveExperienceFlags(profile: AccessibilityProfile): AdaptationExperienceFlags {
  switch (profile.supportType) {
    case "reading":
      return {
        autoSpeak: false,
        showCaptions: false,
        audioFirst: false,
        simplifiedText: true,
        increasedSpacing: true,
        largerText: true,
        showImageDescriptions: false,
        reducedDecoration: true,
        enhancedVisualFeedback: false,
        highContrastFocus: false,
        screenReaderAnnouncements: false,
      };

    case "visual":
      return {
        autoSpeak: true,
        showCaptions: false,
        audioFirst: true,
        simplifiedText: false,
        increasedSpacing: false,
        largerText: true,
        showImageDescriptions: true,
        reducedDecoration: true,
        enhancedVisualFeedback: false,
        highContrastFocus: true,
        screenReaderAnnouncements: true,
      };

    case "hearing":
      return {
        autoSpeak: false,
        showCaptions: true,
        audioFirst: false,
        simplifiedText: false,
        increasedSpacing: false,
        largerText: false,
        showImageDescriptions: false,
        reducedDecoration: false,
        enhancedVisualFeedback: true,
        highContrastFocus: false,
        screenReaderAnnouncements: false,
      };

    case "none":
    default:
      return {
        autoSpeak: false,
        showCaptions: false,
        audioFirst: false,
        simplifiedText: false,
        increasedSpacing: false,
        largerText: false,
        showImageDescriptions: false,
        reducedDecoration: false,
        enhancedVisualFeedback: false,
        highContrastFocus: false,
        screenReaderAnnouncements: false,
      };
  }
}

/**
 * Resolves deterministic UI styling tokens and classes from learner profile and experience flags.
 */
export function resolveStylingRules(
  profile: AccessibilityProfile,
  experience?: AdaptationExperienceFlags,
): DeterministicStylingRules {
  const flags = experience ?? resolveExperienceFlags(profile);
  const classes: string[] = ["mosaic-adapted-experience"];
  const vars: Record<string, string> = {};

  if (profile.supportType === "reading" || flags.simplifiedText) {
    classes.push("mosaic-reading-profile");
    classes.push("mosaic-spacing-relaxed");
    classes.push("mosaic-text-lg");
    vars["--mosaic-font-scale"] = "1.12";
    vars["--mosaic-letter-spacing"] = "0.04em";
    vars["--mosaic-line-height"] = "1.85";
  } else if (profile.supportType === "visual" || flags.audioFirst) {
    classes.push("mosaic-visual-profile");
    classes.push("mosaic-audio-first");
    classes.push("mosaic-text-lg");
    vars["--mosaic-font-scale"] = "1.08";
  } else if (profile.supportType === "hearing" || flags.showCaptions) {
    classes.push("mosaic-hearing-profile");
    classes.push("mosaic-captions-enabled");
    classes.push("mosaic-visual-cues-active");
  } else {
    classes.push("mosaic-standard-profile");
  }

  if (flags.reducedDecoration) {
    classes.push("mosaic-reduced-decoration");
  }

  if (flags.highContrastFocus) {
    classes.push("mosaic-high-contrast-focus");
  }

  return {
    containerClassName: classes.join(" "),
    cssVariables: vars,
  };
}

/**
 * Identifies which deterministic rule sets are triggered for transparent UI feedback in the banner.
 */
export function inspectAppliedRules(profile: AccessibilityProfile): string[] {
  switch (profile.supportType) {
    case "reading":
      return [
        "Simplified language & vocabulary",
        "Numbered single-action steps",
        "Increased line-height (1.85) and paragraph spacing",
        "Action keywords emphasized",
        "Read aloud available",
      ];
    case "visual":
      return [
        "Audio-first guidance & automatic narration",
        "Interface & image spatial descriptions",
        "Spoken headings, steps and options in logical order",
        "Accessible high-clarity controls",
      ];
    case "hearing":
      return [
        "Real-time persistent captions for all spoken content",
        "Visual sound indicators & audio cue alerts",
        "Text-first instructions & highlighted keywords",
        "Zero audio-dependence",
      ];
    case "none":
    default:
      return [];
  }
}
