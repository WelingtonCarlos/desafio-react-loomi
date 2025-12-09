"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const trackVariants = cva(
  "relative grow overflow-hidden rounded-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
  {
    variants: {
      variant: {
        default: "bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5",
        brand: "bg-[#ffffff1c] data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2",
        subtle: "bg-slate-700/60 data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const rangeVariants = cva("absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full", {
  variants: {
    variant: {
      default: "bg-primary",
      brand: "bg-brand",
      success: "bg-success-strong",
      warning: "bg-warning-strong",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const thumbVariants = cva(
  "block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-primary bg-white ring-ring/50",
        brand: "border-brand bg-white ring-brand/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  trackVariant?: VariantProps<typeof trackVariants>["variant"];
  rangeVariant?: VariantProps<typeof rangeVariants>["variant"];
  thumbVariant?: VariantProps<typeof thumbVariants>["variant"];
};

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  trackVariant = "default",
  rangeVariant = "default",
  thumbVariant = "default",
  ...props
}: SliderProps) {
  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(trackVariants({ variant: trackVariant }))}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(rangeVariants({ variant: rangeVariant }))}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(thumbVariants({ variant: thumbVariant }))}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
