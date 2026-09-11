# Карта пользовательских путей UQUVLI.UZ

Готовый материал для презентации: ниже есть одна общая карта платформы и отдельные подробные карты для каждой роли. Mermaid-код можно вставить в Notion, Obsidian, GitHub Markdown, Markdown Preview Mermaid Support, Mermaid Live Editor или экспортировать в PNG/SVG.

## Общая карта платформы

```mermaid
flowchart LR
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
```

## Детальная карта: гость

```mermaid
flowchart TD
  GuestStart["Гость открывает сайт"]
  GuestHome["Смотрит главную<br/>понимает назначение платформы"]
  GuestProgram["Нажимает Программа<br/>видит направления и 30 уроков"]
  GuestLesson["Открывает карточку урока<br/>/lesson/[slug]"]
  GuestCta{"Что делает дальше?"}
  GuestRegister["Нажимает Начать обучение<br/>/register"]
  GuestLogin["Нажимает Войти<br/>/login"]
  GuestRole["Выбирает роль или вводит код"]
  GuestDashboard["Попадает в нужный кабинет<br/>/dashboard"]

  GuestStart --> GuestHome --> GuestProgram --> GuestLesson --> GuestCta
  GuestHome --> GuestCta
  GuestCta --> GuestRegister --> GuestRole --> GuestDashboard
  GuestCta --> GuestLogin --> GuestRole --> GuestDashboard
```

## Детальная карта: родитель

```mermaid
flowchart TD
  ParentStart["Родитель нажимает Создать / Войти"]
  ParentAuth["Авторизация<br/>/api/auth/login или /api/auth/register"]
  ParentCheck{"Первичная анкета заполнена?"}
  ParentOnboarding["Заполняет первичную анкету<br/>5 вопросов, оценка 1-5"]
  ParentDashboard["Кабинет родителя<br/>/dashboard"]
  ParentToday["Вкладка Сегодня<br/>видит общий прогресс и следующий урок"]
  ParentLessons["Вкладка Уроки<br/>открывает материалы ребёнка"]
  ParentProgress["Вкладка Прогресс<br/>смотрит завершённые уроки и динамику"]
  ParentFamily["Вкладка Семья<br/>домашний ритм, анкеты, поддержка"]
  ParentAccount["Вкладка Аккаунт<br/>данные взрослого и ребёнка"]
  ParentDone{"Все уроки завершены?"}
  ParentFinal["Заполняет финальную анкету<br/>сравнение результата после обучения"]
  ParentObserve["Продолжает наблюдать<br/>прогресс ребёнка и рекомендации"]

  ParentStart --> ParentAuth --> ParentCheck
  ParentCheck -- "нет" --> ParentOnboarding --> ParentDashboard
  ParentCheck -- "да" --> ParentDashboard
  ParentDashboard --> ParentToday
  ParentDashboard --> ParentLessons
  ParentDashboard --> ParentProgress
  ParentDashboard --> ParentFamily
  ParentDashboard --> ParentAccount
  ParentFamily --> ParentDone
  ParentProgress --> ParentDone
  ParentDone -- "да" --> ParentFinal --> ParentObserve
  ParentDone -- "нет" --> ParentObserve
```

## Детальная карта: ученик

```mermaid
flowchart TD
  StudentStart["Ученик открывает вход"]
  StudentCode["Нажимает кнопку Ученик<br/>или вводит код и пароль"]
  StudentAuth["Система открывает кабинет ученика"]
  StudentToday["Экран Сегодня<br/>одна основная кнопка старта"]
  StudentDecision{"Есть урок, открытый педагогом?"}
  StudentOpened["Открывается урок класса<br/>classState.openLessonSlug"]
  StudentNext["Открывается следующий доступный урок"]
  StudentRules["Читает короткие правила<br/>нажимает Дальше"]
  StudentTrainer["Проходит тренажёр<br/>действует как в реальном приложении"]
  StudentScenario["Разбирает ситуации<br/>выбирает спокойный и безопасный ответ"]
  StudentQuiz["Отвечает на короткие вопросы"]
  StudentFinish["Нажимает Завершить урок"]
  StudentProgress["Прогресс сохраняется<br/>/api/progress/complete"]
  StudentReturn["Возвращается в кабинет<br/>видит обновлённый прогресс"]

  StudentStart --> StudentCode --> StudentAuth --> StudentToday --> StudentDecision
  StudentDecision -- "да" --> StudentOpened
  StudentDecision -- "нет" --> StudentNext
  StudentOpened --> StudentRules
  StudentNext --> StudentRules
  StudentRules --> StudentTrainer --> StudentScenario --> StudentQuiz --> StudentFinish
  StudentFinish --> StudentProgress --> StudentReturn
```

## Детальная карта: педагог

