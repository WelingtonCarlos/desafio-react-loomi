"use client";

import { useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import { getView360Data } from "../services/view-260-service";
import type { View360Data } from "../types/view-360.types";

const VIEW_360_QUERY_KEY = ["view-360", "data"] as const;

const queryOptions = {
  staleTime: Infinity,
  gcTime: 1000 * 60 * 60, // 1h
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  simulatedDelay: 1000,
} as const;

export function useView360Data(): UseQueryResult<View360Data, Error> {
  return useQuery<View360Data>({
    queryKey: VIEW_360_QUERY_KEY,
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, queryOptions.simulatedDelay));
      return getView360Data();
    },
    ...queryOptions,
  });
}

export function useInvalidateView360Queries() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: VIEW_360_QUERY_KEY });
  };
}
