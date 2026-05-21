"use client";

import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { withGlobalLoading } from "../loading/withGlobalLoading";
import {
  selectIsGlobalLoading,
  useLoadingStore,
} from "../../store/loadingStore";

export function useGlobalLoading() {
  const { isLoading, start, stop } = useLoadingStore(
    useShallow((state) => ({
      isLoading: selectIsGlobalLoading(state),
      start: state.start,
      stop: state.stop,
    })),
  );

  const withLoading = useCallback(
    <T,>(fn: () => Promise<T>) => withGlobalLoading(fn),
    [],
  );

  return { isLoading, withLoading, start, stop };
}
