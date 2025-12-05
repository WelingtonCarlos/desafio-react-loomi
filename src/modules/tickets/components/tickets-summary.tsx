"use client";

import Image from "next/image"
import { ErrorState } from "@/components/error-state"
import { useErrorToast } from "@/hooks/use-error-toast"
import { useTicketsData } from "../hooks/useTicketsData"
import { TicketsResponse } from "../types/tickets.types"
import { SkeletonTicketsSummary } from "./skeletons-tickets"
import { useTranslation } from "react-i18next"

const ICON_SIZE = 32;

export function TicketsSummary() {
  const { t } = useTranslation(["tickets", "common"])

  const {
    data: ticketsResponse,
    isLoading: isLoadingTickets,
    isError,
    refetch,
  } = useTicketsData<TicketsResponse>()
  const resume = ticketsResponse?.resumo;

  useErrorToast(isError, {
    message: t("tickets:errors.summaryTitle", {
      defaultValue: "Não foi possível carregar o resumo de tickets.",
    }),
    description: t("tickets:errors.summaryDescription", {
      defaultValue: "Tente novamente mais tarde.",
    }),
    toastId: "tickets-summary-error",
  })

  if (isLoadingTickets) {
    return <SkeletonTicketsSummary />
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
        className="w-full bg-gradient-glass border border-soft"
      />
    )
  }

  return (
    <div className="flex flex-row flex-wrap w-full justify-between gap-6">
      <div className="flex flex-col justify-between rounded-2xl border border-soft bg-surface-card p-6 shadow-sm w-72 flex-1 min-w-[250px]">
        <span className="text-sm font-normal text-foreground">
          {t("tickets:summary.open")}
        </span>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-3xl font-bold text-foreground">
            {resume?.open}
          </span>
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
      <div className="flex flex-col justify-between rounded-2xl border border-soft bg-surface-card p-6 shadow-sm w-72 flex-1 min-w-[250px]">
        <span className="text-sm font-normal text-foreground">
          {t("tickets:summary.inProgress")}
        </span>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-3xl font-bold text-foreground">
            {resume?.inProgress}
          </span>
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
      <div className="flex flex-col justify-between rounded-2xl border border-soft bg-surface-card p-6 shadow-sm w-72 flex-1 min-w-[250px]">
        <span className="text-sm font-normal text-foreground">
          {t("tickets:summary.solvedToday")}
        </span>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-3xl font-bold text-foreground">
            {resume?.solved}
          </span>
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
      <div className="flex flex-col justify-between rounded-2xl border border-soft bg-surface-card p-6 shadow-sm w-72 flex-1 min-w-[250px]">
        <span className="text-sm font-normal text-foreground">
          {t("tickets:summary.averageTime")}
        </span>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-3xl font-bold text-foreground">
            {resume?.timeAverageHours}h
          </span>
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
