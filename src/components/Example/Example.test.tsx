import React from 'react';
import { render } from '@testing-library/react';
import Example from './Example';

jest.mock('hooks', () => ({
  useCounter: () => ({
    value: 6,
    increment: jest.fn(),
    decrement: jest.fn(),
  }),
}));

test('Should render Example component', () => {
  const { getByText } = render(<Example />);

  const titleElement = getByText(/^Example/);
  const valeElement = getByText(/6/);

  expect(titleElement).toBeInTheDocument();
  expect(valeElement).toBeDefined();
});