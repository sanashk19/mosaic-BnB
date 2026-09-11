import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/components/auth-provider";
import { LocaleProvider } from "@/components/locale-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLocale } from "@/lib/i18n";
import "./globals.css";

const CookieBanner = dynamic(() =>
  import("@/components/cookie-banner").then((module) => module.CookieBanner),
);

const metaByLocale = {
  ru: {
    title: "uquvli.uz | Образовательная платформа",
    description:
      "Современная образовательная платформа для детей с особыми образовательными потребностями в Узбекистане.",
  },
  uz: {
    title: "uquvli.uz | Taʼlim platformasi",
    description:
      "Oʻzbekistondagi maxsus taʼlim ehtiyojidagi bolalar uchun zamonaviy oʻquv platformasi.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const meta = metaByLocale[locale];
  return {
    title: {
      default: meta.title,
      template: "%s | uquvli.uz",
    },
    description: meta.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <LocaleProvider locale={locale}>
          <AuthProvider>
            <div className="site-shell">
              <SiteHeader />
              {children}
              <SiteFooter />
              <CookieBanner />
            </div>
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
