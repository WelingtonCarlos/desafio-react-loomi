"use client";

import { useDashboardFiltersStore } from "@/lib/stores/dashboard-filters-store";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDashboardData } from "../hooks/useDashboardData";
import { getColumns } from "./columns";
import { Filters } from "./filters";
import { DataTable } from "./table";



export function ActiveClientsTable() {
//   const { data, filters } = activeClients;
  const { data: dashboardResponse, isLoading } = useDashboardData();
  const { data: activeClientsData, filters: activeClientsFilters } = dashboardResponse?.activeClients || {};

  const { t } = useTranslation("dashboard");

  const search = useDashboardFiltersStore((state) => state.search);
  const status = useDashboardFiltersStore((state) => state.status);
  const secureType = useDashboardFiltersStore((state) => state.secureType);
  const location = useDashboardFiltersStore((state) => state.location);

  const setSearch = useDashboardFiltersStore((state) => state.setSearch);
  const setStatus = useDashboardFiltersStore((state) => state.setStatus);
  const setSecureType = useDashboardFiltersStore(
    (state) => state.setSecureType
  );
  const setLocation = useDashboardFiltersStore((state) => state.setLocation);

  const filtered = useMemo(() => {
    return activeClientsData?.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "Todos" || c.status === status;
      const matchesType =
        secureType === "Todos" || c.secureType === secureType;
      const matchesLocation =
        location === "Todos" || c.location === location;

      return matchesSearch && matchesStatus && matchesType && matchesLocation;
    });
  }, [activeClientsData, search, status, secureType, location]);

  return (
    <div className="w-full h-full rounded-3xl px-6 py-10 bg-linear-to-br from-[#28335098] via-[#28335098 ]/60 to-[#28335098 ]/10">
      <Filters
        search={{ value: search, set: setSearch }}
        lists={{
          status: { value: status, set: setStatus },
          secureType: { value: secureType, set: setSecureType },
          locations: { value: location, set: setLocation },
          options: activeClientsFilters || { status: [], secureType: [], locations: [] },
        }}
      />

      {isLoading ? (
        <div className="h-full w-full animate-pulse rounded-2xl bg-white/5" />
      ) : (
        <DataTable columns={getColumns(t)} data={filtered || []} />
      )}
    </div>
  );
}
