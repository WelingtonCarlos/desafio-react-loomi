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
import { ActiveClientFilters } from "../types/dashboard.types";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SelectState {
  value: string;
  set: (value: string) => void;
}

interface FiltersProps {
  search: SelectState;
  lists: {
    status: SelectState;
    secureType: SelectState;
    locations: SelectState;
    options: ActiveClientFilters;
  };
}

interface FilterSelectProps {
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  widthClass: string;
  allLabel: string;
}

function FilterSelect({
  placeholder,
  value,
  onValueChange,
  options,
  widthClass,
  allLabel,
}: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={cn("rounded-3xl border-slate-700", widthClass)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={allLabel}>{allLabel}</SelectItem>
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

function DashboardFiltersComponent({ search, lists }: FiltersProps) {
  const { t } = useTranslation("dashboard");
  const normalize = (value: string) => value.trim().toLowerCase();
  const allLabel = t("filters.all");
  const normalizedAll = normalize(allLabel);

  const statusOptions = lists.options.status.filter((item) => normalize(item) !== normalizedAll);
  const secureTypeOptions = lists.options.secureType.filter(
    (item) => normalize(item) !== normalizedAll,
  );
  const locationOptions = lists.options.locations.filter(
    (item) => normalize(item) !== normalizedAll,
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex w-full flex-col gap-4">
        <span className="text-xl font-bold text-white">{t("filters.title")}</span>
        <InputGroup className="w-full">
          <InputGroupInput
            value={search.value}
            onChange={(e) => search.set(e.target.value)}
            placeholder={t("filters.searchPlaceholder")}
          />
          <InputGroupAddon>
            <Search className="text-color-muted" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex gap-3 self-end">
        <FilterSelect
          placeholder={t("filters.statusPlaceholder")}
          value={lists.status.value}
          onValueChange={lists.status.set}
          options={statusOptions}
          widthClass="w-[140px]"
          allLabel={allLabel}
        />

        <FilterSelect
          placeholder={t("filters.secureTypePlaceholder")}
          value={lists.secureType.value}
          onValueChange={lists.secureType.set}
          options={secureTypeOptions}
          widthClass="w-[200px]"
          allLabel={allLabel}
        />

        <FilterSelect
          placeholder={t("filters.locationPlaceholder")}
          value={lists.locations.value}
          onValueChange={lists.locations.set}
          options={locationOptions}
          widthClass="w-[160px]"
          allLabel={allLabel}
        />
      </div>
    </motion.div>
  );
}

export const Filters = memo(DashboardFiltersComponent);
Filters.displayName = "DashboardFilters";
