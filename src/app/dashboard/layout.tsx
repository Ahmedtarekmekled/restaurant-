"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and not logged in, redirect to login
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-amber-600" />
          <p className="text-amber-800 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // If not logged in, we'll redirect (handled by the useEffect)
  // So only render children if logged in
  if (!isLoggedIn) {
    return null;
  }

  // If logged in, render the dashboard
  return <>{children}</>;
}
