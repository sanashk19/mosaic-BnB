"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProgramLesson } from "@/data/program";
import type { CurrentUser } from "@/lib/uquvli-types";
import type { AccessibilitySupportType } from "@/lib/adaptation/adaptation-types";
import { PRESET_PROFILES } from "@/lib/adaptation/adaptation-types";
import { adaptLesson } from "@/lib/adaptation/adaptation-engine";

type AdaptiveLessonStudioProps = {
  lessons: ProgramLesson[];
  students: CurrentUser[];
  onOpenLessonForClass?: (slug: string) => void;
  activeClassLessonSlug?: string | null;
};

type GenerationStep = "idle" | "analyzing" | "applying" | "preparing" | "ready";

const DEFAULT_SAMPLE_STUDENTS: Array<{
  id: string;
  name: string;
  supportType: AccessibilitySupportType;
  notes: string;
}> = [
  { id: "s1", name: "Aisha Karimova", supportType: "reading", notes: "Needs short sentences & audio support" },
  { id: "s2", name: "Jasur Rahimov", supportType: "visual", notes: "Audio-first, requires interface descriptions" },
  { id: "s3", name: "Malika Yusupova", supportType: "hearing", notes: "Text-first with captions & visual cues" },
  { id: "s4", name: "Timur Aliev", supportType: "reading", notes: "Dyslexia profile, relaxed spacing" },
  { id: "s5", name: "Nodira Umarova", supportType: "none", notes: "Standard lesson format" },
];

