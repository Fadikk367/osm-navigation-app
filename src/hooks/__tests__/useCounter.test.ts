import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from 'hooks/useCounter';

test('Should initialize hook', () => {
  const { result } = renderHook(() => useCounter(0, 1));

  expect(result.current.value).toEqual(0);
  expect(typeof result.current.increment).toEqual('function');
  expect(typeof result.current.decrement).toEqual('function');
});

test('Should increment value', () => {
  const { result } = renderHook(() => useCounter(0, 2));

  act(() => {
    result.current.increment();
  });

  expect(result.current.value).toEqual(2);
});

test('Should decrement value', () => {
  const { result } = renderHook(() => useCounter(0, 1));

  act(() => {
    result.current.decrement();
  });

  expect(result.current.value).toEqual(-1);
});