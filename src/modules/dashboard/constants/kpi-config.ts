export type KpiType = "arpuTrend" | "conversionTrend" | "churnTrend" | "retentionTrend";

export const KPI_CONFIG: Record<
  KpiType,
  {
    label: string;
    color: string;
  }
> = {
  arpuTrend: { label: "ARPU", color: "#06b6d4" },
  conversionTrend: { label: "Conversão", color: "#f59e0b" },
  churnTrend: { label: "Churn", color: "#ef4444" },
  retentionTrend: { label: "Retenção", color: "#22c55e" },
};

