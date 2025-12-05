"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { usePlanCustomizerStore } from "@/lib/stores/plan-customizer-store";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ADDITIONAL_COVERAGES,
  PLANS_CONFIG,
} from "../constants/customizer";

const centsToReais = (cents: number) => cents / 100;

const sliderCustomClasses =
  "**:data-[slot=slider-track]:bg-gray-700 **:data-[slot=slider-range]:bg-[var(--brand)] **:data-[slot=slider-thumb]:bg-[var(--brand)] **:data-[slot=slider-thumb]:border-[var(--brand)]";

export function CustomizedPlans() {
  const { t } = useTranslation(["plans", "common"]);

  const selectedPlanId = usePlanCustomizerStore((state) => state.selectedPlanId);
  const vehicleValue = usePlanCustomizerStore((state) => state.vehicleValue);
  const clientAge = usePlanCustomizerStore((state) => state.clientAge);
  const coverages = usePlanCustomizerStore((state) => state.coverages);

  const setSelectedPlanId = usePlanCustomizerStore(
    (state) => state.setSelectedPlanId
  );
  const setVehicleValue = usePlanCustomizerStore(
    (state) => state.setVehicleValue
  );
  const setClientAge = usePlanCustomizerStore((state) => state.setClientAge);
  const setCoverage = usePlanCustomizerStore((state) => state.setCoverage);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }),
    []
  );

  const selectedPlan = useMemo(
    () => PLANS_CONFIG.find((plan) => plan.id === selectedPlanId) ?? PLANS_CONFIG[0],
    [selectedPlanId]
  );

  const coveragesTotal = useMemo(
    () =>
      ADDITIONAL_COVERAGES.filter((coverage) => coverages[coverage.id])
        .reduce((sum, coverage) => sum + coverage.price, 0),
    [coverages]
  );

  const selectedPlanTotal = useMemo(
    () => selectedPlan.price + coveragesTotal,
    [selectedPlan.price, coveragesTotal]
  );

  const handleSelectPlan = useCallback(
    (planId: string) => setSelectedPlanId(planId),
    [setSelectedPlanId]
  );

  const handleVehicleChange = useCallback(
    (value: number[]) => setVehicleValue(value[0]),
    [setVehicleValue]
  );

  const handleClientAgeChange = useCallback(
    (value: number[]) => setClientAge(value[0]),
    [setClientAge]
  );

  const handleCoverageToggle = useCallback(
    (coverageId: string, checked: boolean) => setCoverage(coverageId, checked),
    [setCoverage]
  );

  return (
    <div className="bg-gradient-glass border border-soft rounded-3xl p-8">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        {t("plans:customizer.title")}
      </h2>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {PLANS_CONFIG.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const totalPrice = isSelected ? selectedPlanTotal : plan.price;

          return (
            <div
              key={plan.id}
              onClick={() => handleSelectPlan(plan.id)}
              className={`relative bg-surface-contrast rounded-2xl p-6 transition-all cursor-pointer hover:scale-105 ${
                isSelected
                  ? "border-2 border-brand shadow-brand"
                  : "border border-soft hover:border-strong"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 right-6">
                  <span className="bg-success text-success-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {t("plans:customizer.recommended")}
                  </span>
                </div>
              )}
              <h3 className="text-foreground font-medium mb-4">
                {t(`plans:customizer.plans.${plan.id}`)}
              </h3>
              <div className="text-3xl font-bold text-foreground mb-1">
                {formatter.format(centsToReais(totalPrice))}
              </div>
              <p className="text-sm text-muted-soft">
                {t("common:labels.perMonth")}
              </p>
            </div>
          );
        })}
      </div>

      {/* Vehicle Value Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <Label className="text-foreground font-medium">
            {t("plans:customizer.vehicleValue")}:{" "}
            {formatter.format(vehicleValue)}
          </Label>
        </div>
        <Slider
          value={[vehicleValue]}
          onValueChange={handleVehicleChange}
          min={10000}
          max={500000}
          step={1000}
          className={sliderCustomClasses}
        />
        <div className="flex justify-between text-xs text-muted-soft mt-2">
          <span>{t("plans:customizer.ranges.vehicleMin")}</span>
          <span>{t("plans:customizer.ranges.vehicleMax")}</span>
        </div>
      </div>

      {/* Client Age Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <Label className="text-foreground font-medium">
            {t("plans:customizer.age")}: {clientAge}{" "}
            {t("plans:customizer.ageSuffix")}
          </Label>
        </div>
        <Slider
          value={[clientAge]}
          onValueChange={handleClientAgeChange}
          min={18}
          max={90}
          step={1}
          className={sliderCustomClasses}
        />
        <div className="flex justify-between text-xs text-muted-soft mt-2">
          <span>{t("plans:customizer.ranges.ageMin")}</span>
          <span>{t("plans:customizer.ranges.ageMax")}</span>
        </div>
      </div>

      {/* Additional Coverages */}
      <div>
        <h3 className="text-foreground font-medium mb-4">
          {t("plans:customizer.coveragesTitle")}
        </h3>
        <div className="space-y-4">
          {ADDITIONAL_COVERAGES.map((coverage) => (
            <div
              key={coverage.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  id={coverage.id}
                  checked={coverages[coverage.id]}
                  onCheckedChange={(checked) =>
                    handleCoverageToggle(coverage.id, !!checked)
                  }
                  className="data-[state=checked]:bg-[var(--brand)] data-[state=checked]:border-[var(--brand)]"
                />
                <Label
                  htmlFor={coverage.id}
                  className="text-muted-soft cursor-pointer text-sm"
                >
                  {t(`plans:customizer.coverages.${coverage.id}`)}
                </Label>
              </div>
              <span className="text-foreground font-medium text-sm">
                + {formatter.format(centsToReais(coverage.price))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
