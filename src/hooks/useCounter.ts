import { useState } from 'react';

interface UseCounter {
  value: number;
  increment(): void;
  decrement(): void;
}

function useCounter(initialValue = 0, step = 1): UseCounter {
  const [value, setValue] = useState(initialValue);

  const increment = (): void => setValue((prev) => prev + step);

  const decrement = (): void => setValue((prev) => prev - step);

  return { value, increment, decrement };
}

export default useCounter;
