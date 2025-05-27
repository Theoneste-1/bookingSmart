"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimeSlot {
  time: string
  available: boolean
  booked?: boolean
  clientName?: string
  service?: string
  duration?: number
}

interface DaySchedule {
  date: Date
  slots: TimeSlot[]
}

const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = []
  const isWeekend = date.getDay() === 0 || date.getDay() === 6
  const startHour = 9
  const endHour = isWeekend ? 15 : 17

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      const random = Math.random()

      // Simulate some booked appointments
      if (random < 0.3) {
        slots.push({
          time,
          available: false,
          booked: true,
          clientName: ["John Doe", "Sarah Wilson", "Mike Johnson", "Emma Rodriguez"][Math.floor(Math.random() * 4)],
          service: ["Consultation", "Follow-up", "Assessment", "Treatment"][Math.floor(Math.random() * 4)],
          duration: [30, 60, 90][Math.floor(Math.random() * 3)],
        })
      } else if (random < 0.7) {
        slots.push({
          time,
          available: true,
          booked: false,
        })
      } else {
        slots.push({
          time,
          available: false,
          booked: false,
        })
      }
    }
  }

  return slots
}

const generateWeekSchedule = (startDate: Date): DaySchedule[] => {
  const schedule: DaySchedule[] = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    schedule.push({
      date,
      slots: generateTimeSlots(date),
    })
  }

  return schedule
}

export function BookingCalendar() {
  const [currentWeek, setCurrentWeek] = useState(() => {
    const today = new Date()
    const monday = new Date(today)
    monday.setDate(today.getDate() - today.getDay() + 1)
    return monday
  })

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<"week" | "day">("week")

  const weekSchedule = generateWeekSchedule(currentWeek)

  const navigateWeek = (direction: "prev" | "next") => {
    const newWeek = new Date(currentWeek)
    newWeek.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7))
    setCurrentWeek(newWeek)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const formatWeekRange = () => {
    const endDate = new Date(currentWeek)
    endDate.setDate(currentWeek.getDate() + 6)

    return `${currentWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
  }

  const getSlotStatus = (slot: TimeSlot) => {
    if (slot.booked) return "booked"
    if (slot.available) return "available"
    return "unavailable"
  }

  const getSlotColor = (status: string) => {
    switch (status) {
      case "booked":
        return "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300"
      case "available":
        return "bg-green-100 border-green-300 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-800 cursor-pointer"
      default:
        return "bg-slate-100 border-slate-300 text-slate-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule Calendar
              </CardTitle>
              <CardDescription>Manage your appointments and availability</CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("week")}
              >
                Week
              </Button>
              <Button variant={viewMode === "day" ? "default" : "outline"} size="sm" onClick={() => setViewMode("day")}>
                Day
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <h3 className="text-lg font-semibold">{formatWeekRange()}</h3>

              <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Block Time
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-0">
          {viewMode === "week" ? (
            <div className="grid grid-cols-8 border-b border-slate-200 dark:border-slate-700">
              {/* Time column header */}
              <div className="p-4 border-r border-slate-200 dark:border-slate-700">
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Time</div>
              </div>

              {/* Day headers */}
              {weekSchedule.map((day, index) => (
                <div
                  key={index}
                  className="p-4 text-center border-r border-slate-200 dark:border-slate-700 last:border-r-0"
                >
                  <div className="text-sm font-medium text-slate-900 dark:text-white">{formatDate(day.date)}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {day.slots.filter((slot) => slot.available).length} available
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {/* Calendar Body */}
          <div className="max-h-[600px] overflow-y-auto">
            {viewMode === "week" ? (
              <div className="grid grid-cols-8">
                {/* Time slots */}
                <div className="border-r border-slate-200 dark:border-slate-700">
                  {weekSchedule[0]?.slots.map((slot, timeIndex) => (
                    <div
                      key={timeIndex}
                      className="h-16 p-2 border-b border-slate-200 dark:border-slate-700 flex items-center"
                    >
                      <span className="text-xs text-slate-600 dark:text-slate-400">{slot.time}</span>
                    </div>
                  ))}
                </div>

                {/* Day columns */}
                {weekSchedule.map((day, dayIndex) => (
                  <div key={dayIndex} className="border-r border-slate-200 dark:border-slate-700 last:border-r-0">
                    {day.slots.map((slot, timeIndex) => {
                      const status = getSlotStatus(slot)
                      return (
                        <div key={timeIndex} className="h-16 p-1 border-b border-slate-200 dark:border-slate-700">
                          {status !== "unavailable" && (
                            <div
                              className={cn(
                                "h-full w-full rounded border-2 p-1 text-xs transition-colors",
                                getSlotColor(status),
                              )}
                            >
                              {slot.booked && (
                                <div className="space-y-1">
                                  <div className="font-medium truncate">{slot.clientName}</div>
                                  <div className="text-xs opacity-75 truncate">{slot.service}</div>
                                </div>
                              )}
                              {slot.available && !slot.booked && (
                                <div className="flex items-center justify-center h-full">
                                  <Plus className="h-3 w-3" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            ) : (
              // Day view
              <div className="p-6">
                <div className="space-y-2">
                  {weekSchedule[0]?.slots.map((slot, index) => {
                    const status = getSlotStatus(slot)
                    return (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg border-2 transition-colors",
                          getSlotColor(status),
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{slot.time}</span>
                          {slot.duration && (
                            <Badge variant="secondary" className="text-xs">
                              {slot.duration}min
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {slot.booked && (
                            <>
                              <User className="h-4 w-4" />
                              <span className="text-sm">{slot.clientName}</span>
                              <Badge variant="outline">{slot.service}</Badge>
                            </>
                          )}
                          {slot.available && !slot.booked && (
                            <Button size="sm" variant="ghost">
                              Book Slot
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-300 dark:bg-green-900 dark:border-green-700" />
              <span className="text-sm text-slate-600 dark:text-slate-300">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-300 dark:bg-blue-900 dark:border-blue-700" />
              <span className="text-sm text-slate-600 dark:text-slate-300">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-100 border-2 border-slate-300 dark:bg-slate-800 dark:border-slate-600" />
              <span className="text-sm text-slate-600 dark:text-slate-300">Unavailable</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
