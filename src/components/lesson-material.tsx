"use client";

import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import { LessonPlan } from "@/components/lesson-plan";
import type { ProgramLesson } from "@/data/program";

type LessonMaterialProps = {
  lesson: ProgramLesson;
  role: "teacher" | "parent";
};

const trainerLabelsByLocale: Record<"ru" | "uz", Record<string, string>> = {
  ru: {
    telegram: "Telegram",
    gmail: "Gmail",
    uzum: "Uzum Market",
    mygov: "Госуслуги",
    phone: "Звонок",
  },
  uz: {
    telegram: "Telegram",
    gmail: "Gmail",
    uzum: "Uzum Market",
    mygov: "Davlat xizmatlari",
    phone: "Qoʻngʻiroq",
  },
};

const dict = {
  ru: {
    materialAria: (title: string) => `Материал урока: ${title}`,
    planTitle: "План урока — как проводить",
    goalsTitle: "Цели урока",
    rulesTitle: "Правила для ребёнка",
    trainerTitle: "Тренажёр в уроке",
    trainerIntro1: "Ученик откроет интерфейс, похожий на реальный ",
    trainerIntro2: ", и попробует выполнить задачу с подсказками.",
    taskLabel: "Задача:",
    scenariosTitle: (count: number) => `Учебные ситуации (${count})`,
    situation: "Ситуация",
    correct: "правильный",
    feedbackLabel: "Обратная связь:",
    supportLabel: "Подсказка взрослому:",
    quizTitle: (count: number) => `Проверка знаний (${count} вопросов)`,
    question: "Вопрос",
    noteTeacher: "Заметка педагогу",
    noteParent: "Заметка для родителя",
    topicsTitle: "Темы урока",
  },
  uz: {
    materialAria: (title: string) => `Dars materiali: ${title}`,
    planTitle: "Dars rejasi — qanday oʻtkaziladi",
    goalsTitle: "Dars maqsadlari",
    rulesTitle: "Bola uchun qoidalar",
    trainerTitle: "Darsdagi mashq",
    trainerIntro1: "Oʻquvchi haqiqiy ",
    trainerIntro2: "ga oʻxshash interfeysni ochib, maslahatlar bilan vazifani bajarib koʻradi.",
    taskLabel: "Vazifa:",
    scenariosTitle: (count: number) => `Oʻquv vaziyatlari (${count})`,
    situation: "Vaziyat",
    correct: "toʻgʻri",
    feedbackLabel: "Qaytar aloqa:",
    supportLabel: "Kattalar uchun maslahat:",
    quizTitle: (count: number) => `Bilimni tekshirish (${count} ta savol)`,
    question: "Savol",
    noteTeacher: "Pedagog uchun eslatma",
    noteParent: "Ota-ona uchun eslatma",
    topicsTitle: "Dars mavzulari",
  },
} as const;

