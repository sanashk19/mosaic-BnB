"use client";

import type { ReactNode } from "react";

type IconBaseProps = {
  className?: string;
};

export type UiIconName =
  | "access"
  | "certificate"
  | "communication"
  | "device"
  | "health"
  | "kids"
  | "nature"
  | "parent"
  | "route"
  | "school"
  | "services"
  | "shield"
  | "shopping"
  | "text"
  | "users";

export type SocialIconName = "facebook" | "instagram" | "telegram" | "youtube";

function IconSvg({
  children,
  className,
}: IconBaseProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className={`app-ui-icon ${className ?? ""}`.trim()}
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  );
}

export function UiIcon({ name, className }: { name: UiIconName } & IconBaseProps) {
  switch (name) {
    /* Shopping cart — Lucide cart */
    case "shopping":
      return (
        <IconSvg className={className}>
          <circle className="icon-line" cx="9" cy="20" r="1.5" />
          <circle className="icon-line" cx="17" cy="20" r="1.5" />
          <path className="icon-line" d="M3 3h2l2.5 12.5a2 2 0 0 0 2 1.5h7.5a2 2 0 0 0 2-1.5L21 8H6" />
        </IconSvg>
      );

    /* Speech bubble with lines — modern chat */
    case "communication":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
        </IconSvg>);

    /* Heart-pulse - medicine / health */
    case "health":
      return (<IconSvg className={className}>
          <path className="icon-line" d="M19 14c1.5-1.5 3-3.5 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2 1.5 4 3 5.5l7 7Z" />
          <path className="icon-line" d="M3.22 12H9.5l.5-1 2 4 1.5-2H20.5" />
        </IconSvg>
      );

    /* Tree-pine — Lucide */
    case "nature":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M12 2 5 11h3l-4 5h4l-3 4h14l-3-4h4l-4-5h3Z" />
          <path className="icon-line" d="M12 20v2" />
        </IconSvg>
      );

    /* Smile / kid */
    case "kids":
      return (
        <IconSvg className={className}>
          <circle className="icon-line" cx="12" cy="12" r="10" />
          <path className="icon-line" d="M8 14s1.5 2 4 2 4-2 4-2" />
          <path className="icon-line" d="M9 9h.01M15 9h.01" />
        </IconSvg>
      );

    /* Two figures — parent + child */
    case "parent":
      return (
        <IconSvg className={className}>
          <circle className="icon-line" cx="9" cy="7" r="3" />
          <path className="icon-line" d="M3 21v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2" />
          <circle className="icon-line" cx="17" cy="11" r="2" />
          <path className="icon-line" d="M21 21v-1a3 3 0 0 0-3-3h-1" />
        </IconSvg>
      );

    /* Users — Lucide users */
    case "users":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle className="icon-line" cx="9" cy="7" r="4" />
          <path className="icon-line" d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path className="icon-line" d="M16 3.13a4 4 0 0 1 0 7.75" />
        </IconSvg>
      );

    /* Graduation cap — Lucide */
    case "school":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M22 10v6" />
          <path className="icon-line" d="M2 10l10-5 10 5-10 5z" />
          <path className="icon-line" d="M6 12v5c3 3 9 3 12 0v-5" />
        </IconSvg>
      );

    /* Accessibility — person silhouette */
    case "access":
      return (
        <IconSvg className={className}>
          <circle className="icon-line" cx="12" cy="4" r="2" />
          <path className="icon-line" d="M19 13v-2c-2 0-7 0-7 0H5" />
          <path className="icon-line" d="M11 13v9l-1-5h4l1 5" />
        </IconSvg>
      );

    /* Laptop / device — Lucide */
    case "device":
      return (
        <IconSvg className={className}>
          <rect className="icon-line" x="3" y="4" width="18" height="12" rx="2" />
          <path className="icon-line" d="M2 20h20" />
        </IconSvg>
      );

    /* Map pin / route — Lucide map-pin */
    case "route":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
          <circle className="icon-line" cx="12" cy="10" r="3" />
        </IconSvg>
      );

    /* Award — Lucide */
    case "certificate":
      return (
        <IconSvg className={className}>
          <circle className="icon-line" cx="12" cy="8" r="6" />
          <path className="icon-line" d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
        </IconSvg>
      );

    /* Shield-check — Lucide */
    case "shield":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .68-.95l7-2.5a1 1 0 0 1 .64 0l7 2.5A1 1 0 0 1 20 6Z" />
          <path className="icon-line" d="m9 12 2 2 4-4" />
        </IconSvg>
      );

    /* Book-open — Lucide */
    case "text":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z" />
          <path className="icon-line" d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z" />
        </IconSvg>);

    /* Building / government services */
    case "services":
    default:
      return (<IconSvg className={className}>
          <path className="icon-line" d="M3 22V8l9-5 9 5v14" />
          <path className="icon-line" d="M3 22h18" />
          <path className="icon-line" d="M10 22v-7h4v7" />
          <path className="icon-line" d="M8 11h.01M12 11h.01M16 11h.01" />
        </IconSvg>
      );
  }
}

