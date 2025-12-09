"use client";

import { ErrorState } from "@/components/error-state";
import { useErrorToast } from "@/hooks/use-error-toast";
import { useView360Data } from "@/modules/view-360/hooks/useView360Data";
import { useTranslation } from "react-i18next";
import type { ChatsData } from "../types/chats.types";
import {
  AISuggestionCard,
  ChatAppActions,
  ChatClientCard,
  ChatProductList,
  ChatProfileTags,
  ConversationInsightsCard,
  FutureStepsCard,
  RecommendedOfferCard,
} from "@/modules/chats/components/chat-sidebar/index";
import { SkeletonChatSidebar } from "@/modules/chats/components/skeletons-chat";

interface ChatSidebarProps {
  data?: ChatsData;
}

export function ChatSidebar({ data }: ChatSidebarProps) {
  const { data: view360Data, isLoading, isError, refetch } = useView360Data();
  const { t } = useTranslation("chats");

  const client = view360Data?.client;
  const produtos = view360Data?.produtos;
  const profile = view360Data?.profile;
  const appActions = view360Data?.appActions;

  const conversationAnalysis = data?.conversationAnalysis;
  const iaSuggestion = data?.iaSuggestion;

  useErrorToast(isError, {
    message: t("sidebar.errors.title", {
      defaultValue: "Erro ao carregar dados do cliente.",
    }),
    description: t("sidebar.errors.description", {
      defaultValue: "Tente novamente em instantes.",
    }),
    toastId: "chat-sidebar-error",
  });

  if (isLoading) {
    return (
      <div className="bg-chat-sidebar h-full overflow-y-auto p-6">
        <SkeletonChatSidebar />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-chat-sidebar h-full overflow-y-auto p-6">
        <ErrorState
          title={t("sidebar.errors.title", {
            defaultValue: "Erro ao carregar dados do cliente.",
          })}
          description={t("sidebar.errors.description", {
            defaultValue: "Tente novamente em instantes.",
          })}
          onRetry={refetch}
          className="w-full"
        />
      </div>
    );
  }

  return (
    <div className="bg-chat-sidebar h-full w-[622px] space-y-6 overflow-y-auto p-6">
      <div className="space-y-6 rounded-2xl border border-white/5 bg-linear-to-br from-[#1a2234] via-[#151a23] to-[#101624] py-6">
        <ChatClientCard client={client} t={t} />
        <hr />
        <ChatProductList products={produtos} t={t} />
        <hr />
        <ChatProfileTags tags={profile} t={t} />
        <hr />
        <ChatAppActions actions={appActions} t={t} />
      </div>

      <AISuggestionCard suggestion={iaSuggestion} t={t} />
      <ConversationInsightsCard insights={conversationAnalysis?.insights} />
      <FutureStepsCard futureSteps={conversationAnalysis?.futureSteps} />
      <RecommendedOfferCard t={t} />
    </div>
  );
}
