"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useDashboardData } from "../hooks/useDashboardData"
import { KPI_CONFIG, type KpiType } from "../constants/kpi-config"
import { useKpiChartConfig } from "../hooks/useKpiChartConfig"
import { useTranslation } from "react-i18next";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export function KpiChart() {
  const { t } = useTranslation("dashboard")
  const { data: dashboardResponse, isLoading } = useDashboardData();
  const [activeKpi, setActiveKpi] = useState<KpiType>("arpuTrend")

  const { options, series } = useKpiChartConfig(dashboardResponse, activeKpi)

  return (
    <div className="w-full h-full bg-linear-to-br from-[#36446b98] via-[#36446b98 ]/60 to-[#36446b98 ]/10 rounded-3xl p-6 border border-gray-800/50 shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-xl font-semibold text-white">{t("kpi.title")}</h2>
        <div className="flex bg-[#232f44] p-1 rounded-3xl gap-3 px-3 py-2">
          {(["arpuTrend", "conversionTrend", "churnTrend", "retentionTrend"] as KpiType[]).map((key) => (
            <Button
              key={key}
              onClick={() => setActiveKpi(key)}
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
