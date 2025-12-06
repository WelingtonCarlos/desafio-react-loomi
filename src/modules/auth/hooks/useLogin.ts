// Hook customizado para login
import { useState } from "react";
import { authService, type LoginRequest } from "../services/auth-service";
import { useAuth } from "@/lib/stores/auth-store";
import { cookies } from "@/lib/utils/cookies";
import { useRouter } from "next/navigation";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login: setAuthUser } = useAuth();

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);

      if (response.success && response.user && response.token) {
        // Armazena token em COOKIES (conforme requisito)
        cookies.set("auth-token", response.token, credentials.rememberMe ? 30 : 7);

        // Armazena informações do usuário em LOCALSTORAGE (conforme requisito)
        localStorage.setItem("user-data", JSON.stringify(response.user));

        // Atualiza store do Zustand
        setAuthUser(response.user);

        return { success: true, message: "Login realizado com sucesso!" };
      } else {
        return {
          success: false,
          message: response.message || "Credenciais inválidas. Tente novamente.",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Erro ao fazer login. Tente novamente.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Remove token dos cookies
    cookies.remove("auth-token");

    // Remove dados do usuário do localStorage
    localStorage.removeItem("user-data");

    // Limpa store
    useAuth.getState().logout();

    // Redireciona para login
    router.push("/login");
  };

  return {
    login,
    logout,
    isLoading,
  };
}
