"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { useLocale } from "@/components/locale-provider";
import { MosaicLogo } from "@/components/mosaic-logo";
import { isCabinetRoute } from "@/lib/is-cabinet-route";

const dict = {
  ru: {
    aboutCopy:
      "Mosaic adapts one lesson into personalized learning experiences for different learner needs — from simplified language and read-aloud support to captions and audio descriptions.",
    tagline: "One lesson. Every learner.",
    platform: "Platform",
    program: "Program",
    signLanguage: "Sign Language",
    aboutPlatform: "About Mosaic",
    contacts: "Contact",
    users: "For Users",
    forTeachers: "For Teachers",
    forFamilies: "For Families",
    cabinet: "Dashboard",
    contactHeading: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    openCabinet: "Open dashboard",
    loginCabinet: "Log in to dashboard",
  },
  uz: {
    aboutCopy:
      "Mosaic adapts one lesson into personalized learning experiences for different learner needs — from simplified language and read-aloud support to captions and audio descriptions.",
    tagline: "One lesson. Every learner.",
    platform: "Platform",
    program: "Program",
    signLanguage: "Sign Language",
    aboutPlatform: "About Mosaic",
    contacts: "Contact",
    users: "For Users",
    forTeachers: "For Teachers",
    forFamilies: "For Families",
    cabinet: "Dashboard",
    contactHeading: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    openCabinet: "Open dashboard",
    loginCabinet: "Log in to dashboard",
  },
} as const;

export function SiteFooter() {
  const pathname = usePathname();
  const { user } = useAuth();
  const locale = useLocale();

  if (isCabinetRoute(pathname)) {
    return null;
  }

  const t = dict[locale];

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div style={{ marginBottom: "12px" }}>
            <MosaicLogo size={34} />
          </div>
          <p className="footer-title" style={{ fontSize: "1.05rem", marginBottom: "6px" }}>
            {t.tagline}
          </p>
          <p className="footer-copy">{t.aboutCopy}</p>
        </div>

        <div>
          <p className="footer-title">{t.platform}</p>
          <div className="footer-links">
            <Link href="/program">{t.program}</Link>
            <Link href="/sign-language">{t.signLanguage}</Link>
            <Link href="/contacts">{t.aboutPlatform}</Link>
            <Link href="/contacts">{t.contacts}</Link>
          </div>
        </div>

        <div>
          <p className="footer-title">{t.users}</p>
          <div className="footer-links">
            <Link href="/educators">{t.forTeachers}</Link>
            <Link href="/families">{t.forFamilies}</Link>
            <Link href="/dashboard">{t.cabinet}</Link>
          </div>
        </div>

        <div>
          <p className="footer-title">{t.contactHeading}</p>
          <div className="footer-links">
            <a href="mailto:sanashk019@gmail.com" style={{ fontWeight: 600, color: "var(--mosaic-green, #506847)" }}>
              sanashk019@gmail.com
            </a>
            <Link href="/privacy">{t.privacy}</Link>
            <Link href="/terms">{t.terms}</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Mosaic · One lesson. Every learner.</span>
        <Link href={user ? "/dashboard" : "/login"}>
          {user ? t.openCabinet : t.loginCabinet}
        </Link>
      </div>
    </footer>
  );
}

