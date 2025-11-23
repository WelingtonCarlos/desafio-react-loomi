"use client";

import { Button } from "@/components/ui/button";
import type { ChatsData } from "../types/chats.types";
import { useTranslation } from "react-i18next";

interface ChatMessagesProps {
  data?: ChatsData;
}

export function ChatMessages({ data }: ChatMessagesProps) {
  const { t } = useTranslation("chats");
  const messages = data?.messages ?? [];

  if (!messages.length) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#050816] text-sm text-slate-500">
        {t("messages.empty")}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-[#050816]">
      {messages.map((message) => {
        if (message.type === "assistant_message") {
          return (
            <div key={message.id} className="flex justify-start">
              <div className="max-w-[70%]">
                <div className="rounded-2xl rounded-tl-sm bg-[#151a23] px-4 py-3 text-white shadow-sm">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <div className="mt-1 flex items-center gap-1 px-2">
                  <span className="text-xs text-slate-500">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            </div>
          );
        }

        if (message.type === "ai_suggestion") {
          return (
            <div key={message.id} className="flex justify-center">
              <div className="w-full max-w-[80%]">
                <div className="rounded-2xl bg-[#151a23] px-5 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.45)] border border-white/10">
                  <div className="mb-3 flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-purple-500 to-blue-500">
                      <span className="text-xs font-bold text-white">IA</span>
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 text-xs text-slate-400">
                        {message.author}
                      </p>
                      <p className="text-sm leading-relaxed text-slate-100">
                        {message.content}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button className="flex-1 rounded-full bg-blue-500 text-xs font-medium text-white hover:bg-blue-600">
                      {t("messages.actions.sendProposal")}
                    </Button>
                    <Button className="flex-1 rounded-full bg-blue-500/10 text-xs font-medium text-blue-300 border border-blue-500/40 hover:bg-blue-500/15">
                      {t("messages.actions.call")}
                    </Button>
                    <Button className="flex-1 rounded-full bg-slate-800/60 text-xs font-medium text-slate-100 border border-slate-700 hover:bg-slate-700/80">
                      {t("messages.actions.viewHistory")}
                    </Button>
                  </div>

                  <div className="mt-2 flex items-center justify-end px-1">
                    <span className="text-xs text-slate-500">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
