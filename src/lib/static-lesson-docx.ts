export type StaticLessonDocxInfo = {
  publicFile: string;
  downloadName: string;
};

export const staticLessonDocxBySlug = {
  "diagnostic-entry": {
    publicFile: "diagnostic-entry.docx",
    downloadName: "Урок_01_Личная гигиена подростков_PhD.docx",
  },
  "appearance-young-people": {
    publicFile: "appearance-young-people.docx",
    downloadName: "Урок_02_Внешний вид молодых людей_PhD.docx",
  },
  "hair-types-care": {
    publicFile: "hair-types-care.docx",
    downloadName: "Урок_03_Основные типы волос характеристики и особенности ухода_PhD.docx",
  },
  "skin-types-care": {
    publicFile: "skin-types-care.docx",
    downloadName: "Урок_04_Типы кожи лица и особенности ухода за ними_PhD.docx",
  },
  "sun-exposure-skin": {
    publicFile: "sun-exposure-skin.docx",
    downloadName: "Урок_05_Влияние солнца на кожу_PhD.docx",
  },
  "cosmetics-basics": {
    publicFile: "cosmetics-basics.docx",
    downloadName: "Урок_06_Косметические_средства_PhD.docx",
  },
  "skincare-checklist": {
    publicFile: "skincare-checklist.docx",
    downloadName: "Урок_07_Использование косметических средств по уходу за кожей_PhD.docx",
  },
  "ear-hygiene-volume": {
    publicFile: "ear-hygiene-volume.docx",
    downloadName: "Урок_08_Гигиена слуха_PhD.docx",
  },
  "seasonal-clothing": {
    publicFile: "seasonal-clothing.docx",
    downloadName: "Урок_09_Сезонная одежда и её характеристики_PhD.docx",
  },
  "silk-handwash": {
    publicFile: "silk-handwash.docx",
    downloadName: "Урок_10_Стирка изделий из шёлка вручную_PhD.docx",
  },
  "washing-machine-panel": {
    publicFile: "washing-machine-panel.docx",
    downloadName: "Урок_11_Виды стиральных машин и их использование_PhD.docx",
  },
  "detergent-dosage": {
    publicFile: "detergent-dosage.docx",
    downloadName: "Урок_12_Стиральные порошки и средства для стирки и их применение_PhD.docx",
  },
  "healthy-dinner-menu": {
    publicFile: "healthy-dinner-menu.docx",
    downloadName: "Урок_13_Здоровый ужин для всей семьи_PhD.docx",
  },
  "cutlets-recipe": {
    publicFile: "cutlets-recipe.docx",
    downloadName: "Урок_14_Котлеты_PhD.docx",
  },
  "apple-pie-timer": {
    publicFile: "apple-pie-timer.docx",
    downloadName: "Урок_15_Приготовление яблочного пирога_PhD.docx",
  },
  "table-setting-scheme": {
    publicFile: "table-setting-scheme.docx",
    downloadName: "Урок_16_Сервировка стола к ужину_PhD.docx",
  },
  "family-income": {
    publicFile: "family-income.docx",
    downloadName: "Урок_17_Бюджет семьи. Источники дохода_PhD.docx",
  },
  "family-expenses": {
    publicFile: "family-expenses.docx",
    downloadName: "Урок_18_Расходы семьи_PhD.docx",
  },
  "transport-types": {
    publicFile: "transport-types.docx",
    downloadName: "Урок_19_Виды транспорта_PhD.docx",
  },
  "train-schedule-board": {
    publicFile: "train-schedule-board.docx",
    downloadName: "Урок_20_Справочная служба ж-д вокзала, расписание поездов_PhD.docx",
  },
  "online-ticket-purchase": {
    publicFile: "online-ticket-purchase.docx",
    downloadName: "Урок_21_Порядок приобретения билетов и их возврата_PhD.docx",
  },
  "package-tracking": {
    publicFile: "package-tracking.docx",
    downloadName: "Урок_22_Почтовые отправления письма, посылки, денежные переводы_PhD.docx",
  },
  "phone-calls-sms": {
    publicFile: "phone-calls-sms.docx",
    downloadName: "Урок_23_Правила использования современных средств связи_PhD.docx",
  },
  "messenger-message": {
    publicFile: "messenger-message.docx",
    downloadName: "Урок_24_Интернет-сайты и приложения (email, Telegram, WhatsApp)_PhD.docx",
  },
  "internet-safety-etiquette": {
    publicFile: "internet-safety-etiquette.docx",
    downloadName: "Урок_25_Правила поведения и этикет общения в Интернете_PhD.docx",
  },
  "digital-thermometer": {
    publicFile: "digital-thermometer.docx",
    downloadName: "Урок_26_Виды термометров. Правила измерения температуры тела_PhD.docx",
  },
  "public-appeals-portal": {
    publicFile: "public-appeals-portal.docx",
    downloadName: "Урок_27_Правила обращения граждан в государственные органы_PhD.docx",
  },
  "atm-cash-withdrawal": {
    publicFile: "atm-cash-withdrawal.docx",
    downloadName: "Урок_28_Сбербанк. Основные функции банка_PhD.docx",
  },
  "credit-contract-reading": {
    publicFile: "credit-contract-reading.docx",
    downloadName: "Урок_29_Кредит. Основные виды кредитов_PhD.docx",
  },
  "diagnostic-final": {
    publicFile: "diagnostic-final.docx",
    downloadName: "Урок_32_Правила и приёмы сохранения чистоты и здоровья тела_PhD.docx",
  },
} as const satisfies Record<string, StaticLessonDocxInfo>;

export function getStaticLessonDocxInfo(
  slug: string,
): StaticLessonDocxInfo | undefined {
  return staticLessonDocxBySlug[slug as keyof typeof staticLessonDocxBySlug];
}
