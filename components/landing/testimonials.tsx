import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fitness Trainer",
    company: "FitLife Studio",
    content:
      "This platform transformed my business. I went from managing bookings on paper to having a fully automated system. My revenue increased by 40% in just 3 months!",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Dr. Michael Chen",
    role: "Dentist",
    company: "Chen Dental Clinic",
    content:
      "The automated reminders alone have reduced our no-shows by 60%. The analytics help us understand our busiest times and optimize our schedule.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Emma Rodriguez",
    role: "Legal Consultant",
    company: "Rodriguez Law",
    content:
      "Professional, reliable, and easy to use. My clients love the convenience of online booking, and I love the time it saves me on administrative tasks.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "James Wilson",
    role: "Hair Stylist",
    company: "Wilson Salon",
    content:
      "The payment integration is seamless. Clients can book and pay in advance, which has improved our cash flow significantly. Highly recommend!",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Lisa Thompson",
    role: "Massage Therapist",
    company: "Zen Wellness",
    content:
      "I was skeptical about switching from my old system, but the migration was smooth and the support team was incredible. Best decision I made for my business.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "David Park",
    role: "Business Coach",
    company: "Park Consulting",
    content:
      "The client management features are outstanding. I can track client history, preferences, and progress all in one place. It has made me much more organized.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function Testimonials() {
  return (
    <section className="bg-slate-50 py-24 dark:bg-slate-900 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Loved by professionals worldwide
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Join thousands of professionals who have transformed their businesses with our platform.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-slate-800"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-slate-600 dark:text-slate-300 mb-6">"{testimonial.content}"</blockquote>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700"
                  />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
