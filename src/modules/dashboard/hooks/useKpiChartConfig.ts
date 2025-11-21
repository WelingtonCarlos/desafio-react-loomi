"use client";

import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";
import type { DashboardData } from "../types/dashboard.types";
import type { KpiType } from "../constants/kpi-config";
import { KPI_CONFIG } from "../constants/kpi-config";

export function useKpiChartConfig(
  dashboardData: DashboardData | undefined,
  activeKpi: KpiType
) {
  return useMemo(() => {
    const categories = dashboardData?.kpisTrend.labels ?? [];
    const activeSeries = dashboardData?.kpisTrend[activeKpi];

    const options: ApexOptions = {
      chart: {
        type: "area",
        toolbar: { show: false },
        background: "transparent",
        fontFamily: "inherit",
      },
      colors: [KPI_CONFIG[activeKpi].color],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      xaxis: {
        categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: { colors: "#9ca3af" },
        },
      },
      yaxis: {
        labels: {
          style: { colors: "#9ca3af" },
          formatter: (value) =>
            activeKpi === "arpuTrend" ? `R$ ${value}` : `${value}%`,
        },
      },
      grid: {
        borderColor: "#1f2937",
        strokeDashArray: 4,
        yaxis: { lines: { show: true } },
        xaxis: { lines: { show: false } },
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: (value) =>
            activeKpi === "arpuTrend" ? `R$ ${value.toFixed(2)}` : `${value}%`,
        },
        style: {
          fontSize: "12px",
        },
        marker: { show: true },
      },
    };

    const series =
      activeSeries?.data
        ? [
            {
              name: activeSeries.name,
              data: [...activeSeries.data],
            },
          ]
        : [];

    return { options, series };
  }, [dashboardData, activeKpi]);
}

