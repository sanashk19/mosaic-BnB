"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { CabinetShell } from "@/components/cabinet-shell";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import { displayLessons } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";
import {
  createResearcherUser,
  updateStudentGroup,
  getResearcherData,
  type CurrentUser,
  type QuestionnaireSubmission,
  type StudentGroup,
  AUTH_CHANGE_EVENT,
} from "@/lib/auth-storage";

type ResearcherSection = "dashboard" | "students" | "teachers" | "export";

const dict = {
  ru: {
    // section config
    sectionDashboardLabel: "Dashboard",
    sectionDashboardCaption: "summary",
    sectionDashboardTitle: "Researcher Dashboard",
    sectionDashboardDescription: "Key indicators of the experiment and dynamics by week.",
    sectionStudentsLabel: "Students",
    sectionStudentsCaption: "list and profiles",
    sectionStudentsTitle: "Students",
    sectionStudentsDescription: "Filtering, search, student card and group change.",
    sectionTeachersLabel: "Teachers",
    sectionTeachersCaption: "teachers and classes",
    sectionTeachersTitle: "Teachers",
    sectionTeachersDescription: "List of teachers with groups and adding new ones.",
    sectionExportLabel: "Export",
    sectionExportCaption: "data for PhD",
    sectionExportTitle: "Export data",
    sectionExportDescription: "Uploading anonymized data into Excel for SPSS and analysis.",
    cabinetGroupTitle: "Cabinet",

    // relative dates
    notLoggedIn: "didn't enter",
    today: "Today",
    yesterday: "yesterday",
    daysAgo: (n: number) => `${n}days back`,
    weeksAgo: (n: number) => `${n}weeks back`,
    dateLocale: "ru-RU",

    // errors
    excelDownloadError: "Failed to download Excel.",
    loadDataError: "Failed to load explorer data",
    addStudentError: "Failed to add student.",
    addTeacherError: "Failed to add teacher.",
    selectTeacherError: "Choose a teacher.",

    // charts
    weeklyActivityAria: "Activity by week",
    legendExperimental: "Experimental",
    legendControl: "Test",
    beforeAfterAria: "Comparison before and after",
    noQuestionnaireData: "Data on the questionnaires is not yet available - fill out the entry and exit questionnaires.",
    expBefore: "Exp. - up to",
    expAfter: "Exp. - after",
    ctrlBefore: "Counter. — to",
    ctrlAfter: "Counter. - after",
    noData: "no data",
    deltaExp: "growth Exp.",
    deltaCtrl: "growth Contr.",

    // dashboard
    dashboardAria: "Dashboard",
    summary: "Summary",
    experimentInNumbers: "Experiment in numbers",
    schoolOne: "school",
    schoolMany: "schools",
    totalStudents: "Total students",
    teachersCount: (n: number) => `${n}teachers`,
    experimentalGroup: "Experimental",
    controlGroup: "Test",
    avgLessonsShort: (v: string) => `Wed${v}ur.`,
    activeWeek: "Active for 7 days",
    ofAll: "from everyone",
    initialQuestionnaire: "Entry form",
    finalQuestionnaire: "Weekend questionnaire",
    outOf: (n: number) => `from${n}`,
    studentWithoutGroupOne: "student without group",
    studentWithoutGroupMany: "students without a group",
    distribute: "Distribute →",
    dynamics: "Dynamics",
    completedLessonsByWeek: "Completed lessons by week",
    sixWeeks: "6 weeks",
    comparison: "Comparison",
    expVsCtrl: "Exp. vs Cont.",
    studentsLabel: "Students",
    avgLessonsLabel: "Wed. lessons",
    avgScoreLabel: "Wed. point",
    literacyBeforeAfter: "Literacy: before and after",
    avgScoreQuestionnaires: "Average score on questionnaires",
    fiveQuestions: "5 questions",
    quickActions: "Quick Actions",
    whatNext: "What's next",
    downloadExcel: "Download Excel",
    allStudents: "All students",
    teachersWithCount: (n: number) => `Teachers (${n})`,
    schools: "Schools",
    geography: "Geography",
    noSchoolsYet: "There are no schools yet - add a teacher.",
    teachersShortMany: (n: number) => `${n}learn`,
    studentsShortMany: (n: number) => `${n}uch-kov`,

    // student drawer
    studentCardAria: "Student card",
    profile: "Profile",
    teacherNotAttached: "The teacher is not attached",
    classNotSet: "class not specified",
    closeAria: "Close",
    identification: "Identification",
    school: "School",
    teacherLabel: "Teacher",
    loginCode: "At the entrance",
    added: "Added",
    experimentGroupLabel: "Experiment group",
    expShort: "Exp.",
    ctrlShort: "Counter.",
    noGroup: "Without a group",
    progressOf: (done: number, total: number) => `Progress •${done}from${total}lessons`,
    completedLessons: "Completed lessons",
    averageScore: "Average score",
    lastActivityLabel: "Last activity",
    questionnaires: "Questionnaires",
    initial: "Entrance",
    final: "Day off",
    filledOn: (d: string) => `Filled${d}`,
    notFilled: "Not filled in",
    journal: "Magazine",
    noLessonsYet: "The student has not taken any lessons yet.",
    scoreLabel: (s: number) => `Point:${s}`,
    noScore: "No ratings",

    // students section
    studentsAria: "Students",
    filters: "Filters",
    searchAndSegment: "Search and segmentation",
    inSelection: (n: number) => `${n}in the sample`,
    allSchools: "All schools",
    groupLabel: "Group",
    all: "All",
    searchByName: "Search by name",
    searchPlaceholder: "Start typing the student's name...",
    activePrefix: "Actively:",
    list: "List",
    experimentStudents: "Students of the experiment",
    hideForm: "Hide form",
    addStudent: "+ Add student",
    studentName: "Student name",
    studentNamePlaceholder: "For example, Alina K.",
    selectTeacher: "Choose a teacher",
    noOrganization: "without organization",
    notePlaceholder: "Optional",
    note: "Note",
    adding: "I'm adding...",
    create: "Create",
    cancel: "Cancel",
    addTeacherFirst: "First, add a teacher in the “Teachers” section - the student becomes attached to the teacher.",
    noStudentsByFilters: "There are no students matching the selected filters.",
    resetFilters: "Reset filters",
    colName: "Name",
    colSchool: "School",
    colTeacher: "Teacher",
    colGroup: "Group",
    colLessons: "Lessons",
    colScore: "Ball",
    colQuestionnaires: "Questionnaires",
    colActivity: "Activity",
    initialTitle: "Entrance",
    finalTitle: "Day off",

    // teachers section
    teachersAria: "Teachers",
    educators: "Teachers",
    experimentTeachers: "Teachers experiment",
    addTeacher: "+ Add teacher",
    name: "Name",
    namePlaceholder: "Olga Sergeevna",
    email: "Email",
    emailPlaceholder: "teacher@example.com",
    password: "Password",
    passwordPlaceholder: "minimum 6 characters",
    organization: "Organization",
    organizationPlaceholder: "School or center",
    classLabel: "Class",
    classPlaceholder: "3rd grade",
    creatingTeacher: "I'm adding...",
    createTeacher: "Create a teacher",
    noTeachersYet: "There are no teachers yet. Add the first one to assign students to it.",
    schoolNotSet: "School not specified",
    classUnknown: "Class ?",
    studentsLower: "students",
    expLower: "exp.",
    ctrlLower: "counter.",

    // export section
    exportAria: "Export",
    extract: "Unloading",
    excelForSPSS: "Excel for SPSS and analysis",
    studentsWithCount: (n: number) => `${n}students`,
    exportFileDescription: "The file contains anonymized experiment data. Names are saved for verification - when publishing, replace with ID.",
    selection: "Sample",
    allWithCount: (n: number) => `All (${n})`,
    expWithCount: (n: number) => `Exp. (${n})`,
    ctrlWithCount: (n: number) => `Cont. (${n})`,
    downloadExcelWithCount: (n: number) => `Download Excel (${n})`,
    fileStructure: "File structure",
    whatsInside: "What's inside",
    tableOverview: "Review",
    tableOverviewDesc: "Summary table by school, group and activity",
    tableStudents: "Students",
    tableStudentsDesc: "Full list with ID, entry codes, progress",
    tableEvents: "Events",
    tableEventsDesc: "All student activities: lessons, answers, tips",
    tableQuestionnaires: "Questionnaires",
    tableQuestionnairesDesc: (n: number) => `Entry and exit forms -${n}records`,
    fiveCriteria: "5 criteria",
    scaleLabel: "Rating scale",
    criterion1: "Understanding the Text",
    criterion2: "Execution of the algorithm",
    criterion3: "Independence",
    criterion4: "Safety",
    criterion5: "Skill Transfer",
    fromDissertation: "From the dissertation of O.A. Markova. A detailed assessment will appear after extensive logging of actions.",
    summaryShort: "Summary",
    ofThisExport: "This upload",
    studentsLabel2: "Students",
    teachersLabel: "Teachers",
    questionnairesLabel: "Resume",
  },
  uz: {
    // section config
    sectionDashboardLabel: "Boshqaruv paneli",
    sectionDashboardCaption: "umumiy",
    sectionDashboardTitle: "Tadqiqotchi boshqaruv paneli",
    sectionDashboardDescription: "Eksperimentning asosiy koʻrsatkichlari va haftalik dinamika.",
    sectionStudentsLabel: "Oʻquvchilar",
    sectionStudentsCaption: "roʻyxat va profillar",
    sectionStudentsTitle: "Oʻquvchilar",
    sectionStudentsDescription: "Filtrlash, qidiruv, oʻquvchi kartasi va guruh almashtirish.",
    sectionTeachersLabel: "Oʻqituvchilar",
    sectionTeachersCaption: "pedagoglar va sinflar",
    sectionTeachersTitle: "Oʻqituvchilar",
    sectionTeachersDescription: "Pedagoglar roʻyxati va yangilarini qoʻshish.",
    sectionExportLabel: "Eksport",
    sectionExportCaption: "PhD uchun maʼlumotlar",
    sectionExportTitle: "Maʼlumotlar eksporti",
    sectionExportDescription: "Anonim maʼlumotlarni SPSS va tahlil uchun Excelga yuklab olish.",
    cabinetGroupTitle: "Kabinet",

    // relative dates
    notLoggedIn: "kirmagan",
    today: "bugun",
    yesterday: "kecha",
    daysAgo: (n: number) => `${n} kun oldin`,
    weeksAgo: (n: number) => `${n} hafta oldin`,
    dateLocale: "uz-UZ",

    // errors
    excelDownloadError: "Excelni yuklab olib boʻlmadi.",
    loadDataError: "Tadqiqotchi maʼlumotlarini yuklab boʻlmadi",
    addStudentError: "Oʻquvchini qoʻshib boʻlmadi.",
    addTeacherError: "Oʻqituvchini qoʻshib boʻlmadi.",
    selectTeacherError: "Oʻqituvchini tanlang.",

    // charts
    weeklyActivityAria: "Haftalik faollik",
    legendExperimental: "Eksperimental",
    legendControl: "Nazorat",
    beforeAfterAria: "Oldin va keyin taqqoslash",
    noQuestionnaireData: "Anketa maʼlumotlari hozircha yoʻq — kirish va chiqish anketalarini toʻldiring.",
    expBefore: "Eksp. — oldin",
    expAfter: "Eksp. — keyin",
    ctrlBefore: "Nazorat — oldin",
    ctrlAfter: "Nazorat — keyin",
    noData: "maʼlumot yoʻq",
    deltaExp: "Eksp. oʻsishi",
    deltaCtrl: "Nazorat oʻsishi",

    // dashboard
    dashboardAria: "Boshqaruv paneli",
    summary: "Umumiy",
    experimentInNumbers: "Eksperiment raqamlarda",
    schoolOne: "ta maktab",
    schoolMany: "ta maktab",
    totalStudents: "Jami oʻquvchilar",
    teachersCount: (n: number) => `${n} ta oʻqituvchi`,
    experimentalGroup: "Eksperimental",
    controlGroup: "Nazorat",
    avgLessonsShort: (v: string) => `oʻrt. ${v} dars`,
    activeWeek: "7 kunda faol",
    ofAll: "barchadan",
    initialQuestionnaire: "Kirish anketasi",
    finalQuestionnaire: "Chiqish anketasi",
    outOf: (n: number) => `${n} dan`,
    studentWithoutGroupOne: "guruhsiz oʻquvchi",
    studentWithoutGroupMany: "guruhsiz oʻquvchi",
    distribute: "Taqsimlash →",
    dynamics: "Dinamika",
    completedLessonsByWeek: "Haftalik tugatilgan darslar",
    sixWeeks: "6 hafta",
    comparison: "Taqqoslash",
    expVsCtrl: "Eksp. vs Nazorat",
    studentsLabel: "Oʻquvchilar",
    avgLessonsLabel: "Oʻrt. darslar",
    avgScoreLabel: "Oʻrt. ball",
    literacyBeforeAfter: "Savodxonlik: oldin va keyin",
    avgScoreQuestionnaires: "Anketalar boʻyicha oʻrtacha ball",
    fiveQuestions: "5 ta savol",
    quickActions: "Tezkor amallar",
    whatNext: "Keyingisi",
    downloadExcel: "Excelni yuklab olish",
    allStudents: "Barcha oʻquvchilar",
    teachersWithCount: (n: number) => `Oʻqituvchilar (${n})`,
    schools: "Maktablar",
    geography: "Geografiya",
    noSchoolsYet: "Maktablar hali yoʻq — oʻqituvchini qoʻshing.",
    teachersShortMany: (n: number) => `${n} oʻqit.`,
    studentsShortMany: (n: number) => `${n} oʻquv.`,

    // student drawer
    studentCardAria: "Oʻquvchi kartasi",
    profile: "Profil",
    teacherNotAttached: "Oʻqituvchi biriktirilmagan",
    classNotSet: "sinf koʻrsatilmagan",
    closeAria: "Yopish",
    identification: "Identifikatsiya",
    school: "Maktab",
    teacherLabel: "Oʻqituvchi",
    loginCode: "Kirish kodi",
    added: "Qoʻshilgan",
    experimentGroupLabel: "Eksperiment guruhi",
    expShort: "Eksp.",
    ctrlShort: "Nazorat",
    noGroup: "Guruhsiz",
    progressOf: (done: number, total: number) => `Yutuqlar • ${total} darsdan ${done} ta`,
    completedLessons: "Tugatilgan darslar",
    averageScore: "Oʻrtacha ball",
    lastActivityLabel: "Soʻnggi faollik",
    questionnaires: "Anketalar",
    initial: "Kirish",
    final: "Chiqish",
    filledOn: (d: string) => `${d} da toʻldirilgan`,
    notFilled: "Toʻldirilmagan",
    journal: "Jurnal",
    noLessonsYet: "Oʻquvchi hali darslarni oʻtmagan.",
    scoreLabel: (s: number) => `Ball: ${s}`,
    noScore: "Bahosiz",

    // students section
    studentsAria: "Oʻquvchilar",
    filters: "Filtrlar",
    searchAndSegment: "Qidiruv va segmentatsiya",
    inSelection: (n: number) => `tanlovda ${n} ta`,
    allSchools: "Barcha maktablar",
    groupLabel: "Guruh",
    all: "Barchasi",
    searchByName: "Ism boʻyicha qidiruv",
    searchPlaceholder: "Oʻquvchi ismini kiriting...",
    activePrefix: "Faol:",
    list: "Roʻyxat",
    experimentStudents: "Eksperiment oʻquvchilari",
    hideForm: "Formani yashirish",
    addStudent: "+ Oʻquvchi qoʻshish",
    studentName: "Oʻquvchi ismi",
    studentNamePlaceholder: "Masalan, Alina K.",
    selectTeacher: "Oʻqituvchini tanlang",
    noOrganization: "tashkilotsiz",
    notePlaceholder: "Ixtiyoriy",
    note: "Izoh",
    adding: "Qoʻshilmoqda...",
    create: "Yaratish",
    cancel: "Bekor qilish",
    addTeacherFirst: "Avval «Oʻqituvchilar» boʻlimida oʻqituvchini qoʻshing — oʻquvchi pedagogga biriktiriladi.",
    noStudentsByFilters: "Tanlangan filtrlar boʻyicha oʻquvchilar yoʻq.",
    resetFilters: "Filtrlarni tozalash",
    colName: "Ism",
    colSchool: "Maktab",
    colTeacher: "Oʻqituvchi",
    colGroup: "Guruh",
    colLessons: "Darslar",
    colScore: "Ball",
    colQuestionnaires: "Anketalar",
    colActivity: "Faollik",
    initialTitle: "Kirish",
    finalTitle: "Chiqish",

    // teachers section
    teachersAria: "Oʻqituvchilar",
    educators: "Pedagoglar",
    experimentTeachers: "Eksperiment oʻqituvchilari",
    addTeacher: "+ Oʻqituvchi qoʻshish",
    name: "Ism",
    namePlaceholder: "Olga Sergeyevna",
    email: "Email",
    emailPlaceholder: "teacher@example.com",
    password: "Parol",
    passwordPlaceholder: "kamida 6 ta belgi",
    organization: "Tashkilot",
    organizationPlaceholder: "Maktab yoki markaz",
    classLabel: "Sinf",
    classPlaceholder: "3-sinf",
    creatingTeacher: "Qoʻshilmoqda...",
    createTeacher: "Oʻqituvchini yaratish",
    noTeachersYet: "Oʻqituvchilar hali yoʻq. Oʻquvchilarni biriktirish uchun birinchi oʻqituvchini qoʻshing.",
    schoolNotSet: "Maktab koʻrsatilmagan",
    classUnknown: "sinf ?",
    studentsLower: "oʻquvchi",
    expLower: "eksp.",
    ctrlLower: "nazorat",

    // export section
    exportAria: "Eksport",
    extract: "Yuklab olish",
    excelForSPSS: "SPSS va tahlil uchun Excel",
    studentsWithCount: (n: number) => `${n} oʻquvchi`,
    exportFileDescription: "Fayl eksperimentning anonim maʼlumotlarini oʻz ichiga oladi. Ismlar tekshirish uchun saqlangan — nashr qilishda ID bilan almashtiring.",
    selection: "Tanlanma",
    allWithCount: (n: number) => `Barchasi (${n})`,
    expWithCount: (n: number) => `Eksp. (${n})`,
    ctrlWithCount: (n: number) => `Nazorat (${n})`,
    downloadExcelWithCount: (n: number) => `Excelni yuklab olish (${n})`,
    fileStructure: "Fayl tuzilmasi",
    whatsInside: "Ichida nima bor",
    tableOverview: "Umumiy koʻrinish",
    tableOverviewDesc: "Maktablar, guruhlar va faollik boʻyicha jamlanma jadval",
    tableStudents: "Oʻquvchilar",
    tableStudentsDesc: "ID, kirish kodlari va yutuqlar bilan toʻliq roʻyxat",
    tableEvents: "Voqealar",
    tableEventsDesc: "Oʻquvchilarning barcha harakatlari: darslar, javoblar, maslahatlar",
    tableQuestionnaires: "Anketalar",
    tableQuestionnairesDesc: (n: number) => `Kirish va chiqish anketalari — ${n} ta yozuv`,
    fiveCriteria: "5 mezon",
    scaleLabel: "Baholash shkalasi",
    criterion1: "Matnni tushunish",
    criterion2: "Algoritmni bajarish",
    criterion3: "Mustaqillik",
    criterion4: "Xavfsizlik",
    criterion5: "Koʻnikmani koʻchirish",
    fromDissertation: "O.A. Markova dissertatsiyasidan. Batafsil baholash kengaytirilgan harakatlar logidan keyin paydo boʻladi.",
    summaryShort: "Umumiy",
    ofThisExport: "Ushbu yuklamaning",
    studentsLabel2: "Oʻquvchilar",
    teachersLabel: "Oʻqituvchilar",
    questionnairesLabel: "Anketalar",
  },
} as const;

