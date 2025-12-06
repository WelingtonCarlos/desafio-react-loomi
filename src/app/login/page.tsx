import { Suspense } from "react";
import { redirectIfAuthenticated } from "@/lib/auth-guard";
import { LoginPage } from "@/modules/auth/pages/login-pages";

interface LoginPageProps {
  searchParams?: {
    redirectTo?: string;
  };
}

export default async function Login({ searchParams }: LoginPageProps) {
  const destination = searchParams?.redirectTo ?? "/dashboard";
  await redirectIfAuthenticated(destination);

  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
}
