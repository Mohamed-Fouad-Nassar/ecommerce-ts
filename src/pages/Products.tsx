import Heading from "@components/ui/Heading";
import GridList from "@components/ui/GridList";
import Loader from "@components/feedback/Loader";
import Product from "@components/eCommerce/Products/Product";

import useProducts from "@hooks/useProducts";

import { TProduct } from "@customTypes/product.types";

export default function Products() {
  const { prefix, loading, error, productsWithQty: products } = useProducts();

  return (
    <>
      <Heading title={`${prefix} products`} />

      <Loader loading={loading} error={error}>
        <GridList<TProduct>
          data={products}
          renderItem={(product) => <Product key={product.id} {...product} />}
          error="there are no products."
        />
      </Loader>
    </>
  );
}
