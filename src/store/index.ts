import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import auth from "./auth/authSlice";
import cart from "./cart/cartSlice";
import theme from "./theme/themeSlice";
import toasts from "./toast/toastsSlice";
import orders from "./orders/ordersSlice";
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

const themePersistConfig = {
  key: "theme",
  storage,
  whiteList: ["isDarkMode"],
};

const rootReducer = combineReducers({
  toasts,
  orders,
  products,
  wishlist,
  categories,
  cart: persistReducer(cartPersistConfig, cart),
  auth: persistReducer(authPersistConfig, auth),
  theme: persistReducer(themePersistConfig, theme),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          PAUSE,
          PURGE,
          PERSIST,
          REGISTER,
          REHYDRATE,
          "toasts/addToast",
        ],
        ignoredPaths: [/^toasts\.records\.\d+\.onCloseToast$/],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);
export { store, persistor };
