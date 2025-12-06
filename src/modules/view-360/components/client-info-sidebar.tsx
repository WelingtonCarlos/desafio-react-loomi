"use client";

import { Phone, Mail, Eye, Plus } from "lucide-react";
import { ErrorState } from "@/components/error-state";
import { Button } from "@/components/ui/button";
import { useErrorToast } from "@/hooks/use-error-toast";
import { useView360Data } from "../hooks/useView360Data";
import { SkeletonClientInfoSidebar } from "./skeleton-view-360";
import { useTranslation } from "react-i18next";

export function ClientInfoSidebar() {
  const { t } = useTranslation("view360");
  const { data: view360Data, isLoading: isLoadingView360Data, isError, refetch } = useView360Data();

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
  });

  if (isLoadingView360Data) return <SkeletonClientInfoSidebar />;

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
        className="bg-gradient-glass border-soft border"
      />
    );
  }

  return (
    <div className="bg-gradient-glass border-soft space-y-6 rounded-2xl border p-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center space-y-3 text-center">
        <div className="bg-brand text-brand-foreground flex h-20 w-20 items-center justify-center rounded-full text-2xl font-medium">
          {getInitials(client?.name || "")}
        </div>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-foreground text-lg font-medium">{client?.name}</h2>
          <p className="text-muted-soft text-sm">{client?.clientType}</p>
        </div>
        <div className="flex w-full flex-col gap-2 2xl:flex-row">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-soft hover:text-foreground flex-1"
          >
            <Phone className="mr-1 h-4 w-4" />
            {t("clientSidebar.buttons.call")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-soft hover:text-foreground flex-1"
          >
            <Mail className="mr-1 h-4 w-4" />
            {t("clientSidebar.buttons.email")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-soft hover:text-foreground flex-1"
          >
            <Eye className="mr-1 h-4 w-4" />
            {t("clientSidebar.buttons.viewMore")}
          </Button>
        </div>
      </div>

      {/* Products Section */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-foreground text-sm font-medium">
            {t("clientSidebar.sections.products")}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-soft hover:text-foreground h-6 w-6 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {produtos?.map((produto, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    produto.status === "Ativo" ? "bg-green-500" : "bg-orange-500"
                  }`}
                />
                <span className="text-muted-soft">{produto.name}</span>
              </div>
              <span className="text-foreground font-medium">R$ {produto.value.toFixed(2)}/mês</span>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Tags */}
      <div>
        <h3 className="text-foreground mb-3 text-sm font-medium">
          {t("clientSidebar.sections.profile")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {profile?.map((tag, index) => (
            <span
              key={index}
              className="bg-brand-soft text-brand border-soft rounded-full border px-3 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Captured Phrases */}
      <div>
        <h3 className="text-foreground mb-3 text-sm font-medium">
          {t("clientSidebar.sections.phrases")}
        </h3>
        <div className="space-y-3">
          {capturedPhrases?.map((item, index) => (
            <div key={index} className="bg-surface-panel border-soft rounded-lg border p-3">
              <p className="text-muted-soft mb-1 text-sm italic">&quot;{item.phrase}&quot;</p>
              <p className="text-muted-soft text-xs">
                {t("clientSidebar.labels.serviceDay")}{" "}
                {new Date(item.serviceDate).toLocaleDateString("pt-BR")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* App Actions */}
      <div>
        <h3 className="text-foreground mb-3 text-sm font-medium">
          {t("clientSidebar.sections.appActions")}
        </h3>
        <div className="space-y-3">
          {appActions?.map((action, index) => (
            <div key={index}>
              <p className="text-muted-soft mb-1 text-xs">{action.accessed}</p>
              <p className="text-muted-soft text-sm">{action.action}</p>
              {action.pageTime && (
                <p className="text-muted-soft text-xs">
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
