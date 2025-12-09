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
      <h3 className="text-foreground mb-2 text-xl leading-4 font-bold">
        {t("sidebar.aiSuggestion")}
      </h3>
      <p className="text-foreground mb-4 w-2/3 text-sm leading-4 font-normal">{suggestion}</p>
      <Button className="bg-brand-name shadow-brand-name hover:bg-brand-name h-8 w-full rounded-full text-xs font-medium text-white shadow-2xl">
        {t("sidebar.useSuggestion")}
      </Button>
    </div>
  );
}
