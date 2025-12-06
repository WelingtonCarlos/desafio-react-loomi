import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function buildRedirectUrl(pathname?: string) {
  if (!pathname) {
    return "/login";
  }

  const search = new URLSearchParams({ redirectTo: pathname });
  return `/login?${search.toString()}`;
}

export async function ensureAuthenticated(pathname?: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  if (!token) {
    redirect(buildRedirectUrl(pathname));
  }
}

export async function redirectIfAuthenticated(defaultDestination: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  if (token) {
    redirect(defaultDestination);
  }
}
