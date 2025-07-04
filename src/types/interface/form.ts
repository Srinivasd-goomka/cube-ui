import { UseFormReturnType } from "@mantine/form";
import { InputHTMLAttributes, SelectHTMLAttributes } from "react";

export interface FieldOption {
  label: string;
  value: string | number;
  product_type?: string;
}

export interface FieldConfig {
  type: string;
  label: string;
  name: string;
  required?: boolean;
  validation?: { required?: string };
  options?: FieldOption[];
  width?: number | undefined;
  placeholder?: string;
  prefix?: string;
  searchable?: boolean;
  clearable?: boolean;
  maxtagcount?: number;
  disabled?: boolean;
  height?: number;
  showCondition?: (formValues: Record<string, unknown>) => boolean;
  field?: unknown;
  form?: unknown;
  marginTop?: string;
  isField?: boolean;
}

export interface DynamicFormProps {
  fields: FieldConfig[];
  onSubmit: (values: Record<string, unknown>) => void;
  defaultMapTriggerField?: string;
  defaultBaseValues?: Record<string, unknown>;
  defaultOverrides?: Record<string, Record<string, unknown>>;
}

export type FormType = UseFormReturnType<Record<string, unknown>>;

export interface FormFieldProps<T> {
  label?: string;
  name: keyof T & string;
  form: UseFormReturnType<Record<string, unknown>>;
  withAsterisk?: boolean;
  prefix?: string;
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  maxtagcount?: number;
}

export type TextInputProps<T> = FormFieldProps<T> &
  Omit<InputHTMLAttributes<HTMLInputElement>, "name">;

export type DateInputProps<T = unknown> = {
  label?: string;
  name: keyof T;
  form: UseFormReturnType<Record<string, unknown>>;
  withAsterisk?: boolean;
  required?: boolean;
  disabled?: boolean;
};

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "value" | "onChange" | "form"
> & {
  label?: string;
  name: string;
  form: UseFormReturnType<Record<string, unknown>>;
  withAsterisk?: boolean;
  options: FieldOption[];
  tickPosition?: "left" | "right" | "only-tick";
  searchable?: boolean;
  placeholder?: string;
  clearable?: boolean;
  maxWidth?: string;
  maxtagcount?: number;
  disabled?: boolean;
  renderOption?: unknown;
  renderSelected?: unknown;
  className?: string;
};

export interface RenderFieldProps<T> {
  field: FieldConfig;
  form: UseFormReturnType<T, (values: T) => T>;
}

export interface FormValues {
  [key: string]: unknown;
}
