"use client";

import { ErrorState } from "@/components/error-state";
import { useErrorToast } from "@/hooks/use-error-toast";
import { useDashboardKpiStore } from "@/lib/stores/dashboard-kpi-store";
import { useTranslation } from "react-i18next";
import { KPI_METRIC_MAP, METRIC_CONFIG } from "../constants/ui";
import { useDashboardData } from "../hooks/useDashboardData";
import { MetricCard } from "./metric-card";

export function KpiSummary() {
  const { data: dashboardResponse, isLoading, isError, refetch } = useDashboardData();
  const resume = dashboardResponse?.kpisResume;
  const { t } = useTranslation("dashboard");
  const activeKpi = useDashboardKpiStore((state) => state.activeKpi);

  const activeMetricKey = KPI_METRIC_MAP[activeKpi];

  useErrorToast(isError, {
    message: t("dashboard:errors.kpiSummaryTitle", {
      defaultValue: "Não foi possível carregar o resumo dos KPIs.",
    }),
    description: t("dashboard:errors.kpiSummaryDescription", {
      defaultValue: "Atualize a página ou tente novamente.",
    }),
    toastId: "kpi-summary-error",
  });

  if (isLoading) {
    return (
      <div className="grid flex-1 grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-[160px] animate-pulse rounded-3xl bg-white/5" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title={t("dashboard:errors.kpiSummaryTitle", {
          defaultValue: "Não foi possível carregar o resumo dos KPIs.",
        })}
        description={t("dashboard:errors.kpiSummaryDescription", {
          defaultValue: "Atualize a página ou tente novamente.",
        })}
        onRetry={refetch}
        className="bg-gradient-slate border-soft min-h-[180px] w-full border"
      />
    );
  }

  return (
    <div className="grid flex-1 grid-cols-2 gap-6">
      {METRIC_CONFIG.map(({ key, labelKey, formatValue }, index) => {
        const metric = resume?.[key];
        const value = metric
          ? formatValue
            ? formatValue(metric.valor)
            : `${metric.valor.toFixed(1)}%`
          : "--";
        const change = metric ? `${metric.variacao}%` : "--";
        const isPositive = metric ? metric.variacao >= 0 : true;
        const isActive = key === activeMetricKey;
        const shouldShowArrow = index === 0 || index === METRIC_CONFIG.length - 1;

        return (
          <MetricCard
            key={key}
            label={t(labelKey)}
            value={value}
            change={change}
            trend={isPositive ? "up" : "down"}
            trendColor={isPositive ? "text-green-500" : "text-red-500"}
            hasArrow={shouldShowArrow}
            periodLabel={t("messages.inPeriod")}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
}
