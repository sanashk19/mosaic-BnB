// Generate a Word (.docx) lesson plan for a teacher.
// Used in the teacher cabinet — download per lesson.

import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  HeadingLevel,
  Header,
  LevelFormat,
  PageNumber,
  Packer,
  Paragraph,
  PageOrientation,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from "docx";
import type {
  LessonMethodology,
  LessonStageBlock,
  ProgramLesson,
} from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

const dict = {
  ru: {
    lessonNotes: "Lesson summary",
    section1: "1. Lesson passport",
    section2: "2. Goal and objectives",
    section3: "3. Planned results",
    section4: "4. Lesson progress",
    section5: "5. Personalization and support",
    section6: "6. Homework",
    section7: "7. Teacher observation sheet",
    appendix1: "Appendix 1. Situational tasks",
    appendix2: "Appendix 2. Test questions",
    course: "Well",
    courseValue: "Social awareness / digital literacy",
    module: "Module",
    lessonTopic: "Lesson topic",
    classGroup: "Class/group",
    studentCategory: "Category of students",
    studentCategoryValue: "children with disabilities, mild mental retardation (F70)",
    duration: "Duration",
    lessonType: "Lesson type",
    workForm: "Form of work",
    workFormValue:
      "frontal work, individual practice, situation analysis",
    methods: "Methods",
    methodsValue:
      "explanation, showing a sample, practical work, questions on the situation, positive reinforcement",
    equipment: "Equipment",
    teacher: "Teacher",
    date: "Date",
    objective: "Target",
    educationalTasks: "Educational objectives",
    correctionalTasks: "Corrective and developmental tasks",
    correctionalTasksValue:
      "develop understanding of instructions, attention, independence, ability to choose a safe action according to a model",
    upbringingTasks: "Educational tasks",
    upbringingTasksValue:
      "develop polite communication, accuracy, a calm attitude towards mistakes and a willingness to ask for help",
    keywords: "Keywords",
    keywordsDefault: "key concepts of the topic",
    flowIntro:
      "The technological map shows the sequence of stages, the actions of the teacher and the expected activity of students.",
    stage: "Lesson stage",
    time: "Time",
    activity: "Contents of the activity",
    teacherSays: "Teacher's words:",
    teacherDoes: "Teacher's activities:",
    studentActivity: "Student activities:",
    studentActivityDefault:
      "Listen to the instructions, answer questions, complete the task.",
    methodSupport: "Methodological support and control:",
    methodSupportDefault:
      "Short instructions, showing a sample, individual repetition of the step.",
    direction: "Direction",
    plannedResult: "Planned result",
    subject: "Subject",
    correctional: "Correctional and developmental",
    personal: "Personal",
    individualization1:
      "Give instructions in a short phrase and show one example of an action.",
    individualization2:
      "If there is difficulty, return the student to the previous successful step.",
    individualization3:
      "Assess not speed, but understanding of instructions and independence of execution.",
    homeworkDefault:
      "Repeat with your parent the main action from the lesson in a calm everyday situation.",
    adultNoteTitle: "Memo for an adult",
    observationIntro: "To be completed during or immediately after class.",
    observationStudent: "FI students",
    observationUnderstood: "I understand the instructions",
    observationPerformed: "Performed an action",
    observationHelp: "Need help",
    observationComment: "Teacher's comment",
    num: "№",
    situation: "Situation",
    answerOptions: "Answer options",
    methodHint: "Methodical hint",
    correctAnswer: "Correct answer",
    question: "Question",
    options: "Options",
    footer: "MOSAIC. SBO program for children with F70",
    header: "MOSAIC | Lesson summary",
    page: "Page",
    plannedSubjectDefault: (title: string) =>`The student understands the topic "${title}” and applies it in a simple everyday situation.`,
    correctional1:
      "Understands short instructions and carries out the action step by step.",
    correctional2: "Keeps you focused on one task without cluttering the screen.",
    correctional3:
      "Learns to ask for help in a calm phrase if the action does not work.",
    personal1: "Follows rules of safe and polite behavior.",
    personal2: "Shows independence in educational everyday situations.",
    personal3: "Accepts the correction of an error without a strong negative reaction.",
    formatWithTrainer: (label: string) =>`combined lesson with digital simulator${label}`,
    formatWithoutTrainer:
      "combined lesson with analysis of life situations",
    resultOrg: "The class is ready for work, the rules of conduct have been reminded.",
    resultIntro: "Students understand the topic and life situation of the lesson.",
    resultRules:
      "The students discussed the key rules for safe operation.",
    resultTrainer:
      "The students completed the main practical action in the simulator.",
    resultScenarios:
      "Students explain the choice and identify the safe option.",
    resultSummary:
      "The teacher records what happened and who needs support.",
    resultHomework: "Homework is understandable to both the child and the adult.",
    resultDefault:
      "Teacher observation and short verbal feedback.",
    keywordCheckOrg: "organization",
    keywordCheckIntro: "introduction",
    keywordCheckRules: "rules",
    keywordCheckTrainer: "training",
    keywordCheckScenarios: "situation",
    keywordCheckSummary: "result",
    keywordCheckHomework: "home",
    desc: (title: string) =>`Lesson plan:${title}`,
  },
  uz: {
    lessonNotes: "Dars konspekti",
    section1: "1. Dars pasporti",
    section2: "2. Maqsad va vazifalar",
    section3: "3. Rejalashtirilgan natijalar",
    section4: "4. Dars borishi",
    section5: "5. Individuallashtirish va qoʻllab-quvvatlash",
    section6: "6. Uy vazifasi",
    section7: "7. Pedagog kuzatuv varagʻi",
    appendix1: "1-ilova. Vaziyatli topshiriqlar",
    appendix2: "2-ilova. Tekshirish savollari",
    course: "Kurs",
    courseValue:
      "Ijtimoiy-maishiy moslashuv / raqamli savodxonlik",
    module: "Modul",
    lessonTopic: "Dars mavzusi",
    classGroup: "Sinf / guruh",
    studentCategory: "Oʻquvchilar toifasi",
    studentCategoryValue:
      "imkoniyati cheklangan bolalar, yengil aqliy zaiflik (F70)",
    duration: "Davomiyligi",
    lessonType: "Dars turi",
    workForm: "Ish shakli",
    workFormValue:
      "frontal ish, individual amaliyot, vaziyatlar tahlili",
    methods: "Usullar",
    methodsValue:
      "tushuntirish, namuna koʻrsatish, amaliy ish, vaziyatli savollar, ijobiy rugʻbatlantirish",
    equipment: "Jihozlar",
    teacher: "Pedagog",
    date: "Sana",
    objective: "Maqsad",
    educationalTasks: "Taʼlimiy vazifalar",
    correctionalTasks: "Korreksion-rivojlantiruvchi vazifalar",
    correctionalTasksValue:
      "yoʻriqnomani tushunishni, diqqatni, mustaqillikni, namuna boʻyicha xavfsiz harakatni tanlashni rivojlantirish",
    upbringingTasks: "Tarbiyaviy vazifalar",
    upbringingTasksValue:
      "muloyim muloqot, ozodalik, xatoga sokin munosabat va yordam soʻrashga tayyorlikni shakllantirish",
    keywords: "Kalit soʻzlar",
    keywordsDefault: "mavzuning asosiy tushunchalari",
    flowIntro:
      "Texnologik xarita bosqichlar ketma-ketligini, pedagog harakatlarini va oʻquvchilarning kutilayotgan faolligini koʻrsatadi.",
    stage: "Dars bosqichi",
    time: "Vaqt",
    activity: "Faoliyat mazmuni",
    teacherSays: "Oʻqituvchi soʻzlaydi:",
    teacherDoes: "Oʻqituvchi bajaradi:",
    studentActivity: "Oʻquvchilar faoliyati:",
    studentActivityDefault:
      "Yoʻriqnomani tinglaydilar, savollarga javob beradilar, topshiriqni bajaradilar.",
    methodSupport: "Metodik qoʻllab-quvvatlash va nazorat:",
    methodSupportDefault:
      "Qisqa yoʻriqnoma, namuna koʻrsatish, qadamni individual takrorlash.",
    direction: "Yoʻnalish",
    plannedResult: "Rejalashtirilgan natija",
    subject: "Predmetli",
    correctional: "Korreksion-rivojlantiruvchi",
    personal: "Shaxsiy",
    individualization1:
      "Yoʻriqnomani qisqa ibora bilan berib, bir namuna harakatni koʻrsatish.",
    individualization2:
      "Qiyinchilik tugʻilganda oʻquvchini avvalgi muvaffaqiyatli qadamga qaytarish.",
    individualization3:
      "Tezlikni emas, yoʻriqnomani tushunish va mustaqil bajarishni baholash.",
    homeworkDefault:
      "Ota-ona bilan birga darsning asosiy harakatini sokin maishiy vaziyatda takrorlash.",
    adultNoteTitle: "Kattalar uchun eslatma",
    observationIntro: "Dars davomida yoki darsdan keyin toʻldiriladi.",
    observationStudent: "Oʻquvchi FISh",
    observationUnderstood: "Yoʻriqnomani tushundi",
    observationPerformed: "Harakatni bajardi",
    observationHelp: "Yordam kerak",
    observationComment: "Pedagog izohi",
    num: "№",
    situation: "Vaziyat",
    answerOptions: "Javob variantlari",
    methodHint: "Metodik maslahat",
    correctAnswer: "Toʻgʻri javob",
    question: "Savol",
    options: "Variantlar",
    footer: "MOSAIC. F70 bolalar uchun IMM dasturi",
    header: "MOSAIC | Dars konspekti",
    page: "Sahifa ",
    plannedSubjectDefault: (title: string) =>
      `Oʻquvchi «${title}» mavzusini tushunadi va uni oddiy maishiy vaziyatda qoʻllaydi.`,
    correctional1:
      "Qisqa yoʻriqnomani tushunadi va harakatni bosqichma-bosqich bajaradi.",
    correctional2:
      "Bir topshiriqqa diqqatni saqlaydi, ekranni ortiqcha yuklamasdan.",
    correctional3:
      "Harakat boʻlmaganda sokin ibora bilan yordam soʻrashga oʻrganadi.",
    personal1: "Xavfsiz va muloyim xulq-atvor qoidalariga rioya qiladi.",
    personal2: "Oʻquv maishiy vaziyatda mustaqillik koʻrsatadi.",
    personal3:
      "Xatoni tuzatishni keskin salbiy munosabatsiz qabul qiladi.",
    formatWithTrainer: (label: string) =>
      `${label} raqamli mashqi bilan aralash dars`,
    formatWithoutTrainer:
      "hayotiy vaziyatlarni tahlil qilish bilan aralash dars",
    resultOrg: "Sinf ishga tayyor, xulq-atvor qoidalari eslatildi.",
    resultIntro:
      "Oʻquvchilar mavzu va darsning hayotiy vaziyatini tushunadi.",
    resultRules:
      "Oʻquvchilar xavfsiz harakatning asosiy qoidalarini aytib oʻtdilar.",
    resultTrainer:
      "Oʻquvchilar mashqda asosiy amaliy harakatni bajardilar.",
    resultScenarios:
      "Oʻquvchilar tanlovni tushuntiradi va xavfsiz variantni ajrata oladi.",
    resultSummary:
      "Oʻqituvchi nima muvaffaqiyatli boʻlganini va kimga yordam kerakligini qayd etadi.",
    resultHomework: "Uy vazifasi bola va kattalar uchun tushunarli.",
    resultDefault: "Oʻqituvchining kuzatuvi va qisqa ogʻzaki fikr-mulohaza.",
    keywordCheckOrg: "tashkil",
    keywordCheckIntro: "kirish",
    keywordCheckRules: "qoida",
    keywordCheckTrainer: "mashq",
    keywordCheckScenarios: "vaziyat",
    keywordCheckSummary: "yakun",
    keywordCheckHomework: "uy",
    desc: (title: string) => `Dars rejasi: ${title}`,
  },
} as const;

