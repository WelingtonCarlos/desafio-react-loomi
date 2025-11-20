import { Sidebar } from "@/modules/navigation/components/sidebar";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-20 flex-1">{children}</main>
    </div>
  );
}
