import type { Metadata } from "next";
import { MermaidDiagram } from "./mermaid-diagram";
import styles from "./page.module.css";

type DiagramSection = {
  id: string;
  title: string;
  lead: string;
  chart: string;
};

export const metadata: Metadata = {
  title: "Карта пользовательских путей",
  description:
    "Подробная Mermaid-карта работы платформы UQUVLI.UZ для гостя, родителя, ученика, педагога и исследователя.",
};

const shareUrl = "https://uquvli.uz/karta-saita";

const diagramSections: DiagramSection[] = [
  {
    id: "overview",
    title: "Общая карта платформы",
    lead: "Вся логика платформы на одной схеме: публичная зона, кабинеты ролей и серверные API.",
    chart: String.raw`flowchart LR
  %% UQUVLI.UZ user journey map

  subgraph Public["Публичная зона"]
    Home["Главная страница<br/>Пользователь знакомится с платформой"]
    Program["Программа<br/>Смотрит направления и уроки"]
    LessonCard["Карточка урока<br/>Открывает описание /lesson/[slug]"]
    Register["Создать кабинет<br/>Переход на /register"]
    Login["Войти<br/>Переход на /login"]
    ChooseRole["Выбирает роль<br/>родитель / ученик / педагог / исследователь"]
  end

  subgraph Parent["Родитель"]
    ParentCabinet["Кабинет родителя<br/>/dashboard"]
    ParentInitial["Первичная анкета<br/>/onboarding/anketa"]
    ParentToday["Сегодня<br/>видит состояние обучения ребёнка"]
    ParentLessons["Уроки<br/>открывает материалы ребёнка"]
    ParentProgress["Прогресс<br/>смотрит завершённые уроки"]
    ParentFamily["Семья<br/>анкеты и домашний ритм"]
    ParentAccount["Аккаунт<br/>данные семьи и ребёнка"]
    ParentFinal["Финальная анкета<br/>после прохождения всех уроков"]
  end

  subgraph Student["Ученик"]
    StudentLogin["Вход кодом<br/>нажимает кнопку роли или вводит код"]
    StudentCabinet["Кабинет ученика<br/>упрощённый режим"]
    StudentToday["Сегодня<br/>одна большая кнопка старта"]
    StudentClassLesson["Урок открыт педагогом<br/>classState.openLessonSlug"]
    StudentNextLesson["Следующий урок<br/>если педагог ничего не открыл"]
    StudentLesson["Проходит урок<br/>правила -> тренажёр -> ситуации -> вопросы"]
    StudentSave["Завершает урок<br/>прогресс сохраняется"]
  end

  subgraph Teacher["Педагог"]
    TeacherCabinet["Кабинет педагога<br/>/dashboard"]
    TeacherToday["Сегодня<br/>группа, активный урок, ученики"]
    AddStudent["Добавляет ученика<br/>имя, класс, группа"]
    OpenClassLesson["Открывает урок классу<br/>кнопка Открыть классу"]
    CloseClassLesson["Закрывает активный урок<br/>кнопка Закрыть урок"]
    TeacherLessons["Уроки<br/>список модулей и уроков"]
    PreviewLesson["Предпросмотр урока<br/>открывает материал"]
    DownloadDocx["Скачивает план урока .docx<br/>готовый PhD-документ"]
    TeacherProgress["Прогресс учеников<br/>смотрит динамику группы"]
  end

  subgraph Researcher["Исследователь"]
    ResearcherCabinet["Исследовательский кабинет<br/>/dashboard"]
    ResearcherOverview["Сводка<br/>школы, учителя, ученики, события"]
    ResearcherTeachers["Учителя<br/>создаёт и просматривает педагогов"]
    ResearcherStudents["Ученики<br/>список участников эксперимента"]
    ResearcherFilters["Фильтры<br/>школа, группа, поиск"]
    ResearcherAddStudent["Добавляет ученика<br/>привязка к педагогу"]
    ResearcherGroup["Меняет группу<br/>experimental / control"]
    ResearcherAnalytics["Аналитика<br/>анкеты, события, прогресс"]
    ResearcherExport["Экспорт данных<br/>скачивает XLSX"]
  end

  subgraph Server["Серверные данные и API"]
    AuthApi["/api/auth/*<br/>логин, регистрация, сессия"]
    DashboardRoute["/dashboard<br/>единая точка входа в кабинет"]
    LessonRoute["/lesson/[slug]<br/>публичный и кабинетный урок"]
    ClassApi["/api/class-state/*<br/>открытый урок класса"]
    ProgressApi["/api/progress/complete<br/>сохранение завершения урока"]
    QuestionnaireApi["/api/questionnaires<br/>первичная и финальная анкеты"]
    TeacherApi["/api/teacher/students<br/>ученики педагога"]
    ResearcherApi["/api/researcher/*<br/>данные, пользователи, экспорт"]
    DocxApi["/api/lessons/[slug]/docx<br/>скачивание плана урока"]
  end

  Home --> Program --> LessonCard
  Home --> Register
  Home --> Login
  LessonCard --> Register
  LessonCard --> Login
  Register --> ChooseRole
  Login --> ChooseRole

  ChooseRole --> ParentCabinet
  ChooseRole --> StudentLogin
  ChooseRole --> TeacherCabinet
  ChooseRole --> ResearcherCabinet

  ParentCabinet --> ParentInitial --> ParentToday
  ParentToday --> ParentLessons
  ParentToday --> ParentProgress
  ParentToday --> ParentFamily
  ParentToday --> ParentAccount
  ParentFamily --> ParentFinal
  ParentProgress --> ParentFinal

  StudentLogin --> StudentCabinet --> StudentToday
  StudentToday --> StudentClassLesson
  StudentToday --> StudentNextLesson
  StudentClassLesson --> StudentLesson
  StudentNextLesson --> StudentLesson
  StudentLesson --> StudentSave

  TeacherCabinet --> TeacherToday
  TeacherToday --> AddStudent
  TeacherToday --> OpenClassLesson
  TeacherToday --> CloseClassLesson
  TeacherToday --> TeacherProgress
  TeacherCabinet --> TeacherLessons
  TeacherLessons --> PreviewLesson
  TeacherLessons --> DownloadDocx

  ResearcherCabinet --> ResearcherOverview
  ResearcherCabinet --> ResearcherTeachers
  ResearcherCabinet --> ResearcherStudents
  ResearcherStudents --> ResearcherFilters
  ResearcherStudents --> ResearcherAddStudent
  ResearcherStudents --> ResearcherGroup
  ResearcherCabinet --> ResearcherAnalytics
  ResearcherCabinet --> ResearcherExport

  Register --> AuthApi
  Login --> AuthApi
  ChooseRole --> DashboardRoute
  ParentCabinet --> DashboardRoute
  StudentCabinet --> DashboardRoute
  TeacherCabinet --> DashboardRoute
  ResearcherCabinet --> DashboardRoute
  LessonCard --> LessonRoute
  StudentLesson --> LessonRoute
  OpenClassLesson --> ClassApi
  CloseClassLesson --> ClassApi
  StudentToday --> ClassApi
  StudentSave --> ProgressApi
  ParentInitial --> QuestionnaireApi
  ParentFinal --> QuestionnaireApi
  AddStudent --> TeacherApi
  ResearcherOverview --> ResearcherApi
  ResearcherTeachers --> ResearcherApi
  ResearcherStudents --> ResearcherApi
  ResearcherExport --> ResearcherApi
  DownloadDocx --> DocxApi

  OpenClassLesson -. "ученик видит открытый урок" .-> StudentClassLesson
  StudentSave -. "данные видят родитель / педагог / исследователь" .-> TeacherProgress
  QuestionnaireApi -. "анкеты уходят в аналитику" .-> ResearcherAnalytics

  classDef public fill:#eaf3ff,stroke:#0d50cf,color:#10213b
  classDef parent fill:#e9f8f2,stroke:#168661,color:#10213b
  classDef student fill:#fff4d6,stroke:#b26a00,color:#10213b
  classDef teacher fill:#f0edff,stroke:#6750c8,color:#10213b
  classDef researcher fill:#fff0f3,stroke:#bf3e5b,color:#10213b
  classDef api fill:#f8fafc,stroke:#64748b,color:#10213b
  class Home,Program,LessonCard,Register,Login,ChooseRole public
  class ParentCabinet,ParentInitial,ParentToday,ParentLessons,ParentProgress,ParentFamily,ParentAccount,ParentFinal parent
  class StudentLogin,StudentCabinet,StudentToday,StudentClassLesson,StudentNextLesson,StudentLesson,StudentSave student
  class TeacherCabinet,TeacherToday,AddStudent,OpenClassLesson,CloseClassLesson,TeacherLessons,PreviewLesson,DownloadDocx,TeacherProgress teacher
  class ResearcherCabinet,ResearcherOverview,ResearcherTeachers,ResearcherStudents,ResearcherFilters,ResearcherAddStudent,ResearcherGroup,ResearcherAnalytics,ResearcherExport researcher
  class AuthApi,DashboardRoute,LessonRoute,ClassApi,ProgressApi,QuestionnaireApi,TeacherApi,ResearcherApi,DocxApi api`,
  },
  {
    id: "guest",
    title: "Детальная карта гостя",
    lead: "Путь человека, который ещё не авторизован: от главной страницы до выбора роли.",
    chart: String.raw`flowchart TD
  GuestStart["Гость открывает uquvli.uz"]
  GuestHome["Главная страница<br/>читает, для кого платформа"]
  GuestProgramClick["Нажимает Программа"]
  GuestProgram["Смотрит направления<br/>диагностика, здоровье, быт, транспорт, коммуникация, безопасность, госуслуги"]
  GuestLessonClick["Нажимает карточку урока"]
  GuestLesson["Открывает /lesson/[slug]<br/>читает описание и видит учебный материал"]
  GuestDecision{"Что делает дальше?"}
  GuestRegisterClick["Нажимает Начать обучение"]
  GuestRegister["Переходит на /register"]
  GuestLoginClick["Нажимает Войти"]
  GuestLogin["Переходит на /login"]
  GuestRole["Выбирает роль<br/>parent / student / teacher / researcher"]
  GuestAuthApi["/api/auth/*<br/>создаётся или проверяется сессия"]
  GuestDashboard["Открывается /dashboard<br/>платформа показывает кабинет по роли"]

  GuestStart --> GuestHome
  GuestHome --> GuestProgramClick --> GuestProgram
  GuestProgram --> GuestLessonClick --> GuestLesson
  GuestHome --> GuestDecision
  GuestLesson --> GuestDecision
  GuestDecision -- "создать кабинет" --> GuestRegisterClick --> GuestRegister --> GuestRole
  GuestDecision -- "уже есть доступ" --> GuestLoginClick --> GuestLogin --> GuestRole
  GuestRole --> GuestAuthApi --> GuestDashboard

  classDef action fill:#eaf3ff,stroke:#0d50cf,color:#10213b
  classDef route fill:#f8fafc,stroke:#64748b,color:#10213b
  classDef decision fill:#fff4d6,stroke:#b26a00,color:#10213b
  class GuestStart,GuestHome,GuestProgramClick,GuestProgram,GuestLessonClick,GuestLesson,GuestRegisterClick,GuestLoginClick,GuestRole,GuestDashboard action
  class GuestRegister,GuestLogin,GuestAuthApi route
  class GuestDecision decision`,
  },
  {
    id: "parent",
    title: "Детальная карта родителя",
    lead: "Обязательная входная анкета, кабинет родителя, контроль прогресса и финальная анкета.",
    chart: String.raw`flowchart TD
  ParentStart["Родитель нажимает Создать кабинет / Войти"]
  ParentAuth["Авторизация или регистрация<br/>/api/auth/login или /api/auth/register"]
  ParentSession["Сессия родителя<br/>роль parent"]
  ParentCheck{"Первичная анкета заполнена?"}
  ParentOnboarding["Заполняет первичную анкету<br/>/onboarding/anketa"]
  ParentQuestionApi["Сохранение анкеты<br/>/api/questionnaires type=initial"]
  ParentDashboard["Кабинет родителя<br/>/dashboard"]
  ParentToday["Вкладка Сегодня<br/>общий статус ребёнка, следующий урок, подсказки"]
  ParentLessons["Вкладка Уроки<br/>открывает материалы ребёнка"]
  ParentProgress["Вкладка Прогресс<br/>видит завершённые уроки и динамику"]
  ParentFamily["Вкладка Семья<br/>домашний ритм, анкеты, поддержка"]
  ParentAccount["Вкладка Аккаунт<br/>данные взрослого и ребёнка"]
  ParentDone{"Все уроки завершены?"}
  ParentFinalCta["Видит приглашение<br/>заполнить выходную анкету"]
  ParentFinal["Заполняет финальную анкету<br/>type=final"]
  ParentFinalApi["Сохранение финальной анкеты<br/>/api/questionnaires"]
  ParentObserve["Продолжает наблюдать<br/>обновлённый прогресс и результаты ребёнка"]
  ResearcherData["Данные доступны исследователю<br/>анкеты initial / final"]

  ParentStart --> ParentAuth --> ParentSession --> ParentCheck
  ParentCheck -- "нет" --> ParentOnboarding --> ParentQuestionApi --> ParentDashboard
  ParentCheck -- "да" --> ParentDashboard
  ParentDashboard --> ParentToday
  ParentDashboard --> ParentLessons
  ParentDashboard --> ParentProgress
  ParentDashboard --> ParentFamily
  ParentDashboard --> ParentAccount
  ParentToday --> ParentDone
  ParentLessons --> ParentDone
  ParentProgress --> ParentDone
  ParentDone -- "нет" --> ParentObserve
  ParentDone -- "да" --> ParentFinalCta --> ParentFinal --> ParentFinalApi --> ParentObserve
  ParentQuestionApi -. "попадает в аналитику" .-> ResearcherData
  ParentFinalApi -. "сравнение до / после" .-> ResearcherData

  classDef parent fill:#e9f8f2,stroke:#168661,color:#10213b
  classDef api fill:#f8fafc,stroke:#64748b,color:#10213b
  classDef decision fill:#fff4d6,stroke:#b26a00,color:#10213b
  class ParentStart,ParentSession,ParentOnboarding,ParentDashboard,ParentToday,ParentLessons,ParentProgress,ParentFamily,ParentAccount,ParentFinalCta,ParentFinal,ParentObserve parent
  class ParentAuth,ParentQuestionApi,ParentFinalApi,ResearcherData api
  class ParentCheck,ParentDone decision`,
  },
  {
    id: "student",
    title: "Детальная карта ученика",
    lead: "Упрощённый путь ученика: код, активный урок от педагога или следующий урок, прохождение и сохранение прогресса.",
    chart: String.raw`flowchart TD
  StudentStart["Ученик открывает вход"]
  StudentCode["Нажимает роль Ученик<br/>или вводит код и пароль"]
  StudentAuth["Система проверяет доступ<br/>/api/auth/login"]
  StudentCabinet["Кабинет ученика<br/>/dashboard"]
  StudentToday["Экран Сегодня<br/>одна большая кнопка старта"]
  ClassStateRequest["Проверка активного урока<br/>/api/class-state"]
  StudentDecision{"Педагог открыл урок классу?"}
  StudentOpened["Открывается урок класса<br/>classState.openLessonSlug"]
  StudentNext["Открывается следующий доступный урок<br/>если активного урока нет"]
  LessonRoute["Переход на /lesson/[slug]"]
  StudentRules["Читает правила урока<br/>нажимает Дальше"]
  StudentTrainer["Проходит тренажёр<br/>действует как в приложении или ситуации"]
  StudentScenario["Разбирает ситуации<br/>выбирает спокойный и безопасный ответ"]
  StudentQuiz["Отвечает на короткие вопросы"]
  StudentFinish["Нажимает Завершить урок"]
  StudentProgressApi["Прогресс сохраняется<br/>/api/progress/complete"]
  StudentReturn["Возвращается в кабинет<br/>видит обновлённый прогресс"]
  ParentSees["Родитель видит прогресс ребёнка"]
  TeacherSees["Педагог видит прогресс группы"]
  ResearcherSees["Исследователь видит событие и прогресс"]

  StudentStart --> StudentCode --> StudentAuth --> StudentCabinet --> StudentToday
  StudentToday --> ClassStateRequest --> StudentDecision
  StudentDecision -- "да" --> StudentOpened --> LessonRoute
  StudentDecision -- "нет" --> StudentNext --> LessonRoute
  LessonRoute --> StudentRules --> StudentTrainer --> StudentScenario --> StudentQuiz --> StudentFinish
  StudentFinish --> StudentProgressApi --> StudentReturn
  StudentProgressApi -.-> ParentSees
  StudentProgressApi -.-> TeacherSees
  StudentProgressApi -.-> ResearcherSees

  classDef student fill:#fff4d6,stroke:#b26a00,color:#10213b
  classDef api fill:#f8fafc,stroke:#64748b,color:#10213b
  classDef decision fill:#eaf3ff,stroke:#0d50cf,color:#10213b
  class StudentStart,StudentCode,StudentCabinet,StudentToday,StudentOpened,StudentNext,StudentRules,StudentTrainer,StudentScenario,StudentQuiz,StudentFinish,StudentReturn,ParentSees,TeacherSees,ResearcherSees student
  class StudentAuth,ClassStateRequest,LessonRoute,StudentProgressApi api
  class StudentDecision decision`,
  },
  {
    id: "teacher",
    title: "Детальная карта педагога",
    lead: "Работа с классом: ученики, открытие урока классу, закрытие активного урока, планы .docx и прогресс.",
    chart: String.raw`flowchart TD
  TeacherStart["Педагог нажимает Войти"]
  TeacherAuth["Авторизация<br/>почта/код и пароль"]
  TeacherDashboard["Кабинет педагога<br/>/dashboard"]
  TeacherToday["Вкладка Сегодня<br/>группа, ученики, активный урок"]
  TeacherAddClick["Нажимает Добавить ученика"]
  TeacherAddForm["Заполняет данные<br/>имя, класс, группа, заметки"]
  TeacherAddApi["Создание ученика<br/>/api/teacher/students"]
  TeacherOpen["Выбирает урок<br/>нажимает Открыть классу"]
  TeacherClassApi["Сервер сохраняет активный урок<br/>/api/class-state/open"]
  StudentSees["Ученики видят этот урок<br/>в своём кабинете"]
  TeacherClose["Нажимает Закрыть урок"]
  TeacherCloseApi["Сервер закрывает активный урок<br/>/api/class-state/close"]
  TeacherLessons["Вкладка Уроки<br/>список модулей и уроков"]
  TeacherPreview["Открывает предпросмотр<br/>/lesson/[slug]"]
  TeacherDocxClick["Нажимает План урока .docx"]
  TeacherDocxApi["Скачивание документа<br/>/api/lessons/[slug]/docx"]
  TeacherDocxFile["Получает готовый PhD-документ<br/>один в один по шаблону урока"]
  TeacherProgress["Вкладка Прогресс / ученики<br/>смотрит прохождение и результаты"]
  TeacherAccount["Аккаунт<br/>данные школы и группы"]

  TeacherStart --> TeacherAuth --> TeacherDashboard
  TeacherDashboard --> TeacherToday
  TeacherToday --> TeacherAddClick --> TeacherAddForm --> TeacherAddApi --> TeacherToday
  TeacherToday --> TeacherOpen --> TeacherClassApi --> StudentSees
  TeacherToday --> TeacherClose --> TeacherCloseApi --> TeacherToday
  TeacherDashboard --> TeacherLessons
  TeacherLessons --> TeacherPreview
  TeacherLessons --> TeacherDocxClick --> TeacherDocxApi --> TeacherDocxFile
  TeacherDashboard --> TeacherProgress
  TeacherDashboard --> TeacherAccount
  StudentSees -. "после завершения учениками" .-> TeacherProgress

  classDef teacher fill:#f0edff,stroke:#6750c8,color:#10213b
  classDef api fill:#f8fafc,stroke:#64748b,color:#10213b
  classDef file fill:#e9f8f2,stroke:#168661,color:#10213b
  class TeacherStart,TeacherDashboard,TeacherToday,TeacherAddClick,TeacherAddForm,TeacherOpen,StudentSees,TeacherClose,TeacherLessons,TeacherPreview,TeacherDocxClick,TeacherProgress,TeacherAccount teacher
  class TeacherAuth,TeacherAddApi,TeacherClassApi,TeacherCloseApi,TeacherDocxApi api
  class TeacherDocxFile file`,
  },
  {
    id: "researcher",
    title: "Детальная карта исследователя",
    lead: "Исследовательский кабинет: учителя, ученики, фильтры, группы, анкеты, события, прогресс и экспорт XLSX.",
    chart: String.raw`flowchart TD
  ResearcherStart["Исследователь нажимает Войти"]
  ResearcherAuth["Авторизация<br/>роль researcher"]
  ResearcherCabinet["Исследовательский кабинет<br/>/dashboard"]
  ResearcherLoad["Загрузка данных<br/>/api/researcher/data"]
  ResearcherSummary["Сводка<br/>школы, педагоги, ученики, события"]
  ResearcherTeachers["Раздел Учителя<br/>создаёт и просматривает педагогов"]
  ResearcherCreateTeacher["Создаёт педагога<br/>/api/researcher/users"]
  ResearcherStudents["Раздел Ученики<br/>видит всех участников"]
  ResearcherFilter["Фильтрует список<br/>школа, группа, поиск по имени"]
  ResearcherAdd["Добавляет ученика<br/>выбирает педагога и группу"]
  ResearcherAddApi["Создание участника<br/>/api/researcher/users"]
  ResearcherGroup["Меняет группу ученика<br/>experimental / control"]
  ResearcherGroupApi["Обновление группы<br/>/api/researcher/students/[studentId]"]
  ResearcherDetail["Открывает карточку ученика<br/>прогресс, педагог, школа, анкеты"]
  ResearcherEvents["Смотрит журнал событий<br/>старт урока, ответы, подсказки, завершение"]
  ResearcherQuestionnaires["Смотрит анкеты<br/>initial / final"]
  ResearcherAnalytics["Смотрит аналитику<br/>сравнение групп и динамики"]
  ResearcherExportClick["Нажимает Экспорт XLSX"]
  ResearcherExportApi["Генерация файла<br/>/api/researcher/export/xlsx"]
  ResearcherExportFile["Скачивает таблицу<br/>для анализа исследования"]

  ResearcherStart --> ResearcherAuth --> ResearcherCabinet --> ResearcherLoad
  ResearcherLoad --> ResearcherSummary
  ResearcherCabinet --> ResearcherTeachers --> ResearcherCreateTeacher
  ResearcherCabinet --> ResearcherStudents
  ResearcherStudents --> ResearcherFilter
  ResearcherStudents --> ResearcherAdd --> ResearcherAddApi --> ResearcherStudents
  ResearcherStudents --> ResearcherGroup --> ResearcherGroupApi --> ResearcherStudents
  ResearcherStudents --> ResearcherDetail
  ResearcherCabinet --> ResearcherEvents
  ResearcherCabinet --> ResearcherQuestionnaires
  ResearcherCabinet --> ResearcherAnalytics
  ResearcherCabinet --> ResearcherExportClick --> ResearcherExportApi --> ResearcherExportFile
  ResearcherQuestionnaires -. "данные анкет" .-> ResearcherAnalytics
  ResearcherEvents -. "события уроков" .-> ResearcherAnalytics
  ResearcherDetail -. "индивидуальная динамика" .-> ResearcherAnalytics

  classDef researcher fill:#fff0f3,stroke:#bf3e5b,color:#10213b
  classDef api fill:#f8fafc,stroke:#64748b,color:#10213b
  classDef file fill:#e9f8f2,stroke:#168661,color:#10213b
  class ResearcherStart,ResearcherCabinet,ResearcherSummary,ResearcherTeachers,ResearcherCreateTeacher,ResearcherStudents,ResearcherFilter,ResearcherAdd,ResearcherGroup,ResearcherDetail,ResearcherEvents,ResearcherQuestionnaires,ResearcherAnalytics,ResearcherExportClick researcher
  class ResearcherAuth,ResearcherLoad,ResearcherAddApi,ResearcherGroupApi,ResearcherExportApi api
  class ResearcherExportFile file`,
  },
  {
    id: "data",
    title: "Карта данных и серверных взаимодействий",
    lead: "Что происходит после кликов: авторизация, уроки, classState, прогресс, анкеты, документы и экспорт.",
    chart: String.raw`flowchart LR
  UserAction["Действие пользователя<br/>клик, форма, прохождение урока"]

  Auth["Вход / регистрация<br/>/api/auth/*"]
  Session["Сессия пользователя<br/>роль и профиль"]
  Dashboard["Кабинет<br/>/dashboard"]
  Lesson["Урок<br/>/lesson/[slug]"]
  ClassState["Открытый урок класса<br/>/api/class-state/*"]
  Progress["Прогресс урока<br/>/api/progress/complete"]
  Questionnaires["Анкеты<br/>/api/questionnaires"]
  TeacherStudents["Ученики педагога<br/>/api/teacher/students"]
  ResearcherData["Исследовательские данные<br/>/api/researcher/*"]
  Docx["План урока .docx<br/>/api/lessons/[slug]/docx"]
  Export["Экспорт XLSX<br/>/api/researcher/export/xlsx"]

  ParentView["Родитель видит<br/>прогресс и анкеты"]
  StudentView["Ученик видит<br/>открытый или следующий урок"]
  TeacherView["Педагог видит<br/>класс, активный урок, прогресс"]
  ResearcherView["Исследователь видит<br/>сводку, события, аналитику"]

  UserAction --> Auth --> Session --> Dashboard
  Dashboard --> Lesson
  Dashboard --> ClassState
  Dashboard --> Progress
  Dashboard --> Questionnaires
  Dashboard --> TeacherStudents
  Dashboard --> ResearcherData
  Dashboard --> Docx
  Dashboard --> Export

  ClassState --> StudentView
  Lesson --> Progress
  Progress --> ParentView
  Progress --> TeacherView
  Progress --> ResearcherData
  Questionnaires --> ParentView
  Questionnaires --> ResearcherData
  TeacherStudents --> TeacherView
  TeacherStudents --> ResearcherData
  ResearcherData --> ResearcherView
  Docx --> TeacherView
  Export --> ResearcherView

  classDef action fill:#eaf3ff,stroke:#0d50cf,color:#10213b
  classDef api fill:#f8fafc,stroke:#64748b,color:#10213b
  classDef view fill:#e9f8f2,stroke:#168661,color:#10213b
  class UserAction action
  class Auth,Session,Dashboard,Lesson,ClassState,Progress,Questionnaires,TeacherStudents,ResearcherData,Docx,Export api
  class ParentView,StudentView,TeacherView,ResearcherView view`,
  },
];

