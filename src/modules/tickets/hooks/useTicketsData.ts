"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTicketsData } from "../services/tickets-service";

const TICKETS_QUERY_KEY = ["tickets", "data"];

const queryOptions = {
  staleTime: Infinity,
  gcTime: 1000 * 60 * 60, // 1h
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  simulatedDelay: 1000,
} as const;

export function useTicketsData<T>() {
  return useQuery<T>({
    queryKey: TICKETS_QUERY_KEY,
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, queryOptions.simulatedDelay));
      return getTicketsData() as T;
    },
    ...queryOptions,
  });
}

export function useInvalidateTicketsQueries() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: TICKETS_QUERY_KEY });
  };
}
