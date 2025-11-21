"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,  
} from "@/components/ui/select";
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

export function Filters({ search, lists }: FiltersProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
      <Input
        placeholder="Buscar por nome ou email..."
        className="bg-slate-900 border-slate-700 text-slate-100 md:max-w-xs"
        value={search.value}
        onChange={(e) => search.set(e.target.value)}
      />

      <div className="flex gap-3">
        {/* Status */}
        <Select value={lists.status.value} onValueChange={lists.status.set}>
          <SelectTrigger className="w-[140px] bg-slate-900 border-slate-700">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {lists.options.status.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Secure Type */}
        {/* Tipo */}
        <Select value={lists.secureType.value} onValueChange={lists.secureType.set}>
          <SelectTrigger className="w-[200px] bg-slate-900 border-slate-700">
            <SelectValue placeholder="Tipo de Seguro" />
          </SelectTrigger>
          <SelectContent>
            {lists.options.secureType.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Local */}
        <Select value={lists.locations.value} onValueChange={lists.locations.set}>
          <SelectTrigger className="w-[160px] bg-slate-900 border-slate-700">
            <SelectValue placeholder="Localização" />
          </SelectTrigger>
          <SelectContent>
            {lists.options.locations.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
