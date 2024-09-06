import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form, Row, Col } from "react-bootstrap";

import Input from "@components/ui/Input";

import { RegisterFormTypes, registerSchema } from "@validations/registerSchema";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";

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

  const SubmitForm: SubmitHandler<RegisterFormTypes> = (data) => {
    console.log(data);
  };

  return (
    <Row>
      <Col lg={{ span: 8, offset: 2 }}>
        <Form onSubmit={handleSubmit(SubmitForm)}>
          <Input
            name="firstName"
            label="First Name"
            register={register}
            error={errors?.firstName?.message}
          />

          <Input
            name="lastName"
            label="Last Name"
            register={register}
            error={errors?.lastName?.message}
          />

          <Input
            name="email"
            register={register}
            label="Email Address"
            onBlur={handleOnBlurEmail}
            disabled={emailStatus === "checking"}
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
          />

          <Input
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            register={register}
            error={errors?.confirmPassword?.message}
          />

          <Button
            variant="info"
            type="submit"
            style={{ color: "white", display: "block", marginLeft: "auto" }}
            disabled={emailStatus === "checking"}
          >
            Register
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

{
  /* <Form.Group className="mb-3">
<Form.Label>First Name</Form.Label>
<Form.Control
type="text"
{...register("firstName")}
isInvalid={errors?.firstName?.message ? true : false}
/>
<Form.Control.Feedback type="invalid">
{errors?.firstName?.message}
</Form.Control.Feedback>
</Form.Group>
<Form.Group className="mb-3">
<Form.Label>Last Name</Form.Label>
<Form.Control
type="text"
{...register("lastName")}
isInvalid={errors?.lastName?.message ? true : false}
/>
<Form.Control.Feedback type="invalid">
{errors?.lastName?.message}
</Form.Control.Feedback>
</Form.Group>
<Form.Group className="mb-3">
<Form.Label>Email address</Form.Label>
<Form.Control
type="email"
{...register("email")}
isInvalid={errors?.email?.message ? true : false}
/>
<Form.Control.Feedback type="invalid">
{errors?.email?.message}
</Form.Control.Feedback>
</Form.Group>
<Form.Group className="mb-3">
<Form.Label>Password</Form.Label>
<Form.Control
type="password"
{...register("password")}
isInvalid={errors?.password?.message ? true : false}
/>
<Form.Control.Feedback type="invalid">
{errors?.password?.message}
</Form.Control.Feedback>
</Form.Group>
<Form.Group className="mb-3">
<Form.Label>Confirm Password</Form.Label>
<Form.Control
type="confirmPassword"
{...register("confirmPassword")}
isInvalid={errors?.confirmPassword?.message ? true : false}
/>
<Form.Control.Feedback type="invalid">
{errors?.confirmPassword?.message}
</Form.Control.Feedback>
</Form.Group> */
}
