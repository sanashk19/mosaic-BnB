import JSZip from "jszip";
import { getAllLessons } from "@/data/program";
import { getQuestionnaireQuestions } from "@/data/questionnaires";
import type { Locale } from "@/lib/i18n-shared";
import type {
  ActionEvent,
  CurrentUser,
  QuestionnaireSubmission,
  ResearcherData,
} from "@/lib/uquvli-types";

const dict = {
  ru: {
    overview: "Review",
    indicator: "Показатель",
    value: "Значение",
    participantsHeader: "— УЧАСТНИКИ —",
    teachers: "Teachers",
    studentsInExport: "Учеников в выгрузке",
    experimentalGroup: "Экспериментальная группа",
    controlGroup: "Контрольная группа",
    noGroup: "Without a group",
    progressHeader: "— ПРОГРЕСС —",
    avgScoreAll: "Средний балл (все)",
    questionnairesHeader: "— АНКЕТЫ —",
    initialFilled: "Заполнено входных анкет",
    finalFilled: "Заполнено выходных анкет",
    avgInitialExp: "Ср. балл входной — Эксп.",
    avgFinalExp: "Ср. балл выходной — Эксп.",
    deltaExp: "Прирост — Эксп.",
    avgInitialCtrl: "Ср. балл входной — Контр.",
    avgFinalCtrl: "Ср. балл выходной — Контр.",
    deltaCtrl: "Прирост — Контр.",
    exportDate: "Дата выгрузки",
    studentsSheet: "Students",
    name: "Name",
    group: "Group",
    teacher: "Teacher",
    organization: "Organization",
    classLabel: "Class",
    loginCode: "At the entrance",
    lessonsCompleted: "Уроков пройдено",
    avgScore: "Average score",
    correctAnswers: "Верных ответов",
    wrongAnswers: "Ошибок",
    hints: "Подсказок",
    initialQuestionnaire: "Entry form",
    finalQuestionnaire: "Exit form",
    lastActivity: "Last activity",
    idForLink: "ID (для связи)",
    yes: "Да",
    no: "Нет",
    notVisited: "Не входил",
    eventsSheet: "Events",
    dateTime: "Дата и время",
    student: "Student",
    lesson: "Lesson",
    action: "Действие",
    correctAnswersCol: "Верных ответов",
    wrongAnswersCol: "Ошибок",
    hintsCol: "Подсказок",
    studentId: "ID ученика",
    questionnairesSheet: "Questionnaires",
    filledDate: "Дата заполнения",
    questionnaireType: "Тип анкеты",
    totalScore: "Сумма баллов",
    questionN: (n: number) =>`Вопрос ${n}`,
    questionsLegendSheet: "Тексты вопросов",
    number: "Номер",
    questionText: "Текст вопроса",
    beforeAfterSheet: "До — После",
    lessons: "Lessons",
    avgScoreShort: "Wed. point",
    initialScore: "Балл входной анкеты",
    finalScore: "Балл выходной анкеты",
    delta: "Прирост",
    initialDate: "Дата входной анкеты",
    finalDate: "Дата выходной анкеты",
    noQuestionnaire: "Нет анкеты",
    initialType: "Entrance",
    finalType: "Day off",
    groupExperimental: "Experimental",
    groupControl: "Test",
    groupNone: "Without a group",
    actionLessonStart: "Начало урока",
    actionLessonComplete: "Завершение урока",
    actionStepView: "Просмотр шага",
    actionStepComplete: "Выполнен шаг",
    actionAnswerCorrect: "Верный ответ",
    actionAnswerWrong: "Ошибка",
    actionHintUsed: "Использована подсказка",
    intlLocale: "ru-RU",
  },
  uz: {
    overview: "Umumiy",
    indicator: "Koʻrsatkich",
    value: "Qiymat",
    participantsHeader: "— ISHTIROKCHILAR —",
    teachers: "Oʻqituvchilar",
    studentsInExport: "Eksportdagi oʻquvchilar",
    experimentalGroup: "Eksperimental guruh",
    controlGroup: "Nazorat guruhi",
    noGroup: "Guruhsiz",
    progressHeader: "— YUTUQLAR —",
    avgScoreAll: "Oʻrtacha ball (hammasi)",
    questionnairesHeader: "— ANKETALAR —",
    initialFilled: "Toʻldirilgan kirish anketalari",
    finalFilled: "Toʻldirilgan yakuniy anketalar",
    avgInitialExp: "Oʻrt. kirish balli — Eksp.",
    avgFinalExp: "Oʻrt. yakuniy balli — Eksp.",
    deltaExp: "Oʻsish — Eksp.",
    avgInitialCtrl: "Oʻrt. kirish balli — Nazorat",
    avgFinalCtrl: "Oʻrt. yakuniy balli — Nazorat",
    deltaCtrl: "Oʻsish — Nazorat",
    exportDate: "Eksport sanasi",
    studentsSheet: "Oʻquvchilar",
    name: "Ism",
    group: "Guruh",
    teacher: "Oʻqituvchi",
    organization: "Tashkilot",
    classLabel: "Sinf",
    loginCode: "Kirish kodi",
    lessonsCompleted: "Oʻtilgan darslar",
    avgScore: "Oʻrtacha ball",
    correctAnswers: "Toʻgʻri javoblar",
    wrongAnswers: "Xatolar",
    hints: "Maslahatlar",
    initialQuestionnaire: "Kirish anketasi",
    finalQuestionnaire: "Yakuniy anketa",
    lastActivity: "Soʻnggi faollik",
    idForLink: "ID (bogʻlanish uchun)",
    yes: "Ha",
    no: "Yoʻq",
    notVisited: "Kirmagan",
    eventsSheet: "Hodisalar",
    dateTime: "Sana va vaqt",
    student: "Oʻquvchi",
    lesson: "Dars",
    action: "Harakat",
    correctAnswersCol: "Toʻgʻri javoblar",
    wrongAnswersCol: "Xatolar",
    hintsCol: "Maslahatlar",
    studentId: "Oʻquvchi ID",
    questionnairesSheet: "Anketalar",
    filledDate: "Toʻldirilgan sana",
    questionnaireType: "Anketa turi",
    totalScore: "Ballar yigʻindisi",
    questionN: (n: number) =>`${n}-savol`,
    questionsLegendSheet: "Savol matnlari",
    number: "Raqam",
    questionText: "Savol matni",
    beforeAfterSheet: "Oldin — Keyin",
    lessons: "Darslar",
    avgScoreShort: "Oʻrt. ball",
    initialScore: "Kirish anketasi balli",
    finalScore: "Yakuniy anketa balli",
    delta: "Oʻsish",
    initialDate: "Kirish anketasi sanasi",
    finalDate: "Yakuniy anketa sanasi",
    noQuestionnaire: "Anketa yoʻq",
    initialType: "Kirish",
    finalType: "Yakuniy",
    groupExperimental: "Eksperimental",
    groupControl: "Nazorat",
    groupNone: "Guruhsiz",
    actionLessonStart: "Dars boshlandi",
    actionLessonComplete: "Dars yakunlandi",
    actionStepView: "Qadamni koʻrish",
    actionStepComplete: "Qadam bajarildi",
    actionAnswerCorrect: "Toʻgʻri javob",
    actionAnswerWrong: "Xato",
    actionHintUsed: "Maslahat ishlatildi",
    intlLocale: "uz-UZ",
  },
} as const;

