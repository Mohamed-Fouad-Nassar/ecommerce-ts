import { AnimatePresence, motion } from "motion/react";

import ToastItem from "./ToastItem";

import { useAppSelector } from "@store/hooks";

import styles from "./styles.module.css";

export default function ToastList() {
  const { records } = useAppSelector((state) => state.toasts);

  return (
    <div className={styles.toastList}>
      <AnimatePresence>
        {records.map(
          ({ id, message, type, title, delayAppearance, onCloseToast }) => (
            <motion.div
              layout
              key={id}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeInOut" }}
            >
              <ToastItem
                id={id}
                type={type}
                title={title}
                message={message}
                delayAppearance={delayAppearance}
                onCloseToast={onCloseToast}
              />
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}
