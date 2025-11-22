"use client"

import { Headphones, ChevronDown } from "lucide-react"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

const AVAILABLE_LANGUAGES = [
  {
    code: "pt-BR",
    shortKey: "language.short.pt",
    fullKey: "language.full.pt",
  },
  {
    code: "en",
    shortKey: "language.short.en",
    fullKey: "language.full.en",
  },
] as const

export function HeaderActions() {
  const { t, i18n } = useTranslation("common")

  const currentLanguage = useMemo(() => {
    return (
      AVAILABLE_LANGUAGES.find(
        (language) => language.code === i18n.language,
      ) || AVAILABLE_LANGUAGES[0]
    )
  }, [i18n.language])

  return (
    <div className="absolute top-8 right-8 z-20 flex items-center gap-3 bg-[#050a14] rounded-3xl p-4 pb-6 rounded-br-none rounded-tl-none pt">
      <Button
        variant="ghost"
        size="sm"
        className="rounded-full px-4 h-10 gap-2 bg-[#111827] hover:bg-[#111827] cursor-pointer hover:text-gray-300 border border-gray-800/50 text-gray-300"
      >
        <Headphones className="h-4 w-4" />
        {t("actions.help")}
      </Button>

      <Select
        value={currentLanguage.code}
        onValueChange={(value) => {
          i18n.changeLanguage(value)
        }}
      >
        <SelectTrigger className="rounded-full px-4 h-10 gap-2 bg-[#111827] hover:bg-[#111827] cursor-pointer hover:text-gray-300 border border-gray-800/50 text-gray-300">
          <span className="flex h-4 w-4 items-center justify-center overflow-hidden rounded-full bg-green-600">
            <span className="h-full w-full bg-green-600 flex items-center justify-center">
              <span className="h-2 w-2 rotate-45 bg-yellow-400 flex items-center justify-center">
                <span className="h-1 w-1 rounded-full bg-blue-700"></span>
              </span>
            </span>
          </span>
          <span className="text-gray-300">{t(currentLanguage.shortKey)}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </SelectTrigger>
        <SelectContent className="bg-[#111827] text-gray-200 border border-gray-800/50">
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
  )
}
