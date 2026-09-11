import {
  handleApiError,
  jsonResponse,
  readJsonBody,
  requireUser,
} from "@/lib/server/api";
import { getSessionUser } from "@/lib/server/session";
import { completeLessonForUser } from "@/lib/server/uquvli-store";

export const dynamic = "force-dynamic";

type CompleteLessonBody = {
  lessonSlug: string;
  score?: number;
};

export async function POST(request: Request) {
  try {
    const user = requireUser(await getSessionUser());
    const input = await readJsonBody<CompleteLessonBody>(request);
    const updatedUser = await completeLessonForUser(
      user.id,
      input.lessonSlug,
      input.score,
    );
    return jsonResponse({ user: updatedUser });
  } catch (error) {
    return handleApiError(error);
  }
}
