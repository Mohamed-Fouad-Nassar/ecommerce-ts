import { useCallback, useEffect, useState } from "react";

import { useAppDispatch } from "@store/hooks";
import { removeToast, stopToastDelay } from "@store/toast/toastsSlice";

export default function useToast(
  id: string,
  delayAppearance: boolean,
  onCloseToast?: () => void
) {
  const dispatch = useAppDispatch();

  const [progressBarIndicator, setProgressBarIndicator] = useState(0);
  const [progressBarPause, setProgressBarPause] = useState(true);

  const delay = 1000;
  const duration = 4000;
  const progressbarScale = 100;
  const intervalTime = duration / progressbarScale;

  const handleCloseToast = useCallback(() => {
    dispatch(removeToast(id));
    onCloseToast?.();
  }, [dispatch, id, onCloseToast]);

  const handlePauseToastTimer = () => setProgressBarPause((prev) => !prev);

  useEffect(() => {
    if (delayAppearance) return;

    const intervalId = setInterval(() => {
      setProgressBarIndicator((prev) => {
        if (prev < progressbarScale && progressBarPause) return prev + 1;
        return prev;
      });
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [intervalTime, delayAppearance, progressBarPause]);

  useEffect(() => {
    if (progressBarIndicator === progressbarScale) handleCloseToast();
  }, [progressBarIndicator, handleCloseToast]);

  useEffect(() => {
    if (delayAppearance) {
      const timerId = setTimeout(() => {
        dispatch(stopToastDelay(id));
      }, delay);

      return () => clearTimeout(timerId);
    }
  }, [delayAppearance, dispatch, id]);

  return {
    intervalTime,
    handleCloseToast,
    progressBarIndicator,
    handlePauseToastTimer,
  };
}
