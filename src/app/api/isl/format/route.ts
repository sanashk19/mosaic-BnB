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
      const response = await fetch(`${backendUrl}/format`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const resData = await response.json();
        return NextResponse.json(resData);
      }
    } catch (apiErr) {
      console.warn("ISL format endpoint unreachable. Using rule-based fallback.", apiErr);
    }

    // Rule-based sentence builder fallback
    const gloss = text.trim();
    const wordMap: Record<string, string> = {
      HELLO: "Hello",
      THANK: "Thank you",
      "THANK YOU": "Thank you very much",
      YOU: "you",
      I: "I",
      WATER: "water",
      WANT: "want",
      HELP: "help",
      PLEASE: "please",
      NAMASTE: "Namaste",
      STOP: "Stop",
      GO: "go",
      HOME: "home",
      TODAY: "today",
      LOVE: "love",
      FRIEND: "friend",
      FAMILY: "family",
      GOOD: "good",
      BAD: "bad",
      YES: "yes",
      NO: "no",
    };

    const words = gloss.split(/\s+/);
    const sentenceWords: string[] = [];

    for (const w of words) {
      const upper = w.toUpperCase();
      if (wordMap[upper]) {
        sentenceWords.push(wordMap[upper]);
      } else if (w.length === 1) {
        sentenceWords.push(w.toUpperCase());
      } else {
        sentenceWords.push(w);
      }
    }

    let sentence = sentenceWords.join(" ");
    if (sentence && !sentence.endsWith(".") && !sentence.endsWith("!")) {
      sentence += ".";
    }

    return NextResponse.json({ sentence: sentence || "Hello." });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
