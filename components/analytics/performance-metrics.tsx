"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Star, Target, TrendingUp, CheckCircle } from "lucide-react"
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts"

const performanceMetrics = {
  responseTime: {
    current: 2.3,
    target: 3.0,
    trend: -0.2,
    status: "good",
  },
  satisfaction: {
    current: 4.7,
    target: 4.5,
    trend: 0.1,
    status: "excellent",
  },
  completion: {
    current: 94.2,
    target: 90.0,
    trend: 1.5,
    status: "excellent",
  },
  utilization: {
    current: 78.5,
    target: 80.0,
    trend: -1.2,
    status: "warning",
  },
}

const satisfactionData = [
  { period: "Jan", rating: 4.5, reviews: 45 },
  { period: "Feb", rating: 4.6, reviews: 52 },
  { period: "Mar", rating: 4.4, reviews: 48 },
  { period: "Apr", rating: 4.7, reviews: 61 },
  { period: "May", rating: 4.8, reviews: 58 },
  { period: "Jun", rating: 4.7, reviews: 64 },
]

const responseTimeData = [
  { hour: "8 AM", avgTime: 1.8, target: 3.0 },
  { hour: "10 AM", avgTime: 2.1, target: 3.0 },
  { hour: "12 PM", avgTime: 2.8, target: 3.0 },
  { hour: "2 PM", avgTime: 3.2, target: 3.0 },
  { hour: "4 PM", avgTime: 2.9, target: 3.0 },
  { hour: "6 PM", avgTime: 2.0, target: 3.0 },
]

const kpiData = [
  { name: "Response Time", value: 77, fill: "#3b82f6" },
  { name: "Satisfaction", value: 94, fill: "#10b981" },
  { name: "Completion", value: 94, fill: "#f59e0b" },
  { name: "Utilization", value: 79, fill: "#8b5cf6" },
]

const issuesData = [
  { type: "Late Responses", count: 12, severity: "medium", trend: -2 },
  { type: "Cancellations", count: 8, severity: "high", trend: 1 },
  { type: "No Shows", count: 15, severity: "medium", trend: -3 },
  { type: "Technical Issues", count: 3, severity: "low", trend: 0 },
]

export function PerformanceMetrics() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600 bg-green-100 dark:bg-green-900"
      case "good":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900"
      case "warning":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900"
      case "critical":
        return "text-red-600 bg-red-100 dark:bg-red-900"
      default:
        return "text-slate-600 bg-slate-100 dark:bg-slate-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-orange-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-slate-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* KPI Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.responseTime.current}h</div>
            <div className="flex items-center gap-2">
              <Progress
                value={(performanceMetrics.responseTime.current / performanceMetrics.responseTime.target) * 100}
                className="flex-1"
              />
              <Badge className={getStatusColor(performanceMetrics.responseTime.status)}>
                {performanceMetrics.responseTime.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Score</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.satisfaction.current}/5.0</div>
            <div className="flex items-center gap-2">
              <Progress value={(performanceMetrics.satisfaction.current / 5) * 100} className="flex-1" />
              <Badge className={getStatusColor(performanceMetrics.satisfaction.status)}>
                {performanceMetrics.satisfaction.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.completion.current}%</div>
            <div className="flex items-center gap-2">
              <Progress value={performanceMetrics.completion.current} className="flex-1" />
              <Badge className={getStatusColor(performanceMetrics.completion.status)}>
                {performanceMetrics.completion.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.utilization.current}%</div>
            <div className="flex items-center gap-2">
              <Progress value={performanceMetrics.utilization.current} className="flex-1" />
              <Badge className={getStatusColor(performanceMetrics.utilization.status)}>
                {performanceMetrics.utilization.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          <TabsTrigger value="response">Response Times</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Key performance indicators at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={kpiData}>
                    <RadialBar
                      minAngle={15}
                      label={{ position: "insideStart", fill: "#fff" }}
                      background
                      clockWise
                      dataKey="value"
                    />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {kpiData.map((kpi, index) => (
                  <div key={kpi.name} className="text-center">
                    <div className="text-2xl font-bold" style={{ color: kpi.fill }}>
                      {kpi.value}%
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">{kpi.name}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Satisfaction Trends</CardTitle>
              <CardDescription>Average ratings and review counts over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={satisfactionData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                    <XAxis dataKey="period" className="text-slate-600 dark:text-slate-300" fontSize={12} />
                    <YAxis domain={[4.0, 5.0]} className="text-slate-600 dark:text-slate-300" fontSize={12} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="rating"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">4.7</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Current Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">348</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Total Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+0.1</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Monthly Change</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="response" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Response Time Analysis</CardTitle>
              <CardDescription>Average response times throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                    <XAxis dataKey="hour" className="text-slate-600 dark:text-slate-300" fontSize={12} />
                    <YAxis className="text-slate-600 dark:text-slate-300" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="avgTime" fill="#3b82f6" />
                    <Line dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">Actual Response Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-1 bg-red-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">Target (3h)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Issues</CardTitle>
              <CardDescription>Current issues and their trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issuesData.map((issue, index) => (
                  <div
                    key={issue.type}
                    className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(issue.severity)}`} />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">{issue.type}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-300">Severity: {issue.severity}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">{issue.count}</div>
                      <div className="flex items-center gap-1">
                        {issue.trend > 0 ? (
                          <TrendingUp className="h-3 w-3 text-red-600" />
                        ) : issue.trend < 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-600 rotate-180" />
                        ) : (
                          <div className="h-3 w-3" />
                        )}
                        <span
                          className={`text-xs ${
                            issue.trend > 0 ? "text-red-600" : issue.trend < 0 ? "text-green-600" : "text-slate-500"
                          }`}
                        >
                          {issue.trend > 0 ? "+" : ""}
                          {issue.trend}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
