"use client";

import Link from "next/link";
import { useState } from "react";

export function HomepageAdaptationDemo() {
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
      ? "Staying Safe Online. Step one: Use a strong password. Step two: Do not share personal information. Step three: If something feels wrong, tell a trusted adult."
      : "Follow these steps to safely browse online, manage strong account passwords, and protect your privacy.";
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
    const textToRead =
      "Describing screen. This is a login screen. In the top area is the logo. In the center, there is a username field, a password field, and a bright blue sign in button.";
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
                Teachers create or choose a lesson once. Our adaptation engine transforms it for each
                learner based on their needs. Same learning goal. Different experience.
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
              <p>Teacher uploads or selects a lesson</p>
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
              <p>Content is transformed based on learner profiles</p>
            </div>

            <div className="mosaic-step-arrow" aria-hidden="true">&rarr;</div>

            <div className="mosaic-step-card">
              <div className="mosaic-step-head">
                <span className="mosaic-step-icon mosaic-step-icon-pink">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B84A62" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </span>
                <span className="mosaic-step-num">3</span>
                <strong>Personalized versions</strong>
              </div>
              <p>Each learner gets the format that works for them</p>
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
              <p>Students engage and make progress</p>
            </div>
          </div>
        </div>

        {/* Section 3: Different learners. Real examples. */}
        <div className="mosaic-comparison-wrapper">
          <div className="mosaic-flow-header">
            <div>
              <h2 className="mosaic-section-title">Different learners. Real examples.</h2>
              <p className="mosaic-section-sub">
                Here&apos;s how the same lesson looks for different needs.
              </p>
            </div>
            <div className="mosaic-lesson-select-pill">
              <span style={{ color: "var(--mosaic-muted)" }}>Lesson:</span>
              <strong>Staying Safe Online &#9662;</strong>
            </div>
          </div>

          <div className="mosaic-comparison-grid">
            {/* Card 1: Dyslexia / Reading Support */}
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
                <h3 style={{ fontSize: "1.15rem", fontWeight: 750, color: "var(--mosaic-ink)", marginBottom: "16px" }}>
                  Buying Online
                </h3>

                {readingSimplified ? (
                  <ol className="mosaic-simplified-list">
                    <li>
                      <span className="num">1</span>
                      <span>Choose the item.</span>
                    </li>
                    <li>
                      <span className="num">2</span>
                      <span>Check the price.</span>
                    </li>
                    <li>
                      <span className="num">3</span>
                      <span>Pay safely.</span>
                    </li>
                    <li>
                      <span className="num">4</span>
                      <span>Wait for delivery.</span>
                    </li>
                  </ol>
                ) : (
                  <p style={{ color: "var(--mosaic-text)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                    Follow established e-commerce protocols: verify the seller rating, confirm total charges including delivery fees, utilize a verified two-factor payment portal, and monitor shipment confirmation.
                  </p>
                )}
              </div>

              <div className="mosaic-card-controls">
                <button
                  type="button"
                  onClick={handleReadingListen}
                  className={`mosaic-pill-btn ${readingIsSpeaking ? "active" : ""}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                  {readingIsSpeaking ? "Playing..." : "Listen"}
                </button>
                <button
                  type="button"
                  onClick={() => setReadingSimplified((v) => !v)}
                  className={`mosaic-pill-btn ${readingSimplified ? "active" : ""}`}
                >
                  Simpler text
                </button>
                <button
                  type="button"
                  onClick={() => setReadingSpacing((v) => !v)}
                  className={`mosaic-pill-btn ${readingSpacing ? "active" : ""}`}
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

              <div className="mosaic-card-body">
                <div className="mosaic-laptop-mockup">
                  <div className="mosaic-laptop-screen">
                    <div className="mockup-header-bar">Welcome back</div>
                    <div className="mockup-login-box">
                      <div className="mockup-input-wire">username</div>
                      <div className="mockup-input-wire">password</div>
                      <div className="mockup-btn-wire">Sign in</div>
                    </div>

                    {visualShowDescription && (
                      <div className="mosaic-speech-bubble-overlay">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: "2px" }}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                        <span>This is a login screen. There is a username field, a password field, and a blue sign in button.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mosaic-card-controls">
                <button
                  type="button"
                  onClick={handleVisualPlayAudio}
                  className={`mosaic-pill-btn ${visualIsSpeaking ? "active" : ""}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                  {visualIsSpeaking ? "Playing..." : "Play audio"}
                </button>
                <button
                  type="button"
                  onClick={() => setVisualAudioFirst((v) => !v)}
                  className={`mosaic-pill-btn ${visualAudioFirst ? "active" : ""}`}
                >
                  Audio-first
                </button>
                <button
                  type="button"
                  onClick={() => setVisualShowDescription((v) => !v)}
                  className={`mosaic-pill-btn ${visualShowDescription ? "active" : ""}`}
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

              <div className="mosaic-card-body">
                <div className="mosaic-video-mockup">
                  <span className="mosaic-cc-tag">CC</span>

                  {hearingCaptions && (
                    <div className="mosaic-caption-bar">
                      Always check if the website address starts with{" "}
                      {hearingKeyWords ? (
                        <span className="mosaic-keyword-highlight">https://</span>
                      ) : (
                        "https://"
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mosaic-card-controls">
                <button
                  type="button"
                  onClick={() => setHearingCaptions((v) => !v)}
                  className={`mosaic-pill-btn ${hearingCaptions ? "active" : ""}`}
                >
                  Captions
                </button>
                <button
                  type="button"
                  onClick={() => setHearingVisualCues((v) => !v)}
                  className={`mosaic-pill-btn ${hearingVisualCues ? "active" : ""}`}
                >
                  Visual cues
                </button>
                <button
                  type="button"
                  onClick={() => setHearingKeyWords((v) => !v)}
                  className={`mosaic-pill-btn ${hearingKeyWords ? "active" : ""}`}
                >
                  Key words
                </button>
              </div>
            </article>
          </div>
        </div>

        {/* Section 4: Built for real classrooms */}
        <div className="mosaic-classrooms-wrapper">
          <div className="mosaic-classrooms-box">
            <div className="mosaic-classrooms-left">
              <h2 className="mosaic-classrooms-title">Built for real classrooms</h2>
              <p className="mosaic-classrooms-sub">
                Mosaic supports students, teachers and families with simple, practical tools.
              </p>
              <Link href="/about" className="mosaic-classrooms-btn">
                Explore all features &rarr;
              </Link>
            </div>

            <div className="mosaic-classrooms-cards">
              <div className="mosaic-audience-col">
                <div className="mosaic-audience-circle mosaic-circle-mint">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#506847" strokeWidth="2.2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <strong>For students</strong>
                <p>A calm, focused learning experience that adapts to your needs.</p>
              </div>

              <div className="mosaic-audience-col">
                <div className="mosaic-audience-circle mosaic-circle-peach">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D8663F" strokeWidth="2.2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <strong>For teachers</strong>
                <p>Create once. Reach every learner. Save time and make learning inclusive.</p>
              </div>

              <div className="mosaic-audience-col">
                <div className="mosaic-audience-circle mosaic-circle-pink">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B84A62" strokeWidth="2.2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </div>
                <strong>For families</strong>
                <p>Track progress and support learning at home.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
