"use client"

import { Button } from "@/components/ui/button"
import { useDashboardKpiStore } from "@/lib/stores/dashboard-kpi-store"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { KPI_CONFIG, type KpiType } from "../constants/kpi-config"
import { useDashboardData } from "../hooks/useDashboardData"
import { useKpiChartConfig } from "../hooks/useKpiChartConfig"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export function KpiChart() {
  const { t } = useTranslation("dashboard")
  const { data: dashboardResponse, isLoading } = useDashboardData();
  const activeKpi = useDashboardKpiStore((state) => state.activeKpi);
  const setActiveKpi = useDashboardKpiStore((state) => state.setActiveKpi);

  const handleSelectKpi = useCallback(
    (key: KpiType) => setActiveKpi(key),
    [setActiveKpi]
  );

  const { options, series } = useKpiChartConfig(dashboardResponse, activeKpi)

  return (
    <div className="w-full h-full bg-linear-to-br from-[#36446b98] via-[#36446b98 ]/60 to-[#36446b98 ]/10 rounded-3xl p-6 border border-gray-800/50 shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-xl font-semibold text-white">{t("kpi.title")}</h2>
        <div className="flex bg-[#232f44] p-1 rounded-3xl gap-3 px-3 py-2">
          {(["arpuTrend", "conversionTrend", "churnTrend", "retentionTrend"] as KpiType[]).map((key) => (
            <Button
              key={key}
              onClick={() => handleSelectKpi(key)}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-3xl cursor-pointer transition-all duration-200",
                activeKpi === key
                  ? "text-white shadow-lg shadow-cyan-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5",
              )}
              style={
                activeKpi === key
                  ? { backgroundColor: KPI_CONFIG[key].color }
                  : undefined
              }
            >
              {t(KPI_CONFIG[key].labelKey)}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        {isLoading ? (
          <div className="h-full w-full animate-pulse rounded-2xl bg-white/5" />
        ) : (
          <Chart options={options} series={series} type="area" height="100%" />
        )}
      </div>
    </div>
  )
}
