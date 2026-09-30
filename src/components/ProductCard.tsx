import type { productType } from "../types/product";

type ProductCardProps = {
  product: productType;
  onAdd: (product: productType) => void;
};

function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <strong>{product.price} kr</strong>
      <button onClick={() => onAdd(product)}>Lägg i kundvagnen</button>
    </article>
  );
}
export default ProductCard;
