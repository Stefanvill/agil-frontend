import type { productType } from "../types/product";
import { getToken } from "./authService";

const API_URL = import.meta.env.VITE_API_PRODUCT_SERVICE_URL;

export type CreateProductRequest = {
  name: string;
  description: string;
  price: number;
  stock: number;
};

export async function getProducts(): Promise<productType[]> {
  const token = getToken();

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

export async function createProduct(
  product: CreateProductRequest
): Promise<productType> {
  const token = getToken();

  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Kunde inte skapa produkten.");
  }

  const data = await response.json();

  return data;
}