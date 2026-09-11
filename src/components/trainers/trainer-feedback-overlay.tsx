"use client";

type TrainerFeedbackOverlayProps = {
  tone: "good" | "soft";
  title: string;
  text: string;
  actionLabel: string;
  onAction: () => void;
};

export function TrainerFeedbackOverlay({
  tone,
  title,
  text,
  actionLabel,
  onAction,
}: TrainerFeedbackOverlayProps) {
  return (
    <div className={`trainer-feedback trainer-feedback--${tone}`}>
      <strong>{title}</strong>
      <p>{text}</p>
      <button
        type="button"
        className="button button-primary trainer-feedback-action"
        onClick={onAction}
      >
        {actionLabel}
      </button>
    </div>
  );
}
