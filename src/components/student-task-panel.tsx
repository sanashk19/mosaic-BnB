"use client";

import type { ReactNode } from "react";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";

const dict = {
  ru: {
    panelLabel: "Lesson assignment",
    instructionLabel: "What to do",
    question: "Question",
    answersLabel: "Answer options",
    hint: "Clue",
  },
  uz: {
    panelLabel: "Lesson assignment",
    instructionLabel: "What to do",
    question: "Question",
    answersLabel: "Answer options",
    hint: "Clue",
  },
} as const;

export type StudentTaskPanelAnswerState =
  | "idle"
  | "selected"
  | "correct"
  | "wrong"
  | "muted";

export type StudentTaskPanelAnswer = {
  id: string;
  text: string;
  detail?: string;
  label?: string;
  state?: StudentTaskPanelAnswerState;
  disabled?: boolean;
  onClick?: () => void;
};

export type StudentTaskPanelFeedback = {
  tone: "good" | "soft" | "neutral";
  title: string;
  text: string;
};

export type StudentTaskPanelAction = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
};

type StudentTaskPanelProps = {
  title: string;
  instruction: string;
  question?: string;
  status?: string;
  answers?: StudentTaskPanelAnswer[];
  hint?: string;
  feedback?: StudentTaskPanelFeedback | null;
  primaryAction?: StudentTaskPanelAction;
  secondaryAction?: StudentTaskPanelAction;
  children?: ReactNode;
};

function actionClassName(action: StudentTaskPanelAction) {
  if (action.variant === "ghost") return "button button-ghost student-task-action";
  if (action.variant === "secondary") return "button button-secondary student-task-action";
  return "button button-primary student-task-action";
}

export function StudentTaskPanel({
  title,
  instruction,
  question,
  status,
  answers = [],
  hint,
  feedback,
  primaryAction,
  secondaryAction,
  children,
}: StudentTaskPanelProps) {
  const locale = useLocale();
  const t = dict[locale];
  const showStatus = Boolean(status && !feedback);
  const showHint = Boolean(hint && !feedback);

  return (
    <aside className="student-task-panel" aria-label={t.panelLabel}>
      <div className="student-task-head">
        <span className="student-task-head-icon" aria-hidden="true">
          <CabinetIcon name="check" />
        </span>
        <div>
          <p className="student-task-label">{t.instructionLabel}</p>
          <h2>{title}</h2>
        </div>
      </div>

      <p className="student-task-instruction">{instruction}</p>

      {showStatus ? <p className="student-task-status">{status}</p> : null}

      {question ? (
        <div className="student-task-question">
          <span>{t.question}</span>
          <p>{question}</p>
        </div>
      ) : null}

      {answers.length > 0 ? (
        <div className="student-task-answers" aria-label={t.answersLabel}>
          {answers.map((answer, index) => {
            const state = answer.state ?? "idle";
            return (
              <button
                key={answer.id}
                type="button"
                className={`student-task-answer student-task-answer--${state}`}
                onClick={answer.onClick}
                disabled={answer.disabled || !answer.onClick}
              >
                <span className="student-task-answer-marker">
                  {state === "correct" ? (
                    <CabinetIcon name="check" />
                  ) : state === "wrong" ? (
                    <CabinetIcon name="x" />
                  ) : (
                    answer.label ?? index + 1
                  )}
                </span>
                <span className="student-task-answer-copy">
                  <strong>{answer.text}</strong>
                  {answer.detail ? <small>{answer.detail}</small> : null}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      {children ? <div className="student-task-extra">{children}</div> : null}

      {showHint ? (
        <details className="student-task-hint">
          <summary>{t.hint}</summary>
          <p>{hint}</p>
        </details>
      ) : null}

      {feedback ? (
        <div className={`student-task-feedback student-task-feedback--${feedback.tone}`}>
          <strong>{feedback.title}</strong>
          <p>{feedback.text}</p>
        </div>
      ) : null}

      {primaryAction || secondaryAction ? (
        <div className="student-task-actions">
          {primaryAction ? (
            <button
              type="button"
              className={actionClassName(primaryAction)}
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
            >
              {primaryAction.label}
            </button>
          ) : null}
          {secondaryAction ? (
            <button
              type="button"
              className={actionClassName(secondaryAction)}
              onClick={secondaryAction.onClick}
              disabled={secondaryAction.disabled}
            >
              {secondaryAction.label}
            </button>
          ) : null}
        </div>
      ) : null}
    </aside>
  );
}
