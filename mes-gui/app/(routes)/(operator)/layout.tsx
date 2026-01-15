import Clock from "@/app/(routes)/(operator)/dashboard/_components/clock";
import { OperatorSidebar } from "./_components/sidebar";

let companyName = process.env.COMPANY_NAME

export default function OperatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[16%_84%] min-h-screen">
      <div className="bg-neutral-100 dark:bg-neutral-800 p-8">
        <OperatorSidebar></OperatorSidebar>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  )
        {/* <div className="bg-neutral-800 px-8 py-2">
            <div className="grid grid-cols-[10%_90%]">
                
            </div>
        </div>
        <div className="p-8">
            {children}
        </div> */}
}