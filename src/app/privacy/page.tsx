import { getLocale } from "@/lib/i18n";

const dict = {
  ru: {
    title: "Политика конфиденциальности",
    eyebrow: "Документы",
    paragraphs: [
      [
        "1. Общие положения.",
        " Настоящая политика описывает, как тестовая образовательная платформа uquvli.uz собирает, использует, хранит и удаляет данные пользователей при регистрации, входе в кабинет, прохождении уроков и использовании интерфейса.",
      ],
      [
        "2. Согласие пользователя.",
        " Создавая кабинет, заполняя формы, продолжая использование платформы или передавая данные ребёнка, пользователь подтверждает ознакомление с настоящей политикой и даёт согласие на обработку данных в объёме, необходимом для работы тестовой платформы, её проверки, настройки и улучшения.",
      ],
      [
        "3. Какие данные могут обрабатываться.",
        " Платформа может обрабатывать имя, адрес электронной почты, роль пользователя, сведения профиля ребёнка, данные о прохождении уроков, ответы в учебных сценариях и тестах, настройки интерфейса, а также технические данные, необходимые для стабильной работы сайта.",
      ],
      [
        "4. Цели обработки.",
        " Данные используются для регистрации и входа, сохранения учебного прогресса, персонализации подачи материала, сопровождения пользователей, исправления ошибок, проверки качества интерфейса и анализа того, как работает тестовая платформа. Обезличенные и агрегированные результаты могут использоваться для улучшения содержания, структуры уроков и функциональности сервиса.",
      ],
      [
        "5. Текущий способ хранения.",
        " В текущей версии платформы регистрационные данные, состав классов, прогресс, события уроков и анкеты сохраняются на сервере платформы. Технически необходимые cookies используются для сессии входа, а localStorage — для отдельных настроек интерфейса и решения по баннеру cookies.",
      ],
      [
        "6. Передача данных.",
        " Платформа не предназначена для продажи или публичного раскрытия персональных данных. Доступ к данным может предоставляться только в объёме, необходимом для технической поддержки, исполнения требований закона, защиты прав платформы и пользователя либо при наличии отдельного согласия.",
      ],
      [
        "7. Данные детей.",
        " Если на платформу вносятся данные ребёнка, пользователь подтверждает, что действует как родитель, законный представитель либо иное уполномоченное лицо, имеющее право передавать такие сведения и давать согласие на их обработку в интересах ребёнка.",
      ],
      [
        "8. Срок хранения.",
        " Данные хранятся столько, сколько это требуется для работы кабинета, сохранения результатов и целей тестирования, либо до удаления локальных данных пользователем, отзыва согласия или прекращения использования платформы.",
      ],
      [
        "9. Права пользователя.",
        " Пользователь вправе запросить информацию об обработке данных, уточнение или удаление сведений, отзыв согласия, прекращение участия в тестировании и прекращение использования платформы.",
      ],
      [
        "10. Связь по вопросам данных.",
        " Для обращений по вопросам конфиденциальности, удаления профиля или отзыва согласия можно использовать адрес support@uquvli.uz.",
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
