import { useCallback, useEffect } from "react";

import {
  changeQty,
  cleanUpCart,
  clearCart,
  getCartProducts,
  removeFromCart,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { createOrder, resetOrderState } from "@store/orders/ordersSlice";

export default function useCart() {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const { loading, error, products, items } = useAppSelector(
    (state) => state.cart
  );
  const { loading: orderStatus } = useAppSelector((state) => state.orders);

  useEffect(() => {
    const promise = dispatch(getCartProducts());

    return () => {
      promise.abort();
      dispatch(cleanUpCart());
      dispatch(resetOrderState());
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
    orderStatus,
    finalProducts,
    handleChangeQty,
    handlePlaceOrder,
    handleRemoveFromCart,
  };
}
