export type Locale = "ru" | "uz";

export const SUPPORTED_LOCALES: Locale[] = ["ru", "uz"];
export const DEFAULT_LOCALE: Locale = "ru";
export const LOCALE_COOKIE = "locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "ru" || value === "uz";
}
