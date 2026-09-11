import { NextResponse } from "next/server";
import { LOCALE_COOKIE, isLocale } from "@/lib/i18n-shared";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { locale?: string }
    | null;

  if (!body || !isLocale(body.locale)) {
    return NextResponse.json({ error: "invalid_locale" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true, locale: body.locale });
  response.cookies.set({
    name: LOCALE_COOKIE,
    value: body.locale,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}
