"use client";

import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { ErrorState } from "@/components/error-state"
import { useErrorToast } from "@/hooks/use-error-toast"
import { useDashboardData } from "../hooks/useDashboardData"
import { useIBSChart } from "../hooks/useIBSChart"
import { useTranslation } from "react-i18next"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function ImpactBySegmentChart() {
  const {
    data: dashboardResponse,
    isLoading,
    isError,
    refetch,
  } = useDashboardData()
  const { t } = useTranslation("dashboard")

  const { options, labels, series } = useIBSChart(dashboardResponse);

  useErrorToast(isError, {
    message: t("dashboard:errors.impactBySegmentTitle", {
      defaultValue: "Falha ao carregar o gráfico de impacto por segmento.",
    }),
    description: t("dashboard:errors.impactBySegmentDescription", {
      defaultValue: "Tente novamente mais tarde.",
    }),
    toastId: "impact-segment-error",
  })

  if (isError) {
    return (
      <ErrorState
        title={t("dashboard:errors.impactBySegmentTitle", {
          defaultValue: "Falha ao carregar o gráfico de impacto por segmento.",
        })}
        description={t("dashboard:errors.impactBySegmentDescription", {
          defaultValue: "Tente novamente mais tarde.",
        })}
        onRetry={refetch}
        className="flex-1 h-[470px] bg-gradient-slate border border-soft"
      />
    )
  }

  return (
    <div className="flex-1 h-[470px] bg-linear-to-br from-[#36446b98] via-[#36446b98 ]/60 to-[#36446b98 ]/10 rounded-3xl p-6 border border-gray-800/50 shadow-xl">
      <h3 className="text-lg font-medium text-white mb-6">
        {t("impact.title")}
      </h3>

      <div className="flex-1 flex flex-col items-center justify-center min-h-[280px]">
        <div className="w-full max-w-[280px] mx-auto relative">
          {isLoading ? (
            <div className="h-full w-full animate-pulse rounded-2xl bg-white/5" />
          ) : (
            <Chart
              options={options}
              series={series}
              type="donut"
              height={141}
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
        <Button className="bg-[#1d77ff] hover:bg-[#1d77ff]/90 text-white rounded-full px-8 py-3 h-auto text-sm font-medium shadow-[0_0_20px_rgba(29,119,255,0.3)]">
          {t("impact.cta")}
        </Button>
      </div>
    </div>
  );
}
