"use client";

import { useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import { getChatsData } from "../services/chats-service";
import type { ChatsData } from "../types/chats.types";

const CHATS_QUERY_KEY = ["chats", "data"] as const;

const queryOptions = {
  staleTime: Infinity,
  gcTime: 1000 * 60 * 60, // 1h
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  simulatedDelay: 1000,
} as const;

export function useChatsData(): UseQueryResult<ChatsData, Error> {
  return useQuery<ChatsData>({
    queryKey: CHATS_QUERY_KEY,
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, queryOptions.simulatedDelay));
      return getChatsData();
    },
    ...queryOptions,
  });
}

export function useInvalidateChatsQueries() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: CHATS_QUERY_KEY });
  };
}
