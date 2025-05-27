"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, UserCheck, TrendingUp } from "lucide-react"
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ComposedChart,
  Line,
  LineChart,
} from "recharts"

const userGrowthData = {
  "30d": [
    { period: "Week 1", totalUsers: 1250, newUsers: 45, activeUsers: 890, retention: 71.2 },
    { period: "Week 2", totalUsers: 1295, newUsers: 52, activeUsers: 920, retention: 73.1 },
    { period: "Week 3", totalUsers: 1347, newUsers: 48, activeUsers: 945, retention: 70.2 },
    { period: "Week 4", totalUsers: 1395, newUsers: 55, activeUsers: 980, retention: 74.5 },
  ],
  "90d": [
    { period: "Month 1", totalUsers: 1100, newUsers: 180, activeUsers: 780, retention: 70.9 },
    { period: "Month 2", totalUsers: 1280, newUsers: 195, activeUsers: 890, retention: 72.3 },
    { period: "Month 3", totalUsers: 1395, newUsers: 210, activeUsers: 980, retention: 74.5 },
  ],
  "1y": [
    { period: "Q1", totalUsers: 850, newUsers: 420, activeUsers: 600, retention: 70.6 },
    { period: "Q2", totalUsers: 1100, newUsers: 380, activeUsers: 780, retention: 70.9 },
    { period: "Q3", totalUsers: 1280, newUsers: 350, activeUsers: 890, retention: 72.3 },
    { period: "Q4", totalUsers: 1395, newUsers: 320, activeUsers: 980, retention: 74.5 },
  ],
}

const userTypeData = [
  { type: "Clients", count: 856, percentage: 61.4, growth: 12.5 },
  { type: "Professionals", count: 342, percentage: 24.5, growth: 8.3 },
  { type: "Admins", count: 197, percentage: 14.1, growth: 15.2 },
]

const cohortData = [
  { cohort: "Jan 2024", week1: 100, week2: 85, week3: 72, week4: 68, week8: 58, week12: 52 },
  { cohort: "Feb 2024", week1: 100, week2: 88, week3: 75, week4: 71, week8: 62, week12: 55 },
  { cohort: "Mar 2024", week1: 100, week2: 90, week3: 78, week4: 74, week8: 65, week12: 58 },
  { cohort: "Apr 2024", week1: 100, week2: 92, week3: 80, week4: 76, week8: 68, week12: 61 },
]

export function UserGrowthChart() {
  const [timeRange, setTimeRange] = useState("90d")
  const [viewType, setViewType] = useState("growth")

  const data = userGrowthData[timeRange as keyof typeof userGrowthData]
  const currentPeriod = data[data.length - 1]
  const previousPeriod = data[data.length - 2]

  const userGrowthRate = previousPeriod
    ? (((currentPeriod.totalUsers - previousPeriod.totalUsers) / previousPeriod.totalUsers) * 100).toFixed(1)
    : "0"

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
          <p className="font-medium text-slate-900 dark:text-white">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.dataKey === "retention" && "%"}
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
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentPeriod.totalUsers.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />+{userGrowthRate}% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <UserPlus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentPeriod.newUsers}</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">This period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentPeriod.activeUsers}</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {((currentPeriod.activeUsers / currentPeriod.totalUsers) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentPeriod.retention}%</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">12-week retention</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30d">30 Days</SelectItem>
            <SelectItem value="90d">90 Days</SelectItem>
            <SelectItem value="1y">1 Year</SelectItem>
          </SelectContent>
        </Select>

        <Select value={viewType} onValueChange={setViewType}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="growth">User Growth</SelectItem>
            <SelectItem value="types">User Types</SelectItem>
            <SelectItem value="cohort">Cohort Analysis</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Charts */}
      {viewType === "growth" && (
        <Card>
          <CardHeader>
            <CardTitle>User Growth Over Time</CardTitle>
            <CardDescription>Total users, new acquisitions, and active users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis dataKey="period" className="text-slate-600 dark:text-slate-300" fontSize={12} />
                  <YAxis className="text-slate-600 dark:text-slate-300" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="totalUsers"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                  <Bar dataKey="newUsers" fill="#10b981" />
                  <Line
                    type="monotone"
                    dataKey="activeUsers"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded" />
                <span className="text-sm text-slate-600 dark:text-slate-300">Total Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded" />
                <span className="text-sm text-slate-600 dark:text-slate-300">New Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded" />
                <span className="text-sm text-slate-600 dark:text-slate-300">Active Users</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {viewType === "types" && (
        <Card>
          <CardHeader>
            <CardTitle>User Distribution by Type</CardTitle>
            <CardDescription>Breakdown of different user categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userTypeData.map((userType, index) => (
                <div
                  key={userType.type}
                  className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-4 h-4 rounded ${
                        index === 0 ? "bg-blue-500" : index === 1 ? "bg-green-500" : "bg-purple-500"
                      }`}
                    />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">{userType.type}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        {userType.percentage}% of total users
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {userType.count.toLocaleString()}
                    </div>
                    <Badge variant={userType.growth > 10 ? "default" : "secondary"}>+{userType.growth}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {viewType === "cohort" && (
        <Card>
          <CardHeader>
            <CardTitle>Cohort Retention Analysis</CardTitle>
            <CardDescription>User retention rates by signup cohort</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cohortData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis dataKey="cohort" className="text-slate-600 dark:text-slate-300" fontSize={12} />
                  <YAxis className="text-slate-600 dark:text-slate-300" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="week1" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="week4" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="week8" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="week12" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="text-center">
                <div className="text-sm font-medium text-blue-600">Week 1</div>
                <div className="text-xs text-slate-500">100% baseline</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-green-600">Week 4</div>
                <div className="text-xs text-slate-500">~76% retained</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-orange-600">Week 8</div>
                <div className="text-xs text-slate-500">~68% retained</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-red-600">Week 12</div>
                <div className="text-xs text-slate-500">~61% retained</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
