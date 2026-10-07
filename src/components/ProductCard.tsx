import type { productType } from "../types/product";

type ProductCardProps = {
  product: productType;
  onAdd: (product: productType) => void;
};

function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article>
      <img src={product.imageUrl} alt={product.name} />
      <h2>{product.name}</h2>
      {product.category && <small>Kategori: {product.category}</small>}
      <p>{product.description}</p>
      <strong>{product.price} kr</strong>
      <button onClick={() => onAdd(product)}>Lägg i kundvagnen</button>
    </article>
  );
}

export default ProductCard;
