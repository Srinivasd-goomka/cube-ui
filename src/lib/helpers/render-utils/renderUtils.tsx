import { UseFormReturnType } from "@mantine/form";
import { RenderFieldProps } from "../../../types";
import { CubeTextInput } from "../../../components/ui/text-input/CubeTextInput";
import { CubeDateInput } from "../../../components/ui/date-input/CubeDateInput";
import { CubeNumberInput } from "../../../components/ui/number-input/CubeNumberInput";
import { CubeSelect } from "../../../components/ui/select/CubeSelect";
import { CubeMultiSelect } from "../../../components/ui/multiselect/CubeMultiSelect";
import { CubeCheckbox } from "../../../components/ui/checkbox/CubeCheckbox";
import { CubeJoditEditor } from "../../../components/ui/jodit-editor/CubeJoditEditor";
import { CubeSpecialSelect } from "../../../components/ui/special-select/CubeSpecialSelect";
import { Check } from "lucide-react";

const renderSelected = (option: unknown) => (
  <div className="flex items-center gap-2">
    <div>
      <div className="font-medium">{(option as { label: string }).label}</div>
    </div>
  </div>
);

const renderOption = (option: unknown, isSelected: boolean) => (
  <div className="flex items-center gap-3 w-full pl-3">
    <div className="flex-1 min-w-0">
      <div className="flex items-center">
        <span className="font-medium">{(option as { label: string }).label}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{(option as { description?: string }).description}</p>

      {"meta" in (option as object) && (option as { meta?: Record<string, unknown> }).meta && (
        <div className="flex gap-3 mt-2 text-xs text-gray-500">
          {Object.entries((option as { meta: Record<string, unknown> }).meta).map(([key, value]) => (
            <div key={key}>
              <span className="font-medium">{key}:</span> {String(value)}
            </div>
          ))}
        </div>
      )}
    </div>
    {isSelected && (
      <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
    )}
  </div>
);

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
    disabled,
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
          disabled={disabled}
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
          disabled={disabled}
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
          disabled={disabled}
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
          disabled={disabled}
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
          disabled={disabled}
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
          disabled={disabled}
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
    case "special-select":
      return (
        <CubeSpecialSelect
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
          renderSelected={renderSelected}
          renderOption={renderOption}
        />
      );
    default:
      return null;
  }
};
