import SpinnerFullPage from "@components/ui/SpinnerFullPage";
import { Suspense } from "react";

export default function SuspenseFallback({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<SpinnerFullPage message="Loading, please wait...." />}>
      {children}
    </Suspense>
  );
}
