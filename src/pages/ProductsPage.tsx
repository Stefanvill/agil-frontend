import { useEffect, useState } from "react";
import type { CartItem, productType } from "../types/product";
import { getProducts } from "../service/productService";
import { createOrder } from "../service/orderService";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

export function ProductsPage() {
  const [products, setProducts] = useState<productType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = sessionStorage.getItem("cart");

    if (savedCart) {
      return JSON.parse(savedCart);
    }

    return [];
  });
  const [showCart, setShowCart] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState<string | "">("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = products.map((product) => product.category);
  const uniqueCategories = [...new Set(categories)];
  console.log(uniqueCategories);
  const search = selectedSearch.toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === null || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search);
    //
    return matchesCategory && matchesSearch;
  });
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch /*(error)*/ {
        setError("Could not load the products.");
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product: productType) {
    const index = cartItems.findIndex((item) => item.id === product.id);

    if (index === -1) {
      const newItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newItem]);
      alert(`${product.name} has been added to the cart`);
      return;
    }

    const currentItem = cartItems[index];

    if (currentItem.quantity >= currentItem.stock) {
      alert("No more items in stock.");
      return;
    }

    const updatedItems = [...cartItems];

    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity + 1,
    };

    setCartItems(updatedItems);

    alert(`${product.name} has been added to the cart`);
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
      alert("No more items in stock.");
      return;
    }

    const updatedItems = [...cartItems];
    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity + 1,
    };
    setCartItems(updatedItems);
  }

  async function handleCheckout() {
    if (cartItems.length === 0) {
      alert("Cart is empty.");
      return;
    }

    const orderRequest = {
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      await createOrder(orderRequest);

      setCartItems([]);
      sessionStorage.removeItem("cart");

      alert("The order has been created.");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something whent wrong with creating the order.");
      }
    }
  }

  
return (
  <div className="products-page">
    <div className="products-header">
      <div>
        <h1>Products</h1>
        <p>Explore our products and find your favourites.</p>
      </div>

      <button
        className="cart-toggle-button"
        onClick={() => setShowCart(!showCart)}
      >
        {showCart ? "Hide cart" : `Show cart (${cartItems.length})`}
      </button>
    </div>

    <div className="product-filters">
      <input
        type="search"
        placeholder="Search products..."
        value={selectedSearch}
        onChange={(e) => setSelectedSearch(e.target.value)}
        aria-label="Search products"
      />

      <select
        value={selectedCategory ?? ""}
        onChange={(e) => setSelectedCategory(e.target.value || null)}
        aria-label="Filter by category"
      >
        <option value="">All categories</option>
        {uniqueCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    {error && <p className="products-error">{error}</p>}

    {!error && products.length === 0 && (
      <p className="products-message">No products found.</p>
    )}

    {!error && products.length > 0 && filteredProducts.length === 0 && (
      <p className="products-message">
        No products match your search.
      </p>
    )}

    {showCart && (
      <div className="cart-panel">
        <Cart
          item={cartItems}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onCheckout={handleCheckout}
        />
      </div>
    )}

    {!error && filteredProducts.length > 0 && (
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={addToCart}
          />
        ))}
      </div>
    )}
  </div>
);

}
