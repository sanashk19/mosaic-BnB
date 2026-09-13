# Mosaic — One Lesson. Every Learner.

> **Team Runtime Rebels**

Mosaic is an accessible learning platform built around one simple idea:

**One lesson should not mean one learning experience.**

Traditional digital learning often presents the same content and interface to every learner, even when learners need different forms of support. Mosaic takes a single lesson and adapts the way it is presented based on learner support preferences, including **Reading Support, Visual Support, and Hearing Support**.

Mosaic also includes an **Indian Sign Language (ISL) learning and recognition studio**, teacher and family experiences, progress tracking, and a practical life-skills curriculum.

---

## The Problem

Digital learning platforms often assume that every learner can interact with the same content in the same way.

A learner may need:

- clearer and more structured text
- simplified language
- audio-first guidance
- richer descriptions
- captions and stronger visual cues
- Indian Sign Language practice

Creating completely separate lessons or platforms for every learner is difficult to scale.

### Mosaic's approach

Instead of creating different curricula for different learners, Mosaic starts with **one lesson** and changes the way that lesson is experienced.

> **Same learning objective. Different learning experience.**

---

# Key Features

## 1. Adaptive Learning

Mosaic provides multiple ways to experience the same lesson:

| Mode | What changes |
|---|---|
| **Standard** | Original lesson experience |
| **Reading Support** | Simplified language, chunked content, clearer structure and spacing |
| **Visual Support** | Audio-first guidance and descriptive support |
| **Hearing Support** | Captions, visual cues and highlighted keywords |

The adaptation is handled by Mosaic's **Adaptive Learning Engine**, a deterministic rule-based transformation system.

The engine changes the presentation and structure of the content while preserving the underlying learning objective.

### Adaptation flow

```text
Learner Support Preference
          ↓
    Adaptive Engine
          ↓
   Lesson Transformation
          ↓
Personalized Learning Experience
```
## 2. Indian Sign Language Studio

Mosaic includes an interactive Indian Sign Language learning and recognition studio.

Features include:

Everyday and educational ISL categories
Alphabet practice
Number practice
Live camera-based sign recognition
Speech-to-sign interaction
Interactive ISL practice quiz
Prediction confidence
Target-sign verification

The current recognition model supports 51 ISL classes.

# ISL Recognition Pipeline

The live recognition pipeline works as follows:
```text
Browser Camera
      ↓
MediaPipe Hands
      ↓
21 Hand Landmarks × 3 Coordinates
      ↓
Normalized Feature Vector
      ↓
30-Frame Rolling Sequence
      ↓
Next.js API
      ↓
FastAPI Backend
      ↓
Keras LSTM Model
      ↓
51-Class Prediction
      ↓
Confidence + Target Verification
      ↓
Mosaic UI
```

# Model Architecture
```text
LSTM — 64 units
       ↓
LSTM — 128 units
       ↓
LSTM — 64 units
       ↓
Dense — 64
       ↓
Dense — 32
       ↓
Dense — 51 Softmax
```
Input shape: (30, 126)
Output: 51 classes
Trainable parameters: approximately 205,043

The 126 input features represent:
```text
2 hands × 21 landmarks × 3 coordinates
```

## 3. Classroom Support

Mosaic connects learners and educators within the same platform.

Teachers can:
```text
manage classroom access
view learner support profiles
open or lock lessons for a class
use simple student entry codes
monitor learner progress
```
This allows different learners to receive different forms of support without requiring completely separate curricula.

## 4. Learner Support
Mosaic is designed around support preferences, not diagnosis.
Learners can use experiences such as:
```text
Reading Support
Visual Support
Hearing Support
```
Mosaic does not diagnose dyslexia or other disabilities.
The platform focuses on adapting educational content and interaction patterns to better support learners.

## 5. Practical Life-Skills Curriculum

Mosaic currently contains:
31 lessons across 7 tracks

The curriculum focuses on practical digital and everyday independence skills, including areas such as:
```text
Digital safety
Health
Transport
Communication
Public services
Digital banking and ATM safety
Home and everyday independence
User Roles
Student
```

Students can:
```text
access lessons
use accessibility support modes
practice Indian Sign Language
complete interactive activities
track learning progress
Teacher
```
Teachers can:
```text
manage classroom access
view learner support profiles
open and close lessons
manage student entry codes
monitor progress
Parent
```
Parents have access to family-oriented learning guidance and learner information.

Researcher
Researchers can access aggregated cohort information and exportable data.

# Technology Stack

