import { Spinner } from "react-bootstrap";

import styles from "./spinnerFullPage.module.css";
const { wrapper } = styles;

export default function SpinnerFullPage() {
  return (
    <div className={wrapper}>
      <Spinner
        style={{ width: "60px", height: "60px" }}
        animation="border"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
