import { cookies } from "next/headers";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/lib/i18n-shared";
import type { CurrentUser, UserRole } from "@/lib/uquvli-types";

export type ErrorMessage = { ru: string; uz: string };

export class HttpError extends Error {
  status: number;
  messages: ErrorMessage;

  constructor(status: number, messages: ErrorMessage) {
    super(messages.ru);
    this.status = status;
    this.messages = messages;
  }
}

async function localeFromCookies(): Promise<Locale> {
  const c = await cookies();
  const v = c.get(LOCALE_COOKIE)?.value;
  return isLocale(v) ? v : DEFAULT_LOCALE;
}

export function jsonResponse<T>(body: T, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function readJsonBody<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    throw new HttpError(400, {
      ru: "Некорректный JSON в запросе.",
      uz: "Soʻrovdagi JSON formatida xatolik.",
    });
  }
}

export async function handleApiError(error: unknown) {
  if (error instanceof HttpError) {
    const locale = await localeFromCookies();
    return jsonResponse({ error: error.messages[locale] }, error.status);
  }

  console.error(error);
  const locale = await localeFromCookies();
  return jsonResponse(
    {
      error:
        locale === "uz"
          ? "Server ichki xatosi."
          : "Внутренняя ошибка сервера.",
    },
    500,
  );
}

export function requireUser(user: CurrentUser | null): CurrentUser {
  if (!user) {
    throw new HttpError(401, {
      ru: "Сначала войдите в кабинет.",
      uz: "Avval kabinetga kiring.",
    });
  }

  return user;
}

export function requireRole(user: CurrentUser | null, roles: UserRole[]) {
  const currentUser = requireUser(user);

  if (!roles.includes(currentUser.role)) {
    throw new HttpError(403, {
      ru: "Недостаточно прав для этого действия.",
      uz: "Bu amal uchun ruxsat yetarli emas.",
    });
  }

  return currentUser;
}
