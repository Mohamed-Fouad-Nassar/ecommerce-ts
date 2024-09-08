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

import auth from "./auth/authSlice";
import cart from "./cart/cartSlice";
import products from "./products/productsSlice";
import wishlist from "./wishlist/wishlistSlice";
import categories from "./categories/categoriesSlice";

const cartPersistConfig = {
  key: "cart",
  storage,
  whiteList: ["items"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whiteList: ["accessToken", "user"],
};

const rootReducer = combineReducers({
  products,
  wishlist,
  categories,
  cart: persistReducer(cartPersistConfig, cart),
  auth: persistReducer(authPersistConfig, auth),
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
