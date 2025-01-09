import { useEffect, useState } from "react";

import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { toggleLike } from "@store/wishlist/wishlistSlice";
import { addToast } from "@store/toast/toastsSlice";

export default function useProductCart(
  max: number,
  quantity: number,
  isLiked: boolean,
  isAuthorized: boolean
) {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const remainingItems = max - (quantity ?? 0);
  const isQtyReachedMax = remainingItems <= 0;

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
    dispatch(
      addToast({
        type: "success",
        title: "Add to cart",
        message: "item added to cart successfully",
        // onCloseToast: () => console.log("Item Added!"),
      })
    );

    if (remainingItems - 1 === 0)
      dispatch(
        addToast({
          type: "warning",
          delayAppearance: true,
          message: "you reached maximum quantity of this item",
        })
      );
  };

  const handleLikeToggle = (id: number) => {
    if (isAuthorized) {
      setIsLoading(true);
      dispatch(toggleLike(id))
        .unwrap()
        .then(() => {
          if (isLiked)
            dispatch(
              addToast({
                type: "success",
                title: "Remove from wishlist",
                message: "item removed from your wishlist successfully",
              })
            );
          else
            dispatch(
              addToast({
                type: "success",
                title: "Add to wishlist",
                message: "item added to your wishlist successfully",
              })
            );
        })
        .catch(() =>
          dispatch(
            addToast({
              type: "danger",
              message: "something went wrong with your wishlist",
            })
          )
        )
        .finally(() => setIsLoading(false));
    } else setShowModal(true);
  };

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
