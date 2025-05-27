"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Download, RefreshCw } from "lucide-react"
import { RevenueChart } from "./revenue-chart"
import { BookingAnalytics } from "./booking-analytics"
import { UserGrowthChart } from "./user-growth-chart"
import { PerformanceMetrics } from "./performance-metrics"

interface AnalyticsDashboardProps {
  userRole?: "professional" | "admin" | "client"
}

export function AnalyticsDashboard({ userRole = "professional" }: AnalyticsDashboardProps) {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [dateRange, setDateRange] = useState("30d")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const handleExport = () => {
    // Simulate export functionality
    console.log("Exporting analytics data...")
  }

  // Quick stats based on user role
  const getQuickStats = () => {
    if (userRole === "admin") {
      return [
        { label: "Total Revenue", value: "$89,420", change: "+15.3%", icon: DollarSign, color: "text-green-600" },
        { label: "Total Users", value: "12,543", change: "+8.2%", icon: Users, color: "text-blue-600" },
        { label: "Total Bookings", value: "45,231", change: "+12.1%", icon: Calendar, color: "text-purple-600" },
        { label: "Platform Growth", value: "23.4%", change: "YoY", icon: TrendingUp, color: "text-orange-600" },
      ]
    } else if (userRole === "professional") {
      return [
        { label: "Monthly Revenue", value: "$4,250", change: "+12.5%", icon: DollarSign, color: "text-green-600" },
        { label: "Total Clients", value: "156", change: "+8", icon: Users, color: "text-blue-600" },
        { label: "This Month", value: "28", change: "+5", icon: Calendar, color: "text-purple-600" },
        { label: "Avg Rating", value: "4.9", change: "+0.1", icon: TrendingUp, color: "text-orange-600" },
      ]
    } else {
      return [
        { label: "Total Spent", value: "$1,250", change: "+$150", icon: DollarSign, color: "text-green-600" },
        { label: "Appointments", value: "24", change: "+3", icon: Calendar, color: "text-purple-600" },
        { label: "Providers", value: "5", change: "+1", icon: Users, color: "text-blue-600" },
        { label: "Satisfaction", value: "4.8", change: "+0.2", icon: TrendingUp, color: "text-orange-600" },
      ]
    }
  }

  const quickStats = getQuickStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-300">
            {userRole === "admin"
              ? "Platform-wide analytics and insights"
              : userRole === "professional"
                ? "Your business performance and insights"
                : "Your booking history and insights"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
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

          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-slate-600 dark:text-slate-300">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <RevenueChart />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Key Insights
                </CardTitle>
                <CardDescription>Important trends and highlights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div>
                    <div className="font-medium text-green-900 dark:text-green-100">Revenue Growth</div>
                    <div className="text-sm text-green-700 dark:text-green-300">15.3% increase this month</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div>
                    <div className="font-medium text-blue-900 dark:text-blue-100">User Engagement</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">74.5% retention rate</div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Good</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <div>
                    <div className="font-medium text-orange-900 dark:text-orange-100">Response Time</div>
                    <div className="text-sm text-orange-700 dark:text-orange-300">2.3h average response</div>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Needs Attention</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <RevenueChart />
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <BookingAnalytics />
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <UserGrowthChart />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <PerformanceMetrics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
