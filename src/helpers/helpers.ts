export const getRndIndex = (arr: Array<string>) =>
  Math.floor(Math.random() * arr.length);

export const removeElementFromArray = (
  element: string,
  array: Array<string>,
) => {
  const index = array.indexOf(element);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
};
