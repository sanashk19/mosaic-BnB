"use client";

/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { useLocale } from "@/components/locale-provider";
import { CabinetIcon } from "@/components/ui-icons";
import type { LessonScenario } from "@/data/program";
import type { Locale } from "@/lib/i18n-shared";

type SceneRole = {
  name: string;
  bg: string;
  setting: string;
  avatarSrc: string;
  avatarAlt: string;
};

const sceneByLocale: Record<Locale, Record<string, SceneRole>> = {
  ru: {
    "diagnostic": {
      name: "Учитель",
      bg: "#e2e8f0",
      setting: "Диагностический урок",
      avatarSrc: "/scene-characters/specialist.png",
      avatarAlt: "Учитель",
    },
    "digital-health": {
      name: "Врач",
      bg: "#fee2e2",
      setting: "Цифровое здоровье",
      avatarSrc: "/scene-characters/doctor.png",
      avatarAlt: "Врач",
    },
    "digital-home-economics": {
      name: "Мама",
      bg: "#fef3c7",
      setting: "Дома",
      avatarSrc: "/scene-characters/mother.png",
      avatarAlt: "Мама",
    },
    "digital-transport": {
      name: "Сосед",
      bg: "#dcfce7",
      setting: "На вокзале",
      avatarSrc: "/scene-characters/neighbor.png",
      avatarAlt: "Сосед",
    },
    "digital-communication": {
      name: "Мама",
      bg: "#dbeafe",
      setting: "Цифровая связь",
      avatarSrc: "/scene-characters/mother.png",
      avatarAlt: "Мама",
    },
    "digital-safety": {
      name: "Учитель",
      bg: "#e0e7ff",
      setting: "Безопасность в сети",
      avatarSrc: "/scene-characters/specialist.png",
      avatarAlt: "Учитель",
    },
    "digital-public-services": {
      name: "Специалист",
      bg: "#e0e7ff",
      setting: "Госуслуги и банк",
      avatarSrc: "/scene-characters/specialist.png",
      avatarAlt: "Специалист",
    },
  },
  uz: {
    "diagnostic": {
      name: "Oʻqituvchi",
      bg: "#e2e8f0",
      setting: "Diagnostika darsi",
      avatarSrc: "/scene-characters/specialist.png",
      avatarAlt: "Oʻqituvchi",
    },
    "digital-health": {
      name: "Shifokor",
      bg: "#fee2e2",
      setting: "Raqamli salomatlik",
      avatarSrc: "/scene-characters/doctor.png",
      avatarAlt: "Shifokor",
    },
    "digital-home-economics": {
      name: "Oyim",
      bg: "#fef3c7",
      setting: "Uyda",
      avatarSrc: "/scene-characters/mother.png",
      avatarAlt: "Oyim",
    },
    "digital-transport": {
      name: "Qoʻshni",
      bg: "#dcfce7",
      setting: "Vokzalda",
      avatarSrc: "/scene-characters/neighbor.png",
      avatarAlt: "Qoʻshni",
    },
    "digital-communication": {
      name: "Oyim",
      bg: "#dbeafe",
      setting: "Raqamli aloqa",
      avatarSrc: "/scene-characters/mother.png",
      avatarAlt: "Oyim",
    },
    "digital-safety": {
      name: "Oʻqituvchi",
      bg: "#e0e7ff",
      setting: "Internetda xavfsizlik",
      avatarSrc: "/scene-characters/specialist.png",
      avatarAlt: "Oʻqituvchi",
    },
    "digital-public-services": {
      name: "Mutaxassis",
      bg: "#e0e7ff",
      setting: "Davlat xizmatlari va bank",
      avatarSrc: "/scene-characters/specialist.png",
      avatarAlt: "Mutaxassis",
    },
  },
};

const defaultByLocale: Record<Locale, SceneRole> = {
  ru: {
    name: "Собеседник",
    bg: "#f1f5f9",
    setting: "Разговор",
    avatarSrc: "/scene-characters/specialist.png",
    avatarAlt: "Собеседник",
  },
  uz: {
    name: "Suhbatdosh",
    bg: "#f1f5f9",
    setting: "Suhbat",
    avatarSrc: "/scene-characters/specialist.png",
    avatarAlt: "Suhbatdosh",
  },
};

