import { Alert } from "react-bootstrap";

import SpinnerFullPage from "@components/ui/SpinnerFullPage";

import { TError, TLoading } from "@customTypes/shared.types";

type LoaderProps = {
  loading: TLoading;
  error: TError;
  children: React.ReactNode;
};

export default function Loader({ loading, error, children }: LoaderProps) {
  if (loading === "pending") return <SpinnerFullPage />;

  if (loading === "failed") {
    return <Alert variant="danger">{error}</Alert>;
  }

  return children;
}
