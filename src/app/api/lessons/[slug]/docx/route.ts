import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  handleApiError,
  HttpError,
  requireRole,
} from "@/lib/server/api";
import { getSessionUser } from "@/lib/server/session";
import { getLessonBySlugLocalized } from "@/data/program";
import { getLocale } from "@/lib/i18n";
import { getStaticLessonDocxInfo } from "@/lib/static-lesson-docx";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    requireRole(await getSessionUser(), ["teacher", "researcher"]);

    const locale = await getLocale();
    const { slug } = await context.params;
    const lesson = getLessonBySlugLocalized(slug, locale);
    if (!lesson) {
      throw new HttpError(404, {
        ru: "Lesson not found.",
        uz: "Dars topilmadi.",
      });
    }

    const docxInfo = getStaticLessonDocxInfo(slug);
    if (!docxInfo) {
      throw new HttpError(404, {
        ru: "No reference PhD card was found for this lesson.",
        uz: "Bu dars uchun namunaviy PhD xarita topilmadi.",
      });
    }

    // UI Logic
    // UI Logic
    const phdPath = path.join(
      process.cwd(),
      "public",
      "lesson-docx",
      docxInfo.publicFile,
    );

    const buffer = await readFile(phdPath);
    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${docxInfo.publicFile}"; filename*=UTF-8''${encodeURIComponent(docxInfo.downloadName)}`,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
