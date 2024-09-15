import { useState } from "react";
import { Button } from "react-bootstrap";

import ProductInfo from "../products/ProductInfo";
import MyModal from "@components/ui/MyModal";

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
            <div
              style={{
                marginBottom: "10px",
                paddingBottom: "15px",
                borderBottom: "1px solid #eee",
              }}
            >
              <ProductInfo
                key={el.id}
                dir="row"
                img={el.img}
                title={el.title}
                price={el.price}
                quantity={el.quantity}
              />
            </div>
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
