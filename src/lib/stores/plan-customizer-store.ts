import { create } from "zustand";

import { DEFAULT_PLAN_ID, EMPTY_COVERAGES_STATE } from "@/modules/plans/constants/customizer";

interface PlanCustomizerState {
  selectedPlanId: string;
  vehicleValue: number;
  clientAge: number;
  coverages: Record<string, boolean>;
  setSelectedPlanId: (planId: string) => void;
  setVehicleValue: (value: number) => void;
  setClientAge: (value: number) => void;
  setCoverage: (id: string, checked: boolean) => void;
  reset: () => void;
}

const INITIAL_STATE: Omit<
  PlanCustomizerState,
  "setSelectedPlanId" | "setVehicleValue" | "setClientAge" | "setCoverage" | "reset"
> = {
  selectedPlanId: DEFAULT_PLAN_ID,
  vehicleValue: 50000,
  clientAge: 28,
  coverages: EMPTY_COVERAGES_STATE,
};

export const usePlanCustomizerStore = create<PlanCustomizerState>((set) => ({
  ...INITIAL_STATE,
  setSelectedPlanId: (planId) => set({ selectedPlanId: planId }),
  setVehicleValue: (value) => set({ vehicleValue: value }),
  setClientAge: (value) => set({ clientAge: value }),
  setCoverage: (id, checked) =>
    set((state) => ({
      coverages: {
        ...state.coverages,
        [id]: checked,
      },
    })),
  reset: () => set(INITIAL_STATE),
}));
