// Página do Dashboard

import { PageHeader } from "@/modules/navigation/components/page-header";
import { KpiChart } from "../components/kpi-chart";
import { KpiSummary } from "../components/kpi-summary";

export function DashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" />
      <div className="flex flex-col xl:flex-row gap-8 py-8 w-full max-w-7xl m-auto">
        <div className="min-h-[360px] xl:w-3/5">
          <KpiChart />
        </div>

        <KpiSummary />
      </div>
    </div>
  );
}
