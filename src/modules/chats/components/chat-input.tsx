"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

interface ChatInputProps {
  onSendMessage?: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const { t } = useTranslation("chats");

  const handleSend = useCallback(() => {
    if (message.trim()) {
      onSendMessage?.(message);
      setMessage("");
    }
  }, [message, onSendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return (
    <div className="bg-chat-messages px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="relative mx-5 flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("input.placeholder")}
            rows={1}
            className="border-foreground bg-surface-contrast-strong h-20 resize-none rounded-full border px-5 py-3 pr-16 text-sm text-white placeholder:text-slate-500"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="absolute top-1/2 right-2 h-10 w-10 -translate-y-1/2 rounded-full bg-blue-500 text-white shadow-[0_8px_18px_rgba(37,99,235,0.45)] hover:bg-blue-600"
          >
            <SendIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