Frontend
```text
Next.js 16
React 19
TypeScript
Next.js App Router
Turbopack
Vanilla CSS
```
Accessibility & Interaction
```text
Web Speech API
Speech Synthesis
Speech Recognition
Adaptive content transformation
Caption-based interaction
Audio-first interaction patterns
```
Computer Vision
```text
MediaPipe Hands
Browser-based camera processing
3D hand landmark extraction
```
ISL Machine Learning
```text
Python
FastAPI
Uvicorn
TensorFlow
Keras
LSTM neural network
```
Authentication
```text
Cookie-based sessions
```
Role-based access
```text
Student
Teacher
Parent
Researcher
```
Storage
```text
Atomic filesystem JSON store
Persistent deployment volume support
DATA_DIR based storage configuration
```
# System Architecture
```text
                           MOSAIC
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
       Adaptive Lessons                ISL Studio
              │                             │
              ▼                             ▼
    Adaptive Learning Engine         MediaPipe Hands
        Rule-Based Engine                   │
                                            ▼
                                  Hand Landmark Features
                                            │
                                            ▼
                                    30-Frame Sequence
                                            │
                                            ▼
                                       FastAPI
                                            │
                                            ▼
                                      Keras LSTM
                                            │
                                            ▼
                                   51 ISL Classes
```
# Application Structure
```text
mosaic-BnB/
│
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── lesson/
│   │   ├── login/
│   │   ├── program/
│   │   └── sign-language/
│   │
│   ├── components/
│   │   ├── adaptive-lesson-view.tsx
│   │   ├── adaptive-lesson-studio.tsx
│   │   ├── homepage-adaptation-demo.tsx
│   │   └── ...
│   │
│   ├── lib/
│   │   ├── adaptation/
│   │   │   ├── adaptation-engine.ts
│   │   │   ├── adaptation-rules.ts
│   │   │   └── adaptation-transformers.ts
│   │   │
│   │   └── server/
│   │
│   └── data/
│       └── program.ts
│
├── isl-backend/
│   ├── app.py
│   ├── isl_modelv3.h5
│   ├── class_names.npy
│   ├── requirements.txt
│   └── ...
│
├── public/
├── package.json
└── README.md
```
# Running Locally
Prerequisites
Install:
```text
Node.js
npm
Python 3.10+
Git
```
1. Clone the repository
```text
git clone https://github.com/sanashk19/mosaic-BnB.git
cd mosaic-BnB
```
Replace the repository URL above with the final repository URL used by the team if it differs.

2. Install frontend dependencies
```text
npm install
3. Configure environment variables
```
Create a .env.local file using .env.example as the reference.
Example:
```text
SESSION_SECRET=your-secure-session-secret
UQUVLI_SESSION_SECRET=your-secure-session-secret

ISL_BACKEND_URL=http://127.0.0.1:8000
ISL_API_URL=http://127.0.0.1:8000

DATA_DIR=./data
UQUVLI_DB_PATH=./data/uquvli-db.json
```
Do not commit secrets or private credentials to GitHub.

## 4. Start the ISL backend

From the project root:
```text
cd isl-backend
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000
```
The backend should then be available at:
```text
http://127.0.0.1:8000
```
Test the backend using:
```text
http://127.0.0.1:8000/health
```
A healthy deployment should report that the model is loaded.

## 5. Start Mosaic
Open another terminal and return to the project root:
```text
cd ..
npm run dev
```
Then open:
```text
http://localhost:3000
Production Deployment
```
Mosaic is deployed as two services:
```text
Railway
│
├── Mosaic Web
│   └── Next.js Application
│
└── Mosaic ISL Backend
    └── FastAPI + TensorFlow/Keras
```

The web application communicates with the ISL backend using environment variables:
```text
ISL_BACKEND_URL=https://your-fastapi-service.up.railway.app
ISL_API_URL=https://your-fastapi-service.up.railway.app
```
The web application uses a persistent Railway volume for application data.

Example:
```text
DATA_DIR=/app/data
```
The volume is mounted at:
```text
/app/data
```
# Live Demo
Mosaic Web Application
```text
https://mosaic-bnb-production.up.railway.app
```
The ISL backend is deployed separately and is accessed by the Mosaic application through its configured environment variables.

# Demo Flow
A typical product demonstration follows this path:
```text
Homepage
    ↓
Program
    ↓
Open a lesson
    ↓
Standard Mode
    ↓
Reading Support
    ↓
Visual Support
    ↓
Hearing Support
    ↓
Indian Sign Language Studio
    ↓
Live ISL Recognition
    ↓
Teacher Dashboard
    ↓
Curriculum
```
# Design Philosophy
Mosaic is built around three principles.
One Lesson, Multiple Experiences
The learning objective should not need to be rewritten for every learner.
Accessibility as Part of the Product
Practical Independence

# Responsible ML Usage
Mosaic intentionally distinguishes between machine-learning functionality and rule-based functionality.

Machine Learning
The ISL recognition pipeline uses:
```text
MediaPipe hand landmark extraction
A Keras LSTM neural network
51 trained ISL gesture classes
Adaptive Learning
```
The current Adaptive Learning Engine is deterministic and rule-based.
It transforms lesson presentation based on support preferences.

It does not:
diagnose disabilities
diagnose dyslexia
claim medical outcomes

This keeps the adaptation predictable, fast and reproducible.

# Current Scope & Limitations

Mosaic is a hackathon project and the current implementation has defined boundaries.

ISL Recognition
```text
The current model recognizes 51 trained classes rather than unrestricted continuous ISL conversation.

Recognized signs are handled as structured tokens rather than full continuous sentence translation.
```
Adaptive Engine
```text
The current adaptive engine is rule-based rather than generative.
```
Storage
```text
The current implementation uses filesystem-based JSON persistence with deployment volume support rather than a managed database such as MongoDB or Supabase.
```
These limitations are documented intentionally so that the project reflects the actual implementation.

# Future Scope

Future improvements could include:
```text
expanding the ISL vocabulary
improving continuous gesture recognition
richer bilingual learning experiences
more advanced adaptive transformations
stronger learner personalization
migration to a managed database
richer teacher analytics
additional accessibility preferences
broader curriculum coverage
```
# Team Runtime Rebels
Mosaic was built by Team Runtime Rebels for Bit N Build '26.

Our goal is simple:
```text
Accessibility should not require a different platform for every learner.
```
Mosaic brings different learning experiences together around the same lesson.

# One lesson. Every learner.

# License
```text
This project was developed as a hackathon project by Team Runtime Rebels.
Third-party libraries, frameworks, models and assets remain subject to their respective licenses.
```
