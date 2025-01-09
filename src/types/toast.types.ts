export type TToastState = "success" | "danger" | "warning" | "info";

export type TToastWithoutId = {
  title?: string;
  message: string;
  type: TToastState;
  delayAppearance?: boolean;
  onCloseToast?: () => void;
};
export type TToast = {
  id: string;
} & TToastWithoutId;
