"use client";

import dynamic from "next/dynamic";
import { ErrorState } from "@/components/error-state";
import { Button } from "@/components/ui/button";
import { useErrorToast } from "@/hooks/use-error-toast";
import { useDashboardData } from "../hooks/useDashboardData";
import { useIBSChart } from "../hooks/useIBSChart";
import { useTranslation } from "react-i18next";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function ImpactBySegmentChart() {
  const { data: dashboardResponse, isLoading, isError, refetch } = useDashboardData();
  const { t } = useTranslation("dashboard");

  const { options, labels, series } = useIBSChart(dashboardResponse);

  useErrorToast(isError, {
    message: t("dashboard:errors.impactBySegmentTitle", {
      defaultValue: "Falha ao carregar o gráfico de impacto por segmento.",
    }),
    description: t("dashboard:errors.impactBySegmentDescription", {
      defaultValue: "Tente novamente mais tarde.",
    }),
    toastId: "impact-segment-error",
  });

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
        className="bg-gradient-slate border-soft h-[470px] flex-1 border"
      />
    );
  }

  return (
    <div className="via-[#36446b98 ]/60 to-[#36446b98 ]/10 h-[470px] flex-1 rounded-3xl border border-gray-800/50 bg-linear-to-br from-[#36446b98] p-6 shadow-xl">
      <h3 className="mb-6 text-lg font-medium text-white">{t("impact.title")}</h3>

      <div className="flex min-h-[280px] flex-1 flex-col items-center justify-center">
        <div className="relative mx-auto w-full max-w-[280px]">
          {isLoading ? (
            <div className="h-full w-full animate-pulse rounded-2xl bg-white/5" />
          ) : (
            <Chart options={options} series={series} type="donut" height={141} />
          )}
        </div>

        {/* Custom Legend */}
        <div className="mx-auto mt-8 flex max-w-sm flex-wrap justify-center gap-3">
          {labels.map((label, index: number) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-full border border-white/5 bg-[#1e232d] px-3 py-1.5"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: options.colors?.[index] }}
              />
              <span className="text-xs text-gray-300">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button className="h-auto rounded-full bg-[#1d77ff] px-8 py-3 text-sm font-medium text-white shadow-[0_0_20px_rgba(29,119,255,0.3)] hover:bg-[#1d77ff]/90">
          {t("impact.cta")}
        </Button>
      </div>
    </div>
  );
}
