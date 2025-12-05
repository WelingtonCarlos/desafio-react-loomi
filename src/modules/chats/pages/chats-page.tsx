"use client";

import { ErrorState } from "@/components/error-state"
import { useErrorToast } from "@/hooks/use-error-toast"
import { PageHeader } from "@/modules/navigation/components/page-header"
import { ChatMessages } from "../components/chat-messages"
import { ChatInput } from "../components/chat-input"
import { ChatSidebar } from "../components/chat-sidebar"
import {
  SkeletonChatInput,
  SkeletonChatMessages,
  SkeletonChatSidebar,
} from "../components/skeletons-chat";
import { useChatsData } from "../hooks/useChatsData"
import { useTranslation } from "react-i18next"

export function ChatPage() {
  const {
    data: chatsData,
    isLoading,
    isError,
    refetch,
  } = useChatsData()
  const { t } = useTranslation("chats")

  useErrorToast(isError, {
    message: t("errors.listTitle", {
      defaultValue: "Não foi possível carregar a conversa.",
    }),
    description: t("errors.listDescription", {
      defaultValue: "Verifique sua conexão e tente novamente.",
    }),
    toastId: "chat-page-error",
  })

  if (isError) {
    return (
      <div className="mx-auto flex flex-col">
        <PageHeader title={t("title")} />
        <div className="p-6">
          <ErrorState
            title={t("errors.listTitle", {
              defaultValue: "Não foi possível carregar a conversa.",
            })}
            description={t("errors.listDescription", {
              defaultValue: "Verifique sua conexão e tente novamente.",
            })}
            onRetry={refetch}
            className="h-[300px] bg-gradient-glass border border-soft"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex flex-col">
      <PageHeader title={t("title")} />

      <div className="flex h-[calc(100vh-102px)] flex-col-reverse  lg:flex-row">
        <div className="flex flex-1 flex-col border border-white/5 bg-[#050816] overflow-hidden">
          {isLoading ? (
            <SkeletonChatMessages />
          ) : (
            <ChatMessages data={chatsData} />
          )}

          {isLoading ? <SkeletonChatInput /> : <ChatInput />}
        </div>

        <div className="w-full shrink-0 lg:w-[360px]">
          <div className="h-full border border-white/5 overflow-hidden">
            {isLoading ? (
              <SkeletonChatSidebar />
            ) : (
              <ChatSidebar data={chatsData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
