import { ensureAuthenticated } from "@/lib/auth-guard";
import { View360Page } from "@/modules/view-360/pages/view-360-page";

export default async function View360() {
  await ensureAuthenticated("/view-360");
  return <View360Page />;
}
