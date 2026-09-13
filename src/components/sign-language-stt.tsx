"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  MicIcon,
  StopIcon,
  SpeakerIcon,
  HandIcon,
  SparkleIcon,
} from "@/components/isl-icons";

export interface ISLVocabItem {
  id: string;
  label: string;
  hindiLabel: string;
  category: string;
  type: "word" | "alphabet" | "number";
  description: string;
}

// ── Verified Vocabulary Catalog ──────────────────────────────────────────────
const ISL_VOCABULARY: Record<string, ISLVocabItem> = {
  // Flagship & Everyday Words (Aligned with 51 Model Classes + ISLRTC Standards)
  NAMASTE: {
    id: "NAMASTE",
    label: "Namaste",
    hindiLabel: "नमस्ते",
    category: "Greeting",
    type: "word",
    description: "Join both palms flat in front of chest and bow head gently in respect (ISLRTC standard greeting).",
  },
  WATER: {
    id: "WATER",
    label: "Water",
    hindiLabel: "पानी",
    category: "Everyday",
    type: "word",
    description: "Form a 'W' handshape with three fingers and tap side of chin or mouth twice.",
  },
  HELP: {
    id: "HELP",
    label: "Help",
    hindiLabel: "मदद",
    category: "Everyday",
    type: "word",
    description: "Dominant thumbs-up rested on flat upward palm, lifted gently upward together.",
  },
  "THANK YOU": {
    id: "THANK YOU",
    label: "Thank You",
    hindiLabel: "धन्यवाद",
    category: "Social",
    type: "word",
    description: "Fingertips touch chin gently and move smoothly forward towards the person.",
  },
  THANK: {
    id: "THANK YOU",
    label: "Thank You",
    hindiLabel: "धन्यवाद",
    category: "Social",
    type: "word",
    description: "Fingertips touch chin gently and move smoothly forward towards the person.",
  },
  THANKS: {
    id: "THANK YOU",
    label: "Thank You",
    hindiLabel: "धन्यवाद",
    category: "Social",
    type: "word",
    description: "Fingertips touch chin gently and move smoothly forward towards the person.",
  },
  WANT: {
    id: "WANT",
    label: "Want",
    hindiLabel: "चाहिए",
    category: "Action",
    type: "word",
    description: "Both open hands with curved fingers pull gently inward towards the chest.",
  },
  GO: {
    id: "GO",
    label: "Go",
    hindiLabel: "जाना",
    category: "Action",
    type: "word",
    description: "Both index fingers arc forward away from body, indicating departure or movement.",
  },
  HOME: {
    id: "HOME",
    label: "Home",
    hindiLabel: "घर",
    category: "Place",
    type: "word",
    description: "Both open hands join at fingertips above chest to form roof triangle.",
  },
  TODAY: {
    id: "TODAY",
    label: "Today",
    hindiLabel: "आज",
    category: "Time",
    type: "word",
    description: "Both open hands with palms facing upward move gently downward twice.",
  },
  STOP: {
    id: "STOP",
    label: "Stop",
    hindiLabel: "रुकें",
    category: "Action",
    type: "word",
    description: "Open palm held upright pushing gently forward to signal halt.",
  },
  YES: {
    id: "YES",
    label: "Yes",
    hindiLabel: "हाँ",
    category: "Response",
    type: "word",
    description: "Closed fist nodded up and down twice, mirroring an affirmative head nod.",
  },
  NO: {
    id: "NO",
    label: "No",
    hindiLabel: "नहीं",
    category: "Response",
    type: "word",
    description: "Index and middle finger snap firmly against thumb twice.",
  },
  YOU: {
    id: "YOU",
    label: "You",
    hindiLabel: "आप / तुम",
    category: "Person",
    type: "word",
    description: "Index finger points directly forward toward the conversation partner.",
  },
  WARNING: {
    id: "WARNING",
    label: "Warning",
    hindiLabel: "चेतावनी",
    category: "Safety",
    type: "word",
    description: "Flat palm facing outward pushing firmly forward, alerting of caution or danger.",
  },
  FOOD: {
    id: "FOOD",
    label: "Food",
    hindiLabel: "खाना",
    category: "Everyday",
    type: "word",
    description: "Fingertips bunched together and brought towards mouth twice, miming eating.",
  },
  FAMILY: {
    id: "FAMILY",
    label: "Family",
    hindiLabel: "परिवार",
    category: "People",
    type: "word",
    description: "Both hands form 'F' shapes with thumb and index, circling outward to meet together.",
  },
  FRIENDS: {
    id: "FRIENDS",
    label: "Friends",
    hindiLabel: "दोस्त",
    category: "People",
    type: "word",
    description: "Both index fingers hooked together and gently interlocked twice in camaraderie.",
  },
  FRIEND: {
    id: "FRIENDS",
    label: "Friends",
    hindiLabel: "दोस्त",
    category: "People",
    type: "word",
    description: "Both index fingers hooked together and gently interlocked twice in camaraderie.",
  },
  TEACHER: {
    id: "TEACHER",
    label: "Teacher",
    hindiLabel: "अध्यापक",
    category: "School",
    type: "word",
    description: "Open hands move downward from temple in a guidance gesture.",
  },
  BOOK: {
    id: "BOOK",
    label: "Book",
    hindiLabel: "किताब",
    category: "School",
    type: "word",
    description: "Palms held flat together and opened like opening the pages of a book.",
  },
  HOSPITAL: {
    id: "HOSPITAL",
    label: "Hospital",
    hindiLabel: "अस्पताल",
    category: "Public Place",
    type: "word",
    description: "Index finger draws a small cross shape on the upper arm.",
  },
  POLICE: {
    id: "POLICE",
    label: "Police",
    hindiLabel: "पुलिस",
    category: "Public Service",
    type: "word",
    description: "Right hand thumb and index form 'C' shape near chest badge position.",
  },
  BUS: {
    id: "BUS",
    label: "Bus",
    hindiLabel: "बस",
    category: "Transport",
    type: "word",
    description: "Both hands mime holding and turning a large vehicle steering wheel.",
  },
  INDIA: {
    id: "INDIA",
    label: "India",
    hindiLabel: "भारत",
    category: "Country",
    type: "word",
    description: "Thumb tip touches the center of the forehead gently (Bindi / Tilak mark).",
  },
};

