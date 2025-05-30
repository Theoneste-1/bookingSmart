'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  StarIcon,
  CreditCardIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/client", icon: HomeIcon },
  { name: "My Bookings", href: "/client/bookings", icon: CalendarIcon },
  {
    name: "Find Professionals",
    href: "/client/professionals",
    icon: UserGroupIcon,
  },
  { name: "My Reviews", href: "/client/reviews", icon: StarIcon },
  { name: "Payments", href: "/client/payments", icon: CreditCardIcon },
  { name: "Settings", href: "/client/settings", icon: CogIcon },
];

const ClientSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-sm h-screen">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`mr-3 h-6 w-6 ${
                    isActive
                      ? "text-gray-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default ClientSidebar;