const trainerHumanLabels: Record<string, Record<Locale, string>> = {
  telegram: { ru: "Telegram", uz: "Telegram" },
  gmail: { ru: "Gmail", uz: "Gmail" },
  uzum: { ru: "Uzum Market", uz: "Uzum Market" },
  mygov: { ru: "my.gov.uz", uz: "my.gov.uz" },
  phone: { ru: "phone call (103)", uz: "telefon qoʻngʻirogʻi (103)" },
};

// Generate a sensible 30-minute methodology from the lesson's data
// (goals, rules, trainer, scenarios, quiz, adultNote). Used when the lesson
// doesn't have a hand-written methodology, so every Word plan is full.
function buildAutoMethodology(
  lesson: ProgramLesson,
  locale: Locale,
): LessonMethodology {
  const trainerLabel = lesson.trainer
    ? trainerHumanLabels[lesson.trainer.type]?.[locale] ?? null
    : null;
  const trainerTask =
    lesson.trainer && "task" in lesson.trainer
      ? (lesson.trainer as { task: string }).task
      : null;

  const isUz = locale === "uz";

  const objective =
    lesson.intro
    ?? (isUz
      ?`«${lesson.title}» mavzusi doirasida yengil aqliy zaiflikka ega bolalarda amaliy koʻnikma shakllantirish.`
      : `Develop practical skills within the framework of the topic “${lesson.title}» in children with mild mental retardation.`);

  const tasks = lesson.goals.length
    ? lesson.goals
    : isUz
      ? [
          `«${lesson.title}» darsining asosiy tushunchalarini tushunish.`,
          "Xavfsiz harakatlar tartibini yodda saqlash.",
          "Bilimlarni amaliy topshiriqda qoʻllash.",
        ]
      : [
          `Understand the basic concepts of the lesson "${lesson.title}».`,
          "Remember safe procedures.",
          "Apply knowledge on a practical task.",
        ];

  const materials = isUz
    ? [
        "Har bir oʻquvchida Mosaic kabineti ochilgan planshet yoki noutbuk.",
        trainerLabel
          ?`Internetga ulanish (${trainerLabel} mashqi).`: "Mavzu boʻyicha kalit soʻzlar kartochkalari (har bir partaga bittadan).",
        "Namoyish uchun doska yoki ekran.",
        "Oʻqituvchining qisqa qaydlari uchun daftar va ruchka.",
      ]
    : [
        "Each student has a tablet or laptop with an open Mosaic office.",
        trainerLabel
          ?`Internet connection (simulator${trainerLabel}).`: "Cards with keywords of the topic (one per desk).",
        "Board or screen for display.",
        "Notebook and pen for short teacher notes.",
      ];

  const minLabel = isUz ? "daqiqa" : "i";
  const stages: LessonStageBlock[] = [];

  // UI Logic
  stages.push({
    duration:`3 ${minLabel}`,
    title: isUz ? "1. Tashkiliy qism" : "1. Organizational moment",
    teacherSays: isUz
      ?`Assalomu alaykum, bolalar. Bugun «${lesson.title}» mavzusini oʻrganamiz. Sokin va navbat bilan ishlaymiz.`
      : `Hello guys. Today we will study the topic: “${lesson.title}" Let's study calmly and one at a time.`,
    teacherDoes: isUz
      ? [
          "Sinfni salomlash, planshetlar tayyorligini tekshirish.",
          "Kartochkalar yoki tarqatma materiallarni tarqatish (agar foydalanilsa).",
          "Sukunat va qoʻl koʻtarish qoidasini eslatish.",
        ]
      : [
          "Greet the class and check that the tablets are ready.",
          "Distribute cards or handouts (if used).",
          "Remind the rule of silence and raised hands.",
        ],
    studentActivity: isUz
      ? "Oʻquvchilar partada oʻtirgan, har birida Mosaic kabineti ochilgan planshet."
      : "Students sit at desks, each with an open Mosaic office on a tablet.",
    hint: isUz
      ? "Agar kimdir hayajonlangan boʻlsa — bolaning ismini sokin takrorlang, ovozni koʻtarmasdan."
      : "If someone is excited, calmly repeat the child’s name without raising your voice.",
  });

  // UI Logic
  stages.push({
    duration:`5 ${minLabel}`,
    title: isUz ? "2. Mavzuga kirish" : "2. Introduction to the topic",
    teacherSays:
      lesson.summary
      ?? (isUz
        ?`Bugungi mavzu — ${lesson.title}.`
        : `Today's topic is${lesson.title}.`),
    teacherDoes: isUz
      ? [
          "Ekranda darsning kalit tushunchalarini koʻrsatish (yoki aytib berish).",
          "Mavzuni hayot bilan bogʻlash: sinfga 1–2 ta oddiy savol berish.",
          "Bolalarning har qanday javobini bahosiz qabul qilish.",
        ]
      : [
          "Display (or name) the key concepts of the lesson.",
          "Relate the topic to life: Ask 1-2 simple questions to the class.",
          "Accept any children's answers without evaluation.",
        ],
    studentActivity: isUz
      ? "Oʻquvchilar qoʻl koʻtarib, mavzu boʻyicha tanish narsalarni aytib beradilar."
      : "Students raise their hands and answer what they know about the topic.",
    hint: isUz
      ? "Bu bosqichda eng muhimi — mavhum soʻzni aniq rasm yoki bolaning hayotidagi vaziyat bilan bogʻlash."
      : "The main thing at this stage is to connect an abstract word with a specific picture or incident from the child’s life.",
  });

  // UI Logic
  stages.push({
    duration:`4 ${minLabel}`,
    title: isUz
      ? "3. Kabinetdagi qoidalarni oʻqish"
      : "3. Reading the rules in the office",
    teacherSays: isUz
      ? "Endi oʻz kabinetingizni oching va katta «Boshlash» tugmasini bosing. Maskot Dilnoza sizni boshlab boradi."
      : "Now open your account and click the big “Get Started” button. Mascot Dilnoza will guide you.",
    teacherDoes: isUz
      ? [
          "Sinf uchun darsni ochish («Darslar» boʻlimidagi «Sinfga ochish» tugmasi).",
          "Har bir oʻquvchiga yaqinlashib, dars ochilganiga ishonch hosil qilish.",
          "Har bir qoidani bolalar bilan birga ovoz chiqarib oʻqish, bir-bir.",
        ]
      : [
          "Open a lesson for the class (the “Open to class” button in the “Lessons” section).",
          "Approach each student and make sure that the lesson has opened.",
          "Read each rule out loud with the children, one at a time.",
        ],
    studentActivity: isUz
      ?`Oʻquvchilar ${lesson.rules.length} ta qoidani bir-bir oʻqib, «Davom etish →» tugmasini bosadilar. Maskot maslahat aytadi.`
      : `Students read one at a time${lesson.rules.length}rules, click “Next →”. The mascot tells the clue.`,
    hint: isUz
      ? "Agar bola qoidada «toʻxtab qolsa» — ovoz chiqarib oʻqishni soʻrang, shoshiltirmang."
      : "If a child gets “stuck” on a rule, ask him to read it out loud, don’t rush it.",
  });

  // UI Logic
  if (trainerLabel) {
    stages.push({
      duration:`8 ${minLabel}`,
      title: isUz
        ? `4. ${trainerLabel} mashqi (asosiy bosqich)`
        : `4. Trainer${trainerLabel}(main stage)`,
      teacherSays: isUz
        ? "Hozir siz haqiqiy ilova ekranini koʻrasiz. Topshiriqni oʻqing va sokin bajarib koʻring."
        : "Now you will see the actual application screen. Read the task and try to do it calmly.",
      teacherDoes: isUz
        ? [
            "Har bir oʻquvchiga yaqinlashib, tanlovini kuzatish.",
            "Toʻgʻri javobni aytmaslik — yetaklovchi savol berish: «Hayotda qanday qilarding?».",
            "Tugagandan keyin soʻrash: «Nega aynan shuni tanlading?».",
            "Daftarga kimga maslahat kerak boʻlganini qayd qilish.",
          ]
        : [
            "Approach each student and observe their choice.",
            "Don’t give a direct answer - ask a leading question: “What would you do in life?”",
            "After finishing, ask: “Why did you choose this?”",
            "Record in your notebook who needed the hint.",
          ],
      studentActivity: trainerTask
        ? isUz
          ?`Har bir oʻquvchi oʻz planshetida topshiriqni bajaradi: «${trainerTask}». Mashq ${trainerLabel} interfeysini takrorlaydi.`
          : `Each student completes the task on his tablet: “${trainerTask}" The simulator replicates the interface${trainerLabel}.`
        : isUz
          ? `Har bir oʻquvchi planshetda ${trainerLabel} mashqini oʻtaydi.`
          : `Each student goes through a simulator on a tablet.${trainerLabel}.`,
      hint: isUz
        ? "Bu eng muhim bosqich. Maqsad — birinchi marta toʻgʻri javob emas, balki haqiqiy vazifani tushunish."
        : "This is the most important stage. The goal is not to get the answer right the first time, but to understand the real problem.",
    });
  } else {
    stages.push({
      duration:`8 ${minLabel}`,
      title: isUz ? "4. Amaliy topshiriq" : "4. Practical task",
      teacherSays: isUz
        ? "Kabinetda topshiriqni oching. Har bir vaziyatda qanday harakat qilishni oʻylab koʻring."
        : "Open the task in your office. Think about what to do in each situation.",
      teacherDoes: isUz
        ? [
            "Har bir oʻquvchiga yaqinlashib, tanlovini kuzatish.",
            "Agar bola xato qilsa — toʻgʻri javobni ovoz chiqarib oʻqishni soʻrash.",
            "Qoʻllab-quvvatlash kerak boʻlgan bolalarning ismlarini yozib olish.",
          ]
        : [
            "Approach each student and observe the choice.",
            "If the child makes a mistake, ask the child to read the correct answer out loud.",
            "Write down the names of those who needed support.",
          ],
      studentActivity: isUz
        ? "Oʻquvchilar kabinetda dars mavzusiga oid oʻquv vaziyatlarini oʻtaydilar, sokin va xavfsiz javobni tanlaydilar."
        : "Students in the classroom go through educational situations on the topic of the lesson, choose a calm and safe answer.",
      hint: isUz
        ? "Agar topshiriq qiyin boʻlsa — birinchi vaziyatni ekranda sinf bilan birga oʻting."
        : "If the task turned out to be difficult, go through the first situation with the class on the screen.",
    });
  }

  // UI Logic
  if (lesson.scenarios.length > 0) {
    stages.push({
      duration:`5 ${minLabel}`,
      title: isUz ? "5. Vaziyatlarni tahlil qilish" : "5. Analysis of situations",
      teacherSays: isUz
        ? "Endi bir nechta qisqa vaziyat. Sokin oʻylab koʻring, kim nima deydi."
        : "Now a few short situations. Think calmly about who will say what.",
      teacherDoes: isUz
        ? [
            "Bolalar savolni oxirigacha oʻqishini nazorat qilish.",
            "Har bir vaziyatdan keyin sinfdan soʻrash: «Nimani tanlading? Nega?».",
            "Agar oʻquvchi xato qilsa — koyimaslik, balki toʻgʻri javobni ovoz chiqarib oʻqishni soʻrash.",
          ]
        : [
            "Make sure that children read the question to the end.",
            "After each scene, ask the class: “What did you choose? Why?\".",
            "If the student makes a mistake, do not scold him, but ask him to read the correct answer out loud.",
          ],
      studentActivity: isUz
        ?`Oʻquvchilar turli suhbatdoshlar bilan ${lesson.scenarios.length} ta qisqa sahnani oʻtaydilar. Muloyim va xavfsiz javobni tanlaydilar.`
        : `Students pass${lesson.scenarios.length}short scenes with different interlocutors. Choose a polite and safe answer.`,
      hint: isUz
        ? "Sahnalarda vaziyatlarni farqlashga oʻrgatamiz. Boshida oʻqigan qoidalarga tayanamiz."
        : "In scenes we learn to distinguish between situations. We rely on the rules that we read at the beginning.",
    });
  }

  // UI Logic
  stages.push({
    duration:`3 ${minLabel}`,
    title: isUz
      ? `${stages.length + 1}. Muhokama va yakun`
      : `${stages.length + 1}. Discussion and outcome`,
    teacherSays: isUz
      ? "Bugun nima yangi narsa bilib oldingiz? Nima qiyin boʻldi? Nima yodda qoldi?"
      : "What new did you learn today? What was difficult? What do you remember?",
    teacherDoes: isUz
      ? [
          "3–4 oʻquvchini tinglash.",
          "Har bir oʻquvchini aniq harakati uchun ismi bilan maqtash.",
          "Kabinetda darsni sinf uchun yopish.",
        ]
      : [
          "Listen to 3–4 students.",
          "Praise each student by name for a specific action.",
          "Close the lesson for the class in the office.",
        ],
    studentActivity: isUz
      ? "Oʻquvchilar endi nimani bilishlarini aytadilar. Individual maqtov oladilar."
      : "Students say what they can do now. Receive individual praise.",
    hint: isUz
      ? "Maqtov aniq boʻlishi kerak: «Sen toʻgʻri javobni tanlading» — umumiy «barakalla» emas."
      : "Praise should be specific: “You chose the right answer” - and not a general “well done.”",
  });

  // UI Logic
  stages.push({
    duration:`2 ${minLabel}`,
    title: isUz
      ? `${stages.length + 1}. Uy vazifasi`
      : `${stages.length + 1}. Homework`,
    teacherSays: isUz
      ? "Uyda ota-ona bilan birga darsning asosiysini takrorlang. Ertaga aytib berasiz."
      : "At home, together with your parent, repeat the main points from the lesson. You'll tell me tomorrow.",
    teacherDoes: isUz
      ? [
          "Doskaga uy vazifasining qisqa matnini yozish.",
          "Agar ota-ona uchun eslatma boʻlsa — tarqatish.",
        ]
      : [
          "Write a short statement of homework on the board.",
          "Distribute the handout to parents (if you have one).",
        ],
    hint: isUz
      ? "Uy vazifasi koʻnikmani haqiqiy hayotda mustahkamlaydi. Ota-onasiz — ishlamaydi."
      : "Homework reinforces the skill in real life. Without a parent, it doesn't work.",
  });

  return {
    objective,
    tasks,
    materials,
    stages,
    differentiation: isUz
      ? "Kuchli oʻquvchilar uchun: mashqni qayta oʻtish yoki oʻz misolini oʻylab topishni taklif qiling. Zaif oʻquvchilar uchun: pedagog bilan juftlikda, har bir qadamni ovoz chiqarib aytib mashqni oʻting."
      : "For strong students: offer to go through the simulator again or come up with your own example. For the weak: go through the simulator together with a teacher, saying each step out loud.",
    homework: isUz
      ? "Uyda kattalar bilan birga: darsdagi asosiy harakatni haqiqiy hayotda bir marta takrorlash (yoki topshiriqni qanday oʻtishni koʻrsatish)."
      : "At home with an adult: repeat the main action from the lesson once in real life (or show how to complete the task).",
    safetyNote: lesson.adultNote,
  };
}

