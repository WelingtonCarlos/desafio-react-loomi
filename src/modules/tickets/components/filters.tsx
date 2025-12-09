"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { ALL_SELECT_OPTION_VALUE } from "../constants";
import type { TicketPriority, TicketStatus } from "../types/tickets.types";
import { cn } from "@/lib/utils";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";

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
      responsible: string[];
    };
  };
}

interface FilterSelectProps {
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  widthClass: string;
  allOption: {
    label: string;
    value: string;
  };
}

function FilterSelect({
  placeholder,
  value,
  onValueChange,
  options,
  widthClass,
  allOption,
}: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className={cn("rounded-3xl border-slate-700 bg-slate-900 text-slate-100", widthClass)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={allOption.value}>{allOption.label}</SelectItem>
          {options.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function FiltersComponent({ search, lists }: FiltersProps) {
  const { t } = useTranslation(["tickets", "common"]);

  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex w-full flex-col gap-2">
        <span className="text-xl font-bold text-white">{t("tickets:table.name")}</span>
        <InputGroup className="w-full">
          <InputGroupInput
            value={search.value}
            onChange={(e) => search.set(e.target.value)}
            placeholder={t("tickets:filters.searchPlaceholder")}
          />
          <InputGroupAddon>
            <Search className="text-color-muted" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex gap-3 self-end">
        <FilterSelect
          placeholder={t("tickets:filters.allStatus")}
          value={lists.status.value || ALL_SELECT_OPTION_VALUE}
          onValueChange={(value) =>
            lists.status.set(value === ALL_SELECT_OPTION_VALUE ? "" : value)
          }
          options={lists.options.status}
          widthClass="w-[160px]"
          allOption={{
            label: t("tickets:filters.allStatus"),
            value: ALL_SELECT_OPTION_VALUE,
          }}
        />

        <FilterSelect
          placeholder={t("tickets:filters.allPriorities")}
          value={lists.priority.value || ALL_SELECT_OPTION_VALUE}
          onValueChange={(value) =>
            lists.priority.set(value === ALL_SELECT_OPTION_VALUE ? "" : value)
          }
          options={lists.options.priorities}
          widthClass="w-[160px]"
          allOption={{
            label: t("tickets:filters.allPriorities"),
            value: ALL_SELECT_OPTION_VALUE,
          }}
        />

        <FilterSelect
          placeholder={t("tickets:filters.allResponsible")}
          value={lists.responsible.value || ALL_SELECT_OPTION_VALUE}
          onValueChange={(value) =>
            lists.responsible.set(value === ALL_SELECT_OPTION_VALUE ? "" : value)
          }
          options={lists.options.responsible}
          widthClass="w-[180px]"
          allOption={{
            label: t("tickets:filters.allResponsible"),
            value: ALL_SELECT_OPTION_VALUE,
          }}
        />
      </div>
    </div>
  );
}

export const Filters = memo(FiltersComponent);
Filters.displayName = "TicketsFilters";
