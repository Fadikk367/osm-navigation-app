import { useState } from "react";

function useCounter(initialValue = 0, step = 1) {
  const [value, setValue] = useState(initialValue);

  const increment = () => setValue(prev => prev + step);

  const decrement = () => setValue(prev => prev - step);

  return { value, increment, decrement };
}

export default useCounter;