```mermaid
flowchart TD
  TeacherStart["Педагог входит в кабинет"]
  TeacherAuth["Авторизация<br/>код/почта и пароль"]
  TeacherDashboard["Кабинет педагога<br/>/dashboard"]
  TeacherToday["Вкладка Сегодня<br/>группа, ученики, активный урок"]
  TeacherAdd["Добавляет ученика<br/>имя, класс, группа, заметки"]
  TeacherOpen["Выбирает урок и нажимает Открыть классу"]
  TeacherClassState["Сервер сохраняет активный урок<br/>/api/class-state/open"]
  StudentSees["Ученики видят этот урок<br/>в своём кабинете"]
  TeacherClose["Педагог нажимает Закрыть урок"]
  TeacherLessons["Вкладка Уроки<br/>видит модули и уроки"]
  TeacherPreview["Открывает предпросмотр урока"]
  TeacherDocx["Скачивает план урока .docx<br/>/api/lessons/[slug]/docx"]
  TeacherProgress["Вкладка Прогресс / ученики<br/>смотрит прохождение и результаты"]
  TeacherAccount["Аккаунт<br/>данные школы и группы"]

  TeacherStart --> TeacherAuth --> TeacherDashboard
  TeacherDashboard --> TeacherToday
  TeacherToday --> TeacherAdd
  TeacherToday --> TeacherOpen --> TeacherClassState --> StudentSees
  TeacherToday --> TeacherClose
  TeacherDashboard --> TeacherLessons
  TeacherLessons --> TeacherPreview
  TeacherLessons --> TeacherDocx
  TeacherDashboard --> TeacherProgress
  TeacherDashboard --> TeacherAccount
```

## Детальная карта: исследователь

```mermaid
flowchart TD
  ResearcherStart["Исследователь входит в кабинет"]
  ResearcherAuth["Авторизация<br/>роль researcher"]
  ResearcherCabinet["Исследовательский кабинет<br/>/dashboard"]
  ResearcherSummary["Сводка<br/>количество школ, педагогов, учеников, событий"]
  ResearcherTeachers["Раздел Учителя<br/>создаёт и просматривает педагогов"]
  ResearcherStudents["Раздел Ученики<br/>видит всех участников"]
  ResearcherFilter["Фильтрует список<br/>школа, группа, поиск по имени"]
  ResearcherAdd["Добавляет ученика<br/>выбирает педагога и группу"]
  ResearcherGroup["Меняет группу ученика<br/>experimental / control"]
  ResearcherDetail["Открывает карточку ученика<br/>прогресс, педагог, школа, анкеты"]
  ResearcherEvents["Смотрит журнал событий<br/>старт урока, ответы, подсказки, завершение"]
  ResearcherQuestionnaires["Смотрит анкеты<br/>initial / final"]
  ResearcherExport["Экспортирует XLSX<br/>для анализа исследования"]

  ResearcherStart --> ResearcherAuth --> ResearcherCabinet
  ResearcherCabinet --> ResearcherSummary
  ResearcherCabinet --> ResearcherTeachers
  ResearcherCabinet --> ResearcherStudents
  ResearcherStudents --> ResearcherFilter
  ResearcherStudents --> ResearcherAdd
  ResearcherStudents --> ResearcherGroup
  ResearcherStudents --> ResearcherDetail
  ResearcherCabinet --> ResearcherEvents
  ResearcherCabinet --> ResearcherQuestionnaires
  ResearcherCabinet --> ResearcherExport
```

## Карта данных и серверных взаимодействий

```mermaid
flowchart LR
  UserAction["Действие пользователя"]

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

  UserAction --> Auth --> Session --> Dashboard
  Dashboard --> Lesson
  Dashboard --> ClassState
  Dashboard --> Progress
  Dashboard --> Questionnaires
  Dashboard --> TeacherStudents
  Dashboard --> ResearcherData
  Dashboard --> Docx

  ClassState --> Lesson
  Lesson --> Progress
  Questionnaires --> ResearcherData
  Progress --> ResearcherData
  TeacherStudents --> ResearcherData
```

## Проверка по проекту

- Роли соответствуют типу `UserRole`: `student`, `parent`, `teacher`, `researcher`.
- Основные маршруты соответствуют `src/app`: `/`, `/program`, `/lesson/[slug]`, `/login`, `/register`, `/onboarding/anketa`, `/dashboard`.
- Родительский путь учитывает обязательную первичную анкету перед кабинетом.
- Ученический путь учитывает урок, открытый педагогом через `classState.openLessonSlug`, и fallback на следующий урок.
- Педагогический путь включает добавление учеников, открытие/закрытие урока классу и скачивание `.docx`.
- Исследовательский путь включает учителей, учеников, фильтры, группы `experimental/control`, анкеты, события, прогресс и экспорт.
