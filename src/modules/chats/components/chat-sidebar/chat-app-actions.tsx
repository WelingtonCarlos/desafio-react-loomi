"use client";

import type { AppAction } from "@/modules/view-360/types/view-360.types";
import type { TFunction } from "i18next";

interface ChatAppActionsProps {
  actions?: AppAction[];
  t: TFunction<"chats">;
}

export function ChatAppActions({ actions, t }: ChatAppActionsProps) {
  return (
    <div className="space-y-3 px-6">
      <h3 className="text-foreground text-base leading-4 font-medium">{t("sidebar.appActions")}</h3>
      <div className="space-y-3">
        {actions && actions.length > 0 ? (
          actions.map((action, index) => (
            <div key={`${action.action}-${index}`}>
              <p className="text-muted-soft mb-1 text-[12px] leading-4 font-normal">
                {action.accessed}
              </p>
              <p className="text-foreground mb-1 text-sm leading-4 font-normal">{action.action}</p>
              {action.pageTime && (
                <p className="text-muted-soft text-[12px] leading-4 font-normal">
                  {t("sidebar.timeOnPage", { time: action.pageTime })}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-muted-soft text-[12px] leading-4 font-normal">{t("sidebar.noData")}</p>
        )}
      </div>
    </div>
  );
}
