export const PLANS_CONFIG = [
  { id: "basic", price: 8990, recommended: false },
  { id: "intermediate", price: 14590, recommended: false },
  { id: "premium", price: 22590, recommended: true },
] as const;

export const ADDITIONAL_COVERAGES = [
  { id: "theft", price: 2500 },
  { id: "collision", price: 3500 },
  { id: "fire", price: 2000 },
  { id: "natural", price: 3000 },
] as const;

export const DEFAULT_PLAN_ID =
  PLANS_CONFIG.find((plan) => plan.recommended)?.id ?? PLANS_CONFIG[0].id;

export const EMPTY_COVERAGES_STATE = ADDITIONAL_COVERAGES.reduce(
  (acc, coverage) => {
    acc[coverage.id] = false;
    return acc;
  },
  {} as Record<string, boolean>,
);
