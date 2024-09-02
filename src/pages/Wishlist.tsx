import { useEffect } from "react";

import Heading from "@components/ui/Heading";
import GridList from "@components/ui/GridList";
import Loader from "@components/feedback/Loader";
import Product from "@components/eCommerce/products/Product";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getWishlistItems } from "@store/wishlist/actions/getWishlistItems";

import { TProduct } from "@customTypes/product";
import { cleanUpProducts } from "@store/products/productsSlice";

export default function Wishlist() {
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { loading, error, products } = useAppSelector(
    (state) => state.wishlist
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWishlistItems());

    return () => {
      dispatch(cleanUpProducts());
    };
  }, [dispatch]);

  const finalProducts = products.map((product) => ({
    ...product,
    quantity: cartItems[product.id] || 0,
    isLiked: true,
  }));

  return (
    <>
      <Heading>Wishlist</Heading>

      <Loader error={error} loading={loading}>
        {products.length > 0 ? (
          <GridList<TProduct>
            data={finalProducts}
            renderItem={(product) => <Product key={product.id} {...product} />}
            error="there are no products."
          />
        ) : (
          "Your cart is empty. please, start add some products"
        )}
      </Loader>
    </>
  );
}
