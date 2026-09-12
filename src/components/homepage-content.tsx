import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { HomeTrainerPreview } from "@/components/home-trainer-preview";
import { HomepageAdaptationDemo } from "@/components/homepage-adaptation-demo";
import {
  ArrowIcon,
  UiIcon as ModuleIcon,
  type UiIconName as ModuleIconName,
} from "@/components/ui-icons";
import {
  type HomepageDraft,
  type HomepageSectionId,
} from "@/data/homepage-draft";
import type { ProgramModule } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type HomeModulePreview = Pick<
  ProgramModule,
  "slug" | "title" | "hours" | "lessonCount" | "description" | "image" | "imageAlt" | "lessons"
>;

type HomepageContentProps = {
  draft: HomepageDraft;
  featuredLessonHref: string;
  homeModules: HomeModulePreview[];
  locale: Locale;
};

type ModuleTone = "blue" | "green" | "gold" | "teal" | "ink" | "violet";

type Presentation = {
  icon: ModuleIconName;
  tone: ModuleTone;
  heroLabel: string;
  shortLabel: string;
};

const modulePresentationsByLocale: Record<
  Locale,
  Record<string, Presentation>
> = {
  ru: {
    "diagnostic": {
      icon: "services",
      tone: "ink",
      heroLabel: "Functional Diagnostic",
      shortLabel: "pre and post assessment",
    },
    "digital-health": {
      icon: "health",
      tone: "green",
      heroLabel: "Digital Health",
      shortLabel: "hygiene and wellness",
    },
    "digital-home-economics": {
      icon: "shopping",
      tone: "gold",
      heroLabel: "Home Economics",
      shortLabel: "clothing, nutrition, budget",
    },
    "digital-transport": {
      icon: "nature",
      tone: "blue",
      heroLabel: "Digital Transport",
      shortLabel: "transit, routes and tickets",
    },
    "digital-communication": {
      icon: "communication",
      tone: "teal",
      heroLabel: "Digital Communication",
      shortLabel: "calls and messaging",
    },
    "digital-safety": {
      icon: "services",
      tone: "violet",
      heroLabel: "Digital Safety",
      shortLabel: "habits and privacy",
    },
    "digital-public-services": {
      icon: "services",
      tone: "violet",
      heroLabel: "Digital Public Services",
      shortLabel: "citizen portal, banking, forms",
    },
  },
  uz: {
    "diagnostic": {
      icon: "services",
      tone: "ink",
      heroLabel: "Functional Diagnostic",
      shortLabel: "pre and post assessment",
    },
    "digital-health": {
      icon: "health",
      tone: "green",
      heroLabel: "Digital Health",
      shortLabel: "hygiene and wellness",
    },
    "digital-home-economics": {
      icon: "shopping",
      tone: "gold",
      heroLabel: "Home Economics",
      shortLabel: "clothing, nutrition, budget",
    },
    "digital-transport": {
      icon: "nature",
      tone: "blue",
      heroLabel: "Digital Transport",
      shortLabel: "transit, routes and tickets",
    },
    "digital-communication": {
      icon: "communication",
      tone: "teal",
      heroLabel: "Digital Communication",
      shortLabel: "calls and messaging",
    },
    "digital-safety": {
      icon: "services",
      tone: "violet",
      heroLabel: "Digital Safety",
      shortLabel: "habits and privacy",
    },
    "digital-public-services": {
      icon: "services",
      tone: "violet",
      heroLabel: "Digital Public Services",
      shortLabel: "citizen portal, banking, forms",
    },
  },
};

const moduleVisualsByLocale: Record<
  Locale,
  Record<string, { src: string; alt: string }>
> = {
  ru: {
    "diagnostic": {
      src: "/lesson-services.svg",
      alt: "Diagnostic assessment illustration",
    },
    "digital-health": {
      src: "/lesson-health.svg",
      alt: "Digital health module illustration",
    },
    "digital-home-economics": {
      src: "/lesson-shopping.svg",
      alt: "Digital life skills and budgeting illustration",
    },
    "digital-transport": {
      src: "/lesson-nature.svg",
      alt: "Digital transport and navigation illustration",
    },
    "digital-communication": {
      src: "/lesson-communication.svg",
      alt: "Digital communication and messaging illustration",
    },
    "digital-safety": {
      src: "/lesson-services.svg",
      alt: "Digital safety and cybersecurity illustration",
    },
    "digital-public-services": {
      src: "/lesson-services.svg",
      alt: "Digital public services illustration",
    },
  },
  uz: {
    "diagnostic": {
      src: "/lesson-services.svg",
      alt: "Diagnostic assessment illustration",
    },
    "digital-health": {
      src: "/lesson-health.svg",
      alt: "Digital health module illustration",
    },
    "digital-home-economics": {
      src: "/lesson-shopping.svg",
      alt: "Digital life skills and budgeting illustration",
    },
    "digital-transport": {
      src: "/lesson-nature.svg",
      alt: "Digital transport and navigation illustration",
    },
    "digital-communication": {
      src: "/lesson-communication.svg",
      alt: "Digital communication and messaging illustration",
    },
    "digital-safety": {
      src: "/lesson-services.svg",
      alt: "Digital safety and cybersecurity illustration",
    },
    "digital-public-services": {
      src: "/lesson-services.svg",
      alt: "Digital public services illustration",
    },
  },
};

