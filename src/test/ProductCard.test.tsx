import ProductCard from "../components/ProductCard";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

describe("ProductCard-tester", () => {
  it("visar produktens namn", () => {
    const product = {
      id: 1,
      name: "Laptop",
      description: "En kraftfull laptop",
      price: 2500,
      stock: 10,
    };

    const onAdd = vi.fn();

    render(<ProductCard product={product} onAdd={onAdd} />);

    expect(
      screen.getByRole("heading", { name: "Laptop" })
    ).toBeInTheDocument();
  });

  it("visar produktens beskrivning", () => {
    const product = {
      id: 1,
      name: "Laptop",
      description: "En kraftfull laptop",
      price: 2500,
      stock: 10,
    };

    const onAdd = vi.fn();

    render(<ProductCard product={product} onAdd={onAdd} />);

    expect(
      screen.getByText("En kraftfull laptop")
    ).toBeInTheDocument();
  });

  it("visar produktens pris", () => {
    const product = {
      id: 1,
      name: "Laptop",
      description: "En kraftfull laptop",
      price: 2500,
      stock: 10,
    };

    const onAdd = vi.fn();

    render(<ProductCard product={product} onAdd={onAdd} />);

    expect(screen.getByText("2500 kr")).toBeInTheDocument();
  });

  it("anropar onAdd med rätt produkt vid klick", () => {
    const product = {
      id: 1,
      name: "Laptop",
      description: "En kraftfull laptop",
      price: 2500,
      stock: 10,
    };

    const onAdd = vi.fn();

    render(<ProductCard product={product} onAdd={onAdd} />);

    fireEvent.click(screen.getByRole("button"));

    expect(onAdd).toHaveBeenCalledWith(product);
  });
});
 