"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";

import type { ActiveClientItem } from "../types/dashboard.types";

export const getColumns = (t: TFunction<"dashboard">): ColumnDef<ActiveClientItem>[] => [
  {
    id: "name",
    accessorKey: "name",
    header: () => <span>{t("columns.name")}</span>,
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
    header: t("columns.secureType"),
  },
  {
    accessorKey: "monthValue",
    header: t("columns.monthValue"),
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
    header: t("columns.status"),
    cell: ({ row }) => {
      const status = row.original.status;

      const variant =
        status === "Ativo"
          ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
          : status === "Pendente"
            ? "bg-amber-500/15 text-amber-300 border-amber-500/40"
            : "bg-slate-500/15 text-slate-300 border-slate-500/40";

      return <Badge className={`border px-3 py-1 text-xs font-medium ${variant}`}>{status}</Badge>;
    },
  },
  {
    accessorKey: "renewalDate",
    header: t("columns.renewalDate"),
  },
  {
    accessorKey: "location",
    header: t("columns.location"),
  },
];
