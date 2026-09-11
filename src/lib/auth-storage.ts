"use client";

import type {
  ActionEvent,
  ActionType,
  AddStudentInput,
  ClassState,
  CurrentUser,
  LoginInput,
  QuestionnaireAnswer,
  QuestionnaireSubmission,
  QuestionnaireType,
  RegisterInput,
  ResearcherCreateUserInput,
  ResearcherData,
  StudentGroup,
  UserProfile,
  UserRole,
} from "@/lib/uquvli-types";

export type {
  ActionEvent,
  ActionType,
  AddStudentInput,
  ClassState,
  CurrentUser,
  LoginInput,
  QuestionnaireAnswer,
  QuestionnaireSubmission,
  QuestionnaireType,
  RegisterInput,
  ResearcherCreateUserInput,
  ResearcherData,
  StudentGroup,
  UserProfile,
  UserRole,
};

export const AUTH_CHANGE_EVENT = "uquvli-auth-change";
export const CLASS_STATE_EVENT = "uquvli-class-state-change";

function dispatchEventIfBrowser(eventName: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(eventName));
}

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T>{
  const response = await fetch(path, {
    ...init,
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const payload = await response.json().catch(() => ({})) as {
    error?: string;
  };

  if (!response.ok) {
    const fallback =
      typeof document !== "undefined" &&
      document.cookie.includes("locale=uz")
        ? "Soʻrovni bajarib boʻlmadi."
        : "Не удалось выполнить запрос.";
    throw new Error(payload.error || fallback);
  }

  return payload as T;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const payload = await apiRequest<{ user: CurrentUser | null }>("/api/auth/me");
  return payload.user;
}

export async function registerLocalUser(input: RegisterInput) {
  const payload = await apiRequest<{ user: CurrentUser }>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
  dispatchEventIfBrowser(AUTH_CHANGE_EVENT);
  return payload.user;
}

export async function loginLocalUser(input: LoginInput) {
  const payload = await apiRequest<{ user: CurrentUser }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
  dispatchEventIfBrowser(AUTH_CHANGE_EVENT);
  return payload.user;
}

export async function logoutLocalUser() {
  await apiRequest<{ ok: true }>("/api/auth/logout", { method: "POST" });
  dispatchEventIfBrowser(AUTH_CHANGE_EVENT);
}

export async function completeLessonForCurrentUser(
  lessonSlug: string,
  score?: number,
) {
  const payload = await apiRequest<{ user: CurrentUser }>("/api/progress/complete", {
    method: "POST",
    body: JSON.stringify({ lessonSlug, score }),
  });
  dispatchEventIfBrowser(AUTH_CHANGE_EVENT);
  return payload.user;
}

export async function getClassState(teacherId: string): Promise<ClassState> {
  const params = new URLSearchParams({ teacherId });
  const payload = await apiRequest<{ classState: ClassState }>(
    `/api/class-state?${params.toString()}`,
  );
  return payload.classState;
}

export async function openLessonForClass(
  teacherId: string,
  lessonSlug: string,
) {
  const payload = await apiRequest<{ classState: ClassState }>(
    "/api/class-state/open",
    {
      method: "POST",
      body: JSON.stringify({ teacherId, lessonSlug }),
    },
  );
  dispatchEventIfBrowser(CLASS_STATE_EVENT);
  return payload.classState;
}

export async function closeLessonForClass(teacherId: string) {
  const payload = await apiRequest<{ classState: ClassState }>(
    "/api/class-state/close",
    {
      method: "POST",
      body: JSON.stringify({ teacherId }),
    },
  );
  dispatchEventIfBrowser(CLASS_STATE_EVENT);
  return payload.classState;
}

export async function getStudentsByTeacher(
  teacherId: string,
): Promise<CurrentUser[]> {
  const params = new URLSearchParams({ teacherId });
  const payload = await apiRequest<{ students: CurrentUser[] }>(
    `/api/teacher/students?${params.toString()}`,
  );
  return payload.students;
}

export async function addStudentToClass(input: AddStudentInput) {
  const payload = await apiRequest<{ student: CurrentUser }>("/api/teacher/students", {
    method: "POST",
    body: JSON.stringify(input),
  });
  dispatchEventIfBrowser(AUTH_CHANGE_EVENT);
  return payload.student;
}

export async function updateStudentGroup(studentId: string, group: StudentGroup) {
  const payload = await apiRequest<{ student: CurrentUser }>(
    `/api/researcher/students/${encodeURIComponent(studentId)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ group }),
    },
  );
  dispatchEventIfBrowser(AUTH_CHANGE_EVENT);
  return payload.student;
}

export async function getResearcherData(): Promise<ResearcherData> {
  return apiRequest<ResearcherData>("/api/researcher/data");
}

export async function createResearcherUser(input: ResearcherCreateUserInput) {
  const payload = await apiRequest<{ user: CurrentUser }>("/api/researcher/users", {
    method: "POST",
    body: JSON.stringify(input),
  });
  dispatchEventIfBrowser(AUTH_CHANGE_EVENT);
  return payload.user;
}

export async function getAllTeachers(): Promise<CurrentUser[]> {
  return (await getResearcherData()).teachers;
}

export async function getAllStudents(): Promise<CurrentUser[]> {
  return (await getResearcherData()).students;
}

export async function logAction(event: {
  lessonSlug: string;
  action: ActionType;
  metadata?: Record<string, string | number | boolean>;
}) {
  const payload = await apiRequest<{ event: ActionEvent }>("/api/actions/log", {
    method: "POST",
    body: JSON.stringify(event),
  });
  return payload.event;
}

export async function getActionLog(userId?: string): Promise<ActionEvent[]> {
  const data = await getResearcherData();
  return userId
    ? data.eventLog.filter((event) => event.userId === userId)
    : data.eventLog;
}

export async function submitQuestionnaire(
  userId: string,
  type: QuestionnaireType,
  answers: QuestionnaireAnswer[],
): Promise<QuestionnaireSubmission> {
  const payload = await apiRequest<{ questionnaire: QuestionnaireSubmission }>(
    "/api/questionnaires",
    {
      method: "POST",
      body: JSON.stringify({ userId, type, answers }),
    },
  );
  dispatchEventIfBrowser(AUTH_CHANGE_EVENT);
  return payload.questionnaire;
}

export async function getQuestionnaire(
  userId: string,
  type: QuestionnaireType,
): Promise<QuestionnaireSubmission | undefined> {
  const params = new URLSearchParams({ userId, type });
  const payload = await apiRequest<{ questionnaire: QuestionnaireSubmission | null }>(
    `/api/questionnaires?${params.toString()}`,
  );
  return payload.questionnaire ?? undefined;
}

export async function getAllQuestionnaires(): Promise<QuestionnaireSubmission[]> {
  const payload = await apiRequest<{ questionnaires: QuestionnaireSubmission[] }>(
    "/api/questionnaires?userId=all",
  );
  return payload.questionnaires;
}
