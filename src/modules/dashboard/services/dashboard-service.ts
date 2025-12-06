import { endpoints } from "@/lib/api/endpoints";
import { api } from "@/lib/api/http-client";
import type { DashboardData } from "../types/dashboard.types";
import type { MapData } from "../types/map.types";

// Busca os dados consolidados do dashboard (KPIs, segmentos e clientes ativos)
export async function getDashboardData(): Promise<DashboardData> {
  return api.get<DashboardData>(endpoints.dashboard);
}

// Busca os dados geoespaciais para o mapa 360
export async function getMapData(): Promise<MapData> {
  return api.get<MapData>(endpoints.map);
}
