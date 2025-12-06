import { BarChart2, Ticket, MessageSquare, User, FileText } from "lucide-react";

export const NAV_ITEMS = [
  { href: "/dashboard", icon: BarChart2, label: "Dashboard" },
  { href: "/tickets", icon: Ticket, label: "Ticket Management" },
  { href: "/chats", icon: MessageSquare, label: "Chats" },
  { href: "/view-360", icon: User, label: "View 360" },
  { href: "/plans", icon: FileText, label: "Plans" },
] as const;
