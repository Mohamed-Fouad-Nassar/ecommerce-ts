import { useCallback, useEffect } from "react";

import Heading from "@components/ui/Heading";
import Loader from "@components/feedback/Loader";
import CartList from "@components/eCommerce/cart/CartList";

import {
  changeQty,
  getCartProducts,
  removeFromCart,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import CartSubTotal from "@components/eCommerce/cart/CartSubTotal";

export default function Cart() {
  const dispatch = useAppDispatch();
  const { loading, error, products, items } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch]);

  const finalProducts = products.map((product) => ({
    ...product,
    quantity: items[product.id],
  }));

  const handleChangeQty = useCallback(
    (id: number, quantity: number) => dispatch(changeQty({ id, quantity })),
    [dispatch]
  );

  const handleRemoveFromCart = useCallback(
    (id: number) => dispatch(removeFromCart(id)),
    [dispatch]
  );

  return (
    <>
      <Heading>your cart</Heading>

      <Loader error={error} loading={loading}>
        {finalProducts.length > 0 ? (
          <>
            <CartList
              products={finalProducts}
              handleChangeQty={handleChangeQty}
              handleRemoveFromCart={handleRemoveFromCart}
            />
            <CartSubTotal products={finalProducts} />
          </>
        ) : (
          "Your cart is empty. please, start add some products"
        )}
      </Loader>
    </>
  );
}
