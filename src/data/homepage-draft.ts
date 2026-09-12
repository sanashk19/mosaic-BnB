import type { Locale } from "@/lib/i18n-shared";

export type HomepageSectionId =
  | "hero"
  | "program"
  | "lessonPreview"
  | "roles"
  | "finalCta";

export type HomepageLink = {
  label: string;
  href: string;
};

export type HomepageSectionIntro = {
  eyebrow: string;
  title: string;
  summary: string;
};

export type HomepageRoleCard = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  action: HomepageLink;
};

export type HomepageDraft = {
  sectionOrder: HomepageSectionId[];
  hiddenSections: HomepageSectionId[];
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    facts: string[];
    primaryAction: HomepageLink;
    secondaryAction: HomepageLink;
  };
  program: HomepageSectionIntro & {
    primaryAction: HomepageLink;
    secondaryAction: HomepageLink;
  };
  lessonPreview: HomepageSectionIntro & {
    action: HomepageLink;
  };
  roles: HomepageSectionIntro & {
    cards: HomepageRoleCard[];
  };
  finalCta: HomepageSectionIntro & {
    primaryAction: HomepageLink;
    secondaryAction: HomepageLink;
  };
};

export const HOMEPAGE_SECTION_LABELS_BY_LOCALE: Record<
  Locale,
  Record<HomepageSectionId, string>
> = {
  ru: {
    hero: "First screen",
    program: "For Whom",
    lessonPreview: "Accessible Environment",
    roles: "Curriculum Tracks",
    finalCta: "Next Step",
  },
  uz: {
    hero: "First screen",
    program: "For Whom",
    lessonPreview: "Accessible Environment",
    roles: "Curriculum Tracks",
    finalCta: "Next Step",
  },
};

export const HOMEPAGE_SECTION_LABELS = HOMEPAGE_SECTION_LABELS_BY_LOCALE.ru;

const ru: HomepageDraft = {
  sectionOrder: ["hero", "program", "lessonPreview", "roles", "finalCta"],
  hiddenSections: [],
  hero: {
    eyebrow: "Adaptive Digital Learning",
    title: "Essential digital skills for independent life",
    lead:
      "An inclusive adaptive platform: learners don't answer boring multiple-choice tests — they practice real actions in safe, interactive life-skill simulators.",
    facts: [
      "14 core lessons",
      "5 curriculum tracks",
      "Adaptive profiles",
      "English & multilingual",
      "Real-life simulators",
    ],
    primaryAction: { label: "Start learning for free", href: "/register" },
    secondaryAction: { label: "Explore curriculum", href: "/program" },
  },
  program: {
    eyebrow: "For Inclusive Classrooms",
    title: "One lesson. Multiple personalized experiences.",
    summary:
      "Lessons are guided by educators with the Mosaic Adaptive Engine. Each activity is a realistic action simulator: learners master practical digital tasks step by step without overwhelm.",
    primaryAction: { label: "Explore curriculum", href: "/program" },
    secondaryAction: { label: "View sample lesson", href: "/lesson/messenger-message" },
  },
  lessonPreview: {
    eyebrow: "Calm & Predictable",
    title: "Designed for focused, accessible learning",
    summary:
      "Bite-sized steps, large touch targets, predictable navigation, and embedded facilitator hints ensure confidence without cognitive overload.",
    action: { label: "Open sample lesson", href: "/lesson/messenger-message" },
  },
  roles: {
    eyebrow: "Curriculum Tracks",
    title: "Life-skills tracks built for independence",
    summary:
      "Every module connects directly to authentic situations: sending messages, shopping online, transit ticketing, verifying information, and staying secure.",
    cards: [
      {
        id: "01",
        title: "Deploy Mosaic in your school or center",
        description:
          "Turn any lesson into multiple personalized formats in seconds with our Educator Adaptive Studio.",
        bullets: [
          "Unified lesson structure",
          "One-click accessibility profiles",
          "Ideal for whole-class & individual pacing",
        ],
        action: { label: "Open Teacher Studio", href: "/educators" },
      },
      {
        id: "02",
        title: "Support your child with home practice",
        description:
          "Parents can review upcoming modules, practice alongside their child, and reinforce real digital tasks.",
        bullets: [
          "Short instructions without confusing jargon",
          "Hands-on practice in authentic scenarios",
          "Progress saved securely in dashboard",
        ],
        action: { label: "View Family Guide", href: "/families" },
      },
    ],
  },
  finalCta: {
    eyebrow: "Get Started Today",
    title: "Begin with your first adaptive lesson",
    summary:
      "Browse the curriculum, pick a module, and start learning. Mosaic is ready for immediate classroom or home use without complex configuration.",
    primaryAction: { label: "Start learning", href: "/register" },
    secondaryAction: { label: "Explore curriculum", href: "/program" },
  },
};

const uz: HomepageDraft = ru;

export const homepageDraftByLocale: Record<Locale, HomepageDraft> = { ru, uz };

export const defaultHomepageDraft: HomepageDraft = ru;

export function getHomepageDraft(locale: Locale): HomepageDraft {
  return homepageDraftByLocale[locale];
}

