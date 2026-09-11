"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { useLocale } from "@/components/locale-provider";
import { NationalEmblem } from "@/components/national-emblem";
import { GlobeIcon, MenuIcon } from "@/components/ui-icons";
import { isCabinetRoute } from "@/lib/is-cabinet-route";
import type { Locale } from "@/lib/i18n-shared";

type NavItem = { href: string; label: string; activePath: string };

const navStartByLocale: Record<Locale, NavItem[]> = {
  ru: [{ href: "/", label: "Главная", activePath: "/" }],
  uz: [{ href: "/", label: "Bosh sahifa", activePath: "/" }],
};

const navEndByLocale: Record<Locale, NavItem[]> = {
  ru: [
    { href: "/educators", label: "Для школ", activePath: "/educators" },
    { href: "/families", label: "Для родителей", activePath: "/families" },
    { href: "/about", label: "Возможности", activePath: "/about" },
    { href: "/contacts", label: "Контакты", activePath: "/contacts" },
  ],
  uz: [
    { href: "/educators", label: "Maktablar uchun", activePath: "/educators" },
    { href: "/families", label: "Ota-onalar uchun", activePath: "/families" },
    { href: "/about", label: "Imkoniyatlar", activePath: "/about" },
    { href: "/contacts", label: "Aloqa", activePath: "/contacts" },
  ],
};

const directionLinksByLocale: Record<
  Locale,
  Array<{ href: string; title: string; meta: string }>
> = {
  ru: [
    {
      href: "/program#diagnostic",
      title: "Диагностика",
      meta: "2 урока · 2 часа",
    },
    {
      href: "/program#digital-health",
      title: "Цифровое здоровье",
      meta: "8 уроков · 8 часов",
    },
    {
      href: "/program#digital-home-economics",
      title: "Цифровая экономика быта",
      meta: "10 уроков · 10 часов",
    },
    {
      href: "/program#digital-transport",
      title: "Цифровой транспорт",
      meta: "3 урока · 3 часа",
    },
    {
      href: "/program#digital-communication",
      title: "Цифровая коммуникация",
      meta: "3 урока · 3 часа",
    },
    {
      href: "/program#digital-safety",
      title: "Цифровая безопасность",
      meta: "1 урок · 1 час",
    },
    {
      href: "/program#digital-public-services",
      title: "Цифровые госуслуги",
      meta: "3 урока · 3 часа",
    },
  ],
  uz: [
    {
      href: "/program#diagnostic",
      title: "Diagnostika",
      meta: "2 ta dars · 2 soat",
    },
    {
      href: "/program#digital-health",
      title: "Raqamli salomatlik",
      meta: "8 ta dars · 8 soat",
    },
    {
      href: "/program#digital-home-economics",
      title: "Raqamli uy iqtisodiyoti",
      meta: "10 ta dars · 10 soat",
    },
    {
      href: "/program#digital-transport",
      title: "Raqamli transport",
      meta: "3 ta dars · 3 soat",
    },
    {
      href: "/program#digital-communication",
      title: "Raqamli muloqot",
      meta: "3 ta dars · 3 soat",
    },
    {
      href: "/program#digital-safety",
      title: "Raqamli xavfsizlik",
      meta: "1 ta dars · 1 soat",
    },
    {
      href: "/program#digital-public-services",
      title: "Raqamli davlat xizmatlari",
      meta: "3 ta dars · 3 soat",
    },
  ],
};

