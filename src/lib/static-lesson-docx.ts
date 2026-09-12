export type StaticLessonDocxInfo = {
  publicFile: string;
  downloadName: string;
};

export const staticLessonDocxBySlug = {
  "diagnostic-entry": {
    publicFile: "diagnostic-entry.docx",
    downloadName: "Lesson_01_Personal hygiene for teenagers_PhD.docx",
  },
  "appearance-young-people": {
    publicFile: "appearance-young-people.docx",
    downloadName: "Lesson_02_Appearance of young people_PhD.docx",
  },
  "hair-types-care": {
    publicFile: "hair-types-care.docx",
    downloadName: "Lesson_03_Main hair types, characteristics and care features_PhD.docx",
  },
  "skin-types-care": {
    publicFile: "skin-types-care.docx",
    downloadName: "Lesson_04_Types of facial skin and features of care for them_PhD.docx",
  },
  "sun-exposure-skin": {
    publicFile: "sun-exposure-skin.docx",
    downloadName: "Lesson_05_The effect of the sun on the skin_PhD.docx",
  },
  "cosmetics-basics": {
    publicFile: "cosmetics-basics.docx",
    downloadName: "Lesson_06_Cosmetics_PhD.docx",
  },
  "skincare-checklist": {
    publicFile: "skincare-checklist.docx",
    downloadName: "Lesson_07_Using skin care cosmetics_PhD.docx",
  },
  "ear-hygiene-volume": {
    publicFile: "ear-hygiene-volume.docx",
    downloadName: "Lesson_08_Hearing Hygiene_PhD.docx",
  },
  "seasonal-clothing": {
    publicFile: "seasonal-clothing.docx",
    downloadName: "Lesson_09_Seasonal clothing and its characteristics_PhD.docx",
  },
  "silk-handwash": {
    publicFile: "silk-handwash.docx",
    downloadName: "Lesson_10_Washing silk items by hand_PhD.docx",
  },
  "washing-machine-panel": {
    publicFile: "washing-machine-panel.docx",
    downloadName: "Lesson_11_Types of washing machines and their use_PhD.docx",
  },
  "detergent-dosage": {
    publicFile: "detergent-dosage.docx",
    downloadName: "Lesson_12_Washing powders and detergents and their use_PhD.docx",
  },
  "healthy-dinner-menu": {
    publicFile: "healthy-dinner-menu.docx",
    downloadName: "Lesson_13_Healthy dinner for the whole family_PhD.docx",
  },
  "cutlets-recipe": {
    publicFile: "cutlets-recipe.docx",
    downloadName: "Lesson_14_Cutlets_PhD.docx",
  },
  "apple-pie-timer": {
    publicFile: "apple-pie-timer.docx",
    downloadName: "Lesson_15_Cooking apple pie_PhD.docx",
  },
  "table-setting-scheme": {
    publicFile: "table-setting-scheme.docx",
    downloadName: "Lesson_16_Setting the table for dinner_PhD.docx",
  },
  "family-income": {
    publicFile: "family-income.docx",
    downloadName: "Lesson_17_Family budget. Sources of income_PhD.docx",
  },
  "family-expenses": {
    publicFile: "family-expenses.docx",
    downloadName: "Lesson_18_Family expenses_PhD.docx",
  },
  "transport-types": {
    publicFile: "transport-types.docx",
    downloadName: "Lesson_19_Types of transport_PhD.docx",
  },
  "train-schedule-board": {
    publicFile: "train-schedule-board.docx",
    downloadName: "Lesson_20_Help service of the railway station, train schedule_PhD.docx",
  },
  "online-ticket-purchase": {
    publicFile: "online-ticket-purchase.docx",
    downloadName: "Lesson_21_Procedure for purchasing tickets and returning them_PhD.docx",
  },
  "package-tracking": {
    publicFile: "package-tracking.docx",
    downloadName: "Lesson_22_Postal letters, parcels, money orders_PhD.docx",
  },
  "phone-calls-sms": {
    publicFile: "phone-calls-sms.docx",
    downloadName: "Lesson_23_Rules for using modern means of communication_PhD.docx",
  },
  "messenger-message": {
    publicFile: "messenger-message.docx",
    downloadName: "Lesson_24_Internet sites and applications (email, Telegram, WhatsApp)_PhD.docx",
  },
  "internet-safety-etiquette": {
    publicFile: "internet-safety-etiquette.docx",
    downloadName: "Lesson_25_Rules of behavior and etiquette for communicating on the Internet_PhD.docx",
  },
  "digital-thermometer": {
    publicFile: "digital-thermometer.docx",
    downloadName: "Lesson_26_Types of thermometers. Rules for measuring body temperature_PhD.docx",
  },
  "public-appeals-portal": {
    publicFile: "public-appeals-portal.docx",
    downloadName: "Lesson_27_Rules for citizens to apply to government agencies_PhD.docx",
  },
  "atm-cash-withdrawal": {
    publicFile: "atm-cash-withdrawal.docx",
    downloadName: "Lesson_28_Sberbank. Main functions of the bank_PhD.docx",
  },
  "credit-contract-reading": {
    publicFile: "credit-contract-reading.docx",
    downloadName: "Lesson_29_Credit. Main types of loans_PhD.docx",
  },
  "diagnostic-final": {
    publicFile: "diagnostic-final.docx",
    downloadName: "Lesson_32_Rules and techniques for keeping the body clean and healthy_PhD.docx",
  },
} as const satisfies Record<string, StaticLessonDocxInfo>;

export function getStaticLessonDocxInfo(
  slug: string,
): StaticLessonDocxInfo | undefined {
  return staticLessonDocxBySlug[slug as keyof typeof staticLessonDocxBySlug];
}
