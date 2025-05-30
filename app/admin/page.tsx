import { Suspense } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { useGetDashboardStatsQuery } from "../../features/api/adminApi";
import {
  ChartBarIcon,
  UsersIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: any;
  color: string;
}) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd className="text-lg font-semibold text-gray-900">{value}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { data: stats, isLoading, error } = useGetDashboardStatsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading dashboard stats</div>;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon={UsersIcon}
            color="bg-blue-500"
          />
          <StatCard
            title="Total Professionals"
            value={stats?.totalProfessionals || 0}
            icon={UsersIcon}
            color="bg-green-500"
          />
          <StatCard
            title="Total Bookings"
            value={stats?.totalBookings || 0}
            icon={CalendarIcon}
            color="bg-yellow-500"
          />
          <StatCard
            title="Total Revenue"
            value={`$${stats?.totalRevenue.toFixed(2) || 0}`}
            icon={CurrencyDollarIcon}
            color="bg-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Recent Bookings
            </h2>
            <div className="space-y-4">
              {stats?.recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Booking #{booking.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      booking.status === "CONFIRMED"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Recent Reviews
            </h2>
            <div className="space-y-4">
              {stats?.recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Review #{review.id}
                    </p>
                    <p className="text-sm text-gray-500">{review.comment}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600">
                      {review.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}
