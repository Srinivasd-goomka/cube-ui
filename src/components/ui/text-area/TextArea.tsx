import type { TextareaHTMLAttributes } from 'react';
import type { UseFormReturnType } from '@mantine/form';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  name: string;
  form: UseFormReturnType<Record<string, unknown>>;
  withAsterisk?: boolean;
};

export function TextArea({
  label,
  name,
  form,
  withAsterisk,
  ...rest
}: TextAreaProps) {
  const { value, onChange, onBlur } = form.getInputProps(name);
  const error = form.errors[name];
  const isInvalid = !!error;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {withAsterisk && <span className="text-red-500">*</span>}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-3 py-2 border rounded-md shadow-sm text-sm resize-vertical min-h-[100px] focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          isInvalid ? 'border-red-500' : 'border-gray-300'
        }`}
        {...rest}
      />

      {isInvalid && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
