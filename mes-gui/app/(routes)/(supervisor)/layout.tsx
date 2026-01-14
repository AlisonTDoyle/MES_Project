import { Sidebar } from "./_components/sidebar";

export default function SupervisorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[16%_84%] min-h-screen">
        <div className="bg-neutral-100 dark:bg-neutral-800 p-8">
            <Sidebar></Sidebar>
        </div>
        <div className="p-4">
            {children}
        </div>
    </div>
  );
}