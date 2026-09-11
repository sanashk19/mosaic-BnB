"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { useLocale } from "@/components/locale-provider";
import type { HomepageLink } from "@/data/homepage-draft";

type HomepageHeroActionsProps = {
  primaryAction: HomepageLink;
  secondaryAction: HomepageLink;
};

const dict = {
  ru: { openCabinet: "Open account" },
  uz: { openCabinet: "Kabinetni ochish" },
} as const;

export function HomepageHeroActions({
  primaryAction,
  secondaryAction,
}: HomepageHeroActionsProps) {
  const { user } = useAuth();
  const locale = useLocale();
  const t = dict[locale];
  const resolvedPrimaryAction = user
    ? { label: t.openCabinet, href: "/dashboard" }
    : primaryAction;

  return (
    <div className="home-hero-actions">
      <Link className="button button-primary" href={resolvedPrimaryAction.href}>
        {resolvedPrimaryAction.label}
      </Link>
      <Link className="button button-secondary" href={secondaryAction.href}>
        {secondaryAction.label}
      </Link>
    </div>
  );
}
