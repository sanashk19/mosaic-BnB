"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { useLocale } from "@/components/locale-provider";
import { TelegramTrainer } from "@/components/trainers/telegram-trainer";
import { WhatsappTrainer } from "@/components/trainers/whatsapp-trainer";
import { GmailTrainer } from "@/components/trainers/gmail-trainer";
import { MailruTrainer } from "@/components/trainers/mailru-trainer";
import { UzumTrainer } from "@/components/trainers/uzum-trainer";
import { YandexMarketTrainer } from "@/components/trainers/yandex-market-trainer";
import { MyGovTrainer } from "@/components/trainers/mygov-trainer";
import { PhoneTrainer } from "@/components/trainers/phone-trainer";
import { MorningQuestTrainer } from "@/components/trainers/morning-quest-trainer";
import { OutfitTrainer } from "@/components/trainers/outfit-trainer";
import { HairCareTrainer } from "@/components/trainers/hair-care-trainer";
import { SkinTypeTrainer } from "@/components/trainers/skin-type-trainer";
import { SunCareTrainer } from "@/components/trainers/sun-care-trainer";
import { LabelReaderTrainer } from "@/components/trainers/label-reader-trainer";
import { StepSequenceTrainer } from "@/components/trainers/step-sequence-trainer";
import { VolumeSafeTrainer } from "@/components/trainers/volume-safe-trainer";
import { ThermometerTrainer } from "@/components/trainers/thermometer-trainer";
import { SeasonalClothingTrainer } from "@/components/trainers/seasonal-clothing-trainer";
import { CareLabelTrainer } from "@/components/trainers/care-label-trainer";
import { TableSettingTrainer } from "@/components/trainers/table-setting-trainer";
import { FamilyIncomeTrainer } from "@/components/trainers/family-income-trainer";
import { FamilyExpensesTrainer } from "@/components/trainers/family-expenses-trainer";
import { TransportTypesTrainer } from "@/components/trainers/transport-types-trainer";
import { ScheduleBoardTrainer } from "@/components/trainers/schedule-board-trainer";
import { TicketPurchaseTrainer } from "@/components/trainers/ticket-purchase-trainer";
import { PackageTrackingTrainer } from "@/components/trainers/package-tracking-trainer";
import { PhoneCallFlowTrainer } from "@/components/trainers/phone-call-flow-trainer";
import { MessengerFlowTrainer } from "@/components/trainers/messenger-flow-trainer";
import { SafetyEtiquetteTrainer } from "@/components/trainers/safety-etiquette-trainer";
import { MyGovPortalTrainer } from "@/components/trainers/mygov-portal-trainer";
import { AtmTrainer } from "@/components/trainers/atm-trainer";
import { CreditContractTrainer } from "@/components/trainers/credit-contract-trainer";
import { FinalQuestTrainer } from "@/components/trainers/final-quest-trainer";
import { WashingMachineTrainer } from "@/components/trainers/washing-machine-trainer";
import { DetergentDosageTrainer } from "@/components/trainers/detergent-dosage-trainer";
import { MenuBuilderTrainer } from "@/components/trainers/menu-builder-trainer";
import { RecipeReaderTrainer } from "@/components/trainers/recipe-reader-trainer";
import { RecipeTimerTrainer } from "@/components/trainers/recipe-timer-trainer";
import { Mascot, type MascotMood } from "@/components/mascot";
import { SceneScenario } from "@/components/scene-scenario";
import { StudentTaskPanel, type StudentTaskPanelAnswer } from "@/components/student-task-panel";
import { CabinetIcon } from "@/components/ui-icons";
import type { LessonQuizQuestion, LessonScenario, LessonTrainer } from "@/data/program";
import { logAction } from "@/lib/auth-storage";

