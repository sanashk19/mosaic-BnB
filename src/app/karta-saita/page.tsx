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
  title: "User Path Map",
  description:
    "A detailed Mermaid map of the UQUVLI.UZ platform for guests, parents, students, teachers and researchers.",
};

const shareUrl = "https://uquvli.uz/karta-saita";

const diagramSections: DiagramSection[] = [
  {
    id: "overview",
    title: "General platform map",
    lead: "All platform logic on one diagram: public zone, role accounts and server APIs.",
    chart: String.raw`flowchart LR
  %% UQUVLI.UZ user journey map

  subgraph Public["Public area"]
    Home["Home page<br/>The user gets acquainted with the platform"]
    Program["Program<br/>Looks at directions and lessons"]
    LessonCard["Lesson card<br/>Opens description of /lesson/[slug]"]
    Register["Create an account<br/>Go to /register"]
    Login["Login<br/>Go to /login"]
    ChooseRole["Selects a role<br/>parent / student / teacher / researcher"]
  end

  subgraph Parent["Parent"]
    ParentCabinet["Parent's office<br/>/dashboard"]
    ParentInitial["Primary questionnaire<br/>/onboarding/anketa"]
    ParentToday["Today<br />sees the state of child's education"]
    ParentLessons["Lessons<br/>opens the child's materials"]
    ParentProgress["Progress<br/>view completed lessons"]
    ParentFamily["Family<br/>profiles and home rhythm"]
    ParentAccount["Account<br/>family and child details"]
    ParentFinal["Final questionnaire<br/>after completing all lessons"]
  end

  subgraph Student["Student"]
    StudentLogin["Login with code<br/>click the role button or enter the code"]
    StudentCabinet["Student's office<br/>simplified mode"]
    StudentToday["Today<br/>one big start button"]
    StudentClassLesson["Lesson opened by teacher<br />classState.openLessonSlug"]
    StudentNextLesson["Next lesson<br/>if the teacher did not reveal anything"]
    StudentLesson["Lesson progresses<br/>rules -> simulator -> situations -> questions"]
    StudentSave["Ends the lesson<br/>progress is saved"]
  end

  subgraph Teacher["Teacher"]
    TeacherCabinet["Teacher's office<br/>/dashboard"]
    TeacherToday["Today<br />group, active lesson, students"]
    AddStudent["Adds student<br/>name, class, group"]
    OpenClassLesson["Opens a lesson to the class<br/>Open to class button"]
    CloseClassLesson["Closes the active lesson<br/>Close lesson button"]
    TeacherLessons["Lessons<br/>list of modules and lessons"]
    PreviewLesson["Lesson preview<br/>opens the material"]
    DownloadDocx["Downloads lesson plan .docx<br/>ready PhD document"]
    TeacherProgress["Student progress<br/>looks at group dynamics"]
  end

  subgraph Researcher["Researcher"]
    ResearcherCabinet["Research office<br/>/dashboard"]
    ResearcherOverview["Summary<br />schools, teachers, students, events"]
    ResearcherTeachers["Teachers<br/>creates and views teachers"]
    ResearcherStudents["Students<br/>list of experiment participants"]
    ResearcherFilters["Filters<br/>school, group, search"]
    ResearcherAddStudent["Adds a student<br/>link to a teacher"]
    ResearcherGroup["Changes group<br/>experimental / control"]
    ResearcherAnalytics["Analytics<br/>questionnaires, events, progress"]
    ResearcherExport["Data export<br/>downloads XLSX"]
  end

  subgraph Server["Server data and API"]
    AuthApi["/api/auth/*<br/>login, registration, session"]
    DashboardRoute["/dashboard<br/>single entry point to your account"]
    LessonRoute["/lesson/[slug]<br/>public and classroom lesson"]
    ClassApi["/api/class-state/*<br/>open class lesson"]
    ProgressApi["/api/progress/complete<br/>save lesson completion"]
    QuestionnaireApi["/api/questionnaires<br/>initial and final questionnaires"]
    TeacherApi["/api/teacher/students<br/>teacher’s students"]
    ResearcherApi["/api/researcher/*<br/>data, users, export"]
    DocxApi["/api/lessons/[slug]/docx<br/>download lesson plan"]
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

  OpenClassLesson -. "the student sees an open lesson" .-> StudentClassLesson
  StudentSave -. "the data is seen by the parent/teacher/researcher" .-> TeacherProgress
  QuestionnaireApi -. "questionnaires go into analytics" .-> ResearcherAnalytics

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
    title: "Detailed guest card",
    lead: "The path of a person who is not yet authorized: from the main page to choosing a role.",
    chart: String.raw`flowchart TD
  GuestStart["The guest opens uquvli.uz"]
  GuestHome["Home page<br/>reads who the platform is for"]
  GuestProgramClick["Clicks Program"]
  GuestProgram["Looks at areas<br/>diagnostics, health, everyday life, transport, communications, security, government services"]
  GuestLessonClick["Clicks the lesson card"]
  GuestLesson["Opens /lesson/[slug]<br/>reads the description and sees the training material"]
  GuestDecision{"What does it do next?"}
  GuestRegisterClick["Clicks Start training"]
  GuestRegister["Goes to /register"]
  GuestLoginClick["Clicks Login"]
  GuestLogin["Goes to /login"]
  GuestRole["Selects the role<br />parent / student / teacher / researcher"]
  GuestAuthApi["/api/auth/*<br/>a session is being created or verified"]
  GuestDashboard["/dashboard opens<br/>the platform shows the account by role"]

  GuestStart --> GuestHome
  GuestHome --> GuestProgramClick --> GuestProgram
  GuestProgram --> GuestLessonClick --> GuestLesson
  GuestHome --> GuestDecision
  GuestLesson --> GuestDecision
  GuestDecision -- "create an office" --> GuestRegisterClick --> GuestRegister --> GuestRole
  GuestDecision -- "already have access" --> GuestLoginClick --> GuestLogin --> GuestRole
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
    title: "Detailed parent card",
    lead: "Mandatory entrance questionnaire, parent's office, progress monitoring and final questionnaire.",
    chart: String.raw`flowchart TD
  ParentStart["The parent clicks Create Account / Login"]
  ParentAuth["Authorization or Registration<br/>/api/auth/login or /api/auth/register"]
  ParentSession["Parent session<br />role parent"]
  ParentCheck{"Is the initial form completed?"}
  ParentOnboarding["Fills out the initial form<br/>/onboarding/anketa"]
  ParentQuestionApi["Saving a questionnaire<br/>/api/questionnaires type=initial"]
  ParentDashboard["Parent's office<br/>/dashboard"]
  ParentToday["Today tab<br />general status of the child, next lesson, tips"]
  ParentLessons["The Lessons tab<br/>opens the child’s materials"]
  ParentProgress["The Progress tab<br/>shows completed lessons and dynamics"]
  ParentFamily["Family tab<br/>home rhythm, questionnaires, support"]
  ParentAccount["Account tab<br/>adult and child data"]
  ParentDone{"Are all lessons completed?"}
  ParentFinalCta["Sees an invitation<br/>to fill out an exit form"]
  ParentFinal["Fills out the final form<br/>type=final"]
  ParentFinalApi["Saving the final questionnaire<br/>/api/questionnaires"]
  ParentObserve["Continues to monitor<br />updated progress and results of the child"]
  ResearcherData["Data is available to the researcher<br/>initial / final questionnaires"]

  ParentStart --> ParentAuth --> ParentSession --> ParentCheck
  ParentCheck -- "No" --> ParentOnboarding --> ParentQuestionApi --> ParentDashboard
  ParentCheck -- "yes" --> ParentDashboard
  ParentDashboard --> ParentToday
  ParentDashboard --> ParentLessons
  ParentDashboard --> ParentProgress
  ParentDashboard --> ParentFamily
  ParentDashboard --> ParentAccount
  ParentToday --> ParentDone
  ParentLessons --> ParentDone
  ParentProgress --> ParentDone
  ParentDone -- "No" --> ParentObserve
  ParentDone -- "yes" --> ParentFinalCta --> ParentFinal --> ParentFinalApi --> ParentObserve
  ParentQuestionApi -. "gets into analytics" .-> ResearcherData
  ParentFinalApi -. "before/after comparison" .-> ResearcherData

  classDef parent fill:#e9f8f2,stroke:#168661,color:#10213b
  classDef api fill:#f8fafc,stroke:#64748b,color:#10213b
  classDef decision fill:#fff4d6,stroke:#b26a00,color:#10213b
  class ParentStart,ParentSession,ParentOnboarding,ParentDashboard,ParentToday,ParentLessons,ParentProgress,ParentFamily,ParentAccount,ParentFinalCta,ParentFinal,ParentObserve parent
  class ParentAuth,ParentQuestionApi,ParentFinalApi,ResearcherData api
  class ParentCheck,ParentDone decision`,
  },
  {
    id: "student",
    title: "Detailed student card",
    lead: "A simplified student path: code, an active lesson from a teacher or the next lesson, passing and saving progress.",
    chart: String.raw`flowchart TD
  StudentStart["Student opens the entrance"]
  StudentCode["Press the Student role<br/>or enter the code and password"]
  StudentAuth["The system checks access<br/>/api/auth/login"]
  StudentCabinet["Student's office<br/>/dashboard"]
  StudentToday["Today screen<br/>one big start button"]
  ClassStateRequest["Checking the active lesson<br/>/api/class-state"]
  StudentDecision{"Did the teacher open the lesson to the class?"}
  StudentOpened["Opens a class lesson<br />classState.openLessonSlug"]
  StudentNext["The next available lesson opens<br/>if there is no active lesson"]
  LessonRoute["Go to /lesson/[slug]"]
  StudentRules["Reads the lesson rules<br/>clicks Next"]
  StudentTrainer["The simulator passes<br/>acts as in the application or situation"]
  StudentScenario["Analyzes situations<br/>chooses a calm and safe answer"]
  StudentQuiz["Answers short questions"]
  StudentFinish["Clicks Finish lesson"]
  StudentProgressApi["Progress is saved<br/>/api/progress/complete"]
  StudentReturn["Returns to office<br/>sees updated progress"]
  ParentSees["Parent sees child's progress"]
  TeacherSees["The teacher sees the group’s progress"]
  ResearcherSees["The researcher sees the event and progress"]

  StudentStart --> StudentCode --> StudentAuth --> StudentCabinet --> StudentToday
  StudentToday --> ClassStateRequest --> StudentDecision
  StudentDecision -- "yes" --> StudentOpened --> LessonRoute
  StudentDecision -- "No" --> StudentNext --> LessonRoute
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
    title: "Detailed teacher card",
    lead: "Working with the class: students, opening a lesson to the class, closing an active lesson, .docx plans and progress.",
    chart: String.raw`flowchart TD
  TeacherStart["The teacher clicks Login"]
  TeacherAuth["Authorization<br/>mail/code and password"]
  TeacherDashboard["Teacher's office<br/>/dashboard"]
  TeacherToday["Today tab<br/>group, students, active lesson"]
  TeacherAddClick["Clicks Add student"]
  TeacherAddForm["Fills in data<br/>name, class, group, notes"]
  TeacherAddApi["Creating students<br/>/api/teacher/students"]
  TeacherOpen["Selects a lesson<br/>clicks Open to class"]
  TeacherClassApi["Server saves active lesson<br/>/api/class-state/open"]
  StudentSees["Students see this lesson<br />in their classroom"]
  TeacherClose["Clicks Close lesson"]
  TeacherCloseApi["The server closes the active lesson<br/>/api/class-state/close"]
  TeacherLessons["Lessons tab<br/>list of modules and lessons"]
  TeacherPreview["Opens preview<br/>/lesson/[slug]"]
  TeacherDocxClick["Clicks Lesson Plan .docx"]
  TeacherDocxApi["Downloading the document<br/>/api/lessons/[slug]/docx"]
  TeacherDocxFile["Receives a finished PhD document<br/>one-to-one according to the lesson template"]
  TeacherProgress["Tab Progress / students<br/>views progress and results"]
  TeacherAccount["Account<br/>school and group details"]

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
  StudentSees -. "upon completion by students" .-> TeacherProgress

  classDef teacher fill:#f0edff,stroke:#6750c8,color:#10213b
  classDef api fill:#f8fafc,stroke:#64748b,color:#10213b
  classDef file fill:#e9f8f2,stroke:#168661,color:#10213b
  class TeacherStart,TeacherDashboard,TeacherToday,TeacherAddClick,TeacherAddForm,TeacherOpen,StudentSees,TeacherClose,TeacherLessons,TeacherPreview,TeacherDocxClick,TeacherProgress,TeacherAccount teacher
  class TeacherAuth,TeacherAddApi,TeacherClassApi,TeacherCloseApi,TeacherDocxApi api
  class TeacherDocxFile file`,
  },
  {
    id: "researcher",
    title: "Detailed explorer map",
    lead: "Research office: teachers, students, filters, groups, questionnaires, events, progress and XLSX export.",
    chart: String.raw`flowchart TD
  ResearcherStart["The researcher clicks Login"]
  ResearcherAuth["Authorization<br/>researcher role"]
  ResearcherCabinet["Research office<br/>/dashboard"]
  ResearcherLoad["Loading data<br/>/api/researcher/data"]
  ResearcherSummary["Summary<br/>schools, teachers, students, events"]
  ResearcherTeachers["The Teachers section<br/>creates and views teachers"]
  ResearcherCreateTeacher["Created by teacher<br/>/api/researcher/users"]
  ResearcherStudents["The Students section<br/>sees all participants"]
  ResearcherFilter["Filters the list<br/>school, group, search by name"]
  ResearcherAdd["Adds a student<br/>selects a teacher and group"]
  ResearcherAddApi["Creating a member<br/>/api/researcher/users"]
  ResearcherGroup["Changes student group<br/>experimental / control"]
  ResearcherGroupApi["Group update<br/>/api/researcher/students/[studentId]"]
  ResearcherDetail["Opens student card<br/>progress, teacher, school, questionnaires"]
  ResearcherEvents["Looks at the event log<br />lesson start, answers, hints, completion"]
  ResearcherQuestionnaires["Looks at profiles<br/>initial / final"]
  ResearcherAnalytics["Looks at analytics<br/>comparison of groups and dynamics"]
  ResearcherExportClick["Clicks Export XLSX"]
  ResearcherExportApi["Generating file<br/>/api/researcher/export/xlsx"]
  ResearcherExportFile["Downloads a table<br/>for analysis of the study"]

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
  ResearcherQuestionnaires -. "questionnaire data" .-> ResearcherAnalytics
  ResearcherEvents -. "lesson events" .-> ResearcherAnalytics
  ResearcherDetail -. "individual dynamics" .-> ResearcherAnalytics

  classDef researcher fill:#fff0f3,stroke:#bf3e5b,color:#10213b
  classDef api fill:#f8fafc,stroke:#64748b,color:#10213b
  classDef file fill:#e9f8f2,stroke:#168661,color:#10213b
  class ResearcherStart,ResearcherCabinet,ResearcherSummary,ResearcherTeachers,ResearcherCreateTeacher,ResearcherStudents,ResearcherFilter,ResearcherAdd,ResearcherGroup,ResearcherDetail,ResearcherEvents,ResearcherQuestionnaires,ResearcherAnalytics,ResearcherExportClick researcher
  class ResearcherAuth,ResearcherLoad,ResearcherAddApi,ResearcherGroupApi,ResearcherExportApi api
  class ResearcherExportFile file`,
  },
  {
    id: "data",
    title: "Map of data and server interactions",
    lead: "What happens after clicks: authorization, lessons, classState, progress, questionnaires, documents and export.",
    chart: String.raw`flowchart LR
  UserAction["User action<br/>click, form, completing a lesson"]

  Auth["Login / Registration<br/>/api/auth/*"]
  Session["User session<br/>role and profile"]
  Dashboard["Cabinet<br/>/dashboard"]
  Lesson["Lesson<br/>/lesson/[slug]"]
  ClassState["Open class lesson<br/>/api/class-state/*"]
  Progress["Lesson progress<br/>/api/progress/complete"]
  Questionnaires["Questionnaires<br/>/api/questionnaires"]
  TeacherStudents["Teacher's students<br/>/api/teacher/students"]
  Researcher`,
  },
];

export default function SiteMapPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="journey-title">
        <div className={styles.heroText}>
          <span className={styles.kicker}>Mermaid card in browser</span>
          <h1 id="journey-title" className={styles.title}>Map of user paths UQUVLI.UZ</h1>
          <p className={styles.lead}>These are the same Mermaid diagrams, but already drawn on the website. Can be opened
            link, show on your computer and follow the detailed flow of each
            roles without editors and special programs.</p>
        </div>

        <aside className={styles.sharePanel} aria-label="Submit link">
          <span>Submit link</span>
          <a href={shareUrl}>{shareUrl}</a>
          <p>Large diagrams can be scrolled horizontally within the block.</p>
        </aside>
      </section>

      <nav className={styles.toc} aria-label="Scheme navigation">
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
                <span className={styles.sectionKicker}>Diagram {index + 1} of {diagramSections.length}</span>
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
