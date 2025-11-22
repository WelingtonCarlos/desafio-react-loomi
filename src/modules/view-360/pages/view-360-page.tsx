import { PageHeader } from "@/modules/navigation/components/page-header";
import { ClientInfoSidebar } from "../components/client-info-sidebar";
import { AISuggestions } from "../components/ai-suggestions";
import { SmartClassification } from "../components/smart-classification";
import { SuggestionCards } from "../components/suggestions-cards";

export function View360Page() {
  return (
    <div className="flex flex-col gap-8 m-auto">
      <PageHeader title="Visão 360º" />

      <div className="flex flex-col lg:flex-row space-x-8 p-6 w-full">
        <div className="w-[25%] xl:w-[25%] 2xl:w-[16.666%]">
          <ClientInfoSidebar />
        </div>

        <div className="space-y-6 max-w-[640px]">
          <AISuggestions />
          <SmartClassification />
          <SuggestionCards />
        </div>
      </div>
    </div>
  );
}
