import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form, Row, Col } from "react-bootstrap";

import Input from "@components/ui/Input";

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

  const submitForm: SubmitHandler<LoginFormTypes> = (data) => {
    console.log(data);
  };

  return (
    <Row>
      <Col lg={{ span: 8, offset: 2 }}>
        <Form onSubmit={handleSubmit(submitForm)}>
          <Input
            name="email"
            label="Your Email"
            register={register}
            error={errors?.email?.message}
          />

          <Input
            type="password"
            name="password"
            label="Password"
            register={register}
            error={errors?.password?.message}
          />

          <Button
            variant="info"
            type="submit"
            style={{ color: "white", display: "block", marginLeft: "auto" }}
          >
            Log in
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

// <Form.Floating className="mb-3">
//   <Form.Control
//     id="floatingInputCustom"
//     type="email"
//     placeholder="name@example.com"
//     {...register("email")}
//     isInvalid={errors?.email?.message ? true : false}
//   />
//   <label htmlFor="floatingInputCustom">Email address</label>
//   <Form.Control.Feedback type="invalid">
//     {errors?.email?.message}
//   </Form.Control.Feedback>
// </Form.Floating>

// <Form.Floating className="mb-3">
//   <Form.Control
//     id="floatingPasswordCustom"
//     type="password"
//     placeholder="Password"
//     {...register("password")}
//     isInvalid={errors?.password?.message ? true : false}
//   />
//   <label htmlFor="floatingPasswordCustom">Password</label>
//   <Form.Control.Feedback type="invalid">
//     {errors?.password?.message}
//   </Form.Control.Feedback>
// </Form.Floating>
