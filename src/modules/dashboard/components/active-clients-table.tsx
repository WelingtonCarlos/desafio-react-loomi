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
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="bg-gradient-glass border-soft h-[686px] w-full rounded-3xl border px-6 py-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Filters
          search={{ value: search, set: setSearch }}
          lists={{
            status: { value: status, set: setStatus },
            secureType: { value: secureType, set: setSecureType },
            locations: { value: location, set: setLocation },
            options: activeClientsFilters || { status: [], secureType: [], locations: [] },
          }}
        />
      </motion.div>

      <div className="mt-4">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="active-clients-skeleton"
              className="h-[520px] w-full rounded-2xl bg-white/5"
              initial={{ opacity: 0.4, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              key="active-clients-table"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <DataTable columns={getColumns(t)} data={filtered || []} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
