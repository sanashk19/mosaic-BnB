import {
  handleApiError,
  jsonResponse,
  readJsonBody,
  requireRole,
} from "@/lib/server/api";
import { getSessionUser } from "@/lib/server/session";
import { updateStudentGroup } from "@/lib/server/uquvli-store";
import type { StudentGroup } from "@/lib/uquvli-types";

export const dynamic = "force-dynamic";

type UpdateStudentBody = {
  group: StudentGroup;
};

export async function PATCH(
  request: Request,
  context: { params: Promise<{ studentId: string }> },
) {
  try {
    requireRole(await getSessionUser(), ["researcher"]);
    const { studentId } = await context.params;
    const input = await readJsonBody<UpdateStudentBody>(request);
    const student = await updateStudentGroup(studentId, input.group);
    return jsonResponse({ student });
  } catch (error) {
    return handleApiError(error);
  }
}
