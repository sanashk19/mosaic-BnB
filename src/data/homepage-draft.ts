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
    hero: "Первый экран",
    program: "Для кого",
    lessonPreview: "Доступная среда",
    roles: "Направления",
    finalCta: "Следующий шаг",
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
    eyebrow: "Цифровая грамотность",
    title: "Цифровые навыки для жизни в Узбекистане",
    lead:
      "Учебная платформа для уроков СБО в коррекционных школах: дети не отвечают на вопросы — они выполняют реальные действия в тренажёрах цифровых сервисов.",
    facts: [
      "14 уроков",
      "5 направлений",
      "для детей с F70",
      "на русском языке",
      "тренажёры реальных ситуаций",
    ],
    primaryAction: { label: "Начать обучение бесплатно", href: "/register" },
    secondaryAction: { label: "Смотреть программу", href: "/program" },
  },
  program: {
    eyebrow: "Для коррекционных школ",
    title: "Платформа встроена в уроки СБО",
    summary:
      "Уроки проводятся под руководством учителя СБО в классе. Каждое занятие — тренажёр реального действия: ребёнок не отвечает на вопросы теста, а выполняет задачи.",
    primaryAction: { label: "Смотреть программу", href: "/program" },
    secondaryAction: { label: "Посмотреть пример урока", href: "" },
  },
  lessonPreview: {
    eyebrow: "Доступная среда",
    title: "Платформа создана с учетом понятного обучения",
    summary:
      "Короткие уроки, крупные элементы, простая навигация и подсказки для взрослого помогают проходить темы без перегруза.",
    action: { label: "Открыть пример урока", href: "" },
  },
  roles: {
    eyebrow: "Направления",
    title: "Популярные направления обучения",
    summary:
      "Каждый раздел связан с реальными ситуациями: как найти услугу, оплатить покупку, написать сообщение, проверить информацию и действовать безопасно.",
    cards: [
      {
        id: "01",
        title: "Подключите платформу для своей школы",
        description:
          "Готовые уроки помогают провести занятие по цифровой грамотности без сложной подготовки.",
        bullets: [
          "Единая структура уроков",
          "Темы разложены по навыкам",
          "Подходит для групповой работы",
        ],
        action: { label: "Оставить заявку", href: "/educators" },
      },
      {
        id: "02",
        title: "Помогите ребенку увереннее пользоваться сервисами",
        description:
          "Родитель видит темы, может пройти урок вместе с ребенком и закрепить действие на телефоне.",
        bullets: [
          "Короткие объяснения без сложных терминов",
          "Практика на бытовых ситуациях",
          "Прогресс сохраняется после входа",
        ],
        action: { label: "Перейти в раздел для родителей", href: "/families" },
      },
    ],
  },
  finalCta: {
    eyebrow: "Подключите школу к платформе",
    title: "Начните с первого урока СБО",
    summary:
      "Просмотрите программу, выберите модуль и проведите первый урок. Платформа готова к работе в классе без дополнительной настройки.",
    primaryAction: { label: "Начать обучение", href: "/register" },
    secondaryAction: { label: "Смотреть программу", href: "/program" },
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