export function ArrowIcon({ className }: IconBaseProps) {
  return (
    <IconSvg className={className}>
      <path className="icon-line" d="M5 12h14M12 5l7 7-7 7" />
    </IconSvg>
  );
}

// ── Cabinet navigation icons ──

export type CabinetIconName =
  | "home"
  | "book"
  | "trophy"
  | "help"
  | "bell"
  | "mail"
  | "gear"
  | "users"
  | "user"
  | "graduation"
  | "chart"
  | "chat"
  | "folder"
  | "download"
  | "filter"
  | "play"
  | "stop"
  | "check"
  | "x"
  | "calendar"
  | "school"
  | "flask"
  | "clipboard"
  | "history"
  | "sound"
  | "hand"
  | "lock"
  | "phone"
  | "signal"
  | "battery"
  | "circle"
  | "alert"
  | "clock"
  | "search"
  | "package"
  | "bottle"
  | "cup"
  | "drop"
  | "carton"
  | "menu"
  | "attach"
  | "mic"
  | "camera"
  | "video"
  | "dots-v"
  | "star"
  | "star-filled"
  | "heart"
  | "heart-filled"
  | "pencil"
  | "chevron-left"
  | "send"
  | "keypad"
  | "refresh";

export function CabinetIcon({ name, className }: { name: CabinetIconName } & IconBaseProps) {
  switch (name) {
    case "home":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-9Z" />
        </IconSvg>
      );

    case "book":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5a2.5 2.5 0 0 1-2.5-2.5v-13Z" />
          <path className="icon-line" d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" />
        </IconSvg>
      );

    case "trophy":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
          <path className="icon-line" d="M7 4H4v3a3 3 0 0 0 3 3M17 4h3v3a3 3 0 0 1-3 3" />
          <path className="icon-line" d="M10 17h4M12 14v3M9 21h6" />
        </IconSvg>
      );

    case "help":
      return (
        <IconSvg className={className}>
          <circle className="icon-line" cx="12" cy="12" r="9" />
          <path className="icon-line" d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5M12 17h.01" />
        </IconSvg>
      );

    case "bell":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10 21a2 2 0 0 0 4 0" />
        </IconSvg>
      );

    case "mail":
      return (
        <IconSvg className={className}>
          <rect className="icon-line" x="2" y="4" width="20" height="16" rx="2" />
          <path className="icon-line" d="m2 7 10 7 10-7" />
        </IconSvg>
      );

    case "gear":
      return (
        <IconSvg className={className}>
          <circle className="icon-line" cx="12" cy="12" r="3" />
          <path className="icon-line" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </IconSvg>
      );

    case "users":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle className="icon-line" cx="9" cy="7" r="4" />
          <path className="icon-line" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </IconSvg>
      );

    case "user":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle className="icon-line" cx="12" cy="7" r="4" />
        </IconSvg>
      );

    case "graduation":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path className="icon-line" d="M6 12v5c3 3 9 3 12 0v-5" />
        </IconSvg>
      );

    case "chart":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M3 3v18h18" />
          <path className="icon-line" d="m7 14 4-4 4 4 5-5" />
        </IconSvg>
      );

    case "chat":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </IconSvg>
      );

    case "folder":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </IconSvg>
      );

    case "download":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </IconSvg>
      );

    case "filter":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M22 3H2l8 9.46V19l4 2v-8.54L22 3Z" />
        </IconSvg>
      );

    case "play":
      return (
        <IconSvg className={className}>
          <polygon className="icon-fill" points="6,4 20,12 6,20" />
        </IconSvg>
      );

    case "stop":
      return (
        <IconSvg className={className}>
          <rect className="icon-fill" x="6" y="6" width="12" height="12" rx="2" />
        </IconSvg>
      );

    case "check":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M20 6 9 17l-5-5" />
        </IconSvg>
      );

    case "x":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M18 6 6 18M6 6l12 12" />
        </IconSvg>
      );

    case "calendar":
      return (
        <IconSvg className={className}>
          <rect className="icon-line" x="3" y="4" width="18" height="18" rx="2" />
          <path className="icon-line" d="M16 2v4M8 2v4M3 10h18" />
        </IconSvg>
      );

    case "school":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M3 21V9l9-6 9 6v12" />
          <path className="icon-line" d="M9 21V12h6v9" />
        </IconSvg>
      );

    case "flask":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M9 2v6L4 20a2 2 0 0 0 1.8 2.8h12.4A2 2 0 0 0 20 20L15 8V2" />
          <path className="icon-line" d="M8 2h8M7 15h10" />
        </IconSvg>
      );

    case "clipboard":
      return (
        <IconSvg className={className}>
          <rect className="icon-line" x="8" y="2" width="8" height="4" rx="1" />
          <path className="icon-line" d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path className="icon-line" d="M9 14l2 2 4-4" />
        </IconSvg>
      );

    case "history":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M3 12a9 9 0 1 0 3-6.7L3 8" />
          <path className="icon-line" d="M3 3v5h5M12 7v5l3 2" />
        </IconSvg>
      );

    case "sound":
      return (
        <IconSvg className={className}>
          <polygon className="icon-fill" points="11,5 6,9 2,9 2,15 6,15 11,19" />
          <path className="icon-line" d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </IconSvg>
      );

    case "hand":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v7M10 10.5V6a2 2 0 0 0-4 0v8" />
          <path className="icon-line" d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8H10a8 8 0 0 1-8-8 2 2 0 1 1 4 0" />
        </IconSvg>
      );

    case "lock":
      return (
        <IconSvg className={className}>
          <rect className="icon-line" x="5" y="10" width="14" height="11" rx="2" />
          <path className="icon-line" d="M8 10V7a4 4 0 0 1 8 0v3" />
          <path className="icon-line" d="M12 15v2" />
        </IconSvg>
      );

    case "phone":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.13.95.35 1.88.65 2.77a2 2 0 0 1-.45 2.11L9 10.9a16 16 0 0 0 4.1 4.1l1.3-1.3a2 2 0 0 1 2.11-.45c.89.3 1.82.52 2.77.65A2 2 0 0 1 22 16.92Z" />
        </IconSvg>
      );

    case "signal":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M4 20h2v-4H4v4ZM9 20h2v-8H9v8ZM14 20h2V8h-2v12ZM19 20h2V4h-2v16Z" />
        </IconSvg>
      );

    case "battery":
      return (
        <IconSvg className={className}>
          <rect className="icon-line" x="3" y="7" width="16" height="10" rx="2" />
          <path className="icon-line" d="M21 10v4M7 11v2M10 11v2M13 11v2" />
        </IconSvg>
      );

    case "circle":
      return (
        <IconSvg className={className}>
          <circle className="icon-line" cx="12" cy="12" r="8" />
        </IconSvg>
      );

    case "alert":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M10.3 4.2 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z" />
          <path className="icon-line" d="M12 9v4M12 17h.01" />
        </IconSvg>
      );

    case "clock":
      return (
        <IconSvg className={className}>
          <circle className="icon-line" cx="12" cy="12" r="9" />
          <path className="icon-line" d="M12 7v5l3 2" />
        </IconSvg>
      );

    case "search":
      return (
        <IconSvg className={className}>
          <circle className="icon-line" cx="11" cy="11" r="7" />
          <path className="icon-line" d="m20 20-3.5-3.5" />
        </IconSvg>
      );

    case "package":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path className="icon-line" d="m3.3 7 8.7 5 8.7-5M12 22V12" />
        </IconSvg>
      );

    case "bottle":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M10 2h4v3l1.5 2a3 3 0 0 1 .5 1.7V20a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8.7c0-.6.2-1.2.5-1.7L10 5V2Z" />
          <path className="icon-line" d="M9 5h6M8 13h8" />
        </IconSvg>
      );

    case "cup":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M6 4h12l-1 16a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 4Z" />
          <path className="icon-line" d="M6 4h12M9 9h6" />
        </IconSvg>
      );

    case "drop":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M12 2.5c4 5 7 9 7 12.5a7 7 0 0 1-14 0c0-3.5 3-7.5 7-12.5Z" />
        </IconSvg>
      );

    case "carton":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M7 8h10v13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8Z" />
          <path className="icon-line" d="M7 8 9 3h6l2 5M10 13h4" />
        </IconSvg>
      );

    case "menu":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M4 7h16M4 12h16M4 17h16" />
        </IconSvg>
      );

    case "attach":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M21 11.5 12.5 20a5.5 5.5 0 0 1-7.78-7.78l8.5-8.5a3.5 3.5 0 0 1 4.95 4.95l-8.5 8.5a1.5 1.5 0 0 1-2.12-2.12L15.5 7" />
        </IconSvg>
      );

    case "mic":
      return (
        <IconSvg className={className}>
          <rect className="icon-line" x="9" y="2" width="6" height="12" rx="3" />
          <path className="icon-line" d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8" />
        </IconSvg>
      );

    case "camera":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M14.5 4h-5l-2 3H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.5l-2-3Z" />
          <circle className="icon-line" cx="12" cy="13" r="3.5" />
        </IconSvg>
      );

    case "video":
      return (
        <IconSvg className={className}>
          <rect className="icon-line" x="2" y="6" width="14" height="12" rx="2" />
          <path className="icon-fill" d="m22 8-6 4 6 4V8Z" />
        </IconSvg>
      );

    case "dots-v":
      return (
        <IconSvg className={className}>
          <circle className="icon-fill" cx="12" cy="5" r="1.6" />
          <circle className="icon-fill" cx="12" cy="12" r="1.6" />
          <circle className="icon-fill" cx="12" cy="19" r="1.6" />
        </IconSvg>
      );

    case "star":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M12 2.5l3 6.6 7.3.8-5.4 4.9 1.6 7.1L12 18.4l-6.5 3.5 1.6-7.1L1.7 9.9l7.3-.8Z" />
        </IconSvg>
      );

    case "star-filled":
      return (
        <IconSvg className={className}>
          <path className="icon-fill" d="M12 2.5l3 6.6 7.3.8-5.4 4.9 1.6 7.1L12 18.4l-6.5 3.5 1.6-7.1L1.7 9.9l7.3-.8Z" />
        </IconSvg>
      );

    case "heart":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M12 21s-7-4.5-9-9.5C1.6 7.5 4 4 7.5 4c2 0 3.5 1.2 4.5 2.8C13 5.2 14.5 4 16.5 4 20 4 22.4 7.5 21 11.5c-2 5-9 9.5-9 9.5Z" />
        </IconSvg>
      );

    case "heart-filled":
      return (
        <IconSvg className={className}>
          <path className="icon-fill" d="M12 21s-7-4.5-9-9.5C1.6 7.5 4 4 7.5 4c2 0 3.5 1.2 4.5 2.8C13 5.2 14.5 4 16.5 4 20 4 22.4 7.5 21 11.5c-2 5-9 9.5-9 9.5Z" />
        </IconSvg>
      );

    case "pencil":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M14 4l6 6-11 11H3v-6Z" />
          <path className="icon-line" d="m13.5 4.5 6 6" />
        </IconSvg>
      );

    case "chevron-left":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M15 6l-6 6 6 6" />
        </IconSvg>
      );

    case "send":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M22 2 11 13M22 2 15 22l-4-9-9-4Z" />
        </IconSvg>
      );

    case "keypad":
      return (
        <IconSvg className={className}>
          <circle className="icon-fill" cx="6" cy="6" r="1.6" />
          <circle className="icon-fill" cx="12" cy="6" r="1.6" />
          <circle className="icon-fill" cx="18" cy="6" r="1.6" />
          <circle className="icon-fill" cx="6" cy="12" r="1.6" />
          <circle className="icon-fill" cx="12" cy="12" r="1.6" />
          <circle className="icon-fill" cx="18" cy="12" r="1.6" />
          <circle className="icon-fill" cx="6" cy="18" r="1.6" />
          <circle className="icon-fill" cx="12" cy="18" r="1.6" />
          <circle className="icon-fill" cx="18" cy="18" r="1.6" />
        </IconSvg>
      );

    case "refresh":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M3 12a9 9 0 0 1 15.5-6.3M21 12a9 9 0 0 1-15.5 6.3" />
          <path className="icon-line" d="M16 4h5v5M8 20H3v-5" />
        </IconSvg>
      );

    default:
      return null;
  }
}

