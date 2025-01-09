import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { login, resetUi } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getWishlistItems } from "@store/wishlist/actions/getWishlistItems";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoginFormTypes, loginSchema } from "@validations/loginSchema";

export default function useLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormTypes>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, accessToken } = useAppSelector((state) => state.auth);

  const submitForm: SubmitHandler<LoginFormTypes> = async (data) => {
    dispatch(login(data))
      .unwrap()
      .then(() => toast.success("Logged in successfully."))
      .then(() => navigate("/"))
      .then(() => dispatch(getWishlistItems()))
      .catch((err) => toast.error(err));
  };

  useEffect(() => {
    dispatch(resetUi());
  }, [dispatch]);

  return {
    errors,
    loading,
    register,
    submitForm,
    accessToken,
    handleSubmit,
  };
}
