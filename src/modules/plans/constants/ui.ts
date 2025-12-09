import { PLANS_CONFIG } from "./customizer";

export type PlanId = (typeof PLANS_CONFIG)[number]["id"];

export const PLAN_LABEL_KEYS: Record<PlanId, `plans:customizer.plans.${PlanId}`> = {
  basic: "plans:customizer.plans.basic",
  intermediate: "plans:customizer.plans.intermediate",
  premium: "plans:customizer.plans.premium",
};


