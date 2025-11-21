"use client";

import { useMemo, useState } from "react";
import { Filters } from "./filters";
import { DataTable } from "./table";
import { columns } from "./columns";
import type { ActiveClients } from "../types/dashboard.types";
import { useDashboardData } from "../hooks/useDashboardData";



export function ActiveClientsTable() {
//   const { data, filters } = activeClients;
  const { data: dashboardResponse, isLoading } = useDashboardData();
  const { data: activeClientsData, filters: activeClientsFilters } = dashboardResponse?.activeClients || {};


  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Todos");
  const [secureType, setSecureType] = useState("Todos");
  const [location, setLocation] = useState("Todos");

  const filtered = useMemo(() => {
    return activeClientsData?.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());

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
        <DataTable columns={columns} data={filtered || []} />
      )}
    </div>
  );
}
