import { useLoadingStore } from "../../store/loadingStore";

export async function withGlobalLoading<T>(
  fn: () => Promise<T>,
): Promise<T> {
  const { start, stop } = useLoadingStore.getState();
  start();
  try {
    return await fn();
  } finally {
    stop();
  }
}
