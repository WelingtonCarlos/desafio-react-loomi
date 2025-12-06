"use client";

import { PageHeader } from "@/modules/navigation/components/page-header";
import { CustomizedPlans } from "../components/customized-plans";
import { IncludedBenefits } from "../components/included-benefits";
import { PlansIndicators } from "../components/plans-indicators";
import { useTranslation } from "react-i18next";

export function PlansPage() {
  const { t } = useTranslation(["plans", "common"]);
  return (
    <div className="m-auto flex flex-col gap-8">
      <PageHeader title={t("plans:header.title")} />
      <div className="m-auto flex w-max flex-col justify-center gap-8 pt-4 pb-8 xl:flex-row">
        <div className="min-h-[680px] 2xl:w-3/5">
          <CustomizedPlans />
        </div>

        <div className="min-h-[680px] space-y-6">
          <IncludedBenefits />
          <PlansIndicators />
        </div>
      </div>
    </div>
  );
}
