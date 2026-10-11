import ProductCard from "../components/ProductCard";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";

describe("ProductCard tests", () => {
  it("shows the product name", () => {
    const product = {
      id: 1,
      name: "Laptop",
      description: "A powerful laptop",
      price: 2500,
      stock: 10,
      category: "Laptop",
      imageUrl: "https://example.com/laptop.jpg",
    };

    const onAdd = vi.fn();

    render(
      <MemoryRouter>
        <ProductCard product={product} onAdd={onAdd} />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Laptop" })).toBeInTheDocument();
  });

  it("shows the product description", () => {
    const product = {
      id: 1,
      name: "Laptop",
      description: "A powerful laptop",
      price: 2500,
      stock: 10,
      category: "Laptop",
      imageUrl: "https://example.com/laptop.jpg",
    };

    const onAdd = vi.fn();

    render(
      <MemoryRouter>
        <ProductCard product={product} onAdd={onAdd} />
      </MemoryRouter>
    );

    expect(screen.getByText("A powerful laptop")).toBeInTheDocument();
  });

  it("shows the product price", () => {
    const product = {
      id: 1,
      name: "Laptop",
      description: "A powerful laptop",
      price: 2500,
      stock: 10,
      category: "Laptop",
      imageUrl: "https://example.com/laptop.jpg",
    };

    const onAdd = vi.fn();

    render(
      <MemoryRouter>
        <ProductCard product={product} onAdd={onAdd} />
      </MemoryRouter>
    );

    expect(screen.getByText("2500 kr")).toBeInTheDocument();
  });

  it("calls onAdd with the correct product on click", () => {
    const product = {
      id: 1,
      name: "Laptop",
      description: "A powerful laptop",
      price: 2500,
      stock: 10,
      category: "Laptop",
      imageUrl: "https://example.com/laptop.jpg",
    };

    const onAdd = vi.fn();

    render(
      <MemoryRouter>
        <ProductCard product={product} onAdd={onAdd} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onAdd).toHaveBeenCalledWith(product);
  });
});
