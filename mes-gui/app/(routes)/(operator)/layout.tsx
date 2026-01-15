import Clock from "@/app/(routes)/(operator)/dashboard/_components/clock";
import { OperatorSidebar } from "./_components/sidebar";

let companyName = process.env.COMPANY_NAME

export default function OperatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[16%_84%] h-screen">
      <div className="bg-neutral-100 dark:bg-neutral-800 p-8">
        <OperatorSidebar />
      </div>

      <div className="p-4 min-h-0">
        {children}
      </div>
    </div>
  )
}