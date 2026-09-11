import {
  handleApiError,
  jsonResponse,
  readJsonBody,
  requireRole,
} from "@/lib/server/api";
import { getSessionUser } from "@/lib/server/session";
import { createUserByResearcher } from "@/lib/server/uquvli-store";
import type { ResearcherCreateUserInput } from "@/lib/uquvli-types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    requireRole(await getSessionUser(), ["researcher"]);
    const input = await readJsonBody<ResearcherCreateUserInput>(request);
    const user = await createUserByResearcher(input);
    return jsonResponse({ user }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
