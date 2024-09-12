import Heading from "@components/ui/Heading";
import Loader from "@components/feedback/Loader";
import CartList from "@components/eCommerce/cart/CartList";
import LottieHandler from "@components/feedback/LottieHandler";
import CartSubTotal from "@components/eCommerce/cart/CartSubTotal";

import useCart from "@hooks/useCart";

export default function Cart() {
  const {
    error,
    loading,
    handleChangeQty,
    handlePlaceOrder,
    handleRemoveFromCart,
    finalProducts: products,
    accessToken,
  } = useCart();

  return (
    <>
      <Heading title="your cart" />

      <Loader error={error} loading={loading} type="cart">
        {products.length > 0 ? (
          <>
            <CartList
              products={products}
              handleChangeQty={handleChangeQty}
              handleRemoveFromCart={handleRemoveFromCart}
            />
            <CartSubTotal
              products={products}
              userAccessToken={accessToken}
              handlePlaceOrder={handlePlaceOrder}
            />
          </>
        ) : (
          <LottieHandler
            type="empty"
            message="Your cart is empty. please, start add some products"
            lottieStyle={{ width: "230px" }}
          />
        )}
      </Loader>
    </>
  );
}
