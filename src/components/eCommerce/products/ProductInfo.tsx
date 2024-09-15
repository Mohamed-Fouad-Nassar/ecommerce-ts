import { memo } from "react";

import styles from "./productInfo.module.css";
const { productImg, info } = styles;

type ProductInfoProps = {
  img: string;
  title: string;
  price: number;
  quantity?: number;
  catPrefix?: string;
  dir: "row" | "col";
  children?: React.ReactNode;
};

const ProductInfo = memo(function ProductInfo({
  img,
  title,
  price,
  children,
  quantity,
  catPrefix,
  dir = "col",
}: ProductInfoProps) {
  return (
    <div className={`${styles[`product-${dir}`]}`}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>

      <div className={info}>
        <div>
          <h2>{title}</h2>
          {catPrefix && <p>{catPrefix}</p>}
          <h3>{price?.toFixed(2)} EGP</h3>
          {quantity ? <h3>Total Quantity: {quantity}</h3> : ""}
          {quantity ? (
            <h3>Price Total: {(quantity * price).toFixed(2)} EGP</h3>
          ) : (
            ""
          )}
        </div>

        {children}
      </div>
    </div>
  );
});

export default ProductInfo;
