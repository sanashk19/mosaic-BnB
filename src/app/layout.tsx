import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Manrope, Inter } from "next/font/google";
import { AuthProvider } from "@/components/auth-provider";
import { LocaleProvider } from "@/components/locale-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLocale } from "@/lib/i18n";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const CookieBanner = dynamic(() =>
  import("@/components/cookie-banner").then((module) => module.CookieBanner),
);

const metaByLocale = {
  ru: {
    title: "Mosaic | One lesson. Every learner.",
    description:
      "Mosaic adapts one lesson into personalized learning experiences for different learner needs, helping teachers create inclusive learning without creating multiple versions of the same lesson.",
  },
  uz: {
    title: "Mosaic | One lesson. Every learner.",
    description:
      "Mosaic adapts one lesson into personalized learning experiences for different learner needs, helping teachers create inclusive learning without creating multiple versions of the same lesson.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const meta = metaByLocale[locale];
  return {
    title: {
      default: meta.title,
      template: "%s | Mosaic",
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
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className={inter.className}>
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
