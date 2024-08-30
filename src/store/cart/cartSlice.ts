import { TProduct } from "@customTypes/product";
import { createSlice } from "@reduxjs/toolkit";
import getTotalCartItemsCart from "./selectors/getTotalCartItemsCartSelector";
// import getAvailableItemsQty from "./selectors/getAvailableItemsQuantitySelector";

type CartState = {
  items: { [key: number]: number };
  products: TProduct[];
};

const initialState: CartState = {
  items: {},
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) state.items[id]++;
      else state.items[id] = 1;
    },
  },
});

export { getTotalCartItemsCart };
// export { getTotalCartItemsCart, getAvailableItemsQty };

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
