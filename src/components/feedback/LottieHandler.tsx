import Lottie from "lottie-react";
import { CSSProperties } from "react";

import error from "@assets/lottieFiles/error.json";
import empty from "@assets/lottieFiles/empty.json";
import loading from "@assets/lottieFiles/loading.json";
import shipping from "@assets/lottieFiles/shipping.json";
import noResult from "@assets/lottieFiles/noResult.json";
import notFound from "@assets/lottieFiles/notFound.json";

const lotties = {
  notFound,
  error,
  empty,
  loading,
  shipping,
  noResult,
};

type LottieHandlerProps = {
  type: keyof typeof lotties;
  message?: string;
  lottieStyle?: CSSProperties;
};

export default function LottieHandler({
  type,
  message,
  lottieStyle,
}: LottieHandlerProps) {
  const lottie = lotties[type];
  const messageStyle: CSSProperties =
    type === "error"
      ? {
          fontSize: "1rem",
          color: "red",
          textAlign: "center",
          marginTop: "-45px",
        }
      : { fontSize: "1rem", textAlign: "center" };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-5 py-sm-0 mt-5 py-md-5 px-2">
      <Lottie
        animationData={lottie}
        style={lottieStyle}
        // style={{ ...lottieStyle, width: "300px" }}
      />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  );
}
