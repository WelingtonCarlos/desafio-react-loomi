"use client";

import Image from "next/image";
import { useTicketsData } from "../hooks/useTicketsData";
import { TicketsResponse } from "../types/tickets.types";
import { SkeletonTicketsSummary } from "./skeletons-tickets";

const ICON_SIZE = 32;

export function TicketsSummary() {
  const { data: ticketsResponse, isLoading: isLoadingTickets } =
    useTicketsData<TicketsResponse>();
  const resume = ticketsResponse?.resumo;

  if (isLoadingTickets) {
    return <SkeletonTicketsSummary />;
  }

  return (
    <div className="flex flex-row flex-wrap w-full justify-between gap-6">
      {/* Tickets Abertos */}
      <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-[#161d30] p-6 shadow-sm w-72 flex-1 min-w-[250px]">
        <span className="text-sm font-normal text-white">
          Tickets Abertos
        </span>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-3xl font-bold text-white">{resume?.open}</span>
          <div className="rounded-full bg-cyan-500/10 p-3">
            <Image
              src="/ticket-open.svg"
              alt="Tickets abertos"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
          </div>
        </div>
      </div>

      {/* Em andamento */}
      <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-[#161d30] p-6 shadow-sm w-72 flex-1 min-w-[250px]">
        <span className="text-sm font-normal text-white">Em andamento</span>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-3xl font-bold text-white">
            {resume?.inProgress}
          </span>
          <div className="rounded-full bg-yellow-500/10 p-3">
            <Image
              src="/ticket-progress.svg"
              alt="Tickets em andamento"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
          </div>
        </div>
      </div>

      {/* Resolvidos hoje */}
      <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-[#161d30] p-6 shadow-sm w-72 flex-1 min-w-[250px]">
        <span className="text-sm font-normal text-white">
          Resolvidos hoje
        </span>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-3xl font-bold text-white">
            {resume?.solved}
          </span>
          <div className="rounded-full bg-teal-500/10 p-3">
            <Image
              src="/ticket-resolved.svg"
              alt="Tickets resolvidos"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
          </div>
        </div>
      </div>

      {/* Tempo Médio */}
      <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-[#161d30] p-6 shadow-sm w-72 flex-1 min-w-[250px]">
        <span className="text-sm font-normal text-white">Tempo Médio</span>
        <div className="mt-4 flex items-end justify-between">
          <span className="text-3xl font-bold text-white">
            {resume?.timeAverageHours}h
          </span>
          <div className="rounded-full bg-blue-500/10 p-3">
            <Image
              src="/ticket-mid.svg"
              alt="Tempo médio de atendimento"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
