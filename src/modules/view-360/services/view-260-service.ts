import { api } from "@/lib/api/http-client";
import { endpoints } from "@/lib/api/endpoints";
import type { View360Data, View360Response } from "../types/view-360.types";

// Busca os dados do customer 360
export async function getView360Data(): Promise<View360Data> {
  return api.get<View360Response>(endpoints.view360);
}
