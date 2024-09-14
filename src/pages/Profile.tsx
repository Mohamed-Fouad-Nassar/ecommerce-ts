import Heading from "@components/ui/Heading";

import { useAppSelector } from "@store/hooks";

export default function Profile() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <Heading title="Your Profile" />
      <ul>
        <li>First Name: {user?.firstName}</li>
        <li>Last Name: {user?.lastName}</li>
        <li>Email: {user?.email}</li>
      </ul>
    </>
  );
}
