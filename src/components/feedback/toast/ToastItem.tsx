import useToast from "@hooks/useToast";

import { TToast } from "@customTypes/toast.types";

import styles from "./styles.module.css";

export default function ToastItem({
  id,
  type,
  title,
  message,
  onCloseToast,
  delayAppearance = false,
}: TToast) {
  const {
    intervalTime,
    handleCloseToast,
    progressBarIndicator,
    handlePauseToastTimer,
  } = useToast(id, delayAppearance, onCloseToast);

  if (delayAppearance) return;

  return (
    <div
      className={`${styles.toastItem} alert alert-${type}`}
      role="alert"
      onMouseLeave={handlePauseToastTimer}
      onMouseEnter={handlePauseToastTimer}
    >
      <button
        className="btn btn-close btn-sm"
        onClick={handleCloseToast}
      ></button>
      {title && <h4>{title}</h4>}
      <p>{message}</p>
      {/* <div className="d-flex align-items-center"></div> */}
      <span
        className="placeholder"
        style={{
          width: `${progressBarIndicator}%`,
          transition: `width ${intervalTime}ms linear`,
        }}
      ></span>
    </div>
  );
}