const fallbackPresentationsByLocale: Record<Locale, Presentation[]> = {
  ru: [
    { icon: "services", tone: "blue", heroLabel: "Practical Skill", shortLabel: "bite-sized lesson" },
    { icon: "communication", tone: "teal", heroLabel: "Digital Service", shortLabel: "step-by-step topic" },
    { icon: "health", tone: "green", heroLabel: "Life Situation", shortLabel: "interactive practice" },
  ],
  uz: [
    { icon: "services", tone: "blue", heroLabel: "Practical Skill", shortLabel: "bite-sized lesson" },
    { icon: "communication", tone: "teal", heroLabel: "Digital Service", shortLabel: "step-by-step topic" },
    { icon: "health", tone: "green", heroLabel: "Life Situation", shortLabel: "interactive practice" },
  ],
};

type AudienceCard = {
  title: string;
  description: string;
  icon: ModuleIconName;
  tone: ModuleTone;
  image: string;
  imageAlt: string;
  href: string;
};

const audienceCardsByLocale: Record<Locale, AudienceCard[]> = {
  ru: [
    {
      title: "For Students",
      description:
        "Real-life digital simulators adapted for diverse needs: clear bite-sized steps, large controls, and calm pacing.",
      icon: "kids",
      tone: "blue",
      image: "/generated-images/audience-children.jpg",
      imageAlt: "Student learning digital skills on a tablet",
      href: "/program",
    },
    {
      title: "For Families",
      description:
        "Practice the exact same simulator at home together and reinforce independence in everyday situations.",
      icon: "parent",
      tone: "violet",
      image: "/generated-images/audience-family.jpg",
      imageAlt: "Family learning digital services together on a laptop",
      href: "/families",
    },
    {
      title: "For Educators",
      description:
        "Turn one lesson into multiple personalized experiences instantly with the Mosaic Adaptive Engine.",
      icon: "school",
      tone: "gold",
      image: "/generated-images/audience-school.jpg",
      imageAlt: "Educator teaching digital skills in an inclusive classroom",
      href: "/educators",
    },
  ],
  uz: [
    {
      title: "For Students",
      description:
        "Real-life digital simulators adapted for diverse needs: clear bite-sized steps, large controls, and calm pacing.",
      icon: "kids",
      tone: "blue",
      image: "/generated-images/audience-children.jpg",
      imageAlt: "Student learning digital skills on a tablet",
      href: "/program",
    },
    {
      title: "For Families",
      description:
        "Practice the exact same simulator at home together and reinforce independence in everyday situations.",
      icon: "parent",
      tone: "violet",
      image: "/generated-images/audience-family.jpg",
      imageAlt: "Family learning digital services together on a laptop",
      href: "/families",
    },
    {
      title: "For Educators",
      description:
        "Turn one lesson into multiple personalized experiences instantly with the Mosaic Adaptive Engine.",
      icon: "school",
      tone: "gold",
      image: "/generated-images/audience-school.jpg",
      imageAlt: "Educator teaching digital skills in an inclusive classroom",
      href: "/educators",
    },
  ],
};

const accessibilityItemsByLocale: Record<
  Locale,
  Array<{ title: string; copy: string; icon: ModuleIconName; tone: ModuleTone }>
> = {
  ru: [
    {
      title: "One step on screen",
      copy: "Each action is isolated so learners never feel overwhelmed by cluttered multi-step interfaces.",
      icon: "route",
      tone: "green",
    },
    {
      title: "High contrast and large text",
      copy: "Touch targets, fonts, and controls are optimized for tablets and mobile accessibility.",
      icon: "text",
      tone: "blue",
    },
    {
      title: "Guidance for adults",
      copy: "Lessons include helpful facilitator prompts for educators, parents, and support staff.",
      icon: "users",
      tone: "violet",
    },
  ],
  uz: [
    {
      title: "One step on screen",
      copy: "Each action is isolated so learners never feel overwhelmed by cluttered multi-step interfaces.",
      icon: "route",
      tone: "green",
    },
    {
      title: "High contrast and large text",
      copy: "Touch targets, fonts, and controls are optimized for tablets and mobile accessibility.",
      icon: "text",
      tone: "blue",
    },
    {
      title: "Guidance for adults",
      copy: "Lessons include helpful facilitator prompts for educators, parents, and support staff.",
      icon: "users",
      tone: "violet",
    },
  ],
};

