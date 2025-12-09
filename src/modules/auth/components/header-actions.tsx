"use client";

import {
  Headphones,
  ChevronDown,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Button,
} from "@/modules/auth";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AVAILABLE_LANGUAGES } from "../constants";

export function HeaderActions() {
  const { t, i18n } = useTranslation("common");

  const currentLanguage = useMemo(() => {
    return (
      AVAILABLE_LANGUAGES.find((language) => language.code === i18n.language) ||
      AVAILABLE_LANGUAGES[0]
    );
  }, [i18n.language]);

  return (
    <div className="pt absolute top-8 right-8 z-20 flex items-center gap-3 rounded-3xl rounded-tl-none rounded-br-none bg-[#050a14] p-4 pb-6">
      <Button
        variant="ghost"
        size="sm"
        className="h-10 cursor-pointer gap-2 rounded-[100px] border border-gray-800/50 bg-[#111827] p-2.5 text-gray-300 hover:bg-[#111827] hover:text-gray-300"
      >
        <Headphones className="h-4 w-4" />
        {t("actions.help")}
      </Button>

      <Select
        value={currentLanguage.code}
        onValueChange={(value) => {
          i18n.changeLanguage(value);
        }}
      >
        <SelectTrigger className="h-10 cursor-pointer gap-2 rounded-full border border-gray-800/50 bg-[#111827] px-4 text-gray-300 hover:bg-[#111827] hover:text-gray-300">
          <span className="flex h-4 w-4 items-center justify-center overflow-hidden rounded-full bg-green-600">
            <span className="flex h-full w-full items-center justify-center bg-green-600">
              <span className="flex h-2 w-2 rotate-45 items-center justify-center bg-yellow-400">
                <span className="h-1 w-1 rounded-full bg-blue-700"></span>
              </span>
            </span>
          </span>
          <span className="text-gray-300">{t(currentLanguage.shortKey)}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </SelectTrigger>
        <SelectContent className="border border-gray-800/50 bg-[#111827] text-gray-200">
          {AVAILABLE_LANGUAGES.map((language) => (
            <SelectItem
              key={language.code}
              value={language.code}
              className="cursor-pointer focus:bg-gray-800 focus:text-white"
            >
              {t(language.fullKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
