"use client";

import { memo } from "react";
import { useTranslation } from "react-i18next";
import type { ChatsData } from "../types/chats.types";
import { cn } from "@/lib/utils";

interface ChatMessagesProps {
  data?: ChatsData;
}

const bubbleStyles = {
  user: {
    wrapper: "justify-start",
    bubble:
      "bg-linear-to-r from-[#1875d2b9] to-[#1876D2] text-white rounded-t-2xl rounded-br-2xl shadow-[0_12px_32px_rgba(21,69,175,0.45)]",
    author: "text-xs font-semibold text-white/80 mb-1",
  },
  assistant: {
    wrapper: "justify-end",
    bubble:
      "bg-[#2C3144] text-white rounded-t-2xl rounded-bl-2xl border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
    author: "text-xs font-semibold text-white/70 mb-1",
  },
  suggestion: {
    wrapper: "justify-end",
    bubble:
      "bg-[#2C3144] text-white rounded-t-2xl rounded-bl-2xl border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
    author: "text-xs font-semibold text-white/60 mb-1 flex items-center gap-2",
  },
};

function ChatMessagesComponent({ data }: ChatMessagesProps) {
  const { t } = useTranslation("chats");
  const messages = data?.messages ?? [];

  if (!messages.length) {
    return (
      <div className="flex flex-1 items-center justify-center bg-chat-messages text-sm text-slate-500">
        {t("messages.empty")}
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 overflow-y-auto bg-chat-messages px-[104px] py-14">
      {messages.map((message) => {
        const style =
          message.type === "user_message"
            ? bubbleStyles.user
            : message.type === "assistant_message"
              ? bubbleStyles.assistant
              : bubbleStyles.suggestion;

        return (
          <div key={message.id} className={cn("flex w-full", style.wrapper)}>
            <div className={cn("max-w-[80%] px-4 py-3", style.bubble)}>
              <p className={style.author}>{message.author}</p>
              <p className="text-sm leading-relaxed">{message.content}</p>
              <div className="mt-3 flex items-center justify-end text-[11px] text-white/70">
                {message.timestamp}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const ChatMessages = memo(ChatMessagesComponent);
ChatMessages.displayName = "ChatMessages";
