import { UseFormReturnType } from "@mantine/form";
import { RenderFieldProps } from "../../../types";
import { CubeTextInput } from "../../../components/ui/text-input/CubeTextInput";
import { CubeDateInput } from "../../../components/ui/date-input/CubeDateInput";
import { CubeNumberInput } from "../../../components/ui/number-input/CubeNumberInput";
import { CubeSelect } from "../../../components/ui/select/CubeSelect";
import { CubeMultiSelect } from "../../../components/ui/multiselect/CubeMultiSelect";
import { CubeCheckbox } from "../../../components/ui/checkbox/CubeCheckbox";
import { CubeJoditEditor } from "../../../components/ui/jodit-editor/CubeJoditEditor";

export const renderField = <T extends Record<string, unknown>>({
  field,
  form,
}: RenderFieldProps<T>) => {
  const {
    type,
    label,
    name,
    required,
    placeholder,
    prefix,
    options,
    clearable,
    maxtagcount,
  } = field;

  // Convert name to string since Mantine expects string keys
  const fieldName = name as keyof T & string;

  switch (type) {
    case "text":
      return (
        <CubeTextInput
          key={fieldName}
          label={label}
          name={fieldName}
          form={form as UseFormReturnType<Record<string, unknown>>}
          withAsterisk={required}
          placeholder={placeholder}
          prefix={
            prefix === "currency" || prefix === "percent" ? prefix : undefined
          }
        />
      );
    case "number":
      return (
        <CubeNumberInput
          key={fieldName}
          label={label}
          name={fieldName}
          // @ts-expect-error: form type may not match CubeNumberInput expected type, but is compatible in usage
          form={form as UseFormReturnType<Record<string, unknown>>}
          withAsterisk={required}
          placeholder={placeholder}
          required={required}
          prefix={
            prefix === "currency" || prefix === "percent" ? prefix : undefined
          }
        />
      );
    case "date":
      return (
        <CubeDateInput
          key={fieldName}
          label={label}
          // @ts-expect-error: form type may not match CubeNumberInput expected type, but is compatible in usage
          name={fieldName}
          form={form as UseFormReturnType<Record<string, unknown>>}
          withAsterisk={required}
          required={required}
        />
      );
    case "select":
      return (
        <CubeSelect
          key={fieldName}
          label={label}
          name={fieldName}
          // @ts-expect-error: form type may not match CubeNumberInput expected type, but is compatible in usage
          form={form as UseFormReturnType<Record<string, unknown>>}
          withAsterisk={required}
          placeholder={placeholder}
          required={required}
          options={options || []}
          clearable={clearable || true}
        />
      );
    case "multiselect":
      return (
        <CubeMultiSelect
          key={fieldName}
          label={label}
          name={fieldName}
          // @ts-expect-error: form type may not match CubeNumberInput expected type, but is compatible in usage
          form={form as UseFormReturnType<Record<string, unknown>>}
          withAsterisk={required}
          placeholder={placeholder}
          required={required}
          options={options || []}
          clearable={clearable || true}
          maxtagcount={maxtagcount || 2}
        />
      );
    case "checkbox":
      return (
        <CubeCheckbox
          key={fieldName}
          label={label}
          name={fieldName}
          // @ts-expect-error: form type may not match CubeNumberInput expected type, but is compatible in usage
          form={form as UseFormReturnType<Record<string, unknown>>}
          withAsterisk={required}
          required={required}
        />
      );
    case "notes":
      return (
        <CubeJoditEditor
          key={fieldName}
          value={(form.values[name as keyof T] as string) || ""}
          onChange={(value: string) =>
            // @ts-expect-error: form type may not match CubeNumberInput expected type, but is compatible in usage
            form.setFieldValue(name as keyof T, value as T[keyof T])
          }
          height={field.height}
          placeholder={field.placeholder}
          label={field.label}
          required={field.required}
        />
      );
    default:
      return null;
  }
};
