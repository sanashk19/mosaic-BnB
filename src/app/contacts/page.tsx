import Image from "next/image";
import Link from "next/link";
import { getLocale } from "@/lib/i18n";

const dict = {
  ru: {
    title: "Contact Mosaic",
    badge: "Contact Mosaic",
    heroHeading: "Let's make learning more inclusive, together.",
    heroLead:
      "Have a question about Mosaic, accessibility, school partnerships or the learning experience? We'd love to hear from you.",
    ctaEmail: "Email us",
    heroAlt: "Educator and learners communicating in an inclusive classroom setting",
    cards: [
      {
        id: "support",
        title: "User Support",
        accentClass: "contact-card--lavender",
        email: "sanashk019@gmail.com",
        note: "Questions about Mosaic, accessibility, learning tools or the prototype.",
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        ),
      },
      {
        id: "partnerships",
        title: "Partnerships",
        accentClass: "contact-card--mint",
        email: "sanashk019@gmail.com",
        note: "Schools, educators, organizations and accessibility initiatives.",
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
      {
        id: "inquiries",
        title: "Inquiries",
        accentClass: "contact-card--peach",
        email: "sanashk019@gmail.com",
        note: "Questions about Mosaic and the learning platform.",
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        ),
      },
    ],
    howEyebrow: "How to reach us",
    howHeading:
      "To get a response faster, send a short message with your context.",
    steps: [
      "Describe who you are: family, educator, school, center or partner.",
      "Briefly indicate your question or interest: curriculum, accessibility, or classroom pilot.",
      "Send us an email at sanashk019@gmail.com and we will respond promptly.",
    ],
    docsTitle: "Documents",
    docsTerms: "Terms of Service",
    docsPrivacy: "Privacy Policy",
    docsCookies: "Cookies",
  },
  uz: {
    title: "Contact Mosaic",
    badge: "Contact Mosaic",
    heroHeading: "Let's make learning more inclusive, together.",
    heroLead:
      "Have a question about Mosaic, accessibility, school partnerships or the learning experience? We'd love to hear from you.",
    ctaEmail: "Email us",
    heroAlt: "Educator and learners communicating in an inclusive classroom setting",
    cards: [
      {
        id: "support",
        title: "User Support",
        accentClass: "contact-card--lavender",
        email: "sanashk019@gmail.com",
        note: "Questions about Mosaic, accessibility, learning tools or the prototype.",
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        ),
      },
      {
        id: "partnerships",
        title: "Partnerships",
        accentClass: "contact-card--mint",
        email: "sanashk019@gmail.com",
        note: "Schools, educators, organizations and accessibility initiatives.",
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
      {
        id: "inquiries",
        title: "Inquiries",
        accentClass: "contact-card--peach",
        email: "sanashk019@gmail.com",
        note: "Questions about Mosaic and the learning platform.",
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        ),
      },
    ],
    howEyebrow: "How to reach us",
    howHeading:
      "To get a response faster, send a short message with your context.",
    steps: [
      "Describe who you are: family, educator, school, center or partner.",
      "Briefly indicate your question or interest: curriculum, accessibility, or classroom pilot.",
      "Send us an email at sanashk019@gmail.com and we will respond promptly.",
    ],
    docsTitle: "Documents",
    docsTerms: "Terms of Service",
    docsPrivacy: "Privacy Policy",
    docsCookies: "Cookies",
  },
} as const;

export async function generateMetadata() {
  const locale = await getLocale();
  return { title: dict[locale].title };
}

export default async function ContactsPage() {
  const locale = await getLocale();
  const t = dict[locale];
  return (
    <main className="marketing-page">
      <section className="marketing-hero">
        <div className="marketing-wrap marketing-hero-grid">
          <div className="marketing-copy">
            <span className="eyebrow">{t.badge}</span>
            <h1>{t.heroHeading}</h1>
            <p>{t.heroLead}</p>
            <div className="marketing-actions" style={{ marginTop: "24px" }}>
              <a className="button button-primary" href="mailto:sanashk019@gmail.com">
                {t.ctaEmail}
              </a>
            </div>
          </div>

          <figure className="marketing-figure">
            <Image
              src="/generated-images/audience-inclusive.jpg"
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
          <div className="marketing-card-grid">
            {t.cards.map((item) => (
              <article key={item.id} className={`marketing-card contact-card ${item.accentClass}`}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                  <h3 style={{ margin: 0 }}>{item.title}</h3>
                  <div className="contact-card-badge" style={{ padding: "8px", borderRadius: "8px", display: "inline-flex" }}>
                    {item.icon}
                  </div>
                </div>
                <a
                  href={`mailto:${item.email}`}
                  className="marketing-contact-value"
                  style={{ color: "var(--mosaic-green, #506847)", fontWeight: 700, textDecoration: "none" }}
                >
                  {item.email}
                </a>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section marketing-section-soft">
        <div className="marketing-wrap marketing-split">
          <div className="marketing-copy">
            <span className="eyebrow">{t.howEyebrow}</span>
            <h2>{t.howHeading}</h2>
            <ol className="marketing-number-list">
              {t.steps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>

          <div className="marketing-side-note">
            <p className="marketing-side-note-title">{t.docsTitle}</p>
            <div className="marketing-link-list">
              <Link href="/terms">{t.docsTerms}</Link>
              <Link href="/privacy">{t.docsPrivacy}</Link>
              <Link href="/cookies">{t.docsCookies}</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

