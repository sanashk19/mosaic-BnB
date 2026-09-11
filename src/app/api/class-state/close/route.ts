import {
  handleApiError,
  HttpError,
  jsonResponse,
  readJsonBody,
  requireRole,
} from "@/lib/server/api";
import { getSessionUser } from "@/lib/server/session";
import { closeLessonForClass } from "@/lib/server/uquvli-store";

export const dynamic = "force-dynamic";

type CloseClassStateBody = {
  teacherId: string;
};

export async function POST(request: Request) {
  try {
    const user = requireRole(await getSessionUser(), ["teacher"]);
    const input = await readJsonBody<CloseClassStateBody>(request);

    if (input.teacherId !== user.id) {
      throw new HttpError(403, {
        ru: "The teacher can only manage his own class.",
        uz: "Oʻqituvchi faqat oʻz sinfini boshqara oladi.",
      });
    }

    const classState = await closeLessonForClass(user.id);
    return jsonResponse({ classState });
  } catch (error) {
    return handleApiError(error);
  }
}
