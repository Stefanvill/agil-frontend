import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getProducts } from "../service/productService";
import type { productType } from "../types/product";
import ProductCard from "../components/ProductCard";

export function AdminPage() {
  const [products, setProducts] = useState<productType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleAdd = (product: productType) => {
    console.log("Product added to cart:", product.name);
  };

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError("Could not load the products.");
      }
    }

    loadProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>

      <button onClick={() => navigate("/admin/product")}>
        Add product
      </button>

      {error && <p>{error}</p>}

      {!error && products.length === 0 && <p>No products found.</p>}

      {!error &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={handleAdd} />
        ))}
    </div>
  );
}
