"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LessonItemArt, type LessonItemArtId } from "@/components/lesson-item-art";
import { LessonExperience } from "@/components/lesson-experience";
import { LessonPlayer } from "@/components/lesson-player";
import type { ProgramLesson } from "@/data/program";
import type { AccessibilitySupportType } from "@/lib/adaptation/adaptation-types";
import { PRESET_PROFILES } from "@/lib/adaptation/adaptation-types";
import { adaptLesson } from "@/lib/adaptation/adaptation-engine";
import { resolveStylingRules } from "@/lib/adaptation/adaptation-rules";
import { stopNarration } from "@/lib/adaptation/adaptation-audio";

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

  // Stop any ongoing speech narration when switching profile
  function handleProfileChange(newProfile: AccessibilitySupportType) {
    stopNarration();
    setActiveProfile(newProfile);
  }

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, []);

  const profileConfig = PRESET_PROFILES[activeProfile];
  const adaptedLesson = adaptLesson(originalLesson, profileConfig);
  const stylingRules = resolveStylingRules(profileConfig, adaptedLesson.experience);

  return (
    <div className={`mosaic-lesson-container ${stylingRules.containerClassName}`}>
      {/* Interactive Adaptation Switcher Toolbar */}
      <div className="mosaic-adaptive-toolbar" role="region" aria-label="Learning Support Profile Switcher">
        <div className="home-wrap mosaic-toolbar-inner">
          <div className="mosaic-toolbar-brand">
            <span className="mosaic-sparkle-icon" style={{ fontSize: "0.78rem", fontWeight: 850 }}>AI</span>
            <div>
              <strong style={{ fontSize: "0.88rem", color: "var(--mosaic-ink)", display: "block" }}>
                Mosaic Adaptive Engine
              </strong>
              <span style={{ fontSize: "0.76rem", color: "var(--mosaic-muted)" }}>
                {activeProfile === "none"
                  ? "Standard curriculum (Baseline)"
                  : `Active profile: ${activeProfile === "reading" ? "Reading support" : activeProfile === "visual" ? "Visual support (Audio-First)" : "Hearing support (Captions)"}`}
              </span>
            </div>
          </div>

          <div className="mosaic-profile-toggle-group" role="group" aria-label="Choose adaptation profile">
            <button
              type="button"
              className={`mosaic-profile-btn ${activeProfile === "none" ? "active" : ""}`}
              onClick={() => handleProfileChange("none")}
              aria-pressed={activeProfile === "none"}
            >
              Standard
            </button>
            <button
              type="button"
              className={`mosaic-profile-btn ${activeProfile === "reading" ? "active" : ""}`}
              onClick={() => handleProfileChange("reading")}
              aria-pressed={activeProfile === "reading"}
            >
              Reading Support
            </button>
            <button
              type="button"
              className={`mosaic-profile-btn ${activeProfile === "visual" ? "active" : ""}`}
              onClick={() => handleProfileChange("visual")}
              aria-pressed={activeProfile === "visual"}
            >
              Visual (Audio-First)
            </button>
            <button
              type="button"
              className={`mosaic-profile-btn ${activeProfile === "hearing" ? "active" : ""}`}
              onClick={() => handleProfileChange("hearing")}
              aria-pressed={activeProfile === "hearing"}
            >
              Hearing (Captions)
            </button>
          </div>
        </div>
      </div>

      {/* Applied Adaptations Banner with active capabilities */}
      {activeProfile !== "none" && (
        <div className="mosaic-active-adaptation-banner" role="status" aria-live="polite">
          <div className="home-wrap mosaic-banner-content">
            <div className="mosaic-banner-badge-col">
              <span className="mosaic-badge-pill">
                {activeProfile === "reading"
                  ? "READING SUPPORT ACTIVE"
                  : activeProfile === "visual"
                    ? "VISUAL SUPPORT ACTIVE"
                    : "HEARING SUPPORT ACTIVE"}
              </span>
            </div>
            <div className="mosaic-banner-rules-list">
              {adaptedLesson.adaptationMeta.appliedRules.map((ruleText) => (
                <span key={ruleText} className="mosaic-banner-rule-item">
                  ✓ {ruleText}
                </span>
              ))}
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

      {/* Main Lesson Renderer with active profile and experience flags */}
      <section className="marketing-section">
        <div className="marketing-wrap">
          {adaptedLesson.screens && adaptedLesson.screens.length > 0 ? (
            <LessonPlayer
              key={activeProfile}
              screens={adaptedLesson.screens}
              lessonTitle={adaptedLesson.title}
            />
          ) : (
            <LessonExperience
              key={activeProfile}
              lesson={adaptedLesson}
            />
          )}
        </div>
      </section>
    </div>
  );
}
