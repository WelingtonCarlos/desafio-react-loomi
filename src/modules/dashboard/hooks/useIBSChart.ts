"use client";

import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";
import type { DashboardData } from "../types/dashboard.types";
import type { KpiType } from "../constants/kpi-config";
import { KPI_CONFIG } from "../constants/kpi-config";

export function useIBSChart(
  dashboardData: DashboardData | undefined,
) {
  return useMemo(() => {
    const segmentNames = dashboardData?.segments.map((segment) => segment.nome) ?? [];
    const segmentValues = dashboardData?.segments.map((segment) => segment.valor) ?? [];

    const options: ApexOptions = {
      chart: {
        type: "donut",
        fontFamily: "inherit",
        background: "transparent",
        toolbar: {
          show: false,
        },
      },
      labels: segmentNames,
      colors: ["#006dff", "#56a8fa", "#00449e", "#75dffe", "#0682a7"], 
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
            labels: {
              show: false,
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false, // We will build a custom legend
      },
      stroke: {
        show: false,
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: (val) => val + "%",
        },
      },
    };

    return { options, labels: segmentNames, series: segmentValues };
  }, [dashboardData]);
}
