import { Form, Button } from "react-bootstrap";

import { TProduct } from "@customTypes/product.types";

import styles from "./cartItem.module.css";
import ProductInfo from "../products/ProductInfo";
const { cartItem, cartItemSelection } = styles;

type CartItemProps = TProduct & {
  quantity: number;
  handleChangeQty: (id: number, quantity: number) => void;
  handleRemoveFromCart: (id: number) => void;
};

export default function CartItem({
  quantity,
  id,
  title,
  price,
  cat_prefix,
  img,
  max,
  handleChangeQty,
  handleRemoveFromCart,
}: CartItemProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChangeQty(id, +e.target.value);
  };

  const quantityOptions = Array(max)
    .fill(0)
    .map((_, i) => {
      const quantity = ++i;

      return (
        <option key={quantity} value={quantity}>
          {quantity}
        </option>
      );
    });

  return (
    <div className={cartItem}>
      <ProductInfo
        dir="row"
        title={title}
        img={img}
        price={price}
        catPrefix={cat_prefix}
      >
        <Button
          variant="danger"
          style={{ color: "white" }}
          className="mt-auto"
          onClick={() => handleRemoveFromCart(id)}
        >
          Remove
        </Button>
      </ProductInfo>

      <div className={cartItemSelection}>
        <span className="d-block mb-1">Quantity</span>
        <Form.Select
          value={quantity}
          onChange={handleChange}
          aria-label="Default select example"
        >
          {quantityOptions}
        </Form.Select>
      </div>
    </div>
  );
}
