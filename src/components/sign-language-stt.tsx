"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MicIcon, StopIcon, SpeakerIcon, HandIcon, SparkleIcon } from "@/components/isl-icons";

interface SignVisualItem {
  token: string;
  type: "word" | "letter";
  imageUrl?: string;
}

const COMMON_WORD_IMAGES: Record<string, string> = {
  HELLO: "https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/HELLO.jpg",
  NAMASTE: "https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/NAMASTE.jpg",
  WATER: "https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/WATER.jpg",
  HELP: "https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/HELP.jpg",
  THANK: "https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/THANK.jpg",
  THANKYOU: "https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/THANK.jpg",
  LOVE: "https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/LOVE.jpg",
  FAMILY: "https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/FAMILY.jpg",
  FRIEND: "https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/FRIEND.jpg",
  YES: "https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/YES.jpg",
  NO: "https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/NO.jpg",
};

export function SignLanguageStt() {
  const [inputText, setInputText] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [speechStatus, setSpeechStatus] = useState<string>("Click 'Start Microphone' or type below");
  const [targetLang, setTargetLang] = useState<string>("en");
  const [signVisuals, setSignVisuals] = useState<SignVisualItem[]>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const recognitionRef = useRef<unknown>(null);

  // Convert input string into ISL visual sign cards
  const generateSignVisuals = useCallback((text: string) => {
    if (!text.trim()) {
      setSignVisuals([]);
      return;
    }

    const words = text
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9\s]/g, "")
      .split(/\s+/);

    const items: SignVisualItem[] = [];

    words.forEach((w) => {
      if (COMMON_WORD_IMAGES[w]) {
        items.push({
          token: w,
          type: "word",
          imageUrl: COMMON_WORD_IMAGES[w],
        });
      } else {
        for (let i = 0; i < w.length; i++) {
          const char = w[i];
          if (/[A-Z]/.test(char)) {
            items.push({
              token: char,
              type: "letter",
              imageUrl: `https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/${char}.jpg`,
            });
          } else if (/[0-9]/.test(char)) {
            items.push({
              token: char,
              type: "letter",
              imageUrl: `https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/num_${char}.jpg`,
            });
          }
        }
      }
    });

    setSignVisuals(items);
  }, []);

  // Initialize Speech Recognition if browser supports it
  useEffect(() => {
    if (typeof window !== "undefined") {
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
          rec.lang = "en-US";

          rec.onstart = () => {
            setIsRecording(true);
            setSpeechStatus("Listening... Speak clearly into your microphone");
          };

          rec.onresult = (event) => {
            const transcript = Array.from(event.results)
              .map((r) => r[0].transcript)
              .join("");
            setInputText(transcript);
            generateSignVisuals(transcript);
          };

          rec.onerror = (err) => {
            console.error("Speech recognition error:", err);
            setSpeechStatus("Speech recognition error. You can type text directly.");
            setIsRecording(false);
          };

          rec.onend = () => {
            setIsRecording(false);
            setSpeechStatus("Recording ended.");
          };

          recognitionRef.current = rec;
        } catch {
          setTimeout(() => {
            setSpeechStatus("Web Speech API not supported in this browser. Type text manually below.");
          }, 0);
        }
      } else {
        setTimeout(() => {
          setSpeechStatus("Web Speech API not supported in this browser. Type text manually below.");
        }, 0);
      }
    }
  }, [generateSignVisuals]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Microphone recognition is unavailable. Please type your phrase directly!");
      return;
    }
    const rec = recognitionRef.current as { start: () => void; stop: () => void };
    if (isRecording) {
      rec.stop();
      setIsRecording(false);
    } else {
      rec.start();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputText(val);
    generateSignVisuals(val);
  };

  const handleSpeak = () => {
    if (!inputText || typeof window === "undefined") return;
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(inputText);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="isl-stt w-full max-w-5xl mx-auto p-4 sm:p-6 bg-[#FCFCFB] rounded-3xl border border-[#E5E2DC] shadow-sm space-y-6 font-sans">
      {/* Header */}
      <div className="border-b border-[#E5E2DC] pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EDF2E9] text-[#506847] rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border border-[#E5E2DC]">
          <MicIcon className="w-3.5 h-3.5" />
          <span>Speech &amp; Text to ISL Sign Converter</span>
        </div>
        <h2 className="text-2xl font-bold font-manrope text-[#22352E] tracking-tight">
          Two-Way Communication Studio
        </h2>
        <p className="text-sm text-[#707877] mt-1">
          Speak or type any phrase to instantly generate its corresponding Indian Sign Language (ISL) visual signs.
        </p>
      </div>

      {/* Voice & Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Controls */}
        <div className="md:col-span-5 space-y-4">
          {/* Preferred Language Selector */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#707877] uppercase tracking-wider block">
              Reading Language
            </label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full p-3 bg-[#FCFCFB] border border-[#E5E2DC] rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#506847] text-[#22352E]"
            >
              <option value="en">English</option>
              <option value="hi">Hindi (हिंदी)</option>
              <option value="mr">Marathi (मराठी)</option>
              <option value="ta">Tamil (தமிழ்)</option>
              <option value="te">Telugu (తెలుగు)</option>
              <option value="bn">Bengali (বাংলা)</option>
              <option value="gu">Gujarati (ગુજરાતી)</option>
            </select>
          </div>

          {/* Recording Control Button */}
          <div className="space-y-2">
            <button
              onClick={toggleRecording}
              className={`w-full py-3.5 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 shadow-sm ${
                isRecording
                  ? "bg-rose-700 hover:bg-rose-800 text-white animate-pulse"
                  : "bg-[#506847] hover:bg-[#344934] text-white"
              }`}
            >
              {isRecording ? (
                <>
                  <StopIcon className="w-4 h-4" />
                  <span>Stop Recording</span>
                </>
              ) : (
                <>
                  <MicIcon className="w-4 h-4" />
                  <span>Start Microphone</span>
                </>
              )}
            </button>
            <p className="text-xs text-[#707877] text-center font-medium">{speechStatus}</p>
          </div>

          {/* Quick Preset Prompts */}
          <div className="p-4 bg-[#EDF2E9]/40 border border-[#E5E2DC] rounded-2xl space-y-2">
            <span className="text-xs font-bold text-[#707877] uppercase tracking-wider block">
              Quick Phrases
            </span>
            <div className="flex flex-wrap gap-2">
              {["Hello", "Namaste", "Thank You", "Water", "Help", "I love family"].map((phrase) => (
                <button
                  key={phrase}
                  onClick={() => {
                    setInputText(phrase);
                    generateSignVisuals(phrase);
                  }}
                  className="px-3 py-1.5 bg-[#FCFCFB] hover:bg-[#EDF2E9] text-[#506847] border border-[#506847]/30 rounded-xl text-xs font-semibold transition shadow-2xs"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Input Box & Audio */}
        <div className="md:col-span-7 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#707877] uppercase tracking-wider block">
              Spoken / Typed Text
            </label>
            <div className="relative">
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Type a sentence or click Start Microphone..."
                className="w-full pl-4 pr-24 py-3 bg-white border border-[#E5E2DC] rounded-xl text-sm font-semibold text-[#22352E] focus:outline-none focus:ring-2 focus:ring-[#506847]"
              />
              {inputText && (
                <button
                  onClick={handleSpeak}
                  disabled={isSpeaking}
                  className="absolute right-2 top-2 px-2.5 py-1 bg-[#EDF2E9] hover:bg-[#E5E2DC] text-[#506847] rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                  title="Speak out loud"
                >
                  <SpeakerIcon className="w-3.5 h-3.5" />
                  <span>{isSpeaking ? "Playing..." : "Speak"}</span>
                </button>
              )}
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="p-4 bg-[#EDF2E9]/50 border border-[#E5E2DC] rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#506847] uppercase tracking-wider flex items-center gap-1.5">
                <SparkleIcon className="w-3.5 h-3.5" />
                <span>Recognized Words Count</span>
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 bg-[#506847] text-white rounded-full">
                {signVisuals.length} ISL signs
              </span>
            </div>
            <p className="text-sm font-semibold text-[#22352E]">
              {inputText || "No text entered yet."}
            </p>
          </div>
        </div>
      </div>

      {/* ISL Visual Sign Sequence Cards */}
      <div className="space-y-3 pt-4 border-t border-[#E5E2DC]">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-manrope text-[#22352E] flex items-center gap-2">
            <HandIcon className="w-4 h-4 text-[#506847]" />
            <span>Translated ISL Sign Sequence</span>
          </h3>
          {signVisuals.length > 0 && (
            <button
              onClick={() => {
                setInputText("");
                setSignVisuals([]);
              }}
              className="text-xs font-semibold text-rose-700 hover:text-rose-900"
            >
              Clear All
            </button>
          )}
        </div>

        {signVisuals.length === 0 ? (
          <div className="p-8 text-center bg-[#EDF2E9]/30 border border-dashed border-[#E5E2DC] rounded-2xl text-[#707877] text-xs">
            Speak into your microphone or type text above to render step-by-step ISL visual signs.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {signVisuals.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FCFCFB] border border-[#E5E2DC] rounded-2xl p-3 flex flex-col items-center justify-between gap-2 shadow-2xs hover:shadow-sm transition"
              >
                <span className="text-[10px] font-extrabold text-[#506847] uppercase tracking-wider">
                  Step {idx + 1}: {item.token}
                </span>

                <div className="w-full aspect-square bg-[#EDF2E9] rounded-xl overflow-hidden flex items-center justify-center border border-[#E5E2DC]">
                  {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageUrl}
                      alt={`ISL Sign for ${item.token}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.display = "none";
                        if (target.nextElementSibling) {
                          (target.nextElementSibling as HTMLElement).style.display = "flex";
                        }
                      }}
                    />
                  ) : null}
                  <div
                    className="w-full h-full flex items-center justify-center text-3xl font-black text-[#506847] bg-[#EDF2E9]"
                    style={{ display: item.imageUrl ? "none" : "flex" }}
                  >
                    {item.token}
                  </div>
                </div>

                <span className="px-2 py-0.5 bg-[#EDF2E9] text-[#22352E] rounded-md text-[10px] font-bold uppercase">
                  {item.type === "word" ? "Word Sign" : "Letter Sign"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
