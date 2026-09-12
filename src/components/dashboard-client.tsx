"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { CabinetShell } from "@/components/cabinet-shell";
import { LessonExperience } from "@/components/lesson-experience";
import { LessonMaterial } from "@/components/lesson-material";
import { useLocale } from "@/components/locale-provider";
import type { AccessibilityProfile } from "@/lib/adaptation/adaptation-types";
import { CabinetIcon, SocialIcon, UiIcon } from "@/components/ui-icons";
import {
  type ClassState,
  AUTH_CHANGE_EVENT,
  CLASS_STATE_EVENT,
  getClassState,
  openLessonForClass,
  closeLessonForClass,
  getStudentsByTeacher,
  addStudentToClass,
  submitQuestionnaire,
  getQuestionnaire,
  type CurrentUser,
  type StudentGroup,
  type QuestionnaireAnswer,
  type QuestionnaireType,
} from "@/lib/auth-storage";
import type { ProgramLesson } from "@/data/program";
import { questionnaireQuestions } from "@/data/questionnaires";

type UserRole = "student" | "parent" | "teacher" | "researcher";

type DashboardSectionKey =
  | "today"
  | "lessons"
  | "progress"
  | "account"
  | "family"
  | "teacher";

type DashboardUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  progress: {
    lessonSlug: string;
    completedAt: string;
    score?: number;
  }[];
  profile: {
    childName: string;
    childClass: string;
    teacherName: string;
    organizationName: string;
    supportNotes: string;
    accessibilityProfile?: AccessibilityProfile;
  };
  teacherId?: string;
  accessibilityProfile?: AccessibilityProfile;
};

type DashboardModuleSummary = {
  slug: string;
  title: string;
  total: number;
  lessons: { slug: string; title: string }[];
};

type DashboardClientProps = {
  demoUser: DashboardUser;
  lessons: ProgramLesson[];
  modules: DashboardModuleSummary[];
  roleLabels: Record<UserRole, string>;
};

type ModuleProgress = DashboardModuleSummary & {
  done: number;
  progress: number;
  nextLesson?: ProgramLesson;
};

type DashboardSectionConfig = {
  key: DashboardSectionKey;
  label: string;
  caption: string;
  title: string;
  description: string;
};

type DashboardHashState = {
  section: DashboardSectionKey;
  lessonSlug?: string;
};

// ── i18n dictionary ──────────────────────────────────────────────────────────

const englishDashboardDict = {
    // section catalog (default)
    sec_today_label: "Today",
    sec_today_caption: "lesson and activities",
    sec_today_title: "Today",
    sec_today_desc: "Work summary for the day: next lesson, upcoming activities, short progress and last activity.",
    sec_lessons_label: "Lessons",
    sec_lessons_caption: "modules and classes",
    sec_lessons_title: "Lessons",
    sec_lessons_desc: "All modules and lessons open inside the office, without a separate course screen.",
    sec_progress_label: "Progress",
    sec_progress_caption: "training history",
    sec_progress_title: "Progress",
    sec_progress_desc: "History of progress by modules, lessons completed and results without mixing with the profile.",
    sec_account_label: "Account",
    sec_account_caption: "profile and login",
    sec_account_title: "Account",
    sec_account_desc: "Login data, child profile and basic educational support settings in one section.",
    sec_family_label: "Family",
    sec_family_caption: "home rhythm",
    sec_family_title: "Family",
    sec_family_desc: "Home support circuit: adult, rhythm of classes and clear actions after the lesson.",
    sec_teacher_label: "Teacher",
    sec_teacher_caption: "observations",
    sec_teacher_title: "Teacher",
    sec_teacher_desc: "Pedagogical zone with pacing observations, immediate focus and link to lessons.",

    // parent overrides
    parent_today_label: "My child",
    parent_today_caption: "learning & progress",
    parent_today_title: "How your child is doing",
    parent_today_desc: "Keep track of learning progress, current lessons and support at home.",
    parent_family_label: "Questionnaires",
    parent_family_caption: "surveys & support",
    parent_family_title: "Parent questionnaires",
    parent_family_desc: "Complete or review the current questionnaire.",
    parent_account_label: "Profile",
    parent_account_caption: "family contacts",
    parent_account_title: "Family profile",
    parent_account_desc: "Contacts and details of the child.",

    // student overrides
    student_today_label: "Start",
    student_today_caption: "what to do now",
    student_today_title: "My lesson",
    student_today_desc: "A simple student office: large actions, short tips and only the necessary educational sections.",
    student_lessons_label: "Lessons",
    student_lessons_caption: "choose an activity",
    student_lessons_title: "My lessons",
    student_lessons_desc: "One module and one lesson at a time. Nothing extra around the learning activity.",
    student_progress_label: "Good luck",
    student_progress_caption: "what has already been done",
    student_progress_title: "My successes",
    student_progress_desc: "A short history of classes and clear progress without unnecessary tables.",
    student_account_label: "Help",
    student_account_caption: "adult nearby",
    student_account_title: "Help and profile",
    student_account_desc: "Who helps, what class and what tips are needed in the lesson.",

    // teacher overrides
    teacher_today_label: "Home",
    teacher_today_caption: "lesson and students",
    teacher_today_title: "Home",
    teacher_today_desc: "Lesson management and class on one screen: open a lesson, see who is working how, add a student.",
    teacher_lessons_label: "Program",
    teacher_lessons_caption: "14 lessons, 5 modules",
    teacher_lessons_title: "Course program",
    teacher_lessons_desc: "All lessons of the program: open for the class, see the plan or take it yourself.",
    teacher_progress_label: "Dynamics",
    teacher_progress_caption: "class results",
    teacher_progress_title: "Dynamics of learning",
    teacher_progress_desc: "Module progress, lesson log and focus points for the next lesson.",
    teacher_account_label: "Profile",
    teacher_account_caption: "teacher data",
    teacher_account_title: "Teacher profile",
    teacher_account_desc: "Login details, school and class. Here are the research mode settings.",

    // formatDate / activity feed
    notYet: "Not yet",
    locale: "ru-RU",
    activity_start_label: "Start",
    activity_start_title: "The classroom is ready for the first lesson",
    activity_start_text: "Open the next step and start with a short lesson.",
    activity_lessons_label: "Lessons",
    activity_lessons_title: "Modules are available in the \"Lessons\" section",
    activity_lessons_text: "You can choose a module and go through the lesson at a relaxed pace.",
    lessonCompletedFallback: "Lesson completed",
    scoreResult: (n: number) => `Check result:${n}from 3.`,
    lessonMarkedDone: "The lesson is marked as completed.",
    moduleCompleted: "Module completed",

    // student today
    aria_student_start: "Student start",
    hello_ready: (name: string) => `Hello,${name}! Today there is one main step: click “Get Started”.`,
    hello_waiting: (name: string) => `Hello,${name}! Now just wait. The teacher will open the lesson.`,
    hello_greeting: (name: string) => `Hello,${name}!`,
    today_have_lesson: "Today you have a lesson:",
    next_lesson_fallback: "Next lesson",
    btn_start: "Begin",
    lesson_of: (n: number, total: number) => `Lesson${n}from${total}`,
    wait_teacher_title: "Wait for the teacher",
    wait_teacher_text: "The teacher will open the lesson soon.",
    stars_aria: (done: number, total: number) => `${done}from${total}lessons completed`,

    // helpers
    not_logged_in: "haven't entered yet",
    today_at: (t: string) => `today at${t}`,
    days_ago: (n: number) => `${n}days back`,
    long_ago: "haven't been for a long time",
    code_eyebrow: (cls: string) => `Class${cls}`,
    code_hint: "Enter this code to access your student dashboard.",
    print_codes_title: (n: number) => `Student entry codes ·${n}pcs.`,

    // teacher lessons section
    download_failed: "Failed to download lesson plan.",
    trainer_phone: "Call",
    aria_lessons: "Lessons",
    program_title: "Course program",
    program_subtitle: "14 lessons in 5 modules. Share the lesson with your class, download the plan, or take it yourself.",
    lessons_count_short: (n: number) => `${n}lessons`,
    trainer_label: (name: string) => `Trainer:${name}`,
    live_now: "coming now",
    btn_close: "Close",
    btn_open_for_class: "Open to class",
    other_actions: "Other actions",
    downloading: "Download...",
    lesson_plan_docx: "Lesson plan .docx",
    try_yourself: "Go through it yourself",

    // teacher today / class
    aria_teacher_home: "Home teacher",
    lesson_in_progress: "The lesson is going on now",
    next_lesson_label: "Next lesson",
    course_done: "Course completed",
    opened_at: (t: string) => `Open at${t}. Students can log in using their code.`,
    passed: "Passed:",
    in_work: "At work:",
    not_started_p: "Haven't started:",
    lesson_plan_label: "Lesson plan:",
    close_lesson: "Close lesson",
    open_lesson_for_class: "Open lesson for class",
    full_program: "Entire program →",
    school_default: "School",
    class_short: (c: string) => `Class${c}`,
    students_count: (n: number) => `${n}students`,
    print_codes: "Print codes",
    hide_form: "Hide form",
    add_student: "Add a student",
    new_student: "New student",
    student_name_label: "Student name",
    student_name_placeholder: "For example, Alina K.",
    research_group: "Research group",
    group_experimental: "Experimental",
    group_control: "Test",
    enter_student_name: "Enter student name",
    adding: "I'm adding...",
    btn_create: "Create",
    btn_cancel: "Cancel",
    err_default: "Error",
    err_add_default: "Error while adding.",
    no_codes_yet: "Students do not have entry codes yet.",
    print_codes_for_class: (c: string) => `Entry codes · class${c}`,
    all_students: "All students",
    on_lesson_prefix: (t: string) => `In class:${t}`,
    class_word: "Class",
    of_count: (a: number, b: number) => `${a}from${b}`,
    no_students_yet: "There are no students yet. Click \"Add Student\" at the top to create your first one.",
    no_students_in_group: "There are no students in this group yet.",
    no_students_short: "There are no students yet. Click \"Add Student\" at the top.",
    code_word: "The code",
    lesson_word: "Lesson",
    of_word: "from",
    passed_short: "Passed",
    in_work_short: "In progress",
    not_started_short: "Didn't start",
    today_word: "Today",
    recently: "Recently",
    dash: "—",
    group_exp_short: "Exp.",
    group_ctrl_short: "Counter.",

    // parent today
    your_child: "Your child",
    aria_parent: "Parent's office",
    fill_final_questionnaire: "Fill out the exit form",
    final_questionnaire_hint: "The final questionnaire is the last step of participation in the study.",
    fill: "Fill in",
    now_in_class: "Now in session",
    parent_lesson_open_text: (name: string) => `The teacher opened this lesson — ${name} can join and participate now.`,
    view_lesson: "View lesson",
    lesson_not_open_yet: "Nothing is open yet",
    parent_lesson_closed_text: () => "When the teacher starts the lesson, it will appear here.",
    progress_by_topics: "Progress by topic",
    today_section: "Today",
    earlier: "Previously",
    parent_feed_no_marks: (lessonTitle: string, name: string, fem: string) =>
      `Lesson "${lessonTitle}» is open. Bye${name}didn't mark anything${fem}in the office.`,
    parent_feed_idle: "The teacher has not opened the lesson yet - we are waiting for the lesson to start.",
    feed_child_passed: (name: string, fem: string, lesson: string) =>
      `${name}passed${fem}lesson "${lesson}»`,
    feed_lesson_done: "The lesson is over",
    feed_teacher_opened: (t: string) => `The teacher opened the lesson "${t}»`,

    // today section (generic)
    aria_today: "Today",
    class_kicker: "Class",
    open_lesson_now: (t: string) => `Open:${t}`,
    lesson_not_open_class: "Lesson is not open to class",
    students_can_join_now: "Students can log in and start class right away.",
    press_open_to_let_join: "Click \"Open Lesson\" for students to log in.",
    home_rhythm_kicker: "Home rhythm",
    home_rhythm_title: "10-15 minutes of quiet exercise",
    home_rhythm_text: "It is better to complete one lesson without parallel tabs and unnecessary tasks.",
    next_step: "Next step",
    choose_first_lesson: "Select first lesson",
    lessons_ready: "Lessons are ready to start.",
    module_word: "Module",
    lessons_section: "Lessons section",
    continue_with: (t: string) => `Continue:${t}.`,
    pick_next_module: "Review the modules and select the next unit of study.",
    lesson_control_kicker: "Lesson management",
    lesson_not_open: "Lesson is not open",
    state_open: "Open",
    state_closed: "Closed",
    opened_at_short: (t: string) => `Open at${t}. Students can log in and get started.`,
    close_lesson_for_class: "Close lesson for class",
    students_see_lock: "The students see the castle and cannot start the lesson. Open the lesson so they can log in.",
    open_for_class_with: (t: string) => `Open for class:${t}`,
    start_learning: "Start training",
    start_word: "start",
    open_lessons_and_start: "Open the lessons section and start the first lesson.",
    one_screen_one_action: "one screen = one action",
    upcoming_actions: "Upcoming actions",
    what_to_do_today: "What to do today",
    short_progress: "Brief progress",
    pct_of_course: (n: number) => `${n}% rate`,
    recent_activity: "Recent Activity",
    latest_events: "Latest events",

    // teacher class section
    aria_teacher_class: "Classroom management",
    students_list: "List of students",
    student_word: "Student",
    group_word: "Group",
    progress_word: "Progress",
    status_word: "Status",
    online: "Online",
    offline: "Offline",
    how_codes_work: "How to use entry codes",
    codes_step1: "Each student receives a unique 4-digit code when added.",
    codes_step2: "Print out the codes and hand them out before class.",
    codes_step3: "The student enters the code on the login screen—no password is needed.",
    codes_step4: "The code does not change - you can write it down in your diary.",

    // lessons section
    aria_lesson_material: "Lesson material",
    aria_lesson_trainer: "Training simulator",
    back: "Back",
    to_lesson_list: "To the list of lessons",
    aria_student_lessons: "Lessons",
    student_lessons_wait: "The teacher will open the required lesson. You will see it on the main screen.",
    aria_modules: "Modules",
    modules_kicker: "Modules",
    modules_title: "Course Sections",
    course_word: "Well",
    lesson_n: (n: number) => `Lesson${n}`,
    completed_short: "passed",
    chosen: "Selected",
    show: "Show",
    lesson_card_kicker: "Lesson Card",
    pick_lesson: "Choose a lesson",
    open_one_module: "Open one module and select a lesson.",
    view_material: "View material",
    lessons_short_count: (n: number) => `${n}lessons`,

    // account section
    aria_account: "Account",
    label_name: "Name",
    label_email: "Email",
    label_mode: "Mode",
    label_class: "Class",
    label_teacher: "Teacher",
    label_org: "Organization",
    label_group: "Group",
    label_role: "Role",
    label_student: "Student",
    account_data_kicker: "Account details",
    supports_kicker: "Supports",
    student_supports_title: "What helps you study",
    adult_supports_title: "Escort Settings",
    student_support_1: "Read only one short block at a time.",
    student_support_2: "If it is not clear, press help and ask an adult to explain the step.",
    student_support_3: "After the lesson, you can stop, even if there are other topics left.",
    teacher_support_1: "Leave a short observation after each lesson.",
    teacher_support_2: "Compare the student's pace with the previous lesson, not with the entire group.",
    teacher_support_3: "Giving families one home replay instead of a long list.",
    parent_support_1: "Short instructions before each action.",
    parent_support_2: "One question on the screen without visual overload.",
    parent_support_3: "Pause after the answer so that the child has time to say the decision.",
    quick_jump: "Quick Jump",
    next_lesson_short: "Upcoming lesson",
    lesson_will_be_chosen: "The lesson will be selected from the lessons section.",
    open_lessons_tab: "Click the Lessons tab to access the lesson.",

    // questionnaire
    save_questionnaire_failed: "Failed to save profile.",
    questionnaire_saved: "The questionnaire has been saved. Thank you!",
    close_word: "Close",
    saving: "I'm saving...",
    submit_questionnaire: "Send a form",
    research_kicker: "Study",
    parent_questionnaires: "Parent questionnaires",
    filled_a: "Filled",
    fill_before_start: "Complete before class starts.",
    need_fill: "Needs to be filled out",
    initial_questionnaire: "Entry form",
    final_questionnaire: "Exit form",
    filled_on: (date: string) => `Filled${date}`,
    all_lessons_done_fill_final: "All lessons completed - fill out the final form",
    opens_after: (total: number, current: number) => `Will open after${total}lessons (now${current})`,
    closed_yet: "Closed for now",

    // family section
    aria_family: "Questionnaires and help at home",
    label_adult: "Adult",
    label_post: "Post office",
    label_child: "Child",
    home_rhythm_step_1: "Before the lesson, agree on a short time: 10-15 minutes.",
    home_rhythm_step_2: "After the lesson, ask what was most clear and what to repeat.",
    home_rhythm_step_3: "If the child is tired, stop at the current step and return later.",
    home_rhythm_caption: "How to keep studying at home",
    step_n: (n: number) => `Step${n}`,
    family_profile_kicker: "Family profile",
    contacts_context: "Contacts and context",
    note_kicker: "Note",
    individual_support: "Individual support",

    // progress section
    aria_progress: "Progress",
    history_kicker: "History of progress",
    course_dynamics: "Dynamics by exchange rate",
    modules_word: "Modules",
    next_short: (t: string) => `Next:${t}`,
    journal: "Magazine",

    // shell
    cabinet: "Cabinet",

    // console errors
    err_open_lesson: "Failed to open lesson",
    err_close_lesson: "Failed to close lesson",
    err_download_plan: "Failed to download lesson plan",
};

