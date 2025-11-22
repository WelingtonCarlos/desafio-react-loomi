"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

export function Filters({ search, lists }: FiltersProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {/* Busca */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-100">
          Buscar por ID, cliente ou assunto
        </span>
        <Input
          placeholder="Buscar por ID, cliente ou assunto..."
          className="w-80 border-slate-700 bg-slate-900 text-slate-100"
          value={search.value}
          onChange={(e) => search.set(e.target.value)}
        />
      </div>

      {/* Filtros à direita */}
      <div className="flex flex-wrap gap-3">
        {/* Status */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-100">Status</span>
          <Select
            value={lists.status.value || ALL_SELECT_OPTION_VALUE}
            onValueChange={lists.status.set}
          >
            <SelectTrigger className="w-[160px] border-slate-700 bg-slate-900 text-slate-100">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_SELECT_OPTION_VALUE}>
                Todos os status
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
          <span className="text-sm text-slate-100">Prioridade</span>
          <Select
            value={lists.priority.value || ALL_SELECT_OPTION_VALUE}
            onValueChange={lists.priority.set}
          >
            <SelectTrigger className="w-[160px] border-slate-700 bg-slate-900 text-slate-100">
              <SelectValue placeholder="Todas as prioridades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_SELECT_OPTION_VALUE}>
                Todas as prioridades
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
          <span className="text-sm text-slate-100">Responsável</span>
          <Select
            value={lists.responsible.value || ALL_SELECT_OPTION_VALUE}
            onValueChange={lists.responsible.set}
          >
            <SelectTrigger className="w-[180px] border-slate-700 bg-slate-900 text-slate-100">
              <SelectValue placeholder="Todos os responsáveis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_SELECT_OPTION_VALUE}>
                Todos os responsáveis
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
