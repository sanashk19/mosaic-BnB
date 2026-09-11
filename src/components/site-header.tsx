"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { useLocale } from "@/components/locale-provider";
import { MosaicLogo } from "@/components/mosaic-logo";
import { GlobeIcon, MenuIcon } from "@/components/ui-icons";
import { isCabinetRoute } from "@/lib/is-cabinet-route";
import type { Locale } from "@/lib/i18n-shared";

type NavItem = { href: string; label: string; activePath: string };

const navStartByLocale: Record<Locale, NavItem[]> = {
  ru: [
    { href: "/", label: "Home", activePath: "/" },
    { href: "/educators", label: "For Teachers", activePath: "/educators" },
    { href: "/families", label: "For Families", activePath: "/families" },
  ],
  uz: [
    { href: "/", label: "Home", activePath: "/" },
    { href: "/educators", label: "For Teachers", activePath: "/educators" },
    { href: "/families", label: "For Families", activePath: "/families" },
  ],
};

const navEndByLocale: Record<Locale, NavItem[]> = {
  ru: [
    { href: "/about", label: "About", activePath: "/about" },
    { href: "/contacts", label: "Contact", activePath: "/contacts" },
  ],
  uz: [
    { href: "/about", label: "About", activePath: "/about" },
    { href: "/contacts", label: "Contact", activePath: "/contacts" },
  ],
};

const directionLinksByLocale: Record<
  Locale,
  Array<{ href: string; title: string; meta: string }>
> = {
  ru: [
    {
      href: "/program#diagnostic",
      title: "Diagnostic",
      meta: "2 lessons · 2 hrs",
    },
    {
      href: "/program#digital-health",
      title: "Digital Health",
      meta: "8 lessons · 8 hrs",
    },
    {
      href: "/program#digital-home-economics",
      title: "Home Economics",
      meta: "10 lessons · 10 hrs",
    },
    {
      href: "/program#digital-transport",
      title: "Digital Transport",
      meta: "3 lessons · 3 hrs",
    },
    {
      href: "/program#digital-communication",
      title: "Digital Communication",
      meta: "3 lessons · 3 hrs",
    },
    {
      href: "/program#digital-safety",
      title: "Digital Safety",
      meta: "1 lesson · 1 hr",
    },
    {
      href: "/program#digital-public-services",
      title: "Digital Public Services",
      meta: "3 lessons · 3 hrs",
    },
  ],
  uz: [
    {
      href: "/program#diagnostic",
      title: "Diagnostic",
      meta: "2 lessons · 2 hrs",
    },
    {
      href: "/program#digital-health",
      title: "Digital Health",
      meta: "8 lessons · 8 hrs",
    },
    {
      href: "/program#digital-home-economics",
      title: "Home Economics",
      meta: "10 lessons · 10 hrs",
    },
    {
      href: "/program#digital-transport",
      title: "Digital Transport",
      meta: "3 lessons · 3 hrs",
    },
    {
      href: "/program#digital-communication",
      title: "Digital Communication",
      meta: "3 lessons · 3 hrs",
    },
    {
      href: "/program#digital-safety",
      title: "Digital Safety",
      meta: "1 lesson · 1 hr",
    },
    {
      href: "/program#digital-public-services",
      title: "Digital Public Services",
      meta: "3 lessons · 3 hrs",
    },
  ],
};

const dict = {
  ru: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    program: "Program",
    programMenuLabel: "Learning Program",
    allProgram: "All Curriculum",
    allProgramSub: "Overview of lessons and tracks",
    directions: "Tracks",
    directionsSub: "Explore life-skill tracks",
    languageLabel: "Language",
    switchLanguage: "Switch language",
    cabinet: "Dashboard",
    login: "Log in",
    startLearning: "Get started",
  },
  uz: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    program: "Program",
    programMenuLabel: "Learning Program",
    allProgram: "All Curriculum",
    allProgramSub: "Overview of lessons and tracks",
    directions: "Tracks",
    directionsSub: "Explore life-skill tracks",
    languageLabel: "Language",
    switchLanguage: "Switch language",
    cabinet: "Dashboard",
    login: "Log in",
    startLearning: "Get started",
  },
} as const;

export function SiteHeader() {
  const pathname = usePathname();
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

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand"
          href="/"
          onClick={() => {
            closeMenu();
          }}
          aria-label="Mosaic Home"
        >
          <MosaicLogo size={36} />
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
            <span
              className="language-pill"
              title="Language: English"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", cursor: "default" }}
            >
              <GlobeIcon />
              <span>EN</span>
            </span>
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
