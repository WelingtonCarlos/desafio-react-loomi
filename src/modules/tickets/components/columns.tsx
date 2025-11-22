"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";

import type { TicketItem } from "../types/tickets.types";
import type { TFunction } from "i18next";

type EditHandler = (ticket: TicketItem) => void;

export function createTicketColumns(
  onEdit: EditHandler,
  t: TFunction<"tickets">
): ColumnDef<TicketItem>[] {
  return [
    {
      accessorKey: "id",
      header: () => <span>{t("columns.id")}</span>,
      cell: ({ row }) => {
        const { id } = row.original;
        return <span className="font-medium text-slate-100">{id}</span>;
      },
    },

    {
      accessorKey: "priority",
      header: () => <span>{t("columns.priority")}</span>,
      cell: ({ row }) => {
        const p = row.original.priority;

        const variant =
          p === "Urgente"
            ? "bg-red-500/15 text-red-300 border-red-500/40"
            : p === "Média"
            ? "bg-sky-500/15 text-sky-300 border-sky-500/40"
            : "bg-slate-500/15 text-slate-300 border-slate-500/40";

        return (
          <Badge className={`border px-3 py-1 text-xs font-medium ${variant}`}>
            {p}
          </Badge>
        );
      },
    },

    {
      accessorKey: "client",
      header: () => <span>{t("columns.client")}</span>,
      cell: ({ row }) => {
        const { client, email } = row.original;

        return (
          <div className="flex flex-col">
            <span className="font-medium text-slate-100">{client}</span>
            <span className="text-xs text-slate-400">{email}</span>
          </div>
        );
      },
    },

    {
      accessorKey: "subject",
      header: () => <span>{t("columns.subject")}</span>,
      cell: ({ row }) => {
        const subject = row.original.subject;
        return <span className="text-slate-300">{subject}</span>;
      },
    },

    {
      accessorKey: "status",
      header: () => <span>{t("columns.status")}</span>,
      cell: ({ row }) => {
        const status = row.original.status;

        const variant =
          status === "Aberto"
            ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
            : status === "Em andamento"
            ? "bg-amber-500/15 text-amber-300 border-amber-500/40"
            : "bg-slate-500/15 text-slate-300 border-slate-500/40";

        return (
          <Badge className={`border px-3 py-1 text-xs font-medium ${variant}`}>
            {status}
          </Badge>
        );
      },
    },

    {
      accessorKey: "createdAt",
      header: () => <span>{t("columns.createdAt")}</span>,
      cell: ({ row }) => (
        <span className="text-slate-300">{row.original.createdAt}</span>
      ),
    },

    {
      accessorKey: "responsible",
      header: () => <span>{t("columns.responsible")}</span>,
      cell: ({ row }) => (
        <span className="text-slate-300 font-medium">
          {row.original.responsible}
        </span>
      ),
    },

    {
      id: "actions",
      header: () => <span>{t("columns.actions")}</span>,
      cell: ({ row }) => {
        const ticket = row.original;
        return (
          <div className="flex items-center gap-4">
            <button
              className="flex items-center cursor-pointer gap-1 text-sky-400 hover:text-sky-300 text-xs"
              onClick={() => onEdit(ticket)}
            >
              <Pencil size={14} />
              {t("columns.edit")}
            </button>

            <button className="flex items-center cursor-pointer gap-1 text-slate-400 hover:text-slate-300 text-xs">
              <Eye size={14} />
              {t("columns.view")}
            </button>
          </div>
        );
      },
    },
  ];
}
