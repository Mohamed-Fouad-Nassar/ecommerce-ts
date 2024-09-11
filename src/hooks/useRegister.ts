import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { register as authRegister, resetUi } from "@store/auth/authSlice";

import { RegisterFormTypes, registerSchema } from "@validations/registerSchema";

import useCheckEmailAvailability from "./useCheckEmailAvailability";

export default function useRegister() {
  const {
    trigger,
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
  } = useForm<RegisterFormTypes>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);

  const {
    prevEmail,
    emailStatus,
    checkEmailAvailability,
    resetEmailAvailability,
  } = useCheckEmailAvailability();

  const handleOnBlurEmail = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");

    if (isDirty && !invalid && prevEmail !== value)
      checkEmailAvailability(value);

    if (isDirty && invalid && prevEmail) resetEmailAvailability();
  };

  const SubmitForm: SubmitHandler<RegisterFormTypes> = async (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(authRegister({ email, password, firstName, lastName }))
      .unwrap()
      .then(() => navigate("/login"));
  };

  useEffect(() => {
    dispatch(resetUi());
  }, [dispatch]);

  return {
    error,
    errors,
    loading,
    register,
    SubmitForm,
    accessToken,
    emailStatus,
    handleSubmit,
    handleOnBlurEmail,
  };
}
