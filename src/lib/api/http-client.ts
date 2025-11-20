// Cliente HTTP simples com fetch
const API_BASE = "https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2";

export const api = {
  get: async (url: string) => {
    const response = await fetch(`${API_BASE}${url}`);
    return response.json();
  },
};
