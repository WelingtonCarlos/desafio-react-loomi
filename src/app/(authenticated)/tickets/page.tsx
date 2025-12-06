import { ensureAuthenticated } from "@/lib/auth-guard";
import { TicketsPage } from "@/modules/tickets/pages/tickets-page";

export default async function Tickets() {
  await ensureAuthenticated("/tickets");
  return <TicketsPage />;
}
