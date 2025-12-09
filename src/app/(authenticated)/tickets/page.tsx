import { TicketsPage } from "@/modules/tickets/pages/tickets-page";
import { TICKETS_QUERY_KEY } from "@/modules/tickets/constants/query-keys";
import { getTicketsData } from "@/modules/tickets/services/tickets-service";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

export default async function Tickets() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: TICKETS_QUERY_KEY,
    queryFn: () => getTicketsData(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <TicketsPage />
    </HydrationBoundary>
  );
}
