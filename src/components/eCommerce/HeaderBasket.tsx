import { useEffect, useState } from "react";

import LogoImg from "@assets/svg/cart.svg?react";

import { useAppSelector } from "@store/hooks";
import { getTotalCartItemsCart } from "@store/cart/cartSlice";

import styles from "./headerBasket.module.css";
const { basketContainer, basketQuantity, pumpCartQuantity, basketCart } =
  styles;

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

  const quantityStyle = `${basketQuantity} ${
    isAnimate ? pumpCartQuantity : ""
  }`;

  return (
    <div className={basketContainer}>
      <div className={basketCart}>
        <LogoImg title="basket icon" />
        <div className={quantityStyle}>{totalCartItemsCount}</div>
      </div>
      <h3>Cart</h3>
    </div>
  );
}
