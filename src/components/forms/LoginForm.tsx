import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form, Row, Col, Alert, Spinner } from "react-bootstrap";

import Input from "@components/ui/Input";

import { login, resetUi } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import { LoginFormTypes, loginSchema } from "@validations/loginSchema";

export default function LoginForm() {
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
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);

  const submitForm: SubmitHandler<LoginFormTypes> = async (data) => {
    dispatch(login(data))
      .unwrap()
      .then(() => navigate("/"));
  };

  useEffect(() => {
    dispatch(resetUi());
  }, [dispatch]);

  if (accessToken) return <Navigate to="/" />;

  return (
    <Row>
      <Col lg={{ span: 8, offset: 2 }}>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit(submitForm)}>
          <Input
            name="email"
            label="Your Email"
            register={register}
            error={errors?.email?.message}
            disabled={loading === "pending"}
          />

          <Input
            type="password"
            name="password"
            label="Password"
            register={register}
            error={errors?.password?.message}
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
            disabled={loading === "pending"}
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
              "Log in"
            )}
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
