"use client";

import { useState } from "react";
import Link from "next/link";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { LessonExperience } from "@/components/lesson-experience";
import { LessonPlayer } from "@/components/lesson-player";
import type { ProgramLesson } from "@/data/program";
import type { AccessibilitySupportType } from "@/lib/adaptation/adaptation-types";
import { PRESET_PROFILES } from "@/lib/adaptation/adaptation-types";
import { adaptLesson } from "@/lib/adaptation/adaptation-engine";
import { resolveStylingRules } from "@/lib/adaptation/adaptation-rules";

type AdaptiveLessonViewProps = {
  originalLesson: ProgramLesson;
  initialProfile?: AccessibilitySupportType;
  dict: {
    allDirections: string;
    saveProgress: string;
    rulesCardCopy: string;
  };
  cardArt?: LessonItemArtId;
};

export function AdaptiveLessonView({
  originalLesson,
  initialProfile = "none",
  dict,
  cardArt,
}: AdaptiveLessonViewProps) {
  const [activeProfile, setActiveProfile] =
    useState<AccessibilitySupportType>(initialProfile);

  const profileConfig = PRESET_PROFILES[activeProfile];
  const adaptedLesson = adaptLesson(originalLesson, profileConfig);
  const stylingRules = resolveStylingRules(profileConfig);

  return (
    <div className={`mosaic-lesson-container ${stylingRules.containerClassName}`}>
      {/* Floating Interactive Adaptation Switcher for Demo / Students */}
      <div className="mosaic-adaptive-toolbar" role="region" aria-label="Accessibility & Support Profiles">
        <div className="home-wrap mosaic-toolbar-inner">
          <div className="mosaic-toolbar-brand">
            <span className="mosaic-sparkle-icon" style={{ fontSize: "0.78rem", fontWeight: 850 }}>AI</span>
            <div>
              <strong style={{ fontSize: "0.86rem", color: "var(--ink)", display: "block" }}>
                Mosaic Adaptive Engine
              </strong>
              <span style={{ fontSize: "0.74rem", color: "var(--muted)" }}>
                {activeProfile === "none"
                  ? "Standard curriculum"
                  : `Active profile: ${activeProfile.toUpperCase()} support`}
              </span>
            </div>
          </div>

          <div className="mosaic-profile-toggle-group">
            <button
              type="button"
              className={`mosaic-profile-btn ${activeProfile === "none" ? "active" : ""}`}
              onClick={() => setActiveProfile("none")}
            >
              Standard
            </button>
            <button
              type="button"
              className={`mosaic-profile-btn ${activeProfile === "reading" ? "active" : ""}`}
              onClick={() => setActiveProfile("reading")}
            >
              Reading / Dyslexia
            </button>
            <button
              type="button"
              className={`mosaic-profile-btn ${activeProfile === "visual" ? "active" : ""}`}
              onClick={() => setActiveProfile("visual")}
            >
              Visual (Audio-First)
            </button>
            <button
              type="button"
              className={`mosaic-profile-btn ${activeProfile === "hearing" ? "active" : ""}`}
              onClick={() => setActiveProfile("hearing")}
            >
              Hearing (Captions)
            </button>
          </div>
        </div>
      </div>

      {/* Applied Adaptations Banner (When an adaptation is active) */}
      {activeProfile !== "none" && (
        <div className="mosaic-active-adaptation-banner">
          <div className="home-wrap mosaic-banner-content">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="mosaic-badge-pill">Adapted Experience</span>
              <span style={{ fontSize: "0.88rem", color: "var(--ink)" }}>
                {adaptedLesson.adaptationMeta.appliedRules.join(" · ")}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Public Hero Header */}
      <section className="lesson-public-hero">
        <div className="marketing-wrap lesson-public-head">
          <div className="marketing-copy">
            <span className="eyebrow">{adaptedLesson.moduleTitle}</span>
            <h1>{adaptedLesson.title}</h1>
            <p>{adaptedLesson.intro}</p>
            <div className="marketing-actions">
              <Link className="button button-secondary" href="/program">
                {dict.allDirections}
              </Link>
              <Link className="button button-primary" href="/register">
                {dict.saveProgress}
              </Link>
            </div>
          </div>

          <aside
            className={`lesson-public-card${cardArt ? " lesson-public-card--with-art" : ""}`}
          >
            {cardArt ? (
              <div className="lesson-public-card-art" aria-hidden="true">
                <LessonItemArt id={cardArt} size={136} />
              </div>
            ) : null}
            <span>{adaptedLesson.duration}</span>
            <strong>{adaptedLesson.rules.length}</strong>
            <p>{dict.rulesCardCopy}</p>
          </aside>
        </div>
      </section>

      {/* Main 10-Screen Lesson Player Renderer (100% preserved) */}
      <section className="marketing-section">
        <div className="marketing-wrap">
          {adaptedLesson.screens && adaptedLesson.screens.length > 0 ? (
            <LessonPlayer
              screens={adaptedLesson.screens}
              lessonTitle={adaptedLesson.title}
            />
          ) : (
            <LessonExperience lesson={adaptedLesson} />
          )}
        </div>
      </section>
    </div>
  );
}
