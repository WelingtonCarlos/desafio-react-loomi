"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { ErrorState } from "@/components/error-state";
import { useErrorToast } from "@/hooks/use-error-toast";
import { useTicketsData } from "../hooks/useTicketsData";
import { TicketsResponse } from "../types/tickets.types";
import { SkeletonTicketsSummary } from "./skeletons-tickets";
import { useTranslation } from "react-i18next";
import { ICON_SIZE } from "../constants";
import { cn } from "@/lib/utils";

interface TicketSummaryCardProps {
  label: string;
  value: ReactNode;
  iconSrc: string;
  iconAlt: string;
  withTopSpacing?: boolean;
}

function TicketSummaryCard({
  label,
  value,
  iconSrc,
  iconAlt,
  withTopSpacing = true,
}: TicketSummaryCardProps) {
  return (
    <div className="border-soft bg-surface-card flex w-72 min-w-[250px] h-32 flex-1 flex-col justify-between rounded-2xl border p-6 shadow-sm">
      <span className="text-foreground text-sm font-normal">{label}</span>
      <div className={cn("flex items-end justify-between", withTopSpacing && "mt-4")}>
        <span className="text-foreground text-3xl font-bold">{value}</span>
        <div className="rounded-full">
          <Image src={iconSrc} alt={iconAlt} width={ICON_SIZE} height={ICON_SIZE} />
        </div>
      </div>
    </div>
  );
}

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

  const cards = [
    {
      key: "open",
      label: t("tickets:summary.open"),
      value: resume?.open ?? "--",
      iconSrc: "/ticket-open.svg",
      iconAlt: t("tickets:summary.icons.open"),
    },
    {
      key: "in-progress",
      label: t("tickets:summary.inProgress"),
      value: resume?.inProgress ?? "--",
      iconSrc: "/ticket-progress.svg",
      iconAlt: t("tickets:summary.icons.progress"),
    },
    {
      key: "solved",
      label: t("tickets:summary.solvedToday"),
      value: resume?.solved ?? "--",
      iconSrc: "/ticket-resolved.svg",
      iconAlt: t("tickets:summary.icons.resolved"),
    },
    {
      key: "average",
      label: t("tickets:summary.averageTime"),
      value: resume?.timeAverageHours != null ? `${resume.timeAverageHours}h` : "--",
      iconSrc: "/ticket-mid.svg",
      iconAlt: t("tickets:summary.icons.average"),
      withTopSpacing: false,
    },
  ];

  return (
    <div className="flex w-full flex-row flex-wrap justify-between gap-6">
      {cards.map((card) => (
        <TicketSummaryCard
          key={card.key}
          label={card.label}
          value={card.value}
          iconSrc={card.iconSrc}
          iconAlt={card.iconAlt}
          withTopSpacing={card.withTopSpacing}
        />
      ))}
    </div>
  );
}
