import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data } = body;

    if (!data || !Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid frame data array" }, { status: 400 });
    }

    const backendUrl = process.env.ISL_BACKEND_URL || process.env.ISL_API_URL || "http://127.0.0.1:8000";

    try {
      const response = await fetch(`${backendUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        const resData = await response.json();
        return NextResponse.json(resData);
      } else {
        return NextResponse.json(
          { error: "ISL recognition service unavailable" },
          { status: 503 }
        );
      }
    } catch (apiErr) {
      console.warn("ISL Python Backend unreachable:", apiErr);
      return NextResponse.json(
        { error: "ISL recognition service unavailable" },
        { status: 503 }
      );
    }
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}