const dict = {
  ru: englishDashboardDict,
  uz: englishDashboardDict,
} as const;

type Dict = (typeof dict)["ru"];

function buildSectionCatalog(t: Dict): Record<DashboardSectionKey, DashboardSectionConfig> {
  return {
    today: { key: "today", label: t.sec_today_label, caption: t.sec_today_caption, title: t.sec_today_title, description: t.sec_today_desc },
    lessons: { key: "lessons", label: t.sec_lessons_label, caption: t.sec_lessons_caption, title: t.sec_lessons_title, description: t.sec_lessons_desc },
    progress: { key: "progress", label: t.sec_progress_label, caption: t.sec_progress_caption, title: t.sec_progress_title, description: t.sec_progress_desc },
    account: { key: "account", label: t.sec_account_label, caption: t.sec_account_caption, title: t.sec_account_title, description: t.sec_account_desc },
    family: { key: "family", label: t.sec_family_label, caption: t.sec_family_caption, title: t.sec_family_title, description: t.sec_family_desc },
    teacher: { key: "teacher", label: t.sec_teacher_label, caption: t.sec_teacher_caption, title: t.sec_teacher_title, description: t.sec_teacher_desc },
  };
}

function buildRoleOverrides(
  t: Dict,
): Record<UserRole, Partial<Record<DashboardSectionKey, Partial<DashboardSectionConfig>>>> {
  return {
    parent: {
      today: { label: t.parent_today_label, caption: t.parent_today_caption, title: t.parent_today_title, description: t.parent_today_desc },
      family: { label: t.parent_family_label, caption: t.parent_family_caption, title: t.parent_family_title, description: t.parent_family_desc },
      account: { label: t.parent_account_label, caption: t.parent_account_caption, title: t.parent_account_title, description: t.parent_account_desc },
    },
    researcher: {},
    student: {
      today: { label: t.student_today_label, caption: t.student_today_caption, title: t.student_today_title, description: t.student_today_desc },
      lessons: { label: t.student_lessons_label, caption: t.student_lessons_caption, title: t.student_lessons_title, description: t.student_lessons_desc },
      progress: { label: t.student_progress_label, caption: t.student_progress_caption, title: t.student_progress_title, description: t.student_progress_desc },
      account: { label: t.student_account_label, caption: t.student_account_caption, title: t.student_account_title, description: t.student_account_desc },
    },
    teacher: {
      today: { label: t.teacher_today_label, caption: t.teacher_today_caption, title: t.teacher_today_title, description: t.teacher_today_desc },
      lessons: { label: t.teacher_lessons_label, caption: t.teacher_lessons_caption, title: t.teacher_lessons_title, description: t.teacher_lessons_desc },
      progress: { label: t.teacher_progress_label, caption: t.teacher_progress_caption, title: t.teacher_progress_title, description: t.teacher_progress_desc },
      account: { label: t.teacher_account_label, caption: t.teacher_account_caption, title: t.teacher_account_title, description: t.teacher_account_desc },
    },
  };
}

const sectionLookup = new Set<DashboardSectionKey>([
  "today", "lessons", "progress", "account", "family", "teacher",
]);

const roleSectionOrder: Record<UserRole, DashboardSectionKey[]> = {
  parent: ["today", "family", "account"],
  // UI Logic
  student: ["today", "lessons"],
  teacher: ["today", "lessons", "progress", "account"],
  researcher: ["today", "lessons", "progress", "account"],
};

function getDashboardSections(role: UserRole, t: Dict) {
  const catalog = buildSectionCatalog(t);
  const overrides = buildRoleOverrides(t);
  return roleSectionOrder[role].map((key) => ({
    ...catalog[key],
    ...overrides[role][key],
  }));
}

function parseDashboardHash(hash: string): DashboardHashState | null {
  const key = hash.replace("#", "");

  if (key.startsWith("lesson:")) {
    const lessonSlug = key.slice("lesson:".length).trim();
    return lessonSlug ? { section: "lessons", lessonSlug } : null;
  }

  if (key === "program") return { section: "lessons" };
  if (key === "student") return { section: "account" };

  return sectionLookup.has(key as DashboardSectionKey)
    ? { section: key as DashboardSectionKey }
    : null;
}

function buildDashboardHash(section: DashboardSectionKey, lessonSlug?: string) {
  return lessonSlug ? `#lesson:${lessonSlug}` : `#${section}`;
}

function resolveDashboardHash(
  hash: string,
  availableSectionKeys: Set<DashboardSectionKey>,
  fallbackSection: DashboardSectionKey,
  lessons: ProgramLesson[],
): DashboardHashState {
  const parsedState = parseDashboardHash(hash);

  if (parsedState?.lessonSlug) {
    const lessonExists = lessons.some((lesson) => lesson.slug === parsedState.lessonSlug);
    return lessonExists
      ? { section: "lessons", lessonSlug: parsedState.lessonSlug }
      : { section: "lessons" };
  }

  if (parsedState && availableSectionKeys.has(parsedState.section)) {
    return { section: parsedState.section };
  }

  return { section: fallbackSection };
}

function formatDate(value: string | undefined, t: Dict) {
  if (!value) return t.notYet;
  return new Intl.DateTimeFormat(t.locale, { day: "2-digit", month: "long" }).format(new Date(value));
}

function getCompletedLessonSlugs(user: DashboardUser) {
  return new Set(user.progress.map((entry) => entry.lessonSlug));
}

function getNextLesson(lessons: ProgramLesson[], completedLessonSlugs: Set<string>) {
  return lessons.find((lesson) => !completedLessonSlugs.has(lesson.slug)) ?? lessons[0];
}

function buildModuleProgress(
  modules: DashboardModuleSummary[],
  lessons: ProgramLesson[],
  completedLessonSlugs: Set<string>,
): ModuleProgress[] {
  return modules.map((module) => {
    const done = module.lessons.filter((lesson) => completedLessonSlugs.has(lesson.slug)).length;
    const nextLessonSlug =
      module.lessons.find((lesson) => !completedLessonSlugs.has(lesson.slug))?.slug
      ?? module.lessons[0]?.slug;

    return {
      ...module,
      done,
      progress: module.total ? Math.round((done / module.total) * 100) : 0,
      nextLesson: lessons.find((lesson) => lesson.slug === nextLessonSlug),
    };
  });
}

function buildActivityFeed(user: DashboardUser, lessons: ProgramLesson[], t: Dict) {
  const recentProgress = user.progress.slice(-4).reverse();

  if (!recentProgress.length) {
    return [
      { label: t.activity_start_label, title: t.activity_start_title, text: t.activity_start_text },
      { label: t.activity_lessons_label, title: t.activity_lessons_title, text: t.activity_lessons_text },
    ];
  }

  return recentProgress.map((entry) => {
    const lesson = lessons.find((item) => item.slug === entry.lessonSlug);
    return {
      label: formatDate(entry.completedAt, t),
      title: lesson?.title ?? t.lessonCompletedFallback,
      text: entry.score !== undefined
        ? t.scoreResult(entry.score)
        : t.lessonMarkedDone,
    };
  });
}

function buildProgressAreas(modules: ModuleProgress[], t: Dict) {
  return modules.map((module) => ({
    title: module.title,
    progress: module.progress,
    value: `${module.done}/${module.total}`,
    next: module.nextLesson?.title ?? t.moduleCompleted,
  }));
}

// ── Student preference chips helper ──────────────────────────────────────────

type PreferenceChip = {
  id: string;
  label: string;
  tone: "peach" | "mint" | "pink" | "cream" | "lavender";
};

function getStudentPreferenceChips(profile?: AccessibilityProfile): PreferenceChip[] {
  if (!profile) return [];
  const chips: PreferenceChip[] = [];
  const { supportType, preferences } = profile;

  if (supportType === "reading") {
    chips.push({ id: "support-type", label: "Reading support", tone: "peach" });
  } else if (supportType === "visual") {
    chips.push({ id: "support-type", label: "Visual support", tone: "mint" });
  } else if (supportType === "hearing") {
    chips.push({ id: "support-type", label: "Hearing support", tone: "pink" });
  }

  if (preferences) {
    if (preferences.autoSpeak) {
      chips.push({
        id: "autospeak",
        label: supportType === "visual" ? "Audio-first" : "Read aloud",
        tone: supportType === "visual" ? "mint" : "peach",
      });
    }
    if (preferences.imageDescriptions) {
      chips.push({ id: "images", label: "Image descriptions", tone: "mint" });
    }
    if (preferences.captions) {
      chips.push({ id: "captions", label: "Captions", tone: "pink" });
      chips.push({ id: "cues", label: "Visual cues", tone: "pink" });
    }
    if (preferences.largerText) {
      chips.push({ id: "larger-text", label: "Larger text", tone: "cream" });
    }
    if (preferences.simplifiedLanguage && supportType !== "reading") {
      chips.push({ id: "simpler-text", label: "Simpler text", tone: "peach" });
    }
    if (preferences.increasedSpacing) {
      chips.push({ id: "spacing", label: "Increased spacing", tone: "cream" });
    }
    if (preferences.reducedMotion) {
      chips.push({ id: "motion", label: "Reduced motion", tone: "lavender" });
    }
  }

  return chips;
}

// ── StudentTodaySection ──────────────────────────────────────────────────────

