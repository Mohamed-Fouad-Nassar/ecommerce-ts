import { useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  cleanUpProducts,
  getProductsByPrefix,
} from "@store/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

export default function useProducts() {
  const { prefix } = useParams();

  const dispatch = useAppDispatch();
  const {
    loading,
    error,
    records: products,
  } = useAppSelector((state) => state.products);
  const { accessToken } = useAppSelector((state) => state.auth);
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { itemsId: wishlistItems } = useAppSelector((state) => state.wishlist);

  const productsWithQty = products.map((product) => ({
    ...product,
    quantity: cartItems[product.id] || 0,
    isLiked: wishlistItems.includes(product.id),
    isAuthorized: accessToken ? true : false,
  }));

  useEffect(() => {
    const promise = dispatch(getProductsByPrefix(prefix as string));

    return () => {
      promise.abort();
      dispatch(cleanUpProducts());
    };
  }, [dispatch, prefix]);

  return { prefix, loading, error, productsWithQty };
}
