"use client";

import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  trendColor: string;
  hasArrow?: boolean;
  periodLabel?: string;
  isActive?: boolean;
}

export function MetricCard({
  label,
  value,
  change,
  trend,
  trendColor,
  hasArrow,
  periodLabel = "no período",
  isActive = false,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "via-[#36446b98 ]/60 to-[#36446b98 ]/10 group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-gray-800/50 bg-linear-to-br from-[#36446b98] p-6 shadow-xl transition-all",
        isActive ? "border-cyan-400/60 shadow-cyan-500/30" : "",
      )}
    >
      <div className="absolute top-0 right-0 -mt-12 -mr-12 h-24 w-24 rounded-full bg-white/5 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />

      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-400">{label}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className={cn("text-sm font-medium", trendColor)}>
          {change} <span className="font-normal text-gray-500">{periodLabel}</span>
        </span>

        {hasArrow && (
          <div
            className={cn(
              "bg-opacity-20 rounded-full p-2 backdrop-blur-sm",
              trend === "up" ? "bg-cyan-500/10" : "bg-red-500/10",
            )}
          >
            {trend === "up" ? (
              <ArrowUpRight
                className="h-6 w-6 text-[#06b6d4] drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                strokeWidth={3}
              />
            ) : (
              <ArrowDownRight
                className="h-6 w-6 text-[#f43f5e] drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]"
                strokeWidth={3}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
