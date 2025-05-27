"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Star, Filter, Calendar } from "lucide-react"
import Link from "next/link"

const professionals = [
  {
    id: "1",
    name: "Dr. Sarah Wilson",
    title: "Licensed Therapist",
    specialties: ["Anxiety", "Depression", "Couples Therapy"],
    rating: 4.9,
    reviewCount: 127,
    location: "Downtown Medical Center",
    distance: "0.5 miles",
    avatar: "/placeholder.svg?height=80&width=80",
    priceRange: "$120 - $200",
    nextAvailable: "Today at 2:00 PM",
    verified: true,
  },
  {
    id: "2",
    name: "Mike Johnson",
    title: "Personal Trainer",
    specialties: ["Weight Loss", "Strength Training", "Nutrition"],
    rating: 4.8,
    reviewCount: 89,
    location: "FitLife Gym",
    distance: "1.2 miles",
    avatar: "/placeholder.svg?height=80&width=80",
    priceRange: "$60 - $100",
    nextAvailable: "Tomorrow at 9:00 AM",
    verified: true,
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    title: "Legal Consultant",
    specialties: ["Business Law", "Contract Review", "Startup Legal"],
    rating: 4.9,
    reviewCount: 156,
    location: "Rodriguez Law Firm",
    distance: "2.1 miles",
    avatar: "/placeholder.svg?height=80&width=80",
    priceRange: "$200 - $350",
    nextAvailable: "Jan 20 at 11:00 AM",
    verified: true,
  },
  {
    id: "4",
    name: "Dr. Michael Chen",
    title: "Optometrist",
    specialties: ["Eye Exams", "Contact Lenses", "Vision Therapy"],
    rating: 4.7,
    reviewCount: 203,
    location: "Vision Care Clinic",
    distance: "3.5 miles",
    avatar: "/placeholder.svg?height=80&width=80",
    priceRange: "$100 - $180",
    nextAvailable: "Jan 18 at 3:30 PM",
    verified: true,
  },
]

export function ProfessionalSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "healthcare", name: "Healthcare" },
    { id: "fitness", name: "Fitness & Wellness" },
    { id: "legal", name: "Legal Services" },
    { id: "beauty", name: "Beauty & Spa" },
    { id: "education", name: "Education & Tutoring" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Find Professionals</h1>
        <p className="text-slate-600 dark:text-slate-300">Discover and book appointments with verified professionals</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search by name, service, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <MapPin className="mr-2 h-4 w-4" />
                Near me
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid gap-6 md:grid-cols-2">
        {professionals.map((professional) => (
          <Card key={professional.id} className="overflow-hidden transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={professional.avatar || "/placeholder.svg"} alt={professional.name} />
                  <AvatarFallback>
                    {professional.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{professional.name}</h3>
                      <p className="text-slate-600 dark:text-slate-300">{professional.title}</p>
                    </div>
                    {professional.verified && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{professional.rating}</span>
                      <span className="text-sm text-slate-500">({professional.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {professional.specialties.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {professional.location} • {professional.distance}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        {professional.priceRange}
                      </div>
                      <div className="text-xs text-slate-500">Next: {professional.nextAvailable}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Link href={`/book/${professional.id}`}>
                          <Calendar className="mr-1 h-3 w-3" />
                          Book Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Professionals
        </Button>
      </div>
    </div>
  )
}
a