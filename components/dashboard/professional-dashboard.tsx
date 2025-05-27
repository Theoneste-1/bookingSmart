import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Users, TrendingUp, Clock, Star } from "lucide-react"

const stats = [
  {
    title: "Today's Appointments",
    value: "8",
    change: "+2 from yesterday",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    title: "This Month's Revenue",
    value: "$4,250",
    change: "+12% from last month",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Total Clients",
    value: "156",
    change: "+8 new this month",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Average Rating",
    value: "4.9",
    change: "Based on 89 reviews",
    icon: Star,
    color: "text-yellow-600",
  },
]

const todayAppointments = [
  {
    id: 1,
    client: "John Doe",
    service: "Consultation",
    time: "9:00 AM",
    duration: "60 min",
    status: "confirmed",
  },
  {
    id: 2,
    client: "Sarah Wilson",
    service: "Follow-up",
    time: "11:30 AM",
    duration: "30 min",
    status: "confirmed",
  },
  {
    id: 3,
    client: "Mike Johnson",
    service: "Initial Assessment",
    time: "2:00 PM",
    duration: "90 min",
    status: "pending",
  },
  {
    id: 4,
    client: "Emma Rodriguez",
    service: "Consultation",
    time: "4:00 PM",
    duration: "60 min",
    status: "confirmed",
  },
]

export function ProfessionalDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Good morning, Dr. Wilson!</h1>
        <p className="text-slate-600 dark:text-slate-300">Here's your business overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
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
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>Your appointments for today</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View Calendar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">{appointment.client}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      {appointment.service} • {appointment.duration}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-slate-900 dark:text-white">{appointment.time}</div>
                    <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"} className="mt-1">
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your business efficiently</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Update Availability
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              View Client List
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <DollarSign className="mr-2 h-4 w-4" />
              Payment Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
