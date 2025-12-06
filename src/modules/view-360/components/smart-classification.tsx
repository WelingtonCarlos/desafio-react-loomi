"use client";

import type React from "react";

import { ErrorState } from "@/components/error-state";
import { Progress } from "@/components/ui/progress";
import { useView360Data } from "../hooks/useView360Data";
import Image from "next/image";
import { SkeletonSmartClassification } from "./skeleton-view-360";
import { useTranslation } from "react-i18next";
import { useErrorToast } from "@/hooks/use-error-toast";

export function SmartClassification() {
  const { t } = useTranslation("view360");
  const { data: view360Data, isLoading: isLoadingView360Data, isError, refetch } = useView360Data();
  const smartClassification = view360Data?.smartClassification;

  useErrorToast(isError, {
    message: t("view360:errors.smartClassificationTitle", {
      defaultValue: "Não conseguimos carregar a classificação inteligente.",
    }),
    description: t("view360:errors.smartClassificationDescription", {
      defaultValue: "Tente novamente em alguns instantes.",
    }),
    toastId: "view360-smart-classification-error",
  });

  if (isLoadingView360Data) {
    return <SkeletonSmartClassification />;
  }

  if (isError) {
    return (
      <ErrorState
        title={t("view360:errors.smartClassificationTitle", {
          defaultValue: "Não conseguimos carregar a classificação inteligente.",
        })}
        description={t("view360:errors.smartClassificationDescription", {
          defaultValue: "Tente novamente em alguns instantes.",
        })}
        onRetry={refetch}
        className="bg-gradient-glass border-soft border"
      />
    );
  }

  if (!smartClassification) return null;

  const getScoreBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "alto":
        return "bg-green-500/15 text-green-400 border-green-500/40";
      case "médio":
        return "bg-yellow-500/15 text-yellow-400 border-yellow-500/40";
      case "baixo":
        return "bg-red-500/15 text-red-400 border-red-500/40";
      default:
        return "bg-slate-500/15 text-slate-300 border-slate-500/40";
    }
  };

  const expansionColor =
    smartClassification.expansionScore.level.toLowerCase() === "alto"
      ? "#22c55e"
      : smartClassification.expansionScore.level.toLowerCase() === "médio"
        ? "#eab308"
        : "#ef4444";

  return (
    <div className="border-soft bg-gradient-glass rounded-2xl border p-6">
      <h2 className="text-foreground mb-4 text-base font-semibold">
        {t("smartClassification.title")}
      </h2>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="border-soft bg-surface-contrast flex h-56 w-full flex-col items-center justify-between rounded-2xl border px-8 py-4 lg:max-w-sm">
          {/* Gauge “semicírculo” + ícone */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-h-10 relative h-10 overflow-hidden rounded-full">
              <Image
                src="/diamond.png"
                alt="Diamond"
                width={80}
                height={80}
                className="h-full w-full object-contain"
                priority
              />
            </div>

            <p className="text-foreground text-lg font-semibold">{smartClassification.segment}</p>
          </div>

          {/* Métricas embaixo */}
          <div className="mt-6 grid w-full grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-muted-soft text-xs">{t("smartClassification.lifeTimeValue")}</p>
              <p className="text-foreground mt-1 text-lg font-semibold">
                R{" "}
                {smartClassification.lifeTimeValue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <p className="text-muted-soft text-xs">{t("smartClassification.churnProbability")}</p>
              <p className="mt-1 text-lg font-semibold text-emerald-400">
                {smartClassification.churnProbability}%
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          {/* Score de expansão */}
          <div className="border-soft bg-surface-contrast h-24 rounded-2xl border px-6 py-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-muted-soft text-sm">{t("smartClassification.expansionScore")}</p>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${getScoreBadgeColor(
                  smartClassification.expansionScore.level,
                )}`}
              >
                {smartClassification.expansionScore.level}
              </span>
            </div>
            <Progress
              value={smartClassification.expansionScore.value}
              className="bg-surface-panel h-2"
              style={
                {
                  "--progress-indicator-color": expansionColor,
                } as React.CSSProperties
              }
            />
          </div>

          {/* Score de retenção */}
          <div className="border-soft bg-surface-contrast h-24 rounded-2xl border px-6 py-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-muted-soft text-sm">{t("smartClassification.retentionScore")}</p>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${getScoreBadgeColor(
                  smartClassification.retetionScore?.level || "",
                )}`}
              >
                {smartClassification.retetionScore?.level || ""}
              </span>
            </div>
            <Progress
              value={smartClassification.retetionScore?.value || 0}
              className="bg-surface-panel h-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
