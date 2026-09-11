import {
  handleApiError,
  jsonResponse,
  requireRole,
} from "@/lib/server/api";
import { getSessionUser } from "@/lib/server/session";
import { getResearcherData } from "@/lib/server/uquvli-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    requireRole(await getSessionUser(), ["researcher"]);
    const data = await getResearcherData();
    return jsonResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}
