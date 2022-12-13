export type Product = {
  id: number;
  name: string;
  price: number;
};

export type CreateProductDTO = {
  name: string;
  price: number;
};

export type UpdateProductDTO = {
  name: string;
  price: number;
};
