"use client";

import type { TFunction } from "i18next";

interface ChatProfileTagsProps {
  tags?: string[];
  t: TFunction<"chats">;
}

export function ChatProfileTags({ tags, t }: ChatProfileTagsProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-white">{t("sidebar.profile")}</h3>
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="rounded-full border border-blue-500/40 bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
