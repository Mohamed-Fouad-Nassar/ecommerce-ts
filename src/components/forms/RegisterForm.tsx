import { Navigate } from "react-router-dom";
import { Button, Form, Row, Col, Spinner, Alert } from "react-bootstrap";

import Input from "@components/ui/Input";

import useRegister from "@hooks/useRegister";

export default function RegisterForm() {
  const {
    error,
    errors,
    loading,
    register,
    SubmitForm,
    accessToken,
    emailStatus,
    handleSubmit,
    handleOnBlurEmail,
  } = useRegister();

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
                <Spinner size="sm" animation="border" color="white" />{" "}
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
