export type productType = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
};

export type CartItem = productType & {
  quantity: number;
};
