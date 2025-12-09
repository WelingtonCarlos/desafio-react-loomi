"use client";

import { Button } from "@/components/ui/button";
import type { Product } from "@/modules/view-360/types/view-360.types";
import type { TFunction } from "i18next";
import { Plus, SquareArrowOutUpRight } from "lucide-react";

interface ChatProductListProps {
  products?: Product[];
  t: TFunction<"chats">;
}

export function ChatProductList({ products, t }: ChatProductListProps) {
  return (
    <div className="space-y-3 px-6">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-foreground text-base leading-4 font-medium">{t("sidebar.products")}</h3>
        <Button variant="ghost" size="icon" className="h-6 w-6 p-0 text-slate-400 hover:text-white">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-6 space-y-2">
        {products?.map((product, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  product.status === "Ativo" ? "bg-green-500" : "bg-destructive"
                }`}
              />
              <span className="text-muted-soft">{product.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-foreground font-medium">R$ {product.value.toFixed(2)}/mês</span>
              <SquareArrowOutUpRight className="text-brand-name h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
