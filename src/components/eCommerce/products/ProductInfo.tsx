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
        <div className="d-flex flex-column justify-content-between">
          <h2>{title}</h2>
          <div>
            {catPrefix && <p>{catPrefix}</p>}
            <h3>
              Unit Price: <span>{price?.toFixed(2)}</span> EGP
            </h3>
            {quantity ? (
              <h3>
                Quantity: <span>{quantity}</span>
              </h3>
            ) : (
              ""
            )}
            {quantity ? (
              <h3>
                Total Price: <span>{(quantity * price).toFixed(2)}</span> EGP
              </h3>
            ) : (
              ""
            )}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
});

export default ProductInfo;
