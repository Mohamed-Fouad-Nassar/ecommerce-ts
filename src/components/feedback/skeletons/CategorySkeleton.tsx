import { Row, Col } from "react-bootstrap";
import ContentLoader from "react-content-loader";

export default function CategorySkeleton() {
  const skeleton = Array(4)
    .fill(0)
    .map(({ i }) => (
      <Col
        xs={12}
        sm={6}
        md={4}
        lg={3}
        key={i}
        className="d-flex justify-content-center mb-5 mt-2"
      >
        <ContentLoader
          speed={2}
          width={180}
          height={209.9}
          viewBox="0 0 180 209.9"
          backgroundColor="#e0e0e0"
          foregroundColor="#f2f2f2"
        >
          <rect x="44" y="197" rx="5" ry="5" width="100" height="10" />
          <circle cx="70" cy="135" r="3" />
          <circle cx="90" cy="90" r="90" />
        </ContentLoader>
      </Col>
    ));

  return <Row>{skeleton}</Row>;
}
