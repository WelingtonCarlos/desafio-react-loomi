import { ChatPage } from "@/modules/chats/pages/chats-page";
import { CHATS_QUERY_KEY } from "@/modules/chats/constants/query-keys";
import { getChatsData } from "@/modules/chats/services/chats-service";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

export default async function Chats() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: CHATS_QUERY_KEY,
    queryFn: () => getChatsData(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ChatPage />
    </HydrationBoundary>
  );
}
