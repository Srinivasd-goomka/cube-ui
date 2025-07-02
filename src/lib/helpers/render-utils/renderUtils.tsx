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

export const Instructions = () => (
  <div
    className="flex bg-[#fffddd] border border-[#c4b700] p-2 flex-col gap-2 rounded-md text-[12px] font-semibold"
    role="alert"
  >
    <span>Please remember to quote your customer the winter service fee!</span>
    <span>
      Cold month: None <br />
      Winter Service Fee: $N/A
    </span>
    <span>Recommended 1 Toilet for up to 20 employees</span>
  </div>
);

export const Section = (field: React.ReactNode) => (
  <div className="flex flex-row gap-2 border-b border-[#afbaca] text-slategray font-semibold pb-2">
    {field}
  </div>
);

const renderProductTypeSelected = (option: unknown) => {
  return (
    <div className="flex items-center gap-2">
      <div>
        <div className="font-medium">{String(option)}</div>
      </div>
    </div>
  );
};

const renderProductTypeOption = (option: unknown, isSelected: boolean) => {
  return (
    <div className="flex items-center gap-3 w-full pl-3">
      <div className="flex-1 min-w-0">
        <div className="flex-row gap-4 grid grid-cols-1 md:grid-cols-12">
          <div className="flex flex-col col-span-5">
            <span className="uppercase text-[11px]">Abbreviation</span>
            <span className="font-medium truncate">
              {(option as { label: string }).label}
            </span>
          </div>
          <div className="flex flex-col col-span-6">
            <span className="uppercase text-[11px]">Product Type</span>
            <span className="font-medium truncate">
              {(option as { product_type: string }).product_type}
            </span>
          </div>
        </div>
        {/* <p className="text-sm text-gray-600 mt-1">
        {(option as { description?: string }).description}
      </p> */}

        {/* {"meta" in (option as object) &&
        (option as { meta?: Record<string, unknown> }).meta && (
          <div className="flex gap-3 mt-2 text-xs text-gray-500">
            {Object.entries(
              (option as { meta: Record<string, unknown> }).meta
            ).map(([key, value]) => (
              <div key={key}>
                <span className="font-medium">{key}:</span> {String(value)}
              </div>
            ))}
          </div>
        )} */}
      </div>
      {isSelected && (
        <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
      )}
    </div>
  );
};

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
    case "specialSelect":
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
          renderSelected={renderProductTypeSelected}
          renderOption={renderProductTypeOption}
        />
      );
    case "instructions":
      return <Instructions />;
    case "section":
      return Section(label);
    default:
      return null;
  }
};
