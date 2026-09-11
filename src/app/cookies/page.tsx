import { getLocale } from "@/lib/i18n";

const dict = {
  ru: {
    title: "Cookies Policy",
    eyebrow: "Documents",
    p1Bold: "1. What is used on the platform.",
    p1:
      "The platform uses cookies and local browser storage to operate the account, save user selections and support the main functions of the test platform.",
    p2Bold: "2. Why is this needed?",
    p2:
      "Technically necessary cookies are used for a secure account session, and localStorage is used to remember the cookie banner decision and individual interface settings. Academic progress and class data are saved on the platform server.",
    p3Bold: "3. What is important to understand.",
    p3:
      "The current version of the platform does not use advertising cookies and does not use external marketing tracking. If additional analytical or service tools become available on the platform in the future, the policy will be updated before enabling them.",
    p4Bold: "4. Manage settings.",
    p4:
      "The user can limit data storage through browser settings or clear localStorage and cookies. In this case, the login session and some user settings may be deleted.",
    p5Bold: "5. Consent.",
    p5:
      "Clicking the button in the cookies banner and continuing to work with the platform after reading this policy means the user agrees to the use of technically necessary cookies and local storage as part of the test platform.",
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
