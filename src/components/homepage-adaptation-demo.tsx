"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type LessonKey = "buying-online" | "staying-safe";

const LESSON_DEMOS: Record<
  LessonKey,
  {
    title: string;
    simplifiedSteps: string[];
    unsimplifiedText: string;
    simplifiedSpeech: string;
    unsimplifiedSpeech: string;
    visualSpeechBubble: string;
    captionText: string;
    captionKeyword: string;
  }
> = {
  "buying-online": {
    title: "Buying Online",
    simplifiedSteps: [
      "Choose the item.",
      "Check the price.",
      "Pay safely.",
      "Wait for delivery.",
    ],
    unsimplifiedText:
      "Follow established e-commerce protocols: verify the seller rating, confirm total charges including delivery fees, utilize a verified two-factor payment portal, and monitor shipment confirmation.",
    simplifiedSpeech:
      "Buying Online. Step one: Choose the item. Step two: Check the price. Step three: Pay safely. Step four: Wait for delivery.",
    unsimplifiedSpeech:
      "Buying Online. Follow established e-commerce protocols: verify the seller rating, confirm total charges including delivery fees, utilize a verified two-factor payment portal, and monitor shipment confirmation.",
    visualSpeechBubble:
      "This is a login screen. There is a username field, a password field, and a blue sign in button.",
    captionText: "Always check if the website address starts with https://",
    captionKeyword: "https://",
  },
  "staying-safe": {
    title: "Staying Safe Online",
    simplifiedSteps: [
      "Use a strong password.",
      "Keep personal information private.",
      "Verify the website address.",
      "Tell a trusted adult if unsure.",
    ],
    unsimplifiedText:
      "Follow essential digital security practices: construct complex multi-character passwords, refrain from disclosing identifiable credentials, inspect website URLs for HTTPS encryption, and alert facilitators to anomalous prompts.",
    simplifiedSpeech:
      "Staying Safe Online. Step one: Use a strong password. Step two: Keep personal information private. Step three: Verify the website address. Step four: Tell a trusted adult if unsure.",
    unsimplifiedSpeech:
      "Staying Safe Online. Follow essential digital security practices: construct complex multi-character passwords, refrain from disclosing identifiable credentials, inspect website URLs for HTTPS encryption, and alert facilitators to anomalous prompts.",
    visualSpeechBubble:
      "This is a login screen. There is a username field, a password field, and a blue sign in button.",
    captionText: "Always check if the website address starts with https://",
    captionKeyword: "https://",
  },
};

