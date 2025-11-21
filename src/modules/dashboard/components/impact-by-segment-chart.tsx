"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import type { ApexOptions } from "apexcharts";
import { useDashboardData } from "../hooks/useDashboardData";
import { useIBSChart } from "../hooks/useIBSChart";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function ImpactBySegmentChart() {
  const { data: dashboardResponse, isLoading } = useDashboardData();

  const { options, labels, series } = useIBSChart(dashboardResponse);

  return (
    <div className="flex-1 h-full bg-linear-to-br from-[#36446b98] via-[#36446b98 ]/60 to-[#36446b98 ]/10 rounded-3xl p-6 border border-gray-800/50 shadow-xl">
      <h3 className="text-lg font-medium text-white mb-6">
        Mapa de impacto por segmento
      </h3>

      <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-full max-w-[280px] mx-auto relative">
          {isLoading ? (
            <div className="h-full w-full animate-pulse rounded-2xl bg-white/5" />
          ) : (
            <Chart
              options={options}
              series={series}
              type="donut"
              height={280}
            />
          )}
        </div>

        {/* Custom Legend */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-sm mx-auto">
          {labels.map((label, index: number) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e232d] border border-white/5"
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: options.colors?.[index] }}
              />
              <span className="text-xs text-gray-300">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button className="bg-[#1d77ff] hover:bg-[#1d77ff]/90 text-white rounded-full px-8 py-6 h-auto text-sm font-medium shadow-[0_0_20px_rgba(29,119,255,0.3)]">
          Analisar segmentos
        </Button>
      </div>
    </div>
  );
}
