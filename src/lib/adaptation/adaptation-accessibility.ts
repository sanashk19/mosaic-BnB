/**
 * Accessibility helper utilities for Mosaic Adaptive Engine.
 * Supports screen readers, aria-live dynamic announcements, and semantic labeling.
 */

export function announceLiveRegion(message: string, priority: "polite" | "assertive" = "polite"): void {
  if (typeof document === "undefined") return;

  let announcer = document.getElementById("mosaic-live-announcer");
  if (!announcer) {
    announcer = document.createElement("div");
    announcer.id = "mosaic-live-announcer";
    announcer.setAttribute("aria-live", priority);
    announcer.setAttribute("aria-atomic", "true");
    announcer.style.position = "absolute";
    announcer.style.width = "1px";
    announcer.style.height = "1px";
    announcer.style.margin = "-1px";
    announcer.style.padding = "0";
    announcer.style.overflow = "hidden";
    announcer.style.clip = "rect(0, 0, 0, 0)";
    announcer.style.border = "0";
    announcer.style.whiteSpace = "nowrap";
    document.body.appendChild(announcer);
  }

  announcer.setAttribute("aria-live", priority);
  announcer.textContent = "";
  setTimeout(() => {
    if (announcer) {
      announcer.textContent = message;
    }
  }, 50);
}
