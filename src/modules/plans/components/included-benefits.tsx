"use client";

import { usePlansData } from "../hooks/usePlansData";

export function IncludedBenefits() {
  const { data: plansData } = usePlansData();
  return (
    <div className="bg-linear-to-br from-[#28335098] via-[#28335098 ]/60 to-[#28335098 ]/10 border border-white/5 rounded-3xl p-8">
      <h2 className="text-xl font-semibold text-white mb-6">
        Benefícios Inclusos
      </h2>

      <div className="flex flex-wrap gap-3">
        {plansData?.includedBenefits.map((benefit, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-[#1a2332] border border-white/10 rounded-full px-4 py-2"
          >
            <div className="w-2 h-2 rounded-full bg-[#1E86FF]" />
            <span className="text-gray-200 text-sm">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
