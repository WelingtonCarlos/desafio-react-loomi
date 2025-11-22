"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const plans = [
  { name: "Básico", price: 8990, recommended: false },
  { name: "Intermediário", price: 14590, recommended: false },
  { name: "Premium", price: 22590, recommended: true },
];

const additionalCoverages = [
  { id: "theft", label: "Cobertura contra roubo e furto", price: 2500 },
  { id: "collision", label: "Danos por colisão", price: 3500 },
  { id: "fire", label: "Cobertura contra incêndio", price: 2000 },
  {
    id: "natural",
    label: "Fenômenos naturais (granizo, enchente)",
    price: 3000,
  },
];

const centsToReais = (cents: number) => cents / 100;

export function CustomizedPlans() {
  const [selectedPlan, setSelectedPlan] = useState(
    plans.find((p) => p.recommended) || plans[0]
  );
  const [vehicleValue, setVehicleValue] = useState([50000]);
  const [clientAge, setClientAge] = useState([28]);
  const [coverages, setCoverages] = useState(
    additionalCoverages.reduce((acc, coverage) => {
      acc[coverage.id] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const calculateTotal = () => {
    const coveragesTotal = additionalCoverages
      .filter((coverage) => coverages[coverage.id])
      .reduce((sum, coverage) => sum + coverage.price, 0);

    return selectedPlan.price + coveragesTotal;
  };

  return (
    <div className="bg-linear-to-br from-[#28335098] via-[#28335098 ]/60 to-[#28335098 ]/10 border border-white/5 rounded-3xl p-8">
      <h2 className="text-xl font-semibold text-white mb-6">
        Planos personalizados
      </h2>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {plans.map((plan) => {
          const isSelected = selectedPlan.name === plan.name;
          const totalPrice = isSelected ? calculateTotal() : plan.price;

          return (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(plan)}
              className={`relative bg-[#1a2332] rounded-2xl p-6 transition-all cursor-pointer hover:scale-105 ${
                isSelected
                  ? "border-2 border-[#1E86FF] shadow-lg shadow-[#1E86FF]/20"
                  : "border border-white/5 hover:border-white/10"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 right-6">
                  <span className="bg-[#00D9C0] text-[#0a0f1a] text-xs font-semibold px-3 py-1 rounded-full">
                    Recomendado
                  </span>
                </div>
              )}
              <h3 className="text-white font-medium mb-4">{plan.name}</h3>
              <div className="text-3xl font-bold text-white mb-1">
                {formatCurrency(centsToReais(totalPrice))}
              </div>
              <p className="text-sm text-gray-400">Por mês</p>
            </div>
          );
        })}
      </div>

      {/* Vehicle Value Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <Label className="text-white font-medium">
            Valor do veículo: {formatCurrency(vehicleValue[0])}
          </Label>
        </div>
        <Slider
          value={vehicleValue}
          onValueChange={setVehicleValue}
          min={10000}
          max={500000}
          step={1000}
          className="[&_[data-slot=slider-track]]:bg-gray-700 [&_[data-slot=slider-range]]:bg-[#1E86FF] [&_[data-slot=slider-thumb]]:bg-[#1E86FF] [&_[data-slot=slider-thumb]]:border-[#1E86FF]"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>R$ 10.000</span>
          <span>R$ 500.000</span>
        </div>
      </div>

      {/* Client Age Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <Label className="text-white font-medium">
            Idade do Cliente: {clientAge[0]} anos
          </Label>
        </div>
        <Slider
          value={clientAge}
          onValueChange={setClientAge}
          min={18}
          max={90}
          step={1}
          className="[&_[data-slot=slider-track]]:bg-gray-700 [&_[data-slot=slider-range]]:bg-[#1E86FF] [&_[data-slot=slider-thumb]]:bg-[#1E86FF] [&_[data-slot=slider-thumb]]:border-[#1E86FF]"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>18 anos</span>
          <span>90 anos</span>
        </div>
      </div>

      {/* Additional Coverages */}
      <div>
        <h3 className="text-white font-medium mb-4">Coberturas Adicionais</h3>
        <div className="space-y-4">
          {additionalCoverages.map((coverage) => (
            <div
              key={coverage.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  id={coverage.id}
                  checked={coverages[coverage.id]}
                  onCheckedChange={(checked) =>
                    setCoverages({ ...coverages, [coverage.id]: !!checked })
                  }
                  className="data-[state=checked]:bg-[#1E86FF] data-[state=checked]:border-[#1E86FF]"
                />
                <Label
                  htmlFor={coverage.id}
                  className="text-gray-300 cursor-pointer text-sm"
                >
                  {coverage.label}
                </Label>
              </div>
              <span className="text-white font-medium text-sm">
                + {formatCurrency(centsToReais(coverage.price))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
