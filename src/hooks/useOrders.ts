import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getOrders, resetOrderState } from "@store/orders/ordersSlice";

export default function useOrders() {
  const dispatch = useAppDispatch();
  const { loading, error, orders } = useAppSelector((state) => state.orders);

  useEffect(() => {
    const promise = dispatch(getOrders());

    return () => {
      promise.abort();
      dispatch(resetOrderState());
    };
  }, [dispatch]);

  return { loading, error, orders };
}
