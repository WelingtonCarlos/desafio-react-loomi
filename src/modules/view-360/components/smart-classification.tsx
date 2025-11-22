"use client";

import type React from "react";

import { Progress } from "@/components/ui/progress";
import { Diamond } from "lucide-react";
import { useView360Data } from "../hooks/useView360Data";
import Image from "next/image";
import { SkeletonSmartClassification } from "./skeleton-view-360";

export function SmartClassification() {
  const { data: view360Data, isLoading: isLoadingView360Data } =
    useView360Data();
  const smartClassification = view360Data?.smartClassification;

  if (isLoadingView360Data) { return <SkeletonSmartClassification />;
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

  const retentionColor =
    smartClassification.retetionScore?.level?.toLowerCase() === "alto"
      ? "#22c55e"
      : smartClassification.retetionScore?.level?.toLowerCase() === "médio"
      ? "#eab308"
      : "#ef4444";

  return (
    <div className="rounded-2xl border border-white/5 bg-linear-to-br from-[#28335098] via-[#28335098]/60 to-[#28335098]/10 p-6">
      <h2 className="mb-4 text-base font-semibold text-slate-50">
        Classificação inteligente
      </h2>

      <div className="flex flex-col gap-6 lg:flex-row ">
        <div className="flex w-full h-56 flex-col items-center justify-between rounded-2xl border border-slate-800 bg-[#212639] px-8 py-4 lg:max-w-sm">
          {/* Gauge “semicírculo” + ícone */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-10 w-h-10 overflow-hidden rounded-full">
              <Image
                src="/diamond.png"
                alt="Diamond"
                width={80}
                height={80}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            <p className="text-lg font-semibold text-slate-50">
              {smartClassification.segment}
            </p>
          </div>

          {/* Métricas embaixo */}
          <div className="mt-6 grid w-full grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-xs text-slate-400">Life time value</p>
              <p className="mt-1 text-lg font-semibold text-slate-50">
                R{" "}
                {smartClassification.lifeTimeValue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Probabilidade de churn</p>
              <p className="mt-1 text-lg font-semibold text-emerald-400">
                {smartClassification.churnProbability}%
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          {/* Score de expansão */}
          <div className="rounded-2xl h-24 border border-slate-800 bg-[#212639] px-6 py-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-slate-200">Score de expansão</p>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${getScoreBadgeColor(
                  smartClassification.expansionScore.level
                )}`}
              >
                {smartClassification.expansionScore.level}
              </span>
            </div>
            <Progress
              value={smartClassification.expansionScore.value}
              className="h-2 bg-[#0f1623]"
              style={
                {
                  "--progress-indicator-color": expansionColor,
                } as React.CSSProperties
              }
            />
          </div>

          {/* Score de retenção */}
          <div className="rounded-2xl h-24 border border-slate-800 bg-[#212639] px-6 py-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-slate-200">Score de retenção</p>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${getScoreBadgeColor(
                  smartClassification.retetionScore?.level || ""
                )}`}
              >
                {smartClassification.retetionScore?.level || ""}
              </span>
            </div>
            <Progress
              value={smartClassification.retetionScore?.value || 0}
              className="h-2 bg-[#0f1623]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