const FONT = "Times New Roman";
const ACCENT = "000000";
const BORDER = "000000";
const BODY_SIZE = 24;
const CELL_SIZE = 20;
const PAGE_WIDTH = 11906;
const PAGE_HEIGHT = 16838;
const PAGE_MARGIN = 1134;
const TABLE_WIDTH = PAGE_WIDTH - PAGE_MARGIN * 2;

type DocChild = Paragraph | Table;

const trainerLabels: Record<string, Record<Locale, string>> = {
  telegram: { ru: "Telegram", uz: "Telegram" },
  gmail: { ru: "Gmail", uz: "Gmail" },
  uzum: { ru: "Uzum Market", uz: "Uzum Market" },
  mygov: { ru: "my.gov.uz", uz: "my.gov.uz" },
  phone: { ru: "Call 103", uz: "103 qoʻngʻiroq" },
};

export function getLessonDocxFileName(lesson: Pick<ProgramLesson, "slug">) {
  return`${lesson.slug}.docx`;
}

function paragraph(
  text: string,
  opts?: {
    bold?: boolean;
    italic?: boolean;
    color?: string;
    size?: number;
    heading?: (typeof HeadingLevel)[keyof typeof HeadingLevel];
    alignment?: (typeof AlignmentType)[keyof typeof AlignmentType];
    before?: number;
    after?: number;
  },
) {
  return new Paragraph({
    heading: opts?.heading,
    alignment: opts?.alignment,
    children: [
      new TextRun({
        text,
        font: FONT,
        size: opts?.size ?? BODY_SIZE,
        bold: opts?.bold,
        italics: opts?.italic,
        color: opts?.color,
      }),
    ],
    spacing: { before: opts?.before ?? 0, after: opts?.after ?? 120, line: 276 },
  });
}

