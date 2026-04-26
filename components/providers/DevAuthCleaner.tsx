"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Development-only component that enforces login page on app start
 * This ensures you always start at login page in development mode
 */
export function DevAuthCleaner() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV === "development") {
      // Check if this is the first load in this tab
      const hasLoadedBefore = sessionStorage.getItem("app-loaded");
      
      if (!hasLoadedBefore) {
        // Clear auth token cookie
        document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        // Mark as loaded
        sessionStorage.setItem("app-loaded", "true");
        
        // If not already on login page, redirect
        if (!pathname.startsWith("/login") && !pathname.startsWith("/forgot-password")) {
          router.push("/login");
        }
      }
    }
  }, [pathname, router]);

  return null;
}
