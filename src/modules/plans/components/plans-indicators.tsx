"use client";

import { useTranslation } from "react-i18next";
import { usePlansData } from "../hooks/usePlansData";
import { SkeletonPlansIndicators } from "./skeletons-plans";

export function PlansIndicators() {
  const { t } = useTranslation(["plans", "common"])
  const { data: plansData, isLoading } = usePlansData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

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

  if (isLoading) return <SkeletonPlansIndicators />;

  return (
    <div className="bg-linear-to-br from-[#28335098] via-[#28335098 ]/60 to-[#28335098 ]/10 border border-white/5 rounded-3xl p-8">
      <h2 className="text-xl font-semibold text-white mb-6">{t("plans:indicators.title")}</h2>

      <div className="space-y-4">
        {plansData?.plansIndicators.map((indicator) => (
          <div
            key={indicator.name}
            className="bg-[#1a2332] border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">
                {indicator.name}
              </h3>
              <span className="text-white font-bold text-xl">
                {formatCurrency(indicator.value)}
              </span>
            </div>

            <div className="flex gap-6">
              <div>
                <span className="text-gray-400 text-sm">Conversão: </span>
                <span
                  className={`font-semibold ${getConversionColor(
                    indicator.conversion
                  )}`}
                >
                  {indicator.conversion}%
                </span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">ROI: </span>
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
