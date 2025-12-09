"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DASHBOARD_QUERY_KEY, MAP_QUERY_KEY } from "../constants/query-keys";
import { getDashboardData, getMapData } from "../services/dashboard-service";

const dashboardQueryOptions = {
  staleTime: Infinity,
  gcTime: 1000 * 60 * 60, // 1h
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
} as const;

const SIMULATED_DELAY_MS = 1000;

export function useDashboardData() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));
      return getDashboardData();
    },
    ...dashboardQueryOptions,
  });
}

export function useDashboardMapData() {
  return useQuery({
    queryKey: MAP_QUERY_KEY,
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));
      return getMapData();
    },
    ...dashboardQueryOptions,
  });
}

export function useInvalidateDashboardQueries() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY });
    queryClient.invalidateQueries({ queryKey: MAP_QUERY_KEY });
  };
}
