import { cn } from "../../../lib/helpers";
import { TextInputProps } from "../../../types";

export function CubeCheckbox<T>({
  label,
  name,
  form,
  withAsterisk,
  disabled = false,
  ...htmlAttributes
}: TextInputProps<T>) {
  const { checked, onChange, onBlur } = form.getInputProps(name, {
    type: "checkbox",
  });
  const error = form.errors[name];
  const isInvalid = !!error;

  return (
    <div className="mb-4">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={cn(
            "w-4 h-4 border rounded shadow-sm text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-1",
            isInvalid ? "border-red-500" : "border-gray-300",
            disabled && "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
          {...htmlAttributes}
        />
        {label && (
          <span
            className={cn(
              "block text-sm font-medium mb-1",
              disabled ? "text-gray-400" : "text-gray-700"
            )}
          >
            {label}
            {withAsterisk && <span className="text-red-500">*</span>}
          </span>
        )}
      </label>

      {isInvalid && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
