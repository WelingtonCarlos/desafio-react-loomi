"use client";

import { ErrorState } from "@/components/error-state";
import { Button } from "@/components/ui/button";
import { useErrorToast } from "@/hooks/use-error-toast";
import { useView360Data } from "../hooks/useView360Data";
import { SkeletonSuggestionsCards } from "./skeleton-view-360";
import { useTranslation } from "react-i18next";

export function SuggestionCards() {
  const { t } = useTranslation("view360");
  const { data: view360Data, isLoading: isLoadingView360Data, isError, refetch } = useView360Data();

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
  });

  if (isLoadingView360Data) return <SkeletonSuggestionsCards />;

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
        className="bg-gradient-glass border-soft border"
      />
    );
  }

  return (
    <div className="flex flex-row justify-between space-y-6 2xl:flex-col 2xl:justify-start">
      <div className="bg-gradient-brand-card flex h-64 w-[312px] flex-col justify-between rounded-2xl p-6 text-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.35)]">
        <div>
          <h3 className="mb-2 text-lg font-semibold">{t("suggestionCards.life.title")}</h3>

          <p className="mb-4 text-sm text-white/90">
            {secureLifeOffer ?? t("suggestionCards.life.description")}
          </p>

          <p className="mt-10 mb-1 text-xs text-white/80">{t("suggestionCards.priceLabel")}</p>

          <div className="flex items-center justify-between">
            <p className="text-[20px] font-semibold">
              R$ {secureLifeValue?.toFixed(2).replace(".", ",")} {t("common.perMonthSuffix")}
            </p>

            <Button className="h-10 rounded-full bg-white px-6 font-medium text-[#0050C8] shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:bg-white/90">
              {t("common.perMonthSuffix")}
            </Button>
          </div>
        </div>
      </div>

      {/* CARD 2 — Upgrade residencial (bg escuro, botão com borda branca) */}
      <div className="bg-gradient-glass border-soft text-foreground flex h-64 w-[312px] flex-col justify-between rounded-2xl border p-6">
        <div>
          <h3 className="mb-2 text-lg font-semibold">{t("suggestionCards.home.title")}</h3>

          <p className="text-muted-soft mb-4 text-sm">{t("suggestionCards.home.description")}</p>

          <p className="text-muted-soft mt-10 mb-1 text-xs">{t("suggestionCards.priceLabel")}</p>

          <div className="flex items-center justify-between">
            <p className="text-[20px] font-semibold">R$ 127,50 {t("common.perMonthSuffix")}</p>

            <Button className="border-soft text-foreground h-10 rounded-full border bg-transparent px-6 font-medium hover:bg-white/10">
              {t("aiSuggestions.cta")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
