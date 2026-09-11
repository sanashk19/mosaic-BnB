import { getLocale } from "@/lib/i18n";

const dict = {
  ru: {
    title: "Пользовательское соглашение",
    eyebrow: "Документы",
    p1Bold: "1. Статус платформы.",
    p1:
      " uquvli.uz предоставляется как тестовая образовательная платформа. Отдельные разделы, сценарии, тексты, кабинет и механика уроков могут изменяться, дополняться, временно ограничиваться или работать в упрощённом режиме.",
    p2Bold: "2. Принятие условий.",
    p2:
      " Регистрируясь, входя в кабинет или продолжая использование платформы, пользователь подтверждает, что ознакомился с настоящим соглашением, политикой конфиденциальности и политикой использования cookies, и принимает их условия.",
    p3Bold: "3. Согласие на тестирование.",
    p3:
      " Пользователь соглашается, что в период апробации платформа может собирать данные об использовании кабинета, прохождении уроков, выборе сценариев, технических ошибках и стабильности интерфейса в целях проверки, настройки и улучшения сервиса.",
    p4Bold: "4. Использование результатов.",
    p4:
      " Результаты работы на платформе, включая прогресс, ответы и обезличенные аналитические показатели, могут использоваться для доработки материалов, улучшения пользовательского опыта, оценки качества контента и подготовки внутренних отчётов по работе тестовой платформы.",
    p5Bold: "5. Данные несовершеннолетних.",
    p5:
      " Если пользователь передаёт сведения о ребёнке, он подтверждает, что действует как родитель, законный представитель либо иное уполномоченное лицо, имеющее право предоставлять такие данные и принимать условия платформы в интересах ребёнка.",
    p6Bold: "6. Правила использования.",
    p6:
      " Пользователь обязуется предоставлять достоверные сведения, не передавать доступ к кабинету посторонним лицам без необходимости, не использовать платформу для нарушения закона, не вмешиваться в работу сайта и уважительно использовать учебные материалы и результаты других участников.",
    p7Bold: "7. Ограничение назначения.",
    p7:
      " Материалы платформы предназначены для образовательной поддержки и тренировки навыков. Они не заменяют медицинскую, психологическую, педагогическую или иную профессиональную диагностику и индивидуальное сопровождение.",
    p8Bold: "8. Изменения платформы.",
    p8:
      " Администрация может обновлять структуру уроков, интерфейс, механики кабинета и тексты документов по мере развития тестовой платформы. Актуальная версия документов публикуется на сайте.",
    p9Bold: "9. Прекращение использования.",
    p9:
      " Если пользователь не согласен с условиями платформы, он должен прекратить использование сайта и при необходимости обратиться с запросом на удаление данных или отзыв согласия.",
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
