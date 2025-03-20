import { useRef } from 'react';

function usePreviousValues(valuesObject) {
  const valueNames = Object.keys(valuesObject);
  const curValues = Object.values(valuesObject);
  const prevValuesRef = useRef({ prev: [], cur: [] });

  const prevValues = prevValuesRef.current.cur;
  prevValuesRef.current = { prev: prevValues, cur: [...curValues] };

  return [valueNames, prevValues, curValues];
}

export default usePreviousValues;
