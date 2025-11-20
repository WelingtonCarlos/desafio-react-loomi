// Configuração de variáveis de ambiente
export const env = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2',
} as const;
