import {
  handleApiError,
  HttpError,
  jsonResponse,
  readJsonBody,
  requireUser,
} from "@/lib/server/api";
import { getSessionUser } from "@/lib/server/session";
import {
  getAllQuestionnaires,
  getQuestionnaire,
  submitQuestionnaire,
} from "@/lib/server/uquvli-store";
import type {
  QuestionnaireAnswer,
  QuestionnaireType,
} from "@/lib/uquvli-types";

export const dynamic = "force-dynamic";

type SubmitQuestionnaireBody = {
  userId: string;
  type: QuestionnaireType;
  answers: QuestionnaireAnswer[];
};

function parseType(value: string | null): QuestionnaireType | null {
  return value === "initial" || value === "final" ? value : null;
}

export async function GET(request: Request) {
  try {
    const user = requireUser(await getSessionUser());
    const url = new URL(request.url);
    const requestedUserId = url.searchParams.get("userId") || user.id;
    const type = parseType(url.searchParams.get("type"));

    if (user.role !== "researcher" && requestedUserId !== user.id) {
      throw new HttpError(403, {
        ru: "Можно смотреть только свои анкеты.",
        uz: "Faqat oʻz anketalaringizni koʻrishingiz mumkin.",
      });
    }

    if (user.role === "researcher" && !type && requestedUserId === "all") {
      const questionnaires = await getAllQuestionnaires();
      return jsonResponse({ questionnaires });
    }

    if (!type) {
      throw new HttpError(400, {
        ru: "Укажите тип анкеты.",
        uz: "Anketa turini koʻrsating.",
      });
    }

    const questionnaire = await getQuestionnaire(requestedUserId, type);
    return jsonResponse({ questionnaire: questionnaire ?? null });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = requireUser(await getSessionUser());
    const input = await readJsonBody<SubmitQuestionnaireBody>(request);

    if (input.userId !== user.id) {
      throw new HttpError(403, {
        ru: "Можно сохранять только свою анкету.",
        uz: "Faqat oʻz anketangizni saqlashingiz mumkin.",
      });
    }

    const questionnaire = await submitQuestionnaire(
      user.id,
      input.type,
      input.answers,
    );
    return jsonResponse({ questionnaire }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
