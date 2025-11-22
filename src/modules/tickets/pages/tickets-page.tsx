"use client";

import { PageHeader } from "@/modules/navigation/components/page-header";
import { TicketsTable } from "../components/tickets-table";
import { TicketsSummary } from "../components/tickets-summary";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { NewTicketModal } from "../components/ticket-modal";
import type { TicketItem } from "../types/tickets.types";
import { useTranslation } from "react-i18next";

export function TicketsPage() {

  const { t } = useTranslation(["tickets", "common"])
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketItem | null>(null);

  const handleCreateClick = () => {
    setEditingTicket(null);
    setIsNewTicketOpen(true);
  };

  const handleEditTicket = (ticket: TicketItem) => {
    setEditingTicket(ticket);
    setIsNewTicketOpen(true);
  };

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      setEditingTicket(null);
    }
    setIsNewTicketOpen(open);
  };

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

      <NewTicketModal
        open={isNewTicketOpen}
        onOpenChange={handleModalOpenChange}
        ticket={editingTicket}
      />
    </div>
  );
}
