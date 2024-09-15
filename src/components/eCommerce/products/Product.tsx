import { memo } from "react";
import { Button, Spinner } from "react-bootstrap";

import ProductInfo from "./ProductInfo";
import MyModal from "@components/ui/MyModal";

import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";

import useProductCart from "@hooks/useProductCart";

import { TProduct } from "@customTypes/product.types";

import styles from "./product.module.css";
const { product, maximumNotice, wishlistBtn } = styles;

const Product = memo(function Product({
  id,
  title,
  img,
  price,
  max = 0,
  quantity = 0,
  isLiked,
  isAuthorized = false,
}: TProduct) {
  const {
    isLoading,
    showModal,
    setShowModal,
    isBtnDisabled,
    remainingItems,
    isQtyReachedMax,
    handleAddToCart,
    handleLikeToggle,
  } = useProductCart(isAuthorized, max, quantity);

  return (
    <>
      <MyModal
        title="Login Required"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <MyModal.Body>
          <p> You need to login first to add this item to your wishlist.</p>
        </MyModal.Body>
      </MyModal>

      <div className={product}>
        <div className={wishlistBtn} onClick={() => handleLikeToggle(id)}>
          {isLoading ? (
            <Spinner animation="border" size="sm" variant="primary" />
          ) : isLiked ? (
            <LikeFill />
          ) : (
            <Like />
          )}
        </div>

        <ProductInfo dir="col" title={title} img={img} price={price}>
          <p className={maximumNotice}>
            {isQtyReachedMax
              ? "You reach to the limit"
              : `You can add ${remainingItems} more item(s)`}
          </p>
        </ProductInfo>

        <Button
          onClick={() => handleAddToCart(id)}
          variant="info"
          disabled={isBtnDisabled || isQtyReachedMax}
          style={{ color: "white" }}
        >
          {isBtnDisabled ? (
            <span className="d-flex gap-2 justify-content-center align-items-center">
              <Spinner animation="border" size="sm" /> Loading...
            </span>
          ) : (
            "Add to cart"
          )}
        </Button>
      </div>
    </>
  );
});

export default Product;
