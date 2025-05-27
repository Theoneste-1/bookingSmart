import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/50 px-3 py-1 text-sm font-medium text-slate-600 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300">
                <TrendingUp className="mr-2 h-4 w-4" />
                Trusted by 10,000+ professionals
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
                Smart Booking
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Made Simple
                </span>
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-300 sm:text-2xl">
                The all-in-one platform for professionals to manage appointments, grow their business, and delight their
                clients.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/demo">Watch Demo</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">99.9%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">50M+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">150+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Countries</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative mx-auto aspect-square max-w-lg">
              {/* Floating Cards */}
              <div className="absolute inset-0">
                {/* Calendar Card */}
                <div className="absolute left-4 top-8 w-64 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Today's Schedule</div>
                      <div className="text-sm text-slate-500">8 appointments</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">9:00 AM - John Doe</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">11:30 AM - Sarah Wilson</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">2:00 PM - Mike Johnson</span>
                    </div>
                  </div>
                </div>

                {/* Analytics Card */}
                <div className="absolute bottom-8 right-4 w-56 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900">
                      <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Revenue</div>
                      <div className="text-sm text-slate-500">This month</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">$12,450</div>
                    <div className="text-sm text-green-600">+23% from last month</div>
                  </div>
                </div>

                {/* Clients Card */}
                <div className="absolute right-8 top-16 w-48 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Recent Clients</span>
                  </div>
                  <div className="mt-3 flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-purple-500 dark:border-slate-800"
                      />
                    ))}
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-700 dark:text-slate-300">
                      +12
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
