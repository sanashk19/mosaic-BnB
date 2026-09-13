"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { DashboardClient } from "@/components/dashboard-client";
import { ResearcherDashboard } from "@/components/researcher-dashboard";
import type { CurrentUser } from "@/lib/uquvli-types";
import type { ProgramLesson } from "@/data/program";

type UserRole = "student" | "parent" | "teacher" | "researcher";

type DashboardRouterProps = {
  initialUser?: CurrentUser | null;
  demoUser: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
    progress: { lessonSlug: string; completedAt: string; score?: number }[];
    profile: {
      childName: string;
      childClass: string;
      teacherName: string;
      organizationName: string;
      supportNotes: string;
    };
  };
  lessons: ProgramLesson[];
  modules: {
    slug: string;
    title: string;
    total: number;
    lessons: { slug: string; title: string }[];
  }[];
  roleLabels: Record<UserRole, string>;
};

export function DashboardRouter({ initialUser, demoUser, lessons, modules, roleLabels }: DashboardRouterProps) {
  const { user: authUser, ready } = useAuth();
  const user = authUser || initialUser;
  const router = useRouter();

  useEffect(() => {
    if (ready && !user && !initialUser) {
      router.replace("/login?redirect=/dashboard");
    }
  }, [user, ready, router, initialUser]);

  if (!ready && !user) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#707877", fontSize: "0.875rem" }}>Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (user.role === "researcher") {
    return <ResearcherDashboard user={user} />;
  }

  return (
    <DashboardClient
      demoUser={demoUser}
      lessons={lessons}
      modules={modules}
      roleLabels={roleLabels}
    />
  );
}
