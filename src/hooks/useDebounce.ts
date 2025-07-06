import { useState, useEffect } from 'react';

/**
 * Custom hook that debounces a value
 * Useful for delaying API calls or expensive calculations
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to cancel the timeout if value changes before delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage example:
// const debouncedSearchTerm = useDebounce(searchTerm, 500);
// useEffect(() => {
//   // API call here with debouncedSearchTerm
// }, [debouncedSearchTerm]);