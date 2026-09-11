import Image from "next/image";
import Link from "next/link";
import { getLocale } from "@/lib/i18n";

const dict = {
  ru: {
    title: "Педагогам и центрам",
    eyebrow: "Для учителей СБО",
    heroHeading: "Платформа встраивается в урок СБО без долгой подготовки.",
    heroLead:
      "Разработана для коррекционных школ: уроки построены под детей с F70, структура занятий продумана, учителю не нужно собирать материалы с нуля.",
    ctaContact: "Связаться по подключению",
    ctaProgram: "Изучить программу",
    heroImageAlt: "Педагог проводит занятие по цифровой грамотности в классе",

    formatsEyebrow: "Форматы работы",
    formatsHeading: "Основной формат — урок СБО в классе под руководством учителя.",
    usageFormats: [
      "Урок СБО в классе: учитель ведёт, дети работают в тренажёрах на своих устройствах.",
      "Индивидуальное занятие с ребёнком в спокойном темпе с повторами.",
      "Небольшая группа с разбором ситуаций и совместным выполнением задач.",
    ],
    adultSideTitle: "Что видит взрослый",
    adultSideCopy:
      "Модули, уроки, следующий шаг, профиль ребенка и прогресс должны быть доступны без лишней навигации и без длинной адаптации к интерфейсу.",

    benefitsEyebrow: "Практическая польза",
    benefitsHeading: "Педагогу важен понятный рабочий каркас, а не длинные обещания.",
    educatorBenefits: [
      {
        title: "Программа уже разложена по модулям",
        copy:
          "Педагогу не нужно собирать маршрут с нуля: темы, уроки и ожидаемые действия уже сгруппированы.",
      },
      {
        title: "Каждый урок имеет одинаковую логику",
        copy:
          "Это упрощает внедрение в занятия и делает структуру предсказуемой для ребенка и взрослого.",
      },
      {
        title: "Разработано для коррекционной школы",
        copy:
          "Интерфейс и темп адаптированы под детей с F70: крупные элементы, короткие инструкции, один шаг на экране.",
      },
    ],

    connectEyebrow: "Подключение",
    connectHeading: "Запрос на внедрение можно отправить в структурированном виде.",
    connectionSteps: [
      "Опишите тип организации и возраст или контекст группы.",
      "Уточните, нужен ли пилот, методическая консультация или доступ для команды.",
      "Согласуйте сценарий использования: индивидуально, в группе или вместе с семьей.",
    ],
    nextStepTitle: "Следующий шаг",
    writeTeam: "Написать команде",
    createDemo: "Создать тестовый доступ",
  },
  uz: {
    title: "Pedagoglar va markazlar uchun",
    eyebrow: "IMM oʻqituvchilari uchun",
    heroHeading: "Platforma uzoq tayyorgarliksiz IMM darsiga qoʻshiladi.",
    heroLead:
      "Maxsus maktablar uchun ishlangan: darslar F70 li bolalarga moʻljallangan, mashgʻulot tuzilmasi oʻylab tuzilgan, oʻqituvchi materiallarni noldan yigʻishi shart emas.",
    ctaContact: "Ulanish boʻyicha bogʻlanish",
    ctaProgram: "Dasturni oʻrganish",
    heroImageAlt: "Pedagog sinfda raqamli savodxonlik darsini olib bormoqda",

    formatsEyebrow: "Ish formatlari",
    formatsHeading: "Asosiy format — oʻqituvchi rahbarligida sinfda IMM darsi.",
    usageFormats: [
      "Sinfda IMM darsi: oʻqituvchi yetakchilik qiladi, bolalar oʻz qurilmalarida mashqlar bilan ishlaydi.",
      "Bola bilan tinch sur’atda, takrorlar bilan yakka mashgʻulot.",
      "Kichik guruhda vaziyatlarni tahlil qilish va vazifalarni birgalikda bajarish.",
    ],
    adultSideTitle: "Kattalar nimani koʻradi",
    adultSideCopy:
      "Modullar, darslar, keyingi qadam, bola profili va yutuqlar ortiqcha navigatsiyasiz hamda interfeysga uzoq moslashuvsiz ochiq boʻlishi kerak.",

    benefitsEyebrow: "Amaliy foyda",
    benefitsHeading: "Pedagogga uzun va’dalar emas, tushunarli ish karkasi muhim.",
    educatorBenefits: [
      {
        title: "Dastur modullar boʻyicha tayyor",
        copy:
          "Pedagog yoʻlni noldan tuzmaydi: mavzular, darslar va kutilayotgan harakatlar allaqachon guruhlangan.",
      },
      {
        title: "Har bir dars bir xil mantiqqa ega",
        copy:
          "Bu mashgʻulotlarga joriy etishni soddalashtiradi va tuzilmani bola hamda kattalar uchun oldindan aniq qiladi.",
      },
      {
        title: "Maxsus maktab uchun ishlangan",
        copy:
          "Interfeys va sur’at F70 li bolalarga moslangan: yirik elementlar, qisqa koʻrsatmalar, ekranda bitta qadam.",
      },
    ],

    connectEyebrow: "Ulanish",
    connectHeading: "Joriy etish boʻyicha soʻrovni tartibli koʻrinishda yuborish mumkin.",
    connectionSteps: [
      "Tashkilot turini va guruh yoshi yoki konteksti haqida yozing.",
      "Pilot, metodik maslahat yoki jamoa uchun kirish kerakmi — aniqlang.",
      "Foydalanish stsenariysini kelishing: yakka, guruhda yoki oila bilan birga.",
    ],
    nextStepTitle: "Keyingi qadam",
    writeTeam: "Jamoaga yozish",
    createDemo: "Sinov kirish yaratish",
  },
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
