// Configuração de variáveis de ambiente
const DEFAULT_API_URL =
  "https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2"

export const env = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_URL,
  SIMULATE_ERRORS: process.env.NEXT_PUBLIC_SIMULATE_ERRORS !== "false",
} as const
