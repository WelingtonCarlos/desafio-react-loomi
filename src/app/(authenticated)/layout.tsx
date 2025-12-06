import { Sidebar } from "@/modules/navigation/components/sidebar";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 pl-20">{children}</main>
    </div>
  );
}
