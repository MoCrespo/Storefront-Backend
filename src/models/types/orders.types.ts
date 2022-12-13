export type Order = {
  id: number;
  user_id: number;
  status: string;
};

export type CreateOrderDTO = {
  user_id: number;
};

export type UpdateOrderDTO = {
  status: string;
};
