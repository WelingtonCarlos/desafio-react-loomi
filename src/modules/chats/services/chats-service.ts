import { api } from "@/lib/api/http-client";
import { endpoints } from "@/lib/api/endpoints";
import type { ChatsData, ChatTranscript } from "../types/chats.types";

// Busca os dados do simulador de planos
export async function getChatsData(): Promise<ChatsData> {
  return api.get<ChatTranscript>(endpoints.chat);
}
