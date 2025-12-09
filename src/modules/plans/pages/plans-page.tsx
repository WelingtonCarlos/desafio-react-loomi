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
      <div className="m-auto flex flex-col justify-center gap-8 pt-4 pb-8 xl:flex-row">
        <div className="h-[713px] w-[852px]">
          <CustomizedPlans />
        </div>

        <div className="h-[713px] w-[478px] space-y-10">
          <IncludedBenefits />
          <PlansIndicators />
        </div>
      </div>
    </div>
  );
}
