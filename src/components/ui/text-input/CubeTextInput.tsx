import { TextInputProps } from "../../../types";
import { X } from "lucide-react";

export function CubeTextInput<T>({
  label,
  name,
  form,
  withAsterisk,
  placeholder,
  clearable,
  maxtagcount,
  ...htmlAttributes
}: TextInputProps<T>) {
  const { value, onChange, onBlur } = form.getInputProps(name as string);
  const error = form.errors[name];
  const isInvalid = !!error;

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {withAsterisk && <span className="text-red-500">*</span>}
        </label>
      )}
      {maxtagcount && <></>}
      <div className="relative">
        <input
          {...htmlAttributes}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={name as string}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            isInvalid ? "border-red-500" : "border-gray-300"
          } ${value ? "pr-8" : ""}`}
        />

        {/* Clear button */}
        {value && clearable && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            aria-label="Clear input"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isInvalid && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