const dict = {
  ru: {
    trainerLabel: "Тренажёр",
    trainerTelegram: "Тренажёр Telegram",
    trainerWhatsapp: "Тренажёр WhatsApp",
    trainerGmail: "Тренажёр Gmail",
    trainerMailru: "Тренажёр Mail.ru",
    trainerUzum: "Тренажёр Uzum Market",
    trainerYandexMarket: "Тренажёр Яндекс Маркет",
    trainerMyGov: "Тренажёр my.gov.uz",
    trainerPhone: "Тренажёр звонка",
    trainerMorningQuest: "Утро Алишера — диагностика",
    trainerOutfit: "Цифровой шкаф — образ по ситуации",
    trainerHairCare: "Полка для волос — подбор шампуня",
    trainerSkinType: "Определитель типа кожи",
    trainerSunCare: "Прогноз и защита от солнца",
    trainerLabelReader: "Этикетка крема — что искать",
    trainerStepSequence: "Умывание и крем — по шагам",
    trainerVolumeSafe: "Безопасная громкость наушников",
    trainerThermometer: "Цифровой термометр — измерение",
    trainerSeasonalClothing: "Одежда по прогнозу погоды",
    trainerCareLabel: "Ярлык одежды — значки ухода",
    trainerTableSetting: "Сервировка стола",
    trainerFamilyIncome: "Бюджет семьи — доход",
    trainerFamilyExpenses: "Расходы семьи — категории",
    trainerTransportTypes: "Виды транспорта",
    trainerScheduleBoard: "Табло вокзала — поиск поезда",
    trainerTicketPurchase: "Покупка билета онлайн",
    trainerPackageTracking: "Отслеживание посылки",
    trainerPhoneCallFlow: "Телефонный звонок",
    trainerMessengerFlow: "Мессенджер — ответ в чате",
    trainerSafetyEtiquette: "Безопасно или опасно",
    trainerMyGovPortal: "Портал my.gov.uz",
    trainerAtm: "Банкомат — снятие денег",
    trainerCreditContract: "Договор кредита",
    trainerFinalQuest: "Контрольный замер",
    trainerWashingMachine: "Стиральная машина",
    trainerDetergent: "Дозировка порошка",
    trainerMenu: "Здоровый ужин",
    trainerRecipe: "Рецепт котлет",
    trainerRecipeTimer: "Яблочный пирог с таймером",
    mascotIntro: "Привет! Я Дилноза. Идём спокойно: одно правило за раз.",
    mascotLastRule: "Это последнее правило. Потом нажми кнопку ниже.",
    mascotReadRule: "Прочитай правило. Потом нажми «Дальше».",
    mascotTrainer: "Не торопись. Подумай спокойно.",
    mascotScenarioChoose: "Выбери один ответ. Не спеши.",
    mascotScenarioCorrect: "Верно. Хорошо получилось.",
    mascotScenarioWrong: "Ничего страшного. Правильный ответ подсвечен.",
    mascotQuizChoose: "Маленький вопрос. Выбери один ответ.",
    mascotQuizCorrect: "Верно. Идём дальше.",
    mascotQuizWrong: "Запомни правильный ответ — он подсвечен.",
    mascotFinish: "Ты молодец! Урок пройден.",
    speechUnavailable: "Озвучивание недоступно в этом браузере.",
    speechRules: "Правила урока.",
    speechSituation: "Ситуация.",
    speechQuestion: "Вопрос.",
    speechLessonDone: "Урок завершён.",
    speechReading: "Текст читается вслух.",
    speechLang: "ru-RU",
    trainerStartNotice: "Это похоже на настоящее приложение. Попробуй ответить.",
    firstScenarioNotice: "Сейчас будет первая ситуация.",
    nextTrainerNoticePrefix: "Теперь попробуй то же самое в ",
    nextTrainerNoticeSuffix: ".",
    shortSituationsNotice: "Теперь короткие ситуации.",
    chooseAnswerFirst: "Сначала нажмите на один вариант ответа.",
    nextScenarioNotice: "Хорошо. Переходим к следующей ситуации.",
    shortQuestionLeft: "Остался короткий вопрос.",
    lessonDoneGood: "Молодец! Урок пройден.",
    chooseOneFirst: "Сначала выберите один ответ.",
    goNext: "Идём дальше.",
    lessonFinishedScore: (score: number, total: number) =>
      `Урок завершён. Правильных ответов: ${score} из ${total}.`,
    finishFirst: "Сначала пройдите урок до конца.",
    loginToSave: "Чтобы сохранить результат, войдите в кабинет или зарегистрируйтесь.",
    savedToCabinet: "Результат сохранён в личном кабинете.",
    saveFailed: "Не удалось сохранить результат.",
    lessonRestarted: "Урок начат заново.",
    nextSituation: "Следующая ситуация",
    shortQuestion: "Короткий вопрос",
    finishLesson: "Завершить урок",
    lessonCompleteAria: "Урок завершён",
    bravo: "Молодец!",
    lessonPassedKeepGoing: "Урок пройден. Так держать!",
    stepOf: (step: number, total: number) => `Шаг ${step} из ${total}`,
    normalMode: "Обычный режим",
    focusMode: "Режим фокуса",
    readAloud: "Прочитать вслух",
    voice: "Озвучить",
    ruleOf: (current: number, total: number) => `Правило ${current} из ${total}`,
    back: "← Назад",
    next: "Дальше →",
    openTrainer: "Открыть тренажёр",
    startTasks: "Начать задания",
    firstRules: "Сначала правила",
    readRulesOneByOne: "Прочитайте короткие правила по одному.",
    trainerPartOf: (current: number, total: number) =>
      ` · часть ${current} из ${total}`,
    tryAsRealApp: "Попробуй сделать как в настоящем приложении.",
    sortSituation: "Разбери ситуацию",
    sortSituationInstruction: "Посмотри на разговор слева. Выбери один спокойный и безопасный ответ.",
    answerChosenSeeExplanation: "Ответ выбран. Посмотри объяснение ниже.",
    situationOf: (current: number, total: number) =>
      `Ситуация ${current} из ${total}`,
    scenarioHint: "Не торопись. Подумай, какой ответ поможет решить ситуацию спокойно.",
    correct: "Правильно",
    letsRemember: "Давай запомним",
    chooseAnswerFirstShort: "Сначала выбери ответ",
    practicalSituation: "Практическая ситуация",
    chooseCalmSafe: "Выберите один спокойный и безопасный ответ.",
    goodShort: "Хорошо.",
    lookAgainCalmly: "Посмотрим ещё раз спокойно.",
    goToQuestions: "Перейти к вопросам",
    shortQuestionTitle: "Короткий вопрос",
    readQuestionRight: "Прочитай вопрос справа и выбери один ответ.",
    answerQuestion: "Ответь на вопрос",
    oneShortQuestion: "Это один короткий вопрос. Выбери один вариант.",
    questionOf: (current: number, total: number) =>
      `Вопрос ${current} из ${total}`,
    quizHint: "Если не уверен, спокойно перечитай вопрос и варианты.",
    answerCorrectGoNext: "Ответ выбран правильно. Можно идти дальше.",
    correctAnswerHighlighted: "Верный ответ уже выделен. Запомни его и переходи дальше.",
    correctAnswerHighlightedFormal: "Верный ответ уже выделен. Запомните его и переходите дальше.",
    nextQuestion: "Следующий вопрос",
    knowledgeCheck: "Проверка знаний",
    questionWord: (n: number) => `Вопрос ${n}`,
    tapOneAnswer: "Нажмите на один ответ. Верный вариант подсветится.",
    rightShort: "Верно.",
    noWorries: "Ничего страшного.",
    lessonFinished: "Урок завершён",
    lessonFinishedNoOverload: "Ребёнок дошёл до конца без перегрузки экраном.",
    correctAnswersWord: "правильных ответов",
    questionsPassed: "вопросов пройдено",
    situationsSolved: "ситуации разобраны",
    saving: "Сохраняю...",
    updateResult: "Обновить результат",
    saveResult: "Сохранить результат",
    retake: "Пройти заново",
    saveResultPanel: "Сохрани результат",
    saveResultPanelInstruction: "Урок пройден. Теперь можно сохранить результат в кабинете.",
    statsLine: (scenarios: number, quizzes: number) =>
      `Разобрано ситуаций: ${scenarios}. Вопросов: ${quizzes}.`,
    done: "Готово",
    correctAnswersOf: (score: number, total: number) =>
      `Правильных ответов: ${score} из ${total}.`,
    mainSituationsCovered: "Главные ситуации урока разобраны.",
    finishBoardTitle: "Урок завершён",
    finishBoardCopy: "Все задания на этом экране пройдены спокойно и по шагам.",
    adultHint: "Подсказка для взрослого",
    whatsNext: "Что делать дальше",
    toLessonsList: "К списку уроков",
    otherLessons: "Другие уроки",
    backToCabinet: "Вернуться в кабинет",
    openOtherLessons: "Открыть другие уроки",
    message: "Сообщение",
  },
  uz: {
    trainerLabel: "Mashq",
    trainerTelegram: "Telegram mashqi",
    trainerWhatsapp: "WhatsApp mashqi",
    trainerGmail: "Gmail mashqi",
    trainerMailru: "Mail.ru mashqi",
    trainerUzum: "Uzum Market mashqi",
    trainerYandexMarket: "Yandex Market mashqi",
    trainerMyGov: "my.gov.uz mashqi",
    trainerPhone: "Qoʻngʻiroq mashqi",
    trainerMorningQuest: "Alisherning ertasi — diagnostika",
    trainerOutfit: "Raqamli shkaf — vaziyatga moslab obraz",
    trainerHairCare: "Soch javoni — shampun tanlash",
    trainerSkinType: "Teri turini aniqlash",
    trainerSunCare: "Prognoz va quyoshdan himoya",
    trainerLabelReader: "Krem yorligʻi — nimani izlash",
    trainerStepSequence: "Yuv va krem — qadamlar",
    trainerVolumeSafe: "Quloqchin tovushi xavfsizligi",
    trainerThermometer: "Raqamli termometr — oʻlchov",
    trainerSeasonalClothing: "Ob-havoga moslab kiyim",
    trainerCareLabel: "Kiyim yorligʻi — belgilar",
    trainerTableSetting: "Dasturxon yozish",
    trainerFamilyIncome: "Oila byudjeti — daromad",
    trainerFamilyExpenses: "Oila xarajatlari",
    trainerTransportTypes: "Transport turlari",
    trainerScheduleBoard: "Vokzal taxtasi",
    trainerTicketPurchase: "Onlayn chipta olish",
    trainerPackageTracking: "Posilkani kuzatish",
    trainerPhoneCallFlow: "Telefon qoʻngʻirogʻi",
    trainerMessengerFlow: "Messenjer — javob",
    trainerSafetyEtiquette: "Xavfsiz yoki xavfli",
    trainerMyGovPortal: "my.gov.uz portali",
    trainerAtm: "Bankomat",
    trainerCreditContract: "Kredit shartnomasi",
    trainerFinalQuest: "Yakuniy diagnostika",
    trainerWashingMachine: "Kir yuvish mashinasi",
    trainerDetergent: "Kukun dozasi",
    trainerMenu: "Sogʻlom kechki ovqat",
    trainerRecipe: "Kotlet retsepti",
    trainerRecipeTimer: "Olma piroq taymeri",
    mascotIntro: "Salom! Men Dilnozaman. Shoshilmaymiz: bir qoidadan boshlaymiz.",
    mascotLastRule: "Bu oxirgi qoida. Keyin pastdagi tugmani bos.",
    mascotReadRule: "Qoidani oʻqi. Keyin «Keyingisi» tugmasini bos.",
    mascotTrainer: "Shoshilma. Xotirjam oʻylab koʻr.",
    mascotScenarioChoose: "Bitta javobni tanla. Shoshilma.",
    mascotScenarioCorrect: "Toʻgʻri. Yaxshi boʻldi.",
    mascotScenarioWrong: "Hech qisi yoʻq. Toʻgʻri javob belgilab qoʻyildi.",
    mascotQuizChoose: "Kichik savol. Bitta javobni tanla.",
    mascotQuizCorrect: "Toʻgʻri. Davom etamiz.",
    mascotQuizWrong: "Toʻgʻri javobni yodda tut — u belgilab qoʻyilgan.",
    mascotFinish: "Barakalla! Darsni yakunlading.",
    speechUnavailable: "Bu brauzerda ovozli oʻqish ishlamaydi.",
    speechRules: "Dars qoidalari.",
    speechSituation: "Vaziyat.",
    speechQuestion: "Savol.",
    speechLessonDone: "Dars yakunlandi.",
    speechReading: "Matn ovoz chiqarib oʻqilmoqda.",
    speechLang: "ru-RU",
    trainerStartNotice: "Bu haqiqiy ilovaga oʻxshaydi. Javob berib koʻr.",
    firstScenarioNotice: "Hozir birinchi vaziyat boshlanadi.",
    nextTrainerNoticePrefix: "Endi xuddi shuni ",
    nextTrainerNoticeSuffix: " ilovasida sinab koʻr.",
    shortSituationsNotice: "Endi qisqa vaziyatlar boʻladi.",
    chooseAnswerFirst: "Avval bitta javobni tanlang.",
    nextScenarioNotice: "Yaxshi. Keyingi vaziyatga oʻtamiz.",
    shortQuestionLeft: "Bitta qisqa savol qoldi.",
    lessonDoneGood: "Barakalla! Dars yakunlandi.",
    chooseOneFirst: "Avval bitta javobni tanlang.",
    goNext: "Davom etamiz.",
    lessonFinishedScore: (score: number, total: number) =>
      `Dars yakunlandi. Toʻgʻri javoblar: ${total} dan ${score}.`,
    finishFirst: "Avval darsni oxirigacha tugating.",
    loginToSave: "Natijani saqlash uchun kabinetga kiring yoki roʻyxatdan oʻting.",
    savedToCabinet: "Natija shaxsiy kabinetda saqlandi.",
    saveFailed: "Natijani saqlab boʻlmadi.",
    lessonRestarted: "Dars qaytadan boshlandi.",
    nextSituation: "Keyingi vaziyat",
    shortQuestion: "Qisqa savol",
    finishLesson: "Darsni yakunlash",
    lessonCompleteAria: "Dars yakunlandi",
    bravo: "Barakalla!",
    lessonPassedKeepGoing: "Dars yakunlandi. Shu zaylda davom et!",
    stepOf: (step: number, total: number) => `${total} dan ${step}-bosqich`,
    normalMode: "Oddiy rejim",
    focusMode: "Diqqat rejimi",
    readAloud: "Ovoz chiqarib oʻqish",
    voice: "Ovoz",
    ruleOf: (current: number, total: number) => `${total} dan ${current}-qoida`,
    back: "← Orqaga",
    next: "Keyingisi →",
    openTrainer: "Mashqni ochish",
    startTasks: "Topshiriqlarni boshlash",
    firstRules: "Avval qoidalar",
    readRulesOneByOne: "Qisqa qoidalarni birma-bir oʻqing.",
    trainerPartOf: (current: number, total: number) =>
      ` · ${total} dan ${current}-qism`,
    tryAsRealApp: "Haqiqiy ilovadagidek qilib koʻr.",
    sortSituation: "Vaziyatni tahlil qil",
    sortSituationInstruction: "Chap tomondagi suhbatga qara. Bitta xotirjam va xavfsiz javobni tanla.",
    answerChosenSeeExplanation: "Javob tanlandi. Pastda izohni koʻr.",
    situationOf: (current: number, total: number) =>
      `${total} dan ${current}-vaziyat`,
    scenarioHint: "Shoshilma. Qaysi javob vaziyatni xotirjam hal qilishini oʻylab koʻr.",
    correct: "Toʻgʻri",
    letsRemember: "Yodda tutamiz",
    chooseAnswerFirstShort: "Avval javobni tanla",
    practicalSituation: "Amaliy vaziyat",
    chooseCalmSafe: "Bitta xotirjam va xavfsiz javobni tanlang.",
    goodShort: "Yaxshi.",
    lookAgainCalmly: "Xotirjam yana bir bor qaraymiz.",
    goToQuestions: "Savollarga oʻtish",
    shortQuestionTitle: "Qisqa savol",
    readQuestionRight: "Oʻng tomondagi savolni oʻqi va bitta javobni tanla.",
    answerQuestion: "Savolga javob ber",
    oneShortQuestion: "Bu bitta qisqa savol. Bitta variantni tanla.",
    questionOf: (current: number, total: number) =>
      `${total} dan ${current}-savol`,
    quizHint: "Ishonchsiz boʻlsang, savol va variantlarni xotirjam qayta oʻqi.",
    answerCorrectGoNext: "Javob toʻgʻri tanlandi. Davom etish mumkin.",
    correctAnswerHighlighted: "Toʻgʻri javob allaqachon belgilangan. Uni yodda tut va davom et.",
    correctAnswerHighlightedFormal: "Toʻgʻri javob allaqachon belgilangan. Uni yodda tuting va davom eting.",
    nextQuestion: "Keyingi savol",
    knowledgeCheck: "Bilimni tekshirish",
    questionWord: (n: number) => `${n}-savol`,
    tapOneAnswer: "Bitta javobni bosing. Toʻgʻri variant belgilab qoʻyiladi.",
    rightShort: "Toʻgʻri.",
    noWorries: "Hech qisi yoʻq.",
    lessonFinished: "Dars yakunlandi",
    lessonFinishedNoOverload: "Bola ekrandan charchamasdan, oxirigacha yetib bordi.",
    correctAnswersWord: "toʻgʻri javob",
    questionsPassed: "ta savol bajarildi",
    situationsSolved: "ta vaziyat tahlil qilindi",
    saving: "Saqlanmoqda...",
    updateResult: "Natijani yangilash",
    saveResult: "Natijani saqlash",
    retake: "Qaytadan oʻtish",
    saveResultPanel: "Natijani saqla",
    saveResultPanelInstruction: "Dars yakunlandi. Endi natijani kabinetda saqlash mumkin.",
    statsLine: (scenarios: number, quizzes: number) =>
      `Tahlil qilingan vaziyatlar: ${scenarios} ta. Savollar: ${quizzes} ta.`,
    done: "Tayyor",
    correctAnswersOf: (score: number, total: number) =>
      `Toʻgʻri javoblar: ${total} dan ${score}.`,
    mainSituationsCovered: "Darsning asosiy vaziyatlari tahlil qilindi.",
    finishBoardTitle: "Dars yakunlandi",
    finishBoardCopy: "Bu ekrandagi barcha topshiriqlar xotirjam, bosqichma-bosqich bajarildi.",
    adultHint: "Kattalar uchun maslahat",
    whatsNext: "Keyin nima qilamiz",
    toLessonsList: "Darslar roʻyxatiga",
    otherLessons: "Boshqa darslar",
    backToCabinet: "Kabinetga qaytish",
    openOtherLessons: "Boshqa darslarni ochish",
    message: "Xabar",
  },
} as const;