// ── Populate Alphabets A-Z ──────────────────────────────────────────────────
const HINDI_ALPHABET_MAP: Record<string, string> = {
  A: "ए", B: "बी", C: "सी", D: "डी", E: "ई", F: "एफ", G: "जी", H: "एच",
  I: "आई", J: "जे", K: "के", L: "एल", M: "एम", N: "एन", O: "ओ", P: "पी",
  Q: "क्यू", R: "आर", S: "एस", T: "टी", U: "यू", V: "वी", W: "डब्ल्यू",
  X: "एक्स", Y: "वाई", Z: "ज़ेड",
};

"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((ch) => {
  ISL_VOCABULARY[ch] = {
    id: ch,
    label: `Letter ${ch}`,
    hindiLabel: `अक्षर ${HINDI_ALPHABET_MAP[ch] || ch}`,
    category: "Alphabet",
    type: "alphabet",
    description: `Two-handed ISL: Form the standard Indian Sign Language handshape for letter ${ch}.`,
  };
});

// ── Populate Numerals 0-9 ───────────────────────────────────────────────────
const HINDI_NUM_MAP: Record<string, string> = {
  "0": "शून्य (०)", "1": "एक (१)", "2": "दो (२)", "3": "तीन (३)", "4": "चार (४)",
  "5": "पाँच (५)", "6": "छह (६)", "7": "सात (७)", "8": "आठ (८)", "9": "नौ (९)",
};

"0123456789".split("").forEach((n) => {
  ISL_VOCABULARY[n] = {
    id: n,
    label: `Number ${n}`,
    hindiLabel: HINDI_NUM_MAP[n] || n,
    category: "Numeral",
    type: "number",
    description: `Form the single-handed ISL handshape for number ${n}.`,
  };
});

