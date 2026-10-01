import ProductCard from "../components/ProductCard";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import type { productType } from "../types/product";

describe("ProductCard-tester", () => {
  it("visar produktens namn", () => {
    const product = {
      id: 1,
      name: "Laptop",
      description: "En kraftfull laptop",
      price: 2500,
      stock: 10,
    };

    render(<ProductCard product={product} onAdd={function (product: productType): void {
      throw new Error("Function not implemented.");
    } } />);

    expect(screen.getByRole("heading", { name: "Laptop" })).toBeInTheDocument();
  });

  it("visar produktens beskrivning", () => {
    const product = {
      id: 1,
      name: "Laptop",
      description: "En kraftfull laptop",
      price: 2500,
      stock: 10,
    };

    render(<ProductCard product={product} onAdd={function (product: productType): void {
      throw new Error("Function not implemented.");
    } } />);

    expect(screen.getByText("En kraftfull laptop")).toBeInTheDocument();
  });

  it("visar produktens pris", () => {
    const product = {
      id: 1,
      name: "Laptop",
      description: "En kraftfull laptop",
      price: 2500,
      stock: 10,
    };

    render(<ProductCard product={product} onAdd={function (product: productType): void {
      throw new Error("Function not implemented.");
    } } />);

    expect(screen.getByText("2500 kr")).toBeInTheDocument();
  });
});
