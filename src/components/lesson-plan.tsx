"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import type { LessonMethodology } from "@/data/program";

type Props = {
  methodology: LessonMethodology;
  /* UI Module */
  totalDuration?: string;
};

const dict = {
  ru: {
    objective: "Purpose of the lesson",
    duration: "Duration",
    minutesShort: "i",
    stagesCount: "Stages",
    tasksTitle: "Lesson Objectives",
    materialsTitle: "What to prepare",
    flowTitle: "Lesson progress",
    teacherSays: "The teacher says",
    teacherDoes: "The teacher does",
    students: "Students",
    tip: "Council",
    differentiation: "Adaptation by level",
    homework: "Homework",
    safety: "Safety and Behavior",
  },
  uz: {
    objective: "Dars maqsadi",
    duration: "Davomiyligi",
    minutesShort: "daq",
    stagesCount: "Bosqichlar",
    tasksTitle: "Dars vazifalari",
    materialsTitle: "Nima tayyorlash kerak",
    flowTitle: "Dars borishi",
    teacherSays: "Oʻqituvchi gapiradi",
    teacherDoes: "Oʻqituvchi bajaradi",
    students: "Oʻquvchilar",
    tip: "Maslahat",
    differentiation: "Daraja boʻyicha moslashtirish",
    homework: "Uy vazifasi",
    safety: "Xavfsizlik va xulq-atvor",
  },
} as const;

export function LessonPlan({ methodology, totalDuration }: Props) {
  const locale = useLocale();
  const t = dict[locale];
  const [activeStage, setActiveStage] = useState<number>(0);

  const totalMinutes = methodology.stages.reduce((sum, s) => {
    const n = parseInt(s.duration, 10);
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <div className="lesson-plan">
      {/* Overview */}
      <div className="lesson-plan-head">
        <div className="lesson-plan-objective">
          <p className="lesson-plan-eyebrow">{t.objective}</p>
          <p className="lesson-plan-objective-text">{methodology.objective}</p>
        </div>
        <div className="lesson-plan-meta">
          <div className="lesson-plan-meta-item">
            <span>{t.duration}</span>
            <strong>{totalDuration ?? `${totalMinutes} ${t.minutesShort}`}</strong>
          </div>
          <div className="lesson-plan-meta-item">
            <span>{t.stagesCount}</span>
            <strong>{methodology.stages.length}</strong>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <details className="lesson-plan-block" open>
        <summary>{t.tasksTitle}</summary>
        <ul className="lesson-plan-list">
          {methodology.tasks.map((task, i) => <li key={i}>{task}</li>)}
        </ul>
      </details>

      {/* Materials */}
      <details className="lesson-plan-block">
        <summary>{t.materialsTitle}</summary>
        <ul className="lesson-plan-list">
          {methodology.materials.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      </details>

      {/* Timeline of stages */}
      <div className="lesson-plan-timeline">
        <p className="lesson-plan-eyebrow">{t.flowTitle}</p>
        <div className="lesson-plan-stages">
          {methodology.stages.map((stage, i) => (
            <button
              key={i}
              type="button"
              className={`lesson-plan-stage-chip${activeStage === i ? " active" : ""}`}
              onClick={() => setActiveStage(i)}
            >
              <span className="lesson-plan-stage-duration">{stage.duration}</span>
              <span className="lesson-plan-stage-title">{stage.title}</span>
            </button>
          ))}
        </div>

        {/* Active stage details */}
        {methodology.stages[activeStage] ? (
          <div className="lesson-plan-stage-detail">
            <div className="lesson-plan-stage-header">
              <span className="lesson-plan-stage-badge">{methodology.stages[activeStage].duration}</span>
              <h4>{methodology.stages[activeStage].title}</h4>
            </div>

            {methodology.stages[activeStage].teacherSays ? (
              <div className="lesson-plan-says">
                <p className="lesson-plan-eyebrow">{t.teacherSays}</p>
                <blockquote>«{methodology.stages[activeStage].teacherSays}»</blockquote>
              </div>
            ) : null}

            <div className="lesson-plan-does">
              <p className="lesson-plan-eyebrow">{t.teacherDoes}</p>
              <ol className="lesson-plan-list">
                {methodology.stages[activeStage].teacherDoes.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ol>
            </div>

            {methodology.stages[activeStage].studentActivity ? (
              <div className="lesson-plan-students">
                <p className="lesson-plan-eyebrow">{t.students}</p>
                <p>{methodology.stages[activeStage].studentActivity}</p>
              </div>
            ) : null}

            {methodology.stages[activeStage].hint ? (
              <div className="lesson-plan-hint">
                <strong>{t.tip}</strong>
                <p>{methodology.stages[activeStage].hint}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Differentiation / homework / safety */}
      {methodology.differentiation ? (
        <details className="lesson-plan-block">
          <summary>{t.differentiation}</summary>
          <p className="lesson-plan-prose">{methodology.differentiation}</p>
        </details>
      ) : null}

      {methodology.homework ? (
        <details className="lesson-plan-block">
          <summary>{t.homework}</summary>
          <p className="lesson-plan-prose">{methodology.homework}</p>
        </details>
      ) : null}

      {methodology.safetyNote ? (
        <details className="lesson-plan-block">
          <summary>{t.safety}</summary>
          <p className="lesson-plan-prose">{methodology.safetyNote}</p>
        </details>
      ) : null}
    </div>
  );
}
