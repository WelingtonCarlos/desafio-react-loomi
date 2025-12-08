"use client";

import { ErrorState } from "@/components/error-state";
import { useErrorToast } from "@/hooks/use-error-toast";
import { useDashboardFiltersStore } from "@/lib/stores/dashboard-filters-store";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDashboardData } from "../hooks/useDashboardData";
import { DataTable } from "./table";
import { Filters } from "./filters";
import { getColumns } from "./columns";

export function ActiveClientsTable() {
  //   const { data, filters } = activeClients;
  const { data: dashboardResponse, isLoading, isError, refetch } = useDashboardData();
  const { data: activeClientsData, filters: activeClientsFilters } =
    dashboardResponse?.activeClients || {};

  const { t } = useTranslation("dashboard");

  const search = useDashboardFiltersStore((state) => state.search);
  const status = useDashboardFiltersStore((state) => state.status);
  const secureType = useDashboardFiltersStore((state) => state.secureType);
  const location = useDashboardFiltersStore((state) => state.location);

  const setSearch = useDashboardFiltersStore((state) => state.setSearch);
  const setStatus = useDashboardFiltersStore((state) => state.setStatus);
  const setSecureType = useDashboardFiltersStore((state) => state.setSecureType);
  const setLocation = useDashboardFiltersStore((state) => state.setLocation);

  const filtered = useMemo(() => {
    return activeClientsData?.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "Todos" || c.status === status;
      const matchesType = secureType === "Todos" || c.secureType === secureType;
      const matchesLocation = location === "Todos" || c.location === location;

      return matchesSearch && matchesStatus && matchesType && matchesLocation;
    });
  }, [activeClientsData, search, status, secureType, location]);

  useErrorToast(isError, {
    message: t("dashboard:errors.activeClientsTitle", {
      defaultValue: "Erro ao carregar clientes ativos.",
    }),
    description: t("dashboard:errors.activeClientsDescription", {
      defaultValue: "Tente novamente em instantes.",
    }),
    toastId: "active-clients-error",
  });

  if (isError) {
    return (
      <ErrorState
        title={t("dashboard:errors.activeClientsTitle", {
          defaultValue: "Erro ao carregar clientes ativos.",
        })}
        description={t("dashboard:errors.activeClientsDescription", {
          defaultValue: "Tente novamente em instantes.",
        })}
        onRetry={refetch}
        className="bg-gradient-slate border-soft h-full w-full border"
      />
    );
  }

  return (
    <div className="bg-gradient-glass border-soft h-[686px] w-full rounded-3xl border px-6 py-10">
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
        <div className="h-[686px] w-full animate-pulse rounded-2xl bg-white/5" />
      ) : (
        <DataTable columns={getColumns(t)} data={filtered || []} />
      )}
    </div>
  );
}
