import type { CSSProperties } from "react";

type MosaicLogoProps = {
  className?: string;
  size?: number;
  showTagline?: boolean;
  style?: CSSProperties;
};

export function MosaicLogo({
  className = "",
  size = 36,
  showTagline = true,
  style,
}: MosaicLogoProps) {
  return (
    <div
      className={`mosaic-brand-lockup ${className}`.trim()}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        {/* Top-left: Terracotta Orange */}
        <path
          d="M18.5 6C11.5964 6 6 11.5964 6 18.5H18.5V6Z"
          fill="#D8663F"
        />
        {/* Top-right: Forest Green */}
        <path
          d="M21.5 6V18.5H34C34 11.5964 28.4036 6 21.5 6Z"
          fill="#506847"
        />
        {/* Bottom-left: Dark Forest Green */}
        <path
          d="M6 21.5C6 28.4036 11.5964 34 18.5 34V21.5H6Z"
          fill="#344934"
        />
        {/* Bottom-right: Warm Peach */}
        <path
          d="M21.5 34C28.4036 34 34 28.4036 34 21.5H21.5V34Z"
          fill="#E5987E"
        />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
        <span
          style={{
            fontFamily: "var(--font-body, system-ui)",
            fontWeight: 750,
            fontSize: size > 32 ? "1.28rem" : "1.1rem",
            color: "var(--mosaic-ink, #22352E)",
            letterSpacing: "-0.02em",
          }}
        >
          Mosaic
        </span>
        {showTagline && (
          <span
            style={{
              fontFamily: "var(--font-body, system-ui)",
              fontSize: "0.72rem",
              fontWeight: 500,
              color: "var(--mosaic-muted, #707877)",
              letterSpacing: "0.01em",
            }}
          >
            One lesson. Every learner.
          </span>
        )}
      </div>
    </div>
  );
}
