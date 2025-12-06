"use client";

import { Button } from "@/components/ui/button";
import type { Client } from "@/modules/view-360/types/view-360.types";
import type { TFunction } from "i18next";
import { Eye, Mail, Phone } from "lucide-react";

interface ChatClientCardProps {
  client?: Client;
  t: TFunction<"chats">;
}

const ACTIONS = [
  { icon: Phone, labelKey: "sidebar.actions.call" },
  { icon: Mail, labelKey: "sidebar.actions.email" },
  { icon: Eye, labelKey: "sidebar.actions.viewMore" },
] as const;

const getInitials = (name?: string) => {
  if (!name) return "--";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function ChatClientCard({ client, t }: ChatClientCardProps) {
  return (
    <div className="flex flex-col items-center space-y-3 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-xl font-medium text-white">
        {getInitials(client?.name)}
      </div>
      <div>
        <h2 className="text-base font-semibold text-white">{client?.name}</h2>
        <p className="text-sm text-slate-400">{client?.clientType}</p>
      </div>

      <div className="flex w-full gap-2">
        {ACTIONS.map(({ icon: Icon, labelKey }) => (
          <Button
            key={labelKey}
            variant="ghost"
            size="sm"
            className="flex h-12 flex-1 cursor-pointer flex-col items-center justify-center gap-1 text-xs text-slate-300 hover:text-white"
          >
            <Icon className="h-4 w-4 text-blue-400" />
            <span>{t(labelKey)}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
