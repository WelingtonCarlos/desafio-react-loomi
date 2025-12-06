import { create } from "zustand";

import type { KpiType } from "@/modules/dashboard/constants/kpi-config";

interface DashboardKpiState {
  activeKpi: KpiType;
  setActiveKpi: (kpi: KpiType) => void;
}

export const useDashboardKpiStore = create<DashboardKpiState>((set) => ({
  activeKpi: "arpuTrend",
  setActiveKpi: (kpi) => set({ activeKpi: kpi }),
}));
