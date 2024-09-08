import axios from "axios";
import { useState } from "react";

type TEmailStatus =
  | "idle"
  | "checking"
  | "available"
  | "notAvailable"
  | "failed";

export default function useCheckEmailAvailability() {
  const [prevEmail, setPrevEmail] = useState<null | string>(null);
  const [emailStatus, setEmailStatus] = useState<TEmailStatus>("idle");

  const checkEmailAvailability = async (email: string) => {
    setPrevEmail(email);
    setEmailStatus("checking");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/users?email=${email}`
      );
      if (!response.data.length) setEmailStatus("available");
      else setEmailStatus("notAvailable");
    } catch (err) {
      setEmailStatus("failed");
    }
  };

  const resetEmailAvailability = () => {
    setPrevEmail(null);
    setEmailStatus("idle");
  };

  return {
    prevEmail,
    emailStatus,
    checkEmailAvailability,
    resetEmailAvailability,
  };
}
