// Cliente HTTP simples com fetch
import { env } from "@/lib/config/env";

export const api = {
  get: async <T>(url: string): Promise<T> => {
    if (env.SIMULATE_ERRORS) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      throw new Error("Simulação de erro ativa");
    }

    const response = await fetch(`${env.API_BASE_URL}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<T>;
  },
};
