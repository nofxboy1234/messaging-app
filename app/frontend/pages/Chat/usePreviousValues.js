import { useEffect, useRef } from 'react';

function usePreviousValues(values) {
  const prevValuesRef = useRef([]);

  useEffect(() => {
    prevValuesRef.current = [...values];
  }, [values]);

  return prevValuesRef.current;
}

export default usePreviousValues;
