import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Invalid text input" }, { status: 400 });
    }

    const backendUrl = process.env.ISL_API_URL || "http://127.0.0.1:8000";

    try {
      const response = await fetch(`${backendUrl}/speak`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const resData = await response.json();
        return NextResponse.json(resData);
      }
    } catch (apiErr) {
      console.warn("ISL speak endpoint unreachable. Using Web Speech API fallback flag.", apiErr);
    }

    return NextResponse.json({
      use_browser_tts: true,
      text: text,
    });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
