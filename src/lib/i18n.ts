"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ptBRCommon from "../../public/locales/pt-BR/common.json" assert { type: "json" };
import ptBRAuth from "../../public/locales/pt-BR/auth.json" assert { type: "json" };
import ptBRNavigation from "../../public/locales/pt-BR/navigation.json" assert { type: "json" };
import ptBRDashboard from "../../public/locales/pt-BR/dashboard.json" assert { type: "json" };
import ptBRTickets from "../../public/locales/pt-BR/tickets.json" assert { type: "json" };
import ptBRPlans from "../../public/locales/pt-BR/plans.json" assert { type: "json" };
import ptBRView360 from "../../public/locales/pt-BR/view360.json" assert { type: "json" };
import ptBRChats from "../../public/locales/pt-BR/chats.json" assert { type: "json" };
import ptBRLanding from "../../public/locales/pt-BR/landing.json" assert { type: "json" };

import enCommon from "../../public/locales/en/common.json" assert { type: "json" };
import enAuth from "../../public/locales/en/auth.json" assert { type: "json" };
import enNavigation from "../../public/locales/en/navigation.json" assert { type: "json" };
import enDashboard from "../../public/locales/en/dashboard.json" assert { type: "json" };
import enTickets from "../../public/locales/en/tickets.json" assert { type: "json" };
import enPlans from "../../public/locales/en/plans.json" assert { type: "json" };
import enView360 from "../../public/locales/en/view360.json" assert { type: "json" };
import enChats from "../../public/locales/en/chats.json" assert { type: "json" };
import enLanding from "../../public/locales/en/landing.json" assert { type: "json" };

export const defaultNS = "common";

export const resources = {
  "pt-BR": {
    common: ptBRCommon,
    auth: ptBRAuth,
    navigation: ptBRNavigation,
    dashboard: ptBRDashboard,
    tickets: ptBRTickets,
    plans: ptBRPlans,
    view360: ptBRView360,
    chats: ptBRChats,
    landing: ptBRLanding,
  },
  en: {
    common: enCommon,
    auth: enAuth,
    navigation: enNavigation,
    dashboard: enDashboard,
    tickets: enTickets,
    plans: enPlans,
    view360: enView360,
    chats: enChats,
    landing: enLanding,
  },
} as const;

export type AvailableNamespaces = keyof (typeof resources)["pt-BR"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pt-BR",
    supportedLngs: ["pt-BR", "en"],
    defaultNS,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "cookie", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },
    react: {
      useSuspense: false,
    },
  });

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)["pt-BR"];
  }
}

export default i18n;

