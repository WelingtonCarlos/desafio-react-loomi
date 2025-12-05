"use client";

import { Button } from "@/components/ui/button"
import { ErrorState } from "@/components/error-state"
import { useErrorToast } from "@/hooks/use-error-toast"
import { CheckCircle2 } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useView360Data } from "../hooks/useView360Data"
import { SkeletonAISuggestions } from "./skeleton-view-360"

const tabs = [
  { key: "NBO" as const, label: "NBO" },
  { key: "NBA" as const, label: "NBA" },
  { key: "NBX" as const, label: "NBX" },
];

export function AISuggestions() {
  const { t } = useTranslation("view360")
  const {
    data: view360Data,
    isLoading,
    error,
    refetch,
    isError,
  } = useView360Data()
  const [activeTab, setActiveTab] = useState<"NBO" | "NBA" | "NBX">("NBO");

  const sugestionsIA = view360Data?.sugestionsIA;
  const currentSuggestion = useMemo(
    () => sugestionsIA?.[activeTab],
    [sugestionsIA, activeTab]
  );

  const handleTabChange = useCallback(
    (key: "NBO" | "NBA" | "NBX") => setActiveTab(key),
    []
  );

  if (isLoading) return <SkeletonAISuggestions />;

  useErrorToast(!!error, {
    message: t("view360:errors.suggestionsTitle", {
      defaultValue: "Não foi possível carregar as sugestões.",
    }),
    description: t("aiSuggestions.error", {
      defaultValue: "Verifique sua conexão e tente novamente.",
    }),
    toastId: "view360-ai-suggestions-error",
  })

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
        className="w-full h-[536px] bg-gradient-glass border border-soft"
      />
    )
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
        className="w-full h-[536px] bg-gradient-glass border border-soft"
        onRetry={refetch}
        retryLabel={t("common:actions.reload", { defaultValue: "Recarregar" })}
      />
    )
  }

  return (
    <div className="w-full h-[536px] bg-gradient-glass border border-soft rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-foreground">{t("aiSuggestions.title")}</h2>
        <div className="flex bg-surface-contrast-strong rounded-full px-3 py-2 w-56 justify-between">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "ghost"}
              size="sm"
              onClick={() => handleTabChange(tab.key)}
              className={
                activeTab === tab.key
                  ? "bg-brand hover:bg-brand-strong text-brand-foreground rounded-full w-12"
                  : "text-muted-soft hover:text-foreground bg-surface-panel rounded-full w-12"
              }
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-6 rounded-2xl bg-surface-contrast-strong">
        <div>
          <h3 className="text-sm text-muted-soft mb-2">{t("aiSuggestions.offerLabel")}</h3>
          <p className="text-foreground font-medium">{currentSuggestion.offer}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-soft mb-1">{t("aiSuggestions.valueLabel")}</p>
            <p className="text-2xl font-semibold text-foreground">
              R$ {currentSuggestion.value.toFixed(2)}/mês
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-soft mb-1">
              {t("aiSuggestions.conversionLabel")}
            </p>
            <p className="text-2xl font-semibold text-green-500">
              {currentSuggestion.conversionProbability}%
            </p>
          </div>
        </div>

        <hr />

        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">{t("aiSuggestions.reasonWhy")}</h4>
          <div className="space-y-2">
            {currentSuggestion.reasonsWhy.map((reason, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                <p className="text-sm text-muted-soft">{reason}</p>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-48 bg-brand hover:bg-brand-strong shadow-brand text-brand-foreground rounded-full">
          {t("aiSuggestions.cta")}
        </Button>
      </div>
    </div>
  );
}
