"use client";

import { MetricCard } from "./metric-card";
import type { KpisResume } from "../types/dashboard.types";
import { useDashboardData } from "../hooks/useDashboardData";

const METRIC_CONFIG: Array<{
  key: keyof KpisResume;
  label: string;
  formatValue?: (value: number) => string;
}> = [
  {
    key: "arpu",
    label: "ARPU",
    formatValue: (value) => `R$ ${value.toFixed(2)}`,
  },
  {
    key: "conversion",
    label: "Conversão",
  },
  {
    key: "retention",
    label: "Retenção",
  },
  {
    key: "churn",
    label: "Churn",
  },
];

export function KpiSummary() {
  const { data: dashboardResponse, isLoading } = useDashboardData();
  const resume = dashboardResponse?.kpisResume;

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
      {METRIC_CONFIG.map(({ key, label, formatValue }) => {
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
            label={label}
            value={value}
            change={change}
            trend={isPositive ? "up" : "down"}
            trendColor={isPositive ? "text-green-500" : "text-red-500"}
            hasArrow
          />
        );
      })}
    </div>
  );
}
