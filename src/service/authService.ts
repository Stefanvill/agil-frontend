import type { LoginRequest, LoginResponse } from "../types/auth";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const TOKEN_KEY = "access_token";

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    if (response.status == 401 || response.status === 403) {
      throw new Error("Fel användarnamn eller lösenord");
    }
    throw new Error("Något gick fel");
  }

  const data: LoginResponse = await response.json();
  console.log(data);
  sessionStorage.setItem(TOKEN_KEY, data.token);
  sessionStorage.setItem("loginResponse", JSON.stringify(data));

  return data;
}

export function logout() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem("loginResponse");
}

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}

export function hasRole(requiredRole: string): boolean {
  const storedResponse = sessionStorage.getItem("loginResponse");

  if (storedResponse === null) {
    return false;
  }

  const loginResponse: LoginResponse = JSON.parse(storedResponse);

  return loginResponse.roles.includes(requiredRole);
}
