import { ListGroup } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

import styles from "./profileLayout.module.css";

export default function ProfileLayout() {
  return (
    <div className={styles.layout}>
      <ListGroup>
        <ListGroup.Item as={NavLink} to="/profile" end>
          Profile
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="orders">
          Orders
        </ListGroup.Item>
      </ListGroup>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
