import { Col, Row } from "react-bootstrap";

type GridListProps<T> = {
  data: T[];
  xs?: number;
  error: string;
  renderItem: (data: T) => React.ReactNode;
};

export default function GridList<T extends { id?: number }>({
  xs,
  data,
  error,
  renderItem,
}: GridListProps<T>) {
  const renderList =
    data.length > 0
      ? data.map((cur) => (
          <Col
            sm={6}
            md={4}
            lg={3}
            key={cur.id}
            xs={xs || 12}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            {renderItem(cur)}
          </Col>
        ))
      : error;

  return <Row>{renderList}</Row>;
}
