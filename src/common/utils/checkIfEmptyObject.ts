export const checkIfEmptyObject = (empty: any) =>
  Object.keys(empty).length === 0 && empty.constructor === Object;
