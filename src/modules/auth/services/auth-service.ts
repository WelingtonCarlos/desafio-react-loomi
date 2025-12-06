// Serviço de autenticação
import { endpoints } from "@/lib/api/endpoints";
import { api } from "@/lib/api/http-client";

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  success: boolean;
  user?: {
    name: string;
    email: string;
  };
  token?: string;
  message?: string;
}

interface LoginApiResponse {
  data: {
    accessToken: string;
    username: string;
  };
}

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = (await api.get(endpoints.login)) as LoginApiResponse;

      // Transforma resposta da API no formato esperado
      if (response.data && response.data.accessToken) {
        return {
          success: true,
          user: {
            name: response.data.username,
            email: credentials.username, // Usando username do form como email
          },
          token: response.data.accessToken,
          message: "Login realizado com sucesso!",
        };
      }

      return {
        success: false,
        message: "Credenciais inválidas.",
      };
    } catch {
      return {
        success: false,
        message: "Erro ao fazer login. Tente novamente.",
      };
    }
  },
};
