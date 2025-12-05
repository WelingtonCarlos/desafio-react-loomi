"use client";

import { Button } from "@/components/ui/button";
import { useTicketModalStore } from "@/lib/stores/ticket-modal-store";
import { PageHeader } from "@/modules/navigation/components/page-header";
import { Plus } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { NewTicketModal } from "../components/ticket-modal";
import { TicketsSummary } from "../components/tickets-summary";
import { TicketsTable } from "../components/tickets-table";
import type { TicketItem } from "../types/tickets.types";

export function TicketsPage() {

  const { t } = useTranslation(["tickets", "common"])
  const openForCreate = useTicketModalStore((state) => state.openForCreate);
  const openForEdit = useTicketModalStore((state) => state.openForEdit);

  const handleCreateClick = useCallback(() => {
    openForCreate();
  }, [openForCreate]);

  const handleEditTicket = useCallback(
    (ticket: TicketItem) => {
      openForEdit(ticket);
    },
    [openForEdit]
  );

  return (
    <div className="flex flex-col gap-10 m-auto">
      <PageHeader
        title={t("tickets:header.title")}
        action={
          <Button
            className="bg-[#1E86FF] hover:bg-[#1E86FF]/90 text-white rounded-full cursor-pointer px-6 shadow-[0_0_20px_rgba(30,134,255,0.3)]"
            onClick={handleCreateClick}
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("tickets:header.new")}
          </Button>
        }
      />
      <div className="flex flex-col 2xl:flex-row gap-8 w-full max-w-3xl xl:max-w-4xl 2xl:max-w-7xl m-auto">
        <TicketsSummary />
      </div>

      <div className="flex flex-col 2xl:flex-row gap-8 w-full max-w-3xl xl:max-w-4xl 2xl:max-w-7xl m-auto">
        <TicketsTable onEditTicket={handleEditTicket} />
      </div>

      <NewTicketModal />
    </div>
  );
}
