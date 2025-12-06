import { ensureAuthenticated } from "@/lib/auth-guard";
import { DashboardPage } from "@/modules/dashboard/pages/dashboard-page";

export default async function Dashboard() {
  await ensureAuthenticated("/dashboard");
  return <DashboardPage />;
}
