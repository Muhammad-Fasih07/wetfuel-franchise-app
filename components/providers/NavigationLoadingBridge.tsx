"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoadingStore } from "../../store/loadingStore";

/**
 * Clears navigation-triggered loading when the route finishes changing.
 */
export function NavigationLoadingBridge() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stop = useLoadingStore((s) => s.stop);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    stop();
  }, [pathname, searchParams, stop]);

  return null;
}
