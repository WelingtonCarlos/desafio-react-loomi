"use client";

import type { ChatConversationAnalysis } from "../../types/chats.types";
import Image from "next/image";

interface ConversationInsightsCardProps {
  insights?: ChatConversationAnalysis["insights"];
}

export function ConversationInsightsCard({ insights }: ConversationInsightsCardProps) {
  if (!insights) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-linear-to-br from-[#58606e] via-[#4e5462] to-[#5d6270] p-6">
      <div className="absolute top-4 right-4 text-cyan-400 opacity-20">
        <Image
          src="/brain.png"
          alt="Conversation Analysis"
          width={64}
          height={64}
          className="z-50"
        />
      </div>
      <h3 className="text-foreground mb-2 text-xl leading-4 font-bold">{insights.title}</h3>
      <div className="space-y-2">
        {insights.insights.map((insight) => (
          <div key={insight.id} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
            <p className="text-foreground w-2/3 text-sm font-normal">{insight.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
