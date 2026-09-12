import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdaptiveLessonView } from "@/components/adaptive-lesson-view";
import type { LessonItemArtId } from "@/components/lesson-item-art";
import { allLessons, getLessonBySlugLocalized } from "@/data/program";
import type { AccessibilitySupportType } from "@/lib/adaptation/adaptation-types";
import { getLocale } from "@/lib/i18n";

type LessonPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ profile?: string }>;
};

const dict = {
  ru: {
    notFound: "Lesson not found",
    allDirections: "All Curriculum Tracks",
    saveProgress: "Save progress in dashboard",
    rulesCardCopy: "rules, real situations, and mini-checks in one lesson",
  },
  uz: {
    notFound: "Lesson not found",
    allDirections: "All Curriculum Tracks",
    saveProgress: "Save progress in dashboard",
    rulesCardCopy: "rules, real situations, and mini-checks in one lesson",
  },
} as const;

const lessonCardArt: Partial<Record<string, LessonItemArtId>> = {
  "diagnostic-entry": "realistic-hygiene-kit",
  "appearance-young-people": "realistic-young-outfit",
  "hair-types-care": "realistic-hair-care",
  "skin-types-care": "realistic-skin-care",
  "sun-exposure-skin": "realistic-sun-care",
  "cosmetics-basics": "realistic-cosmetics",
  "skincare-checklist": "realistic-skincare-routine",
  "ear-hygiene-volume": "realistic-safe-headphones",
  "seasonal-clothing": "realistic-seasonal-clothing",
  "silk-handwash": "realistic-silk-handwash",
  "washing-machine-panel": "realistic-washing-machine",
  "detergent-dosage": "realistic-detergent-dosage",
  "healthy-dinner-menu": "realistic-healthy-dinner",
  "cutlets-recipe": "realistic-cutlets",
  "apple-pie-timer": "realistic-apple-pie",
  "table-setting-scheme": "realistic-table-setting",
  "family-income": "realistic-family-income",
  "family-expenses": "realistic-family-expenses",
  "transport-types": "realistic-transport-types",
  "train-schedule-board": "realistic-station-board",
  "online-ticket-purchase": "realistic-train-ticket",
  "package-tracking": "realistic-package-tracking",
  "phone-calls-sms": "realistic-phone-calls",
  "messenger-message": "realistic-messenger",
  "internet-safety-etiquette": "realistic-internet-safety",
  "digital-thermometer": "realistic-thermometer",
  "public-appeals-portal": "realistic-mygov-portal",
  "atm-cash-withdrawal": "realistic-atm",
  "credit-contract-reading": "realistic-credit-contract",
  "diagnostic-final": "realistic-final-checklist",
};

export async function generateStaticParams() {
  return allLessons.map((lesson) => ({
    slug: lesson.slug,
  }));
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const lesson = getLessonBySlugLocalized(slug, locale);
  const t = dict[locale];

  return {
    title: lesson?.title ?? t.notFound,
    description: lesson?.summary,
  };
}

export default async function LessonPage({ params, searchParams }: LessonPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const requestedProfile = (resolvedSearchParams.profile as AccessibilitySupportType) || "none";
  const locale = await getLocale();
  const lesson = getLessonBySlugLocalized(slug, locale);

  if (!lesson) {
    notFound();
  }

  const t = dict[locale];
  const cardArt = lessonCardArt[lesson.slug];

  return (
    <main className="lesson-public-page">
      <AdaptiveLessonView
        originalLesson={lesson}
        initialProfile={requestedProfile}
        dict={t}
        cardArt={cardArt}
      />
    </main>
  );
}
