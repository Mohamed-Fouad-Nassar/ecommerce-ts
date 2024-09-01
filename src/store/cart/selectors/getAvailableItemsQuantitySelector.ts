import { createSelector } from "@reduxjs/toolkit";

const getAvailableItemsQuantitySelector = createSelector(
  (itemQuantity) => itemQuantity,
  (_, itemMax) => itemMax,
  (itemQuantity, itemMax) => {
    const currentItemQuantityInCart = itemQuantity || 0;
    const currentRemainingQuantity = itemMax - currentItemQuantityInCart;
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;
    return { currentRemainingQuantity, quantityReachedToMax };
  }
);

export default getAvailableItemsQuantitySelector;