export function GlobeIcon({ className }: IconBaseProps) {
  return (
    <IconSvg className={className}>
      <circle className="icon-line" cx="12" cy="12" r="9" />
      <path className="icon-line" d="M3 12h18" />
      <path className="icon-line" d="M12 3a14.5 14.5 0 0 1 0 18 14.5 14.5 0 0 1 0-18Z" />
    </IconSvg>
  );
}

export function MenuIcon({
  className,
  open = false,
}: IconBaseProps & { open?: boolean }) {
  return (
    <IconSvg className={className}>
      <path
        className="icon-line menu-icon-line menu-icon-line-top"
        d={open ? "M6 6 18 18" : "M4 7h16"}
      />
      <path
        className="icon-line menu-icon-line menu-icon-line-middle"
        d="M4 12h16"
        opacity={open ? 0 : 1}
      />
      <path
        className="icon-line menu-icon-line menu-icon-line-bottom"
        d={open ? "M18 6 6 18" : "M4 17h16"}
      />
    </IconSvg>
  );
}

export function SocialIcon({
  name,
  className,
}: { name: SocialIconName } & IconBaseProps) {
  switch (name) {
    case "youtube":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58Z" />
          <path className="icon-fill" d="m10 15 5-3-5-3v6Z" />
        </IconSvg>
      );

    case "instagram":
      return (
        <IconSvg className={className}>
          <rect className="icon-line" x="2" y="2" width="20" height="20" rx="6" />
          <circle className="icon-line" cx="12" cy="12" r="4" />
          <circle className="icon-fill" cx="17.5" cy="6.5" r="1.2" />
        </IconSvg>
      );

    case "facebook":
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
        </IconSvg>
      );

    case "telegram":
    default:
      return (
        <IconSvg className={className}>
          <path className="icon-line" d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7Z" />
          <path className="icon-line" d="M11 13l4 9" />
        </IconSvg>
      );
  }
}
