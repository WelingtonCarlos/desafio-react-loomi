"use client";

import { Button } from "@/components/ui/button";
import type { TFunction } from "i18next";
import Image from "next/image";

interface RecommendedOfferCardProps {
  t: TFunction<"chats">;
}

export function RecommendedOfferCard({ t }: RecommendedOfferCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-400/20 bg-[#0f1a2f] bg-linear-to-br from-[#1e3a8a]/40 via-[#1e3a8a]/20 to-[#0f172a] p-6">
      <div className="absolute top-8 right-4 text-blue-300/40">
        <Image
          src="/shield.png"
          alt="Conversation Analysis"
          width={64}
          height={64}
          className="z-50"
        />
      </div>

      <h3 className="mb-4 font-bold text-xl leading-4 text-foreground">
        {t("sidebar.recommendedOffers.title")}
      </h3>

      <div className="mb-2 rounded-xl bg-linear-to-br from-[#4aa8ff]/30 to-[#2b7bff]/40 p-px">
        <div className="rounded-xl bg-linear-to-br from-[#1d78d1] via-[#2896d5] to-[#3cb9d7] p-4">
          <h4 className="mb-1 font-bold text-xl leading-4 text-foreground">
            {t("sidebar.recommendedOffers.planTitle")}
          </h4>

          <p className="mb-4 text-sm leading-4 text-foreground w-2/3 font-normal">
            {t("sidebar.recommendedOffers.benefits")}
          </p>

          <div className="space-y-2 text-sm text-foreground">
            <div className="flex justify-between">
              <span>{t("sidebar.recommendedOffers.normalPrice")}</span>
              <span className="font-medium text-foreground">R$ 86,00/mês</span>
            </div>

            <div className="flex justify-between font-semibold text-foreground">
              <span>{t("sidebar.recommendedOffers.discountPrice")}</span>
              <span className="text-lg text-foreground">R$ 86,00/mês</span>
            </div>

            <div className="flex justify-between pt-1">
              <span className="text-muted-soft">{t("sidebar.recommendedOffers.yearlySaving")}</span>
              <span className="font-medium text-foreground">R$103,20/ano</span>
            </div>
          </div>
        </div>
      </div>

      <Button className="mt-3 w-full rounded-full bg-blue-500 text-xs font-semibold text-white hover:bg-blue-600">
        {t("sidebar.recommendedOffers.cta")}
      </Button>
    </div>
  );
}
