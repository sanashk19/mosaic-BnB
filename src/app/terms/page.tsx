import { getLocale } from "@/lib/i18n";

const dict = {
  ru: {
    title: "User Agreement",
    eyebrow: "Documents",
    p1Bold: "1. Platform status.",
    p1:
      "uquvli.uz is provided as a test educational platform. Individual sections, scenarios, texts, classrooms and lesson mechanics can be changed, supplemented, temporarily limited or operated in a simplified mode.",
    p2Bold: "2. Acceptance of the terms.",
    p2:
      "By registering, logging into your account or continuing to use the platform, the user confirms that he has read this agreement, the privacy policy and the cookie policy, and accepts their terms.",
    p3Bold: "3. Consent to testing.",
    p3:
      "The user agrees that during the testing period, the platform may collect data on the use of the account, completion of lessons, selection of scenarios, technical errors and interface stability in order to check, configure and improve the service.",
    p4Bold: "4. Use of the results.",
    p4:
      "The results of work on the platform, including progress, responses and anonymized analytical indicators, can be used to refine materials, improve user experience, assess the quality of content and prepare internal reports on the work of the test platform.",
    p5Bold: "5. Data of minors.",
    p5:
      "If the user submits information about a child, he confirms that he is acting as a parent, legal representative or other authorized person who has the right to provide such data and accept the terms of the platform in the interests of the child.",
    p6Bold: "6. Terms of use.",
    p6:
      "The user undertakes to provide reliable information, not to transfer access to the account to unauthorized persons unless necessary, not to use the platform to violate the law, not to interfere with the operation of the site, and to respectfully use educational materials and the results of other participants.",
    p7Bold: "7. Restriction of purpose.",
    p7:
      "Platform materials are intended to provide educational support and skills training. They do not replace medical, psychological, pedagogical or other professional diagnostics and individual support.",
    p8Bold: "8. Platform changes.",
    p8:
      "The administration can update the lesson structure, interface, cabinet mechanics and document texts as the test platform develops. The current version of the documents is published on the website.",
    p9Bold: "9. Discontinuation of Use.",
    p9:
      "If the user does not agree with the terms of the platform, he must stop using the site and, if necessary, request deletion of data or withdrawal of consent.",
  },
  uz: {
    title: "Foydalanuvchi shartnomasi",
    eyebrow: "Hujjatlar",
    p1Bold: "1. Platforma maqomi.",
    p1:
      " uquvli.uz sinov taʼlim platformasi sifatida taqdim etiladi. Ayrim boʻlimlar, stsenariylar, matnlar, kabinet va dars mexanikasi oʻzgartirilishi, toʻldirilishi, vaqtincha cheklanishi yoki soddalashtirilgan tartibda ishlashi mumkin.",
    p2Bold: "2. Shartlarni qabul qilish.",
    p2:
      " Roʻyxatdan oʻtish, kabinetga kirish yoki platformadan foydalanishni davom ettirish bilan foydalanuvchi mazkur shartnoma, maxfiylik siyosati va cookie fayllaridan foydalanish siyosati bilan tanishganini va ularning shartlarini qabul qilishini tasdiqlaydi.",
    p3Bold: "3. Sinovga rozilik.",
    p3:
      " Foydalanuvchi sinov davrida platforma kabinetdan foydalanish, darslarni oʻtish, stsenariylarni tanlash, texnik xatoliklar va interfeys barqarorligi haqidagi maʼlumotlarni xizmatni tekshirish, sozlash va yaxshilash maqsadida toʻplashi mumkinligiga rozilik bildiradi.",
    p4Bold: "4. Natijalardan foydalanish.",
    p4:
      " Platformadagi ish natijalari, jumladan, oʻzlashtirish, javoblar va shaxsga bogʻlanmagan tahliliy koʻrsatkichlar materiallarni takomillashtirish, foydalanuvchi tajribasini yaxshilash, kontent sifatini baholash va sinov platformasi ishi boʻyicha ichki hisobotlarni tayyorlash uchun ishlatilishi mumkin.",
    p5Bold: "5. Voyaga yetmaganlar maʼlumotlari.",
    p5:
      " Agar foydalanuvchi bola haqidagi maʼlumotlarni taqdim etsa, u ota-ona, qonuniy vakil yoki bola manfaatlarini koʻzlab bunday maʼlumotlarni taqdim etish va platforma shartlarini qabul qilish huquqiga ega boshqa vakolatli shaxs sifatida ish koʻrayotganini tasdiqlaydi.",
    p6Bold: "6. Foydalanish qoidalari.",
    p6:
      " Foydalanuvchi ishonchli maʼlumotlarni taqdim etish, zarurat boʻlmasa, kabinetga kirish huquqini begona shaxslarga bermaslik, platformadan qonunni buzish uchun foydalanmaslik, sayt ishiga aralashmaslik hamda oʻquv materiallari va boshqa ishtirokchilarning natijalariga hurmat bilan munosabatda boʻlish majburiyatini oladi.",
    p7Bold: "7. Maqsadli cheklov.",
    p7:
      " Platforma materiallari taʼlimga yordam berish va koʻnikmalarni mashq qilish uchun moʻljallangan. Ular tibbiy, psixologik, pedagogik yoki boshqa kasbiy diagnostika va individual kuzatuvni almashtirmaydi.",
    p8Bold: "8. Platforma oʻzgarishlari.",
    p8:
      " Maʼmuriyat sinov platformasi rivojlanishi bilan darslar tuzilmasi, interfeys, kabinet mexanikasi va hujjatlar matnini yangilashi mumkin. Hujjatlarning amaldagi versiyasi saytda eʼlon qilinadi.",
    p9Bold: "9. Foydalanishni toʻxtatish.",
    p9:
      " Agar foydalanuvchi platforma shartlariga rozi boʻlmasa, u saytdan foydalanishni toʻxtatishi va zarur boʻlsa, maʼlumotlarni oʻchirish yoki rozilikni qaytarib olish boʻyicha murojaat qilishi kerak.",
  },
} as const;

export async function generateMetadata() {
  const locale = await getLocale();
  return { title: dict[locale].title };
}

export default async function TermsPage() {
  const locale = await getLocale();
  const t = dict[locale];
  return (
    <main className="page">
      <section className="policy-shell">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1>{t.title}</h1>
        <div className="policy-content">
          <p>
            <strong>{t.p1Bold}</strong>{t.p1}
          </p>
          <p>
            <strong>{t.p2Bold}</strong>{t.p2}
          </p>
          <p>
            <strong>{t.p3Bold}</strong>{t.p3}
          </p>
          <p>
            <strong>{t.p4Bold}</strong>{t.p4}
          </p>
          <p>
            <strong>{t.p5Bold}</strong>{t.p5}
          </p>
          <p>
            <strong>{t.p6Bold}</strong>{t.p6}
          </p>
          <p>
            <strong>{t.p7Bold}</strong>{t.p7}
          </p>
          <p>
            <strong>{t.p8Bold}</strong>{t.p8}
          </p>
          <p>
            <strong>{t.p9Bold}</strong>{t.p9}
          </p>
        </div>
      </section>
    </main>
  );
}