export function LessonMaterial({ lesson, role }: LessonMaterialProps) {
  const locale = useLocale();
  const t = dict[locale];
  const trainerLabels = trainerLabelsByLocale[locale];
  const isTeacher = role === "teacher";
  const trainerType = lesson.trainer?.type;
  const trainerLabel = trainerType ? trainerLabels[trainerType] ?? trainerType : null;

  return (
    <article className="lesson-material" aria-label={t.materialAria(lesson.title)}>
      <header className="lesson-material-head">
        <div className="lesson-material-eyebrow">
          <CabinetIcon name="book" />
          <span>{lesson.moduleTitle}</span>
          <span className="lesson-material-dot" aria-hidden="true">·</span>
          <span>{lesson.duration}</span>
        </div>
        <h2 className="lesson-material-title">{lesson.title}</h2>
        <p className="lesson-material-summary">{lesson.summary}</p>
        <p className="lesson-material-intro">{lesson.intro}</p>
      </header>

      {isTeacher && lesson.methodology ? (
        <section className="lesson-material-block lesson-material-methodology">
          <div className="lesson-material-block-head">
            <CabinetIcon name="clipboard" />
            <h3>{t.planTitle}</h3>
          </div>
          <LessonPlan methodology={lesson.methodology} totalDuration={lesson.duration} />
        </section>
      ) : null}

      <div className="lesson-material-grid">
        <section className="lesson-material-block lesson-material-goals">
          <div className="lesson-material-block-head">
            <CabinetIcon name="trophy" />
            <h3>{t.goalsTitle}</h3>
          </div>
          <ol className="lesson-material-list">
            {lesson.goals.map((goal, index) => (
              <li key={index}>
                <span className="lesson-material-num">{index + 1}</span>
                <span>{goal}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="lesson-material-block lesson-material-rules">
          <div className="lesson-material-block-head">
            <CabinetIcon name="clipboard" />
            <h3>{t.rulesTitle}</h3>
          </div>
          <ul className="lesson-material-list">
            {lesson.rules.map((rule, index) => (
              <li key={index}>
                <span className="lesson-material-bullet" aria-hidden="true">
                  <CabinetIcon name="check" />
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {trainerLabel ? (
        <section className="lesson-material-block lesson-material-trainer">
          <div className="lesson-material-block-head">
            <CabinetIcon name="flask" />
            <h3>{t.trainerTitle}</h3>
          </div>
          <p>
            {t.trainerIntro1}
            <strong>{trainerLabel}</strong>
            {t.trainerIntro2}
          </p>
          {lesson.trainer && "task" in lesson.trainer ? (
            <p className="lesson-material-trainer-task">
              <span className="lesson-material-trainer-label">{t.taskLabel}</span>
              {" "}
              {(lesson.trainer as { task: string }).task}
            </p>
          ) : null}
        </section>
      ) : null}

      <section className="lesson-material-block">
        <div className="lesson-material-block-head">
          <CabinetIcon name="chat" />
          <h3>{t.scenariosTitle(lesson.scenarios.length)}</h3>
        </div>
        <div className="lesson-material-scenarios">
          {lesson.scenarios.map((scenario, sIndex) => (
            <article key={sIndex} className="lesson-material-scenario">
              <header className="lesson-material-scenario-head">
                <span className="lesson-material-tag">{t.situation} {sIndex + 1}</span>
                <strong>{scenario.title}</strong>
              </header>
              <p className="lesson-material-scenario-text">{scenario.text}</p>
              <ul className="lesson-material-options">
                {scenario.options.map((option, oIndex) => {
                  const isCorrect = oIndex === scenario.correctIndex;
                  return (
                    <li
                      key={oIndex}
                      className={`lesson-material-option${isCorrect ? " is-correct" : ""}`}
                    >
                      <span className="lesson-material-option-mark" aria-hidden="true">
                        <CabinetIcon name={isCorrect ? "check" : "circle"} />
                      </span>
                      <span>{option}</span>
                      {isCorrect ? (
                        <span className="lesson-material-correct-label">{t.correct}</span>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
              {isTeacher ? (
                <div className="lesson-material-scenario-notes">
                  <p>
                    <strong>{t.feedbackLabel}</strong> {scenario.feedback}
                  </p>
                  <p className="lesson-material-support">
                    <strong>{t.supportLabel}</strong> {scenario.support}
                  </p>
                </div>
              ) : (
                <p className="lesson-material-scenario-feedback">{scenario.feedback}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="lesson-material-block">
        <div className="lesson-material-block-head">
          <CabinetIcon name="help" />
          <h3>{t.quizTitle(lesson.quiz.length)}</h3>
        </div>
        <div className="lesson-material-quiz">
          {lesson.quiz.map((question, qIndex) => (
            <article key={qIndex} className="lesson-material-quiz-item">
              <header>
                <span className="lesson-material-tag">{t.question} {qIndex + 1}</span>
                <p className="lesson-material-quiz-question">{question.question}</p>
              </header>
              <ul className="lesson-material-options">
                {question.options.map((option, oIndex) => {
                  const isCorrect = oIndex === question.correctIndex;
                  return (
                    <li
                      key={oIndex}
                      className={`lesson-material-option${isCorrect ? " is-correct" : ""}`}
                    >
                      <span className="lesson-material-option-mark" aria-hidden="true">
                        <CabinetIcon name={isCorrect ? "check" : "circle"} />
                      </span>
                      <span>{option}</span>
                      {isCorrect ? (
                        <span className="lesson-material-correct-label">{t.correct}</span>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="lesson-material-block lesson-material-note">
        <div className="lesson-material-block-head">
          <CabinetIcon name="alert" />
          <h3>{isTeacher ? t.noteTeacher : t.noteParent}</h3>
        </div>
        <p>{lesson.adultNote}</p>
      </section>

      {lesson.tags && lesson.tags.length > 0 ? (
        <footer className="lesson-material-footer">
          <span className="lesson-material-eyebrow">
            <CabinetIcon name="folder" />
            <span>{t.topicsTitle}</span>
          </span>
          <div className="lesson-material-tags">
            {lesson.tags.map((tag) => (
              <span key={tag} className="lesson-material-tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </footer>
      ) : null}
    </article>
  );
}
