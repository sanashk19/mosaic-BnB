import { getLocale } from "@/lib/i18n";

const dict = {
  ru: {
    title: "Privacy Policy",
    eyebrow: "Documents",
    paragraphs: [
      [
        "1. General provisions.",
        "This policy describes how the test educational platform uquvli.uz collects, uses, stores and deletes user data when registering, logging into the account, taking lessons and using the interface.",
      ],
      [
        "2. User consent.",
        "By creating an account, filling out forms, continuing to use the platform or transferring child data, the user confirms familiarization with this policy and consents to the processing of data to the extent necessary for the operation of the test platform, its testing, configuration and improvement.",
      ],
      [
        "3. What data can be processed.",
        "The platform can process the name, email address, user role, child profile information, lesson completion data, answers to educational scenarios and tests, interface settings, as well as technical data necessary for the stable operation of the site.",
      ],
      [
        "4. Purposes of processing.",
        "The data is used for registration and login, saving learning progress, personalizing the delivery of material, supporting users, fixing errors, checking the quality of the interface and analyzing how the testing platform works. Anonymized and aggregated results can be used to improve the content, structure of lessons and functionality of the service.",
      ],
      [
        "5. Current storage method.",
        "In the current version of the platform, registration data, class composition, progress, lesson events and questionnaires are saved on the platform server. Technically necessary cookies are used for the login session, and localStorage is used for individual interface settings and cookie banner solutions.",
      ],
      [
        "6. Data transfer.",
        "The Platform is not intended for the sale or public disclosure of personal information. Access to data may be provided only to the extent necessary for technical support, compliance with legal requirements, protection of the rights of the platform and the user, or with separate consent.",
      ],
      [
        "7. Children's data.",
        "If a child's data is entered onto the platform, the user confirms that he is acting as a parent, legal representative or other authorized person who has the right to transfer such information and consent to its processing in the interests of the child.",
      ],
      [
        "8. Shelf life.",
        "Data is stored for as long as required for the operation of the account, saving results and testing purposes, or until the user deletes local data, revokes consent or stops using the platform.",
      ],
      [
        "9. User rights.",
        "The user has the right to request information about data processing, clarification or deletion of information, withdrawal of consent, termination of participation in testing and termination of use of the platform.",
      ],
      [
        "10. Communication on data issues.",
        "To contact us regarding privacy issues, deleting a profile or revoking consent, you can use the address support@uquvli.uz.",
      ],
    ],
  },
  uz: {
    title: "Maxfiylik siyosati",
    eyebrow: "Hujjatlar",
    paragraphs: [
      [
        "1. Umumiy qoidalar.",
        " Ushbu siyosat uquvli.uz sinov taʼlim platformasi roʻyxatdan oʻtish, kabinetga kirish, darslarni oʻtish va interfeysdan foydalanish chogʻida foydalanuvchi maʼlumotlarini qanday yigʻishi, ishlatishi, saqlashi va oʻchirishini tavsiflaydi.",
      ],
      [
        "2. Foydalanuvchining roziligi.",
        " Kabinet yaratish, shakllarni toʻldirish, platformadan foydalanishni davom ettirish yoki bola maʼlumotlarini berish orqali foydalanuvchi ushbu siyosat bilan tanishganini va sinov platformasining ishlashi, tekshirilishi, sozlanishi va yaxshilanishi uchun zarur boʻlgan hajmda maʼlumotlarni qayta ishlashga roziligini tasdiqlaydi.",
      ],
      [
        "3. Qaysi maʼlumotlar qayta ishlanishi mumkin.",
        " Platforma foydalanuvchining ismi, elektron pochta manzili, roli, bola profili maʼlumotlari, darslarni oʻtish maʼlumotlari, oʻquv vaziyatlari va testlardagi javoblar, interfeys sozlamalari, shuningdek sayt barqaror ishlashi uchun zarur texnik maʼlumotlarni qayta ishlashi mumkin.",
      ],
      [
        "4. Qayta ishlash maqsadlari.",
        " Maʼlumotlardan roʻyxatdan oʻtish va kirish, oʻquv yutuqlarini saqlash, materialni shaxsiylashtirish, foydalanuvchilarni qoʻllab-quvvatlash, xatoliklarni tuzatish, interfeys sifatini tekshirish va sinov platformasining ishlashini tahlil qilish uchun foydalaniladi. Shaxsi aniqlanmaydigan va umumlashtirilgan natijalar darslar mazmuni, tuzilmasi va xizmat funksiyalarini yaxshilash uchun ishlatilishi mumkin.",
      ],
      [
        "5. Hozirgi saqlash usuli.",
        " Platformaning hozirgi versiyasida roʻyxatdan oʻtish maʼlumotlari, sinflar tarkibi, yutuqlar, darslar hodisalari va anketalar platforma serverida saqlanadi. Texnik jihatdan zarur cookie fayllar kirish sessiyasi uchun, localStorage esa interfeysning ayrim sozlamalari va cookie banner orqali tanlangan qaror uchun ishlatiladi.",
      ],
      [
        "6. Maʼlumotlarni uzatish.",
        " Platforma shaxsiy maʼlumotlarni sotish yoki ommaviy oshkor qilish uchun moʻljallanmagan. Maʼlumotlarga kirish faqat texnik yordam koʻrsatish, qonun talablarini bajarish, platforma va foydalanuvchi huquqlarini himoya qilish yoki alohida rozilik mavjud boʻlgan hollardagina, zarur hajmda taqdim etilishi mumkin.",
      ],
      [
        "7. Bola maʼlumotlari.",
        " Platformaga bolaning maʼlumotlari kiritilsa, foydalanuvchi ota-ona, qonuniy vakil yoki bunday maʼlumotlarni berish va ularni bola manfaati yoʻlida qayta ishlashga rozilik berishga vakolatli boshqa shaxs sifatida ish koʻrayotganini tasdiqlaydi.",
      ],
      [
        "8. Saqlash muddati.",
        " Maʼlumotlar kabinet ishi, natijalarni saqlash va sinov maqsadlari uchun zarur boʻlgan muddatga, yoki foydalanuvchi lokal maʼlumotlarni oʻchirgunicha, rozilikni qaytarib olgunicha yoki platformadan foydalanishni toʻxtatgunicha saqlanadi.",
      ],
      [
        "9. Foydalanuvchining huquqlari.",
        " Foydalanuvchi maʼlumotlarni qayta ishlash haqida maʼlumot olishni, maʼlumotlarni aniqlashtirishni yoki oʻchirishni, rozilikni qaytarib olishni, sinovdan chiqishni va platformadan foydalanishni toʻxtatishni talab qilish huquqiga ega.",
      ],
      [
        "10. Maʼlumotlar boʻyicha aloqa.",
        " Maxfiylik masalalari, profilni oʻchirish yoki rozilikni qaytarib olish boʻyicha murojaatlar uchun support@uquvli.uz manzilidan foydalanish mumkin.",
      ],
    ],
  },
} as const;

export async function generateMetadata() {
  const locale = await getLocale();
  return { title: dict[locale].title };
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const t = dict[locale];
  return (
    <main className="page">
      <section className="policy-shell">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1>{t.title}</h1>
        <div className="policy-content">
          {t.paragraphs.map(([bold, rest]) => (
            <p key={bold}>
              <strong>{bold}</strong>
              {rest}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
