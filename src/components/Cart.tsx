import type { CartItem } from "../types/product";

type CartProps = {
  item: CartItem[];
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onCheckout: () => void;
};

const Cart = ({ item, onIncrease, onDecrease, onCheckout }: CartProps) => {
  const totalPrice = item.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  if (item.length === 0) {
    return <p>Kundvagnen är tom.</p>;
  }

  return (
    <section>
      <h2>Kundvagn</h2>

      {item.map((item) => {
        const lineTotal = item.price * item.quantity;
        return (
          <article key={item.id}>
            <h3>{item.name}</h3>

            <p>Pris: {item.price.toFixed(2)} kr</p>

            <button onClick={() => onDecrease(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => onIncrease(item.id)}>+</button>

            <p>Radpris: {lineTotal.toFixed(2)} kr</p>
          </article>
        );
      })}
      <strong>Totalt: {totalPrice.toFixed(2)} kr</strong>
      <button onClick={onCheckout}>Skicka beställning</button>
    </section>
  );
};

export default Cart;
