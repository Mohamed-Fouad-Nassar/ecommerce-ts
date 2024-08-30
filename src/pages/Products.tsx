import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Loader from "@components/feedback/Loader";
import GridList from "@components/ui/GridList";
import Product from "@components/eCommerce/Products/Product";

import {
  cleanUpProducts,
  getProductsByPrefix,
} from "@store/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import { TProduct } from "@customTypes/product";

export default function Products() {
  const { prefix } = useParams();

  const dispatch = useAppDispatch();
  const {
    loading,
    error,
    records: products,
  } = useAppSelector((state) => state.products);
  const { items: cartItems } = useAppSelector((state) => state.cart);

  const productsWithQty = products.map((product) => ({
    ...product,
    quantity: cartItems[product.id] || 0,
  }));

  useEffect(() => {
    dispatch(getProductsByPrefix(prefix as string));

    return () => {
      dispatch(cleanUpProducts());
    };
  }, [dispatch, prefix]);

  return (
    <Container>
      <Loader loading={loading} error={error}>
        <GridList<TProduct>
          data={productsWithQty}
          renderItem={(product) => <Product {...product} />}
          error="there are no products."
        />
      </Loader>
    </Container>
  );
}
