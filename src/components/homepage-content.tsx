import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { HomepageHeroActions } from "@/components/homepage-hero-actions";
import { HomeTrainerPreview } from "@/components/home-trainer-preview";
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
      heroLabel: "Диагностика ФЦГ",
      shortLabel: "до и после",
    },
    "digital-health": {
      icon: "health",
      tone: "green",
      heroLabel: "Цифровое здоровье",
      shortLabel: "гигиена и здоровье",
    },
    "digital-home-economics": {
      icon: "shopping",
      tone: "gold",
      heroLabel: "Цифровая экономика быта",
      shortLabel: "одежда, питание, бюджет",
    },
    "digital-transport": {
      icon: "nature",
      tone: "blue",
      heroLabel: "Цифровой транспорт",
      shortLabel: "справочник и билеты",
    },
    "digital-communication": {
      icon: "communication",
      tone: "teal",
      heroLabel: "Цифровая коммуникация",
      shortLabel: "телефон и мессенджеры",
    },
    "digital-safety": {
      icon: "services",
      tone: "violet",
      heroLabel: "Цифровая безопасность",
      shortLabel: "правила и риски",
    },
    "digital-public-services": {
      icon: "services",
      tone: "violet",
      heroLabel: "Цифровые госуслуги",
      shortLabel: "портал, банк, договор",
    },
  },
  uz: {
    "diagnostic": {
      icon: "services",
      tone: "ink",
      heroLabel: "FRS diagnostikasi",
      shortLabel: "boshlangʻich va yakuniy",
    },
    "digital-health": {
      icon: "health",
      tone: "green",
      heroLabel: "Raqamli salomatlik",
      shortLabel: "gigiyena va salomatlik",
    },
    "digital-home-economics": {
      icon: "shopping",
      tone: "gold",
      heroLabel: "Raqamli uy iqtisodiyoti",
      shortLabel: "kiyim, ovqat, byudjet",
    },
    "digital-transport": {
      icon: "nature",
      tone: "blue",
      heroLabel: "Raqamli transport",
      shortLabel: "maʼlumotnoma va chiptalar",
    },
    "digital-communication": {
      icon: "communication",
      tone: "teal",
      heroLabel: "Raqamli muloqot",
      shortLabel: "telefon va messenjerlar",
    },
    "digital-safety": {
      icon: "services",
      tone: "violet",
      heroLabel: "Raqamli xavfsizlik",
      shortLabel: "qoidalar va xatarlar",
    },
    "digital-public-services": {
      icon: "services",
      tone: "violet",
      heroLabel: "Raqamli davlat xizmatlari",
      shortLabel: "portal, bank, shartnoma",
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
      alt: "Иллюстрация диагностики ФЦГ",
    },
    "digital-health": {
      src: "/lesson-health.svg",
      alt: "Иллюстрация цифрового здоровья",
    },
    "digital-home-economics": {
      src: "/lesson-shopping.svg",
      alt: "Иллюстрация цифровой экономики быта",
    },
    "digital-transport": {
      src: "/lesson-nature.svg",
      alt: "Иллюстрация цифрового транспорта",
    },
    "digital-communication": {
      src: "/lesson-communication.svg",
      alt: "Иллюстрация цифровой коммуникации",
    },
    "digital-safety": {
      src: "/lesson-services.svg",
      alt: "Иллюстрация цифровой безопасности",
    },
    "digital-public-services": {
      src: "/lesson-services.svg",
      alt: "Иллюстрация цифровых госуслуг",
    },
  },
  uz: {
    "diagnostic": {
      src: "/lesson-services.svg",
      alt: "FRS diagnostikasi tasviri",
    },
    "digital-health": {
      src: "/lesson-health.svg",
      alt: "Raqamli salomatlik tasviri",
    },
    "digital-home-economics": {
      src: "/lesson-shopping.svg",
      alt: "Raqamli uy iqtisodiyoti tasviri",
    },
    "digital-transport": {
      src: "/lesson-nature.svg",
      alt: "Raqamli transport tasviri",
    },
    "digital-communication": {
      src: "/lesson-communication.svg",
      alt: "Raqamli muloqot tasviri",
    },
    "digital-safety": {
      src: "/lesson-services.svg",
      alt: "Raqamli xavfsizlik tasviri",
    },
    "digital-public-services": {
      src: "/lesson-services.svg",
      alt: "Raqamli davlat xizmatlari tasviri",
    },
  },
};

