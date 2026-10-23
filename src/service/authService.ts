import type { LoginRequest, LoginResponse } from "../types/auth";
import { API_BASE } from "./apiConfig";

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("Wrong username or password");
    }
    throw new Error("Something went wrong");
  }

  const data: LoginResponse = await response.json();
  sessionStorage.setItem("loginResponse", JSON.stringify(data));

  return data;
}

export async function logout(): Promise<void> {
  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } finally {
    sessionStorage.removeItem("loginResponse");
    sessionStorage.removeItem("username");
  }
}

export async function restoreSession(): Promise<LoginResponse | null> {
  const response = await fetch(`${API_BASE}/auth/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    sessionStorage.removeItem("loginResponse");
    return null;
  }

  const data: LoginResponse = await response.json();

  sessionStorage.setItem("loginResponse", JSON.stringify(data));

  return data as LoginResponse;
}
