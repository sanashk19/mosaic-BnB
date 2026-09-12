"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useAuth } from "@/components/auth-provider";
import { useLocale } from "@/components/locale-provider";
import { demoUserPreview } from "@/data/demo-user";
import { isCabinetRoute } from "@/lib/is-cabinet-route";
import type { Locale } from "@/lib/i18n-shared";

type CabinetNavigationItem = {
  href: string;
  label: string;
  caption?: string;
};

type CabinetNavigationGroup = {
  title: string;
  items: CabinetNavigationItem[];
};

type CabinetShellProps = {
  title: string;
  description: string;
  activeHref?: string;
  actions?: ReactNode;
  layoutVariant?: "adult-sidebar" | "student-top-nav";
  navigation?: CabinetNavigationGroup[];
  onNavigate?: (href: string) => void;
  children?: ReactNode;
};

const englishCabinetShellDict = {
  defaultNavTitle: "Dashboard",
  navToday: "Today",
  navTodayCaption: "tasks and lesson",
  navLessons: "Lessons",
  navLessonsCaption: "modules and activities",
  navProgress: "Progress",
  navProgressCaption: "learning history",
  navAccount: "Account",
  navAccountCaption: "profile and login",
  roleLabelStudent: "student",
  roleLabelParent: "parent",
  roleLabelTeacher: "teacher",
  roleLabelResearcher: "researcher",
  roleLabelUser: "user",
  roleDisplayStudent: "Student Dashboard",
  roleDisplayParent: "Parent Dashboard",
  roleDisplayTeacher: "Teacher Dashboard",
  roleDisplayResearcher: "Researcher Dashboard",
  cabinetGeneric: "Dashboard",
  modeRole: (role: string) => `${role} mode`,
  previewMode: "Dashboard Preview",
  researcher: "Researcher",
  parent: "Parent",
  accessEyebrow: "Dashboard Access",
  accessTitle: "Please sign in to continue.",
  accessText: "After signing in, the curriculum, lessons, and profile workspace will be available.",
  accessButton: "Go to sign in",
  logoutAria: "Sign out",
  logoutLabel: "Sign out",
  loadingCabinet: "Loading dashboard...",
  navAria: "Dashboard navigation",
  logoutCabinet: "Sign out of dashboard",
  login: "Sign in",
  register: "Register",
  parentOnboardingTitle: "Complete the initial questionnaire",
  parentOnboardingText: "Participation requires this brief 5-question check.",
  parentOnboardingButton: "Fill out now",
  cabinetKicker: "Learning Dashboard",
};

const dict = {
  ru: englishCabinetShellDict,
  uz: englishCabinetShellDict,
} as const;

function getDefaultNavigation(locale: Locale): CabinetNavigationGroup[] {
  const t = dict[locale];
  return [
    {
      title: t.defaultNavTitle,
      items: [
        { href: "/dashboard#today", label: t.navToday, caption: t.navTodayCaption },
        { href: "/dashboard#lessons", label: t.navLessons, caption: t.navLessonsCaption },
        { href: "/dashboard#progress", label: t.navProgress, caption: t.navProgressCaption },
        { href: "/dashboard#account", label: t.navAccount, caption: t.navAccountCaption },
      ],
    },
  ];
}

function getRoleDisplayName(role: string, locale: Locale): string {
  const t = dict[locale];
  switch (role) {
    case "student":
      return t.roleDisplayStudent;
    case "parent":
      return t.roleDisplayParent;
    case "teacher":
      return t.roleDisplayTeacher;
    case "researcher":
      return t.roleDisplayResearcher;
    default:
      return t.cabinetGeneric;
  }
}

function getHrefHash(href: string) {
  const hashIndex = href.indexOf("#");
  return hashIndex === -1 ? "" : href.slice(hashIndex);
}

function getHrefPath(href: string) {
  const hashIndex = href.indexOf("#");
  return hashIndex === -1 ? href : href.slice(0, hashIndex);
}

function isActiveLink(
  pathname: string,
  activeHash: string,
  href: string,
  activeHref?: string,
) {
  if (activeHref) return href === activeHref;

  const hrefPath = getHrefPath(href);
  const hrefHash = getHrefHash(href);

  if (hrefHash) {
    return (
      pathname === hrefPath
      && (activeHash === hrefHash || (!activeHash && hrefHash === "#today"))
    );
  }

  return pathname === hrefPath || pathname.startsWith(`${hrefPath}/`);
}

export function CabinetShell({
  title,
  description,
  activeHref,
  actions,
  navigation,
  onNavigate,
  children,
}: CabinetShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = dict[locale];
  const { ready, user } = useAuth();
  const [activeHash, setActiveHash] = useState("");
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isProtectedCabinetRoute = isCabinetRoute(pathname) && !isAuthRoute;
  const activeUser = user ?? demoUserPreview;
  const navigationGroups = navigation ?? getDefaultNavigation(locale);

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    if (ready && !user && isProtectedCabinetRoute) {
      router.replace("/login");
    }
  }, [isProtectedCabinetRoute, ready, router, user]);

  // ── Unified Mosaic Dashboard Shell ──────────────────────────────────────────
  return (
    <div className="mosaic-dashboard-shell" data-role={activeUser.role}>
      <div className="mosaic-dashboard-container">
        <header className="mosaic-dashboard-header">
          <div className="mosaic-dashboard-header-copy">
            <span className="mosaic-dashboard-eyebrow">
              {getRoleDisplayName(activeUser.role, locale)}
            </span>
            <h1 className="mosaic-dashboard-title">{title}</h1>
            <p className="mosaic-dashboard-description">{description}</p>
          </div>
          {actions ? (
            <div className="mosaic-dashboard-header-actions">{actions}</div>
          ) : null}
        </header>

        {navigationGroups.some((g) => g.items.length > 1) && (
          <nav className="mosaic-dashboard-nav" aria-label={t.navAria}>
            <div className="mosaic-dashboard-tabs">
              {navigationGroups.flatMap((group) => group.items).map((item) => {
                const active = isActiveLink(pathname, activeHash, item.href, activeHref);
                const hrefHash = getHrefHash(item.href);
                const isSamePageHashLink = hrefHash && getHrefPath(item.href) === pathname;
                const content = (
                  <>
                    <span className="mosaic-tab-label">{item.label}</span>
                    {item.caption ? (
                      <span className="mosaic-tab-caption">{item.caption}</span>
                    ) : null}
                  </>
                );

                if (isSamePageHashLink) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`mosaic-tab-link ${active ? "active" : ""}`}
                      onClick={(event) => {
                        if (event.metaKey || event.ctrlKey || event.shiftKey) return;
                        if (onNavigate) {
                          event.preventDefault();
                          onNavigate(item.href);
                        }
                      }}
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`mosaic-tab-link ${active ? "active" : ""}`}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}

        <main className="mosaic-dashboard-content">
          {children ?? (
            <section className="mosaic-dashboard-loading">
              <p className="loading-copy">{t.loadingCabinet}</p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
