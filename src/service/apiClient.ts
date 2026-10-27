import { API_BASE } from "./apiConfig";
import { logout } from "./authService";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (response.status === 401 && path !== "/auth/login") {
    await logout();
    window.location.href = "/login";
  }
  return response;
}
