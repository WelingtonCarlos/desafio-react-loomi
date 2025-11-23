"use client";

import { PageHeader } from "@/modules/navigation/components/page-header";
import { CustomizedPlans } from "../components/customized-plans";
import { IncludedBenefits } from "../components/included-benefits";
import { PlansIndicators } from "../components/plans-indicators";
import { useTranslation } from "react-i18next";

export function PlansPage() {
  const { t } = useTranslation(["plans", "common"])
  return (
    <div className="flex flex-col gap-8 m-auto">
      <PageHeader title={t("plans:header.title")} />
      <div className="flex flex-col xl:flex-row justify-center gap-8 pb-8 pt-4 w-max m-auto">
        <div className="min-h-[680px] 2xl:w-3/5">
          <CustomizedPlans />
        </div>

        <div className="space-y-6 min-h-[680px]">
          <IncludedBenefits />
          <PlansIndicators />
        </div>
      </div>
    </div>
  );
}
