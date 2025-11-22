"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

import type { ActiveClientItem } from "../types/dashboard.types";

export const columns: ColumnDef<ActiveClientItem>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: () => <span>Nome</span>,
    cell: ({ row }) => {
      const { name, email } = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-slate-100">{name}</span>
          <span className="text-xs text-slate-400">{email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "secureType",
    header: "Tipo de Seguro",
  },
  {
    accessorKey: "monthValue",
    header: "Valor mensal",
    cell: ({ row }) => {
      const value = row.original.monthValue;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      const variant =
        status === "Ativo"
          ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
          : status === "Pendente"
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
    accessorKey: "renewalDate",
    header: "Renovação",
  },
  {
    accessorKey: "location",
    header: "Região",
  },
];
