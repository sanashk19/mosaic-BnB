// Типы данных для интерактивного «10-экранного» проигрывателя урока (LessonPlayer).
// Каждый из 30 одобренных уроков определяется массивом LessonScreen[] длиной 10.
// Структура соответствует PhD-карте Урок_06 — этап повторения + 6 этапов
// формирования цифрового действия по П.Я. Гальперину + физкультминутка.

export type WarmupQuestion = {
  text: string;
  options: string[];
  correctIndex: number;
  feedback?: string;
};

export type InfoCard = {
  title: string;
  body: string;
  illustration?: string; // emoji / unicode / svg-id
};

export type Hotspot = {
  /** Уникальный ключ зоны */
  id: string;
  /** Что искать */
  label: string;
  /** Координаты на «макете объекта» в процентах (0..100) */
  x: number;
  y: number;
  width: number;
  height: number;
  /** Подсказка-озвучка */
  hint?: string;
};

export type InstructionStep = {
  title: string;
  body: string;
  illustration?: string;
};

export type PracticeTrial = {
  /** Картинка/название объекта */
  itemName: string;
  illustration?: string;
  /** Что показано на «этикетке/экране» объекта в данной попытке */
  caption: string;
  /** Варианты решения; первый с correct=true — правильный */
  options: Array<{
    text: string;
    correct: boolean;
    feedback: string;
  }>;
};

export type SortItem = {
  text: string;
  illustration?: string;
  bin: "good" | "bad";
};

export type Mood = { emoji: string; label: string };

// ── Визуальные мокапы устройств для экрана практики ───────────────────────

export type PracticeMockup =
  | {
      kind: "washing-machine";
      itemLabel: string;
      itemEmoji: string;
      hint: string;
      programs: Array<{ id: string; label: string; temp: number; spin: string; correct?: boolean }>;
    }
  | {
      kind: "atm";
      amount: string;
      pin?: string;
    }
  | {
      kind: "thermometer";
      value: number;
      /** Какой ответ считается верным */
      correctZone: "low" | "norm" | "high";
    }
  | {
      kind: "volume-slider";
      /** Максимально безопасный уровень громкости */
      safeMax: number;
    }
  | {
      kind: "weather";
      temp: number;
      uv: "low" | "mid" | "high";
      icon: string;
      /** Какой ответ верный */
      correctAdvice: "hat-cream" | "hat" | "nothing";
    }
  | {
      kind: "product-label";
      productName: string;
      productEmoji: string;
      /** null → срок не указан (тоже «нельзя») */
      expiryYear: number | null;
      currentYear?: number;
    }
  | {
      kind: "messenger";
      contact: string;
      incoming: string;
      options: Array<{ text: string; correct: boolean; feedback: string }>;
    }
  | {
      kind: "train-board";
      targetTrain: string;
      targetTime: string;
      correctIndex: number;
      rows: Array<{ train: string; from: string; to: string; time: string; platform: string }>;
    }
  | {
      kind: "package-tracking";
      trackNumber: string;
      expectedStatus: string;
    }
  | {
      kind: "skin-quiz";
      questions: Array<{ text: string; options: string[]; correctOption: string }>;
      correctType: string;
    }
  | {
      kind: "checklist";
      title: string;
      steps: string[];
    }
  | {
      kind: "menu";
      task: string;
      dishes: Array<{ name: string; emoji: string; category: "good" | "bad"; note: string }>;
    }
  | {
      kind: "recipe";
      recipeName: string;
      emoji: string;
      ingredients: Array<{ name: string; amount: string; highlight?: boolean }>;
      question: string;
      options: Array<{ text: string; correct: boolean }>;
    }
  | {
      kind: "budget-form";
      mode: "income" | "expense";
      fields: Array<{ label: string; placeholder: string; expectedValue: number }>;
      expectedTotal: number;
      comparisonValue?: number;
    }
  | {
      kind: "gov-portal";
      serviceName: string;
      fields: Array<{ label: string; type: "text" | "select"; options?: string[]; expected?: string }>;
      expectedValues: Record<string, string>;
    }
  | {
      kind: "contract";
      contract: Array<{ text: string; important: boolean; correctTarget?: boolean }>;
      question: string;
    }
  | {
      kind: "transport-directory";
      task: string;
      items: Array<{ slug: string; emoji: string; name: string; subtitle: string }>;
      correctSlug: string;
    }
  | {
      kind: "wardrobe";
      occasion: string;
      items: Array<{ id: string; emoji: string; name: string; suitable: boolean }>;
    }
  | {
      kind: "table-setting";
    }
  | {
      kind: "shampoo-store";
      task: string;
      items: Array<{ id: string; emoji: string; name: string; tag: string; price: string }>;
      correctId: string;
    }
  | {
      kind: "weekly-weather";
      days: Array<{ name: string; icon: string; temp: number }>;
      taskDayIdx: number;
      options: Array<{ emoji: string; name: string; suitable: boolean }>;
    }
  | {
      kind: "care-label";
      fabric: string;
      symbols: Array<{ icon: string; meaning: string; allowed: boolean }>;
      question: string;
      options: Array<{ text: string; correct: boolean }>;
    }
  | {
      kind: "detergent-box";
      loadKg: number;
      table: Array<{ kg: string; grams: number; scoops: string }>;
      options: Array<{ text: string; correct: boolean }>;
    }
  | {
      kind: "oven-timer";
      recipeStep: string;
      recipeMinutes: number;
    }
  | {
      kind: "ticket-booking";
    }
  | {
      kind: "phone-call";
      task: string;
      correctNumber: string;
      contacts: Array<{ name: string; number: string; avatar: string }>;
    }
  | {
      kind: "safety-cards";
      situations: Array<{ icon: string; text: string; danger: boolean; explanation: string }>;
    }
  | {
      kind: "diagnostic";
      mode: "entry" | "final";
    }
  | {
      kind: "hygiene-shelf";
      mode: "morning" | "all-hygiene";
    };

