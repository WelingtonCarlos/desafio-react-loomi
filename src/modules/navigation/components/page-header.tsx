"use client";

import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <header className="bg-[#20273E] border-b border-gray-800 py-9 px-10 flex justify-between">
      <div className="flex flex-col">
        <h1 className="text-xl font-medium text-white" suppressHydrationWarning>
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-gray-400" suppressHydrationWarning>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </header>
  );
}
