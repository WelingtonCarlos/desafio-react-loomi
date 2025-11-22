"use client";

import { useMemo, useState } from "react";
import { useTicketsData } from "../hooks/useTicketsData";
import { createTicketColumns } from "./columns";
import { Filters } from "./filters";
import { DataTable } from "./table";
import type {
  TicketItem,
  TicketPriority,
  TicketStatus,
  TicketsResponse,
} from "../types/tickets.types";

interface TicketsTableProps {
  onEditTicket: (ticket: TicketItem) => void;
}

export function TicketsTable({ onEditTicket }: TicketsTableProps) {
  const { data, isLoading } = useTicketsData<TicketsResponse>();

  // Dados brutos da API
  const ticketsData: TicketItem[] = data?.tickets ?? [];
  const statusOptions: TicketStatus[] = data?.status ?? [];
  const priorityOptions: TicketPriority[] = data?.priorities ?? [];

  // Responsáveis distintos a partir dos tickets
  const responsibleOptions = useMemo(
    () => Array.from(new Set(ticketsData.map((t) => t.responsible))),
    [ticketsData]
  );

  // Estados dos filtros
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>(""); // "" = todos
  const [priority, setPriority] = useState<string>("");
  const [responsible, setResponsible] = useState<string>("");

  // Filtro em memória
  const filteredTickets = useMemo(() => {
    return ticketsData.filter((ticket) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        query.length === 0 ||
        ticket.id.toLowerCase().includes(query) ||
        ticket.client.toLowerCase().includes(query) ||
        ticket.subject.toLowerCase().includes(query);

      const matchesStatus =
        !status || (ticket.status as string) === status;

      const matchesPriority =
        !priority || (ticket.priority as string) === priority;

      const matchesResponsible =
        !responsible || ticket.responsible === responsible;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesResponsible
      );
    });
  }, [ticketsData, search, status, priority, responsible]);

  const tableColumns = useMemo(
    () => createTicketColumns(onEditTicket),
    [onEditTicket]
  );

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

      {isLoading ? (
        <div className="h-full w-full animate-pulse rounded-2xl bg-white/5" />
      ) : (
        <DataTable columns={tableColumns} data={filteredTickets} />
      )}
    </div>
  );
}
