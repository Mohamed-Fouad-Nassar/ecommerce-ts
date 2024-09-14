// import { Alert } from "react-bootstrap";

import SpinnerFullPage from "@components/ui/SpinnerFullPage";

import CartSkeleton from "./skeletons/CartSkeleton";
import ProductSkeleton from "./skeletons/ProductSkeleton";
import CategorySkeleton from "./skeletons/CategorySkeleton";

import { TError, TLoading } from "@customTypes/shared.types";
import LottieHandler from "./LottieHandler";

const skeletonTypes = {
  cart: CartSkeleton,
  orders: SpinnerFullPage,
  default: SpinnerFullPage,
  products: ProductSkeleton,
  categories: CategorySkeleton,
};

type LoaderProps = {
  type?: keyof typeof skeletonTypes;
  error: TError;
  loading: TLoading;
  children: React.ReactNode;
};

export default function Loader({
  type = "default",
  error,
  loading,
  children,
}: LoaderProps) {
  const Component = skeletonTypes[type];

  if (loading === "pending") return <Component />;

  if (loading === "failed")
    return (
      <LottieHandler
        type="error"
        message={error as string}
        lottieStyle={{ width: "300px" }}
      />
    );

  return children;
}
