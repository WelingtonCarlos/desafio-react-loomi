"use client";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="bg-[#20273E] border-b border-gray-800 py-9 pl-10">
      <h1 className="text-xl font-medium text-white">{title}</h1>
    </header>
  );
}
