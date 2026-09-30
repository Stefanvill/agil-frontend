import { useEffect, useState } from "react";
import type { CartItem, productType } from "../types/product";
import { getProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

export function ProductsPage() {
  const [products, setProducts] = useState<productType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

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

  function addToCart(product: productType) {
    const index = cartItems.findIndex((item) => item.id === product.id);

    if (index === -1) {
      const newItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newItem]);
      alert(`${product.name} har lagts i kundvagnen`);
      return;
    }

    const cartItem: CartItem = {
      ...product,
      quantity: 1,
    };

    setCartItems((currentItems) => [...currentItems, cartItem]);

    alert(`${product.name} har lagts i kundvagnen`);
  }

  function decreaseQuantity(productId: number) {
    const index = cartItems.findIndex((item) => item.id === productId);

    const currentItem = cartItems[index];
    const updatedItems = [...cartItems];

    if (currentItem.quantity === 1) {
      updatedItems.splice(index, 1);
      setCartItems(updatedItems);
      return;
    }

    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity - 1,
    };

    setCartItems(updatedItems);
  }

  function increaseQuantity(productId: number) {
    const index = cartItems.findIndex((item) => item.id === productId);

    const currentItem = cartItems[index];

    if (currentItem.quantity >= currentItem.stock) {
      alert("Det finns inte fler produkter i lager.");
      return;
    }

    const updatedItems = [...cartItems];
    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity + 1,
    };
    setCartItems(updatedItems);
  }

  return (
    <div>
      <h1>Produkter</h1>

      {error && <p>{error}</p>}

      {!error && products.length === 0 && <p>Inga produkter hittades.</p>}

      {showCart && (
        <Cart
          item={cartItems}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
        />
      )}

      {!error &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addToCart} />
        ))}
      <button onClick={() => setShowCart(!showCart)}>
        {showCart ? "Dölj kundvagn" : "Visa kundvagn"}
      </button>
    </div>
  );
}
