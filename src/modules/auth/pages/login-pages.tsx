"use client";

import { Suspense } from "react";
import { LoginForm } from "../components/login-form";
import { HeaderActions } from "../components/header-actions";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export function LoginPage() {
  const { t } = useTranslation("common");

  return (
    <div className="bg-surface-base relative flex min-h-screen w-full overflow-hidden">
      <HeaderActions />

      <div className="relative z-10 flex w-full flex-col justify-center p-8 lg:w-[45%] lg:p-16 xl:p-24">
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12">
          <span className="bg-linear-to-r from-blue-500 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
            {t("brand.name")}
          </span>
        </div>

        <div className="mt-12">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>

      <div className="relative hidden p-8 lg:flex lg:w-[55%]">
        <div className="relative h-full w-full overflow-hidden rounded-4xl border border-blue-900/30 bg-linear-to-br from-[#0d2847] via-[#0a1929] to-[#050a14] shadow-2xl">
          <div className="inset-0">
            <Image
              src="/image-login.png"
              alt={t("brand.tagline")}
              fill
              className="opacity-90 transition-transform duration-700"
            />
          </div>

          <div className="pointer-events-none inset-0 bg-linear-to-t from-[#050a14]/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}
