import Image from "next/image";
import Link from "next/link";
import { getLocale } from "@/lib/i18n";

const englishDict = {
  title: "For Educators & Schools",
  eyebrow: "For Educators",
  heroHeading: "One lesson. Every learner. Zero extra lesson prep.",
  heroLead:
    "Transform any lesson into multiple personalized accessibility experiences with the Mosaic Adaptive Engine. Built for inclusive classrooms: calm, predictable, and tailored to each student's needs.",
  ctaContact: "Get in touch with our team",
  ctaProgram: "Explore curriculum",
  heroImageAlt: "Educator guiding an inclusive digital literacy lesson",

  formatsEyebrow: "Classroom Formats",
  formatsHeading: "Designed for guided classroom teaching, small groups, or independent pacing.",
  usageFormats: [
    "Inclusive classroom sessions: educator guides while learners use adapted simulators on their own devices.",
    "Individual 1-on-1 pacing with repetition, read-aloud support, and simplified language.",
    "Small-group breakout sessions focusing on authentic life-skill practice.",
  ],
  adultSideTitle: "Educator Workspace",
  adultSideCopy:
    "Review upcoming modules, manage learner support profiles, launch class sessions, and observe progress without navigating complex menus.",

  benefitsEyebrow: "Why Teachers Choose Mosaic",
  benefitsHeading: "A clear practical framework that saves time and includes every student.",
  educatorBenefits: [
    {
      title: "Curriculum pre-structured into tracks",
      copy:
        "No need to design life-skills lessons from scratch: topics, simulated practice, and assessments are pre-built.",
    },
    {
      title: "Instant accessibility adaptation",
      copy:
        "One click generates customized versions for dyslexia, visual needs, and hearing accommodations.",
    },
    {
      title: "Built for cognitive calm",
      copy:
        "Large elements, bite-sized steps, and distraction-free layouts prevent sensory and cognitive overload.",
    },
  ],

  connectEyebrow: "Pilot & Onboarding",
  connectHeading: "Bring Mosaic to your school, classroom, or center.",
  connectionSteps: [
    "Tell us about your school, student age group, and learning goals.",
    "Let us know if you need pilot classroom access or pedagogical onboarding.",
    "Choose your preferred implementation: whole class, small group, or home integration.",
  ],
  nextStepTitle: "Next Steps",
  writeTeam: "Contact our team",
  createDemo: "Create teacher account",
};

const dict = {
  ru: englishDict,
  uz: englishDict,
} as const;

export async function generateMetadata() {
  const locale = await getLocale();
  return { title: dict[locale].title };
}

export default async function EducatorsPage() {
  const locale = await getLocale();
  const t = dict[locale];

  return (
    <main className="marketing-page">
      <section className="marketing-hero">
        <div className="marketing-wrap marketing-hero-grid">
          <div className="marketing-copy">
            <span className="eyebrow">{t.eyebrow}</span>
            <h1>{t.heroHeading}</h1>
            <p>{t.heroLead}</p>
            <div className="marketing-actions">
              <Link className="button button-primary" href="/contacts">
                {t.ctaContact}
              </Link>
              <Link className="button button-secondary" href="/program">
                {t.ctaProgram}
              </Link>
            </div>
          </div>

          <figure className="marketing-figure">
            <Image
              src="/generated-images/audience-school.jpg"
              alt={t.heroImageAlt}
              width={1120}
              height={840}
              loading="eager"
              fetchPriority="high"
            />
          </figure>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-wrap marketing-split">
          <div className="marketing-copy">
            <span className="eyebrow">{t.formatsEyebrow}</span>
            <h2>{t.formatsHeading}</h2>
            <ul className="marketing-bullet-list">
              {t.usageFormats.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="marketing-side-note">
            <p className="marketing-side-note-title">{t.adultSideTitle}</p>
            <p>{t.adultSideCopy}</p>
          </div>
        </div>
      </section>

      <section className="marketing-section marketing-section-soft">
        <div className="marketing-wrap">
          <div className="marketing-section-head">
            <div>
              <span className="eyebrow">{t.benefitsEyebrow}</span>
              <h2>{t.benefitsHeading}</h2>
            </div>
          </div>

          <div className="marketing-card-grid">
            {t.educatorBenefits.map((item) => (
              <article key={item.title} className="marketing-card">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-wrap marketing-split">
          <div className="marketing-copy">
            <span className="eyebrow">{t.connectEyebrow}</span>
            <h2>{t.connectHeading}</h2>
            <ol className="marketing-number-list">
              {t.connectionSteps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>

          <div className="marketing-side-note">
            <p className="marketing-side-note-title">{t.nextStepTitle}</p>
            <div className="marketing-link-list">
              <Link href="/contacts">{t.writeTeam}</Link>
              <Link href="/register">{t.createDemo}</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
