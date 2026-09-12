import { promises as fs } from "node:fs";
import path from "node:path";
import {
  randomBytes,
  randomUUID,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { demoLoginProfiles } from "@/data/demo-user";
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
  StudentGroup,
  UserProfile,
  UserRole,
} from "@/lib/uquvli-types";
import type { AccessibilityProfile } from "@/lib/adaptation/adaptation-types";
import { HttpError } from "@/lib/server/api";

type StoredUser = CurrentUser & {
  passwordHash: string;
};

type UquvliDatabase = {
  version: 1;
  users: StoredUser[];
  classState: Record<string, ClassState>;
  eventLog: ActionEvent[];
  questionnaires: QuestionnaireSubmission[];
};

type DemoLoginProfile = (typeof demoLoginProfiles)[number];
type DemoUserSeed = DemoLoginProfile["user"];

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const DATA_FILE = process.env.UQUVLI_DB_PATH || path.join(DATA_DIR, "uquvli-db.json");

const EMPTY_DB: UquvliDatabase = {
  version: 1,
  users: [],
  classState: {},
  eventLog: [],
  questionnaires: [],
};

let dbCache: UquvliDatabase | null = null;
let writeQueue: Promise<unknown> = Promise.resolve();

function isRecord(value: unknown): value is Record<string, unknown>{
  return Boolean(value) && typeof value === "object";
}

function sanitizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeRole(value: unknown, fallback: UserRole = "student"): UserRole {
  return value === "student"
    || value === "parent"
    || value === "teacher"
    || value === "researcher"
    ? value
    : fallback;
}

function normalizeGroup(value: unknown): StudentGroup | undefined {
  return value === "experimental" || value === "control" ? value : undefined;
}

function requireGroup(value: unknown): StudentGroup {
  const group = normalizeGroup(value);
  if (!group) {
    throw new HttpError(400, {
      ru: "Please indicate research group.",
      uz: "Tadqiqot guruhini koʻrsating.",
    });
  }

  return group;
}

function normalizeProfile(
  profile: Partial<UserProfile>| undefined,
  fallbackName: string,
  demoSeed?: DemoUserSeed,
): UserProfile {
  const defaults = demoSeed
    ? demoSeed.profile
    : {
        childName: fallbackName || "child",
        childClass: "Class not specified",
        teacherName: "Teacher not specified",
        organizationName: "School or center not specified",
        supportNotes:
          "Short phrases, one step at a time and calm repetition without rushing.",
      };

  return {
    childName: sanitizeText(profile?.childName) || defaults.childName,
    childClass: sanitizeText(profile?.childClass) || defaults.childClass,
    teacherName: sanitizeText(profile?.teacherName) || defaults.teacherName,
    organizationName:
      sanitizeText(profile?.organizationName) || defaults.organizationName,
    supportNotes: sanitizeText(profile?.supportNotes) || defaults.supportNotes,
  };
}

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [algorithm, salt, key] = storedHash.split(":");
  if (algorithm !== "scrypt" || !salt || !key) {
    return false;
  }

  const actual = Buffer.from(scryptSync(password, salt, 64).toString("hex"), "hex");
  const expected = Buffer.from(key, "hex");

  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function toPublicUser(user: StoredUser): CurrentUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    progress: user.progress,
    profile: user.profile,
    studentCode: user.studentCode,
    teacherId: user.teacherId,
    group: user.group,
    accessibilityProfile: user.accessibilityProfile ?? user.profile.accessibilityProfile,
  };
}

