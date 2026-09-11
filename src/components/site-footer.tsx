"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { useLocale } from "@/components/locale-provider";
import { NationalEmblem } from "@/components/national-emblem";
import { SocialIcon, type SocialIconName } from "@/components/ui-icons";
import { isCabinetRoute } from "@/lib/is-cabinet-route";

const socialLinks: Array<{ label: string; icon: SocialIconName; href: string }> = [
  { label: "Telegram", icon: "telegram", href: "https://t.me/uquvliuz" },
  { label: "YouTube", icon: "youtube", href: "https://youtube.com/@uquvliuz" },
  { label: "Instagram", icon: "instagram", href: "https://instagram.com/uquvliuz" },
  { label: "Facebook", icon: "facebook", href: "https://facebook.com/uquvliuz" },
];

const dict = {
  ru: {
    aboutCopy:
      "Учебная платформа для уроков СБО в коррекционных школах Узбекистана. Разработана для детей с лёгкой умственной отсталостью (F70).",
    socialsLabel: "Социальные сети",
    platform: "Платформа",
    program: "Программа",
    directions: "Направления",
    aboutPlatform: "О платформе",
    contacts: "Контакты",
    users: "Пользователям",
    forFamilies: "Для родителей",
    forSchools: "Для школ",
    cabinet: "Личный кабинет",
    startLearning: "Начать обучение",
    questions: "Есть вопросы?",
    privacy: "Политика конфиденциальности",
    terms: "Пользовательское соглашение",
    copyrightSuffix: "Тестовая цифровая образовательная платформа",
    openCabinet: "Открыть кабинет",
    loginCabinet: "Войти в кабинет",
  },
  uz: {
    aboutCopy:
      "Oʻzbekiston maxsus maktablarida ijtimoiy-maishiy moslashuv darslari uchun oʻquv platformasi. Yengil aqliy zaifligi (F70) bolalar uchun ishlab chiqilgan.",
    socialsLabel: "Ijtimoiy tarmoqlar",
    platform: "Platforma",
    program: "Dastur",
    directions: "Yoʻnalishlar",
    aboutPlatform: "Platforma haqida",
    contacts: "Aloqa",
    users: "Foydalanuvchilar uchun",
    forFamilies: "Ota-onalar uchun",
    forSchools: "Maktablar uchun",
    cabinet: "Shaxsiy kabinet",
    startLearning: "Oʻqishni boshlash",
    questions: "Savollaringiz bormi?",
    privacy: "Maxfiylik siyosati",
    terms: "Foydalanuvchi shartnomasi",
    copyrightSuffix: "Sinov raqamli taʼlim platformasi",
    openCabinet: "Kabinetni ochish",
    loginCabinet: "Kabinetga kirish",
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
      <div className="flag-line" aria-hidden="true" />
      <div className="footer-grid">
        <div>
          <NationalEmblem className="footer-emblem" />
          <p className="footer-title">uquvli.uz</p>
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
            <Link href="/about">{t.aboutPlatform}</Link>
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
            <span>support@uquvli.uz</span>
            <span>+998 90 000-00-00</span>
            <Link href="/contacts">{t.contacts}</Link>
            <Link href="/privacy">{t.privacy}</Link>
            <Link href="/terms">{t.terms}</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 uquvli.uz</span>
        <span>{t.copyrightSuffix}</span>
        <Link href={user ? "/dashboard" : "/login"}>
          {user ? t.openCabinet : t.loginCabinet}
        </Link>
      </div>
    </footer>
  );
}
