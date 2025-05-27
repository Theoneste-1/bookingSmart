"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  trend?: "up" | "down" | "neutral"
  icon?: React.ComponentType<{ className?: string }>
  description?: string
}

export function MetricCard({ title, value, change, trend, icon: Icon, description }: MetricCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-slate-600"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3" />
      case "down":
        return <TrendingDown className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-slate-600" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className={`flex items-center gap-1 text-xs ${getTrendColor()}`}>
            {getTrendIcon()}
            {change}
          </div>
        )}
        {description && <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{description}</p>}
      </CardContent>
    </Card>
  )
}

interface ChartContainerProps {
  title: string
  description?: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export function ChartContainer({ title, description, children, actions }: ChartContainerProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {actions}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

interface DataPointProps {
  label: string
  value: string | number
  color?: string
  percentage?: number
}

export function DataPoint({ label, value, color = "#3b82f6", percentage }: DataPointProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
        <span className="text-sm font-medium text-slate-900 dark:text-white">{label}</span>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium text-slate-900 dark:text-white">{value}</div>
        {percentage !== undefined && <div className="text-xs text-slate-500">{percentage}%</div>}
      </div>
    </div>
  )
}
