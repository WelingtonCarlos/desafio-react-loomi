import { create } from "zustand";

import type { TicketItem } from "@/modules/tickets/types/tickets.types";

interface TicketModalState {
  isOpen: boolean;
  ticket: TicketItem | null;
  openForCreate: () => void;
  openForEdit: (ticket: TicketItem) => void;
  setOpen: (open: boolean) => void;
  close: () => void;
}

const initialState: Pick<TicketModalState, "isOpen" | "ticket"> = {
  isOpen: false,
  ticket: null,
};

export const useTicketModalStore = create<TicketModalState>((set) => ({
  ...initialState,
  openForCreate: () => set({ isOpen: true, ticket: null }),
  openForEdit: (ticket) => set({ isOpen: true, ticket }),
  setOpen: (open) =>
    set((state) => (open ? { ...state, isOpen: true } : initialState)),
  close: () => set(initialState),
}));

