"use client";

import { Button } from "@/components/ui/button";
import type { Product } from "@/modules/view-360/types/view-360.types";
import type { TFunction } from "i18next";
import { Plus } from "lucide-react";

interface ChatProductListProps {
  products?: Product[];
  t: TFunction<"chats">;
}

export function ChatProductList({ products, t }: ChatProductListProps) {
  return (
    <div className="space-y-3">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">{t("sidebar.products")}</h3>
        <Button variant="ghost" size="icon" className="h-6 w-6 p-0 text-slate-400 hover:text-white">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {products?.map((produto, index) => (
          <div
            key={`${produto.name}-${index}`}
            className="flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  produto.status === "Ativo" ? "bg-emerald-400" : "bg-orange-400"
                }`}
              />
              <span className="text-slate-200">{produto.name}</span>
            </div>
            <span className="font-semibold text-white">R$ {produto.value.toFixed(2)}/mês</span>
          </div>
        ))}
      </div>
    </div>
  );
}
