import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Plus, ArrowRight } from "lucide-react"

const upcomingAppointments = [
  {
    id: 1,
    professional: "Dr. Sarah Wilson",
    service: "Dental Checkup",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    professional: "Mike Johnson",
    service: "Personal Training",
    date: "2024-01-16",
    time: "2:00 PM",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    professional: "Emma Rodriguez",
    service: "Legal Consultation",
    date: "2024-01-18",
    time: "11:30 AM",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const quickActions = [
  {
    title: "Find Professionals",
    description: "Search for service providers in your area",
    icon: User,
    href: "/search",
    color: "bg-blue-500",
  },
  {
    title: "Book Appointment",
    description: "Schedule a new appointment",
    icon: Plus,
    href: "/search",
    color: "bg-green-500",
  },
  {
    title: "View Calendar",
    description: "See all your upcoming appointments",
    icon: Calendar,
    href: "/bookings",
    color: "bg-purple-500",
  },
]

export function ClientDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, John!</h1>
        <p className="text-slate-600 dark:text-slate-300">Here's what's happening with your appointments.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-3">
        {quickActions.map((action, index) => (
          <Card key={index} className="group cursor-pointer transition-all hover:shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${action.color} text-white`}
                >
                  <action.icon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="ghost"
                className="w-full justify-between group-hover:bg-slate-50 dark:group-hover:bg-slate-800"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Appointments
              </CardTitle>
              <CardDescription>Your next scheduled appointments</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={appointment.avatar || "/placeholder.svg"}
                    alt={appointment.professional}
                    className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700"
                  />
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">{appointment.professional}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">{appointment.service}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-slate-900 dark:text-white">
                    {appointment.date} at {appointment.time}
                  </div>
                  <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"} className="mt-1">
                    {appointment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
