import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CreditCard, BarChart3, Users, Clock, Shield, Smartphone, Globe, Zap } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "AI-powered calendar that automatically optimizes your availability and prevents double bookings.",
    color: "bg-blue-500",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Integrated payment processing with Stripe. Accept cards, digital wallets, and bank transfers.",
    color: "bg-green-500",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Detailed insights into your business performance, revenue trends, and client behavior.",
    color: "bg-purple-500",
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Complete CRM system to manage client relationships, history, and preferences.",
    color: "bg-orange-500",
  },
  {
    icon: Clock,
    title: "Automated Reminders",
    description: "Smart notifications via email and SMS to reduce no-shows and keep everyone informed.",
    color: "bg-red-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption and GDPR compliance.",
    color: "bg-indigo-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Perfect experience on any device with our responsive design and mobile apps.",
    color: "bg-pink-500",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Support for 25+ languages and multiple time zones for global businesses.",
    color: "bg-teal-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with 99.9% uptime and sub-second response times.",
    color: "bg-yellow-500",
  },
]

export function Features() {
  return (
    <section className="py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Everything you need to grow your business
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Powerful features designed to help professionals manage their time, grow their client base, and increase
            revenue.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl dark:bg-slate-800/50 dark:hover:bg-slate-800"
            >
              <CardHeader>
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} text-white transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 dark:text-slate-300">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
