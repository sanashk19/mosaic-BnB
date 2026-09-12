// Mosaic Structured Curriculum: 30 practical life-skills and digital capability lessons
// grouped across 6 digital life scenarios plus diagnostic foundations.

export type LessonScenario = {
  title: string;
  text: string;
  options: string[];
  correctIndex: number;
  feedback: string;
  support: string;
};

export type LessonQuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

export type TelegramTrainer = {
  type: "telegram";
  contact: { name: string; avatar?: string; subtitle?: string };
  history?: Array<{ from: "me" | "them"; text: string; time?: string }>;
  prompt: { text: string; time?: string };
  options: Array<{
    text: string;
    correct: boolean;
    reply?: { text: string; time?: string };
    feedback: string;
  }>;
  otherChats?: Array<{ name: string; avatar?: string; lastMessage: string; time: string; unread?: number }>;
};

export type WhatsappTrainer = {
  type: "whatsapp";
  contact: { name: string; avatar?: string; subtitle?: string };
  history?: Array<{ from: "me" | "them"; text: string; time?: string }>;
  prompt: { text: string; time?: string };
  options: Array<{
    text: string;
    correct: boolean;
    reply?: { text: string; time?: string };
    feedback: string;
  }>;
  otherChats?: Array<{ name: string; avatar?: string; lastMessage: string; time: string; unread?: number }>;
};

export type GmailTrainer = {
  type: "gmail";
  task: string;
  recipientOptions: Array<{ email: string; name: string; correct: boolean }>;
  subjectSuggestion: string;
  bodyOptions: Array<{ text: string; correct: boolean; feedback: string }>;
  inbox?: Array<{ from: string; subject: string; preview: string; time: string; unread?: boolean }>;
};

export type MailruTrainer = {
  type: "mailru";
  task: string;
  recipientOptions: Array<{ email: string; name: string; correct: boolean }>;
  subjectSuggestion: string;
  bodyOptions: Array<{ text: string; correct: boolean; feedback: string }>;
  inbox?: Array<{ from: string; subject: string; preview: string; time: string; unread?: boolean }>;
};

