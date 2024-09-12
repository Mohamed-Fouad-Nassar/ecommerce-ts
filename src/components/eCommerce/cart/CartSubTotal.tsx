import { useState } from "react";
import {
  // Alert,
  Button,
  Spinner,
} from "react-bootstrap";

import MyModal from "@components/ui/MyModal";

import { useAppSelector } from "@store/hooks";

import { TProduct } from "@customTypes/product.types";

import styles from "./cartSubTotal.module.css";

type CartSubTotalProps = {
  products: TProduct[];
  userAccessToken: string | null;
  handlePlaceOrder: (subtotal: number) => void;
};

export default function CartSubTotal({
  products,
  userAccessToken,
  handlePlaceOrder,
}: CartSubTotalProps) {
  const [showModal, setShowModal] = useState(false);

  const { loading, error } = useAppSelector((state) => state.orders);

  const subtotal = products.reduce(
    (acc, cur) => acc + cur.price * (cur.quantity || 1),
    0
  );

  return (
    <>
      <MyModal
        backdrop="static"
        title="Confirm Placing Order"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <MyModal.Body>
          Are you sure you want to place order with Subtotal:{" "}
          {subtotal.toFixed(2)} EGP
          {loading === "failed" && error && (
            <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
          )}
        </MyModal.Body>

        <MyModal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>

          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={() => handlePlaceOrder(subtotal)}
          >
            {loading === "pending" ? (
              <>
                <Spinner animation="border" size="sm"></Spinner> Loading...
              </>
            ) : (
              "Confirm Order"
            )}
          </Button>
        </MyModal.Footer>
      </MyModal>

      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{subtotal.toFixed(2)} EGP</span>
      </div>

      {/* {error && <Alert variant="danger">{error}</Alert>} */}

      {userAccessToken && (
        <Button
          variant="info"
          style={{ color: "white", marginLeft: "auto", display: "block" }}
          onClick={() => setShowModal(true)}
        >
          Place Order
        </Button>
      )}
    </>
  );
}
