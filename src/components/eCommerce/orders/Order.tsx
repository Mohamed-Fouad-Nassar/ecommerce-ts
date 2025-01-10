import { useState } from "react";
import { Button } from "react-bootstrap";

import MyModal from "@components/ui/MyModal";
import ProductInfo from "../products/ProductInfo";

import { TOrder } from "@customTypes/orders.types";

export default function Orders({ id, items, subtotal }: TOrder) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <MyModal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Order Products Details"
      >
        <MyModal.Body>
          {items.map((el) => (
            <div
              key={el.id}
              style={{
                marginBottom: "10px",
                paddingBottom: "15px",
                borderBottom: "1px solid #eee",
              }}
            >
              <ProductInfo
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
