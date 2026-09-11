import Image from "next/image";
import Link from "next/link";
import { getLocale } from "@/lib/i18n";

const dict = {
  ru: {
    title: "Контакты",
    eyebrow: "Контакты",
    heroHeading: "Связь с поддержкой, командой платформы и партнерами.",
    heroLead:
      "Выберите подходящий канал: помощь с доступом, вопросы по кабинету, подключение школы или партнерское предложение.",
    heroAlt: "Взрослый помогает ребенку пользоваться цифровым сервисом",
    cards: [
      {
        title: "Поддержка пользователей",
        value: "support@uquvli.uz",
        note: "Вопросы по доступу, аккаунтам и работе кабинета.",
      },
      {
        title: "Телефон",
        value: "+998 90 000-00-00",
        note: "Связь по будням для семей, педагогов и центров.",
      },
      {
        title: "Партнерства",
        value: "schools@uquvli.uz",
        note: "Подключение школ, НКО, центров и пилотных площадок.",
      },
    ],
    howEyebrow: "Как писать",
    howHeading:
      "Чтобы быстрее получить ответ, отправьте короткое сообщение по структуре.",
    steps: [
      "Опишите, кто вы: семья, педагог, школа, центр или партнер.",
      "Коротко укажите задачу: доступ, внедрение, консультация, документы.",
      "Оставьте удобный канал связи, чтобы команда вернулась с ответом.",
    ],
    docsTitle: "Документы",
    docsTerms: "Пользовательское соглашение",
    docsPrivacy: "Политика конфиденциальности",
    docsCookies: "Cookies",
  },
  uz: {
    title: "Aloqa",
    eyebrow: "Aloqa",
    heroHeading: "Qoʻllab-quvvatlash, platforma jamoasi va hamkorlar bilan aloqa.",
    heroLead:
      "Mos kanalni tanlang: kirish boʻyicha yordam, kabinetga oid savollar, maktabni ulash yoki hamkorlik taklifi.",
    heroAlt: "Katta yoshli odam bolaga raqamli xizmatdan foydalanishga yordam bermoqda",
    cards: [
      {
        title: "Foydalanuvchilarni qoʻllab-quvvatlash",
        value: "support@uquvli.uz",
        note: "Kirish, akkauntlar va kabinet ishi boʻyicha savollar.",
      },
      {
        title: "Telefon",
        value: "+998 90 000-00-00",
        note: "Oilalar, pedagoglar va markazlar uchun ish kunlari aloqa.",
      },
      {
        title: "Hamkorlik",
        value: "schools@uquvli.uz",
        note: "Maktablar, NTTlar, markazlar va sinov maydonchalarini ulash.",
      },
    ],
    howEyebrow: "Qanday yozish kerak",
    howHeading:
      "Tezroq javob olish uchun qisqa va tuzilgan xabar yuboring.",
    steps: [
      "Oʻzingizni tanishtiring: oila, pedagog, maktab, markaz yoki hamkor.",
      "Qisqa qilib vazifani yozing: kirish, joriy etish, maslahat, hujjatlar.",
      "Jamoaga javob qaytarish uchun qulay aloqa kanalini qoldiring.",
    ],
    docsTitle: "Hujjatlar",
    docsTerms: "Foydalanuvchi shartnomasi",
    docsPrivacy: "Maxfiylik siyosati",
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
            <span className="eyebrow">{t.eyebrow}</span>
            <h1>{t.heroHeading}</h1>
            <p>{t.heroLead}</p>
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
              <article key={item.title} className="marketing-card">
                <h3>{item.title}</h3>
                <p className="marketing-contact-value">{item.value}</p>
                <p>{item.note}</p>
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
