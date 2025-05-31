import { useState, useMemo, type SelectHTMLAttributes } from 'react';
import type { UseFormReturnType } from '@mantine/form';
import { Check } from 'lucide-react';

type Option = {
  label: string;
  value: string;
};

type SearchableMultiSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> & {
  label?: string;
  name: string;
  form: UseFormReturnType<Record<string, unknown>>;
  withAsterisk?: boolean;
  options: Option[];
  maxVisibleValues?: number;
};

export function CustomSearchableMultiSelect({
  label,
  name,
  form,
  withAsterisk,
  options,
  maxVisibleValues = 2,
//   ...rest
}: SearchableMultiSelectProps) {
  const { value, onChange, onBlur } = form.getInputProps(name);
  const selectedValues: string[] = Array.isArray(value) ? value : [];

  const [searchTerm, setSearchTerm] = useState('');
  const [focused, setFocused] = useState(false);

  const filteredOptions = useMemo(
    () => options.filter((opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm, options]
  );

  const error = form.errors[name];
  const isInvalid = !!error;

  const toggleValue = (val: string) => {
    const newValues = selectedValues.includes(val)
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val];
    form.setFieldValue(name, newValues);
    onChange(newValues);
  };

  const renderSelectedDisplay = () => {
    const visible = selectedValues.slice(0, maxVisibleValues);
    const extraCount = selectedValues.length - maxVisibleValues;

    return (
      <div className="flex flex-wrap gap-1 mb-2">
        {visible.map((val, idx) => {
          const label = options.find((opt) => opt.value === val)?.label || val;
          return (
            <span
              key={idx}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
            >
              {label}
            </span>
          );
        })}
        {extraCount > 0 && (
          <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-md">
            +{extraCount} more
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {withAsterisk && <span className="text-red-500">*</span>}
        </label>
      )}

      {renderSelectedDisplay()}

      <div className="relative w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            if (onBlur) onBlur(e); 
          }}
          placeholder="Search..."
          className="w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2"
        />

        <div
          className={`absolute w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-auto ${focused ? 'block' : 'hidden'}`}
        >
          {filteredOptions.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500">No results found</div>
          )}
          {filteredOptions.map((opt) => {
            const isSelected = selectedValues.includes(opt.value);
            return (
              <div
                key={opt.value}
                onClick={() => toggleValue(opt.value)}
                className={`flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                  isSelected ? 'bg-blue-100 text-blue-700 font-medium' : ''
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-4 h-4 text-blue-500" />}
              </div>
            );
          })}
        </div>
      </div>

      {isInvalid && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

{/* <CustomSearchableMultiSelect
  label="Tags"
  name="tags"
  form={form}
  options={[
    { label: 'Urgent', value: 'urgent' },
    { label: 'Bug', value: 'bug' },
    { label: 'Feature', value: 'feature' },
    { label: 'UI', value: 'ui' },
    { label: 'Backend', value: 'backend' },
  ]}
  maxVisibleValues={3}
  onChange={(newValues) => console.log('Updated selected values:', newValues)}  // onChange callback
  onBlur={() => console.log('Input blurred')}  // onBlur callback
  className="custom-select-class"  // Example custom className
/> */}

