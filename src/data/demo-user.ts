import type { Locale } from "@/lib/i18n-shared";

export const roleLabelsByLocale: Record<Locale, {
  student: string;
  parent: string;
  teacher: string;
  researcher: string;
}> = {
  ru: {
    student: "Ученик",
    parent: "Родитель",
    teacher: "Педагог",
    researcher: "Исследователь",
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
  };
};

type DemoSeeds = {
  parent: DemoSeedShape;
  student: DemoSeedShape;
  teacher: DemoSeedShape;
  researcher: DemoSeedShape;
};

const ruSeeds: DemoSeeds = {
  parent: {
    name: "Мадина Каримова",
    email: "demo@uquvli.local",
    password: "1",
    role: "parent",
    profile: {
      childName: "Алина Каримова",
      childClass: "3 класс",
      teacherName: "Ольга Сергеевна",
      organizationName: "Школа №12",
      supportNotes:
        "Короткие инструкции, один вопрос на экране, спокойная пауза после ответа.",
    },
  },
  student: {
    name: "Алина Каримова",
    email: "student@uquvli.local",
    password: "2",
    role: "student",
    profile: {
      childName: "Алина Каримова",
      childClass: "3 класс",
      teacherName: "Ольга Сергеевна",
      organizationName: "Школа №12",
      supportNotes:
        "Большие кнопки, короткий текст, один выбор за раз и понятный сигнал, когда можно остановиться.",
    },
  },
  teacher: {
    name: "Ольга Сергеевна",
    email: "teacher@uquvli.local",
    password: "3",
    role: "teacher",
    profile: {
      childName: "Алина Каримова",
      childClass: "3 класс",
      teacherName: "Ольга Сергеевна",
      organizationName: "Школа №12",
      supportNotes:
        "Отмечать самостоятельность, темп ответа и необходимость повторить инструкцию перед следующим уроком.",
    },
  },
  researcher: {
    name: "Олеся Маркова",
    email: "researcher@uquvli.local",
    password: "4",
    role: "researcher",
    profile: {
      childName: "",
      childClass: "",
      teacherName: "",
      organizationName: "Филиал РГПУ им. А.И. Герцена в г. Ташкенте",
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
    label: "Родитель",
    description: "Контроль занятий, семья, прогресс и связь с педагогом.",
    user: ruSeeds.parent,
  },
  {
    code: "2",
    password: "2",
    label: "Ученик",
    description: "Простой режим: большая кнопка урока, короткие шаги и помощь.",
    user: ruSeeds.student,
  },
  {
    code: "3",
    password: "3",
    label: "Педагог",
    description: "Ученики, наблюдения, уроки и динамика по группе.",
    user: ruSeeds.teacher,
  },
  {
    code: "4",
    password: "4",
    label: "Исследователь",
    description: "Все школы, учителя, ученики, аналитика и экспорт данных.",
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
