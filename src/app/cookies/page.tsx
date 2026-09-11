import { getLocale } from "@/lib/i18n";

const dict = {
  ru: {
    title: "Политика использования cookies",
    eyebrow: "Документы",
    p1Bold: "1. Что используется на платформе.",
    p1:
      " Платформа использует cookies и локальное хранилище браузера для работы кабинета, сохранения пользовательского выбора и поддержки основных функций тестовой платформы.",
    p2Bold: "2. Для чего это нужно.",
    p2:
      " Технически необходимые cookies применяются для безопасной сессии кабинета, а localStorage используется для запоминания решения по баннеру cookies и отдельных настроек интерфейса. Учебный прогресс и данные классов сохраняются на сервере платформы.",
    p3Bold: "3. Что важно понимать.",
    p3:
      " В текущей версии платформы не используются рекламные cookies и не применяется внешний маркетинговый трекинг. Если в будущем на платформе появятся дополнительные аналитические или сервисные инструменты, политика будет обновлена до их подключения.",
    p4Bold: "4. Управление настройками.",
    p4:
      " Пользователь может ограничить хранение данных через настройки браузера или очистить localStorage и cookies. В таком случае сессия входа и часть пользовательских настроек могут быть удалены.",
    p5Bold: "5. Согласие.",
    p5:
      " Нажатие кнопки в баннере cookies и продолжение работы с платформой после ознакомления с настоящей политикой означает согласие пользователя на использование технически необходимых cookies и локального хранилища в рамках работы тестовой платформы.",
  },
  uz: {
    title: "Cookie fayllaridan foydalanish siyosati",
    eyebrow: "Hujjatlar",
    p1Bold: "1. Platformada nima ishlatiladi.",
    p1:
      " Platforma kabinet ishini taʼminlash, foydalanuvchi tanlovini saqlash va sinov platformasining asosiy funksiyalarini qoʻllab-quvvatlash uchun cookie fayllar va brauzerning lokal xotirasidan foydalanadi.",
    p2Bold: "2. Buning maqsadi.",
    p2:
      " Texnik jihatdan zarur cookie fayllar kabinet sessiyasining xavfsizligini taʼminlaydi, localStorage esa cookie banner orqali tanlangan qaror va interfeysning ayrim sozlamalarini eslab qolish uchun ishlatiladi. Oʻquv yutuqlari va sinf maʼlumotlari platforma serverida saqlanadi.",
    p3Bold: "3. Eʼtibor qaratish kerak boʻlgan jihatlar.",
    p3:
      " Platformaning hozirgi versiyasida reklama cookie fayllari ishlatilmaydi va tashqi marketing kuzatuvi yoʻq. Kelajakda qoʻshimcha tahliliy yoki xizmat vositalari kiritilsa, ular ulanishidan oldin ushbu siyosat yangilanadi.",
    p4Bold: "4. Sozlamalarni boshqarish.",
    p4:
      " Foydalanuvchi brauzer sozlamalari orqali maʼlumotlar saqlanishini cheklashi yoki localStorage va cookie fayllarini tozalashi mumkin. Bunday holda kirish sessiyasi va ayrim foydalanuvchi sozlamalari oʻchirilishi mumkin.",
    p5Bold: "5. Rozilik.",
    p5:
      " Cookie bannerdagi tugmani bosish va ushbu siyosat bilan tanishganidan keyin platformadan foydalanishni davom ettirish — foydalanuvchining sinov platformasi doirasida texnik jihatdan zarur cookie fayllar va lokal xotiradan foydalanishga roziligini bildiradi.",
  },
} as const;

export async function generateMetadata() {
  const locale = await getLocale();
  return { title: dict[locale].title };
}

export default async function CookiesPage() {
  const locale = await getLocale();
  const t = dict[locale];
  return (
    <main className="page">
      <section className="policy-shell">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1>{t.title}</h1>
        <div className="policy-content">
          <p><strong>{t.p1Bold}</strong>{t.p1}</p>
          <p><strong>{t.p2Bold}</strong>{t.p2}</p>
          <p><strong>{t.p3Bold}</strong>{t.p3}</p>
          <p><strong>{t.p4Bold}</strong>{t.p4}</p>
          <p><strong>{t.p5Bold}</strong>{t.p5}</p>
        </div>
      </section>
    </main>
  );
}
