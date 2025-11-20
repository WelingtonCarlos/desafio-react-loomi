// Cliente HTTP simples com fetch
import { env } from '@/lib/config/env';

export const api = {
  get: async (url: string) => {
    const response = await fetch(`${env.API_BASE_URL}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};
