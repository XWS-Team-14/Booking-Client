export const snapshotToArray = (snapshot: any) => {
  const array: any[] = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    array.push(item);
  });

  return array;
};
