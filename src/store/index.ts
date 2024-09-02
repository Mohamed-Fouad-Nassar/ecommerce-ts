import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import cart from "./cart/cartSlice";
import products from "./products/productsSlice";
import wishlist from "./wishlist/wishlistSlice";
import categories from "./categories/categoriesSlice";

const cartPersistConfig = {
  key: "cart",
  storage,
  whiteList: ["items"],
};

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
  whiteList: ["itemsId"],
};

const rootReducer = combineReducers({
  products,
  categories,
  cart: persistReducer(cartPersistConfig, cart),
  wishlist: persistReducer(wishlistPersistConfig, wishlist),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);
export { store, persistor };
