import type {
  LessonQuizQuestion,
  LessonScenario,
  ProgramLesson,
} from "@/data/program";
import type {
  AccessibilitySupportType,
  AdaptedTrainerGuidance,
} from "@/lib/adaptation/adaptation-types";

/**
 * Generic content transformations for any lesson
 */
export function simplifyVocabulary(text: string): string {
  if (!text) return text;
  return text
    .replace(/utilize|employ/gi, "use")
    .replace(/communicate with strangers/gi, "chat with strangers")
    .replace(/personal information|identifiable credentials/gi, "private details")
    .replace(/construct complex multi-character passwords/gi, "use strong passwords")
    .replace(/anomalous prompts|suspicious message/gi, "strange messages")
    .replace(/subsequently|afterwards/gi, "then")
    .replace(/facilitator|instructor/gi, "teacher or adult")
    .replace(/establish an understanding/gi, "remember")
    .replace(/protocols|procedures/gi, "rules");
}

export function splitIntoActionSteps(text: string): string[] {
  if (!text) return [];
  const sentences = text
    .split(/[.;]\s+/)
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter((s) => s.length > 0);
  return sentences.map((s, i) => `${i + 1}. ${simplifyVocabulary(s)}.`);
}

export function extractImportantWarning(text: string): string | undefined {
  if (!text) return undefined;
  const match = text.match(/(never [^.;]+|do not [^.;]+|ask an adult [^.;]+)/i);
  return match ? match[0].trim() : undefined;
}

/**
 * Flagship lesson deep adaptation dictionary for 'messenger-message'
 */
const FLAGSHIP_MESSENGER_ADAPTATION: Record<
  Exclude<AccessibilitySupportType, "none">,
  {
    title: string;
    summary: string;
    intro: string;
    rules: string[];
    importantWarning?: string;
    imageDescription: string;
    scenarios: LessonScenario[];
    quiz: LessonQuizQuestion[];
    trainerGuidance?: Record<string, AdaptedTrainerGuidance>;
  }
