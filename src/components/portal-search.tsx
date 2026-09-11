"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { useLocale } from "@/components/locale-provider";

export type SearchItem = {
  title: string;
  description: string;
  href: string;
  keywords: string[];
};

type PortalSearchProps = {
  items: SearchItem[];
};

const dict = {
  ru: {
    placeholder: "Поиск по урокам, темам и разделам",
    ariaLabel: "Поиск по платформе",
    findButton: "Найти",
    tryLabel: "Попробуйте: здоровье",
    hint1: "Telegram",
    hint2: "покупки",
    hint3: "первая помощь",
    nothingFound: "Ничего не найдено",
    nothingFoundHint: "Попробуйте открыть полную программу или изменить запрос.",
    typeMore: "Введите еще немного текста",
    typeMoreHint: "Поиск начинается с двух символов, чтобы интерфейс не перегружался.",
  },
  uz: {
    placeholder: "Darslar, mavzular va boʻlimlar boʻyicha qidiruv",
    ariaLabel: "Platforma boʻyicha qidiruv",
    findButton: "Topish",
    tryLabel: "Sinab koʻring: salomatlik",
    hint1: "Telegram",
    hint2: "xaridlar",
    hint3: "birinchi yordam",
    nothingFound: "Hech narsa topilmadi",
    nothingFoundHint: "Toʻliq dasturni oching yoki soʻrovni oʻzgartiring.",
    typeMore: "Yana bir oz matn kiriting",
    typeMoreHint: "Qidiruv interfeysni ortiqcha yuklamaslik uchun ikki belgidan boshlanadi.",
  },
} as const;

export function PortalSearch({ items }: PortalSearchProps) {
  const locale = useLocale();
  const t = dict[locale];
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const hasQuery = normalizedQuery.length >= 2;

  const results = useMemo(() => {
    if (normalizedQuery.length < 2) {
      return [];
    }

    return items
      .filter((item) => {
        const haystack = [
          item.title,
          item.description,
          item.keywords.join(" "),
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      })
      .slice(0, 6);
  }, [items, normalizedQuery]);

  return (
    <div className="portal-search-shell">
      <div className="portal-search">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.placeholder}
          aria-label={t.ariaLabel}
        />
        <Link
          className="button button-primary"
          href={results[0]?.href ?? "/program"}
        >
          {t.findButton}
        </Link>
      </div>

      <div className="search-hints">
        <span>{t.tryLabel}</span>
        <span>{t.hint1}</span>
        <span>{t.hint2}</span>
        <span>{t.hint3}</span>
      </div>

      {hasQuery ? (
        <div className="search-results">
          {results.length > 0 ? (
            results.map((item) => (
              <Link
                key={`${item.href}-${item.title}`}
                href={item.href}
                className="search-result"
              >
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </Link>
            ))
          ) : (
            <div className="search-result empty">
              <strong>{t.nothingFound}</strong>
              <span>{t.nothingFoundHint}</span>
            </div>
          )}
        </div>
      ) : query.trim().length > 0 ? (
        <div className="search-results">
          <div className="search-result empty">
            <strong>{t.typeMore}</strong>
            <span>{t.typeMoreHint}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
