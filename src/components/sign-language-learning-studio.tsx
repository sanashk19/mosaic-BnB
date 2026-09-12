"use client";

import React, { useState } from "react";
import { SignLanguageTrainer } from "@/components/trainers/sign-language-trainer";
import { SignLanguageStt } from "@/components/sign-language-stt";

interface SignItem {
  id: string;
  label: string;
  category: "alphabets" | "numbers" | "words";
  description: string;
  imageUrl?: string;
}

const ALPHABETS: SignItem[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((char) => ({
  id: char,
  label: `Letter ${char}`,
  category: "alphabets",
  description: `Form the ISL gesture for letter ${char}`,
  imageUrl: `https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/${char}.jpg`,
}));

const NUMBERS: SignItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  label: `Number ${i}`,
  category: "numbers",
  description: `Show ${i} finger count ISL gesture`,
  imageUrl: `https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/num_${i}.jpg`,
}));

const WORDS: SignItem[] = [
  { id: "HELLO", label: "Hello", category: "words", description: "Wave palm gently near head" },
  { id: "NAMASTE", label: "Namaste", category: "words", description: "Join palms together in front of chest" },
  { id: "THANK YOU", label: "Thank You", category: "words", description: "Touch chin with fingers and extend forward" },
  { id: "WATER", label: "Water", category: "words", description: "Form 'W' shape near mouth" },
  { id: "HELP", label: "Help", category: "words", description: "Place thumb up on flat palm" },
  { id: "LOVE", label: "Love", category: "words", description: "Cross arms over chest" },
  { id: "FAMILY", label: "Family", category: "words", description: "Circle 'F' fingers together" },
  { id: "FRIEND", label: "Friend", category: "words", description: "Interlock index fingers twice" },
  { id: "YES", label: "Yes", category: "words", description: "Nod fist up and down" },
  { id: "NO", label: "No", category: "words", description: "Snap index and middle finger against thumb" },
];

const QUIZ_QUESTIONS = [
  {
    question: "What is the ISL sign gesture for 'HELLO'?",
    correctSign: "HELLO",
    options: ["HELLO", "NAMASTE", "WATER", "HELP"],
    hint: "Wave your palm near your head.",
  },
  {
    question: "Which sign involves joining both palms in front of your chest?",
    correctSign: "NAMASTE",
    options: ["THANK YOU", "NAMASTE", "YES", "FAMILY"],
    hint: "Traditional Indian greeting sign.",
  },
  {
    question: "How do you express 'WATER' in Indian Sign Language?",
    correctSign: "WATER",
    options: ["LOVE", "NO", "WATER", "FRIEND"],
    hint: "Form a 'W' shape with fingers near your mouth.",
  },
  {
    question: "What gesture represents 'THANK YOU'?",
    correctSign: "THANK YOU",
    options: ["THANK YOU", "HELP", "YES", "HELLO"],
    hint: "Touch chin gently with finger tips and move forward.",
  },
  {
    question: "Which sign uses a thumbs-up supported on a flat palm?",
    correctSign: "HELP",
    options: ["NO", "HELP", "LOVE", "FAMILY"],
    hint: "Universal sign requesting assistance.",
  },
];

