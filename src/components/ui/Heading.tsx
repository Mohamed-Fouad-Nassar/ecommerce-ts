export default function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 fs-4 fw-semibold text-capitalize">{children}</h2>;
}
