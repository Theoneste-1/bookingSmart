import type React from "react"
import { ClientSidebar } from "@/components/dashboard/client-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <ClientSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
