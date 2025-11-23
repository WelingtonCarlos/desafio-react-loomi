"use client";

import {
  Phone,
  Mail,
  Eye,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useView360Data } from "@/modules/view-360/hooks/useView360Data";
import type { ChatsData } from "../types/chats.types";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface ChatSidebarProps {
  data?: ChatsData;
}

export function ChatSidebar({ data }: ChatSidebarProps) {
  const { data: view360Data } = useView360Data();
  const { t } = useTranslation("chats");

  const client = view360Data?.client;
  const produtos = view360Data?.produtos;
  const profile = view360Data?.profile;
  const appActions = view360Data?.appActions;

  const conversationAnalysis = data?.conversationAnalysis;
  const iaSuggestion = data?.iaSuggestion;

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-emerald-400";
      case "medium":
        return "bg-yellow-400";
      case "low":
        return "bg-slate-500";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <div className="h-full overflow-y-auto space-y-6 bg-[#050816] p-6">
      <div className="space-y-6 rounded-2xl border border-white/5 bg-linear-to-br from-[#1a2234] via-[#151a23] to-[#101624] p-6">
        <div className="flex flex-col items-center space-y-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-xl font-medium text-white">
            {getInitials(client?.name || "")}
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">
              {client?.name}
            </h2>
            <p className="text-sm text-slate-400">{client?.clientType}</p>
          </div>

          <div className="flex w-full gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex h-12 flex-1 cursor-pointer flex-col items-center justify-center gap-1 text-xs text-slate-300 hover:text-white"
            >
              <Phone className="h-4 w-4 text-blue-400" />
              <span>{t("sidebar.actions.call")}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex h-12 flex-1 cursor-pointer flex-col items-center justify-center gap-1 text-xs text-slate-300 hover:text-white"
            >
              <Mail className="h-4 w-4 text-blue-400" />
              <span>{t("sidebar.actions.email")}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex h-12 flex-1 cursor-pointer flex-col items-center justify-center gap-1 text-xs text-slate-300 hover:text-white"
            >
              <Eye className="h-4 w-4 text-blue-400" />
              <span>{t("sidebar.actions.viewMore")}</span>
            </Button>
          </div>
        </div>

        <hr />

        <div className="space-y-3">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">{t("sidebar.products")}</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 text-slate-400 hover:text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {produtos?.map((produto, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      produto.status === "Ativo"
                        ? "bg-emerald-400"
                        : "bg-orange-400"
                    }`}
                  />
                  <span className="text-slate-200">{produto.name}</span>
                </div>
                <span className="font-semibold text-white">
                  R$ {produto.value.toFixed(2)}/mês
                </span>
              </div>
            ))}
          </div>
        </div>

        <hr />

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white">{t("sidebar.profile")}</h3>
          <div className="flex flex-wrap gap-2">
            {profile?.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-300 border border-blue-500/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <hr />

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white">{t("sidebar.appActions")}</h3>
          <div className="space-y-3">
            {appActions?.map((action, index) => (
              <div key={index}>
                <p className="text-[11px] text-slate-500 mb-0.5">
                  {action.accessed}
                </p>
                <p className="text-xs text-slate-200">{action.action}</p>
                {action.pageTime && (
                  <p className="text-[11px] text-slate-500">
                    {t("sidebar.timeOnPage", { time: action.pageTime })}
                  </p>
                )}
              </div>
            )) || (
              <p className="text-[11px] text-slate-500">{t("sidebar.noData")}</p>
            )}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-linear-to-br from-[#1a2332] to-[#151a23] p-6">
        <div className="absolute right-4 top-4 text-blue-400 opacity-20">
        <Image
            src="/brilho.png"
            alt="Conversation Analysis"
            width={64}
            height={64}
            className="z-50"
          />
        </div>
        <h3 className="mb-2 text-sm font-medium text-white">{t("sidebar.aiSuggestion")}</h3>
        <p className="mb-4 text-xs leading-relaxed text-slate-300">
          {iaSuggestion}
        </p>
        <Button className="h-8 w-full rounded-full bg-blue-500 text-xs font-medium text-white hover:bg-blue-600">
          {t("sidebar.useSuggestion")}
        </Button>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-linear-to-br from-[#58606e] via-[#4e5462] to-[#5d6270] p-6">
        <div className="absolute right-4 top-4 text-cyan-400 opacity-20">
        <Image
            src="/brain.png"
            alt="Conversation Analysis"
            width={64}
            height={64}
            className="z-50"
          />
        </div>
        <h3 className="mb-3 text-sm font-medium text-white">
          {conversationAnalysis?.insights.title}
        </h3>
        <div className="space-y-2">
          {conversationAnalysis?.insights?.insights.map((insight) => (
            <div key={insight.id} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
              <p className="text-xs text-slate-200">{insight.category}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-linear-to-br from-[#58606e] via-[#4e5462] to-[#5d6270] p-6">
        <div className="absolute right-4 top-4 text-blue-400 opacity-20">
        <Image
            src="/pin.png"
            alt="Conversation Analysis"
            width={64}
            height={64}
          />
        </div>
        <h3 className="mb-3 text-sm font-medium text-white">
          {conversationAnalysis?.futureSteps.title}
        </h3>
        <div className="space-y-2">
          {conversationAnalysis?.futureSteps.actions.map((action) => (
            <div key={action.id} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-2xl shadow-cyan-400/20" />
              <p className="text-xs text-slate-200">{action.action}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-blue-400/20 bg-[#0f1a2f] p-6 bg-linear-to-br from-[#1e3a8a]/40 via-[#1e3a8a]/20 to-[#0f172a]">
        <div className="absolute right-4 top-8 text-blue-300/40">
        <Image
            src="/shield.png"
            alt="Conversation Analysis"
            width={64}
            height={64}
            className="z-50"
          />
        </div>

        <h3 className="text-sm font-semibold text-white mb-4">
          {t("sidebar.recommendedOffers.title")}
        </h3>

        <div className="rounded-xl bg-linear-to-br from-[#4aa8ff]/30 via-[#2b7bff]/40 to-[#2b7bff]/40 p-px mb-2">
          <div className="rounded-xl bg-linear-to-br from-[#1d78d1] via-[#2896d5] to-[#3cb9d7] p-4">
            <h4 className="text-base font-semibold text-white mb-1">
              {t("sidebar.recommendedOffers.planTitle")}
            </h4>

            {/* Benefícios */}
            <p className="text-xs text-blue-50/70 mb-4 leading-relaxed">
              {t("sidebar.recommendedOffers.benefits")}
            </p>

            {/* Valores */}
            <div className="space-y-2 text-xs text-slate-200">
              <div className="flex justify-between">
                <span>{t("sidebar.recommendedOffers.normalPrice")}</span>
                <span className="font-medium">R$ 86,00/mês</span>
              </div>

              <div className="flex justify-between text-white font-semibold">
                <span>{t("sidebar.recommendedOffers.discountPrice")}</span>
                <span className="text-lg text-white">R$ 86,00/mês</span>
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-slate-300">
                  {t("sidebar.recommendedOffers.yearlySaving")}
                </span>
                <span className="font-medium text-blue-300">R$103,20/ano</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
