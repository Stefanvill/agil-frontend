import type { productType } from "../types/product";
import { getToken } from "./authService";

const API_URL = import.meta.env.VITE_API_PRODUCT_SERVICE_URL;

export async function getProducts(): Promise<productType[]> {
  const token = getToken();

  const response = await fetch(`${API_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
}
