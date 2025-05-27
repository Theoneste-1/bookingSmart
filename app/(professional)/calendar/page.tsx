import { BookingCalendar } from "@/components/calendar/booking-calender";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Calendar</h1>
        <p className="text-slate-600 dark:text-slate-300">Manage your appointments and schedule</p>
      </div>

      <BookingCalendar />
    </div>
  )
}
