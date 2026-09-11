import { NextResponse } from "next/server";
import { getLessonBySlugLocalized } from "@/data/program";
import { adaptLesson } from "@/lib/adaptation/adaptation-engine";
import type { AccessibilityProfile } from "@/lib/adaptation/adaptation-types";
import { DEFAULT_ACCESSIBILITY_PROFILE } from "@/lib/adaptation/adaptation-types";
import { getLocale } from "@/lib/i18n";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lessonSlug = typeof body?.lessonSlug === "string" ? body.lessonSlug.trim() : "";
    const learnerProfile: AccessibilityProfile =
      body?.learnerProfile && typeof body.learnerProfile === "object"
        ? body.learnerProfile
        : DEFAULT_ACCESSIBILITY_PROFILE;

    if (!lessonSlug) {
      return NextResponse.json(
        { error: "lessonSlug is required" },
        { status: 400 },
      );
    }

    const locale = await getLocale();
    const originalLesson = getLessonBySlugLocalized(lessonSlug, locale);

    if (!originalLesson) {
      return NextResponse.json(
        { error: `Lesson with slug '${lessonSlug}' not found` },
        { status: 404 },
      );
    }

    const adaptedLesson = adaptLesson(originalLesson, learnerProfile);

    return NextResponse.json({
      success: true,
      adaptedLesson,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to adapt lesson",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
