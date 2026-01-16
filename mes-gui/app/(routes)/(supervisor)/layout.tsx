import { Sidebar } from "./_components/sidebar";

export default function SupervisorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[16%_84%] h-screen">
        <div>
            <Sidebar></Sidebar>
        </div>
        <div>
            {children}
        </div>
    </div>
  );
}