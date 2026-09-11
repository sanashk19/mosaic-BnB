import { handleApiError, jsonResponse, readJsonBody } from "@/lib/server/api";
import { setSessionUser } from "@/lib/server/session";
import { loginUser } from "@/lib/server/uquvli-store";
import type { LoginInput } from "@/lib/uquvli-types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const input = await readJsonBody<LoginInput>(request);
    const user = await loginUser(input);
    await setSessionUser(user.id);
    return jsonResponse({ user });
  } catch (error) {
    return handleApiError(error);
  }
}
