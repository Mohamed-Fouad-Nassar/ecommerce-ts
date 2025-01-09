import { Outlet } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import styles from "./authLayout.module.css";
const { container, wrapper } = styles;

export default function AuthLayout() {
  return (
    <Row className={container}>
      <Col lg={{ span: 6 }} className={wrapper}>
        <Outlet />
      </Col>
    </Row>
  );
}
