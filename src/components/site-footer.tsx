"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { useLocale } from "@/components/locale-provider";
import { MosaicLogo } from "@/components/mosaic-logo";
import { SocialIcon, type SocialIconName } from "@/components/ui-icons";
import { isCabinetRoute } from "@/lib/is-cabinet-route";

const socialLinks: Array<{ label: string; icon: SocialIconName; href: string }> = [
  { label: "Telegram", icon: "telegram", href: "https://t.me" },
  { label: "YouTube", icon: "youtube", href: "https://youtube.com" },
  { label: "Instagram", icon: "instagram", href: "https://instagram.com" },
  { label: "Facebook", icon: "facebook", href: "https://facebook.com" },
];

const dict = {
  ru: {
    aboutCopy:
      "Mosaic adapts one lesson into personalized learning experiences for different learner needs — from simplified language and read-aloud support to captions and audio descriptions. One lesson. Every learner.",
    socialsLabel: "Social networks",
    platform: "Platform",
    program: "Curriculum",
    directions: "Tracks",
    aboutPlatform: "About Mosaic",
    contacts: "Contact",
    users: "For Users",
    forFamilies: "For Parents",
    forSchools: "For Schools",
    cabinet: "Dashboard",
    startLearning: "Start learning",
    questions: "Have questions?",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    copyrightSuffix: "Adaptive Digital Learning Platform",
    openCabinet: "Open dashboard",
    loginCabinet: "Log in to dashboard",
  },
  uz: {
    aboutCopy:
      "Mosaic adapts one lesson into personalized learning experiences for different learner needs — from simplified language and read-aloud support to captions and audio descriptions. One lesson. Every learner.",
    socialsLabel: "Social networks",
    platform: "Platform",
    program: "Curriculum",
    directions: "Tracks",
    aboutPlatform: "About Mosaic",
    contacts: "Contact",
    users: "For Users",
    forFamilies: "For Parents",
    forSchools: "For Schools",
    cabinet: "Dashboard",
    startLearning: "Start learning",
    questions: "Have questions?",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    copyrightSuffix: "Adaptive Digital Learning Platform",
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
          <div style={{ marginBottom: "14px" }}>
            <MosaicLogo size={32} />
          </div>
          <p className="footer-copy">{t.aboutCopy}</p>
          <div className="footer-socials" aria-label={t.socialsLabel}>
            {socialLinks.map((item) => (
              <a
                key={item.icon}
                href={item.href}
                aria-label={item.label}
                title={item.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon name={item.icon} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="footer-title">{t.platform}</p>
          <div className="footer-links">
            <Link href="/program">{t.program}</Link>
            <Link href="/program#directions">{t.directions}</Link>
            <Link href="/contacts">{t.contacts}</Link>
          </div>
        </div>

        <div>
          <p className="footer-title">{t.users}</p>
          <div className="footer-links">
            <Link href="/families">{t.forFamilies}</Link>
            <Link href="/educators">{t.forSchools}</Link>
            <Link href="/dashboard">{t.cabinet}</Link>
            <Link href="/register">{t.startLearning}</Link>
          </div>
        </div>

        <div>
          <p className="footer-title">{t.questions}</p>
          <div className="footer-links">
            <span>support@mosaic-learning.org</span>
            <span>Accessible Learning Initiative</span>
            <Link href="/contacts">{t.contacts}</Link>
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
