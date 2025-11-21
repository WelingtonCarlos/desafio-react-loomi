import { endpoints } from "@/lib/api/endpoints";
import { api } from "@/lib/api/http-client";
import type { TicketsResponse } from "../types/tickets.types";

// Busca os dados de tickets
export async function getTicketsData(): Promise<TicketsResponse> {
  return api.get<TicketsResponse>(endpoints.tickets);
}