const fallbackPresentationsByLocale: Record<Locale, Presentation[]> = {
  ru: [
    { icon: "services", tone: "blue", heroLabel: "Практический навык", shortLabel: "короткий урок" },
    { icon: "communication", tone: "teal", heroLabel: "Цифровой сервис", shortLabel: "пошаговая тема" },
    { icon: "health", tone: "green", heroLabel: "Жизненная ситуация", shortLabel: "понятная практика" },
  ],
  uz: [
    { icon: "services", tone: "blue", heroLabel: "Amaliy koʻnikma", shortLabel: "qisqa dars" },
    { icon: "communication", tone: "teal", heroLabel: "Raqamli xizmat", shortLabel: "bosqichma-bosqich mavzu" },
    { icon: "health", tone: "green", heroLabel: "Hayotiy vaziyat", shortLabel: "tushunarli amaliyot" },
  ],
};

const heroStatsByLocale: Record<Locale, Array<{ value: string; label: string }>> = {
  ru: [
    { value: "14", label: "уроков" },
    { value: "5", label: "направлений" },
    { value: "F70", label: "целевая аудитория" },
    { value: "RU", label: "язык обучения" },
    { value: "СБО", label: "встроен в уроки" },
  ],
  uz: [
    { value: "14", label: "ta dars" },
    { value: "5", label: "ta yoʻnalish" },
    { value: "F70", label: "kim uchun" },
    { value: "RU", label: "oʻquv tili" },
    { value: "IMM", label: "darslarga moslangan" },
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
      title: "Ученикам",
      description:
        "Тренажёры реальных цифровых ситуаций, адаптированные под детей с F70: крупные элементы, один шаг на экране.",
      icon: "kids",
      tone: "blue",
      image: "/generated-images/audience-children.jpg",
      imageAlt: "Ребенок изучает цифровые навыки на планшете",
      href: "/program",
    },
    {
      title: "Родителям",
      description:
        "Пройдите тот же тренажёр дома вместе с ребёнком и помогите закрепить навык в реальной ситуации.",
      icon: "parent",
      tone: "violet",
      image: "/generated-images/audience-family.jpg",
      imageAlt: "Семья изучает цифровые сервисы за ноутбуком",
      href: "/families",
    },
    {
      title: "Школам",
      description:
        "Готовая структура уроков СБО для учителей коррекционных школ — без долгой подготовки материалов.",
      icon: "school",
      tone: "gold",
      image: "/generated-images/audience-school.jpg",
      imageAlt: "Педагог проводит занятие по цифровой грамотности",
      href: "/educators",
    },
  ],
  uz: [
    {
      title: "Oʻquvchilar uchun",
      description:
        "F70 bolalar uchun moslashtirilgan haqiqiy raqamli vaziyat mashqlari: yirik elementlar, ekranda bittadan qadam.",
      icon: "kids",
      tone: "blue",
      image: "/generated-images/audience-children.jpg",
      imageAlt: "Bola planshetda raqamli koʻnikmalarni oʻrganmoqda",
      href: "/program",
    },
    {
      title: "Ota-onalar uchun",
      description:
        "Xuddi shu mashqni uyda farzandingiz bilan birga oʻting va koʻnikmani haqiqiy vaziyatda mustahkamlang.",
      icon: "parent",
      tone: "violet",
      image: "/generated-images/audience-family.jpg",
      imageAlt: "Oila noutbuk orqali raqamli xizmatlarni oʻrganmoqda",
      href: "/families",
    },
    {
      title: "Maktablar uchun",
      description:
        "Maxsus maktablar pedagoglari uchun tayyor ijtimoiy-maishiy moslashuv darslari tuzilmasi — materiallarni uzoq tayyorlashsiz.",
      icon: "school",
      tone: "gold",
      image: "/generated-images/audience-school.jpg",
      imageAlt: "Pedagog raqamli savodxonlik darsini oʻtkazmoqda",
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
      title: "Один шаг на экране",
      copy: "Каждое действие — отдельно. Ребёнок не теряется в интерфейсе.",
      icon: "route",
      tone: "green",
    },
    {
      title: "Крупно и понятно",
      copy: "Кнопки, текст и иконки хорошо видны на телефоне и планшете.",
      icon: "text",
      tone: "blue",
    },
    {
      title: "Подсказки учителю",
      copy: "В уроках есть заметки для учителя СБО и сопровождающего взрослого.",
      icon: "users",
      tone: "violet",
    },
  ],
  uz: [
    {
      title: "Ekranda bitta qadam",
      copy: "Har bir harakat alohida. Bola interfeysda adashib qolmaydi.",
      icon: "route",
      tone: "green",
    },
    {
      title: "Yirik va tushunarli",
      copy: "Tugmalar, matn va belgilar telefon va planshetda yaxshi koʻrinadi.",
      icon: "text",
      tone: "blue",
    },
    {
      title: "Oʻqituvchiga maslahatlar",
      copy: "Darslarda maxsus pedagog va hamroh kattalar uchun maslahatlar bor.",
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
    { title: "Практические знания", copy: "Уроки построены вокруг реальных задач, а не сухой теории.", icon: "route", tone: "blue" },
    { title: "Понятный язык", copy: "Тексты написаны спокойно, коротко и без сложных терминов.", icon: "text", tone: "green" },
    { title: "Национальный контекст", copy: "Темы связаны с сервисами и повседневной жизнью в Узбекистане.", icon: "services", tone: "gold" },
    { title: "Для разных пользователей", copy: "Материалы подходят детям, семьям, школам и центрам.", icon: "users", tone: "teal" },
    { title: "Безопасность", copy: "Отдельное внимание уделено надежным действиям в цифровой среде.", icon: "shield", tone: "violet" },
  ],
  uz: [
    { title: "Amaliy bilimlar", copy: "Darslar quruq nazariya emas, haqiqiy hayotiy vazifalar atrofida tuzilgan.", icon: "route", tone: "blue" },
    { title: "Tushunarli til", copy: "Matnlar xotirjam, qisqa va murakkab atamalarsiz yozilgan.", icon: "text", tone: "green" },
    { title: "Milliy kontekst", copy: "Mavzular Oʻzbekistondagi xizmatlar va kundalik hayot bilan bogʻliq.", icon: "services", tone: "gold" },
    { title: "Turli foydalanuvchilar uchun", copy: "Materiallar bolalar, oilalar, maktablar va markazlar uchun mos.", icon: "users", tone: "teal" },
    { title: "Xavfsizlik", copy: "Raqamli muhitda ishonchli harakatlarga alohida eʼtibor berilgan.", icon: "shield", tone: "violet" },
  ],
};

