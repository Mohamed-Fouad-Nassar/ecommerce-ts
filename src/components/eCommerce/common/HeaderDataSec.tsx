import HeaderCounter from "./headerCounter";

import { useAppSelector } from "@store/hooks";
import { getTotalCartItemsCart } from "@store/cart/cartSlice";

import CartImg from "@assets/svg/cart.svg?react";
import WishlistImg from "@assets/svg/wishlist-v2.svg?react";

import styles from "./headerDataSec.module.css";
const { container } = styles;

export default function HeaderDataSec() {
  const totalCartItemsCount = useAppSelector(getTotalCartItemsCart);
  const { itemsId } = useAppSelector((state) => state.wishlist);

  return (
    <div className={container}>
      <HeaderCounter
        totalItemsCount={itemsId.length}
        page="/wishlist"
        title="wishlist"
        icon={<WishlistImg title="wishlist-logo" />}
      />
      <HeaderCounter
        totalItemsCount={totalCartItemsCount}
        page="/cart"
        title="cart"
        icon={<CartImg title="cart-logo" />}
      />
    </div>
  );
}
