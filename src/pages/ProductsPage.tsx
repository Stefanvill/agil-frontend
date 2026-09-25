import { useEffect, useState } from "react";
import type { productType } from "../types/product";
import { getProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";

// const [products, setProducts] = useState<productType[]>([]);

export function ProductsPage() {
  const [products, setProducts] = useState<productType[]>([]);
  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <div>
      <h1>Produkter</h1>

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
