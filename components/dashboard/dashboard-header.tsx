"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { NotificationCenter } from "@/components/realtime/notification-center"
import { ConnectionStatus } from "@/components/realtime/connection-status"

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search..." className="w-64 pl-10" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ConnectionStatus />

          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <NotificationCenter />
        </div>
      </div>
    </header>
  )
}
