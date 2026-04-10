"use client"

import Clock from "@/app/(routes)/(operator)/dashboard/_components/clock/clock";
import { OperatorSidebar } from "./_components/sidebar";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
let companyName = process.env.COMPANY_NAME

export default function OperatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading } = useAuthGuard("operator");

  if (loading) {
    return <div className="flex justify-center p-10">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  return (
    <div className="max-h-screen">
      <div className="drawer xl:drawer-open">

        <input id="sidebar" type="checkbox" className="drawer-toggle" />

        {/* main content */}
        <div className="drawer-content">
          {/* Drawer open trigger */}
          <div className="fab">
            <label htmlFor="sidebar" className="btn btn-lg btn-circle btn-primary xl:hidden">
              <Bars3Icon className="m-2"></Bars3Icon>
            </label>
          </div>

          {children}
        </div>

        {/* side bar */}
        <div className="drawer-side shadow-sm">
          <label htmlFor="sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
          <OperatorSidebar></OperatorSidebar>
        </div>

      </div>
    </div>
  )
}