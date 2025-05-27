import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Phone, Mail, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const upcomingBookings = [
  {
    id: "1",
    professional: "Dr. Sarah Wilson",
    service: "Dental Checkup",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: 60,
    status: "confirmed",
    location: "Downtown Medical Center",
    phone: "+1 (555) 123-4567",
    email: "sarah@medicalcenter.com",
    avatar: "/placeholder.svg?height=40&width=40",
    price: 150,
  },
  {
    id: "2",
    professional: "Mike Johnson",
    service: "Personal Training",
    date: "2024-01-16",
    time: "2:00 PM",
    duration: 45,
    status: "pending",
    location: "FitLife Gym",
    phone: "+1 (555) 987-6543",
    email: "mike@fitlifegym.com",
    avatar: "/placeholder.svg?height=40&width=40",
    price: 80,
  },
  {
    id: "3",
    professional: "Emma Rodriguez",
    service: "Legal Consultation",
    date: "2024-01-18",
    time: "11:30 AM",
    duration: 90,
    status: "confirmed",
    location: "Rodriguez Law Firm",
    phone: "+1 (555) 456-7890",
    email: "emma@rodriguezlaw.com",
    avatar: "/placeholder.svg?height=40&width=40",
    price: 200,
  },
]

const pastBookings = [
  {
    id: "4",
    professional: "Dr. Michael Chen",
    service: "Eye Examination",
    date: "2024-01-10",
    time: "9:00 AM",
    duration: 30,
    status: "completed",
    location: "Vision Care Clinic",
    phone: "+1 (555) 234-5678",
    email: "michael@visioncare.com",
    avatar: "/placeholder.svg?height=40&width=40",
    price: 120,
  },
  {
    id: "5",
    professional: "Lisa Thompson",
    service: "Massage Therapy",
    date: "2024-01-08",
    time: "3:00 PM",
    duration: 60,
    status: "completed",
    location: "Zen Wellness Spa",
    phone: "+1 (555) 345-6789",
    email: "lisa@zenwellness.com",
    avatar: "/placeholder.svg?height=40&width=40",
    price: 100,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "completed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
  }
}

export function ClientBookings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Bookings</h1>
        <p className="text-slate-600 dark:text-slate-300">Manage your appointments and booking history</p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingBookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <img
                      src={booking.avatar || "/placeholder.svg"}
                      alt={booking.professional}
                      className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700"
                    />

                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{booking.professional}</h3>
                        <p className="text-slate-600 dark:text-slate-300">{booking.service}</p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {booking.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {booking.time} ({booking.duration} min)
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {booking.location}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {booking.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {booking.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-lg font-semibold text-slate-900 dark:text-white">${booking.price}</div>
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem>Contact Professional</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Cancel Booking</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastBookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden opacity-75">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <img
                      src={booking.avatar || "/placeholder.svg"}
                      alt={booking.professional}
                      className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700"
                    />

                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{booking.professional}</h3>
                        <p className="text-slate-600 dark:text-slate-300">{booking.service}</p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {booking.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {booking.time} ({booking.duration} min)
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {booking.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-lg font-semibold text-slate-900 dark:text-white">${booking.price}</div>
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Book Again</DropdownMenuItem>
                        <DropdownMenuItem>Leave Review</DropdownMenuItem>
                        <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