function sectionTitle(text: string) {
  return paragraph(text, {
    heading: HeadingLevel.HEADING_2,
    bold: true,
    color: ACCENT,
    size: 28,
    before: 240,
    after: 120,
  });
}

function subTitle(text: string) {
  return paragraph(text, {
    heading: HeadingLevel.HEADING_3,
    bold: true,
    color: ACCENT,
    size: 24,
    before: 160,
    after: 80,
  });
}

function bullet(text: string, size = BODY_SIZE) {
  return new Paragraph({
    children: [new TextRun({ text, font: FONT, size })],
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 80, line: 276 },
  });
}

function spacer(after = 80) {
  return new Paragraph({
    children: [new TextRun({ text: "", font: FONT })],
    spacing: { after },
  });
}

function emptyLine() {
  return "________________________________";
}

function cellParagraph(
  text: string,
  opts?: {
    bold?: boolean;
    italic?: boolean;
    color?: string;
    size?: number;
    alignment?: (typeof AlignmentType)[keyof typeof AlignmentType];
    after?: number;
  },
) {
  return new Paragraph({
    alignment: opts?.alignment,
    children: [
      new TextRun({
        text,
        font: FONT,
        size: opts?.size ?? CELL_SIZE,
        bold: opts?.bold,
        italics: opts?.italic,
        color: opts?.color,
      }),
    ],
    spacing: { after: opts?.after ?? 60, line: 240 },
  });
}

