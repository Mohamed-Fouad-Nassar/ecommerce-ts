import { useEffect, useState } from "react";

import LogoImg from "@assets/svg/cart.svg?react";

import { useAppSelector } from "@store/hooks";
import { getTotalCartItemsCart } from "@store/cart/cartSlice";

import styles from "./headerBasket.module.css";
const { container, totalQty, pumpQty, iconContainer } = styles;

export default function HeaderBasket() {
  const totalCartItemsCount = useAppSelector(getTotalCartItemsCart);

  const [isAnimate, setIsAnimate] = useState(false);
  useEffect(() => {
    if (!totalCartItemsCount) return;

    setIsAnimate(true);
    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalCartItemsCount]);

  const quantityStyle = `${totalQty} ${isAnimate ? pumpQty : ""}`;

  return (
    <div className={container}>
      <div className={iconContainer}>
        <LogoImg title="basket icon" />
        {totalCartItemsCount > 0 && (
          <div className={quantityStyle}>{totalCartItemsCount}</div>
        )}
      </div>
      <h3>Cart</h3>
    </div>
  );
}
