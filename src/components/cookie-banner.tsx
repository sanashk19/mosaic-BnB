"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { isCabinetRoute } from "@/lib/is-cabinet-route";

const COOKIE_KEY = "uquvli-cookie-choice";
const COOKIE_CHANGE_EVENT = "uquvli-cookie-change";

const dict = {
  ru: {
    title: "We use cookies",
    copyBefore:
      "Technically necessary cookies are required for navigation and authentication, while local storage saves your preferences. Learn more in our ",
    copyLink: "cookie policy",
    copyAfter: ".",
    onlyRequired: "Only necessary",
    gotIt: "Got it",
  },
  uz: {
    title: "We use cookies",
    copyBefore:
      "Technically necessary cookies are required for navigation and authentication, while local storage saves your preferences. Learn more in our ",
    copyLink: "cookie policy",
    copyAfter: ".",
    onlyRequired: "Only necessary",
    gotIt: "Got it",
  },
} as const;

function getCookieVisibility() {
  if (typeof window === "undefined") {
    return false;
  }
  return !window.localStorage.getItem(COOKIE_KEY);
}

export function CookieBanner() {
  const pathname = usePathname();
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const syncVisibility = () => {
      setVisible(getCookieVisibility());
    };

    syncVisibility();
    window.addEventListener("storage", syncVisibility);
    window.addEventListener(COOKIE_CHANGE_EVENT, syncVisibility);

    return () => {
      window.removeEventListener("storage", syncVisibility);
      window.removeEventListener(COOKIE_CHANGE_EVENT, syncVisibility);
    };
  }, []);

  function saveChoice(value: "required" | "all") {
    window.localStorage.setItem(COOKIE_KEY, value);
    setVisible(false);
    window.dispatchEvent(new Event(COOKIE_CHANGE_EVENT));
  }

  if (!visible || isCabinetRoute(pathname) || pathname.startsWith("/karta-saita")) {
    return null;
  }

  const t = dict[locale];

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite">
      <div>
        <p className="cookie-title">{t.title}</p>
        <p className="cookie-copy">
          {t.copyBefore}
          <Link href="/cookies">{t.copyLink}</Link>
          {t.copyAfter}
        </p>
      </div>

      <div className="cookie-actions">
        <button
          type="button"
          className="button button-ghost small"
          onClick={() => saveChoice("required")}
        >
          {t.onlyRequired}
        </button>
        <button
          type="button"
          className="button button-primary small"
          onClick={() => saveChoice("all")}
        >
          {t.gotIt}
        </button>
      </div>
    </div>
  );
}
