"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { Locale } from "@/lib/i18n-shared";

type Option = {
  text: string;
  correct: boolean;
  reply?: string;
  feedback: string;
};

const optionsByLocale: Record<Locale, Option[]> = {
  ru: [
    {
      text: "Да, я дома. Всё хорошо.",
      correct: true,
      reply: "Молодец! Помой руки и поешь суп.",
      feedback: "Спокойно ответил, что ты в безопасности — это главное.",
    },
    {
      text: "Не знаю.",
      correct: false,
      reply: "Где ты сейчас?",
      feedback: "Маме нужен ясный ответ: «Я дома» или «Я в школе».",
    },
    {
      text: "Не хочу разговаривать.",
      correct: false,
      feedback: "Близким нужно отвечать спокойно. Короткое «Я дома» помогает.",
    },
  ],
  uz: [
    {
      text: "Ha, men uydaman. Hammasi yaxshi.",
      correct: true,
      reply: "Barakalla! Qoʻlingni yuv va sho‘rva yeb ol.",
      feedback: "Xotirjam javob berding — eng muhimi sen xavfsizsan.",
    },
    {
      text: "Bilmayman.",
      correct: false,
      reply: "Hozir qayerdasan?",
      feedback: "Oyimga aniq javob kerak: «Men uydaman» yoki «Men maktabdaman».",
    },
    {
      text: "Gaplashgim kelmayapti.",
      correct: false,
      feedback: "Yaqinlaringga xotirjam javob ber. Qisqa «Men uydaman» yetadi.",
    },
  ],
};

const dict = {
  ru: {
    sender: "Мама",
    initial: "М",
    prompt: "Ты вернулся из школы? Я волнуюсь.",
    correct: "Правильно",
    soft: "Давай запомним",
    retry: "Попробовать ещё раз",
  },
  uz: {
    sender: "Oyim",
    initial: "O",
    prompt: "Maktabdan qaytdingmi? Xavotirdaman.",
    correct: "Toʻgʻri",
    soft: "Esda tutaylik",
    retry: "Yana urinib koʻrish",
  },
} as const;

export function HomeTrainerPreview() {
  const locale = useLocale();
  const t = dict[locale];
  const options = optionsByLocale[locale];

  const [chosen, setChosen] = useState<number | null>(null);
  const [showReply, setShowReply] = useState(false);

  function choose(i: number) {
    if (chosen !== null) return;
    setChosen(i);
    if (options[i].reply) {
      setTimeout(() => setShowReply(true), 600);
    } else {
      setShowReply(true);
    }
  }

  function reset() {
    setChosen(null);
    setShowReply(false);
  }

  const opt = chosen !== null ? options[chosen] : null;

  return (
    <div className="home-chat-preview">
      <div className="home-chat-msg home-chat-msg--from-mom">
        <span className="home-chat-avatar" aria-hidden="true">{t.initial}</span>
        <div>
          <strong>{t.sender}</strong>
          <p>{t.prompt}</p>
        </div>
      </div>

      {chosen !== null ? (
        <div className="home-chat-msg home-chat-msg--from-me">
          <p>{opt!.text}</p>
          <CabinetIcon name="check" />
        </div>
      ) : null}

      {showReply && opt?.reply ? (
        <div className="home-chat-msg home-chat-msg--from-mom home-chat-msg--reply">
          <p>{opt.reply}</p>
        </div>
      ) : null}

      {chosen === null ? (
        <div className="home-chat-options">
          {options.map((o, i) => (
            <button
              key={i}
              type="button"
              className="home-chat-option"
              onClick={() => choose(i)}
            >
              {o.text}
            </button>
          ))}
        </div>
      ) : (
        <div className={`home-chat-feedback home-chat-feedback--${opt?.correct ? "good" : "soft"}`}>
          <strong>{opt?.correct ? t.correct : t.soft}</strong>
          <p>{opt?.feedback}</p>
          <button type="button" className="home-chat-feedback-reset" onClick={reset}>
            {t.retry}
          </button>
        </div>
      )}
    </div>
  );
}