const dict = {
  ru: {
    situation: (i: number, total: number) => `Ситуация ${i} из ${total}`,
    pendingBelow: "Я выберу ответ ниже.",
    pendingRight: "Я выберу ответ справа.",
    you: "Ты",
    optionsHint: "Что ты скажешь?",
    correct: "Точно!",
    soft: "Посмотрим ещё раз",
    next: "Дальше →",
    finish: "Завершить →",
  },
  uz: {
    situation: (i: number, total: number) => `${total} dan ${i}-vaziyat`,
    pendingBelow: "Quyida javobni tanlayman.",
    pendingRight: "Oʻng tomondan javobni tanlayman.",
    you: "Sen",
    optionsHint: "Nima deysan?",
    correct: "Aniq!",
    soft: "Yana bir koʻrib chiqaylik",
    next: "Keyingisi →",
    finish: "Yakunlash →",
  },
} as const;

function getSceneForModule(locale: Locale, moduleSlug: string): SceneRole {
  return sceneByLocale[locale][moduleSlug] ?? defaultByLocale[locale];
}

type Props = {
  scenario: LessonScenario;
  moduleSlug: string;
  index: number;
  total: number;
  chosenIndex: number;
  onChoose: (i: number) => void;
  onNext: () => void;
  showControls?: boolean;
};

export function SceneScenario({
  scenario,
  moduleSlug,
  index,
  total,
  chosenIndex,
  onChoose,
  onNext,
  showControls = true,
}: Props) {
  const locale = useLocale();
  const t = dict[locale];
  const npc = getSceneForModule(locale, moduleSlug);
  const answered = chosenIndex !== -1;
  const correct = answered && chosenIndex === scenario.correctIndex;
  const chosenText = answered ? scenario.options[chosenIndex] : "";

  return (
    <div className="scene">
      <div className="scene-status">
        <span className="scene-setting">{npc.setting}</span>
        <span className="scene-step">{t.situation(index + 1, total)}</span>
      </div>

      <div
        className={`scene-stage scene-stage--${moduleSlug}`}
        style={{ "--scene-bg": npc.bg } as CSSProperties}
      >
        <div className="scene-character scene-character--npc">
          <div className="scene-avatar" aria-hidden="true">
            <img
              src={npc.avatarSrc}
              alt=""
              width={180}
              height={240}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <span className="scene-name">{npc.name}</span>
        </div>

        <div className="scene-dialogue">
          <div className="scene-bubble scene-bubble--npc">
            <p>{scenario.text}</p>
          </div>
          <div
            className={`scene-bubble scene-bubble--you ${
              answered ? "" : "scene-bubble--pending"
            }`}
          >
            <p>
              {answered
                ? chosenText
                : showControls
                  ? t.pendingBelow
                  : t.pendingRight}
            </p>
          </div>
        </div>

        <div className="scene-character scene-character--you">
          <div className="scene-avatar scene-avatar--you" aria-hidden="true">
            <img
              src="/mascot/dilnoza.png"
              alt=""
              width={120}
              height={180}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <span className="scene-name">{t.you}</span>
        </div>
      </div>

      {showControls ? (
        <div className="scene-options">
          <p className="scene-options-hint">{t.optionsHint}</p>
          {scenario.options.map((option, i) => {
            const isThis = chosenIndex === i;
            const showCorrect = answered && i === scenario.correctIndex;
            const showWrong = answered && isThis && !correct;
            return (
              <button
                key={i}
                type="button"
                className={`scene-option${isThis ? " selected" : ""}${showCorrect ? " correct" : ""}${showWrong ? " wrong" : ""}`}
                onClick={() => onChoose(i)}
                disabled={answered}
              >
                <span className="scene-option-marker">
                  {showCorrect ? (
                    <CabinetIcon name="check" />
                  ) : showWrong ? (
                    <CabinetIcon name="x" />
                  ) : (
                    i + 1
                  )}
                </span>
                <span className="scene-option-text">{option}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      {answered && showControls ? (
        <div className={`scene-feedback scene-feedback--${correct ? "good" : "soft"}`}>
          <strong>{correct ? t.correct : t.soft}</strong>
          <p>{correct ? scenario.feedback : scenario.support}</p>
          <button type="button" className="scene-next" onClick={onNext}>
            {index < total - 1 ? t.next : t.finish}
          </button>
        </div>
      ) : null}
    </div>
  );
}
