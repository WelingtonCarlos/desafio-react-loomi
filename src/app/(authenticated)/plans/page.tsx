import { PlansPage } from "@/modules/plans/pages/plans-page";
import { PLANS_QUERY_KEY } from "@/modules/plans/constants/query-keys";
import { getPlansData } from "@/modules/plans/services/plans-service";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

export default async function Plans() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: PLANS_QUERY_KEY,
    queryFn: () => getPlansData(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PlansPage />
    </HydrationBoundary>
  );
}
