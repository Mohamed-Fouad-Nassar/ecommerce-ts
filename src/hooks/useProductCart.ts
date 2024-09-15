import { addToCart } from "@store/cart/cartSlice";
import { useAppDispatch } from "@store/hooks";
import { toggleLike } from "@store/wishlist/wishlistSlice";
import { useEffect, useState } from "react";

export default function useProductCart(
  isAuthorized: boolean,
  max: number,
  quantity: number
) {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isBtnDisabled) return;

    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  const handleAddToCart = (id: number) => {
    setIsBtnDisabled(true);
    dispatch(addToCart(id));
  };

  const handleLikeToggle = (id: number) => {
    if (isAuthorized) {
      setIsLoading(true);
      dispatch(toggleLike(id))
        .unwrap()
        .then(() => setIsLoading(false));
    } else setShowModal(true);
  };

  const remainingItems = max - quantity;
  const isQtyReachedMax = remainingItems <= 0;

  return {
    showModal,
    isLoading,
    setShowModal,
    isBtnDisabled,
    remainingItems,
    isQtyReachedMax,
    handleAddToCart,
    handleLikeToggle,
  };
}
