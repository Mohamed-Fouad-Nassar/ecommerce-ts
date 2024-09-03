import {
  changeQty,
  cleanUpCart,
  getCartProducts,
  removeFromCart,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";

export default function useCart() {
  const dispatch = useAppDispatch();
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

  return {
    error,
    loading,
    finalProducts,
    handleChangeQty,
    handleRemoveFromCart,
  };
}