> = {
  reading: {
    title: "Staying Safe Online (Reading Support)",
    summary: "1. Choose who to talk to. 2. Write politely. 3. Never share private details.",
    intro: "Learn how to send safe messages. Step 1: Open chat. Step 2: Read message. Step 3: Reply safely.",
    importantWarning: "Safety Warning: Never share passwords, home address, or phone numbers with people online.",
    rules: [
      "Open your messaging app.",
      "Check the sender's name at the top.",
      "Never chat with strangers online.",
      "If unsure about any message, ask a trusted adult.",
    ],
    imageDescription:
      "A simple diagram showing a safe chat screen: contact name at top, clear message bubbles in center, and reply box at bottom.",
    scenarios: [
      {
        title: "Mom asks: 'Where are you?'",
        text: "You receive a message from Mom: 'Where are you?'",
        options: [
          "1. Reply politely: 'Hi Mom! I am at school, all good.'",
          "2. Reply rudely: 'Leave me alone.'",
          "3. Do not answer at all.",
        ],
        correctIndex: 0,
        feedback: "Great choice! A polite reply lets your family know you are safe.",
        support: "Always answer your family politely.",
      },
      {
        title: "A stranger asks for your address",
        text: "A person you do not know writes: 'Send your home address for a free gift.'",
        options: [
          "1. Do not reply. Show the message to an adult immediately.",
          "2. Reply right away to get the gift.",
          "3. Send your address to see what happens.",
        ],
        correctIndex: 0,
        feedback: "Correct! Never share home addresses or personal information with strangers.",
        support: "Keep your address and personal information completely private.",
      },
    ],
    quiz: [
      {
        question: "What is a messenger?",
        options: [
          "An app for sending messages.",
          "A video game.",
          "A math calculator.",
        ],
        correctIndex: 0,
      },
      {
        question: "How should you start a message to mom?",
        options: [
          "Without any greeting.",
          "Politely: 'Hello Mom!'",
          "In ALL CAPS like shouting.",
        ],
        correctIndex: 1,
      },
      {
        question: "What should you do if a stranger asks for your photo?",
        options: [
          "Send it right away.",
          "Ask why they want it.",
          "Do not send it. Tell an adult.",
        ],
        correctIndex: 2,
      },
    ],
    trainerGuidance: {
      "messenger-flow": {
        audioOverview: "Interactive chat exercise. Read each short message and tap the polite, safe answer.",
        simplifiedSteps: [
          "Step 1: Read the incoming message.",
          "Step 2: Choose the polite, safe reply.",
          "Step 3: Advance to the next chat.",
        ],
      },
    },
  },

  visual: {
    title: "Staying Safe Online (Audio-First)",
    summary: "Spoken audio guidance leads through every messaging step, layout area, and safety decision.",
    intro:
      "This lesson uses spoken audio guidance. The screen layout features the chat dialog in the center, contact header at the top, and your reply options at the bottom. Press the Replay Audio button anytime to listen again.",
    rules: [
      "Rule 1: Open chat. Spoken instructions will guide each action on the screen.",
      "Rule 2: Listen to who is contacting you before responding.",
      "Rule 3: Safety rule: never share phone numbers, passwords, or home address.",
      "Rule 4: Press the Replay Audio button anytime to hear this screen again.",
    ],
    imageDescription:
      "Visual layout description: A smartphone messaging interface. The top bar shows contact name 'Mom'. Incoming messages appear in white speech bubbles on the left. Outgoing replies appear in blue bubbles on the right. A text entry field and blue send button are located at the bottom.",
    scenarios: [
      {
        title: "Incoming message from Mom: 'Where are you?'",
        text: "Spoken situation: An audio message notification sounded. Mom sent: 'Where are you?' Listen to the three response options below and pick the safe, polite answer.",
        options: [
          "Option 1: Reply politely: 'Hi Mom! I am at school, all good.'",
          "Option 2: Reply rudely: 'Leave me alone.'",
          "Option 3: Do not answer at all.",
        ],
        correctIndex: 0,
        feedback: "Spoken feedback: Correct! A polite reply lets your family know you are safe.",
        support: "Spoken reminder: Mom should always receive a prompt and polite answer.",
      },
      {
        title: "Incoming message from an unknown sender",
        text: "Spoken situation: A message arrived from an unfamiliar user: 'Send me your address for a gift.' Listen to the options below.",
        options: [
          "Option 1: Do not reply. Show the message to an adult immediately.",
          "Option 2: Reply immediately and make friends.",
          "Option 3: Give your home address.",
        ],
        correctIndex: 0,
        feedback: "Spoken feedback: Correct! Never give private information to unknown senders online.",
        support: "Spoken reminder: Never disclose personal data to strangers.",
      },
    ],
    quiz: [
      {
        question: "Spoken Question 1: What is a messenger?",
        options: [
          "Option 1: An application for sending text messages.",
          "Option 2: A video game.",
          "Option 3: A calculator.",
        ],
        correctIndex: 0,
      },
      {
        question: "Spoken Question 2: How should you begin a message to your mother?",
        options: [
          "Option 1: Without greeting.",
          "Option 2: Politely, saying 'Hello Mom!'",
          "Option 3: In all capital letters shouting.",
        ],
        correctIndex: 1,
      },
      {
        question: "Spoken Question 3: If a stranger asks for a personal photo online:",
        options: [
          "Option 1: Send it immediately.",
          "Option 2: Inquire why they need it.",
          "Option 3: Refuse to send it and alert an adult.",
        ],
        correctIndex: 2,
      },
    ],
    trainerGuidance: {
      "messenger-flow": {
        audioOverview:
          "Audio-guided messaging trainer. A friend, a teacher, and an unknown user will message you. The system will speak each incoming message and each reply choice aloud.",
        imageDescription:
          "A chat window with contact avatar at top, chat history in center, and 3 high-contrast reply buttons at bottom.",
      },
    },
  },

  hearing: {
    title: "Staying Safe Online (Captioned & Visual Cues)",
    summary: "All instructions, dialogue, and alerts feature visible real-time captions and high-contrast cues.",
    intro:
      "Captioned learning mode active. All audio clips, mascot speech, and feedback are transcribed in visible caption boxes with distinct visual status badges.",
    rules: [
      "[CC] Step 1: Open the messaging application.",
      "[CC] Step 2: Read the contact name displayed in the top bar.",
      "[ALERT] Safety Rule: Never disclose passwords, personal data, or your home address.",
      "[CHECK] Step 4: Verify the green checkmark before sending your reply.",
    ],
    imageDescription:
      "Captioned visual layout: Contact name 'Mom' at top, incoming text in white bubble, reply choices outlined in high-contrast borders.",
    scenarios: [
      {
        title: "[CC Notification: Incoming Message Chime] Mom writes: 'Where are you?'",
        text: "[CC Transcribed Audio]: Mom sent a message asking 'Where are you?' Review the visual choices below:",
        options: [
          "[SAFE] 1. Answer politely: 'Hi Mom! I am at school, all good.'",
          "[UNSAFE] 2. Write: 'Leave me alone.'",
          "[UNSAFE] 3. Do not answer.",
        ],
        correctIndex: 0,
        feedback: "[✓ VISUAL CONFIRMATION]: Polite response verified. Safe communication established.",
        support: "[ℹ️ VISUAL HINT]: Family messages require a timely, polite written reply.",
      },
      {
        title: "[⚠️ VISUAL ALERT: Unknown Sender] Message from an unfamiliar user",
        text: "[CC Transcribed Audio]: Incoming message: 'Send me your home address for a gift.'",
        options: [
          "[SAFE] 1. Do not reply. Show the message to an adult immediately.",
          "[UNSAFE] 2. Reply immediately and make friends.",
          "[UNSAFE] 3. Give your home address.",
        ],
        correctIndex: 0,
        feedback: "[✓ VISUAL CONFIRMATION]: Safe choice. We do not respond to unknown users online.",
        support: "[⚠️ VISUAL WARNING]: Never transmit personal address or contact numbers.",
      },
    ],
    quiz: [
      {
        question: "[CC Question 1] What is the definition of a messenger?",
        options: [
          "[A] A messaging application for text communication.",
          "[B] A digital video game.",
          "[C] A math calculation tool.",
        ],
        correctIndex: 0,
      },
      {
        question: "[CC Question 2] How should you begin a polite message to your mother?",
        options: [
          "[A] Without greeting.",
          "[B] With a polite greeting: 'Hello Mom!'",
          "[C] In capital letters like shouting.",
        ],
        correctIndex: 1,
      },
      {
        question: "[CC Question 3] If an unknown person requests your photo online:",
        options: [
          "[A] Send the photograph immediately.",
          "[B] Ask why it is required.",
          "[C] Do not send it; notify a trusted adult immediately.",
        ],
        correctIndex: 2,
      },
    ],
    trainerGuidance: {
      "messenger-flow": {
        audioOverview: "Captioned messaging simulation. All incoming messages appear in visible speech boxes.",
        visualCaptions: [
          "Incoming message from Bahrom: 'Hello! Shall we go to the park on Saturday?'",
          "Incoming message from Teacher: 'Bring your sports uniform tomorrow.'",
          "Incoming message from Stranger: 'Send me your address for a gift.'",
        ],
        highlightKeyword: "Never give address",
      },
    },
  },
};

