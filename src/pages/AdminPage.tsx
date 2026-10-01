import { useState, useEffect } from "react";
import { getProducts } from "../service/productService";
import type { productType } from "../types/product";
import ProductCard from "../components/ProductCard";

export function AdminPage() {
  const [products, setProducts] = useState<productType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError("Det gick inte att hämta produkterna.");
      }
    }

    loadProducts();
  }, []);

  return (
    <div>
      <h1>Produkter</h1>

      {error && <p>{error}</p>}

      {!error && products.length === 0 && <p>Inga produkter hittades.</p>}

      {!error &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
}
