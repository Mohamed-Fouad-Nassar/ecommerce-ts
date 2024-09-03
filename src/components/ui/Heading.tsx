import { memo } from "react";

const Heading = memo(function Heading({ title }: { title: string }) {
  return <h2 className="mb-3 fs-4 fw-semibold text-capitalize">{title}</h2>;
});

export default Heading;
