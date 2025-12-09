import { View360Page } from "@/modules/view-360/pages/view-360-page";
import { VIEW_360_QUERY_KEY } from "@/modules/view-360/constants/query-keys";
import { getView360Data } from "@/modules/view-360/services/view-260-service";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

export default async function View360() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: VIEW_360_QUERY_KEY,
    queryFn: () => getView360Data(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <View360Page />
    </HydrationBoundary>
  );
}