// ── Один из 10 экранов урока ──────────────────────────────────────────────

export type LessonScreen =
  | {
      type: "warmup";
      title: string;
      prevLessonTitle: string;
      questions: WarmupQuestion[];
    }
  | {
      type: "motivation";
      title: string;
      problemText: string;
      problemIllustration?: string; // emoji/иконка темы
      altItems?: [string, string]; // два сравниваемых объекта в проблеме (по умолчанию)
      hint: string;
      goalText: string;
    }
  | {
      type: "info-cards";
      title: string;
      cards: InfoCard[];
    }
  | {
      type: "object-explorer";
      title: string;
      /** Название объекта (этикетка, табло, экран...) */
      objectName: string;
      objectIllustration?: string;
      /** Зоны объекта с описанием — щелчок подсвечивает зону */
      zones: Hotspot[];
      /** Если задан — рендерим реальный мокап устройства вместо эмодзи */
      mockup?: PracticeMockup;
    }
  | {
      type: "mark-zones";
      title: string;
      /** Диагностическая точка 1 */
      isDiagnostic: true;
      objectName: string;
      objectIllustration?: string;
      zones: Hotspot[];
      /** Задание под каждый шаг */
      tasks: string[];
      /** Реальный мокап устройства, если есть */
      mockup?: PracticeMockup;
    }
  | {
      type: "break";
      title: string;
      themeText: string;
      durationSec: number;
    }
  | {
      type: "instruction";
      title: string;
      /** Диагностическая точка 2 */
      isDiagnostic: true;
      steps: InstructionStep[];
      repeatAllLabel?: string;
    }
  | {
      type: "practice";
      title: string;
      /** Диагностическая точка 3 — ключевая */
      isDiagnostic: true;
      trials: PracticeTrial[];
      taskPrompt: string;
      /** Какой визуальный мокап устройства использовать. Если не задан —
       *  показываются простые текстовые карточки (см. PracticeScreen). */
      mockup?: PracticeMockup;
    }
  | {
      type: "reflection";
      title: string;
      summaryPhrase: string;
      sortItems: SortItem[];
      sortBinGood: string;
      sortBinBad: string;
      moodOptions: Mood[];
      homeTask: string;
    };

// Полный массив 10-экранного урока. Длина обычно 10; диагностические уроки
// (№ 1 и № 32) могут переопределять — у них немного другая последовательность.
export type LessonScreens = LessonScreen[];
