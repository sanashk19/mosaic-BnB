import {
  handleApiError,
  HttpError,
  jsonResponse,
  readJsonBody,
  requireRole,
} from "@/lib/server/api";
import { getSessionUser } from "@/lib/server/session";
import {
  addStudentToClass,
  getStudentsByTeacher,
} from "@/lib/server/uquvli-store";
import type { AddStudentInput } from "@/lib/uquvli-types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const user = requireRole(await getSessionUser(), ["teacher", "researcher"]);
    const url = new URL(request.url);
    const requestedTeacherId = url.searchParams.get("teacherId") || user.id;

    if (user.role === "teacher" && requestedTeacherId !== user.id) {
      throw new HttpError(403, {
        ru: "The teacher can only watch his own class.",
        uz: "Oʻqituvchi faqat oʻz sinfini koʻra oladi.",
      });
    }

    const students = await getStudentsByTeacher(requestedTeacherId);
    return jsonResponse({ students });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = requireRole(await getSessionUser(), ["teacher"]);
    const input = await readJsonBody<AddStudentInput>(request);

    if (input.teacherId !== user.id) {
      throw new HttpError(403, {
        ru: "A teacher can only add students to his own class.",
        uz: "Oʻqituvchi oʻquvchilarni faqat oʻz sinfiga qoʻsha oladi.",
      });
    }

    const student = await addStudentToClass(input);
    return jsonResponse({ student }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
