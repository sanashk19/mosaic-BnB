import Image from "next/image";
import Link from "next/link";
import { NationalEmblem } from "@/components/national-emblem";
import { getLocale } from "@/lib/i18n";

const englishDict = {
  title: "About Mosaic",
  eyebrow: "About Mosaic",
  heroHeading:
    "Mosaic — One lesson. Every learner.",
  heroLead:
    "An adaptive learning platform designed to make digital life skills accessible for every student. Rather than passive quizzes, learners practice real-world actions in guided, interactive simulators tailored to their unique needs.",
  heroAlt: "Students learning digital skills on laptops in an inclusive classroom",
  btnProgram: "Explore curriculum",
  btnContacts: "Contact our team",
  principlesEyebrow: "Core Principles",
  principlesHeading:
    "Calm, predictable, and adaptive by design.",
  principles: [
    {
      title: "One screen = one action",
      copy:
        "Instead of cluttered, branching screens, Mosaic guides each learner with short, bite-sized steps without cognitive overload.",
    },
    {
      title: "Authentic practice, not multiple choice",
      copy:
        "Learners perform real digital actions: sending messages, making simulated payments, and completing authentic digital tasks.",
    },
    {
      title: "Educator-led, platform-supported",
      copy:
        "Mosaic empowers teachers with the Adaptive Lesson Studio to reach every learner without preparing endless lesson variations.",
    },
  ],
  scienceEyebrow: "Pedagogical Foundation",
  scienceHeading:
    "Built on established special-education and life-skills research.",
  scienceP1:
    "Research demonstrates that digital independence develops fastest when learners engage with authentic instructional texts and guided simulation rather than abstract theory.",
  scienceP2:
    "That means learners shouldn't just read about paying for transit or sending an email — they should practice it safely in a true-to-life interactive simulator.",
  roadmapTitle: "Platform Roadmap",
  roadmap: [
    "Expanding the simulator library: email client, mobile banking, and citizen services.",
    "Teacher workflow: adaptive learner profiles, class pacing, and live progress observation.",
    "Multilingual and multisensory support: spoken audio, captioning, and dyslexia-friendly typography.",
  ],
};

const dict = {
  ru: englishDict,
  uz: englishDict,
} as const;

export async function generateMetadata() {
  const locale = await getLocale();
  return { title: dict[locale].title };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const t = dict[locale];
  return (
    <main className="marketing-page">
      <section className="marketing-hero">
        <div className="marketing-wrap marketing-hero-grid">
          <div className="marketing-copy">
            <NationalEmblem className="marketing-emblem" />
            <span className="eyebrow">{t.eyebrow}</span>
            <h1>{t.heroHeading}</h1>
            <p>{t.heroLead}</p>
            <div className="marketing-actions">
              <Link className="button button-primary" href="/program">
                {t.btnProgram}
              </Link>
              <Link className="button button-secondary" href="/contacts">
                {t.btnContacts}
              </Link>
            </div>
          </div>

          <figure className="marketing-figure">
            <Image
              src="/generated-images/home-hero-learning.jpg"
              alt={t.heroAlt}
              width={1120}
              height={840}
              loading="eager"
              fetchPriority="high"
            />
          </figure>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-wrap">
          <div className="marketing-section-head">
            <div>
              <span className="eyebrow">{t.principlesEyebrow}</span>
              <h2>{t.principlesHeading}</h2>
            </div>
          </div>

          <div className="marketing-card-grid">
            {t.principles.map((item) => (
              <article key={item.title} className="marketing-card">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section marketing-section-soft">
        <div className="marketing-wrap marketing-split">
          <div className="marketing-copy">
            <span className="eyebrow">{t.scienceEyebrow}</span>
            <h2>{t.scienceHeading}</h2>
            <p>{t.scienceP1}</p>
            <p>{t.scienceP2}</p>
          </div>

          <div className="marketing-side-note">
            <p className="marketing-side-note-title">{t.roadmapTitle}</p>
            <ul className="marketing-bullet-list">
              {t.roadmap.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
