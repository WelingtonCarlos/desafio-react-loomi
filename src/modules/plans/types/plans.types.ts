export interface PlanIndicator {
  name: string;
  conversion: number;
  roi: number;
  value: number;
}

export interface PlansResponse {
  includedBenefits: string[];
  plansIndicators: PlanIndicator[];
}

export type PlansData = PlansResponse;

