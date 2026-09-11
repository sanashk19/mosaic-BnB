import {
  handleApiError,
  HttpError,
  jsonResponse,
  requireUser,
} from "@/lib/server/api";
import { getSessionUser } from "@/lib/server/session";
import { getClassState } from "@/lib/server/uquvli-store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const user = requireUser(await getSessionUser());
    const url = new URL(request.url);
    const requestedTeacherId =
      url.searchParams.get("teacherId")
      || (user.role === "teacher" ? user.id : user.teacherId);

    if (!requestedTeacherId) {
      throw new HttpError(400, {
        ru: "Не указан учитель.",
        uz: "Oʻqituvchi koʻrsatilmagan.",
      });
    }

    if (user.role === "teacher" && requestedTeacherId !== user.id) {
      throw new HttpError(403, {
        ru: "Учитель может управлять только своим классом.",
        uz: "Oʻqituvchi faqat oʻz sinfini boshqara oladi.",
      });
    }

    if (user.role === "student" && requestedTeacherId !== user.teacherId) {
      throw new HttpError(403, {
        ru: "Ученик может смотреть только свой класс.",
        uz: "Oʻquvchi faqat oʻz sinfini koʻra oladi.",
      });
    }

    const classState = await getClassState(requestedTeacherId);
    return jsonResponse({ classState });
  } catch (error) {
    return handleApiError(error);
  }
}
