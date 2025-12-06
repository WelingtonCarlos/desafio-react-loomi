import { ensureAuthenticated } from "@/lib/auth-guard";
import { ChatPage } from "@/modules/chats/pages/chats-page";

export default async function Chats() {
  await ensureAuthenticated("/chats");
  return <ChatPage />;
}
