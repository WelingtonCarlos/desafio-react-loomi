"use client";

import { Phone, Mail, Eye, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ErrorState } from "@/components/error-state"
import { useErrorToast } from "@/hooks/use-error-toast"
import { useView360Data } from "../hooks/useView360Data"
import { SkeletonClientInfoSidebar } from "./skeleton-view-360"
import { useTranslation } from "react-i18next"

export function ClientInfoSidebar() {
  const { t } = useTranslation("view360")
  const {
    data: view360Data,
    isLoading: isLoadingView360Data,
    isError,
    refetch,
  } = useView360Data()

  const client = view360Data?.client;
  const produtos = view360Data?.produtos;
  const profile = view360Data?.profile;
  const capturedPhrases = view360Data?.capturedPhrases;
  const appActions = view360Data?.appActions;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  useErrorToast(isError, {
    message: t("view360:errors.clientInfoTitle", {
      defaultValue: "Não conseguimos carregar os dados do cliente.",
    }),
    description: t("view360:errors.clientInfoDescription", {
      defaultValue: "Tente novamente em instantes.",
    }),
    toastId: "view360-client-info-error",
  })

  if (isLoadingView360Data) return <SkeletonClientInfoSidebar />

  if (isError) {
    return (
      <ErrorState
        title={t("view360:errors.clientInfoTitle", {
          defaultValue: "Não conseguimos carregar os dados do cliente.",
        })}
        description={t("view360:errors.clientInfoDescription", {
          defaultValue: "Tente novamente em instantes.",
        })}
        onRetry={refetch}
        className="bg-gradient-glass border border-soft"
      />
    )
  }

  return (
    <div className="bg-gradient-glass border border-soft rounded-2xl p-6 space-y-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-brand flex items-center justify-center text-brand-foreground text-2xl font-medium">
          {getInitials(client?.name || "")}
        </div>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-lg font-medium text-foreground">{client?.name}</h2>
          <p className="text-sm text-muted-soft">{client?.clientType}</p>
        </div>
        <div className="flex flex-col 2xl:flex-row gap-2 w-full">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-muted-soft hover:text-foreground"
          >
            <Phone className="w-4 h-4 mr-1" />
            {t("clientSidebar.buttons.call")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-muted-soft hover:text-foreground"
          >
            <Mail className="w-4 h-4 mr-1" />
            {t("clientSidebar.buttons.email")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-muted-soft hover:text-foreground"
          >
            <Eye className="w-4 h-4 mr-1" />
            {t("clientSidebar.buttons.viewMore")}
          </Button>
        </div>
      </div>

      {/* Products Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">{t("clientSidebar.sections.products")}</h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-muted-soft hover:text-foreground"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {produtos?.map((produto, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    produto.status === "Ativo"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }`}
                />
                <span className="text-muted-soft">{produto.name}</span>
              </div>
              <span className="text-foreground font-medium">
                R$ {produto.value.toFixed(2)}/mês
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Tags */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">{t("clientSidebar.sections.profile")}</h3>
        <div className="flex flex-wrap gap-2">
          {profile?.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-brand-soft text-brand text-xs rounded-full border border-soft"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Captured Phrases */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">{t("clientSidebar.sections.phrases")}</h3>
        <div className="space-y-3">
          {capturedPhrases?.map((item, index) => (
            <div
              key={index}
              className="bg-surface-panel p-3 rounded-lg border border-soft"
            >
              <p className="text-sm text-muted-soft italic mb-1">
                "{item.phrase}"
              </p>
              <p className="text-xs text-muted-soft">
                {t("clientSidebar.labels.serviceDay")}{" "}
                {new Date(item.serviceDate).toLocaleDateString("pt-BR")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* App Actions */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">{t("clientSidebar.sections.appActions")}</h3>
        <div className="space-y-3">
          {appActions?.map((action, index) => (
            <div key={index}>
              <p className="text-xs text-muted-soft mb-1">{action.accessed}</p>
              <p className="text-sm text-muted-soft">{action.action}</p>
              {action.pageTime && (
                <p className="text-xs text-muted-soft">
                  {t("clientSidebar.labels.pageTime")} {action.pageTime}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
