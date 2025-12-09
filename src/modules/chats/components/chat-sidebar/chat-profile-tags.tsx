"use client";

import { Badge } from "@/components/ui/badge";
import type { TFunction } from "i18next";

interface ChatProfileTagsProps {
  tags?: string[];
  t: TFunction<"chats">;
}

export function ChatProfileTags({ tags, t }: ChatProfileTagsProps) {
  return (
    <div className="flex space-y-2 px-6">
      <h3 className="text-foreground mr-6 text-sm font-medium">{t("sidebar.profile")}</h3>

      <div className="flex flex-wrap gap-4">
        {tags?.map((tag, index) => (
          <Badge variant="chatTag" key={index}>
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
