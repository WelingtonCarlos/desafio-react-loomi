"use client";

import type { ChatConversationAnalysis } from "../../types/chats.types";
import Image from "next/image";

interface FutureStepsCardProps {
  futureSteps?: ChatConversationAnalysis["futureSteps"];
}

export function FutureStepsCard({ futureSteps }: FutureStepsCardProps) {
  if (!futureSteps) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-linear-to-br from-[#58606e] via-[#4e5462] to-[#5d6270] p-6">
      <div className="absolute top-4 right-4 text-blue-400 opacity-20">
        <Image src="/pin.png" alt="Conversation Analysis" width={64} height={64} />
      </div>
      <h3 className="text-foreground mb-3 text-xl leading-4 font-bold">{futureSteps.title}</h3>
      <div className="space-y-2">
        {futureSteps.actions.map((action) => (
          <div key={action.id} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-2xl shadow-cyan-400/20" />
            <p className="text-foreground w-2/3 text-sm font-normal">{action.action}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
