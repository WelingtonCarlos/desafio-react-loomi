"use client";

import { ErrorState } from "@/components/error-state";
import { Button } from "@/components/ui/button";
import { useErrorToast } from "@/hooks/use-error-toast";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useView360Data } from "../hooks/useView360Data";
import { SkeletonAISuggestions } from "./skeleton-view-360";
import { AI_SUGGESTION_TABS, type AISuggestionTabKey } from "../constants";

export function AISuggestions() {
  const { t } = useTranslation("view360");
  const { data: view360Data, isLoading, error, refetch } = useView360Data();
  const [activeTab, setActiveTab] = useState<AISuggestionTabKey>(AI_SUGGESTION_TABS[0].key);

  useErrorToast(!!error, {
    message: t("view360:errors.suggestionsTitle", {
      defaultValue: "Não foi possível carregar as sugestões.",
    }),
    description: t("aiSuggestions.error", {
      defaultValue: "Verifique sua conexão e tente novamente.",
    }),
    toastId: "view360-ai-suggestions-error",
  });

  const sugestionsIA = view360Data?.sugestionsIA;
  const currentSuggestion = useMemo(() => sugestionsIA?.[activeTab], [sugestionsIA, activeTab]);

  const handleTabChange = useCallback((key: AISuggestionTabKey) => setActiveTab(key), []);

  if (isLoading) return <SkeletonAISuggestions />;

  if (error) {
    return (
      <ErrorState
        title={t("view360:errors.suggestionsTitle", {
          defaultValue: "Não foi possível carregar as sugestões.",
        })}
        description={t("aiSuggestions.error", {
          defaultValue: "Verifique sua conexão e tente novamente.",
        })}
        onRetry={refetch}
        className="bg-gradient-glass border-soft h-[536px] w-full border"
      />
    );
  }

  if (!currentSuggestion) {
    return (
      <ErrorState
        title={t("aiSuggestions.emptyTitle", {
          defaultValue: "Nenhuma sugestão disponível.",
        })}
        description={t("aiSuggestions.empty", {
          defaultValue: "Assim que tivermos novas recomendações, elas aparecerão aqui.",
        })}
        className="bg-gradient-glass border-soft h-[536px] w-full border"
        onRetry={refetch}
        retryLabel={t("common:actions.reload", { defaultValue: "Recarregar" })}
      />
    );
  }

  return (
    <div className="bg-gradient-glass border-soft h-[536px] w-full rounded-2xl border p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-foreground text-2xl leading-4 font-bold">{t("aiSuggestions.title")}</h2>
        <div className="bg-surface-contrast-strong flex w-56 justify-between rounded-full px-3 py-2">
          {AI_SUGGESTION_TABS.map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "ghost"}
              size="sm"
              onClick={() => handleTabChange(tab.key)}
              className={
                activeTab === tab.key
                  ? "bg-brand hover:bg-brand-strong text-brand-foreground shadow-brand h-11 w-14 cursor-pointer rounded-full p-3 shadow-2xl"
                  : "text-foreground hover:bg-brand-name bg-color-foreground h-11 w-14 cursor-pointer rounded-full p-3"
              }
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-surface-contrast-strong h-[400px] space-y-6 rounded-2xl pt-6 pb-12">
        <div className="px-6">
          <h3 className="text-muted-soft mb-2 text-lg leading-4 font-semibold">
            {t("aiSuggestions.offerLabel")}
          </h3>
          <p className="text-foreground text-sm leading-4 font-normal">{currentSuggestion.offer}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 px-6">
          <div>
            <p className="text-muted-soft mb-1 text-sm">{t("aiSuggestions.valueLabel")}</p>
            <p className="text-foreground text-2xl font-semibold">
              R$ {currentSuggestion.value.toFixed(2)}/mês
            </p>
          </div>
          <div>
            <p className="text-foreground mb-1 text-sm">{t("aiSuggestions.conversionLabel")}</p>
            <p className="text-success text-2xl font-semibold">
              {currentSuggestion.conversionProbability}%
            </p>
          </div>
        </div>

        <hr />

        <div className="flex flex-col gap-4 px-6">
          <h4 className="text-foreground mb-3 text-lg leading-4 font-semibold">
            {t("aiSuggestions.reasonWhy")}
          </h4>
          <div className="space-y-2">
            {currentSuggestion.reasonsWhy.map((reason, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-brand shadow-brand bg-brand mt-0.5 h-2 w-2 shrink-0 self-center rounded-full shadow-2xl" />
                <p className="text-foreground text-sm">{reason}</p>
              </div>
            ))}
          </div>
        </div>

        <Button className="bg-brand hover:bg-brand-strong shadow-brand text-brand-foreground ml-9 w-48 rounded-full px-4 py-3 text-xs leading-4 shadow">
          {t("aiSuggestions.cta")}
        </Button>
      </div>
    </div>
  );
}
