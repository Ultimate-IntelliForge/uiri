const API_BASE = process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:4000";

function getCsrfToken(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/csrf_token=([^;]+)/);
  return match?.[1] ?? "";
}

type FetchOptions = RequestInit & { skipCsrf?: boolean };

export async function apiClient<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { skipCsrf, headers = {}, ...rest } = options;
  const isMutation = ["POST", "PUT", "PATCH", "DELETE"].includes(
    (rest.method ?? "GET").toUpperCase(),
  );

  const response = await fetch(`${API_BASE}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(isMutation && !skipCsrf ? { "X-CSRF-Token": getCsrfToken() } : {}),
      ...(headers as Record<string, string>),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error((error as { message?: string }).message ?? "Request failed");
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
