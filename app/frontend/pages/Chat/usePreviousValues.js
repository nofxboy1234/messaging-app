import { useEffect, useRef } from 'react';

function usePreviousValues(valuesObject) {
  const valueNames = Object.keys(valuesObject);
  const curValues = Object.values(valuesObject);
  const prevValuesRef = useRef([]);

  useEffect(() => {
    prevValuesRef.current = [...curValues];
  }, [curValues]);

  return [valueNames, prevValuesRef.current, curValues];
}

export default usePreviousValues;
