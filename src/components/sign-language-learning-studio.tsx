"use client";

import React, { useState } from "react";
import { SignLanguageTrainer } from "@/components/trainers/sign-language-trainer";
import { SignLanguageStt } from "@/components/sign-language-stt";
import {
  BookIcon,
  CameraIcon,
  MicIcon,
  QuizIcon,
  HandIcon,
  SparkleIcon,
  TrophyIcon,
  SearchIcon,
  CheckIcon,
  XIcon,
  LightbulbIcon,
  ArrowRightIcon,
} from "@/components/isl-icons";

export type ISLCategory =
  | "everyday"
  | "school"
  | "alphabets"
  | "numbers"
  | "places"
  | "safety"
  | "india";

export interface SignItem {
  id: string;
  label: string;
  hindiLabel: string;
  category: ISLCategory;
  description: string;
  imageUrl?: string;
  isComingSoon?: boolean;
}

const ALPHABETS: SignItem[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((char) => {
  const hindiMap: Record<string, string> = {
    A: "ए", B: "बी", C: "सी", D: "डी", E: "ई", F: "एफ", G: "जी", H: "एच",
    I: "आई", J: "जे", K: "के", L: "एल", M: "एम", N: "एन", O: "ओ", P: "पी",
    Q: "क्यू", R: "आर", S: "एस", T: "टी", U: "यू", V: "वी", W: "डब्ल्यू",
    X: "एक्स", Y: "वाई", Z: "ज़ेड",
  };
  return {
    id: char,
    label: `Letter ${char}`,
    hindiLabel: `अक्षर ${hindiMap[char] || char}`,
    category: "alphabets",
    description: `Two-handed ISL: Form the standard Indian Sign Language handshape for letter ${char}.`,
  };
});

const NUMBERS: SignItem[] = [
  { id: "0", label: "Number 0", hindiLabel: "शून्य (०)", category: "numbers", description: "Fingers curved together into an oval circle shape.", },
  { id: "1", label: "Number 1", hindiLabel: "एक (१)", category: "numbers", description: "Index finger raised vertically, palm facing inward.", },
  { id: "2", label: "Number 2", hindiLabel: "दो (२)", category: "numbers", description: "Index and middle fingers extended upward in a 'V' shape.", },
  { id: "3", label: "Number 3", hindiLabel: "तीन (३)", category: "numbers", description: "Thumb, index, and middle fingers extended forward.", },
  { id: "4", label: "Number 4", hindiLabel: "चार (४)", category: "numbers", description: "Four fingers extended upward with thumb folded over palm.", },
  { id: "5", label: "Number 5", hindiLabel: "पाँच (५)", category: "numbers", description: "All five fingers spread open, palm facing forward.", },
  { id: "6", label: "Number 6", hindiLabel: "छह (६)", category: "numbers", description: "Thumb and little finger touching across palm, three fingers raised.", },
  { id: "7", label: "Number 7", hindiLabel: "सात (७)", category: "numbers", description: "Thumb and ring finger touching across palm, three fingers up.", },
  { id: "8", label: "Number 8", hindiLabel: "आठ (८)", category: "numbers", description: "Thumb and middle finger touching across palm, remaining fingers up.", },
  { id: "9", label: "Number 9", hindiLabel: "नौ (९)", category: "numbers", description: "Thumb and index finger touching across palm.", },
];

const EVERYDAY_WORDS: SignItem[] = [
  {
    id: "NAMASTE",
    label: "Namaste",
    hindiLabel: "नमस्ते",
    category: "everyday",
    description: "Join both palms flat in front of chest and bow head gently in respect (ISLRTC standard greeting).",
  },
  {
    id: "HELLO",
    label: "Hello",
    hindiLabel: "हैलो / नमस्ते",
    category: "everyday",
    description: "Open palm waved gently near temple with friendly facial expression.",
  },
  {
    id: "WATER",
    label: "Water",
    hindiLabel: "पानी",
    category: "everyday",
    description: "Form a 'W' handshape with three fingers and tap side of chin/mouth twice.",
  },
  {
    id: "FOOD",
    label: "Food",
    hindiLabel: "खाना",
    category: "everyday",
    description: "Fingertips bunched together and brought towards mouth twice, miming eating.",
  },
  {
    id: "HOME",
    label: "Home",
    hindiLabel: "घर",
    category: "everyday",
    description: "Both open hands join at fingertips above chest to form roof triangle.",
  },
  {
    id: "FAMILY",
    label: "Family",
    hindiLabel: "परिवार",
    category: "everyday",
    description: "Both hands form 'F' shapes with thumb and index, circling outward to meet together.",
  },
  {
    id: "FRIENDS",
    label: "Friends",
    hindiLabel: "दोस्त",
    category: "everyday",
    description: "Both index fingers hooked together and gently interlocked twice in camaraderie.",
  },
  {
    id: "HELP",
    label: "Help",
    hindiLabel: "मदद",
    category: "everyday",
    description: "Dominant thumbs-up rested on flat upward palm, lifted gently upward.",
  },
  {
    id: "THANK YOU",
    label: "Thank You",
    hindiLabel: "धन्यवाद",
    category: "everyday",
    description: "Fingertips touch chin gently and move smoothly forward towards the person.",
  },
  {
    id: "YES",
    label: "Yes",
    hindiLabel: "हाँ",
    category: "everyday",
    description: "Closed fist nodded up and down twice, mirroring an affirmative head nod.",
  },
  {
    id: "NO",
    label: "No",
    hindiLabel: "नहीं",
    category: "everyday",
    description: "Index and middle finger snap firmly against thumb twice.",
  },
  {
    id: "GO",
    label: "Go",
    hindiLabel: "जाना",
    category: "everyday",
    description: "Both index fingers arc forward away from body, indicating movement or departure.",
  },
  {
    id: "TODAY",
    label: "Today",
    hindiLabel: "आज",
    category: "everyday",
    description: "Both open hands with palms facing upward move gently downward twice.",
  },
  {
    id: "WANT",
    label: "Want",
    hindiLabel: "चाहिए",
    category: "everyday",
    description: "Both open hands with curved fingers pull gently towards the chest.",
  },
  {
    id: "WARNING",
    label: "Warning",
    hindiLabel: "चेतावनी",
    category: "everyday",
    description: "Flat palm facing outward pushing firmly forward, alerting of caution or danger.",
  },
  {
    id: "YOU",
    label: "You",
    hindiLabel: "आप / तुम",
    category: "everyday",
    description: "Index finger points directly forward toward the conversation partner.",
  },
  {
    id: "SHY",
    label: "Shy",
    hindiLabel: "शर्म",
    category: "everyday",
    description: "Back of fingers gently stroke the cheek with a pleasant bashful expression.",
  },
  {
    id: "SPIDER-MAN",
    label: "Spider-Man",
    hindiLabel: "स्पाइडर-मैन",
    category: "everyday",
    description: "Thumb, index, and little finger extended forward with middle and ring fingers folded.",
  },
];

const SCHOOL_LIFE: SignItem[] = [
  {
    id: "TEACHER",
    label: "Teacher",
    hindiLabel: "अध्यापक / शिक्षक",
    category: "school",
    description: "Index finger and thumb tap chest gently, followed by the person sign (ISLRTC standard).",
  },
  {
    id: "CLASSROOM",
    label: "Classroom",
    hindiLabel: "कक्षा",
    category: "school",
    description: "Both flat palms outline room boundary corners, followed by the book study sign.",
  },
  {
    id: "BOOK",
    label: "Book",
    hindiLabel: "किताब",
    category: "school",
    description: "Both flat palms joined together at wrists and opened outward like opening a book.",
  },
  {
    id: "NOTEBOOK",
    label: "Notebook",
    hindiLabel: "कॉपी / नोटबुक",
    category: "school",
    description: "Flat left hand serves as page, right fingertips mime writing smoothly with a pen.",
  },
  {
    id: "PENCIL",
    label: "Pencil",
    hindiLabel: "पेंसिल",
    category: "school",
    description: "Thumb and index finger pinched together, moving across palm in precise writing stroke.",
  },
  {
    id: "HOMEWORK",
    label: "Homework",
    hindiLabel: "गृहकार्य",
    category: "school",
    description: "Sign for Home (roof) followed by sign for Work (fists striking together).",
  },
  {
    id: "EXAM",
    label: "Exam",
    hindiLabel: "परीक्षा",
    category: "school",
    description: "Flat paper sign followed by right hand checking motion with focused facial expression.",
  },
  {
    id: "PLAYGROUND",
    label: "Playground",
    hindiLabel: "खेल का मैदान",
    category: "school",
    description: "Two hands shake thumbs-up in play gesture, then sweep wide to indicate open ground.",
  },
];

const PUBLIC_PLACES: SignItem[] = [
  {
    id: "HOSPITAL",
    label: "Hospital",
    hindiLabel: "अस्पताल",
    category: "places",
    description: "Dominant index finger traces a cross on the upper left shoulder (ISLRTC standard).",
  },
  {
    id: "POLICE",
    label: "Police",
    hindiLabel: "पुलिस",
    category: "places",
    description: "Two fingers placed at temple mimicking the visor peak of a police uniform cap.",
  },
  {
    id: "BANK",
    label: "Bank",
    hindiLabel: "बैंक",
    category: "places",
    description: "Thumb rubs fingertips in money counting gesture across flat countertop.",
  },
  {
    id: "MARKET",
    label: "Market",
    hindiLabel: "बाज़ार",
    category: "places",
    description: "Hands alternate in exchange motion, indicating bustling stalls and shopping.",
  },
  {
    id: "RAILWAY_STATION",
    label: "Railway Station",
    hindiLabel: "रेलवे स्टेशन",
    category: "places",
    description: "Two fingers glide along forearm like a train gliding along railway tracks (ISLRTC).",
  },
  {
    id: "BUS",
    label: "Bus",
    hindiLabel: "बस",
    category: "places",
    description: "Both hands hold imaginary large steering wheel, miming smooth driver turns.",
  },
  {
    id: "POST_OFFICE",
    label: "Post Office",
    hindiLabel: "डाकघर",
    category: "places",
    description: "Miming licking postal stamp and pressing it firmly onto flat left palm.",
  },
];

const SAFETY_SIGNS: SignItem[] = [
  {
    id: "SAFETY_HELP",
    label: "Help (Urgent)",
    hindiLabel: "मदद (आपातकाल)",
    category: "safety",
    description: "Thumbs-up resting on flat upward palm, lifted upward urgently with direct eye contact.",
  },
  {
    id: "EMERGENCY",
    label: "Emergency",
    hindiLabel: "आपातकाल",
    category: "safety",
    description: "Letter 'E' handshape shaken with alert, attentive facial expression.",
  },
  {
    id: "DANGER",
    label: "Danger",
    hindiLabel: "खतरा",
    category: "safety",
    description: "Flat dominant hand moves in urgent caution slicing gesture across chest.",
  },
  {
    id: "STOP",
    label: "Stop",
    hindiLabel: "रुकें",
    category: "safety",
    description: "Vertical flat palm extended firmly forward, fingers together pointing up.",
  },
  {
    id: "DOCTOR",
    label: "Doctor",
    hindiLabel: "डॉक्टर",
    category: "safety",
    description: "Three fingers touch inner wrist gently to check pulse rate (ISLRTC standard).",
  },
  {
    id: "SAFE",
    label: "Safe",
    hindiLabel: "सुरक्षित",
    category: "safety",
    description: "Crossed wrists gently pull apart into open palms, indicating freedom and safety.",
  },
];

const INDIA_CONTEXT: SignItem[] = [
  {
    id: "INDIA",
    label: "India",
    hindiLabel: "भारत",
    category: "india",
    description: "Dominant thumb tip touches center of forehead (Bindi/Tilak sign, ISLRTC standard for India).",
  },
  {
    id: "DELHI",
    label: "Delhi",
    hindiLabel: "दिल्ली",
    category: "india",
    description: "'D' handshape placed near temple, indicating the national capital (ISLRTC regional).",
  },
  {
    id: "MUMBAI",
    label: "Mumbai",
    hindiLabel: "मुंबई",
    category: "india",
    description: "'M' handshape moving with gentle coastal wave motion.",
  },
  {
    id: "GOA",
    label: "Goa",
    hindiLabel: "गोवा",
    category: "india",
    description: "'G' handshape moving near chest with coastal indicator (ISLRTC regional sign).",
    isComingSoon: true,
  },
  {
    id: "FESTIVAL",
    label: "Festival",
    hindiLabel: "त्योहार",
    category: "india",
    description: "Both hands open and burst outward with wiggling fingers, showing joyful celebration.",
  },
  {
    id: "SCHOOL_INDIA",
    label: "School",
    hindiLabel: "विद्यालय",
    category: "india",
    description: "Palms clap together gently twice in learning gesture (ISLRTC standard).",
  },
];

const ALL_CURRICULUM_ITEMS: Record<ISLCategory, SignItem[]> = {
  everyday: EVERYDAY_WORDS,
  school: SCHOOL_LIFE,
  alphabets: ALPHABETS,
  numbers: NUMBERS,
  places: PUBLIC_PLACES,
  safety: SAFETY_SIGNS,
  india: INDIA_CONTEXT,
};

export const SCHOOL_TOPICS = [
  {
    grade: "Class 1",
    title: "Greetings & Family",
    signs: ["Namaste", "Hello", "Family", "Home"],
    description: "Foundational signs for introducing oneself and greeting elders with respect.",
  },
  {
    grade: "Class 2",
    title: "Classroom Basics",
    signs: ["Teacher", "Book", "Pencil", "Water"],
    description: "Essential signs for communicating with educators and classmates daily.",
  },
  {
    grade: "Class 3",
    title: "Numbers & Routine",
    signs: ["0 to 9", "Food", "Friends", "Playground"],
    description: "Counting objects, snack time, and making friends during school breaks.",
  },
  {
    grade: "Class 4",
    title: "Community & Public Places",
    signs: ["Hospital", "Police", "Bus", "Post office"],
    description: "Navigating neighborhood spaces and public utilities with confidence.",
  },
  {
    grade: "Class 5",
    title: "Our Country India",
    signs: ["India", "Delhi", "Festival", "Safe"],
    description: "Cultural celebrations, capital geography, and safety awareness.",
  },
];

const QUIZ_QUESTIONS = [
  {
    question: "What is the authentic Indian Sign Language greeting showing mutual respect?",
    correctSign: "NAMASTE",
    options: ["NAMASTE", "HELLO", "WATER", "HELP"],
    hint: "Both palms join flat in front of the chest with a slight nod of the head.",
  },
  {
    question: "How do you sign 'WATER' in Indian Sign Language?",
    correctSign: "WATER",
    options: ["WATER", "FOOD", "FAMILY", "NO"],
    hint: "Form a 'W' handshape with three fingers and tap near the side of the mouth.",
  },
  {
    question: "What is the ISLRTC standard gesture for 'DOCTOR'?",
    correctSign: "DOCTOR",
    options: ["DOCTOR", "POLICE", "TEACHER", "STOP"],
    hint: "Touch three fingers gently to the inner wrist to check the pulse.",
  },
  {
    question: "Which gesture expresses 'HELP' in Indian Sign Language?",
    correctSign: "HELP",
    options: ["HELP", "YES", "FRIENDS", "BOOK"],
    hint: "Place a thumbs-up handshape upon a flat open palm and lift upward.",
  },
  {
    question: "What sign represents our country 'INDIA' in ISLRTC standard sign language?",
    correctSign: "INDIA",
    options: ["INDIA", "DELHI", "MUMBAI", "SCHOOL"],
    hint: "Touch the thumb tip gently to the center of the forehead (Bindi/Tilak sign).",
  },
];

export function SignLanguageLearningStudio() {
  const [activeCategory, setActiveCategory] = useState<ISLCategory>("everyday");
  const [practiceSign, setPracticeSign] = useState<SignItem | null>(null);
  const [activeCameraTarget, setActiveCameraTarget] = useState<SignItem | null>(null);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});
  const [completedSigns, setCompletedSigns] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("mosaic_isl_completed_signs");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Save persisted progress
  const saveProgress = (newCompleted: string[]) => {
    setCompletedSigns(newCompleted);
    try {
      localStorage.setItem("mosaic_isl_completed_signs", JSON.stringify(newCompleted));
    } catch (e) {
      console.warn("Could not save ISL completed signs to localStorage", e);
    }
  };

  // Quiz State
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showQuizExplanation, setShowQuizExplanation] = useState<boolean>(false);

  const currentCategoryItems = ALL_CURRICULUM_ITEMS[activeCategory] || [];
  const currentItems = currentCategoryItems.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.label.toLowerCase().includes(q) ||
      item.hindiLabel.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  const totalSignCount = Object.values(ALL_CURRICULUM_ITEMS).reduce((acc, items) => acc + items.length, 0);

  const handlePracticeSuccess = (signId?: string) => {
    const idToMark = signId || activeCameraTarget?.id || practiceSign?.id;
    if (idToMark && !completedSigns.includes(idToMark)) {
      const updated = [...completedSigns, idToMark];
      saveProgress(updated);
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

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const startCameraPracticeForSign = (sign: SignItem) => {
    setActiveCameraTarget(sign);
    setPracticeSign(null);
    scrollToSection("live-recognition");
  };

  return (
    <div className="isl-studio-page">
      {/* ── SECTION 1: HERO ────────────────────────────────────────────── */}
      <section className="isl-hero">
        <div className="isl-container">
          <div className="isl-hero-grid">
            {/* Left Content */}
            <div className="isl-hero-content">
              <div className="isl-badge isl-badge-mint">
                <SparkleIcon size={14} />
                <span>Indian Sign Language • ISLRTC Referenced</span>
              </div>

              <h1 className="isl-hero-title">
                Learn, practice and communicate in Indian Sign Language.
              </h1>

              <p className="isl-hero-desc">
                Explore the official ISL curriculum, practice authentic gestures with guided exercises,
                and use live camera tracking to connect signs with words and learning activities.
              </p>

              <div className="isl-hero-actions">
                <button
                  type="button"
                  onClick={() => scrollToSection("curriculum")}
                  className="isl-btn isl-btn-primary"
                >
                  <span>Start practicing</span>
                  <ArrowRightIcon size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("live-recognition")}
                  className="isl-btn isl-btn-secondary"
                >
                  <CameraIcon size={16} />
                  <span>Try live recognition</span>
                </button>
              </div>

              <div className="isl-hero-meta">
                <span><strong>ISLRTC</strong> Sourced &amp; Standardized</span>
                <span>·</span>
                <span><strong>English &amp; Hindi</strong> Equivalents</span>
                <span>·</span>
                <span><strong>Child-Friendly</strong> Pacing</span>
              </div>
            </div>

            {/* Right Hero Visual */}
            <div className="isl-hero-preview">
              <div className="isl-hero-preview-card">
                <div className="isl-hero-sign-demo">
                  <div className="isl-hero-sign-visual">
                    <span>ISL</span>
                  </div>
                  <div className="isl-hero-sign-details">
                    <span className="isl-badge isl-badge-peach" style={{ marginBottom: "0.25rem" }}>
                      Featured Sign
                    </span>
                    <h4>Namaste / नमस्ते</h4>
                    <p>Join palms together in front of chest.</p>
                  </div>
                </div>
              </div>

              <div className="isl-hero-tips">
                <div className="isl-hero-tip-item">
                  <CheckIcon size={16} />
                  <span>Two-handed ISL finger alphabet &amp; numbers</span>
                </div>
                <div className="isl-hero-tip-item">
                  <CheckIcon size={16} />
                  <span>Everyday school, home, and safety vocabulary</span>
                </div>
                <div className="isl-hero-tip-item">
                  <CheckIcon size={16} />
                  <span>Real camera feedback with MediaPipe gesture tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Studio Container */}
      <div className="isl-container" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
        {/* ── SECTION 2: QUICK ACTIONS ─────────────────────────────────── */}
        <section style={{ marginBottom: "2.5rem" }}>
          <div className="isl-quick-grid">
            {/* Card 1: Curriculum */}
            <button
              type="button"
              onClick={() => scrollToSection("curriculum")}
              className="isl-quick-card mint"
            >
              <div className="isl-quick-icon">
                <BookIcon size={22} />
              </div>
              <h3 className="isl-quick-title">ISL Curriculum</h3>
              <p className="isl-quick-desc">Alphabet, numbers, school &amp; safety signs</p>
            </button>

            {/* Card 2: Live Recognition */}
            <button
              type="button"
              onClick={() => scrollToSection("live-recognition")}
              className="isl-quick-card peach"
            >
              <div className="isl-quick-icon">
                <CameraIcon size={22} />
              </div>
              <h3 className="isl-quick-title">Live Recognition</h3>
              <p className="isl-quick-desc">Camera gesture tracking &amp; sentence builder</p>
            </button>

            {/* Card 3: Speech to Sign */}
            <button
              type="button"
              onClick={() => scrollToSection("speech-to-sign")}
              className="isl-quick-card lavender"
            >
              <div className="isl-quick-icon">
                <MicIcon size={22} />
              </div>
              <h3 className="isl-quick-title">Speech to Sign</h3>
              <p className="isl-quick-desc">Speak or type to view ISL sign sequence</p>
            </button>

            {/* Card 4: Practice Quiz */}
            <button
              type="button"
              onClick={() => scrollToSection("practice-quiz")}
              className="isl-quick-card pink"
            >
              <div className="isl-quick-icon">
                <QuizIcon size={22} />
              </div>
              <h3 className="isl-quick-title">Practice Quiz</h3>
              <p className="isl-quick-desc">Child-friendly interactive sign evaluation</p>
            </button>
          </div>
        </section>

        {/* ── LEARNING PROGRESS STRIP ───────────────────────────────────── */}
        <section style={{ marginBottom: "3rem" }}>
          <div style={{
            backgroundColor: "#FCFCFB",
            border: "1px solid #E5E2DC",
            borderRadius: "16px",
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "#EDF2E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#506847"
              }}>
                <TrophyIcon size={20} />
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#707877", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Your Learning Progress
                </span>
                <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "#22352E", fontFamily: "Manrope" }}>
                  {completedSigns.length} of {totalSignCount} signs mastered
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.25rem", fontSize: "0.875rem" }}>
              <div>
                <span style={{ color: "#707877" }}>Quiz Score: </span>
                <strong style={{ color: "#506847" }}>{quizScore} / {QUIZ_QUESTIONS.length} correct</strong>
              </div>

              {completedSigns.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <span style={{ color: "#707877" }}>Mastered: </span>
                  {completedSigns.slice(0, 5).map((id) => (
                    <span key={id} style={{
                      padding: "0.2rem 0.5rem",
                      backgroundColor: "#EDF2E9",
                      color: "#506847",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 700
                    }}>
                      {id}
                    </span>
                  ))}
                  {completedSigns.length > 5 && (
                    <span style={{ color: "#707877", fontSize: "0.75rem" }}>
                      +{completedSigns.length - 5} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: LEARN ISL (CURRICULUM EXPLORER) ────────────────── */}
        <section id="curriculum" className="isl-section" style={{ paddingTop: "1rem" }}>
          <div className="isl-section-header">
            <span className="isl-section-eyebrow">Curriculum Explorer</span>
            <h2 className="isl-section-title">Structured Indian Sign Language Learning</h2>
            <p className="isl-section-desc">
              Learn authentic signs by category. Each sign card displays English, Hindi script,
              and authentic hand gestures aligned with Indian Sign Language standards.
            </p>
          </div>

          {/* Controls: Search & Category Tabs */}
          <div className="isl-curriculum-controls">
            <div className="isl-search-wrap">
              <span className="isl-search-icon">
                <SearchIcon size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search signs in English or Hindi (e.g., Water, पानी, Teacher, A)..."
                className="isl-search-input"
              />
            </div>

            <div className="isl-category-tabs">
              {[
                { key: "everyday", label: "Everyday Words", count: EVERYDAY_WORDS.length },
                { key: "school", label: "School Life", count: SCHOOL_LIFE.length },
                { key: "alphabets", label: "Alphabets (A–Z)", count: ALPHABETS.length },
                { key: "numbers", label: "Numbers (0–9)", count: NUMBERS.length },
                { key: "places", label: "Public Places", count: PUBLIC_PLACES.length },
                { key: "safety", label: "Safety & Emergency", count: SAFETY_SIGNS.length },
                { key: "india", label: "Indian Context", count: INDIA_CONTEXT.length },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setActiveCategory(tab.key as ISLCategory);
                    setSearchQuery("");
                  }}
                  className={`isl-tab-btn ${activeCategory === tab.key ? "active" : ""}`}
                >
                  <span>{tab.label}</span>
                  <span className="isl-tab-count">{tab.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="isl-cards-grid">
            {currentItems.map((item) => (
              <article key={item.id} className="isl-sign-card">
                <div className="isl-sign-card-head">
                  <span className={`isl-badge ${
                    item.category === "everyday" ? "isl-badge-mint" :
                    item.category === "school" ? "isl-badge-peach" :
                    item.category === "safety" ? "isl-badge-pink" :
                    item.category === "india" ? "isl-badge-cream" :
                    "isl-badge-lavender"
                  }`}>
                    {item.category}
                  </span>

                  {item.isComingSoon ? (
                    <span className="isl-badge isl-badge-cream">Coming soon</span>
                  ) : (
                    <span style={{ fontSize: "0.75rem", color: "#707877", fontWeight: 600 }}>
                      ISLRTC Source
                    </span>
                  )}
                </div>

                <div className="isl-sign-visual-box">
                  <div className="isl-sign-visual-fallback">
                    <span className="isl-sign-visual-char">{item.id.slice(0, 2)}</span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#707877" }}>
                      ISL reference media unavailable
                    </span>
                  </div>
                </div>

                <div className="isl-sign-titles">
                  <h3 className="isl-sign-english">{item.label}</h3>
                  <span className="isl-sign-hindi">{item.hindiLabel}</span>
                </div>

                <p className="isl-sign-desc">{item.description}</p>

                <div className="isl-sign-card-actions">
                  <button
                    type="button"
                    onClick={() => setPracticeSign(item)}
                    className="isl-btn isl-btn-secondary isl-btn-sm"
                  >
                    <span>Watch sign</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => startCameraPracticeForSign(item)}
                    className="isl-btn isl-btn-primary isl-btn-sm"
                  >
                    <CameraIcon size={14} />
                    <span>Practice</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {currentItems.length === 0 && (
            <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#707877" }}>
              <p style={{ fontSize: "1.125rem", fontWeight: 600 }}>No signs found matching &quot;{searchQuery}&quot;</p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="isl-btn isl-btn-secondary isl-btn-sm"
                style={{ marginTop: "1rem" }}
              >
                Clear search
              </button>
            </div>
          )}

          <div className="isl-attribution-banner">
            <SparkleIcon size={20} />
            <div>
              <strong>Pedagogical Reference: </strong>
              Indian educational sign language guidelines are standardized through the
              Indian Sign Language Research and Training Centre (ISLRTC) and inclusive digital
              curriculum platforms such as NCERT, DIKSHA, and PM eVidya. Mosaic provides this
              child-friendly interactive companion to support classroom and home practice.
            </div>
          </div>
        </section>

        {/* ── SECTION 5: LIVE RECOGNITION STUDIO ─────────────────────────── */}
        <section id="live-recognition" className="isl-section">
          <div className="isl-section-header">
            <span className="isl-section-eyebrow">Real-Time Camera Feedback</span>
            <h2 className="isl-section-title">Live Indian Sign Language Recognition</h2>
            <p className="isl-section-desc">
              Show a hand gesture to the camera. Mosaic uses real-time hand landmark tracking
              to detect Indian Sign Language signs and build sentences.
            </p>
          </div>

          <SignLanguageTrainer
            targetSign={activeCameraTarget?.id}
            onSuccess={() => handlePracticeSuccess(activeCameraTarget?.id)}
            title={activeCameraTarget ? `Practice Sign: ${activeCameraTarget.label} (${activeCameraTarget.hindiLabel})` : "Live sign recognition"}
            subtitle={activeCameraTarget ? activeCameraTarget.description : "Form a gesture in front of your camera to receive real-time detection feedback."}
          />
        </section>

        {/* ── SECTION 6: SPEECH TO SIGN ─────────────────────────────────── */}
        <section id="speech-to-sign" className="isl-section">
          <div className="isl-section-header">
            <span className="isl-section-eyebrow">Two-Way Accessible Communication</span>
            <h2 className="isl-section-title">Speech to Indian Sign Language</h2>
            <p className="isl-section-desc">
              Speak into the microphone or type below. Mosaic suggests the corresponding Indian Sign
              Language sequence to bridge communication between hearing and deaf learners.
            </p>
          </div>

          <SignLanguageStt />
        </section>

        {/* ── SECTION 7: PRACTICE QUIZ ──────────────────────────────────── */}
        <section id="practice-quiz" className="isl-section" style={{ borderBottom: "none" }}>
          <div className="isl-section-header text-center">
            <span className="isl-section-eyebrow">Interactive Evaluation</span>
            <h2 className="isl-section-title">ISL Practice Quiz</h2>
            <p className="isl-section-desc">
              Test your knowledge of everyday Indian Sign Language signs with instant feedback.
            </p>
          </div>

          <div className="isl-quiz-box">
            <div className="isl-quiz-head">
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#506847" }}>
                Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <span className="isl-badge isl-badge-mint">
                Score: {quizScore}
              </span>
            </div>

            <h3 className="isl-quiz-question">{QUIZ_QUESTIONS[quizIndex].question}</h3>

            <div className="isl-quiz-options">
              {QUIZ_QUESTIONS[quizIndex].options.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === QUIZ_QUESTIONS[quizIndex].correctSign;
                let btnClass = "isl-quiz-opt-btn";
                if (selectedAnswer !== null) {
                  if (isCorrect) btnClass += " correct";
                  else if (isSelected) btnClass += " incorrect";
                }

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={selectedAnswer !== null}
                    onClick={() => handleAnswerSelect(option)}
                    className={btnClass}
                  >
                    <span>{option}</span>
                    {selectedAnswer !== null && isCorrect && <CheckIcon size={18} />}
                    {selectedAnswer !== null && isSelected && !isCorrect && <XIcon size={18} />}
                  </button>
                );
              })}
            </div>

            {showQuizExplanation && (
              <div className="isl-quiz-feedback">
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <LightbulbIcon size={20} />
                  <span style={{ fontSize: "0.875rem", color: "#22352E", fontWeight: 500 }}>
                    {QUIZ_QUESTIONS[quizIndex].hint}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={nextQuizQuestion}
                  className="isl-btn isl-btn-primary isl-btn-sm"
                >
                  <span>Next Question</span>
                  <ArrowRightIcon size={14} />
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ── PRACTICE MODAL (LEARN → SEE → PRACTICE → FEEDBACK) ──────────── */}
      {practiceSign && (
        <div className="isl-modal-backdrop" onClick={() => setPracticeSign(null)}>
          <div className="isl-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setPracticeSign(null)}
              className="isl-modal-close"
              aria-label="Close practice modal"
            >
              <XIcon size={18} />
            </button>

            <span className="isl-badge isl-badge-mint" style={{ marginBottom: "0.75rem" }}>
              {practiceSign.category}
            </span>

            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#22352E", fontFamily: "Manrope", margin: "0 0 0.25rem" }}>
              {practiceSign.label}
            </h2>
            <span style={{ fontSize: "1.125rem", fontWeight: 600, color: "#D8663F", display: "block", marginBottom: "1rem" }}>
              {practiceSign.hindiLabel}
            </span>

            <div className="isl-sign-visual-box" style={{ minHeight: "180px", marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F7F6F3", borderRadius: "16px", border: "1px solid #E5E2DC", overflow: "hidden" }}>
              {practiceSign.imageUrl && !imgErrorMap[practiceSign.id] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={practiceSign.imageUrl}
                  alt={practiceSign.label}
                  onError={() => setImgErrorMap((prev) => ({ ...prev, [practiceSign.id]: true }))}
                  style={{ width: "100%", height: "200px", objectFit: "contain" }}
                />
              ) : (
                <div style={{ padding: "1.5rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#EDF2E9", display: "flex", alignItems: "center", justifyContent: "center", color: "#506847" }}>
                    <HandIcon size={24} />
                  </div>
                  <span style={{ fontWeight: 800, color: "#22352E", fontSize: "1rem", fontFamily: "Manrope" }}>
                    {practiceSign.label} ({practiceSign.hindiLabel})
                  </span>
                  <span style={{ fontSize: "0.8125rem", color: "#707877", backgroundColor: "#FFFFFF", padding: "0.25rem 0.75rem", borderRadius: "999px", border: "1px solid #E5E2DC" }}>
                    ISL reference media unavailable
                  </span>
                </div>
              )}
            </div>

            <div style={{ backgroundColor: "#FCFCFB", border: "1px solid #E5E2DC", borderRadius: "12px", padding: "1rem", marginBottom: "1.25rem" }}>
              <strong style={{ display: "block", fontSize: "0.8125rem", color: "#506847", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.375rem" }}>
                Step-by-step gesture guidance
              </strong>
              <p style={{ margin: 0, fontSize: "0.9375rem", color: "#22352E", lineHeight: "1.5" }}>
                {practiceSign.description}
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => {
                  startCameraPracticeForSign(practiceSign);
                }}
                className="isl-btn isl-btn-primary"
                style={{ flex: 1 }}
              >
                <CameraIcon size={16} />
                <span>Practice with camera</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handlePracticeSuccess(practiceSign.id);
                  setPracticeSign(null);
                }}
                className="isl-btn isl-btn-secondary"
              >
                <CheckIcon size={16} />
                <span>Mark done</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
