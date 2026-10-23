import type { productType } from "../types/product";
import { API_BASE } from "./apiConfig";

export type CreateProductRequest = {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
};

export async function getProducts(): Promise<productType[]> {
  const response = await fetch(`${API_BASE}/products`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Could not fetch the products.");
  }

  const data = await response.json();

  return data;
}

export async function getProductById(id: string): Promise<productType> {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Could not get product");
  }
  const data = await response.json();

  return data;
}

export async function createProduct(
  product: CreateProductRequest,
): Promise<productType> {
  const response = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Could not create the product.");
  }

  const data = await response.json();

  return data;
}
