// import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import AppRouter from "@routes/AppRouter";
import { store } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <StrictMode> */}
    <AppRouter />
    {/* </StrictMode> */}
  </Provider>
);
