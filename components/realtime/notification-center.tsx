"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Bell, Check, X, Calendar, DollarSign, MessageSquare, AlertTriangle } from "lucide-react"
import { useWebSocket } from "@/lib/websocket"
import { cn } from "@/lib/utils"

export interface Notification {
  id: string
  type: "booking" | "payment" | "message" | "system" | "reminder"
  title: string
  message: string
  timestamp: number
  read: boolean
  priority: "low" | "medium" | "high"
  actionUrl?: string
  metadata?: Record<string, any>
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "booking",
    title: "New Booking Request",
    message: "John Doe has requested an appointment for tomorrow at 2:00 PM",
    timestamp: Date.now() - 300000, // 5 minutes ago
    read: false,
    priority: "high",
    actionUrl: "/bookings/123",
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Received",
    message: "Payment of $150.00 received from Sarah Wilson",
    timestamp: Date.now() - 900000, // 15 minutes ago
    read: false,
    priority: "medium",
    actionUrl: "/earnings",
  },
  {
    id: "3",
    type: "message",
    title: "New Message",
    message: "Mike Johnson sent you a message about his upcoming appointment",
    timestamp: Date.now() - 1800000, // 30 minutes ago
    read: true,
    priority: "medium",
    actionUrl: "/messages/456",
  },
  {
    id: "4",
    type: "reminder",
    title: "Appointment Reminder",
    message: "You have an appointment with Emma Rodriguez in 1 hour",
    timestamp: Date.now() - 3600000, // 1 hour ago
    read: true,
    priority: "high",
    actionUrl: "/calendar",
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)
  const { subscribe, send } = useWebSocket()

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    // Subscribe to real-time notifications
    const unsubscribeBooking = subscribe("booking_notification", (payload) => {
      const newNotification: Notification = {
        id: payload.id,
        type: "booking",
        title: payload.title,
        message: payload.message,
        timestamp: Date.now(),
        read: false,
        priority: payload.priority || "medium",
        actionUrl: payload.actionUrl,
      }
      setNotifications((prev) => [newNotification, ...prev])
    })

    const unsubscribePayment = subscribe("payment_notification", (payload) => {
      const newNotification: Notification = {
        id: payload.id,
        type: "payment",
        title: payload.title,
        message: payload.message,
        timestamp: Date.now(),
        read: false,
        priority: payload.priority || "medium",
        actionUrl: payload.actionUrl,
      }
      setNotifications((prev) => [newNotification, ...prev])
    })

    const unsubscribeMessage = subscribe("message_notification", (payload) => {
      const newNotification: Notification = {
        id: payload.id,
        type: "message",
        title: payload.title,
        message: payload.message,
        timestamp: Date.now(),
        read: false,
        priority: payload.priority || "medium",
        actionUrl: payload.actionUrl,
      }
      setNotifications((prev) => [newNotification, ...prev])
    })

    return () => {
      unsubscribeBooking()
      unsubscribePayment()
      unsubscribeMessage()
    }
  }, [subscribe])

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))

    // Send read status to server
    send({
      type: "notification_read",
      payload: { notificationId },
    })
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))

    send({
      type: "notifications_read_all",
      payload: {},
    })
  }

  const removeNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return Calendar
      case "payment":
        return DollarSign
      case "message":
        return MessageSquare
      case "system":
        return AlertTriangle
      case "reminder":
        return Bell
      default:
        return Bell
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-blue-600"
      default:
        return "text-slate-600"
    }
  }

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white p-0 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Panel */}
      {isOpen && (
        <Card className="absolute right-0 top-12 w-96 max-h-96 shadow-xl border z-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    <Check className="h-4 w-4 mr-1" />
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-80">
              {notifications.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification, index) => {
                    const Icon = getNotificationIcon(notification.type)
                    return (
                      <div key={notification.id}>
                        <div
                          className={cn(
                            "p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors",
                            !notification.read && "bg-blue-50 dark:bg-blue-900/20",
                          )}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn("p-2 rounded-lg", getPriorityColor(notification.priority))}>
                              <Icon className="h-4 w-4" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{notification.message}</p>
                              <p className="text-xs text-slate-500 mt-1">{formatTimestamp(notification.timestamp)}</p>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeNotification(notification.id)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        {index < notifications.length - 1 && <Separator />}
                      </div>
                    )
                  })}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
