import type { CreateOrderRequest } from "../types/order";
import { API_BASE } from "./apiConfig";

export const createOrder = async (order: CreateOrderRequest) => {
  const response = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
    credentials: "include",
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Can not create the order.");
  }

  const data = await response.json();

  return data;
};
