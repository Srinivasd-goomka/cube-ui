import { TextInputProps } from "../../../types";

export function CubeCheckbox<T>({
  label,
  name,
  form,
  withAsterisk,
  clearable,
  ...rest
}: TextInputProps<T>) {
  const { checked, onChange, onBlur } = form.getInputProps(name, {
    type: "checkbox",
  });
  const error = form.errors[name];
  const isInvalid = !!error;

  return (
    <div className="mb-4">
      <label className="flex items-center space-x-2 cursor-pointer">
        {clearable && <></>}
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-4 h-4 border rounded shadow-sm text-blue-600 focus:ring-1 focus:ring-blue-500 ${
            isInvalid ? "border-red-500" : "border-gray-300"
          }`}
          {...rest}
        />
        {label && (
          <span className="text-sm text-gray-800">
            {label} {withAsterisk && <span className="text-red-500">*</span>}
          </span>
        )}
      </label>

      {isInvalid && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
