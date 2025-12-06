"use client";

import type { AppAction } from "@/modules/view-360/types/view-360.types";
import type { TFunction } from "i18next";

interface ChatAppActionsProps {
  actions?: AppAction[];
  t: TFunction<"chats">;
}

export function ChatAppActions({ actions, t }: ChatAppActionsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-white">{t("sidebar.appActions")}</h3>
      <div className="space-y-3">
        {actions && actions.length > 0 ? (
          actions.map((action, index) => (
            <div key={`${action.action}-${index}`}>
              <p className="mb-0.5 text-[11px] text-slate-500">{action.accessed}</p>
              <p className="text-xs text-slate-200">{action.action}</p>
              {action.pageTime && (
                <p className="text-[11px] text-slate-500">
                  {t("sidebar.timeOnPage", { time: action.pageTime })}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-[11px] text-slate-500">{t("sidebar.noData")}</p>
        )}
      </div>
    </div>
  );
}
