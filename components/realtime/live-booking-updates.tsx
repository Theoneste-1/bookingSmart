"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, User, MapPin, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useWebSocket } from "@/lib/websocket"
import { cn } from "@/lib/utils"

export interface BookingUpdate {
  id: string
  bookingId: string
  type: "created" | "updated" | "cancelled" | "confirmed" | "completed"
  clientName: string
  clientAvatar?: string
  service: string
  date: string
  time: string
  location: string
  timestamp: number
  priority: "low" | "medium" | "high"
  metadata?: Record<string, any>
}

const mockUpdates: BookingUpdate[] = [
  {
    id: "1",
    bookingId: "bk_001",
    type: "created",
    clientName: "John Doe",
    service: "Initial Consultation",
    date: "2024-01-20",
    time: "2:00 PM",
    location: "Downtown Medical Center",
    timestamp: Date.now() - 300000,
    priority: "high",
  },
  {
    id: "2",
    bookingId: "bk_002",
    type: "updated",
    clientName: "Sarah Wilson",
    service: "Follow-up Session",
    date: "2024-01-21",
    time: "10:30 AM",
    location: "Downtown Medical Center",
    timestamp: Date.now() - 600000,
    priority: "medium",
  },
  {
    id: "3",
    bookingId: "bk_003",
    type: "confirmed",
    clientName: "Mike Johnson",
    service: "Group Session",
    date: "2024-01-22",
    time: "3:00 PM",
    location: "Downtown Medical Center",
    timestamp: Date.now() - 900000,
    priority: "medium",
  },
]

export function LiveBookingUpdates() {
  const [updates, setUpdates] = useState<BookingUpdate[]>(mockUpdates)
  const [filter, setFilter] = useState<"all" | "created" | "updated" | "confirmed" | "cancelled">("all")
  const { subscribe, send } = useWebSocket()

  useEffect(() => {
    // Subscribe to real-time booking updates
    const unsubscribeBookingCreated = subscribe("booking_created", (payload) => {
      const update: BookingUpdate = {
        id: `update_${Date.now()}`,
        bookingId: payload.bookingId,
        type: "created",
        clientName: payload.clientName,
        clientAvatar: payload.clientAvatar,
        service: payload.service,
        date: payload.date,
        time: payload.time,
        location: payload.location,
        timestamp: Date.now(),
        priority: "high",
        metadata: payload.metadata,
      }
      setUpdates((prev) => [update, ...prev])
    })

    const unsubscribeBookingUpdated = subscribe("booking_updated", (payload) => {
      const update: BookingUpdate = {
        id: `update_${Date.now()}`,
        bookingId: payload.bookingId,
        type: "updated",
        clientName: payload.clientName,
        clientAvatar: payload.clientAvatar,
        service: payload.service,
        date: payload.date,
        time: payload.time,
        location: payload.location,
        timestamp: Date.now(),
        priority: "medium",
        metadata: payload.metadata,
      }
      setUpdates((prev) => [update, ...prev])
    })

    const unsubscribeBookingConfirmed = subscribe("booking_confirmed", (payload) => {
      const update: BookingUpdate = {
        id: `update_${Date.now()}`,
        bookingId: payload.bookingId,
        type: "confirmed",
        clientName: payload.clientName,
        clientAvatar: payload.clientAvatar,
        service: payload.service,
        date: payload.date,
        time: payload.time,
        location: payload.location,
        timestamp: Date.now(),
        priority: "medium",
        metadata: payload.metadata,
      }
      setUpdates((prev) => [update, ...prev])
    })

    const unsubscribeBookingCancelled = subscribe("booking_cancelled", (payload) => {
      const update: BookingUpdate = {
        id: `update_${Date.now()}`,
        bookingId: payload.bookingId,
        type: "cancelled",
        clientName: payload.clientName,
        clientAvatar: payload.clientAvatar,
        service: payload.service,
        date: payload.date,
        time: payload.time,
        location: payload.location,
        timestamp: Date.now(),
        priority: "high",
        metadata: payload.metadata,
      }
      setUpdates((prev) => [update, ...prev])
    })

    return () => {
      unsubscribeBookingCreated()
      unsubscribeBookingUpdated()
      unsubscribeBookingConfirmed()
      unsubscribeBookingCancelled()
    }
  }, [subscribe])

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "created":
        return Calendar
      case "updated":
        return AlertCircle
      case "confirmed":
        return CheckCircle
      case "cancelled":
        return XCircle
      case "completed":
        return CheckCircle
      default:
        return Calendar
    }
  }

  const getUpdateColor = (type: string) => {
    switch (type) {
      case "created":
        return "text-blue-600"
      case "updated":
        return "text-yellow-600"
      case "confirmed":
        return "text-green-600"
      case "cancelled":
        return "text-red-600"
      case "completed":
        return "text-green-600"
      default:
        return "text-slate-600"
    }
  }

  const getUpdateMessage = (update: BookingUpdate) => {
    switch (update.type) {
      case "created":
        return `New booking request from ${update.clientName}`
      case "updated":
        return `${update.clientName} updated their booking`
      case "confirmed":
        return `Booking confirmed with ${update.clientName}`
      case "cancelled":
        return `${update.clientName} cancelled their booking`
      case "completed":
        return `Session completed with ${update.clientName}`
      default:
        return `Booking update from ${update.clientName}`
    }
  }

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    return `${hours}h ago`
  }

  const filteredUpdates = filter === "all" ? updates : updates.filter((update) => update.type === filter)

  const handleBookingAction = (bookingId: string, action: "confirm" | "decline" | "reschedule") => {
    send({
      type: "booking_action",
      payload: {
        bookingId,
        action,
        timestamp: Date.now(),
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Live Booking Updates
            </CardTitle>
            <CardDescription>Real-time booking notifications and updates</CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              All
            </Button>
            <Button
              variant={filter === "created" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("created")}
            >
              New
            </Button>
            <Button
              variant={filter === "confirmed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("confirmed")}
            >
              Confirmed
            </Button>
            <Button
              variant={filter === "cancelled" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("cancelled")}
            >
              Cancelled
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {filteredUpdates.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No booking updates</p>
            </div>
          ) : (
            filteredUpdates.map((update) => {
              const Icon = getUpdateIcon(update.type)
              return (
                <div
                  key={update.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className={cn("p-2 rounded-lg bg-slate-100 dark:bg-slate-800", getUpdateColor(update.type))}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-slate-900 dark:text-white">{getUpdateMessage(update)}</p>
                      <Badge
                        className={cn(
                          "text-xs",
                          update.priority === "high"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : update.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
                        )}
                      >
                        {update.type}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300 mb-2">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {update.service}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {update.date} at {update.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {update.location}
                      </div>
                      <div className="text-xs text-slate-500">{formatTimestamp(update.timestamp)}</div>
                    </div>

                    {update.type === "created" && (
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          size="sm"
                          onClick={() => handleBookingAction(update.bookingId, "confirm")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Confirm
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBookingAction(update.bookingId, "reschedule")}
                        >
                          <Calendar className="h-3 w-3 mr-1" />
                          Reschedule
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBookingAction(update.bookingId, "decline")}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Decline
                        </Button>
                      </div>
                    )}
                  </div>

                  <Avatar className="h-10 w-10">
                    <AvatarImage src={update.clientAvatar || "/placeholder.svg"} alt={update.clientName} />
                    <AvatarFallback>
                      {update.clientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
