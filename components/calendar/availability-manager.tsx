"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Calendar, Plus, Trash2, Copy } from "lucide-react"

interface TimeRange {
  start: string
  end: string
}

interface DayAvailability {
  enabled: boolean
  ranges: TimeRange[]
}

interface WeeklySchedule {
  [key: string]: DayAvailability
}

const defaultSchedule: WeeklySchedule = {
  monday: { enabled: true, ranges: [{ start: "09:00", end: "17:00" }] },
  tuesday: { enabled: true, ranges: [{ start: "09:00", end: "17:00" }] },
  wednesday: { enabled: true, ranges: [{ start: "09:00", end: "17:00" }] },
  thursday: { enabled: true, ranges: [{ start: "09:00", end: "17:00" }] },
  friday: { enabled: true, ranges: [{ start: "09:00", end: "17:00" }] },
  saturday: { enabled: true, ranges: [{ start: "10:00", end: "15:00" }] },
  sunday: { enabled: false, ranges: [] },
}

const dayNames = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
}

export function AvailabilityManager() {
  const [schedule, setSchedule] = useState<WeeklySchedule>(defaultSchedule)
  const [bufferTime, setBufferTime] = useState("15")
  const [maxAdvanceBooking, setMaxAdvanceBooking] = useState("30")
  const [minAdvanceBooking, setMinAdvanceBooking] = useState("2")

  const updateDayEnabled = (day: string, enabled: boolean) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled,
        ranges: enabled ? (prev[day].ranges.length === 0 ? [{ start: "09:00", end: "17:00" }] : prev[day].ranges) : [],
      },
    }))
  }

  const updateTimeRange = (day: string, rangeIndex: number, field: "start" | "end", value: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        ranges: prev[day].ranges.map((range, index) => (index === rangeIndex ? { ...range, [field]: value } : range)),
      },
    }))
  }

  const addTimeRange = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        ranges: [...prev[day].ranges, { start: "09:00", end: "17:00" }],
      },
    }))
  }

  const removeTimeRange = (day: string, rangeIndex: number) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        ranges: prev[day].ranges.filter((_, index) => index !== rangeIndex),
      },
    }))
  }

  const copySchedule = (fromDay: string, toDay: string) => {
    setSchedule((prev) => ({
      ...prev,
      [toDay]: { ...prev[fromDay] },
    }))
  }

  const getTotalHours = () => {
    return Object.values(schedule).reduce((total, day) => {
      if (!day.enabled) return total

      return (
        total +
        day.ranges.reduce((dayTotal, range) => {
          const start = new Date(`2000-01-01T${range.start}:00`)
          const end = new Date(`2000-01-01T${range.end}:00`)
          return dayTotal + (end.getTime() - start.getTime()) / (1000 * 60 * 60)
        }, 0)
      )
    }, 0)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Availability Settings
          </CardTitle>
          <CardDescription>Configure your working hours and booking preferences</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="weekly" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="settings">Booking Settings</TabsTrigger>
          <TabsTrigger value="exceptions">Date Exceptions</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-6">
          {/* Summary Card */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{getTotalHours().toFixed(1)}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Hours per week</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {Object.values(schedule).filter((day) => day.enabled).length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Working days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {Math.floor(getTotalHours() * 2)}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Available slots (30min)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Schedule */}
          <div className="grid gap-4">
            {Object.entries(dayNames).map(([dayKey, dayName]) => (
              <Card key={dayKey}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={schedule[dayKey].enabled}
                        onCheckedChange={(enabled) => updateDayEnabled(dayKey, enabled)}
                      />
                      <Label className="text-lg font-medium">{dayName}</Label>
                      {schedule[dayKey].enabled && (
                        <Badge variant="secondary">
                          {schedule[dayKey].ranges.length} time range{schedule[dayKey].ranges.length !== 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>

                    {schedule[dayKey].enabled && (
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => addTimeRange(dayKey)}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add Range
                        </Button>

                        {/* Copy schedule dropdown would go here */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Simple copy to next day for demo
                            const days = Object.keys(dayNames)
                            const currentIndex = days.indexOf(dayKey)
                            const nextDay = days[(currentIndex + 1) % days.length]
                            copySchedule(dayKey, nextDay)
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {schedule[dayKey].enabled && (
                    <div className="space-y-3">
                      {schedule[dayKey].ranges.map((range, rangeIndex) => (
                        <div key={rangeIndex} className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Input
                              type="time"
                              value={range.start}
                              onChange={(e) => updateTimeRange(dayKey, rangeIndex, "start", e.target.value)}
                              className="w-32"
                            />
                            <span className="text-slate-500">to</span>
                            <Input
                              type="time"
                              value={range.end}
                              onChange={(e) => updateTimeRange(dayKey, rangeIndex, "end", e.target.value)}
                              className="w-32"
                            />
                          </div>

                          {schedule[dayKey].ranges.length > 1 && (
                            <Button variant="outline" size="sm" onClick={() => removeTimeRange(dayKey, rangeIndex)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {!schedule[dayKey].enabled && (
                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                      <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Not available on {dayName.toLowerCase()}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Preferences</CardTitle>
              <CardDescription>Configure how clients can book appointments with you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="buffer-time">Buffer time between appointments</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="buffer-time"
                      type="number"
                      value={bufferTime}
                      onChange={(e) => setBufferTime(e.target.value)}
                      className="w-20"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">minutes</span>
                  </div>
                  <p className="text-xs text-slate-500">Time between appointments for preparation</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-advance">Maximum advance booking</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="max-advance"
                      type="number"
                      value={maxAdvanceBooking}
                      onChange={(e) => setMaxAdvanceBooking(e.target.value)}
                      className="w-20"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">days</span>
                  </div>
                  <p className="text-xs text-slate-500">How far in advance clients can book</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min-advance">Minimum advance booking</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="min-advance"
                      type="number"
                      value={minAdvanceBooking}
                      onChange={(e) => setMinAdvanceBooking(e.target.value)}
                      className="w-20"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">hours</span>
                  </div>
                  <p className="text-xs text-slate-500">Minimum notice required for bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exceptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Date Exceptions</CardTitle>
              <CardDescription>Set specific dates when you're unavailable or have different hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No exceptions set</p>
                <p className="text-sm mb-4">Add holidays, vacations, or special hours</p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Exception
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Save Availability Settings
        </Button>
      </div>
    </div>
  )
}
