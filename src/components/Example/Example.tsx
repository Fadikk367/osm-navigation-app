import React from 'react';

import { useCounter } from 'hooks';

const Example: React.FC = () => {
  const { value, increment, decrement } = useCounter(0, 2);

  return (
    <div>
      <h3>
        Example: {value}
      </h3>
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    </div>
  );
};

export default Example;
