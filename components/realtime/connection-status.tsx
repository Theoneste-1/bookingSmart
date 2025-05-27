"use client"

import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, AlertCircle } from "lucide-react"
import { useWebSocket } from "@/lib/websocket"
import { cn } from "@/lib/utils"

export function ConnectionStatus() {
  const { connectionStatus, isConnected } = useWebSocket()

  const getStatusConfig = () => {
    switch (connectionStatus) {
      case "connected":
        return {
          icon: Wifi,
          label: "Connected",
          className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        }
      case "connecting":
        return {
          icon: AlertCircle,
          label: "Connecting...",
          className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        }
      case "disconnected":
        return {
          icon: WifiOff,
          label: "Disconnected",
          className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        }
      case "error":
        return {
          icon: AlertCircle,
          label: "Connection Error",
          className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        }
      default:
        return {
          icon: WifiOff,
          label: "Unknown",
          className: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <Badge className={cn("flex items-center gap-1 text-xs", config.className)}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  )
}
