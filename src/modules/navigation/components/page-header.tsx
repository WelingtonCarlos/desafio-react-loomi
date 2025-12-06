"use client";

import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <header className="bg-sidebar border-sidebar text-sidebar-foreground flex justify-between border-b px-10 py-9">
      <div className="flex flex-col">
        <h1 className="text-xl font-medium" suppressHydrationWarning>
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-soft text-sm" suppressHydrationWarning>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </header>
  );
}
