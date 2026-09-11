"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { CabinetShell } from "@/components/cabinet-shell";
import { LessonExperience } from "@/components/lesson-experience";
import { LessonMaterial } from "@/components/lesson-material";
import { useLocale } from "@/components/locale-provider";
import { Mascot } from "@/components/mascot";
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
  };
  teacherId?: string;
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

const dict = {
  ru: {
    // section catalog (default)
    sec_today_label: "Сегодня",
    sec_today_caption: "урок и действия",
    sec_today_title: "Сегодня",
    sec_today_desc: "Рабочая сводка на день: следующий урок, ближайшие действия, короткий прогресс и последняя активность.",
    sec_lessons_label: "Уроки",
    sec_lessons_caption: "модули и занятия",
    sec_lessons_title: "Уроки",
    sec_lessons_desc: "Все модули и уроки открываются внутри кабинета, без отдельного экрана курса.",
    sec_progress_label: "Прогресс",
    sec_progress_caption: "история обучения",
    sec_progress_title: "Прогресс",
    sec_progress_desc: "История прогресса по модулям, завершенным урокам и результатам без смешивания с профилем.",
    sec_account_label: "Учетная запись",
    sec_account_caption: "профиль и вход",
    sec_account_title: "Учетная запись",
    sec_account_desc: "Данные входа, профиль ребенка и базовые настройки учебного сопровождения в одном разделе.",
    sec_family_label: "Семья",
    sec_family_caption: "домашний ритм",
    sec_family_title: "Семья",
    sec_family_desc: "Домашний контур сопровождения: взрослый, ритм занятий и понятные действия после урока.",
    sec_teacher_label: "Педагог",
    sec_teacher_caption: "наблюдения",
    sec_teacher_title: "Педагог",
    sec_teacher_desc: "Педагогическая зона с наблюдениями по темпу, ближайшим фокусом и ссылкой на уроки.",

    // parent overrides
    parent_today_label: "Мой ребёнок",
    parent_today_caption: "что происходит",
    parent_today_title: "Мой ребёнок",
    parent_today_desc: "Главное о ребёнке за сегодня.",
    parent_family_label: "Анкеты и дом",
    parent_family_caption: "опросник и поддержка",
    parent_family_title: "Анкеты и помощь дома",
    parent_family_desc: "Опросник программы и подсказки для дома.",
    parent_account_label: "Профиль",
    parent_account_caption: "контакты семьи",
    parent_account_title: "Профиль семьи",
    parent_account_desc: "Контакты и данные ребёнка.",

    // student overrides
    student_today_label: "Старт",
    student_today_caption: "что делать сейчас",
    student_today_title: "Мой урок",
    student_today_desc: "Простой кабинет ученика: крупные действия, короткие подсказки и только нужные учебные разделы.",
    student_lessons_label: "Уроки",
    student_lessons_caption: "выбрать занятие",
    student_lessons_title: "Мои уроки",
    student_lessons_desc: "Один модуль и один урок за раз. Ничего лишнего вокруг учебного действия.",
    student_progress_label: "Успехи",
    student_progress_caption: "что уже сделано",
    student_progress_title: "Мои успехи",
    student_progress_desc: "Короткая история занятий и понятный прогресс без лишних таблиц.",
    student_account_label: "Помощь",
    student_account_caption: "взрослый рядом",
    student_account_title: "Помощь и профиль",
    student_account_desc: "Кто помогает, какой класс и какие подсказки нужны на уроке.",

    // teacher overrides
    teacher_today_label: "Главная",
    teacher_today_caption: "урок и ученики",
    teacher_today_title: "Главная",
    teacher_today_desc: "Управление уроком и класс на одном экране: открыть урок, видеть кто как работает, добавить ученика.",
    teacher_lessons_label: "Программа",
    teacher_lessons_caption: "14 уроков, 5 модулей",
    teacher_lessons_title: "Программа курса",
    teacher_lessons_desc: "Все уроки программы: открыть для класса, посмотреть план или пройти самому.",
    teacher_progress_label: "Динамика",
    teacher_progress_caption: "результаты класса",
    teacher_progress_title: "Динамика обучения",
    teacher_progress_desc: "Прогресс по модулям, журнал уроков и точки внимания для следующего занятия.",
    teacher_account_label: "Профиль",
    teacher_account_caption: "данные педагога",
    teacher_account_title: "Профиль педагога",
    teacher_account_desc: "Данные входа, школа и класс. Здесь же — настройки исследовательского режима.",

    // formatDate / activity feed
    notYet: "ещё нет",
    locale: "ru-RU",
    activity_start_label: "Старт",
    activity_start_title: "Кабинет готов к первому уроку",
    activity_start_text: "Откройте следующий шаг и начните с короткого занятия.",
    activity_lessons_label: "Уроки",
    activity_lessons_title: "Модули доступны в разделе «Уроки»",
    activity_lessons_text: "Можно выбрать модуль и пройти урок в спокойном темпе.",
    lessonCompletedFallback: "Урок завершен",
    scoreResult: (n: number) => `Результат проверки: ${n} из 3.`,
    lessonMarkedDone: "Урок отмечен как пройденный.",
    moduleCompleted: "Модуль завершен",

    // student today
    aria_student_start: "Старт ученика",
    hello_ready: (name: string) => `Привет, ${name}! Сегодня один главный шаг: нажми «Начать».`,
    hello_waiting: (name: string) => `Привет, ${name}! Сейчас просто подожди. Учитель откроет урок.`,
    hello_greeting: (name: string) => `Привет, ${name}!`,
    today_have_lesson: "Сегодня у тебя урок:",
    next_lesson_fallback: "Следующий урок",
    btn_start: "Начать",
    lesson_of: (n: number, total: number) => `Урок ${n} из ${total}`,
    wait_teacher_title: "Подожди учителя",
    wait_teacher_text: "Учитель скоро откроет урок.",
    stars_aria: (done: number, total: number) => `${done} из ${total} уроков пройдено`,

    // helpers
    not_logged_in: "ещё не входил",
    today_at: (t: string) => `сегодня в ${t}`,
    days_ago: (n: number) => `${n} дн. назад`,
    long_ago: "давно не был",
    code_eyebrow: (cls: string) => `Класс ${cls}`,
    code_hint: "Введи этот код, чтобы войти в кабинет UQUVLI.",
    print_codes_title: (n: number) => `Коды входа учеников · ${n} шт.`,

    // teacher lessons section
    download_failed: "Не удалось скачать план урока.",
    trainer_phone: "Звонок",
    aria_lessons: "Уроки",
    program_title: "Программа курса",
    program_subtitle: "14 уроков в 5 модулях. Откройте урок классу, скачайте план или пройдите сами.",
    lessons_count_short: (n: number) => `${n} уроков`,
    trainer_label: (name: string) => `Тренажёр: ${name}`,
    live_now: "идёт сейчас",
    btn_close: "Закрыть",
    btn_open_for_class: "Открыть классу",
    other_actions: "Другие действия",
    downloading: "Скачивание...",
    lesson_plan_docx: "План урока .docx",
    try_yourself: "Пройти самому",

    // teacher today / class
    aria_teacher_home: "Главная педагога",
    lesson_in_progress: "Урок идёт сейчас",
    next_lesson_label: "Следующий урок",
    course_done: "Курс завершён",
    opened_at: (t: string) => `Открыт в ${t}. Ученики могут войти по своему коду.`,
    passed: "Прошли:",
    in_work: "В работе:",
    not_started_p: "Не начали:",
    lesson_plan_label: "План урока:",
    close_lesson: "Закрыть урок",
    open_lesson_for_class: "Открыть урок для класса",
    full_program: "Вся программа →",
    school_default: "Школа",
    class_short: (c: string) => `Класс ${c}`,
    students_count: (n: number) => `${n} учеников`,
    print_codes: "Распечатать коды",
    hide_form: "Скрыть форму",
    add_student: "Добавить ученика",
    new_student: "Новый ученик",
    student_name_label: "Имя ученика",
    student_name_placeholder: "Например, Алина К.",
    research_group: "Исследовательская группа",
    group_experimental: "Экспериментальная",
    group_control: "Контрольная",
    enter_student_name: "Введите имя ученика",
    adding: "Добавляю...",
    btn_create: "Создать",
    btn_cancel: "Отмена",
    err_default: "Ошибка",
    err_add_default: "Ошибка при добавлении.",
    no_codes_yet: "У учеников ещё нет кодов входа.",
    print_codes_for_class: (c: string) => `Коды входа · класс ${c}`,
    all_students: "Все ученики",
    on_lesson_prefix: (t: string) => `На уроке: ${t}`,
    class_word: "Класс",
    of_count: (a: number, b: number) => `${a} из ${b}`,
    no_students_yet: "Учеников пока нет. Нажмите «Добавить ученика» сверху, чтобы создать первого.",
    no_students_in_group: "В этой группе ещё нет учеников.",
    no_students_short: "Учеников пока нет. Нажмите «Добавить ученика» сверху.",
    code_word: "Код",
    lesson_word: "Урок",
    of_word: "из",
    passed_short: "Прошёл",
    in_work_short: "В работе",
    not_started_short: "Не начал",
    today_word: "Сегодня",
    recently: "Недавно",
    dash: "—",
    group_exp_short: "Эксп.",
    group_ctrl_short: "Контр.",

    // parent today
    your_child: "Ваш ребёнок",
    aria_parent: "Кабинет родителя",
    fill_final_questionnaire: "Заполните выходную анкету",
    final_questionnaire_hint: "Финальная анкета — последний шаг участия в исследовании.",
    fill: "Заполнить",
    now_in_class: "Сейчас в классе",
    parent_lesson_open_text: (name: string) => `Учитель открыл этот урок — ${name} может зайти и проходить занятие. Вы можете посмотреть, чему учат.`,
    view_lesson: "Посмотреть урок",
    lesson_not_open_yet: "Урок ещё не открыт",
    parent_lesson_closed_text: (name: string) => `Когда учитель откроет занятие, оно появится здесь — и ${name} сможет начать.`,
    progress_by_topics: "Прогресс по темам",
    today_section: "Сегодня",
    earlier: "Ранее",
    parent_feed_no_marks: (lessonTitle: string, name: string, fem: string) =>
      `Урок «${lessonTitle}» открыт. Пока ${name} ничего не отметил${fem} в кабинете.`,
    parent_feed_idle: "Учитель пока не открывал урок — ждём начала занятия.",
    feed_child_passed: (name: string, fem: string, lesson: string) =>
      `${name} прошёл${fem} урок «${lesson}»`,
    feed_lesson_done: "Урок завершён",
    feed_teacher_opened: (t: string) => `Учитель открыл урок «${t}»`,

    // today section (generic)
    aria_today: "Сегодня",
    class_kicker: "Класс",
    open_lesson_now: (t: string) => `Открыт: ${t}`,
    lesson_not_open_class: "Урок не открыт для класса",
    students_can_join_now: "Ученики могут войти и начать занятие прямо сейчас.",
    press_open_to_let_join: "Нажмите «Открыть урок» чтобы ученики могли войти.",
    home_rhythm_kicker: "Домашний ритм",
    home_rhythm_title: "10-15 минут спокойного занятия",
    home_rhythm_text: "Один урок лучше проходить без параллельных вкладок и лишних заданий.",
    next_step: "Следующий шаг",
    choose_first_lesson: "Выберите первый урок",
    lessons_ready: "Уроки готовы к старту.",
    module_word: "Модуль",
    lessons_section: "Раздел уроков",
    continue_with: (t: string) => `Продолжить: ${t}.`,
    pick_next_module: "Посмотрите модули и выберите следующий учебный блок.",
    lesson_control_kicker: "Управление уроком",
    lesson_not_open: "Урок не открыт",
    state_open: "Открыт",
    state_closed: "Закрыт",
    opened_at_short: (t: string) => `Открыт в ${t}. Ученики могут войти и начать.`,
    close_lesson_for_class: "Закрыть урок для класса",
    students_see_lock: "Ученики видят замок и не могут начать урок. Откройте урок, чтобы они могли войти.",
    open_for_class_with: (t: string) => `Открыть для класса: ${t}`,
    start_learning: "Начните обучение",
    start_word: "старт",
    open_lessons_and_start: "Откройте раздел уроков и начните первый урок.",
    one_screen_one_action: "один экран = одно действие",
    upcoming_actions: "Ближайшие действия",
    what_to_do_today: "Что сделать сегодня",
    short_progress: "Краткий прогресс",
    pct_of_course: (n: number) => `${n}% курса`,
    recent_activity: "Недавняя активность",
    latest_events: "Последние события",

    // teacher class section
    aria_teacher_class: "Управление классом",
    students_list: "Список учеников",
    student_word: "Ученик",
    group_word: "Группа",
    progress_word: "Прогресс",
    status_word: "Статус",
    online: "Онлайн",
    offline: "Оффлайн",
    how_codes_work: "Как пользоваться кодами входа",
    codes_step1: "Каждый ученик получает уникальный 4-значный код при добавлении.",
    codes_step2: "Распечатайте коды и раздайте перед уроком.",
    codes_step3: "Ученик вводит код на экране входа — пароль не нужен.",
    codes_step4: "Код не меняется — можно записать в дневнике.",

    // lessons section
    aria_lesson_material: "Материал урока",
    aria_lesson_trainer: "Учебный тренажер",
    back: "Назад",
    to_lesson_list: "К списку уроков",
    aria_student_lessons: "Уроки",
    student_lessons_wait: "Учитель откроет нужный урок. Ты увидишь его на главном экране.",
    aria_modules: "Модули",
    modules_kicker: "Модули",
    modules_title: "Разделы курса",
    course_word: "Курс",
    lesson_n: (n: number) => `Урок ${n}`,
    completed_short: "пройден",
    chosen: "Выбрано",
    show: "Показать",
    lesson_card_kicker: "Карточка урока",
    pick_lesson: "Выберите урок",
    open_one_module: "Откройте один модуль и выберите урок.",
    view_material: "Посмотреть материал",
    lessons_short_count: (n: number) => `${n} уроков`,

    // account section
    aria_account: "Учетная запись",
    label_name: "Имя",
    label_email: "Email",
    label_mode: "Режим",
    label_class: "Класс",
    label_teacher: "Педагог",
    label_org: "Организация",
    label_group: "Группа",
    label_role: "Роль",
    label_student: "Ученик",
    account_data_kicker: "Данные учетной записи",
    supports_kicker: "Опоры",
    student_supports_title: "Что помогает учиться",
    adult_supports_title: "Настройки сопровождения",
    student_support_1: "Читать только один короткий блок за раз.",
    student_support_2: "Если непонятно, нажать помощь и попросить взрослого объяснить шаг.",
    student_support_3: "После урока можно остановиться, даже если остались другие темы.",
    teacher_support_1: "Оставлять короткое наблюдение после каждого занятия.",
    teacher_support_2: "Сравнивать темп ученика с предыдущим уроком, а не со всей группой.",
    teacher_support_3: "Давать семье один домашний повтор вместо длинного списка.",
    parent_support_1: "Короткие инструкции перед каждым действием.",
    parent_support_2: "Один вопрос на экране без визуального перегруза.",
    parent_support_3: "Пауза после ответа, чтобы ребенок успел проговорить решение.",
    quick_jump: "Быстрый переход",
    next_lesson_short: "Ближайший урок",
    lesson_will_be_chosen: "Урок будет выбран из раздела уроков.",
    open_lessons_tab: "Откройте вкладку «Уроки», чтобы перейти к занятию.",

    // questionnaire
    save_questionnaire_failed: "Не удалось сохранить анкету.",
    questionnaire_saved: "Анкета сохранена. Спасибо!",
    close_word: "Закрыть",
    saving: "Сохраняю...",
    submit_questionnaire: "Отправить анкету",
    research_kicker: "Исследование",
    parent_questionnaires: "Анкеты родителя",
    filled_a: "Заполнена",
    fill_before_start: "Заполните до начала занятий",
    need_fill: "Нужно заполнить",
    initial_questionnaire: "Входная анкета",
    final_questionnaire: "Выходная анкета",
    filled_on: (date: string) => `Заполнена ${date}`,
    all_lessons_done_fill_final: "Все уроки пройдены — заполните итоговую анкету",
    opens_after: (total: number, current: number) => `Откроется после ${total} уроков (сейчас ${current})`,
    closed_yet: "Пока закрыта",

    // family section
    aria_family: "Анкеты и помощь дома",
    label_adult: "Взрослый",
    label_post: "Почта",
    label_child: "Ребенок",
    home_rhythm_step_1: "Перед уроком договориться о коротком времени: 10-15 минут.",
    home_rhythm_step_2: "После урока спросить, что было самым понятным и что повторить.",
    home_rhythm_step_3: "Если ребенок устал, остановиться на текущем шаге и вернуться позже.",
    home_rhythm_caption: "Как поддерживать занятия дома",
    step_n: (n: number) => `Шаг ${n}`,
    family_profile_kicker: "Семейный профиль",
    contacts_context: "Контакты и контекст",
    note_kicker: "Заметка",
    individual_support: "Индивидуальная поддержка",

    // progress section
    aria_progress: "Прогресс",
    history_kicker: "История прогресса",
    course_dynamics: "Динамика по курсу",
    modules_word: "Модули",
    next_short: (t: string) => `Следующее: ${t}`,
    journal: "Журнал",

    // shell
    cabinet: "Кабинет",

    // console errors
    err_open_lesson: "Не удалось открыть урок",
    err_close_lesson: "Не удалось закрыть урок",
    err_download_plan: "Не удалось скачать план урока",
  },
  uz: {
    sec_today_label: "Bugun",
    sec_today_caption: "dars va harakatlar",
    sec_today_title: "Bugun",
    sec_today_desc: "Kun uchun ish xulosasi: keyingi dars, eng yaqin harakatlar, qisqa yutuqlar va soʻnggi faollik.",
    sec_lessons_label: "Darslar",
    sec_lessons_caption: "modullar va mashgʻulotlar",
    sec_lessons_title: "Darslar",
    sec_lessons_desc: "Barcha modullar va darslar kabinet ichida ochiladi, alohida kurs ekransiz.",
    sec_progress_label: "Yutuqlar",
    sec_progress_caption: "oʻqish tarixi",
    sec_progress_title: "Yutuqlar",
    sec_progress_desc: "Modullar, yakunlangan darslar va natijalar boʻyicha yutuqlar tarixi — profil bilan aralashtirilmagan.",
    sec_account_label: "Hisob",
    sec_account_caption: "profil va kirish",
    sec_account_title: "Hisob",
    sec_account_desc: "Kirish maʼlumotlari, bola profili va oʻquv kuzatuvining asosiy sozlamalari bir boʻlimda.",
    sec_family_label: "Oila",
    sec_family_caption: "uy ritmi",
    sec_family_title: "Oila",
    sec_family_desc: "Uydagi kuzatuv: kattalar, mashgʻulot ritmi va darsdan keyingi tushunarli harakatlar.",
    sec_teacher_label: "Pedagog",
    sec_teacher_caption: "kuzatuvlar",
    sec_teacher_title: "Pedagog",
    sec_teacher_desc: "Pedagogik zona: sur'at boʻyicha kuzatuvlar, eng yaqin fokus va darslarga havola.",

    parent_today_label: "Bolam",
    parent_today_caption: "nima boʻlmoqda",
    parent_today_title: "Bolam",
    parent_today_desc: "Bola haqida bugungi asosiy maʼlumot.",
    parent_family_label: "Anketalar va uy",
    parent_family_caption: "soʻrovnoma va yordam",
    parent_family_title: "Anketalar va uyda yordam",
    parent_family_desc: "Dastur soʻrovnomasi va uy uchun maslahatlar.",
    parent_account_label: "Profil",
    parent_account_caption: "oilaning aloqalari",
    parent_account_title: "Oila profili",
    parent_account_desc: "Bolaning aloqalari va maʼlumotlari.",

    student_today_label: "Start",
    student_today_caption: "hozir nima qilish kerak",
    student_today_title: "Mening darsim",
    student_today_desc: "Oʻquvchining oddiy kabineti: yirik harakatlar, qisqa maslahatlar va faqat kerakli oʻquv boʻlimlari.",
    student_lessons_label: "Darslar",
    student_lessons_caption: "mashgʻulot tanlash",
    student_lessons_title: "Mening darslarim",
    student_lessons_desc: "Bir vaqtda bitta modul va bitta dars. Oʻquv harakatining atrofida hech narsa ortiqcha emas.",
    student_progress_label: "Yutuqlar",
    student_progress_caption: "nima qilingan",
    student_progress_title: "Yutuqlarim",
    student_progress_desc: "Mashgʻulotlarning qisqa tarixi va ortiqcha jadvallarsiz tushunarli yutuqlar.",
    student_account_label: "Yordam",
    student_account_caption: "yondagi katta",
    student_account_title: "Yordam va profil",
    student_account_desc: "Kim yordam beradi, qaysi sinf va darsda qanday maslahatlar kerak.",

    teacher_today_label: "Bosh sahifa",
    teacher_today_caption: "dars va oʻquvchilar",
    teacher_today_title: "Bosh sahifa",
    teacher_today_desc: "Bitta ekranda darsni boshqarish va sinfni koʻrish: darsni ochish, kim qanday ishlayotganini koʻrish, oʻquvchi qoʻshish.",
    teacher_lessons_label: "Dastur",
    teacher_lessons_caption: "14 ta dars, 5 ta modul",
    teacher_lessons_title: "Kurs dasturi",
    teacher_lessons_desc: "Dasturning barcha darslari: sinfga ochish, rejani koʻrish yoki oʻzingiz oʻtish.",
    teacher_progress_label: "Dinamika",
    teacher_progress_caption: "sinf natijalari",
    teacher_progress_title: "Oʻqitish dinamikasi",
    teacher_progress_desc: "Modullar boʻyicha yutuqlar, darslar jurnali va keyingi dars uchun eʼtibor nuqtalari.",
    teacher_account_label: "Profil",
    teacher_account_caption: "pedagog maʼlumotlari",
    teacher_account_title: "Pedagog profili",
    teacher_account_desc: "Kirish maʼlumotlari, maktab va sinf. Shu yerda — tadqiqot rejimi sozlamalari.",

    notYet: "hali yoʻq",
    locale: "uz-UZ",
    activity_start_label: "Start",
    activity_start_title: "Kabinet birinchi darsga tayyor",
    activity_start_text: "Keyingi qadamni oching va qisqa mashgʻulot bilan boshlang.",
    activity_lessons_label: "Darslar",
    activity_lessons_title: "Modullar «Darslar» boʻlimida mavjud",
    activity_lessons_text: "Modulni tanlab, darsni xotirjam sur'atda oʻtish mumkin.",
    lessonCompletedFallback: "Dars yakunlandi",
    scoreResult: (n: number) => `Tekshiruv natijasi: 3 dan ${n}.`,
    lessonMarkedDone: "Dars oʻtilgan deb belgilandi.",
    moduleCompleted: "Modul yakunlandi",

    aria_student_start: "Oʻquvchi starti",
    hello_ready: (name: string) => `Salom, ${name}! Bugun bitta asosiy qadam: «Boshlash»ni bos.`,
    hello_waiting: (name: string) => `Salom, ${name}! Hozir biroz kutib tur. Oʻqituvchi darsni ochadi.`,
    hello_greeting: (name: string) => `Salom, ${name}!`,
    today_have_lesson: "Bugun sening darsing bor:",
    next_lesson_fallback: "Keyingi dars",
    btn_start: "Boshlash",
    lesson_of: (n: number, total: number) => `${total} dan ${n}-dars`,
    wait_teacher_title: "Oʻqituvchini kutib tur",
    wait_teacher_text: "Oʻqituvchi tez orada darsni ochadi.",
    stars_aria: (done: number, total: number) => `${total} ta darsdan ${done} tasi oʻtildi`,

    not_logged_in: "hali kirmagan",
    today_at: (t: string) => `bugun soat ${t}`,
    days_ago: (n: number) => `${n} kun oldin`,
    long_ago: "ancha vaqt boʻldi",
    code_eyebrow: (cls: string) => `${cls}-sinf`,
    code_hint: "UQUVLI kabinetiga kirish uchun shu kodni kirit.",
    print_codes_title: (n: number) => `Oʻquvchilar kirish kodlari · ${n} ta`,

    download_failed: "Dars rejasini yuklab boʻlmadi.",
    trainer_phone: "Qoʻngʻiroq",
    aria_lessons: "Darslar",
    program_title: "Kurs dasturi",
    program_subtitle: "5 ta modulda 14 ta dars. Darsni sinfga oching, rejani yuklab oling yoki oʻzingiz oʻting.",
    lessons_count_short: (n: number) => `${n} ta dars`,
    trainer_label: (name: string) => `Mashq: ${name}`,
    live_now: "hozir oʻtmoqda",
    btn_close: "Yopish",
    btn_open_for_class: "Sinfga ochish",
    other_actions: "Boshqa harakatlar",
    downloading: "Yuklab olinmoqda...",
    lesson_plan_docx: "Dars rejasi .docx",
    try_yourself: "Oʻzim oʻtaman",

    aria_teacher_home: "Pedagog bosh sahifasi",
    lesson_in_progress: "Dars hozir oʻtmoqda",
    next_lesson_label: "Keyingi dars",
    course_done: "Kurs yakunlandi",
    opened_at: (t: string) => `${t} da ochildi. Oʻquvchilar oʻz kodi bilan kirishlari mumkin.`,
    passed: "Oʻtdi:",
    in_work: "Ishlamoqda:",
    not_started_p: "Boshlamadi:",
    lesson_plan_label: "Dars rejasi:",
    close_lesson: "Darsni yopish",
    open_lesson_for_class: "Darsni sinfga ochish",
    full_program: "Butun dastur →",
    school_default: "Maktab",
    class_short: (c: string) => `${c}-sinf`,
    students_count: (n: number) => `${n} ta oʻquvchi`,
    print_codes: "Kodlarni chop etish",
    hide_form: "Formani yashirish",
    add_student: "Oʻquvchi qoʻshish",
    new_student: "Yangi oʻquvchi",
    student_name_label: "Oʻquvchi ismi",
    student_name_placeholder: "Masalan, Alina K.",
    research_group: "Tadqiqot guruhi",
    group_experimental: "Eksperimental",
    group_control: "Nazorat",
    enter_student_name: "Oʻquvchi ismini kiriting",
    adding: "Qoʻshilmoqda...",
    btn_create: "Yaratish",
    btn_cancel: "Bekor qilish",
    err_default: "Xatolik",
    err_add_default: "Qoʻshishda xatolik.",
    no_codes_yet: "Oʻquvchilarda hali kirish kodlari yoʻq.",
    print_codes_for_class: (c: string) => `Kirish kodlari · ${c}-sinf`,
    all_students: "Barcha oʻquvchilar",
    on_lesson_prefix: (t: string) => `Darsda: ${t}`,
    class_word: "Sinf",
    of_count: (a: number, b: number) => `${b} dan ${a}`,
    no_students_yet: "Hali oʻquvchilar yoʻq. Birinchi oʻquvchini yaratish uchun yuqoridagi «Oʻquvchi qoʻshish» tugmasini bosing.",
    no_students_in_group: "Bu guruhda hali oʻquvchilar yoʻq.",
    no_students_short: "Hali oʻquvchilar yoʻq. Yuqoridagi «Oʻquvchi qoʻshish» tugmasini bosing.",
    code_word: "Kod",
    lesson_word: "Dars",
    of_word: "dan",
    passed_short: "Oʻtdi",
    in_work_short: "Ishlamoqda",
    not_started_short: "Boshlamagan",
    today_word: "Bugun",
    recently: "Yaqinda",
    dash: "—",
    group_exp_short: "Eksp.",
    group_ctrl_short: "Nazor.",

    your_child: "Sizning bolangiz",
    aria_parent: "Ota-ona kabineti",
    fill_final_questionnaire: "Yakuniy anketani toʻldiring",
    final_questionnaire_hint: "Yakuniy anketa — tadqiqotda ishtirokning oxirgi qadami.",
    fill: "Toʻldirish",
    now_in_class: "Hozir sinfda",
    parent_lesson_open_text: (name: string) => `Oʻqituvchi shu darsni ochdi — ${name} kirib mashgʻulotni oʻtishi mumkin. Siz nimaga oʻrgatilayotganini koʻrishingiz mumkin.`,
    view_lesson: "Darsni koʻrish",
    lesson_not_open_yet: "Dars hali ochilmagan",
    parent_lesson_closed_text: (name: string) => `Oʻqituvchi darsni ochganda u shu yerda paydo boʻladi — va ${name} boshlay oladi.`,
    progress_by_topics: "Mavzular boʻyicha yutuqlar",
    today_section: "Bugun",
    earlier: "Ilgari",
    parent_feed_no_marks: (lessonTitle: string, name: string, fem: string) =>
      `«${lessonTitle}» darsi ochilgan. Hozircha ${name} kabinetda hech narsa belgilamadi${fem}.`,
    parent_feed_idle: "Oʻqituvchi hali darsni ochmagan — mashgʻulot boshlanishini kutmoqdamiz.",
    feed_child_passed: (name: string, fem: string, lesson: string) =>
      `${name} «${lesson}» darsini oʻtdi${fem}`,
    feed_lesson_done: "Dars yakunlandi",
    feed_teacher_opened: (t: string) => `Oʻqituvchi «${t}» darsini ochdi`,

    aria_today: "Bugun",
    class_kicker: "Sinf",
    open_lesson_now: (t: string) => `Ochildi: ${t}`,
    lesson_not_open_class: "Sinfga dars ochilmagan",
    students_can_join_now: "Oʻquvchilar hozir kirib darsni boshlashlari mumkin.",
    press_open_to_let_join: "Oʻquvchilar kirishi uchun «Darsni ochish» tugmasini bosing.",
    home_rhythm_kicker: "Uy ritmi",
    home_rhythm_title: "10-15 daqiqa xotirjam mashgʻulot",
    home_rhythm_text: "Bir darsni parallel oynalar va ortiqcha topshiriqlarsiz oʻtgan maʼqul.",
    next_step: "Keyingi qadam",
    choose_first_lesson: "Birinchi darsni tanlang",
    lessons_ready: "Darslar boshlashga tayyor.",
    module_word: "Modul",
    lessons_section: "Darslar boʻlimi",
    continue_with: (t: string) => `Davom ettiring: ${t}.`,
    pick_next_module: "Modullarni koʻrib chiqing va keyingi oʻquv blokini tanlang.",
    lesson_control_kicker: "Darsni boshqarish",
    lesson_not_open: "Dars ochilmagan",
    state_open: "Ochiq",
    state_closed: "Yopiq",
    opened_at_short: (t: string) => `${t} da ochildi. Oʻquvchilar kirib boshlashlari mumkin.`,
    close_lesson_for_class: "Sinf uchun darsni yopish",
    students_see_lock: "Oʻquvchilar qulfni koʻrmoqda va darsni boshlay olmaydi. Ular kirishi uchun darsni oching.",
    open_for_class_with: (t: string) => `Sinfga ochish: ${t}`,
    start_learning: "Oʻqishni boshlang",
    start_word: "start",
    open_lessons_and_start: "Darslar boʻlimini oching va birinchi darsni boshlang.",
    one_screen_one_action: "bitta ekran = bitta harakat",
    upcoming_actions: "Eng yaqin harakatlar",
    what_to_do_today: "Bugun nima qilish kerak",
    short_progress: "Qisqa yutuqlar",
    pct_of_course: (n: number) => `kursning ${n}%`,
    recent_activity: "Yaqinda faollik",
    latest_events: "Soʻnggi hodisalar",

    aria_teacher_class: "Sinfni boshqarish",
    students_list: "Oʻquvchilar roʻyxati",
    student_word: "Oʻquvchi",
    group_word: "Guruh",
    progress_word: "Yutuqlar",
    status_word: "Holat",
    online: "Onlayn",
    offline: "Oflayn",
    how_codes_work: "Kirish kodlaridan qanday foydalanish kerak",
    codes_step1: "Har bir oʻquvchi qoʻshilganda noyob 4 xonali kod oladi.",
    codes_step2: "Kodlarni chop etib darsdan oldin tarqating.",
    codes_step3: "Oʻquvchi kirish ekranida kodni kiritadi — parol kerak emas.",
    codes_step4: "Kod oʻzgarmaydi — uni kundalikka yozib qoʻyish mumkin.",

    aria_lesson_material: "Dars materiali",
    aria_lesson_trainer: "Oʻquv mashqi",
    back: "Orqaga",
    to_lesson_list: "Darslar roʻyxatiga",
    aria_student_lessons: "Darslar",
    student_lessons_wait: "Oʻqituvchi kerakli darsni ochadi. Sen uni bosh ekranda koʻrasan.",
    aria_modules: "Modullar",
    modules_kicker: "Modullar",
    modules_title: "Kurs boʻlimlari",
    course_word: "Kurs",
    lesson_n: (n: number) => `${n}-dars`,
    completed_short: "oʻtildi",
    chosen: "Tanlandi",
    show: "Koʻrsatish",
    lesson_card_kicker: "Dars kartochkasi",
    pick_lesson: "Darsni tanlang",
    open_one_module: "Bitta modulni oching va darsni tanlang.",
    view_material: "Materialni koʻrish",
    lessons_short_count: (n: number) => `${n} ta dars`,

    aria_account: "Hisob",
    label_name: "Ism",
    label_email: "E-pochta",
    label_mode: "Rejim",
    label_class: "Sinf",
    label_teacher: "Oʻqituvchi",
    label_org: "Tashkilot",
    label_group: "Guruh",
    label_role: "Rol",
    label_student: "Oʻquvchi",
    account_data_kicker: "Hisob maʼlumotlari",
    supports_kicker: "Tayanchlar",
    student_supports_title: "Nima oʻrganishga yordam beradi",
    adult_supports_title: "Kuzatuv sozlamalari",
    student_support_1: "Bir vaqtda faqat bitta qisqa blokni oʻqish.",
    student_support_2: "Tushunarli boʻlmasa, yordamni bosib, kattadan qadamni tushuntirib berishni soʻrash.",
    student_support_3: "Darsdan keyin boshqa mavzular qolsa ham toʻxtash mumkin.",
    teacher_support_1: "Har bir mashgʻulotdan keyin qisqa kuzatuv qoldirish.",
    teacher_support_2: "Oʻquvchi sur'atini butun guruh bilan emas, oldingi dars bilan solishtirish.",
    teacher_support_3: "Oilaga uzun roʻyxat oʻrniga bitta uy takrorlanishini berish.",
    parent_support_1: "Har bir harakatdan oldin qisqa koʻrsatma.",
    parent_support_2: "Ekranda bitta savol — koʻzni charchatuvchi narsa yoʻq.",
    parent_support_3: "Javobdan keyin pauza, bola yechimni aytishga ulgursin.",
    quick_jump: "Tezkor oʻtish",
    next_lesson_short: "Eng yaqin dars",
    lesson_will_be_chosen: "Dars darslar boʻlimidan tanlanadi.",
    open_lessons_tab: "Mashgʻulotga oʻtish uchun «Darslar» yorligʻini oching.",

    save_questionnaire_failed: "Anketani saqlab boʻlmadi.",
    questionnaire_saved: "Anketa saqlandi. Rahmat!",
    close_word: "Yopish",
    saving: "Saqlanmoqda...",
    submit_questionnaire: "Anketani yuborish",
    research_kicker: "Tadqiqot",
    parent_questionnaires: "Ota-ona anketalari",
    filled_a: "Toʻldirilgan",
    fill_before_start: "Mashgʻulotlar boshlangunga qadar toʻldiring",
    need_fill: "Toʻldirish kerak",
    initial_questionnaire: "Kirish anketasi",
    final_questionnaire: "Yakuniy anketa",
    filled_on: (date: string) => `${date} da toʻldirilgan`,
    all_lessons_done_fill_final: "Barcha darslar oʻtildi — yakuniy anketani toʻldiring",
    opens_after: (total: number, current: number) => `${total} ta darsdan keyin ochiladi (hozir ${current})`,
    closed_yet: "Hali yopiq",

    aria_family: "Anketalar va uyda yordam",
    label_adult: "Katta",
    label_post: "Pochta",
    label_child: "Bola",
    home_rhythm_step_1: "Darsdan oldin qisqa vaqt haqida kelishib oling: 10-15 daqiqa.",
    home_rhythm_step_2: "Darsdan keyin nima eng tushunarli boʻlganini va nimani takrorlash kerakligini soʻrang.",
    home_rhythm_step_3: "Bola charchasa, joriy qadamda toʻxtab, keyinroq qayting.",
    home_rhythm_caption: "Uyda mashgʻulotlarni qanday qoʻllab-quvvatlash",
    step_n: (n: number) => `${n}-qadam`,
    family_profile_kicker: "Oila profili",
    contacts_context: "Aloqalar va kontekst",
    note_kicker: "Eslatma",
    individual_support: "Individual yordam",

    aria_progress: "Yutuqlar",
    history_kicker: "Yutuqlar tarixi",
    course_dynamics: "Kurs boʻyicha dinamika",
    modules_word: "Modullar",
    next_short: (t: string) => `Keyingi: ${t}`,
    journal: "Jurnal",

    cabinet: "Shaxsiy kabinet",

    err_open_lesson: "Darsni ochib boʻlmadi",
    err_close_lesson: "Darsni yopib boʻlmadi",
    err_download_plan: "Dars rejasini yuklab boʻlmadi",
  },
};

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
  // Ученик F70: видимой навигации нет, но "lessons" нужен для перехода в урок
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
  void openLesson?.openLessonSlug;
  void activityFeed;
  void overallProgress;
  void onOpenProgress;
  void onOpenHelp;

  const openedSlug = openLesson?.openLessonSlug;
  const openedLesson = openedSlug ? lessons.find((l) => l.slug === openedSlug) : undefined;
  const heroLesson = openedLesson ?? nextLesson;
  const lessonNumber = completedLessons + 1;
  const studentName = user.profile.childName || user.name;
  const firstName = studentName.split(/\s+/)[0] || studentName;

  return (
    <section className="student-home" aria-label={t.aria_student_start}>
      <Mascot
        message={isLessonOpen ? t.hello_ready(firstName) : t.hello_waiting(firstName)}
        mood={isLessonOpen ? "cheer" : "happy"}
        variant="inline"
      />

      {/* One screen, one decision: ждать или начать */}
      <div className={`student-hero${isLessonOpen ? " student-hero--ready" : " student-hero--waiting"}`}>
        <p className="student-hero-greeting">{t.hello_greeting(firstName)}</p>

        {isLessonOpen ? (
          <>
            <p className="student-hero-instruction">{t.today_have_lesson}</p>
            <h2 className="student-hero-lesson">{heroLesson?.title ?? t.next_lesson_fallback}</h2>
            <button
              type="button"
              className="student-go-button"
              onClick={onStartLesson}
            >
              {t.btn_start}
            </button>
            <p className="student-hero-footnote">{t.lesson_of(lessonNumber, lessonCount)}</p>
          </>
        ) : (
          <>
            <div className="student-hero-illustration" aria-hidden="true">
              <CabinetIcon name="clock" />
            </div>
            <h2 className="student-hero-lesson">{t.wait_teacher_title}</h2>
            <p className="student-hero-instruction">{t.wait_teacher_text}</p>
          </>
        )}
      </div>

      {/* Звёзды по числу пройденных уроков — наглядно */}
      <div
        className="student-stars-strip"
        aria-label={t.stars_aria(completedLessons, lessonCount)}
      >
        {Array.from({ length: lessonCount }, (_, i) => {
          const isDone = i < completedLessons;

          return (
            <span
              key={i}
              className={`star-pip${isDone ? " star-pip--done" : ""}`}
              aria-hidden="true"
            >
              <CabinetIcon name={isDone ? "check" : "circle"} />
            </span>
          );
        })}
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
        <span>uquvli.uz</span>
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
    // 1. Legacy trainer field (для уроков 23, 24, 27 — phone, telegram, mygov)
    const type = lesson.trainer?.type;
    if (type === "telegram")
      return { name: "Telegram", icon: <SocialIcon name="telegram" />, tone: "telegram" };
    if (type === "gmail")
      return { name: "Gmail", icon: <CabinetIcon name="mail" />, tone: "gmail" };
    if (type === "uzum")
      return { name: "Uzum", icon: <UiIcon name="shopping" />, tone: "uzum" };
    if (type === "mygov")
      return { name: "my.gov.uz", icon: <UiIcon name="shield" />, tone: "mygov" };
    if (type === "phone")
      return { name: t.trainer_phone, icon: <CabinetIcon name="phone" />, tone: "phone" };

    // 2. Mockup в LessonPlayer — извлечь kind из practice screen
    const practiceScreen = lesson.screens?.find((s) => s.type === "practice");
    const mockup = practiceScreen && "mockup" in practiceScreen ? practiceScreen.mockup : undefined;
    const kind = mockup?.kind;
    if (!kind) return null;

    // Маппинг mockup → читаемое имя и тон
    const MOCKUP_LABELS: Record<string, { name: string; tone: string }> = {
      "thermometer":         { name: "Термометр",        tone: "phone" },
      "atm":                 { name: "Банкомат",         tone: "mygov" },
      "washing-machine":     { name: "Стиральная машина",tone: "uzum" },
      "messenger":           { name: "Мессенджер",       tone: "telegram" },
      "weather":             { name: "Прогноз погоды",   tone: "phone" },
      "product-label":       { name: "Этикетка",         tone: "uzum" },
      "train-board":         { name: "Табло вокзала",    tone: "mygov" },
      "package-tracking":    { name: "Трек посылки",     tone: "gmail" },
      "skin-quiz":           { name: "Опросник кожи",    tone: "phone" },
      "checklist":           { name: "Чек-лист",         tone: "phone" },
      "menu":                { name: "Меню блюд",        tone: "uzum" },
      "recipe":              { name: "Рецепт",           tone: "uzum" },
      "budget-form":         { name: "Бюджет",           tone: "mygov" },
      "gov-portal":          { name: "my.gov.uz",        tone: "mygov" },
      "contract":            { name: "Договор",          tone: "mygov" },
      "transport-directory": { name: "Справочник",       tone: "phone" },
      "wardrobe":            { name: "Гардероб",         tone: "uzum" },
      "table-setting":       { name: "Сервировка",       tone: "uzum" },
      "shampoo-store":       { name: "Витрина",          tone: "uzum" },
      "weekly-weather":      { name: "Прогноз недели",   tone: "phone" },
      "care-label":          { name: "Ярлык одежды",     tone: "uzum" },
      "detergent-box":       { name: "Упаковка",         tone: "uzum" },
      "oven-timer":          { name: "Таймер",           tone: "phone" },
      "ticket-booking":      { name: "Покупка билета",   tone: "mygov" },
      "phone-call":          { name: t.trainer_phone,    tone: "phone" },
      "safety-cards":        { name: "Безопасность",     tone: "mygov" },
      "volume-slider":       { name: "Громкость",        tone: "phone" },
      "diagnostic":          { name: "Диагностика",      tone: "phone" },
      "hygiene-shelf":       { name: "Предметы гигиены", tone: "phone" },
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

  // Live-режим: статистика по открытому уроку
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

      {/* ── Главное: контроль урока ── */}
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

      {/* ── Action bar: класс + действия ── */}
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

      {/* ── Фильтр групп ── */}
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

      {/* ── Список учеников ── */}
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
  onOpenAnketa,
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
  onOpenAnketa: () => void;
  t: Dict;
}) {
  const childName = user.profile.childName || t.your_child;
  const childFirstName = childName.split(/\s+/)[0] || childName;
  const childClass = user.profile.childClass || t.dash;

  // Questionnaire state
  const [initialDone, setInitialDone] = useState(false);
  const [finalDone, setFinalDone] = useState(false);

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

  // Build event feed: progress entries (lesson completions) + class state changes
  type FeedItem = { id: string; time: string; kind: "lesson" | "class"; text: string };
  const feed: FeedItem[] = [];

  user.progress.forEach((p) => {
    const lesson = lessons.find((l) => l.slug === p.lessonSlug);
    const fem = childFirstName.endsWith("а") ? "а" : "";
    feed.push({
      id: `lesson-${p.lessonSlug}-${p.completedAt}`,
      time: p.completedAt,
      kind: "lesson",
      text: lesson
        ? t.feed_child_passed(childFirstName, fem, lesson.title)
        : t.feed_lesson_done,
    });
  });

  if (classState?.openedAt && openLesson) {
    feed.push({
      id: `class-open-${classState.openedAt}`,
      time: classState.openedAt,
      kind: "class",
      text: t.feed_teacher_opened(openLesson.title),
    });
  }

  feed.sort((a, b) => (b.time > a.time ? 1 : -1));
  const todayItems = feed.filter((i) => isToday(i.time));
  const earlierItems = feed.filter((i) => !isToday(i.time)).slice(0, 5);

  // Входную анкету обрабатывает шлюз /onboarding/anketa + sticky-баннер в shell.
  // Здесь баннер показываем ТОЛЬКО для выходной — чтобы не дублировать кнопку.
  const finalPending = initialDone && !finalDone;

  return (
    <section className="parent-feed" aria-label={t.aria_parent}>

      {/* Шапка: ребёнок + прогресс компактно в одну строку */}
      <header className="parent-head parent-head--compact">
        <div className="parent-head-main">
          <strong className="parent-head-name">{childName}</strong>
          <span className="parent-head-meta">
            {childClass}
            {user.profile.organizationName ? `, ${user.profile.organizationName}` : ""}
          </span>
        </div>
        <div className="parent-head-progress">
          <div className="parent-head-progress-top">
            <strong>{completedLessons}/{lessonCount}</strong>
            <span>{overallProgress}%</span>
          </div>
          <div className="parent-progress-bar parent-progress-bar--lg">
            <div className="parent-progress-fill" style={{ width: `${overallProgress}%` }} />
          </div>
        </div>
      </header>

      {/* Выходная анкета — только когда входная уже сдана */}
      {finalPending ? (
        <article className="parent-anketa-banner">
          <div>
            <strong>{t.fill_final_questionnaire}</strong>
            <p>{t.final_questionnaire_hint}</p>
          </div>
          <button type="button" className="parent-anketa-btn" onClick={onOpenAnketa}>
            {t.fill}
          </button>
        </article>
      ) : null}

      {/* Что сейчас на уроке */}
      <article className={`parent-now-card ${openLesson ? "parent-now-card--active" : "parent-now-card--idle"}`}>
        <p className="parent-now-kicker">{t.now_in_class}</p>
        {openLesson ? (
          <>
            <h3>{openLesson.title}</h3>
            <p className="parent-now-text">
              {t.parent_lesson_open_text(childFirstName)}
            </p>
            <button
              type="button"
              className="parent-now-btn"
              onClick={() => onOpenLesson(openLesson.slug)}
            >
              {t.view_lesson}
            </button>
          </>
        ) : (
          <>
            <h3>{t.lesson_not_open_yet}</h3>
            <p className="parent-now-text">
              {t.parent_lesson_closed_text(childFirstName)}
            </p>
          </>
        )}
      </article>

      {/* Прогресс по темам */}
      {moduleProgress.length > 0 ? (
        <article className="parent-feed-card parent-feed-card--progress">
          <h3>{t.progress_by_topics}</h3>
          <div className="parent-progress-bars">
            {moduleProgress.map((module) => (
              <button
                key={module.slug}
                type="button"
                className="parent-progress-row"
                onClick={() => {
                  const nextSlug = module.nextLesson?.slug ?? module.lessons[0]?.slug;
                  if (nextSlug) onOpenLesson(nextSlug);
                }}
              >
                <div className="parent-progress-row-head">
                  <span className="parent-progress-row-title">{module.title}</span>
                  <strong className="parent-progress-row-value">{module.done}/{module.total}</strong>
                </div>
                <div className="parent-progress-bar">
                  <div className="parent-progress-fill" style={{ width: `${module.progress}%` }} />
                </div>
              </button>
            ))}
          </div>
        </article>
      ) : null}

      {/* Лента событий */}
      <article className="parent-feed-card parent-feed-card--today">
        <h3>{t.today_section}</h3>
        {todayItems.length === 0 ? (
          <p className="parent-feed-empty">
            {openLesson
              ? t.parent_feed_no_marks(openLesson.title, childFirstName, childFirstName.endsWith("а") ? "а" : "")
              : t.parent_feed_idle}
          </p>
        ) : (
          <ul className="parent-feed-list">
            {todayItems.map((item) => (
              <li key={item.id} className={`parent-feed-item parent-feed-item--${item.kind}`}>
                <span className="parent-feed-time">{formatTime(item.time, t)}</span>
                <span className="parent-feed-text">{item.text}</span>
              </li>
            ))}
          </ul>
        )}
      </article>

      {earlierItems.length > 0 ? (
        <article className="parent-feed-card parent-feed-card--earlier">
          <h3>{t.earlier}</h3>
          <ul className="parent-feed-list">
            {earlierItems.map((item) => (
              <li key={item.id} className={`parent-feed-item parent-feed-item--${item.kind}`}>
                <span className="parent-feed-time">{formatDateShort(item.time, t)}</span>
                <span className="parent-feed-text">{item.text}</span>
              </li>
            ))}
          </ul>
        </article>
      ) : null}
    </section>
  );
}

function formatDateShort(iso: string, t: Dict) {
  return new Intl.DateTimeFormat(t.locale, { day: "2-digit", month: "short" }).format(new Date(iso));
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
    // Только родитель видит читабельную методичку. Учитель и ученик — сам тренажёр.
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

  // F70-ученик не должен видеть список уроков — учитель сам решает что открыть
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

  // Для ученика ищем teacherId чтобы получить classState
  const teacherIdForStudent = activeUser.role === "student" ? activeUser.teacherId : undefined;
  const teacherIdForClass = activeUser.role === "teacher" ? activeUser.id : undefined;
  const relevantTeacherId = teacherIdForClass ?? teacherIdForStudent;

  // Загрузка classState
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

  // Загрузка учеников для учителя
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

  // Хэш-навигация
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
    // F70-ученик не должен видеть список уроков — возвращаем его на «Сегодня»
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

  // Для ученика: определяем урок который надо открыть (тот что открыл учитель)
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
            onOpenAnketa={() => setDashboardState({ section: "family" })}
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
