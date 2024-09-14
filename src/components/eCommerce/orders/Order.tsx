import { useState } from "react";
import { Button } from "react-bootstrap";

import MyModal from "@components/ui/MyModal";
import ProductInfo from "../Products/ProductInfo";

import { TOrder } from "@customTypes/orders.types";

export default function Orders({ id, items, subtotal }: TOrder) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <MyModal
        title="Order Products Details"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <MyModal.Body>
          {items.map((el) => (
            <ProductInfo key={el.id} item={el} />
          ))}
        </MyModal.Body>
      </MyModal>

      <tr>
        <td>{id}</td>
        <td>
          {items.length} item(s)
          <Button
            variant="link"
            style={{ paddingTop: "0px", paddingBottom: "0px" }}
            onClick={() => setShowModal(true)}
          >
            products details
          </Button>
        </td>
        <td style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
          {subtotal.toFixed(2)}$
        </td>
      </tr>
    </>
  );
}
