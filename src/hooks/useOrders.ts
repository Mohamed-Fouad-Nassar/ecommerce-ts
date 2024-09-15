import { useEffect } from "react";

import { getOrders, resetOrderState } from "@store/orders/ordersSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

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
