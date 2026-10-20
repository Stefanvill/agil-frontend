import { API_BASE } from "./apiConfig";
import { getToken, logout } from "./authService";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken(); // sessionStorage "access_token"
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (response.status === 401 && path !== "/auth/login") {
    logout();
    window.location.href = "/login";
  }
  return response;
}
