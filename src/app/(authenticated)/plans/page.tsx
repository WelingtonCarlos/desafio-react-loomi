import { ensureAuthenticated } from "@/lib/auth-guard";
import { PlansPage } from "@/modules/plans/pages/plans-page";

export default async function Plans() {
  await ensureAuthenticated("/plans");
  return <PlansPage />;
}
