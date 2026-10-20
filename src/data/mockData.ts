export const mockOrder = {
  orderId: "TEST-Order-5645",
  items: [
    {
      name: "Laptop",
      quantity: 1,
      price: 2500,
    },
    {
      name: "Keyboard",
      quantity: 1,
      price: 349,
    },
    {
      name: "Mouse",
      quantity: 1,
      price: 199,
    },
  ],
  shipping: 0,
};

export const mockTotal = mockOrder.items.reduce(
  (total, item) => total + item.price * item.quantity,
  mockOrder.shipping
);
