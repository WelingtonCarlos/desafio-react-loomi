"use client";

import { ErrorState } from "@/components/error-state";
import { useErrorToast } from "@/hooks/use-error-toast";
import { useTranslation } from "react-i18next";
import { METRIC_CONFIG } from "../constants/ui";
import { useDashboardData } from "../hooks/useDashboardData";
import { MetricCard } from "./metric-card";
import { motion, AnimatePresence } from "framer-motion";

export function KpiSummary() {
  const { data: dashboardResponse, isLoading, isError, refetch } = useDashboardData();
  const resume = dashboardResponse?.kpisResume;
  const { t } = useTranslation("dashboard");

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
          <motion.div
            key={index}
            className="h-[160px] rounded-3xl bg-white/5"
            initial={{ opacity: 0.4, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
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
        className="bg-gradient-slate border-soft min-h-[180px] w-full border"
      />
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        layout
        className="grid flex-1 grid-cols-2 gap-6"
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {METRIC_CONFIG.map(({ key, labelKey, formatValue }, index) => {
          const metric = resume?.[key];
          const value = metric
            ? formatValue
              ? formatValue(metric.valor)
              : `${metric.valor.toFixed(1)}%`
            : "--";
          const change = metric ? `${metric.variacao}%` : "--";
          const isPositive = metric ? metric.variacao >= 0 : true;
          const shouldShowArrow = index === 0 || index === METRIC_CONFIG.length - 1;

          return (
            <motion.div
              key={key}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <MetricCard
                label={t(labelKey)}
                value={value}
                change={change}
                trend={isPositive ? "up" : "down"}
                trendColor={isPositive ? "text-green-500" : "text-red-500"}
                hasArrow={shouldShowArrow}
                periodLabel={t("messages.inPeriod")}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}
