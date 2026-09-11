import Image from "next/image";
import Link from "next/link";
import { getLocale } from "@/lib/i18n";

const dict = {
  ru: {
    title: "Семьям",
    eyebrow: "Семьям",
    heroHeading: "Дома можно закрепить то, что ребёнок начал на уроке СБО.",
    heroLead:
      "Ребёнок работает с платформой на уроке под руководством учителя. Семья может повторить пройденное дома — пройти тот же тренажёр вместе и помочь закрепить навык в реальной ситуации.",
    ctaCreate: "Создать профиль",
    ctaLessons: "Посмотреть уроки",
    heroImageAlt: "Семья помогает ребенку проходить цифровой урок за ноутбуком",

    stepsEyebrow: "Как закреплять дома",
    stepsHeading: "Три шага, чтобы поддержать то, что начал учитель.",
    startSteps: [
      "Спросите у учителя СБО, какой модуль проходили на уроке — и откройте его дома вместе с ребёнком.",
      "Пройдите тренажёр вместе: не спешите, повторяйте шаги столько раз, сколько нужно.",
      "Попробуйте повторить действие в реальной ситуации — в магазине, с телефоном, на сайте.",
    ],
    adultSideTitle: "Что видно взрослому",
    adultSideCopy:
      "Следующий урок, общий прогресс, профиль ребенка и советы по прохождению материала собраны в кабинете и не требуют отдельного поиска по сайту.",

    featuresEyebrow: "Что дает раздел",
    featuresHeading: "Для семьи важны практические ответы и спокойный темп.",
    familyFeatures: [
      {
        title: "Кабинет показывает маршрут",
        copy:
          "Видно, что пройдено на уроке, что повторить дома и какой следующий модуль по программе.",
      },
      {
        title: "Темп можно держать спокойным",
        copy:
          "Тренажёр разбит на короткие шаги, экран не перегружен, можно повторить любой шаг столько раз, сколько нужно.",
      },
      {
        title: "Навык переносится в жизнь",
        copy:
          "После совместного повторения в тренажёре проще попробовать то же самое в реальной ситуации рядом с ребёнком.",
      },
    ],

    faqEyebrow: "Частые вопросы",
    faqHeading: "Базовые вопросы закрываются до первого входа в кабинет.",
    faqItems: [
      "Нужно ли заново объяснять материал дома? Нет — тренажёр сам ведёт по шагам, вы просто рядом.",
      "Что делать, если ребёнку трудно? Проходите урок вместе, делайте паузы и повторяйте шаги без спешки.",
      "Где смотреть результаты? В кабинете — там виден прогресс по модулям и пройденные темы.",
    ],
    helpTitle: "Нужна помощь",
    contactSupport: "Связаться с поддержкой",
    loginCabinet: "Войти в кабинет",
  },
  uz: {
    title: "Oilalar uchun",
    eyebrow: "Oilalar uchun",
    heroHeading: "Bola IMM darsida boshlagan narsani uyda mustahkamlash mumkin.",
    heroLead:
      "Bola platforma bilan darsda oʻqituvchi rahbarligida ishlaydi. Oila oʻtilgan mavzuni uyda takrorlashi mumkin — xuddi shu mashqni birga bajarib, koʻnikmani haqiqiy vaziyatda mustahkamlashga yordam beradi.",
    ctaCreate: "Profil yaratish",
    ctaLessons: "Darslarni koʻrish",
    heroImageAlt: "Oila bolaga noutbukda raqamli darsni oʻtishga yordam bermoqda",

    stepsEyebrow: "Uyda qanday mustahkamlash kerak",
    stepsHeading: "Oʻqituvchi boshlagan ishni qoʻllab-quvvatlash uchun uch qadam.",
    startSteps: [
      "IMM oʻqituvchisidan darsda qaysi modul oʻtilganini soʻrang — va uni uyda bola bilan birga oching.",
      "Mashqni birga bajaring: shoshmang, qadamlarni kerakli marta takrorlang.",
      "Harakatni haqiqiy vaziyatda takrorlashga urinib koʻring — doʻkonda, telefonda, saytda.",
    ],
    adultSideTitle: "Kattalar nimani koʻradi",
    adultSideCopy:
      "Keyingi dars, umumiy yutuqlar, bola profili va materialni oʻtish boʻyicha maslahatlar shaxsiy kabinetda yigʻilgan va saytdan alohida qidirishni talab qilmaydi.",

    featuresEyebrow: "Boʻlim nima beradi",
    featuresHeading: "Oila uchun amaliy javoblar va tinch sur’at muhim.",
    familyFeatures: [
      {
        title: "Kabinet yoʻnalishni koʻrsatadi",
        copy:
          "Darsda nima oʻtilgani, uyda nimani takrorlash kerakligi va dastur boʻyicha keyingi modul koʻrinib turadi.",
      },
      {
        title: "Sur’atni tinch saqlash mumkin",
        copy:
          "Mashq qisqa qadamlarga boʻlingan, ekran ortiqcha emas, har bir qadamni kerakli marta takrorlash mumkin.",
      },
      {
        title: "Koʻnikma hayotga oʻtadi",
        copy:
          "Mashqda birga takrorlagandan keyin, bola yonida xuddi shu narsani haqiqiy vaziyatda sinab koʻrish osonroq.",
      },
    ],

    faqEyebrow: "Tez-tez beriladigan savollar",
    faqHeading: "Asosiy savollar kabinetga birinchi kirishdan oldin yopiladi.",
    faqItems: [
      "Materialni uyda qaytadan tushuntirish kerakmi? Yoʻq — mashq oʻzi qadam-baqadam yetaklaydi, siz shunchaki yonida boʻlasiz.",
      "Bolaga qiyin boʻlsa nima qilish kerak? Darsni birga bajaring, tanaffuslar qiling va qadamlarni shoshilmasdan takrorlang.",
      "Natijalarni qayerda koʻrish mumkin? Shaxsiy kabinetda — u yerda modullar boʻyicha yutuqlar va oʻtilgan mavzular koʻrinadi.",
    ],
    helpTitle: "Yordam kerakmi",
    contactSupport: "Yordam xizmati bilan bogʻlanish",
    loginCabinet: "Kabinetga kirish",
  },
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
              src="/generated-images/audience-family.jpg"
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
