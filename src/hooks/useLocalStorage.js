import { useEffect, useState, useCallback } from "react";

export default function useLocalStorage(key, initialValue) {
  const readValue = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error("useLocalStorage read error:", err);
      return initialValue;
    }
  }, [key, initialValue]);

  const [value, setValue] = useState(readValue);

  // write + notify others in same tab
  const setStoredValue = useCallback(
    (valOrFn) => {
      setValue((prev) => {
        const nextValue =
          typeof valOrFn === "function" ? valOrFn(prev) : valOrFn;

        try {
          localStorage.setItem(key, JSON.stringify(nextValue));

          // ✅ sync within same tab
          window.dispatchEvent(
            new CustomEvent("local-storage", {
              detail: { key, value: nextValue },
            })
          );
        } catch (err) {
          console.error("useLocalStorage write error:", err);
        }

        return nextValue;
      });
    },
    [key]
  );

  useEffect(() => {
    const onStorage = (e) => {
      // fires in other tabs
      if (e.key !== key) return;
      setValue(readValue());
    };

    const onLocalStorage = (e) => {
      // fires in same tab
      if (e?.detail?.key !== key) return;
      setValue(e.detail.value);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("local-storage", onLocalStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("local-storage", onLocalStorage);
    };
  }, [key, readValue]);

  return [value, setStoredValue];
}
