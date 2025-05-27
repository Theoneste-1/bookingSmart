"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface RevenueData {
  period: string
  revenue: number
  bookings: number
  averageValue: number
  growth: number
}

const mockRevenueData: Record<string, RevenueData[]> = {
  "7d": [
    { period: "Mon", revenue: 450, bookings: 3, averageValue: 150, growth: 5.2 },
    { period: "Tue", revenue: 680, bookings: 4, averageValue: 170, growth: 8.1 },
    { period: "Wed", revenue: 320, bookings: 2, averageValue: 160, growth: -2.3 },
    { period: "Thu", revenue: 890, bookings: 6, averageValue: 148, growth: 12.4 },
    { period: "Fri", revenue: 1200, bookings: 8, averageValue: 150, growth: 15.6 },
    { period: "Sat", revenue: 750, bookings: 5, averageValue: 150, growth: 3.2 },
    { period: "Sun", revenue: 420, bookings: 3, averageValue: 140, growth: -1.8 },
  ],
  "30d": [
    { period: "Week 1", revenue: 3200, bookings: 22, averageValue: 145, growth: 8.5 },
    { period: "Week 2", revenue: 4100, bookings: 28, averageValue: 146, growth: 12.3 },
    { period: "Week 3", revenue: 3800, bookings: 25, averageValue: 152, growth: 6.7 },
    { period: "Week 4", revenue: 4500, bookings: 30, averageValue: 150, growth: 15.2 },
  ],
  "90d": [
    { period: "Month 1", revenue: 12500, bookings: 85, averageValue: 147, growth: 18.2 },
    { period: "Month 2", revenue: 15200, bookings: 102, averageValue: 149, growth: 21.6 },
    { period: "Month 3", revenue: 16800, bookings: 112, averageValue: 150, growth: 10.5 },
  ],
  "1y": [
    { period: "Q1", revenue: 35000, bookings: 240, averageValue: 146, growth: 25.3 },
    { period: "Q2", revenue: 42000, bookings: 280, averageValue: 150, growth: 20.0 },
    { period: "Q3", revenue: 48000, bookings: 320, averageValue: 150, growth: 14.3 },
    { period: "Q4", revenue: 52000, bookings: 347, averageValue: 150, growth: 8.3 },
  ],
}

export function RevenueChart() {
  const [timeRange, setTimeRange] = useState("30d")
  const data = mockRevenueData[timeRange]

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)
  const totalBookings = data.reduce((sum, item) => sum + item.bookings, 0)
  const averageGrowth = data.reduce((sum, item) => sum + item.growth, 0) / data.length

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
          <p className="font-medium text-slate-900 dark:text-white">{label}</p>
          <p className="text-green-600">Revenue: {formatCurrency(payload[0].value)}</p>
          <p className="text-blue-600">Bookings: {payload[0].payload.bookings}</p>
          <p className="text-purple-600">Avg Value: {formatCurrency(payload[0].payload.averageValue)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Revenue Analytics
            </CardTitle>
            <CardDescription>Track your revenue performance over time</CardDescription>
          </div>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(totalRevenue)}</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Total Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{totalBookings}</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Total Bookings</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{averageGrowth.toFixed(1)}%</span>
              {averageGrowth > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Avg Growth</div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="period" className="text-slate-600 dark:text-slate-300" fontSize={12} />
              <YAxis className="text-slate-600 dark:text-slate-300" fontSize={12} tickFormatter={formatCurrency} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Growth Indicators */}
        <div className="flex items-center gap-2 mt-4">
          {data.map((item, index) => (
            <Badge
              key={index}
              variant={item.growth > 0 ? "default" : "secondary"}
              className={item.growth > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
            >
              {item.period}: {item.growth > 0 ? "+" : ""}
              {item.growth.toFixed(1)}%
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
