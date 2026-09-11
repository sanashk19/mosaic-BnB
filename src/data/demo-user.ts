import type { Locale } from "@/lib/i18n-shared";

export const roleLabelsByLocale: Record<Locale, {
  student: string;
  parent: string;
  teacher: string;
  researcher: string;
}> = {
  ru: {
    student: "Student",
    parent: "Parent",
    teacher: "Teacher",
    researcher: "Researcher",
  },
  uz: {
    student: "Oʻquvchi",
    parent: "Ota-ona",
    teacher: "Pedagog",
    researcher: "Tadqiqotchi",
  },
};

export function getRoleLabels(locale: Locale) {
  return roleLabelsByLocale[locale];
}

// Legacy export
export const roleLabels = roleLabelsByLocale.ru;

import type { AccessibilityProfile } from "@/lib/adaptation/adaptation-types";

type DemoSeedShape = {
  name: string;
  email: string;
  password: string;
  role: "student" | "parent" | "teacher" | "researcher";
  profile: {
    childName: string;
    childClass: string;
    teacherName: string;
    organizationName: string;
    supportNotes: string;
    accessibilityProfile?: AccessibilityProfile;
  };
  accessibilityProfile?: AccessibilityProfile;
};

type DemoSeeds = {
  parent: DemoSeedShape;
  student: DemoSeedShape;
  teacher: DemoSeedShape;
  researcher: DemoSeedShape;
};