function normalizeStoredUser(entry: unknown): StoredUser | null {
  if (!isRecord(entry)) return null;

  const email = normalizeEmail(sanitizeText(entry.email));
  const passwordHash = sanitizeText(entry.passwordHash);
  const name = sanitizeText(entry.name) || "User";

  if (!email || !passwordHash) return null;

  const rawAccessibility = isRecord(entry.accessibilityProfile)
    ? (entry.accessibilityProfile as unknown as AccessibilityProfile)
    : isRecord(entry.profile) && isRecord(entry.profile.accessibilityProfile)
      ? (entry.profile.accessibilityProfile as unknown as AccessibilityProfile)
      : undefined;

  return {
    id: sanitizeText(entry.id) || randomUUID(),
    name,
    email,
    passwordHash,
    role: normalizeRole(entry.role),
    createdAt: sanitizeText(entry.createdAt) || new Date().toISOString(),
    progress: Array.isArray(entry.progress)
      ? entry.progress.flatMap((item) => {
          if (!isRecord(item)) return [];
          const lessonSlug = sanitizeText(item.lessonSlug);
          const completedAt = sanitizeText(item.completedAt);
          const score = typeof item.score === "number" ? item.score : undefined;
          return lessonSlug && completedAt ? [{ lessonSlug, completedAt, score }] : [];
        })
      : [],
    profile: normalizeProfile(
      isRecord(entry.profile) ? entry.profile : undefined,
      name,
    ),
    studentCode: sanitizeText(entry.studentCode) || undefined,
    teacherId: sanitizeText(entry.teacherId) || undefined,
    group: normalizeGroup(entry.group),
    accessibilityProfile: rawAccessibility,
  };
}

function normalizeClassStateMap(value: unknown): Record<string, ClassState> {
  if (!isRecord(value)) return {};

  return Object.fromEntries(
    Object.entries(value).flatMap(([teacherId, state]) => {
      if (!isRecord(state)) return [];
      const openLessonSlug = sanitizeText(state.openLessonSlug) || null;
      const openedAt = sanitizeText(state.openedAt) || null;
      return [[teacherId, { openLessonSlug, openedAt }]];
    }),
  );
}

function normalizeEventLog(value: unknown): ActionEvent[] {
  if (!Array.isArray(value)) return [];

  const actions = new Set<ActionType>([
    "lesson_start",
    "lesson_complete",
    "step_view",
    "step_complete",
    "answer_correct",
    "answer_wrong",
    "hint_used",
  ]);

  return value.flatMap((entry) => {
    if (!isRecord(entry)) return [];
    const action = sanitizeText(entry.action) as ActionType;
    if (!actions.has(action)) return [];

    const id = sanitizeText(entry.id) || randomUUID();
    const userId = sanitizeText(entry.userId);
    const lessonSlug = sanitizeText(entry.lessonSlug);
    const timestamp = sanitizeText(entry.timestamp);

    if (!userId || !lessonSlug || !timestamp) return [];

    return [{
      id,
      userId,
      lessonSlug,
      action,
      timestamp,
      metadata: isRecord(entry.metadata)
        ? sanitizeMetadata(entry.metadata)
        : undefined,
    }];
  });
}

function normalizeQuestionnaires(value: unknown): QuestionnaireSubmission[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((entry) => {
    if (!isRecord(entry)) return [];
    const type =
      entry.type === "initial" || entry.type === "final" ? entry.type : null;
    const userId = sanitizeText(entry.userId);
    const submittedAt = sanitizeText(entry.submittedAt);

    if (!type || !userId || !submittedAt || !Array.isArray(entry.answers)) {
      return [];
    }

    const answers = entry.answers.flatMap((answer) => {
      if (!isRecord(answer)) return [];
      const questionId = sanitizeText(answer.questionId);
      const score = typeof answer.score === "number" ? answer.score : NaN;
      return questionId && Number.isFinite(score) ? [{ questionId, score }] : [];
    });

    return [{
      id: sanitizeText(entry.id) || randomUUID(),
      userId,
      type,
      answers,
      submittedAt,
    }];
  });
}

