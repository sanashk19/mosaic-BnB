import { handleApiError, jsonResponse } from "@/lib/server/api";
import { clearSessionUser } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    await clearSessionUser();
    return jsonResponse({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
