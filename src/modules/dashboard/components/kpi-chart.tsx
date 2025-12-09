"use client";

import { ErrorState } from "@/components/error-state";
import { Button } from "@/components/ui/button";
import { useErrorToast } from "@/hooks/use-error-toast";
import { useDashboardKpiStore } from "@/lib/stores/dashboard-kpi-store";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { KPI_CONFIG, type KpiType } from "../constants/kpi-config";
import { useDashboardData } from "../hooks/useDashboardData";
import { useKpiChartConfig } from "../hooks/useKpiChartConfig";
import { motion, AnimatePresence } from "framer-motion";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function KpiChart() {
  const { t } = useTranslation("dashboard");
  const { data: dashboardResponse, isLoading, isError, refetch } = useDashboardData();
  const activeKpi = useDashboardKpiStore((state) => state.activeKpi);
  const setActiveKpi = useDashboardKpiStore((state) => state.setActiveKpi);

  const handleSelectKpi = useCallback((key: KpiType) => setActiveKpi(key), [setActiveKpi]);

  const { options, series } = useKpiChartConfig(dashboardResponse, activeKpi);

  useErrorToast(isError, {
    message: t("dashboard:errors.kpiChartTitle", {
      defaultValue: "Não foi possível carregar os dados de KPI.",
    }),
    description: t("dashboard:errors.kpiChartDescription", {
      defaultValue: "Verifique sua conexão e tente novamente.",
    }),
    toastId: "kpi-chart-error",
  });

  if (isError) {
    return (
      <ErrorState
        title={t("dashboard:errors.kpiChartTitle", {
          defaultValue: "Não foi possível carregar os dados de KPI.",
        })}
        description={t("dashboard:errors.kpiChartDescription", {
          defaultValue: "Verifique sua conexão e tente novamente.",
        })}
        onRetry={refetch}
        className="bg-gradient-slate border-soft h-full w-full border"
      />
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="bg-gradient-slate h-[376px] w-full rounded-3xl border border-gray-800/50 p-6 shadow-xl"
    >
      <motion.div
        className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
      >
        <h2 className="text-xl font-semibold text-white">{t("kpi.title")}</h2>
        <div className="flex gap-3 rounded-[100px] bg-[#232f44] px-3 py-2">
          {(["arpuTrend", "conversionTrend", "churnTrend", "retentionTrend"] as KpiType[]).map(
            (key) => (
              <motion.div key={key} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => handleSelectKpi(key)}
                  className={cn(
                    "cursor-pointer rounded-[100px] px-4 py-1.5 text-sm font-medium transition-all duration-200 not-hover:bg-[#F6F8FC1A]",
                    activeKpi === key
                      ? "bg-[#F6F8FC1A] text-white shadow-lg shadow-cyan-500/20"
                      : "text-white hover:bg-white/5 hover:text-white",
                  )}
                  style={activeKpi === key ? { backgroundColor: KPI_CONFIG[key].color } : undefined}
                >
                  {t(KPI_CONFIG[key].labelKey)}
                </Button>
              </motion.div>
            ),
          )}
        </div>
      </motion.div>

      <div className="mt-16 h-52 w-full">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="kpi-chart-skeleton"
              className="h-full w-full rounded-2xl bg-white/5"
              initial={{ opacity: 0.4, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              key="kpi-chart-area"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <Chart options={options} series={series} type="area" height="100%" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