function textCell(
  text: string,
  opts?: {
    width?: number;
    fill?: string;
    bold?: boolean;
    color?: string;
    alignment?: (typeof AlignmentType)[keyof typeof AlignmentType];
    columnSpan?: number;
  },
) {
  return new TableCell({
    width: opts?.width ? { size: opts.width, type: WidthType.DXA } : undefined,
    shading: opts?.fill ? { fill: opts.fill } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    columnSpan: opts?.columnSpan,
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    children: [
      cellParagraph(text, {
        bold: opts?.bold,
        color: opts?.color,
        alignment: opts?.alignment,
      }),
    ],
  });
}

function richCell(
  children: Paragraph[],
  opts?: { width?: number; fill?: string; columnSpan?: number },
) {
  return new TableCell({
    width: opts?.width ? { size: opts.width, type: WidthType.DXA } : undefined,
    shading: opts?.fill ? { fill: opts.fill } : undefined,
    verticalAlign: VerticalAlign.TOP,
    columnSpan: opts?.columnSpan,
    margins: { top: 120, bottom: 120, left: 140, right: 140 },
    children: children.length ? children : [cellParagraph("")],
  });
}

function table(rows: TableRow[], widths?: number[]) {
  return new Table({
    rows,
    width: { size: TABLE_WIDTH, type: WidthType.DXA },
    columnWidths: widths,
    layout: TableLayoutType.FIXED,
    indent: { size: 0, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: BORDER },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER },
      left: { style: BorderStyle.SINGLE, size: 1, color: BORDER },
      right: { style: BorderStyle.SINGLE, size: 1, color: BORDER },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: BORDER },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: BORDER },
    },
  });
}

