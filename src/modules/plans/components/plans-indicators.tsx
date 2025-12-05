"use client";

import { ErrorState } from "@/components/error-state"
import { useErrorToast } from "@/hooks/use-error-toast"
import { usePlanCustomizerStore } from "@/lib/stores/plan-customizer-store"
import { memo, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { ADDITIONAL_COVERAGES, PLANS_CONFIG } from "../constants/customizer"
import { usePlansData } from "../hooks/usePlansData"
import { SkeletonPlansIndicators } from "./skeletons-plans"
type PlanId = (typeof PLANS_CONFIG)[number]["id"]

const PLAN_LABEL_KEYS: Record<PlanId, `plans:customizer.plans.${PlanId}`> = {
  basic: "plans:customizer.plans.basic",
  intermediate: "plans:customizer.plans.intermediate",
  premium: "plans:customizer.plans.premium",
}


function PlansIndicatorsComponent() {
  const { t } = useTranslation(["plans", "common"]);
  const {
    data: plansData,
    isLoading,
    isError,
    refetch,
  } = usePlansData()

  const selectedPlanId = usePlanCustomizerStore((state) => state.selectedPlanId);
  const vehicleValue = usePlanCustomizerStore((state) => state.vehicleValue);
  const clientAge = usePlanCustomizerStore((state) => state.clientAge);
  const coverages = usePlanCustomizerStore((state) => state.coverages);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }),
    []
  );

  const selectedCoverages = useMemo(
    () =>
      ADDITIONAL_COVERAGES.filter((coverage) => coverages[coverage.id]).map(
        (coverage) => t(`plans:customizer.coverages.${coverage.id}`)
      ),
    [coverages, t]
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
  })

  if (isLoading) return <SkeletonPlansIndicators />

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
        className="bg-gradient-glass border border-soft"
      />
    )
  }

  return (
    <div className="bg-gradient-glass border border-soft rounded-3xl p-8">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        {t("plans:indicators.title")}
      </h2>

      <div className="mb-6 rounded-2xl border border-soft bg-surface-contrast/60 p-4 text-sm text-muted-soft">
        <p className="font-medium">
          Plano selecionado:{" "}
          {t(
            PLAN_LABEL_KEYS[selectedPlanId as PlanId] ?? PLAN_LABEL_KEYS.basic
          )}
        </p>
        <p className="text-muted-soft">
          {t("plans:customizer.vehicleValue")}: {formatter.format(vehicleValue)} •{" "}
          {t("plans:customizer.age")}: {clientAge} {t("plans:customizer.ageSuffix")}
        </p>
        {selectedCoverages.length > 0 && (
        <p className="text-muted-soft">
            {t("plans:customizer.coveragesTitle")}: {selectedCoverages.join(", ")}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {plansData?.plansIndicators.map((indicator) => (
          <div
            key={indicator.name}
            className="bg-surface-contrast border border-soft rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground font-semibold text-lg">
                {indicator.name}
              </h3>
              <span className="text-foreground font-bold text-xl">
                {formatter.format(indicator.value)}
              </span>
            </div>

            <div className="flex gap-6">
              <div>
                <span className="text-muted-soft text-sm">Conversão: </span>
                <span
                  className={`font-semibold ${getConversionColor(
                    indicator.conversion
                  )}`}
                >
                  {indicator.conversion}%
                </span>
              </div>
              <div>
                <span className="text-muted-soft text-sm">ROI: </span>
                <span className={`font-semibold ${getRoiColor(indicator.roi)}`}>
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