function getSectionConfig(locale: Locale) {
  const t = dict[locale];
  return {
    dashboard: {
      label: t.sectionDashboardLabel,
      caption: t.sectionDashboardCaption,
      title: t.sectionDashboardTitle,
      description: t.sectionDashboardDescription,
    },
    students: {
      label: t.sectionStudentsLabel,
      caption: t.sectionStudentsCaption,
      title: t.sectionStudentsTitle,
      description: t.sectionStudentsDescription,
    },
    teachers: {
      label: t.sectionTeachersLabel,
      caption: t.sectionTeachersCaption,
      title: t.sectionTeachersTitle,
      description: t.sectionTeachersDescription,
    },
    export: {
      label: t.sectionExportLabel,
      caption: t.sectionExportCaption,
      title: t.sectionExportTitle,
      description: t.sectionExportDescription,
    },
  } satisfies Record<ResearcherSection, { label: string; caption: string; title: string; description: string }>;
}

const sectionOrder: ResearcherSection[] = [
  "dashboard",
  "students",
  "teachers",
  "export",
];

function formatDate(value: string | undefined, locale: Locale) {
  if (!value) return "—";
  const dateLocale = locale === "uz" ? "uz-UZ" : "ru-RU";
  return new Intl.DateTimeFormat(dateLocale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function formatRelative(value: string | undefined, locale: Locale) {
  const t = dict[locale];
  if (!value) return t.notLoggedIn;
  const days = Math.round(
    (Date.now() - new Date(value).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (days <= 0) return t.today;
  if (days === 1) return t.yesterday;
  if (days < 7) return t.daysAgo(days);
  if (days < 30) return t.weeksAgo(Math.round(days / 7));
  return formatDate(value, locale);
}

function lastActivity(student: CurrentUser): string | null {
  if (!student.progress.length) return null;
  return student.progress.reduce(
    (latest, p) => (p.completedAt > latest ? p.completedAt : latest),
    student.progress[0].completedAt,
  );
}

function avgScore(students: CurrentUser[]): string {
  const scores = students.flatMap((u) =>
    u.progress.flatMap((p) => (p.score !== undefined ? [p.score] : [])),
  );
  if (!scores.length) return "—";
  return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
}

function avgLessons(students: CurrentUser[]): string {
  if (!students.length) return "—";
  return (
    students.reduce((s, u) => s + u.progress.length, 0) / students.length
  ).toFixed(1);
}

const TOTAL_LESSONS = displayLessons.length;

async function exportExcel(students: CurrentUser[], errorMessage: string) {
  const response = await fetch("/api/researcher/export/xlsx", {
    method: "POST",
    credentials: "same-origin",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentIds: students.map((s) => s.id) }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(payload.error || errorMessage);
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `uquvli_data_${new Date().toISOString().slice(0, 10)}.xlsx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ── Weekly activity series ────────────────────────────────────────────────────

type WeekPoint = { weekStart: string; experimental: number; control: number };

function buildWeeklySeries(students: CurrentUser[], weeks = 6): WeekPoint[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const day = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - day);

  const buckets: WeekPoint[] = [];
  for (let i = weeks - 1; i >= 0; i--) {
    const start = new Date(monday);
    start.setDate(monday.getDate() - i * 7);
    buckets.push({
      weekStart: start.toISOString().slice(0, 10),
      experimental: 0,
      control: 0,
    });
  }

  for (const s of students) {
    for (const p of s.progress) {
      const ts = new Date(p.completedAt).getTime();
      const idx = buckets.findIndex((b, i) => {
        const start = new Date(b.weekStart).getTime();
        const nextStart =
          i + 1 < buckets.length
            ? new Date(buckets[i + 1].weekStart).getTime()
            : start + 7 * 24 * 60 * 60 * 1000;
        return ts >= start && ts < nextStart;
      });
      if (idx === -1) continue;
      if (s.group === "experimental") buckets[idx].experimental += 1;
      else if (s.group === "control") buckets[idx].control += 1;
    }
  }
  return buckets;
}

// ── WeeklyChart (inline SVG) ──────────────────────────────────────────────────

function WeeklyChart({ data, locale }: { data: WeekPoint[]; locale: Locale }) {
  const t = dict[locale];
  const W = 540;
  const H = 180;
  const PAD_L = 28;
  const PAD_R = 12;
  const PAD_T = 14;
  const PAD_B = 26;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const maxVal = Math.max(
    1,
    ...data.flatMap((d) => [d.experimental, d.control]),
  );

  const xAt = (i: number) =>
    PAD_L + (data.length <= 1 ? innerW / 2 : (innerW * i) / (data.length - 1));
  const yAt = (v: number) => PAD_T + innerH - (innerH * v) / maxVal;

  const buildPath = (key: "experimental" | "control") =>
    data
      .map((d, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(d[key])}`)
      .join(" ");

  const gridLines = [0, 0.5, 1].map((tt) => PAD_T + innerH * (1 - tt));

  return (
    <div className="researcher-chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t.weeklyActivityAria}>
        {gridLines.map((y, i) => (
          <line
            key={i}
            x1={PAD_L}
            x2={W - PAD_R}
            y1={y}
            y2={y}
            stroke="rgba(16, 33, 59, 0.08)"
            strokeWidth="1"
          />
        ))}
        {[0, Math.round(maxVal / 2), maxVal].map((v, i) => (
          <text
            key={i}
            x={PAD_L - 6}
            y={yAt(v) + 4}
            fontSize="10"
            textAnchor="end"
            fill="#94a3b8"
          >
            {v}
          </text>
        ))}
        <path
          d={buildPath("control")}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d={buildPath("experimental")}
          fill="none"
          stroke="#7c3aed"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {data.map((d, i) => (
          <g key={d.weekStart}>
            <circle cx={xAt(i)} cy={yAt(d.control)} r="3" fill="#94a3b8" />
            <circle cx={xAt(i)} cy={yAt(d.experimental)} r="3.5" fill="#7c3aed" />
          </g>
        ))}
        {data.map((d, i) => {
          const date = new Date(d.weekStart);
          const label = `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}`;
          return (
            <text
              key={d.weekStart}
              x={xAt(i)}
              y={H - 8}
              fontSize="10"
              textAnchor="middle"
              fill="#64748b"
            >
              {label}
            </text>
          );
        })}
      </svg>
      <div className="researcher-chart-legend">
        <span>
          <i style={{ background: "#7c3aed" }} />
          {t.legendExperimental}
        </span>
        <span>
          <i style={{ background: "#94a3b8" }} />
          {t.legendControl}
        </span>
      </div>
    </div>
  );
}

// ── BeforeAfterChart (SVG inline) ─────────────────────────────────────────────

type GroupQScores = {
  name: string;
  initial: number | null;
  final: number | null;
};

function calcGroupQScores(
  students: CurrentUser[],
  questionnaires: QuestionnaireSubmission[],
  group: StudentGroup,
): GroupQScores[] {
  return students
    .filter((s) => s.group === group)
    .map((s) => {
      const ini = questionnaires.find((q) => q.userId === s.id && q.type === "initial");
      const fin = questionnaires.find((q) => q.userId === s.id && q.type === "final");
      const sum = (sub: QuestionnaireSubmission) =>
        sub.answers.reduce((acc, a) => acc + a.score, 0);
      return {
        name: s.profile.childName || s.name,
        initial: ini ? sum(ini) : null,
        final: fin ? sum(fin) : null,
      };
    });
}

function BeforeAfterChart({
  experimental,
  control,
  locale,
}: {
  experimental: GroupQScores[];
  control: GroupQScores[];
  locale: Locale;
}) {
  const t = dict[locale];
  // UI Logic
  const avg = (arr: GroupQScores[], key: "initial" | "final") => {
    const vals = arr.map((r) => r[key]).filter((v): v is number => v !== null);
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
  };

  const expIni = avg(experimental, "initial");
  const expFin = avg(experimental, "final");
  const ctrlIni = avg(control, "initial");
  const ctrlFin = avg(control, "final");

  const hasAny = [expIni, expFin, ctrlIni, ctrlFin].some((v) => v !== null);

  if (!hasAny) {
    return (
      <p className="lms-note">
        {t.noQuestionnaireData}
      </p>
    );
  }

  const maxVal = Math.max(expIni ?? 0, expFin ?? 0, ctrlIni ?? 0, ctrlFin ?? 0, 1);
  const BAR_H = 28;
  const GAP = 12;
  const LABEL_W = 120;
  const BAR_MAX_W = 320;
  const W = LABEL_W + BAR_MAX_W + 60;

  const bars: { label: string; value: number | null; color: string }[] = [
    { label: t.expBefore, value: expIni, color: "rgba(124,58,237,0.35)" },
    { label: t.expAfter, value: expFin, color: "#7c3aed" },
    { label: t.ctrlBefore, value: ctrlIni, color: "rgba(100,116,139,0.35)" },
    { label: t.ctrlAfter, value: ctrlFin, color: "#64748b" },
  ];

  const totalH = bars.length * (BAR_H + GAP) - GAP + 4;

  return (
    <div className="researcher-chart">
      <svg viewBox={`0 0 ${W} ${totalH}`} role="img" aria-label={t.beforeAfterAria}>
        {bars.map((bar, i) => {
          const y = i * (BAR_H + GAP);
          const barW = bar.value !== null ? (bar.value / maxVal) * BAR_MAX_W : 0;
          return (
            <g key={bar.label}>
              <text x={LABEL_W - 8} y={y + BAR_H / 2 + 4} fontSize="11" textAnchor="end" fill="#64748b" fontWeight="600">
                {bar.label}
              </text>
              <rect x={LABEL_W} y={y} width={BAR_MAX_W} height={BAR_H} rx="5" fill="rgba(16,33,59,0.05)" />
              {bar.value !== null && (
                <rect x={LABEL_W} y={y} width={barW} height={BAR_H} rx="5" fill={bar.color} />
              )}
              <text
                x={LABEL_W + (bar.value !== null ? barW + 8 : 8)}
                y={y + BAR_H / 2 + 4}
                fontSize="11"
                fill="#10213b"
                fontWeight="800"
              >
                {bar.value !== null ? bar.value.toFixed(1) : t.noData}
              </text>
            </g>
          );
        })}
      </svg>
      {/* UI Module */}
      <div className="researcher-delta-row">
        {expIni !== null && expFin !== null ? (
          <div className={`researcher-delta ${expFin - expIni >= 0 ? "researcher-delta--pos" : "researcher-delta--neg"}`}>
            <strong>{expFin - expIni >= 0 ? "+" : ""}{(expFin - expIni).toFixed(1)}</strong>
            <span>{t.deltaExp}</span>
          </div>
        ) : null}
        {ctrlIni !== null && ctrlFin !== null ? (
          <div className={`researcher-delta ${ctrlFin - ctrlIni >= 0 ? "researcher-delta--pos" : "researcher-delta--neg"}`}>
            <strong>{ctrlFin - ctrlIni >= 0 ? "+" : ""}{(ctrlFin - ctrlIni).toFixed(1)}</strong>
            <span>{t.deltaCtrl}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ── DashboardSection ──────────────────────────────────────────────────────────

function DashboardSection({
  teachers,
  students,
  questionnaires,
  onExportExcel,
  onGoTo,
  locale,
}: {
  teachers: CurrentUser[];
  students: CurrentUser[];
  questionnaires: QuestionnaireSubmission[];
  onExportExcel: () => void;
  onGoTo: (section: ResearcherSection) => void;
  locale: Locale;
}) {
  const t = dict[locale];
  const experimental = students.filter((s) => s.group === "experimental");
  const control = students.filter((s) => s.group === "control");
  const noGroup = students.filter((s) => !s.group);

  const initialDone = new Set(
    questionnaires.filter((q) => q.type === "initial").map((q) => q.userId),
  ).size;
  const finalDone = new Set(
    questionnaires.filter((q) => q.type === "final").map((q) => q.userId),
  ).size;

  const [sevenDaysAgo] = useState(() => Date.now() - 7 * 24 * 60 * 60 * 1000);
  const activeWeek = students.filter((s) => {
    const last = lastActivity(s);
    return last ? new Date(last).getTime() >= sevenDaysAgo : false;
  }).length;

  const series = buildWeeklySeries(students, 6);

  const schools = Array.from(
    new Set(teachers.map((tt) => tt.profile.organizationName).filter(Boolean)),
  );

  return (
    <section className="lms-dashboard" aria-label={t.dashboardAria}>
      {/* UI Module */}
      <article className="lms-panel">
        <div className="lms-section-head">
          <div>
            <p className="lms-kicker">{t.summary}</p>
            <h2>{t.experimentInNumbers}</h2>
          </div>
          <span className="lms-chip researcher-chip-violet">
            {schools.length} {schools.length === 1 ? t.schoolOne : t.schoolMany}
          </span>
        </div>

        <div className="researcher-kpi-grid">
          <div className="researcher-kpi">
            <span className="researcher-kpi-label">{t.totalStudents}</span>
            <strong>{students.length}</strong>
            <small>{t.teachersCount(teachers.length)}</small>
          </div>
          <div className="researcher-kpi researcher-kpi--exp">
            <span className="researcher-kpi-label">{t.experimentalGroup}</span>
            <strong>{experimental.length}</strong>
            <small>{t.avgLessonsShort(avgLessons(experimental))}</small>
          </div>
          <div className="researcher-kpi researcher-kpi--ctrl">
            <span className="researcher-kpi-label">{t.controlGroup}</span>
            <strong>{control.length}</strong>
            <small>{t.avgLessonsShort(avgLessons(control))}</small>
          </div>
          <div className="researcher-kpi">
            <span className="researcher-kpi-label">{t.activeWeek}</span>
            <strong>{activeWeek}</strong>
            <small>
              {students.length
                ? `${Math.round((activeWeek / students.length) * 100)}%`
                : "—"}{" "}
              {t.ofAll}
            </small>
          </div>
          <div className="researcher-kpi">
            <span className="researcher-kpi-label">{t.initialQuestionnaire}</span>
            <strong>{initialDone}</strong>
            <small>{t.outOf(students.length)}</small>
          </div>
          <div className="researcher-kpi">
            <span className="researcher-kpi-label">{t.finalQuestionnaire}</span>
            <strong>{finalDone}</strong>
            <small>{t.outOf(students.length)}</small>
          </div>
        </div>

        {noGroup.length > 0 ? (
          <p className="lms-note researcher-warn">
            <CabinetIcon name="alert" /> {noGroup.length}{" "}
            {noGroup.length === 1 ? t.studentWithoutGroupOne : t.studentWithoutGroupMany}.{" "}
            <button
              type="button"
              className="researcher-link"
              onClick={() => onGoTo("students")}
            >
              {t.distribute}
            </button>
          </p>
        ) : null}
      </article>

      <div className="lms-grid-today">
        <div className="lms-main-column">
          {/* UI Module */}
          <article className="lms-panel">
            <div className="lms-section-head">
              <div>
                <p className="lms-kicker">{t.dynamics}</p>
                <h2>{t.completedLessonsByWeek}</h2>
              </div>
              <span className="lms-chip">{t.sixWeeks}</span>
            </div>
            <WeeklyChart data={series} locale={locale} />
          </article>

          {/* UI Module */}
          <article className="lms-panel">
            <div className="lms-section-head">
              <div>
                <p className="lms-kicker">{t.comparison}</p>
                <h2>{t.expVsCtrl}</h2>
              </div>
            </div>
            <div className="researcher-compare-grid">
              <div className="researcher-compare-row">
                <span>{t.studentsLabel}</span>
                <div className="researcher-bar-pair">
                  <BarBlock
                    value={experimental.length}
                    max={Math.max(experimental.length, control.length, 1)}
                    variant="exp"
                  />
                  <BarBlock
                    value={control.length}
                    max={Math.max(experimental.length, control.length, 1)}
                    variant="ctrl"
                  />
                </div>
              </div>
              <div className="researcher-compare-row">
                <span>{t.avgLessonsLabel}</span>
                <div className="researcher-bar-pair">
                  <BarBlock
                    value={parseFloat(avgLessons(experimental)) || 0}
                    max={Math.max(
                      parseFloat(avgLessons(experimental)) || 0,
                      parseFloat(avgLessons(control)) || 0,
                      1,
                    )}
                    variant="exp"
                    valueLabel={avgLessons(experimental)}
                  />
                  <BarBlock
                    value={parseFloat(avgLessons(control)) || 0}
                    max={Math.max(
                      parseFloat(avgLessons(experimental)) || 0,
                      parseFloat(avgLessons(control)) || 0,
                      1,
                    )}
                    variant="ctrl"
                    valueLabel={avgLessons(control)}
                  />
                </div>
              </div>
              <div className="researcher-compare-row">
                <span>{t.avgScoreLabel}</span>
                <div className="researcher-bar-pair">
                  <BarBlock
                    value={parseFloat(avgScore(experimental)) || 0}
                    max={Math.max(
                      parseFloat(avgScore(experimental)) || 0,
                      parseFloat(avgScore(control)) || 0,
                      1,
                    )}
                    variant="exp"
                    valueLabel={avgScore(experimental)}
                  />
                  <BarBlock
                    value={parseFloat(avgScore(control)) || 0}
                    max={Math.max(
                      parseFloat(avgScore(experimental)) || 0,
                      parseFloat(avgScore(control)) || 0,
                      1,
                    )}
                    variant="ctrl"
                    valueLabel={avgScore(control)}
                  />
                </div>
              </div>
            </div>
          </article>

          {/* UI Module */}
          <article className="lms-panel">
            <div className="lms-section-head">
              <div>
                <p className="lms-kicker">{t.literacyBeforeAfter}</p>
                <h2>{t.avgScoreQuestionnaires}</h2>
              </div>
              <span className="lms-chip researcher-chip-violet">{t.fiveQuestions}</span>
            </div>
            <BeforeAfterChart
              experimental={calcGroupQScores(students, questionnaires, "experimental")}
              control={calcGroupQScores(students, questionnaires, "control")}
              locale={locale}
            />
          </article>
        </div>

        <aside className="lms-side-column">
          <article className="lms-panel">
            <div className="lms-section-head">
              <div>
                <p className="lms-kicker">{t.quickActions}</p>
                <h2>{t.whatNext}</h2>
              </div>
            </div>
            <div className="researcher-quick">
              <button
                type="button"
                className="button button-primary full"
                onClick={onExportExcel}
              >
                <CabinetIcon name="download" /> {t.downloadExcel}
              </button>
              <button
                type="button"
                className="button button-secondary full"
                onClick={() => onGoTo("students")}
              >
                <CabinetIcon name="users" /> {t.allStudents}
              </button>
              <button
                type="button"
                className="button button-ghost full"
                onClick={() => onGoTo("teachers")}
              >
                <CabinetIcon name="graduation" /> {t.teachersWithCount(teachers.length)}
              </button>
            </div>
          </article>

          <article className="lms-panel">
            <div className="lms-section-head">
              <div>
                <p className="lms-kicker">{t.schools}</p>
                <h2>{t.geography}</h2>
              </div>
            </div>
            {schools.length === 0 ? (
              <p className="lms-note">{t.noSchoolsYet}</p>
            ) : (
              <div className="researcher-schools-list">
                {schools.map((school) => {
                  const schoolTeachers = teachers.filter(
                    (tt) => tt.profile.organizationName === school,
                  );
                  const schoolStudents = students.filter((s) =>
                    schoolTeachers.some((tt) => tt.id === s.teacherId),
                  );
                  return (
                    <div key={school} className="researcher-school-row">
                      <div>
                        <strong>{school}</strong>
                        <span>
                          {t.teachersShortMany(schoolTeachers.length)} • {t.studentsShortMany(schoolStudents.length)}
                        </span>
                      </div>
                      <span className="lms-chip">
                        {schoolStudents.filter((s) => s.group === "experimental").length}/
                        {schoolStudents.filter((s) => s.group === "control").length}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </article>
        </aside>
      </div>
    </section>
  );
}

function BarBlock({
  value,
  max,
  variant,
  valueLabel,
}: {
  value: number;
  max: number;
  variant: "exp" | "ctrl";
  valueLabel?: string;
}) {
  const pct = max ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className={`researcher-bar researcher-bar--${variant}`}>
      <div className="researcher-bar-track">
        <span style={{ width: `${pct}%` }} />
      </div>
      <strong>{valueLabel ?? value}</strong>
    </div>
  );
}

// ── StudentDrawer ─────────────────────────────────────────────────────────────

function StudentDrawer({
  student,
  teacher,
  questionnaires,
  onClose,
  onGroupChange,
  locale,
}: {
  student: CurrentUser;
  teacher: CurrentUser | undefined;
  questionnaires: QuestionnaireSubmission[];
  onClose: () => void;
  onGroupChange: (group: StudentGroup | "") => void;
  locale: Locale;
}) {
  const t = dict[locale];
  const completed = Array.from(
    new Set(student.progress.map((p) => p.lessonSlug)),
  );
  const pct = TOTAL_LESSONS
    ? Math.min(100, Math.round((completed.length / TOTAL_LESSONS) * 100))
    : 0;
  const scores = student.progress.flatMap((p) =>
    p.score !== undefined ? [p.score] : [],
  );
  const studentAvg = scores.length
    ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)
    : "—";

  const initial = questionnaires.find(
    (q) => q.userId === student.id && q.type === "initial",
  );
  const final = questionnaires.find(
    (q) => q.userId === student.id && q.type === "final",
  );

  const recent = [...student.progress]
    .sort((a, b) => (a.completedAt < b.completedAt ? 1 : -1))
    .slice(0, 8);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="researcher-drawer-overlay"
      onClick={onClose}
      role="presentation"
    >
      <aside
        className="researcher-drawer"
        onClick={(e) => e.stopPropagation()}
        aria-label={t.studentCardAria}
      >
        <header className="researcher-drawer-head">
          <div>
            <p className="lms-kicker">{t.profile}</p>
            <h2>{student.profile.childName || student.name}</h2>
            <p className="researcher-drawer-meta">
              {teacher?.name ?? t.teacherNotAttached} •{" "}
              {student.profile.childClass || t.classNotSet}
            </p>
          </div>
          <button
            type="button"
            className="researcher-drawer-close"
            onClick={onClose}
            aria-label={t.closeAria}
          >
            <CabinetIcon name="x" />
          </button>
        </header>

        <div className="researcher-drawer-body">
          {/* UI Module */}
          <section className="researcher-drawer-block">
            <p className="lms-kicker">{t.identification}</p>
            <div className="researcher-drawer-defs">
              <div>
                <span>{t.school}</span>
                <strong>{teacher?.profile.organizationName || "—"}</strong>
              </div>
              <div>
                <span>{t.teacherLabel}</span>
                <strong>{teacher?.name ?? "—"}</strong>
              </div>
              <div>
                <span>{t.loginCode}</span>
                <strong className="researcher-mono">
                  {student.studentCode ?? "—"}
                </strong>
              </div>
              <div>
                <span>{t.added}</span>
                <strong>{formatDate(student.createdAt, locale)}</strong>
              </div>
            </div>
          </section>

          {/* UI Module */}
          <section className="researcher-drawer-block">
            <p className="lms-kicker">{t.experimentGroupLabel}</p>
            <div className="researcher-drawer-group">
              {(
                [
                  { v: "experimental" as const, l: t.expShort },
                  { v: "control" as const, l: t.ctrlShort },
                  { v: "" as const, l: t.noGroup },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.v || "none"}
                  type="button"
                  className={`researcher-group-toggle ${student.group === opt.v || (!student.group && opt.v === "") ? "active" : ""} researcher-group-toggle--${opt.v || "none"}`}
                  onClick={() => onGroupChange(opt.v)}
                >
                  {opt.l}
                </button>
              ))}
            </div>
          </section>

          {/* UI Module */}
          <section className="researcher-drawer-block">
            <p className="lms-kicker">
              {t.progressOf(completed.length, TOTAL_LESSONS)}
            </p>
            <div className="lms-progress-track">
              <span style={{ width: `${pct}%` }} />
            </div>
            <div className="researcher-drawer-defs researcher-drawer-defs--compact">
              <div>
                <span>{t.completedLessons}</span>
                <strong>{completed.length}</strong>
              </div>
              <div>
                <span>{t.averageScore}</span>
                <strong>{studentAvg}</strong>
              </div>
              <div>
                <span>{t.lastActivityLabel}</span>
                <strong>{formatRelative(lastActivity(student) ?? undefined, locale)}</strong>
              </div>
            </div>
          </section>

          {/* UI Module */}
          <section className="researcher-drawer-block">
            <p className="lms-kicker">{t.questionnaires}</p>
            <div className="researcher-drawer-anketas">
              <div
                className={`researcher-anketa ${initial ? "researcher-anketa--done" : ""}`}
              >
                <span className="researcher-anketa-dot" />
                <div>
                  <strong>{t.initial}</strong>
                  <span>
                    {initial
                      ? t.filledOn(formatDate(initial.submittedAt, locale))
                      : t.notFilled}
                  </span>
                </div>
              </div>
              <div
                className={`researcher-anketa ${final ? "researcher-anketa--done" : ""}`}
              >
                <span className="researcher-anketa-dot" />
                <div>
                  <strong>{t.final}</strong>
                  <span>
                    {final
                      ? t.filledOn(formatDate(final.submittedAt, locale))
                      : t.notFilled}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* UI Module */}
          <section className="researcher-drawer-block">
            <p className="lms-kicker">{t.journal}</p>
            {recent.length === 0 ? (
              <p className="lms-note">{t.noLessonsYet}</p>
            ) : (
              <div className="researcher-drawer-log">
                {recent.map((p, i) => {
                  const lesson = displayLessons.find(
                    (l) => l.slug === p.lessonSlug,
                  );
                  return (
                    <div key={`${p.lessonSlug}-${i}`} className="researcher-log-row">
                      <span className="researcher-log-time">
                        {formatRelative(p.completedAt, locale)}
                      </span>
                      <div>
                        <strong>{lesson?.title ?? p.lessonSlug}</strong>
                        {p.score !== undefined ? (
                          <span>{t.scoreLabel(p.score)}</span>
                        ) : (
                          <span>{t.noScore}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </aside>
    </div>
  );
}

// ── StudentsSection ───────────────────────────────────────────────────────────

type SortKey = "name" | "school" | "teacher" | "group" | "lessons" | "score" | "last";
type SortDir = "asc" | "desc";

function StudentsSection({
  teachers,
  students,
  questionnaires,
  onChange,
  locale,
}: {
  teachers: CurrentUser[];
  students: CurrentUser[];
  questionnaires: QuestionnaireSubmission[];
  onChange: () => void | Promise<void>;
  locale: Locale;
}) {
  const t = dict[locale];
  const schools = Array.from(
    new Set(teachers.map((tt) => tt.profile.organizationName).filter(Boolean)),
  );

  const [schoolFilter, setSchoolFilter] = useState<string>("");
  const [groupFilter, setGroupFilter] = useState<"all" | StudentGroup | "none">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Add form
  const [addName, setAddName] = useState("");
  const [addTeacherId, setAddTeacherId] = useState("");
  const [addGroup, setAddGroup] = useState<StudentGroup>("experimental");
  const [addNotes, setAddNotes] = useState("");
  const [addError, setAddError] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      if (groupFilter === "none" && s.group) return false;
      if (groupFilter !== "all" && groupFilter !== "none" && s.group !== groupFilter)
        return false;
      if (schoolFilter) {
        const teacher = teachers.find((tt) => tt.id === s.teacherId);
        if (!teacher || teacher.profile.organizationName !== schoolFilter)
          return false;
      }
      if (searchQuery) {
        const name = (s.profile.childName || s.name).toLowerCase();
        if (!name.includes(searchQuery.toLowerCase())) return false;
      }
      return true;
    });
  }, [students, teachers, schoolFilter, groupFilter, searchQuery]);

  const collator = locale === "uz" ? "uz" : "ru";
  const sorted = useMemo(() => {
    const arr = [...filtered];
    const dir = sortDir === "asc" ? 1 : -1;
    arr.sort((a, b) => {
      const teacherA = teachers.find((tt) => tt.id === a.teacherId);
      const teacherB = teachers.find((tt) => tt.id === b.teacherId);
      const scoresA = a.progress.flatMap((p) =>
        p.score !== undefined ? [p.score] : [],
      );
      const scoresB = b.progress.flatMap((p) =>
        p.score !== undefined ? [p.score] : [],
      );
      const lastA = lastActivity(a);
      const lastB = lastActivity(b);

      switch (sortKey) {
        case "name":
          return (
            (a.profile.childName || a.name).localeCompare(
              b.profile.childName || b.name,
              collator,
            ) * dir
          );
        case "school":
          return (
            (teacherA?.profile.organizationName || "").localeCompare(
              teacherB?.profile.organizationName || "",
              collator,
            ) * dir
          );
        case "teacher":
          return (
            (teacherA?.name || "").localeCompare(teacherB?.name || "", collator) * dir
          );
        case "group":
          return ((a.group || "z").localeCompare(b.group || "z")) * dir;
        case "lessons":
          return (a.progress.length - b.progress.length) * dir;
        case "score": {
          const sa = scoresA.length
            ? scoresA.reduce((x, y) => x + y, 0) / scoresA.length
            : -1;
          const sb = scoresB.length
            ? scoresB.reduce((x, y) => x + y, 0) / scoresB.length
            : -1;
          return (sa - sb) * dir;
        }
        case "last": {
          const ta = lastA ? new Date(lastA).getTime() : 0;
          const tb = lastB ? new Date(lastB).getTime() : 0;
          return (ta - tb) * dir;
        }
      }
    });
    return arr;
  }, [filtered, teachers, sortKey, sortDir, collator]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const hasInitial = useCallback(
    (id: string) =>
      questionnaires.some((q) => q.userId === id && q.type === "initial"),
    [questionnaires],
  );
  const hasFinal = useCallback(
    (id: string) =>
      questionnaires.some((q) => q.userId === id && q.type === "final"),
    [questionnaires],
  );

  async function handleAddStudent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAddError("");
    const teacher = teachers.find((tt) => tt.id === addTeacherId);
    if (!teacher) {
      setAddError(t.selectTeacherError);
      return;
    }
    setIsAdding(true);
    try {
      await createResearcherUser({
        role: "student",
        name: addName,
        teacherId: teacher.id,
        childClass: teacher.profile.childClass,
        group: addGroup,
        notes: addNotes,
      });
      setAddName("");
      setAddTeacherId("");
      setAddGroup("experimental");
      setAddNotes("");
      setShowAddForm(false);
      await onChange();
    } catch (err) {
      setAddError(
        err instanceof Error ? err.message : t.addStudentError,
      );
    } finally {
      setIsAdding(false);
    }
  }

  async function handleGroupChange(
    studentId: string,
    group: StudentGroup | "",
  ) {
    if (group === "") return;
    await updateStudentGroup(studentId, group);
    await onChange();
  }

  const selected = selectedId
    ? students.find((s) => s.id === selectedId) ?? null
    : null;
  const selectedTeacher = selected
    ? teachers.find((tt) => tt.id === selected.teacherId)
    : undefined;

  const activeFilters: { label: string; clear: () => void }[] = [];
  if (schoolFilter)
    activeFilters.push({ label: schoolFilter, clear: () => setSchoolFilter("") });
  if (groupFilter !== "all")
    activeFilters.push({
      label:
        groupFilter === "experimental"
          ? t.experimentalGroup
          : groupFilter === "control"
            ? t.controlGroup
            : t.noGroup,
      clear: () => setGroupFilter("all"),
    });
  if (searchQuery)
    activeFilters.push({
      label: `«${searchQuery}»`,
      clear: () => setSearchQuery(""),
    });

  return (
    <section className="lms-dashboard" aria-label={t.studentsAria}>
      {/* UI Module */}
      <article className="lms-panel">
        <div className="lms-section-head">
          <div>
            <p className="lms-kicker">{t.filters}</p>
            <h2>{t.searchAndSegment}</h2>
          </div>
          <span className="lms-chip">{t.inSelection(sorted.length)}</span>
        </div>

        <div className="researcher-filters-grid">
          <div className="researcher-field">
            <label htmlFor="r-school">{t.school}</label>
            <select
              id="r-school"
              value={schoolFilter}
              onChange={(e) => setSchoolFilter(e.target.value)}
            >
              <option value="">{t.allSchools}</option>
              {schools.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="researcher-field">
            <label htmlFor="r-group">{t.groupLabel}</label>
            <select
              id="r-group"
              value={groupFilter}
              onChange={(e) =>
                setGroupFilter(e.target.value as "all" | StudentGroup | "none")
              }
            >
              <option value="all">{t.all}</option>
              <option value="experimental">{t.experimentalGroup}</option>
              <option value="control">{t.controlGroup}</option>
              <option value="none">{t.noGroup}</option>
            </select>
          </div>

          <div className="researcher-field researcher-field--search">
            <label htmlFor="r-search">{t.searchByName}</label>
            <div className="researcher-search-wrap">
              <CabinetIcon name="search" />
              <input
                id="r-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
              />
            </div>
          </div>
        </div>

        {activeFilters.length > 0 ? (
          <div className="researcher-active-filters">
            <span>{t.activePrefix}</span>
            {activeFilters.map((f) => (
              <button
                key={f.label}
                type="button"
                className="researcher-filter-tag"
                onClick={f.clear}
              >
                {f.label} <CabinetIcon name="x" />
              </button>
            ))}
          </div>
        ) : null}
      </article>

      {/* UI Module */}
      <article className="lms-panel">
        <div className="lms-section-head">
          <div>
            <p className="lms-kicker">{t.list}</p>
            <h2>{t.experimentStudents}</h2>
          </div>
          <button
            type="button"
            className="button button-secondary small"
            onClick={() => setShowAddForm((v) => !v)}
            disabled={teachers.length === 0}
          >
            {showAddForm ? t.hideForm : t.addStudent}
          </button>
        </div>

        {showAddForm ? (
          <form className="researcher-add-form" onSubmit={handleAddStudent}>
            <div className="researcher-add-grid">
              <div className="field">
                <label htmlFor="r-add-name">{t.studentName}</label>
                <input
                  id="r-add-name"
                  type="text"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  placeholder={t.studentNamePlaceholder}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="r-add-teacher">{t.teacherLabel}</label>
                <select
                  id="r-add-teacher"
                  value={addTeacherId}
                  onChange={(e) => setAddTeacherId(e.target.value)}
                  required
                >
                  <option value="">{t.selectTeacher}</option>
                  {teachers.map((tt) => (
                    <option key={tt.id} value={tt.id}>
                      {tt.name} — {tt.profile.organizationName || t.noOrganization}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="r-add-group">{t.groupLabel}</label>
                <select
                  id="r-add-group"
                  value={addGroup}
                  onChange={(e) => setAddGroup(e.target.value as StudentGroup)}
                >
                  <option value="experimental">{t.experimentalGroup}</option>
                  <option value="control">{t.controlGroup}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="r-add-notes">{t.note}</label>
                <input
                  id="r-add-notes"
                  type="text"
                  value={addNotes}
                  onChange={(e) => setAddNotes(e.target.value)}
                  placeholder={t.notePlaceholder}
                />
              </div>
            </div>
            {addError ? <p className="form-error">{addError}</p> : null}
            <div className="researcher-add-actions">
              <button
                type="submit"
                className="button button-primary small"
                disabled={isAdding}
              >
                {isAdding ? t.adding : t.create}
              </button>
              <button
                type="button"
                className="button button-ghost small"
                onClick={() => setShowAddForm(false)}
              >
                {t.cancel}
              </button>
            </div>
          </form>
        ) : null}

        {teachers.length === 0 ? (
          <p className="lms-note">
            {t.addTeacherFirst}
          </p>
        ) : sorted.length === 0 ? (
          <p className="lms-note">
            {t.noStudentsByFilters}{" "}
            <button
              type="button"
              className="researcher-link"
              onClick={() => {
                setSchoolFilter("");
                setGroupFilter("all");
                setSearchQuery("");
              }}
            >
              {t.resetFilters}
            </button>
          </p>
        ) : (
          <div className="researcher-table-wrap">
            <table className="researcher-table">
              <thead>
                <tr>
                  <SortHeader
                    label={t.colName}
                    activeKey={sortKey}
                    activeDir={sortDir}
                    sortKey="name"
                    onSort={toggleSort}
                  />
                  <SortHeader
                    label={t.colSchool}
                    activeKey={sortKey}
                    activeDir={sortDir}
                    sortKey="school"
                    onSort={toggleSort}
                  />
                  <SortHeader
                    label={t.colTeacher}
                    activeKey={sortKey}
                    activeDir={sortDir}
                    sortKey="teacher"
                    onSort={toggleSort}
                  />
                  <SortHeader
                    label={t.colGroup}
                    activeKey={sortKey}
                    activeDir={sortDir}
                    sortKey="group"
                    onSort={toggleSort}
                  />
                  <SortHeader
                    label={t.colLessons}
                    activeKey={sortKey}
                    activeDir={sortDir}
                    sortKey="lessons"
                    onSort={toggleSort}
                  />
                  <SortHeader
                    label={t.colScore}
                    activeKey={sortKey}
                    activeDir={sortDir}
                    sortKey="score"
                    onSort={toggleSort}
                  />
                  <th>{t.colQuestionnaires}</th>
                  <SortHeader
                    label={t.colActivity}
                    activeKey={sortKey}
                    activeDir={sortDir}
                    sortKey="last"
                    onSort={toggleSort}
                  />
                </tr>
              </thead>
              <tbody>
                {sorted.map((s) => {
                  const teacher = teachers.find((tt) => tt.id === s.teacherId);
                  const completedSet = new Set(
                    s.progress.map((p) => p.lessonSlug),
                  );
                  const scores = s.progress.flatMap((p) =>
                    p.score !== undefined ? [p.score] : [],
                  );
                  const av = scores.length
                    ? (
                        scores.reduce((a, b) => a + b, 0) / scores.length
                      ).toFixed(1)
                    : "—";
                  const last = lastActivity(s);
                  const pct = TOTAL_LESSONS
                    ? Math.min(100, (completedSet.size / TOTAL_LESSONS) * 100)
                    : 0;

                  return (
                    <tr
                      key={s.id}
                      className={selectedId === s.id ? "is-selected" : ""}
                      onClick={() => setSelectedId(s.id)}
                    >
                      <td className="r-cell-name">
                        {s.profile.childName || s.name}
                      </td>
                      <td className="r-cell-muted">
                        {teacher?.profile.organizationName || "—"}
                      </td>
                      <td className="r-cell-muted">{teacher?.name || "—"}</td>
                      <td>
                        <span
                          className={`researcher-group-pill researcher-group-pill--${s.group || "none"}`}
                        >
                          {s.group === "experimental"
                            ? t.expShort
                            : s.group === "control"
                              ? t.ctrlShort
                              : "—"}
                        </span>
                      </td>
                      <td>
                        <div className="r-cell-progress">
                          <div className="lms-progress-track">
                            <span style={{ width: `${pct}%` }} />
                          </div>
                          <small>{completedSet.size}</small>
                        </div>
                      </td>
                      <td>
                        <strong className="r-cell-score">{av}</strong>
                      </td>
                      <td>
                        <span
                          className={`researcher-anketa-dot${hasInitial(s.id) ? " researcher-anketa-dot--done" : ""}`}
                          title={t.initialTitle}
                        />
                        <span
                          className={`researcher-anketa-dot${hasFinal(s.id) ? " researcher-anketa-dot--done" : ""}`}
                          title={t.finalTitle}
                        />
                      </td>
                      <td className="r-cell-muted">{formatRelative(last ?? undefined, locale)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </article>

      {selected ? (
        <StudentDrawer
          student={selected}
          teacher={selectedTeacher}
          questionnaires={questionnaires}
          onClose={() => setSelectedId(null)}
          onGroupChange={(g) => void handleGroupChange(selected.id, g)}
          locale={locale}
        />
      ) : null}
    </section>
  );
}

function SortHeader({
  label,
  sortKey,
  activeKey,
  activeDir,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  activeKey: SortKey;
  activeDir: SortDir;
  onSort: (k: SortKey) => void;
}) {
  const active = activeKey === sortKey;
  return (
    <th
      className={`researcher-sort-th ${active ? "is-active" : ""}`}
      onClick={() => onSort(sortKey)}
    >
      <button type="button">
        {label}
        <i className={`researcher-sort-icon ${active ? activeDir : ""}`} />
      </button>
    </th>
  );
}

// ── TeachersSection ───────────────────────────────────────────────────────────

function TeachersSection({
  teachers,
  students,
  onUserAdded,
  locale,
}: {
  teachers: CurrentUser[];
  students: CurrentUser[];
  onUserAdded: () => void | Promise<void>;
  locale: Locale;
}) {
  const t = dict[locale];
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [childClass, setChildClass] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAddTeacher(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await createResearcherUser({
        role: "teacher",
        name,
        email,
        password,
        profile: {
          childName: "",
          childClass,
          teacherName: name,
          organizationName,
          supportNotes: "",
        },
      });
      setName("");
      setEmail("");
      setPassword("");
      setOrganizationName("");
      setChildClass("");
      setShowForm(false);
      await onUserAdded();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t.addTeacherError,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="lms-dashboard" aria-label={t.teachersAria}>
      <article className="lms-panel">
        <div className="lms-section-head">
          <div>
            <p className="lms-kicker">{t.educators}</p>
            <h2>{t.experimentTeachers}</h2>
          </div>
          <button
            type="button"
            className="button button-secondary small"
            onClick={() => setShowForm((v) => !v)}
          >
            {showForm ? t.hideForm : t.addTeacher}
          </button>
        </div>

        {showForm ? (
          <form className="researcher-add-form" onSubmit={handleAddTeacher}>
            <div className="researcher-add-grid">
              <div className="field">
                <label htmlFor="r-t-name">{t.name}</label>
                <input
                  id="r-t-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="r-t-email">{t.email}</label>
                <input
                  id="r-t-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="r-t-password">{t.password}</label>
                <input
                  id="r-t-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="r-t-org">{t.organization}</label>
                <input
                  id="r-t-org"
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder={t.organizationPlaceholder}
                />
              </div>
              <div className="field">
                <label htmlFor="r-t-class">{t.classLabel}</label>
                <input
                  id="r-t-class"
                  type="text"
                  value={childClass}
                  onChange={(e) => setChildClass(e.target.value)}
                  placeholder={t.classPlaceholder}
                />
              </div>
            </div>
            {error ? <p className="form-error">{error}</p> : null}
            <div className="researcher-add-actions">
              <button
                type="submit"
                className="button button-primary small"
                disabled={isSubmitting}
              >
                {isSubmitting ? t.creatingTeacher : t.createTeacher}
              </button>
              <button
                type="button"
                className="button button-ghost small"
                onClick={() => setShowForm(false)}
              >
                {t.cancel}
              </button>
            </div>
          </form>
        ) : null}

        {teachers.length === 0 ? (
          <p className="lms-note">
            {t.noTeachersYet}
          </p>
        ) : (
          <div className="researcher-teacher-grid">
            {teachers.map((teacher) => {
              const ts = students.filter((s) => s.teacherId === teacher.id);
              const exp = ts.filter((s) => s.group === "experimental").length;
              const ctrl = ts.filter((s) => s.group === "control").length;
              return (
                <div key={teacher.id} className="researcher-teacher-card">
                  <div className="researcher-teacher-head">
                    <div>
                      <strong>{teacher.name}</strong>
                      <span>
                        {teacher.profile.organizationName || t.schoolNotSet}
                      </span>
                    </div>
                    <span className="lms-chip">
                      {teacher.profile.childClass || t.classUnknown}
                    </span>
                  </div>
                  <div className="researcher-teacher-stats">
                    <div>
                      <strong>{ts.length}</strong>
                      <span>{t.studentsLower}</span>
                    </div>
                    <div className="researcher-teacher-stat--exp">
                      <strong>{exp}</strong>
                      <span>{t.expLower}</span>
                    </div>
                    <div className="researcher-teacher-stat--ctrl">
                      <strong>{ctrl}</strong>
                      <span>{t.ctrlLower}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </article>
    </section>
  );
}

// ── ExportSection ─────────────────────────────────────────────────────────────

function ExportSection({
  students,
  teachers,
  questionnaires,
  onExportExcel,
  locale,
}: {
  students: CurrentUser[];
  teachers: CurrentUser[];
  questionnaires: QuestionnaireSubmission[];
  onExportExcel: (rows: CurrentUser[]) => void;
  locale: Locale;
}) {
  const t = dict[locale];
  const [scope, setScope] = useState<"all" | "experimental" | "control">("all");

  const rows =
    scope === "all"
      ? students
      : students.filter((s) => s.group === scope);

  const tables = [
    {
      name: t.tableOverview,
      desc: t.tableOverviewDesc,
    },
    {
      name: t.tableStudents,
      desc: t.tableStudentsDesc,
    },
    {
      name: t.tableEvents,
      desc: t.tableEventsDesc,
    },
    {
      name: t.tableQuestionnaires,
      desc: t.tableQuestionnairesDesc(questionnaires.length),
    },
  ];

  return (
    <section className="lms-dashboard" aria-label={t.exportAria}>
      <div className="lms-grid-today">
        <div className="lms-main-column">
          <article className="lms-panel">
            <div className="lms-section-head">
              <div>
                <p className="lms-kicker">{t.extract}</p>
                <h2>{t.excelForSPSS}</h2>
              </div>
              <span className="lms-chip">{t.studentsWithCount(rows.length)}</span>
            </div>

            <p>
              {t.exportFileDescription}
            </p>

            <div className="researcher-scope-row">
              <p className="lms-kicker">{t.selection}</p>
              <div className="lms-filter-row">
                {(
                  [
                    { v: "all" as const, l: t.allWithCount(students.length) },
                    {
                      v: "experimental" as const,
                      l: t.expWithCount(students.filter((s) => s.group === "experimental").length),
                    },
                    {
                      v: "control" as const,
                      l: t.ctrlWithCount(students.filter((s) => s.group === "control").length),
                    },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.v}
                    type="button"
                    className={`lms-filter-chip ${scope === opt.v ? "active" : ""}`}
                    onClick={() => setScope(opt.v)}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="button button-primary full"
              onClick={() => onExportExcel(rows)}
              disabled={rows.length === 0}
            >
              <CabinetIcon name="download" /> {t.downloadExcelWithCount(rows.length)}
            </button>
          </article>

          <article className="lms-panel">
            <div className="lms-section-head">
              <div>
                <p className="lms-kicker">{t.fileStructure}</p>
                <h2>{t.whatsInside}</h2>
              </div>
            </div>

            <div className="researcher-tables-list">
              {tables.map((tbl, i) => (
                <div key={tbl.name} className="researcher-table-info">
                  <span className="researcher-table-num">{i + 1}</span>
                  <div>
                    <strong>{tbl.name}</strong>
                    <p>{tbl.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <aside className="lms-side-column">
          <article className="lms-panel">
            <div className="lms-section-head">
              <div>
                <p className="lms-kicker">{t.fiveCriteria}</p>
                <h2>{t.scaleLabel}</h2>
              </div>
            </div>
            <div className="researcher-criteria">
              {[
                t.criterion1,
                t.criterion2,
                t.criterion3,
                t.criterion4,
                t.criterion5,
              ].map((c, i) => (
                <div key={c} className="researcher-criterion">
                  <span>{i + 1}</span>
                  <p>{c}</p>
                </div>
              ))}
            </div>
            <p className="lms-note">
              {t.fromDissertation}
            </p>
          </article>

          <article className="lms-panel">
            <div className="lms-section-head">
              <div>
                <p className="lms-kicker">{t.summaryShort}</p>
                <h2>{t.ofThisExport}</h2>
              </div>
            </div>
            <div className="researcher-export-summary">
              <div>
                <span>{t.studentsLabel2}</span>
                <strong>{rows.length}</strong>
              </div>
              <div>
                <span>{t.teachersLabel}</span>
                <strong>{teachers.length}</strong>
              </div>
              <div>
                <span>{t.questionnairesLabel}</span>
                <strong>{questionnaires.length}</strong>
              </div>
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}

// ── ResearcherCabinet ─────────────────────────────────────────────────────────

export function ResearcherCabinet() {
  const { user } = useAuth();
  const locale = useLocale();
  const t = dict[locale];
  const [activeSection, setActiveSection] =
    useState<ResearcherSection>("dashboard");
  const [teachers, setTeachers] = useState<CurrentUser[]>([]);
  const [students, setStudents] = useState<CurrentUser[]>([]);
  const [questionnaires, setQuestionnaires] = useState<QuestionnaireSubmission[]>(
    [],
  );

  const loadData = useCallback(async () => {
    try {
      const data = await getResearcherData();
      setTeachers(data.teachers);
      setStudents(data.students);
      setQuestionnaires(data.questionnaires);
    } catch (error) {
      console.error(t.loadDataError, error);
      setTeachers([]);
      setStudents([]);
      setQuestionnaires([]);
    }
  }, [t.loadDataError]);

  useEffect(() => {
    const initialLoadId = window.setTimeout(() => {
      void loadData();
    }, 0);
    const pollId = window.setInterval(loadData, 5000);
    window.addEventListener(AUTH_CHANGE_EVENT, loadData);
    window.addEventListener("focus", loadData);
    return () => {
      window.clearTimeout(initialLoadId);
      window.clearInterval(pollId);
      window.removeEventListener(AUTH_CHANGE_EVENT, loadData);
      window.removeEventListener("focus", loadData);
    };
  }, [loadData]);

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace("#", "") as ResearcherSection;
      if (sectionOrder.includes(hash)) setActiveSection(hash);
      else setActiveSection("dashboard");
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const sectionConfig = getSectionConfig(locale);
  const activeConfig = sectionConfig[activeSection];

  const navigation = [
    {
      title: t.cabinetGroupTitle,
      items: sectionOrder.map((key) => ({
        href: `/dashboard#${key}`,
        label: sectionConfig[key].label,
        caption: sectionConfig[key].caption,
      })),
    },
  ];

  function handleNavigate(href: string) {
    const hash = href.split("#")[1] as ResearcherSection;
    if (sectionOrder.includes(hash)) setActiveSection(hash);
  }

  async function handleExportExcel(rows: CurrentUser[]) {
    try {
      await exportExcel(rows, t.excelDownloadError);
    } catch (error) {
      alert(error instanceof Error ? error.message : t.excelDownloadError);
    }
  }

  if (!user) return null;

  return (
    <CabinetShell
      title={activeConfig.title}
      description={activeConfig.description}
      activeHref={`/dashboard#${activeSection}`}
      layoutVariant="adult-sidebar"
      navigation={navigation}
      onNavigate={handleNavigate}
    >
      {activeSection === "dashboard" ? (
        <DashboardSection
          teachers={teachers}
          students={students}
          questionnaires={questionnaires}
          onExportExcel={() => void handleExportExcel(students)}
          onGoTo={(s) => {
            setActiveSection(s);
            if (typeof window !== "undefined") window.location.hash = s;
          }}
          locale={locale}
        />
      ) : null}
      {activeSection === "students" ? (
        <StudentsSection
          teachers={teachers}
          students={students}
          questionnaires={questionnaires}
          onChange={loadData}
          locale={locale}
        />
      ) : null}
      {activeSection === "teachers" ? (
        <TeachersSection
          teachers={teachers}
          students={students}
          onUserAdded={loadData}
          locale={locale}
        />
      ) : null}
      {activeSection === "export" ? (
        <ExportSection
          students={students}
          teachers={teachers}
          questionnaires={questionnaires}
          onExportExcel={(rows) => void handleExportExcel(rows)}
          locale={locale}
        />
      ) : null}
    </CabinetShell>
  );
}
