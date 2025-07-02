import { useState, useEffect, useRef } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { SelectProps } from "../../../types";
import { cn } from "../../../lib/helpers";

export function CubeSelect({
  label,
  name,
  form,
  withAsterisk,
  options,
  tickPosition = "right",
  searchable = true,
  placeholder = "Select an option",
  clearable = true,
  maxWidth = "100%",
  disabled = false,
}: SelectProps) {
  const { value, onChange, onBlur } = form.getInputProps(name);
  const error = form.errors[name];
  const isInvalid = !!error;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<string | number>(value);
  const [position, setPosition] = useState<"above" | "below">("below");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search term when searchable
  const filteredOptions =
    searchable && Array.isArray(options)
      ? options.filter((option) =>
          option?.label
            ?.toLowerCase?.()
            .includes(searchTerm?.toLowerCase?.() || "")
        )
      : options || [];

  // Sync with form value
  useEffect(() => {
    setSelected(value);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onBlur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  // Auto-position dropdown based on available space
  useEffect(() => {
    if (isOpen && wrapperRef.current) {
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - wrapperRect.bottom;
      const spaceAbove = wrapperRect.top;
      const dropdownHeight = 300; // Approximate height

      // Default to below if there's enough space, otherwise above
      const shouldPositionAbove =
        spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

      setPosition(shouldPositionAbove ? "above" : "below");

      // Focus the input when dropdown opens
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isOpen]);

  const handleSelect = (value: string | number) => {
    setSelected(value);
    onChange(value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected("");
    onChange("");
    setSearchTerm("");
    setIsOpen(false);
  };

  const getSelectedLabel = (): string => {
    if (!Array.isArray(options) || !selected) return "";
    const selectedOption = options.find((option) => option.value === selected);
    return selectedOption?.label || "";
  };

  // Toggle dropdown open/closed
  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div ref={wrapperRef} style={{ maxWidth }}>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            "block text-sm font-medium mb-1",
            disabled ? "text-gray-400" : "text-gray-700"
          )}
        >
          {label} {withAsterisk && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Combined search/selected area */}
        <div
          className={cn(
            "flex items-center w-full px-3 py-2.5 border rounded-md shadow-sm text-sm",
            {
              "border-red-500": isInvalid,
              "border-gray-300": !isInvalid,
              "ring-1 ring-blue-500": isOpen,
              "bg-gray-100 text-gray-400 cursor-not-allowed": disabled,
              "bg-white focus-within:ring-1 focus-within:ring-blue-500":
                !disabled,
            }
          )}
          onClick={() => {
            if (disabled) return;
            setIsOpen(true);
          }}
        >
          {/* Search icon - conditionally shown */}
          {/* {searchable && (
            <Search className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
          )} */}

          {/* Input field for search and display */}
          <input
            ref={inputRef}
            type="text"
            disabled={disabled}
            value={isOpen && searchable ? searchTerm : getSelectedLabel()}
            onChange={(e) => {
              if (disabled) return;
              if (isOpen && searchable) setSearchTerm(e.target.value);
            }}
            placeholder={
              isOpen && searchable ? "Search options..." : placeholder
            }
            className={cn(
              "flex-grow bg-transparent border-none focus:outline-none focus:ring-0 min-w-0 truncate",
              {
                "text-gray-400 cursor-not-allowed": disabled,
                "text-gray-400": !isOpen && !selected && !disabled,
              }
            )}
            onFocus={() => {
              if (!disabled) setIsOpen(true);
            }}
            readOnly={!searchable}
          />

          {/* Clear button when value is selected and clearable */}
          {clearable && selected && !isOpen && (
            <button
              type="button"
              onClick={handleClear}
              disabled={disabled}
              className={cn(
                "ml-2 flex-shrink-0",
                disabled
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Dropdown toggle */}
          <button
            type="button"
            onClick={(e) => {
              if (disabled) return;
              toggleDropdown(e);
            }}
            disabled={disabled}
            className={cn(
              "ml-2 flex-shrink-0 transition-colors",
              disabled
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-400 hover:text-gray-600"
            )}
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isOpen && "rotate-180",
                disabled
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-400 hover:text-gray-600"
              )}
            />
          </button>
        </div>

        {/* Dropdown menu with auto-positioning */}
        {isOpen && (
          <div
            className={cn(
              "absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden",
              position === "above" ? "bottom-full mb-1" : "top-full mt-1"
            )}
          >
            {/* Options list */}
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = selected === option.value;
                  return (
                    <div
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        "px-4 py-2.5 text-sm cursor-pointer flex items-center gap-3 hover:bg-blue-50 transition-colors",
                        isSelected && "bg-blue-50 font-medium"
                      )}
                    >
                      {/* Tick indicator */}
                      {isSelected && tickPosition !== "only-tick" && (
                        <Check
                          className={cn(
                            "h-4 w-4 text-blue-600 flex-shrink-0",
                            tickPosition === "left"
                              ? "order-first"
                              : "order-last"
                          )}
                          strokeWidth={3}
                        />
                      )}

                      {/* Option label with truncation */}
                      <span className="flex-1 truncate">{option.label}</span>

                      {/* Only-tick mode */}
                      {isSelected && tickPosition === "only-tick" && (
                        <Check
                          className="h-4 w-4 text-blue-600 ml-auto flex-shrink-0"
                          strokeWidth={3}
                        />
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500 text-center truncate">
                  {searchable && searchTerm
                    ? "No matching options found"
                    : "No options available"}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {isInvalid && (
        <p className="mt-1 text-xs text-red-500 truncate">{error}</p>
      )}
    </div>
  );
}
