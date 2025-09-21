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
  label?: string;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  name: Path<T>;
  register?: UseFormRegister<T>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  image?: string;
};

export interface RatingProps {
  value: number; 
  max?: number;  
}

export type User = { id: string; email: string } | null;

export interface AuthContextType {
  user: User;
  login: (user: User) => void;
  logout: () => void;
}