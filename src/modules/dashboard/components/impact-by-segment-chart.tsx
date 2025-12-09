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
    <div className="bg-gradient-slate flex h-[466px] flex-1 flex-col gap-8 rounded-3xl border border-gray-800/50 p-10 shadow-xl">
      <h3 className="text-xl leading-4 font-bold text-white drop-shadow-md">{t("impact.title")}</h3>

      <div className="flex min-h-64 flex-1 flex-col items-center justify-center gap-8">
        <div className="relative mx-auto h-36 w-36">
          {isLoading ? (
            <div className="w-h-36 h-36 animate-pulse rounded-2xl bg-white/5" />
          ) : (
            <Chart options={options} series={series} type="donut" height={141} />
          )}
        </div>

        {/* Custom Legend */}
        <div className="mx-auto flex max-w-sm flex-wrap justify-center gap-3">
          {labels.map((label, index: number) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-full border border-white/5 bg-[#23283b] p-3"
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

      <div className="flex justify-center">
        <Button className="bg-brand-name shadow-brand-name hover:bg-brand-name/90 h-auto cursor-pointer rounded-full px-8 py-3 text-sm font-medium text-white shadow-md">
          {t("impact.cta")}
        </Button>
      </div>
    </div>
  );
}
