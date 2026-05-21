import { withGlobalLoading } from "../loading/withGlobalLoading";

export interface ApiFetchInit extends RequestInit {
  skipGlobalLoading?: boolean;
}

export async function apiFetch(
  input: RequestInfo | URL,
  init?: ApiFetchInit,
): Promise<Response> {
  const { skipGlobalLoading, ...fetchInit } = init ?? {};

  const run = () => fetch(input, fetchInit);

  if (skipGlobalLoading) {
    return run();
  }

  return withGlobalLoading(run);
}
