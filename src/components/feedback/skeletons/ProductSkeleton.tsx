import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

export default function ProductSkeleton() {
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
          width={306}
          height={328.47}
          viewBox="0 0 306 328.47"
          backgroundColor="#e0e0e0"
          foregroundColor="#f2f2f2"
        >
          <rect x="0" y="0" rx="4" ry="4" width="306" height="200" />
          <rect x="0" y="219" rx="2" ry="2" width="306" height="10" />
          <rect x="0" y="243" rx="3" ry="3" width="115" height="8" />
          <rect x="0" y="289" rx="5" ry="5" width="306" height="38" />
          <rect x="0" y="269" rx="3" ry="3" width="306" height="8" />
        </ContentLoader>
      </Col>
    ));

  return <Row>{skeleton}</Row>;
}
