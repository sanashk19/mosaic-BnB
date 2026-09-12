"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";

export type CharacterInfo = {
  name: string;
  role?: string;
  avatarSrc: string;
  avatarAlt?: string;
  isPrimary?: boolean;
};

type ScenarioCharactersProps = {
  teacher?: CharacterInfo | null;
  learner?: CharacterInfo | null;
  companion?: CharacterInfo | null;
  className?: string;
};

export function ScenarioCharacters({
  teacher,
  learner,
  companion,
  className = "",
}: ScenarioCharactersProps) {
  const characters: (CharacterInfo & { type: "teacher" | "learner" | "companion" })[] = [];

  if (teacher) {
    characters.push({ ...teacher, type: "teacher" });
  }
  if (learner) {
    characters.push({ ...learner, type: "learner" });
  }
  if (companion) {
    characters.push({ ...companion, type: "companion" });
  }

  if (characters.length === 0) {
    return null;
  }

  return (
    <div className={`scenario-characters-stage ${className}`} aria-label="Scenario characters">
      <div className="scenario-characters-baseline">
        {characters.map((char, index) => {
          const isLearner = char.type === "learner" || char.isPrimary;
          return (
            <div
              key={`${char.name}-${index}`}
              className={`scenario-character-frame scenario-character-frame--${char.type} ${
                isLearner ? "scenario-character-frame--primary" : ""
              }`}
            >
              <div className="scenario-character-figure">
                <img
                  src={char.avatarSrc}
                  alt={char.avatarAlt || char.name}
                  className="scenario-character-img"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="scenario-character-name-tag">{char.name}</span>
            </div>
          );
        })}
      </div>
      <div className="scenario-characters-floor-line" aria-hidden="true" />
    </div>
  );
}
