export type Cart = {
  id: number;
  quantity: number;
  order_id: number;
  product_id: number;
};

export type CreateCartDTO = {
  quantity: number;
  order_id: number;
  product_id: number;
};

export type UpdateCartDTO = {
  quantity: number;
  product_id: number;
};