function normalizeDatabase(value: unknown): UquvliDatabase {
  if (!isRecord(value)) return { ...EMPTY_DB };

  return {
    version: 1,
    users: Array.isArray(value.users)
      ? value.users.flatMap((entry) => {
          const user = normalizeStoredUser(entry);
          return user ? [user] : [];
        })
      : [],
    classState: normalizeClassStateMap(value.classState),
    eventLog: normalizeEventLog(value.eventLog),
    questionnaires: normalizeQuestionnaires(value.questionnaires),
  };
}

async function loadDb(): Promise<UquvliDatabase> {
  if (dbCache) return dbCache;

  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    dbCache = normalizeDatabase(JSON.parse(raw));
  } catch (error) {
    if (isRecord(error) && error.code === "ENOENT") {
      dbCache = { ...EMPTY_DB };
    } else {
      throw error;
    }
  }

  return dbCache;
}

async function saveDb(db: UquvliDatabase) {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    const tmpFile = `${DATA_FILE}.${process.pid}.${Date.now()}.tmp`;
    await fs.writeFile(tmpFile, `${JSON.stringify(db, null, 2)}\n`, "utf8");
    await fs.rename(tmpFile, DATA_FILE);
  } catch (err) {
    if (isRecord(err) && (err.code === "EROFS" || err.code === "EACCES")) {
      console.warn("Storage filesystem is read-only. Retaining state in memory cache.", err);
    } else {
      throw err;
    }
  }
  dbCache = db;
}

async function withWrite<T>(mutate: (db: UquvliDatabase) => Promise<T> | T) {
  const run = writeQueue.then(async () => {
    const db = await loadDb();
    const result = await mutate(db);
    await saveDb(db);
    return result;
  });

  writeQueue = run.catch(() => undefined);
  return run;
}

function getDemoProfileByEmail(email: string): DemoLoginProfile | undefined {
  return demoLoginProfiles.find(
    (profile) => normalizeEmail(profile.user.email) === email,
  );
}

function getDemoProfileByCredentials(
  rawIdentifier: string,
  password: string,
): DemoLoginProfile | undefined {
  const identifier = normalizeEmail(rawIdentifier);
  const compactDemoCode = rawIdentifier.replace(/[\s:/\\|,-]+/g, " ").trim();
  const compactDemoDigits = rawIdentifier.replace(/\D/g, "");

  return demoLoginProfiles.find((profile) => {
    const exactCodeMatch =
      identifier === profile.code && password === profile.password;
    const compactCodeMatch =
      compactDemoCode === `${profile.code} ${profile.password}`
      && (password === "" || password === profile.password);
    const shortCodeMatch =
      compactDemoDigits === `${profile.code}${profile.password}`&& (password === "" || password === profile.password || password === compactDemoDigits);

    return exactCodeMatch || compactCodeMatch || shortCodeMatch;
  });
}

function createDemoStoredUser(
  profile: DemoLoginProfile,
  teacherId?: string,
): StoredUser {
  const demoUser = profile.user;
  const isStudent = demoUser.role === "student";

  return {
    id: randomUUID(),
    name: demoUser.name,
    email: normalizeEmail(demoUser.email),
    passwordHash: hashPassword(demoUser.password),
    role: demoUser.role,
    createdAt: new Date().toISOString(),
    progress: [],
    profile: demoUser.profile,
    studentCode: isStudent ? profile.code : undefined,
    group: isStudent ? "experimental" : undefined,
    ...(teacherId ? { teacherId } : {}),
  };
}

function ensureDemoUser(db: UquvliDatabase, profile: DemoLoginProfile): StoredUser {
  const demoEmail = normalizeEmail(profile.user.email);
  const existing = db.users.find((entry) => entry.email === demoEmail);

  if (profile.user.role === "student") {
    const teacherProfile = demoLoginProfiles.find((p) => p.user.role === "teacher");
    if (teacherProfile) {
      const teacher = ensureDemoUser(db, teacherProfile);
      if (existing) {
        existing.teacherId = teacher.id;
        existing.studentCode = existing.studentCode ?? profile.code;
        existing.group = existing.group ?? "experimental";
        return existing;
      }
      const created = createDemoStoredUser(profile, teacher.id);
      db.users.push(created);
      return created;
    }
  }

  if (existing) return existing;

  const created = createDemoStoredUser(profile);
  db.users.push(created);
  return created;
}

