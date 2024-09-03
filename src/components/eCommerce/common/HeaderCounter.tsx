import { useEffect, useState } from "react";

import styles from "./headerCounter.module.css";
import { Link } from "react-router-dom";
const { container, totalQty, pumpQty, iconContainer } = styles;

type HeaderCounterProps = {
  page: string;
  title: string;
  icon: React.ReactNode;
  totalItemsCount: number;
};

export default function HeaderCounter({
  page,
  icon,
  title,
  totalItemsCount,
}: HeaderCounterProps) {
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    if (!totalItemsCount) return;

    setIsAnimate(true);
    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalItemsCount]);

  const quantityStyle = `${totalQty} ${isAnimate ? pumpQty : ""}`;

  return (
    <Link className="text-decoration-none" to={page}>
      <div className={container}>
        <div className={iconContainer}>
          {icon}
          {totalItemsCount > 0 && (
            <div className={quantityStyle}>{totalItemsCount}</div>
          )}
        </div>
        <h3>{title}</h3>
      </div>
    </Link>
  );
}
