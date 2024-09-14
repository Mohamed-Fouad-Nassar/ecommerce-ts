import { TProduct } from "./product.types";

export type TOrder = {
  id: number;
  userId: number;
  subtotal: number;
  items: TProduct[];
};
