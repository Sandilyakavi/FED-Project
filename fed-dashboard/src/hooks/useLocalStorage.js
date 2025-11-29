// src/hooks/useLocalStorage.js
import { useState, useEffect, useCallback } from "react";

function useLocalStorage(key, initialValue) {
  // Read from localStorage once (safe for SSR)
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
      return typeof initialValue === "function" ? initialValue() : initialValue;
    } catch (error) {
      console.warn(`useLocalStorage: error reading key "${key}"`, error);
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
  });

  // Write to localStorage whenever value changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const valueToStore =
        typeof storedValue === "undefined" ? null : storedValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`useLocalStorage: error setting key "${key}"`, error);
    }
  }, [key, storedValue]);

  // Optional: sync across tabs
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorage = (event) => {
      if (event.key !== key) return;
      try {
        const newValue =
          event.newValue !== null ? JSON.parse(event.newValue) : null;
        setStoredValue(newValue);
      } catch (error) {
        console.warn(`useLocalStorage: error syncing key "${key}"`, error);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);

  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) =>
        value instanceof Function ? value(prev) : value
      );
    },
    [setStoredValue]
  );

  const remove = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
    setStoredValue(
      typeof initialValue === "function" ? initialValue() : initialValue
    );
  }, [key, initialValue]);

  return [storedValue, setValue, remove];
}

export default useLocalStorage;
