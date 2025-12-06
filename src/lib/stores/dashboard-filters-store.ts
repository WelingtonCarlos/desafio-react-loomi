import { create } from "zustand";

interface DashboardFiltersState {
  search: string;
  status: string;
  secureType: string;
  location: string;
  setSearch: (value: string) => void;
  setStatus: (value: string) => void;
  setSecureType: (value: string) => void;
  setLocation: (value: string) => void;
  reset: () => void;
}

const initialState = {
  search: "",
  status: "Todos",
  secureType: "Todos",
  location: "Todos",
};

export const useDashboardFiltersStore = create<DashboardFiltersState>((set) => ({
  ...initialState,
  setSearch: (value) => set({ search: value }),
  setStatus: (value) => set({ status: value }),
  setSecureType: (value) => set({ secureType: value }),
  setLocation: (value) => set({ location: value }),
  reset: () => set(initialState),
}));
