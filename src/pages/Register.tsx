import Heading from "@components/ui/Heading";
import AuthTextLink from "@components/ui/AuthTextLink";
import RegisterForm from "@components/forms/RegisterForm";

export default function Register() {
  return (
    <>
      <Heading title="user registration" />
      <RegisterForm />
      <AuthTextLink
        title="Log in"
        path="/auth/login"
        text="Already have an account?"
      />
    </>
  );
}
