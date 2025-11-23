"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

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
    <div className="bg-linear-to-br from-[#36446b98] via-[#36446b98 ]/60 to-[#36446b98 ]/10 rounded-3xl p-6 border border-gray-800/50 shadow-xl flex flex-col justify-between h-full relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-3xl -mr-12 -mt-12 transition-opacity opacity-0 group-hover:opacity-100" />

      <div className="space-y-1">
        <p className="text-sm text-gray-400 font-medium">{label}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className={cn("text-sm font-medium", trendColor)}>
          {change} <span className="text-gray-500 font-normal">{periodLabel}</span>
        </span>

        {hasArrow && (
          <div
            className={cn(
              "p-2 rounded-full bg-opacity-20 backdrop-blur-sm",
              trend === "up" ? "bg-cyan-500/10" : "bg-red-500/10"
            )}
          >
            {trend === "up" ? (
              <ArrowUpRight
                className="w-6 h-6 text-[#06b6d4] drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                strokeWidth={3}
              />
            ) : (
              <ArrowDownRight
                className="w-6 h-6 text-[#f43f5e] drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]"
                strokeWidth={3}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
