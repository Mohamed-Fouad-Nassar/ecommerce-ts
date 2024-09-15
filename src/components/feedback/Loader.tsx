import LottieHandler from "./LottieHandler";

import CartSkeleton from "./skeletons/CartSkeleton";
import GlobalSkeleton from "./skeletons/GlobalSkeleton";
import ProductSkeleton from "./skeletons/ProductSkeleton";
import CategorySkeleton from "./skeletons/CategorySkeleton";

import { TError, TLoading } from "@customTypes/shared.types";

const skeletonTypes = {
  cart: CartSkeleton,
  orders: GlobalSkeleton,
  default: GlobalSkeleton,
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
