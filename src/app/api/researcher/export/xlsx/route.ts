import {
  handleApiError,
  jsonResponse,
  readJsonBody,
  requireRole,
} from "@/lib/server/api";
import { getSessionUser } from "@/lib/server/session";
import { getLocale } from "@/lib/i18n";
import { getResearcherData } from "@/lib/server/uquvli-store";
import { generateResearcherXlsx } from "@/lib/server/researcher-xlsx";

export const dynamic = "force-dynamic";

type ExportXlsxBody = {
  studentIds?: string[];
};

export async function POST(request: Request) {
  try {
    requireRole(await getSessionUser(), ["researcher"]);
    const locale = await getLocale();
    const input = await readJsonBody<ExportXlsxBody>(request);
    const data = await getResearcherData();
    const buffer = await generateResearcherXlsx(data, locale, input.studentIds);
    const fileName = `uquvli_data_${new Date().toISOString().slice(0, 10)}.xlsx`;

    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET() {
  const locale = await getLocale();
  return jsonResponse(
    {
      error:
        locale === "uz"
          ? "Excel eksporti uchun POST dan foydalaning."
          : "Используйте POST для экспорта Excel.",
    },
    405,
  );
}