export type UzumTrainer = {
  type: "uzum";
  task: string;
  searchQuery: string;
  products: Array<{
    name: string;
    price: string;
    image?: string;
    correct: boolean;
    oldPrice?: string;
    rating?: number;
    reviewCount?: number;
    seller?: string;
    delivery?: string;
    description?: string;
  }>;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type YandexMarketTrainer = {
  type: "yandexmarket";
  task: string;
  searchQuery: string;
  products: Array<{
    name: string;
    price: string;
    image?: string;
    correct: boolean;
    oldPrice?: string;
    rating?: number;
    reviewCount?: number;
    seller?: string;
    delivery?: string;
    description?: string;
    cashback?: string;
  }>;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type MyGovTrainer = {
  type: "mygov";
  task: string;
  services: Array<{ icon: string; title: string; subtitle: string; correct: boolean }>;
  confirmStep: {
    title: string;
    fields: Array<{ label: string; value: string }>;
    timeOptions: string[];
  };
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type PhoneTrainer = {
  type: "phone";
  task: string;
  correctNumber: string;
  description: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type MorningQuestTrainer = {
  type: "morning-quest";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type OutfitTrainer = {
  type: "outfit";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type HairCareTrainer = {
  type: "hair-care";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type SkinTypeTrainer = {
  type: "skin-type";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type SunCareTrainer = {
  type: "sun-care";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type LabelReaderTrainer = {
  type: "label-reader";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type StepSequenceTrainer = {
  type: "step-sequence";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type VolumeSafeTrainer = {
  type: "volume-safe";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type ThermometerTrainer = {
  type: "thermometer";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type SeasonalClothingTrainer = {
  type: "seasonal-clothing";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type CareLabelTrainer = {
  type: "care-label";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type WashingMachineTrainer = {
  type: "washing-machine";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type DetergentDosageTrainer = {
  type: "detergent-dosage";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type MenuBuilderTrainer = {
  type: "menu-builder";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type RecipeReaderTrainer = {
  type: "recipe-reader";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type RecipeTimerTrainer = {
  type: "recipe-timer";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type TableSettingTrainer = {
  type: "table-setting";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type FamilyIncomeTrainer = {
  type: "family-income";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type FamilyExpensesTrainer = {
  type: "family-expenses";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type TransportTypesTrainer = {
  type: "transport-types";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type ScheduleBoardTrainer = {
  type: "schedule-board";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type TicketPurchaseTrainer = {
  type: "ticket-purchase";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type PackageTrackingTrainer = {
  type: "package-tracking";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type PhoneCallFlowTrainer = {
  type: "phone-call-flow";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type MessengerFlowTrainer = {
  type: "messenger-flow";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type SafetyEtiquetteTrainer = {
  type: "safety-etiquette";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type MyGovPortalTrainer = {
  type: "mygov-portal";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type AtmTrainer = {
  type: "atm";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type CreditContractTrainer = {
  type: "credit-contract";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type FinalQuestTrainer = {
  type: "final-quest";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type WashingMachineTrainerV2 = {
  type: "washing-machine-v2";
  task: string;
  feedbackCorrect: string;
  feedbackWrong: string;
};

export type LessonTrainer =
  | TelegramTrainer
  | WhatsappTrainer
  | GmailTrainer
  | MailruTrainer
  | UzumTrainer
  | YandexMarketTrainer
  | MyGovTrainer
  | PhoneTrainer
  | MorningQuestTrainer
  | OutfitTrainer
  | HairCareTrainer
  | SkinTypeTrainer
  | SunCareTrainer
  | LabelReaderTrainer
  | StepSequenceTrainer
  | VolumeSafeTrainer
  | ThermometerTrainer
  | SeasonalClothingTrainer
  | CareLabelTrainer
  | WashingMachineTrainer
  | DetergentDosageTrainer
  | MenuBuilderTrainer
  | RecipeReaderTrainer
  | RecipeTimerTrainer
  | TableSettingTrainer
  | FamilyIncomeTrainer
  | FamilyExpensesTrainer
  | TransportTypesTrainer
  | ScheduleBoardTrainer
  | TicketPurchaseTrainer
  | PackageTrackingTrainer
  | PhoneCallFlowTrainer
  | MessengerFlowTrainer
  | SafetyEtiquetteTrainer
  | MyGovPortalTrainer
  | AtmTrainer
  | CreditContractTrainer
  | FinalQuestTrainer
  | WashingMachineTrainerV2;

export type LessonStageBlock = {
  duration: string;
  title: string;
  teacherSays?: string;
  teacherDoes: string[];
  studentActivity?: string;
  hint?: string;
};

export type LessonMethodology = {
  objective: string;
  tasks: string[];
  materials: string[];
  stages: LessonStageBlock[];
  differentiation?: string;
  homework?: string;
  safetyNote?: string;
};

import type { LessonScreens } from "@/lib/lesson-screens-types";
export type { LessonScreens } from "@/lib/lesson-screens-types";

type LessonBase = {
  slug: string;
  title: string;
  duration: string;
  summary: string;
  intro: string;
  image: string;
  imageAlt: string;
  imageCredit?: string;
  imageSourceUrl?: string;
  goals: string[];
  rules: string[];
  scenarios: LessonScenario[];
  quiz: LessonQuizQuestion[];
  adultNote: string;
  tags: string[];
  trainer?: LessonTrainer;
  extraTrainers?: LessonTrainer[];
  methodology?: LessonMethodology;
  screens?: LessonScreens;
};

export type ProgramLesson = LessonBase & {
  moduleSlug: string;
  moduleTitle: string;
  moduleHours: string;
};

export type ProgramModule = {
  slug: string;
  title: string;
  hours: string;
  lessonCount: number;
  description: string;
  image: string;
  imageAlt: string;
  imageCredit: string;
  imageSourceUrl: string;
  knowledge: string[];
  skills: string[];
  lessons: LessonBase[];
};

export const platformHighlights = [
  "30 structured life-skills and digital capability lessons",
  "6 digital life scenarios with diagnostic and progress checkpoints",
  "All core components of functional digital literacy tailored for all learners",
];

export const platformHighlightsUz = platformHighlights;

export const programModules: ProgramModule[] = [
  {
    slug: "diagnostic",
    title: "Diagnostic Life Skills",
    hours: "2 hours",
    lessonCount: 2,
    description: "Two diagnostic lessons - ascertaining and control measurements of functional digital literacy (FDL).",
    image: "/uzbek-images/health-clinic.jpg",
    imageAlt: "Digital Literacy Diagnostic",
    imageCredit: "Dissertation Research Document",
    imageSourceUrl: "",
    knowledge: [
      "What is functional digital literacy",
      "What are the 5 components of the FCG?",
      "Why are input and final diagnostics needed?"
    ],
    skills: [
      "Work comfortably with digital tasks",
      "Use the “Listen” and “Help” buttons",
      "Bring the task to completion"
    ],
    lessons: [
      {
        slug: "diagnostic-entry",
        title: "Personal hygiene for teenagers",
        duration: "1 hour",
        summary: "Introductory lesson - diagnostics. The platform looks at how the child copes with digital tasks before the start of the course.",
        intro: "This is the first introduction lesson. The child goes through short tasks: reads the text on the screen, clicks on icons, selects answers. There are no grades here - we just look at the starting level so we can then see what he has learned during the school year.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Personal hygiene for teenagers”",
        goals: [
          "Understand what personal hygiene is and why it is needed in life.",
          "Master digital action - pass the entrance diagnostics of digital skills.",
          "Remember the safety rule: rules for safe work behind the screen (distance to the eyes, posture)."
        ],
        rules: [
          "Read the assignment calmly.",
          "Take your time - there are no grades.",
          "If it’s not clear, click “Listen.”",
          "If you don't know, ask your teacher."
        ],
        scenarios: [
          {
            title: "Morning hygiene procedures",
            text: "This morning you just woke up. What should you do first?",
            options: [
              "Wash, brush your teeth, comb your hair.",
              "Go outside immediately.",
              "Stay on the phone until lunch."
            ],
            correctIndex: 0,
            feedback: "Right. In the morning - hygiene procedures: washing, teeth, hair.",
            support: "This is basic hygiene - a daily habit since childhood."
          },
          {
            title: "When to wash your hands",
            text: "You came home from the street and want to eat.",
            options: [
              "First, wash your hands with soap.",
              "Do not wash, dirt is useful.",
              "Go straight to the table - then I’ll wash it."
            ],
            correctIndex: 0,
            feedback: "Right. Hands are washed before eating and after going outside.",
            support: "Dirty hands carry germs, so wash them with soap."
          }
        ],
        quiz: [
          {
            question: "What about personal hygiene?",
            options: [
              "Running and jumping.",
              "Washing, brushing teeth, washing hands.",
              "Only washing dishes."
            ],
            correctIndex: 1
          },
          {
            question: "Teeth need to be brushed:",
            options: [
              "Only on weekends.",
              "Once a month.",
              "Morning and evening, every day."
            ],
            correctIndex: 2
          },
          {
            question: "Why are these diagnostics on the platform?",
            options: [
              "View the starting level - there will be no ratings.",
              "To be expelled from school.",
              "To give a two."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "Explain to your child: today is just an introduction to computer tasks on the topic of hygiene. There will be no assessments - we will compare progress at the end of the year.",
        tags: [
          "personal hygiene",
          "Diagnostic lesson (outside scenarios)",
          "Lesson 1"
        ],
        methodology: {
          objective: "Form a digital activity - undergo an input diagnostic of digital skills - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: rules of personal hygiene",
            "create a step-by-step digital action algorithm",
            "establish a safety rule: rules for safe work behind a screen (distance to eyes, posture)",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Diagnostic module”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "3 min",
              title: "Organizational moment",
              teacherSays: "Today is a special day, we will go through digital tasks. Calmly, take turns, without judgment.",
              teacherDoes: [
                "Greets the group",
                "Explains the rules of work"
              ],
              studentActivity: "Listen; getting ready to work"
            },
            {
              duration: "5 min",
              title: "Instruction and familiarization with the interface",
              teacherDoes: [
                "Shows buttons “Next”, “Listen”, “Help”",
                "Demonstrates a trial task"
              ],
              studentActivity: "Try a trial task under the guidance of a teacher"
            },
            {
              duration: "7 min",
              title: "Block 1 - Reader Component",
              teacherDoes: [
                "Launches 3 digital cards",
                "Captures answers"
              ],
              studentActivity: "Read and answer independently",
              hint: "Diagnostic point 1"
            },
            {
              duration: "7 min",
              title: "Block 2 - digital and symbolic components",
              teacherDoes: [
                "Runs icon recognition tasks"
              ],
              studentActivity: "Recognize icons, click on elements",
              hint: "Diagnostic point 2"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes a quiet exercise session"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "5 min",
              title: "Block 3 - safety component",
              teacherDoes: [
                "Triggers 3 \"safe/dangerous\" situations"
              ],
              studentActivity: "Assess situations",
              hint: "Diagnostic point 3"
            },
            {
              duration: "7 min",
              title: "Block 4 - social and living component",
              teacherDoes: [
                "Launches a simple household digital situation"
              ],
              studentActivity: "Make a decision",
              hint: "Diagnostic point 4"
            },
            {
              duration: "4 min",
              title: "Reflection",
              teacherDoes: [
                "Praises for completed diagnostics",
                "Explains: no ratings"
              ],
              studentActivity: "Choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to personal hygiene and tell it in the next lesson.",
          safetyNote: "rules for safe work behind a screen (distance to eyes, posture)"
        },
        trainer: {
          type: "morning-quest",
          task: "Complete Alisher's morning quest: 6 short tasks on your phone. There are no grades here - we look at what you can already do.",
          feedbackCorrect: "Well done! You completed all 6 tasks.",
          feedbackWrong: "It's okay - this is a diagnosis, there are no assessments."
        },
      },
      {
        slug: "diagnostic-final",
        title: "Rules and techniques for maintaining cleanliness and health of the body",
        duration: "1 hour",
        summary: "Test lesson - final diagnostics. The platform looks at what the child has learned over the year.",
        intro: "The final diagnostic is the same type as in the very first lesson. Comparing the results “before” and “after” shows how much the child’s digital literacy has grown over the school year.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Rules and techniques for keeping the body clean and healthy”",
        goals: [
          "Understand what cleanliness and health of the body is and why it is needed in life.",
          "Master digital action - pass the final diagnostics of digital skills.",
          "Remember the safety rule: a generalization of the rules for safe work behind the screen and at home."
        ],
        rules: [
          "Read the assignment calmly.",
          "Take your time - there are no grades.",
          "If it’s not clear, click “Listen.”",
          "If you don't know, ask your teacher."
        ],
        scenarios: [
          {
            title: "Body hygiene - the result",
            text: "Over the year we covered a lot of topics about cleanliness and health. What's important?",
            options: [
              "Wash only when very dirty.",
              "Clean body, hands and teeth - every day.",
              "Hygiene is not important."
            ],
            correctIndex: 1,
            feedback: "Right. Daily hygiene is the basis of health.",
            support: "This is a consolidation of hygiene knowledge for the academic year."
          },
          {
            title: "Where to go if you are sick",
            text: "You have a fever and a headache.",
            options: [
              "Keep quiet and go for a walk.",
              "Take your own medicine.",
              "Tell an adult to take your temperature with a thermometer."
            ],
            correctIndex: 2,
            feedback: "Fine. When you are sick, we always call an adult.",
            support: "Self-medication at your age is dangerous."
          }
        ],
        quiz: [
          {
            question: "What should you do to clean your body every day?",
            options: [
              "Wash your face, brush your teeth, wash your hands.",
              "Do nothing.",
              "Only on Saturday."
            ],
            correctIndex: 0
          },
          {
            question: "When do they change clothes for clean ones?",
            options: [
              "Never.",
              "Every day - underwear, socks. And all of it after sports.",
              "Once a month."
            ],
            correctIndex: 1
          },
          {
            question: "Why final diagnostics?",
            options: [
              "It's just an exam.",
              "Give it a two.",
              "Compare how I could at the beginning and how I can now."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Support your child before the final hygiene examination. Say, “Just show me what you learned.”",
        tags: [
          "cleanliness and health of the body",
          "Diagnostic lesson (outside scenarios)",
          "Lesson 32"
        ],
        methodology: {
          objective: "Form a digital activity - undergo a final diagnosis of digital skills - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: rules of cleanliness and health of the body",
            "create a step-by-step digital action algorithm",
            "consolidate the safety rule: generalization of the rules for safe work behind the screen and at home",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Diagnostic module”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "3 min",
              title: "Organizational moment",
              teacherSays: "Today is a special day, we will go through digital tasks. Calmly, take turns, without judgment.",
              teacherDoes: [
                "Greets the group",
                "Explains the rules of work"
              ],
              studentActivity: "Listen; getting ready to work"
            },
            {
              duration: "5 min",
              title: "Instruction and familiarization with the interface",
              teacherDoes: [
                "Shows buttons “Next”, “Listen”, “Help”",
                "Demonstrates a trial task"
              ],
              studentActivity: "Try a trial task under the guidance of a teacher"
            },
            {
              duration: "7 min",
              title: "Block 1 - Reader Component",
              teacherDoes: [
                "Launches 3 digital cards",
                "Captures answers"
              ],
              studentActivity: "Read and answer independently",
              hint: "Diagnostic point 1"
            },
            {
              duration: "7 min",
              title: "Block 2 - digital and symbolic components",
              teacherDoes: [
                "Runs icon recognition tasks"
              ],
              studentActivity: "Recognize icons, click on elements",
              hint: "Diagnostic point 2"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes a quiet exercise session"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "5 min",
              title: "Block 3 - safety component",
              teacherDoes: [
                "Triggers 3 \"safe/dangerous\" situations"
              ],
              studentActivity: "Assess situations",
              hint: "Diagnostic point 3"
            },
            {
              duration: "7 min",
              title: "Block 4 - social and living component",
              teacherDoes: [
                "Launches a simple household digital situation"
              ],
              studentActivity: "Make a decision",
              hint: "Diagnostic point 4"
            },
            {
              duration: "4 min",
              title: "Reflection",
              teacherDoes: [
                "Praises for completed diagnostics",
                "Explains: no ratings"
              ],
              studentActivity: "Choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to the cleanliness and health of the body and tell it in the next lesson.",
          safetyNote: "generalization of rules for safe work behind the screen and at home"
        },        trainer: {
          type: "final-quest",
          task: "This is a control test - 6 tasks on different skills.",
          feedbackCorrect: "Thank you! The control measurement has been passed.",
          feedbackWrong: "It's okay - this is a diagnosis, no assessments."
        }

      }
    ]
  },
  {
    slug: "digital-health",
    title: "Digital Health & Hygiene",
    hours: "8 hours",
    lessonCount: 8,
    description: "Eight lessons where the student works with digital health objects: wardrobe, shampoo, skin questionnaire, weather forecast, label, volume control and digital thermometer.",
    image: "/uzbek-images/health-clinic.jpg",
    imageAlt: "Digital Health - Personal Care and Medical Devices",
    imageCredit: "Mosaic",
    imageSourceUrl: "",
    knowledge: [
      "What does a digital label look like and what are the main places on it?",
      "How to Read Weather Icons and UV Index",
      "What digital devices help with hygiene and health?"
    ],
    skills: [
      "Select products and clothes based on digital hints",
      "Read the digital label and make a decision",
      "Read digital meters"
    ],
    lessons: [
      {
        slug: "appearance-young-people",
        title: "Appearance of young people",
        duration: "1 hour",
        summary: "We learn to choose clothes for the situation: going to school is one thing, going on a visit is another.",
        intro: "On the screen is a wardrobe with different things. The child puts together an outfit: what to wear to school, what to wear on a visit. The platform tells you if something is not suitable for the occasion. This is how the habit of dressing appropriately is formed.",
        image: "/uzbek-images/health-clinic.jpg",
        imageAlt: "Illustration for the lesson “Appearance of young people”",
        goals: [
          "Understand what appearance is and why it is needed in life.",
          "Master digital action - assemble a digital image for the situation.",
          "Remember the safety rule: appropriate clothing for different places and meetings."
        ],
        rules: [
          "First, open the wardrobe.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision based on the rule: the appropriateness of clothing for different places and meetings.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Getting ready for school",
            text: "You need to get dressed for school. What will you wear?",
            options: [
              "A neat shirt and trousers.",
              "Festive suit with tie.",
              "Tracksuit and sneakers."
            ],
            correctIndex: 0,
            feedback: "That’s right—they dress neatly and modestly for school.",
            support: "At school, neatness is important, not brightness."
          },
          {
            title: "Visiting grandma",
            text: "You are going to visit your grandmother for her birthday.",
            options: [
              "No one will notice a dirty T-shirt.",
              "Clean smart clothes - shirt/blouse and trousers/skirt.",
              "Sports shorts."
            ],
            correctIndex: 1,
            feedback: "It’s good - they dress neatly and smartly for the holiday.",
            support: "A neat appearance is respect for the owners."
          }
        ],
        quiz: [
          {
            question: "What is the most important thing in school clothes?",
            options: [
              "It doesn't matter at all.",
              "Clean and tidy.",
              "The brightest."
            ],
            correctIndex: 1
          },
          {
            question: "Before leaving home you need:",
            options: [
              "Do nothing.",
              "Look in the mirror and check yourself.",
              "Run out immediately."
            ],
            correctIndex: 1
          },
          {
            question: "What clothes are suitable for training?",
            options: [
              "School uniform.",
              "Festive dress.",
              "Tracksuit and sneakers."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Help your child check before going out to see if their clothes are clean and if they look neat. Praise for independence.",
        tags: [
          "appearance",
          "Digital Health & Hygiene",
          "Lesson 2"
        ],
        methodology: {
          objective: "Form a digital action - collect a digital image for the situation - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: wardrobe",
            "create a step-by-step digital action algorithm",
            "establish a safety rule: the appropriateness of clothing for different places and meetings",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital Health”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short tasks (first formative lesson; repetition based on diagnostics)"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to assemble a digital image for the situation.",
              teacherDoes: [
                "Shows a problematic situation on the topic “appearance”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic \"appearance\"",
                "Shows wardrobe"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Triggers the task: find key places on the “wardrobe”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to assemble a digital image for the situation” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens the wardrobe",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with the wardrobe; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to the appearance and tell it at the next lesson.",
          safetyNote: "appropriateness of clothing for different places and meetings"
        },
        trainer: {
          type: "outfit",
          task: "Choose clothes to suit the situation: for school - one thing, for physical education - another, for a birthday - another.",
          feedbackCorrect: "Great! The image suits the situation.",
          feedbackWrong: "These clothes are not suitable for the occasion. Try another set."
        }
      },
      {
        slug: "hair-types-care",
        title: "Main hair types: characteristics and care features",
        duration: "1 hour",
        summary: "We learn to determine your hair type and choose the right shampoo according to the mark on the package.",
        intro: "The child determines from the pictures what type of hair he has: dry, oily or normal. Then, on the display screen, he selects a shampoo with a suitable mark and reads the label. This is a typical consumer skill - to choose a product “for yourself”.",
        image: "/uzbek-images/health-clinic.jpg",
        imageAlt: "Illustration for the lesson “Main hair types: characteristics and care features”",
        goals: [
          "Understand what hair types are and why they are needed in life.",
          "Master the digital action - select a product based on your hair type on the digital storefront.",
          "Remember the safety rule: rule: use only suitable means."
        ],
        rules: [
          "First, open the shampoo display.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: rule: use only the appropriate product.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Your hair is oily",
            text: "In the morning, your hair quickly becomes oily at the roots.",
            options: [
              "Buy shampoo labeled “for oily hair.”",
              "Any shampoo doesn't matter.",
              "Wash your hair with soap."
            ],
            correctIndex: 0,
            feedback: "That’s right - it’s always written on the packaging what kind of hair it’s for.",
            support: "Selecting a product based on your hair type is the basis of proper care."
          },
          {
            title: "Dry hair",
            text: "Hair is dry and frizzy after washing.",
            options: [
              "Shampoo “for dry hair” with moisturizing.",
              "Shampoo “for oily people” - it cleanses more strongly.",
              "No shampoo at all."
            ],
            correctIndex: 0,
            feedback: "Right. Dry hair needs moisture.",
            support: "Shampoo that is not suitable for your hair type only worsens its condition."
          }
        ],
        quiz: [
          {
            question: "What are the different types of hair?",
            options: [
              "Only long and short.",
              "Only dark and light.",
              "Dry, oily, normal, mixed."
            ],
            correctIndex: 2
          },
          {
            question: "Where to look, what kind of hair is shampoo for?",
            options: [
              "Ask your neighbor.",
              "There is a mark on the package.",
              "Guess by smell."
            ],
            correctIndex: 1
          },
          {
            question: "What to do if the shampoo is not suitable?",
            options: [
              "Change to another one according to your hair type.",
              "Stop washing your hair.",
              "Use to the end."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "Show your child at home the label on the shampoo - for which hair. Find the right one together.",
        tags: [
          "hair types",
          "Digital Health & Hygiene",
          "Lesson 3"
        ],
        methodology: {
          objective: "Create a digital action - select a product based on hair type on a digital showcase - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: a display of shampoos",
            "create a step-by-step digital action algorithm",
            "establish a safety rule: rule: use only suitable means",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital Health”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short assignments (revision builds on Lesson #2 (Appearance))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to choose a product based on your hair type on a digital storefront.",
              teacherDoes: [
                "Shows a problematic situation on the topic “hair types”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “hair types”",
                "Shows a display of shampoos"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Triggers the task: find key places on the “shampoo display”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to choose a product based on your hair type on a digital storefront” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens a display of shampoos",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with a display of shampoos; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to hair types and tell them in the next lesson.",
          safetyNote: "rule: use only suitable means"
        },
        trainer: {
          type: "hair-care",
          task: "Choose a shampoo for your hair type: oily, dry or normal.",
          feedbackCorrect: "Well done! This shampoo suits your hair type.",
          feedbackWrong: "This shampoo will not work. Read the label and try another one."
        }
      },
      {
        slug: "skin-types-care",
        title: "Facial skin types and care features",
        duration: "1 hour",
        summary: "We go through the digital questionnaire “What is your skin type” and read the care instructions.",
        intro: "The child answers simple questions about the skin. The platform itself determines the type and shows short care steps. This introduces how questionnaires work in health apps.",
        image: "/uzbek-images/health-clinic.jpg",
        imageAlt: "Illustration for the lesson “Types of facial skin and features of their care”",
        goals: [
          "Understand what skin types are and why they are needed in life.",
          "Master digital action - take a digital questionnaire and get a recommendation.",
          "Remember the safety rule: be critical of recommendations from the Internet."
        ],
        rules: [
          "First, open the skin questionnaire.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: a critical attitude towards recommendations from the Internet.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "The skin shines on the forehead",
            text: "By lunchtime, a shine appears on the forehead and nose.",
            options: [
              "This is normal, you don't need to do anything.",
              "This is a disease.",
              "If you have oily or combination skin, you need proper care."
            ],
            correctIndex: 2,
            feedback: "That's right - the forehead and nose often shine with oily skin.",
            support: "Your skin type determines how to care for it."
          },
          {
            title: "Tightness after washing",
            text: "After washing, the skin on the cheeks tightens.",
            options: [
              "This is dry skin - you need gentle care and cream.",
              "This is normal skin.",
              "Must be washed with harsh soap."
            ],
            correctIndex: 0,
            feedback: "That's right - tightness is a sign of dry skin.",
            support: "Dry skin needs hydration."
          }
        ],
        quiz: [
          {
            question: "What are the different skin types?",
            options: [
              "Dry, oily, normal, combination.",
              "Only white and dark.",
              "Only clean."
            ],
            correctIndex: 0
          },
          {
            question: "Why do you need a questionnaire in the application?",
            options: [
              "To make money.",
              "This is a game.",
              "To determine your skin type and choose care."
            ],
            correctIndex: 2
          },
          {
            question: "Can you trust the recommendations right away?",
            options: [
              "Of course - the application is always right.",
              "Never trust anyone.",
              "It is better to consult an adult."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Help your child determine his skin type. Choose a gentle cleanser together.",
        tags: [
          "skin types",
          "Digital Health & Hygiene",
          "Lesson 4"
        ],
        methodology: {
          objective: "Form a digital action - take a digital questionnaire and get a recommendation - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: skin questionnaire",
            "create a step-by-step digital action algorithm",
            "consolidate the safety rule: a critical attitude towards recommendations from the Internet",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital Health”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short assignments (repetition based on Lesson #3 (Hair Types))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to take a digital questionnaire and get a recommendation.",
              teacherDoes: [
                "Shows a problematic situation on the topic “skin types”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “skin types”",
                "Shows skin questionnaire"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Starts the task: find key places on the “skin questionnaire”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to complete the digital questionnaire and get a recommendation” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens the skin questionnaire",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with a skin questionnaire; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to skin types and tell them in the next lesson.",
          safetyNote: "critical attitude towards recommendations from the Internet"
        },
        trainer: {
          type: "skin-type",
          task: "Look at your face and determine your skin type: oily, dry or normal.",
          feedbackCorrect: "Right. You found out your skin type.",
          feedbackWrong: "Take a closer look at your face for signs of your skin type."
        }
      },
      {
        slug: "sun-exposure-skin",
        title: "The effect of the sun on the skin",
        duration: "1 hour",
        summary: "We read the weather forecast and decide whether a hat and sunscreen are needed today.",
        intro: "On the screen there is a simple forecast: temperature, sun or cloud icon, UV index. According to the rule “sunny → protection needed,” the child decides what to take with him. Phone forecasting is a massive skill that everyone uses.",
        image: "/uzbek-images/health-clinic.jpg",
        imageAlt: "Illustration for the lesson “The effect of the sun on the skin”",
        goals: [
          "Understand what the sun and skin are and why they are needed in life.",
          "Master the digital action - read the digital forecast and decide about sun protection.",
          "Remember the safety rule: protect your skin from burns and heat stroke."
        ],
        rules: [
          "First, open the weather forecast.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: protect your skin from burns and heat stroke.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Forecast: sunny, +30°C",
            text: "It's bright sunshine outside. What to take with you?",
            options: [
              "Nothing, that's fine.",
              "A warm jacket.",
              "Hat and sunscreen."
            ],
            correctIndex: 2,
            feedback: "That's right - sun protection is a must.",
            support: "Strong sun causes burns and heatstroke."
          },
          {
            title: "Forecast: cloudy, +18°C",
            text: "It's cloudy outside. Need protection?",
            options: [
              "A Panama hat is a must, as in the heat.",
              "Cream is not necessary, but it is better to check the UV index.",
              "Don't go out at all."
            ],
            correctIndex: 1,
            feedback: "Okay—clouds don't always protect from UV.",
            support: "The UV index shows the real strength of the sun."
          }
        ],
        quiz: [
          {
            question: "Where can you see the power of the sun?",
            options: [
              "In the sky by eye.",
              "There is no way to know.",
              "In the forecast there is a UV index."
            ],
            correctIndex: 2
          },
          {
            question: "What is the most harmful thing from strong sun?",
            options: [
              "Get wet.",
              "Skin burn and heatstroke.",
              "Freeze."
            ],
            correctIndex: 1
          },
          {
            question: "What to do on a very hot day?",
            options: [
              "Wear a hat, drink water, hide in the shade.",
              "Run without a hat.",
              "Sitting at home without water."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "Before going for a walk in summer, check the forecast and UV index together. Take cream and a Panama hat.",
        tags: [
          "sun and skin",
          "Digital Health & Hygiene",
          "Lesson 5"
        ],
        methodology: {
          objective: "Form a digital action - read the digital forecast and decide about sun protection - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: weather forecast",
            "create a step-by-step digital action algorithm",
            "reinforce the safety rule: protecting the skin from burns and heat stroke",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital Health”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short assignments (revision based on Lesson #4 (Skin Types))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to read the digital forecast and decide about sun protection.",
              teacherDoes: [
                "Shows a problematic situation on the topic “sun and skin”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “sun and skin”",
                "Shows weather forecast"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Starts the task: find key places on the “weather forecast”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to read a digital forecast and decide about sun protection” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens the weather forecast",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with the weather forecast; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to the sun and skin and tell it at the next lesson.",
          safetyNote: "protecting skin from burns and heat stroke"
        },
        trainer: {
          type: "sun-care",
          task: "Look at the weather forecast and decide how to protect yourself from the sun.",
          feedbackCorrect: "Right! This will protect your skin from the sun.",
          feedbackWrong: "It's not safe. Read the forecast and choose protection."
        }
      },
      {
        slug: "cosmetics-basics",
        title: "Cosmetics and their use",
        duration: "1 hour",
        summary: "We learn to read the product label: where is the name, where is the expiration date, where is the method of use.",
        intro: "On the screen is a package of cream or shampoo. The child finds three key places on the label and decides: the product can be used or it has expired. The main rule is to always check the expiration date.",
        image: "/uzbek-images/health-clinic.jpg",
        imageAlt: "Illustration for the lesson “Cosmetics and their use”",
        goals: [
          "Understand what cosmetics are and why they are needed in life.",
          "Master the digital action - read the digital label of the product.",
          "Remember the safety rule: you cannot use expired products or products for other purposes."
        ],
        rules: [
          "First, open the product label.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: you cannot use an expired product or a product for other purposes.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Old jar of cream",
            text: "I found a jar of cream in the closet. Expiration date: 2023.",
            options: [
              "Give it to someone.",
              "Use it, because the cream is expensive.",
              "Throw it away - you can't use it."
            ],
            correctIndex: 2,
            feedback: "Right. Expired product can harm your skin.",
            support: "Expiration date is safety."
          },
          {
            title: "Label without date",
            text: "There is no expiration date on the jar.",
            options: [
              "Think about it for a week.",
              "It is not known whether it is possible not to use it.",
              "Use it once the date has been erased."
            ],
            correctIndex: 1,
            feedback: "Fine. If the deadline is not visible, it is better not to use it.",
            support: "Any remedy without a deadline is potentially dangerous."
          }
        ],
        quiz: [
          {
            question: "What is the most important thing on a cosmetics label?",
            options: [
              "Only the price.",
              "Expiration date, name, method of use.",
              "Only the color of the packaging."
            ],
            correctIndex: 1
          },
          {
            question: "What does “expiration date 2023” mean?",
            options: [
              "23% discount.",
              "Produced in 2023.",
              "Can be used until the end of 2023."
            ],
            correctIndex: 2
          },
          {
            question: "Is it possible to use expired cream?",
            options: [
              "Yes, if you hate to throw it away.",
              "No, it can harm your skin.",
              "Only in winter."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "At home, together with your child, check cosmetics in the bathroom for expiration dates. If it's expired, throw it away.",
        tags: [
          "cosmetics",
          "Digital Health & Hygiene",
          "Lesson 6"
        ],
        methodology: {
          objective: "Form a digital action - read the digital label of the product - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: product label",
            "create a step-by-step digital action algorithm",
            "establish a safety rule: expired products and products for other purposes must not be used",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital Health”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short activities (revision based on lesson #5 (the influence of the sun))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to read the digital product label.",
              teacherDoes: [
                "Shows a problematic situation on the topic “cosmetics”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “cosmetics”",
                "Shows product label"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Starts the task: find key places on the “label of the product”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to read the digital product label” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens the product label",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with the product label; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: pay attention to cosmetics at home and tell them in the next lesson.",
          safetyNote: "Expired product and product should not be used for other purposes"
        },
        trainer: {
          type: "label-reader",
          task: "Read the cream label - look for 4 important points: expiration date, composition, method of use and warning.",
          feedbackCorrect: "Well done! You found everything you need to read on the label.",
          feedbackWrong: "You can skip this part of the label - look further."
        }
      },
      {
        slug: "skincare-checklist",
        title: "Using skin care products",
        duration: "1 hour",
        summary: "We go through morning skin care step by step - like a checklist on a platform.",
        intro: "A simple three-step checklist: wash, apply toner, apply cream. The child marks each step completed. This is how the ability to work with step-by-step digital instructions is formed.",
        image: "/uzbek-images/health-clinic.jpg",
        imageAlt: "Illustration for the lesson “Using cosmetic skin care products”",
        goals: [
          "Understand what skin care is and why it is needed in life.",
          "Master digital action - go through the digital care checklist step by step.",
          "Remember the safety rule: perform the steps in the correct order; don't miss."
        ],
        rules: [
          "First, open the care checklist.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: perform the steps in the correct order; don't miss.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Morning care",
            text: "In the morning you are getting ready for school. What to do with the skin?",
            options: [
              "Just wash your face.",
              "Get dressed immediately without washing.",
              "Wash, apply tonic, apply light cream."
            ],
            correctIndex: 2,
            feedback: "Right. In the morning - three steps: wash, toner, cream.",
            support: "Regular care keeps your skin clear."
          },
          {
            title: "Missed a step",
            text: "I forgot to apply cream after washing my face.",
            options: [
              "Wash your face again.",
              "It doesn’t matter anymore - it will pass.",
              "It's not too late to apply cream."
            ],
            correctIndex: 2,
            feedback: "Fine. The cream can be applied later.",
            support: "A checklist helps you remember steps."
          }
        ],
        quiz: [
          {
            question: "How many steps does morning care consist of?",
            options: [
              "From one.",
              "Of the three: wash, toner, cream.",
              "Out of ten."
            ],
            correctIndex: 1
          },
          {
            question: "Why is there a checklist in the application?",
            options: [
              "To confuse.",
              "So as not to forget the steps and mark what is completed.",
              "It's just a game."
            ],
            correctIndex: 1
          },
          {
            question: "In what order should I take the steps?",
            options: [
              "In order, as written in the checklist.",
              "Just the last step.",
              "In any case, it doesn’t matter."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "Print out a simple morning care checklist and hang it in your bathroom. Help your child learn regularity.",
        tags: [
          "skin care",
          "Digital Health & Hygiene",
          "Lesson 7"
        ],
        methodology: {
          objective: "Form a digital action - go through a digital care checklist step by step - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: care checklist",
            "create a step-by-step digital action algorithm",
            "reinforce the safety rule: perform steps in the correct order; don't miss",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital Health”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short activities (revision based on lesson #6 (product label))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to go through the digital care checklist step by step.",
              teacherDoes: [
                "Shows a problematic situation on the topic “skin care”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “skin care”",
                "Shows care checklist"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Triggers the task: find key places on the “care checklist”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to go through the digital care checklist step by step” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens a care checklist",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with a care checklist; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: pay attention to skin care at home and talk about it in the next lesson.",
          safetyNote: "follow the steps in the correct order; don't miss"
        },
        trainer: {
          type: "step-sequence",
          task: "Place the cards in the correct order - how to wash your face and apply cream correctly.",
          feedbackCorrect: "Right! This is what needs to be done in order.",
          feedbackWrong: "This is not the next step. Think: what comes after?"
        }
      },
      {
        slug: "ear-hygiene-volume",
        title: "Hearing hygiene",
        duration: "1 hour",
        summary: "We adjust the volume to a safe level so as not to harm your hearing.",
        intro: "Volume slider with three zones: green (safe), yellow (careful), red (harmful). The child puts the sound in a safe zone. This is a rule for protecting your hearing when using headphones and a player.",
        image: "/uzbek-images/health-clinic.jpg",
        imageAlt: "Illustration for the lesson “Hearing Hygiene”",
        goals: [
          "Understand what hearing hygiene is and why it is needed in life.",
          "Master digital action - set a safe volume on a digital device.",
          "Remember the safety rule: loud music on headphones is harmful to your hearing."
        ],
        rules: [
          "First open the volume control.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: loud music in headphones harms your hearing.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Headphone volume",
            text: "You listen to music on headphones. The neighbor hears your music.",
            options: [
              "Take off your headphones so everyone can hear.",
              "Turn it down - it's too loud.",
              "Make it even louder."
            ],
            correctIndex: 1,
            feedback: "Right. If a neighbor can hear it, it is loud for hearing.",
            support: "Safe volume is no higher than 60%."
          },
          {
            title: "After a long listen",
            text: "I listened to music for 2 hours straight. My ears are ringing.",
            options: [
              "Keep listening.",
              "Make it even louder.",
              "Remove the headphones and give your ears a rest."
            ],
            correctIndex: 2,
            feedback: "Right. Ringing in the ears is a signal to “rest.”",
            support: "Hearing must be protected, otherwise it will deteriorate."
          }
        ],
        quiz: [
          {
            question: "A safe volume level is:",
            options: [
              "100%.",
              "The louder the better.",
              "Up to 60%."
            ],
            correctIndex: 2
          },
          {
            question: "How long can you listen to music on headphones in a row?",
            options: [
              "At least all day.",
              "No more than an hour, then a break.",
              "Only 5 minutes."
            ],
            correctIndex: 1
          },
          {
            question: "What to do if your ears are ringing?",
            options: [
              "Listen further.",
              "Rinse with water.",
              "Take off your headphones and relax."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Explain to your child: loud music damages hearing for life. Agree on the “up to 60%” rule.",
        tags: [
          "hearing hygiene",
          "Digital Health & Hygiene",
          "Lesson 8"
        ],
        methodology: {
          objective: "Form a digital action - set a safe volume on a digital device - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: volume control",
            "create a step-by-step digital action algorithm",
            "reinforce the safety rule: loud music on headphones harms your hearing",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital Health”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short activities (revision based on lesson #7 (skin care))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to set a safe volume on a digital device.",
              teacherDoes: [
                "Shows a problematic situation on the topic “hearing hygiene”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “hearing hygiene”",
                "Shows volume control"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Starts the task: find key places on the “volume control”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to set a safe volume on a digital device” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens the volume control",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Independently operate the volume control; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: pay attention to hearing hygiene at home and talk about it in the next lesson.",
          safetyNote: "Loud music on headphones damages your hearing"
        },
        trainer: {
          type: "volume-safe",
          task: "Set the volume of your headphones to a safe level to avoid damaging your hearing.",
          feedbackCorrect: "Right. This volume won't hurt your ears.",
          feedbackWrong: "Too loud and may damage your hearing. Make it quieter."
        }
      },
      {
        slug: "digital-thermometer",
        title: "Types of thermometers. Rules for measuring body temperature",
        duration: "1 hour",
        summary: "We read the readings of a digital thermometer and decide whether it’s normal or if we need to tell an adult.",
        intro: "A digital thermometer shows a number on the screen. The child compares the readings with the scale: decreased, normal, increased. If the temperature is high, call an adult. The device is real and in demand in every family.",
        image: "/uzbek-images/health-clinic.jpg",
        imageAlt: "Illustration for the lesson “Types of thermometers. Rules for measuring body temperature\"",
        goals: [
          "Understand what a thermometer is and why it is needed in life.",
          "Master the digital action - read the readings of a digital thermometer and evaluate.",
          "Remember the safety rule: at temperatures above 38 °C, call an adult and an ambulance."
        ],
        rules: [
          "First, open the digital thermometer.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: at a temperature above 38 °C, call an adult and an ambulance.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "The thermometer showed 38.5°C",
            text: "I measured the temperature - 38.5°C.",
            options: [
              "Be quiet and go play.",
              "Take a cold shower.",
              "Tell an adult right away that you need help."
            ],
            correctIndex: 2,
            feedback: "Right. High temperature is a signal.",
            support: "If the temperature is above 38°C, you need to tell an adult."
          },
          {
            title: "The thermometer showed 36.7°C",
            text: "I measured the temperature - 36.7°C.",
            options: [
              "This is very low.",
              "This is a high temperature, you need to go to the hospital.",
              "This is the norm - you can go to school."
            ],
            correctIndex: 2,
            feedback: "Right. 36.7 is normal temperature.",
            support: "The norm is about 36.6°C, plus or minus half a degree."
          }
        ],
        quiz: [
          {
            question: "What is normal body temperature?",
            options: [
              "40°C.",
              "About 36.6°C.",
              "30°C."
            ],
            correctIndex: 1
          },
          {
            question: "At what temperature should you call an adult?",
            options: [
              "For any.",
              "Above 38°C.",
              "Never."
            ],
            correctIndex: 1
          },
          {
            question: "A digital thermometer is:",
            options: [
              "A device with a screen that shows a number.",
              "Watch.",
              "Glass rod."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "Show your child how to use your home thermometer. Explain under what indications to call you.",
        tags: [
          "thermometer",
          "Digital Health & Hygiene",
          "Lesson 26"
        ],
        methodology: {
          objective: "Form a digital action - read the readings of a digital thermometer and evaluate - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: digital thermometer",
            "create a step-by-step digital action algorithm",
            "establish a safety rule: at temperatures above 38 °C - call adults and an ambulance",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital Health”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short activities (revision based on Lesson #25 (Safety))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to read a digital thermometer and evaluate it.",
              teacherDoes: [
                "Shows a problematic situation on the topic “thermometer”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic \"thermometer\"",
                "Shows digital thermometer"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Starts the task: find key places on the “digital thermometer”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to read and evaluate a digital thermometer” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens a digital thermometer",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with a digital thermometer; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: pay attention to the thermometer at home and tell it at the next lesson.",
          safetyNote: "at temperatures above 38 °C - call adults and an ambulance"
        },
        trainer: {
          type: "thermometer",
          task: "Measure the temperature and choose the right action.",
          feedbackCorrect: "Right. This is the correct action at this temperature.",
          feedbackWrong: "It's not safe. Read the number and think again."
        }
      }
    ]
  },
  {
    slug: "digital-home-economics",
    title: "Digital Household & Daily Economics",
    hours: "10 hours",
    lessonCount: 10,
    description: "Ten lessons on how digital tools can help you manage your household: forecasted clothing, clothing label, washing machine, product dosage, recipe, timer, serving, family income and expenses.",
    image: "/uzbek-images/shopping-market.jpg",
    imageAlt: "Digital economy of everyday life - clothing, food, budget",
    imageCredit: "Mosaic",
    imageSourceUrl: "",
    knowledge: [
      "How to Read Digital Clothing Tags and Instructions",
      "How does the digital panel of a washing machine work?",
      "How a digital family budget is maintained"
    ],
    skills: [
      "Recognize care pictograms and icons on equipment",
      "Use a digital recipe and timer",
      "Fill out a digital budget form and expense table"
    ],
    lessons: [
      {
        slug: "seasonal-clothing",
        title: "Seasonal clothing and its characteristics",
        duration: "1 hour",
        summary: "We read the forecast for the week and collect a set of clothes for every day.",
        intro: "On the screen is the weather for 5–7 days. The child watches the temperature and precipitation and collects a suitable set from his wardrobe for each day. The ability to “dress according to the weather” is basic for independence.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Seasonal clothing and its characteristics”",
        goals: [
          "Understand what seasonal clothing is and why it is needed in life.",
          "Master the digital action - put together a set of clothes according to the digital forecast for the week.",
          "Remember the safety rule: dress according to the weather - do not freeze or overheat."
        ],
        rules: [
          "First, open the forecast for the week.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: dress according to the weather - do not freeze and do not overheat.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Tomorrow −5°C, snow",
            text: "The forecast for tomorrow is −5°C and snow.",
            options: [
              "Light windbreaker and sneakers.",
              "Warm jacket, hat, mittens, warm shoes.",
              "Shorts and T-shirt."
            ],
            correctIndex: 1,
            feedback: "That's right - in cold weather you need warm clothes.",
            support: "We dress according to the temperature."
          },
          {
            title: "Forecast: +25°C, clear",
            text: "Hot summer day.",
            options: [
              "Winter jacket.",
              "Raincoat.",
              "Light T-shirt, shorts, hat."
            ],
            correctIndex: 2,
            feedback: "Good - dress lightly in hot weather.",
            support: "In hot weather it is important not to overheat."
          }
        ],
        quiz: [
          {
            question: "Where to see how to dress tomorrow?",
            options: [
              "In the weather forecast on your phone.",
              "Don't look anywhere.",
              "To the sky through the window."
            ],
            correctIndex: 0
          },
          {
            question: "At +5°C and rain you need:",
            options: [
              "Fur coat.",
              "A jacket with a hood or an umbrella.",
              "Shorts."
            ],
            correctIndex: 1
          },
          {
            question: "Why look at the forecast for several days?",
            options: [
              "To remember pictures.",
              "To plan your outfit for the week.",
              "It's not necessary."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "In the evening, watch the forecast for tomorrow together. Let the child suggest what to wear.",
        tags: [
          "seasonal clothing",
          "Digital Household & Daily Economics",
          "Lesson 9"
        ],
        methodology: {
          objective: "Form a digital action - collect a set of clothes according to the digital forecast for the week - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: weekly forecast",
            "create a step-by-step digital action algorithm",
            "establish a safety rule: dress according to the weather - do not freeze or overheat",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital economy of everyday life”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short activities (revision builds on lesson #8 (hearing hygiene) and lesson #2 (appearance))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to assemble a set of clothes according to the digital forecast for the week.",
              teacherDoes: [
                "Shows a problematic situation on the topic “seasonal clothing”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “seasonal clothing”",
                "Shows the forecast for the week"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Launches the task: find key places in the “weekly forecast”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to assemble a set of clothes according to a digital forecast for a week” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens the forecast for the week",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with a weekly forecast; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to seasonal clothing and tell it in the next lesson.",
          safetyNote: "dress according to the weather - do not freeze or overheat"
        },
        trainer: {
          type: "seasonal-clothing",
          task: "Check the weather forecast and choose the right clothes for the outdoors.",
          feedbackCorrect: "Right! These clothes are suitable for the weather.",
          feedbackWrong: "It will be uncomfortable on the street. Choose different clothes."
        }
      },
      {
        slug: "silk-handwash",
        title: "Washing silk items by hand",
        duration: "1 hour",
        summary: "We learn to read the care symbols on a clothing label—where you can wash it and where you can’t.",
        intro: "On the label there are pictograms: a bowl of water, an iron, a triangle. The child recognizes the icons and determines whether the item can be washed in a machine or only by hand. This will protect clothes from damage.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Washing silk items by hand”",
        goals: [
          "Understand what washing silk is and why it is needed in life.",
          "Master the digital action - read the pictograms on the digital clothing label.",
          "Remember the safety rule: improper washing ruins clothes."
        ],
        rules: [
          "First, open the clothing label.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision based on the rule: improper washing ruins clothes.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "\"Do not machine wash\" icon",
            text: "On the label there is an icon: a basin with water and a hand.",
            options: [
              "Hand wash only.",
              "Do not wash at all.",
              "Machine wash on hot cycle."
            ],
            correctIndex: 0,
            feedback: "That’s right—hand in water means “hand wash.”",
            support: "The icons on the label are instructions for safe washing."
          },
          {
            title: "Crossed out icon",
            text: "On the label, the basin with water is crossed out.",
            options: [
              "Wash in very hot water.",
              "You can wash it however you like.",
              "Cannot be washed - dry clean only."
            ],
            correctIndex: 2,
            feedback: "Right. Crossed out icon = prohibited.",
            support: "You need to know the crossed out icons by heart."
          }
        ],
        quiz: [
          {
            question: "Where can I find clothing care icons?",
            options: [
              "On a label inside the garment.",
              "Only in the store.",
              "This is not written anywhere."
            ],
            correctIndex: 0
          },
          {
            question: "If the icon is crossed out, this means:",
            options: [
              "You can do it sometimes.",
              "This is a must.",
              "You can't do that."
            ],
            correctIndex: 2
          },
          {
            question: "Why read the label before washing?",
            options: [
              "So as not to spoil the thing.",
              "To practice reading.",
              "It doesn't matter."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "At home, show your child the label on his clothing. Explain 2-3 main icons: washing, iron, dry cleaning.",
        tags: [
          "washing silk",
          "Digital Household & Daily Economics",
          "Lesson 10"
        ],
        methodology: {
          objective: "Form a digital action - read pictograms on a digital clothing label - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: clothing label",
            "create a step-by-step digital action algorithm",
            "reinforce the safety rule: improper washing ruins clothes",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital economy of everyday life”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short activities (revision based on lesson #9 (seasonal clothing))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to read the pictograms on a digital clothing label.",
              teacherDoes: [
                "Shows a problematic situation on the topic “washing silk”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “washing silk”",
                "Shows clothing label"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Triggers the task: find key places on the “clothing label”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to read pictograms on a digital clothing label” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens clothing shortcut",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with clothing labels; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to washing silk and tell it in the next lesson.",
          safetyNote: "Wrong washing ruins clothes"
        },
        trainer: {
          type: "care-label",
          task: "Read the symbols on the clothing label and select the correct wash cycle.",
          feedbackCorrect: "Right! This way the clothes won't get ruined.",
          feedbackWrong: "This mode will ruin the thing. Look at the label again."
        }
      },
      {
        slug: "washing-machine-panel",
        title: "Types of washing machines and their uses",
        duration: "1 hour",
        summary: "We start the wash on the washing machine: select the program and press “Start”.",
        intro: "On the screen is a real washing machine panel with programs (wool, cotton, synthetics). The child selects a program for the item and presses “Start”. This lesson is exemplary: all 5 components of digital literacy work here.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Types of washing machines and their use”",
        goals: [
          "Understand what a washing machine is and why it is needed in life.",
          "Master the digital action - start the wash on the digital panel of the washing machine.",
          "Remember the safety rule: do not open the machine during operation; do not exceed the load."
        ],
        rules: [
          "First, open the washing machine panel.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: do not open the machine while working; do not exceed the load.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Washing a wool sweater",
            text: "Grandma's wool sweater. Which program should I choose?",
            options: [
              "“Wool” - 30°C, gentle.",
              "“Fast” – 60°C.",
              "“Cotton” - 90°C, hot."
            ],
            correctIndex: 0,
            feedback: "That's right - wool requires careful washing.",
            support: "High temperatures damage wool."
          },
          {
            title: "The car hums after starting",
            text: "I turned on the car, it makes noise and shakes.",
            options: [
              "Unplug it immediately.",
              "This is normal - it works; Let's check if it's level.",
              "Open the door and get things out."
            ],
            correctIndex: 1,
            feedback: "Okay - the noise is the machine running.",
            support: "The machine should not jump much - this means there is too much laundry."
          }
        ],
        quiz: [
          {
            question: "Where do you select the washing program?",
            options: [
              "On the clothes themselves.",
              "There are icons on the car panel.",
              "This is not chosen."
            ],
            correctIndex: 1
          },
          {
            question: "Is it possible to open the door while washing?",
            options: [
              "Only at the beginning.",
              "No - as long as the water is inside, the door is locked.",
              "Yes, any time."
            ],
            correctIndex: 1
          },
          {
            question: "What does the 30°C icon mean?",
            options: [
              "Wash for 30 minutes.",
              "Loading 30 kg.",
              "Water temperature - 30 degrees."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Show your child the panel of your washing machine. Explain program and temperature icons.",
        tags: [
          "washing machine",
          "Digital Household & Daily Economics",
          "Lesson 11"
        ],
        methodology: {
          objective: "Create a digital action - start washing on the digital panel of the washing machine - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: washing machine panel",
            "create a step-by-step digital action algorithm",
            "establish a safety rule: do not open the machine during operation; do not exceed the load",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital economy of everyday life”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short activities (revision builds on Lesson #10 (Grooming Icons))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to start washing on the digital panel of a washing machine.",
              teacherDoes: [
                "Shows a problematic situation on the topic “washing machine”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens information text on the topic “washing machine”",
                "Shows the washing machine panel"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Starts the task: find key places on the “washing machine panel”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to start washing on the digital panel of a washing machine” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens the washing machine panel",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "They work independently with the washing machine panel; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: pay attention to the washing machine at home and tell it in the next lesson.",
          safetyNote: "do not open the machine during operation; do not exceed the load"
        },        trainer: {
          type: "washing-machine-v2",
          task: "Load the laundry into the machine, select the mode and temperature, and start the wash.",
          feedbackCorrect: "Well done! The washing has started.",
          feedbackWrong: "This mode will ruin your laundry. Look at the label."
        }

      },
      {
        slug: "detergent-dosage",
        title: "Washing powders and detergents and their use",
        duration: "1 hour",
        summary: "We find on the powder packaging the required dosage for a specific wash.",
        intro: "There is a table on the package: how much powder is needed for 3 kg, 5 kg, 8 kg of laundry. The child finds his line and determines the number of spoons. This is a typical ability to read a table of instructions.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Washing powders and detergents and their use”",
        goals: [
          "Understand what detergents are and why you need them in life.",
          "Master the digital action - find the desired dosage of the product on the digital packaging.",
          "Remember the safety rule: too much product harms both clothes and the car."
        ],
        rules: [
          "First, open the package of washing powder.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision based on the rule: too much product harms both your clothes and your car.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Washing 5 kg of laundry",
            text: "There is a table on the package: for 5 kg - 80 grams.",
            options: [
              "Measure 80 grams with a measuring spoon.",
              "Empty the entire pack.",
              "Pour by eye."
            ],
            correctIndex: 0,
            feedback: "That's right - precise dosage is needed.",
            support: "Too much powder is harmful to both your clothes and your car."
          },
          {
            title: "Liquid product",
            text: "You use liquid concentrate.",
            options: [
              "Do not use.",
              "Measure with a cap - it measures.",
              "Pour as much as you want."
            ],
            correctIndex: 1,
            feedback: "Right. A capful of liquid is a measuring stick.",
            support: "All products have a dosage - it must be followed."
          }
        ],
        quiz: [
          {
            question: "Where can I see how much powder to pour?",
            options: [
              "Guess.",
              "Ask your neighbor.",
              "There is a table on the package."
            ],
            correctIndex: 2
          },
          {
            question: "If you pour a lot of powder:",
            options: [
              "The clothes will not rinse well and the powder will settle on the fabric.",
              "It will be better to wash it.",
              "Nothing will change."
            ],
            correctIndex: 0
          },
          {
            question: "How to measure powder?",
            options: [
              "A handful.",
              "Measuring spoon from the package.",
              "A mug."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Show your child the packaging of the powder and the dosage table. Let me measure out the required amount for the next wash.",
        tags: [
          "detergents",
          "Digital Household & Daily Economics",
          "Lesson 12"
        ],
        methodology: {
          objective: "Form a digital action - find the right dosage of the product on the digital packaging - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: packaging of washing powder",
            "create a step-by-step digital action algorithm",
            "establish a safety rule: too much product harms both clothes and the car",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital economy of everyday life”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short activities (revision based on lesson #11 (washing machine))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to find the right dosage of the product on digital packaging.",
              teacherDoes: [
                "Shows a problematic situation on the topic “washing detergents”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens information text on the topic “washing detergents”",
                "Shows packaging of washing powder"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Starts the task: find key places on the “packaging of washing powder”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to find the right dosage of the product on the digital packaging” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opening a package of washing powder",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with washing powder packaging; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to detergents and tell them in the next lesson.",
          safetyNote: "too much product harms both clothes and car"
        },        trainer: {
          type: "detergent-dosage",
          task: "Read the chart on the bottle of powder and measure the correct dose based on the weight of the laundry.",
          feedbackCorrect: "Right! This is the correct measurement.",
          feedbackWrong: "This is the wrong dose. Look at the table again."
        }

      },
      {
        slug: "healthy-dinner-menu",
        title: "Healthy dinner for the whole family",
        duration: "1 hour",
        summary: "We assemble a dinner menu from dish cards with digital clues.",
        intro: "There are dish cards on the screen. Each one has a hint: healthy, heavy, sweet. The child collects a dinner menu for the family, choosing suitable dishes. Learns to make decisions based on prompts.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Healthy dinner for the whole family”",
        goals: [
          "Understand what a healthy dinner is and why it is needed in life.",
          "Master the digital action - assemble a digital dinner menu from dish cards.",
          "Remember the safety rule: proper nutrition is the basis of health."
        ],
        rules: [
          "First, open the dish cards.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: proper nutrition is the basis of health.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Making dinner at home",
            text: "What should we cook for dinner for the family?",
            options: [
              "Shurpa with vegetables and bread is a light, healthy dinner.",
              "Chips and soda.",
              "Large cake with cream."
            ],
            correctIndex: 0,
            feedback: "That's right - soup with vegetables and meat for dinner is healthy.",
            support: "Uzbek shurpa is a traditional light dinner dish."
          },
          {
            title: "Late in the evening I want to eat",
            text: "It’s already 22:00, I’m hungry. Grandmother offers pilaf.",
            options: [
              "Candy and cake.",
              "A large portion of pilaf with meat.",
              "Light snack: flatbread with tea, fruit."
            ],
            correctIndex: 2,
            feedback: "Fine. At night - something light.",
            support: "It is better to eat pilaf for lunch, and light food at night."
          }
        ],
        quiz: [
          {
            question: "What's best for dinner?",
            options: [
              "Only sweets.",
              "Vegetables, protein (chicken, fish, eggs) and tortilla.",
              "Lots of sweet and fatty foods."
            ],
            correctIndex: 1
          },
          {
            question: "What Uzbek dish is light and suitable for dinner?",
            options: [
              "Fat pasties.",
              "Shurpa is a soup with vegetables and meat.",
              "Big cake."
            ],
            correctIndex: 1
          },
          {
            question: "Vegetables for dinner are:",
            options: [
              "Only fries.",
              "Tomato, cucumber, carrot, onion - fresh.",
              "Candies."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Together with your child, collect a dinner menu for the week. Use familiar dishes: shurpa, manti for lunch, light porridge or salad for dinner.",
        tags: [
          "healthy dinner",
          "Digital Household & Daily Economics",
          "Lesson 13"
        ],
        methodology: {
          objective: "Form a digital action - collect a digital dinner menu from dish cards - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: dish cards",
            "create a step-by-step digital action algorithm",
            "reinforce the safety rule: proper nutrition is the basis of health",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital economy of everyday life”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short tasks (repetition based on lesson No. 12 (dosage of funds))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to assemble a digital dinner menu from dish cards.",
              teacherDoes: [
                "Shows a problematic situation on the topic “healthy dinner”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “healthy dinner”",
                "Shows dish cards"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Starts the task: find key places on the “dish cards”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to create a digital dinner menu from dish cards” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens dish cards",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with dish cards; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to a healthy dinner and tell it at the next lesson.",
          safetyNote: "proper nutrition is the basis of health"
        },        trainer: {
          type: "menu-builder",
          task: "Pack a healthy dinner: main course, side dish and drink.",
          feedbackCorrect: "Well done! This is a balanced dinner.",
          feedbackWrong: "This set is not suitable for dinner. Try another one."
        }

      },
      {
        slug: "cutlets-recipe",
        title: "Cutlets",
        duration: "1 hour",
        summary: "Reading the digital recipe for cutlets: ingredients, quantities, cooking steps.",
        intro: "On the screen is a recipe for cutlets. The child looks for three blocks in it: a list of products, grams and pieces, a sequence of steps. This ability to read structured text with numbers is the basis for any recipe.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Cutlets”",
        goals: [
          "Understand what cutlets are and why you need them in life.",
          "Master the digital action - read a digital recipe and find products and quantities.",
          "Remember the safety rule: check the expiration date of food before cooking."
        ],
        rules: [
          "First, open the digital recipe.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: check the expiration date of food before cooking.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "In the recipe “500 g minced meat”",
            text: "Mom is preparing cutlets for dinner. The recipe calls for 500 g of minced meat, but you have 300 g at home.",
            options: [
              "Replace with 500 g potatoes.",
              "Cook with what you have and don’t think about it.",
              "Buy another 200 g in the store or make a smaller portion."
            ],
            correctIndex: 2,
            feedback: "Right. The quantity in the recipe is important.",
            support: "If there is less minced meat, there will be fewer cutlets."
          },
          {
            title: "Don't know what \"minced meat\" is",
            text: "The word “minced meat” in the recipe is unclear.",
            options: [
              "Use the first thing you come across.",
              "Skip.",
              "Ask your mother or grandmother what it is."
            ],
            correctIndex: 2,
            feedback: "Well, it’s better to ask your loved ones.",
            support: "It is better to clarify any unclear words in the recipe."
          }
        ],
        quiz: [
          {
            question: "What does the recipe consist of?",
            options: [
              "Just from the picture.",
              "Only from steps.",
              "From a list of products, quantities and steps."
            ],
            correctIndex: 2
          },
          {
            question: "What does \"500 g\" mean?",
            options: [
              "500 grams is half a kilo.",
              "5 grams.",
              "500 pieces."
            ],
            correctIndex: 0
          },
          {
            question: "Why are the steps in a recipe necessary?",
            options: [
              "To confuse.",
              "To know what to do first, what to do next.",
              "It's just text."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Read a simple recipe with your child. Show where the list of products is, where the quantities are, where the steps are.",
        tags: [
          "cutlets",
          "Digital Household & Daily Economics",
          "Lesson 14"
        ],
        methodology: {
          objective: "Form a digital action - read a digital recipe and find products and quantities - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: digital recipe",
            "create a step-by-step digital action algorithm",
            "reinforce the safety rule: check the expiration date of food before cooking",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital economy of everyday life”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short activities (revision based on Lesson #13 (Dinner Menu))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to read a digital recipe and find products and quantities.",
              teacherDoes: [
                "Shows a problematic situation on the topic “cutlets”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “cutlets”",
                "Shows digital recipe"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Launches a task: find key places on the “digital recipe”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to read a digital recipe and find products and quantities” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens a digital recipe",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with a digital recipe; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: pay attention to the cutlets at home and tell them at the next lesson.",
          safetyNote: "Before cooking, check the expiration date of products"
        },        trainer: {
          type: "recipe-reader",
          task: "Read the cutlet recipe and select the desired ingredients from the refrigerator.",
          feedbackCorrect: "Right! These products are needed for cutlets.",
          feedbackWrong: "This is a redundant product. Look at the recipe."
        }

      },
      {
        slug: "apple-pie-timer",
        title: "Making apple pie",
        duration: "1 hour",
        summary: "Prepare the pie step by step and use a digital timer.",
        intro: "Each recipe step is a separate screen. During the waiting stages (dough, baking), a digital timer starts. When it rings, it’s time to move on. This is how you master the ability to work with a timer in cooking.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Cooking apple pie”",
        goals: [
          "Understand what apple pie is and why it is needed in life.",
          "Master the digital action - follow the recipe step by step with a digital timer.",
          "Remember the safety rule: do not open a hot oven without an adult."
        ],
        rules: [
          "First, open the step-by-step recipe with a timer.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: do not open a hot oven without an adult.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "The dough should rest for 30 minutes",
            text: "The recipe says: the dough should rest for 30 minutes.",
            options: [
              "Place in the oven immediately.",
              "Set a timer for 30 minutes and do something.",
              "Lie down on your own for 30 minutes."
            ],
            correctIndex: 1,
            feedback: "Right. The timer will tell you when the time has passed.",
            support: "A timer is an assistant in any preparation."
          },
          {
            title: "The timer rang",
            text: "The timer sounded - 30 minutes had passed.",
            options: [
              "Wait another hour.",
              "Don't react.",
              "Continue to next recipe step."
            ],
            correctIndex: 2,
            feedback: "That's right - the signal means “time is up.”",
            support: "A timer helps you keep track of time."
          }
        ],
        quiz: [
          {
            question: "What is a timer?",
            options: [
              "A clock that only shows the current time.",
              "Alarm clock for the morning.",
              "A clock that keeps time and rings."
            ],
            correctIndex: 2
          },
          {
            question: "Why a timer in cooking?",
            options: [
              "You can't cook without it.",
              "To make it beautiful.",
              "So as not to overdo it or skip a step."
            ],
            correctIndex: 2
          },
          {
            question: "30 minutes is how many seconds?",
            options: [
              "30 seconds.",
              "1800 seconds (half an hour).",
              "3000 seconds."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Together with your child, prepare a simple dish with a timer (egg, dough). Show how to set the time.",
        tags: [
          "apple pie",
          "Digital Household & Daily Economics",
          "Lesson 15"
        ],
        methodology: {
          objective: "Create a digital action - complete a recipe step by step with a digital timer - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: a step-by-step recipe with a timer",
            "create a step-by-step digital action algorithm",
            "reinforce the safety rule: hot oven - do not open without an adult",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital economy of everyday life”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short activities (revision builds on Lesson #14 (Reading a Recipe))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to follow the recipe step by step with a digital timer.",
              teacherDoes: [
                "Shows a problem situation on the topic “apple pie”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic \"apple pie\"",
                "Shows step-by-step recipe with timer"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Starts the task: find key points on the “step-by-step recipe with timer”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to make a recipe step by step with a digital timer” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens a step-by-step recipe with a timer",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with a step-by-step recipe and timer; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: pay attention to the apple pie at home and tell it at the next lesson.",
          safetyNote: "hot oven - do not open without an adult"
        },        trainer: {
          type: "recipe-timer",
          task: "Prepare apple pie step by step. When baking, start the timer.",
          feedbackCorrect: "Right! Step completed.",
          feedbackWrong: "It's still early. Look at the step and timer."
        }

      },
      {
        slug: "table-setting-scheme",
        title: "Table setting for dinner",
        duration: "1 hour",
        summary: "We arrange the cutlery on a digital table setting chart.",
        intro: "The diagram shows where the plate, fork, knife, spoon, and glass should be. The child arranges the cutlery according to the pattern. This is work with a sign-symbolic plan - it can be transferred to any schemes in everyday life.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Setting the table for dinner”",
        goals: [
          "Understand what serving is and why it is needed in life.",
          "Master digital action - arrange cutlery on a digital serving chart.",
          "Remember the safety rule: handle sharp instruments (knives) carefully."
        ],
        rules: [
          "First, open the serving diagram.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: handle sharp utensils (knives) carefully.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Where to put the fork?",
            text: "Setting the table for dinner. Where to put the fork?",
            options: [
              "To the right of the plate.",
              "To the left of the plate.",
              "On top of the plate."
            ],
            correctIndex: 1,
            feedback: "That's right - the fork is always on the left.",
            support: "This is a serving rule in many countries."
          },
          {
            title: "Dastarkhan and bowl",
            text: "Uzbek dinner: flatbread on the table, bowl with tea. Where to put the bowl?",
            options: [
              "Top-right of the plate - convenient to take with your right hand.",
              "In the center of the plate.",
              "On the floor."
            ],
            correctIndex: 0,
            feedback: "Fine. Bowl on the top right.",
            support: "Dastarkhan is a traditional Uzbek set table."
          }
        ],
        quiz: [
          {
            question: "What is most important in serving?",
            options: [
              "Order: each device is in its place.",
              "The more beautiful, the more chaos.",
              "Doesn't matter."
            ],
            correctIndex: 0
          },
          {
            question: "Why is there a napkin on the table?",
            options: [
              "Wipe your mouth and hands.",
              "Cover the food.",
              "It's just decoration."
            ],
            correctIndex: 0
          },
          {
            question: "Where does the knife go when serving?",
            options: [
              "On a plate.",
              "On the left with the fork.",
              "To the right of the plate, blade towards the plate."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Instruct the child to set the dastarkhan - the table for the family dinner. Praise for neatly arranged bowls and cutlery.",
        tags: [
          "serving",
          "Digital Household & Daily Economics",
          "Lesson 16"
        ],
        methodology: {
          objective: "Form a digital action—arrange cutlery on a digital serving chart—for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: serving scheme",
            "create a step-by-step digital action algorithm",
            "reinforce the safety rule: handle sharp utensils (knives) carefully",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital economy of everyday life”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short activities (revision based on lesson #15 (timer and pie))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to arrange cutlery on a digital serving chart.",
              teacherDoes: [
                "Shows a problematic situation on the topic “serving”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “serving”",
                "Shows serving diagram"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Triggers the task: find key places on the “serving diagram”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to arrange cutlery on a digital serving chart” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens the serving plan",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with the serving scheme; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to the table setting and tell it at the next lesson.",
          safetyNote: "Handle sharp utensils (knives) carefully"
        },
        trainer: {
          type: "table-setting",
          task: "Arrange the cutlery on the table according to the following pattern: plate, fork, knife, spoon, glass, napkin.",
          feedbackCorrect: "Well done! The serving is correct.",
          feedbackWrong: "This is not the place. Look at the diagram again."
        }
      },
      {
        slug: "family-income",
        title: "Family budget. Sources of income",
        duration: "1 hour",
        summary: "We enter the sources of family income into the digital form of the budget and see the result.",
        intro: "A simple form with fields: mom’s salary, dad’s salary, other income. The child enters the amounts and the platform itself calculates the total. This is an introduction to how online calculators and forms work.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Family budget. Sources of income\"",
        goals: [
          "Understand what a family budget is and why it is needed in life.",
          "Master digital action - enter income in digital form and get the result.",
          "Remember the safety rule: do not share your income with strangers on the Internet."
        ],
        rules: [
          "First, open the income form.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: do not share the amount of income with strangers on the Internet.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "What is family income?",
            text: "Dad received a salary of 6,000,000 sum, mother - 5,000,000.",
            options: [
              "There are no salaries.",
              "Total income - 11,000,000 sum.",
              "6,000,000 is all."
            ],
            correctIndex: 1,
            feedback: "Right. Incomes add up.",
            support: "A family's income is all the money it receives."
          },
          {
            title: "Grandmother received a pension",
            text: "Grandmother received a pension of 2,000,000 sum.",
            options: [
              "Pension does not count.",
              "Pension is also family income and is added to the total.",
              "This is only grandma’s money, it has nothing to do with the family."
            ],
            correctIndex: 1,
            feedback: "Right. Pension is part of family income.",
            support: "Any regular money to the family is income."
          }
        ],
        quiz: [
          {
            question: "What is included in family income?",
            options: [
              "Only dad's salary.",
              "Gifts only.",
              "Salaries, pensions, benefits, other income."
            ],
            correctIndex: 2
          },
          {
            question: "Why calculate total income?",
            options: [
              "To understand how much money is enough per month.",
              "It's not necessary.",
              "To brag."
            ],
            correctIndex: 0
          },
          {
            question: "Digital form of income is:",
            options: [
              "Paper envelope.",
              "Fields on the screen where amounts are entered.",
              "Picture."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Tell your child (without exact numbers) that family income is all money. Show the principle of addition.",
        tags: [
          "family budget",
          "Digital Household & Daily Economics",
          "Lesson 17"
        ],
        methodology: {
          objective: "Form a digital action - enter income in digital form and get the result - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: a form of income",
            "create a step-by-step digital action algorithm",
            "establish a safety rule: do not share the amount of income with strangers on the Internet",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital economy of everyday life”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short tasks (revision based on lesson #16 (serving))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to enter income in digital form and get the result.",
              teacherDoes: [
                "Shows a problematic situation on the topic “family budget”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “family budget”",
                "Shows income form"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Starts the task: find key places on the “income form”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to enter income in digital form and get the total” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens the income form",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with the form of income; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to the family budget and tell it at the next lesson.",
          safetyNote: "do not share the amount of income with strangers on the Internet"
        },
        trainer: {
          type: "family-income",
          task: "Add up all the family income and find out the total income for the month.",
          feedbackCorrect: "Right! This is the correct amount.",
          feedbackWrong: "This is not the same amount. Count again."
        }
      },
      {
        slug: "family-expenses",
        title: "Family expenses",
        duration: "1 hour",
        summary: "We fill out the table of expenses and compare them with income.",
        intro: "Table: food, utilities, transport, clothing. The child enters the amount of expenses and sees whether the family is within the budget. This is how the idea of ​​home planning is formed.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Family Expenses”",
        goals: [
          "Understand what expenses are and why they are needed in life.",
          "Master the digital action - fill out a digital table of expenses and compare with income.",
          "Remember the safety rule: spend less than you receive - otherwise there will be debt."
        ],
        rules: [
          "First, open the expenses table.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: spend less than you receive - otherwise there will be debt.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Income 11, spent 12",
            text: "The family received 11,000,000 soums and spent 12,000,000.",
            options: [
              "Everything is fine, this is the norm.",
              "You can spend even more.",
              "If you don't meet your budget, you need to cut costs."
            ],
            correctIndex: 2,
            feedback: "Right. Spending more than income is a problem.",
            support: "Knowing how to stick to a budget is the basis of saving."
          },
          {
            title: "Extra money in a month",
            text: "This month we received 11 and spent 9 million.",
            options: [
              "Urgently spend everything.",
              "You can save 2 million for the future.",
              "Hide and forget."
            ],
            correctIndex: 1,
            feedback: "Right. Extra money is savings.",
            support: "Procrastinating is a good habit."
          }
        ],
        quiz: [
          {
            question: "What are family expenses?",
            options: [
              "Only products.",
              "All the money the family spends.",
              "Gifts only."
            ],
            correctIndex: 1
          },
          {
            question: "Why fill out the expense table?",
            options: [
              "To brag.",
              "It's just training.",
              "To see where the money is going."
            ],
            correctIndex: 2
          },
          {
            question: "How to compare income and expenses?",
            options: [
              "No way.",
              "Income minus expenses = balance.",
              "Income plus expenses."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Show your child a simplified family budget (without amounts). Explain: we spend no more than we receive.",
        tags: [
          "expenses",
          "Digital Household & Daily Economics",
          "Lesson 18"
        ],
        methodology: {
          objective: "Create a digital action - fill out a digital table of expenses and compare with income - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: expense table",
            "create a step-by-step digital action algorithm",
            "establish a safety rule: spend less than you receive - otherwise there will be debt",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital economy of everyday life”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short assignments (revision based on lesson #17 (income))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to fill out a digital table of expenses and compare them with income.",
              teacherDoes: [
                "Shows a problematic situation on the topic “expenses”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic \"expenses\"",
                "Shows expense table"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Launches the task: find key places on the “expenses table”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to fill out a digital table of expenses and compare with income” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens the expenses table",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with the expense table; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to the expenses and tell them in the next lesson.",
          safetyNote: "spend less than received - otherwise there will be debt"
        },
        trainer: {
          type: "family-expenses",
          task: "Divide purchases into categories: food, transport, utilities, entertainment.",
          feedbackCorrect: "Well done! The purchase was accounted for correctly.",
          feedbackWrong: "This purchase is from a different category. Think again."
        }
      }
    ]
  },
  {
    slug: "digital-transport",
    title: "Digital Mobility & Transport",
    hours: "3 hours",
    lessonCount: 3,
    description: "Three lessons: a digital guide to modes of transport, reading a station board, and a multi-step scenario for buying a ticket online.",
    image: "/uzbek-images/shopping-market.jpg",
    imageAlt: "Digital transport - directory, scoreboard, tickets",
    imageCredit: "Mosaic",
    imageSourceUrl: "",
    knowledge: [
      "What types of transport are there?",
      "How does a station's digital display work?",
      "What are the steps to purchasing a ticket online?"
    ],
    skills: [
      "Search information in a digital directory",
      "Read the digital display and find the desired train",
      "Go through a multi-step online purchase"
    ],
    lessons: [
      {
        slug: "transport-types",
        title: "Types of transport",
        duration: "1 hour",
        summary: "We look for the desired type of transport in the digital directory and read the information card.",
        intro: "Directory of types of transport: bus, train, metro, taxi, plane. The child looks for the desired item and reads a short card. This is the ability to use search in reference books and applications.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Types of transport”",
        goals: [
          "Understand what types of transport are and why they are needed in life.",
          "Master the digital action - find the mode of transport in a digital directory.",
          "Remember the safety rule: safety rules in each type of transport."
        ],
        rules: [
          "First, open the transport directory.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision based on the rule: safety rules in each type of transport.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Need to go to another city",
            text: "Travel from Tashkent to Samarkand. What transport?",
            options: [
              "A train or bus is intercity transport.",
              "Scooter.",
              "Bike."
            ],
            correctIndex: 0,
            feedback: "That's right - they travel between cities by train and bus.",
            support: "The directory shows which transport goes where."
          },
          {
            title: "Where should you go to school?",
            text: "The school is 5 kilometers from home.",
            options: [
              "Train.",
              "Airplane.",
              "Bus, minibus or taxi."
            ],
            correctIndex: 2,
            feedback: "That's right - in the city they travel by bus.",
            support: "City transport - for short trips."
          }
        ],
        quiz: [
          {
            question: "What kind of transport is there in the city?",
            options: [
              "Only the plane.",
              "Only the train.",
              "Bus, taxi, metro, minibus."
            ],
            correctIndex: 2
          },
          {
            question: "Why do you need a transport directory?",
            options: [
              "To find a suitable route.",
              "To learn by heart.",
              "Nothing is possible without him."
            ],
            correctIndex: 0
          },
          {
            question: "If you go far (to another country):",
            options: [
              "Minibus.",
              "Airplane or long-distance train.",
              "Bike."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Tell your child what kind of transport you usually use. Show how to find a bus using the app.",
        tags: [
          "types of transport",
          "Digital Mobility & Transport",
          "Lesson 19"
        ],
        methodology: {
          objective: "Form a digital action - find a mode of transport in a digital directory - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: transport directory",
            "create a step-by-step digital action algorithm",
            "consolidate the safety rule: safety rules in each type of transport",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital Transport”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short assignments (revision based on Lesson #18 (Cost Chart))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to find a mode of transport in a digital directory.",
              teacherDoes: [
                "Shows a problematic situation on the topic “modes of transport”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “modes of transport”",
                "Shows transport directory"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Starts the task: find key places on the “transport directory”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to find a mode of transport in a digital directory” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens the transport directory",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with the transport directory; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to the types of transport and tell them at the next lesson.",
          safetyNote: "safety rules for each type of transport"
        },
        trainer: {
          type: "transport-types",
          task: "Where should you go? Choose suitable transport.",
          feedbackCorrect: "Right! This transport is suitable.",
          feedbackWrong: "This transport will not work. Think about the distance."
        }
      },
      {
        slug: "train-schedule-board",
        title: "Railway station information service, train schedule",
        duration: "1 hour",
        summary: "We read the digital display of the station and find the desired train, time and platform.",
        intro: "Imitation of a real station board. The child looks for a train in the list by direction and time and determines the platform. A train station display board is a digital object that you will definitely encounter in life.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Railway station help desk, train schedule”",
        goals: [
          "Understand what a station board is and why it is needed in life.",
          "Master the digital action - read the digital train schedule board.",
          "Remember the safety rule: cross paths only in permitted places."
        ],
        rules: [
          "First, open the station board.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: cross paths only in permitted places.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "There are a lot of trains on the board",
            text: "You need a train to Samarkand at 14:30. How to find?",
            options: [
              "Leave the station.",
              "Read each line, find “Samarkand” and “14:30”.",
              "Sit on the first one you come across."
            ],
            correctIndex: 1,
            feedback: "That's right - the right train in direction and time.",
            support: "On the board on the left there is a train, time, platform."
          },
          {
            title: "Platform in the scoreboard - 3",
            text: "Your train line says \"Platform 3\".",
            options: [
              "Go to platform 1.",
              "Go to platform number 3.",
              "Sit anywhere."
            ],
            correctIndex: 1,
            feedback: "Right. The platform is the place from where the train departs.",
            support: "The platform on the scoreboard is an indication of where to go."
          }
        ],
        quiz: [
          {
            question: "What is shown on the scoreboard?",
            options: [
              "Train number, direction, time and platform.",
              "Only time.",
              "Only the price."
            ],
            correctIndex: 0
          },
          {
            question: "If you don't make it on time:",
            options: [
              "Leave the station.",
              "Go to the help desk.",
              "Take any train."
            ],
            correctIndex: 1
          },
          {
            question: "How many platforms are there usually at the station?",
            options: [
              "Several - you need to look for yours.",
              "One hundred.",
              "Always alone."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "When you are at the station, show your child how to read the board. Find the right train together.",
        tags: [
          "station board",
          "Digital Mobility & Transport",
          "Lesson 20"
        ],
        methodology: {
          objective: "Create a digital action - read the digital train schedule board - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: a station board",
            "create a step-by-step digital action algorithm",
            "establish a safety rule: cross paths only in permitted places",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital Transport”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short tasks (repetition based on lesson No. 19 (types of transport))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to read the digital train schedule board.",
              teacherDoes: [
                "Shows a problematic situation on the topic “station display board”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “station display board”",
                "Shows the station board"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Triggers the task: find key places on the “station board”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to read a digital train timetable” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens the station board",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with the station display board; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to the station display and tell it at the next lesson.",
          safetyNote: "cross paths only in permitted places"
        },
        trainer: {
          type: "schedule-board",
          task: "Find your train on the station board by city and time.",
          feedbackCorrect: "Right! This is your train.",
          feedbackWrong: "This is not your train. Look at the city and the time."
        }
      },
      {
        slug: "online-ticket-purchase",
        title: "Procedure for purchasing tickets and returning them",
        duration: "1 hour",
        summary: "We buy a ticket online: select the direction, date, place and confirm the purchase.",
        intro: "Multi-step scenario for buying a ticket: choosing a route, date, place, payment. The child goes through all stages under the supervision of the teacher. It is an independent and meaningful digital skill to buy a ticket.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Procedure for purchasing tickets and returning them”",
        goals: [
          "Understand what buying a ticket is and why you need it in life.",
          "Master the digital action - buy a ticket online (safe training scenario).",
          "Remember the safety rule: check the site; Do not enter data on other people's devices."
        ],
        rules: [
          "First, open the ticket purchasing service.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: check the site; Do not enter data on other people's devices.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Confirm purchase",
            text: "On the screen: “Buy a ticket for 120,000 soum?”",
            options: [
              "Click “Confirm” without looking.",
              "Check the direction and date, then confirm.",
              "Close page."
            ],
            correctIndex: 1,
            feedback: "Right. Always check before paying.",
            support: "Inattention leads to mistaken purchases."
          },
          {
            title: "The site does not open",
            text: "The ticket sales site is not working.",
            options: [
              "Give up the idea of ​​going.",
              "Buy from a suspicious site.",
              "Come back later or go to the cashier."
            ],
            correctIndex: 2,
            feedback: "Good - better a cash register than a suspicious site.",
            support: "Never buy from dubious sites."
          }
        ],
        quiz: [
          {
            question: "What are the steps involved in purchasing a ticket online?",
            options: [
              "One step is “buy”.",
              "Select destination → date → place → payment → confirmation.",
              "Payment only."
            ],
            correctIndex: 1
          },
          {
            question: "Before payment you need:",
            options: [
              "Reload the page.",
              "Immediately click “Pay”.",
              "Check direction, date and amount."
            ],
            correctIndex: 2
          },
          {
            question: "If you made a mistake in the date:",
            options: [
              "Return and buy again.",
              "Be silent.",
              "Go anyway."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "The next time you travel, show your child how you buy a ticket online. Explain what to check.",
        tags: [
          "buying a ticket",
          "Digital Mobility & Transport",
          "Lesson 21"
        ],
        methodology: {
          objective: "Form a digital action - buy a ticket online (safe educational scenario) - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: ticket purchasing service",
            "create a step-by-step digital action algorithm",
            "establish a safety rule: check the site; do not enter data on other people's devices",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital Transport”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short tasks (repetition based on lesson No. 20 (scoreboard))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to buy a ticket online (safe training scenario).",
              teacherDoes: [
                "Shows a problematic situation on the topic “buying a ticket”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “buying a ticket”",
                "Shows ticket purchasing service"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Launches a task: find key places on the “ticket purchasing service”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to buy a ticket online (safe training scenario)” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens a ticket purchasing service",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with the ticket purchasing service; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to the purchase of a ticket and tell it in the next lesson.",
          safetyNote: "check the site; do not enter data on other people's devices"
        },        trainer: {
          type: "ticket-purchase",
          task: "Buy a ticket online: select the route, date, place and pay.",
          feedbackCorrect: "Well done! Ticket purchased.",
          feedbackWrong: "This is not the right step. Try again."
        }

      }
    ]
  },
  {
    slug: "digital-communication",
    title: "Digital Communication & Messaging",
    hours: "3 hours",
    lessonCount: 3,
    description: "Three lessons: tracking a package by track number, working with the phone (call and SMS) and a key lesson in the study - sending a message in the messenger.",
    image: "/uzbek-images/shopping-market.jpg",
    imageAlt: "Digital communication - parcels, telephone, messenger",
    imageCredit: "Mosaic",
    imageSourceUrl: "",
    knowledge: [
      "What is a track number and how does it work?",
      "How to use the phone - call and SMS",
      "What is messenger and how to send a message"
    ],
    skills: [
      "Enter data and read parcel status",
      "Make calls and send SMS",
      "Select a contact and send a message in messenger"
    ],
    lessons: [
      {
        slug: "package-tracking",
        title: "Postal items: letters, parcels, money orders",
        duration: "1 hour",
        summary: "We track the parcel using the track number and find out where it is now.",
        intro: "On the tracking page you need to enter the parcel number. After checking, the following statuses appear: shipped, on the way, delivered. A modern family receives parcels regularly - this is something you need to be able to do.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Postage: letters, parcels, money orders”",
        goals: [
          "Understand what parcels are and why they are needed in life.",
          "Master the digital action - track the parcel using the track number.",
          "Remember the safety rule: pick up the parcel only in verified places; take care of the track number."
        ],
        rules: [
          "First, open the tracking page.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: pick up the parcel only in verified places; take care of the track number.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Where can I find the tracking number?",
            text: "Mom ordered a parcel and asked for tracking.",
            options: [
              "In the message or receipt from the store - there is a number.",
              "Ask your neighbor.",
              "Guess at random."
            ],
            correctIndex: 0,
            feedback: "Right. The track number is always provided by the store.",
            support: "You can't track it without a track number."
          },
          {
            title: "The status is “delivered”, but there is no parcel",
            text: "The website says “delivered”, but the parcel was not received.",
            options: [
              "Wait another month.",
              "Call the delivery service and find out where they delivered it.",
              "Forget."
            ],
            correctIndex: 1,
            feedback: "Right. Find out immediately where the package is.",
            support: "Sometimes “delivered” means given to a neighbor."
          }
        ],
        quiz: [
          {
            question: "What is a tracking number?",
            options: [
              "Apartment number.",
              "Unique parcel tracking number.",
              "Car number."
            ],
            correctIndex: 1
          },
          {
            question: "What are the parcel statuses?",
            options: [
              "There are no statuses.",
              "Dispatched → on the way → delivered.",
              "Only \"sent\"."
            ],
            correctIndex: 1
          },
          {
            question: "If the package is on the way for a long time:",
            options: [
              "Call the delivery service and find out the reason.",
              "Do nothing.",
              "Order a new one."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "When you receive your next parcel, show your child how to track it by number.",
        tags: [
          "parcels",
          "Digital Communication & Messaging",
          "Lesson 22"
        ],
        methodology: {
          objective: "Create a digital action - track a parcel by track number - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: tracking page",
            "create a step-by-step digital action algorithm",
            "establish a safety rule: pick up parcels only in verified places; take care of the track number",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital Communication”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short tasks (revision based on lesson #21 (buying a ticket))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to track a parcel using the track number.",
              teacherDoes: [
                "Shows a problematic situation on the topic “parcels”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “parcels”",
                "Shows tracking page"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Runs a task: find key places on the “tracking page”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to track a parcel by track number” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens the tracking page",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with the tracking page; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to the messages and tell them at the next lesson.",
          safetyNote: "pick up parcels only from verified places; take care of the track number"
        },        trainer: {
          type: "package-tracking",
          task: "Enter the track number and find out where your package is now.",
          feedbackCorrect: "Right! This is the correct status.",
          feedbackWrong: "This is not the same status. Look at the parcel list."
        }

      },
      {
        slug: "phone-calls-sms",
        title: "Rules for using modern means of communication",
        duration: "1 hour",
        summary: "Learning to use the phone: call, SMS, contact list.",
        intro: "There is a phone on the screen. The child selects a contact, makes a call or sends a short message. He also learns number 103 - in case of calling an ambulance.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Rules for using modern means of communication”",
        goals: [
          "Understand what a call and SMS are and why they are needed in life.",
          "Master the digital action - make a call and send an SMS on your phone.",
          "Remember the safety rule: do not answer calls from unfamiliar numbers; know 103 and 112."
        ],
        rules: [
          "First, open your phone with contacts.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: do not answer calls from unfamiliar numbers; know 103 and 112.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Someone got hurt",
            text: "A man was seriously injured on the street and needs urgent help.",
            options: [
              "Write an SMS to a friend.",
              "Be silent.",
              "Call 103 - ambulance."
            ],
            correctIndex: 2,
            feedback: "Right. 103 - ambulance.",
            support: "Also 112 is a single emergency number."
          },
          {
            title: "An unknown number is calling",
            text: "A number is calling that is not in my contacts.",
            options: [
              "You don't have to answer; if it’s important, your parents will call you back.",
              "Be sure to answer.",
              "Give a stranger your address."
            ],
            correctIndex: 0,
            feedback: "Fine. It is not necessary to answer strangers.",
            support: "Fraudsters often call from other people's numbers."
          }
        ],
        quiz: [
          {
            question: "What is the number for the ambulance?",
            options: [
              "None.",
              "01.",
              "103."
            ],
            correctIndex: 2
          },
          {
            question: "SMS is:",
            options: [
              "Photography.",
              "Call.",
              "Short text message."
            ],
            correctIndex: 2
          },
          {
            question: "What's in your contact list?",
            options: [
              "Just my number.",
              "All numbers in the world.",
              "Names and numbers of acquaintances."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Write down the numbers in your child’s phone: mom, dad, ambulance (103), police (102). Make sure he recognizes them.",
        tags: [
          "call and SMS",
          "Digital Communication & Messaging",
          "Lesson 23"
        ],
        methodology: {
          objective: "Create a digital action - make a call and send an SMS on the phone - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: a phone with contacts",
            "create a step-by-step digital action algorithm",
            "establish a safety rule: do not answer calls from unfamiliar numbers; know 103 and 112",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital Communication”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short tasks (repetition based on lesson No. 22 (track number))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to make a call and send an SMS on your phone.",
              teacherDoes: [
                "Shows a problematic situation on the topic “call and SMS”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens information text on the topic “call and SMS”",
                "Shows phone number with contacts"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Starts the task: find key places on the “phone with contacts”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to make a call and send SMS on your phone” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens the phone with contacts",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with a phone with contacts; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to the call and SMS and tell it at the next lesson.",
          safetyNote: "do not answer calls from unknown numbers; know 103 and 112"
        },        trainer: {
          type: "phone-call-flow",
          task: "Do the right thing with the phone call.",
          feedbackCorrect: "Right!",
          feedbackWrong: "It's not safe. Try a different action."
        }

      },
      {
        slug: "messenger-message",
        title: "Internet sites and applications (email, Telegram, WhatsApp)",
        duration: "1 hour",
        summary: "We send a message in the messenger: select a contact and write politely.",
        intro: "On the screen is a chat in a messenger like Telegram or WhatsApp. The child chooses what to answer to mom or teacher and sends a message. This is a key research skill - correspondence in the messenger as a modern form of communication.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Internet sites and applications (email, Telegram, WhatsApp)”",
        goals: [
          "Understand what messengers are and why they are needed in life.",
          "Master the digital action - send a message in the messenger.",
          "Remember the safety rule: do not communicate with strangers; do not send personal information."
        ],
        rules: [
          "First, open the messenger.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: do not communicate with strangers; do not send personal information.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Mom wrote “Where are you?”",
            text: "Mom sent a message “Where are you?”",
            options: [
              "Answer politely: “Hi, mom! I’m at school, everything’s fine.”",
              "Write “leave me alone.”",
              "Don't answer."
            ],
            correctIndex: 0,
            feedback: "Fine. A polite response is the basis of communication.",
            support: "Mom always needs to answer messages."
          },
          {
            title: "A stranger writes in chat",
            text: "Writes from a person you don't know.",
            options: [
              "Do not respond and show the message to an adult.",
              "Reply immediately and make friends.",
              "Give your address."
            ],
            correctIndex: 0,
            feedback: "Right. We do not respond to strangers online.",
            support: "This is an internet safety rule."
          }
        ],
        quiz: [
          {
            question: "What is a messenger?",
            options: [
              "Messaging app.",
              "Game.",
              "Calculator."
            ],
            correctIndex: 0
          },
          {
            question: "How to start a message to mom?",
            options: [
              "No greeting.",
              "“Hello, mom!” or just “Mom.”",
              "In capital letters \"SCREAM\"."
            ],
            correctIndex: 1
          },
          {
            question: "If a stranger asks for a photo:",
            options: [
              "Send immediately.",
              "Ask why it is necessary.",
              "Don't send it, tell an adult."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Make an agreement with your child: we don’t communicate with strangers online. We show any suspicious message to an adult.",
        tags: [
          "messengers",
          "Digital Communication & Messaging",
          "Lesson 24"
        ],
        methodology: {
          objective: "Create a digital action - send a message in the messenger - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: messenger",
            "create a step-by-step digital action algorithm",
            "establish a safety rule: do not communicate with strangers; do not send personal data",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital Communication”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short tasks (repetition based on lesson No. 23 (call and SMS))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to send a message in messenger.",
              teacherDoes: [
                "Shows a problematic situation on the topic “messengers”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “messengers”",
                "Shows messenger"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Launches the task: find key places on the “messenger”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to send a message in messenger” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens messenger",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with the messenger; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: pay attention to messengers at home and tell them in the next lesson.",
          safetyNote: "do not communicate with strangers; do not send personal data"
        },        trainer: {
          type: "messenger-flow",
          task: "Read the message and choose the correct answer.",
          feedbackCorrect: "Right! This is a good answer.",
          feedbackWrong: "This answer is not suitable. Think again."
        }

      }
    ]
  },
  {
    slug: "digital-safety",
    title: "Online Safety & Security",
    hours: "1 hour",
    lessonCount: 1,
    description: "A lesson that purposefully forms the security component of the FCG - etiquette and safety on the Internet.",
    image: "/uzbek-images/shopping-market.jpg",
    imageAlt: "Digital Security - Online Behavior",
    imageCredit: "Mosaic",
    imageSourceUrl: "",
    knowledge: [
      "What is personal data and why it should not be disclosed",
      "How to distinguish a safe situation from a dangerous one",
      "What to do if online communication becomes unpleasant"
    ],
    skills: [
      "Recognize dangerous digital situations",
      "Choose safe behavior",
      "Seek help from an adult"
    ],
    lessons: [
      {
        slug: "internet-safety-etiquette",
        title: "Rules of conduct and etiquette for communicating on the Internet",
        duration: "1 hour",
        summary: "We learn to distinguish safe situations on the Internet from dangerous ones and react correctly.",
        intro: "On the screen there are cards with situations: a stranger asks for an address, a friend invites you to play, someone sent a strange link. The child chooses safe behavior in every situation. This is a defensive skill for life online.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Rules of behavior and etiquette for communicating on the Internet”",
        goals: [
          "Understand what online security is and why it is needed in life.",
          "Master digital action - distinguish between safe and dangerous digital situations.",
          "Remember the safety rule: do not open links from strangers; Do not forward other people's photos."
        ],
        rules: [
          "First, open the situation cards.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: do not open links from strangers; Do not forward other people's photos.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "“Send me your address and I’ll send you a gift.”",
            text: "A stranger in a chat promises to send a gift for your home address.",
            options: [
              "Send the address - after all, they promise a gift.",
              "Ask what kind of gift it is.",
              "Close the chat and tell an adult."
            ],
            correctIndex: 2,
            feedback: "Right. There are no gifts from strangers.",
            support: "Personal data is always a secret."
          },
          {
            title: "A friend sent me a link",
            text: "A friend sent “Look, cool game” with a suspicious link.",
            options: [
              "Forward to the whole class.",
              "First, ask a friend in person what it is.",
              "Press immediately."
            ],
            correctIndex: 1,
            feedback: "Fine. A friend's account may have been hacked.",
            support: "Suspicious links - do not click."
          }
        ],
        quiz: [
          {
            question: "What is personal data?",
            options: [
              "No personal information.",
              "Address, phone number, parents' name.",
              "Only the name."
            ],
            correctIndex: 1
          },
          {
            question: "Who can I give my address to?",
            options: [
              "Everyone.",
              "Only family and loved ones - no one online.",
              "To a stranger with the promise of a gift."
            ],
            correctIndex: 1
          },
          {
            question: "If you feel uncomfortable in the chat:",
            options: [
              "Close the chat and tell an adult.",
              "Endure.",
              "It's rude to answer."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "Explain to your child: there are a lot of scammers on the Internet. Any “gifts” or “winnings” are a scam. Personal - no one.",
        tags: [
          "online security",
          "Online Safety & Security",
          "Lesson 25"
        ],
        methodology: {
          objective: "Form digital action - distinguish between safe and dangerous digital situations - among 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: situation cards",
            "create a step-by-step digital action algorithm",
            "establish a safety rule: do not open links from strangers; do not forward other people's photos",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital Security”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short tasks (repetition based on lesson No. 24 (messenger))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn to distinguish between safe and dangerous digital situations.",
              teacherDoes: [
                "Shows a problematic situation on the topic “network security”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “online safety”",
                "Shows situation cards"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Starts the task: find key places on the “situation cards”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to distinguish between safe and dangerous digital situations” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Reveals situation cards",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with situation cards; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to online safety and talk about it in the next lesson.",
          safetyNote: "do not open links from strangers; do not forward other people's photos"
        },        trainer: {
          type: "safety-etiquette",
          task: "Decide which situation is safe and which is dangerous.",
          feedbackCorrect: "Right! This is what you need to do.",
          feedbackWrong: "This is a different situation. Think about safety."
        }

      }
    ]
  },
  {
    slug: "digital-public-services",
    title: "Digital Public Services & Banking",
    hours: "3 hours",
    lessonCount: 3,
    description: "Three lessons: filling out an electronic application on the government services portal, safe operation of an ATM and PIN code protection, critical reading of a digital loan agreement.",
    image: "/uzbek-images/shopping-market.jpg",
    imageAlt: "Digital government services - portal, ATM, contract",
    imageCredit: "Mosaic",
    imageSourceUrl: "",
    knowledge: [
      "What is a public services portal and why is it needed?",
      "How does an ATM work and why do you need a PIN code?",
      "What is a loan and why is it important to read the agreement?"
    ],
    skills: [
      "Fill out the electronic application form",
      "Withdraw money from an ATM while protecting your PIN code",
      "Read the digital contract and find key terms"
    ],
    lessons: [
      {
        slug: "public-appeals-portal",
        title: "Rules for citizens to contact government bodies",
        duration: "1 hour",
        summary: "We submit an electronic application on the government services portal step by step.",
        intro: "Public services portal: the child selects a service (for example, a certificate of family composition) and fills out an electronic form. This is how he gets acquainted with the portal where most matters with the state are resolved today.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Rules for citizens to apply to government bodies”",
        goals: [
          "Understand what public services are and why they are needed in life.",
          "Master digital action - fill out an electronic application on the government services portal.",
          "Remember the security rule: do not enter personal data on suspicious sites."
        ],
        rules: [
          "First, open the government services portal.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: do not enter personal data on suspicious sites.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "We need a certificate of family composition",
            text: "Mom needs a certificate of family composition.",
            options: [
              "Ask your neighbor.",
              "You can submit an application online through the government services portal.",
              "Just go in line."
            ],
            correctIndex: 1,
            feedback: "Right. The portal is convenient and fast.",
            support: "Many documents are received via the Internet."
          },
          {
            title: "Didn't fill out all fields of the form",
            text: "I filled out half of the form and clicked “Submit.”",
            options: [
              "Close page.",
              "The application will fly away without half the data.",
              "A message will appear asking what else to fill out. Fill out and resubmit."
            ],
            correctIndex: 2,
            feedback: "Right. The portal checks if everything is filled out.",
            support: "Empty fields are usually highlighted."
          }
        ],
        quiz: [
          {
            question: "What is a public services portal?",
            options: [
              "Social network.",
              "State website for receiving services online.",
              "Entertainment application."
            ],
            correctIndex: 1
          },
          {
            question: "What do you fill out in the electronic application?",
            options: [
              "Only the name.",
              "Full name, date of birth, address and other data.",
              "Nothing."
            ],
            correctIndex: 1
          },
          {
            question: "Why confirmation from government agencies?",
            options: [
              "To confuse.",
              "It's not necessary.",
              "To know that the application has been accepted."
            ],
            correctIndex: 2
          }
        ],
        adultNote: "Show your child the my.gov.uz portal. Explain that this is the official website of the state - they receive documents there.",
        tags: [
          "public services",
          "Digital Public Services & Banking",
          "Lesson 27"
        ],
        methodology: {
          objective: "Form a digital action - fill out an electronic application on the government services portal - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: public services portal",
            "create a step-by-step digital action algorithm",
            "establish a security rule: do not enter personal data on suspicious sites",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital public services”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short activities (revision based on lesson #26 (thermometer))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to fill out an electronic application on the government services portal.",
              teacherDoes: [
                "Shows a problematic situation on the topic of “public services”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “public services”",
                "Shows the government services portal"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Launches a task: find key places on the “public services portal”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to fill out an electronic application on the government services portal” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens a government services portal",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with the government services portal; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to government services and talk about them in the next lesson.",
          safetyNote: "do not enter personal data on suspicious sites"
        },        trainer: {
          type: "mygov-portal",
          task: "Submit an application on the my.gov portal: select a service, fill out the form, confirm by SMS.",
          feedbackCorrect: "Well done! The application has been accepted.",
          feedbackWrong: "This is not the right step. Try again."
        }

      },
      {
        slug: "atm-cash-withdrawal",
        title: "Sberbank. Main functions of the bank",
        duration: "1 hour",
        summary: "We withdraw money from an ATM: insert the card, enter the PIN code, select the amount, take the card and money.",
        intro: "There is an ATM on the screen. The child goes through all five steps of withdrawing money and always learns to cover the keyboard with his hand when entering the PIN code. This is safe training for a real operation that the graduate will have to face on their own.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Sberbank. Main functions of the bank\"",
        goals: [
          "Understand what an ATM is and why it is needed in life.",
          "Master the digital action - withdraw money from an ATM.",
          "Remember the safety rule: don’t tell anyone your PIN; cover with your hand when entering."
        ],
        rules: [
          "First open the ATM.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: don’t tell anyone your PIN; cover with your hand when entering.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "Neighbor asks to see PIN",
            text: "You are standing at an ATM. A stranger nearby asks “Help enter the code.”",
            options: [
              "Tell him your PIN.",
              "Show map.",
              "Refuse and cover the keyboard with your hand."
            ],
            correctIndex: 2,
            feedback: "Right. PIN is a secret that only you know.",
            support: "Fraudsters often pretend to be “assistants” at the ATM."
          },
          {
            title: "Forgot to pick up the card",
            text: "I withdrew the money and went, forgot the card in the ATM.",
            options: [
              "Urgently return and pick up; If they have already taken it, call the bank.",
              "Buy a new card.",
              "It's okay, don't come back."
            ],
            correctIndex: 0,
            feedback: "Right. You must pick up the card immediately.",
            support: "Without a card, the money will go to whoever finds it."
          }
        ],
        quiz: [
          {
            question: "What is a PIN code?",
            options: [
              "Secret 4-digit code from the card.",
              "Card number.",
              "Phone number."
            ],
            correctIndex: 0
          },
          {
            question: "Who can I tell my PIN to?",
            options: [
              "To mom and dad.",
              "Anyone who asks.",
              "No one."
            ],
            correctIndex: 2
          },
          {
            question: "When entering your PIN you need to:",
            options: [
              "Show everyone.",
              "Cover the keyboard with your hand.",
              "Say the numbers loudly."
            ],
            correctIndex: 1
          }
        ],
        adultNote: "Go to the ATM with your child (without withdrawing). Show the steps: insert card → enter PIN secretly → pick up.",
        tags: [
          "ATM",
          "Digital Public Services & Banking",
          "Lesson 28"
        ],
        methodology: {
          objective: "Create a digital action - withdraw money from an ATM - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: ATM",
            "create a step-by-step digital action algorithm",
            "establish a security rule: don’t tell anyone your PIN; cover with your hand when typing",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital public services”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short tasks (repetition based on lesson No. 27 (public services))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to withdraw money from an ATM.",
              teacherDoes: [
                "Shows a problematic situation on the topic “ATM”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic \"ATM\"",
                "Shows ATM"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Starts the task: find key places on the “ATM”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to withdraw money from an ATM” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens an ATM",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Operate an ATM independently; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: pay attention to the ATM at home and tell it at the next lesson.",
          safetyNote: "Do not tell your PIN to anyone; cover with your hand when typing"
        },        trainer: {
          type: "atm",
          task: "Withdraw money from an ATM: insert the card, enter the PIN, select the amount.",
          feedbackCorrect: "Right! The money has been received.",
          feedbackWrong: "It's not safe. Think again."
        }

      },
      {
        slug: "credit-contract-reading",
        title: "Credit. Main types of loans",
        duration: "1 hour",
        summary: "We read the loan agreement and find key terms in it - rate and term.",
        intro: "Simplified text of the contract. The child is looking for three important points: loan amount, interest rate, term. Learning to find key information in a long document is a typical defensive skill.",
        image: "/uzbek-images/shopping-market.jpg",
        imageAlt: "Illustration for the lesson “Credit. Main types of loans\"",
        goals: [
          "Understand what a loan is and why it is needed in life.",
          "Master digital action - read the digital contract and find the key terms.",
          "Remember the safety rule: do not sign the contract without reading it; Always consult an adult."
        ],
        rules: [
          "First, open the digital contract.",
          "Find key places - they are marked with a pictogram.",
          "Make a decision according to the rule: do not sign an agreement without reading it; Always consult an adult.",
          "If you're not sure, ask an adult."
        ],
        scenarios: [
          {
            title: "The bank offers a loan “without interest”",
            text: "The advertisement says “Credit without interest!”",
            options: [
              "Read the fine print of the contract - there may be conditions.",
              "Take it urgently.",
              "Verify and hand over your passport."
            ],
            correctIndex: 0,
            feedback: "Right. “No interest” is often a clever advertisement.",
            support: "Unfavorable conditions are hidden in small print."
          },
          {
            title: "You don't understand the contract",
            text: "There are many unclear words in the contract.",
            options: [
              "Sign and think later.",
              "Sign any document.",
              "Do not sign and ask for help from an adult or lawyer."
            ],
            correctIndex: 2,
            feedback: "Right. We don’t sign an unclear contract.",
            support: "Any signatures are only after understanding."
          }
        ],
        quiz: [
          {
            question: "What is a loan?",
            options: [
              "Borrowed money from a bank with interest.",
              "For free.",
              "Gift from the bank."
            ],
            correctIndex: 0
          },
          {
            question: "Where are the important terms in the contract?",
            options: [
              "Often in small print - you need to read carefully.",
              "There are none.",
              "Only in the title."
            ],
            correctIndex: 0
          },
          {
            question: "If you are not sure about the contract:",
            options: [
              "Do not sign, consult with an adult.",
              "Ignore.",
              "Sign anyone."
            ],
            correctIndex: 0
          }
        ],
        adultNote: "Show your child what a real contract (any contract) looks like. Explain why it is important to read it before signing.",
        tags: [
          "loan",
          "Digital Public Services & Banking",
          "Lesson 29"
        ],
        methodology: {
          objective: "Form a digital action - read the digital contract and find key terms - for 7th grade students with intellectual disabilities (F70).",
          tasks: [
            "introduce a digital object: digital contract",
            "create a step-by-step digital action algorithm",
            "establish a safety rule: do not sign an agreement without reading it; always consult an adult",
            "ensure the transfer of digital action into everyday situations"
          ],
          materials: [
            "Mosaic Platform (section “Digital public services”)",
            "Tablets/laptops by number of students or 1 to 2",
            "Interactive whiteboard/projector",
            "2-3 real objects related to the lesson topic (for demonstration)"
          ],
          stages: [
            {
              duration: "5 min",
              title: "Repetition (“digital warm-up”)",
              teacherDoes: [
                "Opens the “Digital Warm-up” section",
                "Offers 3 short activities (revision based on lesson #28 (ATM))"
              ],
              studentActivity: "Do short tasks from the last lesson"
            },
            {
              duration: "3 min",
              title: "Motivational-target stage",
              teacherSays: "Today we will learn how to read a digital contract and find key terms.",
              teacherDoes: [
                "Shows a problematic situation on the topic “credit”"
              ],
              studentActivity: "Consider the situation; formulate a goal"
            },
            {
              duration: "10 min",
              title: "Indicative Framework for Action (IBA)",
              teacherDoes: [
                "Opens informational text on the topic “credit”",
                "Shows digital contract"
              ],
              studentActivity: "Listen to the voiceover; look at the screen"
            },
            {
              duration: "7 min",
              title: "Materialized action",
              teacherDoes: [
                "Starts the task: find key places on the “digital agreement”",
                "Monitors and helps individually"
              ],
              studentActivity: "Mark key places; receive feedback",
              hint: "Diagnostic point 1"
            },
            {
              duration: "2 min",
              title: "Physical education minute",
              teacherDoes: [
                "Includes animated physical education lesson"
              ],
              studentActivity: "Repeat simple movements"
            },
            {
              duration: "7 min",
              title: "Loud action",
              teacherDoes: [
                "Opens the instructional text “How to read a digital contract and find key terms” - 3 steps",
                "Organizes work in pairs"
              ],
              studentActivity: "They say the steps out loud; work in pairs",
              hint: "Diagnostic point 2"
            },
            {
              duration: "7 min",
              title: "Action in external speech to oneself",
              teacherDoes: [
                "Opens a digital contract",
                "Gives you the task to perform the action yourself"
              ],
              studentActivity: "Work independently with a digital contract; repeat 3 times",
              hint: "Diagnostic point 3 is key"
            },
            {
              duration: "5 min",
              title: "Mental action. Reflection",
              teacherDoes: [
                "Opens a sorting task",
                "Gives an oral observation task"
              ],
              studentActivity: "Perform sorting; choose a mood emoticon"
            }
          ],
          differentiation: "For the strong - the 4th example on your own. For those who find it more difficult to cope, work in pairs with a teacher and additional “Listen” calls.",
          homework: "Oral observation task: at home, pay attention to the credit and tell it at the next lesson.",
          safetyNote: "do not sign an agreement without reading it; always consult an adult"
        },        trainer: {
          type: "credit-contract",
          task: "Read the loan agreement: find the amount, interest, term and total repayment.",
          feedbackCorrect: "Well done! You have read the important points.",
          feedbackWrong: "This is not the point. Look again."
        }

      }
    ]
  }
];

export const allLessons: ProgramLesson[] = programModules.flatMap((module) =>
  module.lessons.map((lesson) => ({
    ...lesson,
    imageCredit: lesson.imageCredit ?? module.imageCredit,
    imageSourceUrl: lesson.imageSourceUrl ?? module.imageSourceUrl,
    moduleSlug: module.slug,
    moduleTitle: module.title,
    moduleHours: module.hours,
  })),
);

export const displayLessons: ProgramLesson[] = programModules.flatMap((module) =>
  module.lessons.slice(0, module.lessonCount).map((lesson) => ({
    ...lesson,
    imageCredit: lesson.imageCredit ?? module.imageCredit,
    imageSourceUrl: lesson.imageSourceUrl ?? module.imageSourceUrl,
    moduleSlug: module.slug,
    moduleTitle: module.title,
    moduleHours: module.hours,
  })),
);

export const lessonCount = displayLessons.length;

export function getLessonBySlug(slug: string) {
  return allLessons.find((lesson) => lesson.slug === slug);
}

export const featuredLesson =
  getLessonBySlug("messenger-message") ?? displayLessons[0];

import type { Locale } from "@/lib/i18n-shared";

export const programModulesByLocale: Record<Locale, ProgramModule[]> = {
  ru: programModules,
  uz: programModules,
};

export function getProgramModules(locale: Locale): ProgramModule[] {
  return programModulesByLocale[locale];
}

export function getAllLessons(locale: Locale): ProgramLesson[] {
  return getProgramModules(locale).flatMap((module) =>
    module.lessons.map((lesson) => ({
      ...lesson,
      imageCredit: lesson.imageCredit ?? module.imageCredit,
      imageSourceUrl: lesson.imageSourceUrl ?? module.imageSourceUrl,
      moduleSlug: module.slug,
      moduleTitle: module.title,
      moduleHours: module.hours,
    })),
  );
}

export function getDisplayLessons(locale: Locale): ProgramLesson[] {
  return getProgramModules(locale).flatMap((module) =>
    module.lessons.slice(0, module.lessonCount).map((lesson) => ({
      ...lesson,
      imageCredit: lesson.imageCredit ?? module.imageCredit,
      imageSourceUrl: lesson.imageSourceUrl ?? module.imageSourceUrl,
      moduleSlug: module.slug,
      moduleTitle: module.title,
      moduleHours: module.hours,
    })),
  );
}

export function getLessonBySlugLocalized(
  slug: string,
  locale: Locale,
): ProgramLesson | undefined {
  return getAllLessons(locale).find((lesson) => lesson.slug === slug);
}

export function getFeaturedLesson(locale: Locale): ProgramLesson {
  return (
    getLessonBySlugLocalized("messenger-message", locale) ??
    getDisplayLessons(locale)[0]
  );
}

export function getPlatformHighlights(locale: Locale): string[] {
  return locale === "uz" ? platformHighlightsUz : platformHighlights;
}
