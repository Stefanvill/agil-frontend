import { Link } from "react-router";
import type { productType } from "../types/product";

type ProductCardProps = {
  product: productType;
  onAdd: (product: productType) => void;
};

function ProductCard({ product, onAdd }: ProductCardProps) {
  const isSoldOut = product.stock <= 0;

  
return (
  <article className="product-card">
    <img
      className="product-image"
      src={product.imageUrl}
      alt={product.name}
    />

    <div className="product-card-content">
      <h2>{product.name}</h2>

      {product.category && (
        <small className="product-category">
          Category: {product.category}
        </small>
      )}

      <p className="product-description">{product.description}</p>

      <strong className="product-price">{product.price} kr</strong>

      {isSoldOut ? (
        <p className="product-stock sold-out">Sold out</p>
      ) : (
        <p className="product-stock">{product.stock} st in stock</p>
      )}

      <button
        className="product-button"
        onClick={() => onAdd(product)}
        disabled={isSoldOut}
      >
        {isSoldOut ? "Sold out" : "Add to cart"}
      </button>

      <Link className="product-link" to={`/products/${product.id}`}>
        Show product
      </Link>
    </div>
  </article>
);

}

export default ProductCard;
