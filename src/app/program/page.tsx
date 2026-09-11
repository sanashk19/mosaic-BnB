import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, UiIcon, type UiIconName } from "@/components/ui-icons";
import { getProgramModules, getPlatformHighlights } from "@/data/program";
import { getLocale, type Locale } from "@/lib/i18n";

const englishDict = {
  title: "Program",
  eyebrow: "Learning Curriculum",
  heroHeading: "Essential digital skills for real-world independence.",
  heroLead:
    "Lessons are built around authentic daily situations: online messaging, e-commerce, wellness, transit, and public services. Explore the curriculum freely or sign in to track progress.",
  ctaStart: "Start learning",
  ctaCabinet: "Open dashboard",
  summaryAriaLabel: "Curriculum overview",
  summaryLessons: "lessons",
  summaryDirections: "tracks",
  summaryLangCode: "EN",
  summaryLangLabel: "English language",

  directionsEyebrow: "Tracks",
  directionsHeading: "Each module leads to a clear practical action.",
  whatLearn: "What you learn",
  whatPractice: "What you practice",
  openFirstLesson: "Open sample lesson",

  formatEyebrow: "Format",
  formatHeading: "Designed to keep learning calm, predictable, and manageable.",
  afterLogin: "When Signed In",
  afterLoginCopy:
    "Your dashboard saves progress, unlocks upcoming lessons, and provides dedicated tools for learners, families, and educators.",
  loginLink: "Log in",
  registerLink: "Create account",
};

const dict = {
  ru: englishDict,
  uz: englishDict,
} as const;

const moduleIcons: Record<string, UiIconName> = {
  "diagnostic": "services",
  "digital-health": "health",
  "digital-home-economics": "shopping",
  "digital-transport": "nature",
  "digital-communication": "communication",
  "digital-safety": "services",
  "digital-public-services": "services",
};

const moduleTones = ["gold", "teal", "green", "blue", "violet", "teal", "green"] as const;

function formatLessonCount(count: number, _locale?: Locale) {
  void _locale;
  return `${count} ${count === 1 ? "lesson" : "lessons"}`;
}

export async function generateMetadata() {
  const locale = await getLocale();
  return { title: dict[locale].title };
}

export default async function ProgramPage() {
  const locale = await getLocale();
  const t = dict[locale];
  const programModules = getProgramModules(locale);
  const platformHighlights = getPlatformHighlights(locale);

  const lessonTotal = programModules.reduce(
    (total, module) => total + module.lessonCount,
    0,
  );

  return (
    <main className="program-page">
      <section className="program-hero">
        <div className="marketing-wrap program-hero-grid">
          <div className="marketing-copy">
            <span className="eyebrow">{t.eyebrow}</span>
            <h1>{t.heroHeading}</h1>
            <p>{t.heroLead}</p>
            <div className="marketing-actions">
              <Link className="button button-primary" href="/register">
                {t.ctaStart}
              </Link>
              <Link className="button button-secondary" href="/dashboard#lessons">
                {t.ctaCabinet}
              </Link>
            </div>
          </div>

          <aside className="program-summary-card" aria-label={t.summaryAriaLabel}>
            <div>
              <strong>{lessonTotal}</strong>
              <span>{t.summaryLessons}</span>
            </div>
            <div>
              <strong>{programModules.length}</strong>
              <span>{t.summaryDirections}</span>
            </div>
            <div>
              <strong>{t.summaryLangCode}</strong>
              <span>{t.summaryLangLabel}</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="marketing-section program-module-section" id="directions">
        <div className="marketing-wrap">
          <div className="marketing-section-head">
            <div>
              <span className="eyebrow">{t.directionsEyebrow}</span>
              <h2>{t.directionsHeading}</h2>
            </div>
          </div>

          <div className="program-module-grid">
            {programModules.map((module, index) => {
              const tone = moduleTones[index % moduleTones.length];
              const firstLesson = module.lessons[0];

              return (
                <article
                  id={module.slug}
                  className={`program-module-card home-tone-${tone}`}
                  key={module.slug}
                >
                  <div className="program-module-media">
                    <Image
                      src={module.image}
                      alt={module.imageAlt}
                      width={900}
                      height={540}
                      sizes="(max-width: 900px) 100vw, 420px"
                    />
                  </div>

                  <div className="program-module-body">
                    <div className="program-module-head">
                      <span className="home-icon" aria-hidden="true">
                        <UiIcon name={moduleIcons[module.slug] ?? "services"} />
                      </span>
                      <div className="home-module-meta">
                        <span>{module.hours}</span>
                        <strong>{formatLessonCount(module.lessonCount, locale)}</strong>
                      </div>
                    </div>

                    <h3>{module.title}</h3>
                    <p>{module.description}</p>

                    <div className="program-module-lists">
                      <div>
                        <strong>{t.whatLearn}</strong>
                        <ul className="marketing-bullet-list">
                          {module.knowledge.slice(0, 3).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong>{t.whatPractice}</strong>
                        <ul className="marketing-bullet-list">
                          {module.skills.slice(0, 3).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {firstLesson ? (
                      <Link className="home-card-link" href={`/lesson/${firstLesson.slug}`}>
                        {t.openFirstLesson}
                        <span aria-hidden="true">
                          <ArrowIcon />
                        </span>
                      </Link>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="marketing-section marketing-section-soft">
        <div className="marketing-wrap marketing-split">
          <div className="marketing-copy">
            <span className="eyebrow">{t.formatEyebrow}</span>
            <h2>{t.formatHeading}</h2>
            <ul className="marketing-bullet-list">
              {platformHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="marketing-side-note">
            <p className="marketing-side-note-title">{t.afterLogin}</p>
            <p>{t.afterLoginCopy}</p>
            <div className="marketing-link-list">
              <Link href="/login">{t.loginLink}</Link>
              <Link href="/register">{t.registerLink}</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
