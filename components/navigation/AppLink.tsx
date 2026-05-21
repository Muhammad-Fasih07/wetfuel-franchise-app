"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { useLoadingStore } from "../../store/loadingStore";

type AppLinkProps = ComponentProps<typeof Link>;

export function AppLink({ onClick, ...props }: AppLinkProps) {
  const start = useLoadingStore((s) => s.start);

  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (
          event.currentTarget.dataset.noGlobalLoading !== undefined ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        if (event.button !== 0) return;
        start();
      }}
    />
  );
}
