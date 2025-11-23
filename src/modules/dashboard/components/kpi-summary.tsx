"use client";

import { MetricCard } from "./metric-card";
import type { KpisResume } from "../types/dashboard.types";
import { useDashboardData } from "../hooks/useDashboardData";
import { useTranslation } from "react-i18next";

type KpiLabelKey =
  | "kpi.labels.arpu"
  | "kpi.labels.conversion"
  | "kpi.labels.retention"
  | "kpi.labels.churn";

const METRIC_CONFIG: Array<{
  key: keyof KpisResume;
  labelKey: KpiLabelKey;
  formatValue?: (value: number) => string;
}> = [
  {
    key: "arpu",
    labelKey: "kpi.labels.arpu",
    formatValue: (value) => `R$ ${value.toFixed(2)}`,
  },
  {
    key: "conversion",
    labelKey: "kpi.labels.conversion",
  },
  {
    key: "retention",
    labelKey: "kpi.labels.retention",
  },
  {
    key: "churn",
    labelKey: "kpi.labels.churn",
  },
];

export function KpiSummary() {
  const { data: dashboardResponse, isLoading } = useDashboardData();
  const resume = dashboardResponse?.kpisResume;
  const { t } = useTranslation("dashboard");

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 flex-1">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl h-[160px] bg-white/5 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 flex-1">
      {METRIC_CONFIG.map(({ key, labelKey, formatValue }) => {
        const metric = resume?.[key];
        const value = metric
          ? formatValue
            ? formatValue(metric.valor)
            : `${metric.valor.toFixed(1)}%`
          : "--";
        const change = metric ? `${metric.variacao}%` : "--";
        const isPositive = metric ? metric.variacao >= 0 : true;

        return (
          <MetricCard
            key={key}
            label={t(labelKey)}
            value={value}
            change={change}
            trend={isPositive ? "up" : "down"}
            trendColor={isPositive ? "text-green-500" : "text-red-500"}
            hasArrow
            periodLabel={t("messages.inPeriod")}
          />
        );
      })}
    </div>
  );
}
