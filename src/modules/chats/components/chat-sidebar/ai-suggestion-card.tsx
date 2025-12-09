"use client";

import { Button } from "@/components/ui/button";
import type { TFunction } from "i18next";
import Image from "next/image";

interface AISuggestionCardProps {
  suggestion?: string;
  t: TFunction<"chats">;
}

export function AISuggestionCard({ suggestion, t }: AISuggestionCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-linear-to-br from-[#1a2332] to-[#151a23] p-6">
      <div className="absolute top-4 right-4 text-blue-400 opacity-20">
        <Image
          src="/brilho.png"
          alt="Conversation Analysis"
          width={64}
          height={64}
          className="z-50"
        />
      </div>
      <h3 className="mb-2 font-bold text-xl leading-4 text-foreground">{t("sidebar.aiSuggestion")}</h3>
      <p className="mb-4 text-sm leading-4 text-foreground w-2/3 font-normal">{suggestion}</p>
      <Button className="h-8 w-full rounded-full bg-brand-name shadow-brand-name shadow-2xl text-xs font-medium text-white hover:bg-brand-name">
        {t("sidebar.useSuggestion")}
      </Button>
    </div>
  );
}
