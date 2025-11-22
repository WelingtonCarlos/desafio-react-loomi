import { endpoints } from "@/lib/api/endpoints";
import { api } from "@/lib/api/http-client";
import {
  ensureTicketsClone,
  updateTicketsClone,
} from "./tickets-storage";
import type {
  TicketItem,
  TicketPriority,
  TicketsResponse,
  TicketStatus,
  TicketsResume,
} from "../types/tickets.types";

type CreateTicketInput = Omit<TicketItem, "id" | "createdAt"> & {
  id?: string;
  createdAt?: string;
};

type UpdateTicketInput = {
  id: TicketItem["id"];
  data: Partial<Omit<TicketItem, "id">>;
};

const STATUS_RESUME_KEY: Record<
  TicketStatus,
  keyof Pick<TicketsResume, "open" | "inProgress" | "solved">
> = {
  Aberto: "open",
  "Em andamento": "inProgress",
  Fechado: "solved",
};

function rebuildResume(tickets: TicketItem[]): TicketsResume {
  return tickets.reduce<TicketsResume>(
    (resume, ticket) => {
      const resumeKey = STATUS_RESUME_KEY[ticket.status];
      resume[resumeKey] += 1;
      return resume;
    },
    {
      open: 0,
      inProgress: 0,
      solved: 0,
      timeAverageHours: 0,
    }
  );
}

function generateTicketId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `ticket-${Date.now()}`;
}

function normalizeTicketPayload(payload: CreateTicketInput): TicketItem {
  const { id, createdAt, ...rest } = payload;
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(now);

  return {
    id: id ?? generateTicketId(),
    createdAt: createdAt ?? formattedDate,
    ...rest,
  } as TicketItem;
}

// Busca os dados de tickets e garante versão clonada persistida
export async function getTicketsData(): Promise<TicketsResponse> {
  const apiResponse = await api.get<TicketsResponse>(endpoints.tickets);
  return ensureTicketsClone(apiResponse);
}

export function createTicket(payload: CreateTicketInput): TicketsResponse {
  return updateTicketsClone((current) => {
    const ticket = normalizeTicketPayload(payload);
    const tickets = [ticket, ...current.tickets];

    return {
      ...current,
      tickets,
      resumo: {
        ...rebuildResume(tickets),
        timeAverageHours: current.resumo.timeAverageHours,
      },
    };
  });
}

export function updateTicket({
  id,
  data,
}: UpdateTicketInput): TicketsResponse {
  return updateTicketsClone((current) => {
    const tickets = current.tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, ...data } : ticket
    );

    return {
      ...current,
      tickets,
      resumo: {
        ...rebuildResume(tickets),
        timeAverageHours: current.resumo.timeAverageHours,
      },
    };
  });
}
