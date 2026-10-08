import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getProductById } from "../service/productService";
import type { productType } from "../types/product";

export function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<productType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch {
        setError("Could not load the product.");
      }
    }

    loadProduct();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <article>
      <Link to="/products">Back to Products page</Link>
      <h1>{product.name}</h1>
      {product.category && <p>Category: {product.category}</p>}
      <p>{product.description}</p>
      <p>Price: {product.price} kr</p>
      <p>In Stock: {product.stock}</p>
    </article>
  );
}
