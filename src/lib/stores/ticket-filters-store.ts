import { create } from "zustand";

interface TicketFiltersState {
  search: string;
  status: string;
  priority: string;
  responsible: string;
  setSearch: (value: string) => void;
  setStatus: (value: string) => void;
  setPriority: (value: string) => void;
  setResponsible: (value: string) => void;
  reset: () => void;
}

const initialState = {
  search: "",
  status: "",
  priority: "",
  responsible: "",
};

export const useTicketFiltersStore = create<TicketFiltersState>((set) => ({
  ...initialState,
  setSearch: (value) => set({ search: value }),
  setStatus: (value) => set({ status: value }),
  setPriority: (value) => set({ priority: value }),
  setResponsible: (value) => set({ responsible: value }),
  reset: () => set(initialState),
}));

