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

      <h3 className="text-foreground mb-4 text-xl leading-4 font-bold">
        {t("sidebar.recommendedOffers.title")}
      </h3>

      <div className="mb-2 rounded-xl bg-linear-to-br from-[#4aa8ff]/30 to-[#2b7bff]/40 p-px">
        <div className="rounded-xl bg-linear-to-br from-[#1d78d1] via-[#2896d5] to-[#3cb9d7] p-4">
          <h4 className="text-foreground mb-1 text-xl leading-4 font-bold">
            {t("sidebar.recommendedOffers.planTitle")}
          </h4>

          <p className="text-foreground mb-4 w-2/3 text-sm leading-4 font-normal">
            {t("sidebar.recommendedOffers.benefits")}
          </p>

          <div className="text-foreground space-y-2 text-sm">
            <div className="flex justify-between">
              <span>{t("sidebar.recommendedOffers.normalPrice")}</span>
              <span className="text-foreground font-medium">R$ 86,00/mês</span>
            </div>

            <div className="text-foreground flex justify-between font-semibold">
              <span>{t("sidebar.recommendedOffers.discountPrice")}</span>
              <span className="text-foreground text-lg">R$ 86,00/mês</span>
            </div>

            <div className="flex justify-between pt-1">
              <span className="text-muted-soft">{t("sidebar.recommendedOffers.yearlySaving")}</span>
              <span className="text-foreground font-medium">R$103,20/ano</span>
            </div>
          </div>
        </div>
      </div>

      <Button className="bg-brand-name shadow-brand-name hover:bg-brand-name mt-3 w-full rounded-full text-xs font-medium text-white shadow-2xl">
        {t("sidebar.recommendedOffers.cta")}
      </Button>
    </div>
  );
}
