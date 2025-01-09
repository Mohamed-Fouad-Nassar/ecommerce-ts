import Heading from "@components/ui/Heading";
import LoginForm from "@components/forms/LoginForm";
import AuthTextLink from "@components/ui/AuthTextLink";

export default function Login() {
  return (
    <>
      <Heading title="user login" />
      <LoginForm />
      <AuthTextLink
        title="create account"
        path="/auth/register"
        text="Don't have an account?"
      />
    </>
  );
}
