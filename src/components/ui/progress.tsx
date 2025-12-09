"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
  {
    variants: {
      background: {
        default: "bg-primary/20",
        surface: "bg-surface-panel",
        mute: "bg-color-muted-soft",
        card: "bg-card-2",
      },
    },
    defaultVariants: {
      background: "default",
    },
  },
);

const indicatorVariants = cva("h-full w-full flex-1 transition-all bg-primary", {
  variants: {
    color: {
      default: "bg-primary",
      success: "bg-success-strong",
      warning: "bg-warning-strong",
      brand: "bg-brand",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressVariants> &
  VariantProps<typeof indicatorVariants> & {
    indicatorClassName?: string;
  };

function Progress({
  className,
  indicatorClassName,
  background,
  color,
  value,
  ...props
}: ProgressProps) {
  const safeValue = value ?? 0;
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(progressVariants({ background }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(indicatorVariants({ color }), indicatorClassName)}
        style={{ transform: `translateX(-${100 - safeValue}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