function generateStudentCode(db: UquvliDatabase): string {
  const existingCodes = new Set(
    db.users.flatMap((u) => (u.studentCode ? [u.studentCode] : [])),
  );
  for (let i = 1; i <= 9; i++) existingCodes.add(String(i));

  let code: string;
  do {
    code = String(Math.floor(1000 + Math.random() * 9000));
  } while (existingCodes.has(code));

  return code;
}

function sanitizeMetadata(
  metadata: Record<string, unknown>,
): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries(metadata).flatMap(([key, value]) => {
      const cleanKey = sanitizeText(key);
      if (!cleanKey) return [];
      if (
        typeof value === "string"
        || typeof value === "number"
        || typeof value === "boolean"
      ) {
        return [[cleanKey, value]];
      }
      return [];
    }),
  );
}

export async function findUserById(userId: string): Promise<CurrentUser | null> {
  const db = await loadDb();
  const user = db.users.find((entry) => entry.id === userId);
  return user ? toPublicUser(user) : null;
}

export async function registerUser(input: RegisterInput): Promise<CurrentUser>{
  return withWrite((db) => {
    const name = sanitizeText(input.name);
    const email = normalizeEmail(sanitizeText(input.email));
    const password = sanitizeText(input.password);
    const role = normalizeRole(input.role, "parent");
    const isResearcher = role === "researcher";
    const childName =
      sanitizeText(input.profile.childName) || (role === "student" ? name : "");
    const childClass = sanitizeText(input.profile.childClass);

    if (!name) {
      throw new HttpError(400, { ru: "Enter a name.", uz: "Ismni kiriting." });
    }
    if (!email) {
      throw new HttpError(400, {
        ru: "Enter your email.",
        uz: "E-pochtani kiriting.",
      });
    }
    if (!email.includes("@")) {
      throw new HttpError(400, {
        ru: "Please enter a valid email.",
        uz: "Toʻgʻri e-pochtani kiriting.",
      });
    }
    if (password.length< 6) {
      throw new HttpError(400, {
        ru: "The password must be at least 6 characters.",
        uz: "Parol kamida 6 ta belgidan iborat boʻlishi kerak.",
      });
    }

    if (!isResearcher) {
      if (!childName) {
        throw new HttpError(400, {
          ru: "Please indicate the child's name.",
          uz: "Bolaning ismini koʻrsating.",
        });
      }
      if (!childClass) {
        throw new HttpError(400, {
          ru: "Please indicate your class or group.",
          uz: "Sinf yoki guruhni koʻrsating.",
        });
      }
    }

    if (db.users.some((entry) =>entry.email === email)) {
      throw new HttpError(409, {
        ru: "A user with this email is already registered.",
        uz: "Bunday e-pochta bilan foydalanuvchi roʻyxatdan oʻtgan.",
      });
    }

    const newUser: StoredUser = {
      id: randomUUID(),
      name,
      email,
      passwordHash: hashPassword(password),
      role,
      createdAt: new Date().toISOString(),
      progress: [],
      profile: normalizeProfile({ ...input.profile, childName }, name),
    };

    db.users.push(newUser);
    return toPublicUser(newUser);
  });
}

