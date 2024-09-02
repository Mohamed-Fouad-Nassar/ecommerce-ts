import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "@layouts/MainLayout";

import Cart from "@pages/Cart";
import Home from "@pages/Home";
import Login from "@pages/Login";
import About from "@pages/About";
import Product from "@pages/Product";
import Register from "@pages/Register";
import Products from "@pages/Products";
import Wishlist from "@pages/Wishlist";
import ErrorPage from "@pages/ErrorPage";
import Categories from "@pages/Categories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products/:prefix",
        element: <Products />,
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          )
            throw new Response("Bad Request", {
              status: 400,
              statusText: "Product Prefix Category Not Found",
            });

          return true;
        },
      },
      {
        path: "products/:prefix/:productId",
        element: <Product />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "about-us",
        element: <About />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
