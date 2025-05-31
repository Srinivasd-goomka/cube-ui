import { useState, useEffect, type SelectHTMLAttributes } from 'react';
import type { UseFormReturnType } from '@mantine/form';
import { Check } from 'lucide-react';

type Option = {
  label: string;
  value: string | number;
};

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> & {
  label?: string;
  name: string;
  form: UseFormReturnType<Record<string, unknown>>;
  withAsterisk?: boolean;
  options: Option[];
  tickPosition?: 'first' | 'last' | 'inside'; // NEW: tick customization
};

export function Select({
  label,
  name,
  form,
  withAsterisk,
  options,
  tickPosition = 'inside',
  ...rest
}: SelectProps) {
  const { value, onChange, onBlur } = form.getInputProps(name);
  const error = form.errors[name];
  const isInvalid = !!error;
  const [selected, setSelected] = useState<string | number>(value);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSelected(value);
  }, [value]);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderOption = (option: Option, index: number) => {
    const isSelected = selected === option.value;
    const tickIcon = (
      <Check className="w-4 h-4 text-green-500" strokeWidth={2} />
    );

    return (
      <option
        key={index}
        value={option.value}
        className={`py-2 px-3 ${
          isSelected ? 'bg-blue-50 text-blue-700 font-medium' : ''
        }`}
      >
        {tickPosition === 'first' && isSelected && '✔ '}
        {option.label}
        {tickPosition === 'last' && isSelected && ' ✔'}
        {tickPosition === 'inside' && isSelected && (
          <span className="inline-block ml-2 align-middle">{tickIcon}</span>
        )}
      </option>
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    onChange(e);
  };

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {withAsterisk && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {/* Search input for filtering */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="w-full px-3 py-2 border rounded-md shadow-sm text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      <select
        id={name}
        name={name}
        value={selected}
        onChange={handleChange}
        onBlur={onBlur}
        className={`w-full px-3 py-2 border rounded-md shadow-sm text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          isInvalid ? 'border-red-500' : 'border-gray-300'
        }`}
        {...rest}
      >
        <option value="" disabled>
          Select an option
        </option>
        {filteredOptions.map(renderOption)}
      </select>

      {isInvalid && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