export async function createUserByResearcher(
  input: ResearcherCreateUserInput,
): Promise<CurrentUser>{
  if (input.role === "student") {
    return addStudentToClass({
      name: input.name,
      teacherId: input.teacherId,
      childClass: input.childClass,
      group: input.group,
      notes: input.notes,
    });
  }

  return withWrite((db) => {
    const name = sanitizeText(input.name);
    const email = normalizeEmail(sanitizeText(input.email));
    const password = sanitizeText(input.password);
    const role = input.role;

    if (!name) {
      throw new HttpError(400, { ru: "Enter a name.", uz: "Ismni kiriting." });
    }
    if (!email) {
      throw new HttpError(400, {
        ru: "Enter your email.",
        uz: "E-pochtani kiriting.",
      });
    }
    if (!email.includes("@")) {
      throw new HttpError(400, {
        ru: "Please enter a valid email.",
        uz: "Toʻgʻri e-pochtani kiriting.",
      });
    }
    if (password.length< 6) {
      throw new HttpError(400, {
        ru: "The password must be at least 6 characters.",
        uz: "Parol kamida 6 ta belgidan iborat boʻlishi kerak.",
      });
    }

    if (db.users.some((entry) =>entry.email === email)) {
      throw new HttpError(409, {
        ru: "A user with this email is already registered.",
        uz: "Bunday e-pochta bilan foydalanuvchi roʻyxatdan oʻtgan.",
      });
    }

    const profile =
      role === "teacher"
        ? {
            childName: sanitizeText(input.profile.childName),
            childClass: sanitizeText(input.profile.childClass),
            teacherName: name,
            organizationName: sanitizeText(input.profile.organizationName),
            supportNotes: sanitizeText(input.profile.supportNotes),
          }
        : normalizeProfile(input.profile, name);

    if (role === "teacher" && !profile.childClass) {
      throw new HttpError(400, {
        ru: "Specify the teacher's class or group.",
        uz: "Oʻqituvchi sinf yoki guruhini koʻrsating.",
      });
    }

    const newUser: StoredUser = {
      id: randomUUID(),
      name,
      email,
      passwordHash: hashPassword(password),
      role,
      createdAt: new Date().toISOString(),
      progress: [],
      profile,
    };

    db.users.push(newUser);
    return toPublicUser(newUser);
  });
}

export async function loginUser(input: LoginInput): Promise<CurrentUser>{
  return withWrite((db) => {
    const rawIdentifier = sanitizeText(input.identifier);
    const identifier = normalizeEmail(rawIdentifier);
    const password = sanitizeText(input.password);

    const demoProfile = getDemoProfileByCredentials(rawIdentifier, password);
    if (demoProfile) {
      return toPublicUser(ensureDemoUser(db, demoProfile));
    }

    const studentByCode = db.users.find(
      (user) => user.role === "student" && user.studentCode === rawIdentifier,
    );
    if (studentByCode && (!password || password === studentByCode.studentCode)) {
      return toPublicUser(studentByCode);
    }

    const user = db.users.find((entry) => entry.email === identifier);
    if (!user || !verifyPassword(password, user.passwordHash)) {
      throw new HttpError(401, {
        ru: "Invalid login or password.",
        uz: "Login yoki parol notoʻgʻri.",
      });
    }

    const demoProfileByEmail = getDemoProfileByEmail(user.email);
    if (demoProfileByEmail && !verifyPassword(demoProfileByEmail.user.password, user.passwordHash)) {
      user.passwordHash = hashPassword(demoProfileByEmail.user.password);
    }

    return toPublicUser(user);
  });
}

export async function completeLessonForUser(
  userId: string,
  lessonSlug: string,
  score?: number,
): Promise<CurrentUser>{
  return withWrite((db) => {
    const user = db.users.find((entry) => entry.id === userId);
    if (!user) {
      throw new HttpError(401, {
        ru: "First, enter the office.",
        uz: "Avval kabinetga kiring.",
      });
    }

    const cleanSlug = sanitizeText(lessonSlug);
    if (!cleanSlug) {
      throw new HttpError(400, {
        ru: "No lesson specified.",
        uz: "Dars koʻrsatilmagan.",
      });
    }

    const completedAt = new Date().toISOString();
    const safeScore = typeof score === "number" && Number.isFinite(score)
      ? score
      : undefined;
    const existingEntry = user.progress.find(
      (progress) => progress.lessonSlug === cleanSlug,
    );

    if (existingEntry) {
      existingEntry.completedAt = completedAt;
      existingEntry.score = safeScore;
    } else {
      user.progress.push({ lessonSlug: cleanSlug, completedAt, score: safeScore });
    }

    db.eventLog.push({
      id: randomUUID(),
      userId,
      lessonSlug: cleanSlug,
      action: "lesson_complete",
      metadata: safeScore === undefined ? undefined : { score: safeScore },
      timestamp: completedAt,
    });

    return toPublicUser(user);
  });
}

