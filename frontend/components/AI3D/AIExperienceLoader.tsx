"use client";

import dynamic from "next/dynamic";

const AIExperience = dynamic(
  () => import("./AIExperience"),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-[280px] items-center justify-center rounded-2xl border border-border bg-muted/20"
        aria-label="Loading AI experience"
      >
        <span className="text-sm text-muted-foreground">
          Loading AI experience...
        </span>
      </div>
    ),
  }
);

export default function AIExperienceLoader() {
  return <AIExperience />;
}