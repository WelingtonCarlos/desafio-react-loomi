"use client";

import { PageHeader } from "@/modules/navigation/components/page-header";
import { ClientInfoSidebar } from "../components/client-info-sidebar";
import { AISuggestions } from "../components/ai-suggestions";
import { SmartClassification } from "../components/smart-classification";
import { SuggestionCards } from "../components/suggestions-cards";
import { useTranslation } from "react-i18next";

export function View360Page() {
  const { t } = useTranslation(["view360", "common"]);
  return (
    <div className="m-auto flex flex-col gap-8">
      <PageHeader title={t("view360:header.title")} />

      <div className="m-auto flex w-max flex-col gap-6 p-6 lg:flex-row lg:gap-8">
        <div className="w-full lg:w-[30%] 2xl:w-[26%]">
          <ClientInfoSidebar />
        </div>

        <div className="flex w-full flex-1 flex-col gap-10">
          <div className="flex flex-col gap-6 2xl:flex-row 2xl:items-start">
            <div className="w-full 2xl:flex-1">
              <AISuggestions />
            </div>

            <div className="w-full 2xl:w-[320px] 2xl:shrink-0">
              <SuggestionCards />
            </div>
          </div>

          <div className="w-full">
            <SmartClassification />
          </div>
        </div>
      </div>
    </div>
  );
}
