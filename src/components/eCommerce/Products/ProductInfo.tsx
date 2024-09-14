import styles from "./productInfo.module.css";

type ProductInfoProps = {
  item: {
    id: number;
    img: string;
    title: string;
    price: number;
    quantity?: number;
  };
};

export default function ProductInfo({
  item: { img, title, price, quantity },
}: ProductInfoProps) {
  return (
    <div className={styles.productInfo}>
      <div>
        <img src={img} alt={title} />
      </div>

      <div>
        <h2 className="text-capitalize">{title}</h2>
        <p>{`Total Quantity: ${quantity} pieces`}</p>
        <h3>{`Total Price: ${price.toFixed(2)}$`}</h3>
      </div>
    </div>
  );
}
