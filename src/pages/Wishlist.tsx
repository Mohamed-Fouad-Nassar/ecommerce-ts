import Heading from "@components/ui/Heading";
import GridList from "@components/ui/GridList";
import Loader from "@components/feedback/Loader";
import Product from "@components/eCommerce/Products/Product";
import LottieHandler from "@components/feedback/LottieHandler";

import useWishlist from "@hooks/useWishlist";

import { TProduct } from "@customTypes/product.types";

export default function Wishlist() {
  const { loading, error, finalProducts: products } = useWishlist();

  return (
    <>
      <Heading title="your wishlist" />
      <Loader error={error} loading={loading} type="products">
        {products.length > 0 ? (
          <GridList<TProduct>
            data={products}
            renderItem={(product) => <Product key={product.id} {...product} />}
            error="there are no products."
          />
        ) : (
          <LottieHandler
            type="noResult"
            message="Your wishlist is empty. please, start add some products"
          />
        )}
      </Loader>
    </>
  );
}
