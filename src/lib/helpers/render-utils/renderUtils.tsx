import { UseFormReturnType } from "@mantine/form";
import { RenderFieldProps } from "../../../types";
import { CubeTextInput } from "../../../components/ui/text-input/CubeTextInput";
import { CubeDateInput } from "../../../components/ui/date-input/CubeDateInput";
import { CubeNumberInput } from "../../../components/ui/number-input/CubeNumberInput";
import { CubeSelect } from "../../../components/ui/select/CubeSelect";
import { CubeMultiSelect } from "../../../components/ui/multiselect/CubeMultiSelect";
import { CubeCheckbox } from "../../../components/ui/checkbox/CubeCheckbox";
import { CubeJoditEditor } from "../../../components/ui/jodit-editor/CubeJoditEditor";

export const renderField = ({ field, form }: RenderFieldProps) => {
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

  const baseProps = {
    label,
    name: name as keyof Record<string, unknown>,
    form: form as UseFormReturnType<Record<string, unknown>>,
    withAsterisk: required,
    placeholder,
    required,
    prefix,
    options: options || [],
    clearable: clearable || true,
    maxtagcount: maxtagcount || 2,
  };

  switch (type) {
    case "text":
      return <CubeTextInput {...baseProps} key={field.name} />;
    case "number":
      return <CubeNumberInput {...baseProps} key={field.name} />;
    case "date":
      return <CubeDateInput {...baseProps} key={field.name} />;
    case "select":
      return <CubeSelect {...baseProps} key={field.name} />;
    case "multiselect":
      return <CubeMultiSelect {...baseProps} key={field.name} />;
    case "checkbox":
      return <CubeCheckbox {...baseProps} key={field.name} />;
    case "notes":
      return (
        <CubeJoditEditor
          key={field.name}
          value={(form.values[field.name] as string) || ""}
          onChange={(value) => form.setFieldValue(field.name, value)}
          height={field.height}
          // readonly={field.readonly}
          placeholder={field.placeholder}
          label={field.label}
          required={field.required}
        />
      );
    default:
      return null;
  }
};
