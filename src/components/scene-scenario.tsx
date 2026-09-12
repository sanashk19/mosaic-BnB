"use client";

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
      name: "Teacher",
      bg: "#e2e8f0",
      setting: "Diagnostic lesson",
      avatarSrc: "/scene-characters/specialist.png",
      avatarAlt: "Teacher",
    },
    "digital-health": {
      name: "Doctor",
      bg: "#fee2e2",
      setting: "Digital Health & Hygiene",
      avatarSrc: "/scene-characters/doctor.png",
      avatarAlt: "Doctor",
    },
    "digital-home-economics": {
      name: "Mother",
      bg: "#fef3c7",
      setting: "At home",
      avatarSrc: "/scene-characters/mother.png",
      avatarAlt: "Mother",
    },
    "digital-transport": {
      name: "Neighbor",
      bg: "#dcfce7",
      setting: "At the station",
      avatarSrc: "/scene-characters/neighbor.png",
      avatarAlt: "Neighbor",
    },
    "digital-communication": {
      name: "Mother",
      bg: "#dbeafe",
      setting: "Digital communication",
      avatarSrc: "/scene-characters/mother.png",
      avatarAlt: "Mother",
    },
    "digital-safety": {
      name: "Teacher",
      bg: "#e0e7ff",
      setting: "Online Security",
      avatarSrc: "/scene-characters/specialist.png",
      avatarAlt: "Teacher",
    },
    "digital-public-services": {
      name: "Specialist",
      bg: "#e0e7ff",
      setting: "Public services and bank",
      avatarSrc: "/scene-characters/specialist.png",
      avatarAlt: "Specialist",
    },
  },
  uz: {
    "diagnostic": {
      name: "Teacher",
      bg: "#e2e8f0",
      setting: "Diagnostic lesson",
      avatarSrc: "/scene-characters/specialist.png",
      avatarAlt: "Teacher",
    },
    "digital-health": {
      name: "Doctor",
      bg: "#fee2e2",
      setting: "Digital Health & Hygiene",
      avatarSrc: "/scene-characters/doctor.png",
      avatarAlt: "Doctor",
    },
    "digital-home-economics": {
      name: "Mother",
      bg: "#fef3c7",
      setting: "At home",
      avatarSrc: "/scene-characters/mother.png",
      avatarAlt: "Mother",
    },
    "digital-transport": {
      name: "Neighbor",
      bg: "#dcfce7",
      setting: "At the station",
      avatarSrc: "/scene-characters/neighbor.png",
      avatarAlt: "Neighbor",
    },
    "digital-communication": {
      name: "Mother",
      bg: "#dbeafe",
      setting: "Digital communication",
      avatarSrc: "/scene-characters/mother.png",
      avatarAlt: "Mother",
    },
    "digital-safety": {
      name: "Teacher",
      bg: "#e0e7ff",
      setting: "Online Security",
      avatarSrc: "/scene-characters/specialist.png",
      avatarAlt: "Teacher",
    },
    "digital-public-services": {
      name: "Specialist",
      bg: "#e0e7ff",
      setting: "Public services and bank",
      avatarSrc: "/scene-characters/specialist.png",
      avatarAlt: "Specialist",
    },
  },
};

const defaultByLocale: Record<Locale, SceneRole> = {
  ru: {
    name: "Companion",
    bg: "#f1f5f9",
    setting: "Talk",
    avatarSrc: "/scene-characters/specialist.png",
    avatarAlt: "Companion",
  },
  uz: {
    name: "Companion",
    bg: "#f1f5f9",
    setting: "Talk",
    avatarSrc: "/scene-characters/specialist.png",
    avatarAlt: "Companion",
  },
};

const englishSceneDict = {
  situation: (i: number, total: number) => `Situation ${i} of ${total}`,
  pendingBelow: "I'll select the answer below.",
  pendingRight: "I'll select the answer on the right.",
  you: "You",
  optionsHint: "What will you say?",
  correct: "Exactly!",
  soft: "Let's check again",
  next: "Next →",
  finish: "Finish →",
} as const;

const dict = {
  ru: englishSceneDict,
  uz: englishSceneDict,
} as const;

function getSceneForModule(locale: Locale, moduleSlug: string): SceneRole {
  return sceneByLocale[locale][moduleSlug] ?? defaultByLocale[locale];
}

import { ScenarioCharacters } from "@/components/scenario-characters";

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

      {scenario.title ? (
        <h3 className="scene-prompt-title">{scenario.title}</h3>
      ) : null}

      <div
        className={`scene-stage scene-stage--${moduleSlug}`}
        style={{ "--scene-bg": npc.bg } as CSSProperties}
      >
        {/* Avatars standing on a shared baseline */}
        <ScenarioCharacters
          teacher={{
            name: npc.name,
            avatarSrc: npc.avatarSrc,
            avatarAlt: npc.avatarAlt,
          }}
          learner={{
            name: t.you,
            avatarSrc: "/mascot/dilnoza.png",
            avatarAlt: t.you,
            isPrimary: true,
          }}
        />

        {/* Dialogue thread */}
        <div className="scene-dialogue-thread">
          <div className="scene-dialogue-card scene-dialogue-card--teacher">
            <div className="scene-dialogue-speaker">
              <span className="scene-dialogue-dot scene-dialogue-dot--teacher" aria-hidden="true" />
              <span className="scene-dialogue-name">{npc.name}</span>
            </div>
            <p className="scene-dialogue-text">{scenario.text}</p>
          </div>

          <div
            className={`scene-dialogue-card scene-dialogue-card--learner ${
              answered ? "scene-dialogue-card--answered" : "scene-dialogue-card--pending"
            }`}
          >
            <div className="scene-dialogue-speaker">
              <span className="scene-dialogue-dot scene-dialogue-dot--learner" aria-hidden="true" />
              <span className="scene-dialogue-name">{t.you}</span>
            </div>
            <p className="scene-dialogue-text">
              {answered
                ? chosenText
                : showControls
                  ? t.pendingBelow
                  : t.pendingRight}
            </p>
          </div>
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
