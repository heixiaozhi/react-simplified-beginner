import { useEffect, useState, useRef } from "react";

export function useLocalStorage(key, InitValue) {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);
    if (localValue == null) {
      if (typeof InitValue === "function") {
        return InitValue();
      }
      return InitValue;
    }
    return JSON.parse(localValue);
  });

  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  return [value, setValue];
}
