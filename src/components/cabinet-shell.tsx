"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "@/components/auth-provider";
import { useLocale } from "@/components/locale-provider";
import { demoUserPreview } from "@/data/demo-user";
import { AUTH_CHANGE_EVENT, getQuestionnaire, type CurrentUser } from "@/lib/auth-storage";
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

function getRoleLabel(role: string, locale: Locale): string {
  const t = dict[locale];
  switch (role) {
    case "student":
      return t.roleLabelStudent;
    case "parent":
      return t.roleLabelParent;
    case "teacher":
      return t.roleLabelTeacher;
    case "researcher":
      return t.roleLabelResearcher;
    default:
      return t.roleLabelUser;
  }
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

function getUserDisplay(user: CurrentUser, isLoggedIn: boolean, locale: Locale) {
  const t = dict[locale];
  const roleLabel = getRoleLabel(user.role, locale);

  if (user.role === "teacher") {
    return {
      name: user.name,
      meta: `${user.profile.organizationName} • ${user.profile.childClass}`,
      state: isLoggedIn ? t.modeRole(roleLabel) : t.previewMode,
    };
  }

  if (user.role === "student") {
    return {
      name: user.profile.childName || user.name,
      meta: `${user.profile.childClass} • ${user.profile.teacherName}`,
      state: isLoggedIn ? t.modeRole(roleLabel) : t.previewMode,
    };
  }

  if (user.role === "researcher") {
    return {
      name: user.name,
      meta: t.researcher,
      state: isLoggedIn ? t.modeRole(roleLabel) : t.previewMode,
    };
  }

  return {
    name: user.name,
    meta: user.profile.childName
      ? `${user.profile.childName} • ${user.profile.childClass}`
      : user.profile.childClass || t.parent,
    state: isLoggedIn ? t.modeRole(roleLabel) : t.previewMode,
  };
}


export function CabinetShell({
  title,
  description,
  activeHref,
  actions,
  layoutVariant = "adult-sidebar",
  navigation,
  onNavigate,
  children,
}: CabinetShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = dict[locale];
  const { ready, user, logout } = useAuth();
  const [activeHash, setActiveHash] = useState("");
  const [parentInitialPending, setParentInitialPending] = useState<boolean | null>(null);
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isProtectedCabinetRoute = isCabinetRoute(pathname) && !isAuthRoute;
  const activeUser = user ?? demoUserPreview;
  const userDisplay = getUserDisplay(activeUser, Boolean(user), locale);
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

  useEffect(() => {
    if (!user || user.role !== "parent") {
      return;
    }

    let cancelled = false;

    const refresh = () => {
      void getQuestionnaire(user.id, "initial")
        .then((initial) => {
          if (!cancelled) setParentInitialPending(!initial);
        })
        .catch(() => {
          if (!cancelled) setParentInitialPending(null);
        });
    };

    refresh();
    window.addEventListener(AUTH_CHANGE_EVENT, refresh);

    return () => {
      cancelled = true;
      window.removeEventListener(AUTH_CHANGE_EVENT, refresh);
    };
  }, [user]);

  useEffect(() => {
    if (
      user?.role === "parent"
      && parentInitialPending === true
      && isProtectedCabinetRoute
      && !pathname.startsWith("/onboarding")
    ) {
      router.replace("/onboarding/anketa");
    }
  }, [parentInitialPending, isProtectedCabinetRoute, pathname, router, user?.role]);

  if (!isCabinetRoute(pathname)) {
    return <>{children}</>;
  }

  if (isProtectedCabinetRoute && (!ready || !user)) {
    return (
      <section className="cabinet-access-screen">
        <div className="cabinet-access-card">
          <span className="eyebrow">{t.accessEyebrow}</span>
          <h1>{t.accessTitle}</h1>
          <p>{t.accessText}</p>
          <Link className="button button-primary" href="/login">
            {t.accessButton}
          </Link>
        </div>
      </section>
    );
  }

  function handleLogout() {
    void logout().finally(() => {
      startTransition(() => router.replace("/login"));
    });
  }

  // ── Student layout: single-screen, no navigation ────────────────────────────
  if (layoutVariant === "student-top-nav") {
    return (
      <div className="student-shell" data-role="student">
        <header className="student-shell-header">
          <div className="student-shell-brand">
            <strong>MOSAIC</strong>
          </div>
          {user ? (
            <button
              type="button"
              className="student-shell-logout"
              onClick={handleLogout}
              aria-label={t.logoutAria}
            >
              {t.logoutLabel}
            </button>
          ) : null}
        </header>

        <main className="student-shell-main">
          {children ?? <p className="loading-copy">{t.loadingCabinet}</p>}
        </main>
      </div>
    );
  }

  // ── Adult layout: role-colored sidebar ───────────────────────────────────────
  return (
    <section className="cabinet-shell" data-role={activeUser.role}>
      <aside className="cabinet-sidebar">
        <div className="cabinet-brand">
          <strong>MOSAIC</strong>
          <span>{getRoleDisplayName(activeUser.role, locale)}</span>
        </div>

        <div className="cabinet-user">
          <p className="cabinet-user-name">{userDisplay.name}</p>
          <p className="cabinet-user-meta">{userDisplay.meta}</p>
          <span className="cabinet-user-state">{userDisplay.state}</span>
        </div>

        <nav className="cabinet-nav" aria-label={t.navAria}>
          {navigationGroups.map((group) => (
            <div key={group.title} className="cabinet-nav-group">
              <p className="cabinet-nav-title">{group.title}</p>
              <div className="cabinet-nav-list">
                {group.items.map((item) => {
                  const className = `cabinet-nav-link ${
                    isActiveLink(pathname, activeHash, item.href, activeHref) ? "active" : ""
                  }`;
                  const hrefHash = getHrefHash(item.href);
                  const isSamePageHashLink = hrefHash && getHrefPath(item.href) === pathname;
                  const content = (
                    <>
                      <span>{item.label}</span>
                      {item.caption ? <small>{item.caption}</small> : null}
                    </>
                  );

                  if (isSamePageHashLink) {
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className={className}
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
                    <Link key={item.href} href={item.href} className={className}>
                      {content}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="cabinet-sidebar-bottom">
          <div className="cabinet-session-actions">
            {user ? (
              <button
                type="button"
                className="button button-ghost small cabinet-session-button"
                onClick={handleLogout}
              >
                {t.logoutCabinet}
              </button>
            ) : (
              <>
                <Link className="button button-secondary small cabinet-session-button" href="/login">
                  {t.login}
                </Link>
                <Link className="button button-primary small cabinet-session-button" href="/register">
                  {t.register}
                </Link>
              </>
            )}
          </div>
        </div>
      </aside>

      <div className="cabinet-main">
        {parentInitialPending ? (
          <div className="parent-onboarding-sticky" role="alert">
            <div className="parent-onboarding-sticky-copy">
              <strong>{t.parentOnboardingTitle}</strong>
              <p>{t.parentOnboardingText}</p>
            </div>
            <Link href="/onboarding/anketa" className="parent-onboarding-sticky-btn">
              {t.parentOnboardingButton}
            </Link>
          </div>
        ) : null}

        <header className="cabinet-topbar cabinet-topbar-page">
          <div className="cabinet-topbar-copy">
            <p className="cabinet-kicker">{t.cabinetKicker}</p>
            <h1>{title}</h1>
            <p className="cabinet-topbar-text">{description}</p>
          </div>
          {actions ? <div className="cabinet-topbar-actions">{actions}</div> : null}
        </header>

        {children ?? (
          <section className="cabinet-board">
            <p className="loading-copy">{t.loadingCabinet}</p>
          </section>
        )}
      </div>
    </section>
  );
}
