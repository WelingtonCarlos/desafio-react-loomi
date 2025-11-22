"use client";

import { Button } from "@/components/ui/button";
import { useView360Data } from "../hooks/useView360Data";

export function SuggestionCards() {
  const { data: view360Data, isLoading: isLoadingView360Data } =
    useView360Data();

  const secureLifeValue = view360Data?.sugestionsIA.NBO.value;
  const secureLifeOffer = view360Data?.sugestionsIA.NBO.offer;

  if (isLoadingView360Data) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-4 flex flex-row 2xl:flex-col gap-4">
      {/* CARD 1 — Seguro de vida individual (bg azul, botão branco) */}
      <div className="h-64 w-[312px]  rounded-2xl p-6 text-white bg-linear-to-br from-[#52B3FF] via-[#3B8CFF] to-[#2A6DFF] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.35)] flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Seguro de vida individual
          </h3>

          <p className="text-sm text-white/90 mb-4">
            {secureLifeOffer ??
              "Proteção financeira completa com cobertura por morte e doenças graves"}
          </p>

          <p className="text-xs text-white/80 mb-1 mt-10">Por apenas:</p>

          <div className="flex items-center justify-between">
            <p className="text-[20px] font-semibold">
              R$ {secureLifeValue?.toFixed(2).replace(".", ",")}/mês
            </p>

            <Button className="h-10 px-6 rounded-full bg-white text-[#0050C8] font-medium shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:bg-white/90">
              Simular
            </Button>
          </div>
        </div>
      </div>

      {/* CARD 2 — Upgrade residencial (bg escuro, botão com borda branca) */}
      <div className="h-64 w-[312px]  bg-linear-to-br from-[#28335098] via-[#28335098]/60 to-[#28335098]/10 border border-white/5 rounded-2xl p-6 text-white flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Upgrade do seguro residencial
          </h3>

          <p className="text-sm text-gray-300 mb-4">
            Plano Completo com proteção contra danos elétricos e assistência 24h
          </p>

          <p className="text-xs text-gray-400 mb-1 mt-10">Por apenas:</p>

          <div className="flex items-center justify-between">
            <p className="text-[20px] font-semibold">R$ 127,50/mês</p>

            <Button className="h-10 px-6 rounded-full border border-white/40 bg-transparent text-white font-medium hover:bg-white/10">
              Simular
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