export async function getClassState(teacherId: string): Promise<ClassState> {
  const db = await loadDb();
  return db.classState[teacherId] ?? { openLessonSlug: null, openedAt: null };
}

export async function openLessonForClass(
  teacherId: string,
  lessonSlug: string,
): Promise<ClassState>{
  return withWrite((db) => {
    const teacher = db.users.find(
      (user) => user.id === teacherId && user.role === "teacher",
    );
    if (!teacher) {
      throw new HttpError(404, {
        ru: "The teacher was not found.",
        uz: "Oʻqituvchi topilmadi.",
      });
    }

    const cleanSlug = sanitizeText(lessonSlug);
    if (!cleanSlug) {
      throw new HttpError(400, {
        ru: "No lesson specified.",
        uz: "Dars koʻrsatilmagan.",
      });
    }

    const state = { openLessonSlug: cleanSlug, openedAt: new Date().toISOString() };
    db.classState[teacherId] = state;
    return state;
  });
}

export async function closeLessonForClass(teacherId: string): Promise<ClassState>{
  return withWrite((db) => {
    const teacher = db.users.find(
      (user) => user.id === teacherId && user.role === "teacher",
    );
    if (!teacher) {
      throw new HttpError(404, {
        ru: "The teacher was not found.",
        uz: "Oʻqituvchi topilmadi.",
      });
    }

    const state = { openLessonSlug: null, openedAt: null };
    db.classState[teacherId] = state;
    return state;
  });
}

export async function getStudentsByTeacher(teacherId: string): Promise<CurrentUser[]> {
  const db = await loadDb();
  return db.users
    .filter((user) => user.role === "student" && user.teacherId === teacherId)
    .map(toPublicUser);
}

export async function addStudentToClass(
  input: AddStudentInput,
): Promise<CurrentUser>{
  return withWrite((db) => {
    const name = sanitizeText(input.name);
    const teacherId = sanitizeText(input.teacherId);
    const teacher = db.users.find(
      (user) => user.id === teacherId && user.role === "teacher",
    );

    if (!teacher) {
      throw new HttpError(404, {
        ru: "The teacher was not found.",
        uz: "Oʻqituvchi topilmadi.",
      });
    }
    if (!name) {
      throw new HttpError(400, {
        ru: "Enter the student's name.",
        uz: "Oʻquvchining ismini kiriting.",
      });
    }

    const group = requireGroup(input.group);
    const studentCode = generateStudentCode(db);
    const email = `student-${studentCode}@mosaic-learning.org`;

    const newStudent: StoredUser = {
      id: randomUUID(),
      name,
      email,
      passwordHash: hashPassword(studentCode),
      role: "student",
      createdAt: new Date().toISOString(),
      progress: [],
      profile: {
        childName: name,
        childClass: sanitizeText(input.childClass) || teacher.profile.childClass,
        teacherName: teacher.name,
        organizationName: teacher.profile.organizationName,
        supportNotes: sanitizeText(input.notes),
      },
      studentCode,
      teacherId,
      group,
    };

    db.users.push(newStudent);
    return toPublicUser(newStudent);
  });
}

export async function updateStudentGroup(
  studentId: string,
  group: StudentGroup,
): Promise<CurrentUser>{
  return withWrite((db) => {
    const student = db.users.find(
      (user) => user.id === studentId && user.role === "student",
    );
    if (!student) {
      throw new HttpError(404, {
        ru: "Student not found.",
        uz: "Oʻquvchi topilmadi.",
      });
    }

    student.group = requireGroup(group);
    return toPublicUser(student);
  });
}

