import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { LessonExperience } from "@/components/lesson-experience";
import { LessonPlayer } from "@/components/lesson-player";
import { allLessons, getLessonBySlugLocalized } from "@/data/program";
import { getLocale } from "@/lib/i18n";

type LessonPageProps = {
  params: Promise<{ slug: string }>;
};

const dict = {
  ru: {
    notFound: "Урок не найден",
    allDirections: "Все направления",
    saveProgress: "Сохранить прогресс в кабинете",
    rulesCardCopy: "правила, ситуации и мини-проверка в одном уроке",
  },
  uz: {
    notFound: "Dars topilmadi",
    allDirections: "Barcha yoʻnalishlar",
    saveProgress: "Yutuqlarni kabinetda saqlash",
    rulesCardCopy: "qoidalar, vaziyatlar va kichik tekshiruv — bitta darsda",
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

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const lesson = getLessonBySlugLocalized(slug, locale);

  if (!lesson) {
    notFound();
  }

  const t = dict[locale];
  const cardArt = lessonCardArt[lesson.slug];

  return (
    <main className="lesson-public-page">
      <section className="lesson-public-hero">
        <div className="marketing-wrap lesson-public-head">
          <div className="marketing-copy">
            <span className="eyebrow">{lesson.moduleTitle}</span>
            <h1>{lesson.title}</h1>
            <p>{lesson.intro}</p>
            <div className="marketing-actions">
              <Link className="button button-secondary" href="/program">
                {t.allDirections}
              </Link>
              <Link className="button button-primary" href="/register">
                {t.saveProgress}
              </Link>
            </div>
          </div>

          <aside className={`lesson-public-card${cardArt ? " lesson-public-card--with-art" : ""}`}>
            {cardArt ? (
              <div className="lesson-public-card-art" aria-hidden="true">
                <LessonItemArt id={cardArt} size={136} />
              </div>
            ) : null}
            <span>{lesson.duration}</span>
            <strong>{lesson.rules.length}</strong>
            <p>{t.rulesCardCopy}</p>
          </aside>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-wrap">
          {lesson.screens && lesson.screens.length > 0 ? (
            <LessonPlayer screens={lesson.screens} lessonTitle={lesson.title} />
          ) : (
            <LessonExperience lesson={lesson} />
          )}
        </div>
      </section>
    </main>
  );
}
