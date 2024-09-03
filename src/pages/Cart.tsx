import Heading from "@components/ui/Heading";
import Loader from "@components/feedback/Loader";
import CartList from "@components/eCommerce/cart/CartList";

import useCart from "@hooks/useCart";

import CartSubTotal from "@components/eCommerce/cart/CartSubTotal";

export default function Cart() {
  const {
    error,
    loading,
    finalProducts: products,
    handleChangeQty,
    handleRemoveFromCart,
  } = useCart();

  return (
    <>
      <Heading title="your cart" />

      <Loader error={error} loading={loading}>
        {products.length > 0 ? (
          <>
            <CartList
              products={products}
              handleChangeQty={handleChangeQty}
              handleRemoveFromCart={handleRemoveFromCart}
            />
            <CartSubTotal products={products} />
          </>
        ) : (
          "Your cart is empty. please, start add some products"
        )}
      </Loader>
    </>
  );
}