function infoTable(rows: Array<[string, string]>) {
  const widths = [2900, TABLE_WIDTH - 2900];
  return table(
    rows.map(
      ([label, value]) =>
        new TableRow({
          cantSplit: true,
          children: [
            textCell(label, { width: widths[0], bold: true, color: ACCENT }),
            textCell(value, { width: widths[1] }),
          ],
        }),
    ),
    widths,
  );
}

function headerCell(text: string, width: number) {
  return textCell(text, {
    width,
    bold: true,
    color: ACCENT,
    alignment: AlignmentType.CENTER,
  });
}

function normalizeStageTitle(title: string) {
  return title.replace(/^\d+\.\s*/, "");
}

function stageResult(title: string, locale: Locale) {
  const d = dict[locale];
  const normalized = title.toLowerCase();
  if (normalized.includes(d.keywordCheckOrg)) return d.resultOrg;
  if (normalized.includes(d.keywordCheckIntro)) return d.resultIntro;
  if (normalized.includes(d.keywordCheckRules)) return d.resultRules;
  if (normalized.includes(d.keywordCheckTrainer)) return d.resultTrainer;
  if (normalized.includes(d.keywordCheckScenarios)) return d.resultScenarios;
  if (normalized.includes(d.keywordCheckSummary)) return d.resultSummary;
  if (normalized.includes(d.keywordCheckHomework)) return d.resultHomework;
  return d.resultDefault;
}

function lessonFormat(trainerLabel: string | null, locale: Locale) {
  const d = dict[locale];
  return trainerLabel
    ? d.formatWithTrainer(trainerLabel)
    : d.formatWithoutTrainer;
}

