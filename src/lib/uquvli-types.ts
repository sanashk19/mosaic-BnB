import type { AccessibilityProfile } from "@/lib/adaptation/adaptation-types";

export type UserRole = "student" | "parent" | "teacher" | "researcher";

export type StudentGroup = "experimental" | "control";

export type UserProfile = {
  childName: string;
  childClass: string;
  teacherName: string;
  organizationName: string;
  supportNotes: string;
  accessibilityProfile?: AccessibilityProfile;
};

export type ProgressEntry = {
  lessonSlug: string;
  completedAt: string;
  score?: number;
};

export type ClassState = {
  openLessonSlug: string | null;
  openedAt: string | null;
};

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  progress: ProgressEntry[];
  profile: UserProfile;
  studentCode?: string;
  teacherId?: string;
  group?: StudentGroup;
  accessibilityProfile?: AccessibilityProfile;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  profile: UserProfile;
};

export type AddStudentInput = {
  name: string;
  teacherId: string;
  childClass: string;
  group: StudentGroup;
  notes?: string;
  accessibilityProfile?: AccessibilityProfile;
};

export type LoginInput = {
  identifier: string;
  password: string;
};

export type ActionType =
  | "lesson_start"
  | "lesson_complete"
  | "step_view"
  | "step_complete"
  | "answer_correct"
  | "answer_wrong"
  | "hint_used";

export type ActionEvent = {
  id: string;
  userId: string;
  lessonSlug: string;
  action: ActionType;
  metadata?: Record<string, string | number | boolean>;
  timestamp: string;
};

export type QuestionnaireType = "initial" | "final";

export type QuestionnaireAnswer = {
  questionId: string;
  score: number;
};

export type QuestionnaireSubmission = {
  id: string;
  userId: string;
  type: QuestionnaireType;
  answers: QuestionnaireAnswer[];
  submittedAt: string;
};

export type ResearcherData = {
  teachers: CurrentUser[];
  students: CurrentUser[];
  eventLog: ActionEvent[];
  questionnaires: QuestionnaireSubmission[];
};

export type ResearcherCreateUserInput =
  | {
      role: "teacher" | "researcher";
      name: string;
      email: string;
      password: string;
      profile: UserProfile;
    }
  | {
      role: "student";
      name: string;
      teacherId: string;
      childClass: string;
      group: StudentGroup;
      notes?: string;
    };
