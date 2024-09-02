import { useEffect, useState } from "react";

import LogoImg from "@assets/svg/wishlist-v2.svg?react";

import { useAppSelector } from "@store/hooks";

import styles from "./headerWishlist.module.css";
const { container, totalQty, pumpQty, iconContainer } = styles;

export default function HeaderWishlist() {
  const { itemsId } = useAppSelector((state) => state.wishlist);

  const [isAnimate, setIsAnimate] = useState(false);
  useEffect(() => {
    if (!itemsId.length) return;

    setIsAnimate(true);
    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [itemsId.length]);

  const quantityStyle = `${totalQty} ${isAnimate ? pumpQty : ""}`;

  return (
    <div className={container}>
      <div className={iconContainer}>
        <LogoImg title="wishlist icon" />
        {itemsId?.length > 0 && (
          <div className={quantityStyle}>{itemsId?.length}</div>
        )}
      </div>
      <h3>wishlist</h3>
    </div>
  );
}