const advantagesByLocale: Record<
  Locale,
  Array<{ title: string; copy: string; icon: ModuleIconName; tone: ModuleTone }>
> = {
  ru: [
    { title: "Practical Knowledge", copy: "Lessons are centered on authentic tasks rather than dry theory.", icon: "route", tone: "blue" },
    { title: "Clear Language", copy: "Instructions are written in calm, short sentences without complex jargon.", icon: "text", tone: "green" },
    { title: "Adaptive Engine", copy: "One original lesson transforms into multiple accessible profiles.", icon: "services", tone: "gold" },
    { title: "Universal Access", copy: "Materials are designed for students, families, schools, and care centers.", icon: "users", tone: "teal" },
    { title: "Digital Safety", copy: "Dedicated emphasis on safe online behavior, scam recognition, and privacy.", icon: "shield", tone: "violet" },
  ],
  uz: [
    { title: "Practical Knowledge", copy: "Lessons are centered on authentic tasks rather than dry theory.", icon: "route", tone: "blue" },
    { title: "Clear Language", copy: "Instructions are written in calm, short sentences without complex jargon.", icon: "text", tone: "green" },
    { title: "Adaptive Engine", copy: "One original lesson transforms into multiple accessible profiles.", icon: "services", tone: "gold" },
    { title: "Universal Access", copy: "Materials are designed for students, families, schools, and care centers.", icon: "users", tone: "teal" },
    { title: "Digital Safety", copy: "Dedicated emphasis on safe online behavior, scam recognition, and privacy.", icon: "shield", tone: "violet" },
  ],
};

const uiByLocale = {
  ru: {
    factsLabel: "Platform at a glance",
    chooseDirection: "Choose learning track",
    chooseDirectionHead: "Explore Curriculum Tracks",
    chooseDirectionSub: "Start with the life skill that matters most right now.",
    keyFacts: "Key Facts",
    openDirection: (title: string) => `Open ${title} track`,
    trainerEyebrow: "Interactive Simulator",
    trainerHead: "Try it right now",
    trainerLead: "A realistic chat simulation. Read the message and select the safest response.",
    seeAllDirections: "View all curriculum tracks",
    open: "Open",
    whyEyebrow: "Why Mosaic",
    whyTitle: "Practical learning without overwhelming complexity",
    fmtLessonCount: (count: number) => `${count} lessons`,
  },
  uz: {
    factsLabel: "Platform at a glance",
    chooseDirection: "Choose learning track",
    chooseDirectionHead: "Explore Curriculum Tracks",
    chooseDirectionSub: "Start with the life skill that matters most right now.",
    keyFacts: "Key Facts",
    openDirection: (title: string) => `Open ${title} track`,
    trainerEyebrow: "Interactive Simulator",
    trainerHead: "Try it right now",
    trainerLead: "A realistic chat simulation. Read the message and select the safest response.",
    seeAllDirections: "View all curriculum tracks",
    open: "Open",
    whyEyebrow: "Why Mosaic",
    whyTitle: "Practical learning without overwhelming complexity",
    fmtLessonCount: (count: number) => `${count} lessons`,
  },
} as const;

function getModulePresentation(
  locale: Locale,
  module: HomeModulePreview,
  index: number,
) {
  const map = modulePresentationsByLocale[locale];
  const fallbacks = fallbackPresentationsByLocale[locale];
  return map[module.slug] ?? fallbacks[index % fallbacks.length];
}

