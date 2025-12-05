"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  Ticket,
  MessageSquare,
  User,
  FileText,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  { href: "/dashboard", icon: BarChart2, label: "Dashboard" },
  { href: "/tickets", icon: Ticket, label: "Ticket Management" },
  { href: "/chats", icon: MessageSquare, label: "Chats" },
  { href: "/view-360", icon: User, label: "View 360" },
  { href: "/plans", icon: FileText, label: "Plans" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col items-center w-20 h-screen py-6 bg-sidebar text-sidebar-foreground shadow-2xl border-r border-sidebar rounded-br-3xl fixed left-0 top-0 z-50">
      <div className="mb-48">
        <div className="flex items-center justify-center w-full h-full">
          <div className=" inset-0">
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

      <nav className="flex-1 w-full px-4 space-y-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "bg-brand text-brand-foreground shadow-brand"
                  : "text-gray-400 hover:bg-surface-contrast hover:text-white"
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="sr-only">{item.label}</span>

              {/* Tooltip on hover */}
              <div className="absolute left-14 px-2 py-1 ml-2 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-brand text-brand-foreground font-medium hover:bg-brand-strong transition-colors">
          AC
        </button>
      </div>
    </aside>
  );
}
