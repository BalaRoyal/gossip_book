export const updateArrayElement = (values = [], id, newValue) => {
  const targetIndex = values.findIndex((value) => value.id === id);

  let valuesCopy = [...values];

  if (targetIndex) {
    valuesCopy = [...values];
    valuesCopy[targetIndex] = newValue;
  }

  return valuesCopy;
};

export const getInitials = (firstName, lastName) => {
  let initials = "";
  if (firstName) initials += firstName[0];
  if (lastName) initials += lastName[0];

  if (initials.length < 2 && !lastName) initials += firstName[1];
  if (initials.length < 2 && !firstName) initials += lastName[1];
  return initials;
};
