import type { productType } from "../types/product";

export const mockUser = {
  subject: "testuser",
  roles: ["USER"],
};

export const mockProducts: productType[] = [
  {
    id: 1,
    name: "Laptop",
    description: "Laptop",
    price: 10000,
    stock: 10,
    category: "Electronics",
    imageUrl: "",
  },
];
