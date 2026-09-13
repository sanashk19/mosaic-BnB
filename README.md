# MOSAIC — One lesson. Every learner.

Mosaic is an accessible, adaptive digital life-skills learning platform designed to personalize educational content for diverse learner profiles.

Instead of writing separate textbooks or building fragmented tools, Mosaic starts with **one curriculum lesson** and dynamically adapts the experience—providing **Reading Support** (plain language, chunked steps, dyslexia spacing), **Visual Support** (audio-first guidance, spoken screen descriptions), and **Hearing Support** (real-time captions, highlighted visual cues).

Mosaic also includes a comprehensive **Indian Sign Language (ISL) Studio** powered by real-time computer vision (MediaPipe) and a local 51-class LSTM neural network for gesture recognition and interactive practice.

---

## Key Capabilities

- **Adaptive Learning Engine**: Instant, deterministic real-time adaptation between Standard, Reading, Visual, and Hearing support profiles.
- **Indian Sign Language (ISL) Studio**:
  - Live camera recognition powered by MediaPipe Hands and a trained Keras LSTM model (51 ISL classes: alphabets, numbers, and everyday signs like *Namaste*, *Water*, *Help*, *Thank You*).
  - Two-way Speech-to-Sign bridge.
  - Interactive ISL Practice Quiz.
- **31 Life-Skills Lessons Across 7 Tracks**: Digital Banking & ATM Safety, Healthcare, Home Economics, Mobility & Transport, Communication, Online Safety, and Public Services.
- **Role-Based Portals**:
  - **Student**: Focused, single-action, calm learning interface with visual 4-digit code entry.
  - **Teacher**: Classroom management, student roster with individual support profiles, and live lesson unlocking.
  - **Parent**: Home rhythm guidance (10–15 min exercises) and developmental questionnaire tracking.
  - **Researcher**: Aggregated cohort progress analytics and exportable research metrics.

---

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Vanilla CSS design system.
- **Machine Learning / ISL Backend**: Python 3.10+, FastAPI, Uvicorn, TensorFlow / Keras (Sequential LSTM, 205k parameters).
- **Vision**: MediaPipe Hands WebAssembly client-side landmark extraction (21 3D points per hand).
- **Speech**: Web Speech API (`SpeechSynthesis` / `SpeechRecognition`).
- **Data & Auth**: Local atomic JSON store with volume-mount support and encrypted cookie sessions.

---

## Getting Started

### 1. Run the Next.js Web App
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. (Optional) Run the ISL Python Backend
```bash
cd isl-backend
pip install -r requirements.txt
python -m uvicorn app:app --host 127.0.0.1 --port 8000
```

---

## License & Attribution

Built for inclusive, accessible digital education. ISL curriculum structures are aligned with NCERT and ISLRTC pedagogical standards.
