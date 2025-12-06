"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { NAV_ITEMS } from "../constants";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-sidebar text-sidebar-foreground border-sidebar fixed top-0 left-0 z-50 flex h-screen w-20 flex-col items-center rounded-br-3xl border-r py-6 shadow-2xl">
      <div className="mb-48">
        <div className="flex h-full w-full items-center justify-center">
          <div className="inset-0">
            <Image
              src="/nortus-logo.png"
              alt="Nortus - Plataforma de Gestão Inteligente"
              width={50}
              height={50}
              className="opacity-90 transition-transform duration-700"
            />
          </div>
        </div>
      </div>

      <nav className="w-full flex-1 space-y-4 px-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200",
                isActive
                  ? "bg-brand text-brand-foreground shadow-brand"
                  : "hover:bg-surface-contrast text-gray-400 hover:text-white",
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="sr-only">{item.label}</span>

              {/* Tooltip on hover */}
              <div className="pointer-events-none absolute left-14 z-50 ml-2 rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button className="bg-brand text-brand-foreground hover:bg-brand-strong flex h-10 w-10 items-center justify-center rounded-full font-medium transition-colors">
          AC
        </button>
      </div>
    </aside>
  );
}
