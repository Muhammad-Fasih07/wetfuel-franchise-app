"use client";

import { useCallback, useRef } from "react";
import { withGlobalLoading } from "../loading/withGlobalLoading";

type AsyncFn = () => void | Promise<void>;

export function useAsyncAction(fn: AsyncFn) {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  return useCallback(async () => {
    const result = fnRef.current();
    if (result instanceof Promise) {
      await withGlobalLoading(() => result);
    }
  }, []);
}
