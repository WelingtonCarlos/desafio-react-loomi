"use client";

import type React from "react";

import { Progress } from "@/components/ui/progress";
import { Diamond } from "lucide-react";
import { useView360Data } from "../hooks/useView360Data";

export function SmartClassification() {
  const { data: view360Data, isLoading: isLoadingView360Data } =
    useView360Data();
  const smartClassification = view360Data?.smartClassification;

  if (isLoadingView360Data) {
    return <div>Carregando...</div>;
  }

  const getScoreColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "alto":
        return "bg-green-500";
      case "médio":
        return "bg-yellow-500";
      case "baixo":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getScoreBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "alto":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "médio":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "baixo":
        return "bg-red-500/20 text-red-500 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/30";
    }
  };

  return (
    <div className="bg-linear-to-br from-[#28335098] via-[#28335098 ]/60 to-[#28335098 ]/10 border border-white/5 rounded-2xl p-6">
      <h2 className="text-lg font-medium text-white mb-6">
        Classificação inteligente
      </h2>

      <div className="flex flex-col lg:flex-row items-center gap-6 mb-6">
        {/* Gauge visualization */}
        <div className="relative w-48 h-48 shrink-0">
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 border-8 border-[#0f1623]" />
          <div className="absolute inset-4 rounded-full bg-[#0f1623] flex flex-col items-center justify-center">
            <Diamond className="w-10 h-10 text-blue-500 mb-2" />
            <p className="text-2xl font-bold text-white">
              {smartClassification?.segment}
            </p>
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Life time value</p>
              <p className="text-2xl font-semibold text-white">
                R${" "}
                {smartClassification?.lifeTimeValue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">
                Probabilidade de churn
              </p>
              <p className="text-2xl font-semibold text-green-500">
                {smartClassification?.churnProbability}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Expansion Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-300">Score de expansão</p>
            <span
              className={`px-2 py-1 text-xs rounded-full border ${getScoreBadgeColor(
                smartClassification?.expansionScore?.level || ""
              )}`}
            >
              {smartClassification?.expansionScore.level}
            </span>
          </div>
          <Progress
            value={smartClassification?.expansionScore.value}
            className="h-2 bg-[#0f1623]"
            style={
              {
                "--progress-indicator-color":
                  smartClassification?.expansionScore.level.toLowerCase() ===
                  "alto"
                    ? "#22c55e"
                    : smartClassification?.expansionScore.level.toLowerCase() ===
                      "médio"
                    ? "#eab308"
                    : "#ef4444",
              } as React.CSSProperties
            }
          />
        </div>

        {/* Retention Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-300">Score de retenção</p>
            <span
              className={`px-2 py-1 text-xs rounded-full border ${getScoreBadgeColor(
                smartClassification?.retetionScore?.level || ""
              )}`}
            >
              {smartClassification?.retetionScore?.level || ""}
            </span>
          </div>
          <Progress
            value={smartClassification?.retetionScore?.value || 0}
            className="h-2 bg-[#0f1623]"
            style={
              {
                "--progress-indicator-color":
                  smartClassification?.retetionScore?.level?.toLowerCase() ===
                  "alto"
                    ? "#22c55e"
                    : smartClassification?.retetionScore?.level?.toLowerCase() ===
                      "médio"
                    ? "#eab308"
                    : "#ef4444",
              } as React.CSSProperties
            }
          />
        </div>
      </div>
    </div>
  );
}
