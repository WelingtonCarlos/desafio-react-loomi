"use client";

import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

import type { TicketItem } from "../types/tickets.types";
import { useTranslation } from "react-i18next";

interface DataTableProps {
  columns: ColumnDef<TicketItem>[];
  data: TicketItem[];
  pageSizeOptions?: number[];
  defaultPageSize?: number;
}

const DEFAULT_PAGE_SIZE = 8;
const FALLBACK_PAGE_OPTIONS = [5, 8, 15];

export function DataTable({
  columns,
  data,
  pageSizeOptions = FALLBACK_PAGE_OPTIONS,
  defaultPageSize = DEFAULT_PAGE_SIZE,
}: DataTableProps) {
  const { t } = useTranslation(["tickets", "common"]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  // Garante primeira página após filtro/busca
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { firstRow, lastRow, totalRows } = useMemo(() => {
    if (data.length === 0) {
      return { firstRow: 0, lastRow: 0, totalRows: 0 };
    }

    const total = data.length;
    const start = pagination.pageIndex * pagination.pageSize + 1;
    const end = Math.min(start + pagination.pageSize - 1, total);

    return { firstRow: start, lastRow: end, totalRows: total };
  }, [data, pagination.pageIndex, pagination.pageSize]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#23283b] shadow-xl p-6">
      <table className="w-full text-sm text-slate-200">
        <thead className="text-xs text-slate-400 border-b border-slate-600">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-3 text-left cursor-pointer select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc" && " ↑"}
                  {header.column.getIsSorted() === "desc" && " ↓"}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-slate-600 hover:bg-slate-900/50 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-3 pr-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="py-6 text-center text-slate-500"
              >
                {t("tickets:table.empty")}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-6 flex flex-col gap-4 text-xs text-slate-300 md:flex-row md:items-center md:justify-between">
        <div>
          {totalRows === 0
            ? t("tickets:table.emptyState")
            : `Mostrando ${firstRow}-${lastRow} de ${totalRows} tickets`}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-slate-400">
            {t("tickets:table.rowsPerPage")}
            <select
              className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-slate-100"
              value={pagination.pageSize}
              onChange={(event) =>
                table.setPageSize(Number(event.target.value))
              }
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded-md border border-slate-700 px-3 py-1 text-slate-100 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t("tickets:table.previous")}
            </button>
            <span className="text-slate-400">
              {t("tickets:table.page", {
                page: pagination.pageIndex + 1,
                total: Math.max(1, table.getPageCount()),
              })}
              {Math.max(1, table.getPageCount())}
            </span>
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded-md border border-slate-700 px-3 py-1 text-slate-100 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t("tickets:table.next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
