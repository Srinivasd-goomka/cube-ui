import { useEffect, useRef, useState } from "react";

export function useDebouncedValue<T>(
  value: T,
  wait: number,
  options: { leading?: boolean } = { leading: false }
): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const mountedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const cooldownRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) {
      if (!cooldownRef.current && options.leading) {
        cooldownRef.current = true;
        setDebouncedValue(value);
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
          cooldownRef.current = false;
          setDebouncedValue(value);
        }, wait);
      }
    } else {
      // Set initial value on mount
      setDebouncedValue(value);
    }
  }, [value, wait, options.leading]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedValue;
}