function lessonTitle(slug: string, locale: Locale): string {
  const lessons = getAllLessons(locale);
  const found = lessons.find((l) => l.slug === slug);
  return found?.title ?? slug;
}

function actionLabel(action: string, locale: Locale): string {
  const d = dict[locale];
  const map: Record<string, string> = {
    lesson_start: d.actionLessonStart,
    lesson_complete: d.actionLessonComplete,
    step_view: d.actionStepView,
    step_complete: d.actionStepComplete,
    answer_correct: d.actionAnswerCorrect,
    answer_wrong: d.actionAnswerWrong,
    hint_used: d.actionHintUsed,
  };
  return map[action] ?? action;
}

function formatDate(iso: string | undefined, locale: Locale): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat(dict[locale].intlLocale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function questionnaireTypeLabel(type: string, locale: Locale): string {
  const d = dict[locale];
  if (type === "initial") return d.initialType;
  if (type === "final") return d.finalType;
  return type;
}

function totalScore(answers: { questionId: string; score: number }[]): number | "" {
  if (!answers.length) return "";
  return answers.reduce((sum, a) => sum + a.score, 0);
}

type CellValue = string | number | boolean | null | undefined;
type SheetSpec = {
  name: string;
  rows: CellValue[][];
  widths: number[];
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function columnName(index: number) {
  let n = index + 1;
  let name = "";

  while (n > 0) {
    const mod = (n - 1) % 26;
    name = String.fromCharCode(65 + mod) + name;
    n = Math.floor((n - mod) / 26);
  }

  return name;
}

function sheetRef(rowCount: number, colCount: number) {
  return `A1:${columnName(Math.max(colCount - 1, 0))}${Math.max(rowCount, 1)}`;
}

function renderCell(value: CellValue, rowIndex: number, colIndex: number) {
  const ref = `${columnName(colIndex)}${rowIndex + 1}`;
  const style = rowIndex === 0 ? ` s="1"` : "";

  if (typeof value === "number" && Number.isFinite(value)) {
    return `<c r="${ref}"${style}><v>${value}</v></c>`;
  }

  if (typeof value === "boolean") {
    return `<c r="${ref}" t="b"${style}><v>${value ? 1 : 0}</v></c>`;
  }

  const text = value == null ? "" : String(value);
  return `<c r="${ref}" t="inlineStr"${style}><is><t>${escapeXml(text)}</t></is></c>`;
}

function renderWorksheet(sheet: SheetSpec) {
  const rowCount = sheet.rows.length;
  const colCount = Math.max(...sheet.rows.map((row) => row.length), 1);
  const dimension = sheetRef(rowCount, colCount);
  const cols = sheet.widths
    .map((width, index) => (
      `<col min="${index + 1}" max="${index + 1}" width="${width}" customWidth="1"/>`
    ))
    .join("");
  const rows = sheet.rows
    .map((row, rowIndex) => {
      const cells = Array.from({ length: colCount }, (_, colIndex) =>
        renderCell(row[colIndex], rowIndex, colIndex),
      ).join("");
      return `<row r="${rowIndex + 1}">${cells}</row>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <dimension ref="${dimension}"/>
  <sheetViews>
    <sheetView workbookViewId="0">
      <pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>
      <selection pane="bottomLeft"/>
    </sheetView>
  </sheetViews>
  <cols>${cols}</cols>
  <sheetData>${rows}</sheetData>
  <autoFilter ref="${dimension}"/>
</worksheet>`;
}

function lastActivity(user: CurrentUser) {
  if (!user.progress.length) return "";
  return user.progress.reduce(
    (latest, entry) => (entry.completedAt > latest ? entry.completedAt : latest),
    user.progress[0].completedAt,
  );
}

function averageScore(user: CurrentUser) {
  const scores = user.progress.flatMap((entry) =>
    entry.score === undefined ? [] : [entry.score],
  );
  return scores.length
    ? Number((scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(2))
    : "";
}

function getQuestionnaireStatus(
  questionnaires: QuestionnaireSubmission[],
  userId: string,
  type: "initial" | "final",
) {
  const submission = questionnaires.find(
    (item) => item.userId === userId && item.type === type,
  );
  return submission ? submission.submittedAt : "";
}

function groupLabel(group: CurrentUser["group"], locale: Locale) {
  const d = dict[locale];
  if (group === "experimental") return d.groupExperimental;
  if (group === "control") return d.groupControl;
  return d.groupNone;
}

function countEvents(events: ActionEvent[], action: ActionEvent["action"]) {
  return events.filter((event) => event.action === action).length;
}

function buildSheets(
  data: ResearcherData,
  locale: Locale,
  selectedStudentIds?: string[],
): SheetSpec[] {
  const d = dict[locale];
  const selectedSet = selectedStudentIds?.length
    ? new Set(selectedStudentIds)
    : null;
  const students = selectedSet
    ? data.students.filter((student) => selectedSet.has(student.id))
    : data.students;
  const studentIds = new Set(students.map((student) => student.id));
  const teachersById = new Map(data.teachers.map((teacher) => [teacher.id, teacher]));
  const events = data.eventLog.filter((event) => studentIds.has(event.userId));
  const questionnaires = data.questionnaires.filter((item) => studentIds.has(item.userId));
  const studentsById = new Map(students.map((student) => [student.id, student]));

  const experimentalCount = students.filter((student) => student.group === "experimental").length;
  const controlCount = students.filter((student) => student.group === "control").length;
  const scores = students.flatMap((student) =>
    student.progress.flatMap((entry) => entry.score === undefined ? [] : [entry.score]),
  );

  function avgQScore(group: "experimental" | "control", type: "initial" | "final"): number | "" {
    const groupStudents = students.filter((s) => s.group === group);
    const subs = questionnaires.filter(
      (q) => q.type === type && groupStudents.some((s) => s.id === q.userId),
    );
    if (!subs.length) return "";
    const totals = subs.map((s) => s.answers.reduce((sum, a) => sum + a.score, 0));
    return Number((totals.reduce((a, b) => a + b, 0) / totals.length).toFixed(2));
  }

  function avgDelta(group: "experimental" | "control"): number | "" {
    const groupStudents = students.filter((s) => s.group === group);
    const pairs = groupStudents.flatMap((s) => {
      const ini = questionnaires.find((q) => q.userId === s.id && q.type === "initial");
      const fin = questionnaires.find((q) => q.userId === s.id && q.type === "final");
      if (!ini || !fin) return [];
      const delta =
        fin.answers.reduce((sum, a) => sum + a.score, 0) -
        ini.answers.reduce((sum, a) => sum + a.score, 0);
      return [delta];
    });
    if (!pairs.length) return "";
    return Number((pairs.reduce((a, b) => a + b, 0) / pairs.length).toFixed(2));
  }

  const overview: SheetSpec = {
    name: d.overview,
    widths: [44, 18],
    rows: [
      [d.indicator, d.value],
      ["", ""],
      [d.participantsHeader, ""],
      [d.teachers, data.teachers.length],
      [d.studentsInExport, students.length],
      [d.experimentalGroup, experimentalCount],
      [d.controlGroup, controlCount],
      [d.noGroup, students.length - experimentalCount - controlCount],
      ["", ""],
      [d.progressHeader, ""],
      [d.avgScoreAll, scores.length ? Number((scores.reduce((s, v) => s + v, 0) / scores.length).toFixed(2)) : ""],
      ["", ""],
      [d.questionnairesHeader, ""],
      [d.initialFilled, questionnaires.filter((q) => q.type === "initial").length],
      [d.finalFilled, questionnaires.filter((q) => q.type === "final").length],
      [d.avgInitialExp, avgQScore("experimental", "initial")],
      [d.avgFinalExp, avgQScore("experimental", "final")],
      [d.deltaExp, avgDelta("experimental")],
      [d.avgInitialCtrl, avgQScore("control", "initial")],
      [d.avgFinalCtrl, avgQScore("control", "final")],
      [d.deltaCtrl, avgDelta("control")],
      ["", ""],
      [d.exportDate, formatDate(new Date().toISOString(), locale)],
    ],
  };

  const studentRows = students.map((student) => {
    const teacher = student.teacherId ? teachersById.get(student.teacherId) : undefined;
    const studentEvents = events.filter((event) => event.userId === student.id);
    const initialDate = getQuestionnaireStatus(questionnaires, student.id, "initial");
    const finalDate = getQuestionnaireStatus(questionnaires, student.id, "final");
    const lastAct = lastActivity(student);

    return [
      student.profile.childName || student.name,
      groupLabel(student.group, locale),
      teacher?.name ?? "",
      teacher?.profile.organizationName ?? student.profile.organizationName,
      student.profile.childClass,
      student.studentCode ?? "",
      student.progress.length,
      averageScore(student),
      countEvents(studentEvents, "answer_correct"),
      countEvents(studentEvents, "answer_wrong"),
      countEvents(studentEvents, "hint_used"),
      initialDate ? d.yes : d.no,
      finalDate ? d.yes : d.no,
      lastAct ? formatDate(lastAct, locale) : d.notVisited,
      student.id,
    ];
  });

  const studentsSheet: SheetSpec = {
    name: d.studentsSheet,
    widths: [24, 20, 22, 26, 14, 12, 10, 10, 14, 10, 12, 14, 14, 28, 36],
    rows: [
      [
        d.name,
        d.group,
        d.teacher,
        d.organization,
        d.classLabel,
        d.loginCode,
        d.lessonsCompleted,
        d.avgScore,
        d.correctAnswers,
        d.wrongAnswers,
        d.hints,
        d.initialQuestionnaire,
        d.finalQuestionnaire,
        d.lastActivity,
        d.idForLink,
      ],
      ...studentRows,
    ],
  };

  const eventSheet: SheetSpec = {
    name: d.eventsSheet,
    widths: [28, 24, 36, 24, 14, 14, 14, 14],
    rows: [
      [d.dateTime, d.student, d.lesson, d.action, d.correctAnswersCol, d.wrongAnswersCol, d.hintsCol, d.studentId],
      ...events.map((event) => {
        const student = studentsById.get(event.userId);
        return [
          formatDate(event.timestamp, locale),
          student?.profile.childName || student?.name || "",
          lessonTitle(event.lessonSlug, locale),
          actionLabel(event.action, locale),
          event.action === "answer_correct" ? 1 : "",
          event.action === "answer_wrong" ? 1 : "",
          event.action === "hint_used" ? 1 : "",
          event.userId,
        ];
      }),
    ],
  };

  // UI Logic
  const questionnaireQs = getQuestionnaireQuestions(locale);
  const initialQs = questionnaireQs.initial;
  const finalQs = questionnaireQs.final;

  const questionnaireSheet: SheetSpec = {
    name: d.questionnairesSheet,
    widths: [28, 24, 16, 12, 46, 46, 46, 46, 46, 10],
    rows: [
      [
        d.filledDate,
        d.student,
        d.questionnaireType,
        d.totalScore,
        d.questionN(1),
        d.questionN(2),
        d.questionN(3),
        d.questionN(4),
        d.questionN(5),
        d.studentId,
      ],
      ...questionnaires.map((submission) => {
        const student = studentsById.get(submission.userId);
        const qs = submission.type ==="initial" ? initialQs : finalQs;
        const answersMap = new Map(
          submission.answers.map((a) => [a.questionId, a.score]),
        );
        const qScores = qs.map((q) => answersMap.get(q.id) ?? "");
        const total = totalScore(submission.answers);
        return [
          formatDate(submission.submittedAt, locale),
          student?.profile.childName || student?.name || "",
          questionnaireTypeLabel(submission.type, locale),
          total,
          ...qScores,
          submission.userId,
        ];
      }),
    ],
  };

  // UI Logic
  // UI Logic
  const questionsLegendSheet: SheetSpec = {
    name: d.questionsLegendSheet,
    widths: [16, 16, 60],
    rows: [
      [d.questionnaireType, d.number, d.questionText],
      ...initialQs.map((q, i) => [d.initialType, d.questionN(i + 1), q.text]),
      ...finalQs.map((q, i) => [d.finalType, d.questionN(i + 1), q.text]),
    ],
  };

  // UI Logic
  const beforeAfterRows = students.map((student) => {
    const teacher = student.teacherId ? teachersById.get(student.teacherId) : undefined;
    const initial = questionnaires.find(
      (q) => q.userId === student.id && q.type ==="initial",
    );
    const final = questionnaires.find(
      (q) => q.userId === student.id && q.type === "final",
    );
    const initialTotal = initial ? totalScore(initial.answers) : "";
    const finalTotal = final ? totalScore(final.answers) : "";
    const delta =
      typeof initialTotal === "number" && typeof finalTotal === "number"
        ? finalTotal - initialTotal
        : "";

    return [
      student.profile.childName || student.name,
      groupLabel(student.group, locale),
      teacher?.name ?? "",
      teacher?.profile.organizationName ?? "",
      student.profile.childClass,
      student.progress.length,
      averageScore(student),
      initialTotal,
      final ? finalTotal : "",
      delta,
      initial ? formatDate(initial.submittedAt, locale) : d.noQuestionnaire,
      final ? formatDate(final.submittedAt, locale) : d.noQuestionnaire,
    ];
  });

  const beforeAfterSheet: SheetSpec = {
    name: d.beforeAfterSheet,
    widths: [24, 20, 22, 26, 14, 10, 10, 14, 14, 12, 28, 28],
    rows: [
      [
        d.student,
        d.group,
        d.teacher,
        d.organization,
        d.classLabel,
        d.lessons,
        d.avgScoreShort,
        d.initialScore,
        d.finalScore,
        d.delta,
        d.initialDate,
        d.finalDate,
      ],
      ...beforeAfterRows,
    ],
  };

  return [overview, beforeAfterSheet, studentsSheet, eventSheet, questionnaireSheet, questionsLegendSheet];
}

function workbookXml(sheets: SheetSpec[]) {
  return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    ${sheets.map((sheet, index) => (
      `<sheet name="${escapeXml(sheet.name)}" sheetId="${index + 1}" r:id="rId${index + 1}"/>`
    )).join("")}
  </sheets>
</workbook>`;
}

function workbookRelsXml(sheets: SheetSpec[]) {
  const sheetRels = sheets.map((_, index) => (
    `<Relationship Id="rId${index + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${index + 1}.xml"/>`
  )).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${sheetRels}
  <Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
}

function contentTypesXml(sheets: SheetSpec[]) {
  const sheetOverrides = sheets.map((_, index) => (
    `<Override PartName="/xl/worksheets/sheet${index + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`
  )).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  ${sheetOverrides}
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;
}

function stylesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2">
    <font><sz val="11"/><name val="Aptos"/></font>
    <font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Aptos"/></font>
  </fonts>
  <fills count="3">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF1F4E79"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="2">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
  <dxfs count="0"/>
  <tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleLight16"/>
</styleSheet>`;
}

export async function generateResearcherXlsx(
  data: ResearcherData,
  locale: Locale = "ru",
  selectedStudentIds?: string[],
) {
  const sheets = buildSheets(data, locale, selectedStudentIds);
  const zip = new JSZip();

  zip.file("[Content_Types].xml", contentTypesXml(sheets));
  zip.file("_rels/.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`);
  zip.file("xl/workbook.xml", workbookXml(sheets));
  zip.file("xl/_rels/workbook.xml.rels", workbookRelsXml(sheets));
  zip.file("xl/styles.xml", stylesXml());
  sheets.forEach((sheet, index) => {
    zip.file(`xl/worksheets/sheet${index + 1}.xml`, renderWorksheet(sheet));
  });
  zip.file("docProps/core.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:creator>UQUVLI.UZ</dc:creator>
  <dc:title>UQUVLI researcher export</dc:title>
  <dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:created>
</cp:coreProperties>`);
  zip.file("docProps/app.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>UQUVLI.UZ</Application>
</Properties>`);

  return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}
