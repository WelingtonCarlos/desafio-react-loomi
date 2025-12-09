"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  trendColor: string;
  hasArrow?: boolean;
  periodLabel?: string;
}

export function MetricCard({
  label,
  value,
  change,
  trend,
  trendColor,
  hasArrow,
  periodLabel = "no período",
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "bg-gradient-slate group relative flex h-44 flex-col justify-between overflow-hidden rounded-3xl border border-gray-800/50 p-6 transition-all",
      )}
    >
      <div className="space-y-8">
        <p className="text-text-color-white text-sm leading-4 font-normal">{label}</p>
        <h3 className="text-2xl leading-8 font-bold text-white">{value}</h3>

        <span className={cn("text-sm leading-4 font-normal", trendColor)}>
          {change}{" "}
          <span className={cn("text-text-color-white leading-4 font-normal", trendColor)}>
            {periodLabel}
          </span>
        </span>
      </div>

      {hasArrow && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end px-6 pb-0">
          {trend === "up" ? (
            <Image
              src="/arrowup.png"
              alt="Arrow Up"
              width={86}
              height={68}
              className="h-16 w-20 object-contain"
            />
          ) : (
            <Image
              src="/arrowdown.png"
              alt="Arrow Down"
              width={86}
              height={68}
              className="h-16 w-20 object-contain"
            />
          )}
        </div>
      )}
    </div>
  );
}
