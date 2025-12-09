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
    <div className="flex flex-row justify-around space-y-6 2xl:flex-col 2xl:justify-start">
      <div className="bg-gradient-brand-card flex h-64 w-[312px] flex-col justify-between rounded-2xl p-6 text-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.35)]">
        <div>
          <h3 className="mb-2 text-xl leading-8 font-bold whitespace-pre-line">
            {t("suggestionCards.life.title").replace(/(.*)\s(\S+)$/, "$1\n$2")}
          </h3>

          <p className="text-foreground mb-4 text-sm leading-4 font-normal">
            {secureLifeOffer ?? t("suggestionCards.life.description")}
          </p>

          <p className="text-muted-soft mt-10 mb-1 text-xs">{t("suggestionCards.priceLabel")}</p>

          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">
              R$ {secureLifeValue?.toFixed(2).replace(".", ",")} {t("common.perMonthSuffix")}
            </p>

            <Button className="bg-brand-name shadow-brand-name hover:bg-brand-name h-10 cursor-pointer rounded-full px-6 font-medium text-white shadow-2xl">
              {t("suggestionCards.button")}
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-smart-card border-soft text-foreground flex h-64 w-[312px] flex-col justify-between rounded-2xl border p-6">
        <div>
          <h3 className="mb-2 text-xl leading-8 font-bold whitespace-pre-line">
            {t("suggestionCards.home.title").replace(/(.*)\s(\S+)$/, "$1\n$2")}
          </h3>

          <p className="text-foreground mb-4 text-sm leading-4 font-normal">
            {t("suggestionCards.home.description")}
          </p>

          <p className="text-muted-soft mt-10 mb-1 text-xs leading-4 font-normal">
            {t("suggestionCards.priceLabel")}
          </p>

          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">R$ 127,50 {t("common.perMonthSuffix")}</p>

            <Button className="h-10 cursor-pointer rounded-full border border-white bg-transparent px-6 font-medium text-white shadow-2xl hover:bg-transparent">
              {t("suggestionCards.button")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
