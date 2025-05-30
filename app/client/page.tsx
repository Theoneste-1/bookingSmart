'use client'
import { Suspense } from "react";
import Link from "next/link";
import {ClientLayout} from "../../components/layouts/ClientLayout";
import { useGetBookingsQuery } from "../../features/api/clientApi";
import {
  CalendarIcon,
  UserGroupIcon,
  StarIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  href,
  color,
}: {
  title: string;
  description: string;
  icon: any;
  href: string;
  color: string;
}) => (
  <Link
    href={href}
    className="block bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
  >
    <div className="p-5">
      <div className="flex items-center">
        <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  </Link>
);

const ClientDashboard = () => {
  const { data: bookings, isLoading, error } = useGetBookingsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading bookings</div>;
  }

  const upcomingBookings = bookings?.filter(
    (booking) =>
      booking.status === "CONFIRMED" && new Date(booking.date) > new Date()
  );

  return (
    <ClientLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <QuickActionCard
            title="Book a Service"
            description="Find and book a professional service"
            icon={UserGroupIcon}
            href="/client/professionals"
            color="bg-blue-500"
          />
          <QuickActionCard
            title="My Bookings"
            description="View and manage your bookings"
            icon={CalendarIcon}
            href="/client/bookings"
            color="bg-green-500"
          />
          <QuickActionCard
            title="My Reviews"
            description="View and write reviews"
            icon={StarIcon}
            href="/client/reviews"
            color="bg-yellow-500"
          />
          <QuickActionCard
            title="Payments"
            description="Manage your payment methods"
            icon={CreditCardIcon}
            href="/client/payments"
            color="bg-purple-500"
          />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Upcoming Bookings
          </h2>
          {upcomingBookings?.length === 0 ? (
            <p className="text-gray-500">No upcoming bookings</p>
          ) : (
            <div className="space-y-4">
              {upcomingBookings?.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Booking #{booking.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.date).toLocaleDateString()} at{" "}
                      {new Date(booking.startTime).toLocaleTimeString()}
                    </p>
                  </div>
                  <Link
                    href={`/client/bookings/${booking.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default function ClientDashboardPage() {
  return (
   <ClientDashboard/>
  );
}


/**
 * 
 * 
 * 
 * 
 * * */