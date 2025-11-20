"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginFormData } from "../schemas/login-schema";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const { login, isLoading } = useLogin();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  
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
      toast.success(result.message || 'Login realizado com sucesso!');
      router.push(redirectTo);
    } else {
      toast.error(result.message || 'Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-medium text-white">Login</h1>
        <p className="text-gray-400 text-sm">
          Entre com suas credenciais para acessar a sua conta.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <div className="relative">
            <Input
              id="username"
              type="email"
              placeholder="E-mail*"
              className="bg-[#0f1623] border-gray-800 text-white placeholder:text-gray-500 h-14 rounded-lg"
              {...register("username")}
            />
          </div>
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
          <p className="text-xs text-gray-500">
            Insira o seu e-mail.
          </p>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Senha*"
              maxLength={12}
              className="bg-[#0f1623] border-gray-800 text-white placeholder:text-gray-500 h-14 pr-10 rounded-lg"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label
              htmlFor="remember"
              className="text-sm text-gray-300 font-normal cursor-pointer"
            >
              Lembrar meu usuário
            </Label>
          </div>
          <a
            href="#"
            className="text-sm text-blue-500 hover:text-blue-400 transition-colors"
          >
            Esqueci minha senha
          </a>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </div>
  );
}