// ── Verified Quick Phrases ───────────────────────────────────────────────────
const VERIFIED_QUICK_PHRASES = [
  "Namaste",
  "Thank You",
  "Water",
  "Help",
  "I want water",
  "Go home today",
  "Stop",
];

export function SignLanguageStt() {
  const [inputText, setInputText] = useState<string>("");
  const [submittedPhrase, setSubmittedPhrase] = useState<string>("");
  const [sequence, setSequence] = useState<ISLVocabItem[]>([]);
  const [unsupportedWords, setUnsupportedWords] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [speechStatusMessage, setSpeechStatusMessage] = useState<string>("Ready");
  const [isSpeakingAudio, setIsSpeakingAudio] = useState<boolean>(false);
  const [hasConverted, setHasConverted] = useState<boolean>(false);

  const recognitionRef = useRef<unknown>(null);

  // ── Convert phrase into supported ISL sign sequence ────────────────────────
  const processPhrase = useCallback((rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed) {
      setSequence([]);
      setUnsupportedWords([]);
      setSubmittedPhrase("");
      setHasConverted(false);
      return;
    }

    setSubmittedPhrase(trimmed);
    setHasConverted(true);

    // Normalize text: replace punctuation with space, uppercase
    let normalized = trimmed.toUpperCase().replace(/[^A-Z0-9\s]/g, " ");

    const matchedSigns: ISLVocabItem[] = [];
    const unmatched: string[] = [];

    // 1. Check for multi-word phrases first (e.g. "THANK YOU")
    const multiWordPhrases = ["THANK YOU", "SPIDER-MAN"];
    for (const phrase of multiWordPhrases) {
      if (normalized.includes(phrase)) {
        if (ISL_VOCABULARY[phrase]) {
          matchedSigns.push(ISL_VOCABULARY[phrase]);
        }
        normalized = normalized.replace(new RegExp(phrase, "g"), " ");
      }
    }

    // 2. Tokenize remaining words
    const tokens = normalized.split(/\s+/).filter((t) => t.length > 0);

    for (const token of tokens) {
      if (ISL_VOCABULARY[token]) {
        matchedSigns.push(ISL_VOCABULARY[token]);
      } else {
        unmatched.push(token);
      }
    }

    setSequence(matchedSigns);
    setUnsupportedWords(unmatched);
    setActiveStep(0);
  }, []);

  // ── Initialize Speech Recognition ──────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const windowAny = window as unknown as {
      SpeechRecognition?: new () => unknown;
      webkitSpeechRecognition?: new () => unknown;
    };

    const SpeechRecognitionClass =
      windowAny.SpeechRecognition || windowAny.webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      try {
        const rec = new SpeechRecognitionClass() as {
          continuous: boolean;
          interimResults: boolean;
          lang: string;
          onstart: () => void;
          onresult: (event: {
            results: Array<Array<{ transcript: string }>>;
          }) => void;
          onerror: (event: { error: string }) => void;
          onend: () => void;
          start: () => void;
          stop: () => void;
        };

        rec.continuous = false;
        rec.interimResults = true;
        rec.lang = "en-IN"; // English (India) default for ISL context

        rec.onstart = () => {
          setIsRecording(true);
          setSpeechStatusMessage("Listening... Speak clearly into your microphone");
        };

        rec.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((r) => r[0].transcript)
            .join("");
          setInputText(transcript);
        };

        rec.onerror = (err) => {
          console.warn("Speech recognition error:", err);
          setIsRecording(false);
          setSpeechStatusMessage("Microphone recognition paused. You can type text directly.");
        };

        rec.onend = () => {
          setIsRecording(false);
          setSpeechStatusMessage("Ready");
        };

        recognitionRef.current = rec;
      } catch {
        // Speech recognition initialization unavailable
      }
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      setSpeechStatusMessage("Microphone recognition is not supported in this browser. Please type directly.");
      return;
    }

    const rec = recognitionRef.current as { start: () => void; stop: () => void };
    if (isRecording) {
      rec.stop();
      setIsRecording(false);
      setSpeechStatusMessage("Ready");
    } else {
      try {
        rec.start();
      } catch (err) {
        console.warn("Could not start speech recognition:", err);
        setSpeechStatusMessage("Microphone access blocked. Please check browser permissions.");
      }
    }
  };

  const handleConvert = () => {
    processPhrase(inputText);
  };

  const handleQuickPhrase = (phrase: string) => {
    setInputText(phrase);
    processPhrase(phrase);
  };

  const handleClear = () => {
    setInputText("");
    setSubmittedPhrase("");
    setSequence([]);
    setUnsupportedWords([]);
    setHasConverted(false);
    setActiveStep(0);
  };

  const handleSpeakPhrase = () => {
    if (!submittedPhrase || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setIsSpeakingAudio(true);
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(submittedPhrase);
    utterance.rate = 0.92;
    utterance.onend = () => setIsSpeakingAudio(false);
    utterance.onerror = () => setIsSpeakingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  const activeSign = sequence[activeStep];

  return (
    <div className="isl-converter-shell">
      <div className="isl-converter-card">
        {/* Card Header */}
        <div className="isl-converter-card-header">
          <h3 className="isl-converter-card-title">Build an ISL Sign Sequence</h3>
          <p className="isl-converter-card-subtext">
            Type a phrase or use your microphone to generate a step-by-step sequence of supported Indian Sign Language signs.
          </p>
        </div>

        {/* Input Area */}
        <div className="isl-converter-input-wrap">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleConvert();
              }
            }}
            placeholder="Type a phrase (e.g., 'Namaste', 'Water', 'I want water', 'Thank you')..."
            className="isl-converter-textarea"
            aria-label="Input phrase for ISL conversion"
            rows={3}
          />
        </div>

        {/* Control Toolbar */}
        <div className="isl-converter-toolbar">
          <div className="isl-toolbar-group">
            <button
              type="button"
              onClick={handleConvert}
              disabled={!inputText.trim()}
              className="isl-action-convert"
              aria-label="Convert phrase to ISL signs"
            >
              <SparkleIcon size={16} />
              <span>Convert to ISL</span>
            </button>

            <button
              type="button"
              onClick={toggleRecording}
              className={`isl-mic-btn ${isRecording ? "active" : ""}`}
              aria-label={isRecording ? "Stop recording" : "Start microphone recording"}
              title={speechStatusMessage}
            >
              {isRecording ? <StopIcon size={16} /> : <MicIcon size={16} />}
              <span>{isRecording ? "Stop Listening" : "Start Microphone"}</span>
              <span className={`isl-mic-dot ${isRecording ? "recording" : ""}`} />
            </button>

            {inputText && (
              <button
                type="button"
                onClick={handleClear}
                className="isl-action-clear"
                aria-label="Clear text input"
              >
                Clear
              </button>
            )}
          </div>

          <div className="isl-toolbar-group">
            <span className="isl-mic-status-text">
              {isRecording ? "Listening..." : speechStatusMessage}
            </span>
          </div>
        </div>

        {/* Quick Phrases */}
        <div className="isl-quick-phrases-box">
          <span className="isl-quick-label">Quick Phrases:</span>
          {VERIFIED_QUICK_PHRASES.map((phrase) => (
            <button
              key={phrase}
              type="button"
              onClick={() => handleQuickPhrase(phrase)}
              className="isl-quick-phrase-pill"
            >
              {phrase}
            </button>
          ))}
        </div>

        {/* Unsupported Vocabulary Warning Card */}
        {unsupportedWords.length > 0 && (
          <div className="isl-unsupported-banner" role="alert">
            <div className="isl-unsupported-header">
              <span style={{ color: "#D8663F", fontWeight: 700, fontSize: "1rem" }}>Notice:</span>
              <p className="isl-unsupported-title">
                Some words are not currently available in Mosaic&apos;s ISL vocabulary.
              </p>
            </div>
            <p className="isl-unsupported-text">
              {sequence.length > 0
                ? "Mosaic has converted the supported words into the sign sequence below. The following terms could not be matched in the current dictionary:"
                : "None of the entered words could be matched in the current 51-class ISL dictionary. Try one of the quick phrases above."}
            </p>
            <div className="isl-unsupported-tags">
              {unsupportedWords.map((word, idx) => (
                <span key={idx} className="isl-unsupported-tag">
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Results Area */}
        {hasConverted ? (
          sequence.length > 0 ? (
            <div className="isl-converter-results">
              {/* Results Topbar */}
              <div className="isl-results-bar">
                <div className="isl-results-title-group">
                  <h4 className="isl-results-heading">ISL Sign Sequence</h4>
                  <span className="isl-results-count-badge">
                    {sequence.length} {sequence.length === 1 ? "sign" : "signs"}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span className="isl-phrase-quote">
                    Phrase: &ldquo;{submittedPhrase}&rdquo;
                  </span>
                  <button
                    type="button"
                    onClick={handleSpeakPhrase}
                    disabled={isSpeakingAudio}
                    className="isl-action-speak"
                    title="Listen to this phrase spoken aloud"
                  >
                    <SpeakerIcon size={14} />
                    <span>{isSpeakingAudio ? "Playing..." : "Listen"}</span>
                  </button>
                </div>
              </div>

              {/* Step-by-Step Learning Spotlight */}
              {activeSign && (
                <div className="isl-step-viewer">
                  <div className="isl-step-topbar">
                    <span className="isl-step-progress-label">
                      Step {activeStep + 1} of {sequence.length}: {activeSign.label}
                    </span>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        type="button"
                        onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                        disabled={activeStep === 0}
                        className="isl-step-nav-btn"
                        aria-label="Previous sign"
                      >
                        &larr; Previous
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveStep((prev) => Math.min(sequence.length - 1, prev + 1))}
                        disabled={activeStep === sequence.length - 1}
                        className="isl-step-nav-btn"
                        aria-label="Next sign"
                      >
                        Next &rarr;
                      </button>
                    </div>
                  </div>

                  <div className="isl-step-spotlight-card">
                    <div className="isl-spotlight-sign-frame">
                      <HandIcon size={32} style={{ color: "#506847", marginBottom: "0.5rem" }} />
                      <span className="isl-spotlight-sign-token">{activeSign.id}</span>
                      <span className="isl-spotlight-ref-badge">
                        ISL reference unavailable
                      </span>
                    </div>

                    <div className="isl-spotlight-info">
                      <h4>{activeSign.label}</h4>
                      <div className="isl-spotlight-hindi">{activeSign.hindiLabel}</div>
                      <span className="isl-spotlight-category">
                        {activeSign.type === "word" ? `${activeSign.category} Sign` : `${activeSign.category} Sign`}
                      </span>
                      <p className="isl-spotlight-gesture-desc">{activeSign.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Ordered Sequence Grid */}
              <div className="isl-sequence-track">
                <p className="isl-sequence-track-title">Full Sequence Overview (Click any step to view):</p>
                <div className="isl-sequence-grid">
                  {sequence.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`isl-seq-card ${activeStep === idx ? "active" : ""}`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setActiveStep(idx);
                        }
                      }}
                      aria-label={`View step ${idx + 1}: ${item.label}`}
                    >
                      <span className="isl-seq-card-step">Step {idx + 1}</span>
                      <div className="isl-seq-card-token">{item.id}</div>
                      <div className="isl-seq-card-hindi">{item.hindiLabel}</div>
                      <span className="isl-seq-card-ref-badge">ISL reference unavailable</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null
        ) : (
          /* Empty State */
          <div className="isl-converter-empty">
            <HandIcon size={36} style={{ color: "#8C948F", margin: "0 auto" }} />
            <h4 className="isl-converter-empty-title">Start a conversation</h4>
            <p className="isl-converter-empty-desc">
              Type a phrase above or use your microphone to build an ordered sequence of Indian Sign Language signs.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
