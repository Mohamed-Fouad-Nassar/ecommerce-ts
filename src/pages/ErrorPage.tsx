import { Container } from "react-bootstrap";
import {
  // isRouteErrorResponse,
  Link,
  //  useRouteError
} from "react-router-dom";

import LottieHandler from "@components/feedback/LottieHandler";

export default function ErrorPage() {
  // const error = useRouteError();
  // let errorStatus: number;
  // let errorStatusText: string;

  // if (isRouteErrorResponse(error)) {
  //   errorStatus = error.status;
  //   errorStatusText = error.statusText;
  // } else {
  //   errorStatus = 404;
  //   errorStatusText = "Page Not Found";
  // }

  return (
    <section className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center text-center">
      <Container>
        {/* <h1 className="mb-4 display-1 fw-bold">{errorStatus}</h1>
        <h3>Oops! You're lost.</h3>
        <p>{errorStatusText}</p> */}

        <LottieHandler
          type="notFound"
          message={`Oops! You're lost.`}
          lottieStyle={{ width: "350px" }}
        />

        <Link
          to="/"
          replace={true}
          className="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0 mt-4"
        >
          Back to Home
        </Link>
      </Container>
    </section>
  );
}
