export const checkIfEmptyObjectOrFalsy = (empty: any) => {
  if (!!empty === false) return true;
  return Object.keys(empty).length === 0 && empty.constructor === Object;
};
