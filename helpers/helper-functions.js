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

export const toSnakeCase = (objectData) => {
  const newObj = {};
  for (let key of Object.keys(objectData)) {
    newObj[
      key
        .split(/(?=[A-Z])/)
        .join("_")
        .toLowerCase()
    ] = objectData[key];
  }

  return newObj;
};

export const attributeToSnakeCase = (key) => {
  return key
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
};

export const toCamelCase = (attribute) => {
  attribute = attribute.split("_");
  const firstWord = attribute[0];
  const subsequentWords = attribute.slice(1);

  const capitalizedWords = subsequentWords.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  return [firstWord].concat(capitalizedWords).join("");
};