/**
 * Returns deep adapted content for a lesson given the accessibility support profile.
 */
export function getAdaptedContent(
  lesson: ProgramLesson,
  supportType: AccessibilitySupportType,
): Partial<ProgramLesson> & {
  imageDescription?: string;
  importantWarning?: string;
  trainerGuidance?: Record<string, AdaptedTrainerGuidance>;
} {
  if (supportType === "none") {
    return {};
  }

  // 1. Check flagship adaptation for 'messenger-message'
  if (lesson.slug === "messenger-message" && supportType in FLAGSHIP_MESSENGER_ADAPTATION) {
    const flagship = FLAGSHIP_MESSENGER_ADAPTATION[supportType];
    return {
      title: flagship.title,
      summary: flagship.summary,
      intro: flagship.intro,
      rules: flagship.rules,
      importantWarning: flagship.importantWarning,
      imageDescription: flagship.imageDescription,
      scenarios: flagship.scenarios,
      quiz: flagship.quiz,
      trainerGuidance: flagship.trainerGuidance,
    };
  }

  // 2. Programmatic fallback adaptation for any lesson in the curriculum
  if (supportType === "reading") {
    return {
      title: `${lesson.title} (Reading Support)`,
      summary: simplifyVocabulary(lesson.summary),
      intro: simplifyVocabulary(lesson.intro),
      rules: lesson.rules.map((r, i) => `${i + 1}. ${simplifyVocabulary(r)}`),
      importantWarning: extractImportantWarning(lesson.rules.join(". ")),
      scenarios: lesson.scenarios.map((sc) => ({
        ...sc,
        title: simplifyVocabulary(sc.title),
        text: simplifyVocabulary(sc.text),
        options: sc.options.map((opt, i) => `${i + 1}. ${simplifyVocabulary(opt)}`),
        feedback: simplifyVocabulary(sc.feedback),
        support: simplifyVocabulary(sc.support),
      })),
      quiz: lesson.quiz.map((q) => ({
        ...q,
        question: simplifyVocabulary(q.question),
        options: q.options.map(simplifyVocabulary),
      })),
    };
  }

  if (supportType === "visual") {
    return {
      title: `${lesson.title} (Audio-First)`,
      summary: `Audio-guided lesson: ${lesson.summary}`,
      intro: `Audio guide is active for this lesson. ${lesson.intro}`,
      imageDescription: `Visual description of lesson ${lesson.title}: A structured digital learning environment with step instructions at the top and interactive options below.`,
      rules: lesson.rules.map((r, i) => `Rule ${i + 1}: ${r}.`),
      scenarios: lesson.scenarios.map((sc, i) => ({
        ...sc,
        title: `Spoken Situation ${i + 1}: ${sc.title}`,
        text: `Audio narrative: ${sc.text}`,
        options: sc.options.map((opt, optIndex) => `Option ${optIndex + 1}: ${opt}`),
        feedback: `Spoken feedback: ${sc.feedback}`,
        support: `Spoken tip: ${sc.support}`,
      })),
      quiz: lesson.quiz.map((q, i) => ({
        ...q,
        question: `Question ${i + 1}: ${q.question}`,
        options: q.options.map((opt, optIndex) => `Option ${optIndex + 1}: ${opt}`),
      })),
    };
  }

  if (supportType === "hearing") {
    return {
      title: `${lesson.title} (Captioned & Visual Cues)`,
      summary: `Captioned version: ${lesson.summary}`,
      intro: `[CC] Captioned lesson active. All audio is transcribed into text boxes with visual confirmation indicators.`,
      rules: lesson.rules.map((r, i) => `[CC Step ${i + 1}] ${r}`),
      scenarios: lesson.scenarios.map((sc) => ({
        ...sc,
        title: `[CC Scenario] ${sc.title}`,
        text: `[CC Audio]: ${sc.text}`,
        options: sc.options.map((opt, i) => `[Choice ${i + 1}] ${opt}`),
        feedback: `[✓ VISUAL CONFIRMATION] ${sc.feedback}`,
        support: `[ℹ️ VISUAL HINT] ${sc.support}`,
      })),
      quiz: lesson.quiz.map((q) => ({
        ...q,
        question: `[CC Question] ${q.question}`,
        options: q.options.map((opt, i) => `[${i + 1}] ${opt}`),
      })),
    };
  }

  return {};
}
