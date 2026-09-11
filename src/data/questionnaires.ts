import type { Locale } from "@/lib/i18n-shared";
import type { QuestionnaireType } from "@/lib/uquvli-types";

export type QuestionDef = {
  id: string;
  text: string;
  low: string;
  high: string;
};

const englishQuestions: Record<QuestionnaireType, QuestionDef[]> = {
  initial: [
    { id: "q1", text: "The child independently holds a phone or tablet", low: "No", high: "Yes, always" },
    { id: "q2", text: "The child knows how to tap buttons on the screen", low: "Does not know", high: "Easily" },
    { id: "q3", text: "The child understands what a phone is used for", low: "Does not understand", high: "Understands" },
    { id: "q4", text: "The child can ask for help if something does not work", low: "No", high: "Yes" },
    { id: "q5", text: "The child remains calm when something does not work out", low: "Gets anxious", high: "Calm" },
  ],
  final: [
    { id: "q1", text: "The child has become more confident using a phone/tablet", low: "No change", high: "Significantly better" },
    { id: "q2", text: "The child can perform a simple action: make a call, write a message", low: "Cannot perform", high: "Can do independently" },
    { id: "q3", text: "The child understands the purpose of digital services", low: "Does not understand", high: "Understands" },
    { id: "q4", text: "The child asks for less assistance when working with applications", low: "No change", high: "Noticeably less" },
    { id: "q5", text: "The child transfers skills from lessons into daily life", low: "No", high: "Yes, noticeably" },
  ],
};

export const questionnaireQuestionsByLocale: Record<
  Locale,
  Record<QuestionnaireType, QuestionDef[]>
> = { ru: englishQuestions, uz: englishQuestions };

export function getQuestionnaireQuestions(
  _locale?: Locale,
): Record<QuestionnaireType, QuestionDef[]> {
  void _locale;
  return englishQuestions;
}

// Legacy export for back-compat
export const questionnaireQuestions = englishQuestions;
