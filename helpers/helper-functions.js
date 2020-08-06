export const updateArrayElement = (values = [], id, newValue) => {
  const targetIndex = values.findIndex((value) => value.id === id);

  let valuesCopy = [...values];

  if (targetIndex) {
    valuesCopy = [...values];
    valuesCopy[targetIndex] = newValue;
  }

  return valuesCopy;
};
