"use client";

import { useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLoadingStore } from "../../store/loadingStore";

export function useAppRouter() {
  const router = useRouter();
  const start = useLoadingStore((s) => s.start);
  const [, startTransition] = useTransition();

  const push = useCallback(
    (href: string, options?: Parameters<typeof router.push>[1]) => {
      start();
      startTransition(() => {
        router.push(href, options);
      });
    },
    [router, start, startTransition],
  );

  const replace = useCallback(
    (href: string, options?: Parameters<typeof router.replace>[1]) => {
      start();
      startTransition(() => {
        router.replace(href, options);
      });
    },
    [router, start, startTransition],
  );

  const back = useCallback(() => {
    start();
    startTransition(() => {
      router.back();
    });
  }, [router, start, startTransition]);

  return {
    ...router,
    push,
    replace,
    back,
  };
}
