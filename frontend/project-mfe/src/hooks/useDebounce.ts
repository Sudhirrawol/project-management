import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number) {
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedSearch;
}
