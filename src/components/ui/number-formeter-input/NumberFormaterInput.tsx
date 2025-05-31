import { useEffect, useRef, type InputHTMLAttributes } from 'react';
import type { UseFormReturnType } from '@mantine/form';

type NumberFormatterInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  form: UseFormReturnType<Record<string, unknown>>;
  withAsterisk?: boolean;
  prefix?: string;
  thousandSeparator?: string | null; 
  decimalScale?: number | null;      
  fixedDecimalScale?: boolean;
  displayOnly?: boolean;
};

export function NumberFormatterInput({
  label,
  name,
  form,
  withAsterisk,
  prefix = '',
  thousandSeparator,
  decimalScale,
  fixedDecimalScale = true,
  displayOnly = false,
  ...rest
}: NumberFormatterInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { value, onBlur } = form.getInputProps(name);
  const error = form.errors[name];
  const isInvalid = !!error;

  const formatNumber = (val: string | number): string => {
    const num = parseFloat(String(val).replace(/[^\d.-]/g, ''));
    if (isNaN(num)) return '';

    let [intPart, decimalPart = ''] = num.toString().split('.');

    if (thousandSeparator) {
      intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
    }

    if (decimalScale !== null && fixedDecimalScale) {
      if (decimalScale !== null) {
        if (decimalScale !== null && decimalScale !== undefined) {
          decimalPart = (decimalPart + '0'.repeat(decimalScale)).slice(0, decimalScale);
        }
      }
      return `${prefix}${intPart}.${decimalPart}`;
    } else if (decimalScale !== null && decimalPart) {
      decimalPart = decimalPart.slice(0, decimalScale);
      return `${prefix}${intPart}.${decimalPart}`;
    }

    return `${prefix}${intPart}`;
  };

  const unformatNumber = (val: string): string => {
    const raw = val.replace(prefix, '');
    if (thousandSeparator) {
      return raw.replace(new RegExp(`\\${thousandSeparator}`, 'g'), '');
    }
    return raw;
  };

  useEffect(() => {
    if (inputRef.current && value !== '') {
      inputRef.current.value = formatNumber(value);
    }
  }, [value]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const raw = unformatNumber(e.target.value);
    form.setFieldValue(name, raw);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = unformatNumber(e.target.value);
    form.setFieldValue(name, raw);
  };

  if (displayOnly) {
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="text-sm text-gray-900">{formatNumber(value)}</div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {withAsterisk && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
            {prefix}
          </span>
        )}

        <input
          id={name}
          name={name}
          ref={inputRef}
          onChange={handleChange}
          onBlur={handleBlur}
          defaultValue={formatNumber(value)}
          className={`w-full px-3 py-2 ${prefix ? 'pl-8' : ''} border rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            isInvalid ? 'border-red-500' : 'border-gray-300'
          }`}
          inputMode="decimal"
          {...rest}
        />
      </div>

      {isInvalid && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
