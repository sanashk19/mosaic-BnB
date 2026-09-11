// AUTO-GENERATED from _dissertation/scripts/generate_program_ts.py
// Структура — 30 экспериментальных уроков диссертационного исследования
// (Главa II), сгруппированные по 6 цифровым жизненным сценариям +
// диагностический модуль. Источник — Анализ_уроков_цифровая_грамотность_3.docx.

export type LessonScenario = {
  title: string;
  text: string;
  options: string[];
  correctIndex: number;
  feedback: string;
  support: string;
};

export type LessonQuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

export type TelegramTrainer = {
  type: "telegram";
  contact: { name: string; avatar?: string; subtitle?: string };
  history?: Array<{ from: "me" | "them"; text: string; time?: string }>;
  prompt: { text: string; time?: string };
  options: Array<{
    text: string;
    correct: boolean;
    reply?: { text: string; time?: string };
    feedback: string;
  }>;
  otherChats?: Array<{ name: string; avatar?: string; lastMessage: string; time: string; unread?: number }>;
};

export type WhatsappTrainer = {
  type: "whatsapp";
  contact: { name: string; avatar?: string; subtitle?: string };
  history?: Array<{ from: "me" | "them"; text: string; time?: string }>;
  prompt: { text: string; time?: string };
  options: Array<{
    text: string;
    correct: boolean;
    reply?: { text: string; time?: string };
    feedback: string;
  }>;
  otherChats?: Array<{ name: string; avatar?: string; lastMessage: string; time: string; unread?: number }>;
};

export type GmailTrainer = {
  type: "gmail";
  task: string;
  recipientOptions: Array<{ email: string; name: string; correct: boolean }>;
  subjectSuggestion: string;
  bodyOptions: Array<{ text: string; correct: boolean; feedback: string }>;
  inbox?: Array<{ from: string; subject: string; preview: string; time: string; unread?: boolean }>;
};

export type MailruTrainer = {
  type: "mailru";
  task: string;
  recipientOptions: Array<{ email: string; name: string; correct: boolean }>;
  subjectSuggestion: string;
  bodyOptions: Array<{ text: string; correct: boolean; feedback: string }>;
  inbox?: Array<{ from: string; subject: string; preview: string; time: string; unread?: boolean }>;
};

