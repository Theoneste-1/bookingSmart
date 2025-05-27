import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Award, Zap, Heart, Globe } from "lucide-react"
import Link from "next/link"

const values = [
  {
    icon: Users,
    title: "Customer First",
    description: "Every decision we make is guided by what's best for our users and their clients.",
  },
  {
    icon: Target,
    title: "Simplicity",
    description: "We believe powerful tools should be simple to use and understand.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we build and every service we provide.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We continuously innovate to stay ahead of industry needs and trends.",
  },
  {
    icon: Heart,
    title: "Empathy",
    description: "We understand the challenges of running a service business and build with empathy.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description: "We make professional tools accessible to businesses of all sizes worldwide.",
  },
]

const stats = [
  { label: "Active Professionals", value: "50,000+" },
  { label: "Bookings Processed", value: "10M+" },
  { label: "Countries Served", value: "150+" },
  { label: "Customer Satisfaction", value: "99.2%" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              About BookingSmart
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
              Empowering professionals to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                grow their business
              </span>
            </h1>
            <p className="mt-6 text-xl text-slate-600 dark:text-slate-300">
              We're on a mission to make professional service booking simple, efficient, and delightful for both service
              providers and their clients.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">{stat.value}</div>
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Our Story</h2>
              <div className="mt-6 space-y-6 text-lg text-slate-600 dark:text-slate-300">
                <p>
                  BookingSmart was born from a simple observation: talented professionals were spending too much time on
                  administrative tasks instead of focusing on what they do best.
                </p>
                <p>
                  Founded in 2020 by a team of entrepreneurs who had experienced these challenges firsthand, we set out
                  to create a platform that would streamline the entire booking process while providing powerful tools
                  for business growth.
                </p>
                <p>
                  Today, we're proud to serve over 50,000 professionals across 150 countries, processing millions of
                  bookings and helping businesses thrive in the digital age.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-slate-50 py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Our Values</h2>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
              These core values guide everything we do and every decision we make.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {values.map((value, index) => (
              <Card key={index} className="bg-white shadow-sm dark:bg-slate-800">
                <CardHeader>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 dark:text-slate-300">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Ready to join our community?
            </h2>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
              Start your free trial today and see why thousands of professionals trust BookingSmart.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
