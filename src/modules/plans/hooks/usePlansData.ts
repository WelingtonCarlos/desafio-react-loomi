"use client";

import { useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import {
  getPlansData,
} from "@/modules/plans/services/plans-service";
import type { PlansData } from "../types/plans.types";

const PLANS_QUERY_KEY = ["plans", "data"] as const;

const queryOptions = {
  staleTime: Infinity,
  gcTime: 1000 * 60 * 60, // 1h
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  simulatedDelay: 1000,
} as const;

export function usePlansData(): UseQueryResult<PlansData, Error> {
  return useQuery<PlansData>({
    queryKey: PLANS_QUERY_KEY,
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, queryOptions.simulatedDelay));
      return getPlansData();
    },
    ...queryOptions,
  });
}

export function useInvalidatePlansQueries() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: PLANS_QUERY_KEY });
  };
}

