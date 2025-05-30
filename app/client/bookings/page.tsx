'use client'
import { Suspense } from "react";
import Link from "next/link";
import { BookingStatus, useGetClientBookingsQuery } from "../../../features/api/bookingApi";
import { format } from "date-fns";
import { ClientLayout } from "@/components/layouts/ClientLayout";

const statusColors = {
  [BookingStatus.PENDING]: "bg-yellow-100 text-yellow-800",
  [BookingStatus.CONFIRMED]: "bg-green-100 text-green-800",
  [BookingStatus.CANCELLED]: "bg-red-100 text-red-800",
  [BookingStatus.COMPLETED]: "bg-blue-100 text-blue-800",
  [BookingStatus.NO_SHOW]: "bg-gray-100 text-gray-800",
};

const BookingCard = ({ booking }: { booking: any }) => (
  <div className="bg-white shadow rounded-lg p-6">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-medium text-gray-900">
          Booking #{booking.id}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {format(new Date(booking.date), "MMMM d, yyyy")} at{" "}
          {format(new Date(booking.startTime), "h:mm a")}
        </p>
      </div>
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusColors[booking.status as BookingStatus]
        }`}
      >
        {booking.status}
      </span>
    </div>

    <div className="mt-4 space-y-2">
      <p className="text-sm text-gray-500">
        <span className="font-medium">Service:</span> {booking.serviceName}
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-medium">Professional:</span>{" "}
        {booking.professionalName}
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-medium">Price:</span> ${booking.price}
      </p>
      {booking.notes && (
        <p className="text-sm text-gray-500">
          <span className="font-medium">Notes:</span> {booking.notes}
        </p>
      )}
    </div>

    <div className="mt-4 flex justify-end space-x-3">
      <Link
        href={`/client/bookings/${booking.id}`}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        View Details
      </Link>
      {booking.status === BookingStatus.PENDING && (
        <button
          onClick={() => {
            // Handle cancellation
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Cancel Booking
        </button>
      )}
    </div>
  </div>
);

const BookingsList = () => {
  const { data: bookings, isLoading, error } = useGetClientBookingsQuery();

  if (isLoading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div>Error loading bookings</div>;
  }

  const upcomingBookings = bookings?.filter(
    (booking) =>
      booking.status === BookingStatus.CONFIRMED &&
      new Date(booking.date) > new Date()
  );

  const pastBookings = bookings?.filter(
    (booking) =>
      booking.status === BookingStatus.COMPLETED ||
      new Date(booking.date) <= new Date()
  );

  return (
    <ClientLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              My Bookings
            </h1>
            <Link
              href="/client/book-service"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Book New Service
            </Link>
          </div>

          {upcomingBookings && upcomingBookings.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Upcoming Bookings
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          )}

          {pastBookings && pastBookings.length > 0 && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Past Bookings
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pastBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          )}

          {(!bookings || bookings.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500">No bookings found</p>
              <Link
                href="/client/book-service"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Book Your First Service
              </Link>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default function BookingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingsList />
    </Suspense>
  );
}
