import { TProduct } from "@customTypes/product";

import styles from "./cartSubTotal.module.css";

export default function CartSubTotal({ products }: { products: TProduct[] }) {
  const subtotal = products.reduce(
    (acc, cur) => acc + cur.price * (cur.quantity || 1),
    0
  );

  return (
    <div className={styles.container}>
      <span>Subtotal:</span>
      <span>{subtotal.toFixed(2)} EGP</span>
    </div>
  );
}