type LessonExperienceProps = {
  lesson: {
    slug: string;
    rules: string[];
    scenarios: LessonScenario[];
    quiz: LessonQuizQuestion[];
    adultNote: string;
    trainer?: LessonTrainer;
    extraTrainers?: LessonTrainer[];
    moduleSlug?: string;
  };
  embedded?: boolean;
  onBack?: () => void;
  onOpenLessons?: () => void;
};

type LessonStage = "rules" | "trainer" | "scenario" | "quiz" | "finish";

const publicCelebrationSymbol = "\u{2B50}";

function createAnswerState(length: number) {
  return Array.from({ length }, () => -1);
}

function replaceAnswer(current: number[], stepIndex: number, answerIndex: number) {
  return current.map((value, index) => (index === stepIndex ? answerIndex : value));
}

function createPanelAnswers({
  idPrefix,
  options,
  selectedIndex,
  correctIndex,
  onChoose,
}: {
  idPrefix: string;
  options: string[];
  selectedIndex: number;
  correctIndex: number;
  onChoose: (answerIndex: number) => void;
}): StudentTaskPanelAnswer[] {
  const answered = selectedIndex !== -1;

  return options.map((option, optionIndex) => {
    const selected = selectedIndex === optionIndex;
    return {
      id: `${idPrefix}-${optionIndex}`,
      text: option,
      state: answered
        ? optionIndex === correctIndex
          ? "correct"
          : selected
            ? "wrong"
            : "muted"
        : "idle",
      disabled: answered,
      onClick: () => onChoose(optionIndex),
    };
  });
}

