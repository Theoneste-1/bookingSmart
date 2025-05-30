'use client'
import { useAuth } from "@/features/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    // console.log("theoneste is authed")
  const { isAuthenticated, loading, checkAuth } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    console.log("is authed", isAuthenticated)
    // First, check authentication via context
    if (!loading && !isAuthenticated) {
      // Double-check directly with localStorage as a fallback
      const isAuthFromStorage = checkAuth();

      if (!isAuthFromStorage) {
        setIsRedirecting(true);
        // Add a small delay before redirecting to avoid flash of content
        const redirectTimer = setTimeout(() => {
          router.push("/login");
        }, 100);

        return () => clearTimeout(redirectTimer);
      }
    }
  }, [isAuthenticated, loading, router, checkAuth]);

  // Don't show loading indicator if we're going to redirect anyway
  if (loading && !isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated && !checkAuth()) {
    return null;
  }

  return <>{children}</>

}