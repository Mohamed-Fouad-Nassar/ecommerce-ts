import { Form } from "react-bootstrap";
import { FieldValues, UseFormRegister, Path } from "react-hook-form";

type InputProps<TFieldValue extends FieldValues> = {
  type?: string;
  label: string;
  error?: string;
  success?: string;
  formText?: string;
  disabled?: boolean;
  placeholder?: string;
  name: Path<TFieldValue>;
  register: UseFormRegister<TFieldValue>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export default function Input<TFieldValue extends FieldValues>({
  name,
  error,
  label,
  onBlur,
  success,
  disabled,
  register,
  formText,
  type = "text",
  placeholder = "",
}: InputProps<TFieldValue>) {
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else register(name).onBlur(e);
  };

  return (
    <Form.Floating className="mb-3">
      <Form.Control
        id={name}
        type={type}
        disabled={disabled}
        {...register(name)}
        onBlur={onBlurHandler}
        placeholder={placeholder}
        isInvalid={error ? true : false}
        isValid={success ? true : false}
      />
      <label htmlFor={name}>{label}</label>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      {formText && <Form.Text>{formText}</Form.Text>}
    </Form.Floating>
  );
}
