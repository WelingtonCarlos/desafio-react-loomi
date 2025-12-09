"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button, Input, Checkbox, Label, Eye, EyeOff } from "@/modules/auth";
import { loginSchema, type LoginFormData } from "../schemas/login-schema";
import { useLogin } from "../hooks/useLogin";
import { useTranslation } from "react-i18next";

const MotionButton = motion.create(Button);

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isRedirecting, setIsRedirecting] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const { login, isLoading } = useLogin();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  const { t } = useTranslation("auth");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await login({ ...data, rememberMe });

    if (result.success) {
      toast.success(result.message || t("messages.loginSuccess"));
      setIsRedirecting(true);
      setTimeout(() => {
        router.push(redirectTo);
      }, 200);
      return;
    }

    toast.error(result.message || t("messages.genericError"));
  };

  return (
    <div className="w-full max-w-md space-y-16">
      <div className="space-y-2.5">
        <h1 className="text-text-color-white text-4xl font-normal">{t("page.title")}</h1>
        <p className="text-text-color-white text-xl font-normal">{t("page.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          <div className="relative">
            <Input
              id="username"
              type="email"
              placeholder={t("form.emailPlaceholder")}
              className="h-14 rounded-lg border-gray-800 bg-[#0B1125] text-white placeholder:text-gray-500"
              {...register("username")}
            />
          </div>
          {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
          <p className="text-xs text-gray-500">{t("form.emailHelper")}</p>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("form.passwordPlaceholder")}
              maxLength={12}
              className="h-14 rounded-lg border-gray-800 bg-[#0f1623] pr-10 text-white placeholder:text-gray-500"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              className="border-gray-600 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
            />
            <Label htmlFor="remember" className="cursor-pointer text-sm font-normal text-gray-300">
              {t("form.rememberMe")}
            </Label>
          </div>
          <a href="#" className="text-brand-name cursor-pointer text-base font-medium">
            {t("form.forgotPassword")}
          </a>
        </div>

        <MotionButton
          type="submit"
          disabled={isLoading || isRedirecting}
          className="bg-brand-name hover:bg-brand-name/75 h-12 w-full cursor-pointer rounded-lg text-base font-medium text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.12 }}
        >
          {isLoading || isRedirecting ? t("form.submitting") : t("form.submit")}
        </MotionButton>
      </form>

      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            className="bg-brand/40 pointer-events-none fixed inset-0 z-20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
