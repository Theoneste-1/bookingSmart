"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingUp, Calendar, CreditCard, Download, ArrowUpRight } from "lucide-react"

interface EarningsData {
  period: string
  revenue: number
  bookings: number
  averageBookingValue: number
  growth: number
}

interface Transaction {
  id: string
  date: string
  client: string
  service: string
  amount: number
  status: "completed" | "pending" | "failed"
  paymentMethod: string
}

const mockEarningsData: EarningsData[] = [
  {
    period: "This Month",
    revenue: 4250,
    bookings: 28,
    averageBookingValue: 151.79,
    growth: 12.5,
  },
  {
    period: "Last Month",
    revenue: 3780,
    bookings: 25,
    averageBookingValue: 151.2,
    growth: 8.3,
  },
  {
    period: "This Year",
    revenue: 48600,
    bookings: 324,
    averageBookingValue: 150,
    growth: 23.1,
  },
]

const mockTransactions: Transaction[] = [
  {
    id: "txn_001",
    date: "2024-01-15",
    client: "John Doe",
    service: "Initial Consultation",
    amount: 150,
    status: "completed",
    paymentMethod: "Visa •••• 4242",
  },
  {
    id: "txn_002",
    date: "2024-01-14",
    client: "Sarah Wilson",
    service: "Follow-up Session",
    amount: 120,
    status: "completed",
    paymentMethod: "Mastercard •••• 5555",
  },
  {
    id: "txn_003",
    date: "2024-01-13",
    client: "Mike Johnson",
    service: "Group Session",
    amount: 80,
    status: "pending",
    paymentMethod: "Apple Pay",
  },
  {
    id: "txn_004",
    date: "2024-01-12",
    client: "Emma Rodriguez",
    service: "Assessment",
    amount: 200,
    status: "completed",
    paymentMethod: "Visa •••• 1234",
  },
]

export function EarningsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month")
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)

  const currentData = mockEarningsData.find((data) => data.period === selectedPeriod) || mockEarningsData[0]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Earnings</h1>
          <p className="text-slate-600 dark:text-slate-300">Track your revenue and payment history</p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="This Month">This Month</SelectItem>
              <SelectItem value="Last Month">Last Month</SelectItem>
              <SelectItem value="This Year">This Year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(currentData.revenue)}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="mr-1 h-3 w-3" />+{currentData.growth}% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.bookings}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Completed appointments</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Booking Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(currentData.averageBookingValue)}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Per appointment</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <CreditCard className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(850)}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Available in 2 days</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                        <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>

                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">{transaction.client}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-300">{transaction.service}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-medium text-slate-900 dark:text-white">
                        {formatCurrency(transaction.amount)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                        <span className="text-xs text-slate-500">{formatDate(transaction.date)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payout Schedule</CardTitle>
              <CardDescription>Your upcoming and past payouts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                      <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">Weekly Payout</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">Bank Account •••• 1234</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-slate-900 dark:text-white">{formatCurrency(850)}</div>
                    <div className="text-xs text-slate-500">Jan 19, 2024</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                      <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">Weekly Payout</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">Bank Account •••• 1234</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-slate-900 dark:text-white">{formatCurrency(1200)}</div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Paid</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Detailed breakdown of your earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Analytics Coming Soon</p>
                <p className="text-sm">Detailed charts and insights will be available here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