export function HomepageAdaptationDemo() {
  // Selected demo lesson
  const [selectedLesson, setSelectedLesson] = useState<LessonKey>("buying-online");

  // Card 1: Dyslexia / Reading support state
  const [readingSimplified, setReadingSimplified] = useState(true);
  const [readingSpacing, setReadingSpacing] = useState(false);
  const [readingIsSpeaking, setReadingIsSpeaking] = useState(false);

  // Card 2: Visual support state
  const [visualAudioFirst, setVisualAudioFirst] = useState(true);
  const [visualShowDescription, setVisualShowDescription] = useState(true);
  const [visualIsSpeaking, setVisualIsSpeaking] = useState(false);

  // Card 3: Hearing support state
  const [hearingCaptions, setHearingCaptions] = useState(true);
  const [hearingVisualCues, setHearingVisualCues] = useState(true);
  const [hearingKeyWords, setHearingKeyWords] = useState(true);

  const activeLesson = LESSON_DEMOS[selectedLesson];

  // Speech synthesis helper
  function speak(text: string, onEnd: () => void) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.92;
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(onEnd, 1600);
    }
  }

  function handleReadingListen() {
    if (readingIsSpeaking) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setReadingIsSpeaking(false);
      return;
    }
    setReadingIsSpeaking(true);
    const textToRead = readingSimplified
      ? activeLesson.simplifiedSpeech
      : activeLesson.unsimplifiedSpeech;
    speak(textToRead, () => setReadingIsSpeaking(false));
  }

  function handleVisualPlayAudio() {
    if (visualIsSpeaking) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setVisualIsSpeaking(false);
      return;
    }
    setVisualIsSpeaking(true);
    const textToRead = activeLesson.visualSpeechBubble;
    speak(textToRead, () => setVisualIsSpeaking(false));
  }

  return (
    <section className="mosaic-demo-section" id="how-it-works">
      <div className="home-wrap">
        {/* Section 2: How Mosaic adapts a lesson */}
        <div className="mosaic-flow-wrapper">
          <div className="mosaic-flow-header">
            <div>
              <h2 className="mosaic-section-title">How Mosaic adapts a lesson</h2>
              <p className="mosaic-section-sub">
                Teachers create or choose a lesson once. Mosaic adapts it for each learner based on their support needs.
              </p>
            </div>
            <Link href="/educators" className="mosaic-text-link">
              See an example &rarr;
            </Link>
          </div>

          <div className="mosaic-flow-steps">
            <div className="mosaic-step-card">
              <div className="mosaic-step-head">
                <span className="mosaic-step-icon mosaic-step-icon-peach">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D8663F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </span>
                <span className="mosaic-step-num">1</span>
                <strong>One lesson</strong>
              </div>
              <p>Teacher selects or creates one lesson.</p>
            </div>

            <div className="mosaic-step-arrow" aria-hidden="true">&rarr;</div>

            <div className="mosaic-step-card">
              <div className="mosaic-step-head">
                <span className="mosaic-step-icon mosaic-step-icon-mint">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#506847" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                </span>
                <span className="mosaic-step-num">2</span>
                <strong>Adapt with AI</strong>
              </div>
              <p>Mosaic analyzes the lesson and learner profile.</p>
            </div>

            <div className="mosaic-step-arrow" aria-hidden="true">&rarr;</div>

            <div className="mosaic-step-card">
              <div className="mosaic-step-head">
                <span className="mosaic-step-icon mosaic-step-icon-pink">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B84A62" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </span>
                <span className="mosaic-step-num">3</span>
                <strong>Personalized experience</strong>
              </div>
              <p>Each learner receives the format that works for them.</p>
            </div>

            <div className="mosaic-step-arrow" aria-hidden="true">&rarr;</div>

            <div className="mosaic-step-card">
              <div className="mosaic-step-head">
                <span className="mosaic-step-icon mosaic-step-icon-lavender">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6D5A8E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span className="mosaic-step-num">4</span>
                <strong>Learn with confidence</strong>
              </div>
              <p>Students learn and make progress.</p>
            </div>
          </div>
        </div>

        {/* Section 3: Different learners. Real examples. */}
        <div className="mosaic-comparison-wrapper">
          <div className="mosaic-flow-header">
            <div>
              <h2 className="mosaic-section-title">Different learners. Real examples.</h2>
              <p className="mosaic-section-sub">
                One lesson. Different ways to experience it.
              </p>
            </div>
            <div className="mosaic-lesson-select-row">
              <label htmlFor="mosaic-lesson-picker" className="mosaic-lesson-label">Lesson:</label>
              <div className="mosaic-lesson-dropdown">
                <select
                  id="mosaic-lesson-picker"
                  value={selectedLesson}
                  onChange={(e) => {
                    if (typeof window !== "undefined" && "speechSynthesis" in window) {
                      window.speechSynthesis.cancel();
                    }
                    setReadingIsSpeaking(false);
                    setVisualIsSpeaking(false);
                    setSelectedLesson(e.target.value as LessonKey);
                  }}
                  className="mosaic-lesson-select-input"
                  aria-label="Select demo lesson"
                >
                  <option value="buying-online">Buying Online</option>
                  <option value="staying-safe">Staying Safe Online</option>
                </select>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mosaic-dropdown-arrow" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
          </div>

          <div className="mosaic-comparison-grid">
            {/* Card 1: Reading Support */}
            <article className="mosaic-card mosaic-card-reading">
              <div className="mosaic-card-head">
                <span className="mosaic-card-icon-badge mosaic-badge-peach">
                  <span style={{ fontWeight: 800, fontSize: "0.95rem" }}>Aa</span>
                </span>
                <strong>For learners with reading support</strong>
              </div>

              <div
                className="mosaic-card-body"
                style={{
                  letterSpacing: readingSpacing ? "0.06em" : "normal",
                  lineHeight: readingSpacing ? "1.9" : "1.6",
                }}
              >
                <h3 className="mosaic-card-inner-title">
                  {activeLesson.title}
                </h3>

                {readingSimplified ? (
                  <ol className="mosaic-simplified-list">
                    {activeLesson.simplifiedSteps.map((stepText, idx) => (
                      <li key={stepText}>
                        <span className="num">{idx + 1}</span>
                        <span>{stepText}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p style={{ color: "var(--mosaic-text)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                    {activeLesson.unsimplifiedText}
                  </p>
                )}
              </div>

              <div className="mosaic-card-controls">
                <button
                  type="button"
                  onClick={handleReadingListen}
                  className={`mosaic-pill-btn mosaic-pill-btn-white ${readingIsSpeaking ? "active" : ""}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                  {readingIsSpeaking ? "Playing..." : "Listen"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined" && "speechSynthesis" in window) {
                      window.speechSynthesis.cancel();
                    }
                    setReadingIsSpeaking(false);
                    setReadingSimplified((v) => !v);
                  }}
                  className={`mosaic-pill-btn mosaic-pill-peach ${readingSimplified ? "active" : ""}`}
                >
                  Simpler text
                </button>
                <button
                  type="button"
                  onClick={() => setReadingSpacing((v) => !v)}
                  className={`mosaic-pill-btn mosaic-pill-peach ${readingSpacing ? "active" : ""}`}
                >
                  Larger spacing
                </button>
              </div>
            </article>

            {/* Card 2: Visual Support */}
            <article className="mosaic-card mosaic-card-visual">
              <div className="mosaic-card-head">
                <span className="mosaic-card-icon-badge mosaic-badge-mint">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#506847" strokeWidth="2.2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                </span>
                <strong>For visually impaired learners</strong>
              </div>

              <div className="mosaic-card-body mosaic-card-body-media">
                <div className="mosaic-media-container">
                  <Image
                    src="/generated-images/preview-laptop-login.jpg"
                    alt="Laptop screen with login form"
                    width={520}
                    height={360}
                    className="mosaic-preview-img"
                  />
                  {visualShowDescription && (
                    <div className="mosaic-speech-bubble-overlay">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: "2px" }}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                      <span>{activeLesson.visualSpeechBubble}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mosaic-card-controls">
                <button
                  type="button"
                  onClick={handleVisualPlayAudio}
                  className={`mosaic-pill-btn mosaic-pill-btn-white ${visualIsSpeaking ? "active" : ""}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                  {visualIsSpeaking ? "Playing..." : "Play audio"}
                </button>
                <button
                  type="button"
                  onClick={() => setVisualAudioFirst((v) => !v)}
                  className={`mosaic-pill-btn mosaic-pill-mint ${visualAudioFirst ? "active" : ""}`}
                >
                  Audio-first
                </button>
                <button
                  type="button"
                  onClick={() => setVisualShowDescription((v) => !v)}
                  className={`mosaic-pill-btn mosaic-pill-mint ${visualShowDescription ? "active" : ""}`}
                >
                  Image descriptions
                </button>
              </div>
            </article>

            {/* Card 3: Hearing Support */}
            <article className="mosaic-card mosaic-card-hearing">
              <div className="mosaic-card-head">
                <span className="mosaic-card-icon-badge mosaic-badge-pink">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B84A62" strokeWidth="2.2"><path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10"/><path d="M14 8.5a2.5 2.5 0 0 0-5 0c0 3 3 3 3 5"/><path d="M10 19a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/></svg>
                </span>
                <strong>For hearing impaired learners</strong>
              </div>

              <div className="mosaic-card-body mosaic-card-body-media">
                <div className="mosaic-media-container">
                  <Image
                    src="/generated-images/preview-hearing-video.jpg"
                    alt="Instructor presenting video lesson"
                    width={520}
                    height={360}
                    className="mosaic-preview-img"
                  />
                  <span className="mosaic-cc-tag">CC</span>

                  {hearingCaptions && (
                    <div className="mosaic-caption-bar">
                      {activeLesson.captionText.replace(activeLesson.captionKeyword, "")}
                      {hearingKeyWords ? (
                        <span className="mosaic-keyword-highlight">{activeLesson.captionKeyword}</span>
                      ) : (
                        activeLesson.captionKeyword
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mosaic-card-controls">
                <button
                  type="button"
                  onClick={() => setHearingCaptions((v) => !v)}
                  className={`mosaic-pill-btn mosaic-pill-pink ${hearingCaptions ? "active" : ""}`}
                >
                  Captions
                </button>
                <button
                  type="button"
                  onClick={() => setHearingVisualCues((v) => !v)}
                  className={`mosaic-pill-btn mosaic-pill-pink ${hearingVisualCues ? "active" : ""}`}
                >
                  Visual cues
                </button>
                <button
                  type="button"
                  onClick={() => setHearingKeyWords((v) => !v)}
                  className={`mosaic-pill-btn mosaic-pill-pink ${hearingKeyWords ? "active" : ""}`}
                >
                  Key words
                </button>
              </div>
            </article>
          </div>
        </div>

        {/* Section 5: Final CTA */}
        <div className="mosaic-final-cta-wrapper">
          <div className="mosaic-final-cta-card">
            <h2 className="mosaic-final-cta-title">Create once. Reach every learner.</h2>
            <p className="mosaic-final-cta-sub">
              Mosaic helps teachers make learning more inclusive without creating a separate lesson for every learner.
            </p>
            <div className="mosaic-final-cta-actions">
              <Link href="/lesson/messenger-message" className="mosaic-btn-primary">
                Try Mosaic &rarr;
              </Link>
              <Link href="/educators" className="mosaic-btn-secondary">
                For Teachers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
