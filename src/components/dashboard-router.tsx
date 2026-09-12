"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { DashboardClient } from "@/components/dashboard-client";
import { ResearcherCabinet } from "@/components/researcher-cabinet";
import type { ProgramLesson } from "@/data/program";

type UserRole = "student" | "parent" | "teacher" | "researcher";

type DashboardRouterProps = {
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

export function DashboardRouter({ demoUser, lessons, modules, roleLabels }: DashboardRouterProps) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) {
      router.replace("/login?redirect=/dashboard");
    }
  }, [user, ready, router]);

  if (!ready) {
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
    return <ResearcherCabinet />;
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
