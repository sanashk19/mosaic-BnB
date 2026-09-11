"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  AUTH_CHANGE_EVENT,
  completeLessonForCurrentUser,
  type CurrentUser,
  getCurrentUser,
  loginLocalUser,
  logoutLocalUser,
  type RegisterInput,
  registerLocalUser,
} from "@/lib/auth-storage";

type AuthContextValue = {
  user: CurrentUser | null;
  ready: boolean;
  login: (input: { identifier: string; password: string }) => Promise<CurrentUser>;
  register: (input: RegisterInput) => Promise<CurrentUser>;
  logout: () => Promise<void>;
  completeLesson: (lessonSlug: string, score?: number) => Promise<CurrentUser>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null | undefined>(undefined);
  const ready = user !== undefined;

  useEffect(() => {
    let cancelled = false;

    const syncUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!cancelled) setUser(currentUser);
      } catch {
        if (!cancelled) setUser(null);
      }
    };

    void syncUser();

    window.addEventListener("focus", syncUser);
    window.addEventListener(AUTH_CHANGE_EVENT, syncUser);

    return () => {
      cancelled = true;
      window.removeEventListener("focus", syncUser);
      window.removeEventListener(AUTH_CHANGE_EVENT, syncUser);
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: user ?? null,
      ready,
      async login(input) {
        const nextUser = await loginLocalUser(input);
        setUser(nextUser);
        return nextUser;
      },
      async register(input) {
        const nextUser = await registerLocalUser(input);
        setUser(nextUser);
        return nextUser;
      },
      async logout() {
        await logoutLocalUser();
        setUser(null);
      },
      async completeLesson(lessonSlug, score) {
        const nextUser = await completeLessonForCurrentUser(lessonSlug, score);
        setUser(nextUser);
        return nextUser;
      },
    }),
    [ready, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
