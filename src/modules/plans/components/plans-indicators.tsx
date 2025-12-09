"use client";

import { ErrorState } from "@/components/error-state";
import { useErrorToast } from "@/hooks/use-error-toast";
import { usePlanCustomizerStore } from "@/lib/stores/plan-customizer-store";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ADDITIONAL_COVERAGES } from "../constants/customizer";
import { PLAN_LABEL_KEYS, type PlanId } from "../constants/ui";
import { usePlansData } from "../hooks/usePlansData";
import { SkeletonPlansIndicators } from "./skeletons-plans";

function PlansIndicatorsComponent() {
  const { t } = useTranslation(["plans", "common"]);
  const { data: plansData, isLoading, isError, refetch } = usePlansData();

  const selectedPlanId = usePlanCustomizerStore((state) => state.selectedPlanId);
  const vehicleValue = usePlanCustomizerStore((state) => state.vehicleValue);
  const clientAge = usePlanCustomizerStore((state) => state.clientAge);
  const coverages = usePlanCustomizerStore((state) => state.coverages);

  const formatter = useMemo(
    () => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }),
    [],
  );

  const selectedCoverages = useMemo(
    () =>
      ADDITIONAL_COVERAGES.filter((coverage) => coverages[coverage.id]).map((coverage) =>
        t(`plans:customizer.coverages.${coverage.id}`),
      ),
    [coverages, t],
  );

  const getConversionColor = (conversion: number) => {
    if (conversion >= 70) return "text-green-400";
    if (conversion >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  const getRoiColor = (roi: number) => {
    if (roi >= 150) return "text-green-400";
    if (roi >= 100) return "text-yellow-400";
    return "text-orange-400";
  };

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
      <h2 className="text-foreground mb-6 text-xl font-bold leading-4">{t("plans:indicators.title")}</h2>

      <div className="space-y-4">
        {plansData?.plansIndicators.map((indicator) => (
          <div
            key={indicator.name}
            className="bg-surface-contrast-strong border-soft rounded-2xl border p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-foreground text-xl font-bold leading-8">{indicator.name}</h3>
              <span className="text-foreground text-xl font-bold leading-8">
                {formatter.format(indicator.value)}
              </span>
            </div>

            <div className="flex gap-6">
              <div>
                <span className="text-foreground leading-4 font-normal text-sm">Conversão: </span>
                <span className={`font-normal leading-4 text-sm text-success shadow-2xl shadow-success-strong`}>
                  {indicator.conversion}%
                </span>
              </div>
              <div>
                <span className="text-foreground leading-4 font-normal text-sm">ROI: </span>
                <span className={`font-normal leading-4 text-sm text-success shadow-2xl shadow-success-strong `}>
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
