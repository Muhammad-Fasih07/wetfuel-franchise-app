"use client";

import { useEffect, useState } from "react";
import { Backdrop, CircularProgress, useTheme } from "@mui/material";
import {
  selectIsGlobalLoading,
  useLoadingStore,
} from "../../store/loadingStore";

export function GlobalLoadingOverlay() {
  const theme = useTheme();
  const count = useLoadingStore((s) => s.count);
  const visibleUntil = useLoadingStore((s) => s.visibleUntil);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (count > 0) return;
    const remaining = visibleUntil - Date.now();
    if (remaining <= 0) return;
    const id = window.setTimeout(() => setTick((t) => t + 1), remaining);
    return () => window.clearTimeout(id);
  }, [count, visibleUntil]);

  const open = useLoadingStore(selectIsGlobalLoading);

  return (
    <Backdrop
      open={open}
      aria-busy={open}
      aria-live="polite"
      sx={{
        zIndex: theme.zIndex.modal + 1,
        color: "#ffffff",
        backgroundColor: "rgba(17, 17, 19, 0.72)",
        backdropFilter: "blur(2px)",
      }}
    >
      <CircularProgress
        size={48}
        thickness={3.5}
        sx={{ color: "var(--primary-brand)" }}
      />
    </Backdrop>
  );
}
