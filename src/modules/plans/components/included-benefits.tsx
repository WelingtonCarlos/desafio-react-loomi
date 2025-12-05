"use client";

import { ErrorState } from "@/components/error-state"
import { useErrorToast } from "@/hooks/use-error-toast"
import { useTranslation } from "react-i18next"
import { usePlansData } from "../hooks/usePlansData"
import { SkeletonIncludedBenefits } from "./skeletons-plans"

export function IncludedBenefits() {
  const { t } = useTranslation(["plans", "common"])
  const {
    data: plansData,
    isLoading,
    isError,
    refetch,
  } = usePlansData()

  useErrorToast(isError, {
    message: t("plans:errors.includedBenefitsTitle", {
      defaultValue: "Não foi possível carregar os benefícios.",
    }),
    description: t("plans:errors.includedBenefitsDescription", {
      defaultValue: "Tente novamente em alguns instantes.",
    }),
    toastId: "plans-included-benefits-error",
  })

  if (isLoading) return <SkeletonIncludedBenefits />

  if (isError) {
    return (
      <ErrorState
        title={t("plans:errors.includedBenefitsTitle", {
          defaultValue: "Não foi possível carregar os benefícios.",
        })}
        description={t("plans:errors.includedBenefitsDescription", {
          defaultValue: "Tente novamente em alguns instantes.",
        })}
        onRetry={refetch}
        className="bg-gradient-glass border border-soft"
      />
    )
  }

  return (
    <div className="bg-gradient-glass border border-soft rounded-3xl p-8">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        {t("plans:includedBenefits.title")}
      </h2>

      <div className="flex flex-wrap gap-3">
        {plansData?.includedBenefits.map((benefit, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-surface-contrast border border-soft rounded-full px-4 py-2"
          >
            <div className="w-2 h-2 rounded-full bg-brand" />
            <span className="text-muted-soft text-sm">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