const uiByLocale = {
  ru: {
    factsLabel: "Коротко о платформе",
    chooseDirection: "Выбор направления обучения",
    chooseDirectionHead: "Выберите направление обучения",
    chooseDirectionSub: "Начните с темы, которая нужна сейчас.",
    keyFacts: "Главные факты",
    openDirection: (title: string) => `Открыть направление ${title}`,
    trainerEyebrow: "Тренажёр",
    trainerHead: "Попробуй прямо сейчас",
    trainerLead: "Это копия Telegram. Прочитай сообщение мамы и выбери ответ.",
    seeAllDirections: "Смотреть все направления",
    open: "Открыть",
    whyEyebrow: "Почему UQUVLI.UZ",
    whyTitle: "Сервисный формат без лишней сложности",
    fmtLessonCount: (count: number) => {
      const mod100 = count % 100;
      const mod10 = count % 10;
      if (mod100 >= 11 && mod100 <= 14) return `${count} уроков`;
      if (mod10 === 1) return `${count} урок`;
      if (mod10 >= 2 && mod10 <= 4) return `${count} урока`;
      return `${count} уроков`;
    },
  },
  uz: {
    factsLabel: "Platforma haqida qisqacha",
    chooseDirection: "Oʻquv yoʻnalishini tanlash",
    chooseDirectionHead: "Oʻquv yoʻnalishini tanlang",
    chooseDirectionSub: "Hozir kerakli mavzudan boshlang.",
    keyFacts: "Asosiy faktlar",
    openDirection: (title: string) => `${title} yoʻnalishini ochish`,
    trainerEyebrow: "Mashq",
    trainerHead: "Hozir sinab koʻring",
    trainerLead: "Bu Telegram nusxasi. Oyimning xabarini oʻqing va javobni tanlang.",
    seeAllDirections: "Barcha yoʻnalishlarni koʻrish",
    open: "Ochish",
    whyEyebrow: "Nima uchun UQUVLI.UZ",
    whyTitle: "Ortiqcha murakkablik bez xizmat formati",
    fmtLessonCount: (count: number) => `${count} ta dars`,
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
  const heroStats = heroStatsByLocale[locale];
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
              <span className="home-eyebrow">{draft.hero.eyebrow}</span>
              <h1>{draft.hero.title}</h1>
              <p className="home-lead">{draft.hero.lead}</p>

              <HomepageHeroActions
                primaryAction={draft.hero.primaryAction}
                secondaryAction={draft.hero.secondaryAction}
              />

              <div className="home-facts" aria-label={ui.factsLabel}>
                {draft.hero.facts.slice(0, 5).map((fact) => (
                  <span key={fact}>{fact}</span>
                ))}
              </div>
            </div>

            <div className="home-hero-showcase">
              <div className="home-photo-card">
                <Image
                  src="/generated-images/home-hero-learning.jpg"
                  alt={
                    locale === "uz"
                      ? "Bolalar noutbuk orqali raqamli xizmatlarni oʻrganmoqda"
                      : "Дети изучают цифровые сервисы за ноутбуком"
                  }
                  width={1800}
                  height={1013}
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 900px) 100vw, 620px"
                />
                <div className="home-device-card" aria-hidden="true">
                  <span className="home-device-logo">UQUVLI.UZ</span>
                  <span className="home-device-line" />
                  <span className="home-device-line short" />
                </div>
              </div>

              <div className="home-direction-panel" aria-label={ui.chooseDirection}>
                <div className="home-direction-head">
                  <span>{ui.chooseDirectionHead}</span>
                  <strong>{ui.chooseDirectionSub}</strong>
                </div>

                <div className="home-direction-list">
                  {homeModules.map((module, index) => {
                    const presentation = getModulePresentation(locale, module, index);

                    return (
                      <Link
                        aria-label={ui.openDirection(module.title)}
                        className={`home-direction-card home-tone-${presentation.tone}`}
                        href="/program"
                        key={module.slug}
                      >
                        <span className="home-icon" aria-hidden="true">
                          <ModuleIcon name={presentation.icon} />
                        </span>
                        <span className="home-direction-copy">
                          <strong>{presentation.heroLabel}</strong>
                          <span>
                            {ui.fmtLessonCount(module.lessonCount)} ·{" "}
                            {presentation.shortLabel}
                          </span>
                        </span>
                        <span className="home-card-arrow" aria-hidden="true">
                          <ArrowIcon />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="home-stat-strip" aria-label={ui.keyFacts}>
            {heroStats.map((stat) => (
              <div className="home-stat-card" key={`${stat.value}-${stat.label}`}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
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
              <span>UQUVLI.UZ</span>
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
    <main className="home-page home-reference-page">
      {draft.sectionOrder.map((sectionId) =>
        draft.hiddenSections.includes(sectionId) ? null : sections[sectionId],
      )}
    </main>
  );
}
