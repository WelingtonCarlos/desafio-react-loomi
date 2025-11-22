import { api } from "@/lib/api/http-client";
import { endpoints } from "@/lib/api/endpoints";
import { PlansData, PlansResponse } from "../types/plans.types";

// Busca os dados do simulador de planos
export async function getPlansData(): Promise<PlansData> {
  return api.get<PlansResponse>(endpoints.plans);
}
