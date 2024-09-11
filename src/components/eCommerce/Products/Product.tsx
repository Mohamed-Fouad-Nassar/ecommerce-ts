import { Button, Spinner } from "react-bootstrap";
import { useEffect, useState, memo } from "react";
// import { useNavigate } from "react-router-dom";

import MyModal from "@components/ui/MyModal";
// import Counter from "@components/ui/Counter";

import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";

import { toggleLike } from "@store/wishlist/wishlistSlice";

import { TProduct } from "@customTypes/product.types";

import { useAppDispatch } from "@store/hooks";

import { addToCart } from "@store/cart/cartSlice";

import styles from "./product.module.css";
const { product, productImg, maximumNotice, wishlistBtn } = styles;

const Product = memo(function Product({
  id,
  title,
  // cat_prefix,
  img,
  price,
  max = 0,
  quantity = 0,
  isLiked,
  isAuthorized,
}: TProduct) {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isBtnDisabled) return;

    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  const handleAddToCart = () => {
    setIsBtnDisabled(true);
    dispatch(addToCart(id));
  };

  const handleLikeToggle = () => {
    if (isAuthorized) {
      setIsLoading(true);
      dispatch(toggleLike(id))
        .unwrap()
        .then(() => setIsLoading(false));
    } else setShowModal(true);
  };

  const remainingItems = max - quantity;
  const isQtyReachedMax = remainingItems <= 0;
  // const isInCart = quantity > 0;

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

        {/* <MyModal.Footer>
          <Button onClick={() => setShowModal(false)} variant="primary">
            Close
          </Button>
        </MyModal.Footer> */}
      </MyModal>

      <div className={product}>
        <div className={wishlistBtn} onClick={handleLikeToggle}>
          {isLoading ? (
            <Spinner animation="border" size="sm" variant="primary" />
          ) : isLiked ? (
            <LikeFill />
          ) : (
            <Like />
          )}

          {/* <Like /> */}
        </div>

        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <h2>{title}</h2>
        <h3>{price?.toFixed(2)} EGP</h3>

        <p className={maximumNotice}>
          {isQtyReachedMax
            ? "You reach to the limit"
            : `You can add ${remainingItems} more item(s)`}
        </p>

        {/* 
      <Button
        onClick={() => navigate(`/products/${cat_prefix}/${id}`)}
        variant="info"
        style={{ color: "white" }}
      >
        view product
      </Button> */}

        <Button
          onClick={handleAddToCart}
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
        {/* {isInCart ? (
        <Counter
          disableIncrease={isBtnDisabled || isQtyReachedMax}
          disableDecrease={isBtnDisabled || isQtyReachedMax}
          handleDecrease={handleAddToCart}
          handleIncrease={handleAddToCart}
          count={quantity}
        />
      ) : (
        <Button
          onClick={handleAddToCart}
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
      )} */}
      </div>
    </>
  );
});

export default Product;
