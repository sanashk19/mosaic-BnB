"use client";

import NextImage from "next/image";
import { useState } from "react";

export type MascotMood = "happy" | "thinking" | "cheer" | "soft";

type MascotProps = {
  message: string;
  mood?: MascotMood;
  /** Inline (above lesson) or floating (fixed bottom-right) */
  variant?: "inline" | "floating";
};

// Two possible asset paths: PNG (user-provided) or fallback SVG
const MASCOT_PNG = "/mascot/dilnoza.png";
const MASCOT_SVG = "/mascot/dilnoza.svg";

export function Mascot({ message, mood = "happy", variant = "inline" }: MascotProps) {
  const [src, setSrc] = useState<string>(MASCOT_PNG);
  const loading = variant === "floating" ? "lazy" : "eager";

  return (
    <div className={`mascot mascot--${variant} mascot--${mood}`} role="status" aria-live="polite">
      <div className="mascot-portrait" aria-hidden="true">
        <span className="mascot-hand-wave mascot-hand-wave--one" />
        <span className="mascot-hand-wave mascot-hand-wave--two" />
        <NextImage
          className="mascot-image"
          src={src}
          alt=""
          width={72}
          height={100}
          sizes="72px"
          loading={loading}
          fetchPriority={loading === "eager" ? "high" : "auto"}
          decoding="async"
          unoptimized
          style={{ maxHeight: "64px", width: "auto", objectFit: "contain" }}
          onError={() => setSrc((current) => (current === MASCOT_SVG ? current : MASCOT_SVG))}
        />
      </div>
      <div className="mascot-bubble">
        <p>{message}</p>
      </div>
    </div>
  );
}