export type UzumTrainer = {
  type: "uzum";
  task: string;
  searchQuery: string;
  products: Array<{
    name: string;
    price: string;
    image?: string;
    correct: boolean;
    oldPrice?: string;
    rating?: number;
    reviewCount?: number;
    seller?: string;
    delivery?: string;
    description?: string;
  }>;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type YandexMarketTrainer = {
  type: "yandexmarket";
  task: string;
  searchQuery: string;
  products: Array<{
    name: string;
    price: string;
    image?: string;
    correct: boolean;
    oldPrice?: string;
    rating?: number;
    reviewCount?: number;
    seller?: string;
    delivery?: string;
    description?: string;
    cashback?: string;
  }>;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type MyGovTrainer = {
  type: "mygov";
  task: string;
  services: Array<{ icon: string; title: string; subtitle: string; correct: boolean }>;
  confirmStep: {
    title: string;
    fields: Array<{ label: string; value: string }>;
    timeOptions: string[];
  };
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type PhoneTrainer = {
  type: "phone";
  task: string;
  correctNumber: string;
  description: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type MorningQuestTrainer = {
  type: "morning-quest";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type OutfitTrainer = {
  type: "outfit";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type HairCareTrainer = {
  type: "hair-care";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type SkinTypeTrainer = {
  type: "skin-type";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type SunCareTrainer = {
  type: "sun-care";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type LabelReaderTrainer = {
  type: "label-reader";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type StepSequenceTrainer = {
  type: "step-sequence";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type VolumeSafeTrainer = {
  type: "volume-safe";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type ThermometerTrainer = {
  type: "thermometer";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type SeasonalClothingTrainer = {
  type: "seasonal-clothing";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type CareLabelTrainer = {
  type: "care-label";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type WashingMachineTrainer = {
  type: "washing-machine";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type DetergentDosageTrainer = {
  type: "detergent-dosage";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type MenuBuilderTrainer = {
  type: "menu-builder";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type RecipeReaderTrainer = {
  type: "recipe-reader";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type RecipeTimerTrainer = {
  type: "recipe-timer";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type TableSettingTrainer = {
  type: "table-setting";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type FamilyIncomeTrainer = {
  type: "family-income";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type FamilyExpensesTrainer = {
  type: "family-expenses";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type TransportTypesTrainer = {
  type: "transport-types";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type ScheduleBoardTrainer = {
  type: "schedule-board";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type TicketPurchaseTrainer = {
  type: "ticket-purchase";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type PackageTrackingTrainer = {
  type: "package-tracking";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type PhoneCallFlowTrainer = {
  type: "phone-call-flow";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type MessengerFlowTrainer = {
  type: "messenger-flow";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type SafetyEtiquetteTrainer = {
  type: "safety-etiquette";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type MyGovPortalTrainer = {
  type: "mygov-portal";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type AtmTrainer = {
  type: "atm";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type CreditContractTrainer = {
  type: "credit-contract";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type FinalQuestTrainer = {
  type: "final-quest";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type WashingMachineTrainerV2 = {
  type: "washing-machine-v2";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type LessonTrainer =
  | TelegramTrainer
  | WhatsappTrainer
  | GmailTrainer
  | MailruTrainer
  | UzumTrainer
  | YandexMarketTrainer
  | MyGovTrainer
  | PhoneTrainer
  | MorningQuestTrainer
  | OutfitTrainer
  | HairCareTrainer
  | SkinTypeTrainer
  | SunCareTrainer
  | LabelReaderTrainer
  | StepSequenceTrainer
  | VolumeSafeTrainer
  | ThermometerTrainer
  | SeasonalClothingTrainer
  | CareLabelTrainer
  | WashingMachineTrainer
  | DetergentDosageTrainer
  | MenuBuilderTrainer
  | RecipeReaderTrainer
  | RecipeTimerTrainer
  | TableSettingTrainer
  | FamilyIncomeTrainer
  | FamilyExpensesTrainer
  | TransportTypesTrainer
  | ScheduleBoardTrainer
  | TicketPurchaseTrainer
  | PackageTrackingTrainer
  | PhoneCallFlowTrainer
  | MessengerFlowTrainer
  | SafetyEtiquetteTrainer
  | MyGovPortalTrainer
  | AtmTrainer
  | CreditContractTrainer
  | FinalQuestTrainer
  | WashingMachineTrainerV2;

export type LessonStageBlock = {
  duration: string;
  title: string;
  teacherSays?: string;
  teacherDoes: string[];
  studentActivity?: string;
  hint?: string;
};

export type LessonMethodology = {
  objective: string;
  tasks: string[];
  materials: string[];
  stages: LessonStageBlock[];
  differentiation?: string;
  homework?: string;
  safetyNote?: string;
};

import type { LessonScreens } from "@/lib/lesson-screens-types";
export type { LessonScreens } from "@/lib/lesson-screens-types";

type LessonBase = {
  slug: string;
  title: string;
  duration: string;
  summary: string;
  intro: string;
  image: string;
  imageAlt: string;
  imageCredit?: string;
  imageSourceUrl?: string;
  goals: string[];
  rules: string[];
  scenarios: LessonScenario[];
  quiz: LessonQuizQuestion[];
  adultNote: string;
  tags: string[];
  trainer?: LessonTrainer;
  extraTrainers?: LessonTrainer[];
  methodology?: LessonMethodology;
  screens?: LessonScreens;
};

export type ProgramLesson = LessonBase & {
  moduleSlug: string;
  moduleTitle: string;
  moduleHours: string;
};

export type ProgramModule = {
  slug: string;
  title: string;
  hours: string;
  lessonCount: number;
  description: string;
  image: string;
  imageAlt: string;
  imageCredit: string;
  imageSourceUrl: string;
  knowledge: string[];
  skills: string[];
  lessons: LessonBase[];
};

export const platformHighlights = [
  "30 экспериментальных уроков формирующего эксперимента диссертационного исследования",
  "6 цифровых жизненных сценариев + констатирующая и контрольная диагностика",
  "Все 5 компонентов функциональной цифровой грамотности (ФЦГ) — для учеников 7 класса с F70",
];

export const platformHighlightsUz = [
  "Tadqiqotning shakllantiruvchi eksperimentidagi 30 ta tajriba darsi",
  "6 ta raqamli hayotiy senariy + boshlangʻich va yakuniy diagnostika",
  "Funksional raqamli savodxonlikning barcha 5 ta tarkibiy qismi (F70, 7-sinf)",
];

export const programModules: ProgramModule[] = [
  {
    slug: "diagnostic",
    title: "Диагностика",
    hours: "2 часа",
    lessonCount: 2,
    description: "Два диагностических урока — констатирующий и контрольный замеры функциональной цифровой грамотности (ФЦГ).",
    image: "/uzbek-images/health-clinic.jpg",
    imageAlt: "Диагностика цифровой грамотности",
    imageCredit: "Документ диссертационного исследования",
    imageSourceUrl: "",
    knowledge: [
      "Что такое функциональная цифровая грамотность",
      "Из каких 5 компонентов состоит ФЦГ",
      "Зачем нужны входная и итоговая диагностика"
    ],
    skills: [
      "Спокойно работать с цифровыми заданиями",
      "Пользоваться кнопками «Послушать» и «Помощь»",
      "Доводить задание до конца"
    ],
    lessons: [
      {
        slug: "diagnostic-entry",
        title: "Личная гигиена подростков",
        duration: "1 час",
        summary: "Вводный урок — диагностика. Платформа смотрит, как ребёнок справляется с цифровыми заданиями до начала курса.",
        intro: "Это первый урок-знакомство. Ребёнок проходит короткие задания: читает текст на экране, нажимает на значки, выбирает ответы. Здесь нет оценок — мы просто смотрим стартовый уровень, чтобы потом увидеть, чему он научился за учебный год.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Личная гигиена подростков»",
        goals: [
          "Понять, что такое личная гигиена и зачем это нужно в жизни.",
          "Освоить цифровое действие — пройти входную диагностику цифровых умений.",
          "Запомнить правило безопасности: правила безопасной работы за экраном (расстояние до глаз, осанка)."
        ],
        rules: [
          "Спокойно прочитай задание.",
          "Не торопись — оценок нет.",
          "Если непонятно — нажми «Послушать».",
          "Если не знаешь — спроси у учителя."
        ],
        scenarios: [
          {
            title: "Утренние гигиенические процедуры",
            text: "Утром ты только проснулся. Что нужно сделать в первую очередь?",
            options: [
              "Умыться, почистить зубы, причесаться.",
              "Сразу выйти на улицу.",
              "Посидеть в телефоне до обеда."
            ],
            correctIndex: 0,
            feedback: "Верно. Утром — гигиенические процедуры: умывание, зубы, причёска.",
            support: "Это базовая гигиена — ежедневная привычка с детства."
          },
          {
            title: "Когда нужно мыть руки",
            text: "Ты пришёл домой с улицы и хочешь поесть.",
            options: [
              "Сначала помыть руки с мылом.",
              "Не мыть, грязь полезна.",
              "Сразу за стол — потом помою."
            ],
            correctIndex: 0,
            feedback: "Правильно. Руки моют перед едой и после улицы.",
            support: "На грязных руках микробы, поэтому моют их с мылом."
          }
        ],
        quiz: [
          {
            question: "Что относится к личной гигиене?",
            options: [
              "Бег и прыжки.",
              "Умывание, чистка зубов, мытьё рук.",
              "Только мытьё посуды."
            ],
            correctIndex: 1
          },
          {
            question: "Зубы нужно чистить:",
            options: [
              "Только в выходные.",
              "Раз в месяц.",
              "Утром и вечером, каждый день."
            ],
            correctIndex: 2
          },
          {
            question: "Зачем эта диагностика на платформе?",
            options: [
              "Посмотреть стартовый уровень — оценок не будет.",
              "Чтобы исключить из школы.",
              "Чтобы поставить двойку."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "Объясните ребёнку: сегодня просто знакомство с компьютерными заданиями на тему гигиены. Оценок не будет — по итогам года сравним прогресс.",
        tags: [
          "личная гигиена",
          "Диагностический урок (вне сценариев)",
          "Урок 1"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — пройти входную диагностику цифровых умений — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: правила личной гигиены",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: правила безопасной работы за экраном (расстояние до глаз, осанка)",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Диагностический модуль»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "3 мин",
              title: "Организационный момент",
              teacherSays: "Сегодня — особый день, мы пройдём цифровые задания. Спокойно, по очереди, без оценок.",
              teacherDoes: [
                "Приветствует группу",
                "Объясняет правила работы"
              ],
              studentActivity: "Слушают; настраиваются на работу"
            },
            {
              duration: "5 мин",
              title: "Инструктаж и знакомство с интерфейсом",
              teacherDoes: [
                "Показывает кнопки «Дальше», «Послушать», «Помощь»",
                "Демонстрирует пробное задание"
              ],
              studentActivity: "Пробуют пробное задание под руководством учителя"
            },
            {
              duration: "7 мин",
              title: "Блок 1 — читательский компонент",
              teacherDoes: [
                "Запускает 3 цифровые карточки",
                "Фиксирует ответы"
              ],
              studentActivity: "Самостоятельно читают и отвечают",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "7 мин",
              title: "Блок 2 — цифровой и знаково-символический компоненты",
              teacherDoes: [
                "Запускает задания на распознавание значков"
              ],
              studentActivity: "Распознают значки, нажимают на элементы",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает спокойную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "5 мин",
              title: "Блок 3 — безопасностный компонент",
              teacherDoes: [
                "Запускает 3 ситуации «безопасно / опасно»"
              ],
              studentActivity: "Оценивают ситуации",
              hint: "Диагностическая точка 3"
            },
            {
              duration: "7 мин",
              title: "Блок 4 — социально-бытовой компонент",
              teacherDoes: [
                "Запускает простую бытовую цифровую ситуацию"
              ],
              studentActivity: "Принимают решение",
              hint: "Диагностическая точка 4"
            },
            {
              duration: "4 мин",
              title: "Рефлексия",
              teacherDoes: [
                "Хвалит за пройденную диагностику",
                "Объясняет: оценок нет"
              ],
              studentActivity: "Выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на личная гигиена и рассказать на следующем уроке.",
          safetyNote: "правила безопасной работы за экраном (расстояние до глаз, осанка)"
        },
        trainer: {
          type: "morning-quest",
          task: "Пройди утренний квест Алишера: 6 коротких заданий на телефоне. Здесь без оценок — мы смотрим, что ты уже умеешь.",
          feedbackCorrect: "Молодец! Ты прошёл все 6 заданий.",
          feedbackWrong: "Ничего страшного — это диагностика, оценок нет."
        },
      },
      {
        slug: "diagnostic-final",
        title: "Правила и приёмы сохранения чистоты и здоровья тела",
        duration: "1 час",
        summary: "Контрольный урок — итоговая диагностика. Платформа смотрит, чему ребёнок научился за год.",
        intro: "Завершающая диагностика того же типа, что и в самом первом уроке. Сравнение результатов «до» и «после» показывает, насколько выросла цифровая грамотность ребёнка за учебный год.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Правила и приёмы сохранения чистоты и здоровья тела»",
        goals: [
          "Понять, что такое чистота и здоровье тела и зачем это нужно в жизни.",
          "Освоить цифровое действие — пройти итоговую диагностику цифровых умений.",
          "Запомнить правило безопасности: обобщение правил безопасной работы за экраном и в быту."
        ],
        rules: [
          "Спокойно прочитай задание.",
          "Не торопись — оценок нет.",
          "Если непонятно — нажми «Послушать».",
          "Если не знаешь — спроси у учителя."
        ],
        scenarios: [
          {
            title: "Гигиена тела — итог",
            text: "За год мы прошли много тем про чистоту и здоровье. Что главное?",
            options: [
              "Мыться только когда сильно грязный.",
              "Чистота тела, рук и зубов — каждый день.",
              "Гигиена не важна."
            ],
            correctIndex: 1,
            feedback: "Верно. Ежедневная гигиена — основа здоровья.",
            support: "Это закрепление знаний за учебный год по гигиене."
          },
          {
            title: "Куда обратиться при болезни",
            text: "У тебя поднялась температура и болит голова.",
            options: [
              "Промолчать и идти гулять.",
              "Самому пить лекарства.",
              "Сказать взрослому, измерить температуру термометром."
            ],
            correctIndex: 2,
            feedback: "Хорошо. При болезни всегда зовём взрослого.",
            support: "Самолечение в твоём возрасте опасно."
          }
        ],
        quiz: [
          {
            question: "Что нужно делать для чистоты тела каждый день?",
            options: [
              "Умываться, чистить зубы, мыть руки.",
              "Ничего не делать.",
              "Только в субботу."
            ],
            correctIndex: 0
          },
          {
            question: "Когда меняют одежду на чистую?",
            options: [
              "Никогда.",
              "Каждый день — нижнее бельё, носки. И всю — после спорта.",
              "Раз в месяц."
            ],
            correctIndex: 1
          },
          {
            question: "Зачем итоговая диагностика?",
            options: [
              "Это просто экзамен.",
              "Поставить двойку.",
              "Сравнить, как я мог в начале и как могу сейчас."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Поддержите ребёнка перед итоговой диагностикой по гигиене. Скажите: «Просто покажи, чему научился».",
        tags: [
          "чистота и здоровье тела",
          "Диагностический урок (вне сценариев)",
          "Урок 32"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — пройти итоговую диагностику цифровых умений — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: правила чистоты и здоровья тела",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: обобщение правил безопасной работы за экраном и в быту",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Диагностический модуль»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "3 мин",
              title: "Организационный момент",
              teacherSays: "Сегодня — особый день, мы пройдём цифровые задания. Спокойно, по очереди, без оценок.",
              teacherDoes: [
                "Приветствует группу",
                "Объясняет правила работы"
              ],
              studentActivity: "Слушают; настраиваются на работу"
            },
            {
              duration: "5 мин",
              title: "Инструктаж и знакомство с интерфейсом",
              teacherDoes: [
                "Показывает кнопки «Дальше», «Послушать», «Помощь»",
                "Демонстрирует пробное задание"
              ],
              studentActivity: "Пробуют пробное задание под руководством учителя"
            },
            {
              duration: "7 мин",
              title: "Блок 1 — читательский компонент",
              teacherDoes: [
                "Запускает 3 цифровые карточки",
                "Фиксирует ответы"
              ],
              studentActivity: "Самостоятельно читают и отвечают",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "7 мин",
              title: "Блок 2 — цифровой и знаково-символический компоненты",
              teacherDoes: [
                "Запускает задания на распознавание значков"
              ],
              studentActivity: "Распознают значки, нажимают на элементы",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает спокойную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "5 мин",
              title: "Блок 3 — безопасностный компонент",
              teacherDoes: [
                "Запускает 3 ситуации «безопасно / опасно»"
              ],
              studentActivity: "Оценивают ситуации",
              hint: "Диагностическая точка 3"
            },
            {
              duration: "7 мин",
              title: "Блок 4 — социально-бытовой компонент",
              teacherDoes: [
                "Запускает простую бытовую цифровую ситуацию"
              ],
              studentActivity: "Принимают решение",
              hint: "Диагностическая точка 4"
            },
            {
              duration: "4 мин",
              title: "Рефлексия",
              teacherDoes: [
                "Хвалит за пройденную диагностику",
                "Объясняет: оценок нет"
              ],
              studentActivity: "Выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на чистота и здоровье тела и рассказать на следующем уроке.",
          safetyNote: "обобщение правил безопасной работы за экраном и в быту"
        },        trainer: {
          type: "final-quest",
          task: "Это контрольный замер — 6 заданий по разным умениям.",
          feedbackCorrect: "Спасибо! Контрольный замер пройден.",
          feedbackWrong: "Ничего страшного — это диагностика, без оценок."
        }

      }
    ]
  },
  {
    slug: "digital-health",
    title: "Цифровое здоровье",
    hours: "8 часов",
    lessonCount: 8,
    description: "Восемь уроков, где обучающийся работает с цифровыми объектами здоровья: гардеробом, шампунем, опросником кожи, прогнозом погоды, этикеткой, регулятором громкости и цифровым термометром.",
    image: "/uzbek-images/health-clinic.jpg",
    imageAlt: "Цифровое здоровье — личная гигиена и медицинские приборы",
    imageCredit: "UQUVLI.UZ",
    imageSourceUrl: "",
    knowledge: [
      "Как выглядит цифровая этикетка и какие на ней главные места",
      "Как читать значки погоды и УФ-индекс",
      "Какие цифровые приборы помогают в гигиене и здоровье"
    ],
    skills: [
      "Подбирать средство и одежду по цифровой подсказке",
      "Читать цифровую этикетку и принимать решение",
      "Считывать показания цифровых приборов"
    ],
    lessons: [
      {
        slug: "appearance-young-people",
        title: "Внешний вид молодых людей",
        duration: "1 час",
        summary: "Учимся подбирать одежду под ситуацию: в школу — одно, в гости — другое.",
        intro: "На экране — гардероб с разными вещами. Ребёнок собирает образ: что надеть в школу, что в гости. Платформа подсказывает, если что-то не подходит по случаю. Так формируется привычка одеваться к месту.",
        image: "/uzbek-images/health-clinic.jpg",
        imageAlt: "Иллюстрация к уроку «Внешний вид молодых людей»",
        goals: [
          "Понять, что такое внешний вид и зачем это нужно в жизни.",
          "Освоить цифровое действие — собрать цифровой образ под ситуацию.",
          "Запомнить правило безопасности: уместность одежды для разных мест и встреч."
        ],
        rules: [
          "Сначала открой гардероб.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: уместность одежды для разных мест и встреч.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Сбор в школу",
            text: "Тебе нужно одеться в школу. Что наденешь?",
            options: [
              "Аккуратную рубашку и брюки.",
              "Праздничный костюм с галстуком.",
              "Спортивный костюм и кроссовки."
            ],
            correctIndex: 0,
            feedback: "Верно — в школу одеваются аккуратно и сдержанно.",
            support: "В школе важна опрятность, а не яркость."
          },
          {
            title: "В гости к бабушке",
            text: "Идёшь в гости к бабушке на день рождения.",
            options: [
              "Грязную футболку — никто не заметит.",
              "Чистую нарядную одежду — рубашка/блузка и брюки/юбка.",
              "Спортивные шорты."
            ],
            correctIndex: 1,
            feedback: "Хорошо — на праздник одеваются опрятно и нарядно.",
            support: "Аккуратный вид — это уважение к хозяевам."
          }
        ],
        quiz: [
          {
            question: "Что главное в школьной одежде?",
            options: [
              "Совсем не важно.",
              "Чистая и аккуратная.",
              "Самая яркая."
            ],
            correctIndex: 1
          },
          {
            question: "Перед выходом из дома нужно:",
            options: [
              "Ничего не делать.",
              "Посмотреть в зеркало и проверить себя.",
              "Сразу выбежать."
            ],
            correctIndex: 1
          },
          {
            question: "Какая одежда подойдёт на тренировку?",
            options: [
              "Школьная форма.",
              "Праздничное платье.",
              "Спортивный костюм и кроссовки."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Помогите ребёнку перед выходом проверить: чистая ли одежда, опрятный ли вид. Хвалите за самостоятельность.",
        tags: [
          "внешний вид",
          "Цифровое здоровье",
          "Урок 2"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — собрать цифровой образ под ситуацию — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: гардероб",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: уместность одежды для разных мест и встреч",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровое здоровье»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (первый формирующий урок; повторение опирается на диагностику)"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся собрать цифровой образ под ситуацию.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «внешний вид»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «внешний вид»",
                "Показывает гардероб"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «гардеробе»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как собрать цифровой образ под ситуацию» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает гардероб",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с гардеробом; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на внешний вид и рассказать на следующем уроке.",
          safetyNote: "уместность одежды для разных мест и встреч"
        },
        trainer: {
          type: "outfit",
          task: "Подбери одежду под ситуацию: в школу — одно, на физкультуру — другое, на день рождения — третье.",
          feedbackCorrect: "Отлично! Образ подходит под ситуацию.",
          feedbackWrong: "Эта одежда не подходит к случаю. Попробуй другой набор."
        }
      },
      {
        slug: "hair-types-care",
        title: "Основные типы волос: характеристики и особенности ухода",
        duration: "1 час",
        summary: "Учимся определять тип волос и выбирать подходящий шампунь по пометке на упаковке.",
        intro: "Ребёнок определяет по картинкам, какой у него тип волос: сухие, жирные или нормальные. Потом на экране-витрине выбирает шампунь с подходящей пометкой и читает этикетку. Это типичное потребительское умение — подобрать средство «под себя».",
        image: "/uzbek-images/health-clinic.jpg",
        imageAlt: "Иллюстрация к уроку «Основные типы волос: характеристики и особенности ухода»",
        goals: [
          "Понять, что такое типы волос и зачем это нужно в жизни.",
          "Освоить цифровое действие — подобрать средство по типу волос на цифровой витрине.",
          "Запомнить правило безопасности: правило: пользоваться только подходящим средством."
        ],
        rules: [
          "Сначала открой витрину шампуней.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: правило: пользоваться только подходящим средством.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "У тебя жирные волосы",
            text: "Утром волосы быстро становятся жирными у корней.",
            options: [
              "Купить шампунь с пометкой «для жирных волос».",
              "Любой шампунь — без разницы.",
              "Мыть голову мылом."
            ],
            correctIndex: 0,
            feedback: "Верно — на упаковке всегда написано, для каких волос.",
            support: "Подбирать средство по типу волос — основа правильного ухода."
          },
          {
            title: "Сухие волосы",
            text: "Волосы сухие и пушатся после мытья.",
            options: [
              "Шампунь «для сухих волос» с увлажнением.",
              "Шампунь «для жирных» — он сильнее моет.",
              "Совсем без шампуня."
            ],
            correctIndex: 0,
            feedback: "Правильно. Сухим волосам нужно увлажнение.",
            support: "Шампунь не по типу волос только ухудшает их состояние."
          }
        ],
        quiz: [
          {
            question: "Какие бывают типы волос?",
            options: [
              "Только длинные и короткие.",
              "Только тёмные и светлые.",
              "Сухие, жирные, нормальные, смешанные."
            ],
            correctIndex: 2
          },
          {
            question: "Где смотреть, для каких волос шампунь?",
            options: [
              "Спросить у соседа.",
              "На упаковке — есть пометка.",
              "Угадать по запаху."
            ],
            correctIndex: 1
          },
          {
            question: "Что делать, если шампунь не подходит?",
            options: [
              "Поменять на другой по типу волос.",
              "Перестать мыть голову.",
              "Использовать до конца."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "Покажите ребёнку дома пометку на шампуне — для каких волос. Вместе подберите подходящий.",
        tags: [
          "типы волос",
          "Цифровое здоровье",
          "Урок 3"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — подобрать средство по типу волос на цифровой витрине — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: витрина шампуней",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: правило: пользоваться только подходящим средством",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровое здоровье»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 2 (внешний вид))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся подобрать средство по типу волос на цифровой витрине.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «типы волос»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «типы волос»",
                "Показывает витрину шампуней"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «витрине шампуней»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как подобрать средство по типу волос на цифровой витрине» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает витрину шампуней",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с витриной шампуней; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на типы волос и рассказать на следующем уроке.",
          safetyNote: "правило: пользоваться только подходящим средством"
        },
        trainer: {
          type: "hair-care",
          task: "Подбери шампунь под тип волос: жирные, сухие или нормальные.",
          feedbackCorrect: "Молодец! Этот шампунь подходит к типу волос.",
          feedbackWrong: "Этот шампунь не подойдёт. Прочитай этикетку и попробуй другой."
        }
      },
      {
        slug: "skin-types-care",
        title: "Типы кожи лица и особенности ухода за ними",
        duration: "1 час",
        summary: "Проходим цифровой опросник «Какой у тебя тип кожи» и читаем инструкцию по уходу.",
        intro: "Ребёнок отвечает на простые вопросы о коже. Платформа сама определяет тип и показывает короткие шаги ухода. Это знакомит с тем, как работают опросники в приложениях здоровья.",
        image: "/uzbek-images/health-clinic.jpg",
        imageAlt: "Иллюстрация к уроку «Типы кожи лица и особенности ухода за ними»",
        goals: [
          "Понять, что такое типы кожи и зачем это нужно в жизни.",
          "Освоить цифровое действие — пройти цифровой опросник и получить рекомендацию.",
          "Запомнить правило безопасности: критическое отношение к рекомендациям из интернета."
        ],
        rules: [
          "Сначала открой опросник кожи.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: критическое отношение к рекомендациям из интернета.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Кожа блестит на лбу",
            text: "К обеду на лбу и носу появляется блеск.",
            options: [
              "Это нормально, ничего делать не надо.",
              "Это болезнь.",
              "Это жирная или комбинированная кожа — нужен подходящий уход."
            ],
            correctIndex: 2,
            feedback: "Правильно — лоб и нос часто блестят при жирной коже.",
            support: "Тип кожи определяет, как за ней ухаживать."
          },
          {
            title: "Стянутость после умывания",
            text: "После умывания кожа на щеках стягивается.",
            options: [
              "Это сухая кожа — нужен мягкий уход и крем.",
              "Это нормальная кожа.",
              "Нужно мыть жёстким мылом."
            ],
            correctIndex: 0,
            feedback: "Верно — стянутость это признак сухой кожи.",
            support: "Сухой коже нужно увлажнение."
          }
        ],
        quiz: [
          {
            question: "Какие бывают типы кожи?",
            options: [
              "Сухая, жирная, нормальная, комбинированная.",
              "Только белая и тёмная.",
              "Только чистая."
            ],
            correctIndex: 0
          },
          {
            question: "Зачем нужен опросник в приложении?",
            options: [
              "Чтобы заработать деньги.",
              "Это игра.",
              "Чтобы определить тип кожи и подобрать уход."
            ],
            correctIndex: 2
          },
          {
            question: "Можно ли доверять рекомендациям сразу?",
            options: [
              "Конечно — приложение всегда право.",
              "Никогда никому не верить.",
              "Лучше посоветоваться со взрослым."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Помогите ребёнку определить тип его кожи. Подберите вместе мягкое средство для умывания.",
        tags: [
          "типы кожи",
          "Цифровое здоровье",
          "Урок 4"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — пройти цифровой опросник и получить рекомендацию — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: опросник кожи",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: критическое отношение к рекомендациям из интернета",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровое здоровье»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 3 (типы волос))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся пройти цифровой опросник и получить рекомендацию.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «типы кожи»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «типы кожи»",
                "Показывает опросник кожи"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «опроснике кожи»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как пройти цифровой опросник и получить рекомендацию» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает опросник кожи",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с опросником кожи; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на типы кожи и рассказать на следующем уроке.",
          safetyNote: "критическое отношение к рекомендациям из интернета"
        },
        trainer: {
          type: "skin-type",
          task: "Посмотри на лицо и определи тип кожи: жирная, сухая или нормальная.",
          feedbackCorrect: "Правильно. Ты узнал тип кожи.",
          feedbackWrong: "Посмотри внимательнее на лицо — на признаки типа кожи."
        }
      },
      {
        slug: "sun-exposure-skin",
        title: "Влияние солнца на кожу",
        duration: "1 час",
        summary: "Читаем прогноз погоды и решаем, нужны ли сегодня головной убор и солнцезащитный крем.",
        intro: "На экране — простой прогноз: температура, значок солнца или облаков, УФ-индекс. По правилу «солнечно → защита нужна» ребёнок решает, что взять с собой. Прогноз в телефоне — массовое умение, которым пользуется каждый.",
        image: "/uzbek-images/health-clinic.jpg",
        imageAlt: "Иллюстрация к уроку «Влияние солнца на кожу»",
        goals: [
          "Понять, что такое солнце и кожа и зачем это нужно в жизни.",
          "Освоить цифровое действие — прочитать цифровой прогноз и решить про защиту от солнца.",
          "Запомнить правило безопасности: защита кожи от ожогов и теплового удара."
        ],
        rules: [
          "Сначала открой прогноз погоды.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: защита кожи от ожогов и теплового удара.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Прогноз: солнечно, +30°C",
            text: "На улице яркое солнце. Что взять с собой?",
            options: [
              "Ничего, и так нормально.",
              "Тёплую куртку.",
              "Головной убор и солнцезащитный крем."
            ],
            correctIndex: 2,
            feedback: "Верно — защита от солнца обязательна.",
            support: "Сильное солнце вызывает ожог и тепловой удар."
          },
          {
            title: "Прогноз: пасмурно, +18°C",
            text: "На улице облачно. Защита нужна?",
            options: [
              "Обязательно панама, как в жару.",
              "Крем не обязательно, но УФ-индекс лучше проверить.",
              "Совсем не выйти."
            ],
            correctIndex: 1,
            feedback: "Хорошо — облака не всегда защищают от УФ.",
            support: "УФ-индекс показывает реальную силу солнца."
          }
        ],
        quiz: [
          {
            question: "Где смотреть силу солнца?",
            options: [
              "На небе на глаз.",
              "Это нельзя узнать.",
              "В прогнозе — там УФ-индекс."
            ],
            correctIndex: 2
          },
          {
            question: "Что вреднее всего от сильного солнца?",
            options: [
              "Промокнуть.",
              "Ожог кожи и тепловой удар.",
              "Замёрзнуть."
            ],
            correctIndex: 1
          },
          {
            question: "Что делать в очень жаркий день?",
            options: [
              "Носить шапку, пить воду, прятаться в тень.",
              "Бегать без головного убора.",
              "Сидеть дома без воды."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "Перед прогулкой летом — посмотрите вместе прогноз и УФ-индекс. Возьмите крем и панаму.",
        tags: [
          "солнце и кожа",
          "Цифровое здоровье",
          "Урок 5"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — прочитать цифровой прогноз и решить про защиту от солнца — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: прогноз погоды",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: защита кожи от ожогов и теплового удара",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровое здоровье»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 4 (типы кожи))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся прочитать цифровой прогноз и решить про защиту от солнца.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «солнце и кожа»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «солнце и кожа»",
                "Показывает прогноз погоды"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «прогнозе погоды»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как прочитать цифровой прогноз и решить про защиту от солнца» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает прогноз погоды",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с прогнозом погоды; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на солнце и кожа и рассказать на следующем уроке.",
          safetyNote: "защита кожи от ожогов и теплового удара"
        },
        trainer: {
          type: "sun-care",
          task: "Посмотри на прогноз погоды и реши, как защититься от солнца.",
          feedbackCorrect: "Верно! Так ты защитишь кожу от солнца.",
          feedbackWrong: "Это не безопасно. Прочитай прогноз и выбери защиту."
        }
      },
      {
        slug: "cosmetics-basics",
        title: "Косметические средства и их применение",
        duration: "1 час",
        summary: "Учимся читать этикетку средства: где название, где срок годности, где способ применения.",
        intro: "На экране — упаковка крема или шампуня. Ребёнок находит три ключевые места этикетки и решает: можно пользоваться средством или оно просрочено. Главное правило — всегда проверять срок годности.",
        image: "/uzbek-images/health-clinic.jpg",
        imageAlt: "Иллюстрация к уроку «Косметические средства и их применение»",
        goals: [
          "Понять, что такое косметические средства и зачем это нужно в жизни.",
          "Освоить цифровое действие — прочитать цифровую этикетку средства.",
          "Запомнить правило безопасности: просроченным средством и средством не по назначению пользоваться нельзя."
        ],
        rules: [
          "Сначала открой этикетку средства.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: просроченным средством и средством не по назначению пользоваться нельзя.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Старая баночка крема",
            text: "Нашёл в шкафу баночку крема. Срок годности — 2023 год.",
            options: [
              "Подарить кому-нибудь.",
              "Использовать, ведь крем дорогой.",
              "Выбросить — пользоваться нельзя."
            ],
            correctIndex: 2,
            feedback: "Правильно. Просроченным средством можно навредить коже.",
            support: "Срок годности — это безопасность."
          },
          {
            title: "Этикетка без даты",
            text: "На баночке нет даты срока годности.",
            options: [
              "Подумать неделю.",
              "Не пользоваться — неизвестно, можно ли.",
              "Использовать, раз дата стёрлась."
            ],
            correctIndex: 1,
            feedback: "Хорошо. Если срока не видно — лучше не использовать.",
            support: "Любое средство без срока — потенциально опасно."
          }
        ],
        quiz: [
          {
            question: "Что главное на этикетке косметики?",
            options: [
              "Только цена.",
              "Срок годности, название, способ применения.",
              "Только цвет упаковки."
            ],
            correctIndex: 1
          },
          {
            question: "Что значит «срок годности — 2023»?",
            options: [
              "Скидка 23%.",
              "Произведено в 2023 году.",
              "Можно пользоваться до конца 2023 года."
            ],
            correctIndex: 2
          },
          {
            question: "Можно ли использовать просроченный крем?",
            options: [
              "Да, если жалко выбрасывать.",
              "Нет, можно навредить коже.",
              "Только зимой."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Дома вместе с ребёнком проверьте косметику в ванной на срок годности. Просроченное — выбросите.",
        tags: [
          "косметические средства",
          "Цифровое здоровье",
          "Урок 6"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — прочитать цифровую этикетку средства — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: этикетка средства",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: просроченным средством и средством не по назначению пользоваться нельзя",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровое здоровье»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 5 (влияние солнца))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся прочитать цифровую этикетку средства.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «косметические средства»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «косметические средства»",
                "Показывает этикетку средства"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «этикетке средства»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как прочитать цифровую этикетку средства» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает этикетку средства",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с этикеткой средства; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на косметические средства и рассказать на следующем уроке.",
          safetyNote: "просроченным средством и средством не по назначению пользоваться нельзя"
        },
        trainer: {
          type: "label-reader",
          task: "Прочитай этикетку крема — найди 4 важных места: срок годности, состав, способ применения и предупреждение.",
          feedbackCorrect: "Молодец! Ты нашёл всё, что нужно прочитать на этикетке.",
          feedbackWrong: "Эту часть этикетки можно пропустить — ищи дальше."
        }
      },
      {
        slug: "skincare-checklist",
        title: "Использование косметических средств по уходу за кожей",
        duration: "1 час",
        summary: "Проходим утренний уход за кожей по шагам — как чек-лист на платформе.",
        intro: "Простой чек-лист из трёх шагов: умыться, нанести тоник, нанести крем. Ребёнок отмечает каждый выполненный шаг. Так формируется умение работать с пошаговой цифровой инструкцией.",
        image: "/uzbek-images/health-clinic.jpg",
        imageAlt: "Иллюстрация к уроку «Использование косметических средств по уходу за кожей»",
        goals: [
          "Понять, что такое уход за кожей и зачем это нужно в жизни.",
          "Освоить цифровое действие — пройти цифровой чек-лист ухода по шагам.",
          "Запомнить правило безопасности: выполнять шаги в правильном порядке; не пропускать."
        ],
        rules: [
          "Сначала открой чек-лист ухода.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: выполнять шаги в правильном порядке; не пропускать.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Утренний уход",
            text: "Утром собираешься в школу. Что сделать с кожей?",
            options: [
              "Только лицо помыть.",
              "Сразу одеваться без умывания.",
              "Умыться, нанести тоник, нанести лёгкий крем."
            ],
            correctIndex: 2,
            feedback: "Верно. Утром — три шага: умыться, тоник, крем.",
            support: "Регулярный уход поддерживает чистоту кожи."
          },
          {
            title: "Пропустил шаг",
            text: "Забыл нанести крем после умывания.",
            options: [
              "Помыть лицо снова.",
              "Уже не важно — пройдёт.",
              "Нанести крем — ещё не поздно."
            ],
            correctIndex: 2,
            feedback: "Хорошо. Крем можно нанести и попозже.",
            support: "Чек-лист помогает не забыть шаги."
          }
        ],
        quiz: [
          {
            question: "Из скольких шагов состоит утренний уход?",
            options: [
              "Из одного.",
              "Из трёх: умывание, тоник, крем.",
              "Из десяти."
            ],
            correctIndex: 1
          },
          {
            question: "Зачем чек-лист в приложении?",
            options: [
              "Чтобы запутать.",
              "Чтобы не забыть шаги и отметить выполненное.",
              "Это просто игра."
            ],
            correctIndex: 1
          },
          {
            question: "В каком порядке делать шаги?",
            options: [
              "По порядку, как написано в чек-листе.",
              "Только последний шаг.",
              "В любом — без разницы."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "Распечатайте простой чек-лист утреннего ухода и повесьте в ванной. Помогите ребёнку освоить регулярность.",
        tags: [
          "уход за кожей",
          "Цифровое здоровье",
          "Урок 7"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — пройти цифровой чек-лист ухода по шагам — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: чек-лист ухода",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: выполнять шаги в правильном порядке; не пропускать",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровое здоровье»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 6 (этикетка средства))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся пройти цифровой чек-лист ухода по шагам.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «уход за кожей»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «уход за кожей»",
                "Показывает чек-лист ухода"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «чек-листе ухода»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как пройти цифровой чек-лист ухода по шагам» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает чек-лист ухода",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с чек-листом ухода; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на уход за кожей и рассказать на следующем уроке.",
          safetyNote: "выполнять шаги в правильном порядке; не пропускать"
        },
        trainer: {
          type: "step-sequence",
          task: "Разложи карточки в правильном порядке — как правильно умыться и нанести крем.",
          feedbackCorrect: "Верно! Так и нужно делать по порядку.",
          feedbackWrong: "Это не следующий шаг. Подумай: что идёт после?"
        }
      },
      {
        slug: "ear-hygiene-volume",
        title: "Гигиена слуха",
        duration: "1 час",
        summary: "Настраиваем громкость на безопасный уровень — чтобы не вредить слуху.",
        intro: "Ползунок громкости с тремя зонами: зелёная (безопасно), жёлтая (внимательно), красная (вредно). Ребёнок ставит звук в безопасную зону. Это правило защиты слуха при пользовании наушниками и плеером.",
        image: "/uzbek-images/health-clinic.jpg",
        imageAlt: "Иллюстрация к уроку «Гигиена слуха»",
        goals: [
          "Понять, что такое гигиена слуха и зачем это нужно в жизни.",
          "Освоить цифровое действие — настроить безопасную громкость на цифровом устройстве.",
          "Запомнить правило безопасности: громкая музыка в наушниках вредит слуху."
        ],
        rules: [
          "Сначала открой регулятор громкости.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: громкая музыка в наушниках вредит слуху.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Громкость наушников",
            text: "Слушаешь музыку в наушниках. Сосед слышит твою музыку.",
            options: [
              "Снять наушники, чтобы все слышали.",
              "Сделать тише — это слишком громко.",
              "Сделать ещё громче."
            ],
            correctIndex: 1,
            feedback: "Правильно. Если слышно соседу — громко для слуха.",
            support: "Безопасная громкость — не выше 60%."
          },
          {
            title: "После долгого слушания",
            text: "Слушал музыку 2 часа подряд. В ушах звенит.",
            options: [
              "Продолжать слушать.",
              "Сделать ещё громче.",
              "Снять наушники и дать ушам отдохнуть."
            ],
            correctIndex: 2,
            feedback: "Верно. Звон в ушах — сигнал «отдохни».",
            support: "Слух нужно беречь, иначе он ухудшится."
          }
        ],
        quiz: [
          {
            question: "Безопасный уровень громкости — это:",
            options: [
              "100%.",
              "Чем громче, тем лучше.",
              "До 60%."
            ],
            correctIndex: 2
          },
          {
            question: "Сколько подряд можно слушать музыку в наушниках?",
            options: [
              "Хоть весь день.",
              "Не больше часа, потом перерыв.",
              "Только 5 минут."
            ],
            correctIndex: 1
          },
          {
            question: "Что делать, если в ушах звенит?",
            options: [
              "Слушать дальше.",
              "Промыть водой.",
              "Снять наушники и отдохнуть."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Объясните ребёнку: громкая музыка вредит слуху на всю жизнь. Договоритесь о правиле «до 60%».",
        tags: [
          "гигиена слуха",
          "Цифровое здоровье",
          "Урок 8"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — настроить безопасную громкость на цифровом устройстве — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: регулятор громкости",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: громкая музыка в наушниках вредит слуху",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровое здоровье»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 7 (уход за кожей))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся настроить безопасную громкость на цифровом устройстве.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «гигиена слуха»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «гигиена слуха»",
                "Показывает регулятор громкости"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «регуляторе громкости»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как настроить безопасную громкость на цифровом устройстве» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает регулятор громкости",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с регулятором громкости; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на гигиена слуха и рассказать на следующем уроке.",
          safetyNote: "громкая музыка в наушниках вредит слуху"
        },
        trainer: {
          type: "volume-safe",
          task: "Поставь громкость наушников на безопасный уровень — чтобы не повредить слух.",
          feedbackCorrect: "Верно. Такая громкость не повредит уши.",
          feedbackWrong: "Слишком громко — может повредить слух. Сделай тише."
        }
      },
      {
        slug: "digital-thermometer",
        title: "Виды термометров. Правила измерения температуры тела",
        duration: "1 час",
        summary: "Считываем показания цифрового термометра и решаем — норма или нужно сказать взрослому.",
        intro: "Цифровой термометр показывает число на экране. Ребёнок сравнивает показания со шкалой: пониженная, норма, повышенная. При высокой температуре — звонок взрослым. Прибор реальный и востребованный в каждой семье.",
        image: "/uzbek-images/health-clinic.jpg",
        imageAlt: "Иллюстрация к уроку «Виды термометров. Правила измерения температуры тела»",
        goals: [
          "Понять, что такое термометр и зачем это нужно в жизни.",
          "Освоить цифровое действие — считать показания цифрового термометра и оценить.",
          "Запомнить правило безопасности: при температуре выше 38 °C — звонить взрослым и в скорую."
        ],
        rules: [
          "Сначала открой цифровой термометр.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: при температуре выше 38 °C — звонить взрослым и в скорую.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Термометр показал 38,5°C",
            text: "Измерил температуру — 38,5°C.",
            options: [
              "Молчать и пойти играть.",
              "Принять холодный душ.",
              "Сразу сказать взрослому — нужна помощь."
            ],
            correctIndex: 2,
            feedback: "Правильно. Высокая температура — это сигнал.",
            support: "При температуре выше 38°C нужно сказать взрослому."
          },
          {
            title: "Термометр показал 36,7°C",
            text: "Измерил температуру — 36,7°C.",
            options: [
              "Это очень низкая.",
              "Это высокая температура, надо в больницу.",
              "Это норма — можно идти в школу."
            ],
            correctIndex: 2,
            feedback: "Верно. 36,7 — нормальная температура.",
            support: "Норма — около 36,6°C, плюс-минус полградуса."
          }
        ],
        quiz: [
          {
            question: "Какая нормальная температура тела?",
            options: [
              "40°C.",
              "Около 36,6°C.",
              "30°C."
            ],
            correctIndex: 1
          },
          {
            question: "При какой температуре звать взрослого?",
            options: [
              "При любой.",
              "Выше 38°C.",
              "Никогда."
            ],
            correctIndex: 1
          },
          {
            question: "Цифровой термометр — это:",
            options: [
              "Прибор с экраном, показывает число.",
              "Часы.",
              "Стеклянная палочка."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "Покажите ребёнку, как пользоваться вашим домашним термометром. Объясните, при каких показаниях звать вас.",
        tags: [
          "термометр",
          "Цифровое здоровье",
          "Урок 26"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — считать показания цифрового термометра и оценить — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: цифровой термометр",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: при температуре выше 38 °C — звонить взрослым и в скорую",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровое здоровье»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 25 (безопасность))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся считать показания цифрового термометра и оценить.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «термометр»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «термометр»",
                "Показывает цифровой термометр"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «цифровом термометре»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как считать показания цифрового термометра и оценить» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает цифровой термометр",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с цифровым термометром; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на термометр и рассказать на следующем уроке.",
          safetyNote: "при температуре выше 38 °C — звонить взрослым и в скорую"
        },
        trainer: {
          type: "thermometer",
          task: "Измерь температуру и выбери правильное действие.",
          feedbackCorrect: "Верно. Это правильное действие при такой температуре.",
          feedbackWrong: "Это небезопасно. Прочитай число и подумай ещё раз."
        }
      }
    ]
  },
  {
    slug: "digital-home-economics",
    title: "Цифровая экономика быта",
    hours: "10 часов",
    lessonCount: 10,
    description: "Десять уроков о том, как цифровые инструменты помогают вести домашнее хозяйство: одежда по прогнозу, ярлык одежды, стиральная машина, дозировка средства, рецепт, таймер, сервировка, доходы и расходы семьи.",
    image: "/uzbek-images/shopping-market.jpg",
    imageAlt: "Цифровая экономика быта — одежда, питание, бюджет",
    imageCredit: "UQUVLI.UZ",
    imageSourceUrl: "",
    knowledge: [
      "Как читать цифровые ярлыки одежды и инструкции",
      "Как устроена цифровая панель стиральной машины",
      "Как ведётся цифровой семейный бюджет"
    ],
    skills: [
      "Распознавать пиктограммы ухода и значки на технике",
      "Пользоваться цифровым рецептом и таймером",
      "Заполнять цифровую форму бюджета и таблицу расходов"
    ],
    lessons: [
      {
        slug: "seasonal-clothing",
        title: "Сезонная одежда и её характеристики",
        duration: "1 час",
        summary: "Читаем прогноз на неделю и собираем комплект одежды на каждый день.",
        intro: "На экране — погода на 5–7 дней. Ребёнок смотрит температуру и осадки и собирает на каждый день подходящий комплект из гардероба. Умение «одеться по погоде» — базовое для самостоятельности.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Сезонная одежда и её характеристики»",
        goals: [
          "Понять, что такое сезонная одежда и зачем это нужно в жизни.",
          "Освоить цифровое действие — собрать комплект одежды по цифровому прогнозу на неделю.",
          "Запомнить правило безопасности: одеваться по погоде — не замёрзнуть и не перегреться."
        ],
        rules: [
          "Сначала открой прогноз на неделю.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: одеваться по погоде — не замёрзнуть и не перегреться.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Завтра −5°C, снег",
            text: "В прогнозе на завтра −5°C и снег.",
            options: [
              "Лёгкая ветровка и кеды.",
              "Тёплая куртка, шапка, варежки, тёплая обувь.",
              "Шорты и футболка."
            ],
            correctIndex: 1,
            feedback: "Верно — в мороз нужна тёплая одежда.",
            support: "Одеваемся по температуре."
          },
          {
            title: "Прогноз: +25°C, ясно",
            text: "Жаркий летний день.",
            options: [
              "Зимняя куртка.",
              "Дождевик.",
              "Лёгкая футболка, шорты, головной убор."
            ],
            correctIndex: 2,
            feedback: "Хорошо — в жару одеваются легко.",
            support: "В жару важно не перегреться."
          }
        ],
        quiz: [
          {
            question: "Где смотреть, как одеваться завтра?",
            options: [
              "В прогнозе погоды на телефоне.",
              "Никуда не смотреть.",
              "На небо в окно."
            ],
            correctIndex: 0
          },
          {
            question: "При +5°C и дожде нужно:",
            options: [
              "Шубу.",
              "Куртку с капюшоном или зонт.",
              "Шорты."
            ],
            correctIndex: 1
          },
          {
            question: "Зачем смотреть прогноз на несколько дней?",
            options: [
              "Чтобы запомнить картинки.",
              "Чтобы спланировать одежду на неделю.",
              "Это не нужно."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Вечером смотрите вместе прогноз на завтра. Пусть ребёнок сам предложит, что надеть.",
        tags: [
          "сезонная одежда",
          "Цифровая экономика быта",
          "Урок 9"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — собрать комплект одежды по цифровому прогнозу на неделю — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: прогноз на неделю",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: одеваться по погоде — не замёрзнуть и не перегреться",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровая экономика быта»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 8 (гигиена слуха) и урок № 2 (внешний вид))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся собрать комплект одежды по цифровому прогнозу на неделю.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «сезонная одежда»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «сезонная одежда»",
                "Показывает прогноз на неделю"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «прогнозе на неделю»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как собрать комплект одежды по цифровому прогнозу на неделю» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает прогноз на неделю",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с прогнозом на неделю; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на сезонная одежда и рассказать на следующем уроке.",
          safetyNote: "одеваться по погоде — не замёрзнуть и не перегреться"
        },
        trainer: {
          type: "seasonal-clothing",
          task: "Посмотри прогноз погоды и подбери подходящую одежду на улицу.",
          feedbackCorrect: "Верно! Эта одежда подходит к погоде.",
          feedbackWrong: "На улице будет неудобно. Подбери другую одежду."
        }
      },
      {
        slug: "silk-handwash",
        title: "Стирка изделий из шёлка вручную",
        duration: "1 час",
        summary: "Учимся читать значки ухода на ярлыке одежды — где можно стирать, а где нельзя.",
        intro: "На ярлыке — пиктограммы: тазик с водой, утюг, треугольник. Ребёнок узнаёт значки и определяет, можно ли стирать вещь в машине или только руками. Это убережёт одежду от порчи.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Стирка изделий из шёлка вручную»",
        goals: [
          "Понять, что такое стирка шёлка и зачем это нужно в жизни.",
          "Освоить цифровое действие — прочитать пиктограммы на цифровом ярлыке одежды.",
          "Запомнить правило безопасности: неправильная стирка портит одежду."
        ],
        rules: [
          "Сначала открой ярлык одежды.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: неправильная стирка портит одежду.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Значок «не стирать в машине»",
            text: "На ярлыке значок: тазик с водой и рукой.",
            options: [
              "Стирать только руками.",
              "Не стирать совсем.",
              "Стирать в машине на горячем режиме."
            ],
            correctIndex: 0,
            feedback: "Верно — рука в воде значит «ручная стирка».",
            support: "Значки на ярлыке — это инструкция для безопасной стирки."
          },
          {
            title: "Значок «перечёркнут»",
            text: "На ярлыке тазик с водой перечёркнут.",
            options: [
              "Стирать в очень горячей воде.",
              "Можно стирать как угодно.",
              "Стирать нельзя — только химчистка."
            ],
            correctIndex: 2,
            feedback: "Правильно. Перечёркнутый значок = запрет.",
            support: "Перечёркнутые значки нужно знать наизусть."
          }
        ],
        quiz: [
          {
            question: "Где найти значки ухода за одеждой?",
            options: [
              "На ярлыке внутри одежды.",
              "Только в магазине.",
              "Это не написано нигде."
            ],
            correctIndex: 0
          },
          {
            question: "Если значок перечёркнут — это значит:",
            options: [
              "Можно делать иногда.",
              "Так делать обязательно.",
              "Так делать нельзя."
            ],
            correctIndex: 2
          },
          {
            question: "Зачем читать ярлык перед стиркой?",
            options: [
              "Чтобы не испортить вещь.",
              "Чтобы потренировать чтение.",
              "Это не важно."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "Дома покажите ребёнку ярлык на одежде. Объясните 2-3 главных значка: стирка, утюг, химчистка.",
        tags: [
          "стирка шёлка",
          "Цифровая экономика быта",
          "Урок 10"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — прочитать пиктограммы на цифровом ярлыке одежды — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: ярлык одежды",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: неправильная стирка портит одежду",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровая экономика быта»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 9 (сезонная одежда))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся прочитать пиктограммы на цифровом ярлыке одежды.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «стирка шёлка»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «стирка шёлка»",
                "Показывает ярлык одежды"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «ярлыке одежды»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как прочитать пиктограммы на цифровом ярлыке одежды» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает ярлык одежды",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с ярлыком одежды; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на стирка шёлка и рассказать на следующем уроке.",
          safetyNote: "неправильная стирка портит одежду"
        },
        trainer: {
          type: "care-label",
          task: "Прочитай значки на ярлыке одежды и выбери правильный режим стирки.",
          feedbackCorrect: "Верно! Так одежда не испортится.",
          feedbackWrong: "Этот режим испортит вещь. Посмотри ещё раз на ярлык."
        }
      },
      {
        slug: "washing-machine-panel",
        title: "Виды стиральных машин и их использование",
        duration: "1 час",
        summary: "Запускаем стирку на стиральной машине: выбираем программу и нажимаем «Пуск».",
        intro: "На экране — настоящая панель стиральной машины с программами (шерсть, хлопок, синтетика). Ребёнок выбирает программу под вещь и нажимает «Пуск». Этот урок — образцовый: здесь работают все 5 компонентов цифровой грамотности.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Виды стиральных машин и их использование»",
        goals: [
          "Понять, что такое стиральная машина и зачем это нужно в жизни.",
          "Освоить цифровое действие — запустить стирку на цифровой панели стиральной машины.",
          "Запомнить правило безопасности: не открывать машину во время работы; не превышать загрузку."
        ],
        rules: [
          "Сначала открой панель стиральной машины.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: не открывать машину во время работы; не превышать загрузку.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Стираем шерстяной свитер",
            text: "Бабушкин шерстяной свитер. Какую программу выбрать?",
            options: [
              "«Шерсть» — 30°C, бережная.",
              "«Быстрая» — 60°C.",
              "«Хлопок» — 90°C, горячая."
            ],
            correctIndex: 0,
            feedback: "Верно — шерсть требует бережной стирки.",
            support: "Высокая температура портит шерсть."
          },
          {
            title: "Машина гудит после старта",
            text: "Включил машину, она шумит и дрожит.",
            options: [
              "Срочно выдернуть из розетки.",
              "Это нормально — она работает; проверим, ровно ли стоит.",
              "Открыть дверь и достать вещи."
            ],
            correctIndex: 1,
            feedback: "Хорошо — шум это работа машины.",
            support: "Машина не должна сильно прыгать — это значит белья слишком много."
          }
        ],
        quiz: [
          {
            question: "Где выбирают программу стирки?",
            options: [
              "На самой одежде.",
              "На панели машины — там значки.",
              "Это не выбирают."
            ],
            correctIndex: 1
          },
          {
            question: "Можно ли открыть дверь во время стирки?",
            options: [
              "Только в начале.",
              "Нет — пока вода внутри, дверь заблокирована.",
              "Да, в любое время."
            ],
            correctIndex: 1
          },
          {
            question: "Что значит значок «30°C»?",
            options: [
              "Стирать 30 минут.",
              "Загрузка 30 кг.",
              "Температура воды — 30 градусов."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Покажите ребёнку панель вашей стиральной машины. Объясните значки программ и температуры.",
        tags: [
          "стиральная машина",
          "Цифровая экономика быта",
          "Урок 11"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — запустить стирку на цифровой панели стиральной машины — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: панель стиральной машины",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: не открывать машину во время работы; не превышать загрузку",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровая экономика быта»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 10 (значки ухода))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся запустить стирку на цифровой панели стиральной машины.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «стиральная машина»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «стиральная машина»",
                "Показывает панель стиральной машины"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «панели стиральной машины»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как запустить стирку на цифровой панели стиральной машины» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает панель стиральной машины",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с панелью стиральной машины; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на стиральная машина и рассказать на следующем уроке.",
          safetyNote: "не открывать машину во время работы; не превышать загрузку"
        },        trainer: {
          type: "washing-machine-v2",
          task: "Загрузи бельё в машину, выбери режим и температуру, запусти стирку.",
          feedbackCorrect: "Молодец! Стирка началась.",
          feedbackWrong: "Этот режим испортит бельё. Посмотри на ярлык."
        }

      },
      {
        slug: "detergent-dosage",
        title: "Стиральные порошки и средства для стирки и их применение",
        duration: "1 час",
        summary: "Находим на упаковке порошка нужную дозировку для конкретной стирки.",
        intro: "На упаковке — таблица: сколько порошка нужно на 3 кг, на 5 кг, на 8 кг белья. Ребёнок находит свою строку и определяет количество ложек. Это типичное умение читать инструкцию-таблицу.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Стиральные порошки и средства для стирки и их применение»",
        goals: [
          "Понять, что такое стиральные средства и зачем это нужно в жизни.",
          "Освоить цифровое действие — найти нужную дозировку средства на цифровой упаковке.",
          "Запомнить правило безопасности: слишком много средства вредит и одежде, и машине."
        ],
        rules: [
          "Сначала открой упаковку стирального порошка.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: слишком много средства вредит и одежде, и машине.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Стираешь 5 кг белья",
            text: "На упаковке таблица: на 5 кг — 80 граммов.",
            options: [
              "Отмерить 80 граммов мерной ложкой.",
              "Высыпать всю пачку.",
              "Сыпать «на глаз»."
            ],
            correctIndex: 0,
            feedback: "Правильно — точная дозировка нужна.",
            support: "Слишком много порошка вредит и одежде, и машине."
          },
          {
            title: "Жидкое средство",
            text: "Используешь жидкий концентрат.",
            options: [
              "Не использовать.",
              "Отмерить колпачком — он мерный.",
              "Налить сколько хочется."
            ],
            correctIndex: 1,
            feedback: "Верно. Колпачок жидкого средства — это мерка.",
            support: "Все средства имеют дозировку — её надо соблюдать."
          }
        ],
        quiz: [
          {
            question: "Где смотреть, сколько порошка сыпать?",
            options: [
              "Угадать.",
              "Спросить у соседа.",
              "На упаковке — там таблица."
            ],
            correctIndex: 2
          },
          {
            question: "Если сыпать много порошка:",
            options: [
              "Одежда плохо прополощется и порошок осядет на ткани.",
              "Будет лучше отстирывать.",
              "Ничего не изменится."
            ],
            correctIndex: 0
          },
          {
            question: "Чем измерять порошок?",
            options: [
              "Горстью.",
              "Мерной ложкой из упаковки.",
              "Кружкой."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Покажите ребёнку упаковку порошка и таблицу дозировки. Дайте отмерить нужное количество для следующей стирки.",
        tags: [
          "стиральные средства",
          "Цифровая экономика быта",
          "Урок 12"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — найти нужную дозировку средства на цифровой упаковке — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: упаковка стирального порошка",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: слишком много средства вредит и одежде, и машине",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровая экономика быта»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 11 (стиральная машина))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся найти нужную дозировку средства на цифровой упаковке.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «стиральные средства»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «стиральные средства»",
                "Показывает упаковку стирального порошка"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «упаковке стирального порошка»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как найти нужную дозировку средства на цифровой упаковке» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает упаковку стирального порошка",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с упаковкой стирального порошка; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на стиральные средства и рассказать на следующем уроке.",
          safetyNote: "слишком много средства вредит и одежде, и машине"
        },        trainer: {
          type: "detergent-dosage",
          task: "Прочитай таблицу на бутылке порошка и отмерь правильную дозу под вес белья.",
          feedbackCorrect: "Верно! Это правильная мерка.",
          feedbackWrong: "Это не та доза. Посмотри в таблицу ещё раз."
        }

      },
      {
        slug: "healthy-dinner-menu",
        title: "Здоровый ужин для всей семьи",
        duration: "1 час",
        summary: "Собираем меню ужина из карточек блюд с цифровыми подсказками.",
        intro: "На экране — карточки блюд. У каждой подсказка: полезное, тяжёлое, сладкое. Ребёнок собирает меню ужина для семьи, выбирая подходящие блюда. Учится принимать решения по подсказкам.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Здоровый ужин для всей семьи»",
        goals: [
          "Понять, что такое здоровый ужин и зачем это нужно в жизни.",
          "Освоить цифровое действие — собрать цифровое меню ужина из карточек блюд.",
          "Запомнить правило безопасности: правильное питание — основа здоровья."
        ],
        rules: [
          "Сначала открой карточки блюд.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: правильное питание — основа здоровья.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Собираем ужин дома",
            text: "Что приготовим на ужин для семьи?",
            options: [
              "Шурпу с овощами и хлеб — лёгкий полезный ужин.",
              "Чипсы и газировку.",
              "Большой торт со сливками."
            ],
            correctIndex: 0,
            feedback: "Верно — суп с овощами и мясом на ужин полезно.",
            support: "Узбекская шурпа — традиционное лёгкое блюдо на ужин."
          },
          {
            title: "Поздно вечером хочется кушать",
            text: "Уже 22:00, хочется есть. Бабушка предлагает плов.",
            options: [
              "Конфеты и торт.",
              "Большую порцию плова с мясом.",
              "Лёгкий перекус: лепёшка с чаем, фрукт."
            ],
            correctIndex: 2,
            feedback: "Хорошо. На ночь — что-то лёгкое.",
            support: "Плов лучше есть на обед, а на ночь — лёгкое."
          }
        ],
        quiz: [
          {
            question: "Что лучше на ужин?",
            options: [
              "Только конфеты.",
              "Овощи, белок (курица, рыба, яйца) и лепёшка.",
              "Много сладкого и жирного."
            ],
            correctIndex: 1
          },
          {
            question: "Какое узбекское блюдо лёгкое и подходит на ужин?",
            options: [
              "Жирные чебуреки.",
              "Шурпа — суп с овощами и мясом.",
              "Большой торт."
            ],
            correctIndex: 1
          },
          {
            question: "Овощи на ужин — это:",
            options: [
              "Только картошка фри.",
              "Помидор, огурец, морковь, лук — свежие.",
              "Конфеты."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Соберите вместе с ребёнком меню ужина на неделю. Используйте знакомые блюда: шурпа, манты на обед, лёгкая каша или салат на ужин.",
        tags: [
          "здоровый ужин",
          "Цифровая экономика быта",
          "Урок 13"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — собрать цифровое меню ужина из карточек блюд — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: карточки блюд",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: правильное питание — основа здоровья",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровая экономика быта»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 12 (дозировка средств))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся собрать цифровое меню ужина из карточек блюд.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «здоровый ужин»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «здоровый ужин»",
                "Показывает карточки блюд"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «карточках блюд»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как собрать цифровое меню ужина из карточек блюд» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает карточки блюд",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с карточками блюд; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на здоровый ужин и рассказать на следующем уроке.",
          safetyNote: "правильное питание — основа здоровья"
        },        trainer: {
          type: "menu-builder",
          task: "Собери здоровый ужин: горячее, гарнир и напиток.",
          feedbackCorrect: "Молодец! Это сбалансированный ужин.",
          feedbackWrong: "Этот набор не подходит для ужина. Попробуй другой."
        }

      },
      {
        slug: "cutlets-recipe",
        title: "Котлеты",
        duration: "1 час",
        summary: "Читаем цифровой рецепт котлет: продукты, количество, шаги приготовления.",
        intro: "На экране — рецепт котлет. Ребёнок ищет в нём три блока: список продуктов, граммы и штуки, последовательность шагов. Это умение читать структурированный текст с числами — основа для любого рецепта.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Котлеты»",
        goals: [
          "Понять, что такое котлеты и зачем это нужно в жизни.",
          "Освоить цифровое действие — прочитать цифровой рецепт и найти продукты и количество.",
          "Запомнить правило безопасности: перед готовкой проверить срок годности продуктов."
        ],
        rules: [
          "Сначала открой цифровой рецепт.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: перед готовкой проверить срок годности продуктов.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "В рецепте «500 г фарша»",
            text: "Мама готовит котлеты на ужин. В рецепте 500 г фарша, а у тебя дома 300 г.",
            options: [
              "Заменить на 500 г картошки.",
              "Готовить из того что есть и не думать.",
              "Купить ещё 200 г в магазине или сделать порцию меньше."
            ],
            correctIndex: 2,
            feedback: "Правильно. Количество в рецепте важно.",
            support: "Если меньше фарша — будет меньше котлет."
          },
          {
            title: "Не знаешь, что такое «фарш»",
            text: "В рецепте слово «фарш» непонятное.",
            options: [
              "Использовать первое, что попалось.",
              "Пропустить.",
              "Спросить маму или бабушку — что это."
            ],
            correctIndex: 2,
            feedback: "Хорошо — лучше спросить у близких.",
            support: "Непонятные слова в рецепте лучше уточнить."
          }
        ],
        quiz: [
          {
            question: "Из чего состоит рецепт?",
            options: [
              "Только из картинки.",
              "Только из шагов.",
              "Из списка продуктов, количеств и шагов."
            ],
            correctIndex: 2
          },
          {
            question: "Что значит «500 г»?",
            options: [
              "500 граммов — это полкило.",
              "5 граммов.",
              "500 штук."
            ],
            correctIndex: 0
          },
          {
            question: "Зачем нужны шаги в рецепте?",
            options: [
              "Чтобы запутать.",
              "Чтобы знать, что делать сначала, что потом.",
              "Это просто текст."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Прочитайте вместе с ребёнком простой рецепт. Покажите, где список продуктов, где количество, где шаги.",
        tags: [
          "котлеты",
          "Цифровая экономика быта",
          "Урок 14"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — прочитать цифровой рецепт и найти продукты и количество — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: цифровой рецепт",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: перед готовкой проверить срок годности продуктов",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровая экономика быта»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 13 (меню ужина))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся прочитать цифровой рецепт и найти продукты и количество.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «котлеты»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «котлеты»",
                "Показывает цифровой рецепт"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «цифровом рецепте»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как прочитать цифровой рецепт и найти продукты и количество» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает цифровой рецепт",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с цифровым рецептом; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на котлеты и рассказать на следующем уроке.",
          safetyNote: "перед готовкой проверить срок годности продуктов"
        },        trainer: {
          type: "recipe-reader",
          task: "Прочитай рецепт котлет и выбери нужные продукты из холодильника.",
          feedbackCorrect: "Верно! Эти продукты нужны для котлет.",
          feedbackWrong: "Это лишний продукт. Посмотри в рецепт."
        }

      },
      {
        slug: "apple-pie-timer",
        title: "Приготовление яблочного пирога",
        duration: "1 час",
        summary: "Готовим пирог по шагам и пользуемся цифровым таймером.",
        intro: "Каждый шаг рецепта — отдельный экран. На этапах ожидания (тесто, выпечка) запускается цифровой таймер. Когда зазвонит — пора переходить дальше. Так осваивается умение работать с таймером в готовке.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Приготовление яблочного пирога»",
        goals: [
          "Понять, что такое яблочный пирог и зачем это нужно в жизни.",
          "Освоить цифровое действие — выполнить рецепт по шагам с цифровым таймером.",
          "Запомнить правило безопасности: горячая духовка — не открывать без взрослого."
        ],
        rules: [
          "Сначала открой пошаговый рецепт с таймером.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: горячая духовка — не открывать без взрослого.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Тесто должно постоять 30 минут",
            text: "Рецепт говорит: тесто должно полежать 30 минут.",
            options: [
              "Сразу ставить в духовку.",
              "Запустить таймер на 30 минут и заняться чем-то.",
              "Полежать самому 30 минут."
            ],
            correctIndex: 1,
            feedback: "Верно. Таймер сообщит, когда пройдёт время.",
            support: "Таймер — помощник в любом приготовлении."
          },
          {
            title: "Зазвонил таймер",
            text: "Прозвучал сигнал таймера — 30 минут прошло.",
            options: [
              "Подождать ещё час.",
              "Не реагировать.",
              "Перейти к следующему шагу рецепта."
            ],
            correctIndex: 2,
            feedback: "Правильно — сигнал значит «время вышло».",
            support: "Таймер помогает соблюдать время."
          }
        ],
        quiz: [
          {
            question: "Что такое таймер?",
            options: [
              "Часы, которые показывают только текущее время.",
              "Будильник на утро.",
              "Часы, которые отсчитывают время и звонят."
            ],
            correctIndex: 2
          },
          {
            question: "Зачем таймер в готовке?",
            options: [
              "Без него нельзя готовить.",
              "Чтобы было красиво.",
              "Чтобы не передержать или не пропустить шаг."
            ],
            correctIndex: 2
          },
          {
            question: "30 минут — это сколько секунд?",
            options: [
              "30 секунд.",
              "1800 секунд (полчаса).",
              "3000 секунд."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Приготовьте вместе с ребёнком простое блюдо с таймером (яйцо, тесто). Покажите, как ставить время.",
        tags: [
          "яблочный пирог",
          "Цифровая экономика быта",
          "Урок 15"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — выполнить рецепт по шагам с цифровым таймером — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: пошаговый рецепт с таймером",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: горячая духовка — не открывать без взрослого",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровая экономика быта»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 14 (чтение рецепта))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся выполнить рецепт по шагам с цифровым таймером.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «яблочный пирог»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «яблочный пирог»",
                "Показывает пошаговый рецепт с таймером"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «пошаговом рецепте с таймером»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как выполнить рецепт по шагам с цифровым таймером» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает пошаговый рецепт с таймером",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с пошаговым рецептом и таймером; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на яблочный пирог и рассказать на следующем уроке.",
          safetyNote: "горячая духовка — не открывать без взрослого"
        },        trainer: {
          type: "recipe-timer",
          task: "Готовь яблочный пирог по шагам. На выпечке запусти таймер.",
          feedbackCorrect: "Верно! Шаг выполнен.",
          feedbackWrong: "Ещё рано. Посмотри на шаг и таймер."
        }

      },
      {
        slug: "table-setting-scheme",
        title: "Сервировка стола к ужину",
        duration: "1 час",
        summary: "Расставляем приборы на цифровой схеме сервировки стола.",
        intro: "На схеме показано, где должны стоять тарелка, вилка, нож, ложка, стакан. Ребёнок расставляет приборы по образцу. Это работа со знаково-символическим планом — переносится на любые схемы в быту.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Сервировка стола к ужину»",
        goals: [
          "Понять, что такое сервировка и зачем это нужно в жизни.",
          "Освоить цифровое действие — расставить приборы на цифровой схеме сервировки.",
          "Запомнить правило безопасности: острые приборы (нож) брать аккуратно."
        ],
        rules: [
          "Сначала открой схему сервировки.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: острые приборы (нож) брать аккуратно.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Куда положить вилку?",
            text: "Сервируешь стол к ужину. Куда положить вилку?",
            options: [
              "Справа от тарелки.",
              "Слева от тарелки.",
              "Сверху на тарелке."
            ],
            correctIndex: 1,
            feedback: "Верно — вилка всегда слева.",
            support: "Это правило сервировки во многих странах."
          },
          {
            title: "Дастархан и пиала",
            text: "Узбекский ужин: на столе лепёшка, пиала с чаем. Куда поставить пиалу?",
            options: [
              "Сверху-справа от тарелки — удобно брать правой рукой.",
              "В центр тарелки.",
              "На пол."
            ],
            correctIndex: 0,
            feedback: "Хорошо. Пиала справа сверху.",
            support: "Дастархан — традиционный узбекский накрытый стол."
          }
        ],
        quiz: [
          {
            question: "Что главное в сервировке?",
            options: [
              "Порядок: каждый прибор на своём месте.",
              "Чем красивее — тем больше беспорядка.",
              "Не имеет значения."
            ],
            correctIndex: 0
          },
          {
            question: "Зачем салфетка на столе?",
            options: [
              "Вытирать рот и руки.",
              "Накрыть еду.",
              "Это просто украшение."
            ],
            correctIndex: 0
          },
          {
            question: "Куда нож при сервировке?",
            options: [
              "В тарелку.",
              "Слева вместе с вилкой.",
              "Справа от тарелки, лезвием к тарелке."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Поручите ребёнку накрыть дастархан — стол к семейному ужину. Похвалите за аккуратно расставленные пиалы и приборы.",
        tags: [
          "сервировка",
          "Цифровая экономика быта",
          "Урок 16"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — расставить приборы на цифровой схеме сервировки — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: схема сервировки",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: острые приборы (нож) брать аккуратно",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровая экономика быта»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 15 (таймер и пирог))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся расставить приборы на цифровой схеме сервировки.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «сервировка»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «сервировка»",
                "Показывает схему сервировки"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «схеме сервировки»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как расставить приборы на цифровой схеме сервировки» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает схему сервировки",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с схемой сервировки; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на сервировка и рассказать на следующем уроке.",
          safetyNote: "острые приборы (нож) брать аккуратно"
        },
        trainer: {
          type: "table-setting",
          task: "Расставь приборы на столе по схеме: тарелка, вилка, нож, ложка, стакан, салфетка.",
          feedbackCorrect: "Молодец! Сервировка правильная.",
          feedbackWrong: "Это не то место. Посмотри на схему ещё раз."
        }
      },
      {
        slug: "family-income",
        title: "Бюджет семьи. Источники дохода",
        duration: "1 час",
        summary: "Вводим источники дохода семьи в цифровую форму бюджета и видим итог.",
        intro: "Простая форма с полями: зарплата мамы, зарплата папы, другие доходы. Ребёнок вводит суммы — платформа сама считает итог. Это знакомство с тем, как работают онлайн-калькуляторы и формы.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Бюджет семьи. Источники дохода»",
        goals: [
          "Понять, что такое семейный бюджет и зачем это нужно в жизни.",
          "Освоить цифровое действие — ввести доходы в цифровую форму и получить итог.",
          "Запомнить правило безопасности: не делиться суммой доходов с чужими людьми в интернете."
        ],
        rules: [
          "Сначала открой форму доходов.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: не делиться суммой доходов с чужими людьми в интернете.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Что такое доход семьи?",
            text: "Папа получил зарплату 6 000 000 сум, мама — 5 000 000.",
            options: [
              "Зарплат не существует.",
              "Общий доход — 11 000 000 сум.",
              "6 000 000 — это всё."
            ],
            correctIndex: 1,
            feedback: "Правильно. Доходы складываются.",
            support: "Доход семьи — это все деньги, которые она получает."
          },
          {
            title: "Бабушка получила пенсию",
            text: "Бабушка получила пенсию 2 000 000 сум.",
            options: [
              "Пенсия не считается.",
              "Пенсия — тоже доход семьи, добавляется к общему.",
              "Это только бабушкины деньги, к семье отношения не имеет."
            ],
            correctIndex: 1,
            feedback: "Верно. Пенсия — часть семейного дохода.",
            support: "Любые регулярные деньги в семью — доход."
          }
        ],
        quiz: [
          {
            question: "Что входит в доходы семьи?",
            options: [
              "Только зарплата папы.",
              "Только подарки.",
              "Зарплаты, пенсии, пособия, другие поступления."
            ],
            correctIndex: 2
          },
          {
            question: "Зачем считать общий доход?",
            options: [
              "Чтобы понять, на что хватит денег в месяц.",
              "Это не нужно.",
              "Чтобы похвастаться."
            ],
            correctIndex: 0
          },
          {
            question: "Цифровая форма дохода — это:",
            options: [
              "Бумажный конверт.",
              "Поля на экране, куда вводят суммы.",
              "Картинка."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Расскажите ребёнку (без точных цифр), что доход семьи — это все деньги. Покажите принцип сложения.",
        tags: [
          "семейный бюджет",
          "Цифровая экономика быта",
          "Урок 17"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — ввести доходы в цифровую форму и получить итог — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: форма доходов",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: не делиться суммой доходов с чужими людьми в интернете",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровая экономика быта»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 16 (сервировка))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся ввести доходы в цифровую форму и получить итог.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «семейный бюджет»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «семейный бюджет»",
                "Показывает форму доходов"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «форме доходов»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как ввести доходы в цифровую форму и получить итог» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает форму доходов",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с формой доходов; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на семейный бюджет и рассказать на следующем уроке.",
          safetyNote: "не делиться суммой доходов с чужими людьми в интернете"
        },
        trainer: {
          type: "family-income",
          task: "Сложи все доходы семьи и узнай общий доход за месяц.",
          feedbackCorrect: "Верно! Это правильная сумма.",
          feedbackWrong: "Это не та сумма. Посчитай ещё раз."
        }
      },
      {
        slug: "family-expenses",
        title: "Расходы семьи",
        duration: "1 час",
        summary: "Заполняем таблицу расходов и сравниваем их с доходом.",
        intro: "Таблица: еда, коммунальные, транспорт, одежда. Ребёнок заносит суммы расходов и видит, уложилась ли семья в бюджет. Так формируется представление о домашнем планировании.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Расходы семьи»",
        goals: [
          "Понять, что такое расходы и зачем это нужно в жизни.",
          "Освоить цифровое действие — заполнить цифровую таблицу расходов и сравнить с доходом.",
          "Запомнить правило безопасности: тратить меньше, чем получено — иначе будет долг."
        ],
        rules: [
          "Сначала открой таблицу расходов.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: тратить меньше, чем получено — иначе будет долг.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Доход 11, потратили 12",
            text: "Семья получила 11 000 000 сум, а потратила 12 000 000.",
            options: [
              "Всё хорошо, это норма.",
              "Можно потратить ещё больше.",
              "Не уложились в бюджет — надо урезать расходы."
            ],
            correctIndex: 2,
            feedback: "Правильно. Расход больше дохода — это проблема.",
            support: "Уметь укладываться в бюджет — основа экономии."
          },
          {
            title: "Лишние деньги в месяце",
            text: "В этом месяце получили 11, потратили 9 миллионов.",
            options: [
              "Срочно потратить всё.",
              "Можно отложить 2 миллиона на будущее.",
              "Спрятать и забыть."
            ],
            correctIndex: 1,
            feedback: "Верно. Лишние деньги — это сбережения.",
            support: "Откладывать — полезная привычка."
          }
        ],
        quiz: [
          {
            question: "Что такое расходы семьи?",
            options: [
              "Только продукты.",
              "Все деньги, которые семья тратит.",
              "Только подарки."
            ],
            correctIndex: 1
          },
          {
            question: "Зачем заполнять таблицу расходов?",
            options: [
              "Чтобы похвастаться.",
              "Это просто тренировка.",
              "Чтобы видеть, на что уходят деньги."
            ],
            correctIndex: 2
          },
          {
            question: "Как сравнить доход и расход?",
            options: [
              "Никак.",
              "Доход минус расход = остаток.",
              "Доход плюс расход."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Покажите ребёнку упрощённый семейный бюджет (без сумм). Объясните: тратим не больше, чем получаем.",
        tags: [
          "расходы",
          "Цифровая экономика быта",
          "Урок 18"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — заполнить цифровую таблицу расходов и сравнить с доходом — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: таблица расходов",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: тратить меньше, чем получено — иначе будет долг",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровая экономика быта»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 17 (доходы))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся заполнить цифровую таблицу расходов и сравнить с доходом.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «расходы»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «расходы»",
                "Показывает таблицу расходов"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «таблице расходов»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как заполнить цифровую таблицу расходов и сравнить с доходом» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает таблицу расходов",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с таблицей расходов; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на расходы и рассказать на следующем уроке.",
          safetyNote: "тратить меньше, чем получено — иначе будет долг"
        },
        trainer: {
          type: "family-expenses",
          task: "Раздели покупки по категориям: еда, транспорт, коммуналка, развлечения.",
          feedbackCorrect: "Молодец! Покупка отнесена правильно.",
          feedbackWrong: "Эта покупка из другой категории. Подумай ещё раз."
        }
      }
    ]
  },
  {
    slug: "digital-transport",
    title: "Цифровой транспорт",
    hours: "3 часа",
    lessonCount: 3,
    description: "Три урока: цифровой справочник видов транспорта, чтение вокзального табло и многошаговый сценарий онлайн-покупки билета.",
    image: "/uzbek-images/shopping-market.jpg",
    imageAlt: "Цифровой транспорт — справочник, табло, билеты",
    imageCredit: "UQUVLI.UZ",
    imageSourceUrl: "",
    knowledge: [
      "Какие бывают виды транспорта",
      "Как устроено цифровое табло вокзала",
      "Из каких шагов состоит онлайн-покупка билета"
    ],
    skills: [
      "Искать информацию в цифровом справочнике",
      "Читать цифровое табло и находить нужный поезд",
      "Проходить многошаговую онлайн-покупку"
    ],
    lessons: [
      {
        slug: "transport-types",
        title: "Виды транспорта",
        duration: "1 час",
        summary: "Ищем нужный вид транспорта в цифровом справочнике и читаем информационную карточку.",
        intro: "Справочник видов транспорта: автобус, поезд, метро, такси, самолёт. Ребёнок ищет нужный пункт и читает короткую карточку. Это умение пользоваться поиском в справочниках и приложениях.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Виды транспорта»",
        goals: [
          "Понять, что такое виды транспорта и зачем это нужно в жизни.",
          "Освоить цифровое действие — найти вид транспорта в цифровом справочнике.",
          "Запомнить правило безопасности: правила безопасности в каждом виде транспорта."
        ],
        rules: [
          "Сначала открой справочник транспорта.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: правила безопасности в каждом виде транспорта.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Нужно ехать в другой город",
            text: "Ехать из Ташкента в Самарканд. Какой транспорт?",
            options: [
              "Поезд или автобус — это междугородний транспорт.",
              "Самокат.",
              "Велосипед."
            ],
            correctIndex: 0,
            feedback: "Верно — поездом и автобусом ездят между городами.",
            support: "В справочнике видно, какой транспорт куда ходит."
          },
          {
            title: "Куда нужно ехать в школу?",
            text: "Школа в 5 километрах от дома.",
            options: [
              "Поезд.",
              "Самолёт.",
              "Автобус, маршрутка или такси."
            ],
            correctIndex: 2,
            feedback: "Правильно — в городе ездят автобусом.",
            support: "Городской транспорт — для коротких поездок."
          }
        ],
        quiz: [
          {
            question: "Какой транспорт есть в городе?",
            options: [
              "Только самолёт.",
              "Только поезд.",
              "Автобус, такси, метро, маршрутка."
            ],
            correctIndex: 2
          },
          {
            question: "Зачем нужен справочник транспорта?",
            options: [
              "Чтобы найти подходящий маршрут.",
              "Чтобы учить наизусть.",
              "Без него ничего нельзя."
            ],
            correctIndex: 0
          },
          {
            question: "Если ехать далеко (в другую страну):",
            options: [
              "Маршрутка.",
              "Самолёт или поезд дальнего следования.",
              "Велосипед."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Расскажите ребёнку, какой транспорт вы обычно используете. Покажите, как найти автобус по приложению.",
        tags: [
          "виды транспорта",
          "Цифровой транспорт",
          "Урок 19"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — найти вид транспорта в цифровом справочнике — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: справочник транспорта",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: правила безопасности в каждом виде транспорта",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровой транспорт»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 18 (таблица расходов))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся найти вид транспорта в цифровом справочнике.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «виды транспорта»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «виды транспорта»",
                "Показывает справочник транспорта"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «справочнике транспорта»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как найти вид транспорта в цифровом справочнике» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает справочник транспорта",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с справочником транспорта; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на виды транспорта и рассказать на следующем уроке.",
          safetyNote: "правила безопасности в каждом виде транспорта"
        },
        trainer: {
          type: "transport-types",
          task: "Куда нужно поехать? Выбери подходящий транспорт.",
          feedbackCorrect: "Верно! Этот транспорт подходит.",
          feedbackWrong: "Этот транспорт не подойдёт. Подумай о расстоянии."
        }
      },
      {
        slug: "train-schedule-board",
        title: "Справочная служба ж/д вокзала, расписание поездов",
        duration: "1 час",
        summary: "Читаем цифровое табло вокзала и находим нужный поезд, время и платформу.",
        intro: "Имитация настоящего вокзального табло. Ребёнок ищет в списке поезд по направлению и времени и определяет платформу. Табло на вокзале — это цифровой объект, с которым обязательно сталкиваются в жизни.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Справочная служба ж/д вокзала, расписание поездов»",
        goals: [
          "Понять, что такое табло вокзала и зачем это нужно в жизни.",
          "Освоить цифровое действие — прочитать цифровое табло расписания поездов.",
          "Запомнить правило безопасности: переходить пути только по разрешённым местам."
        ],
        rules: [
          "Сначала открой табло вокзала.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: переходить пути только по разрешённым местам.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "На табло много поездов",
            text: "Тебе нужен поезд в Самарканд на 14:30. Как найти?",
            options: [
              "Уйти с вокзала.",
              "Прочитать каждую строку, найти «Самарканд» и «14:30».",
              "Сесть на первый попавшийся."
            ],
            correctIndex: 1,
            feedback: "Правильно — нужный поезд по направлению и времени.",
            support: "На табло слева — поезд, время, платформа."
          },
          {
            title: "Платформа в табло — 3",
            text: "В строке твоего поезда написано «Платформа 3».",
            options: [
              "Идти к платформе 1.",
              "Идти к платформе номер 3.",
              "Сесть где попало."
            ],
            correctIndex: 1,
            feedback: "Верно. Платформа — это место, откуда отправляется поезд.",
            support: "Платформа на табло — это указание, куда идти."
          }
        ],
        quiz: [
          {
            question: "Что показано на табло?",
            options: [
              "Номер поезда, направление, время и платформа.",
              "Только время.",
              "Только цена."
            ],
            correctIndex: 0
          },
          {
            question: "Если не успеваешь к своему времени:",
            options: [
              "Уйти с вокзала.",
              "Идти к справочной службе.",
              "Сесть на любой поезд."
            ],
            correctIndex: 1
          },
          {
            question: "Сколько платформ обычно на вокзале?",
            options: [
              "Несколько — нужно искать свою.",
              "Сто.",
              "Всегда одна."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "Когда будете на вокзале — покажите ребёнку, как читать табло. Найдите вместе нужный поезд.",
        tags: [
          "табло вокзала",
          "Цифровой транспорт",
          "Урок 20"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — прочитать цифровое табло расписания поездов — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: табло вокзала",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: переходить пути только по разрешённым местам",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровой транспорт»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 19 (виды транспорта))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся прочитать цифровое табло расписания поездов.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «табло вокзала»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «табло вокзала»",
                "Показывает табло вокзала"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «табло вокзала»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как прочитать цифровое табло расписания поездов» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает табло вокзала",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с табло вокзала; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на табло вокзала и рассказать на следующем уроке.",
          safetyNote: "переходить пути только по разрешённым местам"
        },
        trainer: {
          type: "schedule-board",
          task: "Найди свой поезд на табло вокзала по городу и времени.",
          feedbackCorrect: "Верно! Это твой поезд.",
          feedbackWrong: "Это не твой поезд. Посмотри на город и время."
        }
      },
      {
        slug: "online-ticket-purchase",
        title: "Порядок приобретения билетов и их возврата",
        duration: "1 час",
        summary: "Покупаем билет онлайн: выбираем направление, дату, место и подтверждаем покупку.",
        intro: "Многошаговый сценарий покупки билета: выбор маршрута, даты, места, оплата. Ребёнок проходит все этапы под наблюдением учителя. Это самостоятельное и значимое цифровое умение — купить билет.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Порядок приобретения билетов и их возврата»",
        goals: [
          "Понять, что такое покупка билета и зачем это нужно в жизни.",
          "Освоить цифровое действие — купить билет онлайн (безопасный учебный сценарий).",
          "Запомнить правило безопасности: проверять сайт; не вводить данные на чужих устройствах."
        ],
        rules: [
          "Сначала открой сервис покупки билетов.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: проверять сайт; не вводить данные на чужих устройствах.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Подтвердить покупку",
            text: "На экране: «Купить билет за 120 000 сум?»",
            options: [
              "Нажать «Подтвердить» не глядя.",
              "Проверить направление и дату, потом подтвердить.",
              "Закрыть страницу."
            ],
            correctIndex: 1,
            feedback: "Правильно. Перед оплатой — всегда проверка.",
            support: "Невнимательность приводит к ошибочным покупкам."
          },
          {
            title: "Не открывается сайт",
            text: "Сайт продажи билетов не работает.",
            options: [
              "Бросить идею ехать.",
              "Купить на подозрительном сайте.",
              "Зайти позже или пойти в кассу."
            ],
            correctIndex: 2,
            feedback: "Хорошо — лучше касса, чем подозрительный сайт.",
            support: "Никогда не покупать на сомнительных сайтах."
          }
        ],
        quiz: [
          {
            question: "Из каких шагов состоит онлайн-покупка билета?",
            options: [
              "Один шаг — «купить».",
              "Выбор направления → дата → место → оплата → подтверждение.",
              "Только оплата."
            ],
            correctIndex: 1
          },
          {
            question: "Перед оплатой нужно:",
            options: [
              "Перезагрузить страницу.",
              "Сразу нажать «Оплатить».",
              "Проверить направление, дату и сумму."
            ],
            correctIndex: 2
          },
          {
            question: "Если ошибся в дате:",
            options: [
              "Сделать возврат и купить заново.",
              "Молчать.",
              "Ехать в любом случае."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "При следующей поездке покажите ребёнку, как вы покупаете билет онлайн. Объясните, что проверять.",
        tags: [
          "покупка билета",
          "Цифровой транспорт",
          "Урок 21"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — купить билет онлайн (безопасный учебный сценарий) — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: сервис покупки билетов",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: проверять сайт; не вводить данные на чужих устройствах",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровой транспорт»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 20 (табло))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся купить билет онлайн (безопасный учебный сценарий).",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «покупка билета»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «покупка билета»",
                "Показывает сервис покупки билетов"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «сервисе покупки билетов»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как купить билет онлайн (безопасный учебный сценарий)» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает сервис покупки билетов",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с сервисом покупки билетов; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на покупка билета и рассказать на следующем уроке.",
          safetyNote: "проверять сайт; не вводить данные на чужих устройствах"
        },        trainer: {
          type: "ticket-purchase",
          task: "Купи билет онлайн: выбери маршрут, дату, место и оплати.",
          feedbackCorrect: "Молодец! Билет куплен.",
          feedbackWrong: "Это не тот шаг. Попробуй снова."
        }

      }
    ]
  },
  {
    slug: "digital-communication",
    title: "Цифровая коммуникация",
    hours: "3 часа",
    lessonCount: 3,
    description: "Три урока: отслеживание посылки по трек-номеру, работа с телефоном (звонок и SMS) и ключевой урок исследования — отправка сообщения в мессенджере.",
    image: "/uzbek-images/shopping-market.jpg",
    imageAlt: "Цифровая коммуникация — посылки, телефон, мессенджер",
    imageCredit: "UQUVLI.UZ",
    imageSourceUrl: "",
    knowledge: [
      "Что такое трек-номер и как он работает",
      "Как пользоваться телефоном — звонок и SMS",
      "Что такое мессенджер и как отправить сообщение"
    ],
    skills: [
      "Вводить данные и читать статус посылки",
      "Совершать звонок и отправлять SMS",
      "Выбирать контакт и отправлять сообщение в мессенджере"
    ],
    lessons: [
      {
        slug: "package-tracking",
        title: "Почтовые отправления: письма, посылки, денежные переводы",
        duration: "1 час",
        summary: "Отслеживаем посылку по трек-номеру и узнаём, где она сейчас.",
        intro: "На странице отслеживания нужно ввести номер посылки. После проверки появляются статусы: отправлена, в пути, доставлена. Современная семья получает посылки регулярно — это нужно уметь.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Почтовые отправления: письма, посылки, денежные переводы»",
        goals: [
          "Понять, что такое посылки и зачем это нужно в жизни.",
          "Освоить цифровое действие — отследить посылку по трек-номеру.",
          "Запомнить правило безопасности: забирать посылку только в проверенных местах; беречь трек-номер."
        ],
        rules: [
          "Сначала открой страницу отслеживания.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: забирать посылку только в проверенных местах; беречь трек-номер.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Где найти трек-номер?",
            text: "Мама заказала посылку и попросила отследить.",
            options: [
              "В сообщении или чеке от магазина — там номер.",
              "Спросить у соседа.",
              "Угадать наугад."
            ],
            correctIndex: 0,
            feedback: "Правильно. Трек-номер всегда сообщает магазин.",
            support: "Без трек-номера отследить нельзя."
          },
          {
            title: "Статус «доставлена», но посылки нет",
            text: "На сайте написано «доставлена», а посылку не получили.",
            options: [
              "Подождать ещё месяц.",
              "Позвонить в службу доставки и узнать, куда отдали.",
              "Забыть."
            ],
            correctIndex: 1,
            feedback: "Верно. Сразу выяснить — где посылка.",
            support: "Иногда «доставлена» означает, что отдали соседу."
          }
        ],
        quiz: [
          {
            question: "Что такое трек-номер?",
            options: [
              "Номер квартиры.",
              "Уникальный номер посылки для отслеживания.",
              "Номер машины."
            ],
            correctIndex: 1
          },
          {
            question: "Какие бывают статусы посылки?",
            options: [
              "Никаких статусов нет.",
              "Отправлена → в пути → доставлена.",
              "Только «отправлена»."
            ],
            correctIndex: 1
          },
          {
            question: "Если посылка долго в пути:",
            options: [
              "Позвонить в службу доставки и узнать причину.",
              "Ничего не делать.",
              "Заказать новую."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "Когда получите следующую посылку — покажите ребёнку, как отследить её по номеру.",
        tags: [
          "посылки",
          "Цифровая коммуникация",
          "Урок 22"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — отследить посылку по трек-номеру — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: страница отслеживания",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: забирать посылку только в проверенных местах; беречь трек-номер",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровая коммуникация»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 21 (покупка билета))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся отследить посылку по трек-номеру.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «посылки»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «посылки»",
                "Показывает страницу отслеживания"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «странице отслеживания»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как отследить посылку по трек-номеру» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает страницу отслеживания",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с страницей отслеживания; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на посылки и рассказать на следующем уроке.",
          safetyNote: "забирать посылку только в проверенных местах; беречь трек-номер"
        },        trainer: {
          type: "package-tracking",
          task: "Введи трек-номер и узнай, где сейчас твоя посылка.",
          feedbackCorrect: "Верно! Это правильный статус.",
          feedbackWrong: "Это не тот статус. Посмотри в список посылок."
        }

      },
      {
        slug: "phone-calls-sms",
        title: "Правила использования современных средств связи",
        duration: "1 час",
        summary: "Учимся пользоваться телефоном: звонок, SMS, список контактов.",
        intro: "На экране — телефон. Ребёнок выбирает контакт, совершает звонок или отправляет короткое сообщение. Также учится номеру 103 — на случай вызова скорой помощи.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Правила использования современных средств связи»",
        goals: [
          "Понять, что такое звонок и SMS и зачем это нужно в жизни.",
          "Освоить цифровое действие — совершить звонок и отправить sms на телефоне.",
          "Запомнить правило безопасности: не отвечать на звонки с незнакомых номеров; знать 103 и 112."
        ],
        rules: [
          "Сначала открой телефон с контактами.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: не отвечать на звонки с незнакомых номеров; знать 103 и 112.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Кто-то поранился",
            text: "На улице человек сильно поранился, нужна срочная помощь.",
            options: [
              "Написать SMS другу.",
              "Молчать.",
              "Позвонить по номеру 103 — скорая."
            ],
            correctIndex: 2,
            feedback: "Правильно. 103 — скорая помощь.",
            support: "Также 112 — единый экстренный номер."
          },
          {
            title: "Незнакомый номер звонит",
            text: "Звонит номер, которого нет в контактах.",
            options: [
              "Можно не отвечать; если важно — перезвонят родители.",
              "Обязательно ответить.",
              "Дать незнакомцу свой адрес."
            ],
            correctIndex: 0,
            feedback: "Хорошо. Незнакомым отвечать не обязательно.",
            support: "Мошенники часто звонят с чужих номеров."
          }
        ],
        quiz: [
          {
            question: "Какой номер у скорой помощи?",
            options: [
              "Никакого.",
              "01.",
              "103."
            ],
            correctIndex: 2
          },
          {
            question: "SMS — это:",
            options: [
              "Фотография.",
              "Звонок.",
              "Короткое текстовое сообщение."
            ],
            correctIndex: 2
          },
          {
            question: "Что в списке контактов?",
            options: [
              "Только мой номер.",
              "Все номера в мире.",
              "Имена и номера знакомых."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Запишите в телефон ребёнка номера: мамы, папы, скорой (103), полиции (102). Проверьте, что он их узнаёт.",
        tags: [
          "звонок и SMS",
          "Цифровая коммуникация",
          "Урок 23"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — совершить звонок и отправить sms на телефоне — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: телефон с контактами",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: не отвечать на звонки с незнакомых номеров; знать 103 и 112",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровая коммуникация»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 22 (трек-номер))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся совершить звонок и отправить sms на телефоне.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «звонок и SMS»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «звонок и SMS»",
                "Показывает телефон с контактами"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «телефоне с контактами»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как совершить звонок и отправить sms на телефоне» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает телефон с контактами",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с телефоном с контактами; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на звонок и SMS и рассказать на следующем уроке.",
          safetyNote: "не отвечать на звонки с незнакомых номеров; знать 103 и 112"
        },        trainer: {
          type: "phone-call-flow",
          task: "Сделай правильное действие с телефонным звонком.",
          feedbackCorrect: "Верно!",
          feedbackWrong: "Это небезопасно. Попробуй другое действие."
        }

      },
      {
        slug: "messenger-message",
        title: "Интернет-сайты и приложения (email, Telegram, WhatsApp)",
        duration: "1 час",
        summary: "Отправляем сообщение в мессенджере: выбираем контакт и пишем вежливо.",
        intro: "На экране — чат в мессенджере, как Telegram или WhatsApp. Ребёнок выбирает, что ответить маме или учителю, и отправляет сообщение. Это ключевое умение исследования — переписка в мессенджере как современная форма общения.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Интернет-сайты и приложения (email, Telegram, WhatsApp)»",
        goals: [
          "Понять, что такое мессенджеры и зачем это нужно в жизни.",
          "Освоить цифровое действие — отправить сообщение в мессенджере.",
          "Запомнить правило безопасности: не общаться с незнакомцами; не отправлять личные данные."
        ],
        rules: [
          "Сначала открой мессенджер.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: не общаться с незнакомцами; не отправлять личные данные.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Мама написала «Ты где?»",
            text: "Мама прислала сообщение «Ты где?».",
            options: [
              "Ответить вежливо: «Привет, мама! Я в школе, всё хорошо».",
              "Написать «отстань».",
              "Не отвечать."
            ],
            correctIndex: 0,
            feedback: "Хорошо. Вежливый ответ — основа общения.",
            support: "Маме всегда нужно отвечать на сообщения."
          },
          {
            title: "Незнакомец пишет в чат",
            text: "Пишет человек, которого ты не знаешь.",
            options: [
              "Не отвечать и показать сообщение взрослому.",
              "Сразу ответить и подружиться.",
              "Дать свой адрес."
            ],
            correctIndex: 0,
            feedback: "Верно. Незнакомцам в сети не отвечаем.",
            support: "Это правило безопасности в интернете."
          }
        ],
        quiz: [
          {
            question: "Что такое мессенджер?",
            options: [
              "Приложение для обмена сообщениями.",
              "Игра.",
              "Калькулятор."
            ],
            correctIndex: 0
          },
          {
            question: "Как начать сообщение маме?",
            options: [
              "Без приветствия.",
              "«Привет, мама!» или просто «Мам».",
              "Большими буквами «КРИК»."
            ],
            correctIndex: 1
          },
          {
            question: "Если незнакомец просит фото:",
            options: [
              "Отправить сразу.",
              "Спросить, зачем нужно.",
              "Не отправлять, рассказать взрослому."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Договоритесь с ребёнком: с незнакомцами в сети не общаемся. Любое подозрительное сообщение — показываем взрослому.",
        tags: [
          "мессенджеры",
          "Цифровая коммуникация",
          "Урок 24"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — отправить сообщение в мессенджере — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: мессенджер",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: не общаться с незнакомцами; не отправлять личные данные",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровая коммуникация»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 23 (звонок и SMS))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся отправить сообщение в мессенджере.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «мессенджеры»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «мессенджеры»",
                "Показывает мессенджер"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «мессенджере»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как отправить сообщение в мессенджере» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает мессенджер",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с мессенджером; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на мессенджеры и рассказать на следующем уроке.",
          safetyNote: "не общаться с незнакомцами; не отправлять личные данные"
        },        trainer: {
          type: "messenger-flow",
          task: "Прочитай сообщение и выбери правильный ответ.",
          feedbackCorrect: "Верно! Это хороший ответ.",
          feedbackWrong: "Этот ответ не подходит. Подумай ещё раз."
        }

      }
    ]
  },
  {
    slug: "digital-safety",
    title: "Цифровая безопасность",
    hours: "1 час",
    lessonCount: 1,
    description: "Урок, целенаправленно формирующий безопасностный компонент ФЦГ — этикет и безопасность в Интернете.",
    image: "/uzbek-images/shopping-market.jpg",
    imageAlt: "Цифровая безопасность — поведение в Интернете",
    imageCredit: "UQUVLI.UZ",
    imageSourceUrl: "",
    knowledge: [
      "Что такое личные данные и почему их нельзя раскрывать",
      "Как отличить безопасную ситуацию от опасной",
      "Что делать, если общение в сети стало неприятным"
    ],
    skills: [
      "Распознавать опасные цифровые ситуации",
      "Выбирать безопасное поведение",
      "Обращаться за помощью к взрослому"
    ],
    lessons: [
      {
        slug: "internet-safety-etiquette",
        title: "Правила поведения и этикет общения в Интернете",
        duration: "1 час",
        summary: "Учимся отличать безопасные ситуации в интернете от опасных и правильно реагировать.",
        intro: "На экране — карточки с ситуациями: незнакомец просит адрес, друг зовёт играть, кто-то прислал странную ссылку. Ребёнок выбирает безопасное поведение в каждой ситуации. Это защитный навык для жизни в сети.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Правила поведения и этикет общения в Интернете»",
        goals: [
          "Понять, что такое безопасность в сети и зачем это нужно в жизни.",
          "Освоить цифровое действие — отличить безопасные и опасные цифровые ситуации.",
          "Запомнить правило безопасности: не открывать ссылки от незнакомцев; не пересылать чужие фото."
        ],
        rules: [
          "Сначала открой карточки ситуаций.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: не открывать ссылки от незнакомцев; не пересылать чужие фото.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "«Пришли свой адрес — выслю подарок»",
            text: "Незнакомец в чате обещает прислать подарок за домашний адрес.",
            options: [
              "Отправить адрес — ведь обещают подарок.",
              "Спросить, что за подарок.",
              "Закрыть чат и рассказать взрослому."
            ],
            correctIndex: 2,
            feedback: "Правильно. Подарков от незнакомцев не бывает.",
            support: "Личные данные — это всегда секрет."
          },
          {
            title: "Друг прислал ссылку",
            text: "Друг прислал «Смотри, классная игра» с подозрительной ссылкой.",
            options: [
              "Переслать всему классу.",
              "Сначала спросить у друга вживую, что это.",
              "Сразу нажать."
            ],
            correctIndex: 1,
            feedback: "Хорошо. Аккаунт друга мог быть взломан.",
            support: "Подозрительные ссылки — не нажимать."
          }
        ],
        quiz: [
          {
            question: "Что такое личные данные?",
            options: [
              "Никаких личных данных.",
              "Адрес, номер телефона, имя родителей.",
              "Только имя."
            ],
            correctIndex: 1
          },
          {
            question: "Кому можно дать свой адрес?",
            options: [
              "Всем подряд.",
              "Только семье и близким — никому в сети.",
              "Незнакомцу с обещанием подарка."
            ],
            correctIndex: 1
          },
          {
            question: "Если стало неприятно в чате:",
            options: [
              "Закрыть чат и рассказать взрослому.",
              "Терпеть.",
              "Ответить грубо."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "Объясните ребёнку: в сети много мошенников. Любые «подарки», «выигрыши» — обман. Личное — никому.",
        tags: [
          "безопасность в сети",
          "Цифровая безопасность",
          "Урок 25"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — отличить безопасные и опасные цифровые ситуации — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: карточки ситуаций",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: не открывать ссылки от незнакомцев; не пересылать чужие фото",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровая безопасность»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 24 (мессенджер))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся отличить безопасные и опасные цифровые ситуации.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «безопасность в сети»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «безопасность в сети»",
                "Показывает карточки ситуаций"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «карточках ситуаций»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как отличить безопасные и опасные цифровые ситуации» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает карточки ситуаций",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с карточками ситуаций; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на безопасность в сети и рассказать на следующем уроке.",
          safetyNote: "не открывать ссылки от незнакомцев; не пересылать чужие фото"
        },        trainer: {
          type: "safety-etiquette",
          task: "Реши, какая ситуация безопасна, а какая опасна.",
          feedbackCorrect: "Верно! Так и нужно поступать.",
          feedbackWrong: "Это другая ситуация. Подумай о безопасности."
        }

      }
    ]
  },
  {
    slug: "digital-public-services",
    title: "Цифровые госуслуги",
    hours: "3 часа",
    lessonCount: 3,
    description: "Три урока: заполнение электронного заявления на портале госуслуг, безопасная работа с банкоматом и защитой PIN-кода, критическое чтение цифрового кредитного договора.",
    image: "/uzbek-images/shopping-market.jpg",
    imageAlt: "Цифровые госуслуги — портал, банкомат, договор",
    imageCredit: "UQUVLI.UZ",
    imageSourceUrl: "",
    knowledge: [
      "Что такое портал госуслуг и зачем он нужен",
      "Как устроен банкомат и зачем нужен PIN-код",
      "Что такое кредит и почему важно читать договор"
    ],
    skills: [
      "Заполнять электронную форму заявления",
      "Снимать деньги в банкомате, защищая PIN-код",
      "Читать цифровой договор и находить ключевые условия"
    ],
    lessons: [
      {
        slug: "public-appeals-portal",
        title: "Правила обращения граждан в государственные органы",
        duration: "1 час",
        summary: "Подаём электронное заявление на портале госуслуг по шагам.",
        intro: "Портал государственных услуг: ребёнок выбирает услугу (например, справку о составе семьи) и заполняет электронную форму. Так знакомится с порталом, где сегодня решается большинство дел с государством.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Правила обращения граждан в государственные органы»",
        goals: [
          "Понять, что такое госуслуги и зачем это нужно в жизни.",
          "Освоить цифровое действие — заполнить электронное заявление на портале госуслуг.",
          "Запомнить правило безопасности: не вводить личные данные на подозрительных сайтах."
        ],
        rules: [
          "Сначала открой портал госуслуг.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: не вводить личные данные на подозрительных сайтах.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Нужна справка о составе семьи",
            text: "Маме нужна справка о составе семьи.",
            options: [
              "Спросить у соседа.",
              "Можно подать заявление онлайн через портал госуслуг.",
              "Только идти в очередь."
            ],
            correctIndex: 1,
            feedback: "Правильно. Портал — это удобно и быстро.",
            support: "Многие документы получают через интернет."
          },
          {
            title: "Не заполнил все поля анкеты",
            text: "Заполнил половину анкеты и нажал «Отправить».",
            options: [
              "Закрыть страницу.",
              "Заявление улетит без половины данных.",
              "Появится сообщение — что заполнить ещё. Заполнить и отправить заново."
            ],
            correctIndex: 2,
            feedback: "Верно. Портал проверяет, всё ли заполнено.",
            support: "Незаполненные поля обычно подсвечиваются."
          }
        ],
        quiz: [
          {
            question: "Что такое портал госуслуг?",
            options: [
              "Социальная сеть.",
              "Сайт государства для получения услуг онлайн.",
              "Развлекательное приложение."
            ],
            correctIndex: 1
          },
          {
            question: "Что заполняют в электронном заявлении?",
            options: [
              "Только имя.",
              "ФИО, дату рождения, адрес и другие данные.",
              "Ничего."
            ],
            correctIndex: 1
          },
          {
            question: "Зачем подтверждение от госорганов?",
            options: [
              "Чтобы запутать.",
              "Это не нужно.",
              "Чтобы знать, что заявление принято."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Покажите ребёнку портал my.gov.uz. Объясните, что это официальный сайт государства — там получают документы.",
        tags: [
          "госуслуги",
          "Цифровые госуслуги",
          "Урок 27"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — заполнить электронное заявление на портале госуслуг — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: портал госуслуг",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: не вводить личные данные на подозрительных сайтах",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровые госуслуги»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 26 (термометр))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся заполнить электронное заявление на портале госуслуг.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «госуслуги»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «госуслуги»",
                "Показывает портал госуслуг"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «портале госуслуг»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как заполнить электронное заявление на портале госуслуг» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает портал госуслуг",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с порталом госуслуг; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на госуслуги и рассказать на следующем уроке.",
          safetyNote: "не вводить личные данные на подозрительных сайтах"
        },        trainer: {
          type: "mygov-portal",
          task: "Подай заявление на портале my.gov: выбери услугу, заполни форму, подтверди SMS.",
          feedbackCorrect: "Молодец! Заявление принято.",
          feedbackWrong: "Это не тот шаг. Попробуй ещё раз."
        }

      },
      {
        slug: "atm-cash-withdrawal",
        title: "Сбербанк. Основные функции банка",
        duration: "1 час",
        summary: "Снимаем деньги в банкомате: вставляем карту, вводим PIN-код, выбираем сумму, забираем карту и деньги.",
        intro: "На экране — банкомат. Ребёнок проходит все пять шагов снятия денег и обязательно учится прикрывать клавиатуру рукой при вводе PIN-кода. Это безопасная тренировка для реальной операции, с которой выпускнику предстоит столкнуться самостоятельно.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Сбербанк. Основные функции банка»",
        goals: [
          "Понять, что такое банкомат и зачем это нужно в жизни.",
          "Освоить цифровое действие — снять деньги в банкомате.",
          "Запомнить правило безопасности: PIN никому не говорить; прикрывать рукой при вводе."
        ],
        rules: [
          "Сначала открой банкомат.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: PIN никому не говорить; прикрывать рукой при вводе.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Сосед просит показать PIN",
            text: "Стоишь у банкомата. Незнакомец рядом просит «Помоги ввести код».",
            options: [
              "Назвать ему свой PIN.",
              "Показать карту.",
              "Отказаться и прикрыть клавиатуру рукой."
            ],
            correctIndex: 2,
            feedback: "Правильно. PIN — это секрет, который знаешь только ты.",
            support: "Мошенники часто притворяются «помощниками» у банкомата."
          },
          {
            title: "Забыл забрать карту",
            text: "Снял деньги и пошёл, забыл карту в банкомате.",
            options: [
              "Срочно вернуться и забрать; если уже забрали — позвонить в банк.",
              "Купить новую карту.",
              "Ничего страшного, не возвращаться."
            ],
            correctIndex: 0,
            feedback: "Верно. Карту нужно сразу забирать.",
            support: "Без карты деньги уйдут к тому, кто её найдёт."
          }
        ],
        quiz: [
          {
            question: "Что такое PIN-код?",
            options: [
              "Секретный код из 4 цифр от карты.",
              "Номер карты.",
              "Номер телефона."
            ],
            correctIndex: 0
          },
          {
            question: "Кому можно сказать PIN?",
            options: [
              "Маме и папе.",
              "Любому, кто попросит.",
              "Никому."
            ],
            correctIndex: 2
          },
          {
            question: "При вводе PIN нужно:",
            options: [
              "Показать всем.",
              "Прикрыть клавиатуру рукой.",
              "Громко произнести цифры."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Подойдите вместе с ребёнком к банкомату (без снятия). Покажите шаги: вставить карту → ввести PIN скрытно → забрать.",
        tags: [
          "банкомат",
          "Цифровые госуслуги",
          "Урок 28"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — снять деньги в банкомате — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: банкомат",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: PIN никому не говорить; прикрывать рукой при вводе",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровые госуслуги»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 27 (госуслуги))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся снять деньги в банкомате.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «банкомат»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «банкомат»",
                "Показывает банкомат"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «банкомате»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как снять деньги в банкомате» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает банкомат",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с банкоматом; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на банкомат и рассказать на следующем уроке.",
          safetyNote: "PIN никому не говорить; прикрывать рукой при вводе"
        },        trainer: {
          type: "atm",
          task: "Сними деньги в банкомате: вставь карту, введи PIN, выбери сумму.",
          feedbackCorrect: "Верно! Деньги получены.",
          feedbackWrong: "Это небезопасно. Подумай ещё раз."
        }

      },
      {
        slug: "credit-contract-reading",
        title: "Кредит. Основные виды кредитов",
        duration: "1 час",
        summary: "Читаем кредитный договор и находим в нём ключевые условия — ставку и срок.",
        intro: "Упрощённый текст договора. Ребёнок ищет три важных пункта: сумма кредита, процентная ставка, срок. Учится находить ключевую информацию в длинном документе — типичное защитное умение.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Иллюстрация к уроку «Кредит. Основные виды кредитов»",
        goals: [
          "Понять, что такое кредит и зачем это нужно в жизни.",
          "Освоить цифровое действие — прочитать цифровой договор и найти ключевые условия.",
          "Запомнить правило безопасности: не подписывать договор, не прочитав; всегда советоваться со взрослым."
        ],
        rules: [
          "Сначала открой цифровой договор.",
          "Найди ключевые места — они отмечены пиктограммой.",
          "Прими решение по правилу: не подписывать договор, не прочитав; всегда советоваться со взрослым.",
          "Если не уверен — спроси у взрослого."
        ],
        scenarios: [
          {
            title: "Банк предлагает кредит «без процентов»",
            text: "На рекламе написано «Кредит без процентов!».",
            options: [
              "Прочитать договор мелким шрифтом — там могут быть условия.",
              "Срочно брать.",
              "Поверить и отдать паспорт."
            ],
            correctIndex: 0,
            feedback: "Правильно. «Без процентов» часто хитрая реклама.",
            support: "Невыгодные условия прячут мелким шрифтом."
          },
          {
            title: "Не понимаешь договор",
            text: "В договоре много непонятных слов.",
            options: [
              "Подписать и думать потом.",
              "Подписать любой документ.",
              "Не подписывать и попросить помощи у взрослого или юриста."
            ],
            correctIndex: 2,
            feedback: "Верно. Непонятный договор — не подписываем.",
            support: "Любые подписи — только после понимания."
          }
        ],
        quiz: [
          {
            question: "Что такое кредит?",
            options: [
              "Деньги в долг от банка с процентами.",
              "Бесплатно.",
              "Подарок от банка."
            ],
            correctIndex: 0
          },
          {
            question: "Где в договоре важные условия?",
            options: [
              "Часто мелким шрифтом — нужно читать внимательно.",
              "Их нет.",
              "Только в заголовке."
            ],
            correctIndex: 0
          },
          {
            question: "Если не уверен в договоре:",
            options: [
              "Не подписывать, советоваться со взрослым.",
              "Игнорировать.",
              "Подписать любой."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "Покажите ребёнку, как выглядит настоящий договор (любой). Объясните, почему важно его читать перед подписью.",
        tags: [
          "кредит",
          "Цифровые госуслуги",
          "Урок 29"
        ],
        methodology: {
          objective: "Сформировать цифровое действие — прочитать цифровой договор и найти ключевые условия — у обучающихся 7 класса с интеллектуальными нарушениями (F70).",
          tasks: [
            "познакомить с цифровым объектом: цифровой договор",
            "сформировать пошаговый алгоритм цифрового действия",
            "закрепить правило безопасности: не подписывать договор, не прочитав; всегда советоваться со взрослым",
            "обеспечить перенос цифрового действия в бытовую ситуацию"
          ],
          materials: [
            "Платформа UQUVLI.UZ (раздел «Цифровые госуслуги»)",
            "Планшеты / ноутбуки по числу обучающихся или 1 на 2",
            "Интерактивная доска / проектор",
            "2–3 реальных предмета, связанных с темой урока (для демонстрации)"
          ],
          stages: [
            {
              duration: "5 мин",
              title: "Повторение («цифровая разминка»)",
              teacherDoes: [
                "Открывает раздел «Цифровая разминка»",
                "Предлагает 3 коротких задания (повторение опирается на урок № 28 (банкомат))"
              ],
              studentActivity: "Выполняют короткие задания с прошлого урока"
            },
            {
              duration: "3 мин",
              title: "Мотивационно-целевой этап",
              teacherSays: "Сегодня научимся прочитать цифровой договор и найти ключевые условия.",
              teacherDoes: [
                "Показывает проблемную ситуацию по теме «кредит»"
              ],
              studentActivity: "Рассматривают ситуацию; формулируют цель"
            },
            {
              duration: "10 мин",
              title: "Ориентировочная основа действия (ООД)",
              teacherDoes: [
                "Открывает информационный текст по теме «кредит»",
                "Показывает цифровой договор"
              ],
              studentActivity: "Слушают озвучку; рассматривают экран"
            },
            {
              duration: "7 мин",
              title: "Материализованное действие",
              teacherDoes: [
                "Запускает задание: найти ключевые места на «цифровом договоре»",
                "Контролирует, помогает индивидуально"
              ],
              studentActivity: "Отмечают ключевые места; получают обратную связь",
              hint: "Диагностическая точка 1"
            },
            {
              duration: "2 мин",
              title: "Физкультминутка",
              teacherDoes: [
                "Включает анимированную физкультминутку"
              ],
              studentActivity: "Повторяют простые движения"
            },
            {
              duration: "7 мин",
              title: "Громкоречевое действие",
              teacherDoes: [
                "Открывает инструктивный текст «Как прочитать цифровой договор и найти ключевые условия» — 3 шага",
                "Организует работу в парах"
              ],
              studentActivity: "Проговаривают шаги вслух; работают в парах",
              hint: "Диагностическая точка 2"
            },
            {
              duration: "7 мин",
              title: "Действие во внешней речи про себя",
              teacherDoes: [
                "Открывает цифровой договор",
                "Даёт задание выполнить действие самостоятельно"
              ],
              studentActivity: "Самостоятельно работают с цифровым договором; повторяют 3 раза",
              hint: "Диагностическая точка 3 — ключевая"
            },
            {
              duration: "5 мин",
              title: "Умственное действие. Рефлексия",
              teacherDoes: [
                "Открывает задание-сортировку",
                "Даёт устное задание-наблюдение"
              ],
              studentActivity: "Выполняют сортировку; выбирают смайлик настроения"
            }
          ],
          differentiation: "Для сильных — 4-й пример самостоятельно. Для тех, кто справляется труднее — работа в паре с педагогом и дополнительные обращения «Послушать».",
          homework: "Устное задание-наблюдение: дома обратить внимание на кредит и рассказать на следующем уроке.",
          safetyNote: "не подписывать договор, не прочитав; всегда советоваться со взрослым"
        },        trainer: {
          type: "credit-contract",
          task: "Прочитай договор кредита: найди сумму, процент, срок и общий возврат.",
          feedbackCorrect: "Молодец! Ты прочитал важные пункты.",
          feedbackWrong: "Это не тот пункт. Посмотри ещё раз."
        }

      }
    ]
  }
];

export const allLessons: ProgramLesson[] = programModules.flatMap((module) =>
  module.lessons.map((lesson) => ({
    ...lesson,
    imageCredit: lesson.imageCredit ?? module.imageCredit,
    imageSourceUrl: lesson.imageSourceUrl ?? module.imageSourceUrl,
    moduleSlug: module.slug,
    moduleTitle: module.title,
    moduleHours: module.hours,
  })),
);

export const displayLessons: ProgramLesson[] = programModules.flatMap((module) =>
  module.lessons.slice(0, module.lessonCount).map((lesson) => ({
    ...lesson,
    imageCredit: lesson.imageCredit ?? module.imageCredit,
    imageSourceUrl: lesson.imageSourceUrl ?? module.imageSourceUrl,
    moduleSlug: module.slug,
    moduleTitle: module.title,
    moduleHours: module.hours,
  })),
);

export const lessonCount = displayLessons.length;

export function getLessonBySlug(slug: string) {
  return allLessons.find((lesson) => lesson.slug === slug);
}

export const featuredLesson =
  getLessonBySlug("messenger-message") ?? displayLessons[0];

import type { Locale } from "@/lib/i18n-shared";

export const programModulesByLocale: Record<Locale, ProgramModule[]> = {
  ru: programModules,
  uz: programModules,
};

export function getProgramModules(locale: Locale): ProgramModule[] {
  return programModulesByLocale[locale];
}

export function getAllLessons(locale: Locale): ProgramLesson[] {
  return getProgramModules(locale).flatMap((module) =>
    module.lessons.map((lesson) => ({
      ...lesson,
      imageCredit: lesson.imageCredit ?? module.imageCredit,
      imageSourceUrl: lesson.imageSourceUrl ?? module.imageSourceUrl,
      moduleSlug: module.slug,
      moduleTitle: module.title,
      moduleHours: module.hours,
    })),
  );
}

export function getDisplayLessons(locale: Locale): ProgramLesson[] {
  return getProgramModules(locale).flatMap((module) =>
    module.lessons.slice(0, module.lessonCount).map((lesson) => ({
      ...lesson,
      imageCredit: lesson.imageCredit ?? module.imageCredit,
      imageSourceUrl: lesson.imageSourceUrl ?? module.imageSourceUrl,
      moduleSlug: module.slug,
      moduleTitle: module.title,
      moduleHours: module.hours,
    })),
  );
}

export function getLessonBySlugLocalized(
  slug: string,
  locale: Locale,
): ProgramLesson | undefined {
  return getAllLessons(locale).find((lesson) => lesson.slug === slug);
}

export function getFeaturedLesson(locale: Locale): ProgramLesson {
  return (
    getLessonBySlugLocalized("messenger-message", locale) ??
    getDisplayLessons(locale)[0]
  );
}

export function getPlatformHighlights(locale: Locale): string[] {
  return locale === "uz" ? platformHighlightsUz : platformHighlights;
}
