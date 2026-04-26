"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Component that enforces login page on fresh browser tab
 * This ensures you always start at login page when opening the app in a new tab
 * Works in both development and production environments
 */
export function DevAuthCleaner() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
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
  }, [pathname, router]);

  return null;
}
