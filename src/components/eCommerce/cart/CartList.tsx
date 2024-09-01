import CartItem from "./CartItem";

import { TProduct } from "@customTypes/product";

type Products = TProduct & { quantity: number };

type CartListProps = {
  // products: TProduct[];
  products: Products[];
  handleChangeQty: (id: number, quantity: number) => void;
  handleRemoveFromCart: (id: number) => void;
};

export default function CartList({
  products,
  handleChangeQty,
  handleRemoveFromCart,
}: CartListProps) {
  const productsList = products.map((product) => (
    <CartItem
      key={product.id}
      {...product}
      handleChangeQty={handleChangeQty}
      handleRemoveFromCart={handleRemoveFromCart}
    />
  ));

  return <>{productsList}</>;
}
