"use client";

import type React from "react";

import { ErrorState } from "@/components/error-state";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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

  return (
    <div className="border-soft bg-smart-card rounded-2xl border p-6">
      <h2 className="text-foreground mb-4 text-base font-semibold">
        {t("smartClassification.title")}
      </h2>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="border-soft bg-view-360 flex h-[216px] w-full flex-col items-center justify-between rounded-2xl border px-8 py-4 lg:max-w-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="relative flex h-20 w-36 items-center justify-center">
              <Image
                src="/ellipse.png"
                alt="Ellipse background"
                width={64}
                height={64}
                className="absolute inset-0 h-full w-full object-contain"
                priority
              />
              <Image
                src="/diamond.png"
                alt="Diamond"
                width={32}
                height={32}
                className="relative z-10 h-8 w-8 self-end object-contain"
                priority
              />
            </div>

            <p className="text-foreground text-lg font-semibold">{smartClassification.segment}</p>
          </div>

          <div className="mt-6 grid w-full grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-muted-soft text-[10px] leading-4 font-semibold">
                {t("smartClassification.lifeTimeValue")}
              </p>
              <p className="text-foreground mt-1 text-xl leading-4 font-semibold">
                R${" "}
                {smartClassification.lifeTimeValue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <p className="text-muted-soft text-[10px] leading-4 font-semibold">
                {t("smartClassification.churnProbability")}
              </p>
              <p className="text-success mt-1 text-xl leading-4 font-semibold">
                {smartClassification.churnProbability}%
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          {/* Score de expansão */}
          <div className="border-soft bg-view-360 h-24 rounded-2xl border px-6 py-4">
            <div className="mb-3 flex items-center space-x-4">
              <p className="text-foreground text-sm">{t("smartClassification.expansionScore")}</p>
              <Badge
                variant={
                  smartClassification.expansionScore.level.toLowerCase() === "alto"
                    ? "positive"
                    : "warning"
                }
              >
                {smartClassification.expansionScore.level}
              </Badge>
            </div>
            <Progress
              value={smartClassification.expansionScore.value}
              className="h-2 bg-[#343a4a]"
              color={
                smartClassification.expansionScore.level.toLowerCase() === "alto"
                  ? "success"
                  : "warning"
              }
            />
          </div>

          {/* Score de retenção */}
          <div className="border-soft bg-view-360 h-24 rounded-2xl border px-6 py-4">
            <div className="mb-3 flex items-center space-x-4">
              <p className="text-foreground text-sm">{t("smartClassification.retentionScore")}</p>
              <Badge
                variant={
                  (smartClassification.retetionScore?.level || "").toLowerCase() === "alto"
                    ? "positive"
                    : "warning"
                }
              >
                {smartClassification.retetionScore?.level || ""}
              </Badge>
            </div>
            <Progress
              value={smartClassification.retetionScore?.value || 0}
              className="h-2 bg-[#343a4a]"
              color={
                (smartClassification.retetionScore?.level || "").toLowerCase() === "alto"
                  ? "success"
                  : "warning"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
