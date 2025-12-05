"use client";

import { Button } from "@/components/ui/button"
import { ErrorState } from "@/components/error-state"
import { useErrorToast } from "@/hooks/use-error-toast"
import { useView360Data } from "../hooks/useView360Data"
import { SkeletonSuggestionsCards } from "./skeleton-view-360"
import { useTranslation } from "react-i18next"

export function SuggestionCards() {
  const { t } = useTranslation("view360")
  const {
    data: view360Data,
    isLoading: isLoadingView360Data,
    isError,
    refetch,
  } = useView360Data()

  const secureLifeValue = view360Data?.sugestionsIA.NBO.value;
  const secureLifeOffer = view360Data?.sugestionsIA.NBO.offer;

  useErrorToast(isError, {
    message: t("view360:errors.suggestionsTitle", {
      defaultValue: "Não foi possível carregar as sugestões.",
    }),
    description: t("view360:errors.suggestionsDescription", {
      defaultValue: "Tente novamente em instantes.",
    }),
    toastId: "view360-suggestions-cards-error",
  })

  if (isLoadingView360Data) return <SkeletonSuggestionsCards />

  if (isError) {
    return (
      <ErrorState
        title={t("view360:errors.suggestionsTitle", {
          defaultValue: "Não foi possível carregar as sugestões.",
        })}
        description={t("view360:errors.suggestionsDescription", {
          defaultValue: "Tente novamente em instantes.",
        })}
        onRetry={refetch}
        className="bg-gradient-glass border border-soft"
      />
    )
  }

  return (
    <div className="space-y-6 justify-between 2xl:justify-start flex flex-row 2xl:flex-col">
      <div className="h-64 w-[312px]  rounded-2xl p-6 text-white bg-gradient-brand-card shadow-[0_8px_20px_-4px_rgba(0,0,0,0.35)] flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            {t("suggestionCards.life.title")}
          </h3>

          <p className="text-sm text-white/90 mb-4">
            {secureLifeOffer ??
              t("suggestionCards.life.description")}
          </p>

          <p className="text-xs text-white/80 mb-1 mt-10">{t("suggestionCards.priceLabel")}</p>

          <div className="flex items-center justify-between">
            <p className="text-[20px] font-semibold">
              R$ {secureLifeValue?.toFixed(2).replace(".", ",")} {t("common.perMonthSuffix")}
            </p>

            <Button className="h-10 px-6 rounded-full bg-white text-[#0050C8] font-medium shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:bg-white/90">
              {t("common.perMonthSuffix")}
            </Button>
          </div>
        </div>
      </div>

      {/* CARD 2 — Upgrade residencial (bg escuro, botão com borda branca) */}
      <div className="h-64 w-[312px] bg-gradient-glass border border-soft rounded-2xl p-6 text-foreground flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            {t("suggestionCards.home.title")}
          </h3>

          <p className="text-sm text-muted-soft mb-4">
            {t("suggestionCards.home.description")}
          </p>

          <p className="text-xs text-muted-soft mb-1 mt-10">{t("suggestionCards.priceLabel")}</p>

          <div className="flex items-center justify-between">
            <p className="text-[20px] font-semibold">R$ 127,50 {t("common.perMonthSuffix")}</p>

            <Button className="h-10 px-6 rounded-full border border-soft bg-transparent text-foreground font-medium hover:bg-white/10">
              {t("aiSuggestions.cta")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
