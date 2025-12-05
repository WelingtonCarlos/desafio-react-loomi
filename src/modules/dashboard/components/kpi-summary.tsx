"use client";

import { ErrorState } from "@/components/error-state"
import { useErrorToast } from "@/hooks/use-error-toast"
import { useDashboardKpiStore } from "@/lib/stores/dashboard-kpi-store"
import { useTranslation } from "react-i18next"
import type { KpiType } from "../constants/kpi-config"
import { useDashboardData } from "../hooks/useDashboardData"
import type { KpisResume } from "../types/dashboard.types"
import { MetricCard } from "./metric-card"

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

const KPI_METRIC_MAP: Record<KpiType, keyof KpisResume> = {
  arpuTrend: "arpu",
  conversionTrend: "conversion",
  retentionTrend: "retention",
  churnTrend: "churn",
};

export function KpiSummary() {
  const {
    data: dashboardResponse,
    isLoading,
    isError,
    refetch,
  } = useDashboardData()
  const resume = dashboardResponse?.kpisResume
  const { t } = useTranslation("dashboard")
  const activeKpi = useDashboardKpiStore((state) => state.activeKpi)

  const activeMetricKey = KPI_METRIC_MAP[activeKpi];

  useErrorToast(isError, {
    message: t("dashboard:errors.kpiSummaryTitle", {
      defaultValue: "Não foi possível carregar o resumo dos KPIs.",
    }),
    description: t("dashboard:errors.kpiSummaryDescription", {
      defaultValue: "Atualize a página ou tente novamente.",
    }),
    toastId: "kpi-summary-error",
  })

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
        className="w-full min-h-[180px] bg-gradient-slate border border-soft"
      />
    )
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
        const isActive = key === activeMetricKey;

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
            isActive={isActive}
          />
        );
      })}
    </div>
  );
}
