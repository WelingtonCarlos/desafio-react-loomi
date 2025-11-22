"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActiveClientFilters } from "../types/dashboard.types";
import { useTranslation } from "react-i18next";

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

export function Filters({ search, lists }: FiltersProps) {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-slate-100">{t("filters.searchLabel")}</span>
        <Input
          placeholder={t("filters.searchPlaceholder")}
          className="bg-slate-900 border-slate-700 text-slate-100 w-80"
          value={search.value}
          onChange={(e) => search.set(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        {/* Status */}

        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-100">{t("filters.status")}</span>
          <Select value={lists.status.value} onValueChange={lists.status.set}>
            <SelectTrigger className="w-[140px] bg-slate-900 border-slate-700">
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
          <Select
            value={lists.secureType.value}
            onValueChange={lists.secureType.set}
          >
            <SelectTrigger className="w-[200px] bg-slate-900 border-slate-700">
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
          <Select
            value={lists.locations.value}
            onValueChange={lists.locations.set}
          >
            <SelectTrigger className="w-[160px] bg-slate-900 border-slate-700">
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
