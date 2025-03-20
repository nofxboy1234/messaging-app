function logChangedValues(valueNames, prevValues, curValues) {
  prevValues.forEach((prevValue, index) => {
    const currentValue = curValues[index];

    if (!Object.is(prevValue, currentValue)) {
      console.log(`${valueNames[index]}: `, prevValue, ' => ', currentValue);
    }
  });
}

export default logChangedValues;
