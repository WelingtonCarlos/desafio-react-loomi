"use client";

import { useTicketFiltersStore } from "@/lib/stores/ticket-filters-store";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useTicketsData } from "../hooks/useTicketsData";
import type {
  TicketItem,
  TicketPriority,
  TicketStatus,
  TicketsResponse,
} from "../types/tickets.types";
import { createTicketColumns } from "./columns";
import { Filters } from "./filters";
import { SkeletonTicketsTable } from "./skeletons-tickets";
import { DataTable } from "./table";

interface TicketsTableProps {
  onEditTicket: (ticket: TicketItem) => void;
}

export function TicketsTable({ onEditTicket }: TicketsTableProps) {
  const { t } = useTranslation("tickets");

  const { data, isLoading } = useTicketsData<TicketsResponse>();

  const ticketsData: TicketItem[] = data?.tickets ?? [];
  const statusOptions: TicketStatus[] = data?.status ?? [];
  const priorityOptions: TicketPriority[] = data?.priorities ?? [];

  const search = useTicketFiltersStore((state) => state.search);
  const status = useTicketFiltersStore((state) => state.status);
  const priority = useTicketFiltersStore((state) => state.priority);
  const responsible = useTicketFiltersStore((state) => state.responsible);

  const setSearch = useTicketFiltersStore((state) => state.setSearch);
  const setStatus = useTicketFiltersStore((state) => state.setStatus);
  const setPriority = useTicketFiltersStore((state) => state.setPriority);
  const setResponsible = useTicketFiltersStore(
    (state) => state.setResponsible
  );

  const responsibleOptions = useMemo(
    () => Array.from(new Set(ticketsData.map((t) => t.responsible))),
    [ticketsData]
  );

  const filteredTickets = useMemo(() => {
    return ticketsData.filter((ticket) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        query.length === 0 ||
        ticket.id.toLowerCase().includes(query) ||
        ticket.client.toLowerCase().includes(query) ||
        ticket.subject.toLowerCase().includes(query);

      const matchesStatus = !status || (ticket.status as string) === status;

      const matchesPriority =
        !priority || (ticket.priority as string) === priority;

      const matchesResponsible =
        !responsible || ticket.responsible === responsible;

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesResponsible
      );
    });
  }, [ticketsData, search, status, priority, responsible]);

  const tableColumns = useMemo(
    () => createTicketColumns(onEditTicket, t),
    [onEditTicket, t]
  );

  if (isLoading) return <SkeletonTicketsTable />;

  return (
    <div className="h-full w-full rounded-3xl bg-linear-to-br from-[#28335098] via-[#28335098]/60 to-[#28335098]/10 px-6 py-10">
      <Filters
        search={{ value: search, set: setSearch }}
        lists={{
          status: { value: status, set: setStatus },
          priority: { value: priority, set: setPriority },
          responsible: { value: responsible, set: setResponsible },
          options: {
            status: statusOptions,
            priorities: priorityOptions,
            responsible: responsibleOptions,
          },
        }}
      />

      <DataTable columns={tableColumns} data={filteredTickets} />
    </div>
  );
}
