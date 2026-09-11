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
    hero: "Birinchi ekran",
    program: "Kim uchun",
    lessonPreview: "Qulay muhit",
    roles: "Yoʻnalishlar",
    finalCta: "Keyingi qadam",
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

const uz: HomepageDraft = {
  sectionOrder: ["hero", "program", "lessonPreview", "roles", "finalCta"],
  hiddenSections: [],
  hero: {
    eyebrow: "Raqamli savodxonlik",
    title: "Oʻzbekistonda hayot uchun raqamli koʻnikmalar",
    lead:
      "Maxsus maktablardagi ijtimoiy-maishiy moslashuv darslari uchun oʻquv platforma. Bolalar test savollariga javob bermaydi — ular raqamli xizmatlar mashqlarida haqiqiy harakatlarni bajaradi.",
    facts: [
      "14 ta dars",
      "5 ta yoʻnalish",
      "F70 bolalar uchun",
      "rus tilida",
      "haqiqiy hayot mashqlari",
    ],
    primaryAction: { label: "Bepul oʻqishni boshlash", href: "/register" },
    secondaryAction: { label: "Dasturni koʻrish", href: "/program" },
  },
  program: {
    eyebrow: "Maxsus maktablar uchun",
    title: "Platforma ijtimoiy-maishiy moslashuv darslariga moslangan",
    summary:
      "Darslar sinfda maxsus pedagog rahbarligida oʻtkaziladi. Har bir mashgʻulot — haqiqiy harakat mashqi: bola test savollariga javob bermaydi, balki aniq topshiriqlarni bajaradi.",
    primaryAction: { label: "Dasturni koʻrish", href: "/program" },
    secondaryAction: { label: "Dars namunasini koʻrish", href: "" },
  },
  lessonPreview: {
    eyebrow: "Qulay muhit",
    title: "Platforma tushunarli oʻquv uchun ishlab chiqilgan",
    summary:
      "Qisqa darslar, yirik elementlar, sodda navigatsiya va kattalar uchun maslahatlar mavzularni ortiqcha yuksiz oʻzlashtirishga yordam beradi.",
    action: { label: "Dars namunasini ochish", href: "" },
  },
  roles: {
    eyebrow: "Yoʻnalishlar",
    title: "Ommabop oʻquv yoʻnalishlari",
    summary:
      "Har bir boʻlim haqiqiy hayot vaziyatlari bilan bogʻliq: xizmatni qanday topish, xaridni toʻlash, xabar yozish, maʼlumotni tekshirish va xavfsiz harakat qilish.",
    cards: [
      {
        id: "01",
        title: "Maktabingiz uchun platformani ulang",
        description:
          "Tayyor darslar raqamli savodxonlik mashgʻulotini uzoq tayyorgarliksiz oʻtkazishga yordam beradi.",
        bullets: [
          "Darslarning yagona tuzilmasi",
          "Mavzular koʻnikmalar boʻyicha tartiblangan",
          "Guruhli ish uchun mos",
        ],
        action: { label: "Ariza qoldirish", href: "/educators" },
      },
      {
        id: "02",
        title: "Farzandingizga xizmatlardan ishonchli foydalanishga yordam bering",
        description:
          "Ota-ona mavzularni koʻradi, bola bilan birga darsni oʻtishi va telefonda harakatni mustahkamlashi mumkin.",
        bullets: [
          "Murakkab atamalarsiz qisqa tushuntirishlar",
          "Kundalik hayot vaziyatlarida amaliyot",
          "Yutuqlar tizimga kirgandan keyin saqlanadi",
        ],
        action: { label: "Ota-onalar boʻlimiga oʻtish", href: "/families" },
      },
    ],
  },
  finalCta: {
    eyebrow: "Maktabingizni platformaga ulang",
    title: "Birinchi ijtimoiy-maishiy moslashuv darsidan boshlang",
    summary:
      "Dasturni koʻrib chiqing, modulni tanlang va birinchi darsni oʻtkazing. Platforma qoʻshimcha sozlashlarsiz sinfda ishlashga tayyor.",
    primaryAction: { label: "Oʻqishni boshlash", href: "/register" },
    secondaryAction: { label: "Dasturni koʻrish", href: "/program" },
  },
};

export const homepageDraftByLocale: Record<Locale, HomepageDraft> = { ru, uz };

export const defaultHomepageDraft: HomepageDraft = ru;

export function getHomepageDraft(locale: Locale): HomepageDraft {
  return homepageDraftByLocale[locale];
}
