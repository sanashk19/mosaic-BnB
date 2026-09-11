import {
  handleApiError,
  HttpError,
  jsonResponse,
  readJsonBody,
  requireRole,
} from "@/lib/server/api";
import { getSessionUser } from "@/lib/server/session";
import { openLessonForClass } from "@/lib/server/uquvli-store";

export const dynamic = "force-dynamic";

type OpenClassStateBody = {
  teacherId: string;
  lessonSlug: string;
};

export async function POST(request: Request) {
  try {
    const user = requireRole(await getSessionUser(), ["teacher"]);
    const input = await readJsonBody<OpenClassStateBody>(request);

    if (input.teacherId !== user.id) {
      throw new HttpError(403, {
        ru: "Учитель может управлять только своим классом.",
        uz: "Oʻqituvchi faqat oʻz sinfini boshqara oladi.",
      });
    }

    const classState = await openLessonForClass(user.id, input.lessonSlug);
    return jsonResponse({ classState });
  } catch (error) {
    return handleApiError(error);
  }
}