export function HomepageContent({
  draft,
  featuredLessonHref,
  homeModules,
  locale,
}: HomepageContentProps) {
  const ui = uiByLocale[locale];
  const audienceCards = audienceCardsByLocale[locale];
  const accessibilityItems = accessibilityItemsByLocale[locale];
  const advantages = advantagesByLocale[locale];
  const moduleVisuals = moduleVisualsByLocale[locale];

  const sections: Record<HomepageSectionId, ReactNode> = {
    hero: (
      <section className="home-hero home-reference-hero" key="hero">
        <div className="home-wrap">
          <div className="home-hero-layout">
            <div className="home-hero-copy">
              <div className="mosaic-hero-pill-badge">
                <span style={{ color: "var(--mosaic-orange)" }} aria-hidden="true">✦</span>
                <span>Adaptive learning for brighter futures</span>
              </div>

              <h1 className="mosaic-hero-title">
                One lesson shouldn&apos;t mean{" "}
                <span className="mosaic-hero-accent-orange">one way of learning.</span>
              </h1>

              <p className="mosaic-hero-lead">
                Mosaic adapts the same lesson into personalized learning experiences for different learner needs &mdash; from simpler language and read-aloud support to captions and visual descriptions.
              </p>

              <div className="mosaic-hero-actions">
                <Link
                  className="mosaic-btn-primary"
                  href="/lesson/messenger-message"
                >
                  Try a sample lesson &rarr;
                </Link>
                <a
                  className="mosaic-btn-secondary"
                  href="#how-it-works"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  See how it works
                </a>
              </div>
            </div>

            <div className="home-hero-showcase">
              <div className="mosaic-hero-photo-wrap">
                <div className="mosaic-hero-speech-bubble">
                  <div className="mosaic-bubble-rays" aria-hidden="true">
                    <span /><span /><span />
                  </div>
                  <p>Learning in a way that works for me</p>
                </div>

                <Image
                  src="/generated-images/hero-learner.jpg"
                  alt="Student learning with adaptive support on laptop"
                  width={1200}
                  height={900}
                  priority
                  className="mosaic-hero-student-img"
                  sizes="(max-width: 900px) 100vw, 620px"
                />

                <div className="mosaic-hero-floating-pills">
                  <div className="mosaic-hero-pill-item mosaic-pill-cream">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/></svg>
                    <strong>Simpler language</strong>
                  </div>
                  <div className="mosaic-hero-pill-item mosaic-pill-mint">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                    <strong>Read aloud</strong>
                  </div>
                  <div className="mosaic-hero-pill-item mosaic-pill-peach">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="4"/><path d="M10 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2"/><path d="M16 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2"/></svg>
                    <strong>Captions</strong>
                  </div>
                  <div className="mosaic-hero-pill-item mosaic-pill-mint">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    <strong>Visual descriptions</strong>
                  </div>
                  <div className="mosaic-hero-pill-item mosaic-pill-lavender">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22v-7"/><path d="M12 15c-3-1-5-3-5-7a7 7 0 0 1 10-5c0 4-2 6-5 7z"/></svg>
                    <strong>Less distractions</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ),
    program: (
      <section className="home-section home-audience-section" key="program">
        <div className="home-wrap">
          <div className="home-section-head">
            <div>
              <span className="home-eyebrow">{draft.program.eyebrow}</span>
              <h2>{draft.program.title}</h2>
              <p>{draft.program.summary}</p>
            </div>
            <div className="home-section-actions">
              <Link className="button button-primary" href={draft.program.primaryAction.href}>
                {draft.program.primaryAction.label}
              </Link>
              <Link
                className="button button-secondary"
                href={draft.program.secondaryAction.href || featuredLessonHref}
              >
                {draft.program.secondaryAction.label}
              </Link>
            </div>
          </div>

          <div className="home-audience-grid">
            {audienceCards.map((card) => (
              <Link
                className={`home-audience-card home-tone-${card.tone}`}
                href={card.href}
                key={card.title}
              >
                <span className="home-audience-media">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    width={640}
                    height={400}
                    sizes="(max-width: 900px) 100vw, 280px"
                  />
                </span>
                <span className="home-audience-body">
                  <span className="home-icon" aria-hidden="true">
                    <ModuleIcon name={card.icon} />
                  </span>
                  <strong>{card.title}</strong>
                  <span>{card.description}</span>
                </span>
                <span className="home-card-arrow" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    ),
    lessonPreview: (
      <section className="home-section home-access-section" key="lessonPreview">
        <div className="home-wrap">
          <div className="home-access-card">
            <div className="home-access-left">
              <div className="home-access-copy">
                <span className="home-eyebrow">{draft.lessonPreview.eyebrow}</span>
                <h2>{draft.lessonPreview.title}</h2>
              </div>

              <div className="home-access-features">
                {accessibilityItems.map((item) => (
                  <article
                    className={`home-access-feature home-tone-${item.tone}`}
                    key={item.title}
                  >
                    <span className="home-icon" aria-hidden="true">
                      <ModuleIcon name={item.icon} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </article>
                ))}
              </div>
            </div>

            <article className="home-trainers-card home-trainers-card--compact">
              <div className="home-trainers-head">
                <span className="home-eyebrow">{ui.trainerEyebrow}</span>
                <h3>{ui.trainerHead}</h3>
                <p>{ui.trainerLead}</p>
              </div>

              <HomeTrainerPreview />

              <Link
                className="home-card-link"
                href={draft.lessonPreview.action.href || featuredLessonHref}
              >
                {draft.lessonPreview.action.label}
                <span aria-hidden="true">
                  <ArrowIcon />
                </span>
              </Link>
            </article>
          </div>
        </div>
      </section>
    ),
    roles: (
      <section className="home-section home-popular-section" key="roles">
        <div className="home-wrap">
          <div className="home-section-head">
            <div>
              <span className="home-eyebrow">{draft.roles.eyebrow}</span>
              <h2>{draft.roles.title}</h2>
              <p>{draft.roles.summary}</p>
            </div>
            <div className="home-section-actions">
              <Link className="button button-secondary" href="/program">
                {ui.seeAllDirections}
              </Link>
            </div>
          </div>

          <div className="home-module-grid">
            {homeModules.map((module, index) => {
              const presentation = getModulePresentation(locale, module, index);
              const visual = moduleVisuals[module.slug] ?? {
                src: module.image,
                alt: module.imageAlt,
              };
              const isIllustration = visual.src.endsWith(".svg");

              return (
                <Link
                  aria-label={ui.openDirection(module.title)}
                  className={`home-module-card home-tone-${presentation.tone}`}
                  href="/program"
                  key={module.slug}
                >
                  <div
                    className={`home-module-image ${
                      isIllustration ? "home-module-image-illustration" : ""
                    }`}
                  >
                    <Image
                      src={visual.src}
                      alt={visual.alt}
                      width={520}
                      height={360}
                      unoptimized={isIllustration}
                      sizes="(max-width: 900px) 100vw, 220px"
                    />
                  </div>

                  <div className="home-module-card-head">
                    <span className="home-icon" aria-hidden="true">
                      <ModuleIcon name={presentation.icon} />
                    </span>
                    <div className="home-module-meta">
                      <span>{module.hours}</span>
                      <strong>{ui.fmtLessonCount(module.lessonCount)}</strong>
                    </div>
                  </div>

                  <h3>{module.title}</h3>
                  <p>{module.description}</p>

                  <span className="home-card-link">
                    {ui.open}
                    <span aria-hidden="true">
                      <ArrowIcon />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="home-support-grid">
            {draft.roles.cards.map((card, index) => (
              <article
                className={`home-support-card ${
                  index === 0 ? "home-support-school" : "home-support-family"
                }`}
                key={`${card.id}-${card.title}`}
              >
                <div className="home-support-copy">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <ul className="home-topic-list">
                    {card.bullets.slice(0, 3).map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <Link className="button button-primary" href={card.action.href}>
                    {card.action.label}
                  </Link>
                </div>
                <div className="home-support-visual" aria-hidden="true" />
              </article>
            ))}
          </div>

          <div className="home-why-block">
            <div className="home-section-head home-section-head-compact">
              <div>
                <span className="home-eyebrow">{ui.whyEyebrow}</span>
                <h2>{ui.whyTitle}</h2>
              </div>
            </div>
            <div className="home-why-grid">
              {advantages.map((advantage) => (
                <article
                  className={`home-why-card home-tone-${advantage.tone}`}
                  key={advantage.title}
                >
                  <span className="home-icon" aria-hidden="true">
                    <ModuleIcon name={advantage.icon} />
                  </span>
                  <h3>{advantage.title}</h3>
                  <p>{advantage.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    ),
    finalCta: (
      <section className="home-final-cta home-final-reference" key="finalCta">
        <div className="home-wrap home-final-grid">
          <div>
            <span className="home-eyebrow">{draft.finalCta.eyebrow}</span>
            <h2>{draft.finalCta.title}</h2>
            <p>{draft.finalCta.summary}</p>
            <div className="home-final-actions">
              <Link className="button button-primary" href={draft.finalCta.primaryAction.href}>
                {draft.finalCta.primaryAction.label}
              </Link>
              <Link className="button button-secondary" href={draft.finalCta.secondaryAction.href}>
                {draft.finalCta.secondaryAction.label}
              </Link>
            </div>
          </div>
          <div className="home-final-device" aria-hidden="true">
            <div className="home-laptop-screen">
              <span>Mosaic</span>
            </div>
            <div className="home-phone-screen">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </section>
    ),
  };

  return (
    <main className="home-page home-reference-page" style={{ background: "#FFFFFF" }}>
      {sections.hero}
      <HomepageAdaptationDemo />
    </main>
  );
}
