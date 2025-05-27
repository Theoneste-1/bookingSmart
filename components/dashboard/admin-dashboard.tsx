import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, DollarSign, Calendar, TrendingUp, AlertTriangle, Shield } from "lucide-react"

const platformStats = [
  {
    title: "Total Users",
    value: "12,543",
    change: "+8.2% from last month",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Monthly Revenue",
    value: "$89,420",
    change: "+15.3% from last month",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Total Bookings",
    value: "45,231",
    change: "+12.1% from last month",
    icon: Calendar,
    color: "text-purple-600",
  },
  {
    title: "Platform Growth",
    value: "23.4%",
    change: "Year over year",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "user_signup",
    message: "New professional registered: Dr. Sarah Johnson",
    time: "2 minutes ago",
    icon: Users,
  },
  {
    id: 2,
    type: "payment",
    message: "Payment processed: $150.00",
    time: "5 minutes ago",
    icon: DollarSign,
  },
  {
    id: 3,
    type: "booking",
    message: "New booking created by John Doe",
    time: "8 minutes ago",
    icon: Calendar,
  },
  {
    id: 4,
    type: "alert",
    message: "System maintenance scheduled for tonight",
    time: "1 hour ago",
    icon: AlertTriangle,
  },
]

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-300">Monitor and manage your platform performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {platformStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-slate-600 dark:text-slate-300">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform events and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    <activity.icon className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{activity.message}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
            <CardDescription>Manage platform operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <DollarSign className="mr-2 h-4 w-4" />
              Financial Reports
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Security Settings
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              Analytics Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
