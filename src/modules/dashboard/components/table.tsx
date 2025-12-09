"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import type { ActiveClientItem } from "../types/dashboard.types";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

interface DataTableProps {
  columns: ColumnDef<ActiveClientItem, unknown>[];
  data: ActiveClientItem[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const { t } = useTranslation(["dashboard", "common"]);

  const [sorting, setSorting] = useState<SortingState>([]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="h-[504px] overflow-hidden rounded-2xl border border-slate-800 bg-[#23283b] px-6 pt-6 shadow-xl">
      <table className="w-full text-sm text-slate-200">
        <thead className="border-b border-slate-600 text-xs text-slate-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="cursor-pointer py-3 text-left select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === "asc" && " ↑"}
                  {header.column.getIsSorted() === "desc" && " ↓"}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          <AnimatePresence initial={false}>
            {table.getRowModel().rows.map((row) => (
              <motion.tr
                key={row.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-slate-600 transition-colors hover:bg-slate-900/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 pr-4 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </motion.tr>
            ))}
          </AnimatePresence>

          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="py-6 text-center text-slate-500">
                {t("dashboard:table.empty")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
