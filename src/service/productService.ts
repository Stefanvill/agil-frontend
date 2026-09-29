import type { productType } from "../types/product";
import { getToken } from "./authService";

const API_URL = import.meta.env.VITE_API_PRODUCT_SERVICE_URL;

export async function getProducts(): Promise<productType[]> {
  const token = getToken();
  console.log(token);
  const response = await fetch(`${API_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Kunde inte hämta produkterna.");
  }

  const data = await response.json();

  return data;
}
