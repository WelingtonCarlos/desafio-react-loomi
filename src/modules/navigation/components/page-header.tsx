"use client";

import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <header className="bg-sidebar border-b border-sidebar py-9 px-10 flex justify-between text-sidebar-foreground">
      <div className="flex flex-col">
        <h1 className="text-xl font-medium" suppressHydrationWarning>
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-soft" suppressHydrationWarning>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </header>
  );
}
