import type React from "react"
import { ProfessionalSidebar } from "@/components/dashboard/professional-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import UseAuth from "@/hooks/UseAuth"

export default function ProfessionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
       <UseAuth>
      <ProfessionalSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
      </UseAuth>
    </div>
  )
}