function plannedResults(lesson: ProgramLesson, locale: Locale) {
  const d = dict[locale];
  return {
    subject: lesson.goals.length
      ? lesson.goals
      : [d.plannedSubjectDefault(lesson.title)],
    correctional: [d.correctional1, d.correctional2, d.correctional3],
    personal: [d.personal1, d.personal2, d.personal3],
  };
}

function buildFlowTable(stages: LessonStageBlock[], locale: Locale) {
  const d = dict[locale];
  const widths = [2100, 1050, TABLE_WIDTH - 3150];
  const rows = [
    new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: [
        headerCell(d.stage, widths[0]),
        headerCell(d.time, widths[1]),
        headerCell(d.activity, widths[2]),
      ],
    }),
    ...stages.map((stage) => {
      const contentChildren = [
        ...(stage.teacherSays
          ? [
              cellParagraph(d.teacherSays, { bold: true, color: ACCENT }),
              cellParagraph(`«${stage.teacherSays}»`, { italic: true }),
            ]
          : []),
        ...(stage.teacherDoes?.length
          ? [
              cellParagraph(d.teacherDoes, { bold: true, color: ACCENT }),
              ...stage.teacherDoes.map((item) => bullet(item, CELL_SIZE)),
            ]
          : []),
        cellParagraph(d.studentActivity, { bold: true, color: ACCENT }),
        cellParagraph(stage.studentActivity ?? d.studentActivityDefault),
        cellParagraph(d.methodSupport, { bold: true, color: ACCENT }),
        cellParagraph(stage.hint ?? d.methodSupportDefault, { italic: true }),
        cellParagraph(stageResult(stage.title, locale)),
      ];

      return new TableRow({
        cantSplit: true,
        children: [
          richCell([cellParagraph(normalizeStageTitle(stage.title), { bold: true, color: ACCENT })], { width: widths[0] }),
          textCell(stage.duration, { width: widths[1], alignment: AlignmentType.CENTER }),
          richCell(contentChildren, { width: widths[2] }),
        ],
      });
    }),
  ];

  return table(rows, widths);
}

function buildResultsTable(lesson: ProgramLesson, locale: Locale) {
  const d = dict[locale];
  const results = plannedResults(lesson, locale);
  const widths = [2850, TABLE_WIDTH - 2850];
  return table(
    [
      new TableRow({
        tableHeader: true,
        children: [
          headerCell(d.direction, widths[0]),
          headerCell(d.plannedResult, widths[1]),
        ],
      }),
      new TableRow({
        cantSplit: true,
        children: [
          textCell(d.subject, { width: widths[0], bold: true }),
          richCell(results.subject.map((item) => bullet(item, CELL_SIZE)), { width: widths[1] }),
        ],
      }),
      new TableRow({
        cantSplit: true,
        children: [
          textCell(d.correctional, { width: widths[0], bold: true }),
          richCell(results.correctional.map((item) => bullet(item, CELL_SIZE)), { width: widths[1] }),
        ],
      }),
      new TableRow({
        cantSplit: true,
        children: [
          textCell(d.personal, { width: widths[0], bold: true }),
          richCell(results.personal.map((item) => bullet(item, CELL_SIZE)), { width: widths[1] }),
        ],
      }),
    ],
    widths,
  );
}

function buildScenarioTable(lesson: ProgramLesson, locale: Locale) {
  const d = dict[locale];
  const widths = [650, 3000, 3050, TABLE_WIDTH - 6700];
  return table(
    [
      new TableRow({
        tableHeader: true,
        children: [
          headerCell(d.num, widths[0]),
          headerCell(d.situation, widths[1]),
          headerCell(d.answerOptions, widths[2]),
          headerCell(d.methodHint, widths[3]),
        ],
      }),
      ...lesson.scenarios.map((scenario, index) => {
        const correctAnswer = scenario.options[scenario.correctIndex] ?? "";
        return new TableRow({
          cantSplit: true,
          children: [
            textCell(String(index + 1), { width: widths[0], alignment: AlignmentType.CENTER }),
            richCell([
              cellParagraph(scenario.title, { bold: true, color: ACCENT }),
              cellParagraph(scenario.text),
            ], { width: widths[1] }),
            richCell([
              ...scenario.options.map((option) => cellParagraph(option)),
              cellParagraph(`${d.correctAnswer}: ${correctAnswer}`, { bold: true, color: ACCENT }),
            ], { width: widths[2] }),
            richCell([
              cellParagraph(scenario.feedback, { italic: true }),
              cellParagraph(scenario.support),
            ], { width: widths[3] }),
          ],
        });
      }),
    ],
    widths,
  );
}

function buildQuizTable(lesson: ProgramLesson, locale: Locale) {
  const d = dict[locale];
  const widths = [650, 3600, 3050, TABLE_WIDTH - 7300];
  return table(
    [
      new TableRow({
        tableHeader: true,
        children: [
          headerCell(d.num, widths[0]),
          headerCell(d.question, widths[1]),
          headerCell(d.options, widths[2]),
          headerCell(d.correctAnswer, widths[3]),
        ],
      }),
      ...lesson.quiz.map((question, index) => (
        new TableRow({
          cantSplit: true,
          children: [
            textCell(String(index + 1), { width: widths[0], alignment: AlignmentType.CENTER }),
            textCell(question.question, { width: widths[1] }),
            richCell(question.options.map((option) => cellParagraph(option)), { width: widths[2] }),
            textCell(question.options[question.correctIndex] ?? "", { width: widths[3], bold: true, color: ACCENT }),
          ],
        })
      )),
    ],
    widths,
  );
}

