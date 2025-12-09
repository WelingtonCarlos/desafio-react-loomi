"use client";

import { Phone, Mail, Eye, Plus, SquareArrowOutUpRight } from "lucide-react";
import { ErrorState } from "@/components/error-state";
import { Button } from "@/components/ui/button";
import { useErrorToast } from "@/hooks/use-error-toast";
import { useView360Data } from "../hooks/useView360Data";
import { SkeletonClientInfoSidebar } from "./skeleton-view-360";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components";

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
    <div className="bg-card border-soft space-y-6 rounded-2xl border py-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center space-y-4 px-6 text-center">
        <div className="bg-brand text-color-muted flex h-20 w-20 items-center justify-center rounded-full text-2xl font-medium">
          {getInitials(client?.name || "")}
        </div>

        <div className="flex flex-col items-center space-y-2 text-center">
          <h2 className="text-color-muted text-lg leading-4 font-bold">{client?.name}</h2>
          <p className="text-muted-soft text-sm leading-4 font-normal">{client?.clientType}</p>
        </div>

        <div className="mt-4 flex w-full flex-col gap-2 2xl:flex-row">
          <Button size="sm" className="flex flex-1 flex-col bg-transparent hover:bg-transparent">
            <Phone className="text-brand-name mr-1 h-6 w-6" />
            <span className="text-xs leading-4 font-normal text-[#EFF6FF]">
              {t("clientSidebar.buttons.call")}
            </span>
          </Button>
          <Button size="sm" className="flex flex-1 flex-col bg-transparent hover:bg-transparent">
            <Mail className="text-brand-name mr-1 h-6 w-6" />
            <span className="text-xs leading-4 font-normal text-[#EFF6FF]">
              {t("clientSidebar.buttons.email")}
            </span>
          </Button>
          <Button size="sm" className="flex flex-1 flex-col bg-transparent hover:bg-transparent">
            <Eye className="text-brand-name mr-1 h-6 w-6" />
            <span className="text-xs leading-4 font-normal text-[#EFF6FF]">
              {t("clientSidebar.buttons.viewMore")}
            </span>
          </Button>
        </div>
      </div>

      <hr />

      {/* Products Section */}
      <div className="px-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-foreground mb-3 text-base leading-4 font-medium">
            {t("clientSidebar.sections.products")}
          </h3>
          <Button
            size="sm"
            className="text-text-color-muted h-6 w-6 bg-transparent p-0 hover:bg-transparent"
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
                    produto.status === "Ativo" ? "bg-green-500" : "bg-destructive"
                  }`}
                />
                <span className="text-muted-soft">{produto.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-foreground font-medium">
                  R$ {produto.value.toFixed(2)}/mês
                </span>
                <SquareArrowOutUpRight className="text-brand-name h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr />

      {/* Profile Tags */}
      <div className="flex flex-col gap-6 px-6">
        <h3 className="text-foreground mb-3 text-base leading-4 font-medium">
          {t("clientSidebar.sections.profile")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {profile?.map((tag, index) => (
            <Badge variant="highlight" key={index}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <hr />

      {/* Captured Phrases */}
      <div className="flex flex-col gap-6 px-6">
        <h3 className="text-foreground mb-3 text-base leading-4 font-medium">
          {t("clientSidebar.sections.phrases")}
        </h3>
        <div className="space-y-3">
          {capturedPhrases?.map((item, index) => (
            <div
              key={index}
              className="bg-card-2 border-soft rounded-tr-xl rounded-b-xl border p-3"
            >
              <p className="text-foreground-muted mb-1 text-sm">&quot;{item.phrase}&quot;</p>
              <p className="text-muted-soft text-xs">
                {t("clientSidebar.labels.serviceDay")}{" "}
                {new Date(item.serviceDate).toLocaleDateString("pt-BR")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <hr />

      {/* App Actions */}
      <div className="flex flex-col gap-6 px-6">
        <h3 className="text-foreground mb-3 text-base leading-4 font-medium">
          {t("clientSidebar.sections.appActions")}
        </h3>
        <div className="space-y-3">
          {appActions?.map((action, index) => (
            <div key={index}>
              <p className="text-muted-soft mb-1 text-xs">{action.accessed}</p>
              <p className="text-foreground text-sm">{action.action}</p>
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
