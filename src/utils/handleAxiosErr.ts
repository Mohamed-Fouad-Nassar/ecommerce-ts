import { isAxiosError } from "axios";

export default function handleAxiosErr(err: unknown) {
  if (isAxiosError(err))
    return err.response?.data || err.response?.data.message || err.message;
  else return "An Unexpected Error";
}
