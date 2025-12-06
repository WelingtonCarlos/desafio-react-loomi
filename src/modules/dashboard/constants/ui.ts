import type { KpiType } from "./kpi-config";
import type { KpisResume } from "../types/dashboard.types";

export const MAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

type MetricConfig = {
  key: keyof KpisResume;
  labelKey:
    | "kpi.labels.arpu"
    | "kpi.labels.conversion"
    | "kpi.labels.retention"
    | "kpi.labels.churn";
  formatValue?: (value: number) => string;
};

export const METRIC_CONFIG: MetricConfig[] = [
  {
    key: "arpu",
    labelKey: "kpi.labels.arpu",
    formatValue: (value) => `R$ ${value.toFixed(2)}`,
  },
  {
    key: "conversion",
    labelKey: "kpi.labels.conversion",
  },
  {
    key: "retention",
    labelKey: "kpi.labels.retention",
  },
  {
    key: "churn",
    labelKey: "kpi.labels.churn",
  },
];

export const KPI_METRIC_MAP: Record<KpiType, keyof KpisResume> = {
  arpuTrend: "arpu",
  conversionTrend: "conversion",
  retentionTrend: "retention",
  churnTrend: "churn",
};