const dict = {
  ru: {
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    mainNav: "Основная навигация",
    program: "Программа",
    programMenuLabel: "Программа обучения",
    allProgram: "Вся программа",
    allProgramSub: "Обзор уроков и модулей",
    directions: "Направления",
    directionsSub: "Открыть список направлений",
    languageLabel: "Язык интерфейса",
    switchLanguage: "Сменить язык",
    cabinet: "Кабинет",
    login: "Войти",
    startLearning: "Начать обучение",
  },
  uz: {
    openMenu: "Menyuni ochish",
    closeMenu: "Menyuni yopish",
    mainNav: "Asosiy navigatsiya",
    program: "Dastur",
    programMenuLabel: "Oʻquv dasturi",
    allProgram: "Butun dastur",
    allProgramSub: "Darslar va modullar roʻyxati",
    directions: "Yoʻnalishlar",
    directionsSub: "Yoʻnalishlar roʻyxatini ochish",
    languageLabel: "Interfeys tili",
    switchLanguage: "Tilni almashtirish",
    cabinet: "Kabinet",
    login: "Kirish",
    startLearning: "Oʻqishni boshlash",
  },
} as const;

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isProgramOpen, setIsProgramOpen] = useState(false);

  if (isCabinetRoute(pathname)) {
    return null;
  }

  const t = dict[locale];
  const navigationStart = navStartByLocale[locale];
  const navigationEnd = navEndByLocale[locale];
  const directionLinks = directionLinksByLocale[locale];

  const isActive = (item: NavItem) => {
    if (!item.activePath) {
      return false;
    }
    return item.activePath === "/"
      ? pathname === "/"
      : pathname === item.activePath ||
          pathname.startsWith(`${item.activePath}/`);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsProgramOpen(false);
  };

  async function switchLocale() {
    const next: Locale = locale === "ru" ? "uz" : "ru";
    try {
      await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: next }),
      });
    } catch {
      // ignore network errors; cookie just won't be set
    }
    router.refresh();
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand"
          href="/"
          onClick={() => {
            closeMenu();
          }}
        >
          <NationalEmblem className="header-emblem" />
          <span className="brand-copy">
            <strong>UQUVLI.UZ</strong>
          </span>
        </Link>

        <button
          type="button"
          className="mobile-toggle"
          onClick={() => {
            setIsOpen((value) => {
              if (value) {
                setIsProgramOpen(false);
              }
              return !value;
            });
          }}
          aria-expanded={isOpen}
          aria-controls="site-menu"
          aria-label={isOpen ? t.closeMenu : t.openMenu}
        >
          <MenuIcon open={isOpen} />
        </button>

        <div id="site-menu" className={`header-panel ${isOpen ? "open" : ""}`}>
          <nav className="main-nav" aria-label={t.mainNav}>
            {navigationStart.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                className={`nav-link ${isActive(item) ? "active" : ""}`}
                href={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}

            <div className={`nav-dropdown ${isProgramOpen ? "open" : ""}`}>
              <button
                type="button"
                className={`nav-link nav-dropdown-trigger ${pathname.startsWith("/program") ? "active" : ""}`}
                onClick={() => setIsProgramOpen((value) => !value)}
                aria-expanded={isProgramOpen}
                aria-controls="program-menu"
              >
                {t.program}
              </button>
              <div
                id="program-menu"
                className="nav-dropdown-menu"
                aria-label={t.programMenuLabel}
              >
                <Link
                  className="nav-dropdown-link nav-dropdown-link-strong"
                  href="/program"
                  onClick={closeMenu}
                >
                  {t.allProgram}
                  <span>{t.allProgramSub}</span>
                </Link>
                <Link
                  className="nav-dropdown-link nav-dropdown-link-strong"
                  href="/program#directions"
                  onClick={closeMenu}
                >
                  {t.directions}
                  <span>{t.directionsSub}</span>
                </Link>
                {directionLinks.map((item) => (
                  <Link
                    className="nav-dropdown-link"
                    href={item.href}
                    key={item.href}
                    onClick={closeMenu}
                  >
                    {item.title}
                    <span>{item.meta}</span>
                  </Link>
                ))}
              </div>
            </div>

            {navigationEnd.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                className={`nav-link ${isActive(item) ? "active" : ""}`}
                href={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="language-pill language-pill-button"
              aria-label={t.switchLanguage}
              title={t.switchLanguage}
              onClick={switchLocale}
            >
              <GlobeIcon />
              {locale === "ru" ? "RU" : "UZ"}
            </button>
            {user ? (
              <Link
                className="button button-primary small"
                href="/dashboard"
                onClick={closeMenu}
              >
                {t.cabinet}
              </Link>
            ) : (
              <>
                <Link
                  className="button button-ghost small"
                  href="/login"
                  onClick={closeMenu}
                >
                  {t.login}
                </Link>
                <Link
                  className="button button-primary small"
                  href="/register"
                  onClick={closeMenu}
                >
                  {t.startLearning}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
