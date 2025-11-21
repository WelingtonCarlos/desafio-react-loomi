// Página do Dashboard

import { PageHeader } from "@/modules/navigation/components/page-header";
import { KpiChart } from "../components/kpi-chart";
import { KpiSummary } from "../components/kpi-summary";
import { ImpactBySegmentChart } from "../components/impact-by-segment-chart";

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 m-auto">
      <PageHeader title="Dashboard" />
      <div className="flex flex-col 2xl:flex-row gap-8 py-8 w-full max-w-3xl xl:max-w-4xl 2xl:max-w-7xl m-auto">
        <div className="min-h-[360px] 2xl:w-3/5">
          <KpiChart />
        </div>

        <KpiSummary />
      </div>

      <div className="flex flex-col 2xl:flex-row gap-8 py-8 w-full max-w-3xl xl:max-w-4xl 2xl:max-w-7xl m-auto">
        <div className="min-h-[360px] 2xl:w-3/5">
          <h1>mapa </h1>
        </div>

        <ImpactBySegmentChart />
      </div>
    </div>
  );
}
