import Image from "next/image";
import Link from "next/link";
import { NationalEmblem } from "@/components/national-emblem";
import { getLocale } from "@/lib/i18n";

const dict = {
  ru: {
    title: "О платформе",
    eyebrow: "О платформе",
    heroHeading:
      "uquvli.uz — учебная платформа для уроков СБО в коррекционных школах.",
    heroLead:
      "Создана для детей с лёгкой умственной отсталостью (F70). Каждый урок — это тренажёр конкретного цифрового действия под руководством учителя, а не тест с вариантами ответа.",
    heroAlt: "Дети изучают цифровые сервисы за ноутбуком",
    btnProgram: "Посмотреть программу",
    btnContacts: "Связаться с командой",
    principlesEyebrow: "Принципы",
    principlesHeading:
      "Интерфейс и методика адаптированы под особенности детей с F70.",
    principles: [
      {
        title: "Один экран = одно действие",
        copy:
          "Вместо сложных ветвящихся сценариев платформа проводит ребёнка короткими, предсказуемыми шагами без лишних отвлечений.",
      },
      {
        title: "Тренажёр, а не тест",
        copy:
          "Ребёнок не выбирает ответ из списка — он выполняет реальное действие: отправляет сообщение, оплачивает покупку, заполняет заявление.",
      },
      {
        title: "Учитель ведёт, платформа поддерживает",
        copy:
          "Урок проводится учителем СБО в классе. Платформа обеспечивает структуру и тренажёр — педагог не тратит время на подготовку материалов.",
      },
    ],
    scienceEyebrow: "Научная база",
    scienceHeading:
      "Платформа создана как инструмент диссертационного исследования.",
    scienceP1:
      "Исследование О.А. Марковой доказывает: цифровая грамотность у детей с F70 развивается значительно лучше через работу с информационными и инструктивными цифровыми текстами, чем через традиционные методы СБО.",
    scienceP2:
      "Это значит: ребёнок должен не читать про оплату, а оплачивать — в тренажёре, который повторяет интерфейс реального сервиса.",
    roadmapTitle: "Развитие",
    roadmap: [
      "Расширение библиотеки тренажёров: email-клиент, банковское приложение, портал госуслуг.",
      "Инструменты для учителя: маршрут класса, наблюдения, отметки о прохождении.",
      "Поддержка узбекского языка интерфейса для классов с соответствующим контингентом.",
    ],
  },
  uz: {
    title: "Platforma haqida",
    eyebrow: "Platforma haqida",
    heroHeading:
      "uquvli.uz — maxsus maktablardagi IHTM darslari uchun oʻquv platformasi.",
    heroLead:
      "Yengil aqliy zaiflikka ega bolalar (F70) uchun yaratilgan. Har bir dars — javob variantlari roʻyxatidan tanlash emas, balki oʻqituvchi rahbarligida aniq raqamli amalni bajarish mashqi.",
    heroAlt: "Bolalar noutbukda raqamli xizmatlarni oʻrganmoqda",
    btnProgram: "Dasturni koʻrish",
    btnContacts: "Jamoa bilan bogʻlanish",
    principlesEyebrow: "Tamoyillar",
    principlesHeading:
      "Interfeys va metodika F70 bolalarning xususiyatlariga moslangan.",
    principles: [
      {
        title: "Bitta ekran = bitta amal",
        copy:
          "Murakkab tarmoqlangan stsenariylar oʻrniga platforma bolani ortiqcha chalgʻitishlarsiz qisqa va aniq qadamlar bilan olib boradi.",
      },
      {
        title: "Test emas, mashq qurilmasi",
        copy:
          "Bola roʻyxatdan javob tanlamaydi — u haqiqiy amalni bajaradi: xabar yuboradi, xaridni toʻlaydi, arizani toʻldiradi.",
      },
      {
        title: "Oʻqituvchi yetaklaydi, platforma qoʻllab-quvvatlaydi",
        copy:
          "Darsni sinfda IHTM oʻqituvchisi olib boradi. Platforma tuzilma va mashq qurilmasini taʼminlaydi — pedagog material tayyorlashga vaqt sarflamaydi.",
      },
    ],
    scienceEyebrow: "Ilmiy asos",
    scienceHeading:
      "Platforma dissertatsion tadqiqot quroli sifatida yaratilgan.",
    scienceP1:
      "O.A. Markovaning tadqiqoti shuni isbotlaydi: F70 bolalarda raqamli savodxonlik anʼanaviy IHTM usullariga qaraganda axborot va koʻrsatma beruvchi raqamli matnlar bilan ishlash orqali ancha yaxshi rivojlanadi.",
    scienceP2:
      "Buning maʼnosi: bola toʻlov haqida oʻqimasligi, balki haqiqiy xizmat interfeysini takrorlovchi mashq qurilmasida toʻlovni amalga oshirishi kerak.",
    roadmapTitle: "Rivojlanish",
    roadmap: [
      "Mashq qurilmalari kutubxonasini kengaytirish: e-pochta mijozi, bank ilovasi, davlat xizmatlari portali.",
      "Oʻqituvchi uchun vositalar: sinf marshruti, kuzatuvlar, oʻzlashtirish belgilari.",
      "Tegishli kontingentli sinflar uchun oʻzbek tilidagi interfeysni qoʻllab-quvvatlash.",
    ],
  },
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