export function SignLanguageLearningStudio() {
  const [mainMode, setMainMode] = useState<"curriculum" | "live-trainer" | "speech-to-sign" | "quiz">("curriculum");
  const [activeCategory, setActiveCategory] = useState<"alphabets" | "numbers" | "words">("alphabets");
  const [practiceSign, setPracticeSign] = useState<SignItem | null>(null);
  const [completedSigns, setCompletedSigns] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Quiz State
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showQuizExplanation, setShowQuizExplanation] = useState<boolean>(false);

  const currentItems = (
    activeCategory === "alphabets" ? ALPHABETS : activeCategory === "numbers" ? NUMBERS : WORDS
  ).filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePracticeSuccess = () => {
    if (practiceSign && !completedSigns.includes(practiceSign.id)) {
      setCompletedSigns((prev) => [...prev, practiceSign.id]);
    }
  };

  const handleAnswerSelect = (option: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);
    setShowQuizExplanation(true);
    if (option === QUIZ_QUESTIONS[quizIndex].correctSign) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const nextQuizQuestion = () => {
    setSelectedAnswer(null);
    setShowQuizExplanation(false);
    setQuizIndex((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  return (
    <div className="isl-studio w-full max-w-6xl mx-auto space-y-8 font-sans">
      {/* Hero Studio Banner - Warm Forest & Terracotta Palette */}
      <div className="isl-hero relative overflow-hidden bg-gradient-to-r from-[#22352E] via-[#344934] to-[#506847] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#344934]">
        <div className="isl-hero-content relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#D8663F]/20 border border-[#D8663F]/40 text-[#FDEAD3] rounded-full text-xs font-semibold uppercase tracking-wider">
            <span>✨ Integrated SanketSetu ISL Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-heading text-[#FCFCFB]">
            Indian Sign Language (ISL) Studio
          </h1>
          <p className="text-[#EDF2E9] text-sm sm:text-base leading-relaxed">
            Accessible, two-way sign language learning ecosystem: Explore the ISL curriculum, test real-time gesture recognition with live AI tracking, practice interactive quizzes, or convert speech and text to visual sign sequences.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="bg-[#FCFCFB]/10 backdrop-blur rounded-2xl px-4 py-2.5 flex items-center gap-3 border border-white/10">
              <span className="text-2xl">🌟</span>
              <div>
                <div className="text-[11px] text-[#FDEAD3] uppercase font-bold tracking-wider">Signs Mastered</div>
                <div className="text-lg font-extrabold text-[#FCFCFB]">{completedSigns.length} / 46</div>
              </div>
            </div>

            <div className="bg-[#FCFCFB]/10 backdrop-blur rounded-2xl px-4 py-2.5 flex items-center gap-3 border border-white/10">
              <span className="text-2xl">🖐️</span>
              <div>
                <div className="text-[11px] text-[#FDEAD3] uppercase font-bold tracking-wider">MediaPipe AI</div>
                <div className="text-lg font-extrabold text-emerald-300">Live Recognition</div>
              </div>
            </div>

            <div className="bg-[#FCFCFB]/10 backdrop-blur rounded-2xl px-4 py-2.5 flex items-center gap-3 border border-white/10">
              <span className="text-2xl">🧠</span>
              <div>
                <div className="text-[11px] text-[#FDEAD3] uppercase font-bold tracking-wider">Quiz Score</div>
                <div className="text-lg font-extrabold text-[#D8663F]">{quizScore} pts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Features Navigation */}
      <div className="isl-nav-tabs flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 bg-[#EDF2E9] p-2 rounded-2xl border border-[#E5E2DC]">
        <button
          onClick={() => setMainMode("curriculum")}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
            mainMode === "curriculum"
              ? "bg-[#FCFCFB] text-[#22352E] shadow-sm border border-[#E5E2DC]"
              : "text-[#59635E] hover:text-[#22352E]"
          }`}
        >
          <span>📚</span> ISL Curriculum
        </button>

        <button
          onClick={() => setMainMode("live-trainer")}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
            mainMode === "live-trainer"
              ? "bg-[#FCFCFB] text-[#22352E] shadow-sm border border-[#E5E2DC]"
              : "text-[#59635E] hover:text-[#22352E]"
          }`}
        >
          <span>📹</span> Live Recognizer
        </button>

        <button
          onClick={() => setMainMode("speech-to-sign")}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
            mainMode === "speech-to-sign"
              ? "bg-[#FCFCFB] text-[#22352E] shadow-sm border border-[#E5E2DC]"
              : "text-[#59635E] hover:text-[#22352E]"
          }`}
        >
          <span>🎤</span> Speech to Sign
        </button>

        <button
          onClick={() => setMainMode("quiz")}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
            mainMode === "quiz"
              ? "bg-[#FCFCFB] text-[#22352E] shadow-sm border border-[#E5E2DC]"
              : "text-[#59635E] hover:text-[#22352E]"
          }`}
        >
          <span>❓</span> Interactive Quiz
        </button>
      </div>

      {/* Mode 1: Curriculum Catalog */}
      {mainMode === "curriculum" && (
        <div className="space-y-6">
          {/* Sub-category Tabs & Search */}
          <div className="isl-sub-nav flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E5E2DC] pb-4">
            <div className="isl-category-group flex items-center gap-2 bg-[#EDF2E9] p-1.5 rounded-xl w-full sm:w-auto border border-[#E5E2DC]">
              <button
                onClick={() => setActiveCategory("alphabets")}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg font-bold text-xs transition ${
                  activeCategory === "alphabets"
                    ? "bg-[#FCFCFB] text-[#22352E] shadow-sm"
                    : "text-[#59635E] hover:text-[#22352E]"
                }`}
              >
                Alphabets (A-Z)
              </button>
              <button
                onClick={() => setActiveCategory("numbers")}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg font-bold text-xs transition ${
                  activeCategory === "numbers"
                    ? "bg-[#FCFCFB] text-[#22352E] shadow-sm"
                    : "text-[#59635E] hover:text-[#22352E]"
                }`}
              >
                Numbers (0-9)
              </button>
              <button
                onClick={() => setActiveCategory("words")}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg font-bold text-xs transition ${
                  activeCategory === "words"
                    ? "bg-[#FCFCFB] text-[#22352E] shadow-sm"
                    : "text-[#59635E] hover:text-[#22352E]"
                }`}
              >
                Common Words
              </button>
            </div>

            <div className="isl-search-wrap relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search sign..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="isl-search-input w-full pl-9 pr-4 py-2.5 bg-[#FCFCFB] border border-[#E5E2DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#506847] text-[#22352E]"
              />
              <span className="absolute left-3 top-3 text-[#707877] text-sm">🔍</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="isl-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {currentItems.map((item) => {
              const isDone = completedSigns.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`isl-card group relative bg-[#FCFCFB] rounded-3xl p-4 border transition-all duration-200 flex flex-col justify-between hover:shadow-md ${
                    isDone
                      ? "border-[#506847] ring-2 ring-[#EDF2E9] bg-[#EDF2E9]/40"
                      : "border-[#E5E2DC] hover:border-[#506847]"
                  }`}
                >
                  {isDone && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-[#506847] text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                      Done ✓
                    </span>
                  )}

                  <div className="w-full aspect-square bg-[#EDF2E9] rounded-2xl flex items-center justify-center overflow-hidden mb-3 border border-[#E5E2DC] group-hover:scale-105 transition-transform">
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.imageUrl}
                        alt={item.label}
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
                      className="w-full h-full flex items-center justify-center text-4xl font-black text-[#506847] bg-[#EDF2E9]"
                      style={{ display: item.imageUrl ? "none" : "flex" }}
                    >
                      {item.id}
                    </div>
                  </div>

                  <div className="space-y-1 mb-4">
                    <h3 className="font-bold text-[#22352E] text-base leading-snug">{item.label}</h3>
                    <p className="text-xs text-[#707877] line-clamp-2">{item.description}</p>
                  </div>

                  <button
                    onClick={() => setPracticeSign(item)}
                    className="w-full py-2.5 bg-[#506847] hover:bg-[#344934] text-white font-semibold rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>📹</span> Practice Sign
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode 2: Standalone Live Gesture Recognizer */}
      {mainMode === "live-trainer" && <SignLanguageTrainer />}

      {/* Mode 3: Speech & Text to ISL Converter */}
      {mainMode === "speech-to-sign" && <SignLanguageStt />}

      {/* Mode 4: Interactive Quiz & Knowledge Test */}
      {mainMode === "quiz" && (
        <div className="w-full max-w-3xl mx-auto bg-[#FCFCFB] p-6 sm:p-8 rounded-3xl border border-[#E5E2DC] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E2DC] pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#D8663F] block">
                Knowledge Challenge
              </span>
              <h2 className="text-2xl font-bold text-[#22352E]">ISL Gesture Quiz</h2>
            </div>
            <div className="px-4 py-2 bg-[#EDF2E9] rounded-2xl border border-[#E5E2DC] text-right">
              <span className="text-[10px] uppercase font-bold text-[#707877]">Score</span>
              <div className="text-xl font-black text-[#506847]">{quizScore} / {QUIZ_QUESTIONS.length}</div>
            </div>
          </div>

          {/* Question Box */}
          <div className="space-y-4">
            <div className="p-4 bg-[#EDF2E9]/60 rounded-2xl border border-[#E5E2DC]">
              <span className="text-xs font-bold text-[#506847] uppercase tracking-wider">
                Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <h3 className="text-lg font-bold text-[#22352E] mt-1">
                {QUIZ_QUESTIONS[quizIndex].question}
              </h3>
              <p className="text-xs text-[#707877] mt-1 italic">
                💡 Hint: {QUIZ_QUESTIONS[quizIndex].hint}
              </p>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {QUIZ_QUESTIONS[quizIndex].options.map((opt) => {
                const isSelected = selectedAnswer === opt;
                const isCorrect = opt === QUIZ_QUESTIONS[quizIndex].correctSign;
                let btnStyle = "bg-[#FCFCFB] border-[#E5E2DC] text-[#22352E] hover:border-[#506847]";

                if (showQuizExplanation) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-900 font-extrabold";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-100 border-rose-400 text-rose-900";
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleAnswerSelect(opt)}
                    disabled={showQuizExplanation}
                    className={`p-4 rounded-2xl border text-left font-semibold text-sm transition flex items-center justify-between shadow-sm ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {showQuizExplanation && isCorrect && <span className="text-emerald-700 text-base">✓</span>}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next Controls */}
            {showQuizExplanation && (
              <div className="p-4 bg-[#FBECE5] rounded-2xl border border-[#D8663F]/30 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D8663F]">
                    {selectedAnswer === QUIZ_QUESTIONS[quizIndex].correctSign ? "🎉 Correct Answer!" : "❌ Incorrect"}
                  </span>
                  <button
                    onClick={nextQuizQuestion}
                    className="px-5 py-2.5 bg-[#506847] hover:bg-[#344934] text-white font-bold text-xs rounded-xl transition shadow-sm"
                  >
                    Next Question →
                  </button>
                </div>
                <p className="text-xs text-[#22352E]">
                  The correct sign is <strong>&quot;{QUIZ_QUESTIONS[quizIndex].correctSign}&quot;</strong>. Practice this sign in the Live Recognizer or Curriculum!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Practice Modal Dialog */}
      {practiceSign && (
        <div className="fixed inset-0 z-50 bg-[#22352E]/70 backdrop-blur-sm p-4 overflow-y-auto flex items-center justify-center animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#FCFCFB] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 my-8 border border-[#E5E2DC]">
            <button
              onClick={() => setPracticeSign(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#EDF2E9] hover:bg-[#E5E2DC] text-[#22352E] font-bold flex items-center justify-center text-xl transition"
            >
              ✕
            </button>

            <SignLanguageTrainer
              targetSign={practiceSign.id}
              title={`Practice Sign "${practiceSign.label}"`}
              subtitle={`Show the gesture for ${practiceSign.label} to the webcam.`}
              onSuccess={handlePracticeSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
}
