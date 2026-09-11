import { handleApiError, jsonResponse, readJsonBody } from "@/lib/server/api";
import { setSessionUser } from "@/lib/server/session";
import { registerUser } from "@/lib/server/uquvli-store";
import type { RegisterInput } from "@/lib/uquvli-types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const input = await readJsonBody<RegisterInput>(request);
    const user = await registerUser(input);
    await setSessionUser(user.id);
    return jsonResponse({ user });
  } catch (error) {
    return handleApiError(error);
  }
}