const ruSeeds: DemoSeeds = {
  parent: {
    name: "Sarah Miller",
    email: "demo@uquvli.local",
    password: "1",
    role: "parent",
    profile: {
      childName: "Alex Miller",
      childClass: "Grade 3",
      teacherName: "Ms. Johnson",
      organizationName: "Oak Creek Academy",
      supportNotes:
        "Short instructions, one question on screen, calm pause after answering.",
    },
  },
  student: {
    name: "Alex Miller",
    email: "student@uquvli.local",
    password: "2",
    role: "student",
    profile: {
      childName: "Alex Miller",
      childClass: "Grade 3",
      teacherName: "Ms. Johnson",
      organizationName: "Oak Creek Academy",
      supportNotes:
        "Large buttons, concise text, single selection at a time, clear stopping point.",
      accessibilityProfile: {
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
    },
    accessibilityProfile: {
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
  },
  teacher: {
    name: "Ms. Johnson",
    email: "teacher@uquvli.local",
    password: "3",
    role: "teacher",
    profile: {
      childName: "Alex Miller",
      childClass: "Grade 3",
      teacherName: "Ms. Johnson",
      organizationName: "Oak Creek Academy",
      supportNotes:
        "Note independence, response pace, and whether step instructions need repeating.",
    },
  },
  researcher: {
    name: "Dr. Rachel Brooks",
    email: "researcher@uquvli.local",
    password: "4",
    role: "researcher",
    profile: {
      childName: "",
      childClass: "",
      teacherName: "",
      organizationName: "Education Research Institute",
      supportNotes: "",
    },
  },
};

const uzSeeds: DemoSeeds = {
  parent: {
    name: "Madina Karimova",
    email: "demo@uquvli.local",
    password: "1",
    role: "parent",
    profile: {
      childName: "Alina Karimova",
      childClass: "3-sinf",
      teacherName: "Olga Sergeyevna",
      organizationName: "12-maktab",
      supportNotes:
        "Qisqa koʻrsatmalar, ekranda bitta savol, javobdan keyin xotirjam pauza.",
    },
  },
  student: {
    name: "Alina Karimova",
    email: "student@uquvli.local",
    password: "2",
    role: "student",
    profile: {
      childName: "Alina Karimova",
      childClass: "3-sinf",
      teacherName: "Olga Sergeyevna",
      organizationName: "12-maktab",
      supportNotes:
        "Katta tugmalar, qisqa matn, bir vaqtda bitta tanlov va toʻxtash mumkinligi haqida tushunarli signal.",
      accessibilityProfile: {
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
    },
    accessibilityProfile: {
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
  },
  teacher: {
    name: "Olga Sergeyevna",
    email: "teacher@uquvli.local",
    password: "3",
    role: "teacher",
    profile: {
      childName: "Alina Karimova",
      childClass: "3-sinf",
      teacherName: "Olga Sergeyevna",
      organizationName: "12-maktab",
      supportNotes:
        "Mustaqillikni, javob tezligini va keyingi darsdan oldin koʻrsatmani qayta tushuntirish zarurligini qayd etish.",
    },
  },
  researcher: {
    name: "Olesya Markova",
    email: "researcher@uquvli.local",
    password: "4",
    role: "researcher",
    profile: {
      childName: "",
      childClass: "",
      teacherName: "",
      organizationName:
        "A.I. Gertsen nomidagi RDPU ning Toshkent shahridagi filiali",
      supportNotes: "",
    },
  },
};

export const demoUserSeedsByLocale: Record<Locale, DemoSeeds> = {
  ru: ruSeeds,
  uz: uzSeeds,
};

export function getDemoUserSeeds(locale: Locale): DemoSeeds {
  return demoUserSeedsByLocale[locale];
}

// Legacy export
export const demoUserSeeds = ruSeeds;

type DemoLoginProfile = {
  code: string;
  password: string;
  label: string;
  description: string;
  user: DemoSeedShape;
};

const ruLoginProfiles: DemoLoginProfile[] = [
  {
    code: "1",
    password: "1",
    label: "Parent",
    description: "Session tracking, home practice, learner progress, and teacher communication.",
    user: ruSeeds.parent,
  },
  {
    code: "2",
    password: "2",
    label: "Student",
    description: "Learner mode: large lesson buttons, bite-sized steps, and clear visual guidance.",
    user: ruSeeds.student,
  },
  {
    code: "3",
    password: "3",
    label: "Teacher",
    description: "Learners, observations, adaptive lesson studio, and class progress.",
    user: ruSeeds.teacher,
  },
  {
    code: "4",
    password: "4",
    label: "Researcher",
    description: "Schools, teachers, learners, analytics, and research data export.",
    user: ruSeeds.researcher,
  },
];

const uzLoginProfiles: DemoLoginProfile[] = [
  {
    code: "1",
    password: "1",
    label: "Ota-ona",
    description: "Mashgʻulotlar nazorati, oila, yutuqlar va pedagog bilan aloqa.",
    user: uzSeeds.parent,
  },
  {
    code: "2",
    password: "2",
    label: "Oʻquvchi",
    description: "Sodda rejim: katta dars tugmasi, qisqa qadamlar va yordam.",
    user: uzSeeds.student,
  },
  {
    code: "3",
    password: "3",
    label: "Pedagog",
    description: "Oʻquvchilar, kuzatuvlar, darslar va guruh dinamikasi.",
    user: uzSeeds.teacher,
  },
  {
    code: "4",
    password: "4",
    label: "Tadqiqotchi",
    description: "Barcha maktablar, oʻqituvchilar, oʻquvchilar, tahlil va maʼlumotlarni eksport qilish.",
    user: uzSeeds.researcher,
  },
];

export const demoLoginProfilesByLocale: Record<Locale, DemoLoginProfile[]> = {
  ru: ruLoginProfiles,
  uz: uzLoginProfiles,
};

export function getDemoLoginProfiles(locale: Locale): DemoLoginProfile[] {
  return demoLoginProfilesByLocale[locale];
}

// Legacy export
export const demoLoginProfiles = ruLoginProfiles;

export const demoUserSeed = ruSeeds.parent;

export const demoUserPreview = {
  id: "demo-preview",
  name: demoUserSeed.name,
  email: demoUserSeed.email,
  role: demoUserSeed.role,
  createdAt: "2026-01-01T00:00:00.000Z",
  progress: [] as {
    lessonSlug: string;
    completedAt: string;
    score?: number;
  }[],
  profile: demoUserSeed.profile,
};

export function getDemoUserPreview(locale: Locale) {
  const seed = getDemoUserSeeds(locale).parent;
  return {
    id: "demo-preview",
    name: seed.name,
    email: seed.email,
    role: seed.role,
    createdAt: "2026-01-01T00:00:00.000Z",
    progress: [] as {
      lessonSlug: string;
      completedAt: string;
      score?: number;
    }[],
    profile: seed.profile,
  };
}
