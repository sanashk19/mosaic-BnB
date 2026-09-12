import Image from "next/image";
import Link from "next/link";
import { getLocale } from "@/lib/i18n";

const englishDict = {
  title: "For Families",
  eyebrow: "For Families",
  heroHeading: "Reinforce at home what your child discovers in the classroom.",
  heroLead:
    "Learners work with Mosaic at school alongside their teacher. At home, families can practice the exact same interactive simulator together and build real-world digital independence.",
  ctaCreate: "Create family account",
  ctaLessons: "Explore lessons",
  heroImageAlt: "Parent helping a child learn on a tablet at home",

  stepsEyebrow: "Home Practice",
  stepsHeading: "Three simple steps to support your child's progress.",
  startSteps: [
    "Ask the teacher which module was practiced in class — and open it together at home.",
    "Go through the simulator together: take your time, repeat steps as often as needed, and celebrate small wins.",
    "Practice the action in real life — sending a message, checking a route, or shopping safely.",
  ],
  adultSideTitle: "Family Dashboard",
  adultSideCopy:
    "Track your child's learning journey, view personalized accommodations, and access practical home guidance in one simple place.",

  featuresEyebrow: "Why Families Love Mosaic",
  featuresHeading: "Calm pacing, practical guidance, and real-life transfer.",
  familyFeatures: [
    {
      title: "Clear learning route",
      copy:
        "Easily see which lessons have been completed at school, what to practice at home, and what comes next.",
    },
    {
      title: "Calm, self-paced learning",
      copy:
        "Bite-sized steps and distraction-free screens mean zero rush or stress. Repeat any step as many times as needed.",
    },
    {
      title: "Real-world independence",
      copy:
        "Simulator practice directly bridges to everyday digital habits like messaging relatives and verifying web safety.",
    },
  ],

  faqEyebrow: "Frequently Asked Questions",
  faqHeading: "Everything you need to know before getting started.",
  faqItems: [
    "Do I need to be a digital expert? No — the simulator guides every step with simple prompts, you're simply there to encourage.",
    "What if my child feels stuck? Take a pause, switch to an audio or simplified reading profile, and repeat without rush.",
    "Where is progress saved? Securely in your dashboard under your child's personalized profile.",
  ],
  helpTitle: "Need Assistance?",
  contactSupport: "Contact support",
  loginCabinet: "Log in to dashboard",
};

const dict = {
  ru: englishDict,
  uz: englishDict,
} as const;

export async function generateMetadata() {
  const locale = await getLocale();
  return { title: dict[locale].title };
}

export default async function FamiliesPage() {
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
              <Link className="button button-primary" href="/register">
                {t.ctaCreate}
              </Link>
              <Link className="button button-secondary" href="/program">
                {t.ctaLessons}
              </Link>
            </div>
          </div>

          <figure className="marketing-figure">
            <Image
              src="/generated-images/hero-families.jpg"
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
            <span className="eyebrow">{t.stepsEyebrow}</span>
            <h2>{t.stepsHeading}</h2>
            <ol className="marketing-number-list">
              {t.startSteps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
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
              <span className="eyebrow">{t.featuresEyebrow}</span>
              <h2>{t.featuresHeading}</h2>
            </div>
          </div>

          <div className="marketing-card-grid">
            {t.familyFeatures.map((item) => (
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
            <span className="eyebrow">{t.faqEyebrow}</span>
            <h2>{t.faqHeading}</h2>
            <ul className="marketing-bullet-list">
              {t.faqItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="marketing-side-note">
            <p className="marketing-side-note-title">{t.helpTitle}</p>
            <div className="marketing-link-list">
              <Link href="/contacts">{t.contactSupport}</Link>
              <Link href="/login">{t.loginCabinet}</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
