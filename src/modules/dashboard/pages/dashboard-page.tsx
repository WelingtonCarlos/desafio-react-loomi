"use client";

import { PageHeader } from "@/modules/navigation/components/page-header";
import { KpiChart } from "../components/kpi-chart";
import { KpiSummary } from "../components/kpi-summary";
import { CustomerByRegionMap } from "../components/customer-by-region-map";
import { ImpactBySegmentChart } from "../components/impact-by-segment-chart";
import { ActiveClientsTable } from "../components/active-clients-table";
import { useTranslation } from "react-i18next";

export function DashboardPage() {
  const { t } = useTranslation("dashboard");

  return (
    <div className="m-auto flex flex-col gap-8">
      <PageHeader title={t("titles.header")} />
      <div className="m-auto flex w-full max-w-3xl flex-col gap-8 py-8 xl:max-w-4xl 2xl:max-w-7xl 2xl:flex-row">
        <div className="min-h-[360px] 2xl:w-3/5">
          <KpiChart />
        </div>

        <KpiSummary />
      </div>

      <div className="m-auto flex w-full max-w-3xl flex-col gap-8 py-8 xl:max-w-4xl 2xl:max-w-7xl 2xl:flex-row">
        <div className="min-h-[360px] 2xl:w-3/5">
          <CustomerByRegionMap />
        </div>

        <ImpactBySegmentChart />
      </div>

      <div className="m-auto flex w-full max-w-3xl flex-col gap-8 py-8 xl:max-w-4xl 2xl:max-w-7xl 2xl:flex-row">
        <ActiveClientsTable />
      </div>
    </div>
  );
}
