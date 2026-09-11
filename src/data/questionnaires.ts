import type { Locale } from "@/lib/i18n-shared";
import type { QuestionnaireType } from "@/lib/uquvli-types";

export type QuestionDef = {
  id: string;
  text: string;
  low: string;
  high: string;
};

const ru: Record<QuestionnaireType, QuestionDef[]> = {
  initial: [
    { id: "q1", text: "Ребёнок самостоятельно держит телефон или планшет", low: "Нет", high: "Да, всегда" },
    { id: "q2", text: "Ребёнок умеет нажимать кнопки на экране", low: "Не умеет", high: "Легко" },
    { id: "q3", text: "Ребёнок понимает, зачем нужен телефон", low: "Не понимает", high: "Понимает" },
    { id: "q4", text: "Ребёнок может попросить помощи, если что-то не получается", low: "Нет", high: "Да" },
    { id: "q5", text: "Ребёнок спокойно реагирует, когда что-то не выходит", low: "Тревожится", high: "Спокоен" },
  ],
  final: [
    { id: "q1", text: "Ребёнок стал увереннее пользоваться телефоном/планшетом", low: "Нет изменений", high: "Заметно лучше" },
    { id: "q2", text: "Ребёнок может выполнить простое действие: позвонить, написать", low: "Не может", high: "Может сам" },
    { id: "q3", text: "Ребёнок понимает назначение цифровых сервисов", low: "Не понимает", high: "Понимает" },
    { id: "q4", text: "Ребёнок меньше просит помощи при работе с приложениями", low: "Без изменений", high: "Заметно меньше" },
    { id: "q5", text: "Ребёнок переносит навыки из уроков в обычную жизнь", low: "Нет", high: "Да, замечаю" },
  ],
};

const uz: Record<QuestionnaireType, QuestionDef[]> = {
  initial: [
    { id: "q1", text: "Bola telefon yoki planshetni mustaqil ushlay oladi", low: "Yoʻq", high: "Ha, doimo" },
    { id: "q2", text: "Bola ekrandagi tugmalarni bosa oladi", low: "Bilmaydi", high: "Oson bosadi" },
    { id: "q3", text: "Bola telefon nima uchun kerakligini tushunadi", low: "Tushunmaydi", high: "Tushunadi" },
    { id: "q4", text: "Bola biror narsa chiqmasa, yordam soʻray oladi", low: "Yoʻq", high: "Ha" },
    { id: "q5", text: "Bola biror narsa chiqmaganda xotirjam qoladi", low: "Hayajonlanadi", high: "Xotirjam" },
  ],
  final: [
    { id: "q1", text: "Bola telefon/planshetdan ishonchli foydalana boshladi", low: "Oʻzgarish yoʻq", high: "Sezilarli yaxshi" },
    { id: "q2", text: "Bola oddiy harakatni bajara oladi: qoʻngʻiroq qilish, xabar yozish", low: "Bajara olmaydi", high: "Oʻzi bajaradi" },
    { id: "q3", text: "Bola raqamli xizmatlarning vazifasini tushunadi", low: "Tushunmaydi", high: "Tushunadi" },
    { id: "q4", text: "Bola ilovalar bilan ishlashda kamroq yordam soʻraydi", low: "Oʻzgarishsiz", high: "Sezilarli kamroq" },
    { id: "q5", text: "Bola darslardagi koʻnikmalarni kundalik hayotga koʻchiradi", low: "Yoʻq", high: "Ha, sezayapman" },
  ],
};

export const questionnaireQuestionsByLocale: Record<
  Locale,
  Record<QuestionnaireType, QuestionDef[]>
> = { ru, uz };

export function getQuestionnaireQuestions(
  locale: Locale,
): Record<QuestionnaireType, QuestionDef[]> {
  return questionnaireQuestionsByLocale[locale];
}

// Legacy export for back-compat
export const questionnaireQuestions = ru;
