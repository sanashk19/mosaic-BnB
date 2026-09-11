import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, UiIcon, type UiIconName } from "@/components/ui-icons";
import { getProgramModules, getPlatformHighlights } from "@/data/program";
import { getLocale, type Locale } from "@/lib/i18n";

const dict = {
  ru: {
    title: "Программа",
    eyebrow: "Программа обучения",
    heroHeading: "Пять направлений цифровых навыков для жизни в Узбекистане.",
    heroLead:
      "Уроки собраны вокруг реальных ситуаций: покупки, связь, здоровье, безопасные действия и работа с государственными сервисами. Можно смотреть программу без входа и затем продолжить обучение в кабинете.",
    ctaStart: "Начать обучение",
    ctaCabinet: "Открыть кабинет",
    summaryAriaLabel: "Кратко о программе",
    summaryLessons: "уроков",
    summaryDirections: "направлений",
    summaryLangCode: "RU",
    summaryLangLabel: "русский язык",

    directionsEyebrow: "Направления",
    directionsHeading: "Каждый раздел ведет к понятному практическому действию.",
    whatLearn: "Что узнаете",
    whatPractice: "Что потренируете",
    openFirstLesson: "Открыть первый урок",

    formatEyebrow: "Формат",
    formatHeading: "Программа устроена так, чтобы не перегружать пользователя.",
    afterLogin: "После входа",
    afterLoginCopy:
      "В кабинете сохраняется прогресс, открывается следующий урок и появляется отдельная рабочая область для семьи, ученика или педагога.",
    loginLink: "Войти в кабинет",
    registerLink: "Создать профиль",
  },
  uz: {
    title: "Dastur",
    eyebrow: "Oʻquv dasturi",
    heroHeading: "Oʻzbekistondagi hayot uchun raqamli koʻnikmalarning besh yoʻnalishi.",
    heroLead:
      "Darslar haqiqiy vaziyatlar atrofida yigʻilgan: xaridlar, aloqa, salomatlik, xavfsiz harakatlar va davlat xizmatlari bilan ishlash. Dasturni kirishsiz koʻrish va keyin shaxsiy kabinetda oʻqishni davom ettirish mumkin.",
    ctaStart: "Oʻqishni boshlash",
    ctaCabinet: "Kabinetni ochish",
    summaryAriaLabel: "Dastur haqida qisqacha",
    summaryLessons: "ta dars",
    summaryDirections: "ta yoʻnalish",
    summaryLangCode: "UZ",
    summaryLangLabel: "oʻzbek tili",

    directionsEyebrow: "Yoʻnalishlar",
    directionsHeading: "Har bir boʻlim tushunarli amaliy harakatga olib boradi.",
    whatLearn: "Nimani bilib olasiz",
    whatPractice: "Nimani mashq qilasiz",
    openFirstLesson: "Birinchi darsni ochish",

    formatEyebrow: "Format",
    formatHeading: "Dastur foydalanuvchini ortiqcha yuklamaslik uchun tuzilgan.",
    afterLogin: "Kirgandan keyin",
    afterLoginCopy:
      "Shaxsiy kabinetda yutuqlar saqlanadi, keyingi dars ochiladi va oila, oʻquvchi yoki pedagog uchun alohida ish maydoni paydo boʻladi.",
    loginLink: "Kabinetga kirish",
    registerLink: "Profil yaratish",
  },
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

function formatLessonCount(count: number, locale: Locale) {
  if (locale === "uz") {
    return `${count} ta dars`;
  }

  const mod100 = count % 100;
  const mod10 = count % 10;

  if (mod100 >= 11 && mod100 <= 14) {
    return `${count} уроков`;
  }

  if (mod10 === 1) {
    return `${count} урок`;
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return `${count} урока`;
  }

  return `${count} уроков`;
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
