import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { cleanUpProducts } from "@store/products/productsSlice";
import { getWishlistItems } from "@store/wishlist/actions/getWishlistItems";

export default function useWishlist() {
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { loading, error, products } = useAppSelector(
    (state) => state.wishlist
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWishlistItems());

    return () => {
      dispatch(cleanUpProducts());
    };
  }, [dispatch]);

  const finalProducts = products.map((product) => ({
    ...product,
    quantity: cartItems[product.id] || 0,
    isLiked: true,
  }));

  return { loading, error, finalProducts };
}
