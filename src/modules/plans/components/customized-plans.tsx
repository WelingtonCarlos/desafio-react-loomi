"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

const plans = [
  { id: "basic", price: 8990, recommended: false },
  { id: "intermediate", price: 14590, recommended: true },
  { id: "premium", price: 22590, recommended: false },
] as const;

const additionalCoverages = [
  { id: "theft", price: 2500 },
  { id: "collision", price: 3500 },
  { id: "fire", price: 2000 },
  {
    id: "natural",
    price: 3000,
  },
] as const;

const centsToReais = (cents: number) => cents / 100;

const sliderCustomClasses =
  "**:data-[slot=slider-track]:bg-gray-700 **:data-[slot=slider-range]:bg-[#1E86FF] **:data-[slot=slider-thumb]:bg-[#1E86FF] **:data-[slot=slider-thumb]:border-[#1E86FF]";

export function CustomizedPlans() {
  const { t } = useTranslation(["plans", "common"])

  const initialPlan = (plans.find((p) => p.recommended) || plans[0]) as (typeof plans)[number]

  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[number]>(
    initialPlan
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
        {t("plans:customizer.title")}
      </h2>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {plans.map((plan) => {
          const isSelected = selectedPlan.id === plan.id;
          const totalPrice = isSelected ? calculateTotal() : plan.price;

          return (
            <div
              key={plan.id}
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
                    {t("plans:customizer.recommended")}
                  </span>
                </div>
              )}
              <h3 className="text-white font-medium mb-4">
                {t(`plans:customizer.plans.${plan.id}`)}
              </h3>
              <div className="text-3xl font-bold text-white mb-1">
                {formatCurrency(centsToReais(totalPrice))}
              </div>
              <p className="text-sm text-gray-400">
                {t("common:labels.perMonth")}
              </p>
            </div>
          );
        })}
      </div>

      {/* Vehicle Value Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <Label className="text-white font-medium">
            {t("plans:customizer.vehicleValue")}: {formatCurrency(vehicleValue[0])}
          </Label>
        </div>
        <Slider
          value={vehicleValue}
          onValueChange={setVehicleValue}
          min={10000}
          max={500000}
          step={1000}
          className={sliderCustomClasses}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{t("plans:customizer.ranges.vehicleMin")}</span>
          <span>{t("plans:customizer.ranges.vehicleMax")}</span>
        </div>
      </div>

      {/* Client Age Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <Label className="text-white font-medium">
            {t("plans:customizer.age")}: {clientAge[0]} {t("plans:customizer.ageSuffix")}
          </Label>
        </div>
        <Slider
          value={clientAge}
          onValueChange={setClientAge}
          min={18}
          max={90}
          step={1}
          className={sliderCustomClasses}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{t("plans:customizer.ranges.ageMin")}</span>
          <span>{t("plans:customizer.ranges.ageMax")}</span>
        </div>
      </div>

      {/* Additional Coverages */}
      <div>
        <h3 className="text-white font-medium mb-4">
          {t("plans:customizer.coveragesTitle")}
        </h3>
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
                  {t(`plans:customizer.coverages.${coverage.id}`)}
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
