import HeaderCounter from "./HeaderCounter";
import ThemeToggleBtn from "@components/ui/ThemeToggleBtn";

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
    <div className="d-flex align-items-center gap-3">
      <ThemeToggleBtn />

      <div className={container}>
        <HeaderCounter
          totalItemsCount={itemsId.length}
          page="/wishlist"
          title="Wishlist"
          icon={
            <WishlistImg title="wishlist-logo" className={styles.wishlist} />
          }
        />
        <HeaderCounter
          totalItemsCount={totalCartItemsCount}
          page="/cart"
          title="Cart"
          icon={<CartImg title="cart-logo" className={styles.cart} />}
        />
      </div>
    </div>
  );
}
