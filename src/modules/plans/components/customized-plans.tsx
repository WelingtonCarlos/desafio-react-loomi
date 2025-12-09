"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { usePlanCustomizerStore } from "@/lib/stores/plan-customizer-store";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ADDITIONAL_COVERAGES, PLANS_CONFIG } from "../constants/customizer";
// import { sliderCustomClasses } from "../constants/ui";
import { Badge } from "@/components";

const centsToReais = (cents: number) => cents / 100;

export function CustomizedPlans() {
  const { t } = useTranslation(["plans", "common"]);

  const selectedPlanId = usePlanCustomizerStore((state) => state.selectedPlanId);
  const vehicleValue = usePlanCustomizerStore((state) => state.vehicleValue);
  const clientAge = usePlanCustomizerStore((state) => state.clientAge);
  const coverages = usePlanCustomizerStore((state) => state.coverages);

  const setSelectedPlanId = usePlanCustomizerStore((state) => state.setSelectedPlanId);
  const setVehicleValue = usePlanCustomizerStore((state) => state.setVehicleValue);
  const setClientAge = usePlanCustomizerStore((state) => state.setClientAge);
  const setCoverage = usePlanCustomizerStore((state) => state.setCoverage);

  const formatter = useMemo(
    () => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }),
    [],
  );

  const selectedPlan = useMemo(
    () => PLANS_CONFIG.find((plan) => plan.id === selectedPlanId) ?? PLANS_CONFIG[0],
    [selectedPlanId],
  );

  const coveragesTotal = useMemo(
    () =>
      ADDITIONAL_COVERAGES.filter((coverage) => coverages[coverage.id]).reduce(
        (sum, coverage) => sum + coverage.price,
        0,
      ),
    [coverages],
  );

  const selectedPlanTotal = useMemo(
    () => selectedPlan.price + coveragesTotal,
    [selectedPlan.price, coveragesTotal],
  );

  const handleSelectPlan = useCallback(
    (planId: string) => setSelectedPlanId(planId),
    [setSelectedPlanId],
  );

  const handleVehicleChange = useCallback(
    (value: number[]) => setVehicleValue(value[0]),
    [setVehicleValue],
  );

  const handleClientAgeChange = useCallback(
    (value: number[]) => setClientAge(value[0]),
    [setClientAge],
  );

  const handleCoverageToggle = useCallback(
    (coverageId: string, checked: boolean) => setCoverage(coverageId, checked),
    [setCoverage],
  );

  return (
    <div className="bg-surface-card border-soft rounded-3xl border p-8">
      <h2 className="text-foreground mb-6 text-xl leading-4 font-bold">
        {t("plans:customizer.title")}
      </h2>

      <div className="mb-10 flex w-full space-x-6">
        {PLANS_CONFIG.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const totalPrice = isSelected ? selectedPlanTotal : plan.price;

          return (
            <div
              key={plan.id}
              onClick={() => handleSelectPlan(plan.id)}
              className="bg-surface-contrast-strong border-soft hover:border-strong h-[174px] w-[252px] cursor-pointer rounded-2xl border p-6 transition-all hover:scale-105"
            >
              <div className="flex flex-col space-y-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-foreground text-sm leading-4 font-bold">
                    {t(`plans:customizer.plans.${plan.id}`)}
                  </h3>
                  {plan.recommended && (
                    <Badge variant="highlightSoft" className="w-24">
                      {t("plans:customizer.recommended")}
                    </Badge>
                  )}
                </div>

                <div className="text-foreground text-2xl leading-8 font-bold">
                  {formatter.format(centsToReais(totalPrice))}
                </div>

                <p className="text-muted-soft text-sm leading-4 font-normal">
                  {t("common:labels.perMonth")}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-10">
        <div className="mb-3 flex items-center justify-between">
          <Label className="text-foreground text-base leading-4 font-semibold">
            {t("plans:customizer.vehicleValue")}: {formatter.format(vehicleValue)}
          </Label>
        </div>
        <Slider
          value={[vehicleValue]}
          onValueChange={handleVehicleChange}
          min={10000}
          max={500000}
          step={1000}
          trackVariant="brand"
          thumbVariant="brand"
          rangeVariant="brand"
        />
        <div className="text-muted-soft mt-2 flex justify-between text-xs">
          <span className="text-foreground">{t("plans:customizer.ranges.vehicleMin")}</span>
          <span className="text-foreground">{t("plans:customizer.ranges.vehicleMax")}</span>
        </div>
      </div>

      <div className="mb-10">
        <div className="mb-3 flex items-center justify-between">
          <Label className="text-foreground text-base leading-4 font-semibold">
            {t("plans:customizer.age")}: {clientAge} {t("plans:customizer.ageSuffix")}
          </Label>
        </div>
        <Slider
          value={[clientAge]}
          onValueChange={handleClientAgeChange}
          min={18}
          max={90}
          step={1}
          trackVariant="brand"
          thumbVariant="brand"
          rangeVariant="brand"
        />
        <div className="text-muted-soft mt-2 flex justify-between text-xs">
          <span className="text-foreground">{t("plans:customizer.ranges.ageMin")}</span>
          <span className="text-foreground">{t("plans:customizer.ranges.ageMax")}</span>
        </div>
      </div>

      <div>
        <h3 className="text-foreground mb-4 text-base leading-4 font-bold">
          {t("plans:customizer.coveragesTitle")}
        </h3>
        <div className="space-y-4">
          {ADDITIONAL_COVERAGES.map((coverage) => (
            <div key={coverage.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  id={coverage.id}
                  checked={coverages[coverage.id]}
                  onCheckedChange={(checked) => handleCoverageToggle(coverage.id, !!checked)}
                  variant="brand"
                />
                <Label htmlFor={coverage.id} className="text-foreground cursor-pointer leading-6 text-sm">
                  {t(`plans:customizer.coverages.${coverage.id}`)}
                </Label>
              </div>
              <span className="text-foreground text-sm font-medium">
                + {formatter.format(centsToReais(coverage.price))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
