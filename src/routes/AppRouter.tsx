import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const MainLayout = lazy(() => import("@layouts/MainLayout"));

const Cart = lazy(() => import("@pages/Cart"));
const Home = lazy(() => import("@pages/Home"));
const Login = lazy(() => import("@pages/Login"));
const About = lazy(() => import("@pages/About"));
const Orders = lazy(() => import("@pages/Orders"));
const Profile = lazy(() => import("@pages/Profile"));
const Product = lazy(() => import("@pages/Product"));
const Register = lazy(() => import("@pages/Register"));
const Products = lazy(() => import("@pages/Products"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Categories = lazy(() => import("@pages/Categories"));

import ErrorPage from "@pages/ErrorPage";

import ProtectedRoute from "@components/auth/ProtectedRoute";
import SuspenseFallback from "@components/feedback/SuspenseFallback";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SuspenseFallback>
        <MainLayout />
      </SuspenseFallback>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <SuspenseFallback>
            <Home />
          </SuspenseFallback>
        ),
      },
      {
        path: "products/:prefix",
        element: (
          <SuspenseFallback>
            <Products />
          </SuspenseFallback>
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
          <SuspenseFallback>
            <Product />
          </SuspenseFallback>
        ),
      },
      {
        path: "categories",
        element: (
          <SuspenseFallback>
            <Categories />
          </SuspenseFallback>
        ),
      },
      {
        path: "about-us",
        element: (
          <SuspenseFallback>
            <About />
          </SuspenseFallback>
        ),
      },
      {
        path: "cart",
        element: (
          <SuspenseFallback>
            <Cart />
          </SuspenseFallback>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <SuspenseFallback>
              <Wishlist />
            </SuspenseFallback>
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <SuspenseFallback>
              <Orders />
            </SuspenseFallback>
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <SuspenseFallback>
              <Profile />
            </SuspenseFallback>
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <SuspenseFallback>
            <Login />
          </SuspenseFallback>
        ),
      },
      {
        path: "register",
        element: (
          <SuspenseFallback>
            <Register />
          </SuspenseFallback>
        ),
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
