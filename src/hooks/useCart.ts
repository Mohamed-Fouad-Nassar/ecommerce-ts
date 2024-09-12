import { useCallback, useEffect } from "react";

import {
  changeQty,
  cleanUpCart,
  clearCart,
  getCartProducts,
  removeFromCart,
} from "@store/cart/cartSlice";
import { createOrder } from "@store/orders/ordersSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

export default function useCart() {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const { loading, error, products, items } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(getCartProducts());

    return () => {
      dispatch(cleanUpCart());
    };
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

  const handlePlaceOrder = (subtotal: number) => {
    dispatch(createOrder(subtotal))
      .unwrap()
      .then(() => dispatch(clearCart()));
  };

  return {
    error,
    loading,
    accessToken,
    finalProducts,
    handleChangeQty,
    handlePlaceOrder,
    handleRemoveFromCart,
  };
}
