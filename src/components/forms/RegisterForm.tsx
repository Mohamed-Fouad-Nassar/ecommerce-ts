import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form, Row, Col, Spinner, Alert } from "react-bootstrap";

import Input from "@components/ui/Input";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { register as authRegister, resetUi } from "@store/auth/authSlice";

import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";

import { RegisterFormTypes, registerSchema } from "@validations/registerSchema";

export default function RegisterForm() {
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

  if (accessToken) return <Navigate to="/" />;

  return (
    <Row>
      <Col lg={{ span: 8, offset: 2 }}>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit(SubmitForm)}>
          <Input
            name="firstName"
            label="First Name"
            register={register}
            error={errors?.firstName?.message}
            disabled={loading === "pending"}
          />

          <Input
            name="lastName"
            label="Last Name"
            register={register}
            error={errors?.lastName?.message}
            disabled={loading === "pending"}
          />

          <Input
            name="email"
            register={register}
            label="Email Address"
            onBlur={handleOnBlurEmail}
            disabled={emailStatus === "checking" || loading === "pending"}
            error={
              errors?.email?.message
                ? errors?.email?.message
                : emailStatus === "notAvailable"
                ? "This email is already in use"
                : emailStatus === "failed"
                ? "Error from the server"
                : ""
            }
            success={
              emailStatus === "available"
                ? "This email is available for use"
                : ""
            }
            formText={
              emailStatus === "checking"
                ? "We're currently checking the availability of this email address. Please wait a moment."
                : ""
            }
          />

          <Input
            type="password"
            name="password"
            label="Password"
            register={register}
            error={errors?.password?.message}
            disabled={loading === "pending"}
          />

          <Input
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            register={register}
            error={errors?.confirmPassword?.message}
            disabled={loading === "pending"}
          />

          <Button
            variant="info"
            type="submit"
            style={{
              color: "white",
              display: "block",
              marginLeft: "auto",
              fontSize: "large",
            }}
            disabled={emailStatus === "checking" || loading === "pending"}
          >
            {loading === "pending" ? (
              <>
                <Spinner
                  size="sm"
                  animation="border"
                  role="status"
                  color="white"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>{" "}
                Loading...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
