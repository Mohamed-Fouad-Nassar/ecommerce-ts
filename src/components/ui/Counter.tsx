import { Button } from "react-bootstrap";

import styles from "./counter.module.css";
const { counterContainer, counter } = styles;

type CounterProps = {
  handleIncrease: () => void;
  handleDecrease: () => void;
  disableIncrease: boolean;
  disableDecrease: boolean;
  count: number;
};

export default function Counter({
  handleIncrease,
  handleDecrease,
  disableIncrease,
  disableDecrease,
  count,
}: CounterProps) {
  return (
    <div className={counterContainer}>
      <Button
        variant="info"
        style={{ color: "white" }}
        onClick={handleDecrease}
        disabled={disableDecrease}
      >
        -
      </Button>

      <span className={counter}>{count}</span>

      <Button
        variant="info"
        style={{ color: "white" }}
        onClick={handleIncrease}
        disabled={disableIncrease}
      >
        +
      </Button>
    </div>
  );
}
