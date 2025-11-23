import { Suspense } from "react";
import { LoginPage } from "@/modules/auth/pages/login-pages";

export default function Login() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
}