export default function SiteMapPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="journey-title">
        <div className={styles.heroText}>
          <span className={styles.kicker}>Mermaid-карта в браузере</span>
          <h1 id="journey-title" className={styles.title}>
            Карта пользовательских путей UQUVLI.UZ
          </h1>
          <p className={styles.lead}>
            Это те же схемы Mermaid, но уже отрисованные на сайте. Можно открыть
            ссылку, показать на компьютере и двигаться по подробному флоу каждой
            роли без редакторов и специальных программ.
          </p>
        </div>

        <aside className={styles.sharePanel} aria-label="Ссылка для отправки">
          <span>Ссылка для отправки</span>
          <a href={shareUrl}>{shareUrl}</a>
          <p>Большие схемы можно прокручивать по горизонтали внутри блока.</p>
        </aside>
      </section>

      <nav className={styles.toc} aria-label="Навигация по схемам">
        {diagramSections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>
            {section.title}
          </a>
        ))}
      </nav>

      <div className={styles.diagramStack}>
        {diagramSections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={styles.diagramSection}
            aria-labelledby={`${section.id}-title`}
          >
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.sectionKicker}>
                  Схема {index + 1} из {diagramSections.length}
                </span>
                <h2 id={`${section.id}-title`} className={styles.sectionTitle}>
                  {section.title}
                </h2>
              </div>
              <p className={styles.sectionLead}>{section.lead}</p>
            </div>
            <MermaidDiagram chart={section.chart} title={section.title} />
          </section>
        ))}
      </div>
    </main>
  );
}