function StudentTodaySection({
  user,
  nextLesson,
  openLesson,
  overallProgress,
  completedLessons,
  lessonCount,
  activityFeed,
  lessons,
  onStartLesson,
  onOpenProgress,
  onOpenHelp,
  t,
}: {
  user: DashboardUser;
  nextLesson?: ProgramLesson;
  openLesson: ClassState | null;
  overallProgress: number;
  completedLessons: number;
  lessonCount: number;
  activityFeed: ReturnType<typeof buildActivityFeed>;
  lessons: ProgramLesson[];
  onStartLesson: () => void;
  onOpenProgress: () => void;
  onOpenHelp: () => void;
  t: Dict;
}) {
  const isLessonOpen = openLesson?.openLessonSlug != null;
  void activityFeed;
  void overallProgress;
  void onOpenProgress;

  const openedSlug = openLesson?.openLessonSlug;
  const openedLesson = openedSlug ? lessons.find((l) => l.slug === openedSlug) : undefined;
  const heroLesson = openedLesson ?? nextLesson;
  const lessonNumber = completedLessons + 1;
  const studentName = user.profile?.childName || user.name;
  const firstName = studentName.trim().split(/\s+/)[0] || studentName;

  const studentProfile = user.accessibilityProfile ?? user.profile?.accessibilityProfile;
  const preferenceChips = getStudentPreferenceChips(studentProfile);

  return (
    <section className="mosaic-student-dashboard" aria-label={t.aria_student_start}>
      {/* Top calm greeting */}
      <div className="mosaic-student-header">
        <h1 className="mosaic-student-greeting">Good to see you, {firstName}.</h1>
        <p className="mosaic-student-greeting-sub">
          {isLessonOpen
            ? "Your lesson is open and ready. Click below to begin."
            : "Your next lesson will appear here when your teacher opens it."}
        </p>
      </div>

      {/* Prominent centered card */}
      <div className={`mosaic-student-card${isLessonOpen ? " mosaic-student-card--active" : " mosaic-student-card--waiting"}`}>
        <div className="mosaic-card-eyebrow">TODAY&apos;S LEARNING</div>

        {isLessonOpen ? (
          <>
            <div className="mosaic-status-pill mosaic-status-pill--active">
              <span className="mosaic-status-dot mosaic-status-dot--live" aria-hidden="true" />
              <span>Lesson open now</span>
            </div>

            <h2 className="mosaic-card-title">{heroLesson?.title ?? t.next_lesson_fallback}</h2>

            <p className="mosaic-card-desc">
              {heroLesson?.summary ??
                "Your personalized learning experience is ready. Once you start, the lesson will adapt to your preferences automatically."}
            </p>

            <div className="mosaic-card-actions">
              <button
                type="button"
                className="mosaic-btn-start-lesson"
                onClick={onStartLesson}
              >
                <span>{t.btn_start}</span>
                <span className="mosaic-btn-arrow" aria-hidden="true">→</span>
              </button>
            </div>

            <p className="mosaic-card-footnote">
              {t.lesson_of(lessonNumber, lessonCount)} · {heroLesson?.duration ?? "15 min"}
            </p>
          </>
        ) : (
          <>
            <h2 className="mosaic-card-title">Waiting for your teacher</h2>

            <p className="mosaic-card-desc">
              Your personalized learning experience is ready. Once your teacher opens the
              lesson, Mosaic will adapt it to your learning preferences automatically.
            </p>

            <div className="mosaic-status-pill mosaic-status-pill--waiting">
              <span className="mosaic-status-dot mosaic-status-dot--pulse" aria-hidden="true" />
              <span>Waiting for lesson</span>
            </div>
          </>
        )}
      </div>

      {/* Personalization preview section */}
      <section className="mosaic-student-prefs-section" aria-label="Your learning preferences">
        <div className="mosaic-prefs-header">
          <h3 className="mosaic-prefs-heading">Your learning preferences</h3>
        </div>

        {preferenceChips.length > 0 ? (
          <div className="mosaic-pref-chips-container">
            <div className="mosaic-pref-chips-list">
              {preferenceChips.map((chip) => (
                <span
                  key={chip.id}
                  className={`mosaic-pref-chip mosaic-pref-chip--${chip.tone}`}
                >
                  {chip.label}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="mosaic-pref-edit-btn"
              onClick={onOpenHelp}
            >
              Adjust in profile
            </button>
          </div>
        ) : (
          <div className="mosaic-pref-empty-box">
            <p className="mosaic-pref-empty-text">
              Set up your reading, visual, or hearing preferences so every lesson is adapted for you.
            </p>
            <button
              type="button"
              className="mosaic-pref-setup-btn"
              onClick={onOpenHelp}
            >
              Set up your learning preferences →
            </button>
          </div>
        )}
      </section>

      {/* Progress completion indicator */}
      <div
        className="mosaic-student-stars"
        aria-label={t.stars_aria(completedLessons, lessonCount)}
      >
        <span className="mosaic-stars-label">
          {completedLessons} of {lessonCount} lessons completed
        </span>
        <div className="mosaic-stars-pips">
          {Array.from({ length: lessonCount }, (_, i) => {
            const isDone = i < completedLessons;
            return (
              <span
                key={i}
                className={`mosaic-star-pip${isDone ? " mosaic-star-pip--done" : ""}`}
                title={`Lesson ${i + 1}${isDone ? " (completed)" : ""}`}
                aria-hidden="true"
              >
                <CabinetIcon name={isDone ? "check" : "circle"} />
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Helpers shared by teacher/parent sections ────────────────────────────────

function getStudentInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
}

function isToday(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear()
    && d.getMonth() === now.getMonth()
    && d.getDate() === now.getDate()
  );
}

function formatTime(iso: string | undefined, t: Dict) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat(t.locale, { hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

function getLastActivity(student: CurrentUser): string | undefined {
  if (!student.progress.length) return undefined;
  return student.progress.reduce((latest, entry) =>
    entry.completedAt > latest ? entry.completedAt : latest,
  student.progress[0].completedAt);
}

function getStudentPresence(student: CurrentUser, t: Dict): {
  state: "today" | "recent" | "never";
  label: string;
} {
  const last = getLastActivity(student);
  if (!last) return { state: "never", label: t.not_logged_in };
  if (isToday(last)) return { state: "today", label: t.today_at(formatTime(last, t)) };
  const d = new Date(last);
  const diffDays = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  if (diffDays <= 7) return { state: "recent", label: t.days_ago(diffDays) };
  return { state: "recent", label: t.long_ago };
}

function getLessonProgressState(
  student: CurrentUser,
  lessonSlug: string,
): "done" | "in-progress" | "idle" {
  const completed = student.progress.some((p) => p.lessonSlug === lessonSlug);
  if (completed) return "done";
  const last = getLastActivity(student);
  if (last && isToday(last)) return "in-progress";
  return "idle";
}

function openPrintWindow(html: string, title: string, locale: string) {
  if (typeof window === "undefined") return;
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(`<!doctype html><html lang="${locale}"><head><meta charset="utf-8" /><title>${title}</title></head><body>${html}</body></html>`);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 250);
}

function buildStudentCodesHtml(
  rows: { name: string; code: string; group?: string }[],
  teacherClass: string,
  t: Dict,
) {
  const cards = rows.map((r) => `
    <article class="card">
      <span class="card-eyebrow">${t.code_eyebrow(teacherClass || "")}</span>
      <h2 class="card-name">${r.name}</h2>
      <div class="card-code">${r.code}</div>
      <p class="card-hint">${t.code_hint}</p>
      <footer class="card-foot">
        <span>mosaic-learning.org</span>
        ${r.group ? `<span class="card-group">${r.group}</span>` : ""}
      </footer>
    </article>
  `).join("");

  return `
    <style>
      @page { size: A4; margin: 14mm; }
      * { box-sizing: border-box; }
      body { font-family: -apple-system, "Segoe UI", Roboto, sans-serif; color: #0f172a; margin: 0; }
      h1 { font-size: 18px; margin: 0 0 14px; font-weight: 800; }
      .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12mm 10mm; }
      .card {
        border: 2px dashed #cbd5e1;
        border-radius: 16px;
        padding: 16px 20px 20px;
        page-break-inside: avoid;
        min-height: 110mm;
        display: flex;
        flex-direction: column;
      }
      .card-eyebrow {
        font-size: 11px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #64748b;
      }
      .card-name { font-size: 22px; margin: 6px 0 0; font-weight: 800; line-height: 1.15; }
      .card-code {
        margin: 18px 0;
        font-size: 64px;
        font-weight: 900;
        letter-spacing: 0.16em;
        color: #1e293b;
        font-family: "SF Mono", Menlo, ui-monospace, monospace;
        text-align: center;
        padding: 16px 0;
        border-top: 1px solid #e2e8f0;
        border-bottom: 1px solid #e2e8f0;
      }
      .card-hint { color: #475569; font-size: 13px; line-height: 1.4; margin: 0; }
      .card-foot {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 14px;
        font-size: 11px;
        color: #94a3b8;
        font-weight: 700;
      }
      .card-group {
        background: #f1f5f9;
        color: #475569;
        padding: 3px 8px;
        border-radius: 999px;
      }
    </style>
    <h1>${t.print_codes_title(rows.length)}</h1>
    <div class="grid">${cards}</div>
  `;
}

function getDownloadFileNameFromDisposition(
  header: string | null,
  fallback: string,
) {
  if (!header) return fallback;

  const encodedMatch = header.match(/filename\*\s*=\s*(?:UTF-8'')?("?)([^";]+)\1/i);
  if (encodedMatch?.[2]) {
    try {
      return decodeURIComponent(encodedMatch[2]);
    } catch {
      return encodedMatch[2];
    }
  }

  const plainMatch = header.match(/filename\s*=\s*(?:"([^"]+)"|([^;]+))/i);
  return plainMatch?.[1] ?? plainMatch?.[2]?.trim() ?? fallback;
}

// ── TeacherLessonsSection (simple: list + .docx download + open for class) ──

function TeacherLessonsSection({
  lessons,
  moduleProgress,
  classState,
  onOpenLessonForClass,
  onCloseLessonForClass,
  onPreviewLesson,
  t,
}: {
  lessons: ProgramLesson[];
  moduleProgress: ModuleProgress[];
  classState: ClassState | null;
  onOpenLessonForClass: (slug: string) => void;
  onCloseLessonForClass: () => void;
  onPreviewLesson: (slug: string) => void;
  t: Dict;
}) {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const openSlug = classState?.openLessonSlug;

  useEffect(() => {
    if (!openMenu) return;
    function handler(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest(".teacher-lesson-line-menu")) setOpenMenu(null);
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [openMenu]);

  async function handleDownload(lesson: ProgramLesson) {
    setDownloading(lesson.slug);
    setOpenMenu(null);
    try {
      const response = await fetch(`/api/lessons/${encodeURIComponent(lesson.slug)}/docx`, {
        credentials: "same-origin",
        cache: "no-store",
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({})) as { error?: string };
        throw new Error(payload.error || t.download_failed);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = getDownloadFileNameFromDisposition(
        response.headers.get("Content-Disposition"),
        `${lesson.slug}.docx`,
      );
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(t.err_download_plan, e);
      alert(e instanceof Error ? e.message : t.download_failed);
    } finally {
      setDownloading(null);
    }
  }

  function trainerInfo(lesson: ProgramLesson): { name: string; icon: React.ReactNode; tone: string } | null {
    // UI Logic
    const type = lesson.trainer?.type;
    if (type === "telegram")
      return { name: "Telegram", icon: <SocialIcon name="telegram" />, tone: "telegram" };
    if (type === "gmail")
      return { name: "Gmail", icon: <CabinetIcon name="mail" />, tone: "gmail" };
    if (type === "uzum")
      return { name: "Uzum", icon: <UiIcon name="shopping" />, tone: "uzum" };
    if (type === "mygov")
      return { name: "Digital Government Services", icon: <UiIcon name="shield" />, tone: "mygov" };
    if (type === "phone")
      return { name: t.trainer_phone, icon: <CabinetIcon name="phone" />, tone: "phone" };

    // UI Logic
    const practiceScreen = lesson.screens?.find((s) => s.type === "practice");
    const mockup = practiceScreen && "mockup" in practiceScreen ? practiceScreen.mockup : undefined;
    const kind = mockup?.kind;
    if (!kind) return null;

    // UI Logic
    const MOCKUP_LABELS: Record<string, { name: string; tone: string }> = {
      "thermometer":         { name: "Thermometer",        tone: "phone" },
      "atm":                 { name: "ATM",         tone: "mygov" },
      "washing-machine":     { name: "Washing machine",tone: "uzum" },
      "messenger":           { name: "Messenger",       tone: "telegram" },
      "weather":             { name: "Weather forecast",   tone: "phone" },
      "product-label":       { name: "Label",         tone: "uzum" },
      "train-board":         { name: "Station board",    tone: "mygov" },
      "package-tracking":    { name: "Parcel track",     tone: "gmail" },
      "skin-quiz":           { name: "Skin questionnaire",    tone: "phone" },
      "checklist":           { name: "Checklist",         tone: "phone" },
      "menu":                { name: "Food menu",        tone: "uzum" },
      "recipe":              { name: "Recipe",           tone: "uzum" },
      "budget-form":         { name: "Budget",           tone: "mygov" },
      "gov-portal":          { name: "Digital Government Services",        tone: "mygov" },
      "contract":            { name: "Agreement",          tone: "mygov" },
      "transport-directory": { name: "Directory",       tone: "phone" },
      "wardrobe":            { name: "Wardrobe",         tone: "uzum" },
      "table-setting":       { name: "Serving",       tone: "uzum" },
      "shampoo-store":       { name: "Showcase",          tone: "uzum" },
      "weekly-weather":      { name: "Weekly Forecast",   tone: "phone" },
      "care-label":          { name: "Clothes label",     tone: "uzum" },
      "detergent-box":       { name: "Packaging",         tone: "uzum" },
      "oven-timer":          { name: "Timer",           tone: "phone" },
      "ticket-booking":      { name: "Buying a ticket",   tone: "mygov" },
      "phone-call":          { name: t.trainer_phone,    tone: "phone" },
      "safety-cards":        { name: "Safety",     tone: "mygov" },
      "volume-slider":       { name: "Volume",        tone: "phone" },
      "diagnostic":          { name: "Diagnostic Life Skills",      tone: "phone" },
      "hygiene-shelf":       { name: "Hygiene items", tone: "phone" },
    };
    const label = MOCKUP_LABELS[kind];
    if (!label) return null;
    return {
      name: label.name,
      icon: <UiIcon name="services" />,
      tone: label.tone,
    };
  }

  return (
    <section className="teacher-lessons-simple" aria-label={t.aria_lessons}>
      <header className="teacher-lessons-simple-head">
        <h2>{t.program_title}</h2>
        <p>{t.program_subtitle}</p>
      </header>

      <div className="teacher-lessons-simple-list">
        {moduleProgress.map((module, mIdx) => {
          const moduleLessons = lessons.filter((l) => l.moduleSlug === module.slug);
          return (
            <section key={module.slug} className="teacher-module-block">
              <header className="teacher-module-head">
                <span className="teacher-module-num">{String(mIdx + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{module.title}</strong>
                  <small>{t.lessons_count_short(moduleLessons.length)}</small>
                </div>
              </header>

              <ol className="teacher-module-lessons">
                {moduleLessons.map((lesson, lIdx) => {
                  const isLive = openSlug === lesson.slug;
                  const tInfo = trainerInfo(lesson);
                  const isDownloading = downloading === lesson.slug;
                  const isMenuOpen = openMenu === lesson.slug;
                  return (
                    <li key={lesson.slug} className={`teacher-lesson-line${isLive ? " live" : ""}`}>
                      {tInfo ? (
                        <span
                          className={`teacher-lesson-line-app teacher-lesson-line-app--${tInfo.tone}`}
                          aria-label={tInfo.name}
                          title={t.trainer_label(tInfo.name)}
                        >
                          {tInfo.icon}
                        </span>
                      ) : (
                        <span className="teacher-lesson-line-app teacher-lesson-line-app--empty" aria-hidden="true">
                          {lIdx + 1}
                        </span>
                      )}
                      <div className="teacher-lesson-line-info">
                        <strong>{lesson.title}</strong>
                        <span className="teacher-lesson-line-meta">
                          <span>{lesson.duration}</span>
                          {tInfo ? <span className="teacher-lesson-line-trainer">{tInfo.name}</span> : null}
                          {isLive ? <span className="teacher-lesson-line-live">{t.live_now}</span> : null}
                        </span>
                      </div>
                      <div className="teacher-lesson-line-actions">
                        {isLive ? (
                          <button
                            type="button"
                            className="button button-primary small teacher-lesson-line-close"
                            onClick={onCloseLessonForClass}
                          >
                            {t.btn_close}
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="button button-primary small"
                            onClick={() => onOpenLessonForClass(lesson.slug)}
                          >
                            {t.btn_open_for_class}
                          </button>
                        )}

                        <div className="teacher-lesson-line-menu">
                          <button
                            type="button"
                            className="teacher-lesson-line-more"
                            aria-label={t.other_actions}
                            aria-expanded={isMenuOpen}
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenu(isMenuOpen ? null : lesson.slug);
                            }}
                          >
                            ⋯
                          </button>
                          {isMenuOpen ? (
                            <div className="teacher-lesson-line-menu-popup" role="menu">
                              <button
                                type="button"
                                role="menuitem"
                                onClick={() => handleDownload(lesson)}
                                disabled={isDownloading}
                              >
                                <CabinetIcon name="download" />
                                {isDownloading ? t.downloading : t.lesson_plan_docx}
                              </button>
                              <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                  setOpenMenu(null);
                                  onPreviewLesson(lesson.slug);
                                }}
                              >
                                <CabinetIcon name="flask" />
                                {t.try_yourself}
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </section>
  );
}

// ── TeacherTodaySection ──────────────────────────────────────────────────────

function TeacherTodaySection({
  user,
  students,
  classState,
  lessons,
  nextLesson,
  onOpenLessonForClass,
  onCloseLessonForClass,
  onOpenLessons,
  onStudentAdded,
  t,
  locale,
}: {
  user: DashboardUser;
  students: CurrentUser[];
  classState: ClassState | null;
  lessons: ProgramLesson[];
  nextLesson?: ProgramLesson;
  onOpenLessonForClass: (slug: string) => void;
  onCloseLessonForClass: () => void;
  onOpenLessons: () => void;
  onStudentAdded: () => void | Promise<void>;
  t: Dict;
  locale: string;
}) {
  const openSlug = classState?.openLessonSlug;
  const openLesson = openSlug ? lessons.find((l) => l.slug === openSlug) : undefined;
  const focusLesson = openLesson ?? nextLesson;

  const [showAddForm, setShowAddForm] = useState(false);
  const [addName, setAddName] = useState("");
  const [addGroup, setAddGroup] = useState<StudentGroup>("experimental");
  const [addError, setAddError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [groupFilter, setGroupFilter] = useState<"all" | StudentGroup>("all");

  async function handleAddStudent(e: React.FormEvent) {
    e.preventDefault();
    if (!addName.trim()) {
      setAddError(t.enter_student_name);
      return;
    }
    setAddError("");
    setIsAdding(true);
    try {
      await addStudentToClass({
        name: addName.trim(),
        teacherId: user.id,
        childClass: user.profile.childClass,
        group: addGroup,
      });
      setAddName("");
      setShowAddForm(false);
      await onStudentAdded();
    } catch (err) {
      setAddError(err instanceof Error ? err.message : t.err_default);
    } finally {
      setIsAdding(false);
    }
  }

  function handlePrintCodes() {
    const rows = students
      .filter((s) => s.studentCode)
      .map((s) => ({
        name: s.profile.childName || s.name,
        code: s.studentCode as string,
        group:
          s.group === "experimental"
            ? t.group_exp_short
            : s.group === "control"
              ? t.group_ctrl_short
              : undefined,
      }));
    if (!rows.length) {
      alert(t.no_codes_yet);
      return;
    }
    openPrintWindow(
      buildStudentCodesHtml(rows, user.profile.childClass || "", t),
      t.print_codes_for_class(user.profile.childClass || ""),
      locale,
    );
  }

  const filteredStudents = students.filter((s) =>
    groupFilter === "all" ? true : s.group === groupFilter,
  );
  const experimentalCount = students.filter((s) => s.group === "experimental").length;
  const controlCount = students.filter((s) => s.group === "control").length;

  // UI Logic
  const liveStats = openLesson
    ? students.reduce(
        (acc, s) => {
          const state = getLessonProgressState(s, openLesson.slug);
          acc[state] += 1;
          return acc;
        },
        { done: 0, "in-progress": 0, idle: 0 },
      )
    : null;

  return (
    <section className="teacher-console" aria-label={t.aria_teacher_home}>

      {/* UI Module */}
      <article className={`teacher-lesson-control${openLesson ? " teacher-lesson-control--open" : ""}`}>
        <div className="teacher-lesson-control-info">
          <p className="teacher-lesson-eyebrow">
            {openLesson ? t.lesson_in_progress : t.next_lesson_label}
          </p>
          <h2 className="teacher-lesson-title">
            {openLesson?.title ?? nextLesson?.title ?? t.course_done}
          </h2>
          {openLesson ? (
            <p className="teacher-lesson-meta">
              {t.opened_at(formatTime(classState?.openedAt ?? undefined, t))}
            </p>
          ) : nextLesson ? (
            <p className="teacher-lesson-meta">{nextLesson.summary}</p>
          ) : null}

          {liveStats ? (
            <div className="teacher-live-stats" role="status" aria-live="polite">
              <span className="teacher-live-chip teacher-live-chip--done">
                {t.passed} <strong>{liveStats.done}</strong>
              </span>
              <span className="teacher-live-chip teacher-live-chip--inprogress">
                {t.in_work} <strong>{liveStats["in-progress"]}</strong>
              </span>
              <span className="teacher-live-chip teacher-live-chip--idle">
                {t.not_started_p} <strong>{liveStats.idle}</strong>
              </span>
            </div>
          ) : focusLesson?.methodology?.stages?.length ? (
            <div className="teacher-lesson-stages-strip">
              <p className="teacher-lesson-stages-label">{t.lesson_plan_label}</p>
              <ol className="teacher-lesson-stages-track">
                {focusLesson.methodology.stages.map((s, i) => (
                  <li key={i} className="teacher-lesson-stages-step">
                    <span className="teacher-lesson-stages-time">{s.duration}</span>
                    <span className="teacher-lesson-stages-title">{s.title.replace(/^\d+\.\s*/, "")}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </div>

        <div className="teacher-lesson-control-actions">
          {openLesson ? (
            <button
              type="button"
              className="teacher-big-btn teacher-big-btn--stop"
              onClick={onCloseLessonForClass}
            >
              {t.close_lesson}
            </button>
          ) : nextLesson ? (
            <button
              type="button"
              className="teacher-big-btn teacher-big-btn--start"
              onClick={() => onOpenLessonForClass(nextLesson.slug)}
            >
              {t.open_lesson_for_class}
            </button>
          ) : null}
          <button
            type="button"
            className="teacher-text-btn"
            onClick={onOpenLessons}
          >
            {t.full_program}
          </button>
        </div>
      </article>

      {/* UI Module */}
      <div className="teacher-class-actionbar">
        <div className="teacher-class-actionbar-info">
          <p className="teacher-class-actionbar-eyebrow">
            <span>{user.profile.organizationName || t.school_default}</span>
            <span aria-hidden="true">·</span>
            <span>{t.class_short(user.profile.childClass || t.dash)}</span>
          </p>
          <h2>{t.students_count(students.length)}</h2>
        </div>
        <div className="teacher-class-actionbar-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={handlePrintCodes}
            disabled={students.length === 0}
          >
            <CabinetIcon name="download" />
            {t.print_codes}
          </button>
          <button
            type="button"
            className="button button-primary"
            onClick={() => setShowAddForm((v) => !v)}
          >
            <CabinetIcon name="user" />
            {showAddForm ? t.hide_form : t.add_student}
          </button>
        </div>
      </div>

      {showAddForm ? (
        <article className="teacher-class-add-card">
          <header className="teacher-class-card-head">
            <CabinetIcon name="user" />
            <h3>{t.new_student}</h3>
          </header>
          <form className="teacher-class-add-form" onSubmit={handleAddStudent}>
            <div className="field">
              <label htmlFor="add-student-name">{t.student_name_label}</label>
              <input
                id="add-student-name"
                type="text"
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                placeholder={t.student_name_placeholder}
                autoComplete="off"
              />
            </div>
            <div className="field">
              <label htmlFor="add-student-group">{t.research_group}</label>
              <select
                id="add-student-group"
                value={addGroup}
                onChange={(e) => setAddGroup(e.target.value as StudentGroup)}
              >
                <option value="experimental">{t.group_experimental}</option>
                <option value="control">{t.group_control}</option>
              </select>
            </div>
            {addError ? <p className="form-error">{addError}</p> : null}
            <div className="teacher-class-add-actions">
              <button type="submit" className="button button-primary" disabled={isAdding}>
                {isAdding ? t.adding : t.btn_create}
              </button>
              <button type="button" className="button button-ghost" onClick={() => setShowAddForm(false)}>
                {t.btn_cancel}
              </button>
            </div>
          </form>
        </article>
      ) : null}

      {/* UI Module */}
      {students.length > 0 ? (
        <div className="teacher-class-summary">
          <button
            type="button"
            className={`teacher-class-summary-tile${groupFilter === "all" ? " active" : ""}`}
            onClick={() => setGroupFilter("all")}
          >
            <span className="teacher-class-summary-num">{students.length}</span>
            <span className="teacher-class-summary-label">{t.all_students}</span>
          </button>
          <button
            type="button"
            className={`teacher-class-summary-tile teacher-class-summary-tile--exp${groupFilter === "experimental" ? " active" : ""}`}
            onClick={() => setGroupFilter("experimental")}
          >
            <span className="teacher-class-summary-num">{experimentalCount}</span>
            <span className="teacher-class-summary-label">{t.group_experimental}</span>
          </button>
          <button
            type="button"
            className={`teacher-class-summary-tile teacher-class-summary-tile--ctrl${groupFilter === "control" ? " active" : ""}`}
            onClick={() => setGroupFilter("control")}
          >
            <span className="teacher-class-summary-num">{controlCount}</span>
            <span className="teacher-class-summary-label">{t.group_control}</span>
          </button>
        </div>
      ) : null}

      {/* UI Module */}
      <article className="teacher-class-card">
        <div className="teacher-class-head">
          <h3>{openLesson ? t.on_lesson_prefix(openLesson.title) : t.class_word}</h3>
          {students.length > 0 ? (
            <span className="teacher-class-count">{t.of_count(filteredStudents.length, students.length)}</span>
          ) : null}
        </div>

        {students.length === 0 ? (
          <p className="teacher-empty">
            {t.no_students_yet}
          </p>
        ) : filteredStudents.length === 0 ? (
          <p className="teacher-empty">{t.no_students_in_group}</p>
        ) : (
          <div className="teacher-class-list">
            {filteredStudents.map((s) => {
              const completedCount = new Set(s.progress.map((p) => p.lessonSlug)).size;
              const pct = lessons.length
                ? Math.round((completedCount / lessons.length) * 100)
                : 0;
              const studentName = s.profile.childName || s.name;
              const currentLessonIdx = Math.min(completedCount + 1, lessons.length);
              const presence = getStudentPresence(s, t);
              const lessonState = openLesson ? getLessonProgressState(s, openLesson.slug) : null;

              return (
                <div key={s.id} className={`teacher-class-row${lessonState ? ` teacher-class-row--${lessonState}` : ""}`}>
                  <span className="teacher-student-avatar" aria-hidden="true">
                    {getStudentInitials(studentName)}
                  </span>
                  <div className="teacher-class-info">
                    <strong>{studentName}</strong>
                    <small>
                      {t.code_word} {s.studentCode || t.dash} · {t.lesson_word} {currentLessonIdx} {t.of_word} {lessons.length} · {presence.label}
                    </small>
                  </div>
                  <div className="teacher-progress-bar" aria-hidden="true">
                    <span style={{ width: `${pct}%` }} />
                  </div>
                  {lessonState ? (
                    <span className={`status-pill status-pill--lesson-${lessonState}`}>
                      {lessonState === "done"
                        ? t.passed_short
                        : lessonState === "in-progress"
                          ? t.in_work_short
                          : t.not_started_short}
                    </span>
                  ) : (
                    <span className={`status-pill status-pill--${presence.state}`}>
                      {presence.state === "today"
                        ? t.today_word
                        : presence.state === "recent"
                          ? t.recently
                          : t.dash}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </article>
    </section>
  );
}

// ── ParentTodaySection ───────────────────────────────────────────────────────

function ParentTodaySection({
  user,
  lessons,
  classState,
  completedLessons,
  lessonCount,
  overallProgress,
  moduleProgress,
  onOpenLesson,
  t,
}: {
  user: DashboardUser;
  lessons: ProgramLesson[];
  classState: ClassState | null;
  completedLessons: number;
  lessonCount: number;
  overallProgress: number;
  moduleProgress: ModuleProgress[];
  onOpenLesson: (slug: string) => void;
  t: Dict;
}) {
  const childName = user.profile.childName || t.your_child;
  const childFirstName = childName.split(/\s+/)[0] || childName;
  const childClass = user.profile.childClass || "Grade 3";
  const orgName = user.profile.organizationName || "Oak Creek Academy";
  const teacherName = user.profile.teacherName || "Ms. Johnson";

  // Questionnaire state
  const [initialDone, setInitialDone] = useState<boolean | null>(null);
  const [finalDone, setFinalDone] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadQuestionnaires() {
      try {
        const [initial, final] = await Promise.all([
          getQuestionnaire(user.id, "initial"),
          getQuestionnaire(user.id, "final"),
        ]);

        if (!cancelled) {
          setInitialDone(Boolean(initial));
          setFinalDone(Boolean(final));
        }
      } catch {
        if (!cancelled) {
          setInitialDone(false);
          setFinalDone(false);
        }
      }
    }

    void loadQuestionnaires();
    return () => {
      cancelled = true;
    };
  }, [user.id]);

  const openSlug = classState?.openLessonSlug;
  const openLesson = openSlug ? lessons.find((l) => l.slug === openSlug) : undefined;
  const allLessonsDone = completedLessons >= lessonCount;

  return (
    <section className="mosaic-parent-dashboard" aria-label={t.aria_parent}>
      <div className="mosaic-dashboard-grid">
        {/* Main Column */}
        <div className="mosaic-dashboard-main-col">
          {/* Child Summary Card */}
          <article className="mosaic-card">
            <div className="mosaic-card-head">
              <span className="mosaic-card-eyebrow">Child Summary</span>
              <h2 className="mosaic-card-title">{childName}</h2>
            </div>
            <div className="mosaic-profile-meta-grid">
              <div className="mosaic-meta-item">
                <span className="mosaic-meta-label">Grade</span>
                <strong className="mosaic-meta-value">{childClass}</strong>
              </div>
              <div className="mosaic-meta-item">
                <span className="mosaic-meta-label">School / Organization</span>
                <strong className="mosaic-meta-value">{orgName}</strong>
              </div>
              <div className="mosaic-meta-item">
                <span className="mosaic-meta-label">Assigned Educator</span>
                <strong className="mosaic-meta-value">{teacherName}</strong>
              </div>
            </div>

            <div className="mosaic-progress-block">
              <div className="mosaic-progress-header">
                <span className="mosaic-progress-label">Overall Course Progress</span>
                <span className="mosaic-progress-metric">
                  <strong>{completedLessons}</strong> of {lessonCount} lessons ({overallProgress}%)
                </span>
              </div>
              <div className="mosaic-progress-track">
                <div
                  className="mosaic-progress-bar"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          </article>

          {/* Today's Learning Card */}
          <article className="mosaic-card">
            <div className="mosaic-card-head">
              <div className="flex items-center justify-between mb-2">
                <span className="mosaic-card-eyebrow">Today&apos;s Learning</span>
                {openLesson ? (
                  <span className="mosaic-badge mosaic-badge-success">In session</span>
                ) : (
                  <span className="mosaic-badge mosaic-badge-idle">Idle</span>
                )}
              </div>
              {openLesson ? (
                <>
                  <h2 className="mosaic-card-title">{openLesson.title}</h2>
                  <p className="mosaic-card-text">
                    {t.parent_lesson_open_text(childFirstName)}
                  </p>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="button button-primary"
                      onClick={() => onOpenLesson(openLesson.slug)}
                    >
                      {t.view_lesson}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="mosaic-card-title">{t.lesson_not_open_yet}</h2>
                  <p className="mosaic-card-text">
                    {t.parent_lesson_closed_text()}
                  </p>
                </>
              )}
            </div>
          </article>

          {/* Progress by Topic */}
          {moduleProgress.length > 0 && (
            <article className="mosaic-card">
              <div className="mosaic-card-head">
                <span className="mosaic-card-eyebrow">Curriculum Tracks</span>
                <h2 className="mosaic-card-title">{t.progress_by_topics}</h2>
              </div>
              <div className="mosaic-module-list">
                {moduleProgress.map((module) => (
                  <button
                    key={module.slug}
                    type="button"
                    className="mosaic-module-row"
                    onClick={() => {
                      const nextSlug = module.nextLesson?.slug ?? module.lessons[0]?.slug;
                      if (nextSlug) onOpenLesson(nextSlug);
                    }}
                  >
                    <div className="mosaic-module-info">
                      <span className="mosaic-module-title">{module.title}</span>
                      <span className="mosaic-module-count">
                        {module.done} / {module.total}
                      </span>
                    </div>
                    <div className="mosaic-progress-track mosaic-progress-track--sm">
                      <div
                        className="mosaic-progress-bar"
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </article>
          )}
        </div>

        {/* Side Column */}
        <div className="mosaic-dashboard-side-col">
          {/* Parent Questionnaires Card */}
          <article className="mosaic-card">
            <div className="mosaic-card-head">
              <span className="mosaic-card-eyebrow">Questionnaires</span>
              <h2 className="mosaic-card-title">{t.parent_family_title}</h2>
              <p className="mosaic-card-text">
                {t.parent_family_desc}
              </p>
            </div>

            <div className="mosaic-questionnaire-list">
              <div className="mosaic-q-item">
                <div className="mosaic-q-info">
                  <strong>Initial Questionnaire</strong>
                  <p className="mosaic-q-sub">
                    {initialDone ? "Completed and submitted" : "Baseline digital skills evaluation"}
                  </p>
                </div>
                {initialDone ? (
                  <span className="mosaic-badge mosaic-badge-success">Completed</span>
                ) : (
                  <span className="mosaic-badge mosaic-badge-warning">Pending</span>
                )}
              </div>

              <div className="mosaic-q-item">
                <div className="mosaic-q-info">
                  <strong>Final Questionnaire</strong>
                  <p className="mosaic-q-sub">
                    {finalDone
                      ? "Completed and submitted"
                      : allLessonsDone
                        ? "Ready for completion"
                        : t.opens_after(lessonCount, completedLessons)}
                  </p>
                </div>
                {finalDone ? (
                  <span className="mosaic-badge mosaic-badge-success">Completed</span>
                ) : allLessonsDone ? (
                  <span className="mosaic-badge mosaic-badge-warning">Ready</span>
                ) : (
                  <span className="mosaic-badge mosaic-badge-neutral">Locked</span>
                )}
              </div>
            </div>

            <div className="mosaic-card-action">
              <Link
                href="/onboarding/anketa"
                className="button button-primary w-full text-center block"
              >
                Open questionnaires
              </Link>
            </div>
          </article>

          {/* Support at Home Card */}
          <article className="mosaic-card">
            <div className="mosaic-card-head">
              <span className="mosaic-card-eyebrow">Home Guidance</span>
              <h2 className="mosaic-card-title">Support at home</h2>
            </div>
            <div className="mosaic-step-list">
              <div className="mosaic-step-item">
                <span className="mosaic-step-number">1</span>
                <p>Agree on a short practice time before starting: 10–15 minutes.</p>
              </div>
              <div className="mosaic-step-item">
                <span className="mosaic-step-number">2</span>
                <p>After the activity, ask what felt easiest and what was fun to repeat.</p>
              </div>
              <div className="mosaic-step-item">
                <span className="mosaic-step-number">3</span>
                <p>If the learner needs a pause, stop at the current step and return later.</p>
              </div>
            </div>

            {user.profile.supportNotes && (
              <div className="mosaic-subcard">
                <span className="mosaic-card-eyebrow">Individual Support Notes</span>
                <p className="mosaic-note-text">
                  &ldquo;{user.profile.supportNotes}&rdquo;
                </p>
              </div>
            )}

            <div className="mosaic-contacts-strip">
              <div><strong>Parent:</strong> {user.name} ({user.email})</div>
              <div><strong>Educator:</strong> {teacherName}</div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

// ── TodaySection (parent / teacher generic) ──────────────────────────────────

function TodaySection({
  userRole,
  teacherId,
  nextLesson,
  classState,
  overallProgress,
  completedLessons,
  lessonCount,
  moduleProgress,
  activityFeed,
  lessons,
  onOpenLessonForClass,
  onCloseLessonForClass,
  t,
}: {
  userRole: UserRole;
  teacherId?: string;
  nextLesson?: ProgramLesson;
  classState: ClassState | null;
  overallProgress: number;
  completedLessons: number;
  lessonCount: number;
  moduleProgress: ModuleProgress[];
  activityFeed: ReturnType<typeof buildActivityFeed>;
  lessons: ProgramLesson[];
  onOpenLessonForClass: (slug: string) => void;
  onCloseLessonForClass: () => void;
  t: Dict;
}) {
  const isTeacher = userRole === "teacher";
  const openSlug = classState?.openLessonSlug;
  const openLesson = openSlug ? lessons.find((l) => l.slug === openSlug) : undefined;

  const supportTask = isTeacher
    ? {
        status: t.class_kicker,
        title: openLesson ? t.open_lesson_now(openLesson.title) : t.lesson_not_open_class,
        text: openLesson
          ? t.students_can_join_now
          : t.press_open_to_let_join,
      }
    : {
        status: t.home_rhythm_kicker,
        title: t.home_rhythm_title,
        text: t.home_rhythm_text,
      };

  const nextModule = moduleProgress.find((module) => module.nextLesson);
  const taskList = [
    {
      status: t.next_step,
      title: nextLesson?.title ?? t.choose_first_lesson,
      text: nextLesson?.summary ?? t.lessons_ready,
    },
    supportTask,
    {
      status: t.module_word,
      title: nextModule?.title ?? t.lessons_section,
      text: nextModule?.nextLesson
        ? t.continue_with(nextModule.nextLesson.title)
        : t.pick_next_module,
    },
  ];

  return (
    <section className="lms-dashboard" aria-label={t.aria_today}>
      <div className="lms-grid lms-grid-today">
        <div className="lms-main-column">
          {isTeacher && teacherId ? (
            <article className="lms-panel">
              <div className="lms-section-head">
                <div>
                  <p className="lms-kicker">{t.lesson_control_kicker}</p>
                  <h2>
                    {openLesson ? openLesson.title : t.lesson_not_open}
                  </h2>
                </div>
                <span className={`lms-chip ${openLesson ? "lms-chip--green" : ""}`}>
                  {openLesson ? t.state_open : t.state_closed}
                </span>
              </div>

              {openLesson ? (
                <>
                  <p>{openLesson.summary}</p>
                  <p className="lms-note">
                    {t.opened_at_short(classState?.openedAt
                      ? new Intl.DateTimeFormat(t.locale, { hour: "2-digit", minute: "2-digit" }).format(new Date(classState.openedAt))
                      : t.dash)}
                  </p>
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={onCloseLessonForClass}
                  >
                    {t.close_lesson_for_class}
                  </button>
                </>
              ) : (
                <>
                  <p>{t.students_see_lock}</p>
                  {nextLesson ? (
                    <button
                      type="button"
                      className="button button-primary"
                      onClick={() => onOpenLessonForClass(nextLesson.slug)}
                    >
                      {t.open_for_class_with(nextLesson.title)}
                    </button>
                  ) : null}
                </>
              )}
            </article>
          ) : null}

          <article className="lms-panel">
            <div className="lms-section-head">
              <div>
                <p className="lms-kicker">{t.next_step}</p>
                <h2>{nextLesson?.title ?? t.start_learning}</h2>
              </div>
              <span className="lms-chip">{nextLesson?.duration ?? t.start_word}</span>
            </div>
            <p>{nextLesson?.summary ?? t.open_lessons_and_start}</p>
            <div className="lms-meta-row">
              {nextLesson ? <span>{nextLesson.moduleTitle}</span> : null}
              <span>{t.one_screen_one_action}</span>
            </div>
          </article>

          <article className="lms-panel">
            <div className="lms-section-head">
              <div>
                <p className="lms-kicker">{t.upcoming_actions}</p>
                <h2>{t.what_to_do_today}</h2>
              </div>
            </div>
            <div className="lms-task-list">
              {taskList.map((task) => (
                <div key={task.title} className="lms-task-row">
                  <span className="lms-task-status">{task.status}</span>
                  <div>
                    <strong>{task.title}</strong>
                    <p>{task.text}</p>
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
                <p className="lms-kicker">{t.short_progress}</p>
                <h2>{t.pct_of_course(overallProgress)}</h2>
              </div>
              <span className="lms-chip">{completedLessons}/{lessonCount}</span>
            </div>
            <div className="lms-compact-progress">
              {buildProgressAreas(moduleProgress, t).slice(0, 4).map((area) => (
                <div key={area.title} className="lms-progress-row">
                  <div>
                    <strong>{area.title}</strong>
                    <span>{area.value}</span>
                  </div>
                  <div className="lms-progress-track" aria-hidden="true">
                    <span style={{ width: `${area.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="lms-panel">
            <div className="lms-section-head">
              <div>
                <p className="lms-kicker">{t.recent_activity}</p>
                <h2>{t.latest_events}</h2>
              </div>
            </div>
            <div className="lms-activity-list">
              {activityFeed.slice(0, 3).map((item) => (
                <div key={`${item.label}-${item.title}`} className="lms-activity-row">
                  <span>{item.label}</span>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}

// ── TeacherClassSection ───────────────────────────────────────────────────────

function TeacherClassSection({
  user,
  students,
  classState,
  lessons,
  onOpenLesson,
  onCloseLesson,
  onStudentAdded,
  t,
}: {
  user: DashboardUser;
  students: CurrentUser[];
  classState: ClassState | null;
  lessons: ProgramLesson[];
  onOpenLesson: (slug: string) => void;
  onCloseLesson: () => void;
  onStudentAdded: () => void | Promise<void>;
  t: Dict;
}) {
  void classState;
  void lessons;
  void onOpenLesson;
  void onCloseLesson;
  const [showAddForm, setShowAddForm] = useState(false);
  const [addName, setAddName] = useState("");
  const [addGroup, setAddGroup] = useState<StudentGroup>("experimental");
  const [addError, setAddError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [groupFilter, setGroupFilter] = useState<"all" | StudentGroup>("all");

  async function handleAddStudent(e: React.FormEvent) {
    e.preventDefault();
    setAddError("");
    if (!addName.trim()) {
      setAddError(t.enter_student_name);
      return;
    }
    setIsAdding(true);
    try {
      await addStudentToClass({
        name: addName.trim(),
        teacherId: user.id,
        childClass: user.profile.childClass,
        group: addGroup,
      });
      setAddName("");
      setShowAddForm(false);
      await onStudentAdded();
    } catch (err) {
      setAddError(err instanceof Error ? err.message : t.err_add_default);
    } finally {
      setIsAdding(false);
    }
  }

  function handlePrintCodes() {
    if (typeof window === "undefined") return;
    const list = students
      .filter((s) => s.studentCode)
      .map((s) => `${s.profile.childName || s.name}: ${s.studentCode}`)
      .join("\n");
    if (!list) {
      alert(t.no_codes_yet);
      return;
    }
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<pre style="font-family: monospace; font-size: 20px; line-height: 2; padding: 40px;">${list}</pre>`);
    w.document.close();
    w.print();
  }

  const filteredStudents = students.filter((s) => {
    if (groupFilter === "all") return true;
    return s.group === groupFilter;
  });

  const experimentalCount = students.filter((s) => s.group === "experimental").length;
  const controlCount = students.filter((s) => s.group === "control").length;

  return (
    <section className="teacher-class" aria-label={t.aria_teacher_class}>
      {/* ── Action bar ── */}
      <div className="teacher-class-actionbar">
        <div className="teacher-class-actionbar-info">
          <p className="teacher-class-actionbar-eyebrow">
            <span>{user.profile.organizationName || t.school_default}</span>
            <span aria-hidden="true">·</span>
            <span>{t.class_short(user.profile.childClass || t.dash)}</span>
          </p>
          <h2>{t.students_count(students.length)}</h2>
        </div>
        <div className="teacher-class-actionbar-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={handlePrintCodes}
            disabled={students.length === 0}
          >
            <CabinetIcon name="download" />
            {t.print_codes}
          </button>
          <button
            type="button"
            className="button button-primary"
            onClick={() => setShowAddForm((v) => !v)}
          >
            <CabinetIcon name="user" />
            {showAddForm ? t.hide_form : t.add_student}
          </button>
        </div>
      </div>

      {/* ── Add student form (collapsible) ── */}
      {showAddForm ? (
        <article className="teacher-class-add-card">
          <header className="teacher-class-card-head">
            <CabinetIcon name="user" />
            <h3>{t.new_student}</h3>
          </header>
          <form className="teacher-class-add-form" onSubmit={handleAddStudent}>
            <div className="field">
              <label htmlFor="add-student-name">{t.student_name_label}</label>
              <input
                id="add-student-name"
                type="text"
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                placeholder={t.student_name_placeholder}
                autoComplete="off"
              />
            </div>
            <div className="field">
              <label htmlFor="add-student-group">{t.research_group}</label>
              <select
                id="add-student-group"
                value={addGroup}
                onChange={(e) => setAddGroup(e.target.value as StudentGroup)}
              >
                <option value="experimental">{t.group_experimental}</option>
                <option value="control">{t.group_control}</option>
              </select>
            </div>
            {addError ? <p className="form-error">{addError}</p> : null}
            <div className="teacher-class-add-actions">
              <button type="submit" className="button button-primary" disabled={isAdding}>
                {isAdding ? t.adding : t.btn_create}
              </button>
              <button type="button" className="button button-ghost" onClick={() => setShowAddForm(false)}>
                {t.btn_cancel}
              </button>
            </div>
          </form>
        </article>
      ) : null}

      {/* ── Groups summary + filter ── */}
      <div className="teacher-class-summary">
        <button
          type="button"
          className={`teacher-class-summary-tile${groupFilter === "all" ? " active" : ""}`}
          onClick={() => setGroupFilter("all")}
        >
          <span className="teacher-class-summary-num">{students.length}</span>
          <span className="teacher-class-summary-label">{t.all_students}</span>
        </button>
        <button
          type="button"
          className={`teacher-class-summary-tile teacher-class-summary-tile--exp${groupFilter === "experimental" ? " active" : ""}`}
          onClick={() => setGroupFilter("experimental")}
        >
          <span className="teacher-class-summary-num">{experimentalCount}</span>
          <span className="teacher-class-summary-label">{t.group_experimental}</span>
        </button>
        <button
          type="button"
          className={`teacher-class-summary-tile teacher-class-summary-tile--ctrl${groupFilter === "control" ? " active" : ""}`}
          onClick={() => setGroupFilter("control")}
        >
          <span className="teacher-class-summary-num">{controlCount}</span>
          <span className="teacher-class-summary-label">{t.group_control}</span>
        </button>
      </div>

      {/* ── Student table ── */}
      <article className="teacher-class-table-card">
        <header className="teacher-class-card-head">
          <CabinetIcon name="users" />
          <h3>{t.students_list}</h3>
          <span className="teacher-class-count-pill">{t.of_count(filteredStudents.length, students.length)}</span>
        </header>

        {filteredStudents.length === 0 ? (
          <div className="teacher-class-empty">
            <CabinetIcon name="users" />
            <p>
              {students.length === 0
                ? t.no_students_short
                : t.no_students_in_group}
            </p>
          </div>
        ) : (
          <div className="teacher-class-table">
            <div className="teacher-class-table-row teacher-class-table-row--head">
              <span>{t.student_word}</span>
              <span>{t.code_word}</span>
              <span>{t.group_word}</span>
              <span>{t.progress_word}</span>
              <span>{t.status_word}</span>
            </div>
            {filteredStudents.map((student) => {
              const studentName = student.profile.childName || student.name;
              const completedCount = new Set(student.progress.map((p) => p.lessonSlug)).size;
              const total = lessons.length;
              const pct = total ? Math.round((completedCount / total) * 100) : 0;
              const last = getLastActivity(student);
              const online = last ? isToday(last) : false;
              const groupLabel = student.group === "experimental" ? t.group_exp_short : student.group === "control" ? t.group_ctrl_short : t.dash;
              const groupClass = student.group === "experimental" ? "exp" : student.group === "control" ? "ctrl" : "none";

              return (
                <div key={student.id} className="teacher-class-table-row">
                  <span className="teacher-class-table-cell teacher-class-table-cell--name">
                    <span className="teacher-class-avatar" aria-hidden="true">
                      {getStudentInitials(studentName)}
                    </span>
                    <span>{studentName}</span>
                  </span>
                  <span className="teacher-class-table-cell teacher-class-code">
                    {student.studentCode ?? t.dash}
                  </span>
                  <span className="teacher-class-table-cell">
                    <span className={`teacher-class-group-pill teacher-class-group-pill--${groupClass}`}>
                      {groupLabel}
                    </span>
                  </span>
                  <span className="teacher-class-table-cell teacher-class-progress-cell">
                    <span className="teacher-class-progress-bar" aria-hidden="true">
                      <span style={{ width: `${pct}%` }} />
                    </span>
                    <span className="teacher-class-progress-text">{completedCount}/{total}</span>
                  </span>
                  <span className="teacher-class-table-cell">
                    <span className={`teacher-class-status-pill teacher-class-status-pill--${online ? "online" : "offline"}`}>
                      <span className="teacher-class-status-dot" aria-hidden="true" />
                      {online ? t.online : t.offline}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </article>

      {/* ── How codes work ── */}
      <article className="teacher-class-help">
        <header className="teacher-class-card-head">
          <CabinetIcon name="help" />
          <h3>{t.how_codes_work}</h3>
        </header>
        <ol className="teacher-class-help-list">
          <li>{t.codes_step1}</li>
          <li>{t.codes_step2}</li>
          <li>{t.codes_step3}</li>
          <li>{t.codes_step4}</li>
        </ol>
      </article>
    </section>
  );
}

// ── LessonsSection ────────────────────────────────────────────────────────────

function LessonsSection({
  lessons,
  moduleProgress,
  completedLessonSlugs,
  nextLesson,
  userRole,
  activeLessonSlug,
  onOpenLesson,
  onBackToLessons,
  t,
}: {
  lessons: ProgramLesson[];
  moduleProgress: ModuleProgress[];
  completedLessonSlugs: Set<string>;
  nextLesson?: ProgramLesson;
  userRole: UserRole;
  activeLessonSlug?: string;
  onOpenLesson: (lessonSlug: string) => void;
  onBackToLessons: () => void;
  t: Dict;
}) {
  const isStudent = userRole === "student";
  const [activeModuleSlug, setActiveModuleSlug] = useState(moduleProgress[0]?.slug ?? "");
  const [selectedLessonSlug, setSelectedLessonSlug] = useState(nextLesson?.slug ?? "");
  const activeModule = moduleProgress.find((module) => module.slug === activeModuleSlug) ?? moduleProgress[0];
  const activeLessonSlugs = new Set(activeModule?.lessons.map((lesson) => lesson.slug) ?? []);
  const activeLessons = lessons.filter((lesson) => activeLessonSlugs.has(lesson.slug));
  const selectedLesson =
    activeLessons.find((lesson) => lesson.slug === selectedLessonSlug)
    ?? activeLessons.find((lesson) => lesson.slug === nextLesson?.slug)
    ?? activeLessons[0];
  const studyLesson = activeLessonSlug ? lessons.find((lesson) => lesson.slug === activeLessonSlug) : undefined;

  function handleBackToLessonList() {
    if (studyLesson) {
      setActiveModuleSlug(studyLesson.moduleSlug);
      setSelectedLessonSlug(studyLesson.slug);
    }
    onBackToLessons();
  }

  if (studyLesson) {
    // UI Logic
    const isAdultPreview = userRole === "parent";
    return (
      <section
        className={`lms-dashboard lesson-study-dashboard ${isStudent ? "student-lessons" : ""}`}
        aria-label={isAdultPreview ? t.aria_lesson_material : t.aria_lesson_trainer}
      >
        <article className="lms-panel lesson-study-shell">
          <div className="lesson-study-head">
            <div>
              <p className="lms-kicker">{studyLesson.moduleTitle}</p>
              <h2>{studyLesson.title}</h2>
              <p>{studyLesson.summary}</p>
            </div>
            <button type="button" className="button button-secondary" onClick={handleBackToLessonList}>
              {isStudent ? t.back : t.to_lesson_list}
            </button>
          </div>
          {isAdultPreview ? (
            <LessonMaterial
              key={studyLesson.slug}
              lesson={studyLesson}
              role={userRole as "teacher" | "parent"}
            />
          ) : (
            <LessonExperience
              key={studyLesson.slug}
              lesson={studyLesson}
              embedded
              onBack={handleBackToLessonList}
              onOpenLessons={handleBackToLessonList}
            />
          )}
        </article>
      </section>
    );
  }

  // UI Logic
  if (isStudent) {
    return (
      <section className="student-lessons-empty" aria-label={t.aria_student_lessons}>
        <p>{t.student_lessons_wait}</p>
      </section>
    );
  }

  // ── Adult lesson view: modules + lesson list + detail card ──
  return (
    <section className="lms-dashboard" aria-label={t.aria_lessons}>
      <div className="lms-lesson-layout">
        <aside className="lms-panel lms-module-list" aria-label={t.aria_modules}>
          <div className="lms-section-head">
            <div>
              <p className="lms-kicker">{t.modules_kicker}</p>
              <h2>{t.modules_title}</h2>
            </div>
          </div>
          <div className="lms-module-buttons">
            {moduleProgress.map((module, index) => (
              <button
                key={module.slug}
                type="button"
                className={`lms-module-button ${activeModule?.slug === module.slug ? "active" : ""}`}
                onClick={() => {
                  setActiveModuleSlug(module.slug);
                  setSelectedLessonSlug(module.lessons[0]?.slug ?? "");
                }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{module.title}</strong>
                <small>{module.done}/{module.total} {t.lessons_count_short(0).replace(/^\d+\s*/, "").trim()}</small>
              </button>
            ))}
          </div>
        </aside>

        <div className="lms-main-column">
          <article className="lms-panel">
            <div className="lms-section-head">
              <div>
                <p className="lms-kicker">{t.aria_lessons}</p>
                <h2>{activeModule?.title ?? t.course_word}</h2>
              </div>
              {activeModule ? (
                <span className="lms-chip">{activeModule.done}/{activeModule.total}</span>
              ) : null}
            </div>
            <div className="lms-lesson-list">
              {activeLessons.map((lesson, index) => {
                const completed = completedLessonSlugs.has(lesson.slug);
                const selected = selectedLesson?.slug === lesson.slug;
                return (
                  <button
                    key={lesson.slug}
                    type="button"
                    className={`lms-lesson-card ${selected ? "active" : ""}`}
                    onClick={() => setSelectedLessonSlug(lesson.slug)}
                  >
                    <div>
                      <div className="lms-meta-row">
                        <span>{t.lesson_n(index + 1)}</span>
                        <span>{lesson.duration}</span>
                        {completed ? <span>{t.completed_short}</span> : null}
                      </div>
                      <strong>{lesson.title}</strong>
                      <p>{lesson.summary}</p>
                    </div>
                    <span className="lms-inline-link">
                      {selected ? t.chosen : t.show}
                    </span>
                  </button>
                );
              })}
            </div>
          </article>
        </div>

        <aside className="lms-side-column">
          <article className="lms-panel">
            <div className="lms-section-head">
              <div>
                <p className="lms-kicker">{t.lesson_card_kicker}</p>
                <h2>{selectedLesson?.title ?? t.pick_lesson}</h2>
              </div>
            </div>
            <p>{selectedLesson?.summary ?? t.open_one_module}</p>
            <div className="lms-meta-row">
              {selectedLesson ? <span>{selectedLesson.moduleTitle}</span> : null}
              {selectedLesson ? <span>{selectedLesson.duration}</span> : null}
            </div>
            {selectedLesson ? (
              <button
                type="button"
                className="button button-primary full"
                onClick={() => onOpenLesson(selectedLesson.slug)}
              >
                <CabinetIcon name="book" />
                {t.view_material}
              </button>
            ) : null}
          </article>
        </aside>
      </div>
    </section>
  );
}

// ── AccountSection ────────────────────────────────────────────────────────────

function AccountSection({
  user,
  roleLabel,
  nextLesson,
  t,
}: {
  user: DashboardUser;
  roleLabel: string;
  nextLesson?: ProgramLesson;
  t: Dict;
}) {
  const accountFacts =
    user.role === "student"
      ? [
          { label: t.label_name, value: user.profile.childName },
          { label: t.label_email, value: user.email },
          { label: t.label_mode, value: roleLabel },
          { label: t.label_class, value: user.profile.childClass },
          { label: t.label_teacher, value: user.profile.teacherName },
        ]
      : user.role === "teacher"
        ? [
            { label: t.label_teacher, value: user.name },
            { label: t.label_email, value: user.email },
            { label: t.label_mode, value: roleLabel },
            { label: t.label_org, value: user.profile.organizationName },
            { label: t.label_group, value: user.profile.childClass },
          ]
        : [
            { label: t.label_name, value: user.name },
            { label: t.label_email, value: user.email },
            { label: t.label_role, value: roleLabel },
            { label: t.label_student, value: user.profile.childName },
            { label: t.label_class, value: user.profile.childClass },
            { label: t.label_teacher, value: user.profile.teacherName },
          ];

  const supports =
    user.role === "student"
      ? [t.student_support_1, t.student_support_2, t.student_support_3]
      : user.role === "teacher"
        ? [t.teacher_support_1, t.teacher_support_2, t.teacher_support_3]
        : [t.parent_support_1, t.parent_support_2, t.parent_support_3];

  return (
    <section className="lms-grid" aria-label={t.aria_account}>
      <div className="lms-main-column">
        <article className="lms-panel">
          <div className="lms-section-head">
            <div>
              <p className="lms-kicker">{t.account_data_kicker}</p>
              <h2>{user.role === "student" ? user.profile.childName : user.name}</h2>
            </div>
            <span className="lms-chip">{roleLabel}</span>
          </div>
          <div className="lms-definition-list">
            {accountFacts.map((fact) => (
              <div key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="lms-panel">
          <div className="lms-section-head">
            <div>
              <p className="lms-kicker">{t.supports_kicker}</p>
              <h2>{user.role === "student" ? t.student_supports_title : t.adult_supports_title}</h2>
            </div>
          </div>
          <div className="lms-task-list">
            {supports.map((support, index) => (
              <div key={support} className="lms-task-row">
                <span className="lms-task-status">{String(index + 1).padStart(2, "0")}</span>
                <p>{support}</p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <aside className="lms-side-column">
        <article className="lms-panel">
          <div className="lms-section-head">
            <div>
              <p className="lms-kicker">{t.quick_jump}</p>
              <h2>{t.next_lesson_short}</h2>
            </div>
          </div>
          <p>{nextLesson?.title ?? t.lesson_will_be_chosen}</p>
          {nextLesson ? <p>{nextLesson.summary}</p> : null}
          <p className="lms-note">{t.open_lessons_tab}</p>
        </article>
      </aside>
    </section>
  );
}

// ── Questionnaire data ────────────────────────────────────────────────────────

function QuestionnaireForm({
  userId,
  type,
  onDone,
  t,
}: {
  userId: string;
  type: QuestionnaireType;
  onDone: () => void;
  t: Dict;
}) {
  const questions = questionnaireQuestions[type];
  const [scores, setScores] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allAnswered = questions.every((q) => scores[q.id] !== undefined);

  async function handleSubmit() {
    if (!allAnswered) return;
    const answers: QuestionnaireAnswer[] = questions.map((q) => ({
      questionId: q.id,
      score: scores[q.id],
    }));
    setError("");
    setIsSubmitting(true);
    try {
      await submitQuestionnaire(userId, type, answers);
      setSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : t.save_questionnaire_failed,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="lms-task-list">
        <p style={{ fontWeight: 600, color: "var(--color-success, #1a7a4a)" }}>
          {t.questionnaire_saved}
        </p>
        <button type="button" className="button button-secondary small" onClick={onDone}>
          {t.close_word}
        </button>
      </div>
    );
  }

  return (
    <div className="lms-task-list">
      {questions.map((q) => (
        <div key={q.id} className="lms-task-row" style={{ flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
          <p style={{ fontWeight: 500 }}>{q.text}</p>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <small style={{ color: "var(--color-text-secondary, #666)" }}>{q.low}</small>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setScores((prev) => ({ ...prev, [q.id]: n }))}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: scores[q.id] === n ? "var(--color-brand, #2563eb)" : "#d1d5db",
                  background: scores[q.id] === n ? "var(--color-brand, #2563eb)" : "white",
                  color: scores[q.id] === n ? "white" : "#374151",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                {n}
              </button>
            ))}
            <small style={{ color: "var(--color-text-secondary, #666)" }}>{q.high}</small>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="button button-primary small"
        onClick={() => void handleSubmit()}
        disabled={!allAnswered || isSubmitting}
      >
        {isSubmitting ? t.saving : t.submit_questionnaire}
      </button>
      {error ? <p className="form-error">{error}</p> : null}
    </div>
  );
}

function ParentQuestionnairePanel({
  user,
  lessonCount,
  completedLessons,
  t,
}: {
  user: DashboardUser;
  lessonCount: number;
  completedLessons: number;
  t: Dict;
}) {
  const [activeForm, setActiveForm] = useState<QuestionnaireType | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [initialDone, setInitialDone] = useState<Awaited<ReturnType<typeof getQuestionnaire>>>();
  const [finalDone, setFinalDone] = useState<Awaited<ReturnType<typeof getQuestionnaire>>>();
  const allLessonsDone = completedLessons >= lessonCount;

  function handleDone() {
    setActiveForm(null);
    setRefresh((n) => n + 1);
  }

  useEffect(() => {
    let cancelled = false;

    async function loadQuestionnaires() {
      try {
        const [initial, final] = await Promise.all([
          getQuestionnaire(user.id, "initial"),
          getQuestionnaire(user.id, "final"),
        ]);

        if (!cancelled) {
          setInitialDone(initial);
          setFinalDone(final);
        }
      } catch {
        if (!cancelled) {
          setInitialDone(undefined);
          setFinalDone(undefined);
        }
      }
    }

    void loadQuestionnaires();
    return () => {
      cancelled = true;
    };
  }, [refresh, user.id]);

  return (
    <article className="lms-panel">
      <div className="lms-section-head">
        <div>
          <p className="lms-kicker">{t.research_kicker}</p>
          <h2>{t.parent_questionnaires}</h2>
        </div>
      </div>

      {activeForm ? (
        <QuestionnaireForm userId={user.id} type={activeForm} onDone={handleDone} t={t} />
      ) : (
        <div className="lms-task-list">
          <div className="lms-task-row">
            <span
              className={`lms-task-status ${
                initialDone ? "lms-task-status--done" : "lms-task-status--attention"
              }`}
              aria-label={initialDone ? t.filled_a : t.need_fill}
            >
              <CabinetIcon name={initialDone ? "check" : "alert"} />
            </span>
            <div className="parent-questionnaire-info">
              <p className="parent-questionnaire-title">{t.initial_questionnaire}</p>
              <p className="parent-questionnaire-meta">
                {initialDone
                  ? t.filled_on(new Date(initialDone.submittedAt).toLocaleDateString(t.locale))
                  : t.fill_before_start}
              </p>
            </div>
            {!initialDone && (
              <button
                type="button"
                className="button button-secondary small"
                onClick={() => setActiveForm("initial")}
              >
                {t.fill}
              </button>
            )}
          </div>

          <div className="lms-task-row">
            <span
              className={`lms-task-status ${
                finalDone
                  ? "lms-task-status--done"
                  : allLessonsDone
                    ? "lms-task-status--attention"
                    : "lms-task-status--locked"
              }`}
              aria-label={
                finalDone
                  ? t.filled_a
                  : allLessonsDone
                    ? t.need_fill
                    : t.closed_yet
              }
            >
              <CabinetIcon
                name={finalDone ? "check" : allLessonsDone ? "alert" : "lock"}
              />
            </span>
            <div className="parent-questionnaire-info">
              <p className="parent-questionnaire-title">{t.final_questionnaire}</p>
              <p className="parent-questionnaire-meta">
                {finalDone
                  ? t.filled_on(new Date(finalDone.submittedAt).toLocaleDateString(t.locale))
                  : allLessonsDone
                  ? t.all_lessons_done_fill_final
                  : t.opens_after(lessonCount, completedLessons)}
              </p>
            </div>
            {!finalDone && allLessonsDone && (
              <button
                type="button"
                className="button button-secondary small"
                onClick={() => setActiveForm("final")}
              >
                {t.fill}
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

// ── FamilySection ─────────────────────────────────────────────────────────────

function FamilySection({
  user,
  lessonCount,
  completedLessons,
  t,
}: {
  user: DashboardUser;
  lessonCount: number;
  completedLessons: number;
  t: Dict;
}) {
  const familyFacts = [
    { label: t.label_adult, value: user.name },
    { label: t.label_post, value: user.email },
    { label: t.label_child, value: user.profile.childName },
    { label: t.label_org, value: user.profile.organizationName },
  ];

  const homeRhythm = [
    t.home_rhythm_step_1,
    t.home_rhythm_step_2,
    t.home_rhythm_step_3,
  ];

  return (
    <section className="lms-grid" aria-label={t.aria_family}>
      <div className="lms-main-column">
        <ParentQuestionnairePanel user={user} lessonCount={lessonCount} completedLessons={completedLessons} t={t} />

        <article className="lms-panel">
          <div className="lms-section-head">
            <div>
              <p className="lms-kicker">{t.home_rhythm_kicker}</p>
              <h2>{t.home_rhythm_caption}</h2>
            </div>
          </div>
          <div className="lms-task-list">
            {homeRhythm.map((item, index) => (
              <div key={item} className="lms-task-row">
                <span className="lms-task-status">{t.step_n(index + 1)}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <aside className="lms-side-column">
        <article className="lms-panel">
          <div className="lms-section-head">
            <div>
              <p className="lms-kicker">{t.family_profile_kicker}</p>
              <h2>{t.contacts_context}</h2>
            </div>
          </div>
          <div className="lms-definition-list">
            {familyFacts.map((fact) => (
              <div key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="lms-panel">
          <div className="lms-section-head">
            <div>
              <p className="lms-kicker">{t.note_kicker}</p>
              <h2>{t.individual_support}</h2>
            </div>
          </div>
          <p className="lms-note">{user.profile.supportNotes}</p>
        </article>
      </aside>
    </section>
  );
}

// ── ProgressSection ───────────────────────────────────────────────────────────

function ProgressSection({
  overallProgress,
  completedLessons,
  lessonCount,
  moduleProgress,
  activityFeed,
  t,
}: {
  overallProgress: number;
  completedLessons: number;
  lessonCount: number;
  moduleProgress: ModuleProgress[];
  activityFeed: ReturnType<typeof buildActivityFeed>;
  t: Dict;
}) {
  return (
    <section className="lms-grid" aria-label={t.aria_progress}>
      <div className="lms-main-column">
        <article className="lms-panel">
          <div className="lms-section-head">
            <div>
              <p className="lms-kicker">{t.history_kicker}</p>
              <h2>{t.course_dynamics}</h2>
            </div>
          </div>

          <div className="lms-stat-grid">
            <div><span>{t.sec_progress_label}</span><strong>{overallProgress}%</strong></div>
            <div><span>{t.sec_lessons_label}</span><strong>{completedLessons}/{lessonCount}</strong></div>
            <div><span>{t.modules_word}</span><strong>{moduleProgress.length}</strong></div>
          </div>

          <div className="lms-progress-list">
            {buildProgressAreas(moduleProgress, t).map((area) => (
              <div key={area.title} className="lms-progress-detail-row">
                <div>
                  <strong>{area.title}</strong>
                  <p>{t.next_short(area.next)}</p>
                </div>
                <div className="lms-progress-track" aria-hidden="true">
                  <span style={{ width: `${area.progress}%` }} />
                </div>
                <span className="lms-chip">{area.value}</span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <aside className="lms-side-column">
        <article className="lms-panel">
          <div className="lms-section-head">
            <div>
              <p className="lms-kicker">{t.journal}</p>
              <h2>{t.latest_events}</h2>
            </div>
          </div>
          <div className="lms-activity-list">
            {activityFeed.map((item) => (
              <div key={`${item.label}-${item.title}`} className="lms-activity-row">
                <span>{item.label}</span>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </article>
      </aside>
    </section>
  );
}

// ── DashboardClient ───────────────────────────────────────────────────────────

export function DashboardClient({
  demoUser,
  lessons,
  modules,
  roleLabels,
}: DashboardClientProps) {
  const { user } = useAuth();
  const locale = useLocale();
  const t = dict[locale];
  const [activeSection, setActiveSection] = useState<DashboardSectionKey>("today");
  const [activeLessonSlug, setActiveLessonSlug] = useState<string>();
  const [classState, setClassState] = useState<ClassState | null>(null);
  const [students, setStudents] = useState<CurrentUser[]>([]);

  const activeUser = user ?? demoUser;
  const completedLessonSlugs = getCompletedLessonSlugs(activeUser);
  const completedLessons = completedLessonSlugs.size;
  const nextLesson = getNextLesson(lessons, completedLessonSlugs);
  const overallProgress = lessons.length ? Math.round((completedLessons / lessons.length) * 100) : 0;
  const moduleProgress = buildModuleProgress(modules, lessons, completedLessonSlugs);
  const activityFeed = buildActivityFeed(activeUser, lessons, t);
  const dashboardSections = getDashboardSections(activeUser.role, t);
  const fallbackSection = dashboardSections[0].key;
  const activeConfig = dashboardSections.find((s) => s.key === activeSection) ?? dashboardSections[0];
  const visibleSection = activeConfig.key;

  // UI Logic
  const teacherIdForStudent = activeUser.role === "student" ? activeUser.teacherId : undefined;
  const teacherIdForClass = activeUser.role === "teacher" ? activeUser.id : undefined;
  const relevantTeacherId = teacherIdForClass ?? teacherIdForStudent;

  // UI Logic
  useEffect(() => {
    if (!relevantTeacherId) {
      const resetId = window.setTimeout(() => setClassState(null), 0);
      return () => window.clearTimeout(resetId);
    }
    let cancelled = false;

    const syncState = async () => {
      try {
        const nextState = await getClassState(relevantTeacherId);
        if (!cancelled) setClassState(nextState);
      } catch {
        if (!cancelled) setClassState({ openLessonSlug: null, openedAt: null });
      }
    };

    void syncState();
    const pollMs = activeUser.role === "student" ? 3000 : 5000;
    const pollId = window.setInterval(syncState, pollMs);
    window.addEventListener(CLASS_STATE_EVENT, syncState);
    window.addEventListener("focus", syncState);
    return () => {
      cancelled = true;
      window.clearInterval(pollId);
      window.removeEventListener(CLASS_STATE_EVENT, syncState);
      window.removeEventListener("focus", syncState);
    };
  }, [activeUser.role, relevantTeacherId]);

  // UI Logic
  useEffect(() => {
    if (activeUser.role !== "teacher") return;
    let cancelled = false;

    async function loadStudents() {
      try {
        const nextStudents = await getStudentsByTeacher(activeUser.id);
        if (!cancelled) setStudents(nextStudents);
      } catch {
        if (!cancelled) setStudents([]);
      }
    }

    void loadStudents();
    const pollId = window.setInterval(loadStudents, 5000);
    window.addEventListener(AUTH_CHANGE_EVENT, loadStudents);
    window.addEventListener("focus", loadStudents);
    return () => {
      cancelled = true;
      window.clearInterval(pollId);
      window.removeEventListener(AUTH_CHANGE_EVENT, loadStudents);
      window.removeEventListener("focus", loadStudents);
    };
  }, [activeUser.id, activeUser.role]);

  const refreshStudents = useCallback(async () => {
    if (activeUser.role === "teacher") {
      const nextStudents = await getStudentsByTeacher(activeUser.id);
      setStudents(nextStudents);
    }
  }, [activeUser.id, activeUser.role]);

  // UI Logic
  useEffect(() => {
    const sectionsForRole = getDashboardSections(activeUser.role, t);
    const availableSectionKeys = new Set(sectionsForRole.map((s) => s.key));
    const defaultSection = sectionsForRole[0].key;

    const syncHash = () => {
      const nextState = resolveDashboardHash(window.location.hash, availableSectionKeys, defaultSection, lessons);
      const normalizedHash = buildDashboardHash(nextState.section, nextState.lessonSlug);
      if (window.location.hash !== normalizedHash) {
        window.history.replaceState(null, "", `${window.location.pathname}${normalizedHash}`);
      }
      setActiveSection(nextState.section);
      setActiveLessonSlug(nextState.lessonSlug);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, [activeUser.role, lessons, t]);

  function setDashboardState(nextState: DashboardHashState) {
    const hash = buildDashboardHash(nextState.section, nextState.lessonSlug);
    window.history.pushState(null, "", `${window.location.pathname}${hash}`);
    setActiveSection(nextState.section);
    setActiveLessonSlug(nextState.lessonSlug);
  }

  function handleNavigate(href: string) {
    const hashIndex = href.indexOf("#");
    const hrefHash = hashIndex === -1 ? "" : href.slice(hashIndex);
    const availableSectionKeys = new Set(dashboardSections.map((s) => s.key));
    const nextState = resolveDashboardHash(hrefHash, availableSectionKeys, fallbackSection, lessons);
    setDashboardState(nextState);
  }

  function handleOpenLesson(lessonSlug: string) {
    setDashboardState({ section: "lessons", lessonSlug });
  }

  function handleBackToLessons() {
    // UI Logic
    if (activeUser.role === "student") {
      setDashboardState({ section: "today" });
      return;
    }
    setDashboardState({ section: "lessons" });
  }

  function handleOpenProgress() {
    setDashboardState({ section: "progress" });
  }

  function handleOpenHelp() {
    setDashboardState({ section: "account" });
  }

  async function handleOpenLessonForClass(slug: string) {
    if (!activeUser.id) return;
    try {
      const nextState = await openLessonForClass(activeUser.id, slug);
      setClassState(nextState);
    } catch (error) {
      console.error(t.err_open_lesson, error);
    }
  }

  async function handleCloseLessonForClass() {
    if (!activeUser.id) return;
    try {
      const nextState = await closeLessonForClass(activeUser.id);
      setClassState(nextState);
    } catch (error) {
      console.error(t.err_close_lesson, error);
    }
  }

  // UI Logic
  function handleStudentStartLesson() {
    const targetSlug = classState?.openLessonSlug ?? nextLesson?.slug;
    if (targetSlug) {
      handleOpenLesson(targetSlug);
    } else {
      setDashboardState({ section: "lessons" });
    }
  }

  const navigation = [
    {
      title: t.cabinet,
      items: dashboardSections.map((section) => ({
        href: `/dashboard#${section.key}`,
        label: section.label,
        caption: section.caption,
      })),
    },
  ];

  return (
    <CabinetShell
      title={activeConfig.title}
      description={activeConfig.description}
      activeHref={`/dashboard#${visibleSection}`}
      layoutVariant={activeUser.role === "student" ? "student-top-nav" : "adult-sidebar"}
      navigation={navigation}
      onNavigate={handleNavigate}
    >
      {visibleSection === "today" ? (
        activeUser.role === "student" ? (
          <StudentTodaySection
            user={activeUser}
            nextLesson={nextLesson}
            openLesson={classState}
            overallProgress={overallProgress}
            completedLessons={completedLessons}
            lessonCount={lessons.length}
            activityFeed={activityFeed}
            lessons={lessons}
            onStartLesson={handleStudentStartLesson}
            onOpenProgress={handleOpenProgress}
            onOpenHelp={handleOpenHelp}
            t={t}
          />
        ) : activeUser.role === "teacher" ? (
          <TeacherTodaySection
            user={activeUser}
            students={students}
            classState={classState}
            lessons={lessons}
            nextLesson={nextLesson}
            onOpenLessonForClass={handleOpenLessonForClass}
            onCloseLessonForClass={handleCloseLessonForClass}
            onOpenLessons={() => setDashboardState({ section: "lessons" })}
            onStudentAdded={refreshStudents}
            t={t}
            locale={locale}
          />
        ) : activeUser.role === "parent" ? (
          <ParentTodaySection
            user={activeUser}
            lessons={lessons}
            classState={classState}
            completedLessons={completedLessons}
            lessonCount={lessons.length}
            overallProgress={overallProgress}
            moduleProgress={moduleProgress}
            onOpenLesson={handleOpenLesson}
            t={t}
          />
        ) : (
          <TodaySection
            userRole={activeUser.role}
            teacherId={undefined}
            nextLesson={nextLesson}
            classState={classState}
            overallProgress={overallProgress}
            completedLessons={completedLessons}
            lessonCount={lessons.length}
            moduleProgress={moduleProgress}
            activityFeed={activityFeed}
            lessons={lessons}
            onOpenLessonForClass={handleOpenLessonForClass}
            onCloseLessonForClass={handleCloseLessonForClass}
            t={t}
          />
        )
      ) : null}

      {visibleSection === "lessons" ? (
        activeUser.role === "teacher" && !activeLessonSlug ? (
          <TeacherLessonsSection
            lessons={lessons}
            moduleProgress={moduleProgress}
            classState={classState}
            onOpenLessonForClass={handleOpenLessonForClass}
            onCloseLessonForClass={handleCloseLessonForClass}
            onPreviewLesson={handleOpenLesson}
            t={t}
          />
        ) : (
          <LessonsSection
            lessons={lessons}
            moduleProgress={moduleProgress}
            completedLessonSlugs={completedLessonSlugs}
            nextLesson={nextLesson}
            userRole={activeUser.role}
            activeLessonSlug={activeLessonSlug}
            onOpenLesson={handleOpenLesson}
            onBackToLessons={handleBackToLessons}
            t={t}
          />
        )
      ) : null}

      {visibleSection === "account" ? (
        <AccountSection
          user={activeUser}
          roleLabel={roleLabels[activeUser.role]}
          nextLesson={nextLesson}
          t={t}
        />
      ) : null}

      {visibleSection === "family" ? (
        <FamilySection
          user={activeUser}
          lessonCount={lessons.length}
          completedLessons={completedLessons}
          t={t}
        />
      ) : null}

      {visibleSection === "teacher" && activeUser.role !== "teacher" ? (
        <TeacherClassSection
          user={activeUser}
          students={students}
          classState={classState}
          lessons={lessons}
          onOpenLesson={handleOpenLessonForClass}
          onCloseLesson={handleCloseLessonForClass}
          onStudentAdded={refreshStudents}
          t={t}
        />
      ) : null}

      {visibleSection === "progress" ? (
        <ProgressSection
          overallProgress={overallProgress}
          completedLessons={completedLessons}
          lessonCount={lessons.length}
          moduleProgress={moduleProgress}
          activityFeed={activityFeed}
          t={t}
        />
      ) : null}
    </CabinetShell>
  );
}
