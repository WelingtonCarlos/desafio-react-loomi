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
  const { t } = useTranslation(["tickets", "common"]);
  const openForCreate = useTicketModalStore((state) => state.openForCreate);
  const openForEdit = useTicketModalStore((state) => state.openForEdit);

  const handleCreateClick = useCallback(() => {
    openForCreate();
  }, [openForCreate]);

  const handleEditTicket = useCallback(
    (ticket: TicketItem) => {
      openForEdit(ticket);
    },
    [openForEdit],
  );

  return (
    <div className="m-auto flex flex-col gap-10">
      <PageHeader
        title={t("tickets:header.title")}
        action={
          <Button
            className="bg-brand text-brand-foreground hover:bg-brand-strong shadow-brand cursor-pointer rounded-full px-6"
            onClick={handleCreateClick}
          >
            <Plus className="mr-2 h-4 w-4" />
            {t("tickets:header.new")}
          </Button>
        }
      />
      <div className="m-auto flex w-full max-w-3xl flex-col gap-8 xl:max-w-4xl 2xl:max-w-7xl 2xl:flex-row">
        <TicketsSummary />
      </div>

      <div className="m-auto mb-10 flex w-full max-w-3xl flex-col gap-8 xl:max-w-4xl 2xl:max-w-7xl 2xl:flex-row">
        <TicketsTable onEditTicket={handleEditTicket} />
      </div>

      <NewTicketModal />
    </div>
  );
}
