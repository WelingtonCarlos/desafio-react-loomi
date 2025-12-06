export interface TrendSeries {
  name: string;
  data: number[];
}

export interface KpisTrend {
  labels: string[];
  arpuTrend: TrendSeries;
  conversionTrend: TrendSeries;
  churnTrend: TrendSeries;
  retentionTrend: TrendSeries;
}

export interface KpiIndicator {
  valor: number;
  variacao: number;
}

export interface KpisResume {
  arpu: KpiIndicator;
  conversion: KpiIndicator;
  retention: KpiIndicator;
  churn: KpiIndicator;
}

export interface SegmentResume {
  nome: string;
  valor: number;
}

export interface ActiveClientFilters {
  status: string[];
  secureType: string[];
  locations: string[];
}

export interface ActiveClientItem {
  id: string;
  name: string;
  email: string;
  secureType: string;
  monthValue: number;
  status: string;
  renewalDate: string;
  location: string;
}

export interface ActiveClients {
  filters: ActiveClientFilters;
  data: ActiveClientItem[];
}

export interface DashboardData {
  kpisTrend: KpisTrend;
  kpisResume: KpisResume;
  segments: SegmentResume[];
  activeClients: ActiveClients;
}
