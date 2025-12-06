export type KpiType = "arpuTrend" | "conversionTrend" | "churnTrend" | "retentionTrend";

type KpiLabelKey =
  | "kpi.labels.arpu"
  | "kpi.labels.conversion"
  | "kpi.labels.churn"
  | "kpi.labels.retention";

export const KPI_CONFIG: Record<
  KpiType,
  {
    labelKey: KpiLabelKey;
    color: string;
  }
> = {
  arpuTrend: { labelKey: "kpi.labels.arpu", color: "#06b6d4" },
  conversionTrend: { labelKey: "kpi.labels.conversion", color: "#f59e0b" },
  churnTrend: { labelKey: "kpi.labels.churn", color: "#ef4444" },
  retentionTrend: { labelKey: "kpi.labels.retention", color: "#22c55e" },
};
