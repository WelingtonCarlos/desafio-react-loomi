"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDashboardData, getMapData } from "../services/dashboard-service";

const DASHBOARD_QUERY_KEY = ["dashboard", "data"];
const MAP_QUERY_KEY = ["dashboard", "map"];

const queryOptions = {
  staleTime: Infinity,
  gcTime: 1000 * 60 * 60, // 1h
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  simulatedDelay: 1000,
} as const;

export function useDashboardData() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, queryOptions.simulatedDelay));
      return getDashboardData();
    },
    ...queryOptions,
  });
}

export function useDashboardMapData() {
  return useQuery({
    queryKey: MAP_QUERY_KEY,
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, queryOptions.simulatedDelay));
      return getMapData();
    },
    ...queryOptions,
  });
}

export function useInvalidateDashboardQueries() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY });
    queryClient.invalidateQueries({ queryKey: MAP_QUERY_KEY });
  };
}