function trainerTitle(trainer: LessonTrainer, t: (typeof dict)[keyof typeof dict]) {
  switch (trainer.type) {
    case "telegram":
      return t.trainerTelegram;
    case "whatsapp":
      return t.trainerWhatsapp;
    case "gmail":
      return t.trainerGmail;
    case "mailru":
      return t.trainerMailru;
    case "uzum":
      return t.trainerUzum;
    case "yandexmarket":
      return t.trainerYandexMarket;
    case "mygov":
      return t.trainerMyGov;
    case "phone":
      return t.trainerPhone;
    case "morning-quest":
      return t.trainerMorningQuest;
    case "outfit":
      return t.trainerOutfit;
    case "hair-care":
      return t.trainerHairCare;
    case "skin-type":
      return t.trainerSkinType;
    case "sun-care":
      return t.trainerSunCare;
    case "label-reader":
      return t.trainerLabelReader;
    case "step-sequence":
      return t.trainerStepSequence;
    case "volume-safe":
      return t.trainerVolumeSafe;
    case "thermometer":
      return t.trainerThermometer;
    case "seasonal-clothing":
      return t.trainerSeasonalClothing;
    case "care-label":
      return t.trainerCareLabel;
    case "table-setting":
      return t.trainerTableSetting;
    case "family-income":
      return t.trainerFamilyIncome;
    case "family-expenses":
      return t.trainerFamilyExpenses;
    case "transport-types":
      return t.trainerTransportTypes;
    case "schedule-board":
      return t.trainerScheduleBoard;
    case "ticket-purchase":
      return t.trainerTicketPurchase;
    case "package-tracking":
      return t.trainerPackageTracking;
    case "phone-call-flow":
      return t.trainerPhoneCallFlow;
    case "messenger-flow":
      return t.trainerMessengerFlow;
    case "safety-etiquette":
      return t.trainerSafetyEtiquette;
    case "mygov-portal":
      return t.trainerMyGovPortal;
    case "atm":
      return t.trainerAtm;
    case "credit-contract":
      return t.trainerCreditContract;
    case "final-quest":
      return t.trainerFinalQuest;
    case "washing-machine-v2":
      return t.trainerWashingMachine;
    case "detergent-dosage":
      return t.trainerDetergent;
    case "menu-builder":
      return t.trainerMenu;
    case "recipe-reader":
      return t.trainerRecipe;
    case "recipe-timer":
      return t.trainerRecipeTimer;
    default:
      return t.trainerLabel;
  }
}

