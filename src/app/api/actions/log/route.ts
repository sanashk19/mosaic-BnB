import {
  handleApiError,
  HttpError,
  jsonResponse,
  readJsonBody,
  requireUser,
} from "@/lib/server/api";
import { getSessionUser } from "@/lib/server/session";
import { logAction } from "@/lib/server/uquvli-store";
import type { ActionType } from "@/lib/uquvli-types";

export const dynamic = "force-dynamic";

const actionTypes = new Set<ActionType>([
  "lesson_start",
  "lesson_complete",
  "step_view",
  "step_complete",
  "answer_correct",
  "answer_wrong",
  "hint_used",
]);

type LogActionBody = {
  lessonSlug: string;
  action: ActionType;
  metadata?: Record<string, unknown>;
};

export async function POST(request: Request) {
  try {
    const user = requireUser(await getSessionUser());
    const input = await readJsonBody<LogActionBody>(request);

    if (!actionTypes.has(input.action)) {
      throw new HttpError(400, {
        ru: "Некорректный тип события.",
        uz: "Hodisa turi notoʻgʻri.",
      });
    }

    const event = await logAction(user.id, input);
    return jsonResponse({ event }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
