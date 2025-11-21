"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";

import type { TicketItem } from "../types/tickets.types";

export const columns: ColumnDef<TicketItem>[] = [
  {
    accessorKey: "id",
    header: () => <span>ID</span>,
    cell: ({ row }) => {
      const { id } = row.original;
      return <span className="font-medium text-slate-100">{id}</span>;
    },
  },

  {
    accessorKey: "priority",
    header: "Prioridade",
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
    header: "Cliente",
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
    header: "Assunto",
    cell: ({ row }) => {
      const subject = row.original.subject;
      return <span className="text-slate-300">{subject}</span>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
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
    header: "Criado em",
    cell: ({ row }) => (
      <span className="text-slate-300">{row.original.createdAt}</span>
    ),
  },

  {
    accessorKey: "responsible",
    header: "Responsável",
    cell: ({ row }) => (
      <span className="text-slate-300 font-medium">
        {row.original.responsible}
      </span>
    ),
  },

  {
    id: "actions",
    header: "Ações",
    cell: () => {
      return (
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-sky-400 hover:text-sky-300 text-xs">
            <Pencil size={14} />
            Editar
          </button>

          <button className="flex items-center gap-1 text-slate-400 hover:text-slate-300 text-xs">
            <Eye size={14} />
            Ver
          </button>
        </div>
      );
    },
  },
];
