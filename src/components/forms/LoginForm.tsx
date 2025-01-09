import { Navigate } from "react-router-dom";
import { Button, Form, Spinner } from "react-bootstrap";

import Input from "@components/ui/Input";

import useLogin from "@hooks/useLogin";

export default function LoginForm() {
  const { errors, loading, register, submitForm, accessToken, handleSubmit } =
    useLogin();

  if (accessToken) return <Navigate to="/" />;

  return (
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
            <Spinner size="sm" animation="border" role="status" color="white" />{" "}
            Loading...
          </>
        ) : (
          "Log in"
        )}
      </Button>
    </Form>
  );
}