export function LessonExperience({
  lesson,
  embedded = false,
  onBack,
  onOpenLessons,
}: LessonExperienceProps) {
  const { user, completeLesson } = useAuth();
  const locale = useLocale();
  const t = dict[locale];
  const isStudent = user?.role === "student";
  const [focusMode, setFocusMode] = useState(isStudent);
  const [stage, setStage] = useState<LessonStage>("rules");
  const [ruleIndex, setRuleIndex] = useState(0);
  const [trainerIndex, setTrainerIndex] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [scenarioAnswers, setScenarioAnswers] = useState<number[]>(
    () => createAnswerState(lesson.scenarios.length),
  );
  const [quizAnswers, setQuizAnswers] = useState<number[]>(
    () => createAnswerState(lesson.quiz.length),
  );
  const [notice, setNotice] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const completed = Boolean(
    user?.progress.some((entry) => entry.lessonSlug === lesson.slug),
  );
  const currentScenario = lesson.scenarios[scenarioIndex];
  const currentQuiz = lesson.quiz[quizIndex];
  const currentScenarioAnswer = scenarioAnswers[scenarioIndex];
  const currentQuizAnswer = quizAnswers[quizIndex];
  const quizScore = lesson.quiz.reduce((score, question, index) => {
    return score + (quizAnswers[index] === question.correctIndex ? 1 : 0);
  }, 0);

  const rootClassName = [
    "lesson-experience",
    focusMode ? "focus-mode" : "",
    embedded ? "lesson-experience--embedded" : "",
    isStudent ? "lesson-experience--student" : "",
  ].filter(Boolean).join(" ");

  const allTrainers: LessonTrainer[] = [
    ...(lesson.trainer ? [lesson.trainer] : []),
    ...(lesson.extraTrainers ?? []),
  ];
  const hasTrainer = allTrainers.length > 0;
  const currentTrainer = allTrainers[trainerIndex];
  const trainerStepsTotal = allTrainers.length;
  const trainerStepsDone =
    stage === "scenario" || stage === "quiz" || stage === "finish"
      ? trainerStepsTotal
      : stage === "trainer"
        ? trainerIndex
        : 0;
  const totalSteps = 1 + trainerStepsTotal + lesson.scenarios.length + lesson.quiz.length + 1;
  const completedSteps =
    (stage === "rules" ? 0 : 1) +
    trainerStepsDone +
    scenarioAnswers.filter((value) => value !== -1).length +
    quizAnswers.filter((value) => value !== -1).length +
    (stage === "finish" ? 1 : 0);
  const progress =
    stage === "finish"
      ? 100
      : Math.round((completedSteps / Math.max(totalSteps, 1)) * 100);

  const trainerOffset = trainerStepsTotal;
  const currentStepNumber =
    stage === "rules"
      ? 1
      : stage === "trainer"
        ? 2 + trainerIndex
        : stage === "scenario"
          ? 2 + trainerOffset + scenarioIndex
          : stage === "quiz"
            ? 2 + trainerOffset + lesson.scenarios.length + quizIndex
            : totalSteps;

  // ── Mascot hints per stage ──
  function mascotForStage(): { message: string; mood: MascotMood } | null {
    if (stage === "rules") {
      if (ruleIndex === 0) {
        return { message: t.mascotIntro, mood: "happy" };
      }
      if (ruleIndex === lesson.rules.length - 1) {
        return { message: t.mascotLastRule, mood: "happy" };
      }
      return { message: t.mascotReadRule, mood: "happy" };
    }
    if (stage === "trainer") {
      return { message: t.mascotTrainer, mood: "thinking" };
    }
    if (stage === "scenario") {
      if (currentScenarioAnswer === -1) {
        return { message: t.mascotScenarioChoose, mood: "thinking" };
      }
      if (currentScenarioAnswer === currentScenario.correctIndex) {
        return { message: t.mascotScenarioCorrect, mood: "cheer" };
      }
      return { message: t.mascotScenarioWrong, mood: "soft" };
    }
    if (stage === "quiz") {
      if (currentQuizAnswer === -1) {
        return { message: t.mascotQuizChoose, mood: "happy" };
      }
      if (currentQuizAnswer === currentQuiz.correctIndex) {
        return { message: t.mascotQuizCorrect, mood: "cheer" };
      }
      return { message: t.mascotQuizWrong, mood: "soft" };
    }
    if (stage === "finish") {
      return { message: t.mascotFinish, mood: "cheer" };
    }
    return null;
  }
  const mascotHint = isStudent ? mascotForStage() : null;

  function readLessonAloud() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setNotice(t.speechUnavailable);
      return;
    }

    const speechText =
      stage === "rules"
        ? `${t.speechRules} ${lesson.rules.join(". ")}.`
        : stage === "scenario"
          ? `${t.speechSituation} ${currentScenario.text}`
          : stage === "quiz"
            ? `${t.speechQuestion} ${currentQuiz.question}`
            : t.speechLessonDone;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = t.speechLang;
    utterance.rate = 0.92;
    window.speechSynthesis.speak(utterance);
    if (user) {
      void logAction({
        lessonSlug: lesson.slug,
        action: "hint_used",
        metadata: { stage },
      }).catch(() => undefined);
    }
    setNotice(t.speechReading);
  }

  function startLesson() {
    if (user) {
      void logAction({
        lessonSlug: lesson.slug,
        action: "lesson_start",
        metadata: { hasTrainer },
      }).catch(() => undefined);
    }

    if (hasTrainer) {
      setStage("trainer");
      setTrainerIndex(0);
      setNotice(t.trainerStartNotice);
    } else {
      setStage("scenario");
      setNotice(t.firstScenarioNotice);
    }
  }

  function trackAnswer(kind: "scenario" | "quiz", answerIndex: number, correctIndex: number) {
    if (!user) return;

    void logAction({
      lessonSlug: lesson.slug,
      action: answerIndex === correctIndex ? "answer_correct" : "answer_wrong",
      metadata: {
        kind,
        answerIndex,
        correctIndex,
        stepIndex: kind === "scenario" ? scenarioIndex : quizIndex,
      },
    }).catch(() => undefined);
  }

  function finishTrainer() {
    if (trainerIndex + 1 < allTrainers.length) {
      const nextTrainer = allTrainers[trainerIndex + 1];
      setTrainerIndex((current) => current + 1);
      const nextTitle = trainerTitle(nextTrainer, t);
      const stripped =
        locale === "ru"
          ? nextTitle.replace(/^Тренажёр\s+/, "")
          : nextTitle.replace(/\s+mashqi$/, "");
      setNotice(`${t.nextTrainerNoticePrefix}${stripped}${t.nextTrainerNoticeSuffix}`);
      return;
    }
    setStage("scenario");
    setNotice(t.shortSituationsNotice);
  }

  function openFinishStage(message: string) {
    setStage("finish");
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
    setNotice(message);
  }

  function goToNextScenario() {
    if (currentScenarioAnswer === -1) {
      setNotice(t.chooseAnswerFirst);
      return;
    }

    if (scenarioIndex < lesson.scenarios.length - 1) {
      setScenarioIndex((current) => current + 1);
      setNotice(t.nextScenarioNotice);
      return;
    }

    if (lesson.quiz.length > 0) {
      setStage("quiz");
      setNotice(t.shortQuestionLeft);
    } else {
      openFinishStage(t.lessonDoneGood);
    }
  }

  function goToNextQuiz() {
    if (currentQuizAnswer === -1) {
      setNotice(t.chooseOneFirst);
      return;
    }

    if (quizIndex < lesson.quiz.length - 1) {
      setQuizIndex((current) => current + 1);
      setNotice(t.goNext);
      return;
    }

    openFinishStage(t.lessonFinishedScore(quizScore, lesson.quiz.length));
  }

  async function saveProgress() {
    if (stage !== "finish") {
      setNotice(t.finishFirst);
      return;
    }

    if (!user) {
      setNotice(t.loginToSave);
      return;
    }

    setIsSaving(true);
    try {
      await completeLesson(lesson.slug, quizScore);
      setNotice(t.savedToCabinet);
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : t.saveFailed,
      );
    } finally {
      setIsSaving(false);
    }
  }

  function resetLesson() {
    setStage("rules");
    setScenarioIndex(0);
    setQuizIndex(0);
    setScenarioAnswers(createAnswerState(lesson.scenarios.length));
    setQuizAnswers(createAnswerState(lesson.quiz.length));
    setNotice(t.lessonRestarted);
  }

  const scenarioAnswered = currentScenarioAnswer !== -1;
  const scenarioCorrect =
    scenarioAnswered && currentScenarioAnswer === currentScenario.correctIndex;
  const scenarioPanelAnswers = createPanelAnswers({
    idPrefix: `scenario-${scenarioIndex}`,
    options: currentScenario.options,
    selectedIndex: currentScenarioAnswer,
    correctIndex: currentScenario.correctIndex,
    onChoose: (optionIndex) => {
      setScenarioAnswers((current) => replaceAnswer(current, scenarioIndex, optionIndex));
      trackAnswer("scenario", optionIndex, currentScenario.correctIndex);
      setNotice("");
    },
  });
  const scenarioNextLabel =
    scenarioIndex < lesson.scenarios.length - 1
      ? t.nextSituation
      : lesson.quiz.length > 0
        ? t.shortQuestion
        : t.finishLesson;

  const quizAnswered = currentQuizAnswer !== -1;
  const quizCorrect = quizAnswered && currentQuizAnswer === currentQuiz.correctIndex;
  const quizPanelAnswers = createPanelAnswers({
    idPrefix: `quiz-${quizIndex}`,
    options: currentQuiz.options,
    selectedIndex: currentQuizAnswer,
    correctIndex: currentQuiz.correctIndex,
    onChoose: (optionIndex) => {
      setQuizAnswers((current) => replaceAnswer(current, quizIndex, optionIndex));
      trackAnswer("quiz", optionIndex, currentQuiz.correctIndex);
      setNotice("");
    },
  });

  function renderTrainer() {
    if (!currentTrainer) return null;

    const keyId = `trainer-${trainerIndex}-${currentTrainer.type}`;

    switch (currentTrainer.type) {
      case "telegram":
        return (
          <TelegramTrainer
            key={keyId}
            trainer={currentTrainer}
            iconMode={embedded ? "svg" : "emoji"}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "whatsapp":
        return (
          <WhatsappTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "gmail":
        return (
          <GmailTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "mailru":
        return (
          <MailruTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "uzum":
        return (
          <UzumTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "yandexmarket":
        return (
          <YandexMarketTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "mygov":
        return (
          <MyGovTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "phone":
        return (
          <PhoneTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "morning-quest":
        return (
          <MorningQuestTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "outfit":
        return (
          <OutfitTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "hair-care":
        return (
          <HairCareTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "skin-type":
        return (
          <SkinTypeTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "sun-care":
        return (
          <SunCareTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "label-reader":
        return (
          <LabelReaderTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "step-sequence":
        return (
          <StepSequenceTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "volume-safe":
        return (
          <VolumeSafeTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "thermometer":
        return (
          <ThermometerTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "seasonal-clothing":
        return (
          <SeasonalClothingTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "care-label":
        return (
          <CareLabelTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "table-setting":
        return (
          <TableSettingTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "family-income":
        return (
          <FamilyIncomeTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "family-expenses":
        return (
          <FamilyExpensesTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "transport-types":
        return (
          <TransportTypesTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "schedule-board":
        return (
          <ScheduleBoardTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "ticket-purchase":
        return (
          <TicketPurchaseTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "package-tracking":
        return (
          <PackageTrackingTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "phone-call-flow":
        return (
          <PhoneCallFlowTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "messenger-flow":
        return (
          <MessengerFlowTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "safety-etiquette":
        return (
          <SafetyEtiquetteTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "mygov-portal":
        return (
          <MyGovPortalTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "atm":
        return (
          <AtmTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "credit-contract":
        return (
          <CreditContractTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "final-quest":
        return (
          <FinalQuestTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "washing-machine-v2":
        return (
          <WashingMachineTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "detergent-dosage":
        return (
          <DetergentDosageTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "menu-builder":
        return (
          <MenuBuilderTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "recipe-reader":
        return (
          <RecipeReaderTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      case "recipe-timer":
        return (
          <RecipeTimerTrainer
            key={keyId}
            trainer={currentTrainer}
            studentMode={isStudent}
            onDone={finishTrainer}
          />
        );
      default:
        return null;
    }
  }

  return (
    <section
      className={rootClassName}
      data-stage={stage}
      data-trainer={currentTrainer?.type ?? lesson.trainer?.type}
    >
      {showCelebration && (
        <div
          className="lesson-complete-overlay"
          onClick={() => setShowCelebration(false)}
          role="dialog"
          aria-label={t.lessonCompleteAria}
        >
          <div className="lesson-complete-card">
            <div
              className={`lesson-complete-star ${
                embedded ? "lesson-complete-star--svg" : ""
              }`}
            >
              {embedded ? <CabinetIcon name="trophy" /> : publicCelebrationSymbol}
            </div>
            <p className="lesson-complete-title">{t.bravo}</p>
            <p className="lesson-complete-subtitle">{t.lessonPassedKeepGoing}</p>
          </div>
        </div>
      )}
      <div className="lesson-toolbar">
        <div className="progress-shell">
          <div className="progress-label">
            <span>
              {t.stepOf(currentStepNumber, totalSteps)}
            </span>
            <strong>{progress}%</strong>
          </div>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        {!isStudent ? (
          <div className="lesson-toolbar-actions">
            <button
              type="button"
              className="button button-ghost small"
              onClick={() => setFocusMode((value) => !value)}
            >
              {focusMode ? t.normalMode : t.focusMode}
            </button>
            <button
              type="button"
              className="button button-secondary small"
              onClick={readLessonAloud}
            >
              {t.readAloud}
            </button>
          </div>
        ) : (
          <div className="lesson-toolbar-actions">
            <button
              type="button"
              className="button button-secondary small"
              onClick={readLessonAloud}
              aria-label={t.readAloud}
              title={t.readAloud}
            >
              <CabinetIcon name="sound" />
              {t.voice}
            </button>
          </div>
        )}
      </div>

      {mascotHint ? (
        <Mascot message={mascotHint.message} mood={mascotHint.mood} variant="inline" />
      ) : null}

      <div className="lesson-grid">
        <div className="lesson-main">
          {stage === "rules" ? (
            isStudent ? (
              <div className="lesson-panel lesson-step-panel lesson-rule-single">
                <p className="lesson-panel-title">
                  {t.ruleOf(ruleIndex + 1, lesson.rules.length)}
                </p>
                <div className="lesson-rule-big">
                  <span className="lesson-rule-big-number">{ruleIndex + 1}</span>
                  <p className="lesson-rule-big-text">{lesson.rules[ruleIndex]}</p>
                </div>

                <div className="lesson-rule-dots" aria-hidden="true">
                  {lesson.rules.map((_, i) => (
                    <span
                      key={i}
                      className={`lesson-rule-dot${i === ruleIndex ? " active" : ""}${i < ruleIndex ? " done" : ""}`}
                    />
                  ))}
                </div>

                <div className="lesson-actions lesson-actions--centered">
                  {ruleIndex > 0 ? (
                    <button
                      type="button"
                      className="button button-ghost"
                      onClick={() => setRuleIndex((i) => i - 1)}
                    >
                      {t.back}
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="button button-primary button-big"
                    onClick={() => {
                      if (ruleIndex < lesson.rules.length - 1) {
                        setRuleIndex((i) => i + 1);
                      } else {
                        startLesson();
                      }
                    }}
                  >
                    {ruleIndex < lesson.rules.length - 1
                      ? t.next
                      : hasTrainer ? t.openTrainer : t.startTasks}
                  </button>
                </div>
              </div>
            ) : (
              <div className="lesson-panel lesson-step-panel">
                <p className="lesson-panel-title">{t.firstRules}</p>
                <h2 className="lesson-step-heading">{t.readRulesOneByOne}</h2>
                <div className="lesson-rule-cards">
                  {lesson.rules.map((rule, index) => (
                    <div key={rule} className="lesson-rule-card">
                      <strong>{index + 1}</strong>
                      <p>{rule}</p>
                    </div>
                  ))}
                </div>
                <div className="lesson-actions">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={startLesson}
                  >
                    {hasTrainer ? t.openTrainer : t.startTasks}
                  </button>
                </div>
              </div>
            )
          ) : null}

          {stage === "trainer" && currentTrainer ? (
            <div className={isStudent ? "lesson-trainer-bare" : "lesson-panel lesson-step-panel lesson-trainer-panel"}>
              {!isStudent ? (
                <>
                  <p className="lesson-panel-title">
                    {trainerTitle(currentTrainer, t)}
                    {trainerStepsTotal > 1 ? (
                      <span className="lesson-trainer-step-tag">
                        {t.trainerPartOf(trainerIndex + 1, trainerStepsTotal)}
                      </span>
                    ) : null}
                  </p>
                  <h2 className="lesson-step-heading">{t.tryAsRealApp}</h2>
                </>
              ) : null}
              {renderTrainer()}
            </div>
          ) : null}

          {stage === "scenario" ? (
            isStudent ? (
              <div className="student-lesson-workspace student-lesson-workspace--scenario">
                <div className="student-lesson-activity student-lesson-activity--scene">
                  <SceneScenario
                    scenario={currentScenario}
                    moduleSlug={lesson.moduleSlug ?? ""}
                    index={scenarioIndex}
                    total={lesson.scenarios.length}
                    chosenIndex={currentScenarioAnswer}
                    onChoose={(i) => {
                      setScenarioAnswers((cur) =>
                        replaceAnswer(cur, scenarioIndex, i),
                      );
                      trackAnswer("scenario", i, currentScenario.correctIndex);
                      setNotice("");
                    }}
                    onNext={goToNextScenario}
                    showControls={false}
                  />
                </div>

                <StudentTaskPanel
                  title={t.sortSituation}
                  instruction={t.sortSituationInstruction}
                  question={currentScenario.title}
                  status={
                    scenarioAnswered
                      ? t.answerChosenSeeExplanation
                      : t.situationOf(scenarioIndex + 1, lesson.scenarios.length)
                  }
                  answers={scenarioPanelAnswers}
                  hint={t.scenarioHint}
                  feedback={
                    scenarioAnswered
                      ? {
                          tone: scenarioCorrect ? "good" : "soft",
                          title: scenarioCorrect ? t.correct : t.letsRemember,
                          text: scenarioCorrect
                            ? currentScenario.feedback
                            : currentScenario.support,
                        }
                      : null
                  }
                  primaryAction={{
                    label: scenarioAnswered ? scenarioNextLabel : t.chooseAnswerFirstShort,
                    onClick: goToNextScenario,
                    disabled: !scenarioAnswered,
                  }}
                />
              </div>
            ) : (
              <div className="lesson-panel lesson-step-panel">
                <p className="lesson-panel-title">{t.practicalSituation}</p>
                <h2 className="lesson-step-heading">{currentScenario.title}</h2>
                <p className="lesson-step-copy">{currentScenario.text}</p>
                <p className="lesson-step-helper">{t.chooseCalmSafe}</p>

                <div className="option-list step-options">
                  {currentScenario.options.map((option, optionIndex) => (
                    <button
                      key={option}
                      type="button"
                      className={`option-button step-option ${
                        currentScenarioAnswer === optionIndex ? "selected" : ""
                      }`}
                      onClick={() => {
                        setScenarioAnswers((current) =>
                          replaceAnswer(current, scenarioIndex, optionIndex),
                        );
                        trackAnswer("scenario", optionIndex, currentScenario.correctIndex);
                        setNotice("");
                      }}
                    >
                      <span className="step-option-index">{optionIndex + 1}</span>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>

                {currentScenarioAnswer !== -1 ? (
                  <div
                    className={`feedback ${
                      currentScenarioAnswer === currentScenario.correctIndex
                        ? "good"
                        : "neutral"
                    }`}
                  >
                    <strong>
                      {currentScenarioAnswer === currentScenario.correctIndex
                        ? t.goodShort
                        : t.lookAgainCalmly}
                    </strong>
                    <p>
                      {currentScenarioAnswer === currentScenario.correctIndex
                        ? currentScenario.feedback
                        : currentScenario.support}
                    </p>
                  </div>
                ) : null}

                <div className="lesson-actions">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={goToNextScenario}
                  >
                    {scenarioIndex < lesson.scenarios.length - 1
                      ? t.nextSituation
                      : lesson.quiz.length > 0
                        ? t.goToQuestions
                        : t.finishLesson}
                  </button>
                </div>
              </div>
            )
          ) : null}

          {stage === "quiz" ? (
            isStudent ? (
              <div className="student-lesson-workspace student-lesson-workspace--quiz">
                <div className="student-lesson-activity student-lesson-activity--quiz">
                  <div className="student-question-board">
                    <p>{t.shortQuestionTitle}</p>
                    <strong>{quizIndex + 1}</strong>
                    <span>{t.readQuestionRight}</span>
                  </div>
                </div>

                <StudentTaskPanel
                  title={t.answerQuestion}
                  instruction={t.oneShortQuestion}
                  question={currentQuiz.question}
                  status={t.questionOf(quizIndex + 1, lesson.quiz.length)}
                  answers={quizPanelAnswers}
                  hint={t.quizHint}
                  feedback={
                    quizAnswered
                      ? {
                          tone: quizCorrect ? "good" : "soft",
                          title: quizCorrect ? t.correct : t.letsRemember,
                          text: quizCorrect
                            ? t.answerCorrectGoNext
                            : t.correctAnswerHighlighted,
                        }
                      : null
                  }
                  primaryAction={{
                    label: quizAnswered
                      ? quizIndex < lesson.quiz.length - 1
                        ? t.nextQuestion
                        : t.finishLesson
                      : t.chooseAnswerFirstShort,
                    onClick: goToNextQuiz,
                    disabled: !quizAnswered,
                  }}
                />
              </div>
            ) : (
              <div className="lesson-panel lesson-step-panel">
                <p className="lesson-panel-title">{t.knowledgeCheck}</p>
                <h2 className="lesson-step-heading">{t.questionWord(quizIndex + 1)}</h2>
                <p className="lesson-step-copy">{currentQuiz.question}</p>
                <p className="lesson-step-helper">{t.tapOneAnswer}</p>

                <div className="option-list step-options">
                  {currentQuiz.options.map((option, optionIndex) => {
                    const revealState =
                      currentQuizAnswer !== -1 && optionIndex === currentQuiz.correctIndex
                        ? "correct"
                        : currentQuizAnswer !== -1 && currentQuizAnswer === optionIndex
                          ? "wrong"
                          : "";

                    return (
                      <button
                        key={option}
                        type="button"
                        className={`option-button step-option ${revealState}`}
                        onClick={() => {
                          setQuizAnswers((current) =>
                            replaceAnswer(current, quizIndex, optionIndex),
                          );
                          trackAnswer("quiz", optionIndex, currentQuiz.correctIndex);
                          setNotice("");
                        }}
                      >
                        <span className="step-option-index">{optionIndex + 1}</span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {currentQuizAnswer !== -1 ? (
                  <div
                    className={`feedback ${
                      currentQuizAnswer === currentQuiz.correctIndex ? "good" : "neutral"
                    }`}
                  >
                    <strong>
                      {currentQuizAnswer === currentQuiz.correctIndex
                        ? t.rightShort
                        : t.noWorries}
                    </strong>
                    <p>
                      {currentQuizAnswer === currentQuiz.correctIndex
                        ? t.answerCorrectGoNext
                        : t.correctAnswerHighlightedFormal}
                    </p>
                  </div>
                ) : null}

                <div className="lesson-actions">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={goToNextQuiz}
                  >
                    {quizIndex < lesson.quiz.length - 1
                      ? t.nextQuestion
                      : t.finishLesson}
                  </button>
                </div>
              </div>
            )
          ) : null}

          {stage === "finish" ? (
            isStudent ? (
              <div className="student-lesson-workspace student-lesson-workspace--finish">
                <div className="student-lesson-activity student-lesson-activity--finish">
                  <div className="student-finish-board">
                    <span aria-hidden="true">
                      <CabinetIcon name="trophy" />
                    </span>
                    <strong>{t.finishBoardTitle}</strong>
                    <p>{t.finishBoardCopy}</p>
                  </div>
                </div>

                <StudentTaskPanel
                  title={t.saveResultPanel}
                  instruction={t.saveResultPanelInstruction}
                  status={t.statsLine(lesson.scenarios.length, lesson.quiz.length)}
                  feedback={{
                    tone: "good",
                    title: t.done,
                    text:
                      lesson.quiz.length > 0
                        ? t.correctAnswersOf(quizScore, lesson.quiz.length)
                        : t.mainSituationsCovered,
                  }}
                  primaryAction={{
                    label: isSaving
                      ? t.saving
                      : completed
                        ? t.updateResult
                        : t.saveResult,
                    onClick: saveProgress,
                    disabled: isSaving,
                  }}
                  secondaryAction={{
                    label: t.retake,
                    onClick: resetLesson,
                    variant: "ghost",
                  }}
                />
              </div>
            ) : (
              <div className="lesson-panel lesson-step-panel lesson-finish-panel">
                <p className="lesson-panel-title">{t.lessonFinished}</p>
                <h2 className="lesson-step-heading">{t.lessonFinishedNoOverload}</h2>
                <div className="lesson-finish-grid">
                  <div className="lesson-rule-card">
                    <strong>{quizScore}</strong>
                    <p>{t.correctAnswersWord}</p>
                  </div>
                  <div className="lesson-rule-card">
                    <strong>{lesson.quiz.length}</strong>
                    <p>{t.questionsPassed}</p>
                  </div>
                  <div className="lesson-rule-card">
                    <strong>{lesson.scenarios.length}</strong>
                    <p>{t.situationsSolved}</p>
                  </div>
                </div>
                <div className="lesson-actions">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={saveProgress}
                    disabled={isSaving}
                  >
                    {isSaving
                      ? t.saving
                      : completed
                        ? t.updateResult
                        : t.saveResult}
                  </button>
                  <button
                    type="button"
                    className="button button-ghost"
                    onClick={resetLesson}
                  >
                    {t.retake}
                  </button>
                </div>
              </div>
            )
          ) : null}
        </div>

        {!isStudent ? (
          <aside className="lesson-side">
            <div className="lesson-panel side">
              <p className="lesson-panel-title">{t.adultHint}</p>
              <p className="support-copy">{lesson.adultNote}</p>
            </div>

            <div className="lesson-panel side">
              <p className="lesson-panel-title">{t.whatsNext}</p>
              <div className="next-steps">
                {embedded ? (
                  <>
                    <button
                      type="button"
                      className="button button-secondary"
                      onClick={onBack}
                    >
                      {t.toLessonsList}
                    </button>
                    <button
                      type="button"
                      className="button button-ghost"
                      onClick={onOpenLessons}
                    >
                      {t.otherLessons}
                    </button>
                  </>
                ) : (
                  <>
                    <Link className="button button-secondary" href="/dashboard#today">
                      {t.backToCabinet}
                    </Link>
                    <Link className="button button-ghost" href="/dashboard#lessons">
                      {t.openOtherLessons}
                    </Link>
                  </>
                )}
              </div>
            </div>

            {notice ? (
              <div className="lesson-panel side notice-panel">
                <p className="lesson-panel-title">{t.message}</p>
                <p>{notice}</p>
              </div>
            ) : null}
          </aside>
        ) : null}
      </div>
    </section>
  );
}
