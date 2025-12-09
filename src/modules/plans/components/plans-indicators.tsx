"use client";

import { ErrorState } from "@/components/error-state";
import { useErrorToast } from "@/hooks/use-error-toast";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { usePlansData } from "../hooks/usePlansData";
import { SkeletonPlansIndicators } from "./skeletons-plans";

function PlansIndicatorsComponent() {
  const { t } = useTranslation(["plans", "common"]);
  const { data: plansData, isLoading, isError, refetch } = usePlansData();

  const formatter = useMemo(
    () => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }),
    [],
  );

  useErrorToast(isError, {
    message: t("plans:errors.indicatorsTitle", {
      defaultValue: "Falha ao carregar os indicadores.",
    }),
    description: t("plans:errors.indicatorsDescription", {
      defaultValue: "Tente novamente em instantes.",
    }),
    toastId: "plans-indicators-error",
  });

  if (isLoading) return <SkeletonPlansIndicators />;

  if (isError) {
    return (
      <ErrorState
        title={t("plans:errors.indicatorsTitle", {
          defaultValue: "Falha ao carregar os indicadores.",
        })}
        description={t("plans:errors.indicatorsDescription", {
          defaultValue: "Tente novamente em instantes.",
        })}
        onRetry={refetch}
        className="bg-gradient-glass border-soft border"
      />
    );
  }

  return (
    <div className="bg-surface-card border-soft rounded-3xl border p-8">
      <h2 className="text-foreground mb-6 text-xl leading-4 font-bold">
        {t("plans:indicators.title")}
      </h2>

      <div className="space-y-4">
        {plansData?.plansIndicators.map((indicator) => (
          <div
            key={indicator.name}
            className="bg-surface-contrast-strong border-soft rounded-2xl border p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-foreground text-xl leading-8 font-bold">{indicator.name}</h3>
              <span className="text-foreground text-xl leading-8 font-bold">
                {formatter.format(indicator.value)}
              </span>
            </div>

            <div className="flex gap-6">
              <div>
                <span className="text-foreground text-sm leading-4 font-normal">Conversão: </span>
                <span
                  className={`text-success shadow-success-strong text-sm leading-4 font-normal shadow-2xl`}
                >
                  {indicator.conversion}%
                </span>
              </div>
              <div>
                <span className="text-foreground text-sm leading-4 font-normal">ROI: </span>
                <span
                  className={`text-success shadow-success-strong text-sm leading-4 font-normal shadow-2xl`}
                >
                  {indicator.roi}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const PlansIndicators = memo(PlansIndicatorsComponent);
PlansIndicators.displayName = "PlansIndicators";
