// import toast from "react-hot-toast";
import { useCallback, useEffect } from "react";

import {
  changeQty,
  clearCart,
  cleanUpCart,
  getCartProducts,
  removeFromCart,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { createOrder, resetOrderState } from "@store/orders/ordersSlice";
import { addToast } from "@store/toast/toastsSlice";

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
    (id: number) => {
      dispatch(removeFromCart(id));
      dispatch(
        addToast({
          type: "success",
          title: "Remove from cart",
          message: "Item removed from cart successfully",
        })
      );
    },
    [dispatch]
  );

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(
      addToast({
        type: "success",
        title: "Clear cart",
        message: "all cart items removed successfully",
      })
    );
  };

  const handlePlaceOrder = (subtotal: number) => {
    dispatch(createOrder(subtotal))
      .unwrap()
      .then(() =>
        dispatch(
          addToast({
            type: "success",
            message: "Order created successfully",
          })
        )
      )
      // .then(() => toast.success("Order created successfully."))
      .then(() => dispatch(clearCart()))
      // .catch((err) => toast.error(err));
      .catch(() =>
        dispatch(
          addToast({
            type: "danger",
            message: "Failed to create order",
          })
        )
      );
  };

  return {
    error,
    loading,
    accessToken,
    orderStatus,
    finalProducts,
    handleChangeQty,
    handleClearCart,
    handlePlaceOrder,
    handleRemoveFromCart,
  };
}
