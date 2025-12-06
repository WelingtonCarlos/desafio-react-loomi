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
import { ActiveClientFilters } from "../types/dashboard.types";

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

function DashboardFiltersComponent({ search, lists }: FiltersProps) {
  const { t } = useTranslation("dashboard");

  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-100">{t("filters.searchLabel")}</span>
        <Input
          placeholder={t("filters.searchPlaceholder")}
          className="w-80 border-slate-700 bg-slate-900 text-slate-100"
          value={search.value}
          onChange={(e) => search.set(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        {/* Status */}

        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-100">{t("filters.status")}</span>
          <Select value={lists.status.value} onValueChange={lists.status.set}>
            <SelectTrigger className="w-[140px] border-slate-700 bg-slate-900">
              <SelectValue placeholder={t("filters.statusPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">{t("filters.all")}</SelectItem>
              {lists.options.status.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tipo */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-100">{t("filters.secureType")}</span>
          <Select value={lists.secureType.value} onValueChange={lists.secureType.set}>
            <SelectTrigger className="w-[200px] border-slate-700 bg-slate-900">
              <SelectValue placeholder={t("filters.secureTypePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">{t("filters.all")}</SelectItem>
              {lists.options.secureType.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Local */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-100">{t("filters.location")}</span>
          <Select value={lists.locations.value} onValueChange={lists.locations.set}>
            <SelectTrigger className="w-[160px] border-slate-700 bg-slate-900">
              <SelectValue placeholder={t("filters.locationPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">{t("filters.all")}</SelectItem>
              {lists.options.locations.map((item) => (
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

export const Filters = memo(DashboardFiltersComponent);
Filters.displayName = "DashboardFilters";
