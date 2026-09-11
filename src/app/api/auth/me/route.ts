import { handleApiError, jsonResponse } from "@/lib/server/api";
import { getSessionUser } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getSessionUser();
    return jsonResponse({ user });
  } catch (error) {
    return handleApiError(error);
  }
}
