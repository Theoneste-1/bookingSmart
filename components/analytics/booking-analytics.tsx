"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, TrendingUp } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

const bookingsByDay = [
  { day: "Mon", bookings: 12, completed: 10, cancelled: 2 },
  { day: "Tue", bookings: 15, completed: 13, cancelled: 2 },
  { day: "Wed", bookings: 8, completed: 7, cancelled: 1 },
  { day: "Thu", bookings: 18, completed: 16, cancelled: 2 },
  { day: "Fri", bookings: 22, completed: 20, cancelled: 2 },
  { day: "Sat", bookings: 14, completed: 12, cancelled: 2 },
  { day: "Sun", bookings: 6, completed: 5, cancelled: 1 },
]

const bookingsByHour = [
  { hour: "8 AM", bookings: 2 },
  { hour: "9 AM", bookings: 5 },
  { hour: "10 AM", bookings: 8 },
  { hour: "11 AM", bookings: 12 },
  { hour: "12 PM", bookings: 6 },
  { hour: "1 PM", bookings: 4 },
  { hour: "2 PM", bookings: 10 },
  { hour: "3 PM", bookings: 15 },
  { hour: "4 PM", bookings: 12 },
  { hour: "5 PM", bookings: 8 },
  { hour: "6 PM", bookings: 3 },
]

const bookingsByService = [
  { name: "Initial Consultation", value: 35, color: "#3b82f6" },
  { name: "Follow-up", value: 28, color: "#10b981" },
  { name: "Assessment", value: 20, color: "#f59e0b" },
  { name: "Group Session", value: 12, color: "#8b5cf6" },
  { name: "Emergency", value: 5, color: "#ef4444" },
]

const bookingTrends = [
  { month: "Jan", bookings: 85, growth: 12.5 },
  { month: "Feb", bookings: 92, growth: 8.2 },
  { month: "Mar", bookings: 108, growth: 17.4 },
  { month: "Apr", bookings: 125, growth: 15.7 },
  { month: "May", bookings: 142, growth: 13.6 },
  { month: "Jun", bookings: 156, growth: 9.9 },
]

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"]

export function BookingAnalytics() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const totalBookings = bookingsByDay.reduce((sum, day) => sum + day.bookings, 0)
  const completedBookings = bookingsByDay.reduce((sum, day) => sum + day.completed, 0)
  const cancelledBookings = bookingsByDay.reduce((sum, day) => sum + day.cancelled, 0)
  const completionRate = ((completedBookings / totalBookings) * 100).toFixed(1)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
          <p className="font-medium text-slate-900 dark:text-white">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedBookings}</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">{completionRate}% completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <Clock className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cancelledBookings}</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {((cancelledBookings / totalBookings) * 100).toFixed(1)}% cancellation rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 PM</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">15 bookings</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="daily">Daily Pattern</TabsTrigger>
          <TabsTrigger value="hourly">Hourly Pattern</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Trends</CardTitle>
              <CardDescription>Monthly booking growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bookingTrends}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                    <XAxis dataKey="month" className="text-slate-600 dark:text-slate-300" fontSize={12} />
                    <YAxis className="text-slate-600 dark:text-slate-300" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Booking Pattern</CardTitle>
              <CardDescription>Bookings by day of the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bookingsByDay}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                    <XAxis dataKey="day" className="text-slate-600 dark:text-slate-300" fontSize={12} />
                    <YAxis className="text-slate-600 dark:text-slate-300" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="completed" stackId="a" fill="#10b981" />
                    <Bar dataKey="cancelled" stackId="a" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">Cancelled</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hourly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hourly Booking Distribution</CardTitle>
              <CardDescription>Peak hours and booking patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bookingsByHour}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                    <XAxis dataKey="hour" className="text-slate-600 dark:text-slate-300" fontSize={12} />
                    <YAxis className="text-slate-600 dark:text-slate-300" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="bookings" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-purple-100 text-purple-800">Peak Hours</Badge>
                  <span className="text-sm text-slate-600 dark:text-slate-300">2 PM - 4 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Low Hours</Badge>
                  <span className="text-sm text-slate-600 dark:text-slate-300">8 AM - 9 AM, 6 PM - 7 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bookings by Service Type</CardTitle>
              <CardDescription>Distribution of different service bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bookingsByService}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {bookingsByService.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  {bookingsByService.map((service, index) => (
                    <div key={service.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: service.color }} />
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{service.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-900 dark:text-white">{service.value}%</div>
                        <div className="text-xs text-slate-500">
                          {Math.round((service.value / 100) * totalBookings)} bookings
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
