import { useEffect } from "react";

import { getOrders } from "@store/orders/ordersSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

export default function useOrders() {
  const dispatch = useAppDispatch();
  const { loading, error, orders } = useAppSelector((state) => state.orders);

  useEffect(() => {
    const promise = dispatch(getOrders());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return { loading, error, orders };
}
