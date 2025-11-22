"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useView360Data } from "../hooks/useView360Data";
import { SkeletonAISuggestions } from "./skeleton-view-360";
import { useTranslation } from "react-i18next";

const tabs = [
  { key: "NBO" as const, label: "NBO" },
  { key: "NBA" as const, label: "NBA" },
  { key: "NBX" as const, label: "NBX" },
];

export function AISuggestions() {
  const { t } = useTranslation("view360")
  const { data: view360Data, isLoading, error } = useView360Data();
  const [activeTab, setActiveTab] = useState<"NBO" | "NBA" | "NBX">("NBO");

  const sugestionsIA = view360Data?.sugestionsIA;
  const currentSuggestion = sugestionsIA?.[activeTab];

  if (isLoading) return <SkeletonAISuggestions />;

  if (error) {
    return (
      <div className="bg-[#151a23] border border-white/5 rounded-2xl p-6">
        <div className="text-red-400">{t("aiSuggestions.error")}</div>
      </div>
    );
  }

  if (!currentSuggestion) {
    return (
      <div className="bg-[#151a23] border border-white/5 rounded-2xl p-6">
        <div className="text-gray-400">{t("aiSuggestions.empty")}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[536px] bg-linear-to-br from-[#28335098] via-[#28335098 ]/60 to-[#28335098 ]/10 border border-white/5 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-white">{t("aiSuggestions.title")}</h2>
        <div className="flex bg-[#23283b] rounded-full px-3 py-2 w-56 justify-between">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.key)}
              className={
                activeTab === tab.key
                  ? "bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12"
                  : "text-gray-400 hover:text-white bg-[#383e4e] rounded-full w-12"
              }
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-6 rounded-2xl bg-linear-to-br from-[#23283b] via-[#23283b] to-[#303545]">
        <div>
          <h3 className="text-sm text-gray-400 mb-2">{t("aiSuggestions.offerLabel")}</h3>
          <p className="text-white font-medium">{currentSuggestion.offer}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400 mb-1">{t("aiSuggestions.valueLabel")}</p>
            <p className="text-2xl font-semibold text-white">
              R$ {currentSuggestion.value.toFixed(2)}/mês
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">
              {t("aiSuggestions.conversionLabel")}
            </p>
            <p className="text-2xl font-semibold text-green-500">
              {currentSuggestion.conversionProbability}%
            </p>
          </div>
        </div>

        <hr />

        <div>
          <h4 className="text-sm font-medium text-white mb-3">{t("aiSuggestions.reasonWhy")}</h4>
          <div className="space-y-2">
            {currentSuggestion.reasonsWhy.map((reason, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-300">{reason}</p>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-48 bg-blue-500 hover:bg-blue-600 shadow-2xl shadow-blue-900/20 text-white rounded-full">
          {t("aiSuggestions.cta")}
        </Button>
      </div>
    </div>
  );
}
