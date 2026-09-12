/**
 * Real-time Captions & Visual Cues engine for Mosaic Hearing Support profile.
 * Every spoken instruction becomes visible text, and sound alerts become visible status badges.
 */

export type CaptionEventType = "speech" | "sound" | "alert" | "success" | "notification";

export type CaptionItem = {
  id: string;
  type: CaptionEventType;
  tag: string;
  text: string;
  highlightKeyword?: string;
  timestamp: number;
};

export const SOUND_VISUAL_CUES: Record<
  string,
  { tag: string; label: string; icon: string }
> = {
  success: {
    tag: "✓ SOUND",
    label: "Success chime played",
    icon: "bell",
  },
  alert: {
    tag: "⚠️ ALERT",
    label: "Warning alert tone",
    icon: "warning",
  },
  message: {
    tag: "💬 NOTIFICATION",
    label: "Incoming message chime",
    icon: "message",
  },
  click: {
    tag: "🔊 CUE",
    label: "Button click sound",
    icon: "click",
  },
};

export function formatCaption(
  type: CaptionEventType,
  text: string,
  highlightKeyword?: string,
): CaptionItem {
  const id = `cap-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  let tag = "CC";
  if (type === "sound") tag = "SOUND CUE";
  if (type === "alert") tag = "ALERT";
  if (type === "success") tag = "CORRECT";
  if (type === "notification") tag = "NOTIFICATION";

  return {
    id,
    type,
    tag,
    text,
    highlightKeyword,
    timestamp: Date.now(),
  };
}
