"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, DollarSign, User, MessageSquare, Settings, TrendingUp } from "lucide-react"
import { useWebSocket } from "@/lib/websocket"
import { cn } from "@/lib/utils"

export interface ActivityItem {
  id: string
  type: "booking" | "payment" | "message" | "user" | "system" | "analytics"
  title: string
  description: string
  timestamp: number
  userId?: string
  userName?: string
  userAvatar?: string
  metadata?: Record<string, any>
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "booking",
    title: "New Booking Created",
    description: "John Doe booked an Initial Consultation for Jan 20, 2:00 PM",
    timestamp: Date.now() - 300000,
    userId: "user1",
    userName: "John Doe",
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Received",
    description: "Payment of $150.00 received from Sarah Wilson",
    timestamp: Date.now() - 600000,
    userId: "user2",
    userName: "Sarah Wilson",
  },
  {
    id: "3",
    type: "message",
    title: "New Message",
    description: "Mike Johnson sent a message about appointment details",
    timestamp: Date.now() - 900000,
    userId: "user3",
    userName: "Mike Johnson",
  },
  {
    id: "4",
    type: "user",
    title: "New User Registration",
    description: "Emma Rodriguez joined as a new client",
    timestamp: Date.now() - 1200000,
    userId: "user4",
    userName: "Emma Rodriguez",
  },
  {
    id: "5",
    type: "analytics",
    title: "Revenue Milestone",
    description: "Monthly revenue reached $5,000",
    timestamp: Date.now() - 1800000,
  },
]

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivities)
  const [filter, setFilter] = useState<"all" | "booking" | "payment" | "message" | "user">("all")
  const { subscribe } = useWebSocket()

  useEffect(() => {
    // Subscribe to various activity events
    const unsubscribeBooking = subscribe("booking_activity", (payload) => {
      const activity: ActivityItem = {
        id: `activity_${Date.now()}`,
        type: "booking",
        title: payload.title,
        description: payload.description,
        timestamp: Date.now(),
        userId: payload.userId,
        userName: payload.userName,
        userAvatar: payload.userAvatar,
        metadata: payload.metadata,
      }
      setActivities((prev) => [activity, ...prev])
    })

    const unsubscribePayment = subscribe("payment_activity", (payload) => {
      const activity: ActivityItem = {
        id: `activity_${Date.now()}`,
        type: "payment",
        title: payload.title,
        description: payload.description,
        timestamp: Date.now(),
        userId: payload.userId,
        userName: payload.userName,
        userAvatar: payload.userAvatar,
        metadata: payload.metadata,
      }
      setActivities((prev) => [activity, ...prev])
    })

    const unsubscribeMessage = subscribe("message_activity", (payload) => {
      const activity: ActivityItem = {
        id: `activity_${Date.now()}`,
        type: "message",
        title: payload.title,
        description: payload.description,
        timestamp: Date.now(),
        userId: payload.userId,
        userName: payload.userName,
        userAvatar: payload.userAvatar,
        metadata: payload.metadata,
      }
      setActivities((prev) => [activity, ...prev])
    })

    const unsubscribeUser = subscribe("user_activity", (payload) => {
      const activity: ActivityItem = {
        id: `activity_${Date.now()}`,
        type: "user",
        title: payload.title,
        description: payload.description,
        timestamp: Date.now(),
        userId: payload.userId,
        userName: payload.userName,
        userAvatar: payload.userAvatar,
        metadata: payload.metadata,
      }
      setActivities((prev) => [activity, ...prev])
    })

    return () => {
      unsubscribeBooking()
      unsubscribePayment()
      unsubscribeMessage()
      unsubscribeUser()
    }
  }, [subscribe])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "booking":
        return Calendar
      case "payment":
        return DollarSign
      case "message":
        return MessageSquare
      case "user":
        return User
      case "system":
        return Settings
      case "analytics":
        return TrendingUp
      default:
        return Calendar
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "booking":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900"
      case "payment":
        return "text-green-600 bg-green-100 dark:bg-green-900"
      case "message":
        return "text-purple-600 bg-purple-100 dark:bg-purple-900"
      case "user":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900"
      case "system":
        return "text-slate-600 bg-slate-100 dark:bg-slate-800"
      case "analytics":
        return "text-pink-600 bg-pink-100 dark:bg-pink-900"
      default:
        return "text-slate-600 bg-slate-100 dark:bg-slate-800"
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

  const filteredActivities = filter === "all" ? activities : activities.filter((activity) => activity.type === filter)

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Activity Feed</CardTitle>
            <CardDescription>Real-time updates from your platform</CardDescription>
          </div>

          <div className="flex items-center gap-1">
            <Badge
              variant={filter === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilter("all")}
            >
              All
            </Badge>
            <Badge
              variant={filter === "booking" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilter("booking")}
            >
              Bookings
            </Badge>
            <Badge
              variant={filter === "payment" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilter("payment")}
            >
              Payments
            </Badge>
            <Badge
              variant={filter === "message" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilter("message")}
            >
              Messages
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full px-6">
          <div className="space-y-4 pb-6">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No activities to show</p>
              </div>
            ) : (
              filteredActivities.map((activity, index) => {
                const Icon = getActivityIcon(activity.type)
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={cn("p-2 rounded-lg", getActivityColor(activity.type))}>
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.title}</p>
                        <span className="text-xs text-slate-500">{formatTimestamp(activity.timestamp)}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{activity.description}</p>

                      {activity.userId && (
                        <div className="flex items-center gap-2 mt-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={activity.userAvatar || "/placeholder.svg"} alt={activity.userName} />
                            <AvatarFallback className="text-xs">
                              {activity.userName
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-slate-500">{activity.userName}</span>
                        </div>
                      )}
                    </div>

                    {index < filteredActivities.length - 1 && (
                      <div className="absolute left-[22px] top-10 w-px h-8 bg-slate-200 dark:bg-slate-700" />
                    )}
                  </div>
                )
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