export async function getAllTeachers(): Promise<CurrentUser[]> {
  const db = await loadDb();
  return db.users.filter((user) => user.role === "teacher").map(toPublicUser);
}

export async function getAllStudents(): Promise<CurrentUser[]> {
  const db = await loadDb();
  return db.users.filter((user) => user.role === "student").map(toPublicUser);
}

export async function getResearcherData() {
  const db = await loadDb();

  return {
    teachers: db.users.filter((user) => user.role === "teacher").map(toPublicUser),
    students: db.users.filter((user) => user.role === "student").map(toPublicUser),
    eventLog: db.eventLog,
    questionnaires: db.questionnaires,
  };
}

export async function logAction(
  userId: string,
  event: {
    lessonSlug: string;
    action: ActionType;
    metadata?: Record<string, unknown>;
  },
): Promise<ActionEvent>{
  return withWrite((db) => {
    const user = db.users.find((entry) => entry.id === userId);
    if (!user) {
      throw new HttpError(401, {
        ru: "First, enter the office.",
        uz: "Avval kabinetga kiring.",
      });
    }

    const lessonSlug = sanitizeText(event.lessonSlug);
    if (!lessonSlug) {
      throw new HttpError(400, {
        ru: "No lesson specified.",
        uz: "Dars koʻrsatilmagan.",
      });
    }

    const entry: ActionEvent = {
      id: randomUUID(),
      userId,
      lessonSlug,
      action: event.action,
      metadata: event.metadata ? sanitizeMetadata(event.metadata) : undefined,
      timestamp: new Date().toISOString(),
    };

    db.eventLog.push(entry);
    return entry;
  });
}

export async function getActionLog(userId?: string): Promise<ActionEvent[]> {
  const db = await loadDb();
  return userId
    ? db.eventLog.filter((event) => event.userId === userId)
    : db.eventLog;
}

export async function submitQuestionnaire(
  userId: string,
  type: QuestionnaireType,
  answers: QuestionnaireAnswer[],
): Promise<QuestionnaireSubmission>{
  return withWrite((db) => {
    const user = db.users.find((entry) => entry.id === userId);
    if (!user) {
      throw new HttpError(401, {
        ru: "First, enter the office.",
        uz: "Avval kabinetga kiring.",
      });
    }
    if (type !== "initial" && type !== "final") {
      throw new HttpError(400, {
        ru: "Incorrect form type.",
        uz: "Anketa turi notoʻgʻri.",
      });
    }

    const cleanAnswers = answers.flatMap((answer) => {
      const questionId = sanitizeText(answer.questionId);
      const score = Number(answer.score);
      if (!questionId || !Number.isFinite(score)) return [];
      return [{ questionId, score: Math.max(1, Math.min(5, Math.round(score))) }];
    });

    if (!cleanAnswers.length) {
      throw new HttpError(400, {
        ru: "Fill out the form.",
        uz: "Anketani toʻldiring.",
      });
    }

    const submission: QuestionnaireSubmission = {
      id: randomUUID(),
      userId,
      type,
      answers: cleanAnswers,
      submittedAt: new Date().toISOString(),
    };

    db.questionnaires = [
      ...db.questionnaires.filter(
        (item) => !(item.userId === userId && item.type === type),
      ),
      submission,
    ];

    return submission;
  });
}

export async function getQuestionnaire(
  userId: string,
  type: QuestionnaireType,
): Promise<QuestionnaireSubmission | undefined> {
  const db = await loadDb();
  return db.questionnaires.find(
    (submission) => submission.userId === userId && submission.type === type,
  );
}

export async function getAllQuestionnaires(): Promise<QuestionnaireSubmission[]> {
  const db = await loadDb();
  return db.questionnaires;
}
