"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TICKETS_QUERY_KEY } from "../constants/query-keys";
import { getTicketsData } from "../services/tickets-service";

const ticketsQueryOptions = {
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
      await new Promise((resolve) => setTimeout(resolve, ticketsQueryOptions.simulatedDelay));
      return getTicketsData() as T;
    },
    ...ticketsQueryOptions,
  });
}

export function useInvalidateTicketsQueries() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: TICKETS_QUERY_KEY });
  };
}
