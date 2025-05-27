import { ActivityFeed } from "@/components/realtime/activity-feed"
import { LiveBookingUpdates } from "@/components/realtime/live-booking-updates"

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Activity Center</h1>
        <p className="text-slate-600 dark:text-slate-300">Real-time updates and activity monitoring</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <LiveBookingUpdates />
        <ActivityFeed />
      </div>
    </div>
  )
}
