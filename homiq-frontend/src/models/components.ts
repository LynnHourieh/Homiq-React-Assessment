/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldError, UseFormRegister, Path } from "react-hook-form";

export type LoginFormInputs = {
  email: string;
  password: string;
};

export type SignUpFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export interface InputFieldProps<T extends Record<string, any>> {
  label: string;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  name: Path<T>;
  register: UseFormRegister<T>;
}
