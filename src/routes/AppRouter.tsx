import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SpinnerFullPage from "@components/ui/SpinnerFullPage";

const MainLayout = lazy(() => import("@layouts/MainLayout"));

const Cart = lazy(() => import("@pages/Cart"));
const Home = lazy(() => import("@pages/Home"));
const Login = lazy(() => import("@pages/Login"));
const About = lazy(() => import("@pages/About"));
const Product = lazy(() => import("@pages/Product"));
const Register = lazy(() => import("@pages/Register"));
const Products = lazy(() => import("@pages/Products"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Categories = lazy(() => import("@pages/Categories"));

import ErrorPage from "@pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={<SpinnerFullPage message="Loading, please wait...." />}
      >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "products/:prefix",
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <Products />
          </Suspense>
        ),
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
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <Product />
          </Suspense>
        ),
      },
      {
        path: "categories",
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "about-us",
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "wishlist",
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <Wishlist />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <Register />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
