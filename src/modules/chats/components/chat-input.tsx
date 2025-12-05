"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
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
    [handleSend]
  );

  return (
    <div className="border-t border-slate-800/60 px-6 py-4 bg-[#050816]">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("input.placeholder")}
            rows={1}
            className="min-h-[52px] max-h-[120px] resize-none rounded-full border border-slate-800 bg-[#151a23] px-5 py-3 pr-16 text-sm text-white placeholder:text-slate-500"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-blue-500 text-white shadow-[0_8px_18px_rgba(37,99,235,0.45)] hover:bg-blue-600"
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
