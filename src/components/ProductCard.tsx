import { Link } from "react-router";
import type { productType } from "../types/product";

type ProductCardProps = {
  product: productType;
  onAdd: (product: productType) => void;
};

function ProductCard({ product, onAdd }: ProductCardProps) {
  const isSoldOut = product.stock <= 0;

  return (
    <article>
      <img src={product.imageUrl} alt={product.name} />
      <h2>{product.name}</h2>
      {product.category && <small>Category: {product.category}</small>}
      <p>{product.description}</p>
      <strong>{product.price} kr</strong>
      {isSoldOut ? <p>Sold out</p> : <p>{product.stock} st in stock</p>}
      <button onClick={() => onAdd(product)} disabled={isSoldOut}>
        {isSoldOut ? "Sold out" : "Add to cart"}
      </button>
      <Link to={`/products/${product.id}`}>Show product</Link>
    </article>
  );
}

export default ProductCard;