export function AdaptiveLessonStudio({
  lessons,
  students,
  onOpenLessonForClass,
  activeClassLessonSlug,
}: AdaptiveLessonStudioProps) {
  // Choose default lesson (flagship messenger-message or first available)
  const defaultLesson =
    lessons.find((l) => l.slug === "messenger-message") ?? lessons[0];
  const [selectedSlug, setSelectedSlug] = useState<string>(
    defaultLesson?.slug ?? "",
  );

  // Student list state (combining real registered students with sample profiles for full hackathon demonstration)
  const [roster, setRoster] = useState(() => {
    if (students && students.length > 0) {
      return students.map((s, idx) => ({
        id: s.id,
        name: s.profile?.childName || s.name,
        supportType:
          s.accessibilityProfile?.supportType ||
          (idx % 3 === 0 ? "reading" : idx % 3 === 1 ? "visual" : "hearing"),
        notes: s.profile?.supportNotes || "Adaptive learning profile",
      }));
    }
    return DEFAULT_SAMPLE_STUDENTS;
  });

  const [generationStep, setGenerationStep] = useState<GenerationStep>("idle");
  const [activePreviewTab, setActivePreviewTab] =
    useState<AccessibilitySupportType>("reading");

  const currentLesson =
    lessons.find((l) => l.slug === selectedSlug) ?? defaultLesson;

  // Handle support profile change for a student in roster
  function updateStudentSupport(
    studentId: string,
    newSupport: AccessibilitySupportType,
  ) {
    setRoster((prev) =>
      prev.map((item) =>
        item.id === studentId ? { ...item, supportType: newSupport } : item,
      ),
    );
  }

  // Trigger adaptation generation workflow
  function handleGenerateAdaptations() {
    setGenerationStep("analyzing");
    setTimeout(() => {
      setGenerationStep("applying");
      setTimeout(() => {
        setGenerationStep("preparing");
        setTimeout(() => {
          setGenerationStep("ready");
        }, 600);
      }, 600);
    }, 600);
  }

  // Generate adapted lesson for active preview tab
  const adaptedLesson = currentLesson
    ? adaptLesson(currentLesson, PRESET_PROFILES[activePreviewTab])
    : null;

  // Compute profile counts
  const readingCount = roster.filter((s) => s.supportType === "reading").length;
  const visualCount = roster.filter((s) => s.supportType === "visual").length;
  const hearingCount = roster.filter((s) => s.supportType === "hearing").length;

  return (
    <div className="adaptive-studio-card" style={{ marginBottom: "36px" }}>
      {/* Studio Header */}
      <div className="adaptive-studio-head">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "rgba(13, 80, 207, 0.1)",
              fontSize: "0.85rem",
              fontWeight: 800,
              color: "var(--blue, #0d50cf)",
            }}
          >
            AI
          </span>
          <div>
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--blue, #0d50cf)",
              }}
            >
              Mosaic Engine
            </span>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 750, color: "var(--ink)" }}>
              Adaptive Lesson Studio
            </h2>
          </div>
        </div>

        {/* Lesson Selector */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label htmlFor="studio-lesson-select" style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--muted)" }}>
            Lesson:
          </label>
          <select
            id="studio-lesson-select"
            value={selectedSlug}
            onChange={(e) => {
              setSelectedSlug(e.target.value);
              setGenerationStep("idle");
            }}
            className="adaptive-studio-select"
          >
            {lessons.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Roster & Profile Summary */}
      <div className="adaptive-studio-roster-summary">
        <div className="adaptive-roster-metric">
          <strong>{roster.length}</strong>
          <span>Total Students</span>
        </div>
        <div className="adaptive-roster-metric">
          <strong style={{ color: "var(--blue)" }}>{readingCount}</strong>
          <span>Reading Support</span>
        </div>
        <div className="adaptive-roster-metric">
          <strong style={{ color: "var(--green)" }}>{visualCount}</strong>
          <span>Visual Support</span>
        </div>
        <div className="adaptive-roster-metric">
          <strong style={{ color: "var(--teal, #008080)" }}>{hearingCount}</strong>
          <span>Hearing Support</span>
        </div>
      </div>

      <p style={{ color: "var(--muted)", fontSize: "0.95rem", maxWidth: "680px", marginBottom: "20px" }}>
        One lesson. Multiple personalized experiences. Review learner support profiles in your classroom and click &ldquo;Adapt for my learners&rdquo; to generate customized formats automatically.
      </p>

      {/* Roster & Learner Needs Mapping Table */}
      <div className="adaptive-roster-card" style={{ marginBottom: "24px" }}>
        <div className="adaptive-roster-head">
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Class Learner Support Profiles</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
              Customize or review learner support profiles for this class session.
            </p>
          </div>
          <div className="adaptive-profile-counts">
            <span className="adaptive-chip chip-reading">Reading: {readingCount}</span>
            <span className="adaptive-chip chip-visual">Visual: {visualCount}</span>
            <span className="adaptive-chip chip-hearing">Hearing: {hearingCount}</span>
          </div>
        </div>

        <div className="adaptive-roster-table-wrap">
          <table className="adaptive-roster-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Current Support Profile</th>
                <th>Classroom Notes</th>
              </tr>
            </thead>
            <tbody>
              {roster.map((student) => (
                <tr key={student.id}>
                  <td>
                    <strong>{student.name}</strong>
                  </td>
                  <td>
                    <select
                      value={student.supportType}
                      onChange={(e) =>
                        updateStudentSupport(
                          student.id,
                          e.target.value as AccessibilitySupportType,
                        )
                      }
                      className="adaptive-profile-badge-select"
                    >
                      <option value="reading">Reading / Dyslexia Support</option>
                      <option value="visual">Visual Support (Audio-First)</option>
                      <option value="hearing">Hearing Support (Captions)</option>
                      <option value="none">Standard Profile</option>
                    </select>
                  </td>
                  <td style={{ color: "var(--muted)", fontSize: "0.86rem" }}>
                    {student.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generation Workflow CTA & States */}
      {generationStep === "idle" && (
        <div className="adaptive-studio-action-bar">
          <button
            type="button"
            className="button button-primary"
            onClick={handleGenerateAdaptations}
            style={{
              padding: "14px 28px",
              fontSize: "1rem",
              fontWeight: 700,
              boxShadow: "0 8px 24px rgba(13, 80, 207, 0.25)",
            }}
          >
            Adapt for my learners
          </button>
          <span style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
            Automatically creates personalized experiences for all {roster.length} students based on their support profiles.
          </span>
        </div>
      )}

      {/* Generating Progress State */}
      {generationStep !== "idle" && generationStep !== "ready" && (
        <div className="adaptive-studio-generating-box">
          <div className="adaptive-spinner" />
          <div style={{ textAlign: "center" }}>
            <strong style={{ fontSize: "1.1rem", color: "var(--ink)", display: "block" }}>
              {generationStep === "analyzing" && "Analyzing lesson structure..."}
              {generationStep === "applying" && "Applying learner profiles & accessibility rules..."}
              {generationStep === "preparing" && "Preparing personalized experiences..."}
            </strong>
            <span style={{ fontSize: "0.88rem", color: "var(--muted)", marginTop: "4px" }}>
              Tailoring content chunks, audio descriptions, and visual captions.
            </span>
          </div>
        </div>
      )}

      {/* Ready State: 3 Personalized Versions Ready */}
      {generationStep === "ready" && adaptedLesson && (
        <div className="adaptive-studio-results">
          <div className="adaptive-results-header">
            <div>
              <span className="adaptive-badge-success">3 personalized versions ready</span>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 750, marginTop: "6px" }}>
                Adaptation Preview & Class Controls
              </h3>
            </div>
            {onOpenLessonForClass && (
              <button
                type="button"
                className="button button-primary"
                onClick={() => onOpenLessonForClass(currentLesson?.slug ?? "")}
              >
                {activeClassLessonSlug === currentLesson?.slug
                  ? "Lesson Currently Open for Class"
                  : "Deploy & Open for Class"}
              </button>
            )}
          </div>

          {/* Version Switcher Tabs */}
          <div className="adaptive-tabs-nav">
            <button
              type="button"
              className={`adaptive-tab-btn ${activePreviewTab === "reading" ? "active" : ""}`}
              onClick={() => setActivePreviewTab("reading")}
            >
              Reading Support ({readingCount} students)
            </button>
            <button
              type="button"
              className={`adaptive-tab-btn ${activePreviewTab === "visual" ? "active" : ""}`}
              onClick={() => setActivePreviewTab("visual")}
            >
              Visual Support ({visualCount} students)
            </button>
            <button
              type="button"
              className={`adaptive-tab-btn ${activePreviewTab === "hearing" ? "active" : ""}`}
              onClick={() => setActivePreviewTab("hearing")}
            >
              Hearing Support ({hearingCount} students)
            </button>
          </div>

          {/* Adaptation Settings Summary & Preview Card */}
          <div className="adaptive-preview-grid">
            {/* Left: Active Adaptations Checklist */}
            <div className="adaptive-settings-card">
              <h4 style={{ fontSize: "0.98rem", fontWeight: 700, marginBottom: "14px", color: "var(--ink)" }}>
                Active Adaptations for {activePreviewTab.toUpperCase()} Profile
              </h4>
              <ul className="adaptive-rules-checklist">
                {adaptedLesson.adaptationMeta.appliedRules.map((rule) => (
                  <li key={rule}>
                    <span className="check">&bull;</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <Link
                  href={`/lesson/${currentLesson?.slug}?profile=${activePreviewTab}`}
                  target="_blank"
                  className="button button-secondary small"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Preview Learner Experience &rarr;
                </Link>
              </div>
            </div>

            {/* Right: Original vs Adapted Content Preview */}
            <div className="adaptive-content-diff-card">
              <div className="adaptive-diff-column">
                <span className="diff-label">Original Lesson</span>
                <strong style={{ fontSize: "1.05rem", display: "block", marginBottom: "8px" }}>
                  {currentLesson?.title}
                </strong>
                <p style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.5 }}>
                  {currentLesson?.summary}
                </p>
                <div style={{ marginTop: "12px" }}>
                  <span style={{ fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)" }}>
                    Original Rule:
                  </span>
                  <p style={{ fontSize: "0.85rem", marginTop: "4px" }}>
                    {currentLesson?.rules[0] ?? "Follow instructions in the application."}
                  </p>
                </div>
              </div>

              <div className="adaptive-diff-column adapted">
                <span className="diff-label highlight">Adapted for Learner</span>
                <strong style={{ fontSize: "1.05rem", display: "block", marginBottom: "8px", color: "var(--blue)" }}>
                  {adaptedLesson.title}
                </strong>
                <p style={{ fontSize: "0.88rem", color: "var(--ink)", lineHeight: 1.5 }}>
                  {adaptedLesson.adaptationMeta.simplifiedSummary}
                </p>
                <div style={{ marginTop: "12px" }}>
                  <span style={{ fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", color: "var(--blue)" }}>
                    Adapted Rule:
                  </span>
                  <p style={{ fontSize: "0.85rem", marginTop: "4px", fontWeight: 600 }}>
                    {adaptedLesson.rules[0] ?? "Simplified step guideline."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
