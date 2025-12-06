"use client";

import Image from "next/image";
import { ErrorState } from "@/components/error-state";
import { useErrorToast } from "@/hooks/use-error-toast";
import { useTicketsData } from "../hooks/useTicketsData";
import { TicketsResponse } from "../types/tickets.types";
import { SkeletonTicketsSummary } from "./skeletons-tickets";
import { useTranslation } from "react-i18next";
import { ICON_SIZE } from "../constants";

export function TicketsSummary() {
  const { t } = useTranslation(["tickets", "common"]);

  const {
    data: ticketsResponse,
    isLoading: isLoadingTickets,
    isError,
    refetch,
  } = useTicketsData<TicketsResponse>();
  const resume = ticketsResponse?.resumo;

  useErrorToast(isError, {
    message: t("tickets:errors.summaryTitle", {
      defaultValue: "Não foi possível carregar o resumo de tickets.",
    }),
    description: t("tickets:errors.summaryDescription", {
      defaultValue: "Tente novamente mais tarde.",
    }),
    toastId: "tickets-summary-error",
  });

  if (isLoadingTickets) {
    return <SkeletonTicketsSummary />;
  }

  if (isError) {
    return (
      <ErrorState
        title={t("tickets:errors.summaryTitle", {
          defaultValue: "Não foi possível carregar o resumo de tickets.",
        })}
        description={t("tickets:errors.summaryDescription", {
          defaultValue: "Tente novamente mais tarde.",
        })}
        onRetry={refetch}
        className="bg-gradient-glass border-soft w-full border"
      />
    );
  }

  return (
    <div className="flex w-full flex-row flex-wrap justify-between gap-6">
      <div className="border-soft bg-surface-card flex w-72 min-w-[250px] flex-1 flex-col justify-between rounded-2xl border p-6 shadow-sm">
        <span className="text-foreground text-sm font-normal">{t("tickets:summary.open")}</span>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-foreground text-3xl font-bold">{resume?.open}</span>
          <div className="rounded-full bg-cyan-500/10 p-3">
            <Image
              src="/ticket-open.svg"
              alt={t("tickets:summary.icons.open")}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
          </div>
        </div>
      </div>

      {/* Em andamento */}
      <div className="border-soft bg-surface-card flex w-72 min-w-[250px] flex-1 flex-col justify-between rounded-2xl border p-6 shadow-sm">
        <span className="text-foreground text-sm font-normal">
          {t("tickets:summary.inProgress")}
        </span>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-foreground text-3xl font-bold">{resume?.inProgress}</span>
          <div className="rounded-full bg-yellow-500/10 p-3">
            <Image
              src="/ticket-progress.svg"
              alt={t("tickets:summary.icons.progress")}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
          </div>
        </div>
      </div>

      {/* Resolvidos hoje */}
      <div className="border-soft bg-surface-card flex w-72 min-w-[250px] flex-1 flex-col justify-between rounded-2xl border p-6 shadow-sm">
        <span className="text-foreground text-sm font-normal">
          {t("tickets:summary.solvedToday")}
        </span>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-foreground text-3xl font-bold">{resume?.solved}</span>
          <div className="rounded-full bg-teal-500/10 p-3">
            <Image
              src="/ticket-resolved.svg"
              alt={t("tickets:summary.icons.resolved")}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
          </div>
        </div>
      </div>

      {/* Tempo Médio */}
      <div className="border-soft bg-surface-card flex w-72 min-w-[250px] flex-1 flex-col justify-between rounded-2xl border p-6 shadow-sm">
        <span className="text-foreground text-sm font-normal">
          {t("tickets:summary.averageTime")}
        </span>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-foreground text-3xl font-bold">{resume?.timeAverageHours}h</span>
          <div className="rounded-full bg-blue-500/10 p-3">
            <Image
              src="/ticket-mid.svg"
              alt={t("tickets:summary.icons.average")}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
