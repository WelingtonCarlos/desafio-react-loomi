"use client"

import { z } from "zod"
import type {
  TicketPriority,
  TicketStatus,
} from "../types/tickets.types"

export const TICKET_STATUS_VALUES = [
  "Aberto",
  "Em andamento",
  "Fechado",
] as const satisfies readonly TicketStatus[]

export const TICKET_PRIORITY_VALUES = [
  "Urgente",
  "Média",
  "Baixa",
] as const satisfies readonly TicketPriority[]

export const ticketFormSchema = z.object({
  client: z
    .string()
    .min(3, "Informe pelo menos 3 caracteres")
    .max(80, "Máximo de 80 caracteres"),
  email: z.string().email("Informe um e-mail válido"),
  subject: z
    .string()
    .min(5, "Assunto muito curto")
    .max(200, "Limite de 200 caracteres"),
  status: z.enum(TICKET_STATUS_VALUES),
  priority: z.enum(TICKET_PRIORITY_VALUES),
  responsible: z
    .string()
    .min(2, "Informe o responsável")
    .max(60, "Limite de 60 caracteres"),
})

export type TicketFormValues = z.infer<typeof ticketFormSchema>

