"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import type { TicketPriority, TicketStatus } from "../types/tickets.types";

export const ALL_SELECT_OPTION_VALUE = "all" as const;

interface SelectState {
  value: string;
  set: (value: string) => void;
}

interface FiltersProps {
  search: SelectState;
  lists: {
    status: SelectState;
    priority: SelectState;
    responsible: SelectState;
    options: {
      status: TicketStatus[];
      priorities: TicketPriority[];
      responsible: string[]; // nomes dos responsáveis
    };
  };
}

function FiltersComponent({ search, lists }: FiltersProps) {
  const { t } = useTranslation(["tickets", "common"]);

  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {/* Busca */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-100">
          {t("tickets:filters.searchLabel")}
        </span>
        <Input
          placeholder={t("tickets:filters.searchPlaceholder")}
          className="w-80 border-slate-700 bg-slate-900 text-slate-100"
          value={search.value}
          onChange={(e) => search.set(e.target.value)}
        />
      </div>

      {/* Filtros à direita */}
      <div className="flex flex-wrap gap-3">
        {/* Status */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-100">{t("tickets:filters.status")}</span>
          <Select
            value={lists.status.value || ALL_SELECT_OPTION_VALUE}
            onValueChange={lists.status.set}
          >
            <SelectTrigger className="w-[160px] border-slate-700 bg-slate-900 text-slate-100">
              <SelectValue placeholder={t("tickets:filters.allStatus")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_SELECT_OPTION_VALUE}>
                {t("tickets:filters.allStatus")}
              </SelectItem>
              {lists.options.status.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Prioridade */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-100">{t("tickets:filters.priority")}</span>
          <Select
            value={lists.priority.value || ALL_SELECT_OPTION_VALUE}
            onValueChange={lists.priority.set}
          >
            <SelectTrigger className="w-[160px] border-slate-700 bg-slate-900 text-slate-100">
              <SelectValue placeholder={t("tickets:filters.allPriorities")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_SELECT_OPTION_VALUE}>
                {t("tickets:filters.allPriorities")}
              </SelectItem>
              {lists.options.priorities.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Responsável */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-100">{t("tickets:filters.responsible")}</span>
          <Select
            value={lists.responsible.value || ALL_SELECT_OPTION_VALUE}
            onValueChange={lists.responsible.set}
          >
            <SelectTrigger className="w-[180px] border-slate-700 bg-slate-900 text-slate-100">
              <SelectValue placeholder={t("tickets:filters.allResponsible")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_SELECT_OPTION_VALUE}>
                {t("tickets:filters.allResponsible")}
              </SelectItem>
              {lists.options.responsible.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export const Filters = memo(FiltersComponent);
Filters.displayName = "TicketsFilters";
