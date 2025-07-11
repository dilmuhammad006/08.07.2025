import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [result, setResult] = useState();

  useEffect(() => {
    const time = setTimeout(() => {
      setResult(value);
    }, delay);

    return () => clearTimeout(time);
  }, [value, delay]);

  return result;
};
