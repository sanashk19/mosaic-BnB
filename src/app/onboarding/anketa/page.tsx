"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { useLocale } from "@/components/locale-provider";
import { questionnaireQuestions } from "@/data/questionnaires";
import {
  getQuestionnaire,
  submitQuestionnaire,
  type QuestionnaireAnswer,
} from "@/lib/auth-storage";

const questions = questionnaireQuestions.initial;

const englishOnboardingDict = {
  defaultChild: "your child",
  saveFailed: "Failed to save responses. Please try again.",
  loading: "Loading questionnaire...",
  step: "Parent Questionnaire",
  headingPrefix: "How confident is",
  headingSuffix: "with digital skills today?",
  lead: "This brief survey helps us measure your learner's growth and personalize lesson pacing. 5 short questions, rated 1 to 5.",
  filled: "Completed",
  of: "of",
  saving: "Saving responses...",
  finish: "Save and Return to Dashboard",
  backToDashboard: "Back to Parent Dashboard",
  logout: "Sign out and complete later",
};

const dict = {
  ru: englishOnboardingDict,
  uz: englishOnboardingDict,
} as const;

export default function OnboardingAnketaPage() {
  const router = useRouter();
  const { ready, user, logout } = useAuth();
  const locale = useLocale();
  const t = dict[locale];
  const [scores, setScores] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.role !== "parent") {
      router.replace("/dashboard");
      return;
    }

    let cancelled = false;
    void getQuestionnaire(user.id, "initial")
      .then((existing) => {
        if (cancelled) return;
        if (existing) {
          router.replace("/dashboard");
        } else {
          setChecking(false);
        }
      })
      .catch(() => {
        if (!cancelled) setChecking(false);
      });

    return () => {
      cancelled = true;
    };
  }, [ready, router, user]);

  const allAnswered = questions.every((q) => scores[q.id] !== undefined);
  const childName = user?.profile.childName || t.defaultChild;

  async function handleSubmit() {
    if (!user || !allAnswered || submitting) return;
    const answers: QuestionnaireAnswer[] = questions.map((q) => ({
      questionId: q.id,
      score: scores[q.id],
    }));

    setError("");
    setSubmitting(true);
    try {
      await submitQuestionnaire(user.id, "initial", answers);
      startTransition(() => {
        router.replace("/dashboard");
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : t.saveFailed,
      );
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  if (!ready || checking) {
    return (
      <main className="onboarding-page">
        <section className="onboarding-card onboarding-card--narrow">
          <p className="onboarding-loading">{t.loading}</p>
        </section>
      </main>
    );
  }

  const answeredCount = Object.keys(scores).length;

  return (
    <main className="onboarding-page">
      <section className="onboarding-card">
        <header className="onboarding-head">
          <span className="eyebrow">{t.step}</span>
          <h1>{t.headingPrefix} {childName} {t.headingSuffix}</h1>
          <p className="onboarding-lead">
            {t.lead}
          </p>
        </header>

        <div className="onboarding-progress">
          <div className="onboarding-progress-meta">
            <span>{t.filled}</span>
            <strong>{answeredCount} {t.of} {questions.length}</strong>
          </div>
          <div className="onboarding-progress-bar">
            <div
              className="onboarding-progress-fill"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <ol className="onboarding-questions">
          {questions.map((question, index) => (
            <li key={question.id} className="onboarding-question">
              <p className="onboarding-question-text">
                <span className="onboarding-question-number">{index + 1}.</span>
                {question.text}
              </p>
              <div className="onboarding-scale">
                <span className="onboarding-scale-label">{question.low}</span>
                <div
                  className="onboarding-options"
                  role="radiogroup"
                  aria-label={question.text}
                >
                  {[1, 2, 3, 4, 5].map((value) => {
                    const selected = scores[question.id] === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        className={`onboarding-option ${selected ? "onboarding-option--selected" : ""}`}
                        onClick={() =>
                          setScores((prev) => ({ ...prev, [question.id]: value }))
                        }
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
                <span className="onboarding-scale-label onboarding-scale-label--high">
                  {question.high}
                </span>
              </div>
            </li>
          ))}
        </ol>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="onboarding-footer">
          <button
            type="button"
            className="button button-primary full"
            disabled={!allAnswered || submitting}
            onClick={() => void handleSubmit()}
          >
            {submitting ? t.saving : t.finish}
          </button>
          <div className="flex flex-col items-center gap-2 mt-2">
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-[#506847] hover:underline"
            >
              {t.backToDashboard}
            </Link>
            <button
              type="button"
              className="onboarding-logout-link"
              onClick={() => void handleLogout()}
            >
              {t.logout}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
