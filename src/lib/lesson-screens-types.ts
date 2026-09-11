// UI Logic
// UI Logic
// UI Logic
// UI Logic

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
  /* UI Module */
  id: string;
  /* UI Module */
  label: string;
  /* UI Module */
  x: number;
  y: number;
  width: number;
  height: number;
  /* UI Module */
  hint?: string;
};

export type InstructionStep = {
  title: string;
  body: string;
  illustration?: string;
};

export type PracticeTrial = {
  /* UI Module */
  itemName: string;
  illustration?: string;
  /* UI Module */
  caption: string;
  /* UI Module */
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

// UI Logic

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
      /* UI Module */
      correctZone: "low" | "norm" | "high";
    }
  | {
      kind: "volume-slider";
      /* UI Module */
      safeMax: number;
    }
  | {
      kind: "weather";
      temp: number;
      uv: "low" | "mid" | "high";
      icon: string;
      /* UI Module */
      correctAdvice: "hat-cream" | "hat" | "nothing";
    }
  | {
      kind: "product-label";
      productName: string;
      productEmoji: string;
      /* UI Module */
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

// UI Logic

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
      problemIllustration?: string; // UI Logic
      altItems?: [string, string]; // UI Logic
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
      /* UI Module */
      objectName: string;
      objectIllustration?: string;
      /* UI Module */
      zones: Hotspot[];
      /* UI Module */
      mockup?: PracticeMockup;
    }
  | {
      type: "mark-zones";
      title: string;
      /* UI Module */
      isDiagnostic: true;
      objectName: string;
      objectIllustration?: string;
      zones: Hotspot[];
      /* UI Module */
      tasks: string[];
      /* UI Module */
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
      /* UI Module */
      isDiagnostic: true;
      steps: InstructionStep[];
      repeatAllLabel?: string;
    }
  | {
      type: "practice";
      title: string;
      /* UI Module */
      isDiagnostic: true;
      trials: PracticeTrial[];
      taskPrompt: string;
      /* UI Module */
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

// UI Logic
// UI Logic
export type LessonScreens = LessonScreen[];