function buildObservationSheet(locale: Locale) {
  const d = dict[locale];
  const widths = [2550, 1650, 1750, 1650, TABLE_WIDTH - 7600];
  const blankRows = Array.from({ length: 6 }, () =>
    new TableRow({
      cantSplit: true,
      children: widths.map((width) => textCell(" ", { width })),
    }),
  );

  return table(
    [
      new TableRow({
        tableHeader: true,
        children: [
          headerCell(d.observationStudent, widths[0]),
          headerCell(d.observationUnderstood, widths[1]),
          headerCell(d.observationPerformed, widths[2]),
          headerCell(d.observationHelp, widths[3]),
          headerCell(d.observationComment, widths[4]),
        ],
      }),
      ...blankRows,
    ],
    widths,
  );
}

function buildLessonDoc(lesson: ProgramLesson, locale: Locale) {
  const d = dict[locale];
  const m: LessonMethodology =
    lesson.methodology ?? buildAutoMethodology(lesson, locale);
  const trainerLabel = lesson.trainer
    ? trainerLabels[lesson.trainer.type]?.[locale] ?? null
    : null;
  const vocabulary = Array.from(
    new Set([...(lesson.tags ?? []), ...(trainerLabel ? [trainerLabel] : [])]),
  ).slice(0, 8);
  const children: DocChild[] = [];

  children.push(
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: d.lessonNotes,
          bold: true,
          size: 32,
          font: FONT,
          color: ACCENT,
        }),
      ],
      spacing: { after: 80, line: 276 },
    }),
  );
  children.push(paragraph(lesson.title, {
    alignment: AlignmentType.CENTER,
    bold: true,
    size: 28,
    after: 180,
  }));

  children.push(sectionTitle(d.section1));
  children.push(infoTable([
    [d.course, d.courseValue],
    [d.module, lesson.moduleTitle],
    [d.lessonTopic, lesson.title],
    [d.classGroup, emptyLine()],
    [d.studentCategory, d.studentCategoryValue],
    [d.duration, lesson.duration],
    [d.lessonType, lessonFormat(trainerLabel, locale)],
    [d.workForm, d.workFormValue],
    [d.methods, d.methodsValue],
    [d.equipment, m.materials.join("; ")],
    [d.teacher, emptyLine()],
    [d.date, emptyLine()],
  ]));

  children.push(sectionTitle(d.section2));
  children.push(infoTable([
    [d.objective, m.objective],
    [d.educationalTasks, m.tasks.join("; ")],
    [d.correctionalTasks, d.correctionalTasksValue],
    [d.upbringingTasks, d.upbringingTasksValue],
    [d.keywords, vocabulary.length ? vocabulary.join(", ") : d.keywordsDefault],
  ]));

  children.push(sectionTitle(d.section3));
  children.push(buildResultsTable(lesson, locale));

  children.push(sectionTitle(d.section4));
  children.push(paragraph(d.flowIntro, { italic: true, after: 100 }));
  children.push(buildFlowTable(m.stages, locale));

  children.push(sectionTitle(d.section5));
  if (m.differentiation) children.push(paragraph(m.differentiation));
  children.push(bullet(d.individualization1));
  children.push(bullet(d.individualization2));
  children.push(bullet(d.individualization3));

  children.push(sectionTitle(d.section6));
  children.push(paragraph(m.homework ?? d.homeworkDefault));
  if (m.safetyNote) {
    children.push(subTitle(d.adultNoteTitle));
    children.push(paragraph(m.safetyNote, { italic: true }));
  }

  children.push(sectionTitle(d.section7));
  children.push(paragraph(d.observationIntro, { italic: true, after: 100 }));
  children.push(buildObservationSheet(locale));

  if (lesson.scenarios?.length) {
    children.push(sectionTitle(d.appendix1));
    children.push(buildScenarioTable(lesson, locale));
  }

  if (lesson.quiz?.length) {
    children.push(sectionTitle(d.appendix2));
    children.push(buildQuizTable(lesson, locale));
  }

  children.push(spacer(120));
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: d.footer, font: FONT, size: 20, color: ACCENT })],
    }),
  );

  return new Document({
    creator: "MOSAIC",
    title: lesson.title,
    description: d.desc(lesson.title),
    styles: {
      default: {
        document: {
          run: { font: FONT, size: BODY_SIZE, color: ACCENT },
          paragraph: { spacing: { after: 120, line: 276 } },
        },
      },
    },
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "•",
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 720, hanging: 360 } } },
            },
          ],
        },
      ],
    },
    sections: [
      {
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [new TextRun({ text: d.header, font: FONT, size: 18, color: ACCENT })],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: d.page, font: FONT, size: 18, color: ACCENT }),
                  new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 18, color: ACCENT }),
                ],
              }),
            ],
          }),
        },
        properties: {
          page: {
            size: {
              width: PAGE_WIDTH,
              height: PAGE_HEIGHT,
              orientation: PageOrientation.PORTRAIT,
            },
            margin: { top: PAGE_MARGIN, right: PAGE_MARGIN, bottom: PAGE_MARGIN, left: PAGE_MARGIN },
          },
        },
        children,
      },
    ],
  });

}

export async function generateLessonDocx(
  lesson: ProgramLesson,
  locale: Locale = "ru",
): Promise<Blob> {
  return Packer.toBlob(buildLessonDoc(lesson, locale));
}

export async function generateLessonDocxBuffer(
  lesson: ProgramLesson,
  locale: Locale = "ru",
): Promise<Buffer> {
  return Packer.toBuffer(buildLessonDoc(lesson, locale));
}

export async function downloadLessonDocx(
  lesson: ProgramLesson,
  locale: Locale = "ru",
) {
  const blob = await generateLessonDocx(lesson, locale);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = getLessonDocxFileName(lesson);
  a.click();
  URL.revokeObjectURL(url);
}
