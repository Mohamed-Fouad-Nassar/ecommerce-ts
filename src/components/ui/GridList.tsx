import { Col, Row } from "react-bootstrap";

type GridListProps<T> = {
  data: T[];
  renderItem: (data: T) => React.ReactNode;
  error: string;
};

export default function GridList<T extends { id?: number }>({
  data,
  renderItem,
  error,
}: GridListProps<T>) {
  const renderList =
    data.length > 0
      ? data.map((cur) => (
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={cur.id}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            {renderItem(cur)}
          </Col>
        ))
      : error;

  return <Row>{renderList}</Row>;
}
