import { DashboardPage } from "@/modules/dashboard/pages/dashboard-page";
import { DASHBOARD_QUERY_KEY, MAP_QUERY_KEY } from "@/modules/dashboard/constants/query-keys";
import { getDashboardData, getMapData } from "@/modules/dashboard/services/dashboard-service";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

export default async function Dashboard() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: DASHBOARD_QUERY_KEY,
      queryFn: () => getDashboardData(),
    }),
    queryClient.prefetchQuery({
      queryKey: MAP_QUERY_KEY,
      queryFn: () => getMapData(),
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DashboardPage />
    </HydrationBoundary>
  );
}
