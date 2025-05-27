import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Mail, Phone, Calendar, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const clients = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=40&width=40",
    totalBookings: 12,
    lastVisit: "2024-01-10",
    nextAppointment: "2024-01-20",
    status: "active",
    totalSpent: 1450,
    notes: "Prefers morning appointments",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1 (555) 987-6543",
    avatar: "/placeholder.svg?height=40&width=40",
    totalBookings: 8,
    lastVisit: "2024-01-08",
    nextAppointment: "2024-01-25",
    status: "active",
    totalSpent: 960,
    notes: "Allergic to latex",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1 (555) 456-7890",
    avatar: "/placeholder.svg?height=40&width=40",
    totalBookings: 15,
    lastVisit: "2024-01-05",
    nextAppointment: null,
    status: "inactive",
    totalSpent: 1800,
    notes: "Frequent cancellations",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "inactive":
      return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
  }
}

export function ClientManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Client Management</h1>
          <p className="text-slate-600 dark:text-slate-300">Manage your client relationships and history</p>
        </div>

        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input placeholder="Search clients..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{clients.length}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Total Clients</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {clients.filter((c) => c.status === "active").length}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Active Clients</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Clients ({clients.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({clients.filter((c) => c.status === "active").length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive ({clients.filter((c) => c.status === "inactive").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {clients.map((client) => (
            <Card key={client.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                      <AvatarFallback>
                        {client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{client.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {client.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {client.phone}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                        <span className="text-slate-600 dark:text-slate-300">{client.totalBookings} bookings</span>
                        <span className="text-slate-600 dark:text-slate-300">${client.totalSpent} total spent</span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                        <span>Last visit: {client.lastVisit}</span>
                        {client.nextAppointment && <span>Next: {client.nextAppointment}</span>}
                      </div>

                      {client.notes && (
                        <p className="text-sm text-slate-600 dark:text-slate-300 italic">Note: {client.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-1 h-3 w-3" />
                      Book
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {clients
            .filter((c) => c.status === "active")
            .map((client) => (
              <Card key={client.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                        <AvatarFallback>
                          {client.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-2">
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">{client.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                            <div className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {client.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {client.phone}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                          <span className="text-slate-600 dark:text-slate-300">{client.totalBookings} bookings</span>
                          <span className="text-slate-600 dark:text-slate-300">${client.totalSpent} total spent</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-1 h-3 w-3" />
                        Book
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuItem>View History</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          {clients
            .filter((c) => c.status === "inactive")
            .map((client) => (
              <Card key={client.id} className="opacity-75">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                        <AvatarFallback>
                          {client.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-2">
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">{client.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                            <div className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {client.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {client.phone}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                          <span className="text-slate-600 dark:text-slate-300">Last visit: {client.lastVisit}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Re-engage
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Send Follow-up</DropdownMenuItem>
                          <DropdownMenuItem>Archive Client</DropdownMenuItem>
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
