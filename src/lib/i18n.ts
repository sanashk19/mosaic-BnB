import "server-only";
import { cookies } from "next/headers";

export type Locale = "ru" | "uz";

export const SUPPORTED_LOCALES: Locale[] = ["ru", "uz"];
export const DEFAULT_LOCALE: Locale = "ru";
export const LOCALE_COOKIE = "locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "ru" || value === "uz";
}

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
